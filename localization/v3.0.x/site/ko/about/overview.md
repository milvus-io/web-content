---
id: overview.md
title: Milvus란 무엇인가요?
related_key: Milvus Overview
summary: >-
  Milvus는 노트북부터 대규모 분산 시스템에 이르기까지 다양한 환경에서 효율적으로 구동되는 고성능의 확장성이 뛰어난 벡터
  데이터베이스입니다. 이 데이터베이스는 오픈소스 소프트웨어와 클라우드 서비스 형태로 모두 제공됩니다.
---
<h1 id="What-is-Milvus" class="common-anchor-header">밀부스(Milvus)란 무엇인가?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>밀버스 <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span> 는</span> 매과(Accipitridae)의 밀버스속(Milvus)에 속하는 맹금류로, 빠른 비행 속도, 예리한 시력, 그리고 뛰어난 적응력으로 유명합니다.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz는 노트북부터 대규모 분산 시스템에 이르기까지 다양한 환경에서 효율적으로 구동되는 오픈소스 고성능·고확장성 벡터 데이터베이스에 ‘Milvus’라는 이름을 채택했습니다. 이 데이터베이스는 오픈소스 소프트웨어와 클라우드 서비스 형태로 모두 제공됩니다.</p>
<p>Zilliz가 개발하고 곧 리눅스 재단(Linux Foundation) 산하 LF AI &amp; Data Foundation에 기증될 예정인 Milvus는 세계 최고의 오픈소스 벡터 데이터베이스 프로젝트 중 하나로 자리매김했습니다. 이 프로젝트는 Apache 2.0 라이선스 하에 배포되며, 대부분의 기여자는 대규모 시스템 구축 및 하드웨어 인식 코드 최적화를 전문으로 하는 고성능 컴퓨팅(HPC) 커뮤니티의 전문가들입니다. 핵심 기여자에는 Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, Microsoft의 전문가들이 포함됩니다.</p>
<p>흥미롭게도 Zilliz의 모든 오픈소스 프로젝트는 새의 이름을 따서 명명되는데, 이는 자유, 선견지명, 그리고 기술의 민첩한 진화를 상징하는 명명 규칙입니다.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">비정형 데이터, 임베딩, 그리고 Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>텍스트, 이미지, 오디오와 같은 비정형 데이터는 형식이 다양하고 풍부한 내재적 의미를 담고 있어 분석이 어렵습니다. 이러한 복잡성을 관리하기 위해 임베딩을 사용하여 비정형 데이터를 그 본질적인 특성을 포착하는 수치 벡터로 변환합니다. 그런 다음 이 벡터들은 벡터 데이터베이스에 저장되어 빠르고 확장 가능한 검색 및 분석이 가능해집니다.</p>
<p>Milvus는 강력한 데이터 모델링 기능을 제공하여 비정형 또는 다중 모달 데이터를 정형화된 컬렉션으로 구성할 수 있게 해줍니다. 일반적인 숫자 및 문자 유형을 비롯해 다양한 벡터 유형, 배열, 집합, JSON 등 다양한 속성 모델링을 위한 광범위한 데이터 유형을 지원하므로, 여러 데이터베이스 시스템을 유지 관리해야 하는 번거로움을 덜어줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>비정형 데이터, 임베딩, 그리고 Milvus</span>
  
 </span></p>
