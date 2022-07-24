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
import { useSelector, useDispatch } from 'react-redux';

const supabase = createClient(supabaseUrl, supabaseKey)

const linkreport = ({ navigation }) => {

    const [link, setlink] = useState('');
    const ip = useSelector(state => state.account.ipaddress);

    const sendreport = async () => {
        // checks for empty spaces at the end and deletes them for accurate validation
        var validatelink = link;
        while(validatelink.endsWith(' ')) {
            validatelink = validatelink.substring(0, validatelink.length - 1);
        }
        
        try{
            /**
             * checks in database if the link has already been reported
             * if exist, increment report count
             * else, create new entry
             */
            let { data: Reports, error } = await supabase
            .from('link_reports')
            .select('count')
            .eq('link', validatelink);    
            const d = Reports;
            const counter = (d[0]? d[0].count + 1 : 1);
            
            await supabase
                .from('link_reports')
                .insert([
                    { link: validatelink , count: counter },
                ], { upsert: true });
            

            // store user records
            let { data: Reports1, error1 } = await supabase
            .from('reports_records')
            .select('reports')
            .eq('ip', ip);    
            const rep = Reports1;
            // console.log(rep[0].reports);
            var arr = rep[0]? JSON.parse(rep[0].reports) : [];

            if(arr.includes(validatelink)) {
                alert("You are not allowed to make repeated reports.");
            } else {
                arr.push(validatelink);
                await supabase
                .from('reports_records')
                .insert([
                    { ip: ip , reports: JSON.stringify(arr) },
                ], { upsert: true });
            
                alert('Successfully Reported!');
            }

            // navigate back to discourage making erroneous reports
            navigation.navigate('ReportScreen');
            setlink('');
            //console.log(arr);
        } catch(e) {
            alert(e);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>{'Report link: '}</Text>
            <TextInput
                label = "link"
                value={link}
                onChangeText={setlink}
                style={styles.textInput}
                keyboardType='url'
                placeholder= {'Enter the link to report '}
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

export default linkreport;

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
