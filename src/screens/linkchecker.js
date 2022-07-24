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
// for API url calls
import 'react-native-url-polyfill/auto';

const supabase = createClient(supabaseUrl, supabaseKey)

const linkchecker = ({ navigation }) => {

    const [link, setlink] = useState('');

    const sendreport = async () => {
        // checks for empty spaces at the end and deletes them for accurate validation
        var validatelink = link;
        while(validatelink.endsWith(' ')) {
            validatelink = validatelink.substring(0, validatelink.length - 1);
        }
        
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
            .eq('contact', validatelink);
            const track = (Reports[0] ? Reports[0].organisation : '');

            if(track == '') {
                let { data: Reports1, error1 } = await supabase
                .from('link_reports')
                .select('count')
                .eq('link', validatelink);    
                const d = (Reports1[0] ? Reports1[0].count : 0);
            
                if(d >= 5) {
                    alert(`${validatelink} has been collectively verified by the community to be a potential scam. \n\nDo not trust this link. \n\nIf you deem that this is a mistake, please proceed cautiously! You may also report an appeal to remove this link from the list of potential scams in the Report page.`);
                } else {
                    alert(`We do not have sufficient data on ${validatelink}. \n\nPlease proceed with caution!`);
                }
            } else {
                alert(`${validatelink} is the official link of ${track}.`);
            }
            
            setlink('');
        } catch(e) {
            alert(e);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>{'Validate link: '}</Text>
            <TextInput
                label = "link"
                value={link}
                onChangeText={setlink}
                style={styles.textInput}
                keyboardType='url'
                placeholder= {'Enter the link to validate '}
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

export default linkchecker;

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
