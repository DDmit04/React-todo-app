export const doRequest = async (url: string, method: HttpMethodType, body = {}, headers = {}) => {
    let request = {
        method: method.toString(),
    }
    if (method != HttpMethodType.GET && method != HttpMethodType.HEAD) {
        Object.assign(request, {
            body: body,
            headers: headers
        })
    }
    return await fetch(`${process.env.REACT_APP_HOST}${url}`, request)
        .then(async (response) => {
            if(response.ok) {
                return await response.json();
            } else {
                return null
            }
        })
        .catch(err => {
            return err
        })
}

export enum HttpMethodType {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD'
}