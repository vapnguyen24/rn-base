import { createSignal, withLoadingFunc } from "~/src/common/signal";
import { ApiConstants } from "~/src/library/networking/api";
import { validResponse } from "~/src/library/networking/helper";
import { NetWorkService } from "~/src/library/networking/service";


const signalObj = createSignal(['login'] as const);

const login = async (body: any) => {
  await withLoadingFunc(async () => {
    const response = await NetWorkService.Post({
      body,
      signal: signalObj.login.signal,
      url: ApiConstants.LOGIN,
    });

    if (!response) {
      return;
    }

    if (validResponse(response)) {
      /**
       * Do something when login success
       */
    }
  });
};

export const authenticationService = {
  login,
};
