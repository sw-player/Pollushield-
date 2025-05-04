// client/src/sanitize.js
import Ajv         from 'ajv';
import addFormats  from 'ajv-formats';
import schema      from '../../schemas/default-schema.json';  // ← JSON 파일 import

// 1) AJV 인스턴스 & 포맷 활성화
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

// 2) 스키마 컴파일
const validate = ajv.compile(schema);

/**
 * 브라우저 전용 sanitize 함수
 */
export function sanitize(input) {
  const valid = validate(input);
  if (!valid) {
    const msg = validate.errors
      .map(e => `${e.instancePath} ${e.message}`)
      .join('; ');
    throw new Error(`Invalid payload: ${msg}`);
  }
  return input;
}

// 3) 즉시 훅 설치 (UMD 번들 진입점에서 이 모듈을 import 하세요)
;(function initPolluShield() {
  if (window.PolluShield?.initialized) return;
  window.PolluShield = window.PolluShield || {};
  window.PolluShield.sanitize    = sanitize;
  window.PolluShield.initialized = true;
  console.log('[PolluShield] 확장 훅이 설치되었습니다.');
})();
