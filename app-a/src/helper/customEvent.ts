declare const window: any;

// Fixed for IE Custom Event
function YingyanCustomEvent(event: any, params: any): any {
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  let evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

export function customEvent(eventName: any, eventArgs?: any) {
  if (typeof window.CustomEvent !== 'function') {
    YingyanCustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = YingyanCustomEvent;
  }

  window.dispatchEvent(new CustomEvent(eventName, { detail: eventArgs }));
}
