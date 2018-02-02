import React ,{Component,PureComponent} from 'react';
import {StackNavigator} from 'react-navigation';
import HomePage from './src/FrontEnd/Main';
import ListClasses from './src/FrontEnd/Classes';
import {
  Platform
} from 'react-native';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import store from './src/redux/index';


const App = StackNavigator({
    ListClasses : {
      screen: ListClasses,
      navigationOptions:{
        title: "Classes",
        headerBackTitle:"Classes",
        headerStyle:{
          backgroundColor: "#0f6abc",
        },
        headerTintColor: "white",
        gesturesEnabled: false,
        headerLeft: null,
      },
    },
    HomePage : {
      screen: HomePage,
      navigationOptions:{
        title:"Attendance",
        headerTintColor:"white",
        headerBackTitle:"Attendance",
        gesturesEnabled: false,
        headerStyle: {
           backgroundColor:"#0f6abc",
        },
      },
    },

},{
  initialRouteName: "ListClasses",
  mode: "card",
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default ()=>{
  return(
    <Provider store = {store}>
      <Root>
        <App/>
      </Root>
    </Provider>
  );
};
