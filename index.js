// gerar_authors.js
const fs = require('fs');
const bcrypt = require('bcrypt');

// Lista de nomes e sobrenomes em inglês
const firstNames = ["Alex","Emily","Michael","Sarah","David","Jessica","Daniel","Laura","James","Sophia",
  "William","Olivia","Matthew","Emma","Joseph","Mia","Benjamin","Chloe","Samuel","Ella",
  "Christopher","Ava","Andrew","Lily","Joshua","Grace","Ryan","Samantha","Nathan","Hannah",
  "Ethan","Abigail","Jacob","Isabella","Anthony","Charlotte","Jonathan","Amelia","Thomas","Harper",
  "Dylan","Scarlett","Logan","Victoria","Gabriel","Madison","Jack","Aria","Lucas","Zoe"
];

const surnames = ["Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez","Wilson",
  "Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White",
  "Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall",
  "Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson",
  "Hill","Ramirez","Campbell","Mitchell","Roberts","Carter","Phillips","Evans","Turner","Torres"
];

// Função para gerar senha aleatória segura
function generatePassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-{}[]:<>?,.~';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Função para gerar hash PHP estilo bcrypt
function generatePHPBcryptHash(password) {
  // Simula hash bcrypt do PHP
  // O hash JS do bcrypt é compatível com PHP password_verify
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

async function generateAuthors(num = 50) {
  const authors = [];
  for (let i = 0; i < num; i++) {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const nickname = (name + surname).toLowerCase();
    const password = generatePassword(20); // senha aleatória forte
    const hash_js = await bcrypt.hash(password, 10);
    const hash_php = generatePHPBcryptHash(password);

    authors.push({
      id: i + 1,
      nickname,
      name,
      surname,
      password,
      hash_js,
      hash_php
    });
  }

  // Salvar em arquivo JSON
  fs.writeFileSync('authors.json', JSON.stringify(authors, null, 2));
  console.log('Arquivo authors.json gerado com sucesso!');
}

generateAuthors();
