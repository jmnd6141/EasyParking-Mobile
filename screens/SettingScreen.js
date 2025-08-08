import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Logo from '../components/LogoAndTitle';
import ProfileLocationCard from '../components/ProfileLocationCard';
import ChampField from '../components/ChampField';
import Button from '../components/Button';
import Bar from '../components/PresentationBar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, logout } from '../redux/features/userSlice';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#%!]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  const handleUpdatePassword = () => {
    if (!currentPassword.trim() || !newPassword.trim()) {
      return Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
    }

    if (currentPassword === newPassword) {
      return Alert.alert(
        'Erreur',
        'Le nouveau mot de passe doit être différent de l’ancien.'
      );
    }

    if (!validatePassword(newPassword)) {
      return Alert.alert(
        'Erreur',
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial (#, %, !).'
      );
    }

    try {
      dispatch(updatePassword(newPassword)); 
      Alert.alert('Succès', 'Mot de passe mis à jour avec succès.');
      setCurrentPassword('');
      setNewPassword('');
      return navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la mise à jour du mot de passe.'
      );
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigation.replace('ConnectScreen'); 
    } catch (error) {
      console.log(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <ProfileLocationCard
        style={styles.topSection}
        title="Bienvenue"
        information={user}
        icon="account"
      />
      <Bar title="Paramètre(s)" />

      <ChampField
        titleLabel="Mot de passe actuel"
        titleField="********"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <ChampField
        titleLabel="Nouveau mot de passe"
        titleField="********"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button
        title="Mettre à jour le mot de passe"
        color="#52889F"
        onPress={handleUpdatePassword}
      />

      <Button
        title="Voir mes véhicules"
        color="#4FA3D1"
        onPress={() => navigation.navigate('CarScreen')}
      />
      <Button
        title="Se déconnecter"
        color="red"
        onPress={handleLogout}
      />
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
});
