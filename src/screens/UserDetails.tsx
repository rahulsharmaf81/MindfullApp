import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, Alert } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons'; // You, can use any icon library you prefer
import CheckImg from '../assets/images/check.png'
import PenImg from '../assets/images/pen.png'
import TrashImg from '../assets/images/trash.png'
import customAxios from '../services/api';
import moment from 'moment';
const UserProfile = ({route,navigation}) => {
    const {id,username,email,phone,time} = route.params;
    console.log("idddd",id);
    
  const [isEditing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: username,
    email: email,
    phone: phone,
    time:time
  });

  const handleEditToggle = (id) => {
    console.log("edit clicked");
    setEditing(!isEditing);
    editUserDetails(id)
  };

  async function editUserDetails(id){
    try {
        console.log("in here");
        
        const response = await customAxios.put(`/editUser/${id}`,{
            "_id":id,
            "username":userData.username, 
            "email":userData.email, 
            "phone":userData.phone,
            "time": userData.time,
            "lastModified":moment().format('DD/MM/YYYY HH:mm:ss')
        }); 
        console.log(response); 
        if(response.status == true){
            Alert.alert('Eddited Succesfully', '', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('DashBoard'), 
                },
              ])
        }
        // setResponse(response)
      } catch (error) {
        console.error(error); // Handle any errors
      }
       
  }
  async function deleteUser(id){
    console.log("id",id);
    
    try {
        const response = await customAxios.delete(`/deleteById/${id}`)
        console.log("delete status",response); 
        if(response.status == true){
          Alert.alert('Deleted Succesfully', '', [
              {
                text: 'OK',
                onPress: () => navigation.replace('DashBoard'), 
              },
            ])
      }
        // setResponse(response)
      } catch (error) {
        console.error(error); // Handle any errors
      }
       
  }
  
  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <View style={styles.userInfo}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Username:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userData.username}
              onChangeText={(text) => handleInputChange('username', text)}
            />
          ) : (
            <Text style={styles.value}>{userData.username}</Text>
          )}
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          ) : (
            <Text style={styles.value}>{userData.email}</Text>
          )}
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
            />
          ) : (
            <Text style={styles.value}>{userData.phone}</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.editButton} onPress={() => {
            handleEditToggle(id)
        }}>
          {isEditing ? (
              <Image style={styles.img}  source={CheckImg} />
          ) : (
            <Image  style={styles.img} source={PenImg} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            deleteUser(id)
        }} style={styles.deleteButton}>
        <Image  style={styles.img}  source={TrashImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#FFE5E5'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fieldGroup: {
    marginBottom: 10,
  },
  img:{
    width:30,
    height:30
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: 'gray',
    paddingTop: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#A8DF8E',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FFBFBF',
    borderRadius: 5,
    padding: 10,
  },
});

export default UserProfile;
