const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

// Função para criar o nome da pasta com timestamp
function getFolderName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
  return `${year}-${month}-${day}T${hours}-${minutes}-${seconds}-${milliseconds}Z_random-datas`;
}

// Criar a pasta
const folderName = getFolderName();
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

// Configurações gerais
const authorsMax = 50;
const categoriesMax = 30;

// Funções utilitárias compartilhadas
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

// Gerar autores
const firstNames = ["Alex","Emily","Michael","Sarah","David","Jessica","Daniel","Laura","James","Sophia",
  "William","Olivia","Matthew","Emma","Joseph","Mia","Benjamin","Chloe","Samuel","Ella",
  "Christopher","Ava","Andrew","Lily","Joshua","Grace","Ryan","Samantha","Nathan","Hannah",
  "Ethan","Abigail","Jacob","Isabella","Anthony","Charlotte","Amelia","Thomas","Harper",
  "Dylan","Scarlett","Logan","Victoria","Gabriel","Madison","Jack","Aria","Lucas","Zoe"
];

const surnames = ["Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez","Wilson",
  "Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White",
  "Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall",
  "Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson"
];

function generatePassword(length = 20) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-{}[]:<>?,.~';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function generatePHPBcryptHash(password) {
  return bcrypt.hashSync(password, 10);
}

async function generateAuthors(num = 50) {
  const authors = [];
  for (let i = 0; i < num; i++) {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const nickname = (name + surname).toLowerCase();
    const email = `${nickname}@example.com`;
    const password = generatePassword();
    const hash_js = await bcrypt.hash(password, 10);
    const hash_php = generatePHPBcryptHash(password);
    const status = Math.random() < 0.5 ? "0" : "1";

    authors.push({
      id: i + 1,
      nickname,
      name,
      surname,
      email,
      password,
      hash_js,
      hash_php,
      status
    });
  }

  const filePath = path.join(folderName, 'authors.json');
  fs.writeFileSync(filePath, JSON.stringify(authors, null, 2));
  console.log(`Arquivo ${filePath} gerado com sucesso!`);
}

// Gerar categorias
const categoryNames = [
  "Technology","Programming","AI","Science","Health","Education","Business","Finance","Entertainment","Sports",
  "Gaming","Travel","Food","Music","Movies","Books","Art","Design","Photography","Lifestyle",
  "Environment","Politics","History","Culture","Fashion","DIY","Marketing","Startups","Web","Mobile"
];

function generateDescription(category) {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${category} plays a crucial role in modern society, impacting multiple facets of daily life and driving innovation across diverse industries. From practical applications to theoretical explorations, understanding ${category.toLowerCase()} opens doors to creativity, efficiency, and problem-solving. Advances in ${category.toLowerCase()} are constantly reshaping the way we communicate, learn, and interact with technology. Professionals and enthusiasts alike invest time in mastering skills related to ${category.toLowerCase()}, which includes analyzing data, developing solutions, and contributing to groundbreaking projects. Educational programs, workshops, and online platforms provide ample resources for anyone eager to explore ${category.toLowerCase()} in depth, fostering a community of knowledge-sharing and collaboration. Moreover, ${category.toLowerCase()} intersects with other fields, enabling interdisciplinary growth and innovation. Continuous learning and adaptability are essential, as ${category.toLowerCase()} evolves rapidly, demanding new approaches, methodologies, and tools. Ethical considerations, sustainability, and accessibility are becoming increasingly important in shaping the future of ${category.toLowerCase()}. Engaging with ${category.toLowerCase()} not only enhances professional opportunities but also encourages personal growth, critical thinking, and creative exploration. The impact of ${category.toLowerCase()} is visible in everyday experiences, from communication platforms and software solutions to smart devices and automated systems. Understanding trends, adopting best practices, and leveraging technological tools in ${category.toLowerCase()} empower individuals and organizations to innovate responsibly. Collaboration, experimentation, and continuous improvement are key drivers of success in the field of ${category.toLowerCase()}, ensuring that both learners and practitioners stay ahead in a competitive and fast-paced environment.`;
  
  const words = lorem.split(' ');
  const paragraphs = [];
  let para = [];
  let count = 0;

  for (const word of words) {
    para.push(word);
    count++;
    if (count >= 60) {
      paragraphs.push('<p>' + para.join(' ') + '</p>');
      para = [];
      count = 0;
    }
  }
  if (para.length > 0) {
    paragraphs.push('<p>' + para.join(' ') + '</p>');
  }

  return paragraphs.join('\n\n');
}

function generateCategories(num = 30) {
  const categories = [];
  for (let i = 0; i < num; i++) {
    const name = categoryNames[i % categoryNames.length];
    const slug = slugify(name);
    const description = generateDescription(name);
    const status = Math.random() < 0.5 ? "0" : "1";

    categories.push({
      id: i + 1,
      name,
      slug,
      description,
      status
    });
  }

  const filePath = path.join(folderName, 'categories.json');
  fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
  console.log(`Arquivo ${filePath} gerado com sucesso!`);
}

// Gerar artigos
const loremWords = `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum`.split(' ');

function generateParagraph() {
  const len = randomInt(50, 100);
  const words = [];
  for (let i = 0; i < len; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }
  return `<p>${words.join(' ')}</p>`;
}

function generateH2() {
  const len = randomInt(3, 6);
  const words = [];
  for (let i = 0; i < len; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }
  return `<h2>${words.join(' ')}</h2>`;
}

function generateRandomImage() {
  const randomId = randomInt(1, 1000); // IDs entre 1 e 1000
  return `https://picsum.photos/id/${randomId}/500/390`;
}

function generateContent() {
  const totalWords = randomInt(1000, 3000);
  let content = '';
  let wordsCount = 0;

  while (wordsCount < totalWords) {
    const choice = Math.random();
    if (choice < 0.1) {
      content += generateH2() + '\n';
    } else if (choice < 0.15) {
      content += `<img src="${generateRandomImage()}" style="display:block;margin:0 auto;max-width:500px;" />\n`;
    } else {
      const para = generateParagraph();
      content += para + '\n';
      wordsCount += para.split(' ').length;
    }
  }

  return content;
}

function generateArticles(num = 100) {
  const articles = [];
  for (let i = 0; i < num; i++) {
    const title = `Lorem Article #${i + 1}`;
    const image = generateRandomImage();
    const content = generateContent();
    const status = Math.random() < 0.5 ? "0" : "1";
    const created = randomDate(new Date(2020, 0, 1), new Date());
    const updated = randomDate(created, new Date());
    const authors_id = randomInt(1, authorsMax);
    const categories_id = randomInt(1, categoriesMax);

    articles.push({
      id: i + 1,
      title,
      image,
      content,
      status,
      created,
      updated,
      authors_id,
      categories_id
    });
  }

  const filePath = path.join(folderName, 'articles.json');
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
  console.log(`Arquivo ${filePath} gerado com sucesso!`);
}

// Executar todas as gerações
async function generateAll() {
  try {
    await generateAuthors();
    generateCategories();
    generateArticles();
    console.log(`Todos os arquivos foram gerados na pasta: ${folderName}`);
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

generateAll();