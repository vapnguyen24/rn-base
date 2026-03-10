import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function HomeScreen() {
  return (
    <View testID="home-screen" style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700' },
});
