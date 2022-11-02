
import React from 'react';
import {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Button, View } from 'react-native';
import ServerService from '../api/ServerService';
import BottomTabNavigator from './BottomTabNavigator'
import ActiveChats from './ActiveChats';
import GalleryComponent from './GalleryComponent';
export default function Home({ navigation }: any) {

    return (
          //<GalleryComponent/>
        <ActiveChats navigation={navigation}/>
         
            
    )
}