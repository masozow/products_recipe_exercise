export const describe = async (testSuit, fn) => {
    console.group(testSuit);
    await fn();
    console.groupEnd();
}
export const it = async (description, fn) => {
    try {
        await fn();
        console.log(`[1] ${description}`)
    } catch (error) {
        console.error(`[0] ${description} - ${error}`);
    }
}
export const expect = (actual) => {
    return {
        toBe: (expected) => {
            if (actual !== expected) throw new Error(`[0] Expected: ${expected}, but received: ${actual}`);
        }
    }
}

export const silenced = async (fn) => {
    const originalConsoleError = console.error;
    console.error = () => { }
    try {
        await fn();
    } finally {
        console.error = originalConsoleError;
    }

}