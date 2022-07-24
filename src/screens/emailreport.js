// for reporting of texts or sms based scams
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
import 'react-native-url-polyfill/auto';
import { useSelector, useDispatch } from 'react-redux';

const supabase = createClient(supabaseUrl, supabaseKey)

const emailreport = ({ navigation }) => {

    const [text, settext] = useState('');
    const ip = useSelector(state => state.account.ipaddress);

    const sendreport = async () => {
        // make sure there are no hidden spaces in the text which will mess up the count in the database
        var validatetext = text;
        while(validatetext.endsWith(' ')) {
            validatetext = validatetext.substring(0, validatetext.length - 1);
        }
        
        try{
            /**
             * checks in database if the link has already been reported
             * if exist, increment report count
             * else, create new entry
             */   
            let { data: Reports, error } = await supabase
            .from('email_reports')
            .select('count')
            .eq('email', validatetext);    
            const d = Reports;
            const counter = (d[0]? d[0].count + 1 : 1);
            
            await supabase
                .from('email_reports')
                .insert([
                    { email: validatetext , count: counter },
                ], { upsert: true });
            
            // store user records
            let { data: Reports1, error1 } = await supabase
            .from('reports_records')
            .select('reports')
            .eq('ip', ip);    
            const rep = Reports1;
            // console.log(rep[0].reports);
            var arr = rep[0]? JSON.parse(rep[0].reports) : [];

            if(arr.includes(validatetext)) {
                alert("You are not allowed to make repeated reports.");
            } else {
                arr.push(validatetext);
                await supabase
                .from('reports_records')
                .insert([
                    { ip: ip , reports: JSON.stringify(arr) },
                ], { upsert: true });
            
                alert('Successfully Reported!');
            }

            // navigate back to discourage making erroneous reports
            navigation.navigate('ReportScreen');
            settext('');
        } catch(e) {
            alert(e);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>{'Report email scams: '}</Text>
            <TextInput
                label = "email"
                value={text}
                onChangeText={settext}
                style={styles.textInput}
                keyboardType='email-address'
                placeholder= {'Enter email to report '}
            />
            <Pressable
                onPress={sendreport}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Submit</Text>
            </Pressable>
        </View>
    );
}

export default emailreport;

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
