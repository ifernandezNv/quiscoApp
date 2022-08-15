import React from 'react'
import {useRouter} from 'next/router';
const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'},
]

function Pasos() {
    const router = useRouter();

    function calcularProgreso(){
        let valor;
        if(router.pathname === '/'){
            valor = 15;
        }else if( router.pathname === '/resumen'){
            valor = 50
        }else{
            valor = 100;
        }
        return valor;
    }
  return (
    <>
        <div className='flex justify-between mb-5'>
            {pasos.map(paso => (
                <button className='text-2xl font-bold' onClick={()=>{
                    router.push(paso.url);
                }} 
                type='button' key={paso.paso}>{paso.nombre}</button>
            ))}
        </div>
        <div className='bg-gray-300 mb-10 transition-all'> 
            <div className='rounded-full text-xs bg-amber-500 transition-all leading-none h-2 text-center text-white' 
            style={{width: `${calcularProgreso()}%`}}> 

            </div>
        </div>
    </>
  )
}

export default Pasos