<p>Milvus는 Jupyter Notebook에서의 로컬 프로토타이핑부터 수백억 개의 벡터를 관리하는 대규모 Kubernetes 클러스터에 이르기까지 광범위한 데이터 규모를 아우르는 세 가지 배포 모드를 제공합니다.</p>
<ul>
<li>Milvus Lite는 애플리케이션에 쉽게 통합할 수 있는 Python 라이브러리입니다. Milvus의 경량 버전으로서, Jupyter Notebook에서 신속한 프로토타이핑을 수행하거나 리소스가 제한된 엣지 디바이스에서 실행하는 데 이상적입니다. <a href="/docs/ko/milvus_lite.md">자세히 알아보기</a>.</li>
<li>Milvus Standalone은 단일 머신 서버 배포 방식으로, 편리한 배포를 위해 모든 구성 요소가 하나의 Docker 이미지에 번들로 제공됩니다. <a href="/docs/ko/install_standalone-docker.md">자세히 알아보기</a>.</li>
<li>Milvus Distributed는 쿠버네티스 클러스터에 배포할 수 있으며, 수십억 규모 또는 그 이상의 시나리오를 위해 설계된 클라우드 네이티브 아키텍처를 특징으로 합니다. 이 아키텍처는 핵심 구성 요소의 중복성을 보장합니다. <a href="/docs/ko/install_cluster-milvusoperator.md">자세히 알아보기</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Milvus가 왜 이렇게 빠른가요?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 처음부터 고효율 벡터 데이터베이스 시스템이 되도록 설계되었습니다. 대부분의 경우, Milvus는 다른 벡터 데이터베이스보다 2~5배 더 뛰어난 성능을 보입니다(VectorDBBench 결과 참조). 이러한 높은 성능은 다음과 같은 몇 가지 핵심 설계 결정의 결과입니다:</p>
<p><strong>하드웨어 인식 최적화</strong>: 다양한 하드웨어 환경에서 Milvus를 원활하게 구동할 수 있도록, AVX512, SIMD, GPU, NVMe SSD를 포함한 수많은 하드웨어 아키텍처 및 플랫폼에 맞춰 성능을 특별히 최적화했습니다.</p>
<p><strong>고급 검색 알고리즘</strong>: Milvus는 IVF, HNSW, DiskANN 등을 포함한 광범위한 인메모리 및 온디스크 인덱싱/검색 알고리즘을 지원하며, 이들 모두 심도 있게 최적화되었습니다. FAISS나 HNSWLib와 같은 널리 사용되는 구현체와 비교했을 때, Milvus는 30%~70% 더 뛰어난 성능을 제공합니다.</p>
<p><strong>C++ 기반 검색 엔진</strong>: 벡터 데이터베이스 성능의 80% 이상은 검색 엔진에 의해 결정됩니다. Milvus는 C++의 높은 성능, 저수준 최적화, 효율적인 리소스 관리 기능을 활용하여 이 핵심 구성 요소를 구현합니다. 가장 중요한 점은, Milvus가 어셈블리 수준의 벡터화부터 멀티스레드 병렬화 및 스케줄링에 이르기까지 다양한 하드웨어 인식 코드 최적화를 통합하여 하드웨어 성능을 최대한 활용한다는 것입니다.</p>
<p><strong>열 지향</strong>: Milvus는 열 지향 벡터 데이터베이스 시스템입니다. 주요 장점은 데이터 액세스 패턴에서 비롯됩니다. 쿼리를 수행할 때, 열 지향 데이터베이스는 전체 행이 아닌 쿼리와 관련된 특정 필드만 읽기 때문에 액세스되는 데이터의 양이 크게 줄어듭니다. 또한, 열 기반 데이터에 대한 연산은 쉽게 벡터화될 수 있어 전체 열에 한 번에 연산을 적용할 수 있으며, 이를 통해 성능이 더욱 향상됩니다.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Milvus의 뛰어난 확장성 비결<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>2022년, Milvus는 10억 규모 벡터를 지원했으며, 2023년에는 일관된 안정성을 유지하며 1000억 규모로 확장되어 Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection 등 300여 개 주요 기업의 대규모 시나리오를 지원했습니다.</p>
<p>Milvus의 클라우드 네이티브이자 고도로 분리된 시스템 아키텍처는 데이터가 증가함에 따라 시스템이 지속적으로 확장될 수 있도록 보장합니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Milvus의 고도로 분리된 시스템 아키텍처</span>
  
 </span></p>
<p>Milvus 자체는 완전한 무상태(stateless) 구조이므로 쿠버네티스(Kubernetes)나 퍼블릭 클라우드를 활용해 손쉽게 확장할 수 있습니다. 또한, Milvus의 구성 요소들은 잘 분리되어 있으며, 가장 중요한 세 가지 작업인 검색, 데이터 삽입, 인덱싱/압축은 복잡한 로직이 분리된 상태로 쉽게 병렬화될 수 있도록 설계되었습니다. 이를 통해 해당 쿼리 노드, 데이터 노드, 인덱스 노드가 각각 독립적으로 수직 및 수평 확장이 가능해져 성능과 비용 효율성을 최적화할 수 있습니다.</p>
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
    </button></h2><p>Milvus는 다양한 사용 사례의 요구 사항을 충족하기 위해 여러 가지 검색 기능을 지원합니다:</p>
