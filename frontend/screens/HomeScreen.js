import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [upcomingServices, setUpcomingServices] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const [servicesResponse, eventsResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/services/upcoming', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:8080/api/events/upcoming', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setUpcomingServices(servicesResponse.data);
      setUpcomingEvents(eventsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Upcoming Services</Title>
        {upcomingServices.map((service) => (
          <Card key={service.id} style={styles.card}>
            <Card.Content>
              <Title>{service.name}</Title>
              <Paragraph>{service.description}</Paragraph>
              <Paragraph>Date: {new Date(service.startTime).toLocaleDateString()}</Paragraph>
              <Paragraph>Time: {new Date(service.startTime).toLocaleTimeString()}</Paragraph>
              <Paragraph>Location: {service.location}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('ServiceDetails', { serviceId: service.id })}>
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Upcoming Events</Title>
        {upcomingEvents.map((event) => (
          <Card key={event.id} style={styles.card}>
            <Card.Content>
              <Title>{event.name}</Title>
              <Paragraph>{event.description}</Paragraph>
              <Paragraph>Date: {new Date(event.eventDate).toLocaleDateString()}</Paragraph>
              <Paragraph>Time: {new Date(event.startTime).toLocaleTimeString()}</Paragraph>
              <Paragraph>Location: {event.location}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}>
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default HomeScreen; 