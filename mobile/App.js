import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PetFormScreen from './src/screens/PetFormScreen';
import PetDetailScreen from './src/screens/PetDetailScreen';
import MapScreen from './src/screens/MapScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEF3E6' }}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={{ marginTop: 12, color: '#999' }}>Carregando...</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6C63FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'CantinhoPet',
            headerRight: () => (
              <HeaderRight onLogout={signOut} userEmail={user.email} />
            ),
          }}
        />
        <Stack.Screen
          name="PetForm"
          component={PetFormScreen}
          options={{ title: 'Novo Pet' }}
        />
        <Stack.Screen
          name="PetDetail"
          component={PetDetailScreen}
          options={{ title: 'Detalhes do Pet' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Veterinários Próximos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HeaderRight({ onLogout, userEmail }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ color: '#fff', fontSize: 13, maxWidth: 120 }} numberOfLines={1}>
        {userEmail || ''}
      </Text>
      <TouchableOpacity onPress={onLogout} style={{ padding: 4 }}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
