import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ label, date, onChangeDate }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onChangeDate(selectedDate);
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
          value={date || new Date()}
          mode="date"
          display="default"
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
