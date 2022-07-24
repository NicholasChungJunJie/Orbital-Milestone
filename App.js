import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store/store';
import { useEffect } from 'react';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import { useSelector, useDispatch } from 'react-redux';
import { addname, addnumber1, addnumber2, addnumber3, getipaddress } from './src/store/account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
let USERNAME = '@username';
let NUMBER1 = '@number1';
let NUMBER2 = '@number2';
let NUMBER3 = '@number3';

const App = () => {
    const dispatch = useDispatch();

    const readData = async () => {
        try {
            // const value1 = await AsyncStorage.getItem(USERNAME);
            // const value2 = await AsyncStorage.getItem(NUMBER1);
            // const value3 = await AsyncStorage.getItem(NUMBER2);
            // const value4 = await AsyncStorage.getItem(NUMBER3);
            const ip = await Network.getIpAddressAsync();
            dispatch(getipaddress({input : ip}));
        
            // dispatch(addname({input : value1}));
            // dispatch(addnumber1({input: ( value2 !== null ? JSON.parse(value2) : value2 )})); //parse from string to int
            // dispatch(addnumber2({input : ( value3 !== null ? JSON.parse(value3) : value3 )}));
            // dispatch(addnumber3({input : ( value4 !== null ? JSON.parse(value4) : value4 )}));
          
        } catch (e) {
            alert(`err : ${e}`);
          alert('Failed to fetch the input from storage');
        }
      };

    useEffect(() => {
        readData();
      }, []);

    return (
        <Provider store={store}>
            <AppNavigator />
            <StatusBar style='auto' />
        </Provider>
    );
};

export default Appwrapper = () => {
    return(
        <Provider store={store}> 
            <App />
        </Provider>
    );
}