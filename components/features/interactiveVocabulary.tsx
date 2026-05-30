import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface InteractiveVocabularyProps {
  item: {
    page: number;
    content: {
      instruction: string;
    };
    activity?: {
      activityType: string;
      questions: { word: string; answer: string }[];
    };
  };
  handlePageChange: (page: number) => void;
}

const InteractiveVocabulary = ({
  item,
  handlePageChange,
}: InteractiveVocabularyProps) => {
  const [answers, setAnswers] = React.useState<string[]>(
    Array(item.activity?.questions.length || 0).fill(""),
  );
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = React.useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const shuffledAnswers = React.useMemo(() => {
    if (item.activity?.activityType === "matching") {
      const answers = item.activity.questions.map((q) => q.answer);
      return shuffleArray(answers);
    }
  }, [item]);

  const handleMatchingAnswer = (answer: string) => {
    if (answers.includes(answer)) {
      setAnswers((prev) => prev.map((ans) => (ans === answer ? "" : ans)));
      return;
    }

    const emptyIndex = answers.findIndex((ans) => ans === "");

    if (emptyIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[emptyIndex] = answer;
      setAnswers(newAnswers);
    }
  };

  const handleMatchingCheck = () => {
    if (answers.some((ans) => ans === "")) {
      return;
    }

    const correctAnswers = item.activity?.questions.map((q) => q.answer) || [];

    const isCorrect =
      answers.length === correctAnswers.length &&
      answers.every((ans, index) => ans === correctAnswers[index]);

    setIsAnswerCorrect(isCorrect);
    setShowResultModal(true);
  };

  const handlePageSwitch = () => {
    setShowResultModal(false);
    handlePageChange(item.page + 1);
  };
  return (
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
                      className="flex-row items-center gap-2 mb-4"
                    >
                      <Text className="text-slate-600 dark:text-slate-400 font-nunito-bold text-lg">
                        {question.word.charAt(0).toUpperCase() +
                          question.word.slice(1) +
                          ":"}
                      </Text>
                      <View className="border-b border-slate-300 flex-1">
                        <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg ml-2">
                          {answers[index]}
                        </Text>
                      </View>
                    </View>
                  ),
                )}
              </View>
              <View className="flex-row flex-wrap items-center gap-4 mt-8">
                {shuffledAnswers?.map((answer: string, index: number) => (
                  <Pressable
                    key={index}
                    className="bg-slate-50 p-3 rounded-lg mt-4 active:opacity-60"
                    style={{ elevation: 1 }}
                    onPress={() => handleMatchingAnswer(answer)}
                  >
                    <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
                      {answer}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
      <Pressable
        className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
        onPress={handleMatchingCheck}
      >
        <Text className="text-white text-center font-nunito-bold text-lg">
          Check
        </Text>
      </Pressable>
      <Modal visible={showResultModal} transparent animationType="slide">
        <View className="flex-1 justify-end">
          <View className="bg-white dark:bg-slate-800 p-6 rounded-lg">
            <Text className="text-slate-600 dark:text-slate-400 font-nunito-bold text-xl mb-4">
              {isAnswerCorrect ? "Correct" : "Wrong"}
            </Text>

            <Pressable
              className="bg-primary w-full py-3 rounded-full mt-4 active:opacity-60"
              onPress={handlePageSwitch}
            >
              <Text className="text-white text-center font-nunito-bold text-lg">
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InteractiveVocabulary;
