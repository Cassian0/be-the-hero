const connection = require('../database/connection');

module.exports = {

    /* Metodo Listar */
    async index(request, response) {
        const { page = 1 } = request.query;/* realizando a busca da pagina 1 */

        /* Buscar total de casos em nosso banco*/
        const [count] = await connection('incidents').count();

        /*console.log(count);Ver qual é o retorno*/

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)/* limitar a busca para 5 registros por vez */
            .offset((page - 1) * 5)/* apos listar os 5 registros vai ser pulado para a segunda pagina apresentando mais 5 registros */
            .select([
                'incidents.*', /* nos casos vamos trazer todos os dados do banco(*) */
                'ongs.name', /*ja das ongs queremos campos especificos como nome */
                'ongs.email', /* email */
                'ongs.whatsapp',/* whatsapp */
                 'ongs.city', /* cidade */
                 'ongs.uf'/* estado */
                ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    /*Metodo cadastrar */
    async create(request, response) {
        const { title, description, value } = request.body;

        /* headers = cabeçalho guarda informações do contexto da nossa requisição 
        geralmente relacionado a dados de autenticação do usuario, da localização, dados sobre o idioma*/
        const ong_id = request.headers.authorization;

        /* primeiro valor do array vai ser armazenado na variavel id que é o id da ong que cadastrou
        esse caso */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({ id });
    },

    /* Metodo deletar */
    async delete(request, response) {
        const { id } = request.params;/* vai buscar o id que foi passado como parametro pela rota */
        const ong_id = request.headers.authorization;/* buscar o id da ong logada */

        /* Vai buscar no banco o id que corresponde ao que foi repassado */
        const incident = await connection('incidents')
            .where('id', id)/* Onde id é igual ao id passado como parametro de rota */
            .select('ong_id')/* vai trazer o id da ong */
            .first() /* retorna apenas um resultado */

        /* Se o ong_id que esta no nosso banco for diferente do ong_id que esta logado... */
        if (incident.ong_id != ong_id) {
            return response.status(401)/* 401 = não autorizado */
                .json({ error: 'Operation not permitted.' });
        }/* se não */
        await connection('incidents').where('id', id).delete();/* deletar caso */

        return response.status(204).send();/* 204 = retorna uma resposta sem conteudo */
    }
}; 