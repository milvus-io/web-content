---
id: primary-field.md
title: الحقل الأساسي والمعرف التلقائي
summary: >-
  يحدد الحقل الأساسي هوية الكيان بشكل فريد. تقدم هذه الصفحة كيفية إضافة الحقل
  الأساسي لنوعين مختلفين من البيانات وكيفية تمكين ميلفوس من تخصيص قيم الحقل
  الأساسي تلقائياً.
---
<h1 id="Primary-Field--AutoID​" class="common-anchor-header">الحقل الأساسي والمعرف التلقائي<button data-href="#Primary-Field--AutoID​" class="anchor-icon" translate="no">
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
    </button></h1><p>يحدد الحقل الأساسي هوية الكيان بشكل فريد. تقدم هذه الصفحة كيفية إضافة الحقل الأساسي لنوعين مختلفين من البيانات، وكيفية تمكين ميلفوس من تخصيص قيم الحقل الأساسي تلقائياً.</p>
<h2 id="Overview​" class="common-anchor-header">نظرة عامة<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>في المجموعة، يجب أن يكون المفتاح الأساسي لكل كيان فريدًا عالميًا. عند إضافة الحقل الأساسي، تحتاج إلى تعيين نوع بياناته صراحةً إلى <strong>VARCHAR</strong> أو <strong>INT64</strong>. يشير تعيين نوع بياناته إلى <strong>INT64</strong> إلى أن المفاتيح الأساسية يجب أن تكون عددًا صحيحًا مشابهًا لـ <code translate="no">12345</code> ؛ يشير تعيين نوع بياناته إلى <strong>VARCHAR</strong> إلى أن المفاتيح الأساسية يجب أن تكون سلسلة مشابهة لـ <code translate="no">my_entity_1234</code>.</p>
<p>يمكنك أيضًا تمكين <strong>AutoID</strong> لجعل Milvus يخصص المفاتيح الأساسية تلقائيًا للكيانات الواردة. بمجرد تمكين <strong>AutoID</strong> في مجموعتك، لا تقم بتضمين المفاتيح الأساسية عند إدراج الكيانات.</p>
<p>لا يحتوي الحقل الأساسي في المجموعة على قيمة افتراضية ولا يمكن أن يكون فارغًا.</p>
<h2 id="Use-Int64-Primary-Keys​" class="common-anchor-header">استخدام المفاتيح الأساسية Int64<button data-href="#Use-Int64-Primary-Keys​" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام المفاتيح الأساسية من النوع Int64، تحتاج إلى تعيين <code translate="no">datatype</code> إلى <code translate="no">DataType.INT64</code> وتعيين <code translate="no">is_primary</code> إلى <code translate="no">true</code>. إذا كنت تحتاج أيضًا إلى أن يخصص ميلفوس المفاتيح الأساسية للكيانات الواردة، فقم أيضًا بتعيين <code translate="no">auto_id</code> إلى <code translate="no">true</code>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#curl">جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">True</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; ​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .dataType(DataType.Int64)​
        <span class="hljs-comment">// highlight-start​</span>
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .build());​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;ID field&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-VarChar-Primary-Keys​" class="common-anchor-header">استخدام المفاتيح الأساسية VarChar المتغيرة<button data-href="#Use-VarChar-Primary-Keys​" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام مفاتيح VarChar الأساسية، بالإضافة إلى تغيير قيمة المعلمة <code translate="no">data_type</code> إلى <code translate="no">DataType.VARCHAR</code> ، تحتاج أيضًا إلى تعيين المعلمة <code translate="no">max_length</code> للحقل. </p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.VARCHAR,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">True</span>,​
    max_length=<span class="hljs-number">512</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>; ​
​
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        <span class="hljs-comment">// highlight-start​</span>
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">maxLength</span>: <span class="hljs-number">512</span>​
    <span class="hljs-comment">// highlight-end​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>​
    ],​
    \&quot;params\&quot;: {​
        \&quot;max_length\&quot;: 512​
    }​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>