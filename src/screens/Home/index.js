import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {getCityInfo, getWeatherIndices, get3DayForecast} from '../../utils/api';
import LinearGradient from 'react-native-linear-gradient';
import weatherIcons from '../../utils/weatherIcons';

export default function HomeScreen() {
  const coords = {
    longitude: '113.35',
    latitude: '23.12'
  };

  const [city, setCity] = useState({});
  const [indices, setIndices] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   info => {
    //     AsyncStorage.setItem()
    //   },
    //   error => Alert.alert('error occurred', JSON.stringify(error)),
    //   {
    //     timeout: 20000
    //   }
    // );

    // city info
    getCityInfo(coords).then(res => {
      // console.log(res);
      setCity(res);
    });

    // weather indices
    // type is default to 0
    getWeatherIndices(coords, 0).then(res => {
      // console.log(res);
      setIndices(res);
    });

    // 3 day forecastindices
    get3DayForecast(coords).then(res => {
      // console.log(res);
      setForecast(res);
    });
  }, []);

  const indicesItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.type}
        style={{}}
        onPress={() => alert(item.type)}>
        <View style={styles.indicesItem}>
          <Text style={styles.indicesName}>{item.name}</Text>
          <Text style={styles.indicesCategory}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => alert('Scan')}>
            <View style={styles.itemBase}>
              <Ionicons name="scan-outline" size={40} color={'white'} />
              <Text style={styles.fontBase}>Scan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('QRCode')}>
            <View style={styles.itemBase}>
              <Ionicons name="qr-code-outline" size={40} color={'white'} />
              <Text style={styles.fontBase}>QRCode</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Transit')}>
            <View style={styles.itemBase}>
              <Ionicons name="trail-sign-outline" size={40} color={'white'} />
              <Text style={styles.fontBase}>Transit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Wallet')}>
            <View style={styles.itemBase}>
              <Ionicons name="wallet-outline" size={40} color={'white'} />
              <Text style={styles.fontBase}>Wallet</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Swiper showsButtons={false} autoplay={true} style={styles.wrapper}>
          <View style={styles.slideImage}>
            <Image source={require('../../images/1.jpg')} />
          </View>
          <View style={styles.slideImage}>
            <Image source={require('../../images/2.jpg')} />
          </View>
          <View style={styles.slideImage}>
            <Image source={require('../../images/3.jpg')} />
          </View>
        </Swiper>

        <View style={styles.city}>
          <Text style={styles.cityText}>
            {city.country} {city.adm1} {city.adm2} {city.name}
          </Text>
        </View>

        {/* indices items */}
        <View style={styles.indicesContainer}>
          <FlatList
            data={indices}
            renderItem={indicesItem}
            keyExtractor={item => item.type}
            horizontal={true}
            // 类似lazyloading，懒加载
            initialNumToRender={3}
            ListEmptyComponent={() => (
              <Text style={{fontSize: 30}}>No Data Available!</Text>
            )}
          />
        </View>

        {/* forecast items */}
        <View style={styles.forecastContainer}>
          {forecast.map((item, index) => (
            <LinearGradient
              key={'weather' + index}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ddd', '#333']}
              style={styles.forecastItem}>
              <Text style={styles.forecastDate}>{item.fxDate}</Text>
              <View style={styles.forecastItemContent}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}>
                  <Image
                    style={styles.weatherIcon}
                    source={weatherIcons[item.iconDay]}
                  />
                  <Text>
                    {item.textDay} {item.tempMax}°
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}>
                  <Text>
                    {item.tempMin}° {item.textNight}
                  </Text>
                  <Image source={weatherIcons[item.iconNight]} />
                </View>
              </View>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  itemBase: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b38a',
    height: 90,
    width: Dimensions.get('window').width / 4
  },
  fontBase: {
    color: 'white',
    fontSize: 14
  },
  wrapper: {
    height: 200
  },
  slideImage: {
    width: Dimensions.get('window').width
  },
  city: {
    flex: 1,
    justifyContent: 'center'
  },
  cityText: {
    fontSize: 24,
    marginHorizontal: 10,
    textAlign: 'center'
  },
  indicesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 10
  },
  indicesItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#deb',
    width: Dimensions.get('window').width / 3 - 15,
    height: 60,
    marginTop: 10,
    marginRight: 10
  },
  indicesName: {
    color: '#222',
    fontSize: 12
  },
  indicesCategory: {
    color: '#00b38a',
    fontSize: 14
  },
  forecastContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10
  },
  forecastItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    width: Dimensions.get('window').width - 20,
    marginTop: 10
  },
  forecastDate: {
    fontSize: 20,
    color: '#eee',
    marginTop: 10
  },
  forecastItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    marginTop: 10
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10
  }
});
