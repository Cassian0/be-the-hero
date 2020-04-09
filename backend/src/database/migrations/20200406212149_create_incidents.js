
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        /* Abaixo sera incrementado a parte relacional do nosso banco
        onde ongs possuem casos(incidents) */
        table.string('ong_id').notNullable();
        /* criação da nossa chave estrangeira onde a coluna ong_id referencia a coluna id da tabela ongs */
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};    
