import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import ExpensessSaveForm from '../../components/expensessComponent/ExpensessSaveForm';

function Expensess() {
  return (
      <View style={styles.container}>
        <ExpensessSaveForm/>
        {/* <ExpensesTable/> */}
      </View>
  );
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

export default Expensess;

// #0D9488
