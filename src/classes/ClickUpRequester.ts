import { HTTPMethod } from '../models/HTTPMethod.enum';
import { assert } from 'console';


export class ClickUpRequester {
    hostname = 'api.clickup.com';
    accessToken: string;
    requestBody = {};
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
    isValidURL(url: string) {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }

    createURL(port: number, path: string, parameters: string): string {
        let url = '';
        if (port == 443) {
            url += 'https://';
        } else {
            url += 'http://';
        }
        url += this.hostname;
        url += path;
        url += parameters;
        return url;
    }

    request(method: HTTPMethod, port: number, path: string, parameters = '') {
        let request = new XMLHttpRequest();
        let url = this.createURL(port, path, parameters);
        assert(this.isValidURL(url));

        request.open(method, url);

        request.setRequestHeader('Authorization', this.accessToken);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
            }
        };
        if (method == HTTPMethod.GET || method == HTTPMethod.DELETE) {
            request.send();
        } else { // POST or PUT
            request.send(JSON.stringify(this.requestBody));
        }
        assert(request.status === 200)
        return {
            status: request.status, // number
            headers: request.getAllResponseHeaders(), // string
            responseText: request.responseText // string
        }
    }
}