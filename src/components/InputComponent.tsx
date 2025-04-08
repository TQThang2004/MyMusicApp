import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import { appColor } from '../constants/appColor'

interface Props {
  value: string,
  onChange: (val: string) => void,
  affix?: ReactNode,
  placeholder?: string,
  suffix?: ReactNode,
  isPassword?: boolean,
}

const InputComponent = (props: Props) => {

  const { value, onChange, affix, placeholder, suffix, isPassword } = props
  
  const [isShowPassword, setIsShowPassword] = React.useState(isPassword ?? false)

  return (
    <View style={globalStyles.input}>

      {affix ?? affix}
      
      <TextInput
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPassword}
        style={{ flex: 1, padding: 10 }}
        placeholderTextColor={appColor.textGray}
      />
      
      {suffix ?? suffix}

      {
        isPassword && (
          <TouchableOpacity
            onPress={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <Icon name='eye-off' size={20} color={appColor.textGray}/>
            ) : (
              <Icon name='eye' size={20} color={appColor.textGray}/>
            )}
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default InputComponent