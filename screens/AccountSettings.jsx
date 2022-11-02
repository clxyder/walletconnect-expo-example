import React, { Component } from 'react';
import ServerService from '../api/ServerService';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';




export default class AccountSettings extends Component {
   
    constructor(props) {
            super(props)
            this.state = {
                nickname: '',
                twitter: '',
                opensea:'',
                bio:'',
                base64URL: '',
                hasLoginFailed: false,
                showSuccessMessage: false,
                data: {},
                readyFile: null,
                preview: null,
                fetchedPFP: null
                
            }
            // this.handleChange = this.handleChange.bind(this);
            // this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount = async () =>{
        ServerService.getWalletInfo(this.props.account[0])
       .then(response => 
        {
            console.log(response.data.content)
            this.setState({data: response.data.content})
            this.setState({
                nickname: response.data.content.userName,
                twitter: response.data.content.twitterHandle,
                bio: response.data.content.bio,
                walletAddress: response.data.content.WalletAddress
            })
        }).catch(error => {console.log(error)})
       console.log(this.state)

   }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Web3 Nickname</Text>
            <View style={styles.inputContainer}>
                
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
            
            <TextInput style={styles.inputs}
                placeholder="Web3 Nickname"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(fullName) => this.setState({fullName})}/>
            </View>
                <Text>Twitter Handle</Text>
            <View style={styles.inputContainer}>
            
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Twitter"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View>
                <Text>Bio</Text>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Bio"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View>

            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View>
            
            

            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
            <Text style={styles.signUpText}>Update</Text>
            </TouchableHighlight>
        </View>
        );
    }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5f9e87',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    signupButton: {
        backgroundColor: "#114570",
    },
    signUpText: {
        color: 'white',
    }
    });
