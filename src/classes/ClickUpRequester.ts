import axios, { AxiosRequestConfig, Method, AxiosPromise, AxiosResponse } from 'axios';


export class ClickUpRequester {
    hostname = 'api.clickup.com';
    accessToken: string;
    requestBody = {};
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    createBaseURL(port: number): string {
        let url = '';
        if (port == 443) {
            url += 'https://';
        } else {
            url += 'http://';
        }
        url += this.hostname;
        return url;
    }

    async request(method: Method, port: number, path: string, params = {}): Promise<AxiosResponse<any>> {
        let requestObject = this.createRequestObject(method, port, path, params);
        console.log("Requesting", requestObject.data, requestObject.baseURL, requestObject.url);
        return axios(requestObject);
    }

    createRequestObject(method: Method, port: number, path: string, params = {}): AxiosRequestConfig {
        let requestObject = {
            method,
            baseURL: this.createBaseURL(port),
            url: path,
            responseType: 'json',
            headers: {
                'Authorization': this.accessToken,
                'Content-Type': 'application/json'
            },
            params
        } as AxiosRequestConfig;
        requestObject.data = this.requestBody;
        return requestObject;
    }
}