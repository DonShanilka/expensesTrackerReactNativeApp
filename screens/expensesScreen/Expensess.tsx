import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput,Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

function Expensess() {
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    price: '',
    date: '',
  });
  
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}>
      <Picker
        placeholder="Name"
        selectedValue={formData.category}
        style={styles.picker}
        onValueChange={value => setFormData({...formData, category: value})}>
        <Picker.Item label="Select category" value="" enabled={true} />
        <Picker.Item label="Foods" value="Foods" />
        <Picker.Item label="Education" value="education" />
        <Picker.Item label="Transport" value="transport" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#aaa"
        value={formData.itemName}
        onChangeText={value => setFormData({...formData, itemName: value})}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#aaa"
        value={formData.price}
        onChangeText={value => setFormData({...formData, price: value})}
      />

      <Text>Selected Date: {date.toDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    width: '90%',
    // ite:"left",
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    color: '#000000',
  },
});

export default Expensess;

// #0D9488
