const fs = require('fs');
const bcrypt = require('bcrypt');

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

  fs.writeFileSync('authors.json', JSON.stringify(authors, null, 2));
  console.log('Arquivo authors.json gerado com sucesso!');
}

generateAuthors();
