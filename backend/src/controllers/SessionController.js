/* Metodo de login da ong*/
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;/* buscar o id atraves do corpo da aplicação */

        /* vamos fazer a busca da ong no banco de dados atraves do id retornando 
        o nome dessa ong e apenas um unico valor com "first" */
        const ong = await connection('ongs')
            .where('id', id).select('name').first();

        if (!ong) {
            /* Status bad request ou seja que algo deu errado "400" */
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }/* se não retorna a ONG que no caso é o seu nome */
        return response.json(ong);
    }
}