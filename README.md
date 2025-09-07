# Multi-Database Data Generator

A Node.js script for generating sample data for MySQL, PostgreSQL, and MongoDB databases.

## Features

- Generates sample data for authors, categories, articles, newsletters, and visitors
- Exports data to JSON, SQL, and MongoDB-compatible formats
- Configurable data quantities
- Ensures foreign key consistency across all datasets

## Installation

```bash
λ npm install
```

## Usage

```bash
λ npm run start
```

## Setting Up a Local Repository

```bash
λ git init
λ touch .gitignore
λ echo "/node_modules" >> .gitignore
λ echo "package-lock.json" >> .gitignore
λ git branch -m main
λ git add .
λ git commit -m "Initial commit"
```

## Creating a Remote Repository

```bash
λ gh repo create <repo-name> --public --source=. --remote=origin
```

## Tagging the Initial Release

```bash
λ git tag                # List existing tags
λ git tag -a v1.0.0 -m "Initial release: Data generator for MySQL, PostgreSQL and MongoDB"
λ git push -u origin main --tags
λ git tag -d v1.0.0      # Delete local tag
λ git push --delete origin v1.0.0   # Delete remote tag
```

## Como usar

1. Abra o arquivo `generateFaker.js` e defina a quantidade de registros em `CONFIG`.
2. Abra um terminal e execute:

```bash
λ node start
```

3. Será gerada uma pasta com tabelas e dados para MongoDB, MySQL e PostgreSQL.