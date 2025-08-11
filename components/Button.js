
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function Button(props) {
    return(
        <TouchableOpacity style={[styles.button, {backgroundColor: props.color}, props.style]} onPress={props.onPress}>
            <Text style = {styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        width: '82%',
        borderRadius: 25,
    },
      text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    onPress: {
        backgroundColor: 'green',
    }
  });
  