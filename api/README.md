# Argon Fullstack Developer Skill Test API

## How to
- Run `cp .env.example .env` to copy env file
- Fill the `.env` file
- Add your own `service-account.json` to `src` folder for firebase notification
- Make sure you already have RabbitMQ server running
- Run `npx sequelize-cli db:migrate` to run migration
- Run `npx sequelize-cli db:seed:all` to run user admin seeder
- Run `npm run dev` to run the server
- Run `npm run worker` to run RabbiqMQ worker for logging