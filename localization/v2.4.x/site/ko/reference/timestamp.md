---
id: timestamp.md
title: Milvus의 타임스탬프
summary: 타임스탬프의 개념과 Milvus 벡터 데이터베이스의 네 가지 주요 타임스탬프 관련 매개변수에 대해 알아보세요.
---
<h1 id="Timestamp" class="common-anchor-header">타임스탬프<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 타임스탬프의 개념을 설명하고 Milvus 벡터 데이터베이스의 네 가지 주요 타임스탬프 관련 매개변수를 소개합니다.</p>
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
    </button></h2><p>Milvus는 비정형 데이터에서 변환된 벡터를 검색하고 쿼리할 수 있는 벡터 데이터베이스입니다. <a href="https://milvus.io/docs/v2.1.x/data_processing.md">데이터 삽입 및 삭제를</a> 포함한 데이터 조작 언어(DML) 작업을 수행할 때 Milvus는 작업과 관련된 엔티티에 타임스탬프를 할당합니다. 따라서 Milvus의 모든 엔티티에는 타임스탬프 속성이 있습니다. 그리고 동일한 DML 작업의 엔티티 일괄 처리에는 동일한 타임스탬프 값이 공유됩니다.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">타임스탬프 매개변수<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 벡터 유사성 검색이나 쿼리를 수행할 때 몇 가지 타임스탬프 관련 매개변수가 관련됩니다.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> 는 벡터 유사도 검색 또는 쿼리를 수행할 때 <code translate="no">Guarantee_timestamp</code> 이전의 DML 작업에 의한 모든 데이터 업데이트가 표시되도록 하는 데 사용되는 타임스탬프 유형입니다. 예를 들어 오후 3시에 데이터 배치를 삽입하고 오후 5시에 다른 배치를 삽입한 경우, 벡터 유사도 검색 중에 <code translate="no">Guarantee_timestamp</code> 값이 오후 6시로 설정됩니다. 즉, 오후 3시와 오후 5시에 각각 삽입된 두 개의 데이터 배치가 검색에 포함되어야 합니다.</p>
