import Fastify from 'fastify'
import { Pool } from 'pg'
const servidor = Fastify()
const sql = new Pool({
 user: 'postgres',
 password: 'senai',
 host: 'localhost',
 port: 5432,
 database: 'produtos_db'
});



//teste server no get
servidor.get('/', () => {
 return 'Olá! A API de produtos está funcionando corretamente.'
});

//ROTAS
servidor.get('/list', async (request, reply) => {
    try {
      // Troque 'sua_tabela' pelo nome da tabela que você vê no pgAdmin
      const resultado = await sql.query('SELECT * FROM "produtos" LIMIT 10');
      
      // No PostgreSQL, os dados sempre ficam dentro de .rows
      return reply.status(200).send(resultado.rows);

    } catch (erro) {
      servidor.log.error(erro);
      return reply.status(500).send({ erro: 'Falha ao buscar dados no PostgreSQL' });
      
    }
  });



servidor.listen({
 port: 3000
});
