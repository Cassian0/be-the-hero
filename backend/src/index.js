/**
 * Rotas = é o que utlizamos para acessar os recursos da nossa aplicação
 * Recursos = associado a uma tabela no banco ou entidade 
 */

/**
 * Métodos HTTP:
 * GET = utilizamos quando queremos buscar/listar uma informação do back-end 
 * POST = utilizado quando queremos criar uma informação no back-end
 * PUT = utilizado para alterar uma informação no back-end
 * DELETE = utlizado para deletar uma informação no back-end
 * 
 */  

/**
 * Tipos de Parâmetros:
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursosn (especificos)
 * Request Body: é corpo da requisição, utlizado para criar ou alterar recursos
 */
/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server (sql é o formato de comunicação do banco)
 * banco mais utilizado
 * NoSQL: MongoDB, CouchDB, etc.( bancos não relacionais)
 */
/**
 * Driver: SELECT * FROM users = já as query são especificas e muitas vezes mudam de banco para banco
 * Query Builder: table('users).select('*').where()...
 * utilizando já o formato do javascript qualquer tipo de banco relacional pode 
 * ser utilizado em nossa aplicação 
 */

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); 


app.listen(3333);
  