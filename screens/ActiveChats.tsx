import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import ChatScreen from './ChatScreen';


export default class ActiveChats extends Component<{navigation: any}, {calls: any}> {

  constructor(props:any) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "Mark Doe",    status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"},
        {id:2,  name: "Clark Man",   status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:3,  name: "Jaden Boor",  status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:4,  name: "Srick Tree",  status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:5,  name: "Erick Doe",   status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:6,  name: "Francis Doe", status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:8,  name: "Matilde Doe", status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:9,  name: "John Doe",    status:"active", image:"https://frenchnft.fr/wp-content/uploads/2021/04/cryptopunk3100.png"} ,
        {id:10, name: "Fermod Doe",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Danny Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
        {id:12, name: "Danny Two",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
        {id:13, name: "Danny Three",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
        {id:14, name: "Danny Four",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
        {id:15, name: "Danny Five",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
        
      ]
    };

    console.log(this.props)
  }



  renderItem = (props: any) => {
    
    return (
      <TouchableOpacity onPress = {() => this.props.navigation.navigate('Chats')}>
        <View style={styles.row}>
          <Image source={{ uri: props.item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{props.item.name}</Text>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{props.item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
          
          extraData={this.state}
          data={this.state.calls}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
              

