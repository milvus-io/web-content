---
id: overview.md
title: 밀버스란?
related_key: Milvus Overview
summary: >-
  Milvus는 노트북부터 대규모 분산 시스템에 이르기까지 다양한 환경에서 효율적으로 실행되는 고성능, 확장성 높은 벡터 데이터베이스입니다.
  오픈 소스 소프트웨어와 클라우드 서비스로 모두 제공됩니다.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Milvus란 무엇인가요?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 노트북부터 대규모 분산 시스템에 이르기까지 다양한 환경에서 효율적으로 실행되는 고성능, 확장성 높은 벡터 데이터베이스입니다. 오픈 소스 소프트웨어와 클라우드 서비스로 모두 제공됩니다.</p>
<p>Milvus는 Apache 2.0 라이선스에 따라 배포되는 LF AI &amp; Data Foundation 산하의 오픈 소스 프로젝트입니다. 대부분의 기여자는 대규모 시스템 구축과 하드웨어 인식 코드 최적화를 전문으로 하는 고성능 컴퓨팅(HPC) 커뮤니티의 전문가들입니다. 핵심 기여자로는 Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, Microsoft의 전문가들이 포함됩니다.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">비정형 데이터, 임베딩, 밀버스<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>텍스트, 이미지, 오디오와 같은 비정형 데이터는 형식이 다양하고 풍부한 기본 의미를 담고 있어 분석하기가 어렵습니다. 이러한 복잡성을 관리하기 위해 임베딩은 비정형 데이터를 본질적인 특성을 파악할 수 있는 숫자 벡터로 변환하는 데 사용됩니다. 이러한 벡터는 벡터 데이터베이스에 저장되어 빠르고 확장 가능한 검색과 분석을 가능하게 합니다.</p>
<p>Milvus는 강력한 데이터 모델링 기능을 제공하여 비정형 또는 멀티모달 데이터를 정형화된 컬렉션으로 구성할 수 있습니다. 일반적인 숫자 및 문자 유형, 다양한 벡터 유형, 배열, 집합, JSON 등 다양한 속성 모델링을 위한 광범위한 데이터 유형을 지원하므로 여러 데이터베이스 시스템을 유지 관리하는 수고를 덜어줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>비정형 데이터, 임베딩 및 Milvus</span> </span></p>
<p>Milvus는 세 가지 배포 모드를 제공하며, Jupyter Notebook의 로컬 프로토타이핑부터 수백억 개의 벡터를 관리하는 대규모 Kubernetes 클러스터에 이르기까지 다양한 데이터 규모를 지원합니다:</p>
<ul>
<li>Milvus Lite는 애플리케이션에 쉽게 통합할 수 있는 Python 라이브러리입니다. Milvus의 경량 버전으로, Jupyter Notebook에서 빠르게 프로토타이핑하거나 리소스가 제한된 에지 기기에서 실행하는 데 이상적입니다. <a href="/docs/ko/v2.4.x/milvus_lite.md">자세히 알아보기</a>.</li>
<li>Milvus Standalone은 단일 머신 서버 배포로, 모든 구성 요소가 단일 Docker 이미지에 번들로 제공되어 편리하게 배포할 수 있습니다. <a href="/docs/ko/v2.4.x/install_standalone-docker.md">자세히 알아보기</a>.</li>
<li>Milvus Distributed는 수십억 규모 또는 그 이상의 시나리오를 위해 설계된 클라우드 네이티브 아키텍처를 특징으로 하는 Kubernetes 클러스터에 배포할 수 있습니다. 이 아키텍처는 중요한 구성 요소의 중복성을 보장합니다. <a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">자세히 알아보기</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Milvus가 빠른 이유는 무엇인가요?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 처음부터 매우 효율적인 벡터 데이터베이스 시스템으로 설계되었습니다. 대부분의 경우 Milvus는 다른 벡터 데이터베이스보다 2~5배 더 뛰어난 성능을 발휘합니다(VectorDBBench 결과 참조). 이러한 높은 성능은 몇 가지 주요 설계 결정의 결과입니다:</p>
<p><strong>하드웨어 인식 최적화</strong>: 다양한 하드웨어 환경에서 Milvus를 사용할 수 있도록 AVX512, SIMD, GPU, NVMe SSD를 비롯한 여러 하드웨어 아키텍처와 플랫폼에 맞게 성능을 최적화했습니다.</p>
<p><strong>고급 검색 알고리즘</strong>: Milvus는 IVF, HNSW, DiskANN 등 다양한 인메모리 및 온디스크 인덱싱/검색 알고리즘을 지원하며, 모두 심층적으로 최적화되어 있습니다. Milvus는 FAISS 및 HNSWLib와 같은 널리 사용되는 구현에 비해 30%~70% 더 나은 성능을 제공합니다.</p>
<p><strong>C++로 구현된 검색 엔진</strong>: 벡터 데이터베이스 성능의 80% 이상은 검색 엔진에 의해 결정됩니다. Milvus는 이 중요한 구성 요소에 C++를 사용하는데, 그 이유는 이 언어의 고성능, 저수준 최적화, 효율적인 리소스 관리 때문입니다. 가장 중요한 점은 Milvus가 어셈블리 수준의 벡터화부터 멀티스레드 병렬화 및 스케줄링에 이르기까지 수많은 하드웨어 인식 코드 최적화 기능을 통합하여 하드웨어 기능을 최대한 활용한다는 점입니다.</p>
<p><strong>컬럼 지향</strong>: Milvus는 컬럼 지향 벡터 데이터베이스 시스템입니다. 주요 장점은 데이터 액세스 패턴에서 비롯됩니다. 쿼리를 수행할 때 열 지향 데이터베이스는 전체 행이 아닌 쿼리와 관련된 특정 필드만 읽으므로 액세스하는 데이터의 양이 크게 줄어듭니다. 또한 열 기반 데이터에 대한 연산을 쉽게 벡터화할 수 있으므로 전체 열에 한 번에 연산을 적용할 수 있어 성능이 더욱 향상됩니다.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Milvus의 확장성이 뛰어난 이유<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 2022년에 10억 개 규모의 벡터를 지원했으며, 2023년에는 수백억 개까지 안정적으로 확장하여 Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection 등을 포함한 300개 이상의 주요 기업의 대규모 시나리오를 지원했습니다.</p>
<p>밀버스의 클라우드 네이티브 고도로 분리된 시스템 아키텍처는 데이터 증가에 따라 시스템을 지속적으로 확장할 수 있도록 보장합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>밀버스의 고도로 분리된 시스템 아키텍처</span> </span></p>
<p>Milvus 자체는 완전히 상태 비저장형이므로 Kubernetes 또는 퍼블릭 클라우드를 통해 쉽게 확장할 수 있습니다. 또한 Milvus 구성 요소는 검색, 데이터 삽입, 인덱싱/압축이라는 가장 중요한 세 가지 작업을 쉽게 병렬화된 프로세스로 설계하고 복잡한 로직을 분리하는 등 잘 분리되어 있습니다. 따라서 해당 쿼리 노드, 데이터 노드, 인덱스 노드가 독립적으로 확장 및 축소할 수 있어 성능과 비용 효율성을 최적화할 수 있습니다.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Milvus가 지원하는 검색 유형<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 다양한 사용 사례의 요구 사항을 충족하기 위해 다양한 유형의 검색 기능을 지원합니다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md#Basic-search">ANN 검색</a>: 쿼리 벡터와 가장 가까운 상위 K 벡터를 찾습니다.</li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md#Filtered-search">필터링 검색</a>: 지정된 필터링 조건에 따라 ANN 검색을 수행합니다.</li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md#Range-search">범위 검색</a>: 쿼리 벡터에서 지정된 반경 내의 벡터를 찾습니다.</li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a>: 여러 벡터 필드를 기반으로 ANN 검색을 수행합니다.</li>
<li>키워드 검색: BM25에 기반한 키워드 검색.</li>
<li><a href="/docs/ko/v2.4.x/reranking.md">순위 재조정</a>: 추가 기준 또는 보조 알고리즘을 기반으로 검색 결과의 순서를 조정하여 초기 ANN 검색 결과를 개선합니다.</li>
<li><a href="/docs/ko/v2.4.x/get-and-scalar-query.md#Get-Entities-by-ID">가져오기</a>: 기본 키로 데이터를 검색합니다.</li>
<li><a href="/docs/ko/v2.4.x/get-and-scalar-query.md#Use-Basic-Operators">쿼리</a>: 특정 표현식을 사용해 데이터를 검색합니다.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">포괄적인 기능 세트<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>위에서 언급한 주요 검색 기능 외에도 Milvus는 ANN 검색을 중심으로 구현된 일련의 기능을 제공하므로 그 기능을 충분히 활용할 수 있습니다.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API 및 SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a> (공식)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK)(공식)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (공식)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (공식)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK(공식)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (Microsoft 제공)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">고급 데이터 유형</h3><p>Milvus는 기본 데이터 유형 외에도 다양한 고급 데이터 유형과 각각의 적용 가능한 거리 메트릭을 지원합니다.</p>
<ul>
<li><a href="/docs/ko/v2.4.x/sparse_vector.md">스파스 벡터</a></li>
<li><a href="/docs/ko/v2.4.x/index-vector-fields.md">바이너리 벡터</a></li>
<li><a href="/docs/ko/v2.4.x/use-json-fields.md">JSON 지원</a></li>
<li><a href="/docs/ko/v2.4.x/array_data_type.md">배열 지원</a></li>
<li><a href="/docs/ko/v2.4.x/metric.md">거리 메트릭</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">가속</h3><ul>
<li><p>검색 알고리즘 Milvus는 조정 가능한 인덱싱 및 검색 알고리즘 세트를 지원합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/index.md">인메모리 인덱스</a>, <a href="/docs/ko/v2.4.x/disk_index.md">온디스크 인덱스</a> 및 <a href="/docs/ko/v2.4.x/gpu_index.md">GPU 인덱스를</a> 참조하세요.</p></li>
<li><p>파티션 및 파티션 키 파티션은 Milvus 컬렉션의 하위 구분입니다. 검색 성능 향상을 위해 스칼라 필드를 파티션 키로 선택할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/manage-partitions.md">파티션 관리</a> 및 <a href="/docs/ko/v2.4.x/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</p></li>
<li><p>조정 가능한 일관성 모델 일관성은 주어진 시간에 데이터를 쓰거나 읽을 때 모든 Milvus 노드 또는 복제본이 동일한 데이터 보기를 갖도록 보장합니다. Milvus에서 ANN 검색을 수행할 때 일관성 수준을 쉽게 조정할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/consistency.md">일관성을</a> 참조하세요.</p></li>
<li><p>대용량 데이터 가져오기 데이터를 하나씩 삽입하는 대신 대량의 데이터를 Milvus로 가져오려면, 대용량 데이터 가져오기 도구를 사용하는 것을 고려해 보세요. 자세한 내용은 <a href="/docs/ko/v2.4.x/prepare-source-data.md">소스 데이터 준비</a> 및 <a href="/docs/ko/v2.4.x/import-data.md">데이터 가져오기를</a> 참조하세요.</p></li>
<li><p>멀티테넌시 지원 Milvus는 파티션 키, 클러스터링 키 등 멀티테넌시 시나리오를 지향하는 많은 기능을 구현했습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/multi_tenancy.md">멀티테넌시 전략을</a> 참조하세요.</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">보안 및 권한 부여</h3><ul>
<li><p>조정 가능한 일관성 모델 일관성은 주어진 시간에 데이터를 쓰거나 읽을 때 모든 Milvus 노드 또는 복제본이 동일한 데이터 보기를 갖도록 보장합니다. Milvus에서 ANN 검색을 수행할 때 일관성 수준을 쉽게 조정할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/consistency.md">일관성을</a> 참조하세요.</p></li>
<li><p>데이터 격리 및 리소스 제어 멀티 테넌시 시나리오의 경우, 데이터 격리는 기본적인 보안 요구 사항입니다. Milvus는 보안 문제를 해결하기 위해 여러 가지 기능을 구현합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/resource_group.md">리소스 그룹</a> 및 <a href="/docs/ko/v2.4.x/clustering-compaction.md">클러스터링 압축</a> <a href="/docs/ko/v2.4.x/resource_group.md">관리를</a> 참조하세요.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI 통합</h3><ul>
<li><p>임베딩 모델 통합 임베딩 모델은 비정형 데이터를 고차원 데이터 공간에서 숫자 표현으로 변환하여 Milvus에 저장할 수 있도록 합니다. 현재 Python SDK인 PyMilvus는 여러 임베딩 모델을 통합하여 데이터를 벡터 임베딩으로 빠르게 준비할 수 있도록 지원합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/embeddings.md">임베딩 개요를</a> 참조하세요.</p></li>
<li><p>재랭크 모델 통합 정보 검색 및 생성 AI 영역에서 재랭커는 초기 검색 결과의 순서를 최적화하는 필수적인 도구입니다. 파이밀버스는 초기 검색에서 반환되는 결과의 순서를 최적화하기 위해 여러 가지 재랭크 모델을 통합합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/rerankers-overview.md">리랭커 개요를</a> 참조하세요.</p></li>
<li><p>LangChain 및 기타 AI 도구 통합 GenAI 시대에는 애플리케이션 개발자들로부터 많은 관심을 받고 있는 도구가 LangChain과 같은 도구입니다. 핵심 구성 요소인 Milvus는 일반적으로 이러한 도구에서 벡터 저장소 역할을 합니다. 즐겨 사용하는 AI 도구에 Milvus를 통합하는 방법을 알아보려면 <a href="/docs/ko/v2.4.x/integrate_with_openai.md">통합</a> 및 <a href="/docs/ko/v2.4.x/build-rag-with-milvus.md">튜토리얼을</a> 참조하세요.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">도구 및 에코시스템</h3><ul>
<li><p>Attu Attu는 Milvus와 저장된 데이터를 관리하는 데 도움이 되는 직관적인 올인원 GUI입니다. 자세한 내용은 <a href="https://github.com/zilliztech/attu">Attu</a> 리포지토리를 참조하세요.</p></li>
<li><p>버드워처 버드워처는 Milvus를 위한 디버깅 도구입니다. 이를 사용하여 etcd에 연결하면 Milvus 시스템의 상태를 확인하거나 즉석에서 구성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/birdwatcher_overview.md">버드워처를</a> 참조하세요.</p></li>
<li><p>Promethus 및 Grafana 통합 Promethus는 오픈 소스 시스템 모니터링 및 알림 툴킷으로 Kubernetes를 위한 것입니다. Grafana는 모든 데이터 소스와 연결할 수 있는 오픈 소스 시각화 스택입니다. Promethus 및 Grafana를 모니터링 서비스 공급자로 사용하여 배포된 Milvus의 성능을 시각적으로 모니터링할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/monitor.md">모니터링 서비스 배포하기를</a> 참조하세요.</p></li>
<li><p>Milvus 백업 Milvus 백업은 사용자가 Milvus 데이터를 백업 및 복원할 수 있는 도구입니다. 다양한 애플리케이션 시나리오에 맞게 CLI와 API를 모두 제공합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/milvus_backup_overview.md">Milvus 백업을</a> 참조하세요.</p></li>
<li><p>Milvus 데이터 변경 캡처(CDC) Milvus-CDC는 Milvus 인스턴스의 증분 데이터를 캡처하고 동기화할 수 있으며, 소스 인스턴스와 대상 인스턴스 간에 원활하게 전송하여 비즈니스 데이터의 안정성을 보장하고 증분 백업 및 재해 복구를 쉽게 수행할 수 있도록 지원합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/milvus-cdc-overview.md">Milvus CDC를</a> 참조하세요.</p></li>
<li><p>Milvus 커넥터 Milvus는 Apache Spark와 같은 타사 도구와 Milvus를 원활하게 통합할 수 있도록 커넥터 세트를 계획했습니다. 현재, Spark 커넥터를 사용하여 머신 러닝 처리를 위해 Milvus 데이터를 Apache Spark에 공급할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/integrate_with_spark.md">Spark-Milvus 커넥터를</a> 참조하세요.</p></li>
<li><p>벡터 전송 서비스(VTS) Milvus는 Milvus 인스턴스와 Zilliz 클러스터, Elasticsearch, Postgres(PgVector) 및 다른 Milvus 인스턴스를 비롯한 여러 데이터 소스 간에 데이터를 전송할 수 있는 도구 세트를 제공합니다. 자세한 내용은 <a href="https://github.com/zilliztech/vts">VTS를</a> 참조하세요.</p></li>
</ul>
