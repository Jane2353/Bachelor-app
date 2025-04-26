import {StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';

const ChoosePigScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        The Piggy <Text style={styles.highlight}>Bank</Text> <Image source={require('../../assets/Pig/front_happy_transparent.png')} style={styles.icon} />
      </Text>
      <Text style={styles.description}>
        Complete challenges that help manage your finances. By keeping up with your challenges, 
        you can ensure your pig stays happy. Watch your hard work pay off, as you watch your pig grow up!
      </Text>
      <View style={styles.pigContainer}>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.pigItem}>
            <Image
              source={require('../../assets/Pig/side_happy_transparent.png')}
              style={styles.pigImage}
            />
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={styles.inputLabel}>
        What is the name of <Text style={styles.highlight}>your</Text> pig?
      </Text>
      <TextInput style={styles.input} placeholder="Enter name" />
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  highlight: {
    color: '#2ECC71',
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 5,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    padding: '5%',
    lineHeight: 25,
  },
  pigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  pigItem: {
    alignItems: 'center',
    marginBottom: 20, // Add spacing between pig items and buttons
  },
  pigImage: {
    width: 120,
    height: 120,
    marginBottom: 10, // Ensure spacing between the image and the button
  },
  selectButton: {
    backgroundColor: '#2ECC71', // Fix typo in color code
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2ECC71',
  },
  nextButton: {
    backgroundColor: '#2ECC71', // Green button
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 25,
    position: 'absolute', // Use absolute positioning
    bottom: 50, // Place the button 50 pixels from the bottom
    alignSelf: 'center', // Center horizontally
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16, // Match font size with mitidScreen
    fontWeight: 'bold',
  },
});

export default ChoosePigScreen;