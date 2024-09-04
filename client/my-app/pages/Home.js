import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/posts"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
    Pressable
} from "react-native";

const { loading, error, data, refetch } = useQuery(GET_POSTS)

const dummyData = [
    {
        id: "1",
        author: "Rabin",
        content: "Bikin facebook",
        likes: 15,
        comments: 3,
    },
    {
        id: "2",
        author: "Rizki",
        content: "Hacktiv8!",
        likes: 20,
        comments: 5,
    },
];

const Home = ({navigation}) => {
    const [posts, setPosts] = useState(GET_POSTS);
    const [filteredPosts, setFilteredPosts] = useState(GET_POSTS);
    const [newPostContent, setNewPostContent] = useState("");
    const [searchText, setSearchText] = useState("");
    const [addedFriends, setAddedFriends] = useState(new Set());

    const handleAddPost = () => {
        if (newPostContent.trim() === "") {
            Alert.alert("Error", "Post content cannot be empty.");
            return;
        }

        const newPost = {
            id: (posts.length + 1).toString(),
            author: "New Author",
            content: newPostContent,
            likes: 0,
            comments: 0,
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setNewPostContent(""); 
    };

    const handleSearch = (text) => {
        setSearchText(text);
        if (text.trim() === "") {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post =>
                post.author.toLowerCase().includes(text.toLowerCase()) ||
                post.content.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    const handleAddFriend = (author) => {
        Alert.alert("Add Friend", `Send friend request to ${author}?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "OK",
                onPress: () => {
                    setAddedFriends(prevState => {
                        const newSet = new Set(prevState);
                        newSet.add(author);
                        return newSet;
                    });
                }
            }
        ]);
    };

    const renderPost = ({ item }) => (
        <View style={styles.post}>
            {!addedFriends.has(item.author) && (
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => handleAddFriend(item.author)}
                >
                    <Text style={styles.addFriendButtonText}>Add Friend</Text>
                </TouchableOpacity>
            )}
            <View style={styles.postHeader}>
                <Pressable onPress={() => navigation.navigate("PostDetail" )}>
                <Image
                    source={{ uri: "https://via.placeholder.com/50" }}
                    style={styles.avatar}
                />
                </Pressable>
                <Text style={styles.author}>{item.author}</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Like ({item.likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Comment ({item.comments})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Feetbook</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search ..."
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
            <View style={styles.addPostContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChangeText={setNewPostContent}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={handleAddPost}
                >
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f0f2f5",
        padding: 15,
    },
    header: {
        backgroundColor: "#4267B2",
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    searchContainer: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    addPostContainer: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 15,
    },
    input: {
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        fontSize: 16,
    },
    postButton: {
        backgroundColor: "#4267B2",
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 10,
    },
    postButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    post: {
        backgroundColor: "white",
        marginVertical: 10,
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        position: 'relative',
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
    button: {
        padding: 5,
    },
    buttonText: {
        color: "#4267B2",
        fontSize: 14,
    },
    addFriendButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: "#4267B2",
        borderRadius: 5,
        alignItems: "center",
    },
    addFriendButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Home;
