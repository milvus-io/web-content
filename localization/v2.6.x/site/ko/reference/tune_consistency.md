---
id: tune_consistency.md
title: 일관성 수준
summary: >-
  분산 벡터 데이터베이스인 Milvus는 읽기 및 쓰기 작업 시 각 노드나 복제본이 동일한 데이터에 접근할 수 있도록 보장하기 위해 여러
  수준의 일관성을 제공합니다. 현재 지원되는 일관성 수준으로는 Strong, Bounded, Eventually, Session이 있으며,
  Bounded가 기본 일관성 수준으로 사용됩니다.
---
<h1 id="Consistency-Level" class="common-anchor-header">일관성 수준<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>분산 벡터 데이터베이스인 Milvus는 읽기 및 쓰기 작업 시 각 노드나 복제본이 동일한 데이터에 접근할 수 있도록 여러 수준의 일관성을 제공합니다. 현재 지원되는 일관성 수준으로는 <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong>, <strong>Session이</strong> 있으며, <strong>Bounded가</strong> 기본 일관성 수준으로 사용됩니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 스토리지와 연산을 분리하는 시스템입니다. <strong>스트리밍 노드는</strong> 모든 쓰기 작업을 WAL(Write-Ahead Log)에 추가하고, WAL에 남아 있으며 아직 영구 저장되지 않은 데이터, 즉 <strong>지속적으로 증가하는 데이터를</strong> 보관합니다. 복구 프로세스는 증가 중인 데이터를 <strong>과거 데이터</strong> (MinIO/S3와 같은 객체 스토리지에 영구 저장된 씰된 세그먼트)로 변환하며, 이 <strong>데이터는 쿼리 노드에서</strong> 제공됩니다. 각 검색 또는 쿼리 요청은 컬렉션의 WAL을 호스팅하는 스트리밍 노드의 <strong>쿼리 델리게이터</strong> (Query <strong>Delegator</strong> )에 수신됩니다. 델리게이터는 쿼리 계획을 생성하고, 증가 중인 데이터 부분을 로컬에서 실행하며, 과거 데이터 부분을 관련 쿼리 노드로 전달한 후, 결과를 병합하여 반환합니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/streaming_service.md">스트리밍 서비스(Streaming Service</a>)를 참조하십시오.</p>
<p>일관성을 보장하기 위해 Milvus는 모든 메시지에 WAL 내 순서를 결정하는 타임스탬프 오라클(TSO) 타임스탬프를 할당하고, 데이터 메시지와 함께 동기화 타임스탬프를 WAL에 지속적으로 삽입합니다. 동기화 타임스탬프(syncTs)가 수신될 때마다 이는 ServiceTime으로 기록되며, 이는 해당 ServiceTime 이전의 모든 데이터가 쿼리를 통해 조회 가능함을 의미합니다. Milvus는 ServiceTime을 기반으로 일관성과 가용성에 대한 다양한 사용자 요구 사항을 충족하기 위해 보장 타임스탬프(GuaranteeTs)를 제공합니다. 사용자는 검색 요청에 GuaranteeTs를 지정하여, 지정된 시점 이전의 데이터를 검색 범위에 포함해야 할 필요성을 위임자에게 알릴 수 있습니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" /> 
   <span>서비스 타임과 보증 타임</span>
  
 </span></p>
<p>위 그림에서 볼 수 있듯이, GuaranteeTs가 ServiceTime보다 작다면 지정된 시점 이전의 모든 데이터가 이미 가시화되어 있으므로 검색을 즉시 실행할 수 있습니다. GuaranteeTs가 ServiceTime보다 크면, ServiceTime이 GuaranteeTs를 초과할 때까지 기다린 후에야 검색을 실행할 수 있습니다.</p>
<p>사용자는 쿼리 정확도와 쿼리 지연 시간 사이에서 절충점을 찾아야 합니다. 일관성 요구 사항이 높고 쿼리 지연 시간에 민감하지 않은 사용자는 GuaranteeTs를 가능한 한 큰 값으로 설정할 수 있습니다. 반면, 검색 결과를 빠르게 받고자 하며 쿼리 정확도에 대한 허용 범위가 넓은 사용자는 GuaranteeTs를 더 작은 값으로 설정할 수 있습니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" /> 
   <span>일관성 수준 예시</span>
  
 </span></p>
