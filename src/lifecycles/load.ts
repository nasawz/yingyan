import { YY_EVENT, StatusEnum } from '../interface/constants';
import loader from '../loader/yingyan.loader';
import { ensureValidAppTimeouts } from '../helper/timeouts';
import { customEvent, yyLog } from '../helper/app.helper';
// import { MooaApp } from '../model/IAppOption';

// export async function toLoadPromise(app: any) {
//   if (app.status !== StatusEnum.NOT_LOADED) {
//     return app;
//   }

//   createApp(app);

//   customEvent(MOOA_EVENT.LOADING, { app: app });
//   yyLog('Loading application', app.name, app.status);
//   app.status = StatusEnum.NOT_BOOTSTRAPPED;
//   return app;
// }

// function createApp(appOpt: any): MooaApp {
//   const _loader = loader(appOpt);
//   appOpt.bootstrap = _loader.bootstrap;
//   appOpt.load = _loader.load;
//   appOpt.mount = _loader.mount;
//   appOpt.unload = _loader.unload;
//   appOpt.unmount = _loader.unmount;
//   appOpt.timeouts = ensureValidAppTimeouts(appOpt.timeouts);
//   return appOpt;
// }
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
  appOpt.timeouts = ensureValidAppTimeouts(appOpt.timeouts);
  return appOpt;
};
