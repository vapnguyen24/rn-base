import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { Dialog, Button } from 'heroui-native';
import { useTranslation } from 'react-i18next';
import { STORE_URLS } from '@core/config/constants';

type Props = {
  isOpen: boolean;
  /** Override store URL. Defaults to STORE_URLS from constants. */
  storeUrl?: string;
};

export function ForceUpdateModal({ isOpen, storeUrl }: Props) {
  const { t } = useTranslation();
  const url = storeUrl ?? (Platform.OS === 'ios' ? STORE_URLS.IOS : STORE_URLS.ANDROID);

  const handleUpdate = () => {
    Linking.openURL(url);
  };

  return (
    <Dialog isOpen={isOpen} onOpenChange={() => { /* intentionally non-dismissable */ }}>
      {/* disableFullWindowOverlay: prevents FullWindowOverlay on iOS from blocking Fast Refresh in dev */}
      <Dialog.Portal disableFullWindowOverlay={__DEV__}>
        {/* isCloseOnPress=false: user cannot dismiss by tapping the overlay */}
        <Dialog.Overlay isCloseOnPress={false} />
        <Dialog.Content isSwipeable={false}>
          <Dialog.Title>{t('forceUpdate.title')}</Dialog.Title>
          <Dialog.Description>{t('forceUpdate.description')}</Dialog.Description>
          <View className="mt-4">
            <Button variant="primary" onPress={handleUpdate}>
              {t('forceUpdate.updateNow')}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
