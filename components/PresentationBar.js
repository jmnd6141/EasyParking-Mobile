
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PresentationBar(props){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1E242D',
      width: '90%',
      borderRadius: 100,
      height: '5%',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 15 
    },
    text: {
        textAlign : 'center',
        color : "#777",
    }
})