import { useState,useEffect } from 'react';
import {Text, View,TextInput,Button, Alert,TouchableOpacity } from 'react-native'
import styles from '../styles';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

let db = openDatabase({name: 'UserDatabase1.db'});
const EditContact=()=>{
    const route=useRoute();
    const navigation = useNavigation();
    const [name,setName]=useState('');
    const [contactNumber,setContactNumber]=useState('');
    const [landlineNumber,setLandlineNumber]=useState('');
    const [imageLink,setImageLink]=useState('');

    useEffect(()=>{
        setName(route.params.data.name);
        setContactNumber(route.params.data.contactNumber);
        setLandlineNumber(route.params.data.landlineNumber);
        setImageLink(route.params.data.imageLink);
    },[]); 

    const updateContact = () => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE table_contact set user_name=?, user_contact=? , user_landline=?,user_image_link=? where user_id=?',
            [name, contactNumber, landlineNumber,imageLink, route.params.data.id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'User updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Contact List'),
                    },
                  ],
                  {cancelable: false},
                );
              } else alert('Updation Failed');
            },
          );
        });
      };
      const getContactData = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
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
        <View style={{flex:1,justifyContent:'center'}}>
            <View style={styles.textInputs}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChange={e => {
                    setName(e.nativeEvent.text);
                }}/>
                <Text style={styles.label}>Contact Number:</Text>
                <TextInput
                  
                    style={styles.textInput}
                    value={contactNumber}
                    onChange={e => {
                    setContactNumber(e.nativeEvent.text);
                }}/>
                <Text style={styles.label}>Landline Number:</Text>
                <TextInput
                
                    style={styles.textInput}
                    value={landlineNumber}
                    onChange={e => {
                    setLandlineNumber(e.nativeEvent.text);
                }}/>
                <Text style={styles.label}>Image:</Text>
                <TextInput
                    style={styles.textInput}
                    value={imageLink}
                    onChange={e => {
                    setImageLink(e.nativeEvent.text);
                }}/>
            </View>
        {/* <View style={styles.buttons}> */}
          <View>
            <View style={[styles.button]}><Button  
                                            onPress={() => {
                                                console.log(name,contactNumber,landlineNumber,imageLink);
                                              if (!name || !contactNumber || !landlineNumber || !imageLink) {
                                                Alert.alert('Please enter the values');
                                                return;
                                              }
                                              else{
                                               updateContact();
                                              }
                                            }} title="Update Contact"></Button></View>
            
            <View style={styles.button}><Button onPress={()=>deleteContact(route.params.data.id)} title="Delete Contact"></Button></View>
        </View>
      </View>
    )
}
export default EditContact;
