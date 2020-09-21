# ☄️ NOVA [WIP]

Nova is your next database web client and data analysis tool. It's a cross-platform,
good-loking web based app, written in React, Node.js and Docker.

- **Database client:** you will be able to connect to any kind of database, so you'll have all your
  connections in just one place. You can have multiple editors (sessions) with queries that
  are stored in the browser local storage. Currently supported databases: PostgreSQL.
  Soon: MongoDB, ElasticSearch...

- **Data analysis:** sometimes you need to export, process and analyze queries output. NOVA will
  let you export a query into a dataset, so you will be able to apply transformations,
  visualizations... or just download it as a CSV/JSON...

The main idead of using docker is to not to have any dependencies. You just pull and run the
docker image. That's all.

## 📝 Installation

> ⚠️ ⚠️ ⚠️ Warning: NOVA is in beta until the first release (v0.1.0), so please, be careful when using it. We are not responsible of any damage or data lost caused by this tool.

Currently the only way of installing NOVA is clonning the repository, and using docker + docker-compose.

1. Install `docker` and `docker-compose`. [How to install docker in Ubuntu, by Pirobits](https://www.pirobits.com/blog/install-docker-in-ubuntu-19).
2. Install `npm` and `node` 12. [How to install nvm, by Pirobits](https://www.pirobits.com/blog/install-node-and-nvm-in-ubuntu-19).
3. Run the following commands:

   ```
   $ git clone <repo>
   $ cd nova
   $ make init
   $ make up
   ```

4. Open http://localhost:5000/ in your web browser.

## 🔥 Features / Roadmap:

- [x] Support multiple connections.
- [x] Support multiple sessions (editors).
- [x] Persist sessions using browser local storage.
- [x] Shortcuts.
- [x] Syntax highlight editor.
- [ ] Themes.
- [ ] Show DB tables/collections + previsualization.
- [ ] Store connections in API.
- [ ] Refactor and improve connection/session logic.
- [ ] Testing.
- [ ] Prettier and ESlint.
- [ ] Global CSS using styled-components.
- [ ] Execute multiple Query statements in the same operation.
- [ ] Improve API error handling.
- [ ] Datasets: export a Query into a dataset, that you can explore and download (CSV/JSON).
- [ ] GitHub Pages documentation.

### Databases

- [x] Connect to PostgreSQL databases.
- [ ] Connect to MongoDB databases .
- [ ] Connect to ElasticSearch databases.
- [ ] Connect to MySQL/Redis/Other databases.

### Shortcuts

- [x] New connection: ENTER creates the connection.
- [x] Editor: CTRL+ENTER runs the query.

### DevOps

- [x] Docker
- [x] Docker-compose
- [ ] GitHub actions CI/CD.
- [ ] Release using Docker to DockerHub.

## ⚡ Development ports

- 5000: Nginx proxy.
  - / -> Web browser React app.
  - /api -> API backend.
- 5001: React web app.
- 5002: Node.js API.
- 5003: MongoDB.
- 5004: PostgreSQL.

## Author

- Alberto Sola

## Contributors

- Your name can be here! 😎
