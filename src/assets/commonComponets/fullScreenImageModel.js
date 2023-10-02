import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react'
import Modal from 'react-native-modal';

const FullScreenImageModel = ({ showModal, data, closemodel }) => {

    const [showModalFalse, setshowModalFalse] = useState(showModal)

    //close function
    const onCloseModal = () => {
        setshowModalFalse(false)
        setTimeout(() => {
            closemodel(false)
        }, 100);
    }

    return (
        <Modal
            isVisible={showModal}
            animationIn='fadeIn'
            size="full"
            animationInTiming={500}
            transparent={false}
            onBackButtonPress={onCloseModal}
            onBackdropPress={onCloseModal}
            style={styles.modalView}
        >
            <View style={{ height: '100%', width: '100%', alignSelf: 'center' }}>
                <Image
                    source={{ uri: data }}
                    style={{ height: '100%', width: '100%', alignSelf: 'center' }}
                    resizeMode={'contain'}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    }
})

export default FullScreenImageModel