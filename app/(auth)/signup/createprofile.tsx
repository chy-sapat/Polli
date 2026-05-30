import Button from "@/components/UI/button";
import { useUserData } from "@/lib/stores/newUser-store";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

const CreateProfile = () => {
  const {email,password,name,nationality, setUser } = useUserData();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inputNationality, setInputNationality] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleCreateProfile = async() => {
    setLoading(true);
    const name=firstName.trim() + " " + lastName.trim();
    setUser({ name, nationality: inputNationality });
    
    try {
      
      const response = await axios.post(`${baseUrl}/register`, { email, password, name, nationality: inputNationality }, {
        validateStatus: () => true,
      });
      
      if (response.data.success) {

        Toast.show({
          type: "success",
          text1: "Profile created successfully",
          text2: "You can now log in with your credentials.",
        });
        router.push("/login"); 
      } else {
        Toast.show({
          type:"error",
          text1:"Failed to create profile",
          text2:response.data.message || "Please try again."
        })
      }
    } catch (error) {
      Toast.show({
        type:"error",
        text1:"Network Error",
        text2:"Please check your internet connection and try again."
      })
      
    } finally {
      setLoading(false);
    }


  };
  return (
    <SafeAreaView className="h-full justify-center bg-white dark:bg-slate-950 px-6">
      <View className="gap-4">
        <View className="gap-3">
          <Text className="font-nunito-bold text-4xl text-slate-900 dark:text-white">
            Create your profile
          </Text>
          <Text className="font-nunito text-base leading-6 text-slate-600 dark:text-slate-300">
            Let's start with creating your profile.
          </Text>
        </View>
        <View className="gap-4">
          <Text className="font-nunito-semibold text-base text-slate-400 dark:text-slate-200">
            First Name
          </Text>
          <TextInput
            placeholder="Enter your first name"
            placeholderTextColor="#94a3b8"
            className="rounded-xl border border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 font-nunito text-base text-white"
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View className="gap-4">
          <Text className="font-nunito-semibold text-base text-slate-400 dark:text-slate-200">
            Last Name
          </Text>
          <TextInput
            placeholder="Enter your last name"
            placeholderTextColor="#94a3b8"
            className="rounded-xl border border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 font-nunito text-base text-white"
            onChangeText={(text) => setLastName(text)}
          />
        </View>




        <View className="gap-4">
          <Text className="font-nunito-semibold text-base text-slate-400 dark:text-slate-200">
            Nationality
          </Text>
          <TextInput
            placeholder="Enter your nationality"
            placeholderTextColor="#94a3b8"
            className="rounded-xl border border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 font-nunito text-base text-white"
            onChangeText={(text) => setInputNationality(text)}
          />
        </View>

        <Pressable
          onPress={handleCreateProfile}
          className="rounded-xl bg-emerald-500 px-4 py-4 flex-row items-center justify-center"
          disabled={loading}
        >
            {loading && (
                            <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
                        )}
          <Text className="font-nunito-bold text-base text-emerald-950">
            Create Profile
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateProfile;
