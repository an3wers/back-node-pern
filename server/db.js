// Подключение к базе данных
import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'

console.log('@', process.env.POSTGRES_HOST)

export default new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
  }  
)
