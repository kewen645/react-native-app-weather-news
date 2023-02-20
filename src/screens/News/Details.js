import React from 'react';
import {WebView} from 'react-native-webview';

export default function NewsDetailScreen({route}) {
  const {url, title, uniquekey} = route.params;
  return <WebView source={{uri: url}} />;
}
