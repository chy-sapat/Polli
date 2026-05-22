import React from "react";
import { Pressable } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
}

const Button = ({ children, onPress, className }: ButtonProps) => {
  return (
    <Pressable className={`${className} active:opacity-50`} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default Button;
