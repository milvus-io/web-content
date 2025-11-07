---
id: primary-field.md
title: 기본 필드 및 자동 ID
summary: >-
  Milvus의 모든 컬렉션에는 각 엔티티를 고유하게 식별하는 기본 필드가 있어야 합니다. 이 필드를 통해 모든 엔티티를 모호함 없이 삽입,
  업데이트, 쿼리 또는 삭제할 수 있습니다.
---
<h1 id="Primary-Field--AutoID" class="common-anchor-header">기본 필드 및 자동 ID<button data-href="#Primary-Field--AutoID" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 모든 컬렉션에는 각 엔티티를 고유하게 식별하는 기본 필드가 있어야 합니다. 이 필드는 모든 엔티티를 모호함 없이 삽입, 업데이트, 쿼리 또는 삭제할 수 있도록 해줍니다.</p>
<p>사용 사례에 따라 Milvus가 자동으로 ID를 생성(AutoID)하도록 하거나 직접 ID를 수동으로 할당할 수 있습니다.</p>
<h2 id="What-is-a-primary-field" class="common-anchor-header">기본 필드란 무엇인가요?<button data-href="#What-is-a-primary-field" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 필드는 기존 데이터베이스의 기본 키와 유사하게 컬렉션의 각 엔티티에 대한 고유 키 역할을 합니다. Milvus는 기본 필드를 사용하여 삽입, 업서트, 삭제 및 쿼리 작업 중에 엔티티를 관리합니다.</p>
<p>기본 요구 사항:</p>
<ul>
<li><p>각 컬렉션에는 <strong>정확히 하나의</strong> 기본 필드가 있어야 합니다.</p></li>
<li><p>기본 필드 값은 null일 수 없습니다.</p></li>
<li><p>데이터 유형은 생성 시 지정해야 하며 나중에 변경할 수 없습니다.</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">지원되는 데이터 유형<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 필드는 엔티티를 고유하게 식별할 수 있는 지원되는 스칼라 데이터 유형을 사용해야 합니다.</p>
<table>
   <tr>
     <th><p>데이터 유형</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">INT64</code></p></td>
     <td><p>64비트 정수 유형으로, AutoID에 일반적으로 사용됩니다. 대부분의 사용 사례에 권장되는 옵션입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code></p></td>
     <td><p>가변 길이 문자열 유형. 엔티티 식별자가 외부 시스템(예: 제품 코드 또는 사용자 ID)에서 가져온 경우 이 옵션을 사용합니다. 값당 허용되는 최대 바이트 수를 정의하려면 <code translate="no">max_length</code> 속성이 필요합니다.</p></td>
   </tr>
</table>
<h2 id="Choose-between-AutoID-and-Manual-IDs" class="common-anchor-header">자동 ID와 수동 ID 중에서 선택<button data-href="#Choose-between-AutoID-and-Manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 기본 키 값을 할당하기 위해 두 가지 모드를 지원합니다.</p>
<table>
   <tr>
     <th><p>모드</p></th>
     <th><p>설명</p></th>
     <th><p>권장 대상</p></th>
   </tr>
   <tr>
     <td><p>자동 ID</p></td>
     <td><p>Milvus는 삽입되거나 가져온 엔티티에 대한 고유 식별자를 자동으로 생성합니다.</p></td>
     <td><p>ID를 수동으로 관리할 필요가 없는 대부분의 시나리오에 적합합니다.</p></td>
   </tr>
   <tr>
     <td><p>수동 ID</p></td>
     <td><p>데이터를 삽입하거나 가져올 때 고유 ID를 직접 입력합니다.</p></td>
     <td><p>ID를 외부 시스템 또는 기존 데이터 세트와 일치시켜야 하는 경우.</p></td>
   </tr>
</table>
<div class="alert note">
<p>어떤 모드를 선택해야 할지 잘 모르겠다면, 더 간단한 수집과 고유성 보장을 위해 <a href="/docs/ko/primary-field.md#Quickstart-Use-AutoID">자동 ID로 시작하세요</a>.</p>
</div>
<h2 id="Quickstart-Use-AutoID" class="common-anchor-header">빠른 시작: AutoID 사용<button data-href="#Quickstart-Use-AutoID" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus가 ID 생성을 자동으로 처리하도록 할 수 있습니다.</p>
<h3 id="Step-1-Create-a-collection-with-AutoID" class="common-anchor-header">1단계: AutoID로 컬렉션 생성<button data-href="#Step-1-Create-a-collection-with-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 필드 정의에서 <code translate="no">auto_id=True</code> 을 활성화합니다. Milvus가 ID 생성을 자동으로 처리합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define primary field with AutoID enabled</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-comment"># Primary field name</span></span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Milvus generates IDs automatically; Defaults to False</span></span>
<span class="highlighted-comment-line">    datatype=DataType.INT64</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define schema fields</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Primary field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Milvus generates IDs automatically</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Vector field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Scalar field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-Data" class="common-anchor-header">2단계: 데이터 삽입<button data-href="#Step-2-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>중요:</strong> 데이터에 기본 필드 열을 포함하지 마세요. Milvus는 자동으로 ID를 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [461526052788333649, 461526052788333650]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>기존 엔티티로 작업할 때는 <code translate="no">insert()</code> 대신 <code translate="no">upsert()</code> 을 사용하여 중복 ID 오류를 방지하세요.</p>
</div>
<h2 id="Use-manual-IDs" class="common-anchor-header">수동 ID 사용<button data-href="#Use-manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>ID를 수동으로 제어해야 하는 경우 자동 ID를 비활성화하고 직접 값을 입력하세요.</p>
<h3 id="Step-1-Create-a-collection-without-AutoID" class="common-anchor-header">1단계: AutoID를 사용하지 않고 컬렉션 만들기<button data-href="#Step-1-Create-a-collection-without-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define the primary field without AutoID</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,</span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># You&#x27;ll provide IDs manually at data ingestion</span></span>
<span class="highlighted-comment-line">    datatype=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">100</span> <span class="hljs-comment"># Required when datatype is VARCHAR</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
  <span class="hljs-attr">username</span>: <span class="hljs-string">&quot;username&quot;</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;Aa12345!!&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
  <span class="hljs-attr">schema</span>: schema,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data-with-your-IDs" class="common-anchor-header">2단계: ID를 사용하여 데이터 삽입하기<button data-href="#Step-2-Insert-data-with-your-IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>모든 삽입 작업에서 기본 필드 열을 포함해야 합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Each entity must contain the primary field `product_id`</span>
