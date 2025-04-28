// client/src/client.js

// JSON 스키마 직접 포함 (간단화)
const schema = {
    type: "object",
    properties: {
      username: { type: "string" },
      email:    { type: "string", format: "email" },
      roles:    {
        type: "array",
        items: { type: "string", enum: ["user","admin","guest"] }
      }
    },
    required: ["username","email"],
    additionalProperties: false
  };
  
  // AJV 및 formats 로드
  import Ajv        from "ajv";
  import addFormats from "ajv-formats";
  
  const ajv = new Ajv({ allErrors: true, removeAdditional: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  
  // 원본 Object.assign 보관
  const nativeAssign = Object.assign;
  
  // PolluShield 클라이언트 로직: Object.assign override
  function protectAssign(target, ...sources) {
    const sanitizedSources = sources.map(src => {
      try {
        validate(src);
        if (!validate(src)) throw new Error("Invalid payload");
        return src;
      } catch (e) {
        console.warn("[PolluShield] Blocked payload:", e.message);
        // 차단된 페이로드는 빈 객체로 대체
        return {};
      }
    });
    return nativeAssign.call(Object, target, ...sanitizedSources);
  }
  
  // 페이지 로드 시 오버라이드
  (function initPolluShield() {
    if (!window.PolluShield) {
      window.PolluShield = true;
      Object.assign = protectAssign;
      console.log("[PolluShield] Protection enabled");
    }
  })();
  