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
    </button></h1><p>Milvus의 새로운 기능을 알아보세요! 이 페이지에는 각 릴리스의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정 사항이 요약되어 있습니다. 이 섹션에서 v2.5.0 이후 출시된 각 버전에 대한 릴리스 노트를 확인할 수 있습니다. 이 페이지를 정기적으로 방문하여 업데이트에 대해 알아보는 것이 좋습니다.</p>
<h2 id="v250-beta" class="common-anchor-header">v2.5.0-beta<button data-href="#v250-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>릴리스 날짜: 2024년 11월 26일</p>
<table>
<thead>
<tr><th>Milvus 버전</th><th>Python SDK 버전</th><th>Node.js SDK 버전</th><th>Java SDK 버전</th></tr>
</thead>
<tbody>
<tr><td>2.5.0-beta</td><td>2.5.0</td><td>2.5.0</td><td>2.5.0</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0-beta는 벡터 검색과 대규모 데이터 관리를 다루는 사용자의 사용성, 확장성, 성능을 향상시키기 위해 상당한 발전을 가져왔습니다. 이번 릴리스에서는 용어 기반 검색, 쿼리 최적화를 위한 클러스터링 압축, 희소 및 고밀도 벡터 검색 방법에 대한 다양한 지원과 같은 강력한 새 기능이 통합되었습니다. 클러스터 관리, 인덱싱, 데이터 처리 기능이 향상되어 새로운 수준의 유연성과 사용 편의성이 도입되어 Milvus는 더욱 강력하고 사용자 친화적인 벡터 데이터베이스가 되었습니다.</p>
<h3 id="Key-Features" class="common-anchor-header">주요 기능</h3><h4 id="Full-Text-Search" class="common-anchor-header">전체 텍스트 검색</h4><p>Milvus 2.5는 Sparse-BM25로 구현된 전체 텍스트 검색을 지원합니다! 이 기능은 특히 희귀한 단어나 전문 용어가 포함된 시나리오에서 Milvus의 강력한 시맨틱 검색 기능을 보완하는 중요한 기능입니다. 이전 버전에서 Milvus는 키워드 검색 시나리오를 지원하기 위해 스파스 벡터를 지원했습니다. 이러한 희소 벡터는 SPLADEv2/BGE-M3와 같은 신경 모델이나 BM25 알고리즘과 같은 통계 모델에 의해 Milvus 외부에서 생성되었습니다.</p>
<p>Milvus 2.5에는 토큰화 및 희소 벡터 추출 기능이 내장되어 있어, 벡터를 입력으로만 받는 것에서 텍스트를 직접 받는 것으로 API가 확장되었습니다. BM25 통계 정보는 데이터가 입력되는 대로 실시간으로 업데이트되어 사용성과 정확성이 향상됩니다. 또한 근사 근사 이웃(ANN) 알고리즘에 기반한 희소 벡터는 표준 키워드 검색 시스템보다 더 강력한 성능을 제공합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">클러스터 관리 웹 UI(베타)</h4><p>대규모 데이터와 풍부한 기능을 보다 효과적으로 지원하기 위해 Milvus의 정교한 설계에는 다양한 종속성, 수많은 노드 역할, 복잡한 데이터 구조 등이 포함되어 있습니다. 이러한 측면은 사용 및 유지 관리에 어려움을 초래할 수 있습니다.</p>
<p>Milvus 2.5는 빌트인 클러스터 관리 웹UI를 도입하여 Milvus의 복잡한 런타임 환경 정보를 시각화함으로써 시스템 유지 관리의 어려움을 줄여줍니다. 여기에는 데이터베이스 및 컬렉션, 세그먼트, 채널, 종속성, 노드 상태, 작업 정보, 느린 쿼리 등에 대한 세부 정보가 포함됩니다.</p>
<h4 id="Text-Match" class="common-anchor-header">텍스트 일치</h4><p>Milvus 2.5는 텍스트 전처리 및 인덱스 구축을 위해 Tantivy의 분석기와 인덱싱을 활용하여 특정 용어를 기반으로 텍스트 데이터의 정확한 자연어 매칭을 지원합니다. 이 기능은 주로 특정 조건을 충족하는 필터링 검색에 사용되며, 스칼라 필터링을 통합하여 쿼리 결과를 구체화함으로써 스칼라 기준을 충족하는 벡터 내에서 유사성 검색을 할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하세요.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">비트맵 색인</h4><p>새로운 스칼라 데이터 인덱스가 Milvus 제품군에 추가되었습니다. 비트맵 인덱스는 행 수와 동일한 길이의 비트 배열을 사용하여 값의 존재를 나타내고 검색 속도를 높입니다.</p>
<p>비트맵 인덱스는 일반적으로 고유 값의 수가 적은 저카디널리티 필드(예: 남성, 여성 두 가지 값만 있는 성별 정보가 포함된 열)에 효과적이었습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/bitmap.md">비트맵 인덱스를</a> 참조하세요.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">널 가능 및 기본값</h4><p>Milvus는 이제 기본 키 필드 이외의 스칼라 필드에 대해 널 가능 속성 및 기본값 설정을 지원합니다. <code translate="no">nullable=True</code> 로 표시된 스칼라 필드의 경우 사용자는 데이터를 삽입할 때 해당 필드를 생략할 수 있으며, 시스템에서는 오류를 발생시키지 않고 해당 필드를 널 값 또는 기본값(설정된 경우)으로 처리합니다.</p>
<p>기본값과 널 가능 속성은 Milvus에 더 큰 유연성을 제공합니다. 사용자는 컬렉션을 만들 때 값이 불확실한 필드에 이 기능을 활용할 수 있습니다. 또한 다른 데이터베이스 시스템에서 Milvus로 데이터 마이그레이션을 간소화하여 원래의 기본값 설정을 유지하면서 null 값이 포함된 데이터 세트를 처리할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">Faiss 기반 HNSW SQ/PQ/PRQ</h4><p>Faiss 커뮤니티와의 긴밀한 협력을 통해 Faiss의 HNSW 알고리즘은 기능과 성능 모두에서 상당한 개선을 이루었습니다. 안정성과 유지보수성을 고려하여 Milvus 2.5는 HNSW에 대한 지원을 hnswlib에서 Faiss로 공식적으로 마이그레이션했습니다.</p>
<p>Milvus 2.5는 Faiss를 기반으로 다양한 시나리오의 요구 사항을 충족하기 위해 HNSW에서 여러 양자화 방법을 지원합니다: SQ(스칼라 퀀타이저), PQ(제품 퀀타이저), PRQ(제품 잔여 퀀타이저)가 그것입니다. SQ와 PQ가 더 일반적인데, SQ는 쿼리 성능과 빌드 속도가 우수하고, PQ는 동일한 압축률에서 더 나은 리콜을 제공합니다. 많은 벡터 데이터베이스는 일반적으로 SQ 양자화의 간단한 형태인 이진 양자화를 사용합니다.</p>
<p>PRQ는 PQ와 AQ(애디티브 퀀타이저)의 융합입니다. PQ와 비교했을 때, 특히 높은 압축률에서 더 나은 리콜을 제공하기 위해 더 긴 빌드 시간이 필요하며, 이진 압축이라고 합니다.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">클러스터링 압축(베타)</h4><p>Milvus 2.5에는 대규모 컬렉션에서 검색을 가속화하고 비용을 절감하기 위해 클러스터링 압축이 도입되었습니다. 스칼라 필드를 클러스터링 키로 지정하면 데이터를 범위별로 재분배하여 저장 및 검색을 최적화할 수 있습니다. 글로벌 인덱스처럼 작동하는 이 기능은 클러스터링 메타데이터를 기반으로 쿼리 중에 데이터를 효율적으로 정리하여 스칼라 필터를 적용할 때 검색 성능을 향상시킬 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/clustering-compaction.md">클러스터링 압축을</a> 참조하세요.</p>
<h3 id="Other-Features" class="common-anchor-header">기타 기능</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">스트리밍 노드(베타)</h4><p>Milvus 2.5에는 미리 쓰기 로깅(WAL) 서비스를 제공하는 스트리밍 노드라는 새로운 구성 요소가 도입되었습니다. 이를 통해 Milvus는 채널 읽기 및 쓰기 전후에 합의를 달성하여 새로운 특징, 기능 및 최적화를 실현할 수 있습니다. 이 기능은 Milvus 2.5에서 기본적으로 비활성화되어 있으며 3.0 버전에서 공식적으로 제공될 예정입니다.</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6 지원</h4><p>Milvus는 이제 IPv6를 지원하여 네트워크 연결성과 호환성을 확장합니다.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV 일괄 가져오기</h4><p>이제 Milvus는 JSON 및 Parquet 형식 외에도 CSV 형식의 데이터를 직접 대량으로 가져올 수 있습니다.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">쿼리 가속화를 위한 표현식 템플릿</h4><p>Milvus는 이제 표현식 템플릿을 지원하여 특히 복잡한 표현식이 있는 시나리오에서 표현식 구문 분석의 효율성을 향상시킵니다.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">그룹별 개선 사항</h4><ul>
<li><strong>사용자 정의 가능한 그룹 크기</strong>: 각 그룹에 대해 반환되는 항목 수를 지정할 수 있는 기능이 추가되었습니다.</li>
<li><strong>하이브리드 그룹별 검색</strong>: 여러 벡터 열을 기반으로 하는 하이브리드 그룹별 검색을 지원합니다.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">이터레이터 개선 사항</h4><ul>
<li><strong>MVCC 지원</strong>: 이제 다중 버전 동시성 제어(MVCC) 덕분에 사용자는 삽입 및 삭제와 같은 후속 데이터 변경의 영향을 받지 않고 반복기를 사용할 수 있습니다.</li>
<li><strong>퍼시스턴트 커서</strong>: 이제 Milvus는 쿼리이터레이터에 영구 커서를 지원하여 사용자가 전체 반복 프로세스를 다시 시작할 필요 없이 Milvus 재시작 후 마지막 위치에서 반복을 재개할 수 있습니다.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">개선 사항</h3><h4 id="Deletion-Optimization" class="common-anchor-header">삭제 최적화</h4><p>잠금 사용량과 메모리 관리를 최적화하여 대규모 삭제 시 속도를 개선하고 메모리 사용량을 줄였습니다.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">종속성 업그레이드</h4><p>ETCD 3.5.16 및 Pulsar 3.0.7 LTS로 업그레이드하여 기존 CVE를 수정하고 보안을 강화했습니다. 참고: Pulsar 3.x로의 업그레이드는 이전 2.x 버전과 호환되지 않습니다.</p>
<p>이미 Milvus를 배포한 사용자의 경우, 새로운 기능을 사용하려면 먼저 ETCD 및 Pulsar 구성 요소를 업그레이드해야 합니다. 자세한 내용은 <a href="/docs/ko/upgrade-pulsar-v3.md">Pulsar를 2.x에서 3.x로 업그레이드하기를</a> 참조하세요.</p>
<h4 id="Local-Storage-V2" class="common-anchor-header">로컬 스토리지 V2</h4><p>Milvus 2.5에 새로운 로컬 파일 형식이 도입되어 스칼라 데이터의 로딩 및 쿼리 효율성이 향상되고 메모리 오버헤드가 줄어들며 향후 최적화를 위한 토대가 마련되었습니다.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">표현식 구문 분석 최적화</h4><p>반복 표현식에 대한 캐싱을 구현하고, ANTLR을 업그레이드하고, <code translate="no">NOT IN</code> 절의 성능을 최적화하여 표현식 구문 분석이 개선되었습니다.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">DDL 동시성 성능 개선</h4><p>데이터 정의 언어(DDL) 작업의 동시성 성능을 최적화했습니다.</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API 기능 조정</h4><p>일관성을 위해 RESTful API의 기능을 다른 SDK와 정렬했습니다.</p>
