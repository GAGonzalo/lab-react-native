import React,{useState} from 'react'
import {View,StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {Comprador} from './comprador'
import {CrearYModificarcomprador} from './crearYmodificarComprador'
import {Button} from '@ui-kitten/components';
import {screens} from '../App';

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    button: {
        margin: 2,
        marginBottom: 10,
        width: 200,
      },
});

export const MenuCompradores = ()=>{
  const navigator = useNavigation();
    
  return (
   <View style={styles.container} >
      <Button style={styles.button} appearance='outline' onPress={()=>navigator.navigate(screens.crearComprador,{modificar:false,comprador:false})}> Crear Comprador </Button>
      <Button style={styles.button} appearance='outline' onPress={()=>navigator.navigate(screens.verCompradores)}> Ver Compradores</Button>
      
   </View>
  );
};

