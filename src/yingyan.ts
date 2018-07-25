import { IApp } from './interface/IApp';
import { StatusEnum, YY_EVENT } from './interface/constants';
// import { load } from './loader/yingyan.loader';
import axios from 'axios';
import map from 'lodash/map';
import StatusHelper from './helper/status.helper';
import { YingyanRouter } from './router';
import { yyLog, customEvent } from './helper/app.helper';

import { toLoadPromise } from './lifecycles/load';
import { toBootstrapPromise } from './lifecycles/bootstrap';
import { toMountPromise } from './lifecycles/mount';
import { toUnloadPromise } from './lifecycles/unload';
import { toUnmountPromise } from './lifecycles/unmount';

export const yingyanRouter = new YingyanRouter();

declare var window: any;
const apps: any[] = [];
window.yingyan = window.yingyan || {};
class Yingyan {
  started = false;

  constructor() {
    window.yingyan.instance = this;
    window.yingyan.debug = true;
  }

  /**
   * 加载配置
   */
  bootstrap() {
    axios.get('config.json').then(res => {
      // console.log(res.data);
      this.registerApp(res.data.apps);
      this.start();
    });
  }

  /**
   * 注册应用
   */
  registerApp(data: Array<IApp>) {
    map(data, app => {
      let container = document.createElement('div');
      container.id = `${app.name}@${app.version}`;
      document.body.appendChild(container);
      app.status = StatusEnum.NOT_LOADED;
      app.parentElement = container.id;
      app.activeWhen = yingyanRouter.matchRoute(app.prefix, app.isDefaultPage);
      apps.push(app);
      console.log(app);
    });
    window.apps = apps;
  }

  start() {
    this.started = true;
    window.addEventListener(YY_EVENT.ROUTING_NAVIGATE, function(event: CustomEvent) {
      // if (event.detail) {
      //   navigateAppByName(event.detail)
      // }
    });
    this.reRouter();
  }

  reRouter() {
    async function performAppChanges() {
      customEvent(YY_EVENT.ROUTING_BEFORE);
      const unloadPromises = StatusHelper.getAppsToUnload().map(toUnloadPromise);
      const unmountUnloadPromises = StatusHelper.getAppsToUnmount(apps)
        .map(toUnmountPromise)
        .map((unmountPromise: any) => unmountPromise.then(toUnloadPromise));
      const allUnmountPromises = unmountUnloadPromises.concat(unloadPromises);

      const unmountAllPromise = Promise.all(allUnmountPromises);

      const appsToLoad = StatusHelper.getAppsToLoad(apps);
      yyLog('appsToLoad', appsToLoad);
      const loadThenMountPromises = appsToLoad.map((app: any) => {
        return toLoadPromise(app)
          .then(toBootstrapPromise)
          .then(async function(toMountApp) {
            await unmountAllPromise;
            return toMountPromise(toMountApp);
          });
      });

      const mountPromises = StatusHelper.getAppsToMount(apps)
        .filter((appToMount: any) => appsToLoad.indexOf(appToMount) < 0)
        .map(async function(appToMount: any) {
          await toBootstrapPromise(appToMount);
          await unmountAllPromise;
          return toMountPromise(appToMount);
        });

      try {
        await unmountAllPromise;
      } catch (err) {
        throw err;
      }

      await Promise.all(loadThenMountPromises.concat(mountPromises));

      // if (eventArguments) {
      //   let activeApp = StatusHelper.getActiveApps(apps)[0]
      //   if (activeApp && activeApp['appConfig']) {
      //     that.createRoutingChangeEvent(eventArguments, activeApp)
      //   }
      // }
    }
    performAppChanges();
  }
}

export { Yingyan };
