const fs         = require('fs');
const path       = require('path');
const Ajv        = require('ajv');
const addFormats = require('ajv-formats');   // ajv-formats 불러오기

// Ajv 인스턴스 생성 및 포맷 활성화
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

function loadSchema(name) {
  const schemaPath = path.join(__dirname, '../schemas', name + '.json');
  const schema     = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  return ajv.compile(schema);
}

function sanitize(input, validateFn) {
  const valid = validateFn(input);
  if (!valid) {
    const errors = validateFn.errors
      .map(e => `${e.instancePath} ${e.message}`)
      .join('; ');
    throw new Error(`Schema validation failed: ${errors}`);
  }
  return input;
}

module.exports = { loadSchema, sanitize };
