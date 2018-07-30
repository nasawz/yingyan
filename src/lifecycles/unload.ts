import { YY_EVENT, StatusEnum } from '../interface/constants';
import { reasonableTime } from '../helper/timeouts';
import { customEvent, yyLog } from '../helper/app.helper';

const appsToUnload: any = {};

export async function toUnloadPromise(app: any, yingyanInstance?: any) {
  const unloadInfo = appsToUnload[app.name];

  if (app.status === StatusEnum.NOT_LOADED) {
    unloadingApp(app, unloadInfo);
    return app;
  }

  if (app.status === StatusEnum.UNLOADING) {
    await unloadInfo.promise;
    return app;
  }

  if (app.status !== StatusEnum.NOT_MOUNTED) {
    return app;
  }

  if (!unloadInfo) {
    return app;
  }
  try {
    app.status = StatusEnum.UNLOADING;
    customEvent(YY_EVENT.UNLOADING, { app: app });
    yyLog('Unloading application', app.name, app.status);
    await reasonableTime(app.unload(), `Unloading application '${app.name}'`, app.timeouts.unload);
  } catch (err) {
    console.error('Unloading Error', err);
    return app;
  }

  unloadingApp(app, unloadInfo);

  return app;
}

function unloadingApp(app: any, unloadInfo: any) {
  delete appsToUnload[app.name];

  delete app.bootstrap;
  delete app.mount;
  delete app.unmount;
  delete app.unload;

  app.status = StatusEnum.NOT_LOADED;

  unloadInfo.resolve();
}

export function getUnloadApps() {
  return appsToUnload;
}

export function addAppToUnload(app: any, promiseGetter: any, resolve: any, reject: any) {
  appsToUnload[app.name] = { app, resolve, reject };
  Object.defineProperty(appsToUnload[app.name], 'promise', {
    get: promiseGetter
  });
}
