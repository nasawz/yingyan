export enum StatusEnum {
  NOT_LOADED = 'NOT_LOADED',
  LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE',
  NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED',
  BOOTSTRAPPING = 'BOOTSTRAPPING',
  NOT_MOUNTED = 'NOT_MOUNTED',
  MOUNTING = 'MOUNTING',
  MOUNTED = 'MOUNTED',
  UNMOUNTING = 'UNMOUNTING',
  UNLOADING = 'UNLOADING',
  SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'
}

export enum YY_EVENT {
  LOADING = 'yingyan.loading',
  BOOTSTRAPPING = 'yingyan.bootstrapping',
  MOUNTING = 'yingyan.mounting',
  UNLOADING = 'yingyan.unloading',
  UNMOUNTING = 'yingyan.unmounting',
  ROUTING_NAVIGATE = 'yingyan.routing.navigate',
  ROUTING_CHANGE = 'yingyan.routing.change',
  ROUTING_BEFORE = 'yingyan.routing.before',
  CHILD_MOUNT = 'yingyan.child.mount',
  CHILD_UNMOUNT = 'yingyan.child.unmount'
}
