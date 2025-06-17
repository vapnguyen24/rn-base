import { Stack } from 'expo-router';
import { useState } from 'react';
import { Linking, ScrollView } from 'react-native';
import {
  BounceInLeft,
  FadeOut,
  FadeOutLeft,
  FlipOutEasyX,
  FlipOutEasyY,
  RollOutLeft,
  RollOutRight,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AlertDialog,
  Box,
  Checkbox,
  Divider,
  Icon,
  Image,
  ListTile,
  LocalImage,
  Modal,
  OutlineButton,
  ParsedText,
  PrimaryButton,
  RadioButton,
  Section,
  Sheet,
  showSnack,
  Skeleton,
  Spacer,
  Tabs,
  Text,
  TextInput,
} from '~/src/library';
import { AutocompleteDropdown, AutocompleteDropdownItem } from '~/src/library/components/drop-down';
import { FontDefault } from '~/src/theme';
import { lightColors } from '~/src/theme/colors/light';

const IMAGE_URL =
  'https://plus.unsplash.com/premium_photo-1749544311043-3a6a0c8d54af?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function Core() {
  const { bottom } = useSafeAreaInsets();
  const [checkbox1, setCheckBox1] = useState(false);
  const [checkbox2, setCheckBox2] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [dropDown1, setDropDown1] = useState<AutocompleteDropdownItem | null>(null);
  const [sheet1, setSheet1] = useState(false);
  const [dialog1, setDialog1] = useState(false);
  const [dialog2, setDialog2] = useState(false);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  return (
    <>
      <Stack.Screen options={{ title: 'Core' }} />
      <ScrollView>
        <Box flex={1} padding={'m_16'} gap="ml_24">
          {/*Primary Button */}
          <Section label="Primary Button" labelVariant={'subtitle2'}>
            <PrimaryButton text="Click me" />
            <Spacer />
            <PrimaryButton text="Click me" rightIcon="done" leftIcon="chevron_left" />
            <Spacer />
            <PrimaryButton text="Click me" disabled />
          </Section>

          {/*Outline Button */}
          <Section label="Outline Button" labelVariant={'subtitle2'}>
            <OutlineButton text="Click me" />
            <Spacer />
            <OutlineButton text="Click me" rightIcon="done" leftIcon="chevron_left" />
            <Spacer />
            <OutlineButton text="Click me" disabled />
          </Section>

          {/*Text Input */}
          <Section label="TextInput" labelVariant={'subtitle2'}>
            <TextInput value={text1} onChangeText={setText1} placeholder="Tim kiem..." />
            <Spacer />
            <TextInput
              leading={<Icon icon="done" />}
              trailing={<Icon icon="chevron_right" />}
              value={text2}
              onChangeText={setText2}
              placeholder="Tim kiem..."
            />
            <Spacer />
            <TextInput
              secureTextEntry
              value={text3}
              onChangeText={setText3}
              placeholder="Tim kiem..."
            />
            <Spacer />
            <TextInput
              sectionProps={{
                label: 'Email',
                helper: 'Please enter valid email',
              }}
              trailing={<Icon icon="chevron_right" />}
              value={text3}
              onChangeText={setText3}
              placeholder="Tim kiem..."
            />
          </Section>

          {/*Parsed Text */}
          <Section label="Parsed Text" labelVariant={'subtitle2'}>
            <ParsedText
              parse={[
                {
                  pattern: /#(\w+)/g,
                  style: { color: 'blue', fontWeight: 'bold' },
                  onPress: (text, index) => {
                    console.log('Pressed hashtag:', text, 'at index', index);
                  },
                },
              ]}>
              {'This is a #ReactNative component using #ParsedText'}
            </ParsedText>

            <ParsedText
              parse={[
                {
                  pattern: /(https?:\/\/[^\s]+)/g,
                  style: { textDecorationLine: 'underline', color: 'green' },
                  onPress: (url) => {
                    Linking.openURL(url);
                  },
                },
              ]}>
              {'Visit https://openai.com or http://example.com for more info'}
            </ParsedText>
          </Section>

          {/*Checkbox */}
          <Section label="Checkbox" labelVariant={'subtitle2'}>
            <Box flexDirection="row" gap={'m_16'} alignItems={'flex-end'}>
              <Checkbox value={checkbox1} onToggle={() => setCheckBox1((prev) => !prev)} />

              <Checkbox disabled />
              <Checkbox
                value={checkbox2}
                onToggle={() => setCheckBox2((prev) => !prev)}
                size={32}
              />
            </Box>
          </Section>

          {/*Radio Button */}
          <Section label="Radio Button " labelVariant={'subtitle2'}>
            <Box flexDirection="row" gap={'m_16'} alignItems={'flex-end'}>
              <RadioButton value={checkbox1} onToggle={() => setCheckBox1((prev) => !prev)} />

              <RadioButton disabled />
              <RadioButton
                value={checkbox2}
                onToggle={() => setCheckBox2((prev) => !prev)}
                size={32}
              />
            </Box>
          </Section>

          {/*Divider */}
          <Section label="Divider" labelVariant={'subtitle2'}>
            <Divider />
            <Spacer />
            <Divider height={3} />
            <Spacer />
            <Divider height={16} />
            <Spacer />
            <Divider height={16} colors="info400" />
          </Section>

          {/*Icon */}
          <Section label="Icon" labelVariant={'subtitle2'}>
            <Box flexDirection="row" gap={'m_16'} alignItems={'flex-end'} flexWrap="wrap">
              <Icon icon="chevron_left" />
              <Icon icon="chevron_right" />
              <Icon icon="done" />
              <Icon icon="eye" />
              <Icon icon="eye_off" />
            </Box>
          </Section>

          {/*Network Image */}
          <Section label="Network Image" labelVariant={'subtitle2'}>
            <Image
              source={{ uri: IMAGE_URL }}
              style={{ height: 200, aspectRatio: 1, borderRadius: 12 }}
            />
          </Section>

          {/*Local Image */}
          <Section label="Local Image" labelVariant={'subtitle2'}>
            <LocalImage
              source={'bg_wallpaper'}
              style={{ height: 200, borderRadius: 12, aspectRatio: 2 / 4 }}
            />
          </Section>

          {/*Modal */}
          <Section label="Modal" labelVariant={'subtitle2'}>
            <Box flexDirection={'row'} gap={'m_16'}>
              <PrimaryButton text="Modal" onPress={() => setModal1(true)} />
              <OutlineButton text="Custom modal" onPress={() => setModal2(true)} />
            </Box>

            <Modal
              isVisible={modal1}
              onBackButtonPress={() => setModal1(false)}
              onBackdropPress={() => setModal1(false)}>
              <Box
                height={300}
                marginHorizontal="ml_24"
                borderRadius="xl_24"
                backgroundColor="info200"
                alignItems="center"
                justifyContent="center">
                <Text variant={'H5'}>Content Here</Text>
              </Box>
            </Modal>

            <Modal
              entering={BounceInLeft}
              exiting={RollOutLeft}
              isVisible={modal2}
              onBackButtonPress={() => setModal2(false)}
              onBackdropPress={() => setModal2(false)}>
              <Box
                height={300}
                marginHorizontal="ml_24"
                borderRadius="xl_24"
                backgroundColor="info200"
                alignItems="center"
                justifyContent="center">
                <Text variant={'H5'}>Content Here</Text>
              </Box>
            </Modal>
          </Section>

          {/* Snackbar */}
          <Section label="Snackbar" labelVariant={'subtitle2'}>
            <Box flexDirection={'row'} gap={'m_16'}>
              <PrimaryButton
                text="Error"
                onPress={() =>
                  showSnack({
                    msg: 'Hello World',
                    type: 'error',
                    options: {
                      textColor: 'white',
                    },
                  })
                }
              />
              <OutlineButton
                text="Link"
                onPress={() =>
                  showSnack({
                    msg: 'Hello World',
                    type: 'link',
                  })
                }
              />

              <PrimaryButton
                text="Success"
                onPress={() =>
                  showSnack({
                    msg: 'Hello World',
                    type: 'success',
                  })
                }
              />
              <OutlineButton
                text="Warn"
                onPress={() =>
                  showSnack({
                    msg: 'Hello World',
                    type: 'warn',
                  })
                }
              />
            </Box>
          </Section>

          {/* Sheet */}
          <Section label="Sheet" labelVariant={'subtitle2'}>
            <PrimaryButton text="Open Sheet" onPress={() => setSheet1(true)} />
            <Sheet isVisible={sheet1} onBackdropPress={() => setSheet1(false)}>
              <Box height={300} alignItems="center" justifyContent="center">
                <Text variant="H3">Content here</Text>
              </Box>
            </Sheet>
          </Section>

          {/* Dialog */}
          <Section label="Dialog" labelVariant={'subtitle2'}>
            <Box flexDirection="row" gap="m_16">
              <PrimaryButton text="Open Dialog" onPress={() => setDialog1(true)} />
              <OutlineButton text="Custom Dialog" onPress={() => setDialog2(true)} />
            </Box>

            <AlertDialog
              exiting={FadeOut.duration(200)}
              setVisible={setDialog1}
              isVisible={dialog1}
              label="Hello World"
              content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui labore a aperiam iusto eaque nostrum e"
            />
            <AlertDialog
              exiting={FlipOutEasyY}
              setVisible={setDialog2}
              isVisible={dialog2}
              label="Hello World"
              content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui labore a aperiam iusto eaque nostrum e"
              onCancelPress={() => setDialog2(false)}
              renderComponent={({
                label,
                content,
                confirmTextI18n,
                cancelTextI18n,
                onConfirmPress,
                onCancelPress,
              }) => (
                <Box
                  padding="sm_12"
                  borderRadius="l_12"
                  marginHorizontal="m_16"
                  backgroundColor="white">
                  <Text variant="subtitle2" textAlign="center">
                    {label}
                  </Text>
                  <Text variant="paragraph2" marginTop="m_16" textAlign="center">
                    {content}
                  </Text>
                  <Box gap="m_16" mt="l_32">
                    <PrimaryButton t18n={confirmTextI18n as I18nKeys} onPress={onConfirmPress} />
                    <OutlineButton t18n={cancelTextI18n as I18nKeys} onPress={onCancelPress} />
                  </Box>
                </Box>
              )}
            />
          </Section>

          {/* Tabs */}
          <Section label="Tabs" labelVariant={'subtitle2'}>
            <Tabs
              onChangeTab={(i) => {
                console.log(i);
              }}
              tabs={[
                { key: '1', title: 'tabs:tab1' },
                { key: '2', title: 'tabs:tab2' },
                { key: '3', title: 'tabs:tab3' },
                { key: '4', title: 'tabs:tab4' },
              ]}
            />
          </Section>

          {/* Dropdown */}
          <Section label="Dropdown" labelVariant={'subtitle2'}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              initialValue={{ id: '2' }} // or just '2'
              onSelectItem={setDropDown1}
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
              ]}
            />
            <Spacer />
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              inputContainerStyle={{
                backgroundColor: 'white',
                borderRadius: 16,
                paddingVertical: 12,
              }}
              containerStyle={{ backgroundColor: 'white', borderRadius: 16 }}
              suggestionsListContainerStyle={{
                borderRadius: 12,
                backgroundColor: lightColors.primary100,
              }}
              ClearIconComponent={<Icon icon="chevron_right" size={32} />}
              ChevronIconComponent={<Icon icon="done" size={32} />}
              initialValue={{ id: '2' }} // or just '2'
              onSelectItem={setDropDown1}
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
              ]}
            />
          </Section>

          {/* ListTile */}
          <Section label="ListTile" labelVariant={'subtitle2'}>
            <ListTile label="Hello World" leading={<Icon icon="done" />} />
            <Spacer />
            <ListTile label="Hello World" trailing={<Icon icon="done" />} />
            <Spacer />
            <ListTile
              label="Hello World"
              trailing={<Icon icon="chevron_right" />}
              leading={<Icon icon="done" />}
            />
            <Spacer />
            <ListTile
              labelProps={{
                style: {
                  fontWeight: '900',
                  fontFamily: FontDefault.primaryBold,
                },
              }}
              containerAlignItems="flex-start"
              label="Hello World"
              content={
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui labore a aperiam iusto eaque nostrum e'
              }
              trailing={<Icon icon="done" />}
              leading={
                <Image
                  source={{ uri: IMAGE_URL }}
                  style={{ width: 80, aspectRatio: 1, borderRadius: 8 }}
                />
              }
              containerProps={{
                style: {
                  backgroundColor: 'white',
                  padding: 12,
                  borderRadius: 12,
                },
              }}
            />
          </Section>

          {/* Skeleton */}
          <Section label="Skeleton" labelVariant={'subtitle2'}>
            <Skeleton count={2} color="neutral100" />
          </Section>
          <Spacer height={bottom} />
        </Box>
      </ScrollView>
    </>
  );
}
