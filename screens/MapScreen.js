import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, StyleSheet as RNStyle } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { darkMapStyle } from '../context/MapStyles';
import { getAllParkings } from '../apiCalls/getAllParkings';
import { useNavigation } from '@react-navigation/native';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setLocation(current.coords);
      } catch (e) {
        console.log('ERR loc:', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllParkings(search);
        setParkings(Array.isArray(data) ? data : (data?.rows ?? []));
      } catch (e) {
        console.log('ERR parkings:', e);
        setParkings([]);
      }
    })();
  }, [search]);

  const focusOnParking = (p) => {
    if (!p?.coordinates) return;
    const [lat, lon] = String(p.coordinates).split(',').map(s => Number(String(s).trim()));
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || !mapRef.current) return; 
    mapRef.current.animateCamera(
      { center: { latitude: lat, longitude: lon }, zoom: 16 },
      { duration: 800 }
    );
  };

  useEffect(() => {
    if (search.trim() && parkings.length) {
      focusOnParking(parkings[0]);
    }
  }, [parkings]);

  if (!location) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#FFF' }}>Chargement de la carte…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}                  // 👈 important
        provider={PROVIDER_GOOGLE}
        style={RNStyle.absoluteFillObject}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={darkMapStyle}
        showsUserLocation
        followsUserLocation
      >
        {parkings.map((p) => {
          const [lat, lon] = String(p.coordinates || '')
            .split(',')
            .map(s => Number(String(s).trim()));
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
          return (
            <Marker
              key={p.parking_id ?? p.id ?? `${lat},${lon}`}
              coordinate={{ latitude: lat, longitude: lon }}
              title={p.name}
              description={p.places != null ? `Places disponibles : ${p.places}` : undefined}
              onPress={() => {
                focusOnParking(p);
                navigation.navigate('ParkingDetailsScreen', { parking: p });
              }}
            />
          );
        })}
      </MapView>

      {/* Barre de recherche en overlay */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un parking"
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          // 👇 si tu préfères centrer seulement à "Entrée"
          onSubmitEditing={() => {
            if (parkings.length) focusOnParking(parkings[0]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#151A23' },
  center: { justifyContent: 'center', alignItems: 'center' },
  searchContainer: {
    position: 'absolute',
    top: 8, left: 12, right: 12,
    backgroundColor: '#1E242D',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 46,
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
  },
  searchInput: { color: '#fff', fontSize: 15 },
});
