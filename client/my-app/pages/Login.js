import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Button } from 'react-native';
import { authenticationContext } from '../context/authentication';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../query/users';
import * as SecureStore from 'expo-secure-store'


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const {setIsSignedIn} = useContext(authenticationContext)
  const {setIsSignedIn} = useContext(authenticationContext)
  const [loginFn, {data, loading, error}] = useMutation(LOGIN)

  // const handleLogin = () => {
  //   console.log('Login attempt with:', email, password);
  // };

  return (

  <View style={{ backgroundColor: 'yellow', padding: 12}}>
    <TextInput
    placeholder='username'
    value={username}
    onChangeText={setUsername}
    style={styles.input}/>

    <TextInput
    placeholder='password'
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    style={styles.input}/>
    
    <Button 
    title={loading ? 'Login...' : 'Login'}
    onPress={async () => {
      try {
        console.log(username, password, "username passwor<<<<<<<<<")
        const result = await loginFn({
          variables: {
            username,
            password
          }
        });
        
        await SecureStore.setItemAsync("access_token", result.data?.loginForm.access_token)
        console.log(result, "result<<<<<<<")
        setIsSignedIn(true);
        navigation.navigate('Home');
        
      } catch (error) {
        console.log(error, "error<<<<<<<<<<");
        
      }
    }}
    />
  </View>

  )

  // return (
  //   <View style={styles.container}>
  //     {/* <Image
  //       source={require('./path-to-your-logo.png')}
  //       style={styles.logo}
  //     /> */}
  //     <View style={styles.logoContainer}>
  //       <Text style={styles.logoF}>f</Text>
  //       <Text style={styles.logoText}>eetbook</Text>
  //     </View>
  //     <TextInput
  //       style={styles.input}
  //       placeholder="Email"
  //       value={email}
  //       onChangeText={setEmail}
  //       keyboardType="email-address"
  //     />
  //     <TextInput
  //       style={styles.input}
  //       placeholder="Password"
  //       value={password}
  //       onChangeText={setPassword}
  //       secureTextEntry
  //     />
  //     <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  //       <Text style={styles.loginButtonText}>Log In</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity>
  //       <Text style={styles.forgotPassword}>Forgot Password?</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.createAccountButton}>
  //       <Text style={styles.createAccountButtonText}>Create New Account</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: -20
  },
  logoF: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4267B2',
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    textAlign: 'center',
    lineHeight: 80,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4267B2',
    marginLeft: -30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#1877f2',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#1877f2',
    textAlign: 'center',
    marginTop: 15,
  },
  createAccountButton: {
    backgroundColor: '#42b72a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  createAccountButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});