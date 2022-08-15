import {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
const QuioscoContext = createContext();

function QuioscoProvider({children}) {
    const [categorias, setCategorias] = useState([]);
    const [producto, setProducto] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);


    const router = useRouter();

    async function constularCategorias(){
        try {
          const {data} = await axios('/api/categorias');
          setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        constularCategorias();
    },[])
    
    useEffect(()=>{
        setCategoriaActual(categorias[0]);
    }, [categorias])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal);
    },[pedido])
    

    function handleClickCategoria(id){
        const categoria = categorias.filter(c => c.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/');
    }

    function handleChangeProducto(producto){
        setProducto(producto);
    }
    function handleChangeModal(){
        setModal(!modal);
    }

    function handleAgregarPedido({categoriaId, ...producto}){
        if(pedido.some(p => p.id === producto.id)){
            const pedidoActualizado = pedido.map(p => p.id === producto.id ? producto : p)
            setPedido(pedidoActualizado);
            toast.success('Editado Correctamente')
        }else{
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }
            );
        }
        setModal(false);
    }

    function handleEditarCantidad(id){
        const productoEditar = pedido.filter(p => p.id === id);
        setModal(!modal);
        setProducto(productoEditar[0]);
    }

    function handleEliminarProducto(id){
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
    }

    async function colocarOrden(e){
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/ordenes', {
                pedido,
                nombre, 
                total,
                fecha: Date.now().toString()
            });

            //Reset a la aplicación
            setPedido([]);
            setCategoriaActual(categorias[0]);
            setNombre('');
            setTotal(0);

            toast.success('Pedido Realizado Correctamente...');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.log(error);
        }   
    }


  return (
    <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            handleChangeProducto,
            producto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidad,
            handleEliminarProducto,
            nombre, 
            setNombre, 
            total,
            setTotal,
            colocarOrden
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export {QuioscoProvider}
export default QuioscoContext