<p>Milvus는 서로 다른 GuaranteeTs를 가진 네 가지 유형의 일관성 수준을 제공합니다.</p>
<ul>
<li><p><strong>Strong</strong></p>
<p>최신 타임스탬프가 GuaranteeTs로 사용되며, 검색은 ServiceTime이 GuaranteeTs에 도달할 때까지 기다린 후 실행됩니다.</p></li>
<li><p><strong>Eventual</strong></p>
<p>GuaranteeTs는 1과 같이 매우 작은 값으로 설정되어 일관성 검사를 피함으로써, 검색이 현재 표시된 데이터를 기반으로 즉시 실행됩니다.</p></li>
<li><p><strong>제한된 오래된 데이터 허용</strong></p>
<p>GuaranteeTs를 최신 타임스탬프보다 이전 시점으로 설정하여, 일부 최근 데이터가 아직 표시되지 않을 수 있다는 점을 허용 범위 내에서 검색이 실행되도록 합니다.</p></li>
<li><p><strong>세션</strong></p>
<p>클라이언트가 데이터를 삽입한 가장 최근 시점을 GuaranteeTs로 사용하여, 검색이 클라이언트가 삽입한 모든 데이터를 포함할 수 있도록 합니다.</p></li>
</ul>
<p>Milvus는 Bounded Staleness를 기본 일관성 수준으로 사용합니다. GuaranteeTs가 지정되지 않은 경우, 최신 ServiceTime이 GuaranteeTs로 사용됩니다.</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">일관성 수준 설정<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 생성할 때뿐만 아니라 검색 및 쿼리를 수행할 때도 다양한 일관성 수준을 설정할 수 있습니다.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">컬렉션 생성 시 일관성 수준 설정<button data-href="#Set-Consistency-Level-upon-Creating-Collection" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션을 생성할 때, 해당 컬렉션 내의 검색 및 쿼리에 대한 일관성 수준을 설정할 수 있습니다. 다음 코드 예제는 일관성 수준을 <strong>Bounded로</strong> 설정합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.BOUNDED)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">consistency_level</code> 매개변수의 가능한 값은 <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> 및 <code translate="no">Session</code> 입니다.</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">검색에서 일관성 수준 설정<button data-href="#Set-Consistency-Level-in-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 검색에 대한 일관성 수준은 언제든지 변경할 수 있습니다. 다음 코드 예제는 일관성 수준을 다시 <strong>‘Bounded’로</strong> 설정합니다. 이 변경 사항은 현재 검색 요청에만 적용됩니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 매개변수는 하이브리드 검색 및 검색 반복자에서도 사용할 수 있습니다. ` <code translate="no">consistency_level</code> ` 매개변수의 가능한 값은 ` <code translate="no">Strong</code>`, ` <code translate="no">Bounded</code>`, ` <code translate="no">Eventually</code>` 및 ` <code translate="no">Session</code>`입니다.</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">쿼리에서 일관성 수준 설정<button data-href="#Set-Consistency-Level-in-Query" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 검색에 대한 일관성 수준은 언제든지 변경할 수 있습니다. 다음 코드 예제는 일관성 수준을 <strong>Eventually로</strong> 설정합니다. 이 설정은 현재 쿼리 요청에만 적용됩니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).
    WithLimit(<span class="hljs-number">3</span>).
    WithConsistencyLevel(entity.ClEventually))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 매개변수는 쿼리 이터레이터에서도 사용할 수 있습니다. ` <code translate="no">consistency_level</code> ` 매개변수의 가능한 값은 ` <code translate="no">Strong</code>`, ` <code translate="no">Bounded</code>`, ` <code translate="no">Eventually</code>` 및 ` <code translate="no">Session</code>`입니다.</p>
