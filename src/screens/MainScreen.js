import {
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    Pressable,
    TextInput,
    Dimensions,
    Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addname, addnumber1, addnumber2, addnumber3, getipaddress } from '../store/account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';

/**
 * This screen to be changed to a screen which allows appeals through an appeal form.
 */
const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
};

const MainScreen = ({ navigation }) => {
    
    const ipaddress = useSelector(state => state.account.ipaddress);

    return (

        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('submitappeal')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Submit an appeal</Text>
            </Pressable>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#407BFF',
        marginVertical: 10,
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        color: 'white',
    },
    textInput: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#3F3F3F',
        borderRadius: 4,
        width: '60%',
        paddingHorizontal: 8,
        textAlign: 'center',
        marginBottom: 10
    },
});
