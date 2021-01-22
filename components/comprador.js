import React from 'react';
import {Button, Card, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

;

const Comprador = ({nombre,email,onPressEliminar,onPressModificar})=>{
    return(
        <Card style={styles.card} footer={(props)=> <Footer {...props} onPressEliminar={onPressEliminar} onPressModificar={onPressModificar} /> } >
            <View style = {styles.tituloContainer}>
                <Text style = {styles.titulo}> {nombre} </Text>
            </View>

            <Text style= {styles.email}> {email} </Text>
        </Card>
    );

}

const Footer = ({onPressEliminar,onPressModificar}) => (
    <View  style={styles.footerContainer}>
    <Button style={styles.footerControl} size='small' status='danger' onPress={onPressEliminar} >
      Eliminar 
    </Button>
    <Button style={styles.footerControl} size='small' status='info' onPress={onPressModificar} >
      Modificar
    </Button>
  </View>
  );


  const styles = StyleSheet.create({
    tituloContainer: {
      flexDirection: 'column',
      marginBottom: 10,
    },
    botonesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    titulo: {
      fontSize: 20,
      fontWeight: 'bold', 
      alignSelf:'center'
    },
    email: {
      fontSize: 15,
      alignSelf: 'center'
    },
    card: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical:10,
        padding:10
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerControl: {
        margin: 5,
        alignSelf:'center'
    },
  })

export default Comprador;