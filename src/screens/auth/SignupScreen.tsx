import React, { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { ButtonComponent, InputComponent, ModalComponent, RowComponent, TextComponent } from '../../components';
import { appColor } from '../../constants/appColor';

const SignupScreen = ({ navigation }: { navigation: any }) => {

  const [showModal, setShowModal] = useState(false); 

  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

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
          text="Verify with Phone Number"
          color={appColor.blue200}
          textStyles={{ fontSize: 16 }}
          onPress={() => setShowModal(true)}
        />

        <ModalComponent visible={showModal} type="Complete" onClose={() => setShowModal(false)}>
          <TextComponent text="Enter OTP" title color={appColor.textBlack} styles={{ textAlign: 'center' }} />
          <TextComponent
            text="A verification code has been sent to your email address."
            color={appColor.textBlack}
            styles={{ textAlign: 'center', paddingBottom: 15 }}
          />
          <RowComponent>
            {[0, 1, 2, 3].map((_, index) => (
              <TextInput
                key={index}
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  fontSize: 20,
                  backgroundColor: '#F9F9F9',
                  marginHorizontal: 5,
                  marginVertical: 10
                }}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                ref={(ref) => {
                  if (ref) {
                    inputs.current[index] = ref;
                  }
                }}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </RowComponent>
          <RowComponent
            styles={{
              paddingVertical: 10,
            }}
          >
            <TextComponent
              text='Did’t receive the code ? '
              color={appColor.textBlack}
            />
            <ButtonComponent
              text=' Resend'
              type='link'
              textStyles={{ fontSize: 16 }}
              onPress={() => navigation.navigate('RegisterScreen')}
            />
          </RowComponent>
        </ModalComponent>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default SignupScreen;
