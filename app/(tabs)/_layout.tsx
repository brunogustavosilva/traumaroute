import { Tabs } from 'expo-router';
import { Activity, ClipboardCheck, Map } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#37E6D0',
        tabBarInactiveTintColor: '#82939C',
        tabBarStyle: { backgroundColor: '#0D1419', borderTopColor: '#25323A', height: 62 },
        tabBarLabelStyle: { fontFamily: 'SpaceMono', fontSize: 8, marginBottom: 5 },
        tabBarItemStyle: { paddingTop: 6 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Navegar',
          tabBarIcon: ({ color }) => (
            <Activity color={color} size={19} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Rotas',
          tabBarIcon: ({ color }) => (
            <Map color={color} size={19} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Relatório',
          tabBarIcon: ({ color }) => (
            <ClipboardCheck color={color} size={19} />
          ),
        }}
      />
    </Tabs>
  );
}
