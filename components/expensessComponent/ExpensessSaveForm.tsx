import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ExpensessCard from './ExpensessCard';
import axios from 'axios';

function ExpensessSaveForm() {
  interface FormData {
    id: string;
    category: string;
    itemName: string;
    price: string;
    date: string;
    email: string;
  }

  const [formData, setFormData] = useState<FormData>({
    id: '',
    category: '',
    itemName: '',
    price: '',
    date: '',
    email: 'shanilka@gmail.com',
  });

  const [expensesData, setexpensesData] = useState([]);
  const userEmail = 'shanilka@gmail.com';

  const [date, setDate] = useState(new Date());
  formData.date = date.toISOString().split('T')[0];

  const handleSubmit = async () => {
    if (!formData.category || !formData.itemName || !formData.price) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http:// 192.168.249.98:3000/api/saveData',
        {
          category: formData.category,
          price: formData.price,
          date: formData.date,
          itemname: formData.itemName,
          userEmail: formData.email,
        }
      );
      console.log('Data saved successfully:', response.data.message);
      Alert.alert('Success', 'Expense saved successfully!');
      fetchExpenses(); // Refresh data
    } catch (error) {
      console.error('Error during saving:', error);
      Alert.alert(
        'Error',
        'Save failed: ' + (error.response?.data?.error || 'Unknown error')
      );
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.169.54:3000/api/getExpensesByUser/${userEmail}`
      );
      setexpensesData(response.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={formData.category}
          style={styles.input}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, category: itemValue })
          }>
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
          onChangeText={(text) => setFormData({ ...formData, itemName: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
        />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 16, width: '100%', color: '#ffffff' },
  field: { marginBottom: 16 },
  label: { fontSize: 16, color: '#374151', marginBottom: 4 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#0D9488',
  },
  submitBtn: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#34D399',
    borderRadius: 8,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
});

export default ExpensessSaveForm;
