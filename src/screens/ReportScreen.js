import { StyleSheet, View, Pressable, Text } from 'react-native';
import React from 'react';


// screen containing buttons to navigate to different types of report features

const ReportScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
            // text reporting
                onPress={() => navigation.navigate('emailreportscreen')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Report email scams</Text>
            </Pressable>
            <Pressable
            // link reporting
                onPress={() => navigation.navigate('linkreportscreen')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Report link scams</Text>
            </Pressable>
            <Pressable
            // phone number reporting
                onPress={() => navigation.navigate('phonenumberreportscreen')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Report phone number</Text>
            </Pressable>
        </View>
    );
};

export default ReportScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#407BFF',
        marginVertical: 15,
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        color: 'white',
    },
});



// import React, { useEffect, useState } from 'react';

// import {
//     StyleSheet,
//     Text,
//     View,
//     Pressable,
//     TextInput,
//     FlatList,
//     Image,
//     SafeAreaView,
// } from 'react-native';
// import { ListComponent } from '../components';

// // supabase API
// import { createClient } from '@supabase/supabase-js'
// import {
//     supabaseUrl,
//     supabaseKey,
// } from '@env';
// /* polyfills */
// /** URL polyfill */
// import 'react-native-url-polyfill/auto';

// const supabase = createClient(supabaseUrl, supabaseKey)

// const ReportScreen = ({ navigation }) => {

//     const [number, setnumber] = useState(0);

//     const sendreport = async () => {
//         // const phone = number.toString();
//         try{
//             //const { data, error } = async () => 
            
//             let { data: Reports, error } = await supabase
//             .from('phone_number_reports')
//             .select('count')
//             .eq('phone_number', number);    
//             const d = Reports;
//             const counter = (d[0]? d[0].count + 1 : 1);
            
//             await supabase
//                 .from('phone_number_reports')
//                 .insert([
//                     { phone_number: number , count: counter },
//                 ], { upsert: true });
            
//             //alert(data + " " + error);
//             alert('Successfully Reported!');
//             //alert(number);
//             navigation.navigate('ReportScreen');
//             setnumber('');
//         } catch(e) {
//             alert(e);
//         }
//     }

//     return (
//         <View style={styles.container}>

//             <Text style={{marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>{'Report scams: '}</Text>
//             <TextInput
//                 label = "Name"
//                 value={number}
//                 onChangeText={setnumber}
//                 style={styles.textInput}
//                 keyboardType='phone-pad'
//                 placeholder= {'Enter the phone number of '}
//             />
//             <Pressable
//                 onPress={sendreport}
//                 style={styles.button}
//                 android_ripple={{ color: '#FFF' }}
//             >
//                 <Text style={styles.text}>Submit</Text>
//             </Pressable>
//         </View>
//     );
// }

// export default ReportScreen;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#EBECF0',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#407BFF',
//         marginVertical: 10,
//         paddingVertical: 10,
//         width: '80%',
//         alignItems: 'center',
//         borderRadius: 4,
//     },
//     text: {
//         color: 'white',
//     },
//     textInput: {
//         alignSelf: 'center',
//         borderWidth: 2,
//         borderColor: '#3F3F3F',
//         borderRadius: 4,
//         flexDirection: 'column',
//         paddingHorizontal: 8,
//         width: 200,
//         textAlign: 'center',
//         marginBottom: 10
//     },
// });
