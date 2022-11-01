import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ServerService from '../api/ServerService';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const connector = useWalletConnect();
  const messageToSign = "This signature is needed to verify that you are the owner of this wallet NONCE: " /*/+ crypto.randomUUID()/*/
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

 
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One HEHE</Text>
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
