import { Check, ChevronDown, ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AccordionProps {
  title: string;
  content: string;
  index?: number;
  currentLessonIndex?: number;
  children?: React.ReactNode;
}

const Accordion = (props: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const active = props.index! === props.currentLessonIndex!;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View
      className="bg-white rounded-3xl"
      style={{
        opacity: active || props.index! < props.currentLessonIndex! ? 1 : 0.6,
        elevation: 1,
      }}
    >
      <Pressable
        className={`${!active || props.index! < props.currentLessonIndex! ? "bg-slate-200" : "bg-primary"} rounded-3xl p-4 flex-row items-center justify-between active:opacity-90`}
        onPress={toggleAccordion}
      >
        {props.index! < props.currentLessonIndex! && (
          <Check size={20} color="#22c55e" strokeWidth={3} />
        )}
        <Text
          className={`${
            active ? "text-white" : ""
          } text-slate-600 dark:text-slate-300 font-nunito-bold text-lg mr-auto ml-2`}
        >
          {props.title}
        </Text>
        {isOpen ? (
          <ChevronDown size={20} color={active ? "#f8fafc" : "#94a3b8"} />
        ) : (
          <ChevronRight size={20} color={active ? "#f8fafc" : "#94a3b8"} />
        )}
      </Pressable>
      {isOpen && (
        <View
          className="rounded-3xl px-2 pb-4"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <Text className="text-slate-600 font-nunito-medium text-base dark:text-slate-300 p-4">
            {props.content}
          </Text>
          {props.children}
        </View>
      )}
    </View>
  );
};

export default Accordion;
