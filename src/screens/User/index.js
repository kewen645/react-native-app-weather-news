import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logout} from '../../redux/features/auth/authSlice';
import {useDispatch} from 'react-redux';

export default function UserScreen({navigation}) {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.avatar}>
          <Image
            source={require('../../images/logo.png')}
            style={{
              width: 100,
              height: 100,
              marginVertical: 10,
              borderRadius: 50
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')}>
          <View style={styles.listItem}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name={'information-circle-outline'}
                size={20}
                color={'#2d3'}
              />
              <Text style={{marginLeft: 10}}>About</Text>
            </View>
            <Ionicons
              name={'chevron-forward-outline'}
              size={20}
              color={'#bbb'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.listItem}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name={'settings-outline'} size={20} color={'#22d'} />
              <Text style={{marginLeft: 10}}>Setting</Text>
            </View>
            <Ionicons
              name={'chevron-forward-outline'}
              size={20}
              color={'#bbb'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <View style={styles.listItem}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name={'settings-outline'} size={20} color={'#22d'} />
              <Text style={{marginLeft: 10}}>Login</Text>
            </View>
            <Ionicons
              name={'chevron-forward-outline'}
              size={20}
              color={'#bbb'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.listItem}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name={'settings-outline'} size={20} color={'#22d'} />
              <Text style={{marginLeft: 10}}>Logout</Text>
            </View>
            <Ionicons
              name={'chevron-forward-outline'}
              size={20}
              color={'#bbb'}
            />
          </View>
        </TouchableOpacity>
        {/* counter */}
        <TouchableOpacity onPress={() => navigation.navigate('CounterScreen')}>
          <View style={styles.listItem}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name={'settings-outline'} size={20} color={'#22d'} />
              <Text style={{marginLeft: 10}}>Counter</Text>
            </View>
            <Ionicons
              name={'chevron-forward-outline'}
              size={20}
              color={'#bbb'}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 20
  }
});
