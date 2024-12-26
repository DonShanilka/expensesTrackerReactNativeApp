import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Expense {
  id: number;
  category: string;
  itemname: string;
  price: string;
  date: string;
}

interface UpdateFormProps {
  isOpen: boolean;
  closeModal: () => void;
  expense: Expense | null;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ isOpen, closeModal, expense }) => {
  const [updatedExpense, setUpdatedExpense] = useState<Expense | null>(expense);

  useEffect(() => {
    setUpdatedExpense(expense);
  }, [expense]);

  const handleUpdate = () => {
    if (!updatedExpense) return;
    // Implement update logic here
    console.log('Updated Expense:', updatedExpense);
    closeModal();
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Expense</Text>
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={updatedExpense?.category}
            onChangeText={(text) => setUpdatedExpense({ ...updatedExpense, category: text } as Expense)}
          />
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={updatedExpense?.itemname}
            onChangeText={(text) => setUpdatedExpense({ ...updatedExpense, itemname: text } as Expense)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={updatedExpense?.price}
            onChangeText={(text) => setUpdatedExpense({ ...updatedExpense, price: text } as Expense)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={updatedExpense?.date}
            onChangeText={(text) => setUpdatedExpense({ ...updatedExpense, date: text } as Expense)}
          />
          <View style={styles.modalActions}>
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Cancel" onPress={closeModal} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // useEffect(() => {
  //   const fetchExpenses = async () => {
  //     try {
  //       const userEmail = await AsyncStorage.getItem('userEmail');
  //       if (!userEmail) {
  //         console.error('User email not found in AsyncStorage');
  //         return;
  //       }
  //       const response = await axios.get<Expense[]>   (`http://localhost:3000/api/getExpensesByUser/${userEmail}`);
  //       setExpenses(response.data);
  //     } catch (err) {
  //       console.error('Error fetching expenses:', err);
  //     }
  //   };
  //   fetchExpenses();
  // }, []);

  // const handleDelete = async (id: number) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/deleteExpenses/${id}`);
  //     setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting expense:', error);
  //   }
  // };

  const handleRowClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={styles.cell}>{item.itemname}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => handleRowClick(item)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                // onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <UpdateForm
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        expense={selectedExpense}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  updateButton: {
    backgroundColor: '#14B8A6',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExpensesTable;
