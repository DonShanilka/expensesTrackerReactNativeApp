import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, FlatList} from 'react-native';


export default function ExpensessCard({expensesData}) {

  // const deleteStudent=()=>{
  //   instance.delete(`/student/delete/${student.id}`)
  //       .then(function (response) {
  //           onDelete(student.id);
  //           console.log('Student deleted successfully');
  //       })
  //       .catch(error => {
  //           console.log(Error);
  //       })
  // }
  console.log("Card Data: ",expensesData)

  return (
    <FlatList
        data={expensesData}
        keyExtractor={(item) => item.id}
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
          </View>
        )}
      />
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
  },
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
    color:'',
  },
  bold: {
    fontWeight: 'bold',
  },
});

// export default ExpensessCard
