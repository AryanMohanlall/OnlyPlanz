import { useRouter } from 'expo-router';
import { Button, View } from 'react-native';

export default function Login() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title="Log In" 
        onPress={() => router.replace('/(tabs)/index')} 
      />
    </View>
  );
}
