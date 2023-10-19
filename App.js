import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import ContactList from './components/ContactList';
import  FavouriteList from './components/FavouriteList'
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

const Drawer = createDrawerNavigator();
const Stack=createNativeStackNavigator();

function DrawerRoutes(){
  return(
    <Drawer.Navigator>
       <Drawer.Screen name="Contact List" component={ContactList} />
        <Drawer.Screen name="Favourites" component={FavouriteList} />
    </Drawer.Navigator>
  )
}

function App(){

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={DrawerRoutes} options={{headerShown:false}}/>
          <Stack.Screen name="Contact List" component={ContactList}/>
          <Stack.Screen name="Add New Contact" component={AddContact}/>
          <Stack.Screen name="Edit Contact" component={EditContact}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}


export default App;
