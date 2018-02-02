import Realm from 'realm';
//realm schema has a name and properties property.
//name can be string

//Each property has a name and is described by either a string containing
//the property’s type, or an object with name, type, objectType, optional,
//default, and indexed fields.

//optionals
//Properties can be made optional by specifying the optional designator in your
//property definition, or with the shorthand syntax, by appending a ? to the type name:


//schema name: its like table Name

//class schema
export const CLASSLIST_SCHEMA = "ClassList";
export const CLASSNAME_SCHEMA = "ClassName";

//student schema
export const STUDENTLIST_SCHEMA = 'StudentList';
export const STUDENT_SCHEMA = 'Student';


//now defining the schema

// class schema
export const ClassNameSchema = {
  name:CLASSNAME_SCHEMA,
  primaryKey:'id',//its not auto-generated!
  properties:{
    id:'int',
    name:{type:'string',indexed:true},
    descreption:{type:'string',indexed:true},
    stateStatus:{type:'bool',default:false},
  }
};
export const ClassSchema = {
  name:CLASSLIST_SCHEMA,
  primaryKey:'id',//its not auto-generated!
  properties:{
    id:'int',
    name:'string',
    descreption:'string',
    creationDate:'date',
    toclass:{type:'list',objectType:CLASSNAME_SCHEMA},
  }
};

//student schema
export const StudentSchema = {
  name:STUDENT_SCHEMA,
  primaryKey:'id',//its not auto-generated!
  properties:{
      id:'int',
      name:{type:'string',indexed:true},
      surname:{type:'string',indexed:true},
      stateStatus:{type:'bool',default:false},
  }
};
export const StudentListSchema = {
  name:STUDENTLIST_SCHEMA,
  primaryKey:'id',//its not auto-generated!
  properties:{
    classId:'int',
    id:'int',
    name:'string',
    surname:'string',
    creationDate:'date',
    tostudent:{type:'list',objectType:STUDENT_SCHEMA},
  }
};

const databaseOptions ={
  path:'attendanceApp.realm',
  schema:[ClassSchema,ClassNameSchema,StudentSchema,StudentListSchema],
  schemaVersion:0,
}


//insertStudent
export const insertNewStudent = newStudent => new Promise((resolve,reject)=>{
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      realm.create(STUDENTLIST_SCHEMA,newStudent);
      resolve(newStudent);
    });
  }).catch((error)=>reject(error));
});
//student query
export const queryAllStudents = (currentClass) => new Promise((resolve,reject)=>{
  console.log(currentClass);
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      let allStudents = realm.objects(STUDENTLIST_SCHEMA);
      let currentStudent = allStudents.filtered(`classId = ${currentClass}`);
      resolve(currentStudent);
    });
  }).catch((error)=>reject(error));
});


//create
export const insertNewClass = newClass => new Promise((resolve,reject)=>{
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      realm.create(CLASSLIST_SCHEMA,newClass);
      resolve(newClass);
    });
  }).catch((error)=>reject(error));
});


//update
export const updateNewClass = ClassList => new Promise((resolve,reject)=>{
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      let updatingNewClass =  realm.objectForPrimaryKey(CLASSLIST_SCHEMA,ClassList.id);
      updatingNewClass.name = ClassList.name;
      resolve();
    });
  }).catch((error)=>reject(error));
});


//delete
export const deleteNewClass = deleteClassList => new Promise((resolve,reject)=>{
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      let deletingNewClass =  realm.objectForPrimaryKey(CLASSLIST_SCHEMA,deleteClassList);
      realm.delete(deletingNewClass);
      resolve();
    });
  }).catch((error)=>reject(error));
});

//deleting all
export const deleteAllClass = () => new Promise((resolve,reject)=>{
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      let allClass =  realm.objects(CLASSLIST_SCHEMA);
      realm.delete(allClass);
      resolve();
    });
  }).catch((error)=>reject(error));
});




//query all
export const queryAllClass = () => new Promise((resolve,reject)=>{
  Realm.open(databaseOptions).then(realm=>{
    realm.write(()=>{
      let allClasses =  realm.objects(CLASSLIST_SCHEMA);
      resolve(allClasses);
    });
  }).catch((error)=>reject(error));
});


export default new Realm(databaseOptions);
