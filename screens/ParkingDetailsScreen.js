import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import ParkingCard from '../components/ParkingCard';
import * as Location from 'expo-location';
import { getParkingID, updateParking } from '../apiCalls/getAllParkings';
import * as SecureStore from 'expo-secure-store';
import GoBack from '../components/GoBack';

const ACTIVE_KEY = 'active_reservation_pid';

export default function ParkingDetailsScreen({ route }) {
  const { parking } = route.params;
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState(parking.places ?? 0);
  const [saving, setSaving] = useState(false);

  const pid = String(parking.parking_id);
  
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (a) => (a * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const fresh = await getParkingID(parking.parking_id);
        if (mounted && typeof fresh?.places === 'number') {
          setAvailablePlaces(fresh.places);
        }
      } catch {}

      try {
        const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
        if (mounted) setIsReserved(activePid === pid);
      } catch {}

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission refusée', "Impossible d'accéder à la localisation.");
          return;
        }
        const current = await Location.getCurrentPositionAsync({});
        const [lat, lon] = (parking.coordinates || '')
          .split(',')
          .map((s) => Number(String(s).trim()));

        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          const d = haversine(current.coords.latitude, current.coords.longitude, lat, lon);
          setDistance(d.toFixed(1));
          setTravelTime(((d / 40) * 60).toFixed(1));
        } else {
          setDistance(null);
          setTravelTime(null);
        }
      } catch {
        Alert.alert('Erreur', 'Impossible de récupérer la localisation.');
      }
    };

    load();
    return () => { mounted = false; };
  }, [parking.parking_id, pid]);

  const handleReservation = async () => {
    if (!isReserved) {
      try {
        const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
        if (activePid && activePid !== pid) {
          Alert.alert('Réservation existante', 'Vous avez déjà réservé dans un autre parking.');
          return;
        }
      } catch {}
    }

    const prevReserved = isReserved;
    const prevCount = availablePlaces;

    let nextReserved = prevReserved;
    let nextCount = prevCount;

    if (!isReserved) {
      if (prevCount <= 0) {
        Alert.alert('Erreur', 'Aucune place disponible.');
        return;
      }
      nextReserved = true;
      nextCount = prevCount - 1;
    } else {
      nextReserved = false;
      nextCount = prevCount + 1;
    }

    setSaving(true);
    setIsReserved(nextReserved);
    setAvailablePlaces(nextCount);

    try {
      if (nextReserved) {
        await SecureStore.setItemAsync(ACTIVE_KEY, pid);
      } else {
        const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
        if (activePid === pid) {
          await SecureStore.deleteItemAsync(ACTIVE_KEY);
        }
      }
    } catch {}

    try {
      await updateParking({ parking_id: parking.parking_id, places: nextCount });
    } catch (e) {
      setIsReserved(prevReserved);
      setAvailablePlaces(prevCount);

      try {
        if (prevReserved) {
          await SecureStore.setItemAsync(ACTIVE_KEY, pid);
        } else {
          const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
          if (activePid === pid) {
            await SecureStore.deleteItemAsync(ACTIVE_KEY);
          }
        }
      } catch {}

      const status = e?.status || e?.response?.status || 'inconnu';
      const raw = e?.data || e?.response?.data;
      const msg = typeof raw === 'string' ? raw : raw?.message || "Échec de la mise à jour du parking.";
      console.log('PATCH /parking error =>', status, raw);
      Alert.alert(`Erreur ${status}`, String(msg));
    } finally {
      setSaving(false);
    }
  };

  const openItinerary = async (lat, lon) => {
    const wazeUrl = `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;
    try {
      const hasWaze = await Linking.canOpenURL(wazeUrl);
      if (hasWaze) return Linking.openURL(wazeUrl);
      const hasMaps = await Linking.canOpenURL(mapsUrl);
      if (hasMaps) return Linking.openURL(mapsUrl);
      Alert.alert('Erreur', 'Aucune application de navigation disponible.');
    } catch {
      Alert.alert('Erreur', 'Impossible d’ouvrir l’itinéraire.');
    }
  };

  const handleItinerary = () => {
    const [lat, lon] = parking.coordinates.split(',').map(Number);
    openItinerary(lat, lon);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
            <View style ={styles.goBack}>
            <GoBack />
            </View>
            </View>
      <ParkingCard
        title={parking.name}
        info=""
        distance={distance ? `${distance} km` : 'N/A'}
        travelTime={travelTime ? `${travelTime} min` : 'N/A'}
        freePlaces={availablePlaces == null ? '...' : `${availablePlaces} libres`}
        opening={parking.opening}
        isReserved={isReserved}
        onReserve={handleReservation}
        onItinerary={handleItinerary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#151A23' },
    header: {
    flexDirection: 'row',       
    alignItems: 'left',    
    width: '100%',
    marginTop: -100,
    marginLeft: -100,     
    position: 'relative',
  },
  goBack : {
    marginTop: 100,   
    position: 'relative',
    
  }
});
