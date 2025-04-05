import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useRef } from 'react';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Feather';

const Onboarding = ({ navigation }: { navigation: any }) => {
    const swiperRef = useRef<Swiper>(null);
    const [index, setIndex] = React.useState(0);

    const handleNextSlide = () => {
        if (swiperRef.current && index < 2) {
            swiperRef.current.scrollBy(1); // Chuyển sang slide tiếp theo
        } else {
            navigation.navigate('LoginScreen')
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
                        <Text style={styles.title}>Music for your</Text>
                        <Text style={styles.subtitle}><Text style={styles.highlight}>wellbeing</Text></Text>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla in sed risus sit.</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/onboarding.png')}
                        style={styles.image}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start', width: '90%' }}>
                        <Text style={styles.title}>Trinh Quang Thang</Text>
                        <Text style={styles.subtitle}><Text style={styles.highlight}>wellbeing</Text></Text>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla in sed risus sit.</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/onboarding.png')}
                        style={styles.image}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start', width: '90%' }}>
                        <Text style={styles.title}>I love You</Text>
                        <Text style={styles.subtitle}><Text style={styles.highlight}>wellbeing</Text></Text>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla in sed risus sit.</Text>
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