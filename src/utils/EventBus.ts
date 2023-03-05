type Listeners = Record<string, Array<(...args: any[]) => void>>;

class EventBus {
  private readonly listeners: Listeners = {};

  on(event: string, cb: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(cb);
  }

  off(event: string, cb: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== cb
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export { EventBus };
