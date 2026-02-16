import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* (auth) is the folder for Login/Signup */}
      <Stack.Screen 
        name="(auth)" 
        options={{ headerShown: false }} 
      />
      
      {/* (tabs) is the folder for your main app navigation */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />

      {/* This handles a "Not Found" or Modal screen if needed */}
      <Stack.Screen 
        name="modal" 
        options={{ presentation: 'modal', title: 'Info' }} 
      />
    </Stack>
  );
}
