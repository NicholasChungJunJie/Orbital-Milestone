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

// screen containing buttons to navigate to different types of validators

const checkscreen = ({ navigation }) => {
    
    return (

        <View style={styles.container}>
            <Pressable
                // button for text checker
                onPress={() => navigation.navigate('emailcheckerscreen')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Email checker</Text>
            </Pressable>
            <Pressable
                // button for link checker
                onPress={() => navigation.navigate('linkcheckerscreen')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Link checker</Text>
            </Pressable>
            <Pressable
                // button for phone number checker
                onPress={() => navigation.navigate('phonenumberreportscreen')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Phone number checker</Text>
            </Pressable>
        </View>
    );
};

export default checkscreen;

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
        marginVertical: 15,
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
