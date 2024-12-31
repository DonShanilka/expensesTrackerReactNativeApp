import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { FiDollarSign, FiTrendingUp } from "react-icons/fi"; // Replace with a React Native icon library
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

interface ExpenseData {
  currentMonthTotal: number;
  previousMonthTotal: number;
  average: number;
  growthPercentage: number;
}

const TotalExpensesCard = () => {
  const [data, setData] = useState<ExpenseData>({
    currentMonthTotal: 0,
    previousMonthTotal: 0,
    average: 0,
    growthPercentage: 0,
  });

  // const email = 'shanilka@gmail.com';

  // Get the user email from AsyncStorage
  useEffect(() => {
    const fetchEmailAndData = async () => {
      try {
        const email = 'shanilka@gmail.com';
        // await AsyncStorage.getItem("userEmail");
        if (email) {
          fetchData(email);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };
    fetchEmailAndData();
  }, []);

  // Function to fetch the expense data
  // email: string

  const fetchData = async (email: string) => {
    try {
      const response = await axios.get(
        `http://192.168.249.98:3000/api/expense-summary/${email}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching expense summary:", error);
    }
  };

  // fetchData(email);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Icon name="dollar" size={16} color="#1D4ED8" /> {/* Replace with Native icon */}
          </View>
          <Text style={styles.headerText}>Total Expenses</Text>
        </View>
        <View style={styles.growthContainer}>
          <Icon name="line-chart" size={16} color="#16A34A" /> {/* Replace with Native icon */}
          <Text style={styles.growthText}>{data.growthPercentage}%</Text>
        </View>
      </View>

      {/* Amount */}
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>
          Rs: {data.currentMonthTotal.toLocaleString()}
        </Text>
        <Text style={styles.subText}>this month</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View>
          <Text style={styles.statLabel}>Previous Month</Text>
          <Text style={styles.statValue}>
            Rs: {data.previousMonthTotal.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text style={styles.statLabel}>Average</Text>
          <Text style={styles.statValue}>
            Rs: {data.average.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 16,
    position: "absolute",
    top: "28%",
    left: "5%",
    height: "20%",
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#DBEAFE",
    padding: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  growthContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  growthText: {
    fontSize: 12,
    color: "#16A34A",
    marginLeft: 4,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#16A34A",
  },
  subText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default TotalExpensesCard;
