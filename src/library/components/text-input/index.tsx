import { Box } from '~/src/library/components/core/Box';
import { Section } from '~/src/library/components/section';
import { InputProps } from '~/src/library/components/text-input/type';
import { TextInput as RNTextInput } from 'react-native';
import { useState } from 'react';
import { Icon } from '~/src/library/components/icon';
import { DefaultButton } from '~/src/library/components/button/default-button';
import { FontDefault, makeStyles } from '~/src/theme';
import { Text } from '~/src/library/components/core/Text';
export const TextInput = ({
  containerAlignItems,
  containerStyle,
  leading,
  trailing,
  secureTextEntry,
  inputStyle,
  sectionProps,
  ...rest
}: InputProps) => {
  const styles = styleSheet();
  const [isShowPassword, setShowPassword] = useState(false);

  const tooglePassword = () => setShowPassword((prev) => !prev);

  const renderPasswordIcon = () => {
    if (isShowPassword)
      return (
        <DefaultButton onPress={tooglePassword}>
          <Icon icon="eye" />
        </DefaultButton>
      );

    return (
      <DefaultButton onPress={tooglePassword}>
        <Icon icon="eye_off" />
      </DefaultButton>
    );
  };

  const renderTrailingIcon = () => {
    if (secureTextEntry) return renderPasswordIcon();

    if (!!trailing) return trailing;

    return null;
  };

  return (
    <Section {...sectionProps}>
      <Box
        paddingHorizontal='sm_12'
        flexDirection="row"
        gap="sm_12"
        backgroundColor="white"
        borderWidth={1}
        borderColor="appInputBorder"
        borderRadius="ml_8"
        minHeight={48}
        alignItems={containerAlignItems ?? 'center'}
        style={containerStyle}>
        {!!leading && leading}
        <RNTextInput
          secureTextEntry={secureTextEntry}
          allowFontScaling={false}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          style={[styles.inputNew, inputStyle]}
          {...rest}
        />
        {renderTrailingIcon()}
      </Box>
    </Section>
  );
};

const styleSheet = makeStyles((theme) => {
  return {
    inputNew: {
      flex: 1,
      color: theme.colors.black,
      fontSize: 14,
      fontFamily: FontDefault.primary,
      height: '100%',
      textAlignVertical: 'top',
    },
  };
});
