import { View, Image, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { useChat } from '../../services/chatroom.service';
import { useState } from "react";

export default function ChatRoom() {
    // 1. Pull data and functions from your service
    const { messages, addSendMessage } = useChat();
    const [text, setText] = useState("");

    const handleSend = () => {
        if(text.trim().length > 0) {
            addSendMessage(text); // This updates the state in the service
            setText("");          // Clear the input
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-black`}>
            {/* HEADER */}
            <View style={tw`flex-row items-center w-full bg-zinc-900 p-4 border-b border-zinc-800`}>
                <Image 
                    style={tw`w-10 h-10 rounded-full mr-3`} 
                    source={{ uri: "https://picsum.photos" }} 
                />
                <Text style={tw`text-white font-bold text-lg`}>username</Text>
            </View>

            {/* MESSAGES LOG: This replaces your "View with ID" */}
            <FlatList
                style={tw`flex-1 p-4`}
                data={messages} // React "watches" this. When it changes, UI updates automatically!
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={tw`mb-4 ${item.label === 'me' ? 'items-end' : 'items-start'}`}>
                        <View style={tw`p-3 rounded-2xl ${item.label === 'me' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                            <Text style={tw`text-white`}>{item.content}</Text>
                        </View>
                        <Text style={tw`text-zinc-500 text-xs mt-1`}>{item.timestamp}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={tw`text-gray-500 text-center`}>No messages yet</Text>}
            />

            {/* INPUT AREA */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={tw`flex-row items-center p-4 bg-zinc-900`}>
                    <TextInput
                        style={tw`flex-1 bg-zinc-800 text-white px-4 py-3 rounded-full mr-3`}      
                        placeholder='Type a message...'
                        placeholderTextColor="#71717a"
                        value={text}
                        onChangeText={setText} // Updates local input state
                    />
                    <Pressable 
                        onPress={handleSend} // Triggers the send logic
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
