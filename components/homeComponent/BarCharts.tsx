import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

interface CategoryData {
  category: string;
  total: number;
}

const BarCharts = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = 'shanilka@gmail.com'; // Replace with actual AsyncStorage logic if needed
        if (!userEmail) {
          console.error('No user email found');
          return;
        }

        const response = await axios.get(
          `http://192.168.249.98:3000/api/getLast7DaysData/${userEmail}`,
          {
            params: { userEmail },
          }
        );

        const data: CategoryData[] = response.data;

        const labels = data.map((item) => item.category);
        const totals = data.map((item) => item.total);

        setChartData({
          labels,
          datasets: [
            {
              data: totals,
              label: 'Total Expenses (Last 7 Days)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Updated chart configuration with white background
  const chartConfig = {
    backgroundColor: '#ffffff',  // Set background color to white
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    fillShadowGradientFrom: '#ffffff',
    fillShadowGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set color to black for better contrast
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 10,
      fontFamily: 'sans-serif',
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  // Function to assign colors dynamically
  const getBarColor = (index: number) => {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40',
      '#FFB6C1', '#B0E57C',
    ];
    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      {chartData ? (
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero={true}
          showBarTops={false}
          withHorizontalLabels
          segments={5}
          withOuterLines={false}
          withVerticalLines={false}
          withCustomBarColorFromData
          getBarColor={getBarColor} // Use the dynamic color function
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '90%',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BarCharts;
