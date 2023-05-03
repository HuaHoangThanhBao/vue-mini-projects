class EventManager {
  listeners: Array<any>;

  constructor() {
    this.listeners = [];
  }

  subscribe(eventType: any, listener: any) {
    this.listeners.push(eventType, listener);
  }

  unsubscribe(eventType: any, listener: any) {
    this.listeners.push(eventType, listener);
  }

  notify(eventType: any, data: any) {
    for (const listener of this.listeners) {
      if (listener.eventType === eventType) {
        listener.update(data);
      }
    }
  }
}

interface EventListener {
  update: (event: any) => void;
}

export class Toast {
  events: EventManager;

  constructor() {
    this.events = new EventManager();
  }

  notify() {
    this.events.notify("alert", "we got the notification");
  }
}

export class ToastListener implements EventListener {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  update(event: any) {
    console.log("listen to event:", event);
  }
}
