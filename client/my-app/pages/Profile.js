import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.coverPhoto}
        />
        <View style={styles.profilePhotoContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profilePhoto}
          />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>Rabin</Text>
        <Text style={styles.bio}>Web Developer | React Native Enthusiast</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>250</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1000</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Story</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Recent Posts</Text>
      </View>

      {/* Sample post */}
      <View style={styles.post}>
        <Text style={styles.postContent}>This is a sample post. React Native is awesome!</Text>
        <View style={styles.postFooter}>
          <Text>15 Likes</Text>
          <Text>3 Comments</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    height: 200,
  },
  coverPhoto: {
    width: '100%',
    height: 150,
  },
  profilePhotoContainer: {
    position: 'absolute',
    bottom: -50,
    left: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 75,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    marginTop: 60,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    padding: 20,
    backgroundColor: 'white',
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  post: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
  },
  postContent: {
    fontSize: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Profile;
