import { Provider } from 'react-redux';
import store from './redux/store';
import TabNavigator from './components/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
