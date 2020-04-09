/* o Metodo UP = é responsável pela criação da tabela responsavel pela execução da migration*/
exports.up = function (knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();/* torna o campo id da tabela em chave primaria*/
        table.string('name').notNullable();/* Esse campo não pode ser nulo(notNulable) */
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();/* quando já sabemos o tamanho do campo ja podemos especifica-lo que no caso"2"*/
    });
};
/* o metodo DOWN utlizado quando precisamos voltar a tabela quando algo da errado ou seja deleta-la */
exports.down = function (knex) {
    return knex.schema.dropTable('ongs');
};
