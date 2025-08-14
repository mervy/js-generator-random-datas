const fs = require('fs');

const categoryNames = [
  "Technology","Programming","AI","Science","Health","Education","Business","Finance","Entertainment","Sports",
  "Gaming","Travel","Food","Music","Movies","Books","Art","Design","Photography","Lifestyle",
  "Environment","Politics","History","Culture","Fashion","DIY","Marketing","Startups","Web","Mobile"
];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'');
}

function generateCategories(num = 30) {
  const categories = [];
  for (let i = 0; i < num; i++) {
    const name = categoryNames[i % categoryNames.length];
    const slug = slugify(name);
    const description = `Articles about ${name}`;
    const status = Math.random() < 0.5 ? "0" : "1";

    categories.push({
      id: i + 1,
      name,
      slug,
      description,
      status
    });
  }

  fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2));
  console.log('Arquivo categories.json gerado com sucesso!');
}

generateCategories();
