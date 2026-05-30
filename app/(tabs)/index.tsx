import Accordion from "@/components/UI/accordion";
import Spacer from "@/components/UI/spacer";
import { icons } from "@/lib/constants/icons";
import { useLessonStore } from "@/lib/stores/lesson-store";
import { router } from "expo-router";
import { Check, ChevronRight, Play, X } from "lucide-react-native";
import React from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import courses from "../../data/courses/english/beginner.json";

const Index = () => {
  const { setCurrentCourse, setCurrentLesson } = useLessonStore();
  const [language, setLanguage] = React.useState("en");
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const languages = [
    { code: "en", name: "English", icon: icons.flag_en },
    { code: "fr", name: "French", icon: icons.flag_fr },
    { code: "de", name: "German", icon: icons.flag_germany },
    { code: "kr", name: "Korean", icon: icons.flag_korea },
  ];
  const course = courses;
  const lessons = course.lessons;
  const currentLessonIndex = 1;

  const toggleShowLanguageModal = () => {
    setShowLanguageModal((prev) => !prev);
  };

  const handleStartLearning = (lessonId: string) => {
    setCurrentLesson(lessonId);
    setCurrentCourse(course.id);
    console.log("Navigating to lesson:", lessonId);
    router.push(`/vocab/${lessonId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 pt-4">
      <Modal visible={showLanguageModal} animationType="slide" transparent>
        <View className="flex-1 justify-end">
          <View className="bg-white dark:bg-slate-800 rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-nunito-bold text-slate-600 dark:text-slate-300">
                Select Language
              </Text>
              <Pressable className="p-1" onPress={toggleShowLanguageModal}>
                <X size={24} color="#94a3b8" />
              </Pressable>
            </View>
            {languages.map((lang) => (
              <Pressable
                key={lang.code}
                className="flex-row items-center gap-4 p-2 active:opacity-60"
                disabled={lang.code === language}
              >
                <Image
                  source={lang.icon}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <Text className="text-slate-600 dark:text-slate-300 text-lg font-nunito-bold mr-auto">
                  {lang.name}
                </Text>
                {lang.code === language && (
                  <Check size={24} color="#5E5CE6" className="ml-auto" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
      <View className="flex-row items-center px-4 pb-1">
        <Pressable
          className="flex-row items-center gap-4 border border-primary/60 px-4 py-1 rounded-full active:opacity-60"
          onPress={toggleShowLanguageModal}
        >
          <Image
            source={icons.flag_en}
            className="w-10 h-10 rounded-full object-cover"
          />
          <ChevronRight size={20} color="#94a3b8" />
        </Pressable>
        {/* <Pressable className="ml-auto p-2 rounded-full active:opacity-60">
          <Bell size={30} color="#94a3b8" />
        </Pressable> */}
      </View>
      <ScrollView
        className="flex-1 px-4 pt-2 rounded-t-3xl"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Spacer size={8} />
        <View className="p-8 bg-primary rounded-3xl">
          <Text className="text-white text-lg font-nunito-bold px-2 py-1 bg-slate-50/20 rounded-xl self-start">
            Getting Started
          </Text>
          <Spacer />
          <View className=" rounded-lg">
            <Text className="text-white text-3xl font-nunito-extrabold">
              {lessons[currentLessonIndex]?.title}
            </Text>
            <Text className="text-white text-lg font-nunito-regular mt-2">
              {lessons[currentLessonIndex]?.description}
            </Text>
          </View>
          <Spacer />
          <Pressable
            className="mt-4 bg-slate-50 rounded-full px-4 py-3 flex-row items-center justify-center gap-2 active:opacity-60"
            style={{
              shadowOffset: {
                width: 2,
                height: 8,
              },
              shadowOpacity: 0.8,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => {}}
          >
            <Text className="text-primary text-lg font-nunito-bold">
              Start Learning
            </Text>
            <Play size={20} color="#5E5CE6" className="ml-2" />
          </Pressable>
        </View>
        <Spacer size={32} />
        <View className="rounded-full">
          <Text className="text-2xl text-center font-nunito-extrabold text-slate-500 dark:text-slate-300">
            {course.title}
          </Text>
          <Spacer />
          <Text className="text-slate-500 dark:text-slate-300 font-nunito-medium text-lg">
            Progress
          </Text>
          <View className="w-full h-3 bg-slate-200 rounded-full mt-2">
            <View
              className="h-full bg-primary rounded-full"
              style={{
                width: `${(currentLessonIndex / (lessons.length - 1)) * 100}%`,
              }}
            />
          </View>
        </View>
        <Spacer />

        {lessons.map((lesson, index) => (
          <View key={lesson.id}>
            <Accordion
              title={lesson.title}
              content={lesson.description}
              index={index}
              currentLessonIndex={currentLessonIndex}
            >
              <Spacer size={12} />
              {index <= currentLessonIndex ? (
                <Pressable
                  className="bg-primary rounded-full p-4"
                  style={{
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 0.84,
                    elevation: 1,
                  }}
                  onPress={() => {
                    handleStartLearning(lesson.id);
                  }}
                >
                  <Text className="text-white text-center font-nunito-bold">
                    {`${index === currentLessonIndex ? "Start Learning" : "Learn Again"}`}
                  </Text>
                </Pressable>
              ) : (
                <Text className="text-slate-500 dark:text-slate-400 text-center font-nunito-bold">
                  Complete previous lessons to unlock
                </Text>
              )}
            </Accordion>
            <Spacer />
          </View>
        ))}

        <Spacer size={32} />
        <Pressable className="flex-row items-center justify-between active:opacity-60">
          <Text className="text-lg font-nunito-bold text-slate-600 dark:text-slate-300">
            View All Lessons
          </Text>
          <ChevronRight size={20} color="#94a3b8" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
