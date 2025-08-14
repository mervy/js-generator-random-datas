const fs = require('fs');

const authorsMax = 50;
const categoriesMax = 30;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Lorem ipsum simples para gerar conteúdo
const loremWords = `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum`.split(' ');

// Gera parágrafos de 50–100 palavras
function generateParagraph() {
  const len = randomInt(50, 100);
  const words = [];
  for (let i = 0; i < len; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }
  return `<p>${words.join(' ')}</p>`;
}

// Gera título H2
function generateH2() {
  const len = randomInt(3, 6);
  const words = [];
  for (let i = 0; i < len; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }
  return `<h2>${words.join(' ')}</h2>`;
}

// Gera conteúdo 1000–3000 palavras com h2 e imagens aleatórias
function generateContent() {
  const totalWords = randomInt(1000, 3000);
  let content = '';
  let wordsCount = 0;

  while (wordsCount < totalWords) {
    const choice = Math.random();
    if (choice < 0.1) {
      // 10% chance de H2
      content += generateH2() + '\n';
    } else if (choice < 0.15) {
      // 5% chance de imagem
      content += `<img src="https://via.placeholder.com/500" style="display:block;margin:0 auto;max-width:500px;" />\n`;
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
    const image = `https://via.placeholder.com/500`;
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

  fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
  console.log('Arquivo articles.json gerado com sucesso!');
}

generateArticles(100); // Altere a quantidade de artigos desejada
