import { StatusEnum } from '../interface/constants';

function notSkipped(item: any) {
  return (
    item !== StatusEnum.SKIP_BECAUSE_BROKEN &&
    (!item || item.status !== StatusEnum.SKIP_BECAUSE_BROKEN)
  );
}

function isLoaded(app: any) {
  return app.status !== StatusEnum.NOT_LOADED && app.status !== StatusEnum.LOADING_SOURCE_CODE;
}

function shouldBeActive(app: any) {
  try {
    return app.activeWhen(window.location);
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }
}

function notLoaded(app: any) {
  return !isLoaded(app);
}

const StatusHelper = {
  getAppsToLoad: (apps: any) => {
    return apps
      .filter(notSkipped)
      .filter(notLoaded)
      .filter(shouldBeActive);
  },
  getAppsToUnload: () => {},
  getAppUnloadInfo: (appName: any) => {},
  getAppsToUnmount: (apps: any) => {},
  getAppsToMount: (apps: any) => {},
  getActiveApps: (apps: any) => {}
};
export default StatusHelper;
