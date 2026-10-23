export const getItems = async ({ query, item_acces_key, ItemShape, url, error_message_prefix, httpClient }) => {
    if (typeof query !== 'string') throw new Error(error_message_prefix + ' Query must be a string.');
    const rawData = await httpClient({ url });
    const items = rawData[item_acces_key];
    if (!items) throw new Error(error_message_prefix + ` Server didn't returned a ${item_acces_key} object.`);
    if (!Array.isArray(items)) throw new Error(error_message_prefix + ' Api returned an invalid array.');
    return items.map((item) => ItemShape(item));
}