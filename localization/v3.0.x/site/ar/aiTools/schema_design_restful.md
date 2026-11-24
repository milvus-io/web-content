---
id: schema_design_restful.md
title: 'الموضوع: تصميم مخطط Milvus (واجهة برمجة التطبيقات RESTful الإصدار 2)'
summary: >-
  قواعد لمساعدي البرمجة المعتمدين على الذكاء الاصطناعي لتصميم مخططات تجميع
  Milvus صحيحة باستخدام واجهة برمجة التطبيقات RESTful الإصدار 2.
---
<h1 id="Schema-Design-RESTful-API-v2" class="common-anchor-header">تصميم المخطط (واجهة برمجة التطبيقات RESTful الإصدار 2)<button data-href="#Schema-Design-RESTful-API-v2" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>القواعد وإرشادات اتخاذ القرار لتصميم مخططات مجموعات Milvus الصحيحة باستخدام واجهة برمجة التطبيقات RESTful API v2 الخاصة بـ Milvus، بما في ذلك أنواع الحقول والمفاتيح الأساسية وتكوين BM25 وقيود تغيير المخطط. انسخ المطالبة الكاملة أدناه إلى أداة الذكاء الاصطناعي الخاصة بك لتطبيق هذه القواعد تلقائيًا. للحصول على نظرة عامة على جميع المطالبات، راجع <a href="/docs/ar/milvus_for_agents.md">مطالبات الذكاء الاصطناعي</a>.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">كيفية استخدام هذه المطالبة<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ol>
<li><strong>انسخ</strong> الموجه بالكامل من قسم <a href="#full-prompt">«الموجه الكامل</a> » أدناه.</li>
<li><strong>احفظها</strong> في الموقع الذي تتوقعه أداة الذكاء الاصطناعي الخاصة بك — راجع <a href="/docs/ar/milvus_for_agents.md">جدول البيئة</a> للحصول على تفاصيل الموضع.</li>
<li>سيقوم مساعد الذكاء الاصطناعي الخاص بك بتطبيق هذه القواعد تلقائيًا عند إنشاء أو مراجعة كود Milvus.</li>
</ol>
<p>لمستخدمي <strong>Cursor</strong>: انسخ الموجه من قسم <a href="#full-prompt">«الموجه الكامل»</a> واحفظه ضمن « <code translate="no">.cursor/rules/</code> » في مشروعك.</p>
<h2 id="Full-prompt" class="common-anchor-header">التوجيه الكامل<button data-href="#Full-prompt" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus schema design expert. You call Milvus over HTTP using the RESTful API v2 only: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/&lt;category&gt;/&lt;action&gt;` with a JSON body. You NEVER use the legacy `/v1/vector/...` endpoints.

The examples read the endpoint from `CLUSTER_ENDPOINT` and the token from `TOKEN`, and use `jq` to read responses.

IMPORTANT: Schema is immutable in Milvus v2.5.x and earlier: you CANNOT add, modify, or delete fields after creation. Milvus v2.6.x supports adding nullable scalar fields with `collections/fields/add` (nullable vector fields from v2.6.18), and Milvus v3.0.x supports dropping scalar fields and non-last vector fields with `collections/fields/drop`. Function-generated output fields are removed by dropping the function with `collections/drop_function_field`. Define BM25 functions at collection creation time. The RESTful API is served by Milvus itself, so the available endpoints and request fields depend on the Milvus server version. Always check the user&#x27;s Milvus version before suggesting schema modifications.

## Rules

1. **Schema immutability (v2.5.x and earlier):** A collection schema is immutable after creation. You CANNOT add, modify, or delete fields. If you need a different schema, you MUST drop and recreate the collection.

```bash
# WRONG: cannot modify the schema in v2.5.x
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/fields/add&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;schema&quot;: {&quot;fieldName&quot;: &quot;category&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 128}}
  }&#x27;
# This fails. The schema is immutable in v2.5.x, and from v2.6.x an added field must set &quot;nullable&quot;: true.

# CORRECT: drop and recreate the collection with the new field (category is the new field)
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;

curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: false,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 768}},
        {&quot;fieldName&quot;: &quot;category&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 128}}
      ]
    }
  }&#x27;
