const appRequest = <T>({
   url = '/',
   data = undefined,
   method = 'GET',
   headers = {},
   ...rest
}: {
    url: string,
    data?: unknown,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    headers?: {
        [key: string]: string
    }
}): Promise<{ data: T, status: number }> => fetch(url, {
    ...rest,
    body: (data && JSON.stringify(data)) as string,
    method: method,
    headers: {
        ...(headers || {}),
    }
}).then( response => response.json().then(data => ({ data, status: response.status })));

export default appRequest;