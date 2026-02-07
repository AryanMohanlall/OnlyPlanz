import { View, Text, Button, ScrollView } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Post from '@/components/post';
import ParallaxScrollView from '@/components/parallax-scroll-view';

export default function Home() {
  
  const user = false;
  
  return (
    <SafeAreaView style={tw`flex-1 bg-sky-600 opacity-85 px-6 justify-center`}>
      <ScrollView contentContainerStyle={tw`p-1`} showsVerticalScrollIndicator={false}>
        
        <Post  
          username="john_doe"
          content="This is my first post on this app!"
          image="https://picsum.photos/400/300"
        />
        <Post
          username="john_doe"
          content="On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
          //image="https://picsum.photos/400/300"
        />
        <Post
          username="john_doe"
          content="This is my first post on this app!"
          image="https://picsum.photos/400/300"
         />

      </ScrollView>
    </SafeAreaView>
  );
}
