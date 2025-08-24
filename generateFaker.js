import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

// Configurações
const CONFIG = {
  outputDir: `${new Date().toLocaleString('sv-SE').replace(' ', '_').replace(/:/g, '-')}_random-datas`,
  databases: ['mysql', 'postgres', 'mongodb'],
  counts: {
    authors: 50,
    categories: 30,
    articles: 100,
    newsletters: 30,
    visitors: 150
  }
};

// Utilitários
const escapeSQLValue = (value) => {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (value instanceof Date) return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
  
  const stringValue = String(value);
  return `'${stringValue.replace(/'/g, "''")}'`;
};

const ensureDirectoryExists = async (dirPath) => {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
};

// Geradores de dados
const generateAuthors = async (count = 50) => {
  const authors = [];
  
  for (let i = 1; i <= count; i++) {
    const password = faker.internet.password({ length: 12 });
    const hash = bcrypt.hashSync(password, 10);    
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const nickname = faker.internet.username().toLowerCase();
    const email = faker.internet.email({ firstName: name, lastName: surname }).toLowerCase();
    const status = faker.datatype.boolean();

    authors.push({ 
      id: i, 
      nickname, 
      name, 
      surname, 
      email, 
      password, 
      hash, 
      status 
    });
  }

  return authors;
};

const generateCategories = async (count = 30) => {
  const categories = [];
  
  for (let i = 1; i <= count; i++) {
    const name = faker.commerce.department();
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    // Gerar descrição com 2 a 5 parágrafos, cada um com 70 a 150 palavras
    let description = '';
    const numParagraphs = faker.number.int({ min: 2, max: 5 });
    
    for (let j = 0; j < numParagraphs; j++) {
      const words = faker.lorem.words({ min: 70, max: 150 });
      description += `<p>${words}</p>\n\n`;
    }
    
    const status = faker.datatype.boolean();
    categories.push({ id: i, name, slug, description, status });
  }

  return categories;
};

const generateArticles = async (count = 100, authorCount, categoryCount) => {
  const articles = [];
  
  for (let i = 1; i <= count; i++) {
    const title = faker.lorem.sentence();
    const image = `https://picsum.photos/seed/${i}/500`;
    let content = '';
    const totalWords = faker.number.int({ min: 1000, max: 3000 });
    let wordCount = 0;
    
    while (wordCount < totalWords) {
      const choice = Math.random();
      if (choice < 0.1) {
        content += `<h2>${faker.lorem.sentence()}</h2>\n`;
      } else if (choice < 0.15) {
        content += `<img src="https://picsum.photos/seed/${faker.string.uuid()}/500" style="display:block;margin:0 auto;max-width:500px;" />\n`;
      } else {
        const para = faker.lorem.paragraph();
        content += `<p>${para}</p>\n`;
        wordCount += para.split(' ').length;
      }
    }
    
    const status = faker.datatype.boolean();
    const created_at = faker.date.past({ years: 3 });
    const updated_at = faker.date.between({ from: created_at, to: new Date() });
    const authors_id = faker.number.int({ min: 1, max: authorCount });
    const categories_id = faker.number.int({ min: 1, max: categoryCount });

    articles.push({ 
      id: i, 
      title, 
      image, 
      content, 
      status, 
      created_at, 
      updated_at, 
      authors_id, 
      categories_id 
    });
  }

  return articles;
};

const generateNewsletters = async (count = 30) => {
  const newsletters = [];
  
  for (let i = 1; i <= count; i++) {
    newsletters.push({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      ip: faker.internet.ip(),
      registered_in: faker.date.recent({ days: 100 })
    });
  }

  return newsletters;
};

const generateVisitors = async (count = 150, articleCount) => {
  const visitors = [];
  
  for (let i = 1; i <= count; i++) {
    visitors.push({
      id: i,
      articles_id: faker.number.int({ min: 1, max: articleCount }),
      ip: faker.internet.ip(),
      accessed_in: faker.date.recent({ days: 100 })
    });
  }

  return visitors;
};

