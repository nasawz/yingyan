import { route } from 'preact-router';
declare const window: any;
export function navigate(opts: any): void {
  if (window.yingyan.instance) {
    history.pushState(null, '', `/#${opts.prefix}${opts.router}`);
    window.yingyan.instance.reRouter({ app: { name: opts.name }, router: opts.router });
  } else {
    route(`${opts.prefix}${opts.router}`, true);
  }
}
