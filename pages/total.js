import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import {useState, useEffect, useCallback} from 'react';
import { formatearDinero } from '../helpers';
export default function Total() {
  const {pedido, nombre, total, setNombre, setTotal, colocarOrden} = useQuiosco();


  const comprobarPedido = useCallback(()=>{
    return pedido.length === 0 || nombre === '' || nombre.length < 3
  }, [pedido, nombre]);

  useEffect(()=>{
    comprobarPedido();

  }, [pedido, comprobarPedido])

  return (
    <Layout
        pagina='Total y Confirmar Pedido'
    >
        <h1 className='text-4xl font-black'>Datos y Total</h1>
        <p className='text-2xl my-10'>Confirma tu Pedido a Continuación</p>
        <form onSubmit={ colocarOrden }>
          <div className=''>
            <label htmlFor='nombre' className='block uppercase text-slate-800 form-bold text-xl'>Nombre: </label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' id='nombre' name='nombre' placeholder='Tu Nombre....' className='bg-gray-200 w-full lg:w-1/3 p-2 rounded-md mt-3' />
          </div>
          <div className='mt-10'>
            <p className='text-2xl'>Total a Pagar: <span className='font-bold'>{formatearDinero(total)}</span></p>
          </div>
          <div className='mt-5'>
            <input type='submit' value="Confirmar Pedido" className={`${comprobarPedido() ? 'bg-indigo-100 hover:cursor-not-allowed' : 'bg-indigo-600 hover:cursor-pointer hover:-bg-indigo-900'} p-3 w-full lg:w-auto rounded uppercase font-bold text-white text-center  transition-all`} disabled={comprobarPedido()}/>
          </div>
        </form>
    </Layout>
  )
}