<p><code translate="no">Guarantee_timestamp</code> 을 설정하지 않으면 Milvus는 검색 요청이 이루어진 시점을 자동으로 가져옵니다. 따라서 검색 전에 DML 작업에 의해 모든 데이터가 업데이트된 데이터 뷰에서 검색이 수행됩니다.</p>
<p>Milvus 내부의 <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO를</a> 이해하는 수고를 덜기 위해 사용자는 <code translate="no">Guarantee_timestamp</code> 파라미터를 직접 구성할 필요가 없습니다. <a href="https://milvus.io/docs/v2.1.x/consistency.md">일관성 수준만</a> 선택하면 Milvus가 <code translate="no">Guarantee_timestamp</code> 파라미터를 자동으로 처리합니다. 각 일관성 수준은 특정 <code translate="no">Guarantee_timestamp</code> 값에 해당합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>보장_타임스탬프</span>. </span></p>
<h4 id="Example" class="common-anchor-header">예시</h4><p>위 그림과 같이 <code translate="no">Guarantee_timestamp</code> 값은 <code translate="no">2021-08-26T18:15:00</code> 으로 설정되어 있습니다(단순화를 위해 이 예제에서 타임스탬프는 실제 시간으로 표시됨). 검색 또는 쿼리를 수행하면 2021-08-26T18:15:00 이전의 모든 데이터가 검색 또는 쿼리됩니다.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> 는 Milvus의 쿼리 노드에서 자동으로 생성 및 관리하는 타임스탬프 유형입니다. 쿼리 노드에서 어떤 DML 작업이 실행되었는지를 나타내는 데 사용됩니다.</p>
<p>쿼리 노드가 관리하는 데이터는 두 가지 유형으로 분류할 수 있습니다:</p>
<ul>
<li><p>기록 데이터(또는 배치 데이터라고도 함)</p></li>
<li><p>증분 데이터(또는 스트리밍 데이터라고도 함).</p></li>
</ul>
<p>Milvus에서는 검색이나 쿼리를 수행하기 전에 데이터를 로드해야 합니다. 따라서 컬렉션의 배치 데이터는 검색 또는 쿼리 요청이 이루어지기 전에 쿼리 노드에 의해 로드됩니다. 그러나 스트리밍 데이터는 즉석에서 Milvus에 삽입되거나 삭제되므로 쿼리 노드는 DML 작업과 검색 또는 쿼리 요청에 대한 타임라인을 유지해야 합니다. 따라서 쿼리 노드는 <code translate="no">Service_timestamp</code> 을 사용하여 이러한 타임라인을 유지합니다. <code translate="no">Service_timestamp</code> 은 특정 데이터가 표시되는 시점으로 볼 수 있으며, 쿼리 노드는 <code translate="no">Service_timestamp</code> 이전의 모든 DML 작업이 완료되었는지 확인할 수 있습니다.</p>
<p>들어오는 검색 또는 쿼리 요청이 있을 때 쿼리 노드는 <code translate="no">Service_timestamp</code> 와 <code translate="no">Guarantee_timestamp</code> 의 값을 비교합니다. 주로 두 가지 시나리오가 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>서비스_타임스탬프</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">시나리오 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>그림 1과 같이 <code translate="no">Guarantee_timestamp</code> 의 값은 <code translate="no">2021-08-26T18:15:00</code> 으로 설정되어 있습니다. <code translate="no">Service_timestamp</code> 의 값이 <code translate="no">2021-08-26T18:15:01</code> 로 증가하면 <code translate="no">Guarantee_timestamp</code> 로 표시된 시간 이전의 DML 작업을 포함하여 이 시점 이전의 모든 DML 작업이 쿼리 노드에서 실행되고 완료됩니다. 결과적으로 검색 또는 쿼리 요청이 즉시 실행될 수 있습니다.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">시나리오 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>그림 2에서와 같이 <code translate="no">Guarantee_timestamp</code> 의 값은 <code translate="no">2021-08-26T18:15:00</code> 으로 설정되어 있고 <code translate="no">Service_timestamp</code> 의 현재 값은 <code translate="no">2021-08-26T18:14:55</code> 입니다. 즉, <code translate="no">2021-08-26T18:14:55</code> 이전의 DML 작업만 실행되고 완료되며, 이 시점 이후이지만 <code translate="no">Guarantee_timestamp</code> 이전의 DML 작업 중 일부는 완료되지 않은 상태로 남습니다. 이 시점에서 검색 또는 쿼리가 실행되면 필요한 데이터 중 일부는 보이지 않고 아직 사용할 수 없어 검색 또는 쿼리 결과의 정확도에 심각한 영향을 미칩니다. 따라서 쿼리 노드는 <code translate="no">guarantee_timestamp</code> 이전의 DML 작업이 완료될 때까지(즉, <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>)까지 검색 또는 쿼리 요청을 보류해야 합니다.</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>엄밀히 말하면 <code translate="no">Graceful_time</code> 은 타임스탬프가 아니라 기간(예: 100ms)을 의미합니다. 그러나 <code translate="no">Graceful_time</code> 은 <code translate="no">Guarantee_timestamp</code> 및 <code translate="no">Service_timestamp</code> 과 밀접한 관련이 있기 때문에 언급할 가치가 있습니다. <code translate="no">Graceful_time</code> 은 Milvus 구성 파일에서 구성 가능한 매개변수입니다. 특정 데이터가 표시되기까지 허용될 수 있는 기간을 나타내는 데 사용됩니다. 즉, <code translate="no">Graceful_time</code> 동안 완료되지 않은 DML 작업은 허용될 수 있습니다.</p>
<p>들어오는 검색 또는 쿼리 요청이 있을 때 두 가지 시나리오가 있을 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">시나리오 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>그림 1과 같이 <code translate="no">Guarantee_timestamp</code> 의 값은 <code translate="no">2021-08-26T18:15:01</code> 으로, <code translate="no">Graceful_time</code> 은 <code translate="no">2s</code> 으로 설정됩니다. <code translate="no">Service_timestamp</code> 의 값은 <code translate="no">2021-08-26T18:15:00</code> 으로 증가합니다. <code translate="no">Service_timestamp</code> 의 값은 여전히 <code translate="no">Guarantee_timestamp</code> 보다 작고 <code translate="no">2021-08-26T18:15:01</code> 이전의 모든 DML 작업이 완료되지는 않지만, <code translate="no">Graceful_time</code> 의 값에 표시된 대로 2초의 데이터 보이지 않는 기간이 허용되므로 들어오는 검색 또는 조회 요청을 즉시 실행할 수 있습니다.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">시나리오 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>그림 2에서와 같이 <code translate="no">Guarantee_timestamp</code> 의 값은 <code translate="no">2021-08-26T18:15:01</code> 으로, <code translate="no">Graceful_time</code> 은 <code translate="no">2s</code> 으로 설정됩니다. 현재 <code translate="no">Service_timestamp</code> 의 값은 <code translate="no">2021-08-26T18:14:54</code> 에 불과합니다. 즉, 예상되는 DML 작업이 아직 완료되지 않았으며 2초의 유예 시간이 주어지더라도 데이터 비가시성은 여전히 견딜 수 없는 수준입니다. 따라서 쿼리 노드는 특정 DML 요청이 완료될 때까지(즉, <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>) 검색 또는 쿼리 요청을 미뤄야 합니다.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="/docs/ko/v2.4.x/consistency.md">보증 타임스탬프를 통해 Milvus에서 일관성을 조정하는</a> 방법 알아보기</li>
</ul>
