import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import UpdateExpensess from './UpdateExpensess'; // Import the UpdateExpensess component

export default function ExpensessCard({ expensesData }) {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [selectedExpense, setSelectedExpense] = useState(null); // Manage the selected expense for update

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.249.98:3000/api/deleteExpenses/${id}`);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      Alert.alert('Expense Deleted Successfully');
    } catch (error) {
      Alert.alert('Expense Could Not Be Deleted');
      console.error('Error deleting expense:', error);
    }
  };

  const handleOpenModal = (expense) => {
    setSelectedExpense(expense); // Set the selected expense
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedExpense(null); // Clear the selected expense
  };

  // console.log('Card Data: ', expensesData);

  return (
    <ScrollView>
      <FlatList
        data={expensesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Category:</Text> {item.category}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Item:</Text> {item.itemName}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Price:</Text> {item.price}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Date:</Text> {item.date}
            </Text>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => handleOpenModal(item)} // Open modal with selected expense
            >
              <Text style={{ color: '#000000', paddingHorizontal: 6, fontWeight: '700' }}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id)} // Handle delete
            >
              <Text style={{ color: '#ffffff', paddingHorizontal: 6, fontWeight: '700' }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Update Modal */}
      {selectedExpense && (
        <UpdateExpensess
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          expense={selectedExpense}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#34D399',
  },
  bold: {
    fontWeight: 'bold',
    color: '#808080',
  },
  updateBtn: {
    backgroundColor: '#ffc61a',
    position: 'absolute',
    left: '85%',
    bottom: '78%',
    width: 60,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    position: 'absolute',
    left: '85%',
    bottom: '24%',
    backgroundColor: '#ff0000',
    width: 60,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
