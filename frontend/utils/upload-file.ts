export const uploadFile = async (endpoint: string, file: File, method = 'POST', options = {}) => {
    const formData = new FormData();
    formData.append('image', file)
    return fetch(endpoint, { ...options, method, body: formData})
}