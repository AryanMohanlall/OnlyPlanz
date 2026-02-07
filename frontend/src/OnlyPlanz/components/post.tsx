import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";

type PostProps = {
  username: string;
  content: string;
  image?: string;
};

export default function Post({ username, content, image }: PostProps) {
  
    return (
    <Pressable style={tw`bg-white rounded-2xl p-4 mb-4 shadow-md`}>
      {/* Header */}
      <View style={tw`flex-row items-center mb-3`}>
        <Image
          source={{ uri: image || "https://www.google.com/imgres?q=profile%20pic%20defualt&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F82%2F85%2F96%2F828596ef925a10e8c1a76d3a3be1d3e5.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Ftiktok-default-profile-picture-sticker-sticker-in-2025--180003317647404426%2F&docid=ZqgBYz_PsFPpVM&tbnid=5bLGzwkK3pL15M&vet=12ahUKEwj-7rqKiMiSAxVfUUEAHeAwF-MQnPAOegQIFxAB..i&w=736&h=736&hcb=2&ved=2ahUKEwj-7rqKiMiSAxVfUUEAHeAwF-MQnPAOegQIFxAB" }}
          style={tw`w-10 h-10 rounded-full mr-3`}
        />
        <Text style={tw`font-semibold text-base`}>{username}</Text>
      </View>

      {/* Content */}
      <Text style={tw`text-gray-800 mb-3`}>
        {content}
      </Text>

      {/* Image */}
      <Image
        source={{ uri: image || "https://picsum.photos/400/300" }}
        style={tw`w-full h-48 rounded-xl mb-3`}
        resizeMode="cover"
      />
    </Pressable>
  );
}
