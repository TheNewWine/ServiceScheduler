import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Text, FAB } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpecialEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:8080/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const handleRegister = async (eventId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `http://localhost:8080/api/events/${eventId}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `http://localhost:8080/api/events/${eventId}/unregister`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchEvents();
    } catch (error) {
      console.error('Error unregistering from event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.map((event) => (
          <Card key={event.id} style={styles.card}>
            <Card.Content>
              <Title>{event.name}</Title>
              <Paragraph>{event.description}</Paragraph>
              <Paragraph>Date: {new Date(event.eventDate).toLocaleDateString()}</Paragraph>
              <Paragraph>Time: {new Date(event.startTime).toLocaleTimeString()}</Paragraph>
              <Paragraph>Location: {event.location}</Paragraph>
              <Paragraph>Volunteers: {event.currentVolunteers}/{event.requiredVolunteers}</Paragraph>
            </Card.Content>
            <Card.Actions>
              {event.isRegistered ? (
                <Button onPress={() => handleUnregister(event.id)}>Unregister</Button>
              ) : (
                <Button onPress={() => handleRegister(event.id)}>Register</Button>
              )}
              <Button onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}>
                Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateEvent')}
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

export default SpecialEventsScreen; 