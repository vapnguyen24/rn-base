import { ReactElement } from "react";
import { FlexAlignType, StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { SectionProps } from "~/src/library/components/section";

export interface InputProps extends TextInputProps {
    containerAlignItems?: FlexAlignType
    containerStyle?: StyleProp<ViewStyle>
    inputStyle?: StyleProp<TextStyle>
    leading?: ReactElement,
    trailing?: ReactElement,
    sectionProps?: SectionProps
}