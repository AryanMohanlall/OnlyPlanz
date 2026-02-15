import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

<<<<<<< HEAD
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { backgroundColor: '#000000' },
        headerShown: true,
      }}
    >
=======
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#007AFF',
      headerShown: true               
    }}>
>>>>>>> a24bbbea6ecefea94f83df310c2f3eafdbf257ea
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
=======
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
>>>>>>> a24bbbea6ecefea94f83df310c2f3eafdbf257ea
        }}
      />

      <Tabs.Screen
<<<<<<< HEAD
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
=======
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
>>>>>>> a24bbbea6ecefea94f83df310c2f3eafdbf257ea
        }}
      />
    </Tabs>
  );
}
