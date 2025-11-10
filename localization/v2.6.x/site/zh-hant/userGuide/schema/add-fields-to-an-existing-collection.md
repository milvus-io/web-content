---
id: add-fields-to-an-existing-collection.md
title: 添加欄位到現有的集合Compatible with Milvus 2.6.x
summary: Milvus 允許您動態新增欄位到現有的集合，讓您可以輕鬆地隨著應用程式需求的改變而演進您的資料模式。本指南使用實例向您展示如何在不同的情況下添加欄位。
beta: Milvus 2.6.x
---
<h1 id="Add-Fields-to-an-Existing-Collection" class="common-anchor-header">添加欄位到現有的集合<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-Fields-to-an-Existing-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 允許您動態地添加新的欄位到現有的集合，使您可以輕鬆地隨著應用程式需求的變化而演進您的資料模式。本指南使用實例向您展示如何在不同的情況下添加欄位。</p>
<h2 id="Considerations" class="common-anchor-header">注意事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>在新增欄位到您的集合之前，請牢記以下幾個要點：</p>
<ul>
<li><p>您可以新增標量欄位 (<code translate="no">INT64</code>,<code translate="no">VARCHAR</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code> 等)。向量欄位無法新增至現有的集合。</p></li>
<li><p>新欄位必須是 nullable (nullable=True)，以容納沒有新欄位值的現有實體。</p></li>
<li><p>將欄位加入已載入的集合會增加記憶體使用量。</p></li>
<li><p>每個集合的欄位總數有最大限制。詳情請參閱<a href="/docs/zh-hant/limitations.md#Number-of-resources-in-a-collection">Milvus Limits</a>。</p></li>
<li><p>在靜態欄位中，欄位名稱必須是唯一的。</p></li>
<li><p>您無法新增<code translate="no">$meta</code> 欄位，以啟用原本未使用<code translate="no">enable_dynamic_field=True</code> 建立的集合的動態欄位功能。</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南假設您有</p>
<ul>
<li><p>運行中的 Milvus 實例</p></li>
<li><p>已安裝 Milvus SDK</p></li>
<li><p>現有的集合</p></li>
</ul>
<div class="alert note">
<p>請參考我們的「<a href="/docs/zh-hant/create-collection.md">建立</a>集合」以建立集合和基本操作。</p>
</div>
<h2 id="Basic-usage" class="common-anchor-header">基本用法<button data-href="#Basic-usage" class="anchor-icon" translate="no">
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
    </button></h2><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;localhost:19530&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-1-Quickly-add-nullable-fields" class="common-anchor-header">情況 1：快速新增 nullable 欄位<button data-href="#Scenario-1-Quickly-add-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>擴充集合的最簡單方式就是新增可空欄位。當您需要快速為資料新增新的屬性時，這是最完美的方式。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a nullable field to an existing collection</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Returns almost immediately (non-blocking)</span>
<span class="hljs-comment"># - Makes the field available for use with minimal delay</span>
<span class="hljs-comment"># - Sets NULL for all existing entities</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;created_timestamp&quot;</span>,  <span class="hljs-comment"># Name of the new field to add</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type must be a scalar type</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
    <span class="hljs-comment"># Allows NULL values for existing entities</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;

