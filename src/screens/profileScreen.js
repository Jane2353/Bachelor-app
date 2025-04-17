import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import Popup from '../components/popup';

const ProfileScreen = () => {
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [showOpsparetGenstand, setShowOpsparetGenstand] = useState(true);
  const [showBadges, setShowBadges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState({ title: '', imageSource: null });

  const handleBadgePress = (title, imageSource) => {
    setSelectedBadge({ title, imageSource });
    setModalVisible(true);
  };

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
      <View style={[styles.opsparetGenstandContainer]}>
        <Text style={styles.opsparetGenstand}>Du har sparet hvad der svarer til en: Smartphone</Text>
        <View style={styles.circle}>
          <Image style={styles.circleIcon} source={require('../../assets/smartphone-call.png')} />
        </View>
        <Text style={styles.opsparetGenstandVærdi}>Til en værdi af</Text>
        <Text style={styles.opsparetGenstandlilleText}>5000,-</Text>
      </View>
    )}
    {showBadges && (
      <View style={[styles.badgesContainer]}>
        <ScrollView contentContainerStyle={styles.badgesGrid} style={{ overflow: 'auto' }}>
          {badgeData.map((badge, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleBadgePress(badge.title, badge.imageSource)}
            >
              <Image style={styles.badgeImage} source={badge.imageSource} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )}
    <Popup
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title={selectedBadge.title}
      message=""
      imageSource={selectedBadge.imageSource}
    />
    </View>
  )
}

const badgeData = [
  { title: 'January 1', imageSource: require('../../assets/Badges/January_1.png') },
  { title: 'January 2', imageSource: require('../../assets/Badges/January_2.png') },
  { title: 'January 3', imageSource: require('../../assets/Badges/January_3.png') },
  { title: 'January 4', imageSource: require('../../assets/Badges/January_4.png') },
  { title: 'February 1', imageSource: require('../../assets/Badges/February_1.png') },
  { title: 'February 2', imageSource: require('../../assets/Badges/February_2.png') },
  { title: 'February 3', imageSource: require('../../assets/Badges/February_3.png') },
  { title: 'February 4', imageSource: require('../../assets/Badges/February_4.png') },
  { title: 'March 1', imageSource: require('../../assets/Badges/March_1.png') },
  { title: 'March 2', imageSource: require('../../assets/Badges/March_2.png') },
  { title: 'March 3', imageSource: require('../../assets/Badges/March_3.png') },
  { title: 'March 4', imageSource: require('../../assets/Badges/March_4.png') },
  { title: 'April 1', imageSource: require('../../assets/Badges/April_1.png') },
  { title: 'April 2', imageSource: require('../../assets/Badges/April_2.png') },
  { title: 'April 3', imageSource: require('../../assets/Badges/April_3.png') },
  { title: 'April 4', imageSource: require('../../assets/Badges/April_4.png') },
  { title: 'May 1', imageSource: require('../../assets/Badges/May_1.png') },
  { title: 'May 2', imageSource: require('../../assets/Badges/May_2.png') },
  { title: 'May 3', imageSource: require('../../assets/Badges/May_3.png') },
  { title: 'May 4', imageSource: require('../../assets/Badges/May_4.png') },
  { title: 'June 1', imageSource: require('../../assets/Badges/June_1.png') },
  { title: 'June 2', imageSource: require('../../assets/Badges/June_2.png') },
  { title: 'June 3', imageSource: require('../../assets/Badges/June_3.png') },
  { title: 'June 4', imageSource: require('../../assets/Badges/June_4.png') },
  { title: 'July 1', imageSource: require('../../assets/Badges/July_1.png') },
  { title: 'July 2', imageSource: require('../../assets/Badges/July_2.png') },
  { title: 'July 3', imageSource: require('../../assets/Badges/July_3.png') },
  { title: 'July 4', imageSource: require('../../assets/Badges/July_4.png') },
  { title: 'August 1', imageSource: require('../../assets/Badges/August_1.png') },
  { title: 'August 2', imageSource: require('../../assets/Badges/August_2.png') },
  { title: 'August 3', imageSource: require('../../assets/Badges/August_3.png') },
  { title: 'August 4', imageSource: require('../../assets/Badges/August_4.png') },
  { title: 'September 1', imageSource: require('../../assets/Badges/September_1.png') },
  { title: 'September 2', imageSource: require('../../assets/Badges/September_2.png') },
  { title: 'September 3', imageSource: require('../../assets/Badges/September_3.png') },
  { title: 'September 4', imageSource: require('../../assets/Badges/September_4.png') },
  { title: 'October 1', imageSource: require('../../assets/Badges/October_1.png') },
  { title: 'October 2', imageSource: require('../../assets/Badges/October_2.png') },
  { title: 'October 3', imageSource: require('../../assets/Badges/October_3.png') },
  { title: 'October 4', imageSource: require('../../assets/Badges/October_4.png') },
  { title: 'November 1', imageSource: require('../../assets/Badges/November_1.png') },
  { title: 'November 2', imageSource: require('../../assets/Badges/November_2.png') },
  { title: 'November 3', imageSource: require('../../assets/Badges/November_3.png') },
  { title: 'November 4', imageSource: require('../../assets/Badges/November_4.png') },
  { title: 'December 1', imageSource: require('../../assets/Badges/December_1.png') },
  { title: 'December 2', imageSource: require('../../assets/Badges/December_2.png') },
  { title: 'December 3', imageSource: require('../../assets/Badges/December_3.png') },
  { title: 'December 4', imageSource: require('../../assets/Badges/December_4.png') },
];

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
    height: 50,
    zIndex: 2, 
  },
  box: {
    backgroundColor: '#70a9e0',
    width: '50%', 
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4, // Added for Android shadow support
  },
  boxPressed: {
    backgroundColor: '#1976D2',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  boxText: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  greyContainer: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    alignItems: 'center',
    width: '100%',
    height: '60%',
    top: '-1%',
    zIndex: 0,
  },
  greyText: {
    color: 'black',
    fontSize: 15,
    marginTop: '7%',
  },
  opsparetGenstandContainer: {
    flexDirection: 'column',
    backgroundColor: '#bacfe3',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    top: '-1%',
    zIndex: 1,
  },
  opsparetGenstand: {
    color: 'black',
    fontsize: 15,
    alignItems: 'center',
    marginTop: '15%',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#bacfe3',
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
    color: 'black',
    fontSize: 15,
    marginTop: '2%',
  },
  opsparetGenstandlilleText: {
    color: 'black',
    fontSize: 15,
  },
  badgesContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#bacfe3',
    alignItems: 'center',
    width: '100%',
    top: '-1%',
    height: '50%', 
    zIndex: 1, 
  },
  badgesText: {
    color: 'black',
    fontSize: 15,
    marginTop: '7%',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10,
    marginEnd: 20,
    width: '100%',
    paddingBottom: 90,
  },
  badgeImage: {
    width: 80, 
    height: 80,
    margin: 5,
    resizeMode: 'contain',
  },
});

export default ProfileScreen;