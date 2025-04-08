import React, { useEffect, useState } from 'react'
import AuthNavigator from './src/navigators/AuthNavigator'
import { WelcomeScreen } from './src/screens'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import HomeNavigator from './src/navigators/HomeNavigator'

const App = () => {
    const [isShowWelcome, setIsShowWelcome] = useState(true)
    const [accessToken, setAccessToken] = useState('')

    const {getItem, setItem} = useAsyncStorage('accessToken')

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setIsShowWelcome(false)
        }, 1000)
        return () => clearTimeout(timeOut)
    }, [])

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {
        const token = await getItem()
        token && setAccessToken(token)
    }

    return <>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
        {
            isShowWelcome ? <WelcomeScreen /> : <NavigationContainer>
                {
                    accessToken ? <HomeNavigator /> : <AuthNavigator />
                }
            </NavigationContainer>
        }
    </>
}

export default App