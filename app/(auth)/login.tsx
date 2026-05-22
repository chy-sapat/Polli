import { Link, Redirect } from "expo-router";
import { LogIn } from "lucide-react-native";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/lib/constants/icons";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";

export default function LoginScreen() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const signIn = useAuthStore((state) => state.signIn);
  const firstTimeUser = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (isSignedIn) {
    return <Redirect href="/" />;
  }
  const handleSignIn = () => {
    signIn();
  };

  return (
    <SafeAreaView className="h-full justify-center bg-white dark:bg-slate-950 px-6">
      <View className="gap-8">
        {/* <View>
          <Image source={images.logo} className=" w-auto" />
        </View> */}
        <View className="gap-3">
          <Text className="font-nunito-bold text-4xl text-slate-900 dark:text-white">
            {`Welcome ${!firstTimeUser ? "back" : "to Polli App"}`}
          </Text>
          <Text className="font-nunito text-base leading-6 text-slate-600 dark:text-slate-300">
            Sign in with the dummy state to continue into the app.
          </Text>
        </View>

        <View className="gap-4">
          <View className="gap-2">
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
          </View>

          <View className="gap-2 relative">
            <Text className="font-nunito-semibold text-base  text-slate-400 dark:text-slate-200">
              Password
            </Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!passwordVisible}
              className="rounded-xl border border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 font-nunito text-base text-white"
            />
            <Pressable
              className="absolute right-1 bottom-2 p-2"
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <Eye size={24} color="#94a3b8" strokeWidth={1} />
              ) : (
                <EyeOff size={24} color="#94a3b8" strokeWidth={1} />
              )}
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleSignIn}
            className="mt-2 flex-row items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-4 active:opacity-50"
          >
            <LogIn color="#052e16" size={20} strokeWidth={2.5} />
            <Text className="font-nunito-bold text-base text-emerald-950">
              Sign in
            </Text>
          </Pressable>
        </View>
        <View>
          <Text className="font-nunito text-sm text-center text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-nunito-bold underline text-slate-500 dark:text-slate-300"
            >
              Sign up
            </Link>
          </Text>
        </View>
        <View className="gap-4">
          <Text className="font-nunito text-sm text-center text-slate-500 dark:text-slate-400">
            Or Continue with
          </Text>
          <Pressable className="mt-2 flex-row items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-4 active:opacity-50">
            <Image source={icons.google} className="w-6 h-6" />
            <Text className="font-nunito text-base text-white">Google</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
