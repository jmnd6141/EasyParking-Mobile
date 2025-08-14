import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChampField from '../components/ChampField';
import SimpleButton from '../components/Button';
import SocialButton from '../components/SocialButton';
import Logo from '../components/LogoAndTitle';
import { saveToken } from '../utils/secureStore'; 
import { setUser } from '../redux/features/userSlice'; 
import { login } from '../apiCalls/login';

export default function ConnectScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    if (!username.trim() || !password.trim()) {
     return Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }

    try {
      const { success, token } = await login(username, password);

      if (success) {
        await saveToken('userToken', token);

        dispatch(setUser({ username, password, token }));

        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Erreur', 'Identifiants incorrects');
      }
    } catch (error) {
      Alert.alert('Erreur',"Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <ChampField
        titleLabel="Utilisateur"
        titleField="***********"
        onChangeText={setUsername}
        value={username}
      />
      <ChampField
        titleLabel="Mot de passe"
        titleField="***********"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <SimpleButton onPress={handleLogin} color="#4FA3D1" title="Continuer" />

      <TouchableOpacity>
        <Text style={styles.password}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <SocialButton title="Continue with Google" icon="google" />
      <SocialButton title="Continue with Apple" icon="apple" />
      <SocialButton title="Continue with Facebook" icon="facebook" />
      <TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('RegisterScreen')}
          style={styles.unforgettable}
        >
          Vous n'avez pas de compte? Inscrivez-vous
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151A23',
  },
  unforgettable: {
    paddingTop: 30,
    fontSize: 12,
    color: 'grey',
  },
  password: {
    fontSize: 14,
    color: '#52889F',
    padding: 10,
    paddingBottom: 20,
  },
});
