import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image ,FlatList,Dimensions, TextInput} from 'react-native';
import React,{useEffect, useState} from 'react'
import QuokkaImage from '../assets/images/quokkaImg.png'
import NoData from '../assets/images/no-data.png'
import filterImg from '../assets/images/filter.png'
import customAxios from '../services/api';
const moment = require('moment'); 
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function DashBoard({navigation}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isMenuModalVisible, setMenuModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [suggestedNames, setSuggestedNames] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [getResponse,setResponse] = useState([]);
    const [getData,setData] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      mobile: '',
      email: '',
    });
    const arr = [
      { userName: 'rahul', email: 'rahul@gmail.com', phone: '9781588567' },
      { userName: 'ravi', email: 'ravi@gmail.com', phone: '345456' },
      { userName: 'raju', email: 'raju@gmail.com', phone: '34343434334' },
    ];
      useEffect(() =>{
        getAllUser()
      },[])
      const getAllUser = async () => {
        console.log("im herere");
        
        try {
          const response = await customAxios.get('/getAllUser'); 
          // console.log(response); 
          setResponse(response)
          setData(response)
        } catch (error) {
          console.error(error); // Handle any errors
        }
         

      }

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
    const toggleMenuModal = () => {
      console.log("menu model");
      
      setMenuModalVisible(!isMenuModalVisible);
    };
  
    const handleFilterSelect = (filter) => {
      console.log("filter",filter);
      
      setSelectedFilter(filter);
      toggleMenuModal();
      // You can implement filtering logic here based on the selected filter
    };
   async function addUserData(){
    try {
      const response = await customAxios.addUserpost('/adduser',{
        username:formData.name,
        email:formData.email,
        phone:formData.mobile,
        time: moment().format('DD/MM/YYYY HH:mm:ss'),
        lastModified:""
      }); 
      // console.log(response); 
      setFormData({
        name: '',
        mobile: '',
        email: '',
      })
      // setResponse(response)
    } catch (error) {
      console.error(error); 
    }
     
    }
      
    const handleSave = () => {
    
      console.log('FormData:', formData);
      addUserData()
      toggleModal(); 
      getAllUser()
    };
  
    const handleCancel = () => {
      toggleModal();
    };
 
    const handleSearchTextChange = (text) => {
      console.log("text",text);
      
      setResponse(getData.filter((result)=> result.username.toLowerCase().includes(text.toLowerCase())))

      setSearchText(text);
    
    };
 
    const renderItem = ({ item }:any) => (
        <View style={styles.card}>
             <TouchableOpacity onPress={() => navigation.navigate('UserDetails',{
              id:item._id,
              username:item.username,
              email:item.email,
              phone:item.phone,
              time:item.time
             })}>
        <View style={{flexDirection:'row',gap:15}}>
            <View style={{alignItems:'center',justifyContent:'center',
            width:40,
            backgroundColor:'lightblue',
            borderRadius:50
            }}>
        <Image style={{width:30,height:30}} source={QuokkaImage} />
            </View>
        <View>

        <View style={styles.nameView}>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        </View>
             </TouchableOpacity>
        </View>
      );
  return (
    <View style={styles.container}>
        <TouchableOpacity
        style={styles.floatingButton}
        onPress={toggleModal}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add User</Text>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
           
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
             <TextInput
              style={styles.input}
              placeholder="Mobile"
              value={formData.mobile}
              onChangeText={(text) => setFormData({ ...formData, mobile: text })}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    <Text style={styles.header}>User Information List</Text>
    <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuModalVisible}
        onRequestClose={toggleMenuModal}
      >
        <View style={styles.modalMenuContainer}>
          <View style={styles.modalMenuContent}>
            <Text style={styles.modalMenuHeader}>Select Filter</Text>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'A-Z' && styles.selectedFilter,
              ]}
              onPress={() => handleFilterSelect('A-Z')}
            >
              <Text style={styles.filterText}>A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'Z-A' && styles.selectedFilter,
              ]}
              onPress={() => handleFilterSelect('Z-A')}
            >
              <Text style={styles.filterText}>Z-A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'Last Modified' && styles.selectedFilter,
              ]}
              onPress={() => handleFilterSelect('Last Modified')}
            >
              <Text style={styles.filterText}>Last Modified</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'Last Inserted' && styles.selectedFilter,
              ]}
              onPress={() => handleFilterSelect('Last Inserted')}
            >
              <Text style={styles.filterText}>Last Inserted</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMenuModal}>
              <Text style={styles.cancelMenuButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection:'row',justifyContent:'space-between',
      }}>
    <TextInput
        style={styles.input1}
        placeholder="Search"
        value={searchText}
        onChangeText={(text) => handleSearchTextChange(text)}
      />
    <TouchableOpacity style={{justifyContent:'center',height:40}} onPress={toggleMenuModal}>
    <Image  style={styles.img}  source={filterImg} />
    </TouchableOpacity>
      </View>
    <View style={styles.cardItem}>
    {getResponse.length === 0 ? (
        <View style={{height:height*0.7,alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.noData}>No Data Found</Text>
            <Image style={{width:60,height:60}} source={NoData} />

        </View>
      ) : (
        <FlatList
          data={getResponse}
          renderItem={renderItem}
          // keyExtractor={(item) => item["_id"]}
          contentContainerStyle={styles.cardList}
        />
      )}
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
        width:width*1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      padding: 16,
      backgroundColor:'#FFE5E5'
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#FFBFBF',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      zIndex:1
    },
    buttonText: {
      fontSize: 20,
      color: 'white',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    cardList: {
      width: '100%',
      height:'100%'
      // height:'95%',
    //   backgroundColor:'lightgreen'
    },
    card: {
        height:height*0.14,
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop:10
    },
    cardItem:{
        // width:width*0.9,
        // height:'100%'

    },
    noData: {
        fontSize: 18,
        color: 'gray',
      },
    img:{
        width:30,
        height:32,
        alignItems:'center',
        justifyContent:'center'
        // backgroundColor:'#'
    },
    nameView:{
            width:width*0.66,
            flexDirection:'row',
            justifyContent:'space-between'
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 8,
    },
    phone: {
      fontSize: 16,
      color: 'gray',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    modalHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      width:width*0.7,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
      color:'black',
      backgroundColor:'white'
    },
    input1: {
      width:width*0.8,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
      color:'black',
      backgroundColor:'white'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      padding: 10,
      borderRadius: 5,
      width: '40%',
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: '#A8DF8E',
    },
    cancelButton: {
      backgroundColor: '#FFBFBF',
    },
    filterImg:{
      alignItems:'flex-end',
      alignContent:'center',
      justifyContent:'center',
      // backgroundColor:'green',
     
      
    },
    filterButton: {
      fontSize: 16,
      color: 'blue',
      textDecorationLine: 'underline',
    },
    modalMenuContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalMenuContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    modalMenuHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    filterOption: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    selectedFilter: {
      backgroundColor: 'lightblue',
    },
    filterText: {
      fontSize: 18,
      textAlign: 'center',
    },
    cancelMenuButton: {
      fontSize: 18,
      color: 'blue',
      textAlign: 'center',
      marginTop: 10,
    },
  });