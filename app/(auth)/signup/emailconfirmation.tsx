import Button from "@/components/UI/button";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmailConfirmation = () => {
  return (
    <SafeAreaView className="h-full justify-center bg-white dark:bg-slate-950 px-6">
      <View className="gap-8">
        <View className="gap-3">
          <Text className="font-nunito-bold text-4xl text-slate-900 dark:text-white">
            Email Confirmation
          </Text>
          <Text className="font-nunito text-base leading-6 text-slate-600 dark:text-slate-300">
            Please check your email for the confirmation code to complete your
            registration.
          </Text>
        </View>
        <View className="gap-4">
          <Text className="font-nunito-semibold text-base text-slate-400 dark:text-slate-200">
            Confirmation Code
          </Text>
          <TextInput
            placeholder="Enter the confirmation code"
            placeholderTextColor="#94a3b8"
            className="rounded-xl border border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 font-nunito text-base text-white"
          />
        </View>
        <Button
          onPress={() => {}}
          className="rounded-xl bg-emerald-500 px-4 py-4 flex-row items-center justify-center"
        >
          <Text className="font-nunito-bold text-base text-emerald-950">
            Confirm Email
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EmailConfirmation;
