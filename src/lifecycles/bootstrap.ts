import { reasonableTime } from '../helper/timeouts';
import { YY_EVENT, StatusEnum } from '../interface/constants';
import { customEvent, yyLog } from '../helper/app.helper';

export async function toBootstrapPromise(app: any) {
  if (app.status !== StatusEnum.NOT_BOOTSTRAPPED) {
    return app;
  }
  app.status = StatusEnum.BOOTSTRAPPING;

  try {
    yyLog('Bootstrapping application', app.name, app.status);
    customEvent(YY_EVENT.BOOTSTRAPPING, { app: app });
    await reasonableTime(
      app.bootstrap(),
      `Bootstrapping app '${app.name}'`,
      app.timeouts.bootstrap
    );
    app.status = StatusEnum.NOT_MOUNTED;
  } catch (err) {
    console.error(err);
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }

  return app;
}
