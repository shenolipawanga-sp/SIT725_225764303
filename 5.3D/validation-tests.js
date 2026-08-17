/**
 * SIT725 – 5.3D Validation Tests (MANDATORY TEMPLATE)
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  // treat missing or invalid tags as []
  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================

function makeValidBook(id) {
  return {
    id,
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    year: 1887,
    genre: "Fiction",
    summary: "A detective story introducing Sherlock Holmes and Dr. Watson as they investigate a mysterious murder in London.",
    price: "12.50"
  };
}

function makeValidUpdate() {
  return {
    title: "A Study in Scarlet (Revised Edition)",
    author: "Arthur Conan Doyle",
    year: 1888,
    genre: "Fiction",
    summary: "Updated summary text.A detective story introducing Sherlock Holmes and Dr. Watson as they investigate a mysterious murder in London.",
    price: "14.75"
  };
}

// =============================
// HELPERS FOR ADDITIONAL TESTS
// =============================

const CURRENT_YEAR = new Date().getFullYear();
let extraCounter = 0;

function nextId(base) {
  extraCounter += 1;
  return `${base}-x${extraCounter}`;
}

function withoutField(obj, field) {
  const copy = { ...obj };
  delete copy[field];
  return copy;
}

// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ---- T01 Valid CREATE ----
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // ---- T02 Duplicate ID ----
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // ---- T03 Immutable ID ----
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // ---- T04 Unknown field CREATE ----
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now()+1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ---- T05 Unknown field UPDATE ----
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

await test({
    id: "T06",
    name: "Missing title on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "title"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T07",
    name: "Missing author on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "author"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T08",
    name: "Missing year on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "year"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T09",
    name: "Missing genre on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "genre"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T10",
    name: "Missing summary on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "summary"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T11",
    name: "Missing price on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "price"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T12",
    name: "Missing id on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: withoutField(makeValidBook(nextId(uniqueId)), "id"),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // =====================================
  // ADDITIONAL TESTS - TYPE VALIDATION 
  // =====================================

  await test({
    id: "T13",
    name: "Year is not a number",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), year: "not-a-year" },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  await test({
    id: "T14",
    name: "Genre is wrong type",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), genre: 123 },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  await test({
    id: "T15",
    name: "Price is not numeric",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), price: "abc" },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  await test({
    id: "T16",
    name: "Genre is not a recognised category",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), genre: "Mystery-ish" },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // =====================================
  // ADDITIONAL TESTS - BOUNDARY TESTING 
  // =====================================

  await test({
    id: "T17",
    name: "Year below minimum boundary",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), year: 999 },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  await test({
    id: "T18",
    name: "Price is zero",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), price: "0" },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  await test({
    id: "T19",
    name: "Price above maximum boundary",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), price: "1000.00" },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  await test({
    id: "T20",
    name: "Price has more than two decimal places",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), price: "9.999" },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // =====================================
  // ADDITIONAL TESTS - LENGTH VIOLATIONS 
  // =====================================

  await test({
    id: "T21",
    name: "Title below minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), title: "A" },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  await test({
    id: "T22",
    name: "Title above maximum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), title: "A".repeat(201) },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  await test({
    id: "T23",
    name: "Author below minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), author: "B" },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  await test({
    id: "T24",
    name: "Summary below minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), summary: "too short" },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // =====================================
  // ADDITIONAL TESTS - TEMPORAL RULES 
  // =====================================

  await test({
    id: "T25",
    name: "Year is in the future",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), year: CURRENT_YEAR + 5 },
    tags: ["CREATE_FAIL", "TEMPORAL"]
  });

  // =====================================
  // ADDITIONAL TESTS - UNKNOWN FIELD REJECTION
  // =====================================

  await test({
    id: "T26",
    name: "Multiple unknown fields on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(nextId(uniqueId)), extra1: "x", extra2: "y" },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // =====================================
  // ADDITIONAL TESTS – VALIDATION ON UPDATE
  // =====================================

  await test({
    id: "T27",
    name: "Missing required field on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: withoutField(makeValidUpdate(), "price"),
    tags: ["UPDATE_FAIL", "REQUIRED"]
  });

  await test({
    id: "T28",
    name: "Wrong type on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), year: "not-a-year" },
    tags: ["UPDATE_FAIL", "TYPE"]
  });

  await test({
    id: "T29",
    name: "Boundary violation on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), price: "-5" },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  await test({
    id: "T30",
    name: "Length violation on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), summary: "too short" },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });

  await test({
    id: "T31",
    name: "Temporal violation on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), year: CURRENT_YEAR + 5 },
    tags: ["UPDATE_FAIL", "TEMPORAL"]
  });

  // =====================================
  // ADDITIONAL TESTS - NOT FOUND HANDLING
  // =====================================

  await test({
    id: "T32",
    name: "Update a book that does not exist",
    method: "PUT",
    path: updatePath("no-such-id-99999"),
    expected: 404,
    body: makeValidUpdate(),
    tags: ["UPDATE_FAIL"]
  });

  await test({
    id: "T33",
    name: "Fetch a book that does not exist",
    method: "GET",
    path: updatePath("no-such-id-99999"),
    expected: 404,
    tags: []
  });

  // =====================================
  // ADDITIONAL TESTS - POSITIVE PATHS
  // =====================================

  await test({
    id: "T34",
    name: "Valid update succeeds",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 200,
    body: makeValidUpdate(),
    tags: []
  });

  await test({
    id: "T35",
    name: "Integrity check endpoint",
    method: "GET",
    path: "/api/integrity-check42",
    expected: 204,
    tags: []
  });
  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});
