import React from 'react';
import {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import ServerService from '../api/ServerService';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'
import BottomTabNavigator from './BottomTabNavigator'
import ChatScreen from './ChatScreen';

const Stack = createNativeStackNavigator();
const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}
export default function NavigationManager() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Entrance" component={Entrance} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Agora' }} />
        <Stack.Screen name="Chats" component={ChatScreen} />
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
 function Entrance({ navigation }: any) {
  const connector = useWalletConnect();
  const messageToSign = "This signature is needed to verify that you are the owner of this wallet NONCE: " /*/+ crypto.randomUUID()/*/

  useEffect( () => {
    axios.interceptors.request.use(request => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })
    console.log(" -- STARTING APP --")
    retrieveJWT()
    
  }, []);


  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const retrieveJWT = async () => {
    console.log("Retrieving JWT Token for Authentication")
    let jwt = await AsyncStorage.getItem('JWT')
    console.log("JWT Token is: " + jwt)
    if(!jwt){signMessage()}
  } 

  const signMessage = React.useCallback( async () => {
    console.log("FIRMANDO MENSAJE")
    console.log(connector.accounts[0])
    return await connector.signPersonalMessage([connector.accounts[0], messageToSign]).then(response => {
      console.log(response)
      AsyncStorage.setItem('signInToken',response);
      console.log("MANDANDO FIRMA:" + AsyncStorage.getItem('singInToken'));
      postSignedHash();
    }).catch(error => {
      console.log(error)
    });
  }, [connector])

  const postSignedHash = React.useCallback( async () =>{
    let token = await AsyncStorage.getItem('signInToken')
    return await ServerService.postSignedHash(messageToSign,token,connector.accounts[0])
                .then((response: any) =>
                  {
                    AsyncStorage.setItem('JWT',response.data.content)
                    console.log("JTW TOKEN IS: " + response.data.content)
                  }).catch(error => {
                    console.log(error)     
                  });
  },[connector])

  const killAUTH = async () => {
    await AsyncStorage.getItem('JWT')
    await AsyncStorage.removeItem('JWT')
    logCurrentStorage()
  }


  const logCurrentStorage = () => {
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1]
        }
  
        console.log('CURRENT STORAGE: ', myStorage);
      })
    });
  }
  return (
    
      
      
       
       
      
        <View style={styles.container}>
      <Text style={styles.title}>Tab One HEHE2</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={signMessage} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Sign Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killAUTH} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Delete JWT</Text>
          </TouchableOpacity>
          <Button
          title="My Active Chats"
          onPress={() =>{
            navigation.navigate('Home')
            console.log("navigatedEEEEE")}
          }
          />
        </>
        
      )}
        </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
