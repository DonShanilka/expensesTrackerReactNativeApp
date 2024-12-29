import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ExpensessCard from '../../components/expensessComponent/ExpensessCard'
import axios from 'axios';
import { StyleSheet } from 'react-native';

function ExpensessView() {

  const [expensesData, setexpensesData] = useState([]);
  const userEmail = 'shanilka@gmail.com';

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
    <ScrollView style={styles.container}>
      <ExpensessCard expensesData={expensesData} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
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
    color:'#0D9488'
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

export default ExpensessView
