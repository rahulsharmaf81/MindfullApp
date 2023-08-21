import { View, Text, TextInput, Button, StyleSheet ,Alert, Image, TouchableOpacity,ScrollView,Dimensions, FlatList} from 'react-native';
import React,{useState} from 'react'
import QuokkaImage from '../assets/images/quokkaImg.png'
import {Picker} from '@react-native-picker/picker';
import customAxios from '../services/api';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function SignupScreen({navigation}:any) {
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    phone:'',
    gender:'',
    howDidYouHear:'',
    city:'',
    state:'',
    password: '',
    confirmPassword: '',

  });
  const [alertModel,setAlertModel] = useState(false)
  const [selectedGender, setSelectedGender] = useState('');
  const states = ['Gujarat', 'Maharashtra', 'Karnataka'];
  // const handleHowDidYouHearChange = (option) => {
  //   const updatedOptions = formData.howDidYouHear.includes(option)
  //     ? formData.howDidYouHear.filter(item => item !== option)
  //     : [...formData.howDidYouHear, option];

  //   setHowDidYouHear(updatedOptions);
  // };
  const [searchText, setSearchText] = useState('');
  const [suggestedStates, setSuggestedStates] = useState([]);

  const [formErrors, setFormErrors] = useState({
    username:'',
    email: '',
    phone:'',
    gender:'',
    howDidYouHear:'',
    city:'Mumbai',
    state:'',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let valid = true;
    const errors = {} as typeof formErrors;
    if (!formData.username) {
      errors.username = 'Name is required';
      valid = false;
    }
    if (!formData.phone) {
      errors.phone = 'Phone is required';
      valid = false;
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
      valid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    }else if(formData.email){
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(!emailPattern.test(formData.email)){
        errors.email = 'Email is not valid'
      }
    }

    if (!formData.password) {
     
      errors.password = 'Password is required';
      valid = false;
    }else if(formData.password){
      console.log("passs",formData.password);
      
 const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
       if(!passwordPattern.test(formData.password)){
        errors.password = 'Password is not valid'
      }
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }else if(formData.confirmPassword){
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if(!passwordPattern.test(formData.confirmPassword)){
             errors.confirmPassword = 'Password is not valid'
           }
         }

    setFormErrors(errors);
    console.log("valid",valid);
    
    return valid;
  };

  const handleSignup = async () => {
    console.log("inside handle signup",validateForm());
  
    if (validateForm()) {
   
      console.log("form data",formData);
      try {
        const response = await customAxios.post('/register', {
          username:formData.username,
          email:formData.email,
          password:formData.password
        }); // Send a POST request to /users with user data
        console.log("response",response.data); // Handle the response data
        if(response?.data?.status == true){
          setAlertModel(true)
        }
      } catch (error) {
        console.error(error); // Handle any errors
      }
      
      
    }
  };
  const handleSearchTextChange = (text:any) => {
    setSearchText(text);

    // Filter the suggestions based on the input text
    const filteredStates = states.filter((state) =>
      state.toLowerCase().includes(text.toLowerCase())
    );

    setSuggestedStates(filteredStates);
  };

  const handleStateSelection = (state:any) => {
    setSearchText(state);
    setSuggestedStates([]);
  };
  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  return (
    <ScrollView  style={styles.scrollView}>
    <View style={styles.container}>
      {/* <View style={styles.img}>
      <Image  source={QuokkaImage} />
      </View> */}
      <Text style={styles.heading}>Create An Account</Text>
        {alertModel == true ?  Alert.alert('Account Created Succesfully', '', [
            {
              text: 'OK',
              // onPress: () => navigation.navigate('LoginPage'), 
            },
          ]): ""}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      {formErrors.username ? <Text style={styles.error}>{formErrors.username}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      {formErrors.email ? <Text style={styles.error}>{formErrors.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      {formErrors.phone ? <Text style={styles.error}>{formErrors.phone}</Text> : null}
      {/* <TextInput
        style={styles.input}
        placeholder="Gender"
        value={formData.gender}
        onChangeText={(value) => handleChange('gender', value)}
      />
      {formErrors.gender ? <Text style={styles.error}>{formErrors.gender}</Text> : null} */}
      <View style={styles.touchRadioBtn}>
      <TouchableOpacity
        style={{ flexDirection: 'row'}}
        onPress={() => handleChange('gender','Male')}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: formData.gender === 'Male' ? 'blue' : 'black',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {formData.gender === 'Male' && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'blue',
              }}
            />
          )}
        </View>
        <Text>Male</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => handleChange('gender','Female')}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: formData.gender === 'Female' ? 'blue' : 'black',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {formData.gender === 'Female' && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'blue',
              }}
            />
          )}
        </View>
        <Text>Female</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => handleChange('gender','Others')}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: formData.gender === 'Female' ? 'blue' : 'black',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {formData.gender === 'Female' && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'blue',
              }}
            />
          )}
        </View>
        <Text>Others</Text>
      </TouchableOpacity> */}
      </View>
    
       <Text style={styles.label}>How did you hear about this?</Text>
      <View style={styles.howDidYouView}>
      
       <TouchableOpacity
        style={[
          styles.checkbox,
          formData.howDidYouHear.includes('LinkedIn') && styles.checked,
        ]}
        onPress={() => handleChange('howDidYouHear','LinkedIn')}
      >
        <Text>LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.checkbox,
          formData.howDidYouHear.includes('Friends') && styles.checked,
        ]}
        onPress={() =>handleChange('howDidYouHear','Friends')}
      >
        <Text>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.checkbox,
          formData.howDidYouHear.includes('Job Portal') && styles.checked,
        ]}
        onPress={() => handleChange('howDidYouHear','Job Portal')}
      >
        <Text>Job Portal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.checkbox,
          formData.howDidYouHear.includes('Others') && styles.checked,
        ]}
        onPress={() => handleChange('howDidYouHear','Others')}
      >
        <Text>Others</Text>
      </TouchableOpacity>
      
      </View>
      <View style={{flexDirection:'row',width:'80%',alignItems:'center',height:60,gap:10}}>
        
      <Text style={styles.label}>City:</Text>
        <View style={{width:'50%'}}>
      <Picker
      
        selectedValue={formData.city}
        style={styles.dropdown}
        onValueChange={(itemValue) =>  {
          console.log("pressed");
          handleChange('city', itemValue)
        }}
      >
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Pune" value="Pune" />
        <Picker.Item label="Ahmedabad" value="Ahmedabad" />
      </Picker>
        </View>
      </View>
     
      {/* <TextInput
        style={styles.input}
        placeholder="State"
        value={formData.state}
        onChangeText={(value) => handleChange('state', value)}
      />
      {formErrors.state ? <Text style={styles.error}>{formErrors.state}</Text> : null} */}
      <View style={styles.stateView}>
        <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a state"
        value={searchText}
        onChangeText={(text) => handleSearchTextChange(text)}
      />
      <FlatList
        style={styles.suggestions}
        data={suggestedStates}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStateSelection(item)}>
            <Text style={styles.suggestionItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      </View>
      <TextInput  
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      {formErrors.password ? <Text style={styles.error}>{formErrors.password}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
      />
      {formErrors.confirmPassword ? <Text style={styles.error}>{formErrors.confirmPassword}</Text> : null}
      <TouchableOpacity style={styles.signInBtn}  onPress={handleSignup} >
        <Text style={styles.text}>Signup</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  scrollView:{
    display:'flex',
  },
  container: {
    // flex: 1,
    display:'flex',
    flex:1,
  
    height:height*1,
    justifyContent: 'center',
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
  // marginBottom: 20,
  fontWeight:'bold',
  color:'black'
},
  heading: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
    color:'black'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 0.4,
    marginBottom: 10,
    padding: 10,
    borderRadius:10,
    borderColor:'blue'
  },
  touchRadioBtn:{
    display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      // backgroundColor:'lightgreen',
      gap:25,
      width: '80%',
      height: 40,
  },
  signInBtn:{
      borderWidth:0.3,
      borderRadius:6,
      width:'20%',
      height:40,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#A8DF8E'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkbox: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checked: {
    backgroundColor: '#A8DF8E',
  },
  howDidYouView:{
    width:'80%',
    flexDirection:'row',
    gap:20,alignItems:'center',
    justifyContent:'center'
  },
  selectedOptions: {
    marginTop: 10,
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    width:'90%',

    // backgroundColor:'lightyellow'
  },
  selectedCity: {
    marginTop: 10,
    fontSize: 16,
  },
  cityView:{
    display:'flex',
    flexDirection:'row',
    width:'80%',
    backgroundColor:'grey'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  suggestions: {
    maxHeight: 100,
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
  },
  stateView:{
    width:'80%'
  },
  error: {
    color: 'black',
    marginBottom: 10,
  },
});