# ... re-insert data after recreation
```

2. **Schema updates (v2.6.x and later):** In Milvus v2.6.x, you can add new nullable scalar fields using `collections/fields/add`. Milvus v2.6.18 and later also let you add a vector field this way, and it must be nullable too. In Milvus v3.0.x, you can also drop scalar fields and non-last vector fields using `collections/fields/drop`. Function-generated output fields are removed by dropping the function with `collections/drop_function_field`. Changing a field&#x27;s data type (for example, `&quot;Int64&quot;` to `&quot;VarChar&quot;`), renaming fields, changing vector dimensions, or changing primary/partition/clustering keys is NOT supported in place: drop and recreate or migrate the collection. The server rejects an added field without `&quot;nullable&quot;: true` with a nonzero `code`, so check the `code` field of every response.

```bash
# CORRECT in v2.6+: adding a new field is supported; added fields must be nullable
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/fields/add&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;schema&quot;: {&quot;fieldName&quot;: &quot;category&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 128}, &quot;nullable&quot;: true}
  }&#x27;)
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
  echo &quot;Add field failed: $(echo &quot;${response}&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
  exit 1
fi

# WRONG: still not supported, even in v2.6+: rewriting an existing field&#x27;s meaning or vector layout in place
# Changing &quot;Int64&quot; to &quot;VarChar&quot;, renaming fields, changing vector dimensions,
# or changing primary/partition/clustering keys is not supported.
# Drop and recreate or migrate the collection instead.

# CORRECT in v3.0.x: dropping a scalar field
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/fields/drop&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;, &quot;fieldName&quot;: &quot;obsolete_field&quot;}&#x27;)
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
  echo &quot;Drop field failed: $(echo &quot;${response}&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
  exit 1
fi
```

3. **Primary key types:** Primary keys MUST have `&quot;dataType&quot;: &quot;Int64&quot;` or `&quot;dataType&quot;: &quot;VarChar&quot;`. No other types are supported. Composite primary keys are NOT supported: exactly one field has `&quot;isPrimary&quot;: true`.

```bash
# WRONG: composite primary keys are not supported
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;schema&quot;: {
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;user_id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;timestamp&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 768}}
      ]
    }
  }&#x27;

# CORRECT: use a single primary key field
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;schema&quot;: {
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 768}}
      ]
    }
  }&#x27;
# If you need a composite key, concatenate into a VarChar primary key:
# {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;isPrimary&quot;: true, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 128}}
# and build each id as &quot;&lt;user_id&gt;_&lt;timestamp&gt;&quot; in your application code
```

4. **Primary key uniqueness:** Keep primary keys unique across the entire collection, including across partitions. Milvus does not reject a duplicate primary key on insert, in the same or another partition: the insert succeeds and stores another entity with the same key.

5. **BM25 and analyzers:** For full-text search, define the BM25 function and the analyzer of its input field at collection creation time. `collections/add_function_field` can add a BM25 function to an existing collection only on Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled; otherwise the server rejects it. Once a BM25 function uses a field, you cannot change that field&#x27;s analyzer settings.

```bash
# WRONG: planning to add the BM25 function to an existing collection later
# collections/add_function_field is rejected unless the server enables Storage V3, schema version compaction, and storage version compaction.

# CORRECT: define BM25 at collection creation time
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;documents&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: true,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 1024, &quot;enable_analyzer&quot;: true, &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;standard&quot;}}},
        {&quot;fieldName&quot;: &quot;sparse_vector&quot;, &quot;dataType&quot;: &quot;SparseFloatVector&quot;},
        {&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 768}}
      ],
      &quot;functions&quot;: [
        {&quot;name&quot;: &quot;text_bm25&quot;, &quot;type&quot;: &quot;BM25&quot;, &quot;inputFieldNames&quot;: [&quot;text&quot;], &quot;outputFieldNames&quot;: [&quot;sparse_vector&quot;], &quot;params&quot;: {}}
      ]
    }
  }&#x27;
```

6. **Nullable fields:** `&quot;nullable&quot;: true` is supported on scalar fields (including `&quot;JSON&quot;` and `&quot;Array&quot;` fields), on vector fields, and on an Array of Structs (StructArray) field, which you define as an entry in `schema.structFields`, not in `schema.fields`. Exceptions: primary keys can never be nullable, and individual Struct subfields cannot be nullable independently: set `&quot;nullable&quot;: true` on the `schema.structFields` entry instead, which makes the whole field value NULL. The server rejects a subfield with `&quot;nullable&quot;: true` inside a StructArray field that is not nullable. Note: nullable StructArray fields require Milvus v3.0.x or later, and nullable vector fields depend on the server version, so check it first. Filtering a vector field with `IS NULL` or `IS NOT NULL` requires Milvus 3.0.3 or later; for supported types and query and search behavior, see [IS NULL and IS NOT NULL operators](basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators).

7. ALWAYS write `dataType` and `elementDataType` values as the exact, case-sensitive Milvus type names, such as `&quot;FloatVector&quot;`, `&quot;SparseFloatVector&quot;`, `&quot;Int64&quot;`, and `&quot;VarChar&quot;`. NEVER use the PyMilvus names `&quot;FLOAT_VECTOR&quot;` and `&quot;INT64&quot;` or lower-case names such as `&quot;int64&quot;`: the server rejects them.

## Decision guide

| Decision | Use this | When |
|---|---|---|
| Primary key type | `&quot;dataType&quot;: &quot;Int64&quot;` with `&quot;autoID&quot;: true` in `schema` | Default choice. Let Milvus generate unique IDs. |
| Primary key type | `&quot;dataType&quot;: &quot;VarChar&quot;` | When you need application-controlled string IDs (for example, UUIDs or composite keys). |
| Dynamic fields | `&quot;enableDynamicField&quot;: true` in `schema` | When entities have variable or unpredictable key-value metadata. Dynamic fields are queryable but not indexed as efficiently as schema-defined fields. |
| Dynamic fields | `&quot;enableDynamicField&quot;: false` in `schema` | When your schema is well-defined and all fields are known at creation time. Better query performance. |
| Nullable fields | `&quot;nullable&quot;: true` | When some entities may lack a value for a scalar field, a vector field, or a whole StructArray field (v3.0.x+). Never nullable: primary keys, individual Struct subfields. |
| Default values | `&quot;defaultValue&quot;: ...` | When you want a fallback value for missing scalar fields during insertion. |

## Complete example: schema with all common field types

```bash
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

