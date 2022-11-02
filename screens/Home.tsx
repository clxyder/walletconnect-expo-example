
import React from 'react';
import {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Button, View } from 'react-native';
import ServerService from '../api/ServerService';
import BottomTabNavigator from './BottomTabNavigator'
import ActiveChats from './ActiveChats';
import GalleryComponent from './GalleryComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountSettings from './AccountSettings'



const Drawer = createDrawerNavigator();


export default function Home({ navigation }: any) {

    return (
          //<GalleryComponent/>

          
        <Drawer.Navigator initialRouteName="ActiveChats">
        <Drawer.Screen name="ActiveChats" component={ActiveChats} />
        <Drawer.Screen name="Account Settings" component={AccountSettings} />
        <Drawer.Screen name="My NFTs" component={GalleryComponent} />
        
        </Drawer.Navigator>
    
        // <ActiveChats navigation={navigation}/>
         
            
    )
}