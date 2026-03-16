import React, { JSX, ReactNode, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { extractDigits, formatDateString } from '@shared/utils/date.utils';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DateSegmentInputProps {
  /** Current value in "MM/DD/YYYY" format (or partial) */
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  isDisabled?: boolean;
  /** Not editable but without the disabled opacity style */
  isReadOnly?: boolean;
  /** Icon rendered inside the input on the trailing (right) side */
  trailingIcon?: ReactNode | JSX.Element | (() => ReactNode | JSX.Element);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DateSegmentInput({
  value,
  onChange,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  trailingIcon,
}: DateSegmentInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderClass = isInvalid
    ? 'border-danger'
    : isFocused
    ? 'border-accent'
    : 'border-field';

  const handleChange = (text: string) => {
    const digits = extractDigits(text).slice(0, 8);
    onChange(formatDateString(digits));
  };

  return (
    <View
      className={`flex-row items-center py-3.5 px-3 rounded-2xl border-2 bg-field ios:shadow-field android:shadow-sm ${borderClass} ${isDisabled ? 'opacity-disabled' : ''}`}
      style={styles.borderCurve}
    >
      <TextInput
        value={value}
        onChangeText={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="MM/DD/YYYY"
        placeholderTextColorClassName="accent-field-placeholder"
        keyboardType="number-pad"
        maxLength={10}
        editable={!isDisabled && !isReadOnly}
        className="text-foreground font-normal text-base flex-1"
      />
      {typeof trailingIcon === 'function' ? trailingIcon() : trailingIcon ?? null}
    </View>
  );
}

const styles = StyleSheet.create({
  borderCurve: { borderCurve: 'continuous' } as object,
});
