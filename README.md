# Generator Random Datas

**- Iniciar projeto em node.js**
```bash
 λ npm init -y
 λ npm install bcrypt

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

**- Usar library para gerar dados**
```bash
 λ npm install @faker-js/faker bcryptjs

 ```