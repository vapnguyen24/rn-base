import React from 'react';
import { useForceUpdate } from '@shared/hooks/useForceUpdate';
import { ForceUpdateModal } from './index';

/**
 * TODO: Replace with a real API call or remote config fetch.
 * Example: const { data } = useQuery({ queryKey: ['app-config'], queryFn: fetchAppConfig });
 * Then pass data?.minimumVersion to useForceUpdate.
 */
const MINIMUM_VERSION: string | undefined = undefined;

export function ForceUpdateGate() {
  const isUpdateRequired = useForceUpdate(MINIMUM_VERSION);
  return <ForceUpdateModal isOpen={isUpdateRequired} />;
}
