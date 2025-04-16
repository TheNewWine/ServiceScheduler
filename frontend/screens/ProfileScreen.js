import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Switch, List } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoursWorked, setHoursWorked] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const [userResponse, hoursResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:8080/api/users/hours', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setUser(userResponse.data);
      setHoursWorked(hoursResponse.data.totalHours);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(
        'http://localhost:8080/api/users/notifications',
        { enabled: !user.notificationsEnabled },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...user, notificationsEnabled: !user.notificationsEnabled });
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  if (loading || !user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Profile Information</Title>
          <Paragraph>Name: {user.firstName} {user.lastName}</Paragraph>
          <Paragraph>Email: {user.email}</Paragraph>
          <Paragraph>Phone: {user.phoneNumber}</Paragraph>
          <Paragraph>Total Hours Worked: {hoursWorked}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Settings</Title>
          <List.Item
            title="Enable Notifications"
            right={() => (
              <Switch
                value={user.notificationsEnabled}
                onValueChange={toggleNotifications}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default ProfileScreen; 