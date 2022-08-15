import React from 'react'
import Image from 'next/image';
import {formatearDinero} from '../helpers';
import useQuiosco from '../hooks/useQuiosco';
function Producto({producto}) {
    const {nombre, precio, imagen, id} = producto;

    const {handleChangeProducto, handleChangeModal} = useQuiosco();

  return (
    <div className='border p-3'>
        <Image
            alt={`Imagen ${nombre}`}
            src={`/assets/img/${imagen}.jpg`}
            width={200}
            height={250}
        />
        <div className='p-5'>
            <h3 className='text-2xl font-bold'>{nombre}</h3>
            <p className='mt-5 font-black text-4xl text-amber-500'>{formatearDinero(precio)}</p>
            <button type='button' className='p-3 w-full text-center bg-indigo-600 hover:bg-indigo-900 transition-all mt-4 text-white uppercase font-bold' onClick={ () => {
              handleChangeProducto(producto)
              handleChangeModal()
            }}>Agregar</button>
        </div>
    </div>
  )
}

export default Producto