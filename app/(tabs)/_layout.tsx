import { Tabs } from "expo-router";
import { CircleUser, GraduationCap, TrendingUp } from "lucide-react-native";
import { useColorScheme } from "nativewind";

const TabIcons = ({
  focused,
  title,
  Icon,
}: {
  focused: boolean;
  title: string;
  Icon: React.FC<{ size: number; color: string }>;
}) => {
  const color = focused ? "#3b82f6" : "#94a3b8";
  return <Icon size={24} color={color} />;
};

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const tabColor = colorScheme === "dark" ? "#0f172a" : "#fff";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabColor,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Learn",
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} title="Learn" Icon={GraduationCap} />
          ),
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} title="Progress" Icon={TrendingUp} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} title="Profile" Icon={CircleUser} />
          ),
        }}
      />
    </Tabs>
  );
}
