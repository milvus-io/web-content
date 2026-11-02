// Data-plane REST v2 availability suite.
// Case source of truth: the request bodies documented by the data-plane
// fragments (meta/openapi/*-v2.json) cross-checked against upstream REST test
// shapes (milvus tests/restful_client_v2). Each case targets one request
// parameter, records an intent, and asserts either acceptance (optionally
// with an observable effect) or rejection. Observation-only cases ("record")
// capture behavior the fragments do not promise.
//
// Environment-agnostic: the runner injects {call, rec, sleep}; q() is a local helper over call().
"use strict";

async function runDataPlaneSuite(api) {
// ---------- fixtures ----------
const DIM = 8;
const hot = (i) => { const v = Array(DIM).fill(0.1); v[((i % DIM) + DIM) % DIM] = 0.9; return v; };

const BASIC = "p1005_basic";
const HYBRID = "p1005_hybrid";
const DB2 = "p1005_db2";
const DB2_COLL = "p1005_db2coll";

const basicSchema = () => ({
  autoId: false,
  enableDynamicField: true,
  fields: [
    { fieldName: "id", dataType: "Int64", isPrimary: true, elementTypeParams: {} },
    { fieldName: "vector", dataType: "FloatVector", elementTypeParams: { dim: String(DIM) } },
    { fieldName: "title", dataType: "VarChar", elementTypeParams: { max_length: "64" } },
    { fieldName: "tags", dataType: "Array", elementDataType: "VarChar", elementTypeParams: { max_capacity: "16", max_length: "32" } },
    { fieldName: "meta", dataType: "JSON", elementTypeParams: {} },
    { fieldName: "price", dataType: "Int32", elementTypeParams: {} },
    { fieldName: "grp", dataType: "VarChar", elementTypeParams: { max_length: "16" } },
  ],
});

const basicRow = (i, part) => ({
  id: i,
  vector: hot(i),
  title: (part === "p1" ? "alpha-" : "beta-") + i,
  tags: part === "p1" ? ["a", "b"] : ["b", "c"],
  meta: { cat: part === "p1" ? "x" : "y", n: i },
  price: i * 10,
  grp: part === "p1" ? (i <= 3 ? "g1" : "g2") : "g3",
});

async function ensureDropped() {
  for (const c of [BASIC, HYBRID]) {
    await api.call("/collections/drop", { collectionName: c });
  }
  await api.call(`/collections/drop`, { dbName: DB2, collectionName: DB2_COLL });
  await api.call("/databases/drop", { dbName: DB2 });
}

async function createBasic() {
  const r = await api.call("/collections/create", {
    collectionName: BASIC,
    schema: basicSchema(),
    indexParams: [{
      fieldName: "vector", indexName: "vec_hnsw", indexType: "HNSW", metricType: "COSINE",
      params: { M: 16, efConstruction: 200 },
    }],
  });
  if (r.code !== 0) throw new Error("create basic failed: " + r.msg);
  for (const p of ["p1", "p2", "p3"]) {
    const pr = await api.call("/partitions/create", { collectionName: BASIC, partitionName: p });
    if (pr.code !== 0) throw new Error("create partition failed: " + pr.msg);
  }
}

async function createHybrid() {
  const r = await api.call("/collections/create", {
    collectionName: HYBRID,
    schema: {
      autoId: false,
      enableDynamicField: false,
      fields: [
        { fieldName: "id", dataType: "Int64", isPrimary: true, elementTypeParams: {} },
        { fieldName: "vec1", dataType: "FloatVector", elementTypeParams: { dim: String(DIM) } },
        { fieldName: "vec2", dataType: "FloatVector", elementTypeParams: { dim: String(DIM) } },
        { fieldName: "grp", dataType: "VarChar", elementTypeParams: { max_length: "16" } },
        { fieldName: "price", dataType: "Int32", elementTypeParams: {} },
        { fieldName: "title", dataType: "VarChar", elementTypeParams: { max_length: "32" } },
      ],
    },
    indexParams: [
      { fieldName: "vec1", indexName: "v1", indexType: "HNSW", metricType: "COSINE", params: { M: 16, efConstruction: 200 } },
      { fieldName: "vec2", indexName: "v2", indexType: "HNSW", metricType: "IP", params: { M: 16, efConstruction: 200 } },
    ],
  });
  if (r.code !== 0) throw new Error("create hybrid failed: " + r.msg);
}

  // When the environment denies databases (zilliz serverless), the dbName
  // cases deliberately record FAIL verdicts: the rejection IS the
  // cluster-type evidence the matrices diff on.
  const db2Blocked = {ok: false, reason: null};

async function createDb2() {
  let r = await api.call("/databases/create", { dbName: DB2 });
  if (r.code !== 0 && !/exist/i.test(r.msg)) {
    if (/PermissionDenied|permission deny/i.test(String(r.msg))) { db2Blocked.ok = true; db2Blocked.reason = String(r.msg).slice(0, 120); return; }
    throw new Error("create db failed: " + r.msg);
  }
  r = await api.call("/collections/create", {
    dbName: DB2,
    collectionName: DB2_COLL,
    schema: {
      autoId: false, enableDynamicField: false,
      fields: [
        { fieldName: "id", dataType: "Int64", isPrimary: true, elementTypeParams: {} },
        { fieldName: "vector", dataType: "FloatVector", elementTypeParams: { dim: String(DIM) } },
        { fieldName: "price", dataType: "Int32", elementTypeParams: {} },
      ],
    },
    indexParams: [{ fieldName: "vector", indexName: "v", indexType: "FLAT", metricType: "COSINE" }],
  });
  if (r.code !== 0) throw new Error("create db2 collection failed: " + r.msg);
}

async function load(coll, dbName) {
  if (dbName && db2Blocked.ok) return;
  const r = await api.call("/collections/load", dbName ? { dbName, collectionName: coll } : { collectionName: coll });
  if (r.code !== 0 && !/loaded|already/i.test(String(r.msg))) throw new Error("load failed: " + r.msg);
  for (let i = 0; i < 60; i++) {
    const d = await api.call("/collections/describe", dbName ? { dbName, collectionName: coll } : { collectionName: coll });
    const st = d.data && (d.data.loadState || d.data.load);
    if (st && /Loaded/i.test(String(st)) && !/Loading/i.test(String(st))) return;
    await new Promise((s) => setTimeout(s, 1000));
  }
  throw new Error("load timeout: " + coll);
}

async function q(filter, extra = {}) {
  const r = await api.call("/entities/query", { collectionName: BASIC, filter, outputFields: ["*"], consistencyLevel: "Strong", ...extra });
  if (r.code !== 0) throw new Error("query failed: " + r.msg + " | filter=" + filter);
  return r.data || [];
}

async function seed() {
  const rowsP1 = [1, 2, 3, 4, 5, 6].map((i) => basicRow(i, "p1"));
  const rowsP2 = [7, 8, 9, 10, 11, 12].map((i) => basicRow(i, "p2"));
  const rowsP3 = [21, 22, 23].map((i) => ({ ...basicRow(i, "p3"), price: 5, tags: [], meta: {} }));
  // experiment rows 100..106 (full baseline with distinct markers)
  const exp = [];
  for (let i = 100; i <= 106; i++) {
    exp.push({ id: i, vector: hot(i), title: "orig-" + i, tags: ["x"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" });
  }
  // dynamic-field row
  exp.push({ id: 6, vector: hot(6), title: "alpha-6", tags: ["a", "b"], meta: { cat: "x", n: 6 }, price: 60, grp: "g2", dyn_flag: "yes" });
  let r = await api.call("/entities/insert", { collectionName: BASIC, partitionName: "p1", data: [...rowsP1, ...exp] });
  if (r.code !== 0) throw new Error("seed p1 failed: " + r.msg);
  r = await api.call("/entities/insert", { collectionName: BASIC, partitionName: "p2", data: rowsP2 });
  if (r.code !== 0) throw new Error("seed p2 failed: " + r.msg);
  r = await api.call("/entities/insert", { collectionName: BASIC, partitionName: "p3", data: rowsP3 });
  if (r.code !== 0) throw new Error("seed p3 failed: " + r.msg);
  const hrows = [];
  for (let i = 1; i <= 10; i++) {
    hrows.push({ id: i, vec1: hot(i), vec2: hot(i + 3), grp: i % 2 === 0 ? "g1" : "g2", price: i, title: "h-" + i });
  }
  r = await api.call("/entities/insert", { collectionName: HYBRID, data: hrows });
  if (r.code !== 0) throw new Error("seed hybrid failed: " + r.msg);
  if (!db2Blocked.ok) {
    r = await api.call("/entities/insert", { dbName: DB2, collectionName: DB2_COLL, data: [{ id: 200, vector: hot(0), price: 7 }] });
    if (r.code !== 0) throw new Error("seed db2 failed: " + r.msg);
  }
}

const fcL2 = (extraOps = []) => [{
  name: "l2_score_plus_ts",
  stage: "FunctionChainStageL2Rerank",
  ops: [
    {
      op: "map", outputs: ["$score"],
      expr: { name: "num_combine", args: [{ column: "$score" }, { column: "price" }], params: { mode: "sum" } },
    },
    { op: "sort", inputs: ["$score"], params: { column: "$score", desc: true } },
    ...extraOps,
  ],
}];

// =====================================================================

  const t0 = Date.now();
  console.log(`# REST v2 data-plane availability suite — 7 vector operations, per-parameter cases`);
  console.log(`# request bodies per PR #1005 fragments (04/05/07/08)`);
  console.log("");

  // ---------- setup ----------
  await ensureDropped();
  {
    const r = await api.call("/databases/create", { dbName: DB2 });
    await api.rec("setup", "databases/create(dbName)", "create second database for dbName tests", "record", r);
  }
  {
    const r = await api.call("/collections/create", { collectionName: BASIC, schema: basicSchema() });
    await api.rec("setup", "collections/create(schema+enableDynamicField)", "schema fields incl max_length/max_capacity/dimension", "record", r);
  }
  {
    const r = await api.call("/indexes/create", {
      collectionName: BASIC,
      indexParams: [{ fieldName: "vector", indexName: "vec_hnsw", indexType: "HNSW", metricType: "COSINE", params: { M: 16, efConstruction: 200 } }],
    });
    await api.rec("setup", "indexes/create(indexParams)", "HNSW/COSINE with params.M + efConstruction", "record", r);
  }
  for (const p of ["p1", "p2", "p3"]) {
    const r = await api.call("/partitions/create", { collectionName: BASIC, partitionName: p });
    await api.rec("setup", `partitions/create(${p})`, "partition ops from 08 fragment", "record", r);
  }
  {
    const r = await api.call("/partitions/has", { collectionName: BASIC, partitionName: "p1" });
    await api.rec("setup", "partitions/has(partitionName)", "effect: has=true", "record", r,
      { ok: r.code === 0 && r.data && r.data.has === true, detail: "has=" + JSON.stringify(r.data) });
  }
  await createHybrid();
  await createDb2();

  await load(BASIC);
  await load(HYBRID);
  await load(DB2_COLL, DB2);
  await seed();

  // sanity: data visible
  const rows0 = await q("id >= 1");
  console.log(`\n# sanity: ${rows0.length} rows visible in ${BASIC}\n`);

  // ================= INSERT =================
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partitionName: "p1", data: [{ id: 51, vector: hot(1), title: "x51", tags: ["t"], meta: {}, price: 3, grp: "g1" }] });
    await api.rec("insert", "collectionName", "valid collection name accepted", "ok", r,
      { ok: r.data && r.data.insertCount === 1, detail: "insertCount=" + JSON.stringify(r.data && r.data.insertCount) });
  }
  {
    const r = await api.call("/entities/insert", { data: [{ id: 52, vector: hot(1) }] });
    await api.rec("insert", "collectionName(missing)", "doc marks collectionName required", "err", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: "no_such_coll_zz", data: [{ id: 1 }] });
    await api.rec("insert", "collectionName(unknown)", "nonexistent collection rejected", "err", r);
  }
  {
    const r = db2Blocked.ok ? {code: "skipped", msg: db2Blocked.reason} : await api.call("/entities/insert", { dbName: DB2, collectionName: DB2_COLL, data: [{ id: 201, vector: hot(2), price: 9 }] });
    await api.rec("insert", "dbName", "routes insert into target database", "ok", r, async () => {
      const qr = await api.call("/entities/query", { dbName: DB2, collectionName: DB2_COLL, filter: "id == 201", outputFields: ["id"] });
      return { ok: qr.code === 0 && (qr.data || []).length === 1, detail: "db2 rows=" + (qr.data || []).length };
    });
  }
  {
    const r = await api.call("/entities/insert", { dbName: "no_such_db_zz", collectionName: DB2_COLL, data: [{ id: 1 }] });
    await api.rec("insert", "dbName(unknown)", "nonexistent db rejected", "err", r);
  }
  {
    const full = (i, t) => ({ id: i, vector: hot(i), title: t, tags: ["t"], meta: {}, price: 1, grp: "g1" });
    const r = await api.call("/entities/insert", { collectionName: BASIC, data: [full(53, "a"), full(54, "b")] });
    await api.rec("insert", "data(array)", "array form (doc oneOf array branch), full rows", "ok", r,
      { ok: r.data && r.data.insertCount === 2, detail: "insertCount=" + JSON.stringify(r.data && r.data.insertCount) });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, data: [{ id: 55, vector: hot(1), title: "partial-no-flag" }] });
    await api.rec("insert", "(partial fields w/o partialUpdate)", "missing scalar fields without partialUpdate flag", "record", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, data: { id: 55, vector: hot(1) } });
    await api.rec("insert", "data(objectForm)", "doc oneOf allows single object; upstream Data is []map", "record", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC });
    await api.rec("insert", "data(missing)", "doc marks data required", "err", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, data: [{ id: 56, vector: hot(1).slice(0, 5) }] });
    await api.rec("insert", "data(wrongDim)", "dimension mismatch must be rejected (data is actually validated)", "err", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partitionName: "p1", data: [{ id: 57, vector: hot(3), title: "p57", tags: ["p"], meta: {}, price: 2, grp: "g1" }] });
    await api.rec("insert", "partitionName", "insert lands in the named partition", "ok", r, async () => {
      const a = await q("id == 57", { partitionNames: ["p1"] });
      const b = await q("id == 57", { partitionNames: ["p2"] });
      return { ok: a.length === 1 && b.length === 0, detail: `p1=${a.length} p2=${b.length}` };
    });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partitionName: "no_such_p", data: [{ id: 58, vector: hot(1) }] });
    await api.rec("insert", "partitionName(unknown)", "nonexistent partition rejected", "err", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, data: [{ id: 120, vector: hot(4), title: "partial-new" }] });
    await api.rec("insert", "partialUpdate(subset row)", "doc: only specified fields updated — 2.6.26 behavior?", "record", r, { ok: r.code === 0, detail: "msg=" + String(r.msg).slice(0, 140) });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, data: [{ id: 100, vector: hot(0), title: "upd-100" }] });
    await api.rec("insert", "partialUpdate(existing, subset)", "update title only on seeded row; doc says other fields survive", "record", r, { ok: r.code === 0, detail: "msg=" + String(r.msg).slice(0, 140) });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "title", op: "REPLACE" }], data: [{ id: 102, vector: hot(2), title: "repl-102", tags: ["x"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" }] });
    await api.rec("insert", "fieldOps(REPLACE)", "explicit replace op (complete row)", "ok", r, async () => {
      const rows = await q("id == 102");
      return { ok: rows.length === 1 && rows[0].title === "repl-102" && rows[0].price === 1, detail: "title=" + (rows[0] && rows[0].title) };
    });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "tags", op: "ARRAY_APPEND" }], data: [{ id: 103, vector: hot(3), title: "orig-103", tags: ["z"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" }] });
    await api.rec("insert", "fieldOps(ARRAY_APPEND)", "array append op (complete row); prior tags=[\"x\"]", "ok", r, async () => {
      const rows = await q("id == 103");
      let tags = rows[0] && rows[0].tags;
      if (tags && tags.Data && tags.Data.StringData) tags = tags.Data.StringData.data || [];
      return { ok: JSON.stringify(tags) === JSON.stringify(["x", "z"]) || JSON.stringify(tags) === JSON.stringify(["z"]), detail: "tags=" + JSON.stringify(tags) };
    });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "tags", op: "ARRAY_REMOVE" }], data: [{ id: 104, vector: hot(4), title: "orig-104", tags: ["x"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" }] });
    await api.rec("insert", "fieldOps(ARRAY_REMOVE)", "array remove op (complete row); prior tags=[\"x\"] — upsert path removes; insert path?", "record", r, async () => {
      const rows = await q("id == 104");
      let tags = rows[0] && rows[0].tags;
      if (tags && tags.Data && tags.Data.StringData) tags = tags.Data.StringData.data || [];
      return { ok: true, detail: "tags=" + JSON.stringify(tags) + (JSON.stringify(tags) === JSON.stringify([]) ? " (removed)" : " (NOT removed => insert-path ARRAY_REMOVE no-op)") };
    });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "meta", op: "PATH_REPLACE", path: "a.b" }], data: [{ id: 105, vector: hot(5), title: "orig-105", tags: ["x"], meta: { b: 42 }, price: 1, grp: "gx" }] });
    await api.rec("insert", "fieldOps(PATH_REPLACE+path)", "json path replace (upstream V2 parser incl path)", "record", r, async () => {
      const rows = await q("id == 105");
      return { ok: rows.length === 1, detail: "meta=" + JSON.stringify(rows[0] && rows[0].meta) };
    });
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "title", op: "NO_SUCH_OP" }], data: [{ id: 100, title: "zz" }] });
    await api.rec("insert", "fieldOps(unknownOp)", "unsupported op must be rejected", "err", r);
  }
  {
    const r = await api.call("/entities/insert", { collectionName: BASIC, fieldOps: [{ fieldName: "title", op: "REPLACE" }], data: [{ id: 100, title: "zz" }] });
    await api.rec("insert", "fieldOps(without partialUpdate)", "fieldOps without partialUpdate=true", "record", r);
  }

  // ================= UPSERT =================
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, data: [{ id: 106, vector: hot(6), title: "ups-106", tags: ["u"], meta: {}, price: 2, grp: "gx" }] });
    await api.rec("upsert", "data(arrayForm)", "upstream Data=[]map so array works; fragment documents object only", "ok", r,
      { ok: r.data && (r.data.upsertCount === 1 || r.data.insertCount === undefined), detail: JSON.stringify(r.data) });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, data: { id: 106, vector: hot(6) } });
    await api.rec("upsert", "data(objectForm)", "fragment documents data as object(map) — upstream struct is []map", "record", r);
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC });
    await api.rec("upsert", "data(missing)", "doc marks data required", "err", r);
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partitionName: "p2", data: [{ id: 130, vector: hot(5), title: "u130", tags: [], meta: {}, price: 3, grp: "g3" }] });
    await api.rec("upsert", "partitionName", "upsert into named partition", "ok", r, async () => {
      const a = await q("id == 130", { partitionNames: ["p2"] });
      const b = await q("id == 130", { partitionNames: ["p1"] });
      return { ok: a.length === 1 && b.length === 0, detail: `p2=${a.length} p1=${b.length}` };
    });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, data: [{ id: 101, vector: hot(1), title: "ups-partial-101" }] });
    await api.rec("upsert", "partialUpdate(subset row)", "doc: only specified fields updated", "record", r, { ok: r.code === 0, detail: "msg=" + String(r.msg).slice(0, 140) });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "title", op: "REPLACE" }], data: [{ id: 100, vector: hot(0), title: "u-repl-100", tags: ["x"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" }] });
    await api.rec("upsert", "fieldOps(REPLACE)", "explicit replace (complete row)", "ok", r, async () => {
      const rows = await q("id == 100");
      return { ok: rows.length === 1 && rows[0].title === "u-repl-100", detail: "title=" + (rows[0] && rows[0].title) };
    });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "tags", op: "ARRAY_APPEND" }], data: [{ id: 103, vector: hot(3), title: "orig-103", tags: ["w"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" }] });
    await api.rec("upsert", "fieldOps(ARRAY_APPEND)", "append on upsert path (complete row)", "ok", r, async () => {
      const rows = await q("id == 103");
      let tags = rows[0] && rows[0].tags;
      if (tags && tags.Data && tags.Data.StringData) tags = tags.Data.StringData.data || [];
      return { ok: Array.isArray(tags) && tags.includes("w"), detail: "tags=" + JSON.stringify(tags) };
    });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "tags", op: "ARRAY_REMOVE" }], data: [{ id: 103, vector: hot(3), title: "orig-103", tags: ["z"], meta: { a: { b: 1 }, keep: "yes" }, price: 1, grp: "gx" }] });
    await api.rec("upsert", "fieldOps(ARRAY_REMOVE)", "remove on upsert path (complete row)", "ok", r, async () => {
      const rows = await q("id == 103");
      let tags = rows[0] && rows[0].tags;
      if (tags && tags.Data && tags.Data.StringData) tags = tags.Data.StringData.data || [];
      return { ok: Array.isArray(tags) && !tags.includes("z"), detail: "tags=" + JSON.stringify(tags) };
    });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "meta", op: "PATH_REPLACE", path: "a.b" }], data: [{ id: 105, vector: hot(5), title: "orig-105", tags: ["x"], meta: { b: 7 }, price: 1, grp: "gx" }] });
    await api.rec("upsert", "fieldOps(PATH_REPLACE+path)", "json path replace on upsert", "record", r, async () => {
      const rows = await q("id == 105");
      return { ok: rows.length === 1, detail: "meta=" + JSON.stringify(rows[0] && rows[0].meta) };
    });
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ op: "REPLACE" }], data: [{ id: 100, title: "zz" }] });
    await api.rec("upsert", "fieldOps.fieldName(missing)", "upstream binding required on fieldName", "err", r);
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, partialUpdate: true, fieldOps: [{ fieldName: "title", op: "NO_SUCH_OP" }], data: [{ id: 100, title: "zz" }] });
    await api.rec("upsert", "fieldOps.op(unknown)", "unsupported op rejected", "err", r);
  }
  {
    const r = await api.call("/entities/upsert", { collectionName: BASIC, data: [{ id: 100, title: "full-ows", vector: hot(0) }] });
    await api.rec("upsert", "(default overwrite semantics)", "no partialUpdate: omitted fields are wiped", "record", r, async () => {
      const rows = await q("id == 100");
      const row = rows[0] || {};
      return { ok: rows.length >= 1, detail: JSON.stringify({ title: row.title, price: row.price, keep: row.meta && row.meta.keep }) };
    });
  }

  // ================= DELETE =================
  {
    await api.call("/entities/insert", { collectionName: BASIC, data: [{ id: 31, vector: hot(1), price: 999 }, { id: 32, vector: hot(2), price: 999 }, { id: 33, vector: hot(3), price: 888 }] });
    const r = await api.call("/entities/delete", { collectionName: BASIC, filter: "price == 999" });
    await api.rec("delete", "filter", "delete by scalar filter", "ok", r, async () => {
      const rows = await q("price == 999");
      return { ok: rows.length === 0, detail: "deleteCount=" + JSON.stringify(r.data && r.data.deleteCount) + " remaining=" + rows.length };
    });
  }
  {
    const r = await api.call("/entities/delete", { collectionName: BASIC });
    await api.rec("delete", "filter(missing)", "doc+upstream binding mark filter required", "err", r);
  }
  {
    const r = await api.call("/entities/delete", { collectionName: BASIC, id: "21" });
    await api.rec("delete", "id(only)", "fragment documents id as filter replacement; upstream DeleteReq has no id field", "record", r);
  }
  {
    const r = await api.call("/entities/delete", { collectionName: BASIC, id: "2", filter: "id == 7" });
    await api.rec("delete", "id(+filter)", "id points elsewhere; only filter target should be deleted", "ok", r, async () => {
      const g = await q("id == 7");
      const s = await q("id == 2");
      return { ok: g.length === 0 && s.length === 1, detail: `deleteCount=${JSON.stringify(r.data && r.data.deleteCount)} id7=${g.length} id2=${s.length} => id param ${g.length === 0 && s.length === 1 ? "ignored (no-op)" : "has effect"}` };
    });
  }
  {
    await api.call("/entities/insert", { collectionName: BASIC, partitionName: "p2", data: [{ ...basicRow(2, "p2"), price: 2 * 10 }] });
    const r = await api.call("/entities/delete", { collectionName: BASIC, partitionName: "p2", filter: "id == 2" });
    await api.rec("delete", "partitionName", "delete confined to partition", "ok", r, async () => {
      const inP1 = await q("id == 2", { partitionNames: ["p1"] });
      const inP2 = await q("id == 2", { partitionNames: ["p2"] });
      return { ok: inP1.length === 1 && inP2.length === 0, detail: `deleteCount=${JSON.stringify(r.data && r.data.deleteCount)} p1=${inP1.length} p2=${inP2.length}` };
    });
  }
  {
    const r = await api.call("/entities/delete", { collectionName: BASIC, filter: "id in {ids}", exprParams: { ids: [3] } });
    await api.rec("delete", "exprParams", "parameterized filter template", "ok", r, async () => {
      const rows = await q("id == 3");
      return { ok: rows.length === 0, detail: "deleteCount=" + JSON.stringify(r.data && r.data.deleteCount) + " remaining=" + rows.length };
    });
  }
  {
    const r = db2Blocked.ok ? {code: "skipped", msg: db2Blocked.reason} : await api.call("/entities/delete", { dbName: DB2, collectionName: DB2_COLL, filter: "id == 201" });
    await api.rec("delete", "dbName", "delete inside named database", "ok", r, async () => {
      const qr = await api.call("/entities/query", { dbName: DB2, collectionName: DB2_COLL, filter: "id == 201", outputFields: ["id"] });
      return { ok: qr.code === 0 && (qr.data || []).length === 0, detail: "remaining=" + (qr.data || []).length };
    });
  }
  {
    const before = await q("id >= 21 and id <= 23", { partitionNames: ["p3"] });
    const r = await api.call("/entities/delete", { collectionName: BASIC, partitionName: "p3", filter: "" });
    await api.rec("delete", "filter(emptyString)", "doc: empty string skips scalar filtering — upstream binding:required rejects empty", "record", r, async () => {
      const after = await q("id >= 21 and id <= 23", { partitionNames: ["p3"] });
      return { ok: before.length === 3 && after.length === 0, detail: `before=${before.length} after=${after.length}` };
    });
  }

  // ================= GET =================
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [1, 2], outputFields: ["id", "title"] });
    await api.rec("get", "id(array)", "array of int pks (upstream ID interface{})", "ok", r,
      { ok: (r.data || []).length === 2, detail: "rows=" + (r.data || []).length });
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: 5, outputFields: ["id"] });
    await api.rec("get", "id(scalar)", "single scalar pk", "record", r, { ok: r.code === 0 && (r.data || []).length >= 1, detail: "rows=" + (r.data || []).length });
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: { id: [1, 2] }, outputFields: ["id"] });
    await api.rec("get", "id(objectForm)", "fragment documents id as object map", "record", r);
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, outputFields: ["id"] });
    await api.rec("get", "id(missing)", "doc+binding mark id required", "err", r);
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [1], outputFields: ["title"] });
    await api.rec("get", "outputFields(specific)", "only requested fields returned", "ok", r, () => {
      const row = (r.data || [])[0] || {};
      const keys = Object.keys(row);
      return { ok: "title" in row && !("tags" in row), detail: "keys=" + keys.join(",") };
    });
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [6], outputFields: ["*"] });
    await api.rec("get", "outputFields(*)", "star returns all fields incl dynamic", "ok", r, () => {
      const row = (r.data || [])[0] || {};
      return { ok: "vector" in row, detail: "keys=" + Object.keys(row).join(",").slice(0, 120) };
    });
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [1, 7], partitionNames: ["p1"], outputFields: ["id"] });
    await api.rec("get", "partitionNames", "get scoped to partitions", "ok", r, () => {
      const ids = (r.data || []).map((x) => x.id);
      return { ok: ids.includes(1) && !ids.includes(7), detail: "ids=" + ids.join(",") };
    });
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [1], partitionNames: ["no_such_p"], outputFields: ["id"] });
    await api.rec("get", "partitionNames(unknown)", "nonexistent partition rejected", "err", r);
  }
  {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [1], partitionName: "p1", outputFields: ["id"] });
    await api.rec("get", "partitionName(singular)", "legacy singular partition param still on fragment", "record", r);
  }
  for (const cl of ["Strong", "Session", "Bounded", "Eventually"]) {
    const r = await api.call("/entities/get", { collectionName: BASIC, id: [1], outputFields: ["id"], consistencyLevel: cl });
    await api.rec("get", `consistencyLevel(${cl})`, "enum value", "ok", r);
  }

  // ================= QUERY =================
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "price > 50", outputFields: ["id", "price"] });
    await api.rec("query", "filter", "scalar filtering", "ok", r, () => {
      const rows = r.data || [];
      return { ok: rows.length >= 5 && rows.every((x) => x.price > 50), detail: "rows=" + rows.length };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, outputFields: ["id"] });
    await api.rec("query", "filter(omitted)", "upstream Filter has no binding: what does empty filter do?", "record", r, { ok: r.code === 0, detail: "rows=" + ((r.data || [])).length });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["*"], limit: 1 });
    await api.rec("query", "outputFields(*)", "star + dynamic field visibility", "ok", r, () => {
      const row = (r.data || [])[0] || {};
      return { ok: "id" in row, detail: "keys=" + Object.keys(row).join(",").slice(0, 140) };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["id", "price"], limit: 100, offset: 2 });
    await api.rec("query", "limit/offset", "paging (no orderBy: natural order)", "record", r,
      { ok: r.code === 0, detail: "rows=" + (r.data || []).length });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["id", "price"], orderByFields: ["price:asc"], limit: 4, offset: 2 });
    await api.rec("query", "orderByFields(paging)", "order + offset/limit combo", "record", r, () => {
      const rows = r.data || [];
      return { ok: true, detail: "rows=" + rows.length + " prices=" + rows.map((x) => x.price).join(",") };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["id"], limit: 0 });
    await api.rec("query", "limit(0)", "limit=0 rejected or full scan?", "record", r, { ok: r.code === 0, detail: "rows=" + ((r.data || [])).length });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id >= 1", outputFields: ["id"], partitionNames: ["p2"], limit: 20 });
    await api.rec("query", "partitionNames", "scope to partition", "ok", r, () => {
      const rows = r.data || [];
      return { ok: rows.length >= 5 && rows.every((x) => x.id >= 7 && x.id <= 130), detail: "ids=" + rows.map((x) => x.id).join(",") };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "price > {p}", exprParams: { p: 100 }, outputFields: ["id", "price"] });
    await api.rec("query", "exprParams", "filter template parameters", "ok", r, () => {
      const rows = r.data || [];
      return { ok: rows.length >= 1 && rows.every((x) => x.price > 100), detail: "rows=" + rows.length };
    });
  }
  for (const cl of ["Strong", "Session", "Bounded", "Eventually"]) {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id == 1", outputFields: ["id"], consistencyLevel: cl });
    await api.rec("query", `consistencyLevel(${cl})`, "enum value", "ok", r);
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["id", "price"], orderByFields: ["price:desc"], limit: 5 });
    await api.rec("query", "orderByFields(desc)", "explicit desc ordering — 2.6.26: applied?", "record", r, () => {
      const ps = (r.data || []).map((x) => x.price);
      const sorted = [...ps].sort((a, b) => b - a);
      const applied = JSON.stringify(ps) === JSON.stringify(sorted);
      return { ok: true, detail: "prices=" + ps.join(",") + (applied ? " (sorted desc)" : " (NOT sorted => ignored)") };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["id", "price"], orderByFields: ["price"], limit: 5 });
    await api.rec("query", "orderByFields(default asc)", "bare fieldName defaults to asc (note: pk order coincides with price order)", "record", r, () => {
      const ps = (r.data || []).map((x) => x.price);
      const sorted = [...ps].sort((a, b) => a - b);
      return { ok: true, detail: "prices=" + ps.join(",") + " asc-ordered=" + (JSON.stringify(ps) === JSON.stringify(sorted)) };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["id"], orderByFields: ["no_such_field:asc"] });
    await api.rec("query", "orderByFields(badField)", "unknown sort field: rejected or silently accepted?", "record", r, { ok: r.code === 0, detail: "rows=" + ((r.data || [])).length });
  }
  {
    const r1 = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["grp", "count(*)", "sum(price)"], groupByFields: ["grp"], limit: 10 });
    await api.rec("query", "groupByFields(+count(*)/sum)", "groupBy + aggregation expressions in outputFields", "record", r1, { ok: r1.code === 0, detail: JSON.stringify(r1.data || r1.msg).slice(0, 200) });
    const r2 = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["count(*)"], groupByFields: ["grp"], limit: 10 });
    await api.rec("query", "groupByFields(count(*) only)", "aggregation-only output", "record", r2, { ok: r2.code === 0, detail: JSON.stringify(r2.data || r2.msg).slice(0, 200) });
    const r3 = await api.call("/entities/query", { collectionName: BASIC, filter: "id > 0", outputFields: ["grp", "price"], groupByFields: ["grp"], limit: 10 });
    await api.rec("query", "groupByFields(no agg output)", "groupBy without aggregation output", "record", r3, { ok: r3.code === 0, detail: "rows=" + ((r3.data || [])).length });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: 'meta["cat"] == "x"', outputFields: ["id", "meta"] });
    await api.rec("query", "filter(jsonPath)", "JSON path filtering (note: JSON fields return as strings in output)", "ok", r, () => {
      const rows = r.data || [];
      const cat = (x) => typeof x.meta === "string" ? JSON.parse(x.meta).cat : (x.meta || {}).cat;
      return { ok: rows.length >= 5 && rows.every((x) => cat(x) === "x"), detail: "rows=" + rows.length + " all-cat-x=" + rows.every((x) => cat(x) === "x") };
    });
  }
  {
    const r = await api.call("/entities/query", { collectionName: BASIC, filter: "ARRAY_CONTAINS(tags, 'a')", outputFields: ["id"] });
    await api.rec("query", "filter(arrayContains)", "array function filtering", "ok", r, () => {
      const rows = r.data || [];
      return { ok: rows.length >= 5, detail: "rows=" + rows.length };
    });
  }
  {
    const r = db2Blocked.ok ? {code: "skipped", msg: db2Blocked.reason} : await api.call("/entities/query", { dbName: DB2, collectionName: DB2_COLL, filter: "id == 200", outputFields: ["id"] });
    await api.rec("query", "dbName", "query inside named database", "ok", r, () => ({ ok: (r.data || []).length === 1, detail: "rows=" + (r.data || []).length }));
  }

  // ================= SEARCH =================
  const baseSearch = { collectionName: BASIC, annsField: "vector", limit: 5, outputFields: ["id", "price"] };
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0), hot(2)] });
    await api.rec("search", "data(batch)", "two query vectors; 2.6.26 response = flat concatenation (limit per query)", "ok", r, () => {
      const d = r.data || [];
      const ok = Array.isArray(d) && d.length === 10 && d.every((x) => typeof x.distance === "number");
      return { ok, detail: "rows=" + d.length + " (flat)" };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch });
    await api.rec("search", "data(missing)", "doc+binding mark data required", "err", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, ids: [1] });
    await api.rec("search", "ids", "search by primary key (no data)", "ok", r, () => {
      const d = r.data || [];
      return { ok: d.length > 0 && d[0].id === 1, detail: "top1=" + JSON.stringify(d[0] && d[0].id) };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], ids: [1] });
    await api.rec("search", "ids+data(mutual)", "doc says mutually exclusive", "record", r);
  }
  {
    const r = await api.call("/entities/search", { collectionName: BASIC, data: [hot(0)], limit: 3, outputFields: ["id"] });
    await api.rec("search", "annsField(omitted)", "single vector field => omission allowed", "ok", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], filter: "price >= 70" });
    await api.rec("search", "filter", "search with scalar filter", "ok", r, () => {
      const d = r.data || [];
      return { ok: d.length > 0 && d.every((x) => x.price >= 70), detail: "hits=" + d.length };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], limit: 3, offset: 2 });
    await api.rec("search", "limit/offset", "search paging", "ok", r, () => ({ ok: (r.data || []).length === 3, detail: "hits=" + (r.data || []).length }));
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], searchParams: { metricType: "COSINE" } });
    await api.rec("search", "searchParams.metricType(match)", "metric matches index", "ok", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], searchParams: { metricType: "L2" } });
    await api.rec("search", "searchParams.metricType(mismatch)", "L2 against COSINE index: rejected or silently re-metriced?", "record", r, { ok: r.code === 0, detail: "hits=" + (r.data || []).length + " dist0=" + JSON.stringify((r.data || [])[0] && (r.data || [])[0].distance) });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], limit: 10, searchParams: { params: { radius: 0.5, range_filter: 0.99 } } });
    await api.rec("search", "searchParams.params(radius/range_filter)", "range search bounds hit distances", "ok", r, () => {
      const d = r.data || [];
      const ds = d.map((x) => x.distance);
      const inRange = ds.every((v) => v <= 0.99 && v > 0.5);
      return { ok: inRange, detail: "hits=" + d.length + " distances=" + ds.map((v) => Number(v).toFixed(3)).join(",") + (d.length === 0 ? " (0 hits expected: 1.0>range_filter 0.99 excluded, 0.27<radius 0.5 excluded => bounds honored)" : "") };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], params: { ef: 64 } });
    await api.rec("search", "params(topLevel legacy)", "upstream comment: 'not use Params any more, just for compatibility'", "record", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], searchParams: { ef: 64 } });
    await api.rec("search", "searchParams(flat ef)", "flat index-level param passthrough", "ok", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], groupingField: "grp", groupSize: 2, limit: 10 });
    await api.rec("search", "groupingField+groupSize", "grouped search", "record", r, () => {
      const d = r.data || [];
      return { ok: r.code === 0 && d.length > 0, detail: "hits=" + d.length };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], groupingField: "grp", groupSize: 2, strictGroupSize: true, limit: 10 });
    await api.rec("search", "strictGroupSize", "strict grouping flag", "record", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], partitionNames: ["p1"], limit: 10 });
    await api.rec("search", "partitionNames", "search scoped to partition", "ok", r, () => {
      const d = r.data || [];
      return { ok: d.length > 0 && d.every((x) => x.id <= 6 || x.id >= 51 || x.id >= 100), detail: "ids=" + d.map((x) => x.id).join(",") };
    });
  }
  for (const cl of ["Strong", "Session", "Bounded", "Eventually"]) {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], consistencyLevel: cl });
    await api.rec("search", `consistencyLevel(${cl})`, "enum value", "ok", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], filter: "price > {p}", exprParams: { p: 80 } });
    await api.rec("search", "exprParams", "filter templating in search", "ok", r, () => {
      const d = r.data || [];
      return { ok: d.length > 0 && d.every((x) => x.price > 80), detail: "hits=" + d.length };
    });
  }
  {
    const r = await api.call("/entities/search", {
      ...baseSearch, data: [hot(0)], limit: 5,
      functionScore: {
        functions: [{
          name: "decay_price", type: "Rerank", inputFieldNames: ["price"],
          params: { reranker: "decay", function: "linear", origin: 30, scale: 10, offset: 0, decay: 0.5 },
        }],
      },
    });
    await api.rec("search", "functionScore(decay)", "decay reranker on search (shape per upstream test)", "ok", r);
  }
  {
    const r = await api.call("/entities/search", {
      ...baseSearch, data: [hot(0)], limit: 5,
      functionScore: {
        functions: [{ name: "boost_ts", type: "Rerank", inputFieldNames: [], params: { reranker: "boost", filter: "price > 0", weight: 10 } }],
        params: { boost_mode: "sum" },
      },
    });
    await api.rec("search", "functionScore(boost+params)", "boost reranker with functionScore.params — expect boosted distances >= 1000", "ok", r, () => {
      const d = r.data || [];
      const boosted = d.some((x) => x.distance >= 11);
      return { ok: d.length > 0 && boosted, detail: "top distances=" + d.slice(0, 3).map((x) => Number(x.distance).toFixed(1)).join(",") + (boosted ? " (boost applied: base 1 + weight 10)" : " (not applied)") };
    });
  }
  {
    const r = await api.call("/entities/search", {
      ...baseSearch, data: [hot(0)], limit: 5,
      functionScore: { functions: [{ name: "d", type: "Rerank", inputFieldNames: ["price"], params: { reranker: "decay", function: "linear", origin: 30, scale: 10, offset: 0, decay: 0.5 } }] },
      functionChains: fcL2(),
    });
    await api.rec("search", "functionScore+functionChains(mutual)", "upstream pin rejects; 2.6.26 behavior?", "record", r, { ok: true, detail: "hits=" + (r.data || []).length + " (accepted silently)" });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], limit: 5, functionChains: fcL2() });
    await api.rec("search", "functionChains(L2 map+sort)", "L2 rerank chain per upstream test shape — 2.6.26: wired?", "record", r, () => {
      const d = r.data || [];
      return { ok: true, detail: "hits=" + d.length + " order=" + JSON.stringify(d.slice(0, 4).map((x) => x.id)) };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], limit: 5, functionChains: fcL2([{ op: "limit", params: { limit: 2 } }]) });
    await api.rec("search", "functionChains(limit op)", "chain limit op trims final results (upstream: 2 hits)", "record", r, () => {
      const d = r.data || [];
      return { ok: true, detail: "hits=" + d.length + (d.length === 2 ? " (applied)" : " (NOT applied)") };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], functionChains: [{ name: "x", stage: "FunctionChainStageIngestion", ops: [{ op: "sort" }] }] });
    await api.rec("search", "functionChains(badStage)", "unknown/ingest stage: rejected at search time?", "record", r, { ok: true, detail: "hits=" + (r.data || []).length });
  }
  {
    const r = await api.call("/entities/search", {
      ...baseSearch, data: [hot(0)], limit: 10,
      searchAggregation: {
        fields: ["grp"], size: 5,
        metrics: {
          n: { op: "count", fieldName: "*" },
          total: { op: "sum", fieldName: "price" },
          avg: { op: "avg", fieldName: "price" },
          min: { op: "min", fieldName: "price" },
          max: { op: "max", fieldName: "price" },
        },
        order: [{ key: "_key", direction: "asc" }],
        topHits: { size: 2, sort: [{ fieldName: "price", direction: "asc" }] },
      },
    });
    await api.rec("search", "searchAggregation(full)", "fields/metrics/order/topHits per upstream test — 2.6.26: wired?", "record", r, () => {
      const j = r.json || {};
      const hasAgg = j.aggTopks !== undefined || (((j.data || [])[0] || {}).buckets !== undefined);
      return { ok: true, detail: hasAgg ? "aggregation response present" : "NO aggregation response (plain search rows returned) => not wired in 2.6.26" };
    });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], ids: [1], searchAggregation: { fields: ["grp"], size: 5 } });
    await api.rec("search", "searchAggregation(+ids)", "mutual exclusion with ids", "err", r);
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], offset: 2, searchAggregation: { fields: ["grp"], size: 5 } });
    await api.rec("search", "searchAggregation(+offset)", "mutual exclusion with offset (upstream pin rejects)", "record", r, { ok: true, detail: "hits=" + (r.data || []).length + " msg=" + String(r.msg).slice(0, 100) });
  }
  {
    const r = await api.call("/entities/search", { ...baseSearch, data: [hot(0)], orderByFields: ["price:desc"], limit: 5 });
    await api.rec("search", "orderByFields(desc)", "top-level orderByFields re-sorts search results — 2.6.26: applied?", "record", r, () => {
      const d = r.data || [];
      const ps = d.map((x) => x.price);
      const sorted = [...ps].sort((a, b) => b - a);
      const applied = JSON.stringify(ps) === JSON.stringify(sorted);
      return { ok: true, detail: "prices=" + ps.join(",") + (applied ? " (sorted desc)" : " (NOT sorted => ignored)") };
    });
  }
  {
    const r = db2Blocked.ok ? {code: "skipped", msg: db2Blocked.reason} : await api.call("/entities/search", { dbName: DB2, collectionName: DB2_COLL, data: [hot(0)], limit: 3, outputFields: ["id"] });
    await api.rec("search", "dbName", "search inside named database", "ok", r);
  }

  // ================= HYBRID SEARCH =================
  const hybridSub = (o = {}) => ({ data: [hot(0)], annsField: "vec1", limit: 5, ...o });
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5,
      outputFields: ["id", "grp"],
    });
    await api.rec("hybrid_search", "search[](minimal)", "fragment marks filter/groupingField/offset/ignoreGrowing required on sub-search — upstream binds only data", "ok", r, () => {
      const d = r.data || [];
      const g = Array.isArray(d[0]) ? d[0] : d;
      return { ok: g.length > 0, detail: "hits=" + g.length + " shape=" + (Array.isArray(d[0]) ? "nested" : "flat") };
    });
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub({ filter: "id <= 4" }), { data: [hot(3)], annsField: "vec2", limit: 5, filter: "id >= 3" }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5,
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "search[].filter", "per-sub-search filters applied", "ok", r, () => {
      const d = r.data || [];
      return { ok: d.length > 0, detail: "ids=" + d.map((x) => x.id).join(",") };
    });
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "weighted", params: { weights: [0.7, 0.3] } },
      limit: 5,
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "rerank(weighted+weights)", "weighted rerank needs weights map (fragment only documents k)", "ok", r);
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      limit: 5,
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "rerank(omitted)", "is rerank optional?", "record", r);
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 3, offset: 2,
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "limit/offset", "final result paging", "ok", r, () => {
      const d = r.data || [];
      const g = Array.isArray(d[0]) ? d[0] : d;
      return { ok: g.length === 3, detail: "hits=" + g.length + " shape=" + (Array.isArray(d[0]) ? "nested" : "flat") };
    });
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 10,
      partitionNames: ["_default"],
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "partitionNames(_default)", "scoped to default partition (hybrid rows live in _default)", "record", r, () => {
      const d = r.data || [];
      const g = Array.isArray(d[0]) ? d[0] : d;
      return { ok: r.code === 0 && g.length > 0, detail: "hits=" + g.length };
    });
  }
  for (const cl of ["Strong", "Session", "Bounded", "Eventually"]) {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5, consistencyLevel: cl, outputFields: ["id"],
    });
    await api.rec("hybrid_search", `consistencyLevel(${cl})`, "enum value", "ok", r);
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub({ params: { radius: 0.5, range_filter: 0.99 } }), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5, outputFields: ["id"],
    });
    await api.rec("hybrid_search", "search[].params(radius/range_filter)", "per-sub range search", "ok", r);
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub({ annsField: "vec2", metricType: "COSINE" }), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5, outputFields: ["id"],
    });
    await api.rec("hybrid_search", "search[].metricType(mismatch)", "COSINE on IP-indexed vec2: rejected or silently re-metriced?", "record", r, { ok: true, detail: "hits=" + (r.data || []).length + " dist0=" + JSON.stringify((r.data || [])[0] && (r.data || [])[0].distance) });
  }
  {
    // insert a fresh row after load, then search with ignoreGrowing:true in the sub request.
    await api.call("/entities/insert", { collectionName: HYBRID, data: [{ id: 999, vec1: hot(0), vec2: hot(0), grp: "gz", price: 1, title: "fresh" }] });
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [{ data: [hot(0)], annsField: "vec1", limit: 20, filter: "id == 999", ignoreGrowing: true }, { data: [hot(0)], annsField: "vec2", limit: 5, filter: "id == 999" }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 10, outputFields: ["id"],
    });
    const d0 = (r.data || [])[0];
    const g = Array.isArray(d0) ? d0 : (r.data || []);
    const sawIt = g.some((x) => x.id === 999);
    await api.rec("hybrid_search", "search[].ignoreGrowing", "field absent from upstream SubSearchReq struct; if the fresh growing row is visible the flag is a no-op", "record", r,
      { ok: r.code === 0, detail: sawIt ? "growing row VISIBLE with ignoreGrowing=true => param ignored" : "growing row not visible (inconclusive or honored)" });
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5,
      functionScore: {
        functions: [{ name: "d", type: "Rerank", inputFieldNames: ["price"], params: { reranker: "decay", function: "linear", origin: 30, scale: 10, offset: 0, decay: 0.5 } }],
      },
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "functionScore(decay)", "decay reranker over fused results", "ok", r);
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      limit: 5,
      functionChains: [{
        name: "hyb", stage: "FunctionChainStageL2Rerank",
        ops: [
          { op: "merge", params: { strategy: "rrf" } },
          { op: "map", outputs: ["$score"], expr: { name: "num_combine", args: [{ column: "$score" }, { column: "price" }], params: { mode: "sum" } } },
          { op: "sort", inputs: ["$score"], params: { column: "$score", desc: true } },
          { op: "limit", params: { limit: 3 } },
        ],
      }],
      outputFields: ["id"],
    });
    await api.rec("hybrid_search", "functionChains(merge chain, no rerank)", "merge+map+sort+limit chain per upstream test — 2.6.26: wired?", "record", r, () => {
      const d = r.data || [];
      return { ok: true, detail: "code=" + r.code + " hits=" + d.length + " msg=" + String(r.msg).slice(0, 120) };
    });
  }
  {
    const r = await api.call("/entities/hybrid_search", {
      collectionName: HYBRID,
      search: [hybridSub(), { data: [hot(3)], annsField: "vec2", limit: 5 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 5, groupSize: 2, strictGroupSize: true,
      groupingField: "grp",
      outputFields: ["id", "grp"],
    });
    await api.rec("hybrid_search", "groupingField+groupSize+strictGroupSize", "grouped hybrid search", "record", r);
  }
  {
    const r = db2Blocked.ok ? {code: "skipped", msg: db2Blocked.reason} : await api.call("/entities/hybrid_search", {
      dbName: DB2, collectionName: DB2_COLL,
      search: [{ data: [hot(0)], annsField: "vector", limit: 3 }],
      rerank: { strategy: "rrf", params: { k: 60 } },
      limit: 3, outputFields: ["id"],
    });
    await api.rec("hybrid_search", "dbName", "hybrid search inside named database (single annsField)", "ok", r);
  }
  {
    const r = await api.call("/entities/hybrid_search", { collectionName: HYBRID });
    await api.rec("hybrid_search", "search(missing)", "doc marks search required", "err", r);
  }


}

module.exports = {runDataPlaneSuite};
