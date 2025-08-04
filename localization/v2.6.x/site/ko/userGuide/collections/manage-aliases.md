---
id: manage-aliases.md
title: 별칭 관리
summary: 'Milvus는 별칭 관리 기능을 제공합니다. 이 페이지에서는 별칭을 만들고, 나열하고, 변경하고, 삭제하는 절차를 설명합니다.'
---
<h1 id="Manage-Aliases" class="common-anchor-header">별칭 관리<button data-href="#Manage-Aliases" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 별칭은 컬렉션의 변경 가능한 보조 이름입니다. 별칭을 사용하면 애플리케이션 코드를 수정하지 않고도 컬렉션 간에 동적으로 전환할 수 있는 추상화 계층을 제공합니다. 이는 원활한 데이터 업데이트, A/B 테스트 및 기타 운영 작업을 위해 프로덕션 환경에서 특히 유용합니다.</p>
<p>이 페이지에서는 컬렉션 별칭을 만들고, 나열하고, 재할당하고, 삭제하는 방법을 설명합니다.</p>
<h2 id="Why-Use-an-Alias" class="common-anchor-header">별칭을 사용하는 이유<button data-href="#Why-Use-an-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>별칭 사용의 주요 이점은 클라이언트 애플리케이션을 특정 물리적 컬렉션 이름에서 분리할 수 있다는 것입니다.</p>
<p><code translate="no">prod_data</code> 이라는 컬렉션을 쿼리하는 라이브 애플리케이션이 있다고 가정해 보겠습니다. 기초 데이터를 업데이트해야 할 때 서비스 중단 없이 업데이트를 수행할 수 있습니다. 워크플로는 다음과 같습니다:</p>
<ol>
<li><strong>새 컬렉션을 만듭니다</strong>: 예를 들어 <code translate="no">prod_data_v2</code> 과 같은 새 컬렉션을 만듭니다.</li>
<li><strong>데이터 준비</strong>: <code translate="no">prod_data_v2</code> 에서 새 데이터를 로드하고 색인합니다.</li>
<li>별칭을<strong>전환합니다</strong>: 새 컬렉션을 서비스할 준비가 되면 이전 컬렉션의 별칭 <code translate="no">prod_data</code> 을 <code translate="no">prod_data_v2</code> 으로 원자적으로 재할당합니다.</li>
</ol>
<p>애플리케이션은 계속해서 별칭 <code translate="no">prod_data</code> 으로 요청을 보내므로 다운타임이 전혀 발생하지 않습니다. 이 메커니즘은 원활한 업데이트를 가능하게 하고 벡터 검색 서비스에 대한 청록색 배포와 같은 작업을 간소화합니다.</p>
<p><strong>별칭의 주요 속성:</strong></p>
<ul>
<li>컬렉션에는 여러 개의 별칭을 가질 수 있습니다.</li>
<li>별칭은 한 번에 하나의 컬렉션만 가리킬 수 있습니다.</li>
<li>요청을 처리할 때 Milvus는 먼저 제공된 이름의 컬렉션이 존재하는지 확인합니다. 존재하지 않으면 그 이름이 컬렉션의 별칭인지 확인합니다.</li>
</ul>
<h2 id="Create-Alias" class="common-anchor-header">별칭 만들기<button data-href="#Create-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 컬렉션의 별칭을 만드는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 9. Manage aliases</span>
<span class="hljs-comment"># 9.1. Create aliases</span>
client.create_alias(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>,
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

client.create_alias(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CreateAliasReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 9. Manage aliases</span>

<span class="hljs-comment">// 9.1 Create alias</span>
<span class="hljs-type">CreateAliasReq</span> <span class="hljs-variable">createAliasReq</span> <span class="hljs-operator">=</span> CreateAliasReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
        .alias(<span class="hljs-string">&quot;bob&quot;</span>)
        .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
        .alias(<span class="hljs-string">&quot;alice&quot;</span>)
        .build();

client.createAlias(createAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 9. Manage aliases</span>
<span class="hljs-comment">// 9.1 Create aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
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

err = client.CreateAlias(ctx, milvusclient.NewCreateAliasOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>, <span class="hljs-string">&quot;bob&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.CreateAlias(ctx, milvusclient.NewCreateAliasOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>, <span class="hljs-string">&quot;alice&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;,
    &quot;collectionName&quot;: &quot;my_collection_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;,
    &quot;collectionName&quot;: &quot;my_collection_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-Aliases" class="common-anchor-header">목록 별칭<button data-href="#List-Aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 특정 컬렉션에 할당된 별칭을 나열하는 절차를 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.2. List aliases</span>
res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListAliasesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListAliasResp;

<span class="hljs-comment">// 9.2 List alises</span>
<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
    .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [bob, alice]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.2 List aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27;, &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">aliases, err := client.ListAliases(ctx, milvusclient.NewListAliasesOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(aliases)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-Alias" class="common-anchor-header">별칭 설명<button data-href="#Describe-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 특정 별칭이 할당된 컬렉션의 이름을 포함하여 특정 별칭을 자세히 설명합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.3. Describe aliases</span>
res = client.describe_alias(
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DescribeAliasReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.DescribeAliasResp;

<span class="hljs-comment">// 9.3 Describe alias</span>
<span class="hljs-type">DescribeAliasReq</span> <span class="hljs-variable">describeAliasReq</span> <span class="hljs-operator">=</span> DescribeAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

<span class="hljs-type">DescribeAliasResp</span> <span class="hljs-variable">describeAliasRes</span> <span class="hljs-operator">=</span> client.describeAlias(describeAliasReq);

System.out.println(describeAliasRes);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// DescribeAliasResp(collectionName=my_collection_1, alias=bob)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.3 Describe aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   alias: &#x27;bob&#x27;,</span>
<span class="hljs-comment">//   collection: &#x27;my_collection_1&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">alias, err := client.DescribeAlias(ctx, milvusclient.NewDescribeAliasOption(<span class="hljs-string">&quot;bob&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(alias)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alter-Alias" class="common-anchor-header">별칭 변경<button data-href="#Alter-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>특정 컬렉션에 이미 할당된 별칭을 다른 컬렉션에 재할당할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.4 Reassign aliases to other collections</span>
client.alter_alias(
    collection_name=<span class="hljs-string">&quot;my_collection_2&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;my_collection_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AlterAliasReq;

<span class="hljs-comment">// 9.4 Reassign alias to other collections</span>
<span class="hljs-type">AlterAliasReq</span> <span class="hljs-variable">alterAliasReq</span> <span class="hljs-operator">=</span> AlterAliasReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_2&quot;</span>)
        .alias(<span class="hljs-string">&quot;alice&quot;</span>)
        .build();

client.alterAlias(alterAliasReq);

<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_2&quot;</span>)
        .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

listAliasesReq = ListAliasesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
        .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [bob]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.4 Reassign aliases to other collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27; ]</span>
<span class="hljs-comment">// </span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterAlias(ctx, milvusclient.NewAlterAliasOption(<span class="hljs-string">&quot;alice&quot;</span>, <span class="hljs-string">&quot;my_collection_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

aliases, err := client.ListAliases(ctx, milvusclient.NewListAliasesOption(<span class="hljs-string">&quot;my_collection_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(aliases)

aliases, err = client.ListAliases(ctx, milvusclient.NewListAliasesOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(aliases)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/alter&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;,
    &quot;collectionName&quot;: &quot;my_collection_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;alice&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;my_collection_2&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;alice&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Alias" class="common-anchor-header">별칭 삭제<button data-href="#Drop-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 스니펫은 별칭을 삭제하는 절차를 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.5 Drop aliases</span>
client.drop_alias(
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

client.drop_alias(
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DropAliasReq;

<span class="hljs-comment">// 9.5 Drop alias</span>
<span class="hljs-type">DropAliasReq</span> <span class="hljs-variable">dropAliasReq</span> <span class="hljs-operator">=</span> DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.5 Drop aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropAlias(ctx, milvusclient.NewDropAliasOption(<span class="hljs-string">&quot;bob&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.DropAlias(ctx, milvusclient.NewDropAliasOption(<span class="hljs-string">&quot;alice&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
