"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ClickUpRequester {
    constructor(accessToken) {
        this.hostname = 'api.clickup.com';
        this.requestBody = {};
        this.accessToken = accessToken;
    }
    createBaseURL(port) {
        let url = '';
        if (port == 443) {
            url += 'https://';
        }
        else {
            url += 'http://';
        }
        url += this.hostname;
        return url;
    }
    request(method, port, path, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestObject = this.createRequestObject(method, port, path, params);
            console.log("Requesting", requestObject.data, requestObject.baseURL, requestObject.url);
            return axios_1.default(requestObject);
        });
    }
    createRequestObject(method, port, path, params = {}) {
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
        };
        requestObject.data = this.requestBody;
        return requestObject;
    }
}
exports.ClickUpRequester = ClickUpRequester;
//# sourceMappingURL=ClickUpRequester.js.map