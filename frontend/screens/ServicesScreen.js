import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Text, FAB } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:8080/api/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchServices();
    setRefreshing(false);
  };

  const handleSignIn = async (serviceId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `http://localhost:8080/api/services/${serviceId}/sign-in`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchServices();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async (serviceId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `http://localhost:8080/api/services/${serviceId}/sign-out`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchServices();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {services.map((service) => (
          <Card key={service.id} style={styles.card}>
            <Card.Content>
              <Title>{service.name}</Title>
              <Paragraph>{service.description}</Paragraph>
              <Paragraph>Date: {new Date(service.startTime).toLocaleDateString()}</Paragraph>
              <Paragraph>Time: {new Date(service.startTime).toLocaleTimeString()}</Paragraph>
              <Paragraph>Location: {service.location}</Paragraph>
              <Paragraph>Volunteers: {service.currentVolunteers}/{service.requiredVolunteers}</Paragraph>
            </Card.Content>
            <Card.Actions>
              {service.isSignedIn ? (
                <Button onPress={() => handleSignOut(service.id)}>Sign Out</Button>
              ) : (
                <Button onPress={() => handleSignIn(service.id)}>Sign In</Button>
              )}
              <Button onPress={() => navigation.navigate('ServiceDetails', { serviceId: service.id })}>
                Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateService')}
      />
    </View>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ServicesScreen; 