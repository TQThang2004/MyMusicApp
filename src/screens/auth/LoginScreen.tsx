
import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ButtonComponent, InputComponent, RowComponent, TextComponent } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import { appColor } from '../../constants/appColor';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../api/authApi';
import { LoadingModal } from '../../modal';
import { AuthContext } from '../../context/AuthContext';

const initValue: any = {
  email: '',
  password: ''
};

const Login = ({ navigation }: any) => {
  const [values, setValues] = useState(initValue);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  }

  // const handleLogin = () => {
  //   setIsLoggedIn(true)
  // }

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '398598335148-ugdiuiai2bh7igc16t8619nvfeo5l4qv.apps.googleusercontent.com',
  //   });
  // }, []);

  const handleLogin = async () => {
    const { email, password } = values;
    const validateEmail = Validate.email(email);
    const validatePassword = Validate.password(password);

    setErrorMessage('');

    if (!email || !password) {
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

    setLoading(true);
    try {
      console.log('values', values);
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        values,
        'POST'
      );
      console.log('res', res);

      const token = res.data?.token;
      console.log('token', token);
      login(token);

    } catch (error) {
      console.log('error', error);
      const err = error as any;
      setErrorMessage(err)
    } finally {
      setLoading(false);
    }
  }

  async function onGoogleButtonPress() {

    console.log('Google button pressed');
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    console.log('GoogleSignin.signIn() called');
    const signInResult = await GoogleSignin.signIn();
    console.log('signInResult', signInResult);
    let idToken = signInResult.data?.idToken;

    console.log('idToken', idToken);

    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

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
            text="Welcome Back"
            title
            color={appColor.textBlack}
          />
          <TextComponent
            text="Please login to your account using email or social networks"
            color={appColor.textGray}
            styles={{
              textAlign: 'center',
              paddingHorizontal: 20,
              paddingBottom: 15,
            }}
          />
          <ButtonComponent
            type="primary"
            text="Login with Facebook"
            color="white"
            textStyles={{ color: appColor.textBlack }}
            iconFlex="left"
            icon={<Icon name="facebook" size={20} color={appColor.blue200} />}
          />
          <ButtonComponent
            type="primary"
            text="Login with Google"
            color="white"
            textStyles={{ color: appColor.textBlack }}
            iconFlex="left"
            onPress={onGoogleButtonPress}
            icon={<Icon name="google" size={20} />}
          />

          <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>Or continue with social account</Text>
            <View style={styles.line} />
          </View>

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

          <ButtonComponent
            text='Forgot password ?'
            type='link'
            textStyles={{ textAlign: 'right', fontSize: 14 }}
            styles={{ width: '100%', paddingBottom: 12 }}
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
            text="Login"
            color={appColor.blue200}
            textStyles={{ fontSize: 16 }}
            onPress={handleLogin}
          />

          <RowComponent>
            <TextComponent
              text='Did’t have an account?'
              color={appColor.textBlack}
            />
            <ButtonComponent
              text=' Register'
              type='link'
              textStyles={{ fontSize: 16 }}
              onPress={() => navigation.navigate('RegisterScreen')}
            />
          </RowComponent>

        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  text: {
    marginHorizontal: 10,
    color: '#aaa',
    fontSize: 14,
  },
});

export default Login;

