
import React, { useEffect, useState } from 'react';
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



const Login = ({ navigation, setIsLoggedIn }: any ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '398598335148-ugdiuiai2bh7igc16t8619nvfeo5l4qv.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
  
    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
  
    if (!idToken) {
      throw new Error('No ID token found');
    }
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

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

        <ButtonComponent
          text='Forgot password ?'
          type='link'
          textStyles={{ textAlign: 'right', fontSize: 14 }}
          styles={{ width: '100%', paddingBottom: 12 }}
        />

        <ButtonComponent
          type="primary"
          text="Login"
          onPress={handleLogin}
          color={appColor.blue200}
          textStyles={{ fontSize: 16 }}
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

