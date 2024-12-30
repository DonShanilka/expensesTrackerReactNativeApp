import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UpdateExpensess = ({ isOpen, closeModal, expense }) => {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [expenseId, setExpenseId] = useState(null);

  // Initialize state when the component mounts or the `expense` prop changes
  useEffect(() => {
    if (expense) {
      setExpenseId(expense.id || null);
      setCategory(expense.category || '');
      setItemName(expense.itemName || '');
      setPrice(expense.price ? expense.price.toString() : '');
      setDate(expense.date || '');
    }
  }, [expense]);

  const handleUpdate = async () => {
    // Validation
    if (!expenseId || !category || !itemName || !price || !date) {
      console.log("ID=" + expenseId, "Category=" + category, "ItemName=" + itemName, "Price=" + price, "Date=" + date);
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://192.168.249.98:3000/api/updateExpenses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: expenseId,
          category: category,
          itemName: itemName,
          price: parseFloat(price),
          date: date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update expense.');
      }

      Alert.alert('Success', 'Expense updated successfully!');
      closeModal();
    } catch (error) {
      console.error('[Update Error]', error.message);
      Alert.alert('Error', error.message || 'Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Expense</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.input}
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
              value={itemName}
              onChangeText={setItemName}
              placeholder="Enter item name"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal} style={[styles.button, styles.closeButton]}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate} style={[styles.button, styles.updateButton]}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  container: { width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, height: 40, color: '#0D9488' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, padding: 10, borderRadius: 5, alignItems: 'center', marginHorizontal: 5 },
  closeButton: { backgroundColor: '#888' },
  updateButton: { backgroundColor: '#007bff' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default UpdateExpensess;
