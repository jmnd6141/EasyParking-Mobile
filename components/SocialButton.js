import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, icon} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function SocialButton (props) {
    return(
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
            <MaterialCommunityIcons name={props.icon} size={20} color="white" />
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4FA3D1',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 15,
        width: '82%',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
      color: '#FFF',
      fontSize: 16,
      marginLeft: 8,
    },
  });