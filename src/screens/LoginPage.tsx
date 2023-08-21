import { View, Text, Button, TextInput, StyleSheet,Alert, Image, TouchableOpacity } from 'react-native';
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import QuokkaImage from '../assets/images/quokkaImg.png'

import EncryptedStorage from 'react-native-encrypted-storage';
import { LoginActions } from '../store/slices/user_slice';
import customAxios from '../services/api';
export default function LoginPage({navigation}:any) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [alertModel,setAlertModel] = useState(false)
  const [modelMsg,setModelMsg] = useState('')

  
    const validateForm = () => {
      let valid = true;
  
      if (!formData.username) {
        setUsernameError('username is required');
        valid = false;
      } 
        
  
      if (!formData.password) {
        setPasswordError('Password is required');
        valid = false;
      } else if(formData.password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(passwordPattern.test(formData.password)){
          setPasswordError('');

        }else{
          setPasswordError('password is not valid');
        }
      }
  
      return valid;
    };
  
    const handleLogin = async() => {
      if (validateForm()) {
        // Perform login logic here
        console.log("login data",formData);
        try {
          const response = await customAxios.post('/login', {
            username:formData.username,
            password:formData.password
          }); // Send a POST request to /users with user data
          console.log("response",response.data); // Handle the response data
          if(response?.data?.status == true){
            EncryptedStorage.setItem('username',formData.username)
            setModelMsg("Log In Successfully")
            setAlertModel(true)
            setTimeout(() => {
              navigation.replace('DashBoard')
            },1000)
          }else if(response.data.status == false){
            setModelMsg(response.data.msg)
            setAlertModel(true)
          }
        } catch (error) {
          console.error(error); // Handle any errors
        }
      }
    };
    const handleChange = (key: keyof typeof formData, value: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: value,
      }));
    };
  
    return (
      <View style={styles.container}>
       
        <View style={styles.img}>
        <Image  source={QuokkaImage} />
        </View>
        {alertModel == true ?  Alert.alert(modelMsg, '', [
            {
              text: 'OK',
              onPress: () => setAlertModel(false), 
            },
          ]): ""}
        <Text style={styles.text}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={formData.username}
          onChangeText={(value) => handleChange('username', value)}
        />
        {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
        <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsChecked(!isChecked)}
      >
        <Text style={styles.checkboxText}>
          {isChecked ? '✓' : <View style={styles.smallbox}></View>}  By logging in, I accept the terms & conditions of the platform
        </Text>
      </TouchableOpacity>
        <TouchableOpacity  disabled={!isChecked} onPress={handleLogin} >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('SignUpScreen')} >
        <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFE5E5'
  },
  img:{
      width:'30%',
      height:'30%',
      // backgroundColor:'#'
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
    color:'black'
  },
  input: {
    width: '85%',
    height: 40,
    borderWidth: 0.4,
    marginBottom: 10,
    padding: 10,
    borderRadius:10,
    borderColor:'blue'
  },
  error: {
    color: 'black',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
  },
  smallbox:{
      width:15,
      height:15,
      borderWidth:1,
      borderColor:'black'
  }
});