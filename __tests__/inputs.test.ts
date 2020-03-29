/* eslint @typescript-eslint/no-explicit-any: off */
const mockGetInput = jest.fn();
const mockWarning = jest.fn();
const mockReadFileSync = jest.fn();
const mockExistsSync = jest.fn(x => true); // used by github actions `new Context()`

import { Context } from '@actions/github/lib/context';
import { ActionInputs, Inputs } from '../src/classes/inputs';

jest.mock('@actions/core', () => ({
  getInput: mockGetInput,
  warning: mockWarning,
}));

jest.mock('fs', () => ({
  existsSync: mockExistsSync, // used by github actions `new Context()`
}));

describe('inputs', () => {
  let context: Context;
  let inputs: Inputs;
  beforeEach(() => {
    mockGetInput.mockReset();
    mockReadFileSync.mockReturnValue('{}'); // used by github actions `new Context()`
    context = new Context();
    mockReadFileSync.mockReset();
    inputs = new ActionInputs(context);
  });

  it('returns list_id', () => {
    mockGetInput.mockReturnValue(12345);
    expect(inputs.list_id).toBe(12345);
  });

  it('returns status', () => {
    mockGetInput.mockReturnValue('open');
    expect(inputs.status).toBe('open');
  });

  it('returns github_token', () => {
    mockGetInput.mockReturnValue("pk123414");
    expect(inputs.github_token).toBe("pk123414");
  });

  it('returns clickup_token', () => {
    mockGetInput.mockReturnValue("pk123414");
    expect(inputs.clickup_token).toBe("pk123414");
  });
});
