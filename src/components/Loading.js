import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';

export default function index() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator
        color="#00d0ff"
        // 数字指定大小只在android应用有效
        size={70}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
