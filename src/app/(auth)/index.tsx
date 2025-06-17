import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import { SlideInDown } from 'react-native-reanimated';

import {
  Box,
  Checkbox,
  Modal,
  OutlineButton,
  PrimaryButton,
  Screen,
  showSnack,
  Tabs,
} from '~/src/library';
import { AutocompleteDropdown, AutocompleteDropdownItem } from '~/src/library/components/drop-down';
import { Spacer } from '~/src/library/components/spacer';
import { useAppStore } from '~/src/zustand/stores/app';

export default function Home() {
  const [toogle, setToogle] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AutocompleteDropdownItem | null>(null);

  const handlePress = () => {
    showSnack({
      msg: 'HelloWorld',
      type: 'warn',
    });
  };

  const handleLogout = () => {
    useAppStore.getState().setLogin(false);
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Screen>
        <PrimaryButton
          text="Hello World"
          leftIcon="chevron_left"
          size="normal"
          onPress={handlePress}
        />
        <Spacer height={20} />

        <PrimaryButton text="Logout" leftIcon="chevron_left" size="normal" onPress={handleLogout} />
        <Spacer height={20} />
        <Checkbox value={toogle} onToggle={() => setToogle(!toogle)} />


        <AutocompleteDropdown
          clearOnFocus={false}
          containerStyle={{marginHorizontal: 16}}
          inputContainerStyle={{padding: 16,}}
          suggestionsListContainerStyle={{marginTop: 16, borderRadius: 20}}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={{ id: '2' }} // or just '2'
          onSelectItem={setSelectedItem}
          dataSet={[
            { id: '1', title: 'Alpha' },
            { id: '2', title: 'Beta' },
            { id: '3', title: 'Gamma' },
          ]}
        />
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <OutlineButton text="Hello World" leftIcon="chevron_left" />
        </Link>
        <Tabs
          tabs={[
            { key: '1', title: 'tabs:tab1' },
            { key: '2', title: 'tabs:tab2' },
            { key: '3', title: 'tabs:tab3' },
            { key: '4', title: 'tabs:tab4' },
          ]}
        />

        <Modal isVisible={toogle} entering={SlideInDown} onBackdropPress={() => setToogle(!toogle)}>
          <Box
            backgroundColor="background"
            borderRadius="l_12"
            marginHorizontal="ml_24"
            height={300}
            justifyContent="center"
          />
        </Modal>
      </Screen>
    </>
  );
}
