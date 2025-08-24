# Multi-Database Data Generator

A Node.js script to generate sample data for MySQL, PostgreSQL and MongoDB databases.

## Features

- Generate sample data for authors, categories, articles, newsletters and visitors
- Export to JSON, SQL and MongoDB compatible formats
- Configurable data quantities
- Foreign key consistency across all datasets

## Installation

```bash
npm install
```

- Use assim:

```bash
 λ npm run start
 ```

**- Criar repositório local**
```bash
λ git init
λ touch .gitignore
λ echo "/node_modules" >> .gitignore
λ echo package-lock.json >> .gitignore
λ git branch -m main
λ git add .
λ git commit -m "Initial commit"
```

**- Criar reposito remoto**
```bash
λ gh repo create nome-do-repo --public --source=. --remote=origin
 ```

# Adicionar tag para a versão inicial
```bash
git tag  #ver as tags q existem
git tag -a v1.0.0 -m "Initial release: Data generator for MySQL, PostgreSQL and MongoDB" #add a tag
git push -u origin main --tags #push das tags
git tag -d v1.0.0 #deleta a tag local
git push --delete origin v1.0.0 #deleta remotamente
```