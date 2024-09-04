import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";

const PostDetail = ({ route, navigation }) => {
    // const { post } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.post}>
                <View style={styles.postHeader}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/50" }}
                        style={styles.avatar}
                    />
                    <Text style={styles.author}>Rabin</Text>
                </View>
                <Text style={styles.content}>hacktiv8</Text>
                <View style={styles.postFooter}>
                    <Text style={styles.buttonText}>Likes: 15</Text>
                    <Text style={styles.buttonText}>Comments: 2</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </ScrollView>

        // <Text>PostDetail</Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f0f2f5",
        padding: 15,
    },
    post: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 15,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    author: {
        fontWeight: "bold",
        fontSize: 16,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    postFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    backButton: {
        backgroundColor: "#4267B2",
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 20,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PostDetail;
