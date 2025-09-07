# Unifaat :: Frontend :: Aula 03 - Servidor vite, framework css, Forms e Listeners <a name="unifaat-frontend-tf-aula03-vite-framework-css-forms-listeners"></a>

## 📑 Sumário
1. [Instalação e Execução](#instalacao-e-execucao)  
2. [📦 Bibliotecas Utilizadas](#bibliotecas-utilizadas)  
3. [📁 Estrutura de Diretórios (raiz)](#estrutura-de-diretorios-raiz)  
4. [🐳 Containers e Imagens Docker](#containers-e-imagens-docker)  

---

## 1. Instalação e Execução <a name="instalacao-e-execucao"></a>

### Siga os passos abaixo para rodar o projeto via Docker:

1. Clonar o repositório:
   ```sh
   git clone https://github.com/luan-tavares/unifaat-frontend-tf-aula03-vite-framework-css-forms-listeners
   ```

2. Entrar na pasta do projeto:
   ```sh
   cd unifaat-frontend-tf-aula03-vite-framework-css-forms-listeners
   ```

3. Instalar pacotes:
   ```sh
   npm install
   ```

4. Subir a aplicação com Docker Compose:

   > Docker Compose tradicional:
   ```sh
   docker-compose up --build
   ```

   > Docker Compose moderno:
   ```sh
   docker compose up --build
   ```

---

## 2. 📦 Bibliotecas Utilizadas <a name="bibliotecas-utilizadas"></a>

- Vite — servidor de desenvolvimento e bundler com HMR (Hot Module Replacement) para projetos web modernos; inicializa rápido e recarrega as mudanças instantaneamente.

---

## 3. 📁 Estrutura de Diretórios (raiz) <a name="estrutura-de-diretorios-raiz"></a>

| Caminho / Pasta        | Descrição                                                                 |
|------------------------|---------------------------------------------------------------------------|
| `docker/`              | Dockerfiles específicos para cada serviço da aplicação.                   |
| `public/`              | Arquivos públicos (como `index.html`) servidos diretamente por HTTP.     |
| `node_modules/`        | Dependências instaladas do Node.js (usadas pelo Vite e app).             |
| `package.json`         | Metadados do projeto e scripts NPM.                                      |
| `package-lock.json`    | Lockfile das dependências NPM.                                           |
| `vite.config.js`       | Configuração do Vite (pode ser `.ts` conforme o projeto).                |
| `docker-compose.yml`   | Orquestração dos containers do projeto.                                   |
| `readme.md`            | Documentação principal do projeto (este arquivo).                         |

---

## 4. 🐳 Containers e Imagens Docker <a name="containers-e-imagens-docker"></a>

### 🗄️ Containers de Infraestrutura

| Container            | Imagem Base      | Função                                                   | Porta Interna |
|----------------------|------------------|----------------------------------------------------------|---------------|
| `nginx-container`    | `nginx:1.25-alpine` | Servir arquivos estáticos HTTP (reverse proxy).        | 80            |
| `nodevite-container` | `node:24`        | Servidor de desenvolvimento Vite com HMR para o frontend.| 5173          |

### 💾 Volumes Persistentes

| Volume                | Utilizado por         | Finalidade                                    |
|----------------------|-----------------------|-----------------------------------------------|
| `node-modules-volume`| `nodevite-container`  | Persistir `node_modules` do ambiente de dev.  |

### 🌐 Redes

Todos os containers estão conectados à rede Docker personalizada:

app_network

### 🌍 Portas Expostas Externamente

| Serviço/Container     | Porta Interna | Porta Externa | Acesso Externo              |
|-----------------------|---------------|---------------|-----------------------------|
| NGINX (`nginx-container`) | 80            | **8080**      | http://localhost:8080       |
| Vite (`nodevite-container`) | 5173         | **5173**      | http://localhost:5173       |
