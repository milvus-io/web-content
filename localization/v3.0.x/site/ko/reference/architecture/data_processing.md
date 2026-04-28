---
id: data_processing.md
summary: Milvus의 데이터 처리 절차에 대해 알아보세요.
title: 데이터 처리
---
<h1 id="Data-Processing" class="common-anchor-header">데이터 처리<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>이 문서에서는 Milvus에서 데이터 삽입, 인덱스 구축 및 데이터 쿼리를 구현하는 방법에 대해 자세히 설명합니다.</p>
<h2 id="Data-insertion" class="common-anchor-header">데이터 삽입<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 컬렉션이 사용하는 샤드 수를 선택할 수 있으며, 각 샤드는 가상 채널<em>(vchannel)</em>에 매핑됩니다. 아래 그림과 같이 Milvus는 모든 <em>v채널을</em> 물리적 채널<em>(p채널)</em>에 할당하고 각 <em>p채널은</em> 특정 스트리밍 노드에 바인딩됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>V채널 PC채널과 스트리밍 노드</span> </span></p>
<p>데이터 확인 후 프록시는 지정된 샤드 라우팅 규칙에 따라 작성된 메시지를 다양한 샤드 데이터 패키지로 분할합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>채널 1</span> </span></p>
<p>그런 다음 한 샤드<em>(v채널)</em>의 기록된 데이터는 <em>p채널의</em> 해당 스트리밍 노드로 전송됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>쓰기 흐름</span> </span></p>
<p>스트리밍 노드는 각 데이터 패킷에 타임스탬프 오라클(TSO)을 할당하여 전체 작업 순서를 설정합니다. 그리고 페이로드에 대한 일관성 검사를 수행한 후 기본 WAL(Write-Ahead Log)에 기록합니다. 데이터가 WAL에 영구적으로 커밋되면 데이터가 손실되지 않도록 보장되며, 크래시가 발생하더라도 스트리밍 노드는 WAL을 재생하여 보류 중인 모든 작업을 완전히 복구할 수 있습니다.</p>
<p>한편, 스트리밍 노드는 커밋된 WAL 항목을 비동기적으로 개별 세그먼트로 잘게 쪼개기도 합니다. 세그먼트 유형에는 두 가지가 있습니다:</p>
<ul>
<li><strong>성장 중인 세그먼트</strong>: 오브젝트 스토리지에 보존되지 않은 모든 데이터.</li>
<li>봉인된<strong>세그먼트</strong>: 모든 데이터가 오브젝트 스토리지에 보존되어 있으며, 봉인된 세그먼트의 데이터는 변경되지 않습니다.</li>
</ul>
<p>성장하는 세그먼트가 봉인된 세그먼트로 전환되는 것을 플러시라고 합니다. 스트리밍 노드는 해당 세그먼트에 대해 사용 가능한 모든 WAL 항목을 수집하고 기록하는 즉시, 즉 기본 쓰기 전 로그에 더 이상 보류 중인 레코드가 없을 때 플러시를 트리거하며, 이 시점에서 세그먼트가 마무리되고 읽기에 최적화됩니다.</p>
<h2 id="Index-building" class="common-anchor-header">인덱스 구축<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스 구축은 데이터 노드별로 수행됩니다. 데이터 업데이트를 위한 잦은 인덱스 구축을 피하기 위해 Milvus의 컬렉션은 각각 고유한 인덱스가 있는 세그먼트로 더 세분화됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>인덱스 구축</span> </span></p>
<p>Milvus는 각 벡터 필드, 스칼라 필드 및 기본 필드에 대한 인덱스 구축을 지원합니다. 인덱스 구축의 입력과 출력은 모두 객체 스토리지와 연동됩니다: 데이터 노드는 인덱싱할 로그 스냅샷을 세그먼트(객체 스토리지에 있는)에서 메모리로 로드하고, 해당 데이터와 메타데이터를 역직렬화하여 인덱스를 구축하고, 인덱스 구축이 완료되면 인덱스를 직렬화하여 객체 스토리지에 다시 씁니다.</p>
<p>인덱스 구축은 주로 벡터와 행렬 연산을 포함하므로 연산과 메모리 집약적입니다. 벡터는 고차원적 특성으로 인해 기존의 트리 기반 인덱스로는 효율적으로 색인할 수 없지만 클러스터 또는 그래프 기반 인덱스와 같이 이 주제에서 더 성숙한 기술을 사용하여 색인할 수 있습니다. 그 유형에 관계없이, 인덱스를 구축하려면 Kmeans나 그래프 트래버스 같은 대규모 벡터에 대한 대규모 반복 계산이 필요합니다.</p>
<p>스칼라 데이터에 대한 인덱싱과 달리, 벡터 인덱스를 구축하려면 SIMD(단일 명령어, 다중 데이터) 가속을 최대한 활용해야 합니다. Milvus는 SSE, AVX2, AVX512와 같은 SIMD 명령어 집합을 기본적으로 지원합니다. 벡터 인덱스 구축의 "딸꾹질"과 리소스 집약적인 특성을 고려할 때, 탄력성은 경제적인 측면에서 Milvus에게 매우 중요합니다. 향후 Milvus 릴리스에서는 이기종 컴퓨팅과 서버리스 컴퓨팅에 대한 추가 탐색을 통해 관련 비용을 절감할 수 있을 것입니다.</p>
<p>또한 Milvus는 스칼라 필터링과 기본 필드 쿼리도 지원합니다. 블룸 필터 인덱스, 해시 인덱스, 트리 기반 인덱스, 반전 인덱스 등 쿼리 효율성을 개선하기 위한 인덱스가 내장되어 있으며, 비트맵 인덱스와 러프 인덱스 등 더 많은 외부 인덱스를 도입할 계획입니다.</p>
<h2 id="Data-query" class="common-anchor-header">데이터 쿼리<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터 쿼리는 지정된 컬렉션에서 대상 벡터에 가장 가까운 벡터의 개수 또는 벡터와 지정된 거리 범위 내의 <em>모든</em> 벡터를 검색하는 프로세스를 말합니다. 벡터는 해당 기본 키 및 필드와 함께 반환됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>데이터 쿼리</span> </span></p>
<p>Milvus의 컬렉션은 여러 세그먼트로 분할되며, 스트리밍 노드는 증가하는 세그먼트를 로드하고 실시간 데이터를 유지하는 반면, 쿼리 노드는 봉인된 세그먼트를 로드합니다.</p>
<p>쿼리/검색 요청이 도착하면 프록시는 동시 검색을 위해 관련 샤드를 담당하는 모든 스트리밍 노드에 요청을 브로드캐스트합니다.</p>
<p>쿼리 요청이 도착하면 프록시는 해당 샤드를 보유한 스트리밍 노드에 동시에 검색을 실행하도록 요청합니다.</p>
<p>각 스트리밍 노드는 쿼리 계획을 생성하고 로컬에서 증가하는 데이터를 검색하며 동시에 원격 쿼리 노드에 연결하여 과거 결과를 검색한 다음, 이를 하나의 샤드 결과로 집계합니다.</p>
<p>마지막으로 프록시는 모든 샤드 결과를 수집하여 최종 결과로 병합한 후 클라이언트에 반환합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>핸드오프</span> </span></p>
<p>스트리밍 노드에서 증가하는 세그먼트가 봉인된 세그먼트로 플러시되거나 데이터 노드가 압축을 완료하면, 코디네이터는 핸드오프 작업을 시작하여 증가하는 데이터를 기록 데이터로 변환합니다. 그런 다음 코디네이터는 봉인된 세그먼트를 모든 쿼리 노드에 균등하게 분배하여 메모리 사용량, CPU 오버헤드, 세그먼트 수의 균형을 맞추고 중복 세그먼트를 해제합니다.</p>
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
<li><a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">실시간 쿼리를 위해 Milvus 벡터 데이터베이스를 사용하는</a> 방법에 대해 알아보세요.</li>
<li><a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus의 데이터 삽입 및 데이터 지속성에</a> 대해 알아보세요.</li>
<li><a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus에서 데이터가</a> 어떻게 <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">처리되는지</a> 알아보세요.</li>
</ul>
