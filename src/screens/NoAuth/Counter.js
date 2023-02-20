import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  increment,
  decrement,
  incrementAsync,
  incrementByAmount
} from '../../redux/features/counter/countSlice';

export default function CounterScreen() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button title="+1" onPress={() => dispatch(increment())} />
      <Button title="+2" onPress={() => dispatch(incrementByAmount(2))} />
      <Button title="+2 async" onPress={() => dispatch(incrementAsync(2))} />
      <Button title="-1" onPress={() => dispatch(decrement())} />
      <Text>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
