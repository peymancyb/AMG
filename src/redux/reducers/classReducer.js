const classState = {
  className:null,
};

//CCN: change class name
export default function ClassReducer(state=classState,action){
  switch (action.type) {
    case "CCN":
    return {...state,className:action.payload};
      break;
    default:
    return state;
  }
}
