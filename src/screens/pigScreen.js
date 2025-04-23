import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import NavigationButtons from '../components/NavigationButtons';
import { LinearGradient } from 'expo-linear-gradient';

const DonutChart = ({ percentage, total }) => {
  const data = {
    data: [percentage / total],
  };

  return (
    <View style={styles.donutChartContainer}>
      <View style={styles.donutChartWrapper}> {/* Added wrapper for proper sizing */}
        <ProgressChart
          data={data}
          width={200} // Adjusted to fit within wrapper
          height={200} // Adjusted to fit within wrapper
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
      return ['#E97171', '#E97171']; // Only Red
    } else if (PigHappiness <= 75) {
      return ['#E97171', '#C3AE65']; // Red to Yellow
    } else if (PigHappiness > 75) {
      return ['#E97171', '#C3AE65', '#2ECC71']; // Red to Yellow to Green
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
  const PigHappiness = 30;

  return (
    <View style={styles.container}>
      <NavigationButtons currentScreen="PigScreen" />
      <View style={styles.containerMeter}>
        <ProgressBar PigHappiness={PigHappiness} />
      </View>
      <Image style={styles.pigIcon} source={require('../../assets/Pig/side_happy.png')} />
      <DonutChart percentage={200} total={1000} />
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
  labelText: {
    fontSize: 15,
  },
  pigIcon: {
    marginTop: '10%',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  donutChartContainer: {
    marginTop: '5%',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutChartWrapper: { // Added wrapper for proper sizing
    width: 200, // Adjusted to fit within wrapper
    height: 200, // Adjusted to fit within wrapper
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
});

export default PigScreen;