import { IApp } from './interface/IApp';
import { StatusEnum } from './interface/constants';
// import { load } from './loader/yingyan.loader';
import axios from 'axios';
import map from 'lodash/map';
import StatusHelper from './helper/status.helper';
import { YingyanRouter } from './router';
import { yyLog } from './helper/app.helper';

import { toLoadPromise } from './lifecycles/load';
import { toBootstrapPromise } from './lifecycles/bootstrap';

export const yingyanRouter = new YingyanRouter();

declare var window: any;
const apps: any[] = [];
window.yingyan = window.yingyan || {};
class Yingyan {
  started = false;

  constructor() {
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
    });
    window.apps = apps;
  }

  start() {
    this.started = true;
    this.reRouter();
  }

  reRouter() {
    async function performAppChanges() {
      const appsToLoad = StatusHelper.getAppsToLoad(apps);
      yyLog('appsToLoad', appsToLoad);
      const loadThenMountPromises = appsToLoad.map((app: any) => {
        return toLoadPromise(app)
          .then(toBootstrapPromise)
          .then(async function(toMountApp) {
            await unmountAllPromise;
            return toMountPromise(toMountApp);
          });
        // yyLog(app);
      });
    }
    performAppChanges();
  }
}

export { Yingyan };
