import React ,{Component,PureComponent} from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  CheckBox } from 'react-native';
import styles from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Tab,
  Tabs,
  TabHeading,
  Segment,
  Fab,
  Toast,
  SwipeRow,
} from 'native-base';
//Realm
import {
  queryAllClass,
  deleteAllClass,
  deleteNewClass,
  updateNewClass,
  insertNewClass,
  insertNewStudent,
}from '../database/schema';
import realm from '../database/schema';
import {connect} from 'react-redux';


export class StudentModal extends Component{
  constructor(props){
    super(props);
    this.defaultState={
        name: '',
        surname: '',
        modalView: props.modalView,
    };
    this.state = this.defaultState;
    this._saveData = this._saveData.bind(this);
    this._passState = this._passState.bind(this);
  }

  _passState(){
    this.props.handleState(false);
    this.setState({
      modalView: false,
    });
  }

  _saveData(className){
    if(this.state.name.trim()=='' && this.state.surname.trim()==''){
      alert("Please enter student name and surname!");
      return;
    }else{
      const newStudent = {
        classId: className,
        id: Math.floor(Date.now() / 1000),
        name: this.state.name,
        surname: this.state.surname,
        creationDate: new Date(),
      };
      insertNewStudent(newStudent).then(()=>{
        Toast.show({
                text: 'Student saved successfully!',
                position: 'bottom',
          });
      }).catch((error)=>alert(`Insertion Error: ${error}`));
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      modalView: nextProps.modalView
    });
  }
  render(){
    return(
          <Modal
              animationType="none"
              transparent={true}
              visible={this.state.modalView}
              onRequestClose={()=>this.setState({modalVisible: false})}
            >
            <Body style={styles.inputcontainerModal}>
              <View style={{backgroundColor:"#0f6abc",alignItems:"center",justifyContent:"center",width:"100%",}}>
              <TextInput
                style = {styles.inputStyleModal}
                onChangeText={(Name) => this.setState({name: Name})}
                value={this.state.name}
                placeholder="Name"
                placeholderTextColor={"white"}
                clearTextOnFocus={true}
                underlineColorAndroid={'transparent'}
                />
              <TextInput
                style = {styles.inputStyleModal}
                onChangeText={(lastName) => this.setState({surname: lastName})}
                value={this.state.surname}
                placeholder="Surname"
                placeholderTextColor={"white"}
                clearTextOnFocus={true}
                underlineColorAndroid={'transparent'}
                />

                <View style={styles.marginTopButton}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.modalAddStudent}
                  onPress={()=>this._saveData(this.props.className)}
                  >
                      <Text style={styles.addStudentStyleModal}>Add Student</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                   activeOpacity={1}
                   style={styles.modalAddStudent}
                   onPress={()=>this._passState()}
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
//  connect((store)=>{
//   return{
//     className: store.classReducer
//   }
// })(StudentModal);

//==============================================================================
export class PalButtons extends Component{
  constructor(props){
    super(props);
    //setting default state
    this.defaultState = {
        presentStatus: true,
        absentStatus: true,
        lateStatus: true,
        status: null,
        buttonStatus:false,
        student_palStatus:[],
       };
    this.state = this.defaultState;
    this._presentButton = this._presentButton.bind(this);
    this._absentButton = this._absentButton.bind(this);
    this._lateButton = this._lateButton.bind(this);
    this._storeData = this._storeData.bind(this);
}

_storeData(currentData){
  tempArr.push(currentData);
}

_presentButton(props){
  this.setState({
    presentStatus: this.state.presentStatus ? false : true,
    absentStatus:true,
    lateStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Absent" || this.state.status == "Late" ) ? "Present" : null,
  });
  //data's object
  let itemObj = {
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Present",
    current_date: currentDate,
  };
  //calling _storeData function
  if(this.state.presentStatus == true){
    this._storeData(itemObj);
  }
}

_absentButton(props){
  this.setState({
    absentStatus: this.state.absentStatus ? false : true,
    lateStatus:true,
    presentStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Late" || this.state.status == "Present") ? "Absent" : null,
  });
  //data's object
  let itemObj ={
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Absent",
    current_date: currentDate,
  };
  //calling _storeData function
  if(this.state.absentStatus == true){
    this._storeData(itemObj);
  }
}
_lateButton(props){
  this.setState({
    lateStatus: this.state.lateStatus ? false : true,
    absentStatus:true,
    presentStatus:true,
    buttonStatus:true,
    status: (this.state.status == null || this.state.status == "Absent" || this.state.status == "Present") ? "Late" : null,
  });
  //data's object
  let itemObj ={
    user_id:props.userID,
    user_name:props.userName,
    user_lastName:props.userSurName,
    user_status:"Late",
    current_date: currentDate,
  };
  //calling _storeData function
  if(this.state.lateStatus == true){
    this._storeData(itemObj);
  }
}
render(){
    return(
          <View style={{flexDirection:"row",borderColor:"#0f6abc",borderBottomWidth:0.6}}>
              <TouchableHighlight
                disabled={this.state.buttonStatus}
                style={this.state.presentStatus ? styles.defaultButton : styles.presentIsChecked}
                onPress={()=>this._presentButton(this.props)}
                >
                <Text style={this.state.presentStatus ? styles.colorOffStatus : styles.colorOnStatus}>Present</Text>
              </TouchableHighlight>
              <TouchableHighlight
                disabled={this.state.buttonStatus}
                style={this.state.absentStatus ? styles.defaultButton : styles.absentIsChecked}
                onPress={()=>this._absentButton(this.props)}
                >
                <Text style={this.state.absentStatus ? styles.colorOffStatus : styles.colorOnStatus}>Absent</Text>
              </TouchableHighlight>
              <TouchableHighlight
                disabled={this.state.buttonStatus}
                style={this.state.lateStatus ? styles.defaultButton : styles.lateIsChecked}
                onPress={()=>this._lateButton(this.props)}
                >
                <Text style={this.state.lateStatus ? styles.colorOffStatus : styles.colorOnStatus}>Late</Text>
              </TouchableHighlight>
          </View>
    );
  }
}

export class BottomFab extends Component{
  constructor(props){
    super(props);
    this.state={
      active: false,
      modalView:props.StudentModalView,
      checkStatus: true,
      numberOfStudents: props.numberOfStudents,
    };
    this._sendData = this._sendData.bind(this);
    this._sendToFirebase = this._sendToFirebase.bind(this);
    this._handleState = this._handleState.bind(this);
    this._resetItems = this._resetItems.bind(this);
  }

_resetItems(props){
  tempArr=[];
  props.resetFlatlist();
}

_handleState(childCall){
    if(childCall == "undefined"){
      this.setState({
        modalView: !this.state.modalView
      });
    }else{
      this.setState({
        modalView: childCall
    });
  }
}

//make an array is the solution
_sendToFirebase(item){
//       let RegisteryDateRef = fireBase.database().ref("Registery/"+this.currentUserUid+"/"+fireBaseClassNode+"/"+item.user_id+"/Date/"+currentDate);
//       let RegisteryTotalRef = fireBase.database().ref("Registery/"+this.currentUserUid+"/"+fireBaseClassNode+"/"+item.user_id+"/Total/");
// //============================================================================
//         RegisteryDateRef.set({
//           status: item
//         });
// //==============================================================================
//         if(item.user_status=="Present"){
//           RegisteryTotalRef.once('value',(snap)=>{
//             if (!snap.hasChild("total_present")) {
//               return RegisteryTotalRef.update({
//                     total_present: 1
//                   });
//             }else{
//               snap = snap.val();
//               let prev_val = snap.total_present;
//               let update = prev_val+1;
//               return RegisteryTotalRef.update({
//                     total_present: update
//                   });
//                 }
//           });
//         }
// //==============================================================================
//         if(item.user_status=="Absent"){
//           RegisteryTotalRef.once('value',(snap)=>{
//             if (!snap.hasChild("total_absent")) {
//               return RegisteryTotalRef.update({
//                     total_absent: 1
//                   });
//             }else{
//               snap = snap.val();
//               let prev_val = snap.total_absent;
//               let update = prev_val+1;
//               return RegisteryTotalRef.update({
//                     total_absent: update
//                   });
//               }
//           });
//         }
//         if(item.user_status=="Late"){
//           RegisteryTotalRef.once('value',(snap)=>{
//             if (!snap.hasChild("total_late")) {
//               return RegisteryTotalRef.update({
//                     total_late: 1
//                   });
//             }else{
//               snap = snap.val();
//               let prev_val = snap.total_late;
//               let update = prev_val+1;
//               return RegisteryTotalRef.update({
//                     total_late: update
//                   });
//
//                 }
//           });
//         }
//     Toast.show({
//             text: 'Data successfully added!',
//             position: 'bottom',
//             type: "success",
//       });
//
// //should reset the array
//       return this._resetItems(this.props);
  }


_sendData(props){
  // console.log("props.numberOfStudents: "+this.state.numberOfStudents );
  // console.log("tempArr.length: "+ tempArr.length);
  // //FIRST:check if we have already this item in the database
  // if (tempArr.length != 0 && tempArr.length == props.numberOfStudents) {
  //   for (let i = 0; i < tempArr.length; i++) {
  //       let RegisteryDateRef = fireBase.database().ref("Registery/" + this.currentUserUid + "/" + fireBaseClassNode + "/" + tempArr[i].user_id + "/Date/");
  //       RegisteryDateRef.on('value',(snap)=>{
  //         snap.forEach((child)=>{
  //           if(child.key == currentDate){
  //             this.setState({
  //               checkStatus:false,
  //             },()=>{
  //               return Toast.show({
  //                   text: "Submitted!",
  //                   position: "bottom",
  //               });
  //             });
  //           }else{
  //             this.setState({
  //               checkStatus:true,
  //             });
  //           }
  //         });
  //         if(this.state.checkStatus == true){
  //           return this._sendToFirebase(tempArr[i]);
  //         }
  //       });
  //
  //     }
  //   } else {
  //       if (tempArr.length == 0) {
  //           Toast.show({
  //               text: "you did not select yet!",
  //               position: "bottom",
  //           });
  //       } else {
  //           Toast.show({
  //               text: `${this.state.numberOfStudents - tempArr.length} students left!`,
  //               position: "bottom",
  //           });
  //       }
  //   }
  }

componentWillReceiveProps(nextProps){
  this.setState({
    modalView: nextProps.StudentModalView,
    numberOfStudents: nextProps.numberOfStudents,
  });
}
  render(){
    return(
      <View>
          <Body>
            <StudentModal
              modalView={this.state.modalView}
              handleState={this._handleState}
              className={this.props.className}
            />
          </Body>
        <Fab
          active={this.state.active}
          direction="up"
          style={{ backgroundColor: '#0f6abc' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
          >
          <EvilIcons name="navicon" color="white" size={22}/>
          <Button
            onPress={() => this._handleState()}
            style={{ backgroundColor: '#0f6abc' }}
            >
            <Entypo name="plus" color="white" size={22}/>
          </Button>
          <Button
            style={{ backgroundColor: '#0f6abc' }}
            onPress={()=>this._sendData(this.props)}
            >
            <MaterialIcons name="check" color="white" size={22}/>
          </Button>
          <Button
            style={{ backgroundColor: '#0f6abc' }}
            onPress={()=>this._resetItems(this.props)}
            >
            <MaterialIcons name="refresh" color="white" size={22}/>
          </Button>
        </Fab>
      </View>
    );
  }
}
