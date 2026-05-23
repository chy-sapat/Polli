import Spacer from "@/components/UI/spacer";
import { BookOpen, Clock4, Target } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const Progress = () => {
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
            Activity
          </Text>
          <Spacer size={8} />
          <View
            className="flex-row gap-2 bg-primary rounded-xl p-2"
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
                className="flex-1 items-center gap-1 rounded-xl py-2"
                style={{
                  borderLeftWidth: index === 1 ? 1 : 0,
                  borderRightWidth: index === 1 ? 1 : 0,
                  borderRightColor: index === 1 ? "white" : "none",
                  borderLeftColor: index === 1 ? "white" : "none",
                }}
              >
                <item.icon size={32} color="#f8fafc" />
                <Text className="text-lg font-nunito-medium text-slate-50">
                  {item.title}
                </Text>
                <Text className="text-lg font-nunito-bold text-slate-50">
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
