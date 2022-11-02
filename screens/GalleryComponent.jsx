import React, { useState, Component} from 'react';
import RaribleService from '../api/RaribleService';
//import { ImmutableXClient, Link, ERC721TokenType, ETHTokenType } from '@imtbl/core-sdk';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button
  } from 'react-native';

//   const styles = StyleSheet.create({
//     container: {
//       paddingTop: 50,
//     },
//     tinyLogo: {
//       width: 50,
//       height: 50,
//     },
//     logo: {
//       width: 66,
//       height: 58,
//     },
//     });
const apiAddress = 'https://api.x.immutable.com/v1';
class GalleryComponent extends Component {
    state = { data: []};  
    //client = ImmutableXClient.build({ publicApiUrl: apiAddress });      
    


render(){
    return(
        <>
       
      <Button onPress={(e)=>this.getMainnetNFTs(e)} title="mainnet"/>
      <Button onPress={(e)=>this.getMaticNFTs(e)} title="matic"/>
      <Button onPress={(e)=>this.getImxNFTs(e)} title="imx"/>
       
              {/*this.state.data.map(d => (<li key={d.token_id}>{d.token_id} --- {d.name}</li>))} */}
              
              {this.state.data.map(d =><View> {(this.nftCard(d.metadata.image || d.metadata.image_url,d.metadata.name,d.tokenId || d.token_id))}</View>)}
 
        </>
    )
}
    
    nftCard(img,name,id) {
        // var newImage = new Image()
        // var mainCanvas = document.getElementById("mainCanvas");
        // newImage.src = img 
        // newImage.onload = loadingDone
        // function loadingDone() {             // gets called when done
        //     //alert(logoImage.width);
        //     mainCanvas.getContext("2d").drawImage(newImage, 0, 0);
        // }
        return (
        <>
        <View>
            <Image  source={img}/>
            <View>
                {/* <Text>{name}</Text> */}
               
            
            
            </View>
        </View>
        
        
        
        </>
        )

    }

    getMainnetNFTs(props){
        RaribleService.retrieveUserNFT("0xCD9375D40FF8cF1F34796b364870207a0FD88dEc")
        .then(response => {
            console.log(response.data)
            var tokenURI
            var itemArray = response.data.ownedNfts
            itemArray.map(function(array){
                           tokenURI = array.metadata.image
                           console.log(tokenURI)
                            return tokenURI 
                         })
                         this.setState({data : itemArray})
                                  
                                  console.log(response.data) 
        
        })
        
    }

    getMaticNFTs(props){
        RaribleService.retrieveUserNFTmatic("0xCD9375D40FF8cF1F34796b364870207a0FD88dEc")
        .then(response => {
            console.log(response.data)
            var tokenURI
            var itemArray = response.data.ownedNfts
            itemArray.map(function(array){
                           tokenURI = array.metadata.image
                           console.log(tokenURI)
                            return tokenURI 
                         })
                         this.setState({data : itemArray})
                                  
                                  console.log(response.data) 
        
        })
        
    }

    async getHabboNFT(){
        let assetsRequest = (await this.client).getAssets({
            user: "0xCD9375D40FF8cF1F34796b364870207a0FD88dEc",
            //cursor: assetCursor,
            status: 'imx'
            
          }).then(res => {
            var data = res.result
              this.setState({data : data})
          })
          return (await assetsRequest.result)
        }


    getImxNFTs(props){
        RaribleService.retrieveNFTimx("0xCD9375D40FF8cF1F34796b364870207a0FD88dEc")
        .then(response => {
            console.log(response)
            var tokenURI
            var itemArray = response.data.result
            itemArray.map(function(array){
                           tokenURI = array.metadata.image
                           console.log(tokenURI)
                            return tokenURI 
                         })
                         this.setState({data : itemArray})
                                  
                                  console.log(response.data) 
    
        }).catch(error => {console.log(error)})
        
    }



}

export default GalleryComponent