import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Switch,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Settings,
  LogOut,
  Bell,
  Palette,
  Bookmark,
  BadgeCheck,
  Award,
  UserPen,
} from "lucide-react-native";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Toast from "react-native-toast-message";
import {validateToken} from "@/utils/auth";


const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export default  function Profile() {
  const signOut = useAuthStore((state) => state.signOut);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    nationality: "",
    level: "",
    email: "",
    id: "",
  });
  const [progressData, setProgressData] = useState({
    streak: 0,
    hours: 0,
    lessons: 0,
    accuracy: 0,
    vocab: 0,
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const openEditModal = () => {
    setEditName(userData.name);
    setEditPassword("");
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await validateToken();

        if (!baseUrl) {
          setIsLoading(false);
          return;
        }

        // Fetch User Profile
        const profileResponse = await axios.get(`${baseUrl}/fetch-profile`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (profileResponse.data?.user) {
          setUserData(profileResponse.data.user);
        }

        // Fetch Progress Data
        const progressResponse = await axios.get(`${baseUrl}/progress`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (progressResponse.data?.progress) {
          setProgressData(progressResponse.data.progress);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to load profile",
          text2: "We couldn't retrieve your data right now.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogOut = async () => {
    await SecureStore.deleteItemAsync("token");
    signOut();
    router.replace("/login");
  };

  const updateProfile = async () => {
    try {
      setIsUpdatingProfile(true);
      const token = await validateToken();


      const response = await axios.put(`${baseUrl}/profile`, {
        name: editName,
        password:  editPassword ,
      },{
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data?.success) {
        Toast.show({
          type: "success",
          text1: "Profile updated",
          text2: "Successfully updated profile",
        });
        setUserData((prev) => ({ ...prev, name: editName }));
        setIsEditModalVisible(false);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: "There was an issue updating your profile.",
      });
      console.log("Profile update error:", error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950 justify-center items-center">
        <ActivityIndicator size="large" color="#5E5CE6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6 pb-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <Text className="text-xl">🔥</Text>
              <Text className="font-nunito-bold text-slate-800 dark:text-white">
                {progressData.streak}
              </Text>
            </View>
            <Pressable>
              <Settings color="#64748b" size={24} />
            </Pressable>
          </View>

          {/* Profile Info */}
          <View className="items-center mb-8">
            <View className="relative mb-4">
              <Image
                source={{
                  uri: "https://ui-avatars.com/api/?name=test&background=5E5CE6&color=fff&size=128",
                }}
                className="w-28 h-28 rounded-full border-4 border-primary/20 dark:border-primary/10"
              />
              <View className="absolute bottom-0 right-0 bg-white dark:bg-slate-950 rounded-full p-0.5">
                <BadgeCheck color="#ffffff" fill="#10b981" size={28} />
              </View>
            </View>
            <Text className="font-nunito-bold text-3xl text-slate-900 dark:text-white mb-1">
              {userData.name}
            </Text>
            <Text className="font-nunito text-base text-slate-500 dark:text-slate-400">
              {userData.nationality} Explorer • Level {userData.level}
            </Text>
          </View>

          {/* Stats Grid */}
          <View className="flex-row justify-between mb-4 gap-4">
            <View className="flex-1 bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 items-center justify-center">
              <Text className="font-nunito-bold text-4xl text-primary mb-1">
                {progressData.streak}
              </Text>
              <Text className="font-nunito-semibold text-xs tracking-wider text-slate-500 uppercase text-center bg-transparent">
                Day Streak
              </Text>
            </View>
            <View className="flex-1 bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 items-center justify-center">
              <Text className="font-nunito-bold text-4xl text-emerald-600 mb-1">
                {progressData.accuracy}%
              </Text>
              <Text className="font-nunito-semibold text-xs tracking-wider text-slate-500 uppercase text-center">
                Accuracy
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-4 gap-4">
            <View className="flex-1 bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 items-center justify-center">
              <Text className="font-nunito-bold text-4xl text-primary mb-1">
                {progressData.hours}
              </Text>
              <Text className="font-nunito-semibold text-xs tracking-wider text-slate-500 uppercase text-center bg-transparent">
                Hours
              </Text>
            </View>
            <View className="flex-1 bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 items-center justify-center">
              <Text className="font-nunito-bold text-4xl text-primary mb-1">
                {progressData.lessons}
              </Text>
              <Text className="font-nunito-semibold text-xs tracking-wider text-slate-500 uppercase text-center">
                Lessons
              </Text>
            </View>
          </View>
          
          <View className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 items-center justify-center mb-8">
            <Text className="font-nunito-bold text-4xl text-amber-500 mb-1">
              {progressData.vocab.toLocaleString()}
            </Text>
            <Text className="font-nunito-semibold text-xs tracking-wider text-slate-500 uppercase">
              Vocab XP Points
            </Text>
          </View>


          {/* Settings / Menu */}
          <View className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 py-2">
            <Pressable 
              onPress={openEditModal}
              className="flex-row justify-between items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800"
            >
              <View className="flex-row items-center gap-4">
                <UserPen color="#475569" size={24} />
                <Text className="font-nunito-semibold text-lg text-slate-900 dark:text-white">
                  Update Profile
                </Text>
              </View>
              <Text className="font-nunito text-primary">Edit</Text>
            </Pressable>

            <View className="flex-row justify-between items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <View className="flex-row items-center gap-4">
                <Bell color="#475569" size={24} />
                <Text className="font-nunito-semibold text-lg text-slate-900 dark:text-white">
                  Notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#cbd5e1", true: "#34d399" }}
                thumbColor={"#ffffff"}
              />
            </View>

            <Pressable className="flex-row justify-between items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <View className="flex-row items-center gap-4">
                <Palette color="#475569" size={24} />
                <Text className="font-nunito-semibold text-lg text-slate-900 dark:text-white">
                  Theme
                </Text>
              </View>
              <Text className="font-nunito text-primary">
                System Default
              </Text>
            </Pressable>

            <Pressable
              onPress={handleLogOut}
              className="flex-row items-center gap-4 px-5 py-4 active:opacity-50"
            >
              <LogOut color="#ef4444" size={24} />
              <Text className="font-nunito-semibold text-lg text-red-500">
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Update Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl">
            <Text className="font-nunito-bold text-2xl text-slate-900 dark:text-white mb-6">
              Update Profile
            </Text>
            
            <View className="mb-4">
              <Text className="font-nunito-semibold text-sm text-slate-500 mb-2">
                Name
              </Text>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                autoCapitalize="words"
                className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-nunito text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950"
                placeholder="Enter your name"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View className="mb-6">
              <Text className="font-nunito-semibold text-sm text-slate-500 mb-2">
                New Password
              </Text>
              <TextInput
                value={editPassword}
                onChangeText={setEditPassword}
                secureTextEntry
                className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-nunito text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950"
                placeholder="Enter new password (optional)"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View className="flex-row justify-end gap-3">
              <Pressable
                onPress={() => setIsEditModalVisible(false)}
                className="py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800"
                disabled={isUpdatingProfile}
              >
                <Text className="font-nunito-semibold text-slate-700 dark:text-slate-300">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className={`py-3 px-6 rounded-xl bg-primary flex-row items-center justify-center ${
                  isUpdatingProfile ? "opacity-70" : ""
                }`}
                onPress={updateProfile}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile && (
                  <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
                )}
                <Text className="font-nunito-bold text-white">
                  Save Changes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
