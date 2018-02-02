import React ,{Component} from 'react';
import {
  Platform,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   FlatList,
   Modal,
   Button,
   ActivityIndicator} from 'react-native';
import styles from './style';
import {
  Container,
  Content,
  Body,
  Toast,
  Fab,
  Card,
  CardItem,
  Left,
  Right,
  List,
  ListItem,
  Footer,
  FooterTab,
  Root,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
//=================================
//Realm
import {
  queryAllClass,
  deleteAllClass,
  deleteNewClass,
  updateNewClass,
  insertNewClass,
}from '../database/schema';
import realm from '../database/schema';
import {ChangeClassName} from '../redux/actions/classAction';

export class ClassModal extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      descreption: '',
      modalVisible: props.modalView,
    };
    this._saveClassData = this._saveClassData.bind(this);
  }
  _saveClassData(){
    if(this.state.name.trim()=='' && this.state.descreption.trim()==''){
      alert("Please enter class name and class descreption");
      return;
    }else{
      const newClassList = {
        id: Math.floor(Date.now() / 1000),
        name: this.state.name,
        descreption: this.state.descreption,
        creationDate: new Date(),
      };
      insertNewClass(newClassList).then().catch((error)=>{
        alert(`Insertion Error: ${error}`);
      })
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      modalVisible: nextProps.modalView
    });
  }
  render(){
    return(
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={()=>this.setState({modalVisible: false})}
            >
          <Body style={styles.inputcontainerModal}>
            <View style={{backgroundColor:"#0f6abc",alignItems:"center",justifyContent:"center",width:"100%",}}>
            <TextInput
              style={styles.inputStyleModal}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(Name) => this.setState({name: Name})}
              value={this.state.name}
              clearTextOnFocus={true}
              placeholder="Class Name"
              placeholderTextColor={"white"}
              underlineColorAndroid={'transparent'}
            />
            <TextInput
              style={styles.inputStyleModal}
              onChangeText={(Descreption) => this.setState({descreption: Descreption})}
              value={this.state.descreption}
              clearTextOnFocus={true}
              placeholder="Descreption"
              placeholderTextColor={"white"}
              underlineColorAndroid={'transparent'}
            />
            <View style={styles.marginTopButton}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalAddStudent}
              onPress={this._saveClassData}
              >
              <Text style={styles.addStudentStyleModal}>Add Class</Text>
             </TouchableOpacity>
             <TouchableOpacity
               activeOpacity={0.8}
               style={styles.modalAddStudent}
               onPress={()=>this.props.handleState(false)}
               >
                   <Text style={styles.addStudentStyleModal}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </View>
          </Body>
        </Modal>
    );
  }
}



class ListClasses extends Component {
  constructor(props){
    super(props);
    this.state = {
      ClassModalView:false,
      Class_array: [],
      loading:false,
      refreshing: false,
      loadingIndicator:false,
    };
   this._renderClassItem = this._renderClassItem.bind(this);
   this.listenForClassItems = this.listenForClassItems.bind(this);
   this._navigateToStudent = this._navigateToStudent.bind(this);
   this._handleModalState = this._handleModalState.bind(this);
   this._renderFooter = this._renderFooter.bind(this);
   this.__functionDone = this.__functionDone.bind(this);

  }

componentDidMount() {
  this.listenForClassItems();
}

listenForClassItems() {
  queryAllClass().then((Class_array)=>{
    this.setState({Class_array});
  }).catch((error)=>{
    this.setState({ Class_array:[] });
  });
}

_handleModalState(modalState){
  this.setState({
    ClassModalView: modalState,
  });
}

_navigateToStudent(item){
  this.props.dispatch(ChangeClassName(item.id));
  const { navigate } = this.props.navigation;
  this.setState({
    loadingIndicator:true
  },()=>{
    navigate("HomePage");
    this.setState({
      loadingIndicator:false,
      ClassModalView:false,
      loading:false,
      refreshing: false,
    });
  });

}

__functionDone(){
  // if(this.state.loading){
  //   return(
  //     <ActivityIndicator animating={this.state.loading} color={"#0f6abc"} size={"small"} hidesWhenStopped={!this.state.loading} />
  //   );
  // }else if(this.state.Class_array.length <= 0){
  //   return(
  //     <View style={styles.deviceHalf}>
  //       <Text
  //         onPress={() => this.setState({ClassModalView: true})}
  //         style={{color:"#0f6abc",fontSize:18}}>
  //         Add Class
  //       </Text>
  //     </View>
  //   );
  // }else{
  //   return(
  //     <Card>
  //       <FlatList
  //         style={styles.flatListStyle}
  //         data = {this.state.Class_array}
  //         renderItem = {this._renderClassItem}
  //         keyExtractor={item => item.class_id}
  //         ListFooterComponent={this._renderFooter}
  //         refreshing={this.state.refreshing}
  //         onRefresh={()=>this._handleRefresh()}
  //       />
  //     </Card>
  //   );
  // }
}


_renderClassItem({item}){
    return(
      <TouchableOpacity onPress={()=>this._navigateToStudent(item)} activeOpacity={0.8}>
        <CardItem style={styles.cardItemStyle}>
            <View
              style={styles.flexDirectionRow}>
              <Left style={styles.ClassLeftItemStyle}>
                <Text>Class name: {item.name}</Text>
                <Text style={styles.ClassLeftStyleText}>Descreption: {item.descreption}</Text>
              </Left>
              <Right>
                <MaterialIcons name={"arrow-forward"} size={22} color={"#0f6abc"}/>
              </Right>
            </View>
        </CardItem>
      </TouchableOpacity>
  );
}

_renderFooter(){
  if(!this.state.loading) return null;
  return(
    <View>
      <ActivityIndicator animating={this.state.loading} color={"#0f6abc"} size={"large"} hidesWhenStopped={!this.state.loading} />
    </View>
  );
};

_handleRefresh(){

}

  render(){
    return(
      <Container style={styles.BackgroundColor}>
        <Content>
            <Body>
              <ClassModal modalView={this.state.ClassModalView} handleState={this._handleModalState}/>
            </Body>
            {this.state.Class_array.length === 0 ?
              <Body style={styles.deviceHalf}>
                <Text
                  style={{fontSize:18,color:"#0f6abc"}}
                  onPress={() => this.setState({ClassModalView: true})}>
                  Add class
                </Text>
              </Body>
               :
            <Card>
              <FlatList
                  style={styles.flatListStyle}
                  data = {this.state.Class_array}
                  renderItem = {this._renderClassItem}
                  keyExtractor={item => item.id}
                  ListFooterComponent={this._renderFooter}
                  refreshing={this.state.refreshing}
                  onRefresh={()=>this._handleRefresh()}
                />
              </Card>
          }

        </Content>
        <View>
          <Fab
            style={styles.FabBackground}
            onPress={() => this.setState({ClassModalView: true})}>
            <Entypo name="add-to-list" color="white" size={35} />
          </Fab>
        </View>
      </Container>
    );
  }
}

export default connect((store)=>{
  return{
    className: store.classReducer
  }
})(ListClasses);
