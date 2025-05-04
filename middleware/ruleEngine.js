// middleware/ruleEngine.js

const Ajv = require('ajv');
const addFormats = require('ajv-formats');   // 이메일, URI 등 포맷 활성화

// 1) AJV 인스턴스 생성 (모든 에러 리포트, 추가 프로퍼티 제거)
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

/**
 * 주어진 스키마 이름(name)에 해당하는 JSON 파일을 읽어와
 * 검증 함수(validate)를 반환합니다.
 *
 * 스키마 파일 위치: project_root/schemas/{name}.json
 *
 * 예: schemas/default-schema.json 파일을 사용할 때:
 *    const validate = loadSchema('default-schema');
 *
 * @param {string} name  // 확장자(.json)를 뺀 파일명
 * @returns {(data: any) => boolean}
 */

/**
 * validateFn 으로 입력(input)을 검사하고,
 * 실패한 경우 에러를 던집니다.
 *
 * @param {any} input
 * @param {(data: any) => boolean} validateFn
 * @returns {any} 검증에 통과하면 원본 input을 그대로 반환
 * @throws {Error} 검증 실패 시
 */


