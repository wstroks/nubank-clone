import React from 'react';
import { Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home/index';

export default function App(){
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#8B10AE"/>
        <Home/>

        </>
    );
}