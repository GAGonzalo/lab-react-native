import React, {useContext} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../context/storeContext';
import Comprador from './comprador';

export const VerCompradores = ()=>{

    const navigator = useNavigation();
    const {compradores,eliminarComprador} = useContext(StoreContext);

    const modificar=(comprador)=>{
        navigator.navigate(screens.modificarComprador,{modificar:true, comprador})
    }

    return (
    <View style={styles.container}>
       <ScrollView>
           {compradores.map((c)=>(
           <Comprador nombre={c.nombre} email={c.email} key={c.id} onPressEliminar={()=>{eliminarComprador(c)}} onPressModificar={()=>{modificar(c)}}/>
           ))}
       </ScrollView>
    </View>
    );

    
}


const styles = StyleSheet.create({
    container: {
        flex:1
    },
    
});