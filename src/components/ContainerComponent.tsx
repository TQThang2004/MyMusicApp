import { View, Text, ScrollView, ImageBackground, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode,
    isScroll?: boolean,
    isImageBackground?: boolean
}

const ContainerComponent = (props: Props) => {

    const { children, isScroll, isImageBackground } = props

    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    )

    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>{returnContainer}</SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={{ flex: 1 }}>
            <View>{returnContainer}</View>
        </SafeAreaView>
    ) 
        
}

export default ContainerComponent