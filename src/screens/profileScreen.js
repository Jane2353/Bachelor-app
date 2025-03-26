import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Directions } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [showOpsparetGenstand, setShowOpsparetGenstand] = useState(true);
  const [showBadges, setShowBadges] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.icon} source={require('../../assets/user.png')} />
        <Text style={styles.text}>Albert Filipsen</Text>
        <Text style={styles.textSmall}>Sparegris: </Text>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, isPressed1 && styles.boxPressed]}
          onPressIn={() => setIsPressed1(true)}
          onPressOut={() => {
            setIsPressed1(false);
            setShowOpsparetGenstand(true); 
            setShowBadges(false); // Switch to Opsparet Genstand container
          }}
          activeOpacity={1}
        >
          <Text style={styles.boxText}>Opsparet genstand</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, isPressed2 && styles.boxPressed]}
          onPressIn={() => setIsPressed2(true)}
          onPressOut={() => {
            setIsPressed2(false);
            setShowBadges(true);
            setShowOpsparetGenstand(false); // Switch to Badges container
          }}
          activeOpacity={1}
        >
          <Text style={styles.boxText}>Badges</Text>
        </TouchableOpacity>
      </View>
      {showOpsparetGenstand && (
        <View style={styles.opsparetGenstandContainer}>
          <Text style={styles.opsparetGenstand}>Du har sparet hvad der svarer til en:</Text>
          <Text style={styles.opsparetGenstandVærdi}>Smartphone</Text>
          <View style={styles.circle}>
            <Image style={styles.circleIcon} source={require('../../assets/smartphone-call.png')} />
          </View>
          <Text style={styles.opsparetGenstandVærdi}>Til en værdi af</Text>
          <Text style={styles.opsparetGenstandlilleText}>5000,-</Text>
        </View>
      )}
      {showBadges && (
        <View style={styles.badgesContainer}>
          <Text style={styles.badgesText}>Your Badges</Text>
          {/* Add your badges content here */}
        </View>
      )}
    </View>
  )
}

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
  textSmall: {
    color: 'black',
    fontSize: 14,
    marginBottom: '20%',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    height: '5%',
  },
  box: {
    backgroundColor: 'grey',
    width: '50%', 
    height: '100%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxPressed: {
    backgroundColor: '#5e5e5e',
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  boxText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
  },
  greyContainer: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    top: '-1%',
    zIndex: '-1',
  },
  greyText: {
    color: 'white',
    fontSize: 15,
    marginTop: '7%',
  },
  opsparetGenstandContainer: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    top: '-1%',
    zIndex: '-1',
  },
  opsparetGenstand: {
    color: 'white',
    fontsize: 15,
    alignItems: 'center',
    marginTop: '7%',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    resizeMode: 'contain',
  },
  circleIcon: {
    tintColor: 'black',
    resizeMode:'contain',
    width: 60,
    height: 60,
  },
  opsparetGenstandVærdi: {
    color: 'white',
    fontSize: 15,
    marginTop: '2%',
  },
  opsparetGenstandlilleText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'light',
  },
  badgesContainer: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    top: '-1%',
    zIndex: '-1',
  },
  badgesText: {
    color: 'white',
    fontSize: 15,
    marginTop: '7%',
  },
});

export default ProfileScreen;
