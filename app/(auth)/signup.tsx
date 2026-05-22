import Button from "@/components/UI/button";
import { icons } from "@/lib/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-full justify-center bg-white dark:bg-slate-950 px-6">
      <View className="gap-8">
        <View className="gap-3">
          <Text className="font-nunito-bold text-4xl text-slate-900 dark:text-white">
            Create an account
          </Text>
          <Text className="font-nunito text-base leading-6 text-slate-600 dark:text-slate-300">
            Sign up with the dummy state to continue into the app.
          </Text>
        </View>
        <View className="gap-4">
          <View className="gap-4">
            <Text className="font-nunito-semibold text-base text-slate-400 dark:text-slate-200">
              Email
            </Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor="#94a3b8"
              className="rounded-xl border border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 font-nunito text-base text-white"
            />
            <Button
              onPress={() => router.push("/signup/passwords")}
              className="rounded-xl bg-emerald-500 px-4 py-4 flex-row items-center justify-center"
            >
              <Text className="font-nunito-bold text-base text-emerald-950">
                Sign up
              </Text>
            </Button>
          </View>
          <View className="gap-4">
            <Text className="font-nunito text-base leading-6 text-center text-slate-600 dark:text-slate-300">
              Or Continue with
            </Text>
            <Button
              onPress={() => {}}
              className="rounded-xl border border-slate-700 px-4 py-4 flex-row items-center justify-center"
            >
              <Image source={icons.google} className="w-5 h-5 mr-2" />
              <Text className="font-nunito-bold text-base text-slate-300">
                Google
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
