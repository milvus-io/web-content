---
id: comparison.md
title: 비교
summary: 이 문서에서는 Milvus를 다른 벡터 검색 솔루션과 비교합니다.
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">Milvus와 다른 대안 비교<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>다양한 벡터 데이터베이스 옵션을 살펴볼 때 이 종합 가이드는 Milvus의 고유한 기능을 이해하여 특정 요구 사항에 가장 적합한 데이터베이스를 선택할 수 있도록 도와줍니다. 특히 Milvus는 선도적인 오픈소스 벡터 데이터베이스이며, <a href="https://zilliz.com/cloud">Zilliz Cloud는</a> 완전 관리형 Milvus 서비스를 제공합니다. 경쟁사 대비 Milvus를 객관적으로 평가하려면 <a href="https://github.com/zilliztech/VectorDBBench#quick-start">벤치마크 도구를</a> 사용하여 성능 메트릭을 분석해 보세요.</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Milvus 주요 특징<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
<li><p><strong>기능</strong>: Milvus는 <a href="https://milvus.io/docs/sparse_vector.md">스파스 벡터</a>, <a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">벌크 벡터</a>, <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">필터링된 검색</a>, <a href="https://milvus.io/docs/multi-vector-search.md">하이브리드 검색</a> 기능과 같은 고급 기능을 지원하여 기본적인 벡터 유사도 검색을 뛰어넘습니다.</p></li>
<li><p><strong>유연성</strong>: Milvus는 강력하고 통합된 에코시스템 내에서 다양한 배포 모드와 여러 SDK를 지원합니다.</p></li>
<li><p><strong>성능</strong>: Milvus는 높은 처리량과 짧은 지연 시간으로 실시간 처리를 보장하며, <a href="https://milvus.io/docs/index.md#HNSW">HNSW</a> 및 <a href="https://milvus.io/docs/disk_index.md">DiskANN과</a> 같은 최적화된 인덱싱 알고리즘과 고급 <a href="https://milvus.io/docs/gpu_index.md">GPU 가속을</a> 기반으로 합니다.</p></li>
<li><p><strong>확장성</strong>: 맞춤형 분산 아키텍처로 손쉽게 확장할 수 있어 소규모 데이터 세트부터 100억 개가 넘는 벡터 컬렉션까지 모두 수용할 수 있습니다.</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">전반적인 비교<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표는 두 가지 벡터 데이터베이스 솔루션인 Milvus와 Pinecone을 비교하기 위해 다양한 기능의 차이점을 강조하도록 구성되어 있습니다.</p>
<table>
<thead>
<tr><th>기능</th><th>Pinecone</th><th>Milvus</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>배포 모드</td><td>SaaS 전용</td><td>Milvus Lite, 온프레미스 독립형 및 클러스터, Zilliz Cloud Saas 및 BYOC</td><td>Milvus는 배포 모드에서 더 큰 유연성을 제공합니다.</td></tr>
<tr><td>지원되는 SDK</td><td>파이썬, 자바스크립트/타입스크립트</td><td>Python, Java, NodeJS, Go, Restful API, C#, Rust</td><td>Milvus는 더 다양한 프로그래밍 언어를 지원합니다.</td></tr>
<tr><td>오픈 소스 상태</td><td>Closed</td><td>오픈 소스</td><td>Milvus는 인기 있는 오픈소스 벡터 데이터베이스입니다.</td></tr>
<tr><td>확장성</td><td>스케일 업/다운만 가능</td><td>스케일 아웃/인 및 스케일 업/다운 가능</td><td>Milvus는 향상된 확장성을 위해 분산 아키텍처를 사용합니다.</td></tr>
<tr><td>가용성</td><td>사용 가능한 영역 내의 포드 기반 아키텍처</td><td>사용 가능한 영역 장애 조치 및 지역 간 HA</td><td>Milvus CDC(변경 데이터 캡처)는 가용성을 높이기 위해 기본/대기 모드를 지원합니다.</td></tr>
<tr><td>Perf-Cost(백만 쿼리당 달러)</td><td>중간 데이터 세트의 경우 $0.178부터, 대규모 데이터 세트의 경우 $1.222부터 시작합니다.</td><td>Zilliz Cloud는 중간 데이터 세트의 경우 $0.148, 대규모 데이터 세트의 경우 $0.635부터 시작하며, 무료 버전도 제공됩니다.</td><td><a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">비용 순위 보고서를</a> 참조하세요.</td></tr>
<tr><td>GPU 가속</td><td>지원되지 않음</td><td>NVIDIA GPU 지원</td><td>GPU 가속은 종종 몇 배의 성능 향상을 가져옵니다.</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">용어 비교<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>둘 다 벡터 데이터베이스로서 유사한 기능을 제공하지만, Milvus와 Pinecone의 도메인별 용어는 약간의 차이를 보입니다. 자세한 용어 비교는 다음과 같습니다.</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>Remarks</th></tr>
</thead>
<tbody>
<tr><td>Index</td><td><a href="https://zilliz.com/comparison">컬렉션</a></td><td>Pinecone에서 인덱스는 동일한 크기의 벡터를 저장하고 관리하기 위한 조직 단위 역할을 하며, 이 인덱스는 포드라는 하드웨어와 긴밀하게 통합되어 있습니다. 이와 대조적으로 Milvus 컬렉션은 비슷한 용도로 사용되지만 단일 인스턴스 내에서 여러 컬렉션을 처리할 수 있습니다.</td></tr>
<tr><td>컬렉션</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">백업</a></td><td>Pinecone에서 컬렉션은 기본적으로 인덱스의 정적 스냅샷으로, 주로 백업 목적으로 사용되며 쿼리할 수 없습니다. Milvus에서는 백업을 생성하기 위한 동일한 기능이 보다 투명하고 직관적인 이름으로 제공됩니다.</td></tr>
<tr><td>네임스페이스</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">파티션 키</a></td><td>네임스페이스는 인덱스의 벡터를 하위 집합으로 분할할 수 있게 해줍니다. Milvus는 컬렉션 내에서 효율적인 데이터 격리를 보장하기 위해 파티션 또는 파티션 키와 같은 여러 가지 방법을 제공합니다.</td></tr>
<tr><td>메타데이터</td><td><a href="https://milvus.io/docs/boolean.md">스칼라 필드</a></td><td>Pinecone의 메타데이터 처리는 키-값 쌍에 의존하는 반면, Milvus는 표준 데이터 유형과 동적 JSON 필드를 포함한 복잡한 스칼라 필드를 허용합니다.</td></tr>
<tr><td>쿼리</td><td><a href="https://milvus.io/docs/single-vector-search.md">검색</a></td><td>주어진 벡터에 대해 가장 가까운 이웃을 찾는 데 사용되는 방법의 이름(추가 필터가 적용될 수 있음)입니다.</td></tr>
<tr><td>사용할 수 없음</td><td><a href="https://milvus.io/docs/with-iterators.md">이터레이터</a></td><td>Pinecone에는 인덱스의 모든 벡터를 반복하는 기능이 없습니다. Milvus는 검색 이터레이터와 쿼리 이터레이터 메서드를 도입하여 데이터 세트 전반에서 데이터 검색 기능을 향상시켰습니다.</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">기능 비교<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>기능</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>배포 모드</td><td>SaaS 전용</td><td>Milvus Lite, 온프레미스 독립형 및 클러스터, 질리즈 클라우드 Saas 및 BYOC</td></tr>
<tr><td>임베딩 기능</td><td>사용 불가</td><td><a href="https://github.com/milvus-io/milvus-model">피밀버스[모델]</a> 지원</td></tr>
<tr><td>데이터 타입</td><td>문자열, 숫자, 부울, 문자열 목록</td><td>문자열, VarChar, 숫자(Int, Float, Double), 부울, 배열, JSON, 플로트 벡터, 이진 벡터, BFloat16, 플로트16, 스파스 벡터</td></tr>
<tr><td>메트릭 및 인덱스 유형</td><td>코사인, 도트, 유클리드<br/>P-패밀리, S-패밀리</td><td>코사인, IP(도트), L2(유클리드), 해밍, Jaccard<br/>FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, SCANN, GPU 인덱스</td></tr>
<tr><td>스키마 디자인</td><td>유연 모드</td><td>유연 모드, 엄격 모드</td></tr>
<tr><td>다중 벡터 필드</td><td>N/A</td><td>다중 벡터 및 하이브리드 검색</td></tr>
<tr><td>도구</td><td>데이터 세트, 텍스트 유틸리티, 스파크 커넥터</td><td>Attu, Birdwatcher, 백업, CLI, CDC, Spark 및 Kafka 커넥터</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">주요 인사이트</h3><ul>
<li><p><strong>배포 모드</strong>: Milvus는 로컬 배포, Docker, 온프레미스, Cloud SaaS, 엔터프라이즈용 BYOC(Bring Your Own Cloud) 등 다양한 배포 옵션을 제공하는 반면, Pinecone은 SaaS 배포로 제한되어 있습니다.</p></li>
<li><p><strong>임베딩 기능</strong>: Milvus는 추가 임베딩 라이브러리를 지원하여 임베딩 모델을 직접 사용하여 소스 데이터를 벡터로 변환할 수 있습니다.</p></li>
<li><p><strong>데이터 유형</strong>: Milvus는 배열과 JSON을 포함하여 Pinecone보다 더 광범위한 데이터 유형을 지원합니다. Pinecone은 문자열, 숫자, 부울 또는 문자열 목록을 값으로 사용하는 플랫 메타데이터 구조만 지원하는 반면, Milvus는 JSON 필드 내에서 중첩 구조를 포함한 모든 JSON 개체를 처리할 수 있습니다. Pinecone은 벡터당 메타데이터 크기를 40KB로 제한합니다.</p></li>
<li><p><strong>메트릭 및 인덱스 유형</strong>: Milvus는 다양한 사용 사례를 수용하기 위해 광범위한 메트릭 및 인덱스 유형을 지원하는 반면, Pinecone은 선택의 폭이 더 제한적입니다. Milvus에서는 벡터에 대한 인덱스가 필수이지만, 구성 프로세스를 간소화하기 위해 AUTO_INDEX 옵션을 사용할 수 있습니다.</p></li>
<li><p><strong>스키마 디자인</strong>: Milvus는 Pinecone과 유사한 스키마 없는 환경을 위한 동적 스키마를 사용한 빠른 설정과 관계형 데이터베이스 관리 시스템(RDBMS)과 유사한 사전 정의된 스키마 필드 및 인덱스를 사용한 사용자 지정 설정을 포함하여 스키마 설계를 위한 유연한 <code translate="no">create_collection</code> 모드를 제공합니다.</p></li>
<li><p><strong>다중 벡터 필드</strong>: Milvus를 사용하면 단일 컬렉션 내에 여러 개의 벡터 필드를 저장할 수 있으며, 이는 희소하거나 밀도가 높을 수 있고 차원이 다를 수 있습니다. Pinecone은 이와 유사한 기능을 제공하지 않습니다.</p></li>
<li><p><strong>도구</strong>: Milvus는 데이터베이스 관리 및 활용을 위해 Attu, Birdwatcher, Backup, CLI, CDC, Spark 및 Kafka 커넥터 등 보다 광범위한 도구를 제공합니다.</p></li>
</ul>
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
<li><p><strong>체험판</strong>: Milvus <a href="https://milvus.io/docs/quickstart.md">퀵스타트로</a> 시작하거나 <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud에 가입하여</a> Milvus를 직접 체험해 보세요.</p></li>
<li><p><strong>자세히 알아보기</strong>: 포괄적인 <a href="/docs/ko/v2.4.x/glossary.md">용어</a> 및 <a href="https://milvus.io/docs/manage-collections.md">사용 가이드를</a> 통해 Milvus의 기능에 대해 자세히 알아보세요.</p></li>
<li><p><strong>대안 살펴보기</strong>: 벡터 데이터베이스 옵션을 폭넓게 비교하려면 <a href="https://zilliz.com/comparison">이 페이지에서</a> 추가 리소스를 살펴보세요.</p></li>
</ul>
