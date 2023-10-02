import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, TextInput, Alert } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';
import { actions } from '../redux/action/actionIndex';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NoteListScreen = ({ navigation }) => {

    const notesListData = useSelector((state) => state.dataStateReducer)
    //console.log("notesListData",notesListData)
    const focus = useIsFocused()

    //useEffcet for getting async stores data
    useEffect(() => {
        data()
    }, [focus])

//for getting async stores data
    const data = async () => {
        try {
            const data = await AsyncStorage.getItem('key')
            let temp = JSON.parse(data)
            actions.copyListDataAction({
                ...notesListData,
                notesList: temp
            })
        } catch (e) {
            console.log("error in catch", e)
        }
    }

    //Flatlist UI
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => [navigation.navigate('NoteScreen', { isForEdit: true, isNewNote: false, index: index, item: item })
                ]}
                style={styles.cardStyle}>
                <Text style={{color:'#272728',fontFamily:'Roboto',fontWeight:'700',lineHeight:19,fontSize:15}}>{item.Title}</Text>
                <TextInput
                    value={item.subText}
                    editable={false}
                    style={{color:'#272728',fontFamily:'Roboto',fontWeight:'400',lineHeight:19,fontSize:13}}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F3EFEF', }}>
            {/* Notes list view */}
            {
                notesListData.notesList?.length > 0 &&
                <View style={{marginBottom:10}}>
                    <FlatList
                        data={notesListData.notesList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        keyboardShouldPersistTaps={'handled'}
                    />
                </View>
            }
            {/* New button UI */}
            <TouchableOpacity
                onPress={() => navigation.navigate('NoteScreen', { isForEdit: false, isNewNote: true })}
                style={styles.newButtonStyle}
            >
                <AntDesign name="plus" size={20} color={'#ffffff'} style={{ margin: 4 }} />
                <Text style={{fontFamily:'Roboto', fontWeight: '400', fontSize: 14, color: '#ffffff', margin: 4 }}>NEW</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    newButtonStyle: {
        backgroundColor: '#579BC3',
        flexDirection: 'row',
        alignItems: 'center',
        width: 113,
        height: 57,
        justifyContent: 'center',
        alignContent: 'space-around',
        borderRadius: 12,
        marginTop: windowHeight - 170,
        left: windowWidth - 130,
        position: 'absolute',
        fontFamily:'Roboto'
    },
    cardStyle: {
        width: windowWidth - 20,
        borderRadius: 13,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 20,
        margin: 4
    }
})

export default NoteListScreen