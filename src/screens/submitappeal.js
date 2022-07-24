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
    ScrollView
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
import { Form, FormItem, Label, Modal, Picker } from 'react-native-form-component';

const supabase = createClient(supabaseUrl, supabaseKey)

const submitappeal = ({ navigation }) => {

    const [appeal, setappeal] = useState('');
    const [number, setnumber] = useState(0);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [appealtype , setappealtype] = useState('');

    /**
     * function to send appeal to database
     * generates unique id by taking size of appeal table in supabase
     */
    const sendappeal = async () => {
        if(appeal == '' || name == '' || email == '' || appealtype == '') {
            alert("Please fill in all the required blanks marked with an '*'.");
        } else {

            try {
                let { data: Reports1, error1 } = await supabase
                .from('appeals')
                .select('*');  
                const rep = Reports1;
                var size = rep.length + 1;            
                
                await supabase
                    .from('appeals')
                    .insert([
                        { id : size, appeal_type : appealtype, name : name, email : email, appeal : appeal },
                    ]);
                
                alert('Submitted!');
                setappeal('');
                setname('');
                setemail('');
                setappeal('');
                    
            } catch(e) {
                alert(e);
            }
        }
    }

    return (
        <ScrollView>
            <Form onButtonPress={sendappeal} buttonStyle={backgroundColor= '#407BFF'}>
                <Picker
                    items={[
                    { label: 'False flagging', value: 'False flagging' },
                    { label: 'Enquiries', value: 'Enquiries' },
                    { label: 'Others', value: 'Others' },
                    ]}
                    label="Appeal Type"
                    placeholder='-- Select type of appeal -- '
                    selectedValue={appealtype}
                    onSelection={(item) => setappealtype(item.value)}
                    asterik
                    isRequired
                />
                <FormItem
                    label="Name"
                    isRequired
                    value={name}
                    onChangeText={(name) => setname(name)}
                    asterik
                />
                <FormItem
                    label="Email"
                    isRequired
                    value={email}
                    onChangeText={(email) => setemail(email)}
                    asterik
                />
                <FormItem
                    label="Please provide more information"
                    isRequired
                    value={appeal}
                    onChangeText={(appeal) => setappeal(appeal)}
                    asterik
                    style = {styles.appeal}
                    numberOfLines={500}
                    multiline={true}
                />
            </Form>
        </ScrollView>
    );
}

export default submitappeal;

const styles = StyleSheet.create({
    appeal : {
        textAlignVertical: "top",
        height: 160,
        justifyContent: "flex-start",
        padding: 0,
    },  
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