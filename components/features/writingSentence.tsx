import React from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

const WritingSentence = ({
  item,
  handlePageChange,
}: {
  item: any;
  handlePageChange: (page: number) => void;
}) => {
  const [answer, setAnswer] = React.useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = React.useState<boolean | null>(
    null,
  );
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleSubmit = () => {
    // For simplicity, we just check if the answer is similar to any of the sample answers
    const correct = true; // Reset correctness state
    setIsAnswerCorrect(correct);
    // You can also add logic to show feedback or explanations based on correctness

    setShowModal(true);
  };
  const handleContinue = () => {
    setShowModal(false);
    handlePageChange(item.page + 1);
  };
  return (
    <View className="flex-1 items-center gap-4 px-4 py-2">
      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 justify-end">
          <View className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <Text className="text-2xl font-nunito-bold mb-4">
              {isAnswerCorrect ? "Correct Answer" : "Wrong Answer!"}
            </Text>
            <Text className="text-slate-600 dark:text-slate-400 font-nunito text-base mb-6">
              {isAnswerCorrect
                ? "Great job! Your answer is correct."
                : "Don't worry! Try to review the material and give it another shot."}
            </Text>
            <Text className="text-slate-600 dark:text-slate-400 font-nunito text-base mb-6">
              {`Your answer: ${answer}`}
            </Text>
            <Text className="text-slate-600 dark:text-slate-400 font-nunito text-base mb-4">
              Other possible answers
            </Text>
            {item.activity.sampleAnswers.map((ans: string, index: number) => (
              <Text
                key={index}
                className="text-slate-600 dark:text-slate-400 font-nunito text-base mb-2"
              >
                {index + 1}. {ans}
              </Text>
            ))}
            <Pressable
              className="bg-primary py-2 px-4 rounded-full active:opacity-60 mt-6"
              onPress={handleContinue}
            >
              <Text className="text-white text-center font-nunito-bold">
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text className="text-slate-600 dark:text-slate-400  font-nunito text-lg text-center">
        {item.content.instruction}
      </Text>
      <TextInput
        className="w-full border-b border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200"
        value={answer}
        onChangeText={setAnswer}
      />
      <Pressable
        className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-nunito-bold text-lg">
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

export default WritingSentence;
