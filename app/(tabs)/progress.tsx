import Spacer from "@/components/UI/spacer";
import { icons } from "@/lib/constants/icons";
import { BookOpen, Clock4, Target, Trophy } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const Progress = () => {
  const [streak, setStreak] = React.useState(3);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [streakContinuous, setStreakContinuous] = React.useState(false);
  const activityData = [
    {
      id: 1,
      title: "Hours",
      value: "12",
      icon: Clock4,
    },
    {
      id: 2,
      title: "Lessons",
      value: "15",
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Accuracy",
      value: "85%",
      icon: Target,
    },
  ];
  const barData = [
    {
      value: 1,
      label: "Mon",
      topLabelComponent: () => (
        <Text className="text-lg font-nunito-bold text-primary">0</Text>
      ),
    },
    {
      value: 1,
      label: "Tue",
      topLabelComponent: () => (
        <Text className="text-lg font-nunito-bold text-primary">0</Text>
      ),
    },
    {
      value: 1,
      label: "Wed",
      topLabelComponent: () => (
        <Text className="text-lg font-nunito-bold text-primary">0</Text>
      ),
    },
    {
      value: 1,
      label: "Thu",
      topLabelComponent: () => (
        <Text className="text-lg font-nunito-bold text-primary">0</Text>
      ),
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 pt-4">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="">
          <Text className="text-4xl font-nunito-bold text-slate-600 dark:text-slate-300">
            Your Progress
          </Text>
        </View>
        <Spacer />
        <View className="">
          <Text className="text-2xl font-nunito-bold text-slate-600 dark:text-slate-300">
            Daily Goals
          </Text>
          <Spacer size={8} />
          <View
            className="bg-white rounded-xl p-4"
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 0.84,
              elevation: 1,
            }}
          >
            <View className="flex-row items-center gap-2 bg-yellow-300/40 px-2 py-1 rounded-full">
              <View className="px-2 py-0.5 bg-white rounded-full">
                <Image source={icons.fire} className="w-8 h-8" />
              </View>
              <Text className="text-lg font-nunito-bold text-orange-500 dark:text-slate-200">
                Daily Streak
              </Text>
              <View className="px-4 py-0.5 bg-white rounded-full ml-auto">
                <Text className="text-lg font-nunito-bold text-orange-500 dark:text-slate-200">
                  3
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2 bg-green-300/40 px-2 py-1 rounded-full mt-1">
              <View className="px-2 py-0.5 bg-white rounded-full">
                <Trophy size={24} color="#22c55e" />
              </View>
              <Text className="text-lg font-nunito-bold text-green-500 dark:text-slate-200">
                Best Streak
              </Text>
              <View className="px-4 py-0.5 bg-white rounded-full ml-auto">
                <Text className="text-lg font-nunito-bold text-green-500 dark:text-slate-200">
                  3
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-evenly mt-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <View key={index} className="flex items-center gap-2">
                  <View
                    className="p-1 bg-slate-200 rounded-full items-center justify-center"
                    style={{ opacity: streakContinuous ? 1 : 0.8 }}
                  >
                    <Image
                      source={icons.fire}
                      className="w-8 h-8"
                      tintColor={index + 1 > streak ? "#475569" : ""}
                    />
                  </View>
                  <Text
                    className={`text-base font-nunito-bold ${
                      index < streak ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    {days[index]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Spacer size={24} />
        <View className="">
          <Text className="text-2xl font-nunito-bold text-slate-600 dark:text-slate-300">
            Activity
          </Text>
          <Spacer size={8} />
          <View
            className="flex-row gap-2 bg-primary rounded-xl px-2 py-4"
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 0.84,
              elevation: 1,
            }}
          >
            {activityData.map((item, index) => (
              <View
                key={item.id}
                className="flex-1 items-center gap-2 py-2"
                style={{
                  borderLeftWidth: index === 1 ? 1 : 0,
                  borderRightWidth: index === 1 ? 1 : 0,
                  borderRightColor: index === 1 ? "white" : "none",
                  borderLeftColor: index === 1 ? "white" : "none",
                }}
              >
                <item.icon size={24} color="#f8fafc" />
                <Text className="text-xl font-nunito-extrabold text-slate-50">
                  {item.title}
                </Text>
                <Text className="text-xl font-nunito-bold text-slate-50">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Spacer size={24} />
        <View>
          <Text className="text-2xl font-nunito-bold text-slate-600 dark:text-slate-300">
            Vocabulary
          </Text>
          <Spacer size={8} />
          <View
            className=" gap-2 bg-white rounded-xl p-2"
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 0.84,
              elevation: 1,
            }}
          >
            <View>
              <Text className="text-lg font-nunito-bold text-slate-600 dark:text-slate-300">
                Total Words Learned
              </Text>
            </View>
            <Spacer size={8} />
            <View className="w-full">
              <BarChart
                data={barData}
                height={150}
                frontColor={"#5E5CE6"}
                barWidth={68}
                noOfSections={4}
                spacing={16}
                barBorderRadius={8}
                yAxisThickness={0}
                xAxisThickness={0}
                maxValue={20}
                hideRules
                hideYAxisText
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
