import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/bg-2.jpg')}
        style={styles.image}>
        <StatusBar hidden={true} />
        <Animatable.View
          animation="slideInDown"
          duration={500}
          style={styles.header}>
          <Text style={styles.title}>View at a greater perspective</Text>
        </Animatable.View>
        <Animatable.View
          style={styles.footer}
          animation="slideInUp"
          duration={500}
          direction="alternate">
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <LinearGradient colors={['#fff', '#ddd']} style={styles.signIn}>
              <Text style={styles.textSign}>GO</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 150 : 100
  },
  title: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center'
  },
  footer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 100,
    alignItems: 'center'
  },
  signIn: {
    width: Dimensions.get('window').width / 2,
    height: 40,
    borderRadius: 10,
    opacity: 0.5
  },
  textSign: {
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  }
});
