import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableHighligh,FlatList ,TouchableOpacity} from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator} from 'react-navigation';
// import {fireBaseClassNode} from './Classes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import ProfileHistory from './profileHistory';
import {
  queryAllClass,
  deleteAllClass,
  deleteNewClass,
  updateNewClass,
  insertNewClass,
  queryAllStudents,
}from '../database/schema';
import realm from '../database/schema';
import {connect} from 'react-redux';

class History extends Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <MaterialCommunityIcons name="history" size={22} color={"white"}/>
    )
  };
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
    };
    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    this._navigateToProfile = this._navigateToProfile.bind(this);
  }

  componentDidMount() {
    this.listenForItems();
  }
  _navigateToProfile(item){
    // const { navigate } = this.props.navigation;
    // userHistoryItem = item;
    // navigate("profile");
  }
  // Fetch Students referance
  listenForItems() {
    let currentClass = this.props.className;
    queryAllStudents(currentClass).then((students_array)=>{
      this.setState({students_array});
    }).catch((error)=>{
      this.setState({ students_array:[] });
    });
  }

  _renderItem({item}){
      return(
        <TouchableOpacity
          onPress={()=> this._navigateToProfile(item)}>
        <CardItem style={styles.HistoryHeight}>
            <Body
              style={styles.justifyContentCenter}>
              <Text
                style={styles.center}>{item.name} {item.surname}</Text>
            </Body>

          <Right>
            <Ionicons name="md-arrow-round-forward" size={22} color={"#0f6abc"} />
          </Right>
         </CardItem>
       </TouchableOpacity>

      );
    }

  render() {
    return (
      <Container style={styles.BackgroundColor}>
       <Content>
         {
           this.state.students_array <= 0 ?
           <View style={styles.deviceHalf}>
             <Text
               onPress={() => this.props.navigation.navigate("Registery")}
               style={{color:"#0f6abc",fontSize:18}}>
               no student found!
             </Text>
           </View>
           :
           <Card>
                 <FlatList
                   style={styles.flatListStyle}
                   data = {this.state.students_array}
                   renderItem = {this._renderItem}
                   keyExtractor={item => item.id}
                 />
          </Card>
         }
       </Content>
     </Container>
    );
  }
}

export default connect((store)=>{
  return{
    className: store.classReducer.className
  };
})(History);
