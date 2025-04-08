import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import { appColor } from '../../constants/appColor';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{ width: 200, height: 200 }}
                />
                <TextComponent
                    text="Create new account"
                    title
                    color={appColor.textBlack}
                />
                <TextComponent
                    text="Set up your username and password. You can always change it later."
                    color={appColor.textGray}
                    styles={{
                        textAlign: 'center',
                        paddingHorizontal: 20,
                        paddingBottom: 15,
                    }}
                />

                <InputComponent
                    value={email}
                    onChange={val => setEmail(val)}
                    placeholder="Enter your username"
                    affix={<Icon1 name="user" size={20} color="gray" />}
                />

                <InputComponent
                    value={email}
                    onChange={val => setEmail(val)}
                    placeholder="Enter your email"
                    affix={<Icon1 name="mail" size={20} color="gray" />}
                />

                <InputComponent
                    value={password}
                    onChange={val => setPassword(val)}
                    placeholder="Enter your password"
                    isPassword
                    affix={<Icon1 name="lock" size={20} color="gray" />}
                />

                <InputComponent
                    value={password}
                    onChange={val => setPassword(val)}
                    placeholder="Confirm your password"
                    isPassword
                    affix={<Icon1 name="edit-3" size={20} color="gray" />}
                />

                <ButtonComponent
                    type="primary"
                    text="Register"
                    color={appColor.blue200}
                    textStyles={{ fontSize: 16 }}
                />

                <SpaceComponent
                    height={100}
                />

                <RowComponent>
                    <TextComponent
                        text='Already have an account ?'
                        color={appColor.textBlack}
                    />
                    <ButtonComponent
                        text=' Login'
                        type='link'
                        textStyles={{ fontSize: 16 }}
                        onPress={() => navigation.navigate('LoginScreen')}
                    />
                </RowComponent>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen