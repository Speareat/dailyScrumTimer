import React from 'react';
import { SafeAreaView } from 'react-native';
import ListScreen from './screens/ListScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListScreen />
    </SafeAreaView>
  );
};

export default App;
