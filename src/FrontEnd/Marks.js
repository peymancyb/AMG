import React ,{Component} from 'react';
import {
  Text,
  Alert,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighligh,
  FlatList,
  KeyboardAvoidingView} from 'react-native';
import styles from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  SwipeRow,
  Toast,
  Root,
} from 'native-base';
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




class Marks extends Component {
  constructor(props){
    super(props);
    this.state = {
      students_array: [],
      Mark:null,
    };
    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    this._sendMark = this._sendMark.bind(this);
  }

  componentDidMount() {
    this.listenForItems();
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
_chandeText(mark){
  this.setState({Mark: mark});
}
_sendMark(item){

};
  _renderItem({item}){
      return(
        <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={"padding"}>
          <CardItem style={styles.MarkCardItemStyle}>
            <Body style={styles.MarkBodyItemStyle}>
              <SwipeRow
                style={styles.MarkSwipeRow}
                 disableLeftSwipe={true}
                 leftOpenValue={75}
                 left={
                   <Button
                      success
                      onPress={() => this._sendMark(item)}>
                     <SimpleLineIcons name="check" size={22} color={"white"} />
                   </Button>
                 }
                 body={
                   <View style={[this.MarkItemView,{flexDirection:"row"}]}>
                     <Body>
                       <View style={styles.MarkViewStyle}>
                         <Text>{item.name} {item.surname}</Text>
                       </View>
                     </Body>
                     <Right>
                         <TextInput
                           clearTextOnFocus={true}
                           autoCorrect={false}
                           editable = {true}
                           onChangeText = {(mark)=>this._chandeText(mark)}
                           underlineColorAndroid={"transparent"}
                           placeholder={"Mark"}
                           style={styles.MarkTextInputStyle}/>
                   </Right>
                 </View>
               }
             />
          </Body>
        </CardItem>
      </KeyboardAvoidingView>
      );
    }
  render() {
    return (
      <Container style={styles.BackgroundColor}>
       <Content>
         <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={"padding"}>
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
         </KeyboardAvoidingView>
       </Content>
     </Container>
    );
  }
}

export default connect((store)=>{
  return{
    className: store.classReducer.className
  };
})(Marks);
