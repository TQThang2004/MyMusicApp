import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children: ReactNode
    justifyContent?: ViewStyle['justifyContent']
    styles?: StyleProp<ViewStyle>
}

const RowComponent = (props: Props) => {

    const { children, justifyContent, styles } = props

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: justifyContent ?? 'center',
        },
        styles,
      ]}
    >
      {children}
    </View>
  )
}

export default RowComponent