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
    // if (pageListRef.current) {
    //   pageListRef.current.scrollToOffset({
    //     offset: (newPage - 1) * width,
    //     animated: true,
    //   });
    // }
    console.log("Page changed to:", newPage);
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
                <View
                  className="w-full bg-slate-50 p-4 rounded-lg"
                  style={{ elevation: 1 }}
                >
                  <View className="flex-row items-center gap-4 mb-4">
                    <Pressable
                      className="bg-primary p-2 rounded-lg active:opacity-60"
                      onPress={() => {}}
                    >
                      <Volume2 size={24} color="#f8fafc" strokeWidth={2} />
                    </Pressable>
                    <Text className="text-3xl font-nunito-bold text-slate-800 dark:text-slate-200 lowercase first-letter:capitalize">
                      {item.content.word}
                    </Text>
                  </View>
                  <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-4">
                    {item.content.meaning}
                  </Text>
                  <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg italic">
                    {item.content.example}
                  </Text>
                </View>
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
              <View className="flex-1 items-center gap-4 px-4 py-2">
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
                  {item.content.instruction}
                </Text>
                {item.activity && (
                  <View className="w-full">
                    {item.activity.activityType === "matching" && (
                      <View className="w-full py-8">
                        <View>
                          {item.activity.questions.map(
                            (
                              question: { word: string; answer: string },
                              index: number,
                            ) => (
                              <View
                                key={index}
                                className="mb-2 flex-row items-center gap-2"
                              >
                                <Text className="text-slate-600 dark:text-slate-400 font-nunito-bold text-xl mb-2">
                                  {question.word.charAt(0).toUpperCase() +
                                    question.word.slice(1)}
                                </Text>
                                <Text>:</Text>
                                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-xl mb-2">
                                  {question.answer}
                                </Text>
                              </View>
                            ),
                          )}
                        </View>
                        <View className="flex-row flex-wrap items-center gap-4 mt-8">
                          {item.activity.questions.map(
                            (
                              question: { word: string; answer: string },
                              index: number,
                            ) => (
                              <Pressable
                                key={index}
                                className="bg-slate-50 p-4 rounded-lg mt-4 active:opacity-60"
                                style={{ elevation: 1 }}
                              >
                                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-2">
                                  {question.answer}
                                </Text>
                              </Pressable>
                            ),
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                )}
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Check
                  </Text>
                </Pressable>
              </View>
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
              <View className="flex-1 items-center gap-4 px-4 py-2">
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
                  {item.content.instruction}
                </Text>
                {item.activity && (
                  <View className="w-full">
                    {item.activity.activityType === "fill_blank" && (
                      <View className="w-full py-8">
                        <View>
                          <Text className="text-slate-600 dark:text-slate-400 font-nunito text-xl mb-2">
                            {item.activity.question}
                          </Text>
                        </View>
                        <View>
                          {item.activity.options.map(
                            (option: string, index: number) => (
                              <Pressable
                                key={index}
                                className="bg-slate-50 p-4 rounded-lg mt-4 active:opacity-60"
                                style={{ elevation: 1 }}
                              >
                                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-2">
                                  {option}
                                </Text>
                              </Pressable>
                            ),
                          )}
                        </View>
                      </View>
                    )}
                    {item.activity.activityType === "word_order" && (
                      <View className="w-full py-8">
                        <View className="flex-row gap-2">
                          {item.activity.words.map(
                            (word: string, index: number) => (
                              <View
                                key={index}
                                className="flex-1 border-b border-slate-300 dark:border-slate-700"
                              >
                                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-xl mb-2">
                                  {word}
                                </Text>
                              </View>
                            ),
                          )}
                        </View>
                        <View className="flex-row flex-wrap items-center gap-2 mt-8">
                          {item.activity.words.map(
                            (word: string, index: number) => (
                              <Pressable
                                key={index}
                                className="min-w-[60px] bg-slate-50 p-4 rounded-lg active:opacity-60"
                                style={{ elevation: 1 }}
                              >
                                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-2">
                                  {word}
                                </Text>
                              </Pressable>
                            ),
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                )}
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Check
                  </Text>
                </Pressable>
              </View>
            )}
            {(item.type === "conversation" ||
              item.type === "interactive_conversation") && (
              <View>
                <Pressable
                  className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  <Text className="text-white text-center font-nunito-bold text-lg">
                    Check
                  </Text>
                </Pressable>
              </View>
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
                  <Text className="text-xl font-nunito-bold text-slate-800 dark:text-slate-200 mb-2">
                    {vocabulary}
                  </Text>
                ))}
                <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg mb-4 mt-8">
                  Key Sentences
                </Text>
                {item.content.keySentences.map((sentence: string) => (
                  <Text className="text-xl font-nunito-bold text-slate-800 dark:text-slate-200 mb-2">
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
        keyExtractor={(item) => item.page.toString()}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
      />
    </SafeAreaView>
  );
};

export default VocabularyPractice;