client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;created_timestamp&quot;</span>)
        .dataType(DataType.Int64)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_catalog&#x27;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;created_timestamp&#x27;</span>,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">&#x27;Int64&#x27;</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>
     }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_catalog&quot;,
    &quot;schema&quot;: {
      &quot;fieldName&quot;: &quot;created_timestamp&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;,
      &quot;nullable&quot;: true
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>預期行為：</p>
<ul>
<li><p><strong>現有實體的</strong>新欄位為 NULL</p></li>
<li><p><strong>新的實體</strong>可以有 NULL 或實際值</p></li>
<li><p>由於內部模式同步，<strong>欄位可用性</strong>幾乎立即發生，延遲極少</p></li>
<li><p>在短暫的同步期間之後，<strong>可立即進行查詢</strong></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-string">&#x27;created_timestamp&#x27;</span>: <span class="hljs-literal">None</span>  <span class="hljs-comment"># New field shows NULL for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-string">&#x27;created_timestamp&#x27;</span>: <span class="hljs-title class_">None</span>  # <span class="hljs-title class_">New</span> field shows <span class="hljs-variable constant_">NULL</span> <span class="hljs-keyword">for</span> existing entities
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
{
  <span class="hljs-string">&quot;code&quot;</span>: 0,
  <span class="hljs-string">&quot;data&quot;</span>: {},
  <span class="hljs-string">&quot;cost&quot;</span>: 0
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-2-Add-fields-with-default-values" class="common-anchor-header">方案 2：添加具有預設值的欄位<button data-href="#Scenario-2-Add-fields-with-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>當您希望現有的實體有一個有意義的初始值而不是 NULL 時，請指定預設值。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a field with default value</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Sets the default value for all existing entities</span>
<span class="hljs-comment"># - Makes the field available with minimal delay</span>
<span class="hljs-comment"># - Maintains data consistency with the default value</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;priority_level&quot;</span>,     <span class="hljs-comment"># Name of the new field</span>
    data_type=DataType.VARCHAR,      <span class="hljs-comment"># String type field</span>
    max_length=<span class="hljs-number">20</span>,                   <span class="hljs-comment"># Maximum string length</span>
    nullable=<span class="hljs-literal">True</span>,                   <span class="hljs-comment"># Required for added fields</span>
    default_value=<span class="hljs-string">&quot;standard&quot;</span>         <span class="hljs-comment"># Value assigned to existing entities</span>
    <span class="hljs-comment"># Also used for new entities if no value provided</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;priority_level&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">20</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_catalog&#x27;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;priority_level&#x27;</span>,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">&#x27;VarChar&#x27;</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">default_value</span>: <span class="hljs-string">&#x27;standard&#x27;</span>,
     }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_catalog&quot;,
    &quot;schema&quot;: {
      &quot;fieldName&quot;: &quot;priority_level&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;nullable&quot;: true,
      &quot;defaultValue&quot;: &quot;standard&quot;,
      &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: &quot;20&quot;
      }
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>預期行為：</p>
<ul>
<li><p><strong>現有的實體</strong>將會有新加入欄位的預設值 (<code translate="no">&quot;standard&quot;</code>)</p></li>
<li><p><strong>新的實體</strong>可以覆寫預設值，或者在沒有提供預設值的情況下使用預設值</p></li>
<li><p><strong>欄位可用性</strong>幾乎立即發生，延遲極短</p></li>
<li><p>在短暫的同步期間之後，<strong>可立即進行查詢</strong></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&#x27;priority_level&#x27;</span>: <span class="hljs-string">&#x27;standard&#x27;</span>  <span class="hljs-comment"># Shows default value for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&#x27;priority_level&#x27;</span>: <span class="hljs-string">&#x27;standard&#x27;</span>  # <span class="hljs-title class_">Shows</span> <span class="hljs-keyword">default</span> value <span class="hljs-keyword">for</span> existing entities
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: 1,
    <span class="hljs-string">&#x27;priority_level&#x27;</span>: <span class="hljs-string">&#x27;standard&#x27;</span>  <span class="hljs-comment"># Shows default value for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-enable-dynamic-schema-functionality-by-adding-a-meta-field" class="common-anchor-header">我可以透過新增<code translate="no">$meta</code> 欄位來啟用動態模式功能嗎？<button data-href="#Can-I-enable-dynamic-schema-functionality-by-adding-a-meta-field" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以，您不能使用<code translate="no">add_collection_field</code> 新增<code translate="no">$meta</code> 欄位來啟用動態欄位功能。例如，以下程式碼將無法運作：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This is NOT supported</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;existing_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;$meta&quot;</span>,
    data_type=DataType.JSON  <span class="hljs-comment"># This operation will fail</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// ❌ This is NOT supported</span>
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;existing_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;$meta&quot;</span>)
        .dataType(DataType.JSON)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// ❌ This is NOT supported</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_catalog&#x27;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;$meta&#x27;</span>,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">&#x27;JSON&#x27;</span>,
     }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-comment"># ❌ This is NOT supported</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;existing_collection&quot;,
    &quot;schema&quot;: {
      &quot;fieldName&quot;: &quot;$meta&quot;,
      &quot;dataType&quot;: &quot;JSON&quot;,
      &quot;nullable&quot;: true
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要啟用動態模式功能：</p>
<ul>
<li><p><strong>新增集合</strong>：建立集合時，將<code translate="no">enable_dynamic_field</code> 設為 True。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md#Create-Schema">建立集合</a></p></li>
<li><p><strong>現有的集合</strong>：將集合層級屬性<code translate="no">dynamicfield.enabled</code> 設為 True。如需詳細資訊，請參閱<a href="/docs/zh-hant/modify-collection.md#Example-4-Enable-dynamic-field">修改集合</a>。</p></li>
</ul>
<h3 id="What-happens-when-I-add-a-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">當我新增與動態欄位關鍵字同名的欄位時，會發生什麼情況？<button data-href="#What-happens-when-I-add-a-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>當您的集合已啟用動態欄位 (<code translate="no">$meta</code> exists)，您可以新增與現有動態欄位鍵同名的靜態欄位。新的靜態欄位會遮蔽動態欄位鍵，但原始的動態資料會保留。</p>
<p>為了避免欄位名稱可能產生的衝突，在實際新增之前，請參考現有的欄位和動態欄位鍵來考慮要新增的欄位名稱。</p>
<p><strong>範例情況：</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Original collection with dynamic field enabled</span>
<span class="hljs-comment"># Insert data with dynamic field keys</span>
data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-string">&quot;this is a dynamic field key&quot;</span>,  <span class="hljs-comment"># Dynamic field key as string</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">99.5</span>                                 <span class="hljs-comment"># Another dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=data)

<span class="hljs-comment"># Add static field with same name as existing dynamic field key</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;extra_info&quot;</span>,         <span class="hljs-comment"># Same name as dynamic field key</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type can differ from dynamic field key</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
)

