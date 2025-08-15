const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Pastas de saída
const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
const outputDir = `${timestamp}_random-datas`;
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// --- Authors ---
function generateAuthors(num = 50) {
  const authors = [];
  for (let i=1; i<=num; i++) {
    const password = faker.internet.password(12, false, /[A-Za-z0-9@#$%^&*()_+=-]/);
    const hash_js = bcrypt.hashSync(password, 10);
    const hash_php = bcrypt.hashSync(password, 10); // simula salt PHP
    const nickname = faker.internet.username().toLowerCase();
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const email = faker.internet.email(name, surname).toLowerCase();
    const status = Math.random() < 0.5 ? "0" : "1";

    authors.push({ id:i, nickname, name, surname, email, password, hash_js, hash_php, status });
  }
  fs.writeFileSync(path.join(outputDir,'authors.json'), JSON.stringify(authors,null,2));
  return authors.length;
}

// --- Categories ---
function generateCategories(num = 30) {
  const categories = [];
  for (let i=1; i<=num; i++) {
    const name = faker.commerce.department();
    const slug = name.toLowerCase().replace(/\s+/g,'-');
    let description = '';
    for(let j=0;j<4;j++){
      description += `<p>${faker.lorem.paragraph(50)}</p>\n\n`;
    }
    const status = Math.random()<0.5?"0":"1";
    categories.push({id:i,name,slug,description,status});
  }
  fs.writeFileSync(path.join(outputDir,'categories.json'), JSON.stringify(categories,null,2));
  return categories.length;
}

// --- Articles ---
function generateArticles(num = 100, maxAuthor=50, maxCategory=30) {
  const articles = [];
  for (let i=1;i<=num;i++){
    const title = faker.lorem.sentence();
    const image = `https://picsum.photos/seed/${i}/500`;
    let content = '';
    const totalWords = faker.datatype.number({min:1000,max:3000});
    let wordCount = 0;
    while(wordCount < totalWords){
      const choice = Math.random();
      if(choice < 0.1){
        content += `<h2>${faker.lorem.sentence()}</h2>\n`;
      }else if(choice < 0.15){
        content += `<img src="https://picsum.photos/seed/${faker.datatype.uuid()}/500" style="display:block;margin:0 auto;max-width:500px;" />\n`;
      }else{
        const para = faker.lorem.paragraph();
        content += `<p>${para}</p>\n`;
        wordCount += para.split(' ').length;
      }
    }
    const status = Math.random()<0.5?"0":"1";
    const created = faker.date.past(3);
    const updated = faker.date.between(created,new Date());
    const authors_id = faker.datatype.number({min:1,max:maxAuthor});
    const categories_id = faker.datatype.number({min:1,max:maxCategory});

    articles.push({id:i,title,image,content,status,created,updated,authors_id,categories_id});
  }
  fs.writeFileSync(path.join(outputDir,'articles.json'), JSON.stringify(articles,null,2));
  return articles.length;
}

// --- Newsletters ---
function generateNewsletters(num=30){
  const newsletters=[];
  for(let i=1;i<=num;i++){
    newsletters.push({
      id:i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      ip: faker.internet.ip(),
      registered_in: faker.date.recent(100)
    });
  }
  fs.writeFileSync(path.join(outputDir,'newsletters.json'), JSON.stringify(newsletters,null,2));
  return newsletters.length;
}

// --- Visitors ---
function generateVisitors(num=30,maxArticles=100){
  const visitors=[];
  for(let i=1;i<=num;i++){
    visitors.push({
      id:i,
      articles_id: faker.datatype.number({min:1,max:maxArticles}),
      ip: faker.internet.ip(),
      acessed_in: faker.date.recent(100)
    });
  }
  fs.writeFileSync(path.join(outputDir,'visitors.json'), JSON.stringify(visitors,null,2));
  return visitors.length;
}

// --- Executa ---
const authorsCount = generateAuthors();
const categoriesCount = generateCategories();
const articlesCount = generateArticles(100, authorsCount, categoriesCount);
generateNewsletters();
generateVisitors(30, articlesCount);

console.log(`Todos os dados gerados na pasta ${outputDir}`);
