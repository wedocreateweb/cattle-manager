import { Tabs } from "expo-router";


export default function TabLayout() {
    return(
        <Tabs
            screenOptions={{tabBarActiveTintColor: '#ffd33d'}}>
            <Tabs.Screen name="index" options={{ title: 'Home'}} />
            <Tabs.Screen name="about" options={{ title: 'About'}} />
        </Tabs>
    );
}