import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';
import styles from '../styles';

const ListScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [listData, setListData] = useState([]);

  const handleSave = async () => {
    if (inputValue.trim() === '') return;

    const newListData = [...listData, inputValue];
    setListData(newListData);
    await AsyncStorage.setItem('listData', JSON.stringify(newListData));
    setInputValue('');
  };

  const handleDelete = async (index) => {
    const newListData = [...listData];
    newListData.splice(index, 1);
    setListData(newListData);
    await AsyncStorage.setItem('listData', JSON.stringify(newListData));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const loadData = async () => {
    try {
      const listData = await AsyncStorage.getItem('listData');
      if (listData !== null) setListData(JSON.parse(listData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Enter text"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.text}>No items in the list</Text>
        }
      />
    </View>
  );
};

export default ListScreen;
