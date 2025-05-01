import { View, Text, StyleProp, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { TextStyle } from 'react-native'
import { TextComponent } from '.'
import { globalStyles } from '../styles/globalStyles'
import { appColor } from '../constants/appColor'
import { fontFamily } from '../constants/fontFamily'
import { ViewStyle } from 'react-native'


interface Props {
    icon?: ReactNode,
    text: string,
    type?: 'primary' | 'text' | 'link',
    color?: string,
    textColor?: string,
    styles?: StyleProp<ViewStyle>,
    textStyles?: StyleProp<TextStyle>,
    onPress?: () => void,
    iconFlex?: 'right' | 'left',
}
const buttonComponent = (props: Props) => {
    const { icon, text, type, color, textColor, styles, textStyles, onPress, iconFlex } = props
    return (
        type === 'primary' ?
            <TouchableOpacity
                onPress={onPress}
                style={[globalStyles.button,
                {
                    backgroundColor: color ?? appColor.blue400
                },
                styles
            ]}>
                {icon && iconFlex === 'left' && icon}
                <TextComponent 
                    text={text} 
                    color={textColor ?? appColor.textWhite}
                    font={fontFamily.font300}
                    styles={[textStyles, {
                        marginLeft: icon ? 12 : 0,
                        marginRight: icon && iconFlex === 'right' ? 12 : 0,
                    }]}
                />
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
            :
            <TouchableOpacity
                 onPress={onPress}
                 style={[
                     styles
                 ]}
             >
                 <TextComponent text={text} color={type==='link' ? appColor.blue400 : appColor.textWhite} styles={textStyles} />
         </TouchableOpacity>
    )
}

export default buttonComponent