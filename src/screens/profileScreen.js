import {StyleSheet, View, Image, Text} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.icon} source={require('../../assets/user.png')} />
        <Text style={styles.text}>Albert Filipsen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    paddingTop: '10%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40%',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: 'black',
  },
});

export default ProfileScreen;