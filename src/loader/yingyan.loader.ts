import LoaderHelper from '../helper/loader.helper';

// function yingyanLoader() {
//   console.log(fallback);
// }

// export { load };
declare const window: any;

function bootstrap(app: any) {
  return new Promise((resolve, reject) => {
    LoaderHelper.loadAllAssets(app).then(resolve, reject);
  });
}

function mount(app: any, props?: any) {
  return new Promise((resolve, reject) => {
    let aliasWindow: any = window;

    if (aliasWindow.yingyan[app.name]) {
      aliasWindow.yingyan[app.name].mount(props);
      resolve();
    } else {
      console.error(`Cannot mount ${app.name} because that is not bootstraped`);
      reject();
    }
  });
}

function unmount(app: any, props: any) {
  const { unloadApplication, getAppNames } = props;
  return new Promise((resolve, reject) => {
    if (window.yingyan[app.name]) {
      window.yingyan[app.name].unmount();
      // removeApplicationContainer(app)
      if (getAppNames().indexOf(app.name) !== -1) {
        unloadApplication(app.name, { waitForUnmount: true });
        resolve();
      } else {
        reject(`Cannot unmount ${app.name} because that ${app.name}
          is not part of the decalred applications : ${getAppNames()}`);
      }
    } else {
      reject(`Cannot unmount ${app.name} because that is not bootstraped`);
    }
  });
}

function unload(app: any) {
  return new Promise(resolve => {
    app.scripts.concat(app.styles).reduce((prev: Promise<any>, scriptName: string) => {
      return prev.then(LoaderHelper.unloadTag(app, scriptName));
    }, Promise.resolve({}));
    resolve();
  });
}
export default function yingyanLoader(opts: any) {
  return {
    bootstrap: bootstrap.bind(null, opts),
    // load: load.bind(null, opts),
    mount: mount.bind(null, opts),
    unload: unload.bind(null, opts),
    unmount: unmount.bind(null, opts)
  };
}
