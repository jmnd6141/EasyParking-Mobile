// HomeScreen.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileLocationCard from '../components/ProfileLocationCard';
import MapScreen from './MapScreen';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const user = useSelector((state) => state.user.username);
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#FFF' }}>Chargement des données utilisateur...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header fixe */}
      <View style={styles.header}>
        <ProfileLocationCard
          style={styles.topSection}
          onPress={() => navigation.navigate('SettingScreen')}
          title="Bienvenue"
          information={user}
          icon="account"
        />
      </View>

      {/* Zone map qui prend tout le reste */}
      <View style={styles.mapWrapper}>
        <MapScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#151A23' },
  center: { justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 70,
    paddingBottom: '5%',
  },

  // 👉 c'est CETTE vue qui donne l'espace à la map
  mapWrapper: {
    flex: 1,
    width: '100%',
    marginTop:20,
  },
});
