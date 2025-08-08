import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert,Linking } from 'react-native';
import ParkingCard from '../components/ParkingCard';
import * as Location from 'expo-location';



export default function ParkingDetailsScreen({ route }) {
  const { parking } = route.params;
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState(parking.places);

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const toRad = (angle) => (angle * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission refusée', 'Impossible d\'accéder à la localisation.');
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        const userCoords = currentLocation.coords;

        const [lat, lon] = parking.coordinates.split(',').map(Number);
        const calculatedDistance = haversine(
          userCoords.latitude,
          userCoords.longitude,
          lat,
          lon
        );

        setDistance(calculatedDistance.toFixed(1)); // Mettre à jour la distance
        setTravelTime(((calculatedDistance / 40) * 60).toFixed(1)); // Temps estimé en minutes (vitesse moyenne 40 km/h)
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de récupérer la localisation.');
      }
    })();
  }, [parking]);

  const handleReservation = () => {
    if (!isReserved) {
      if (availablePlaces > 0) {
        setIsReserved(true);
        setAvailablePlaces((prev) => prev - 1);
      } else {
        Alert.alert('Erreur', 'Aucune place disponible.');
      }
    } else {
      setIsReserved(false);
      setAvailablePlaces((prev) => prev + 1);
    }
  };
  
  const openItinerary = async (lat, lon) => {
  // On tente d'ouvrir Waze
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;

  try {
    const wazeSupported = await Linking.canOpenURL(wazeUrl);
    if (wazeSupported) {
      await Linking.openURL(wazeUrl);
      return;
    }

    const mapsSupported = await Linking.canOpenURL(mapsUrl);
    if (mapsSupported) {
      await Linking.openURL(mapsUrl);
      return;
    }
    
    Alert.alert("Erreur", "Aucune application de navigation disponible.");
  } catch (error) {
    Alert.alert("Erreur", "Impossible d’ouvrir l’itinéraire.");
  }
};
  const handleItinerary = () => {
  const [lat, lon] = parking.coordinates.split(',').map(Number);
  openItinerary(lat, lon);
};

  return (
    <View style={styles.container}>
      <ParkingCard
        title={parking.name}
        info=""
        distance={distance ? `${distance} km` : 'N/A'}
        travelTime={travelTime ? `${travelTime} min` : 'N/A'}
        freePlaces={`${availablePlaces} libres`}
        opening={parking.opening}
        isReserved={isReserved}
        onReserve={handleReservation}
        onItinerary={handleItinerary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151A23',
  },
});
