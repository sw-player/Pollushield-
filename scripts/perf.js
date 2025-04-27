// scripts/perf.js
const { loadSchema, sanitize } = require('../middleware/ruleEngine');
const { performance } = require('perf_hooks');

// 스키마 로드
const validate = loadSchema('default-schema');

// 샘플 입력 생성 함수
function generateInput() {
  return {
    username: `user${Math.floor(Math.random() * 1e6)}`,
    email:    `user${Math.floor(Math.random() * 1e6)}@example.com`,
    roles:    ['user']
    // 추가 프로퍼티는 자동 제거됨
  };
}

(async () => {
  const iterations = 100_000;
  let totalTime = 0;

  for (let i = 0; i < iterations; i++) {
    const input = generateInput();
    const start = performance.now();
    sanitize(input, validate);
    const end = performance.now();
    totalTime += (end - start);
  }

  console.log(`Iterations: ${iterations}`);
  console.log(`Total time: ${totalTime.toFixed(2)} ms`);
  console.log(`Average per call: ${(totalTime / iterations).toFixed(4)} ms`);
})();