<span class="hljs-comment"># Insert new data after adding static field</span>
new_data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-number">100</span>,               <span class="hljs-comment"># Now must use INT64 type (static field)</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">88.0</span>                    <span class="hljs-comment"># Still a dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=new_data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;my_vector&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, ...}));
row.addProperty(<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-string">&quot;this is a dynamic field key&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;score&quot;</span>, <span class="hljs-number">99.5</span>);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
        
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;extra_info&quot;</span>)
        .dataType(DataType.Int64)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
        
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">newRow</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
newRow.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
newRow.add(<span class="hljs-string">&quot;my_vector&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, ...}));
newRow.addProperty(<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-number">100</span>);
newRow.addProperty(<span class="hljs-string">&quot;score&quot;</span>, <span class="hljs-number">88.0</span>);

insertR = client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(newRow))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Original collection with dynamic field enabled</span>
<span class="hljs-comment">// Insert data with dynamic field keys</span>
<span class="hljs-keyword">const</span> data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-string">&quot;this is a dynamic field key&quot;</span>,  <span class="hljs-comment">// Dynamic field key as string</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">99.5</span>                                 <span class="hljs-comment">// Another dynamic field key</span>
}]
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-attr">data</span>: data
});

<span class="hljs-comment">// Add static field with same name as existing dynamic field key</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">add_collection_field</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;extra_info&quot;</span>,         <span class="hljs-comment">// Same name as dynamic field key</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,        <span class="hljs-comment">// Data type can differ from dynamic field key</span>
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>                   <span class="hljs-comment">// Must be True for added fields</span>
});

<span class="hljs-comment">// Insert new data after adding static field</span>
<span class="hljs-keyword">const</span> new_data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-number">100</span>,               # <span class="hljs-title class_">Now</span> must use <span class="hljs-title class_">INT64</span> <span class="hljs-title function_">type</span> (<span class="hljs-keyword">static</span> field)
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">88.0</span>                    # <span class="hljs-title class_">Still</span> a dynamic field key
}];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>:<span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-attr">data</span>: new_data
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-comment">#!/bin/bash</span>

<span class="hljs-built_in">export</span> MILVUS_HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> AUTH_TOKEN=<span class="hljs-string">&quot;your_token_here&quot;</span>
<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;product_catalog&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Step 1: Insert initial data with dynamic fields...&quot;</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_HOST}</span>/v2/vectordb/entities/insert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${AUTH_TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;data\&quot;: [{
      \&quot;id\&quot;: 1,
      \&quot;my_vector\&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
      \&quot;extra_info\&quot;: \&quot;this is a dynamic field key\&quot;,
      \&quot;score\&quot;: 99.5
    }]
  }&quot;</span>

<span class="hljs-built_in">echo</span> -e <span class="hljs-string">&quot;\n\nStep 2: Add static field with same name as dynamic field...&quot;</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_HOST}</span>/v2/vectordb/collections/fields/add&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${AUTH_TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;schema\&quot;: {
      \&quot;fieldName\&quot;: \&quot;extra_info\&quot;,
      \&quot;dataType\&quot;: \&quot;Int64\&quot;,
      \&quot;nullable\&quot;: true
    }
  }&quot;</span>

