import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@ui-kitten/components';
import Tarjeta from './tarjeta';
import {StoreContext} from '../context/storeContext';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Listar = ({...props}) => {
  const {productos} = useContext(StoreContext);
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      {productos.length > 0 ? (
        <ScrollView>
          {productos.map((producto) => (
            <Tarjeta
              titulo={producto.title}
              precio={producto.price}
              onPressVerDetalles={() => {
                navigator.navigate(screens.detalle, {producto});
              }}
              onPressComprar={()=>{
                navigator.navigate(screens.asignarComprador, {producto});
              }}
              key={producto.id}
            />
          ))}
        </ScrollView>
      ) : (
        <Text category="h3" status="info">
          Cargando productos disponibles...
        </Text>
      )}
    </View>
  );
};

export default Listar;
