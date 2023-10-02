import store from "../store";
import {dataStateReducer , notesStateReducer,addNewNotesOnSave,copyListData,resetData} from "../reducer/dataReducer";

const {dispatch} = store

export function dataStateAction(data) {
    //console.log('dataStateAction Action Data',data);
    dispatch(dataStateReducer(data))
}
export function notesStateAction(data) {
    //console.log('notesStateAction Action Data',data);
    dispatch(notesStateReducer(data))
}
export function addNewNotesAction(data) {
    //console.log('addNewNotesOnSave Action Data',data);
    dispatch(addNewNotesOnSave(data))
}

export function copyListDataAction (data){
    //console.log('copyListDataAction Action Data',data);
    dispatch(copyListData(data))
}

export function resetDataAction (){
    //console.log('resetDataAction Action Data');
    dispatch(resetData())
}