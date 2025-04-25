import React, { useEffect, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import Icon1 from 'react-native-vector-icons/Feather';
import { appColor } from '../../constants/appColor';
import authenticationAPI from '../../api/authApi';
import { LoadingModal } from '../../modal';
import { Validate } from '../../utils/validate';

const initValue: any = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const RegisterScreen = ({ navigation }: { navigation: any }) => {

    const [values, setValues] = useState(initValue);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (values.username || values.email || values.password || values.confirmPassword) {
            setErrorMessage('');
        }
    }, [values.username, values.email, values.password, values.confirmPassword]);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values };
        data[`${key}`] = value;
        setValues(data);
    }

    const handleRegister = async () => {
        const { username, email, password, confirmPassword } = values;
    
        const validateEmail = Validate.email(email);
        const validatePassword = Validate.password(password);
    
        // Reset error
        setErrorMessage('');
    
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill all fields');
            return;
        }
    
        if (!validateEmail) {
            setErrorMessage('Invalid email format');
            return;
        }
    
        if (!validatePassword) {
            setErrorMessage('Password must be at least 8 characters');
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage('Password and confirmation do not match');
            return;
        }
    
        setLoading(true);
        try {
            // const res = await authenticationAPI.HandleAuthentication(
            //     '/register', 
            //     values, 
            //     'POST');
            
            // Xử lý khi thành công (ví dụ chuyển trang, hiển thị thông báo, v.v.)
        } catch (error) {
            // console.log(error);
            // setErrorMessage('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                        value={values.username}
                        onChange={val => handleChangeValue('username', val)}
                        placeholder="Enter your username"
                        affix={<Icon1 name="user" size={20} color="gray" />}
                    />

                    <InputComponent
                        value={values.email}
                        onChange={val => handleChangeValue('email', val)}
                        placeholder="Enter your email"
                        affix={<Icon1 name="mail" size={20} color="gray" />}
                    />

                    <InputComponent
                        value={values.password}
                        onChange={val => handleChangeValue('password', val)}
                        placeholder="Enter your password"
                        isPassword
                        affix={<Icon1 name="lock" size={20} color="gray" />}
                    />

                    <InputComponent
                        value={values.confirmPassword}
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        placeholder="Confirm your password"
                        isPassword
                        affix={<Icon1 name="edit-3" size={20} color="gray" />}
                    />

                    {
                        errorMessage && (
                            <TextComponent
                                text={errorMessage}
                                color='red'
                                styles={{ paddingVertical: 10 }}
                            />
                        )
                    }


                    <ButtonComponent
                        type="primary"
                        text="Register"
                        color={appColor.blue200}
                        textStyles={{ fontSize: 16 }}
                        onPress={handleRegister}
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
            <LoadingModal visible={loading} />
        </>
    );
}

export default RegisterScreen