/* cadastro da ONG: */
const crypto = require('crypto');

/* aqui estamos importando a conexão criada na pasta database */
const connection = require('../database/connection');

module.exports = {

    /* Metodo listar */
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    /* Metodo cadastrar */
    async create(request, response) {
        /* Assim garantimos que o usuario não preencha um campo inválido*/
        const { name, email, whatsapp, city, uf } = request.body;

        /* vai gerar um id randomico com 4 posições e hexdecimal convertendo para string  */
        const id = crypto.randomBytes(4).toString('HEX');
        /* com o 'await' quando chegar nessa parte o node vai aguardar o codigo finalizar o insert
        no caso para ai então continuar a execução do codigo */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });/* retornaremos ao usuario o seu id*/
    }
};