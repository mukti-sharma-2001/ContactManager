import { View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    Image, } from "react-native";

    import { SwipeListView } from 'react-native-swipe-list-view';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'UserDatabase1.db'});
const ContactList=()=>{
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getContactData();
    }, [isFocused]);

    const getContactData = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_contact', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
            setUserList(temp);
            });
        });
    };
    let deleteContact = id => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  table_contact where user_id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      getContactData();
                    },
                  },
                ],
                {cancelable: false},
              );
            } else {
              alert('Please insert a valid User Id');
            }
          },
        );
      })
    };
    return(
    <View style={styles.container}>
      <SwipeListView
        data={userList.sort((a,b)=>a.user_name.localeCompare(b.user_name))}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.userItem}
            onPress={() => {
                navigation.navigate('Edit Contact', {
                  data: {
                    name: item.user_name,
                    contactNumber: item.user_contact,
                    landlineNumber: item.user_landline,
                    imageLink:item.user_image_link,
                    id: item.user_id,
                  },
                });
              }}>
              <Image style={[styles.itemText,styles.imageStyle ]} source={{uri:item.user_image_link}}/>
              <Text style={styles.itemText}>{'Name: ' + item.user_name}</Text>
              <Text style={styles.itemText}>{'Contact: ' + item.user_contact}</Text>
              <Text style={styles.itemText}>{'Landline: ' + item.user_landline}</Text>
              
            </TouchableOpacity>
          );
        }}
        renderHiddenItem={ (data, rowMap) => (
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                style={[styles.rightAction,{backgroundColor:'blue'}]}  
                onPress={()=>{
                  navigation.navigate('Edit Contact', {
                    data: {
                      name: data.item.user_name,
                      contactNumber: data.item.user_contact,
                      landlineNumber: data.item.user_landline,
                      imageLink:data.item.user_image_link,
                      id: data.item.user_id,
                    },
                  });
                }}
              >
              <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rightAction,{backgroundColor:'red'}]}  
                onPress={()=>{
                  deleteContact(data.item.user_id);
                }}
              >
              <Text>Delete</Text>
              </TouchableOpacity>
              
          </View>
      )}
      rightOpenValue={200}
      leftOpenValue={-200}
      
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('Add New Contact');
        }}>
        <Text style={styles.btnText}>Add New User</Text>
      </TouchableOpacity>

    </View>
  );

}
export default ContactList;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageStyle:{
        height: 230, resizeMode: 'contain', margin: 10 
    },
    addNewBtn: {
      backgroundColor: 'black',
      width: 150,
      height: 50,
      borderRadius: 20,
      position: 'absolute',
      bottom: 20,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: '#fff',
      fontSize: 18,
    },
    userItem: {
      width: '100%',
      backgroundColor: '#fff',
      padding: 10,
    },
    itemText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000',
    },
    rightAction:{
      width:'100%',
      height:'100%',
      marginVertical:10,
      alignItems:'center',
      flex:1,
      justifyContent:'center',
      backgroundColor:'#fff',
      shadowColor:'#000',
      shadowOffset:{
        width:0,
        height:2
      },
      shadowOpacity:0.25,
      shadowRadius:3.84,
      elevation:5
    }

});