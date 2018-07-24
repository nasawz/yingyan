export interface IApp {
  name: string;
  version: string;
  description: string;
  baseScriptUrl?: string;
  parentElement: string;
  scripts: Array<string>;
  styles?: Array<string>;
  prefix: string;
  status?: string;
  activeWhen?: Function;
  isDefaultPage?: boolean;
}
