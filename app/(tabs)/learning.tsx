import Spacer from "@/components/UI/spacer";
import {
  BookOpenText,
  ChevronDown,
  SendHorizontal,
  Star,
  TextInitial,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Learning = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900 pt-4">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-1 px-2">
          <Text className="text-4xl text-center font-nunito-bold text-slate-600 dark:text-slate-300">
            Level 1
          </Text>
        </View>
        <Spacer />
        <View
          className="bg-white dark:bg-slate-800 rounded-xl "
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center w-full px-2 py-4 bg-primary rounded-t-xl">
            <Text className="text-lg font-nunito-semibold text-slate-50">
              Greetings & Basic Conversations
            </Text>
            <View className="ml-auto">
              <ChevronDown size={20} color="#f8fafc" className="ml-auto" />
            </View>
          </View>
          <View className="px-2 py-4">
            <Text className="text-slate-600 dark:text-slate-300 font-nunito-medium text-lg">
              Learn how to greet others, introduce yourself, and engage in basic
              conversations.
            </Text>
          </View>
          <Pressable className="flex-row items-center px-2 py-4 border-y border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <BookOpenText size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Vocabulary
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-b border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <TextInitial size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Sentence Builder
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-b border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <SendHorizontal size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Practice Conversation
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <Star size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Review
            </Text>
          </Pressable>
        </View>
        <Spacer />
        <View
          className="bg-white dark:bg-slate-800 rounded-xl "
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center w-full px-2 py-4 bg-primary rounded-t-xl">
            <Text className="text-lg font-nunito-semibold text-slate-50">
              Introductions & Personal Information
            </Text>
            <View className="ml-auto">
              <ChevronDown size={20} color="#f8fafc" className="ml-auto" />
            </View>
          </View>
          <View className="px-2 py-4">
            <Text className="text-slate-600 dark:text-slate-300 font-nunito-medium text-lg">
              Learn how to introduce yourself, ask for personal information, and
              share details about your background.
            </Text>
          </View>
          <Pressable className="flex-row items-center px-2 py-4 border-y border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <BookOpenText size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Vocabulary
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-b border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <TextInitial size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Sentence Builder
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-b border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <SendHorizontal size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Practice Conversation
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <Star size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Review
            </Text>
          </Pressable>
        </View>
        <Spacer />
        <View
          className="bg-white dark:bg-slate-800 rounded-xl "
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center w-full px-2 py-4 bg-primary rounded-t-xl">
            <Text className="text-lg font-nunito-semibold text-slate-50">
              Shopping & Dining Out
            </Text>
            <View className="ml-auto">
              <ChevronDown size={20} color="#f8fafc" className="ml-auto" />
            </View>
          </View>
          <View className="px-2 py-4">
            <Text className="text-slate-600 dark:text-slate-300 font-nunito-medium text-lg">
              Learn how to shop for items, order food at restaurants, and
              navigate common scenarios in retail and dining settings.
            </Text>
          </View>
          <Pressable className="flex-row items-center px-2 py-4 border-y border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <BookOpenText size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Vocabulary
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-b border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <TextInitial size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Sentence Builder
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-b border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <SendHorizontal size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Practice Conversation
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center px-2 py-4 border-slate-200 dark:border-slate-700 active:opacity-60">
            <View className="mr-2">
              <Star size={20} color="#5E5CE6" />
            </View>
            <Text className="text-lg font-nunito-medium text-slate-600 dark:text-slate-300">
              Review
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Learning;
