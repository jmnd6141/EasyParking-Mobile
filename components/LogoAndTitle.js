import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LogoAndTitle() {
  return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
               <Image
                 source={require('../assets/icons/logo.png')} 
                 style={styles.logo}
               />
               <Text style={styles.title}>Easy Parking</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  logo: {
    width: 55,  
    height:55,
  },
  title: {
    color: '#4FA3D1',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
  },
});
