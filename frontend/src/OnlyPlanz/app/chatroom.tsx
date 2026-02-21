import { useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, Image, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { router, useLocalSearchParams } from "expo-router";
import { createChatStore } from "../stores/chatStore";

export default function ChatRoom() {
  const { userID } = useLocalSearchParams();
  const [text, setText] = useState("");

  const chatStore = createChatStore(userID as string);
  const messages = chatStore((state) => state.messages);
  const addSendMessage = chatStore((state) => state.addSendMessage);

  const handleSend = () => {
    if (text.trim().length > 0) {
      addSendMessage(text);
      setText("");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {/* Header */}
      <Pressable onPress={() => router.push(`/view_profile?userID=${userID}`)}>
        <View style={tw`flex-row items-center w-full bg-zinc-900 p-4 border-b border-zinc-800`}>
          <Image style={tw`w-10 h-10 rounded-full mr-3`} source={{ uri: "https://picsum.photos/200" }} />
          <Text style={tw`text-white font-bold text-lg`}>{userID}</Text>
        </View>
      </Pressable>

      {/* Messages */}
      <FlatList
        style={tw`flex-1 p-4`}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={tw`mb-4 ${item.label === "me" ? "items-end" : "items-start"}`}>
            <View style={tw`p-3 rounded-2xl ${item.label === "me" ? "bg-blue-600" : "bg-zinc-800"}`}>
              <Text style={tw`text-white`}>{item.content}</Text>
            </View>
            <Text style={tw`text-zinc-500 text-xs mt-1`}>{item.timestamp}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={tw`text-gray-500 text-center`}>No messages yet</Text>}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={tw`flex-row items-center p-4 bg-zinc-900`}>
          <TextInput
            style={tw`flex-1 bg-zinc-800 text-white px-4 py-3 rounded-full mr-3`}
            placeholder="Type a message..."
            placeholderTextColor="#71717a"
            value={text}
            onChangeText={setText}
          />
          <Pressable
            onPress={handleSend}
            style={({ pressed }) => [tw`bg-blue-600 px-5 py-3 rounded-full`, pressed && tw`opacity-70`]}
          >
            <Text style={tw`text-white font-semibold`}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}