data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [&#x27;PROD-001&#x27;, &#x27;PROD-002&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> insert = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(insert);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>귀하의 책임:</p>
<ul>
<li><p>모든 ID가 모든 엔티티에서 고유한지 확인합니다.</p></li>
<li><p>모든 삽입/가져오기 작업에 기본 필드 포함</p></li>
<li><p>ID 충돌 및 중복 감지 직접 처리</p></li>
</ul>
<h2 id="Advanced-usage" class="common-anchor-header">고급 사용 방법<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Migrate-data-with-existing-AutoIDs" class="common-anchor-header">기존 자동 ID가 있는 데이터 마이그레이션<button data-href="#Migrate-data-with-existing-AutoIDs" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 마이그레이션 중에 기존 ID를 유지하려면 <code translate="no">alter_collection_properties</code> 호출을 통해 <code translate="no">allow_insert_auto_id</code> 속성을 활성화하세요. true로 설정하면 AutoID가 활성화되어 있어도 Milvus는 사용자가 제공한 ID를 허용합니다.</p>
<p>구성에 대한 자세한 내용은 <a href="/docs/ko/modify-collection.md#Example-5-Enable-allowinsertautoid">컬렉션 수정을</a> 참조하세요.</p>
<h3 id="Ensure-global-AutoID-uniqueness-across-clusters" class="common-anchor-header">클러스터 전반에서 글로벌 AutoID 고유성 보장하기<button data-href="#Ensure-global-AutoID-uniqueness-across-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>여러 Milvus 클러스터를 실행하는 경우 각 클러스터에 대해 고유한 클러스터 ID를 구성하여 AutoID가 겹치지 않도록 하세요.</p>
<p><strong>구성:</strong> 클러스터를 초기화하기 전에 <code translate="no">milvus.yaml</code> 에서 <code translate="no">common.clusterID</code> 구성을 편집하세요:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">clusterID:</span> <span class="hljs-number">3</span>   <span class="hljs-comment"># Must be unique across all clusters (Range: 0-7)</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서 <code translate="no">clusterID</code> 은 AutoID 생성에 사용되는 고유 식별자를 0에서 7까지 지정합니다(최대 8개 클러스터 지원).</p>
<div class="alert note">
<p>Milvus는 내부적으로 비트 반전을 처리하여 향후 ID 중복 없이 확장할 수 있습니다. 클러스터 ID를 설정하는 것 외에는 수동 구성이 필요하지 않습니다.</p>
</div>
<h2 id="Reference-How-AutoID-works" class="common-anchor-header">참조: AutoID 작동 방식<button data-href="#Reference-How-AutoID-works" class="anchor-icon" translate="no">
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
    </button></h2><p>AutoID가 내부적으로 고유 식별자를 생성하는 방법을 이해하면 <a href="/docs/ko/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">클러스터 ID를</a> 올바르게 <a href="/docs/ko/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">구성하고</a> ID 관련 문제를 해결하는 데 도움이 될 수 있습니다.</p>
<p>AutoID는 구조화된 64비트 형식을 사용하여 고유성을 보장합니다:</p>
<pre><code translate="no" class="language-plaintext">[sign_bit][cluster_id][physical_ts][logical_ts]
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>세그먼트</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sign_bit</code></p></td>
     <td><p>내부용으로 예약됨</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cluster_id</code></p></td>
     <td><p>ID를 생성한 클러스터를 식별합니다(값 범위: 0~7).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">physical_ts</code></p></td>
     <td><p>ID가 생성된 시간(밀리초) 타임스탬프</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">logical_ts</code></p></td>
     <td><p>동일한 밀리초 내에 생성된 ID를 구분하기 위한 카운터입니다.</p></td>
   </tr>
</table>
<div class="alert note">
<p>데이터 유형이 <code translate="no">VARCHAR</code> 로 자동 ID가 활성화되어 있어도 Milvus는 여전히 숫자 ID를 생성합니다. 이는 최대 길이 20자(uint64 범위)의 숫자 문자열로 저장됩니다.</p>
</div>
