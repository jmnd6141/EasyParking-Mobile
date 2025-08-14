import { useState } from 'react';
import { View, StyleSheet, Alert,  KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../components/LogoAndTitle';
import ProfileLocationCard from '../components/ProfileLocationCard';
import ChampField from '../components/ChampField';
import Button from '../components/Button';
import Bar from '../components/PresentationBar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {logout as LogoutRedux } from '../redux/features/userSlice';
import { modifyPassword } from '../apiCalls/modifyPassword';
import { logout } from '../apiCalls/login';
import GoBack from '../components/GoBack';

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

  const handleUpdatePassword = async () => {
    const next = newPassword.trim();

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
      await modifyPassword({  username: user, newPassword: next });
      Alert.alert('Succès', 'Mot de passe mis à jour avec succès.');
      setCurrentPassword('');
      setNewPassword('');
      await handleLogout();
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la mise à jour du mot de passe.'
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(LogoutRedux());
      navigation.replace('ConnectScreen'); 
    } catch (error){
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 5, android: 0 })} 
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style ={styles.goBack}>
            <GoBack />
          </View>
        </View>
        <View style={styles.logoWrapper}>
            <Logo />
          </View>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#151A23',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151A23',
  },
  header: {
    flexDirection: 'row',       
    alignItems: 'left',    
    width: '100%',
    marginTop: -100,
    marginLeft: -100,     
    position: 'relative',
  },
  goBack : {
    marginTop: 100,   
    position: 'relative',
    
  }
});
