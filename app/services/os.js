import Service from '@ember/service';

export default class OsService extends Service {
  get isMacOs() {
    return navigator.appVersion.indexOf("Mac") != -1;
  }
}
