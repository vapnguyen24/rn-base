import {  ReactElement } from "react";
import { FlexAlignType, TextProps, ViewProps } from "react-native";

export interface ListTileProps {
    leading?: ReactElement;
    trailing?: ReactElement
    label?: string;
    labelProps?: TextProps
    content?: string;
    contentProps?: TextProps
    containerProps?: ViewProps
    containerAlignItems?: FlexAlignType
    label18n?: I18nKeys
    content18n?: I18nKeys
}