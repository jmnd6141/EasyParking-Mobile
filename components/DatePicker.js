import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ label, date, onChangeDate }) {
  const [showPicker, setShowPicker] = useState(false); // Contrôle l'affichage du date picker

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false); // Masque le picker après la sélection
    if (selectedDate) {
      onChangeDate(selectedDate); // Passe la date au composant parent
    }
  };

  const formatDate = (date) => {
    if (!date) return 'JJ/MM/AAAA';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label || 'Sélectionnez une date'}</Text>
      <Text style={styles.dateText}>{formatDate(date)}</Text>
      <Button title="Choisir une date" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={date || new Date()} // Utilise la date actuelle comme valeur par défaut
          mode="date" // Mode pour sélectionner uniquement la date
          display="default" // Affichage par défaut du date picker
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '82%',
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dateText: {
    backgroundColor: '#151A23',
    borderRadius: 25,
    padding: 12,
    color: 'white',
    borderWidth: 1,
    borderColor: '#4FA3D1',
    textAlign: 'center',
  },
});
