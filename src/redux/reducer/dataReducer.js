import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash";
import AsyncStorage from '@react-native-async-storage/async-storage'

const init_state = {
    dataStore: [],
    notesList: []
}

export const dataStateSlice = createSlice({
    name: 'dataStateReducer',
    initialState: init_state,
    reducers: {
        dataStateReducer: (state, data) => {
            return {
                ...state,
                dataStore: data.payload
            }
        },
        notesStateReducer: (state, data) => {
            const temp = _.cloneDeep(state.notesList)
            temp[data.payload.index].Title = data.payload.Title
            temp[data.payload.index].subText = data.payload.subText
            temp[data.payload.index].ImageArray = data.payload.ImageArray
            temp[data.payload.index].VideoArray = data.payload.VideoArray
            temp[data.payload.index].AudioArray = data.payload.AudioArray
            return {
                ...state,
                notesList: temp,
            }
        },
        addNewNotesOnSave: (state, data) => {
            const tempNotesData = _.cloneDeep(state.notesList)
            const tempdataStore = _.cloneDeep(state.dataStore)
            const tempasynstore = []
            // console.log("tempdataStore addNewNotesOnSave reducer",tempdataStore)
            // console.log("tempNotesData addNewNotesOnSave reducer",tempNotesData)
            if (data.payload?.index + 1) {
                tempNotesData[data.payload.index] = tempNotesData[data.payload?.index]
                asyncStoreFunction(tempNotesData)
            } else {
                
                if(tempNotesData !== null){
                    tempNotesData.push(tempdataStore)
                    asyncStoreFunction(tempNotesData)
                }else{
                    tempasynstore.push(tempdataStore)
                    asyncStoreFunction(tempasynstore)
                }
               
            }
            state.notesList = tempNotesData,
            state.dataStore = []
        },
        copyListData: (state, data) => {
            //console.log("copyListData reducer",data.payload.notesList)
            state.notesList = data.payload.notesList
        },
        resetData : (state,data)=>{
            // state.notesList = [],
            // state.dataStore = []
            return{
                ...state,
                dataStore : [],
                notesList : []
            }
        }
    }
})

export const { dataStateReducer, notesStateReducer, addNewNotesOnSave ,copyListData,resetData} = dataStateSlice.actions
export default dataStateSlice.reducer


const asyncStoreFunction = async(value) =>{
    try {
        const parseValue = JSON.stringify(value)
        //console.log("parseValueparseValue",parseValue)
        await AsyncStorage.setItem('key', parseValue)
    } catch (e) {
        // return Alert.alert('Error While Storing for KEY:', "key" + ' ', e)
        console.log('Error While Storing for KEY:', "key" + ' ', e)
    }
}