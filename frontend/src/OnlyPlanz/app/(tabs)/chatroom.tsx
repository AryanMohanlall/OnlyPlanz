import { View, Image, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

export default function ChatRoom() {
  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      
      <View style={tw`flex-row items-center w-full bg-zinc-900 p-4 border-b border-zinc-800`}>
        <Image 
          style={tw`w-10 h-10 rounded-full mr-3`} 
          source={{ uri: "https://picsum.photos" }} 
        />
        <Text style={tw`text-white font-bold text-lg`}>username</Text>
      </View>

      <View style={tw`flex-1 p-4`}>
        <Text style={tw`text-gray-500 text-center`}>No messages yet</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`flex-row items-center p-4 bg-zinc-900`}>
          <TextInput
            style={tw`flex-1 bg-zinc-800 text-white px-4 py-3 rounded-full mr-3`}      
            placeholder='Type a message...'
            placeholderTextColor="#71717a" 
          />
          <Pressable 
            style={({ pressed }) => [
              tw`bg-blue-600 px-5 py-3 rounded-full`,
              pressed && tw`opacity-70` 
            ]}
          >
            <Text style={tw`text-white font-semibold`}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
