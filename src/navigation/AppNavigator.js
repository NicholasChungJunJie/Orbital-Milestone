import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth } from '../firebase';
import {
    MainScreen,
    ReportScreen,
    Updateinfo,
    emailreport,
    linkreport,
    phonenumberreport,
    checkscreen,
    linkchecker,
    phonenumberchecker,
    emailchecker,
    submitappeal,
} from '../screens';
import { View } from 'react-native-web';
import { ListComponent } from '../components';
const Stack = createNativeStackNavigator();
// const TodoStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function reports() {
    return (
        <Stack.Navigator initialRouteName="ReportScreen">
            <Stack.Screen
                name="ReportScreen"
                options={{ headerShown: false }}
                component={ReportScreen}
            />
            <Stack.Screen
                name="emailreportscreen"
                options={{ headerShown: false }}
                component={emailreport}
            />
            <Stack.Screen
                name="linkreportscreen"
                options={{ headerShown: false }}
                component={linkreport}
            />
            <Stack.Screen
                name="phonenumberreportscreen"
                options={{ headerShown: false }}
                component={phonenumberreport}
            />
        </Stack.Navigator>
    );
}

function Home() {
    return (
      <Stack.Navigator initialRouteName='MainScreen'>
        <Stack.Screen name="Mainscreen" options={{ headerShown: false }} component={MainScreen} />
        
        <Stack.Screen name="submitappeal" options={{ headerShown: false }} component={submitappeal} />
      </Stack.Navigator>
    );
}

function checkers() {
    return (
      <Stack.Navigator initialRouteName='checkscreen'>
        <Stack.Screen name="checkscreen" options={{ headerShown: false }} component={checkscreen} />
        
        <Stack.Screen name="emailcheckerscreen" options={{ headerShown: false }} component={emailchecker} />

        <Stack.Screen name="linkcheckerscreen" options={{ headerShown: false }} component={linkchecker} />

        <Stack.Screen name="phonenumberreportscreen" options={{ headerShown: false }} component={phonenumberchecker} />
      
      </Stack.Navigator>
    );
}

const AppNavigator = () => {

    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="Account"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
            >
                <Tab.Screen
                    name="Account"
                    component={Home}
                    options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shield-account-outline" color={color} size={size} />
                    ),
                    }}
                />
                <Tab.Screen
                    name ="Checker"
                    component={checkers}
                    options={{
                    tabBarLabel: 'Check',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shield-check-outline" color={color} size={size} /> //cog-outline
                    ),
                    }}
                />
                <Tab.Screen
                    name="Report"
                    component={reports}
                    options={{
                    tabBarLabel: 'Report',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="alert-octagon" color={color} size={size} />
                    ),
                    // tabBarBadge: 3,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
// const AppNavigator = () => {
//     /**
//      * This hook serves as a listener to auth state changes provided by firebase.
//      */
//     // const [isAuth, setIsAuth] = useState(false);

//     // useEffect(() => {
//     //     // Mounting function
//     //     const unsubscribeAuthStateChanged = onAuthStateChanged(
//     //         auth,
//     //         (authenticatedUser) => {
//     //             if (authenticatedUser) {
//     //                 setIsAuth(true);
//     //             } else {
//     //                 setIsAuth(false);
//     //             }
//     //         }
//     //     );

//     //     // Clean up mechanism
//     //     // React performs clean up when component unmounts. In our case,
//     //     // app stops running.
//     //     return unsubscribeAuthStateChanged;
//     // }, []);


    


//     // const MainNavigator = () => (
//     //     <Stack.Navigator initialRouteName="Main">
//     //         <Stack.Screen
//     //             name="Main"
//     //             options={{ title: 'Orbital 22 React Native Workshop' }}
//     //             component={MainScreen}
//     //         />
//     //         <Stack.Screen
//     //             name="Ex1Incorrect"
//     //             options={{ title: 'Exercise 1 (Incorrect)' }}
//     //             component={Ex1Incorrect}
//     //         />
//     //         <Stack.Screen
//     //             name="Ex1Solution"
//     //             options={{ title: 'Exercise 1 (Solution)' }}
//     //             component={Ex1Solution}
//     //         />
//     //         <Stack.Screen
//     //             name="Ex1SolutionRedux"
//     //             options={{ title: 'Exercise 1 (Solution Redux)' }}
//     //             component={Ex1SolutionRedux}
//     //         />
//     //         <Stack.Screen
//     //             name="Ex2Solution"
//     //             options={{ title: 'Exercise 2 (Solution)' }}
//     //             component={Ex2Solution}
//     //         />
//     //         <Stack.Screen
//     //             name="CountRedux"
//     //             options={{ title: 'Count with specific input' }}
//     //             component={CountRedux}
//     //         />
//     //         <Stack.Screen
//     //             name="Auth"
//     //             options={{ headerTitle: 'Todo List' }}
//     //             component={AuthScreen}
//     //         />
//     //         <Stack.Screen
//     //             name="Users"
//     //             options={{ headerShown: false }}
//     //             component={UsersScreen}
//     //         />
//     //     </Stack.Navigator>
//     // );

//     // const logoutHandler = () => {
//     //     signOut(auth).then(() => {
//     //         setIsAuth(false);
//     //         setUser({});
//     //     });
//     // };

//     // const LogoutIcon = () => (
//     //     <TouchableOpacity onPress={logoutHandler}>
//     //         <MaterialIcons name="logout" size={28} color="#407BFF" />
//     //     </TouchableOpacity>
//     // );

//     // const TodoNavigator = () => (
//     //     <TodoStack.Navigator>
//     //         <TodoStack.Screen
//     //             name="Home"
//     //             options={{
//     //                 headerTitle: 'Home',
//     //                 headerRight: () => <LogoutIcon />,
//     //             }}
//     //             component={HomeScreen}
//     //         />
//     //     </TodoStack.Navigator>
//     // );

//     return (
//         <NavigationContainer>
//             {/* {isAuth ? <TodoNavigator /> : */ <MainNavigator />}  
//         </NavigationContainer>
//     );
// };
