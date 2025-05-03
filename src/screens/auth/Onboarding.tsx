import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useRef } from 'react';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({ navigation }: { navigation: any }) => {
    const swiperRef = useRef<Swiper>(null);
    const [index, setIndex] = React.useState(0);

    const handleNextSlide = async () => {
        if (swiperRef.current && index < 2) {
            swiperRef.current.scrollBy(1); // Chuyển sang slide tiếp theo
        } else {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            navigation.replace('LoginScreen');
        }
    };

    return (
        <View style={styles.container}>
            <Swiper
                ref={swiperRef}
                loop={false}
                showsPagination={false}
                onIndexChanged={(num) => setIndex(num)}
                index={index}
            >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start', width: '90%' }}>
                        <Text style={styles.title}>Listen Anytime</Text>
                        <Text style={styles.subtitle}><Text style={styles.highlight}>Unlimited Music</Text></Text>
                        <Text style={styles.description}>Easily discover and play millions of songs anytime, anywhere — just a tap away.</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/onboarding.png')}
                        style={styles.image}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start', width: '90%' }}>
                        <Text style={styles.title}>Your Vibe</Text>
                        <Text style={styles.subtitle}><Text style={styles.highlight}>Smart Suggestions</Text></Text>
                        <Text style={styles.description}>Personalized recommendations help you find the perfect song for every mood.</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/onboarding.png')}
                        style={styles.image}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start', width: '90%' }}>
                        <Text style={styles.title}>No Interruptions</Text>
                        <Text style={styles.subtitle}><Text style={styles.highlight}>Ad-Free Listening</Text></Text>
                        <Text style={styles.description}>Enjoy seamless, high-quality music with no ads — just pure sound.</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/onboarding.png')}
                        style={styles.image}
                    />
                </View>
            </Swiper>
            <View style={{ paddingHorizontal: 20, position: 'absolute', right: 0, left: 0, top: '35%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        handleNextSlide();
                    }}
                >
                    <Icon name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4ff',
    },

    title: {
        marginTop: 90,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    highlight: {
        color: '#7ba2e0',
    },
    description: {
        fontSize: 20,
        color: '#666',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    buttonContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#7ba2e0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginRight: 30,
    },

})

export default Onboarding