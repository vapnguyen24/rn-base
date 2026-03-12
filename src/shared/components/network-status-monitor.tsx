import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Toast, ToastComponentProps, useToast } from 'heroui-native/toast';
import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff } from 'lucide-react-native';

const TOAST_DURATION = 3000;

function OfflineToast(props: ToastComponentProps) {
  const { t } = useTranslation();
  return (
    <Toast
      placement="bottom"
      {...props}
      className="self-center rounded-full border-0 bg-zinc-900 px-4 py-3 shadow-none"
    >
      <View className="flex-row items-center gap-2">
        <WifiOff size={15} color="#f87171" />
        <Toast.Title className="text-sm font-medium text-white">
          {t('network.offline')}
        </Toast.Title>
      </View>
    </Toast>
  );
}

function OnlineToast(props: ToastComponentProps) {
  const { t } = useTranslation();
  return (
    <Toast
      placement="bottom"
      {...props}
      className="self-center rounded-full border-0 bg-zinc-900 px-4 py-3 shadow-none"
    >
      <View className="flex-row items-center gap-2">
        <Wifi size={15} color="#4ade80" />
        <Toast.Title className="text-sm font-medium text-white">
          {t('network.backOnline')}
        </Toast.Title>
      </View>
    </Toast>
  );
}

export function NetworkStatusMonitor() {
  const { toast } = useToast();
  const offlineToastId = useRef<string | null>(null);
  const offlineToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevConnected = useRef<boolean | null>(null);

  function clearOfflineToast() {
    if (offlineToastTimer.current) {
      clearTimeout(offlineToastTimer.current);
      offlineToastTimer.current = null;
    }
    if (offlineToastId.current) {
      toast.hide(offlineToastId.current);
      offlineToastId.current = null;
    }
  }

  function showOfflineToast() {
    clearOfflineToast();
    offlineToastId.current = toast.show({
      duration: TOAST_DURATION,
      component: OfflineToast,
    });
    // Clear ref after toast auto-hides
    offlineToastTimer.current = setTimeout(() => {
      offlineToastId.current = null;
      offlineToastTimer.current = null;
    }, TOAST_DURATION);
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected === true;

      // First event: record initial state, show offline toast only if already offline
      if (prevConnected.current === null) {
        prevConnected.current = connected;
        if (!connected) showOfflineToast();
        return;
      }

      // Ignore duplicate events with no actual state change
      if (connected === prevConnected.current) return;
      prevConnected.current = connected;

      if (!connected) {
        showOfflineToast();
      } else {
        clearOfflineToast();
        toast.show({
          duration: TOAST_DURATION,
          component: OnlineToast,
        });
      }
    });

    return () => {
      unsubscribe();
      clearOfflineToast();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
