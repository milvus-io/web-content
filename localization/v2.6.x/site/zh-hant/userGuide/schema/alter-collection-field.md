---
id: alter-collection-field.md
title: 更改集合欄位
summary: 您可以更改集合欄位的屬性，以變更欄位限制或強制執行更嚴格的資料完整性規則。
---
<h1 id="Alter-Collection-Field" class="common-anchor-header">更改集合欄位<button data-href="#Alter-Collection-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>您可以更改集合欄位的屬性，以變更欄位限制或強制執行更嚴格的資料完整性規則。</p>
<div class="alert note">
<ul>
<li><p>每個集合只包含一個主要欄位。一旦在建立集合時設定，就無法變更主要欄位或變更其屬性。</p></li>
<li><p>每個集合只能有一個分割欄位。一旦在建立集合時設定，就不能變更分割區金鑰。</p></li>
</ul>
</div>
<h2 id="Alter-VarChar-field" class="common-anchor-header">變更 VarChar 欄位<button data-href="#Alter-VarChar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>VarChar 欄位有一個名為<code translate="no">max_length</code> 的屬性，它限制欄位值可以包含的最大字元數。您可以變更<code translate="no">max_length</code> 屬性。</p>
<p>以下範例假設集合有一個 VarChar 欄位名為<code translate="no">varchar</code> ，並設定其<code translate="no">max_length</code> 屬性。</p>
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
<h2 id="Alter-ARRAY-field" class="common-anchor-header">變更 ARRAY 欄位<button data-href="#Alter-ARRAY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>一個陣列欄位有兩個屬性，分別是<code translate="no">element_type</code> 和<code translate="no">max_capacity</code> 。前者決定陣列中元素的資料類型，後者則限制陣列中元素的最大數目。您只能變更<code translate="no">max_capacity</code> 屬性。</p>
<p>以下範例假設集合有一個名為<code translate="no">array</code> 的陣列欄位，並設定其<code translate="no">max_capacity</code> 屬性。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h2 id="Alter-field-level-mmap-settings" class="common-anchor-header">變更欄位層級的 mmap 設定<button data-href="#Alter-field-level-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h2><p>記憶體映射 (Mmap) 可以直接存取磁碟上的大型檔案，讓 Milvus 可以同時在記憶體和硬碟中儲存索引和資料。此方法有助於根據存取頻率最佳化資料放置政策，在不影響搜尋效能的情況下擴充資料集的儲存容量。</p>
<p>以下範例假設集合有一個名為<code translate="no">doc_chunk</code> 的欄位，並設定其<code translate="no">mmap_enabled</code> 屬性。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    field_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
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
