import React, { useEffect } from 'react';
import {  View,ImageBackground ,Image,Text} from 'react-native';
import {styles} from '../styles/splash_page_style';
import { useDispatch,useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

import BackImg from '../assets/images/backImage.jpg'
import { LoginActions } from '../store/slices/user_slice';

const SplashPage = ({ navigation }) => {

const {userState} =  useSelector((state: any) => state.loginUser);
const dispatch = useDispatch()
console.log("userState",userState);

  useEffect(() => {
    (async () => {
      let nextPage = ''; 
      
      const userLocalStorageCheck = await EncryptedStorage.getItem("username")
     
      // let updateStatus = false
      console.log("user status",userLocalStorageCheck);
      if (userLocalStorageCheck) {
        nextPage = "DashBoard";
      } else {
        nextPage = "LoginPage"
      }
      setTimeout(() => {
        navigation.replace(nextPage);
      }, 2000);
    })();
  }, []);
  return (
    <View >
      <ImageBackground source={BackImg} style={styles.imgBack}>
        <View style={styles.imageView}>
          <Text style={{color:'#FBA1B7',fontWeight:'bold',fontSize:24}}>MindFull GuruKul</Text>
      
        </View>
      </ImageBackground>
    </View>
  );
};
export default SplashPage;