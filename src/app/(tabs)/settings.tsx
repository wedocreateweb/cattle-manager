import { useAuth, useUser } from '@clerk/expo';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setSigningOut(true);
            try {
              await signOut();
              router.replace('/(auth)/sign-in');
            } catch (error) {
              console.error('Sign out error:', error);
            } finally {
              setSigningOut(false);
            }
          },
        },
      ]
    );
  };

  const displayName = user?.fullName || user?.firstName || 'User Account';
  const emailAddress = user?.primaryEmailAddress?.emailAddress || 'No email address';
  const userImageUrl = user?.imageUrl;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Screen Header */}
        <Text className="text-3xl font-sans-extrabold text-primary mb-6">Settings</Text>

        {/* Profile Card */}
        <View className="mb-6 rounded-3xl border border-border bg-card p-5 flex-row items-center gap-4">
          {userImageUrl ? (
            <Image
              source={{ uri: userImageUrl }}
              className="size-16 rounded-full bg-muted"
            />
          ) : (
            <View className="size-16 items-center justify-center rounded-full bg-accent">
              <Text className="text-2xl font-sans-extrabold text-white">
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <View className="flex-1 min-w-0">
            <Text className="text-xl font-sans-bold text-primary" numberOfLines={1}>
              {displayName}
            </Text>
            <Text className="text-sm font-sans-medium text-muted-foreground mt-0.5" numberOfLines={1}>
              {emailAddress}
            </Text>
            <View className="mt-2 flex-row items-center gap-1.5">
              <View className="size-2 rounded-full bg-success" />
              <Text className="text-xs font-sans-semibold text-success uppercase">Active Session</Text>
            </View>
          </View>
        </View>

        {/* Account Options Group */}
        <View className="mb-6 rounded-3xl border border-border bg-card p-2">
          <Pressable className="flex-row items-center justify-between p-4 border-b border-border">
            <View className="flex-row items-center gap-3">
              <View className="size-10 items-center justify-center rounded-2xl bg-muted">
                <Ionicons name="person-outline" size={20} color="#081126" />
              </View>
              <View>
                <Text className="text-base font-sans-bold text-primary">Personal Details</Text>
                <Text className="text-xs font-sans-medium text-muted-foreground">Manage profile info</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(0,0,0,0.4)" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-border">
            <View className="flex-row items-center gap-3">
              <View className="size-10 items-center justify-center rounded-2xl bg-muted">
                <Ionicons name="shield-checkmark-outline" size={20} color="#081126" />
              </View>
              <View>
                <Text className="text-base font-sans-bold text-primary">Security & Password</Text>
                <Text className="text-xs font-sans-medium text-muted-foreground">Multi-factor & credentials</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(0,0,0,0.4)" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3">
              <View className="size-10 items-center justify-center rounded-2xl bg-muted">
                <Ionicons name="notifications-outline" size={20} color="#081126" />
              </View>
              <View>
                <Text className="text-base font-sans-bold text-primary">Notifications</Text>
                <Text className="text-xs font-sans-medium text-muted-foreground">Reminders and renewal alerts</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(0,0,0,0.4)" />
          </Pressable>
        </View>

        {/* Sign Out Action Button */}
        <Pressable
          onPress={handleSignOut}
          disabled={signingOut}
          className="flex-row items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 py-4"
        >
          {signingOut ? (
            <ActivityIndicator color="#dc2626" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#dc2626" />
              <Text className="text-base font-sans-bold text-destructive">Sign Out</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}