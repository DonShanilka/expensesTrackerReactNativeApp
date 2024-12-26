import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

function ExpensessSaveForm() {

  interface FormData {
    category: string;
    itemName: string;
    price: string;
    date: string;
  }

  const [formData, setFormData] = useState<FormData>({
    category: '',
    itemName: '',
    price: '',
    date: '',
  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const newDate = date.toString();

  const handleSubmit = () => {
    if (!formData.category || !formData.itemName || !formData.price || !formData.date) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={formData.category}
          style={styles.input}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, category: itemValue })
          }
        >
          <Picker.Item label="Select category" value="" />
          <Picker.Item label="Foods" value="Foods" />
          <Picker.Item label="Education" value="Education" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={formData.itemName}
          onChangeText={(text) =>
            setFormData({ ...formData, itemName: text })
          }
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) =>
            setFormData({ ...formData, price: text })
          }
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={formData.date}
          onChangeText={(text) =>
            setFormData({ ...formData, date: text })
          }
        />
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
    width:'100%',
    // flexGrow: 1,
    color:'#ffffff'
  },
  field: {
    marginBottom: 16,
    color:'#cccccc'
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color:'#cccccc'
  },
  submitBtn: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#34D399',
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor:'#34D399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText:{
    fontSize: 18,
    fontWeight:'bold',
    color:'#ffffff',
    paddingHorizontal: 6,
  }
});

export default ExpensessSaveForm
