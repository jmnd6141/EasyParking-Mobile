import { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../components/LogoAndTitle';
import ProfileLocationCard from '../components/ProfileLocationCard';
import ChampField from '../components/ChampField';
import Button from '../components/Button';
import Bar from '../components/PresentationBar';
import ComboboxCar from '../components/ComboboxCar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, addNewCar } from '../redux/features/carSlice';
import GoBack from '../components/GoBack';

export default function CarScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username); 
  const cars = useSelector((state) => state.cars.items);
  const [newVehicle, setNewVehicle] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [selectedCar, setSelectedCar] = useState('');

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleAddCar = async () => {
    if (!newVehicle.trim() || !licensePlate.trim()) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }

    try {
      await dispatch(addNewCar({ model: newVehicle, licensePlate, username: user })).unwrap();
      Alert.alert('Succès', 'Véhicule ajouté avec succès');
      setNewVehicle('');
      setLicensePlate('');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l’ajout du véhicule.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.select({ ios: 5, android: 0 })} 
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.goBack}>
              <GoBack />
            </View>
          </View>

          <View style={styles.logoWrapper}>
            <Logo />
          </View>

          <ProfileLocationCard
            style={styles.topSection}
            title="Bienvenue"
            information={user}
            icon="car"
          />

          <Bar title="Véhicule(s)" />
          <ComboboxCar
            label="Véhicule actuel"
            data={cars} 
            selectedValue={selectedCar}
            onValueChange={(value) => setSelectedCar(value)}
          />

          <ChampField
            titleLabel="Nouveau véhicule"
            titleField="Modèle du véhicule"
            value={newVehicle}
            onChangeText={setNewVehicle}
          />

          <ChampField
            titleLabel="Plaque d'immatriculation"
            titleField="Plaque d'immatriculation"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />

          <Button title="Ajouter le véhicule" color="#52889F" onPress={handleAddCar} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
   keyboardAvoid: {
    flex: 1,
    backgroundColor: '#151A23',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151A23',
  },
  header: {
    flexDirection: 'row',       
    alignItems: 'flex-start',
    width: '100%',
  },
  goBack: {
    marginTop: 8,
    marginLeft: -55,
  },
  logoWrapper: {
    marginTop: 8,
    marginBottom: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,  
    backgroundColor: '#151A23',
  },
});
