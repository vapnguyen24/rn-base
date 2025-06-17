import { Stack, useLocalSearchParams } from 'expo-router';
import { PieChart } from '~/src/_tests/pie-chart';

import { Screen } from '~/src/library';

export default function Details() {
  const { name } = useLocalSearchParams(); 

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Screen>
      <PieChart />
      </Screen>
    </>
  );
}
