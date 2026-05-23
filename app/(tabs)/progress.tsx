import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Progress = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900 pt-4">
      <View className="items-center justify-center">
        <Text className="text-4xl font-nunito-bold text-slate-600 dark:text-slate-300">
          Your Progress
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Progress;
