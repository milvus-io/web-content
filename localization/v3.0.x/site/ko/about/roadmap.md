---
id: roadmap.md
title: Milvus 로드맵
related_key: Milvus roadmap
summary: Milvus는 AI 애플리케이션을 지원하기 위해 구축된 오픈소스 벡터 데이터베이스입니다. 다음은 개발 방향을 제시하는 로드맵입니다.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 로드맵<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 차세대 멀티모달 데이터베이스 및 데이터 레이크를 향하여<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus 제품 로드맵</strong></p>
<p>Milvus 로드맵에 오신 것을 환영합니다!</p>
<p>저희는 Milvus를 <strong>구조화 데이터에서 비정형 데이터까지</strong>, <strong>실시간 검색에서 오프라인 분석까지</strong>, <strong>단일 클러스터 성능에서 글로벌 데이터 레이크 아키텍처에 이르기까지</strong> 아우르는 차세대 멀티모달 데이터베이스의 새로운 시대로 이끌고 있습니다.</p>
<p>이 로드맵은 <strong>Milvus v2.6(개발 중)</strong>, <strong>Milvus v3.0(2026년 말 출시 예정)</strong>, <strong>Milvus v3.1(장기 개발)</strong>의 핵심 목표와 함께 <strong>Vector Lake(데이터 레이크 / Loon)</strong>의 진화 계획을 개괄적으로 설명합니다.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (개발 중)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>일정: 2025년 중반 – 2025년 말</strong></p>
<p>중점 사항: <strong>데이터 모델 업그레이드</strong>, <strong>스트리밍 아키텍처 리팩토링</strong>, <strong>핫/콜드 티어링 기능 구축</strong>, <strong>Vector Lake 프로토타입(v0.1)</strong> 출시.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 주요 내용<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>데이터 모델 업그레이드</strong></h4><ul>
<li><p>다중 벡터 임베딩 구조를 지원하기 위해 통합된 <strong>Tensor/StructList</strong> 데이터 유형을 도입하여 <em>ColBERT</em>, <em>CoLQwen</em>, <em>비디오</em> 및 <em>다중 모달 벡터와의</em> 호환성을 확보합니다.</p></li>
<li><p>LBS 및 GIS 분야의 활용 사례를 확대하기 위해 점, 영역, 공간 인덱싱( <em>libspatial</em> 기반)을 포함한 <strong>지리 데이터</strong> 지원을 추가합니다.</p></li>
<li><p><strong>타임존이 포함된 타임스탬프</strong> 데이터 유형을 지원합니다.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>StreamNode 아키텍처 리팩토링</strong></h4><ul>
<li><p>증분 쓰기 및 실시간 계산을 최적화하기 위해 스트리밍 수집 파이프라인을 재작성했습니다.</p></li>
<li><p>동시 처리 성능과 안정성을 대폭 개선하여, 실시간 및 오프라인 처리를 통합할 수 있는 기반을 마련했습니다.</p></li>
<li><p>새로운 메시지 큐 엔진인 <strong>Woodpecker</strong>를 도입합니다.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>핫/콜드 계층화 및 스토리지 아키텍처 (StorageV2)</strong></h4><ul>
<li><p><strong>Parquet</strong> 및 <strong>Vortex라는</strong> 두 가지 스토리지 형식을 지원하여 동시 처리 능력과 메모리 효율성을 향상시킵니다.</p></li>
<li><p>자동 핫/콜드 데이터 분리 및 지능형 스케줄링을 통해 계층형 스토리지를 구현합니다.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Vector Lake 프로토타입 (v0.1)</strong></h4><ul>
<li><p>FFI를 통해 <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion과</strong> 통합하여 오프라인 스키마 진화 및 KNN 쿼리를 지원합니다.</p></li>
<li><p>다중 모달 데이터 시각화 및 Spark ETL 데모를 제공하여 기초적인 데이터 레이크 아키텍처를 구축합니다.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (2026년 초 출시 예정)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>일정: 2025년 말 – 2026년 초</strong></p>
<p>중점: <strong>검색 경험</strong>, <strong>스키마 유연성</strong> 및 <strong>비정형 데이터 지원에</strong> 대한 포괄적인 개선과 함께 <strong>Vector Lake (v0.2)</strong> 출시.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 주요 특징<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>검색 경험 대대적 개편</strong></h4><ul>
<li><p>위치 기반 검색 또는 부정 예시를 지원하는 <strong>‘More Like This(MLT)</strong> ’ 유사도 검색 기능 도입.</p></li>
<li><p><strong>하이라이트</strong> 및 <strong>부스팅과</strong> 같은 시맨틱 검색 기능을 추가합니다.</p></li>
<li><p><strong>사용자 정의 사전</strong> 및 <strong>동의어 테이블을</strong> 지원하여 분석기(Analyzer) 계층에서 어휘 및 의미 규칙을 정의할 수 있게 되었습니다.</p></li>
<li><p>쿼리에 대한 <strong>집계</strong> 기능을 도입했습니다.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>멀티테넌시 및 리소스 관리</strong></h4><ul>
<li><p>다중 테넌트 삭제, 통계, 핫/콜드 계층화를 지원합니다.</p></li>
<li><p>단일 클러스터에서 수백만 개의 테이블을 지원할 수 있도록 리소스 격리 및 스케줄링 전략을 개선합니다.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>스키마 및 기본 키 개선</strong></h4><ul>
<li><p>데이터 일관성과 고유성을 보장하기 위해 <strong>전역 기본 키 중복 제거(Global PK Dedup)</strong> 를 구현합니다.</p></li>
<li><p><strong>유연한 스키마 관리</strong> (열 추가/삭제, 백업 채우기)를 지원합니다.</p></li>
<li><p>벡터 필드에서 <strong>NULL 값을</strong> 허용합니다.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>비정형 데이터 유형 확장 (BLOB / 텍스트)</strong></h4><ul>
<li><p>파일, 이미지, 동영상과 같은 바이너리 데이터에 대한 네이티브 저장 및 참조 기능을 제공하는 <strong>BLOB 유형을</strong> 도입합니다.</p></li>
<li><p><strong>TEXT 유형을</strong> 도입하여 향상된 전체 텍스트 및 콘텐츠 기반 검색 기능을 제공합니다.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>엔터프라이즈급 기능</strong></h4><ul>
<li><p><strong>스냅샷 기반 백업 및 복구를</strong> 지원합니다.</p></li>
<li><p><strong>종단 간 추적</strong> 및 <strong>감사 로깅</strong> 기능을 제공합니다.</p></li>
<li><p>다중 클러스터 배포 환경에서 <strong>액티브-스탠바이 고가용성(HA)을</strong> 구현합니다.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>벡터 레이크(v0.2)</strong></h4><ul>
<li><p><strong>TEXT/BLOB 스토리지</strong> 및 <strong>다중 버전 스냅샷 관리를</strong> 지원합니다.</p></li>
<li><p>오프라인 인덱싱, 클러스터링, 중복 제거 및 차원 축소 작업을 위해 Spark를 통합합니다.</p></li>
<li><p><strong>ChatPDF 콜드 쿼리 및 오프라인 벤치마크 데모를</strong> 제공합니다.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (장기 비전)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>일정: 2026년 중반</strong></p>
<p>중점 사항: <strong>사용자 정의 함수(UDF)</strong>, <strong>분산 컴퓨팅 통합</strong>, <strong>스칼라 쿼리 최적화</strong>, <strong>동적 샤딩</strong>, <strong>Vector Lake(v1.0)</strong>의 정식 출시.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 주요 특징<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF 및 분산 컴퓨팅 생태계</strong></h4><ul>
<li><p><strong>사용자 정의 함수(UDF)를</strong> 지원하여, 개발자가 검색 및 계산 워크플로우에 맞춤형 로직을 적용할 수 있도록 합니다.</p></li>
<li><p><strong>Ray Dataset / Daft와의</strong> 긴밀한 연동을 통해 분산 UDF 실행 및 다중 모달 데이터 처리를 지원합니다.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>스칼라 쿼리 및 로컬 포맷 개선</strong></h4><ul>
<li><p>스칼라 필드의 필터링 및 집계 성능을 최적화합니다.</p></li>
<li><p>표현식 평가 및 인덱스 가속 실행을 강화합니다.</p></li>
<li><p>로컬 파일 형식에 대한 <strong>인플레이스 업데이트를</strong> 지원합니다.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>고급 검색 기능</strong></h4><ul>
<li><p><strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> 및 <strong>퍼지 일치</strong> 쿼리 기능을 추가합니다.</p></li>
<li><p>다음 기능을 지원하여 텍스트 검색 기능을 강화합니다:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>동적 샤딩 및 확장성</strong></h4><ul>
<li><p>원활한 확장을 위해 <strong>자동 샤드 분할</strong> 및 <strong>부하 분산을</strong> 활성화합니다.</p></li>
<li><p><strong>전역 인덱스 구축을</strong> 개선하고 <strong>분산 검색 성능을</strong> 보장합니다.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p><strong>Ray / Daft / PyTorch와의</strong> 심층적인 통합을 통해 분산 UDF 및 컨텍스트 엔지니어링 사용 사례를 지원합니다.</p></li>
<li><p><strong>RAG(검색 강화 생성) 데모를</strong> 제공하고 <strong>Iceberg 테이블에서 데이터를 가져옵니다</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Milvus의 미래를 함께 만들어 갑시다<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 전 세계 개발자 커뮤니티가 주도하는 오픈소스 프로젝트입니다.</p>
<p>모든 커뮤니티 구성원 여러분을 따뜻하게 초대하여 차세대 멀티모달 데이터베이스를 함께 만들어 나가길 바랍니다:</p>
<ul>
<li><p>💬 <strong>피드백 공유</strong>: 새로운 기능이나 최적화 아이디어를 제안해 주세요</p></li>
<li><p>🐛 <strong>문제 보고</strong>: GitHub Issues를 통해 버그를 신고해 주세요</p></li>
<li><p>🔧 <strong>코드 기여</strong>: PR을 제출하고 핵심 기능 개발에 기여해 주세요</p>
<ul>
<li><p><strong>풀 리퀘스트(PR)</strong>: <a href="https://github.com/milvus-io/milvus/pulls">코드베이스</a>에 직접 기여해 주세요. 버그 수정, 기능 추가, 문서 개선 등 어떤 형태의 기여라도 환영합니다.</p></li>
<li><p><strong>개발 가이드</strong>: 코드 기여에 대한 지침은 <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">기여자 가이드를</a> 확인해 주세요.</p></li>
</ul></li>
<li><p>⭐ <strong>널리 알리기</strong>: 모범 사례와 성공 사례를 공유해 주세요</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
