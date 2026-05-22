import React from "react";
import { View } from "react-native";

interface SpacerProps {
  size?: number;
}

const Spacer = ({ size = 16 }: SpacerProps) => {
  return <View style={{ height: size }}></View>;
};

export default Spacer;
