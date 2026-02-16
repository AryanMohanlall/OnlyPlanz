import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

export default function ViewProfile(){
    return(
        <SafeAreaView>
            <View style={tw`flex items-center mb-3`}>
          <Image
            source={{ uri: "https://picsum.photos/400/300" }}
            style={tw`w-10 h-10 rounded-full mr-3`}
          />
          <Text style={tw`font-bold text-base`}>username</Text>
        </View>

            <View style={tw`flex-row justify-between mb-3 px-10`}>
            <View style={tw`items-center`}>
                <Text style={tw`text-gray-500 text-s`}>Followers</Text>
                <Text style={tw`font-semibold`}>1.2k</Text>
            </View>

            <View style={tw`items-center`}>
                <Text style={tw`text-gray-500 text-s`}>Posts</Text>
                <Text style={tw`font-semibold`}>48</Text>
            </View>

            <View style={tw`items-center`}>
                <Text style={tw`text-gray-500 text-s`}>Following</Text>
                <Text style={tw`font-semibold`}>312</Text>
            </View>
            </View>

        </SafeAreaView>
    );
}