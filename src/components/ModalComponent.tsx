import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { ButtonComponent, RowComponent } from '.'

interface Props {
    visible?: boolean
    onClose?: () => void
    onConfirm?: () => void
    type?: 'confirm' | 'Complete'
    children?: ReactNode
}

const ModalComponent = (props: Props) => {

    const { visible, onClose, onConfirm, type, children } = props

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View
                style={styles.overlay}
            >
                <View style={styles.container}>
                    {children}
                    {
                        type === 'confirm' ? (
                            <RowComponent
                                styles={{
                                    width: '50%'
                                }}
                            >
                                <ButtonComponent
                                    type='primary'
                                    text='Cancel'
                                    onPress={onClose}
                                />
                                <ButtonComponent
                                    type='primary'
                                    text='Confirm'
                                    onPress={onConfirm}
                                />
                            </RowComponent>
                        ) : (
                            <ButtonComponent
                                type='primary'
                                text='Done'
                                onPress={onClose}
                            />
                        )
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(179, 172, 172, 0.76)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ModalComponent