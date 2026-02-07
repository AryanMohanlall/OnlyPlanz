import { View, Text, Button } from 'react-native';
import { Link, Redirect } from 'expo-router';

export default function Home() {
  
  const user = false;
  //if(!user){
      return (<Redirect href={"/login"}></Redirect>);
  //}
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Page</Text>

    </View>
  );
}
