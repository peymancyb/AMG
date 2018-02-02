import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableOpacity,FlatList,KeyboardAvoidingView } from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator} from 'react-navigation';
import { Hoshi } from 'react-native-textinput-effects';
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      students_array: [],
      Comment:'',
    };
    this._renderItem = this._renderItem.bind(this);
    this._sendComment = this._sendComment.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
  }

  componentDidMount() {
    this.listenForItems();
  }

  listenForItems(){
    let currentClass = this.props.className;
    queryAllStudents(currentClass).then((students_array)=>{
      this.setState({students_array});
    }).catch((error)=>{
      this.setState({ students_array:[] });
    });
  }

  _sendComment(item){

  };
  _renderItem({item}){
      return(
        <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={"padding"}>
          <CardItem style={styles.MarkCardItemStyle}>
              <Body
                style={[styles.CommentsBody,{flexDirection:"row"}]}>
                   <Hoshi
                      clearTextOnFocus={true}
                      style={styles.HoshiStyle}
                      label={`${item.name+" "+item.surname+" :"}`}
                      labelStyle={{ color: '#0f6abc' }}
                      borderColor={'#5067FF'}
                      inputStyle={{ color: '#0f6abc' }}
                      onChangeText = {(Comment)=>this.setState({Comment: Comment})}
                    />

                   <TouchableOpacity
                      style={styles.commentStyleInput}
                      onPress={() => this._sendComment(item)}>
                     <EvilIcons name="comment" size={32} color={"white"} />
                   </TouchableOpacity>
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
})(Comments);
