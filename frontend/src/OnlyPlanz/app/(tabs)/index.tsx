import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Home!</Text>
      
      {/* This is how you navigate to the (auth) folder */}
      <Pressable onPress={() => router.push('/(auth)/login')}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Go to Login</Text>
      </Pressable>
    </View>
  );
}
