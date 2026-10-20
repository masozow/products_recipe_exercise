export const HttpClient = async ({ url, options = {}, fetch = window.fetch }) => {
    const error_prefix = '[Shared Infra Error] HttpClient.';
    try {
        const { body, headers = {}, ...rest } = options;
        const config = {
            ...rest,
            headers: {
                ...headers
            }
        }
        if (body) {
            config.body = JSON.stringify(body);
            config.headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, config);
        if (!response.ok) throw new Error(`${error_prefix} Status: ${response.status} - ${response.statusText}. At: ${url}`);
        return response.json();
    } catch (error) {
        console.error(error_prefix, error);
        throw error; //Necessary to cach the exact error at higher levels, such as testing
    }

}