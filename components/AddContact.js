import { useState,useEffect } from 'react';
import {Text, View,TextInput,Button, Alert } from 'react-native'
import styles from '../styles';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

let db = openDatabase({name: 'UserDatabase1.db'});

const AddContact=()=>{

  const navigation = useNavigation();
  const [name,setName]=useState('');
  const [contactNumber,setContactNumber]=useState('');
  const [landlineNumber,setLandlineNumber]=useState('');
  const [imageLink,setImageLink]=useState('');
  const [favourite,setFavourite]=useState(false);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_contact'",
        [],
        (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_contact', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_contact(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(30), user_contact VARCHAR(10),user_landline VARCHAR(10), user_image_link VARCHAR(255))',
              []
            );
          }
          else{
            console.log("already created table");
          }
        }
      );
    });
  }, []);
  const saveContact = () => {
    console.log(name,contactNumber, landlineNumber,imageLink);
    db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_contact (user_name, user_contact,user_landline,user_image_link ) VALUES (?,?,?,?)',
          [name, contactNumber, landlineNumber,imageLink],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log(results);
              Alert.alert(
                'Success',
                'You are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Contact List'),
                  },
                ],
                {cancelable: false},
              );
            } else alert("Couldn't add the contact");
          },
          error => {
            console.log(error);
          },
        );
      });
    };
    return(
        // const dispatch = useDispatch();
        
        <View style={{flex:1,justifyContent:'center'}}>
            <View style={styles.textInputs}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Jake Peralta'
                    value={name}
                    onChange={e => {
                    setName(e.nativeEvent.text);
                }}/>
                <Text style={styles.label}>Contact Number:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='8218090000'
                    value={contactNumber}
                    onChange={e => {
                    setContactNumber(e.nativeEvent.text);
                }}/>
                <Text style={styles.label}>Landline Number:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='270581'
                    value={landlineNumber}
                    onChange={e => {
                    setLandlineNumber(e.nativeEvent.text);
                }}/>
                <Text style={styles.label}>Image:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='https://weknowyourdreams.com/images/minions/minions-01.jpg'
                    value={imageLink}
                    onChange={e => {
                    setImageLink(e.nativeEvent.text);
                }}/>
            </View>
        {/* <View style={styles.buttons}> */}
          <View>
            <View style={[styles.button]}><Button  
                                            onPress={() => {
                                              if (!name || !contactNumber || !landlineNumber || !imageLink) {
                                                alert('Please enter the values');
                                                return;
                                              }
                                              else{
                                               saveContact();
                                              }
                                            }} title="Save"></Button></View>
            
            {/* <View style={styles.button}><Button onPress={()=>props.navigation.navigate("Budget Listing")} title="Show Items"></Button></View> */}
        </View>
      </View>
    )
}
export default AddContact;