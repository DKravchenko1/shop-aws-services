require('pg');
require('pg-hstore');
import { Sequelize } from 'sequelize-typescript';
import { ProductItemModel } from '../product-service-models/product-item.model';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  models: [ProductItemModel],
});
