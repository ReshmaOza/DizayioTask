import { View, Text } from 'react-native'
import React from 'react'
import RouteScreen from './src/routes/routeScreen'
import { Provider } from 'react-redux';
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
    <RouteScreen/>
    </Provider>
  )
}

export default App