import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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

  const userEmail = 'shanilka@gmail.com';

  const [expenses, setExpenses] = useState<FormData[]>([]);
  const [expensesData, setexpensesData] = useState([]);

  const [date, setDate] = useState(new Date());
  formData.date = date.toISOString().split('T')[0];

  const handleDelete = (id) => {
    setExpenses(prevStudents =>
      prevStudents.filter(expenses => expenses.id !== id),
    );
  };

  const handleSubmit = async () => {
    if (
      !formData.category ||
      !formData.itemName ||
      !formData.price ||
      !formData.date
    ) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.63.145:3000/api/saveData',
        {
          category: formData.category,
          price: formData.price,
          date: formData.date,
          itemname: formData.itemName,
          userEmail: formData.email,
        },
      );
      console.log('Data saved successfully:', response.data.message);
      Alert.alert('Success', 'Expense saved successfully!');
    } catch (error) {
      console.error('Error during saving:', error);
      Alert.alert(
        'Error',
        'Save failed: ' + (error.response?.data?.error || 'Unknown error'),
      );
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      // console.log(userEmail);
      try {
        // Retrieve userEmail from localStorage
        // const userEmail = localStorage.getItem("userEmail");
        // if (!userEmail) {
        //   console.error("User email not found in localStorage");
        //   return;
        // }

        // Make a GET request with userEmail as a parameter
        const response = await axios.get(
          `http://192.168.63.145:3000/api/getExpensesByUser/${userEmail}`
        );
        setexpensesData(response.data);
        console.log(expensesData)
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={formData.category}
          style={styles.input}
          onValueChange={itemValue =>
            setFormData({...formData, category: itemValue})
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
          onChangeText={text => setFormData({...formData, itemName: text})}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={text => setFormData({...formData, price: text})}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>SAVE</Text>
      </TouchableOpacity>

      <View>
        {expenses.map((expensesData, index) => (
          <ExpensessCard
            key={index}
            expenses={expensesData}
            // onDelete={handleDelete}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
    width: '100%',
    // flexGrow: 1,
    color: '#ffffff',
  },
  field: {
    marginBottom: 16,
    color: '#cccccc',
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
    color: '#0D9488',
  },
  submitBtn: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#34D399',
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ExpensessSaveForm;
