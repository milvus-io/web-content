---
id: alter-collection-field.md
title: 컬렉션 필드 변경
summary: 컬렉션 필드의 속성을 변경하여 열 제약 조건을 변경하거나 더 엄격한 데이터 무결성 규칙을 적용할 수 있습니다.
---
<h1 id="Alter-Collection-Field" class="common-anchor-header">컬렉션 필드 변경<button data-href="#Alter-Collection-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>컬렉션 필드의 속성을 변경하여 열 제약 조건을 변경하거나 더 엄격한 데이터 무결성 규칙을 적용할 수 있습니다.</p>
<div class="alert note">
<ul>
<li><p>각 컬렉션은 하나의 기본 필드로만 구성됩니다. 컬렉션을 만드는 동안 설정한 후에는 기본 필드를 변경하거나 해당 속성을 변경할 수 없습니다.</p></li>
<li><p>각 컬렉션에는 하나의 파티션 키만 가질 수 있습니다. 컬렉션을 만드는 동안 설정한 파티션 키는 변경할 수 없습니다.</p></li>
</ul>
</div>
<h2 id="Alter-VarChar-field" class="common-anchor-header">VarChar 필드 변경<button data-href="#Alter-VarChar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>VarChar 필드에는 필드 값에 포함할 수 있는 최대 문자 수를 제한하는 <code translate="no">max_length</code> 속성이 있습니다. <code translate="no">max_length</code> 속성을 변경할 수 있습니다.</p>
<p>다음 예제에서는 컬렉션에 <code translate="no">varchar</code> 이라는 이름의 VarChar 필드가 있고 <code translate="no">max_length</code> 속성을 설정한다고 가정합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;varchar&quot;</span>,
    field_params={
        <span class="hljs-string">&quot;max_length&quot;</span>: <span class="hljs-number">1024</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;varchar&quot;</span>)
        .property(<span class="hljs-string">&quot;max_length&quot;</span>, <span class="hljs-string">&quot;1024&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<div class="multipleCode">
   <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">LOAD_COLLECTION_NAME</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
  <span class="hljs-attr">properties</span>: { <span class="hljs-attr">max_length</span>: <span class="hljs-number">1024</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/pkg/v2/common&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>).WithProperty(common.MaxLengthKey, <span class="hljs-number">1024</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
    &quot;</span>collectionName<span class="hljs-string">&quot;: &quot;</span>my_collection<span class="hljs-string">&quot;,
    &quot;</span>field_name<span class="hljs-string">&quot;: &quot;</span>varchar<span class="hljs-string">&quot;,
    &quot;</span>properties<span class="hljs-string">&quot;: {
        &quot;</span>max_length<span class="hljs-string">&quot;: &quot;</span>1024<span class="hljs-string">&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alter-ARRAY-field" class="common-anchor-header">배열 필드 변경<button data-href="#Alter-ARRAY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>배열 필드에는 <code translate="no">element_type</code> 와 <code translate="no">max_capacity</code> 라는 두 가지 프로퍼티가 있습니다. 전자는 배열에 있는 요소의 데이터 유형을 결정하고 후자는 배열의 최대 요소 수를 제한합니다. <code translate="no">max_capacity</code> 속성만 변경할 수 있습니다.</p>
<p>다음 예제에서는 컬렉션에 <code translate="no">array</code> 이라는 이름의 배열 필드가 있고 <code translate="no">max_capacity</code> 속성을 설정한다고 가정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;array&quot;</span>,
    field_params={
        <span class="hljs-string">&quot;max_capacity&quot;</span>: <span class="hljs-number">64</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;array&quot;</span>)
        .property(<span class="hljs-string">&quot;max_capacity&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;array&#x27;</span>,
  <span class="hljs-attr">properties</span>: { 
      <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">64</span> 
  }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;array&quot;</span>).WithProperty(common.MaxCapacityKey, <span class="hljs-number">64</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
    &quot;</span>collectionName<span class="hljs-string">&quot;: &quot;</span>my_collection<span class="hljs-string">&quot;,
    &quot;</span>field_name<span class="hljs-string">&quot;: &quot;</span>array<span class="hljs-string">&quot;,
    &quot;</span>properties<span class="hljs-string">&quot;: {
        &quot;</span>max_capacity<span class="hljs-string">&quot;: &quot;</span>64<span class="hljs-string">&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alter-field-level-mmap-settings" class="common-anchor-header">필드 수준 Mmap 설정 변경<button data-href="#Alter-field-level-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h2><p>메모리 매핑(Mmap)을 사용하면 디스크의 대용량 파일에 직접 메모리에 액세스할 수 있으므로 Milvus는 메모리와 하드 드라이브 모두에 인덱스와 데이터를 저장할 수 있습니다. 이 접근 방식은 액세스 빈도에 따라 데이터 배치 정책을 최적화하여 검색 성능에 영향을 주지 않고 컬렉션의 저장 용량을 확장하는 데 도움이 됩니다.</p>
<p>다음 예제에서는 컬렉션에 <code translate="no">doc_chunk</code> 이라는 필드가 있고 <code translate="no">mmap_enabled</code> 속성을 설정한다고 가정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .property(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;True&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;doc_chunk&#x27;</span>,
  <span class="hljs-attr">properties</span>: { 
      <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">true</span>, 
  }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;doc_chunk&quot;</span>).WithProperty(common.MmapEnabledKey, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
    &quot;</span>collectionName<span class="hljs-string">&quot;: &quot;</span>my_collection<span class="hljs-string">&quot;,
    &quot;</span>field_name<span class="hljs-string">&quot;: &quot;</span>doc_chunk<span class="hljs-string">&quot;,
    &quot;</span>properties<span class="hljs-string">&quot;: {
        &quot;</span>mmap.enabled<span class="hljs-string">&quot;: True
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
