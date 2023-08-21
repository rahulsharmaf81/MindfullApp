
// import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import SignupScreen from './src/screens/SignupScreen';
import store from './src/store/redux-store/root_store';
import { Provider } from 'react-redux';
import SplashPage from './src/screens/SplashPage';
import MyDrawer from './src/screens/MyDrawer';
import EncryptedStorage from 'react-native-encrypted-storage';
import DashBoard from './src/screens/DashBoard';
import UserProfile from './src/screens/UserDetails';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
      // EncryptedStorage.clear()
    }, [])
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashPage">
      <Stack.Screen
                  name="SplashPage"
                  component={SplashPage}
                  options={{ headerShown: false }}
                />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpScreen" component={SignupScreen} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="UserDetails" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
