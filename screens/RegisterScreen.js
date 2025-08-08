import {React, useState, useContext} from 'react';
import { Alert, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../components/GoBack';
import ChampField from '../components/ChampField';
import DatePicker from '../components/DatePicker';
import Button from '../components/Button';
import { register } from '../apiCalls/register'; 
import dayjs from 'dayjs';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState(null);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#%!]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  const resetFields = () => {
    setfirstname('');
    setlastname('');
    setUsername('');
    setpassword('');
    setConfirmPassword('');
    setdateOfBirth(null);
  };

  const handleRegister = async () => {

    if (!firstname.trim() || !lastname.trim() || !username.trim() || !password.trim() || !confirmPassword.trim() || !dateOfBirth) {
      return Alert.alert('Erreur', 'Tous les champs sont obligatoires');
    }

    if (!validatePassword(password)) {
      return Alert.alert(
        'Erreur',
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial (#, %, !)'
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    }

    try {
      const response = await register({
        firstname,
        lastname,
        dateOfBirth,
        username,
        password,
      });

      Alert.alert('Succès', 'Utilisateur enregistré avec succès');

      resetFields();

      navigation.navigate('ConnectScreen');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.registrer}>
        <GoBack title="Inscription"/>
      </View>
      <ChampField titleLabel="Prénom" titleField="********" onChangeText={setfirstname} value={firstname}/>
      <ChampField titleLabel="Nom" titleField="********" onChangeText={setlastname} value={lastname}/>
      <ChampField titleLabel="Utilisateur" titleField="********" onChangeText={setUsername} value={username}/>

      <ChampField titleLabel="Mot de passe" titleField="********" secureTextEntry={true} onChangeText={setpassword} value={password}/>
      <ChampField titleLabel="Confirmer le mot de passe" titleField="********" secureTextEntry={true} onChangeText={setConfirmPassword} value={confirmPassword}/>
      <DatePicker label="Date de naissance" date={dateOfBirth} onChangeDate={setdateOfBirth}/>

      <Text style={styles.frontCondition}>En cliquant sur le bouton Accepter et continuer, vous acceptez 
        les conditions d'utilisation d’Easy Parking et reconnaissez la politique de confidentialité.</Text>
      <Button style={styles.button} color="#4FA3D1" title="Accepter et Continuer" onPress={handleRegister}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151A23',
    paddingTop: '16%',
  },
  registrer: {
    width: '120%',
    height: 80,
  },
  button: {
    marginTop: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  frontCondition: {
    fontSize: 11,
    color: 'white',
    width: '80%',
  },
});
