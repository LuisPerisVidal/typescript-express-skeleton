require('dotenv').config('../../.env');
import {Knex} from 'knex';

const db : Knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
  }
});


export default db;