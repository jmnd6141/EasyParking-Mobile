import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert, Linking, Platform } from 'react-native';
import ParkingCard from '../components/ParkingCard';
import * as Location from 'expo-location';
import { getParkingID, updateParking } from '../apiCalls/getAllParkings';
import * as SecureStore from 'expo-secure-store';
import GoBack from '../components/GoBack';
import * as Notifications from 'expo-notifications';

const ACTIVE_KEY = 'active_reservation_pid';
const START_AT_KEY = 'active_reservation_started_at'; 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ParkingDetailsScreen({ route }) {
  const { parking } = route.params;
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState(parking.places ?? 0);
  const [elapsedText, setElapsedText] = useState(''); 
  const pid = String(parking.parking_id);

  const timerRef = useRef(null); 

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

  const formatElapsed = (ms) => {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  const startTimer = async (startedAtMs) => {
    stopTimer();
    setElapsedText(formatElapsed(Date.now() - startedAtMs));
    timerRef.current = setInterval(() => {
      setElapsedText(formatElapsed(Date.now() - startedAtMs));
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsedText('');
  };

  const notify = async (title, body) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: { title, body},
        trigger: null,

      });
    } catch {}
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT,
          });
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    let isScreenActive = true;

    const load = async () => {
      try {
        const fresh = await getParkingID(parking.parking_id);
        if (isScreenActive && typeof fresh?.places === 'number') {
          setAvailablePlaces(fresh.places);
        }
      } catch {}

      try {
        const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
        const startedAt = await SecureStore.getItemAsync(START_AT_KEY);
        const mine = activePid === pid;
        if (isScreenActive) {
          setIsReserved(mine);
          if (mine && startedAt && Number.isFinite(Number(startedAt))) {
            startTimer(Number(startedAt));
          } else {
            stopTimer();
          }
        }
      } catch {}

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return Alert.alert(
            'Localisation indisponible', "Impossible de récupérer votre position.");
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
        Alert.alert('Localisation indisponible', "Impossible de récupérer votre position.");
      }
    };

    load();
    return () => {
      isScreenActive = false;
      stopTimer();
    };
  }, [parking.parking_id, pid]);

  const handleReservation = async () => {
    if (!isReserved) {
      try {
        const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
        if (activePid && activePid !== pid) {
          return Alert.alert('Réservation existante', 'Vous avez déjà réservé dans un autre parking.');
        }
      } catch {}
    }

    const prevReserved = isReserved;
    const prevCount = availablePlaces;

    let nextReserved = prevReserved;
    let nextCount = prevCount;

    if (!isReserved) {
      if (prevCount <= 0) {
        return Alert.alert('Erreur', 'Aucune place disponible.');
      }
      nextReserved = true;
      nextCount = prevCount - 1;
    } else {
      nextReserved = false;
      nextCount = prevCount + 1;
    }

    setIsReserved(nextReserved);
    setAvailablePlaces(nextCount);

    try {
      if (nextReserved) {
        const startedAt = Date.now();
        await SecureStore.setItemAsync(ACTIVE_KEY, pid);
        await SecureStore.setItemAsync(START_AT_KEY, String(startedAt));
        startTimer(startedAt);
        notify('Place réservée', `Votre place au parking "${parking.name}" est confirmée.`);
      } else {
        const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
        if (activePid === pid) {
          await SecureStore.deleteItemAsync(ACTIVE_KEY);
          await SecureStore.deleteItemAsync(START_AT_KEY);
        }
        stopTimer();
        notify('Réservation annulée', `Votre réservation au parking "${parking.name}" est annulée.`);
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
          const prevStart = await SecureStore.getItemAsync(START_AT_KEY);
          if (prevStart) startTimer(Number(prevStart));
        } else {
          const activePid = await SecureStore.getItemAsync(ACTIVE_KEY);
          if (activePid === pid) {
            await SecureStore.deleteItemAsync(ACTIVE_KEY);
            await SecureStore.deleteItemAsync(START_AT_KEY);
          }
          stopTimer();
        }
      } catch {}

      const status = e?.status || e?.response?.status || 'inconnu';
      const raw = e?.data || e?.response?.data;
      const msg = typeof raw === 'string' ? raw : raw?.message || "Échec de la mise à jour du parking.";
      Alert.alert(`Erreur ${status}`, String(msg));
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
        <View style={styles.goBack}>
          <GoBack />
        </View>
      </View>

      <ParkingCard
        title={parking.name}
        info={isReserved && elapsedText ? `Temps écoulé : ${elapsedText}` : ''}
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
  goBack: {
    marginTop: 100,
    position: 'relative',
  },
});
