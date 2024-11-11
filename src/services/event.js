class Event {
  constructor() {
    this.subscribers = {};
  }

  subscribe(key, value) {
    if (!this.subscribers[key]) this.subscribers[key] = [];

    this.subscribers[key].push(value);
  }

  notify(key, value) {
    if (this.subscribers[key]) {
      this.subscribers[key].forEach((subscriber) => {
        subscriber(value);
      });
    } else {
      console.info("unknown event");
    }
  }

  remove(key) {
    if (this.subscribers[key]) {
      delete this.subscribers[key];
    }
  }
}

export const Eventhandler = new Event();
