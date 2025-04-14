import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function SignupScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...signupData } = formData;
      const response = await authService.signup(signupData);
      
      if (response.token) {
        await login(response.token, response.user);
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      Platform.OS === 'web' && styles.webContainer
    ]}>
      <Text style={styles.title}>Create Account</Text>
      <View style={[
        styles.formContainer,
        Platform.OS === 'web' && styles.webFormContainer
      ]}>
        <TextInput
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          style={styles.input}
          autoCapitalize="words"
        />
        <TextInput
          label="Last Name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          style={styles.input}
          autoCapitalize="words"
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          style={styles.input}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={handleSignup}
          loading={loading}
          style={styles.button}
        >
          Sign Up
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login' as never)}
          style={styles.button}
        >
          Already have an account? Login
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  webContainer: {
    maxWidth: 400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  formContainer: {
    width: '100%',
  },
  webFormContainer: {
    maxWidth: 400,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
}); 