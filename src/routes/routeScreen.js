import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteListScreen from '../screens/noteListScreen';
import NoteScreen from '../screens/noteScreen';

const Stack = createStackNavigator();

const RouteScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteListScreen">
        <Stack.Screen name="NoteListScreen" component={NoteListScreen} options={{ headerShown: true, title: 'Notes', headerTintColor: '#000000', headerStyle: { backgroundColor: '#F3EFEF' } }} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ headerShown: true, title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteScreen