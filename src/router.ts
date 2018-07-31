/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by nasawz
 *
 */
import { find } from './helper/app.helper';

declare const history: History;
declare let window: any;

export class YingyanRouter {
  routes: string[];
  lastPathName: string;
  defaultRoute: string = '';

  constructor() {
    this.routes = [];
    this.lastPathName = '/';
  }

  matchRoute(prefix: string, isDefaultPage?: boolean): (location: Location) => boolean {
    this.routes.push(prefix);
    if (isDefaultPage) {
      this.defaultRoute = prefix;
    }
    return (location: Location): boolean => {
      if (prefix === '/') {
        return location.pathname === '/';
      }
      const route = find(this.routes, (r: any) => this.pathMatch(location, r));
      if (route) {
        return this.pathMatch(location, prefix);
      } else {
        this.lastPathName = location.pathname;
        this.navigate(this.defaultRoute);
        window.yingyan.instance.reRouter();
        return false;
      }
    };
  }

  public navigate(path: string): void {
    history.pushState(null, '', `/#${path}`);
  }

  private pathMatch(location: Location, path: string): boolean {
    const loc = location.pathname + location.hash;
    return loc.indexOf(path) !== -1;
  }
}

export default YingyanRouter;
