import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

interface CategoryData {
  category: string;
  value: number;
}

const PieChartComponent = () => {
  const [chartData, setChartData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = 'shanilka@gmail.com';
        // await AsyncStorage.getItem('userEmail');
        if (!userEmail) {
          console.error('No user email found in AsyncStorage');
          return;
        }

        const response = await axios.get(
          `http://192.168.249.98:3000/api/getCategorySum/${userEmail}`
        );
        console.log('Response data:', response.data);

        const totalSum = response.data.reduce((sum: number, item: any) => sum + item.value, 0);

        const normalizedData = response.data.map((item: any) => ({
          ...item,
          value: totalSum ? Math.round((item.value / totalSum) * 100) : 0,
        }));

        setChartData(normalizedData);
        console.log(normalizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Prepare data for PieChart in react-native-chart-kit
  const chartDataForRN = chartData.map(item => ({
    name: item.category,
    population: item.value,
    color: COLORS[chartData.indexOf(item) % COLORS.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      {chartData.length > 0 ? (
        <PieChart
          data={chartDataForRN}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    position:'absolute',
    top:'45%'
  },
});

export default PieChartComponent;
