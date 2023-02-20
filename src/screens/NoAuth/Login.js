import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {loginSuccess} from '../../redux/features/auth/authSlice';
import {useDispatch} from 'react-redux';

export default function LoginScreen({navigation}) {
  const [user, setUser] = useState('');
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [isValidUser, setValidUser] = useState(true);

  const [pwd, setPwd] = useState('');
  const [validatingPwd, setValidatingPwd] = useState(false);
  const [isValidPwd, setValidPwd] = useState(true);

  const dispatch = useDispatch();

  const validateUser = val => {
    if (val.trim().length >= 2) {
      setUser(val);
      setValidatingUsername(true);
      setValidUser(true);
    } else {
      setUser(val);
      setValidatingUsername(false);
      setValidUser(false);
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 2) {
      setValidUser(true);
    } else {
      setValidUser(false);
    }
  };

  const validatePassword = val => {
    if (val.trim().length >= 6 && val.trim().length <= 10) {
      setPwd(val);
      setValidatingPwd(true);
      setValidPwd(true);
    } else {
      setPwd(val);
      setValidatingPwd(false);
      setValidPwd(false);
    }
  };

  const handleValidPassword = val => {
    if (val.trim().length >= 6 && val.trim().length <= 10) {
      setValidPwd(true);
    } else {
      setValidPwd(false);
    }
  };

  const handleLogin = () => {
    if (user.length === 0 || pwd.length === 0) {
      Alert.alert('Input Error', 'Username or Password is empty');
    }

    if (user.length < 2) {
      Alert.alert('Username error', 'length < 2');
      return;
    }

    if (pwd.length < 6 || pwd.length > 10) {
      Alert.alert('password error', 'length < 6 or length > 10');
      return;
    }

    let userInfo = {
      username: user,
      password: pwd
    };

    dispatch(loginSuccess(userInfo));
    Alert.alert('success', 'login success');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/bg-1.png')}
        style={styles.bgImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome!</Text>
        </View>
        <Animatable.View animation={'fadeInUpBig'} style={styles.footer}>
          <ScrollView>
            {/* user */}
            <View style={styles.action}>
              <Ionicons name="person-outline" size={20} />
              <TextInput
                style={styles.input}
                value={user}
                // onChangeText会把changed text作为参数传入callback handler
                onChangeText={validateUser}
                // 传入e， 有e.nativeEvent.text这个值
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                placeholder="username"
                keyboardType="default"
              />
              {validatingUsername ? (
                <Animatable.View animation={'bounceIn'}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color={'green'}
                  />
                </Animatable.View>
              ) : null}
            </View>

            {/* password */}
            <View style={styles.action}>
              <Ionicons name="lock-closed-outline" size={20} />
              <TextInput
                style={styles.input}
                value={pwd}
                // onChangeText会把changed text作为参数传入callback handler
                onChangeText={validatePassword}
                // 传入e， 有e.nativeEvent.text这个值
                onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
                placeholder="password"
                keyboardType="default"
                secureTextEntry={true}
              />
              {validatingPwd ? (
                <Animatable.View animation={'bounceIn'}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color={'green'}
                  />
                </Animatable.View>
              ) : null}
            </View>

            {isValidUser ? null : (
              <Animatable.View animation={'fadeInLeft'} duration={500}>
                <Text style={styles.errorMsg}>
                  username must have at least 2 characters!
                </Text>
              </Animatable.View>
            )}

            {isValidPwd ? null : (
              <Animatable.View animation={'fadeInLeft'} duration={500}>
                <Text style={styles.errorMsg}>
                  password must have a length between 6 - 10!
                </Text>
              </Animatable.View>
            )}

            {/* button */}
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text style={[styles.textSign, {color: '#fff'}]}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.signIn,
                  {borderColor: '#009387', borderWidth: 1, marginTop: 15}
                ]}
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={[styles.textSign, {color: '#009387'}]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  // 要设置外围view，否则撑不起bgImage
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 150 : 100
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  input: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -16,
    paddingLeft: 10,
    color: '#05375a'
  },
  errorMsg: {
    color: 'red',
    fontSize: 14
  },
  button: {
    borderRadius: 100,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signIn: {
    width: Dimensions.get('window').width - 60,
    height: 40,
    borderRadius: 10
  },
  textSign: {
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  }
});
