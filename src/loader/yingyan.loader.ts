import LoaderHelper from '../helper/loader.helper';

// function yingyanLoader() {
//   console.log(fallback);
// }

// export { load };

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
export default function yingyanLoader(opts: any) {
  return {
    bootstrap: bootstrap.bind(null, opts)
    // load: load.bind(null, opts),
    // mount: mount.bind(null, opts),
    // unload: unload.bind(null, opts),
    // unmount: unmount.bind(null, opts)
  };
}
