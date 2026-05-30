import { Check, X } from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

interface InteractiveSentenceProps {
  item: {
    page: number;
    type: string;
    interactive: boolean;
    content: {
      instruction: string;
    };
    activity?: {
      activityType: string;
      question?: string;
      options?: string[];
      correctAnswer?: string;
      words?: string[];
    };
  };
  handlePageChange: (newPage: number) => void;
}

const InteractiveSentence = ({
  item,
  handlePageChange,
}: InteractiveSentenceProps) => {
  return (
    <View className="flex-1 items-center gap-4 px-4 py-2">
      <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
        {item.content.instruction}
      </Text>
      {item.activity && (
        <View className="w-full">
          {item.activity.activityType === "fill_blank" && (
            <FillBlankActivity activity={item.activity} />
          )}
          {item.activity.activityType === "word_order" && (
            <WordOrderActivity activity={item.activity} />
          )}
        </View>
      )}
      <Pressable
        className="bg-primary w-full py-4 px-8 rounded-full mt-auto mb-4 active:opacity-60"
        onPress={() => handlePageChange(item.page + 1)}
      >
        <Text className="text-white text-center font-nunito-bold text-lg">
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

export default InteractiveSentence;

const FillBlankActivity = ({ activity }: { activity: any }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = React.useState<boolean | null>(
    false,
  );
  const [answerChecked, setAnswerChecked] = React.useState<boolean>(false);
  const [disableAnswerButtons, setDisableAnswerButtons] =
    React.useState<boolean>(false);

  const getOptionStyle = (option: string) => {
    if (!answerChecked) return "bg-slate-50";

    if (option === activity.correctAnswer) {
      return "bg-green-200 border border-green-500";
    }

    if (option === selectedOption) {
      return "bg-red-200 border border-red-500";
    }

    return "bg-slate-50";
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === activity.correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    setDisableAnswerButtons(true);
    setAnswerChecked(true);
  };
  return (
    <View className="w-full py-8">
      <View>
        <Text className="text-slate-600 dark:text-slate-400 font-nunito text-xl mb-2">
          {activity.question}
        </Text>
      </View>
      <View>
        {activity?.options!.map((option: string, index: number) => (
          <Pressable
            key={index}
            className={`flex-row items-center justify-between ${getOptionStyle(option)} p-4 rounded-lg mt-4 active:opacity-60`}
            style={{ elevation: 1 }}
            onPress={() => handleOptionSelect(option)}
            disabled={disableAnswerButtons}
          >
            <Text className="text-slate-600 dark:text-slate-400 font-nunito text-lg">
              {option}
            </Text>
            {option === activity.correctAnswer && answerChecked && (
              <Check size={24} color="#22c55e" />
            )}
            {option === selectedOption && !isAnswerCorrect && (
              <X size={24} color="#ef4444" />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const WordOrderActivity = ({ activity }: { activity: any }) => {
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [availableWords, setAvailableWords] = React.useState<string[]>([]);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  const canCheck = selectedWords.length === activity.correctSentence.length;

  const handleWordSelect = (word: string) => {
    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((w) => w !== word));
  };
  const handleWordRemove = (index: number) => {
    const word = selectedWords[index];
    if (!word) return;
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
  };

  useEffect(() => {
    const shuffled = [...activity.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
  }, [activity]);
  return (
    <View className="w-full py-8">
      <View className="flex-row flex-wrap gap-2">
        {activity.words.map((_: string, index: number) => (
          <Pressable
            key={index}
            onPress={() => handleWordRemove(index)}
            className="min-w-[60px] border-b border-slate-500 items-center"
          >
            <Text className="text-slate-600 text-xl mb-2">
              {selectedWords[index] || ""}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="gap-2 mt-8">
        {availableWords.map((word, index) => (
          <Pressable
            key={`${word}-${index}`}
            onPress={() => handleWordSelect(word)}
            className="bg-slate-50 p-4 rounded-lg active:opacity-60"
            style={{ elevation: 1 }}
          >
            <Text className="text-slate-600 font-nunito text-lg">{word}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
