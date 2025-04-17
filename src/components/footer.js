import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();
    console.log(navigation);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Front')}>
                <Image style={styles.icon} source={require('../../assets/home.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image style={styles.icon} source={require('../../assets/user.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AccountSetup')}>
                <Image style={styles.icon} source={require('../../assets/plus.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
                <Image style={styles.icon} source={require('../../assets/statistics.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                console.log('Navigating to FileUploadScreen');
                navigation.navigate('FileUpload');
            }}>
                <Image style={styles.icon} source={require('../../assets/upload-icon.png')} />
            </TouchableOpacity>
        </View>
    );
};

export const ConditionalFooter = () => {
    const state = useNavigationState(state => state);
    if (!state) {
        return null;
    }
    const currentRouteName = state.routes[state.index].name;

    if (currentRouteName === 'Login') {
        return null;
    }

    return <Footer />;
};

const styles = StyleSheet.create({
    container: {
        height: '10%',
        width: '100%',
        backgroundColor: '#1976D2',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        tintColor: 'white',
    },
});

export default Footer;