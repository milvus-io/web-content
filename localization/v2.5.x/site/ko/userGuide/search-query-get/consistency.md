---
id: consistency.md
summary: Milvus의 4가지 일관성 수준에 대해 알아보세요.
title: 일관성
---
<h1 id="Consistency-Level​" class="common-anchor-header">일관성 수준<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>분산형 벡터 데이터베이스로서 Milvus는 읽기 및 쓰기 작업 중에 각 노드 또는 복제본이 동일한 데이터에 액세스할 수 있도록 여러 수준의 일관성을 제공합니다. 현재 지원되는 일관성 수준에는 <strong>강함</strong>, <strong>경계</strong>, <strong>최종</strong>, <strong>세션이</strong> 있으며, 기본 일관성 수준은 <strong>경계가</strong> 사용됩니다.</p>
<h2 id="Overview​" class="common-anchor-header">개요<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 저장과 계산을 분리하는 시스템입니다. 이 시스템에서 <strong>데이터 노드는</strong> 데이터의 지속성을 담당하며 궁극적으로 MinIO/S3와 같은 분산형 객체 스토리지에 데이터를 저장합니다. <strong>쿼리 노드는</strong> 검색과 같은 계산 작업을 처리합니다. 이러한 작업에는 <strong>배치 데이터와</strong> <strong>스트리밍 데이터</strong> 처리가 모두 포함됩니다. 간단히 말해, 배치 데이터는 이미 객체 스토리지에 저장된 데이터로 이해할 수 있으며, 스트리밍 데이터는 아직 객체 스토리지에 저장되지 않은 데이터를 말합니다. 네트워크 지연 시간으로 인해 쿼리 노드는 종종 가장 최근의 스트리밍 데이터를 보유하지 않습니다. 추가적인 안전장치 없이 스트리밍 데이터에서 직접 검색을 수행하면 커밋되지 않은 많은 데이터 포인트가 손실되어 검색 결과의 정확도에 영향을 미칠 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>배치 데이터와 스트리밍 데이터</span> </span></p>
<p>위 그림에서 보듯이, 쿼리 노드는 검색 요청을 받은 후 스트리밍 데이터와 배치 데이터를 동시에 수신할 수 있습니다. 하지만 네트워크 지연 시간으로 인해 쿼리 노드가 얻은 스트리밍 데이터는 불완전할 수 있습니다.</p>
<p>이 문제를 해결하기 위해 Milvus는 데이터 대기열의 각 레코드에 타임스탬프를 찍고 데이터 대기열에 동기화 타임스탬프를 지속적으로 삽입합니다. 동기화 타임스탬프(syncT)가 수신될 때마다 쿼리 노드는 이를 서비스 시간으로 설정하여 쿼리 노드가 해당 서비스 시간 이전의 모든 데이터를 볼 수 있도록 합니다. 밀버스는 서비스 타임을 기반으로 일관성과 가용성에 대한 다양한 사용자 요구 사항을 충족하기 위해 보증 타임스탬프(GuaranteeT)를 제공할 수 있습니다. 사용자는 검색 요청에 GuaranteeT를 지정하여 검색 범위에 특정 시점 이전의 데이터를 포함해야 할 필요성을 쿼리 노드에 알릴 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>서비스 시간 및 보장 시간</span> </span></p>
<p>위 그림에서 보듯이, GuaranteeTs가 ServiceTime보다 작으면 지정된 시점 이전의 모든 데이터가 디스크에 완전히 기록되었으므로 쿼리 노드가 즉시 검색 작업을 수행할 수 있음을 의미합니다. GuaranteeTs가 ServiceTime보다 큰 경우, 쿼리 노드는 검색 작업을 실행하기 전에 ServiceTime이 GuaranteeTs를 초과할 때까지 기다려야 합니다.</p>
<p>사용자는 쿼리 정확도와 쿼리 지연 시간 사이에서 절충점을 찾아야 합니다. 일관성 요구 사항이 높고 쿼리 지연 시간에 민감하지 않은 사용자는 GuaranteeT를 가능한 한 큰 값으로 설정할 수 있으며, 검색 결과를 빠르게 받기를 원하고 쿼리 정확도에 더 관대한 사용자는 GuaranteeT를 더 작은 값으로 설정할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>일관성 수준 예시</span> </span></p>
<p>Milvus는 서로 다른 보장값을 가진 네 가지 유형의 일관성 수준을 제공합니다.</p>
<ul>
<li><p><strong>강함</strong></p>
<p>가장 최근의 타임스탬프가 보장 시간으로 사용되며, 쿼리 노드는 검색 요청을 실행하기 전에 서비스 시간이 보장 시간을 충족할 때까지 기다려야 합니다.</p></li>
<li><p><strong>최종</strong></p>
<p>모든 배치 데이터에 대해 쿼리 노드가 즉시 검색 요청을 실행할 수 있도록 일관성 검사를 피하기 위해 1과 같이 매우 작은 값으로 GuaranteeTs를 설정합니다.</p></li>
<li><p><strong>바운드</strong>(기본값)</p>
<p>특정 데이터 손실이 허용되는 범위 내에서 쿼리 노드가 검색을 수행하도록 하기 위해 최신 타임스탬프보다 앞선 시점으로 GuranteeTs를 설정합니다.</p></li>
<li><p><strong>세션</strong></p>
<p>클라이언트가 데이터를 삽입하는 최신 시점을 보장 시점으로 사용하여 쿼리 노드가 클라이언트가 삽입한 모든 데이터에 대해 검색을 수행할 수 있도록 합니다.</p></li>
</ul>
<p>Milvus는 기본 일관성 수준으로 Bounded Staleness를 사용합니다. GuaranteeT를 지정하지 않으면 가장 최근의 ServiceTime이 GuaranteeT로 사용됩니다.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">일관성 수준 설정<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 만들 때와 검색 및 쿼리를 수행할 때 서로 다른 일관성 수준을 설정할 수 있습니다.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">컬렉션 생성 시 일관성 수준 설정</h3><p>컬렉션을 만들 때 컬렉션 내의 검색 및 쿼리에 대한 일관성 수준을 설정할 수 있습니다. 다음 코드 예제는 일관성 수준을 <strong>Bounded로</strong> 설정합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">consistency_level</code> 매개변수에 사용할 수 있는 값은 <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, <code translate="no">Session</code> 입니다.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">검색에서 일관성 수준 설정</h3><p>특정 검색의 일관성 수준을 언제든지 변경할 수 있습니다. 다음 코드 예제는 일관성 수준을 다시 Bounded로 설정합니다. 변경 사항은 현재 검색 요청에만 적용됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>이 매개변수는 하이브리드 검색 및 검색 반복기에서도 사용할 수 있습니다. <code translate="no">consistency_level</code> 매개변수의 가능한 값은 <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, <code translate="no">Session</code> 입니다.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">쿼리에서 일관성 수준 설정</h3><p>특정 검색의 일관성 수준을 언제든지 변경할 수 있습니다. 다음 코드 예제에서는 일관성 수준을 <strong>Eventually로</strong> 설정합니다. 이 설정은 현재 쿼리 요청에만 적용됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>이 매개 변수는 쿼리 반복기에서도 사용할 수 있습니다. <code translate="no">consistency_level</code> 매개변수에 사용할 수 있는 값은 <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, <code translate="no">Session</code> 입니다.</p>
