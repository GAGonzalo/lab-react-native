import React , {useState} from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { Input, Button } from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native'
import {screens} from '../App'
import {StoreContext} from '../context/storeContext';

import { max } from 'react-native-reanimated'
import { useContext } from 'react';


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    input: {
        marginHorizontal:50,
        marginVertical:10
      },
})


export const CrearYModificarcomprador = ({route: {params}, ...props})=>{
    const modificar = useState(params.modificar);
    const comprador = useState(params.comprador);

    const {compradores,setCompradores,modificarComprador} = useContext(StoreContext);
    const [nombre, setNombre] = useState(modificar[0] ? comprador[0].nombre : '');
    const [email, setEmail] = useState(modificar[0] ? comprador[0].email : '');
    const navigator = useNavigation();
   
    
    return (
        <View style={styles.container}>
            <Input placeholder='Ingrese Nombre' 
            style={styles.input} 
            defaultValue={nombre} 
            onChangeText={nombre=>{setNombre(nombre)}}
            />
            <Input placeholder='Ingrese E-Mail' 
            style={styles.input} 
            defaultValue={email} 
            onChangeText={email=>{setEmail(email)}}
            />
            <Button onPress={()=>{
                if(nombre.length && email.length){
                  if(!modificar[0]){
                    const c = {id : Math.random(),nombre:nombre,email:email};
                    setCompradores([...compradores,c])
                  }
                  else{
                    const c = {id:comprador[0].id, nombre:nombre, email:email};
                    modificarComprador(c);
                    navigator.goBack();
                  }
                }
            }}>Aceptar</Button>
        </View>
        
    )
}
