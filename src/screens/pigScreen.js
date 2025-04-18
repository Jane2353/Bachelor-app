import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';

const DonutChart = ({ percentage, total }) => {
  const radius = 50; // Radius of the donut
  const strokeWidth = 20; // Thickness of the donut
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = (percentage / total) * circumference; // Progress based on percentage

  return (
    <View style={styles.donutChartContainer}>
      <Svg width={120} height={120}>
        <G rotation="-90" origin="60, 60">
          {/* Background Circle */}
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#FF6B6B"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      {/* Text in the Center */}
      <View style={styles.donutChartTextContainer}>
        <Text style={styles.donutChartPercentage}>{percentage}</Text>
        <Text style={styles.donutChartTotal}>/ {total}</Text>
      </View>
    </View>
  );
};

const PigScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Piggy is happy to see you!</Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.blackButton}>Home</TouchableOpacity>
        <TouchableOpacity style={styles.blackButtonUnclicked}>Challenge</TouchableOpacity>
        <TouchableOpacity style={styles.blackButtonUnclicked}>Shop</TouchableOpacity>
      </View>
      <View style={styles.containerMeter}></View>
      <Image style={styles.pigIcon} source={require('../../assets/Pig/side_happy.png')} />
      <DonutChart percentage={385} total={440} />
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
  containerMeter: {
    marginTop: '5%',
    width: '90%',
    height: '10%',
    backgroundColor: 'grey',
  },
  pigIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  donutChartContainer: {
    marginTop: '20%',
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
  },
  donutChartTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutChartPercentage: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  donutChartTotal: {
    fontSize: 18,
    color: 'green',
  },
});

export default PigScreen;