import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import NavigationButtons from '../components/NavigationButtons';
import { LinearGradient } from 'expo-linear-gradient';
import { getUncategorizedCount, subscribeToUncategorizedCount } from '../utils/globalState';

const DonutChart = ({ percentage, total }) => {
  const data = {
    data: [percentage / total],
  };

  return (
    <View style={styles.donutChartContainer}>
      <View style={styles.donutChartWrapper}>
        <ProgressChart
          data={data}
          width={200}
          height={200}
          strokeWidth={30}
          radius={75}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(233, 113, 113, ${opacity})`,
          }}
          hideLegend={true}
        />
      </View>
      <View style={styles.donutChartTextContainer}>
        <Text style={styles.donutChartPercentage}>{percentage}</Text>
        <View style={styles.donutChartDivider} />
        <Text style={styles.donutChartTotal}>{total}</Text>
      </View>
    </View>
  );
};

const ProgressBar = ({ PigHappiness }) => {
  const getDynamicColors = () => {
    if (PigHappiness < 25) {
      return ['#E97171', '#E97171'];
    } else if (PigHappiness <= 75) {
      return ['#E97171', '#C3AE65'];
    } else {
      return ['#E97171', '#C3AE65', '#2ECC71'];
    }
  };

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={getDynamicColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: `${PigHappiness}%` }]}
        />
      </View>
      <View style={styles.progressBarLabels}>
        <Text style={[styles.labelText, { color: 'black', fontWeight: 'medium' }]}>Sad</Text>
        <Text style={[styles.labelText, { color: 'black', fontWeight: 'medium' }]}>Worried</Text>
        <Text style={[styles.labelText, { color: 'black', fontWeight: 'medium' }]}>Happy</Text>
      </View>
    </View>
  );
};

const PigScreen = () => {
  const navigation = useNavigation();
  const [PigHappiness, setPigHappiness] = useState(100); // Track happiness

  useEffect(() => {
    const updateHappiness = (count) => {
      const newHappiness = Math.max(0, 100 - count * 10);
      setPigHappiness(newHappiness);
      console.log(`Updated PigHappiness: ${newHappiness}, Uncategorized Count: ${count}`);
    };

    // Initialize happiness based on current uncategorized count
    updateHappiness(getUncategorizedCount());

    // Subscribe to changes in uncategorized count
    const unsubscribe = subscribeToUncategorizedCount(updateHappiness);
    return unsubscribe;
  }, []);

  let pigMessage = '';
  let pigIcon = '';
  let clickIcon = require('../../assets/Pig/click_transparent.png');

  if (PigHappiness < 25) {
    pigMessage = "I am sad, please categorise your expenses as soon as possible!";
    pigIcon = require('../../assets/Pig/side_sad_transparent.png');
  } else if (PigHappiness <= 75) {
    pigMessage = "I am getting worried! You have uncategorised expenses";
    pigIcon = require('../../assets/Pig/side_worried_transparent.png');
  } else {
    pigMessage = "I am happy, you are doing well keeping track of your expenses.";
    pigIcon = require('../../assets/Pig/side_happy_transparent.png');
  }

  const handlePigClick = () => {
    navigation.navigate('PigCategorise'); // Navigate to categorization screen
  };

  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigScreen" />
      <View style={styles.topLine} />
      <View style={styles.containerMeter}>
        <ProgressBar PigHappiness={PigHappiness} />
      </View>
      <View style={styles.speechBubble}>
        <Text style={styles.speechBubbleText}>{pigMessage}</Text>
        <View style={styles.speechBubbleTail} />
      </View>
      <Image style={styles.clickIcon} source={clickIcon} />
      <TouchableOpacity 
        onPress={handlePigClick} 
        style={styles.pigTouchable}
      >
        <Image style={styles.pigIcon} source={pigIcon} />
      </TouchableOpacity>
      <View style={styles.bottomLine} />
      <DonutChart percentage={PigHappiness} total={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Title: {
    marginTop: '10%',
    fontSize: 32,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
    width: '90%',
  },
  blackButton: {
    flex: 'row',
    backgroundColor: 'black',
    width: '32%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'white',
  },
  blackButtonUnclicked: {
    flex: 'row',
    backgroundColor: 'white',
    width: '32%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  blackButtonText: {
    fontSize: 20,
    color: 'white',
  },
  blackButtonTextUnclicked: {
    fontSize: 20,
    color: 'black',
  },
  containerMeter: {
    marginTop: '5%',
    width: '90%',
    height: '8%',
    backgroundColor: 'transparent',
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  progressBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  label: {
    marginTop: '25%',
    alignSelf: 'flex-start',
    marginLeft: '12%',
  },
  clickIcon: {
    position: 'absolute',
    top: '35%',
    left: '10%',
    width: 90,
    height: 90,
    resizeMode: 'contain',
    zIndex: 3,
  },
  pigTouchable: {
    marginTop: '25%',
    alignSelf: 'flex-start',
    marginLeft: '12%',
  },
  pigIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  donutChartContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutChartWrapper: {
    width: 200,
    height: 200,
  },
  donutChartTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutChartPercentage: {
    fontSize: 24,
    color: 'black',
  },
  donutChartDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 2,
  },
  donutChartTotal: {
    fontSize: 24,
    color: 'black',
  },
  speechBubble: {
    marginTop: '5%',
    position: 'absolute',
    top: '34%',
    left: '70%',
    transform: [{ translateX: -100 }],
    width: 200,
    padding: 10,
    backgroundColor: '#FE9894',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FE9894',
    alignItems: 'center',
    zIndex: 2,
  },
  speechBubbleText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: '10%',
    transform: [{ translateX: -10 }],
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FE9894',
  },
  topLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 10,
    alignSelf: 'center',
  },
  bottomLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
});

export default PigScreen;