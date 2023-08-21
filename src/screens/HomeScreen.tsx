import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage';
const DashboardCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);
const generateRandomData = () => ({
  tasksDone: Math.floor(Math.random() * 20),
  tasksPlanned: Math.floor(Math.random() * 10) + 1,
 
});
export default function HomeScreen() {
  const [dashboardData, setDashboardData] = useState(generateRandomData());
  const [user,setUser] = useState("")
  useEffect(() =>{
    ( async () => {
        console.log("inside");
        const userInfo = await EncryptedStorage.getItem("user")
        console.log("user info",userInfo);
        setUser(userInfo)
        
        
    })()
  },[])
  const refreshData = () => {
    setDashboardData(generateRandomData());
  };
  return (
    <ScrollView style={styles.container}>
      <View >
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.text}>Welcome {user}</Text>
      </View>
      <DashboardCard title="Total Tasks" value={dashboardData.tasksDone+dashboardData.tasksPlanned} />
      <DashboardCard title="Tasks Done" value={dashboardData.tasksDone} />
      <DashboardCard title="Tasks Planned" value={dashboardData.tasksPlanned} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
          <Text style={styles.refreshButtonText}>Refresh Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text:{
      fontWeight:'bold',
      fontSize:18,
      color:'blue'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '70%',
    paddingTop: 50,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  drawerItemText: {
    fontSize: 18,
  },
});