// Exportadores de dados
const saveJSON = async (db, filename, data) => {
  try {
    const filePath = path.join(CONFIG.outputDir, db, `${filename}.json`);
    await writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Erro ao salvar JSON para ${db}/${filename}:`, error);
    throw error;
  }
};

const saveSQL = async (db, filename, table, data) => {
  try {
    if (!data || data.length === 0) {
      console.warn(`Nenhum dado para salvar em ${db}/${filename}`);
      return;
    }

    const keys = Object.keys(data[0]);
    let sql = '';
    
    // Cabeçalho SQL
    sql += `-- Dados de ${table}\n`;
    sql += `CREATE TABLE IF NOT EXISTS ${table} (\n`;
    
    // Definição das colunas
    const columnDefinitions = [];
    
    // Definir estrutura da tabela baseada no nome
    if (table === 'authors') {
      columnDefinitions.push('  id INTEGER PRIMARY KEY AUTO_INCREMENT');      
      columnDefinitions.push('  name VARCHAR(100)');
      columnDefinitions.push('  surname VARCHAR(100)');
      columnDefinitions.push('  nickname VARCHAR(100)');
      columnDefinitions.push('  email VARCHAR(255)');
      columnDefinitions.push('  password VARCHAR(255)');
      columnDefinitions.push('  hash VARCHAR(255)');
      columnDefinitions.push('  status BOOLEAN');
    } 
    else if (table === 'categories') {
      columnDefinitions.push('  id INTEGER PRIMARY KEY AUTO_INCREMENT');
      columnDefinitions.push('  name VARCHAR(100)');
      columnDefinitions.push('  slug VARCHAR(100)');
      columnDefinitions.push('  description TEXT');
      columnDefinitions.push('  status BOOLEAN');
    }
    else if (table === 'articles') {
      columnDefinitions.push('  id INTEGER PRIMARY KEY AUTO_INCREMENT');
      columnDefinitions.push('  title VARCHAR(255)');
      columnDefinitions.push('  image VARCHAR(500)');
      columnDefinitions.push('  content LONGTEXT');
      columnDefinitions.push('  status BOOLEAN');
      columnDefinitions.push('  created_at TIMESTAMP');
      columnDefinitions.push('  updated_at TIMESTAMP');
      columnDefinitions.push('  authors_id INTEGER');
      columnDefinitions.push('  categories_id INTEGER');
      columnDefinitions.push('  FOREIGN KEY (authors_id) REFERENCES authors(id)');
      columnDefinitions.push('  FOREIGN KEY (categories_id) REFERENCES categories(id)');
    }
    else if (table === 'newsletters') {
      columnDefinitions.push('  id INTEGER PRIMARY KEY AUTO_INCREMENT');
      columnDefinitions.push('  name VARCHAR(100)');
      columnDefinitions.push('  email VARCHAR(255)');
      columnDefinitions.push('  ip VARCHAR(45)');
      columnDefinitions.push('  registered_in TIMESTAMP');
    }
    else if (table === 'visitors') {
      columnDefinitions.push('  id INTEGER PRIMARY KEY AUTO_INCREMENT');
      columnDefinitions.push('  articles_id INTEGER');
      columnDefinitions.push('  ip VARCHAR(45)');
      columnDefinitions.push('  accessed_in TIMESTAMP');
      columnDefinitions.push('  FOREIGN KEY (articles_id) REFERENCES articles(id)');
    }
    
    sql += columnDefinitions.join(',\n') + '\n);\n\n';
    
    // Inserções
    data.forEach(row => {
      const values = keys.map(k => escapeSQLValue(row[k])).join(', ');
      sql += `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values});\n`;
    });

    const filePath = path.join(CONFIG.outputDir, db, `${filename}.sql`);
    await writeFile(filePath, sql);
  } catch (error) {
    console.error(`Erro ao salvar SQL para ${db}/${filename}:`, error);
    throw error;
  }
};

const saveMongoDB = async (filename, data) => {
  try {
    // Para MongoDB, podemos salvar como JSON array para usar com mongoimport
    const filePath = path.join(CONFIG.outputDir, 'mongodb', `${filename}.json`);
    
    // Formatar dados para MongoDB (sem id numérico, usando _id)
    const mongoData = data.map(item => {
      const { id, ...rest } = item;
      return { _id: id, ...rest };
    });
    
    await writeFile(filePath, JSON.stringify(mongoData, null, 2));
  } catch (error) {
    console.error(`Erro ao salvar dados para MongoDB/${filename}:`, error);
    throw error;
  }
};

// Função principal
const main = async () => {
  try {
    console.log('🚀 Iniciando geração de dados...');
    
    // Criar diretórios
    await ensureDirectoryExists(CONFIG.outputDir);
    
    for (const db of CONFIG.databases) {
      await ensureDirectoryExists(path.join(CONFIG.outputDir, db));
    }
    
    // Gerar dados
    console.log('📝 Gerando autores...');
    const authors = await generateAuthors(CONFIG.counts.authors);
    
    console.log('📝 Gerando categorias...');
    const categories = await generateCategories(CONFIG.counts.categories);
    
    console.log('📝 Gerando artigos...');
    const articles = await generateArticles(
      CONFIG.counts.articles, 
      CONFIG.counts.authors, 
      CONFIG.counts.categories
    );
    
    console.log('📝 Gerando newsletters...');
    const newsletters = await generateNewsletters(CONFIG.counts.newsletters);
    
    console.log('📝 Gerando visitantes...');
    const visitors = await generateVisitors(
      CONFIG.counts.visitors, 
      CONFIG.counts.articles
    );
    
    // Salvar dados
    console.log('💾 Salvando dados...');
    
    for (const db of CONFIG.databases) {
      if (db === 'mongodb') {
        await saveMongoDB('authors', authors);
        await saveMongoDB('categories', categories);
        await saveMongoDB('articles', articles);
        await saveMongoDB('newsletters', newsletters);
        await saveMongoDB('visitors', visitors);
      } else {
        await saveSQL(db, 'authors', 'authors', authors);
        await saveSQL(db, 'categories', 'categories', categories);
        await saveSQL(db, 'articles', 'articles', articles);
        await saveSQL(db, 'newsletters', 'newsletters', newsletters);
        await saveSQL(db, 'visitors', 'visitors', visitors);
      }
    }
    
    // Resumo
    console.log(`✅ Dados gerados em: ${CONFIG.outputDir}`);
    console.log(`📊 Resumo:`);
    console.log(`  - ${authors.length} autores`);
    console.log(`  - ${categories.length} categorias`);
    console.log(`  - ${articles.length} artigos`);
    console.log(`  - ${newsletters.length} newsletters`);
    console.log(`  - ${visitors.length} visitantes`);
    
  } catch (error) {
    console.error('❌ Erro durante a geração de dados:', error);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Exportar funções para uso externo
export {
  generateAuthors,
  generateCategories,
  generateArticles,
  generateNewsletters,
  generateVisitors,
  saveJSON,
  saveSQL,
  saveMongoDB,
  main
};