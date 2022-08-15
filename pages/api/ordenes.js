import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
  if(req.method === 'POST'){
    const orden = await prisma.orden.create({
        data: {
            pedido: req.body.pedido,
            nombre: req.body.nombre,
            total: req.body.total,
            fecha: req.body.fecha,
        }
    });
    res.json({orden})
  }
}
