import Spacer from "@/components/UI/spacer";
import { icons } from "@/lib/constants/icons";
import { Bell, ChevronRight, Flame, Play } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [language, setLanguage] = React.useState("en");
  const [streak, setStreak] = React.useState(3);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [streakContinuous, setStreakContinuous] = React.useState(false);
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 py-4">
      <View className="flex-row items-center px-4">
        <Pressable className="flex-row items-center gap-4 border border-slate-600 px-4 py-2 rounded-full active:opacity-60">
          <Image source={icons.flag_en} className="w-10 h-10" />
          <Text className="text-slate-600 dark:text-slate-300 text-lg font-nunito-bold">
            English
          </Text>
          <ChevronRight size={20} color="#94a3b8" />
        </Pressable>
        <Pressable className="ml-auto p-2 rounded-full active:opacity-60">
          <Bell size={30} color="#94a3b8" />
        </Pressable>
      </View>
      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Spacer />
        <View className="p-10 bg-primary rounded-[60px]">
          <Text className="text-white text-lg font-nunito-bold px-2 py-1 bg-slate-50/20 rounded-xl self-start">
            Getting Started
          </Text>
          <Spacer />
          <View className=" rounded-lg">
            <Text className="text-white text-3xl font-nunito-extrabold">
              Greetings & Basic Conversations
            </Text>
            <Text className="text-white text-lg font-nunito-regular mt-2">
              Start your language learning journey with essential greetings and
              basic conversations.
            </Text>
          </View>
          <Spacer />
          <Pressable
            className="mt-4 bg-slate-50 rounded-full px-4 py-3 flex-row items-center justify-center gap-2 active:opacity-60"
            style={{
              shadowOffset: {
                width: 2,
                height: 8,
              },
              shadowOpacity: 0.8,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => {}}
          >
            <Text className="text-primary text-lg font-nunito-bold">
              Start Learning
            </Text>
            <Play size={20} color="#5E5CE6" className="ml-2" />
          </Pressable>
        </View>
        <Spacer />
        <View className="gap-4 px-2 py-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Text className="text-lg font-nunito-bold text-slate-600 dark:text-slate-300">
            Daily Goals
          </Text>
          <View className="flex-row items-center justify-between">
            {Array.from({ length: 7 }).map((_, index) => (
              <View key={index} className="flex items-center gap-2 mb-2">
                <View className="p-0.5 bg-slate-100 rounded-full items-center justify-center">
                  <Flame
                    size={32}
                    color={index < streak ? "#f87171" : "#94a3b8"}
                    className="mb-1"
                  />
                </View>
                <Text
                  className={`text-sm font-nunito-bold ${
                    index < streak ? "text-red-500" : "text-slate-500"
                  }`}
                >
                  {days[index]}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Spacer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
