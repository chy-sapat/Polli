import { Link, Redirect } from "expo-router";
import { LogIn } from "lucide-react-native";
import {ActivityIndicator, Image, Pressable, Text, TextInput, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/lib/constants/icons";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import {useRouter} from 'expo-router'
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const signIn = useAuthStore((state) => state.signIn);
  const firstTimeUser = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);


  const router = useRouter();
  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const handleSignIn = async () => {

        setLogging(true);

      if (!baseUrl) {
      Toast.show({
        type: "error",
        text1: "Missing API URL",
        text2: "Set EXPO_PUBLIC_BASE_URL in .env and restart Metro.",
      });
      return;
    }

    if (!email.trim() || !password) {
      Toast.show({
        type: "error",
        text1: "Missing credentials",
        text2: "Please enter your email and password.",
      });
      return;
    }




    try {
      const response = await axios.post(`${baseUrl}/login`,{
          email,
          password,
      } ,{
          validateStatus:()=>true
      });
      console.log("message hehe",response.data.message);

      if (response.data?.success) {
        Toast.show({
          type: "success",
          text1: "Logged in successfully!",
        });
        await SecureStore.setItemAsync("token", response.data.token);
        signIn();
        router.push("/(tabs)");
        return;
      }else{
          Toast.show({
              type: "error",
              text1: "Login failed",
              text2: response.data?.message ?? "Invalid credentials.",
          });
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.status);
            console.log(error.response?.data);
        } else {
            console.log(error);
        }
    }
    finally {

            setLogging(false);


        }



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
              onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
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
            disabled={logging}
            className="mt-2 flex-row items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-4 active:opacity-50"
          >
              {logging && (
                  <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
              )}
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
