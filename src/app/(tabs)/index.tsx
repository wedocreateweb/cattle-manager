// src/app/index.tsx
import { Link } from 'expo-router';
import { styled } from "nativewind";
import {
  Text
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import "../../../global.css";

const SafeAreaView = styled(RNSafeAreaView)
export default function HomeScreen() {

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <Text className='text-xl font-bold text-success'>
        Welcome to Nativewind
      </Text>
      <Link href="/onboarding" className='mt-4 rounded bg-primary text-white p-4'>Go to onboarding</Link>
      <Link href="/(auth)/sign-in" className='mt-4 rounded bg-primary text-white p-4'>Go to Sign In</Link>
      <Link href="/(auth)/sign-up" className='mt-4 rounded bg-primary text-white p-4'>Go to Sign Up</Link>
      <Link href="/(tabs)/subscriptions/nonsptifyyyy" className='mt-4 rounded bg-primary text-white p-4'>Go to spotify</Link>
      <Link href={{ pathname: "/(tabs)/subscriptions/[id]", params: { id: "Spotify" } }} className='mt-4 rounded bg-primary text-white p-4'>Go to spotifyyyyy</Link>
    </SafeAreaView>
  );
}