import { YY_EVENT, StatusEnum } from '../interface/constants';
import loader from '../loader/yingyan.loader';
import { ensureValidAppTimeouts } from '../helper/timeouts';
import { customEvent, yyLog } from '../helper/app.helper';

export async function toLoadPromise(app: any) {
  if (app.status !== StatusEnum.NOT_LOADED) {
    return app;
  }
  createApp(app);
  customEvent(YY_EVENT.LOADING, { app: app });
  yyLog('Loading application', app.name, app.status);
  app.status = StatusEnum.NOT_BOOTSTRAPPED;
  return app;
}

const createApp = (appOpt: any) => {
  const _loader = loader(appOpt);
  appOpt.bootstrap = _loader.bootstrap;
  appOpt.mount = _loader.mount;
  appOpt.unmount = _loader.unmount;
  appOpt.unload = _loader.unload;
  appOpt.timeouts = ensureValidAppTimeouts(appOpt.timeouts);
  return appOpt;
};