<span class="hljs-built_in">echo</span> -e <span class="hljs-string">&quot;\n\nStep 3: Insert new data after adding static field...&quot;</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_HOST}</span>/v2/vectordb/entities/insert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${AUTH_TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;data\&quot;: [{
      \&quot;id\&quot;: 2,
      \&quot;my_vector\&quot;: [0.3, 0.4, 0.5, 0.6, 0.7],
      \&quot;extra_info\&quot;: 100,
      \&quot;score\&quot;: 88.0
    }]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>預期行為：</p>
<ul>
<li><p><strong>現有的實體</strong>將為新的靜態欄位設定 NULL<code translate="no">extra_info</code></p></li>
<li><p><strong>新的實體</strong>必須使用靜態欄位的資料類型 (<code translate="no">INT64</code>)</p></li>
<li><p><strong>原始的動態欄位關鍵值</strong>被保留，並可透過<code translate="no">$meta</code> 語法存取</p></li>
<li><p>在正常查詢中<strong>，靜態欄位會遮蔽動態欄位的關鍵值</strong></p></li>
</ul>
<p><strong>同時存取靜態和動態值：</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Query static field only (dynamic field key is masked)</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 1, &quot;extra_info&quot;: None}  # NULL for existing entity</span>

<span class="hljs-comment"># 2. Query both static and original dynamic values</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-string">&quot;$meta[&#x27;extra_info&#x27;]&quot;</span>]
)
<span class="hljs-comment"># Returns: {</span>
<span class="hljs-comment">#     &quot;id&quot;: 1,</span>
<span class="hljs-comment">#     &quot;extra_info&quot;: None,                           # Static field value (NULL)</span>
<span class="hljs-comment">#     &quot;$meta[&#x27;extra_info&#x27;]&quot;: &quot;this is a dynamic field key&quot;  # Original dynamic value</span>
<span class="hljs-comment"># }</span>

<span class="hljs-comment"># 3. Query new entity with static field value</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 2&quot;</span>, 
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 2, &quot;extra_info&quot;: 100}  # Static field value</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Query static field only (dynamic field key is masked)</span>
<span class="hljs-keyword">let</span> results = client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id == 1&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;extra_info&quot;</span>]
})
<span class="hljs-comment">// Returns: {&quot;id&quot;: 1, &quot;extra_info&quot;: None}  # NULL for existing entity</span>

<span class="hljs-comment">// 2. Query both static and original dynamic values</span>
results = client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>:<span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id == 1&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-string">&quot;$meta[&#x27;extra_info&#x27;]&quot;</span>]
});
<span class="hljs-comment">// Returns: {</span>
<span class="hljs-comment">//     &quot;id&quot;: 1,</span>
<span class="hljs-comment">//     &quot;extra_info&quot;: None,                           # Static field value (NULL)</span>
<span class="hljs-comment">//     &quot;$meta[&#x27;extra_info&#x27;]&quot;: &quot;this is a dynamic field key&quot;  # Original dynamic value</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">// 3. Query new entity with static field value</span>
results = client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id == 2&quot;</span>, 
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;extra_info&quot;</span>]
})
<span class="hljs-comment">// Returns: {&quot;id&quot;: 2, &quot;extra_info&quot;: 100}  # Static field value</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-comment">#!/bin/bash</span>

<span class="hljs-built_in">export</span> MILVUS_HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> AUTH_TOKEN=<span class="hljs-string">&quot;your_token_here&quot;</span>
<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;product_catalog&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Query 1: Static field only (dynamic field masked)...&quot;</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_HOST}</span>/v2/vectordb/entities/query&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${AUTH_TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;filter\&quot;: \&quot;id == 1\&quot;,
    \&quot;outputFields\&quot;: [\&quot;extra_info\&quot;]
  }&quot;</span>

<span class="hljs-built_in">echo</span> -e <span class="hljs-string">&quot;\n\nQuery 2: Both static and original dynamic values...&quot;</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_HOST}</span>/v2/vectordb/entities/query&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${AUTH_TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;filter\&quot;: \&quot;id == 1\&quot;,
    \&quot;outputFields\&quot;: [\&quot;extra_info\&quot;, \&quot;\$meta[&#x27;extra_info&#x27;]\&quot;]
  }&quot;</span>

<span class="hljs-built_in">echo</span> -e <span class="hljs-string">&quot;\n\nQuery 3: New entity with static field value...&quot;</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_HOST}</span>/v2/vectordb/entities/query&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${AUTH_TOKEN}</span>&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;filter\&quot;: \&quot;id == 2\&quot;,
    \&quot;outputFields\&quot;: [\&quot;extra_info\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="How-long-does-it-take-for-a-new-field-to-become-available" class="common-anchor-header">新欄位需要多久才會可用？<button data-href="#How-long-does-it-take-for-a-new-field-to-become-available" class="anchor-icon" translate="no">
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
    </button></h3><p>新增的欄位幾乎立即可用，但可能會有短暫的延遲，這是由於整個 Milvus 集群的內部模式變更廣播。這種同步確保在處理涉及新欄位的查詢之前，所有節點都知道模式更新。</p>
