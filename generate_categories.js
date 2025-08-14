const fs = require('fs');

const categoryNames = [
  "Technology","Programming","AI","Science","Health","Education","Business","Finance","Entertainment","Sports",
  "Gaming","Travel","Food","Music","Movies","Books","Art","Design","Photography","Lifestyle",
  "Environment","Politics","History","Culture","Fashion","DIY","Marketing","Startups","Web","Mobile"
];

// Função simples para gerar parágrafos longos de texto fictício (~200 palavras)
function generateDescription(category) {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${category} plays a crucial role in modern society, impacting multiple facets of daily life and driving innovation across diverse industries. From practical applications to theoretical explorations, understanding ${category.toLowerCase()} opens doors to creativity, efficiency, and problem-solving. Advances in ${category.toLowerCase()} are constantly reshaping the way we communicate, learn, and interact with technology. Professionals and enthusiasts alike invest time in mastering skills related to ${category.toLowerCase()}, which includes analyzing data, developing solutions, and contributing to groundbreaking projects. Educational programs, workshops, and online platforms provide ample resources for anyone eager to explore ${category.toLowerCase()} in depth, fostering a community of knowledge-sharing and collaboration. Moreover, ${category.toLowerCase()} intersects with other fields, enabling interdisciplinary growth and innovation. Continuous learning and adaptability are essential, as ${category.toLowerCase()} evolves rapidly, demanding new approaches, methodologies, and tools. Ethical considerations, sustainability, and accessibility are becoming increasingly important in shaping the future of ${category.toLowerCase()}. Engaging with ${category.toLowerCase()} not only enhances professional opportunities but also encourages personal growth, critical thinking, and creative exploration. The impact of ${category.toLowerCase()} is visible in everyday experiences, from communication platforms and software solutions to smart devices and automated systems. Understanding trends, adopting best practices, and leveraging technological tools in ${category.toLowerCase()} empower individuals and organizations to innovate responsibly. Collaboration, experimentation, and continuous improvement are key drivers of success in the field of ${category.toLowerCase()}, ensuring that both learners and practitioners stay ahead in a competitive and fast-paced environment.`;
  
  // Dividir em parágrafos de aproximadamente 60 palavras cada
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

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'');
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

  fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2));
  console.log('Arquivo categories.json gerado com sucesso!');
}

generateCategories();
