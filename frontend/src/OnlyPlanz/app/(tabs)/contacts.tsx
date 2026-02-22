import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function Contacts() {
  const [contacts, setContacts] = useState<{ title: string }[]>([]);

  useEffect(() => {
    setContacts([{ title: "One" }, { title: "Two" }, { title: "Three" }]);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FlatList
        data={contacts}
        keyExtractor={(item, i) => i.toString()}
        contentContainerStyle={tw`p-3`}
        ItemSeparatorComponent={() => <View style={tw`h-3`} />}
        renderItem={({ item }) => (
          <Pressable
            style={tw`flex-row items-center p-3 bg-gray-100 rounded-2xl`}
            onPress={()=>{router.push({
                pathname: "/chatroom",
                params:{userID : item.title}
            })}}
          >
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={tw`w-12 h-12 rounded-full mr-4`}
            />

            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-semibold text-gray-900`}>
                {item.title}
              </Text>

              <Text style={tw`text-gray-500 text-xs`}>
                Tap to open chat
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}