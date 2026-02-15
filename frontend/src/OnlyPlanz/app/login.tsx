import { Link, Redirect, useRouter } from 'expo-router';
import { View, Text, TextInput, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function Login() {
  const router = useRouter();
  return (
    <ImageBackground
        source={require('../assets/images/login-background.jpg')}
        style={tw`flex-1 justify-center`}
        resizeMode="cover">

    <SafeAreaView style={tw`flex-1 bg-black opacity-85 px-6 justify-center`}>
      <Text style={tw`text-white text-3xl font-bold mb-2 text-center`}>Welcome back</Text>
      <Text style={tw`text-gray-400 mb-8 text-center`}>Log in to continue</Text>

      <TextInput
        style={tw`bg-gray-900 text-white px-4 py-3 rounded-xl mb-4`}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        style={tw`bg-gray-900 text-white px-4 py-3 rounded-xl mb-6`}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />

      <Pressable style={tw`bg-blue-500 py-3 rounded-xl items-center`}
        onPress={
          ()=>{router.push("/"); console.log(window.location)}
        }>
        <Text style={tw`text-white font-semibold text-lg`}>Log In</Text>
      </Pressable>

    </SafeAreaView>
    </ImageBackground>

  );
}
