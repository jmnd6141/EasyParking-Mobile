
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Vérifiez bien ce package
import { useNavigation } from '@react-navigation/native';

export default function GoBack(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40, // Hauteur standard d'une AppBar
    paddingHorizontal: 80,
    elevation: 0, // Ajout d'une ombre pour un effet visuel
  },
  backButton: {
    
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
