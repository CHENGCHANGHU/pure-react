export function get(url, params) {
  const searchEntries = Object.entries(params).reduce((prev, [key, value]) => {
    const valueType = typeof value;
    if (valueType === 'object' && Array.isArray(value)) {
      value.forEach(v => prev.push([key, v]));
    } else if (valueType === 'object') {
      prev.push([key, JSON.parse(value)]);
    } else {
      prev.push([key, value]);
    }
    return prev;
  }, []);
  return fetch(
    `${ url }?${ (new URLSearchParams(searchEntries)).toString() }`,
    {
      method: 'GET',
    }
  );
};
