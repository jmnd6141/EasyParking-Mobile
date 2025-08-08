import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Password(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.titleLabel}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.titleField}
        placeholderTextColor="#777"
        secureTextEntry
        right={<TextInput.Icon icon="eye"/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '82%',
  },
  label: {
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#151A23',
    borderRadius: 25,
    padding: 12,
    color: 'white',
    borderWidth: 1,
    borderColor: '#4FA3D1',
  },
});
