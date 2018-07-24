import { YY_EVENT, StatusEnum } from '../interface/constants';
import { reasonableTime } from '../helper/timeouts';
import { customEvent, yyLog } from '../helper/app.helper';
// import { IApp } from '../interface/IApp';

export async function toMountPromise(app: any) {
  if (app.status !== StatusEnum.NOT_MOUNTED) {
    return app;
  }

  try {
    yyLog('Mounting application', app.name, app.status);
    customEvent(YY_EVENT.MOUNTING, { app: app });
    await reasonableTime(app.mount(), `Mounting application '${app.name}'`, app.timeouts.mount);
    app.status = StatusEnum.MOUNTED;
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }

  return app;
}