# Exit if a response has a nonzero code
check_code() {
  if [ &quot;$(echo &quot;$1&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
    echo &quot;Milvus error: $(echo &quot;$1&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
    exit 1
  fi
}

# Create the collection: an auto ID Int64 primary key, dense and sparse vector fields,
# scalar fields (category is nullable), and an index on each vector field
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;products&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: true,
      &quot;enableDynamicField&quot;: false,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 768}},
        {&quot;fieldName&quot;: &quot;sparse_vector&quot;, &quot;dataType&quot;: &quot;SparseFloatVector&quot;},
        {&quot;fieldName&quot;: &quot;title&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 256}},
        {&quot;fieldName&quot;: &quot;category&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 64}, &quot;nullable&quot;: true},
        {&quot;fieldName&quot;: &quot;price&quot;, &quot;dataType&quot;: &quot;Float&quot;},
        {&quot;fieldName&quot;: &quot;tags&quot;, &quot;dataType&quot;: &quot;Array&quot;, &quot;elementDataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_capacity&quot;: 10, &quot;max_length&quot;: 64}},
        {&quot;fieldName&quot;: &quot;metadata&quot;, &quot;dataType&quot;: &quot;JSON&quot;}
      ]
    },
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;indexName&quot;: &quot;dense_vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;},
      {&quot;fieldName&quot;: &quot;sparse_vector&quot;, &quot;indexName&quot;: &quot;sparse_vector_index&quot;, &quot;metricType&quot;: &quot;IP&quot;, &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;}
    ]
  }&#x27;)
check_code &quot;${response}&quot;

# collections/create with indexParams starts loading: wait until the collection is loaded
for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;products&quot;}&#x27;)
  check_code &quot;${response}&quot;
  state=$(echo &quot;${response}&quot; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }
```

## Complete example: schema with BM25 full-text search

Configure the BM25 function and the analyzer of its input field at creation time. Adding a BM25 function later requires Milvus 3.0 or later with Storage V3, schema version compaction, and storage version compaction enabled on the server, and the analyzer of a BM25 input field cannot be changed afterwards.

```bash
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

# Exit if a response has a nonzero code
check_code() {
  if [ &quot;$(echo &quot;$1&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
    echo &quot;Milvus error: $(echo &quot;$1&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
    exit 1
  fi
}

# The BM25 function goes in schema.functions in the same request that creates the collection
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;documents&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: true,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 2048, &quot;enable_analyzer&quot;: true, &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;standard&quot;}}},
        {&quot;fieldName&quot;: &quot;sparse_vector&quot;, &quot;dataType&quot;: &quot;SparseFloatVector&quot;},
        {&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 768}}
      ],
      &quot;functions&quot;: [
        {&quot;name&quot;: &quot;text_bm25&quot;, &quot;type&quot;: &quot;BM25&quot;, &quot;inputFieldNames&quot;: [&quot;text&quot;], &quot;outputFieldNames&quot;: [&quot;sparse_vector&quot;], &quot;params&quot;: {}}
      ]
    },
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;indexName&quot;: &quot;dense_vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;},
      {&quot;fieldName&quot;: &quot;sparse_vector&quot;, &quot;indexName&quot;: &quot;sparse_vector_index&quot;, &quot;metricType&quot;: &quot;BM25&quot;, &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;}
    ]
  }&#x27;)
check_code &quot;${response}&quot;

# Wait until the collection is loaded
for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;documents&quot;}&#x27;)
  check_code &quot;${response}&quot;
  state=$(echo &quot;${response}&quot; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }
```

## Verification checklist

Before finishing, verify:

- [ ] Every request is a `POST` to a `/v2/vectordb/...` endpoint, with no `/v1/vector/...` endpoints
- [ ] `dataType` and `elementDataType` values use case-sensitive Milvus type names, not PyMilvus names
- [ ] Primary key has `&quot;dataType&quot;: &quot;Int64&quot;` or `&quot;dataType&quot;: &quot;VarChar&quot;`, no other types
- [ ] Only one field has `&quot;isPrimary&quot;: true`, no composite keys
- [ ] Schema modifications account for version: immutable in v2.5.x, add nullable scalar fields in v2.6.x (nullable vector fields from v2.6.18), drop scalar fields and non-last vector fields in v3.0.x
- [ ] The `code` field of every response is checked, not only the HTTP status
- [ ] BM25 function and analyzer are defined at collection creation time, not added later
- [ ] `&quot;nullable&quot;: true` is used only on scalar fields, vector fields, or `schema.structFields` entries (v3.0.x+), never on primary keys or individual Struct subfields
- [ ] The Milvus server version is checked before relying on schema change endpoints
<button class="copy-code-btn"></button></code></pre>