<ul>
<li><a href="/docs/ko/single-vector-search.md#Basic-search">ANN 검색</a>: 쿼리 벡터와 가장 가까운 상위 K개의 벡터를 찾습니다.</li>
<li><a href="/docs/ko/single-vector-search.md#Filtered-search">필터링 검색</a>: 지정된 필터링 조건 하에서 ANN 검색을 수행합니다.</li>
<li><a href="/docs/ko/single-vector-search.md#Range-search">범위 검색</a>: 쿼리 벡터로부터 지정된 반경 내에 있는 벡터를 찾습니다.</li>
<li><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a>: 여러 벡터 필드를 기반으로 ANN 검색을 수행합니다.</li>
<li><a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a>: BM25를 기반으로 한 전체 텍스트 검색입니다.</li>
<li><a href="/docs/ko/weighted-ranker.md">재순위 지정</a>: 추가 기준이나 2차 알고리즘을 기반으로 검색 결과의 순서를 조정하여 초기 ANN 검색 결과를 정교화합니다.</li>
<li><a href="/docs/ko/get-and-scalar-query.md#Get-Entities-by-ID">가져오기</a>: 기본 키를 기준으로 데이터를 가져옵니다.</li>
<li><a href="/docs/ko/get-and-scalar-query.md#Use-Basic-Operators">쿼리</a>: 특정 표현식을 사용하여 데이터를 검색합니다.</li>
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
    </button></h2><p>앞서 언급한 주요 검색 기능 외에도, Milvus는 ANN 검색을 중심으로 구현된 일련의 기능을 제공하여 사용자가 Milvus의 기능을 최대한 활용할 수 있도록 합니다.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API 및 SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">RESTful API</a> (공식)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (Python SDK) (공식)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">Go SDK</a> (공식)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">Java SDK</a> (공식)</li>
