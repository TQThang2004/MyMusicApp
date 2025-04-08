import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { appColor } from '../constants/appColor'
import { fontFamily } from '../constants/fontFamily'


interface Props {
    text: string,
    color?: string,
    size?: number,
    flex?: number,
    font?: string,
    title?: boolean
    styles?: StyleProp<TextStyle>,
}
const TextComponent = (props: Props) => {
    const { text, color, size, flex, font,title ,styles }: Props = props
  return (
    <View>
      <Text
        style={[
          {
            color: color ?? appColor.textWhite,
            fontSize: size !== undefined ? size : title ? 28 : 16,
            flex: flex ?? 0,
            fontFamily: font ?? title ? fontFamily.font500 : fontFamily.font200,
          },
          styles,
        ]}
      >{text}</Text>
    </View>
  )
}

export default TextComponent