// tests/ruleEngine.test.js
const { loadSchema, sanitize } = require('../middleware/ruleEngine');

describe('ruleEngine sanitize()', () => {
  let validate;
  beforeAll(() => {
    // default-schema.json 로더
    validate = loadSchema('default-schema');
  });

  test('허용된 프로퍼티만 남긴다', () => {
    const input = {
      username: 'alice',
      email:    'alice@example.com',
      roles:    ['user'],
      extra:    'shouldBeRemoved'
    };
    const output = sanitize(input, validate);
    expect(output).toEqual({
      username: 'alice',
      email:    'alice@example.com',
      roles:    ['user']
    });
  });

  test('필수 필드 누락 시 에러 발생', () => {
    const input = { email: 'bob@example.com' };
    expect(() => sanitize(input, validate))
      .toThrow(/Schema validation failed/);
  });

  test('유효한 입력은 그대로 반환', () => {
    const input = {
      username: 'charlie',
      email:    'charlie@example.com',
      roles:    ['admin','guest']
    };
    const output = sanitize(input, validate);
    expect(output).toEqual(input);
  });
});