<li><a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) SDK (공식)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (Microsoft 제공)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">C++ SDK</a> (공식)</li>
<li>Rust SDK (개발 중)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">고급 데이터 유형<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 데이터 유형 외에도 Milvus는 다양한 고급 데이터 유형과 각 유형에 적용 가능한 거리 측정 기준을 지원합니다.</p>
<ul>
<li><a href="/docs/ko/sparse_vector.md">스파스 벡터</a></li>
<li><a href="/docs/ko/index-vector-fields.md">이진 벡터</a></li>
<li><a href="/docs/ko/use-json-fields.md">JSON 지원</a></li>
<li><a href="/docs/ko/array_data_type.md">배열 지원</a></li>
<li>텍스트 (개발 중)</li>
<li>지리적 위치 정보 (개발 중)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">왜 Milvus인가?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>대규모 환경에서의 고성능 및 고가용성</strong></p>
<p>Milvus는 <a href="/docs/ko/data_processing.md#Data-query">컴퓨팅과</a> <a href="/docs/ko/data_processing.md#Data-insertion">스토리지를</a> 분리하는 <a href="/docs/ko/architecture_overview.md">분산 아키텍처를</a> 특징으로 합니다. Milvus는 수평적으로 확장 가능하며 다양한 트래픽 패턴에 적응할 수 있어, 읽기 집약적 워크로드의 경우 쿼리 노드를, 쓰기 집약적 워크로드의 경우 데이터 노드를 독립적으로 늘려 최적의 성능을 달성합니다. K8s 기반의 상태 비저장형 마이크로서비스는 장애 발생 시 <a href="/docs/ko/coordinator_ha.md#Coordinator-HA">신속한 복구를</a> 가능하게 하여 고가용성을 보장합니다. <a href="/docs/ko/replica.md">레플리카</a> 지원 기능을 통해 여러 쿼리 노드에 데이터 세그먼트를 분산 로딩함으로써 내결함성과 처리량을 한층 더 향상시킵니다. 성능 비교는 <a href="https://zilliz.com/vector-database-benchmark-tool">벤치마크를</a> 참조하십시오.</p></li>
<li><p><strong>다양한 벡터 인덱스 유형 및 하드웨어 가속 지원</strong></p>
<p>Milvus는 시스템과 핵심 벡터 검색 엔진을 분리하여, HNSW, IVF, FLAT(무차별 대입), SCANN, DiskANN을 비롯해 <a href="/docs/ko/index-explained.md">양자화 기반</a> 변형 및 <a href="/docs/ko/mmap.md">mmap을</a> 포함한 다양한 시나리오에 최적화된 모든 주요 벡터 인덱스 유형을 지원합니다. Milvus는 <a href="/docs/ko/boolean.md">메타데이터 필터링</a> 및 <a href="/docs/ko/range-search.md">범위 검색과</a> 같은 고급 기능을 위해 벡터 검색을 최적화합니다. 또한 Milvus는 벡터 검색 성능을 향상시키기 위해 하드웨어 가속을 구현하며, NVIDIA의 <a href="/docs/ko/gpu-cagra.md">CAGRA와</a> 같은 GPU 인덱싱을 지원합니다.</p></li>
<li><p><strong>유연한 멀티테넌시 및 핫/콜드 스토리지</strong></p>
<p>Milvus는 데이터베이스, 컬렉션, 파티션 또는 파티션 키 수준에서의 격리를 통해 <a href="/docs/ko/multi_tenancy.md#Multi-tenancy-strategies">멀티테넌시를</a> 지원합니다. 이러한 유연한 전략을 통해 단일 클러스터로 수백에서 수백만 명의 테넌트를 처리할 수 있을 뿐만 아니라, 최적화된 검색 성능과 유연한 액세스 제어를 보장합니다. Milvus는 핫/콜드 스토리지를 통해 비용 효율성을 높입니다. 자주 액세스되는 핫 데이터는 더 나은 성능을 위해 메모리나 SSD에 저장할 수 있으며, 액세스 빈도가 낮은 콜드 데이터는 속도는 느리지만 비용 효율적인 스토리지에 보관됩니다. 이 메커니즘을 통해 중요한 작업에 대한 높은 성능을 유지하면서 비용을 대폭 절감할 수 있습니다.</p></li>
<li><p><strong>전체 텍스트 검색 및 하이브리드 검색을 위한 스파스 벡터</strong></p>
<p>밀집 벡터를 통한 시맨틱 검색 외에도, Milvus는 BM25를 활용한 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색은</a> 물론 SPLADE 및 BGE-M3와 같은 학습된 스파스 임베딩을 기본적으로 지원합니다. 사용자는 스파스 벡터와 밀집 벡터를 동일한 컬렉션에 저장할 수 있으며, 여러 검색 요청의 결과를 재순위 지정하는 함수를 정의할 수 있습니다. <a href="/docs/ko/full_text_search_with_milvus.md">의미 검색 + 전체 텍스트 검색을 결합한 하이브리드 검색</a> 예시를 확인해 보세요.</p></li>
<li><p><strong>데이터 보안 및 세분화된 접근 제어</strong></p>
<p>Milvus는 <a href="/docs/ko/authenticate.md">필수 사용자 인증</a>, <a href="/docs/ko/tls.md">TLS 암호화</a> 및 <a href="/docs/ko/rbac.md">역할 기반 접근 제어(RBAC)</a>를 구현하여 데이터 보안을 보장합니다. 사용자 인증을 통해 유효한 자격 증명을 가진 승인된 사용자만 데이터베이스에 접근할 수 있도록 하며, TLS 암호화는 네트워크 내의 모든 통신을 안전하게 보호합니다. 또한 RBAC는 사용자의 역할에 따라 특정 권한을 부여함으로써 세분화된 접근 제어를 가능하게 합니다. 이러한 기능 덕분에 Milvus는 기업용 애플리케이션에 있어 견고하고 안전한 선택지가 되며, 민감한 데이터를 무단 접근 및 잠재적인 침해로부터 보호합니다.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI 통합<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>임베딩 모델 통합
임베딩 모델은 비정형 데이터를 고차원 데이터 공간에서 수치적 표현으로 변환하여 Milvus에 저장할 수 있도록 합니다. 현재 Python SDK인 PyMilvus는 여러 임베딩 모델을 통합하여 데이터를 벡터 임베딩으로 신속하게 준비할 수 있도록 지원합니다. 자세한 내용은 <a href="/docs/ko/embeddings.md">임베딩 개요를</a> 참조하십시오.</p></li>
<li><p>재순위 지정 모델 통합
정보 검색 및 생성형 AI 분야에서 재순위 지정기(reranker)는 초기 검색 결과의 순서를 최적화하는 필수 도구입니다. PyMilvus는 초기 검색에서 반환된 결과의 순서를 최적화하기 위해 여러 재순위 지정 모델을 통합하고 있습니다. 자세한 내용은 <a href="/docs/ko/rerankers-overview.md">‘재순위 지정기 개요’를</a> 참조하십시오.</p></li>
<li><p>LangChain 및 기타 AI 도구 통합
생성형 AI(GenAI) 시대에 LangChain과 같은 도구는 애플리케이션 개발자들로부터 많은 주목을 받고 있습니다. 핵심 구성 요소로서 Milvus는 일반적으로 이러한 도구에서 벡터 저장소 역할을 수행합니다. 선호하는 AI 도구에 Milvus를 통합하는 방법을 알아보려면 <a href="/docs/ko/integrate_with_openai.md">‘통합</a> 및 <a href="/docs/ko/build-rag-with-milvus.md">튜토리얼’을</a> 참조하십시오.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">도구 및 생태계<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Attu
Attu는 Milvus와 Milvus에 저장된 데이터를 관리하는 데 도움을 주는 직관적인 올인원 GUI입니다. 자세한 내용은 <a href="https://github.com/zilliztech/attu">Attu</a> 저장소를 참조하십시오.</p></li>
<li><p>Birdwatcher
Birdwatcher는 Milvus용 디버깅 도구입니다. 이 도구를 사용하여 etcd에 연결하면 Milvus 시스템의 상태를 확인하거나 실시간으로 구성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/birdwatcher_overview.md">BirdWatcher를</a> 참조하십시오.</p></li>
<li><p>Prometheus 및 Grafana 통합
Prometheus는 Kubernetes용 오픈소스 시스템 모니터링 및 알림 툴킷입니다. Grafana는 모든 데이터 소스와 연결할 수 있는 오픈소스 시각화 스택입니다. Prometheus 및 Grafana를 모니터링 서비스 제공자로 사용하여 분산형 Milvus의 성능을 시각적으로 모니터링할 수 있습니다. 자세한 내용은 <a href="/docs/ko/monitor.md">모니터링 서비스 배포를</a> 참조하십시오.</p></li>
<li><p>Milvus 백업
Milvus 백업은 사용자가 Milvus 데이터를 백업하고 복원할 수 있게 해주는 도구입니다. 다양한 애플리케이션 시나리오에 적합하도록 CLI와 API를 모두 제공합니다. 자세한 내용은 <a href="/docs/ko/milvus_backup_overview.md">Milvus 백업을</a> 참조하십시오.</p></li>
<li><p>Milvus 데이터 변경 캡처(CDC)
Milvus-CDC는 Milvus 인스턴스 내의 증분 데이터를 캡처하고 동기화하며, 소스 및 대상 인스턴스 간에 데이터를 원활하게 전송함으로써 비즈니스 데이터의 신뢰성을 보장하고, 간편한 증분 백업 및 재해 복구를 가능하게 합니다. 자세한 내용은 <a href="/docs/ko/milvus-cdc-overview.md">Milvus CDC를</a> 참조하십시오.</p></li>
<li><p>Milvus 커넥터
Milvus는 Apache Spark와 같은 타사 도구와 Milvus를 원활하게 통합할 수 있도록 일련의 커넥터를 마련했습니다. 현재 Spark 커넥터를 사용하여 Milvus 데이터를 Apache Spark로 전송해 머신러닝 처리를 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/integrate_with_spark.md">Spark-Milvus 커넥터를</a> 참조하십시오.</p></li>
<li><p>벡터 전송 서비스(VTS)
Milvus는 Milvus 인스턴스와 Zilliz 클러스터, Elasticsearch, Postgres(PgVector), 다른 Milvus 인스턴스 등 다양한 데이터 소스 간에 데이터를 전송할 수 있는 도구 세트를 제공합니다. 자세한 내용은 <a href="https://github.com/zilliztech/vts">VTS를</a> 참조하십시오.</p></li>
</ul>
