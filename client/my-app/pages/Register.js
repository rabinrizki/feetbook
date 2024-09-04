import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import { REGISTER } from "../query/users";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [registerFn, { loading, data, error }] = useMutation(REGISTER);
    const navigation = useNavigation();


    const handleRegister = async ({navigation}) => {
      // console.log('Register with:', { firstName, lastName, email, password, birthDate, gender });
      
      try {
          if (!name || !password || !email || !username) {
              Alert.alert("error", [
                  { text: "ok", onPress: () => navigation.navigate("Login") },
              ]);
              return;
          }
            const form = { name, username, email, password };
            await registerFn({ variables: { form } });
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.logo}>Feetbook</Text>
            <Text style={styles.subtitle}>Create a new account</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile number or email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="New password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleRegister}
            >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLinkText}>
                    Already have an account?
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    logo: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#1877f2",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        color: "#666",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    genderOption: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        width: "30%",
        alignItems: "center",
    },
    selectedGender: {
        backgroundColor: "#e7f3ff",
        borderColor: "#1877f2",
    },
    terms: {
        fontSize: 12,
        color: "#666",
        marginBottom: 15,
    },
    signUpButton: {
        backgroundColor: "#00a400",
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    signUpButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginLink: {
        marginTop: 15,
        alignItems: "center",
    },
    loginLinkText: {
        color: "#1877f2",
        fontSize: 16,
    },
});

export default Register;
