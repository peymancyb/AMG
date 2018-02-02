import React ,{Component} from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert,
  CheckBox,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Fab,
  CardItem,
  Card,
  Root,
} from 'native-base';
import {StudentModal , BottomFab, PalButtons} from './commonComponents';
//Realm
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



var numberOfStudents = null;


class MainPage extends Component {
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
      numberOfStudents:null,
      loading: false,
      refreshing:false,
      StudentModalView:false,
    };
   this._renderItem = this._renderItem.bind(this);
   this.listenForItems = this.listenForItems.bind(this);
   this._resetFlatlist = this._resetFlatlist.bind(this);
   this._handleRefresh = this._handleRefresh.bind(this);
  }

componentDidMount() {
  this.listenForItems();
}

listenForItems() {
  let currentClass = this.props.className;
  queryAllStudents(currentClass).then((students_array)=>{
    this.setState({students_array});
  }).catch((error)=>{
    this.setState({ students_array:[] });
  });
};

_renderItem({item}){
  return(
    <CardItem style={styles.transparentBorderColor}>
        <Body
          style={styles.MainPageBodyStyle}>
          <View style={styles.MainPageViewStyle}>
            <Text>{item.name} {item.surname}</Text>
          </View>
         <Body>
              <PalButtons
               userID = {item.id}
               userName = {item.name}
               userSurName = {item.surname}
             />
          </Body>
        </Body>
    </CardItem>
  );
};

_renderFooter = () => {
  if(!this.state.loading) return null;
  return(
    <View>
      <ActivityIndicator animating color={"#0f6abc"} size={"small"}/>
    </View>
  );
};

_resetFlatlist(){

}

_handleRefresh(){

}

  render() {
    return (
      <Container style={styles.BackgroundColor}>
        <Content>
          {this.state.students_array.length <= 0  ?
              <View style={styles.deviceHalf}>
                <Text
                  onPress={() => this.setState({StudentModalView: true})}
                  style={{color:"#0f6abc",fontSize:18}}>
                  Add student
                </Text>
              </View>
              :
              <Card>
                <FlatList
                    style={styles.flatListStyle}
                    data = {this.state.students_array}
                    renderItem = {this._renderItem}
                    keyExtractor={item => item.id}
                    ListFooterComponent={this._renderFooter}
                    refreshing = {this.state.refreshing}
                    onRefresh = {()=>this._handleRefresh()}
                    />
              </Card>
            }
      </Content>
      <BottomFab
        StudentModalView={this.state.StudentModalView}
        numberOfStudents={numberOfStudents}
        resetFlatlist={this._resetFlatlist}
        className={this.props.className} />
    </Container>
    );
  }
}

export default connect((store)=>{
  return{
    className: store.classReducer.className
  };
})(MainPage);
