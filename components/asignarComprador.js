import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet} from 'react-native' 
import {StoreContext} from '../context/storeContext'
import {Select, SelectItem, IndexPath,Layout,Button} from '@ui-kitten/components'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems:'center',
    },
   
});

export const AsignarComprador = ({route: {params}, ...props})=>{

    const {compradores,asignarCompradorAProducto,obtenerCompradoresDeProductos} = useContext(StoreContext);
    const {producto} = params;

    const comprador_id = obtenerCompradoresDeProductos(producto);

    let comprador='';
    let index='';


    if(comprador_id !== undefined){
        for(let i =0 ; i<compradores.length; i++){
            if(compradores[i].id === comprador_id){
                comprador = compradores[i]
                break;
            }
        }
    }
  

    const [selectedIndex, setSelectedIndex] = useState();
    const [displayValue, setDisplayValue] = useState(comprador.nombre);

  

   return ( 
    <View style={styles.container}>
        <Text style={{fontSize:15 , fontWeight:'bold', marginVertical:25}}> Asignar: {producto.title} </Text>
        <Layout>
            <Select style={{minWidth:300}}
            selectedIndex={selectedIndex}
            placeholder='Seleccione un comprador'
            value={displayValue}
            onSelect={index =>{
                 setSelectedIndex(index)
                 setDisplayValue(compradores[index.row].nombre)
                 }}>
                {compradores.map(c=>
                     <SelectItem title={c.nombre} key={c.id}/>
                )}
            </Select>
        </Layout>
        <Button style={{marginVertical:20, minWidth:300}}
                status={'primary'}
                appearance='outline' 
                onPress={()=>{
                asignarCompradorAProducto(compradores[selectedIndex.row],producto)
                }}> Asignar comprador </Button>
    </View>
    )
}


