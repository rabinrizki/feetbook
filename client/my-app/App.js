import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store"; // Impor SecureStore dengan benar
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { ApolloProvider } from "@apollo/client";
// import { authenticationContext } from "./context/authentication";
import AuthProvider from "./context/authentication";
import { createStackNavigator } from "@react-navigation/stack";
import client from "./config/apollo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
    return (
            <AuthProvider>
        <ApolloProvider client={client}>
                <Navigation />
        </ApolloProvider>
            </AuthProvider>
    );
}

function Navigation() {
    // const [isSignedIn, setIsSignedIn] = useState(false);
    const { setIsSignedIn } = useContext(AuthContext);
    const { isSignedIn } = useContext(AuthContext);
    return (
            <NavigationContainer>
                <Stack.Navigator>
                    {isSignedIn ? (
                        <Stack.Screen name="Main" component={MainTabs} />                        
                    ) : (
                        <>
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="Login" component={Login} />
                        </>
                    )}
                    {/* <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Login" component={Login} /> */}
                </Stack.Navigator>
            </NavigationContainer>
    );
}

function MainTabs() {
    const { setIsSignedIn } = useContext(authenticationContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen
                name="Logout"
                component={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Pressable
                            onPress={async () => {
                                await SecureStore.deleteItemAsync("accessToken");
                                setIsSignedIn(false); // Update context to reflect the sign-out
                            }}
                            style={{ backgroundColor: 'red', padding: 10 }}
                        >
                            <Text style={{ color: 'white' }}>Logout</Text>
                        </Pressable>
                    </View>
                )}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
