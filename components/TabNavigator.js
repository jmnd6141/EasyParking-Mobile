import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConnectScreen from '../screens/ConnectScreen';
import SettingScreen from '../screens/SettingScreen';
import CarScreen from '../screens/CarScreen';
import ParkingDetailsScreen from '../screens/ParkingDetailsScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function TabNavigator () {
  return (
    <Stack.Navigator initialRouteName="ConnectScreen" screenOptions={{headerShown: false,}}>
        <Stack.Screen  name="ConnectScreen" component={ConnectScreen}/>  
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="SettingScreen" component={SettingScreen}/>
        <Stack.Screen name="CarScreen" component={CarScreen}/>
        <Stack.Screen name="ParkingDetailsScreen" component={ParkingDetailsScreen}/>
    </Stack.Navigator>
  );
}
