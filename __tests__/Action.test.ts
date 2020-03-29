import path from 'path';
import nock from 'nock';
import mockAxios from 'jest-mock-axios';


describe('Action', () => {
    // TODO: Do better
    it('Creates a task from an issue', async () => {
        process.env['INPUT_STATUS'] = 'test_status';
        process.env['INPUT_GITHUB_TOKEN'] = 'gh_token_1234';
        process.env['INPUT_CLICKUP_TOKEN'] = 'cu_token_1234';
        process.env['INPUT_LIST_ID'] = '1234';

        process.env['GITHUB_REPOSITORY'] = 'foo/bar';
        process.env['GITHUB_EVENT_PATH'] = path.join(__dirname, 'data/opened_issue.json');
        nock('https://api.github.com')
            .persist()
            .post('/repos/foo/bar/issues/10/', '{\"body\":\"hello\"}')
            .reply(200);

        const index = require('../src/index');

        // simulate a server response
        let responseObj = {
            data: {},
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        };
        mockAxios.mockResponse(responseObj);
    });
    // TODO: test - Creates a task from a Pull Request
});
