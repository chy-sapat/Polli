import WritingSentence from "@/components/features/writingSentence";
import { router } from "expo-router";
import { ChevronLeft, Volume2 } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InteractiveSentence from "../../components/features/interactiveSentence";
import InteractiveVocabulary from "../../components/features/interactiveVocabulary";
import courses from "../../data/courses/english/beginner.json";
import { useLessonStore } from "../../lib/stores/lesson-store";

const VocabularyPractice = () => {
  const { width } = useWindowDimensions();
  const pageListRef = React.useRef<FlatList | null>(null);
  const { currentCourseId, currentLessonId } = useLessonStore();
  const lesson = courses.lessons.find((l) => l.id === currentLessonId);
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (pageListRef.current) {
      pageListRef.current.scrollToOffset({
        offset: (currentPage - 1) * width,
        animated: true,
      });
    }
  }, [currentPage]);

  return (
    <SafeAreaView
      className="flex-1 bg-slate-100 box-border"
      style={{ width: width }}
    >
      <View className="flex-row items-center gap-8 p-4">
        <Pressable
          className="p-1 rounded-full active:opacity-60 active:bg-slate-200"
          onPress={() =>
            currentPage > 1 ? handlePageChange(currentPage - 1) : router.back()
          }
        >
          <ChevronLeft size={32} color="#1e293b" />
        </Pressable>
        <View className="flex-1 h-4 bg-slate-300 dark:bg-slate-800 rounded-full">
          <View
            className="h-full bg-primary rounded-full"
            style={{
              width: `${(currentPage / (lesson?.contents?.length || 1)) * 100}%`,
            }}
          />
        </View>
        <View>
          <Text className="text-slate-600 dark:text-slate-400 font-nunito-bold px-1 text-lg">
            {`${currentPage}/${lesson?.contents?.length || 0}`}
          </Text>
        </View>
      </View>
      <FlatList
        ref={pageListRef}
        data={lesson?.contents}
        renderItem={({ item }) => (
          <View
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg"
            style={{
              width: width,
            }}
          >
            {currentPage > 1 && (
              <Text className="font-nunito text-base underline text-center text-slate-500 dark:text-slate-400 mt-4">
                {lesson?.title}
              </Text>
            )}
            {item.type === "intro" && (
              <View className="flex-1 items-center gap-4 p-4">
                <Text className="text-3xl font-nunito-extrabold text-slate-800 dark:text-slate-200 mb-2">
                  {item.content.title}
                </Text>
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
                  {item.content.description}
                </Text>
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Lets Get Started
                  </Text>
                </Pressable>
              </View>
            )}
            {item.type === "vocabulary" && !item.interactive && (
              <View className="flex-1 items-center gap-4 px-4 py-2">
                {item.content.vocab.map(
                  (
                    vocab: {
                      word: string;
                      meaning: string;
                      examples: string[];
                    },
                    index: number,
                  ) => (
                    <View
                      className="w-full bg-slate-50 p-4 rounded-lg"
                      style={{ elevation: 1 }}
                      key={index}
                    >
                      <View className="flex-row items-center gap-4 mb-4">
                        <Pressable
                          className="bg-primary p-2 rounded-lg active:opacity-60"
                          onPress={() => {}}
                        >
                          <Volume2 size={24} color="#f8fafc" strokeWidth={2} />
                        </Pressable>
                        <Text className="text-3xl font-nunito-bold text-slate-800 dark:text-slate-200 lowercase first-letter:capitalize">
                          {vocab.word}
                        </Text>
                      </View>
                      <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-4">
                        {vocab.meaning}
                      </Text>
                      {vocab.examples.map((example: string, index: number) => (
                        <Text
                          className="text-slate-600 dark:text-slate-400 font-nunito text-lg italic"
                          key={index}
                        >
                          {example}
                        </Text>
                      ))}
                    </View>
                  ),
                )}
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Got it !
                  </Text>
                </Pressable>
              </View>
            )}
            {item.type === "interactive_vocab" && item.interactive && (
              <InteractiveVocabulary
                item={item}
                handlePageChange={handlePageChange}
              />
            )}

            {item.type === "sentence" && (
              <View className="flex-1 items-center gap-4 px-4 py-2">
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-xl my-4">
                  {item.content.pattern}
                </Text>
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-xl mb-2">
                  {item.content.explanation}
                </Text>
                {item.content.examples.map((example: string, index: number) => (
                  <View
                    className="flex-row items-center gap-1 mb-2"
                    key={index}
                  >
                    <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
                      {example.split(" ").slice(0, 5).join(" ")}
                    </Text>
                    <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg underline">
                      {example.split(" ").slice(5).join(" ")}
                    </Text>
                  </View>
                ))}
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Got it !
                  </Text>
                </Pressable>
              </View>
            )}
            {item.type === "interactive_sentence" && item.interactive && (
              <InteractiveSentence
                item={item}
                handlePageChange={handlePageChange}
              />
            )}
            {item.type === "writing_practice" && (
              <WritingSentence
                item={item}
                handlePageChange={handlePageChange}
              />
            )}
            {item.type === "summary" && (
              <View className="flex-1 items-center gap-4 px-4 py-2">
                <Text className="text-3xl font-nunito-extrabold text-slate-800 dark:text-slate-200 mb-2">
                  Summary
                </Text>
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-4">
                  Key Vocabulary
                </Text>
                {item.content.keyVocabulary.map((vocabulary: string) => (
                  <Text className="text-xl text-center font-nunito-bold text-slate-800 dark:text-slate-200 mb-2">
                    {vocabulary}
                  </Text>
                ))}
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-4 mt-8">
                  Key Sentences
                </Text>
                {item.content.keySentences.map((sentence: string) => (
                  <Text className="text-xl text-center font-nunito-bold text-slate-800 dark:text-slate-200 mb-2">
                    {sentence}
                  </Text>
                ))}
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => router.back()}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Finish
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
      />
    </SafeAreaView>
  );
};

export default VocabularyPractice;
