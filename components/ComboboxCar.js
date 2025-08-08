import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Combobox({ label, data, selectedValue, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setIsOpen(false);
    onValueChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.combobox}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectedText}>{selectedValue}</Text>
        <FontAwesome name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#4FA3D1" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '85%',
  },
  label: {
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  combobox: {
    backgroundColor: '#1E242D',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#4FA3D1',
  },
  selectedText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdown: {
    width: '80%',
    backgroundColor: '#1E242D',
    borderRadius: 10,
    padding: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4FA3D1',
  },
  itemText: {
    color: '#FFF',
    fontSize: 16,
  },
});
