import { TextProps } from 'react-native';

export type ParsedText = { children: string; _matched?: boolean };

export type ParsedTexts = ParsedText[];

export type CustomTextProps = ReOmit<TextProps, 'onPress' | 'onLongPress'>;

export type MatchedPart = TextProps & {
  _matched: boolean;
};

export type Pattern = {
  pattern?: RegExp;
  lastIndex?: number;
  renderText?: (text: string) => string;
};

export type Parse = {
  pattern?: RegExp;
} & CustomTextProps & {
    onPress?: (text: string, index: number) => void;
    renderText?: (text: string) => string;
  };

export interface ParsedTextProps extends TextProps {
  parse: Parse[];
}
