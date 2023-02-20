import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getNewsList} from '../../utils/api';
import Loading from '../../components/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NewsScreen({navigation}) {
  const [type, setType] = useState('top');
  const [types, setTypes] = useState([
    {key: 'top', title: '头条'},
    {key: 'shehui', title: '社会'},
    {key: 'guonei', title: '国内'},
    {key: 'guoji', title: '国际'},
    {key: 'yule', title: '娱乐'},
    {key: 'tiyu', title: '体育'},
    {key: 'junshi', title: '军事'},
    {key: 'keji', title: '科技'},
    {key: 'caijing', title: '财经'},
    {key: 'shishang', title: '时尚'}
  ]);
  const [initialTypeIndex, setInitialTypeIndex] = useState(0);
  const [newsList, setNewList] = useState([]);

  useEffect(() => {
    getNewsList(type)
      .then(res => {
        // console.log(res);
        setNewList(res);
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }, [type]);

  const newsItem = ({item, index}) => {
    if (item.thumbnail_pic_s02 && item.thumbnail_pic_s03) {
      return newsItem3Images({item, index});
    }
    return newsItemSingleImage({item, index});
  };

  const newsItemSingleImage = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NewsDetailScreen', {
          url: item.url,
          title: item.title,
          uniquekey: item.uniquekey
        })
      }>
      <View style={styles.newsItemSingleContainer}>
        <View style={styles.newsItemSingleText}>
          <Text style={styles.newsItemSingleTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.newsItemSingleFooter}>
            <Text style={styles.newsItemSingleMeta} numberOfLines={1}>
              {item.date} {item.author_name}
            </Text>
            <Ionicons name={'heart-outline'} size={18} color={'red'} />
          </View>
        </View>
        {item.thumbnail_pic_s ? (
          <Image
            source={{uri: item.thumbnail_pic_s}}
            style={styles.newsItemSingleImage}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const newsItem3Images = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NewsDetailScreen', {
          url: item.url,
          title: item.title,
          uniquekey: item.uniquekey
        })
      }
      style={{marginVertical: 5}}>
      <View style={styles.newsItem3ImagesContainer}>
        <Text
          style={styles.newsItem3ImagesHeader}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.title}
        </Text>
        <View>
          <View style={styles.newsItem3Images_image_container}>
            <Image
              source={{uri: item.thumbnail_pic_s}}
              style={styles.newsItem3Images_image}
            />
            <Image
              source={{uri: item.thumbnail_pic_s02}}
              style={styles.newsItem3Images_image}
            />
            <Image
              source={{uri: item.thumbnail_pic_s03}}
              style={styles.newsItem3Images_image}
            />
          </View>
        </View>
        <View style={styles.newsItemSingleFooter}>
          <Text style={styles.newsItemSingleMeta} numberOfLines={1}>
            {item.date} {item.author_name}
          </Text>
          <Ionicons name={'heart-outline'} size={18} color={'red'} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const newsTypeItem = ({item, index}) => {
    let isActive = item.key === type;
    return (
      <TouchableOpacity
        onPress={() => {
          setType(item.key);
          setInitialTypeIndex(index > 3 ? index - 3 : 0);
        }}>
        <View
          style={{
            width: 65,
            height: 46,
            padding: 10,
            backgroundColor: isActive ? '#dfb' : '#fff'
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              color: isActive ? 'red' : '#333'
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {newsList.length ? (
        <FlatList
          data={newsList}
          keyExtractor={item => item.uniquekey}
          renderItem={newsItem}
          ListHeaderComponent={() => (
            <FlatList
              horizontal={true}
              data={types}
              keyExtractor={item => item.key}
              renderItem={newsTypeItem}
              initialScrollIndex={initialTypeIndex}
            />
          )}
          ListFooterComponent={() => (
            <Text
              style={{fontSize: 20, textAlign: 'center', marginVertical: 40}}>
              ----- Nothing More ------
            </Text>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 5
              }}></View>
          )}
          ListEmptyComponent={() => (
            <Text style={{fontSize: 30}}>No Data Available!</Text>
          )}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  newsItemSingleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  newsItemSingleText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: (Dimensions.get('window').width * 2) / 3 - 20
  },
  newsItemSingleTitle: {
    paddingHorizontal: 12,
    fontSize: 18,
    width: (Dimensions.get('window').width * 2) / 3,
    marginBottom: 20
  },
  newsItemSingleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  newsItemSingleMeta: {
    fontSize: 13
  },
  newsItemSingleImage: {
    width: Dimensions.get('window').width / 3,
    height: 80,
    marginVertical: 5,
    marginHorizontal: 10
  },
  newsItem3ImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newsItem3ImagesHeader: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 12,
    fontSize: 18,
    marginBottom: 20
  },
  newsItem3Images_image_container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row'
  },
  newsItem3Images_image: {
    width: Dimensions.get('window').width / 3 - 20,
    height: 80,
    marginVertical: 5,
    marginHorizontal: 10
  }
});
