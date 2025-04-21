import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextComponent } from '../components'
import { appColor } from '../constants/appColor'

interface Props {
    visible: boolean
    mess?: string
}

const LoadingModal = (props: Props) => {
    const { visible, mess } = props
  return (
    <Modal 
        visible={visible} 
        style={{ flex: 1 }} 
        transparent 
        statusBarTranslucent
    >
        <View
            style={{ 
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator size={50} color={appColor.textWhite}/>
            <TextComponent text='' title flex={0}/>
        </View>
    </Modal>
  )
}

export default LoadingModal