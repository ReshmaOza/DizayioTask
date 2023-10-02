import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Image, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Camera from '../assets/images/camera.jpg'
import ImageJPG from '../assets/images/image.jpg';
import MicJPG from '../assets/images/mic.jpg';
import { galleryforImageClick, galleryforVideoClick, audioClick } from '../assets/commonComponets/commonFunctions';
import VideoPlayer from 'react-native-video-player';
import { AudioPlayer } from 'react-native-simple-audio-player'
import { actions } from '../redux/action/actionIndex'
import { useSelector } from 'react-redux'
import FullScreenImageModel from '../assets/commonComponets/fullScreenImageModel';

const NoteScreen = ({ navigation, route }) => {
    const Data = useSelector((state) => state.dataStateReducer)
    const notesData = route?.params?.isForEdit ? Data?.notesList[route.params.index] : Data?.dataStore
    const [titleText, setTitleText] = useState('')
    const [bodyText, setBodyText] = useState('')
    const [imageArray, setImageArray] = useState([])
    const [videoArray, setVideoArray] = useState([])
    const [audioArray, setAudioArray] = useState([])
    const [viewImage, setViewImage] = useState(false)
    const [imageURI, setImageURI] = useState('')

    // useEffect for header UI
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <TouchableOpacity onPress={() => backArrowButton()}>
                    <AntDesign name="arrowleft" size={25} color={'#000000'} style={{ margin: 10 }} />
                </TouchableOpacity>,
            headerRight: () =>
                <TouchableOpacity
                    onPress={() => onSaveButtonClick()}
                    style={styles.saveButtonStyle}
                >
                    <Text style={{ fontWeight: '400', fontSize: 14, color: '#579BC3', margin: 4 }}>Save</Text>
                </TouchableOpacity>
        })
    }, [])

    // useEffect for hardware back button 
    useEffect(() => {
        if (route.params.isForEdit) {
            const backAction = () => {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => navigation.pop() },
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();
        } else {
            const backAction = () => {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => onNoButtonSaveAlert() },
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();
        }
    }, []);

    // useEffcet for edit variables
    useEffect(() => {
        if (route?.params?.isForEdit) {
            setImageArray(notesData[route.params.index]?.ImageArray.length > 0 ? notesData[route.params.index].ImageArray : [])
            setAudioArray(notesData[route.params.index]?.AudioArray.length > 0 ? notesData[route.params.index].AudioArray : [])
            setVideoArray(notesData[route.params.index]?.VideoArray.length > 0 ? notesData[route.params.index].VideoArray : [])
            setBodyText(notesData[route.params.index]?.subText)
            setTitleText(notesData[route.params.index]?.Title)
        }
    }, [notesData])

    //for backArrowButton

    const backArrowButton = () =>{
        if(route.params.isForEdit){
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => navigation.pop() },
            ]);
        }else{
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => onNoButtonSaveAlert() },
            ]);
        }
    }

    //For getting image from mobile device
    const onImageIconClick = async () => {
        const result = await galleryforImageClick()
        let tempArray = []
        if (route.params.isForEdit) {
            tempArray = [...notesData.ImageArray, result]
        } else {
            tempArray = [...imageArray, result]
        }
        setImageArray(tempArray)
        storeNotesData('ImageArray', tempArray)
    }

    //For getting video from mobile device
    const onVideoIconClick = async () => {
        const result = await galleryforVideoClick()
        let tempArray = []
        if (route.params.isForEdit) {
            tempArray = [...notesData.VideoArray, result]
        } else {
            tempArray = [...videoArray, result]
        }
        setVideoArray(tempArray)
        storeNotesData('VideoArray', tempArray)
    }

    //For getting audio from mobile device
    const onAudioIconClick = async () => {
        const result = await audioClick()
        let tempArray = []
        if (route.params.isForEdit) {
            tempArray = [...notesData.AudioArray, result]
        } else {
            tempArray = [...audioArray, result]
        }
        setAudioArray(tempArray)
        storeNotesData('AudioArray', tempArray)
    }

    //For storing data in redux
    const storeNotesData = (key, value) => {
        if (route?.params?.isForEdit) {
            actions.notesStateAction({
                Title: key === 'Title' ? value : notesData.Title,
                subText: key === 'subText' ? value : notesData.subText,
                ImageArray: key === 'ImageArray' ? value : notesData.ImageArray,
                VideoArray: key === 'VideoArray' ? value : notesData.VideoArray,
                AudioArray: key === 'AudioArray' ? value : notesData.AudioArray,
                index: route.params.index
            })
        } else {
            actions.dataStateAction({
                Title: key === 'Title' ? value : titleText,
                subText: key === 'subText' ? value : bodyText,
                ImageArray: key === 'ImageArray' ? value : imageArray,
                VideoArray: key === 'VideoArray' ? value : videoArray,
                AudioArray: key === 'AudioArray' ? value : audioArray
            })
        }
    }

    //Save button 
    const onSaveButtonClick = () => {
        
        Alert.alert(
            "Alert",
            "Do you want to Save Notes Data", [
            {
                text: "NO",
                onPress: () => onNoButtonSaveAlert(),
                style: "cancel",
            },
            { text: "Yes", onPress: () => onYesButtonSaveAlert() },
        ]);
    }

    //If use want to save data in list
    const onYesButtonSaveAlert = async () => {
        setTimeout(async () => {
            if (route.params.isForEdit) {
                actions.addNewNotesAction({
                    index: route.params.index
                })
            }
            else {
                console.log("ffg")
                actions.addNewNotesAction({
                })
            }
            navigation.pop()
        }, 200);
    }

    //If use not want to save data in list
    const onNoButtonSaveAlert = () => {
        if (route.params.isForEdit) {
            navigation.pop()
        }else{
            setTimeout(() => {
                actions.resetDataAction({
                })
                navigation.pop()
            }, 200);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
            {/* Title text input */}
            <TextInput
                value={notesData.Title}
                style={[styles.textInputStyle, { fontSize: 18 }]}
                placeholderTextColor={'grey'}
                placeholder={'Title'}
                onChangeText={(text) => {
                    setTitleText(text),
                        storeNotesData('Title', text)
                }}
                onEndEditing={(e) => {
                    storeNotesData('Title', e.nativeEvent.text)
                }}
                editable={!route.params.isForEdit}
                multiline
            />
            {/* Sub text  */}
            <ScrollView>
                <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={20}>
                    <TextInput
                        value={notesData.subText}
                        style={[styles.textInputStyle, { fontSize: 14 }]}
                        placeholder={'Start typing.....'}
                        placeholderTextColor={'grey'}
                        onChangeText={text => [
                            setBodyText(text),
                            storeNotesData('subText', text)
                        ]}
                        onEndEditing={(e) => {
                            storeNotesData('subText', e.nativeEvent.text)
                        }}
                        multiline
                    />
                </KeyboardAvoidingView>
                {/* image view */}
                <View style={{ width: '100%', }}>
                    {notesData?.ImageArray &&
                        notesData?.ImageArray.map((item, index) => {

                            return (
                                <TouchableOpacity style={styles.imageVideoViewStyle}
                                    onPress={() => [setViewImage(true), setImageURI(item[0].uri)]}
                                >
                                    <View key={index}>
                                        <Image resizeMode={'contain'} source={{ uri: item[0].uri }} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {/* video view */}
                <View style={{ width: '100%' }}>
                    {notesData?.VideoArray &&
                        notesData?.VideoArray.map((item, index) => {
                            return (
                                <View key={index} style={styles.imageVideoViewStyle}>
                                    <VideoPlayer
                                        video={{ uri: item[0].uri }}
                                        videoWidth={50}
                                        videoHeight={40}
                                        thumbnail={{ uri: item.uri }}
                                        //duration={30}
                                        autoplay={false}
                                        showDuration={true}
                                    //isSeeking={true}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
                {/* audio view */}
                <View style={{ width: '100%' }}>
                    {notesData?.AudioArray &&
                        notesData?.AudioArray.map((item, index) => {
                            return (
                                <View key={index} style={{ width: '100%', margin: 10 }}>
                                    <AudioPlayer
                                        url={item[0].uri}
                                        style={{ backgroundColor: '#D3E2ED', paddingTop: 20 }}
                                        minimumTrackTintColor={'red'}
                                        maximumTrackTintColor={'green'}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

            {/* Icon Buttons View */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                <TouchableOpacity
                    onPress={() => onImageIconClick()}
                    style={styles.bottomButtonImageStyle}>
                    <Image style={{ width: 25, height: 20 }} source={ImageJPG} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onVideoIconClick()}
                    style={styles.bottomButtonImageStyle}>
                    <Image style={{ width: 25, height: 20 }} source={Camera} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onAudioIconClick()}
                    style={styles.bottomButtonImageStyle}>
                    <Image style={{ width: 25, height: 20 }} source={MicJPG} />
                </TouchableOpacity>
            </View>
            {/* image model */}
            {
                viewImage && (
                    <FullScreenImageModel
                        showModal={viewImage}
                        data={imageURI}
                        closemodel={() => setViewImage(false)}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    saveButtonStyle: {
        backgroundColor: '#D3E2ED',
        flexDirection: 'row',
        alignItems: 'center',
        width: 93,
        height: 38,
        justifyContent: 'center',
        alignContent: 'space-around',
        borderRadius: 8,
        margin: 15,
        fontFamily:'Roboto',
    },
    textInputStyle: {
        padding: 10,
        margin: 4,
        fontWeight: '400',
        color: '#272728',
        fontFamily:'Roboto',
    },
    bottomButtonImageStyle: {
        width: 65,
        height: 38,
        backgroundColor: '#E9F1F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    imageVideoViewStyle: {
        width: '100%',
        height: 301,
        margin: 10,
        backgroundColor: '#000000'
    }
})

export default NoteScreen