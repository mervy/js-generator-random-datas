const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// --- Timestamp local ---
function getLocalTimestamp() {
  const d = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const Y = d.getFullYear();
  const M = pad(d.getMonth() + 1);
  const D = pad(d.getDate());
  const h = pad(d.getHours());
  const m = pad(d.getMinutes());
  const s = pad(d.getSeconds());
  return `${Y}-${M}-${D}_${h}-${m}-${s}`;
}

// --- Formatar data para SQL ---
function formatDateLocal(date) {
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// --- Criar pasta raiz e subpastas ---
const timestamp = getLocalTimestamp();
const outputDir = `${timestamp}_random-datas`;
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const dbs = ['mysql', 'postgres', 'mongodb'];
dbs.forEach(db => {
  const dbPath = path.join(outputDir, db);
  if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);
});

// --- Função salvar JSON ---
function saveJSON(db, filename, data) {
  fs.writeFileSync(path.join(outputDir, db, filename + '.json'), JSON.stringify(data, null, 2));
}

// --- Função salvar SQL com tipos corretos ---
function saveSQL(db, filename, table, data) {
  let sql = `-- Dados de ${table}\n`;
  
  // Criar tabela com tipos corretos
  sql += `CREATE TABLE IF NOT EXISTS ${table} (\n`;
  const colDefs = {
    authors: `id INT PRIMARY KEY, nickname VARCHAR(50), name VARCHAR(50), surname VARCHAR(50), email VARCHAR(100), password VARCHAR(100), hash_js VARCHAR(100), hash_php VARCHAR(100), status TINYINT(1)`,
    categories: `id INT PRIMARY KEY, name VARCHAR(100), slug VARCHAR(100), description TEXT, status TINYINT(1)`,
    articles: `id INT PRIMARY KEY, title VARCHAR(200), image VARCHAR(200), content TEXT, status TINYINT(1), created DATETIME, updated DATETIME, authors_id INT, categories_id INT`,
    newsletters: `id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), ip VARCHAR(45), registered_in DATETIME`,
    visitors: `id INT PRIMARY KEY, articles_id INT, ip VARCHAR(45), acessed_in DATETIME`
  };
  sql += colDefs[table] + "\n);\n\n";

  // Inserir dados
  data.forEach(row => {
    const keys = Object.keys(row);
    const values = keys.map(k => {
      const val = row[k];
      if (val instanceof Date) return `'${formatDateLocal(val)}'`;
      return val !== null ? `'${String(val).replace(/'/g,"''")}'` : 'NULL';
    }).join(', ');
    sql += `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values});\n`;
  });

  fs.writeFileSync(path.join(outputDir, db, filename + '.sql'), sql);
}

// --- Authors ---
function generateAuthors(num = 50) {
  const authors = [];
  for (let i = 1; i <= num; i++) {
    // gerar senha com tamanho exato de hash bcrypt
    const password = faker.string.alphanumeric(60);
    const hash_js = bcrypt.hashSync(password, 10);
    const hash_php = bcrypt.hashSync(password, 10);
    const nickname = faker.internet.username().toLowerCase();
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const email = faker.internet.email({ firstName: name, lastName: surname }).toLowerCase();
    const status = faker.datatype.boolean() ? "1" : "0";

    authors.push({ id: i, nickname, name, surname, email, password, hash_js, hash_php, status });
  }

  saveJSON('mongodb', 'authors', authors);
  saveSQL('mysql', 'authors', 'authors', authors);
  saveSQL('postgres', 'authors', 'authors', authors);

  return authors.length;
}

// --- Categories ---
function generateCategories(num = 30) {
  const categories = [];
  for (let i = 1; i <= num; i++) {
    const name = faker.commerce.department();
    const slug = name.toLowerCase().replace(/\s+/g,'-');
    let description = '';
    for(let j=0;j<4;j++){
      description += `<p>${faker.lorem.paragraph({ min: 30, max: 50 })}</p>\n\n`;
    }
    const status = faker.datatype.boolean() ? "1" : "0";
    categories.push({id:i,name,slug,description,status});
  }

  saveJSON('mongodb','categories',categories);
  saveSQL('mysql','categories','categories',categories);
  saveSQL('postgres','categories','categories',categories);

  return categories.length;
}

// --- Articles ---
function generateArticles(num=100,maxAuthor=50,maxCategory=30){
  const articles=[];
  for(let i=1;i<=num;i++){
    const title = faker.lorem.sentence();
    const image = `https://picsum.photos/seed/${i}/500`;
    let content = '';
    const totalWords = faker.number.int({min:1000,max:3000});
    let wordCount = 0;
    while(wordCount<totalWords){
      const choice = Math.random();
      if(choice<0.1){
        content += `<h2>${faker.lorem.sentence()}</h2>\n`;
      }else if(choice<0.15){
        content += `<img src="https://picsum.photos/seed/${faker.string.uuid()}/500" style="display:block;margin:0 auto;max-width:500px;" />\n`;
      }else{
        const para = faker.lorem.paragraph();
        content += `<p>${para}</p>\n`;
        wordCount += para.split(' ').length;
      }
    }
    const status = faker.datatype.boolean() ? "1":"0";
    const created = faker.date.past({years:3});
    const updated = faker.date.between({from: created, to: new Date()});
    const authors_id = faker.number.int({min:1,max:maxAuthor});
    const categories_id = faker.number.int({min:1,max:maxCategory});

    articles.push({id:i,title,image,content,status,created,updated,authors_id,categories_id});
  }

  saveJSON('mongodb','articles',articles);
  saveSQL('mysql','articles','articles',articles);
  saveSQL('postgres','articles','articles',articles);

  return articles.length;
}

// --- Newsletters ---
function generateNewsletters(num=30){
  const newsletters=[];
  for(let i=1;i<=num;i++){
    newsletters.push({
      id:i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      ip: faker.internet.ip(),
      registered_in: faker.date.recent({days:100})
    });
  }

  saveJSON('mongodb','newsletters',newsletters);
  saveSQL('mysql','newsletters','newsletters',newsletters);
  saveSQL('postgres','newsletters','newsletters',newsletters);

  return newsletters.length;
}

// --- Visitors ---
function generateVisitors(num=30,maxArticles=100){
  const visitors=[];
  for(let i=1;i<=num;i++){
    visitors.push({
      id:i,
      articles_id: faker.number.int({min:1,max:maxArticles}),
      ip: faker.internet.ip(),
      acessed_in: faker.date.recent({days:100})
    });
  }

  saveJSON('mongodb','visitors',visitors);
  saveSQL('mysql','visitors','visitors',visitors);
  saveSQL('postgres','visitors','visitors',visitors);

  return visitors.length;
}

// --- Executa ---
const authorsCount = generateAuthors();
const categoriesCount = generateCategories();
const articlesCount = generateArticles(100, authorsCount, categoriesCount);
const newslettersCount = generateNewsletters();
const visitorsCount = generateVisitors(30, articlesCount);

console.log(`✅ Dados gerados em: ${outputDir}`);
console.log(`📊 Resumo: 
  - ${authorsCount} authors
  - ${categoriesCount} categories
  - ${articlesCount} articles
  - ${newslettersCount} newsletters
  - ${visitorsCount} visitors
`);
