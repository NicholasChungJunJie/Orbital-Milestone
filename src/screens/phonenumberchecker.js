//reporting of links
import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    Image,
    SafeAreaView,
} from 'react-native';
import { ListComponent } from '../components';

// supabase API
import { createClient } from '@supabase/supabase-js'
import {
    supabaseUrl,
    supabaseKey,
} from '@env';
/* polyfills */
/** URL polyfill */
// for using API url calls
import 'react-native-url-polyfill/auto';

const supabase = createClient(supabaseUrl, supabaseKey)

const phonenumberchecker = ({ navigation }) => {
    
    const [number, setnumber] = useState(0);

    const sendreport = async () => {
        
        try{
            /**
             * cross checking with official database that contains official contact information of various entities in singapore
             * ensures that erroneous user reports will not affect these entities
             * 
             * report database will be checked only when the official database returns null
             */
            let { data: Reports, error } = await supabase
            .from('official_contact')
            .select('organisation')
            .eq('contact', number);

            const d = (Reports[0] ? Reports[0].organisation : '');
            if(d == '') {
                let { data: Reports1, error1 } = await supabase
                .from('phone_number_reports')
                .select('count')
                .eq('phone_number', number);
                const track = (Reports1[0] ? Reports1[0].count : 0);
                if(track >= 5) {
                    alert(`${number} has been collectively verified by the community to be a potential scam. \n\nDo not trust this number. \n\nIf you deem that this is a mistake, please proceed cautiously! You may also report an appeal to remove it from the list of potential scams in the Report page.`);
                } else {
                    alert(`We do not have sufficient data on ${number}. \n\nPlease proceed with caution!`);
                }
            } else {
                alert( `${number} is the official contact of ${d}.`);
            }

            setnumber('');
        } catch(e) {
            alert(e);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>{'Validate number: '}</Text>
            <TextInput
                label = "number"
                value={number}
                onChangeText={setnumber}
                style={styles.textInput}
                keyboardType='phone-pad'
                placeholder= {'Enter the number to validate '}
            />
            <Pressable
                onPress={sendreport}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Validate</Text>
            </Pressable>
        </View>
    );
}

export default phonenumberchecker;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
