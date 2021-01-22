import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import { addons } from 'react-native';

export const API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});

  const [compradores, setCompradores] = useState([
    {nombre:'Comprador 1', email:'E-mail 1' , id: Math.random().toString(10)},
    {nombre:'Comprador 2', email:'E-mail 2' , id: Math.random().toString(10)},
    {nombre:'Comprador 3', email:'E-mail 3' , id: Math.random().toString(10)},
    {nombre:'Comprador 4', email:'E-mail 4' , id: Math.random().toString(10)},
  ])

  const [compradoresProductos, setCompradorProducto] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
  
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
      
    }
  };

  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const eliminarComprador= (comprador)=>{
    if(compradores.includes(comprador)){
      const nuevaLista = compradores.filter(c=>c !== comprador);
      setCompradores(nuevaLista);
    }
    else{
      return;
    }
  }

  const modificarComprador = (comprador)=>{
      let nuevaLista = [];
      compradores.forEach((c,index)=>{
        if(c.id === comprador.id){
          nuevaLista.push(comprador);
        }
        else{
          nuevaLista.push(c);
        }
      })
      setCompradores(nuevaLista);
  }

  const asignarCompradorAProducto = (comprador,producto)=>{
  
    const obj = {producto_id: producto.id, comprador_id : comprador.id}


    if(!compradoresProductos.filter(e=>{ return e.producto_id === obj.producto_id}).length){
      const newLista = compradoresProductos.concat([obj]);
      setCompradorProducto(newLista);
    }
    else{
      let newLista = [];
      compradoresProductos.forEach(e=>{
        if(e.producto_id === producto.id){
          e.comprador_id = comprador.id
          newLista.push(e);
        }
        newLista.push(e);
      });
      setCompradorProducto(newLista);
    }
    

  }

  const obtenerCompradoresDeProductos = (producto)=>{
      let obj = compradoresProductos.filter(e=> {return e.producto_id === producto.id});
      if(obj.length) return obj[0].comprador_id;
      else return;
  
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        agregarProductoACategoria,
        quitarProductoDeCategoria,
        obtenerCategoriasDelProducto,
        compradores,
        setCompradores,
        eliminarComprador,
        modificarComprador,
        asignarCompradorAProducto,
        obtenerCompradoresDeProductos
      }}>
      {children}
    </StoreContext.Provider>
  );
};
