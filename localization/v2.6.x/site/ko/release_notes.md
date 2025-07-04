---
id: release_notes.md
summary: Milvus 릴리스 노트
title: 릴리스 노트
---
<h1 id="Release-Notes" class="common-anchor-header">릴리스 노트<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 새로운 기능을 알아보세요! 이 페이지에는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 사항이 요약되어 있습니다. 이 섹션에서 v2.6.0 이후 출시된 각 버전에 대한 릴리스 노트를 확인할 수 있습니다. 이 페이지를 정기적으로 방문하여 업데이트에 대해 알아보는 것이 좋습니다.</p>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2025년 6월 18일</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus 버전</th><th style="text-align:center">Python SDK 버전</th><th style="text-align:center">Node.js SDK 버전</th><th style="text-align:center">Java SDK 버전</th><th style="text-align:center">Go SDK 버전</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1은 배포 복잡성을 줄여 운영 효율성, 리소스 활용도, 총 소유 비용을 개선하도록 설계된 단순화된 클라우드 네이티브 아키텍처를 도입합니다. 이번 릴리스에는 성능, 검색, 개발에 중점을 둔 새로운 기능이 추가되었습니다. 주요 기능으로는 성능 향상을 위한 고정밀 1비트 양자화(RaBitQ) 및 동적 캐시 계층, MinHash를 통한 거의 중복 없는 탐지 및 고급 검색을 위한 정밀한 구문 매칭, 개발자의 경험을 향상시키는 온라인 스키마 수정을 통한 자동 임베딩 기능 등이 있습니다.</p>
<div class="alert note">
<p>이 버전은 Milvus 2.6.0의 사전 릴리스 버전입니다. 최신 기능을 사용해 보려면 이 버전을 새로 배포하여 설치하세요. Milvus v2.5.x 이하에서 2.6.0-rc1로 업그레이드하는 것은 지원되지 않습니다.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">아키텍처 변경 사항</h3><p>2.6부터 Milvus는 성능, 확장성 및 사용 편의성을 개선하기 위한 중요한 아키텍처 변경 사항을 도입했습니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/architecture_overview.md">Milvus 아키텍처 개요를</a> 참조하세요.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">스트리밍 노드(GA)</h4><p>이전 버전에서는 스트리밍 데이터가 프록시에 의해 WAL에 쓰여지고 쿼리노드와 데이터노드에 의해 읽혀졌습니다. 이 아키텍처는 쓰기 측에서 합의를 달성하기 어려웠고 읽기 측에서 복잡한 로직이 필요했습니다. 또한 쿼리 위임자가 쿼리 노드에 위치하여 확장성을 저해했습니다. Milvus 2.5.0에서는 2.6.0 버전에서 GA가 되는 스트리밍 노드가 도입되었습니다. 이 구성 요소는 이제 모든 샤드 수준의 WAL 읽기/쓰기 작업을 담당하며 쿼리 위임자 역할도 수행하여 앞서 언급한 문제를 해결하고 새로운 최적화를 가능하게 합니다.</p>
<p><strong>중요 업그레이드 공지</strong>: 스트리밍 노드는 아키텍처가 크게 변경되었으므로 이전 버전에서 Milvus 2.6.0-rc1로 직접 업그레이드하는 것은 지원되지 않습니다.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">딱따구리 네이티브 WAL</h4><p>Milvus는 이전에 WAL을 위해 Kafka 또는 Pulsar와 같은 외부 시스템에 의존했습니다. 이러한 시스템은 기능적으로는 훌륭했지만, 특히 중소규모 배포의 경우 상당한 운영 복잡성과 리소스 오버헤드를 추가했습니다. Milvus 2.6에서는 이러한 시스템이 특수 목적의 클라우드 네이티브 WAL 시스템인 Woodpecker로 대체됩니다. 우드페커는 오브젝트 스토리지용으로 설계되어 로컬 및 오브젝트 스토리지 기반 제로 디스크 모드를 모두 지원하며, 운영을 간소화하는 동시에 성능과 확장성을 개선합니다.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">데이터노드와 인덱스노드 병합</h4><p>Milvus 2.6에서는 압축, 대량 가져오기, 통계 수집, 인덱스 구축과 같은 작업이 이제 통합된 스케줄러로 관리됩니다. 이전에 데이터 노드에서 처리하던 데이터 지속성 기능이 스트리밍 노드로 옮겨졌습니다. 배포와 유지 관리를 간소화하기 위해 IndexNode와 DataNode가 단일 DataNode 구성 요소로 병합되었습니다. 이제 이 통합 노드가 이러한 모든 중요한 작업을 실행하여 운영 복잡성을 줄이고 리소스 활용을 최적화합니다.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">코디네이터를 MixCoord로 병합</h4><p>별도의 RootCoord, QueryCoord, DataCoord 모듈을 사용한 이전 설계에서는 모듈 간 통신에 복잡성이 발생했습니다. 시스템 설계를 단순화하기 위해 이러한 구성 요소는 MixCoord라는 단일 통합 코디네이터로 병합되었습니다. 이러한 통합은 네트워크 기반 통신을 내부 함수 호출로 대체하여 분산 프로그래밍의 복잡성을 줄여 시스템 운영의 효율성을 높이고 개발 및 유지보수를 간소화합니다.</p>
<h3 id="Key-Features" class="common-anchor-header">주요 기능</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1비트 양자화</h4><p>대규모 데이터 세트를 처리하기 위해 1비트 양자화는 리소스 활용률과 검색 성능을 향상시키는 데 효과적인 기술입니다. 하지만 기존 방식은 회상률에 부정적인 영향을 미칠 수 있습니다. Milvus 2.6에서는 원 연구 저자와의 협력을 통해 1비트 압축의 리소스 및 성능 이점을 제공하면서 높은 검색 정확도를 유지하는 1비트 양자화 솔루션인 RaBitQ를 도입했습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/ivf-rabitq.md">IVF_RABITQ를</a> 참조하세요.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON 기능 향상</h4><p>Milvus 2.6은 다음과 같은 개선 사항으로 JSON 데이터 유형에 대한 지원을 강화했습니다:</p>
<ul>
<li><strong>성능</strong>: 이제 JSON 경로 인덱싱이 공식적으로 지원되어 JSON 객체 내의 특정 경로(예: <code translate="no">meta.user.location</code>)에 반전된 인덱스를 생성할 수 있습니다. 이렇게 하면 전체 개체 스캔을 피하고 복잡한 필터를 사용한 쿼리의 지연 시간을 개선할 수 있습니다.</li>
<li><strong>기능</strong>: 이번 릴리즈에서는 보다 복잡한 필터링 로직을 지원하기 위해 <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, <code translate="no">CAST</code> 함수에 대한 지원이 추가되었습니다. 앞으로도 JSON 지원에 대한 작업은 계속될 것입니다. 곧 출시될 공식 릴리즈에서는 고도로 중첩된 JSON 데이터의 성능을 획기적으로 개선하도록 설계된 JSON <strong>파쇄</strong> 및 <strong>JSON FLAT 인덱스와</strong> 같은 더욱 강력한 기능을 미리 선보이게 되어 기대가 큽니다.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">분석기/토큰라이저 기능 향상</h4><p>이번 릴리즈에서는 분석기와 토큰화 도구에 대한 몇 가지 업데이트를 통해 텍스트 처리 기능이 크게 향상되었습니다:</p>
<ul>
<li>새로운 분석기 <a href="/docs/ko/v2.6.x/analyzer-overview.md#Example-use">실행</a> 구문을 사용해 토큰화기 구성을 검증할 수 있습니다.</li>
<li>일본어와 한국어 등 아시아 언어에 대한 지원이 향상되도록 <a href="/docs/ko/v2.6.x/lindera-tokenizer.md">Lindera 토큰화기가</a> 통합되었습니다.</li>
<li>이제 행 수준 토큰화기 선택이 지원되며, 다국어 시나리오를 위한 대체품으로 범용 <a href="/docs/ko/v2.6.x/icu-tokenizer.md">ICU 토큰화기를</a> 사용할 수 있습니다.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">임베딩 함수를 사용한 데이터 인, 데이터 아웃</h4><p>Milvus 2.6에는 타사 임베딩 모델(예: OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face)과 직접 통합하여 AI 애플리케이션 개발을 간소화하는 '데이터 인, 데이터 아웃' 기능이 도입되었습니다. 이제 사용자는 원시 텍스트 데이터를 사용하여 삽입 및 쿼리할 수 있으며, Milvus는 지정된 모델 서비스를 자동으로 호출하여 텍스트를 실시간으로 벡터로 변환합니다. 따라서 별도의 벡터 변환 파이프라인이 필요하지 않습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/embedding-function-overview.md">임베딩 기능 개요를</a> 참조하세요.</p>
<h4 id="Phrase-Match" class="common-anchor-header">구문 검색</h4><p>구문 일치는 쿼리의 정확한 단어 순서가 문서 내에서 올바른 순서로 연속적으로 나타날 때만 결과를 반환하는 텍스트 검색 기능입니다.</p>
<p><strong>주요 특징</strong></p>
<ul>
<li>순서에 민감합니다: 단어가 쿼리와 동일한 순서로 나타나야 합니다.</li>
<li>연속 일치: 슬로프 값을 사용하지 않는 한 단어가 서로 바로 옆에 나타나야 합니다.</li>
<li>슬로프(선택 사항): 조정 가능한 매개변수로, 적은 수의 중간 단어를 허용하여 퍼지 구문 일치를 가능하게 합니다.</li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/phrase-match.md">구문 일치를</a> 참조하세요.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH 인덱스(베타)</h4><p>모델 훈련에서 데이터 중복 제거의 필요성을 해결하기 위해 Milvus 2.6에서는 MINHASH_LSH 인덱스에 대한 지원이 추가되었습니다. 이 기능은 중복에 가까운 문서를 식별하기 위해 문서 간의 Jaccard 유사성을 추정하는 계산 효율적이고 확장 가능한 방법을 제공합니다. 사용자는 전처리 과정에서 텍스트 문서에 대한 MinHash 서명을 생성하고 Milvus의 MINHASH_LSH 인덱스를 사용하여 대규모 데이터 세트에서 유사한 콘텐츠를 효율적으로 찾아 데이터 정리 및 모델 품질을 개선할 수 있습니다.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">시간 인식 감쇠 함수</h4><p>Milvus 2.6은 시간이 지남에 따라 정보 값이 변하는 시나리오를 해결하기 위해 시간 인식 감쇠 함수를 도입했습니다. 결과 순위 재조정 중에 사용자는 타임스탬프 필드를 기반으로 지수, 가우스 또는 선형 감쇠 함수를 적용하여 문서의 관련성 점수를 조정할 수 있습니다. 이렇게 하면 뉴스 피드, 이커머스, AI 에이전트의 메모리와 같은 애플리케이션에서 중요한 최신 콘텐츠에 우선순위를 부여할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/decay-ranker-overview.md">감쇠 랭커 개요를</a> 참조하세요.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">온라인 스키마 진화를 위한 필드 추가</h4><p>스키마 유연성을 높이기 위해 Milvus 2.6은 이제 온라인에서 기존 컬렉션의 스키마에 새로운 스칼라 또는 벡터 필드를 추가할 수 있도록 지원합니다. 따라서 애플리케이션 요구 사항이 변경될 때 새 컬렉션을 생성하고 중단 없는 데이터 마이그레이션을 수행할 필요가 없습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/add-fields-to-an-existing-collection.md">기존 컬렉션에 필드 추가하기를</a> 참조하세요.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 벡터 지원</h4><p>8비트 정수 임베딩을 생성하는 양자화된 모델의 사용이 증가함에 따라 Milvus 2.6에서는 INT8 벡터에 대한 기본 데이터 유형 지원이 추가되었습니다. 이를 통해 사용자는 양자화 해제 없이 이러한 벡터를 직접 수집할 수 있어 계산, 네트워크 대역폭, 스토리지 비용을 절감할 수 있습니다. 이 기능은 처음에 HNSW 계열 인덱스에 대해 지원됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/dense-vector.md">고밀도 벡터를</a> 참조하세요.</p>
