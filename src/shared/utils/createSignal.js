export const createSignal = (initialValue) => {
    const error_prefix = '[Utils] createSignal.';
    let value = initialValue;
    const listeners = new Set();
    return {
        get: () => value,
        set: (newValue) => {
            value = newValue
            listeners.forEach((listenerCallback) => listenerCallback(value));
        },
        subscribe: (listenerCallback) => {
            if (typeof listenerCallback !== 'function') throw new Error(error_prefix + ' ListenerCallback must be a function');
            listeners.add(listenerCallback);
            listenerCallback(value);
            return () => listeners.delete(listenerCallback);
        }
    }

}