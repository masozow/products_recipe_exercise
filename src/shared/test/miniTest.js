export const describe = async (message, fn) => {
    console.group(message);
    await fn();
    console.groupEnd();
}

export const it = async (description, fn) => {
    try {
        await fn();
        console.log(`[1] ${description}`);
    } catch (error) {
        console.error(`[0] ${description} error`, error);
    }
}

export const expect = (actual) => {
    return {
        toBe: (expected) => {
            if (actual !== expected)
                throw new Error(`Expected: ${expected}, but received: ${actual}`);
        }
    }
}

export const silenced = async (fn) => {
    const original_console_error = console.error;
    console.error = () => { };
    try {
        await fn();
    } finally {
        console.errorr = original_console_error;
    }
}