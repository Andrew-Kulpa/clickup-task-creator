/* eslint @typescript-eslint/no-explicit-any: off */
import { ClickUpRequester } from '../src/classes/ClickUpRequester';
import { HTTPMethod } from '../src/models/HTTPMethod.enum';
import mockAxios from 'jest-mock-axios';

describe('ClickUpRequester', () => {

    afterEach(() => {
        // cleaning up the mess left behind the previous test
        mockAxios.reset();
    });

    it('performs request as-is', async () => {
        const requester = new ClickUpRequester("pk_1234");
        let path = "/api/test/123";

        // set requestBody for requester
        requester.request(HTTPMethod.POST, 443, path)

        // simulate a server response
        let responseObj = {
            data: dataMock(),
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        };
        mockAxios.mockResponse(responseObj);

        // test that request passed through properly
        expect(mockAxios).toHaveBeenCalledWith(requester.createRequestObject(HTTPMethod.POST, 443, path));
    });
});

function dataMock() {
    return {
        "id": "9hx",
        "name": "New Task Name",
        "status": {
            "status": "Open",
            "color": "#d3d3d3",
            "orderindex": 0,
            "type": "open"
        },
        "orderindex": "1.00000000000000000000000000000000",
        "date_created": "1567780450202",
        "date_updated": "1567780450202",
        "date_closed": null,
        "creator": {
            "id": 183,
            "username": "John Doe",
            "color": "#827718",
            "profilePicture": "https://attachments-public.clickup.com/profilePictures/183_abc.jpg"
        },
        "assignees": [],
        "checklists": [],
        "tags": [],
        "parent": null,
        "priority": null,
        "due_date": null,
        "start_date": null,
        "time_estimate": null,
        "time_spent": null,
        "list": {
            "id": "123"
        },
        "folder": {
            "id": "456"
        },
        "space": {
            "id": "789"
        },
        "url": "https://app.clickup.com/t/9hx"
    } as any;
}