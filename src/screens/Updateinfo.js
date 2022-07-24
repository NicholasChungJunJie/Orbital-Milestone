import {
    StyleSheet,
    Button,
    Text,
    View,
    ScrollView,
    Image,
    Pressable,
    TextInput,
    Dimensions,
    Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addname, addnumber1, addnumber2, addnumber3 } from '../store/account';
import { ListComponent } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
let USERNAME = '@username';
let NUMBER1 = '@number1';
let NUMBER2 = '@number2';
let NUMBER3 = '@number3';

/**
 * This screen will be scraped due to restructuring of project and downgrading to Project Gemini level
 */

const updateinfo = ({ navigation }) => {
    const dispatch = useDispatch();
    const name = useSelector(state => state.account.name);
    const num1 = useSelector(state => state.account.number1);
    const num2 = useSelector(state => state.account.number2);
    const num3 = useSelector(state => state.account.number3);

    var [Name, setName] = useState(null);
    var [Number1, setNumber1] = useState(0);
    var [Number2, setNumber2] = useState(0);
    var [Number3, setNumber3] = useState(0);

    const saveData = async () => {
        try {
            if(Name != null){
                await AsyncStorage.setItem(USERNAME, Name)
            }
            if(Number1 !== null) {
                await AsyncStorage.setItem(NUMBER1, JSON.stringify(Number1)) //use stringify as asyncstorage only store value type 'string'
            }
            if(Number2 !== null) {
                await AsyncStorage.setItem(NUMBER2, JSON.stringify(Number2))
            }
            if(Number3 !== null) {
                await AsyncStorage.setItem(NUMBER3, JSON.stringify(Number3))
            }
            alert('Data successfully saved')
        } catch (e) {
            alert(`err: ${e}` );
            alert('Failed to save the data to the storage. Please try again.')
        }
    }

    const saveinfo = () => {
        if( Name == 'null' || Name == null || typeof Name == 'undefined' || typeof Name == null  /* typeof Name === 'undefined' || Name === null || Name === 'null' */ ) {
            //setName(name);
            Name = name;
        }
        if(Number1 === null || Number1 == 0 ) {
            //setNumber1(num1);
            Number1 = num1;
        }
        if(Number2 === null || Number2 == 0 ) {
            //setNumber1(num1);
            Number2 = num2;
        }
        if(Number3 === null || Number3 == 0 ) {
            //setNumber1(num1);
            Number3 = num3;
        }
        // console.log(Name + ' ' + name + " " + Number1 + " " + num1);
        dispatch(addname({input : Name}));
        dispatch(addnumber1({input: Number1}));
        dispatch(addnumber2({input : Number2}));
        dispatch(addnumber3({input : Number3}));
        saveData();
        navigation.goBack();
    }
    return (

        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{marginBottom: 20}}>
                <Text style={{marginBottom: 0, fontSize: 20, fontWeight: 'bold'}}>{'Name:'}</Text>
                <Text style={styles.name}>{`${name}`}</Text>
                <TextInput
                    label = "Name"
                    value={Name}
                    onChangeText={setName}
                    style={styles.textInput}
                    keyboardType='default'
                    placeholder= {`${name}`}
                    defaultValue = {`${name}`}
                />
            </View>
            <View style={{marginBottom: 20}}>
                <Text style={{marginBottom: 20, fontSize: 20, fontWeight: 'bold'}}>{'Point of Contacts'}</Text>
                <Text style={styles.name}>{`Contact 1 : ${num1 ? num1 : 'NA'}`}</Text>
                <TextInput
                    label = "Contact 1"
                    value={Number1}
                    onChangeText={setNumber1}
                    style={styles.textInput}
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    placeholder= {`${num1 ? num1 : 'NA'}`}
                    defaultValue={`${num1 ? num1 : ''}`}
                />
                <Text>{`Contact 2 : ${num2 ? num2 : 'NA'}`}</Text>
                <TextInput
                    label = "Contact 2"
                    value={Number2}
                    onChangeText={setNumber2}
                    style={styles.textInput}
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    placeholder= {`${num2 ? num2 : 'NA'}`}
                    defaultValue={`${num2 ? num2 : ''}`}
                />
                <Text>{`Contact 3 : ${num3 ? num3 : 'NA'}`}</Text>
                <TextInput
                    label = "Contact 3"
                    value={Number3}
                    onChangeText={setNumber3}
                    style={styles.textInput}
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    placeholder= {`${num3 ? num3 : 'NA'}`}
                    defaultValue={`${num3 ? num3 : ''}`}
                />
            </View>
            <Pressable 
                style={styles.button}
                onPress={saveinfo}
                android_ripple={{ color: '#FFF' }}><Text>Save</Text></Pressable>
        </ScrollView>

    );
};

export default updateinfo;

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
    },
    name: {
        marginBottom: 10,
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
        flexDirection: 'column',
        paddingHorizontal: 8,
        width: 200,
        textAlign: 'center',
        marginBottom: 10
    },
});
