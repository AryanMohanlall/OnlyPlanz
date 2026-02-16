import { Modal, View, Text, Pressable } from "react-native";
import tw from "twrnc";

type CommentSectionProps = {
  visible: boolean;
  onClose: () => void;
};

export default function CommentSection({ visible, onClose }: CommentSectionProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 bg-black/50 justify-end`}>
        <View style={tw`bg-white rounded-t-3xl p-5 min-h-[85%]`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Comments</Text>

          {/* TODO: Your comments list goes here */}

          <Pressable onPress={onClose} style={tw`mt-4 p-3 bg-gray-200 rounded-xl`}>
            <Text style={tw`text-center font-semibold`}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
