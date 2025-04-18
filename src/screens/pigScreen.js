import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';

// OBS: If i wanna change the size of the donut, change the radius and strokeWidth. It is important that the:
// <Svg width={180} height={180}> is radius + half of strokeWidth per side. Also remember to change the cx and cy in both
// The background circle and the progress circle. The progress is currently based on the percentage. (note: I changed it so it calculates it itself :D)
const DonutChart = ({ percentage, total }) => {
  const radius = 75; // Radius of the donut
  const strokeWidth = 30; // Thickness of the donut
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = (percentage / total) * circumference; // Progress based on percentage
  const svgSize = 250; // Size of the SVG container (should be radius + strokeWidth / 2 * 2) but i rather insert it myself.
  // svgSize = size of the canvas where the donus chart is drawn. Defines width and height, basically a container.

  return (
    <View style={styles.donutChartContainer}>
      <Svg width={svgSize} height={svgSize}>
        <G rotation="-90" origin={`${svgSize / 2}, ${svgSize / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius - 1} // Slightly smaller radius to separate the outline
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius} // Keep the radius for the pink circle
            stroke="#FF6B6B"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="butt" // Flat edges
            fill="none"
          />
          {/* Outer Border */}
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius + strokeWidth / 2} // Slightly larger radius for the outer border
            stroke="black"
            strokeWidth={1} // Thin black border
            fill="none"
          />
          {/* Inner Border */}
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius - strokeWidth / 2 - 1} // Slightly smaller radius for the inner border
            stroke="black"
            strokeWidth={1} // Thin black border
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
      {/* The 385 is percentage and total is the numbers inside the donut.. */}
      <DonutChart percentage={200} total={500} />
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
    marginTop: '10%',
    width: 250, // Width of the donut chart
    height: 250, // Height of the donut chart
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 24,
    color: 'green',
  },
});

export default PigScreen;