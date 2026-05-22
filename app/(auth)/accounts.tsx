import { router } from "expo-router";
import {
  ChevronRight,
  CircleUser,
  EllipsisVertical,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Accounts: React.FC = () => {
  const accounts = [
    {
      id: "1",
      name: "Sapat Chaudhary",
      email: "sapat.chaudhary@example.com",
    },
    {
      id: "2",
      name: "Suraj Chaudhary",
      email: "suraj.chaudhary@example.com",
    },
  ];

  return (
    <SafeAreaView className="w-full h-full justify-center bg-slate-950 px-6 py-4">
      <View className="mb-4">
        <Pressable className="ml-auto p-2 rounded-full">
          <EllipsisVertical color="#ffffff" size={24} />
        </Pressable>
      </View>
      <View className="w-full gap-3">
        {accounts.map((account) => (
          <View
            key={account.id}
            className="w-full flex-row items-center gap-4 border border-slate-800 p-4 rounded-lg"
          >
            <CircleUser color="#94a3b8" size={32} />
            <Text className="text-white font-nunito">{account.name}</Text>
            <View className="ml-auto">
              <ChevronRight color="#94a3b8" size={24} />
            </View>
          </View>
        ))}
        <Pressable
          className="mt-auto bg-slate-800 p-4 rounded-lg items-center"
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text className="text-slate-400 font-medium">Add Account</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          console.log("Create Account Pressed");
        }}
        className="mt-auto bg-slate-800 p-4 rounded-lg items-center active:opacity-50"
      >
        <Text className="text-slate-400 font-medium">Create Account</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Accounts;
