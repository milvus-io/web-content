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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 차세대 멀티모달 데이터베이스 및 벡터 레이크베이스를 향하여<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
<p>저희는 Milvus를 <strong>구조화 데이터에서 비구조화 데이터까지, 실시간 검색에서 오프라인 분석까지, 단일 클러스터 성능에서 글로벌</strong> <strong>벡터 레이크베이스 아키텍처에</strong> <strong>이르기까지 아우르는</strong> 차세대 멀티모달 데이터베이스의 새로운 시대로 이끌고 있습니다 <strong>.</strong></p>
<p>이 로드맵은 <strong>Milvus v3.0(공개 베타)</strong> 및 <strong>Milvus v3.1(장기 개발)</strong>의 핵심 목표와 <strong>Zilliz 벡터 레이크베이스의</strong> 진화 계획을 개괄적으로 설명합니다.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (공개 베타)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>공개 베타: 2026년 5월</strong></p>
<p>중점: 엔진 내 정렬, 집계 및 다중 벡터 검색 기능을 갖춘 <strong>시맨틱 네이티브 쿼리 엔진</strong> 구축과, 데이터 마이그레이션 없이도 컴퓨팅이 데이터에 접근할 수 있도록 하는 <strong>Zilliz Vector Lakebase의 레이크 네이티브 기반</strong> 구축.</p>
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>스키마 및 데이터 유형 진화</strong></h4><ul>
<li>인덱스를 재구축하거나 서비스 제공을 중단하지 않고 런타임에 ALTER COLLECTION ADD COLUMN 및 DROP COLUMN을 지원합니다.</li>
<li>새 컬럼에 대해 <strong>두 가지 백필 경로를</strong> 제공합니다: Spark 커넥터를 통한 외부 경로와, 쓰기 시점에 자동 생성되는 BM25 스파스 벡터를 활용한 내부 경로입니다.</li>
<li>BM25 및 텍스트 매칭을 지원하며, 벡터와 함께 원본 텍스트를 저장하는 일류 데이터 유형으로 <strong>TEXT를</strong> 도입했습니다.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>쿼리</strong> <strong>실행 방식 전면 개편</strong></h4><ul>
<li>세그먼트별 정렬 및 쿼리 노드 간 병합 정렬을 통해 <strong>Order By를</strong> 엔진 내부로 통합합니다.</li>
<li>커널 내에서 계산되는 SQL 스타일의 <strong>쿼리</strong> <strong>집계</strong> (COUNT, SUM, AVG, MIN, MAX를 포함한 GROUP BY)를 추가합니다.</li>
<li>버킷별 통계 및 서버 측 중첩 하위 패싯을 지원하는 ANN 결과에 대한 <strong>검색 패싯을</strong> 도입합니다.</li>
<li>클러스터 측에 등록된 <strong>사용자 정의 사전</strong> 및 동의어 테이블을 지원하여 CJK 및 도메인별 리콜률을 개선했습니다.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>다중 벡터 및 후기 상호작용 지원</strong></h4><ul>
<li><strong>StructList를</strong> 도입하여 하나의 엔티티를 여러 벡터가 포함된 단일 행으로 표현하며, MAX_SIM을 통해 네이티브 지연 상호작용(ColBERT, ColPali)을 지원합니다.</li>
<li>StructList 필드에 대한 <strong>요소 수준 및 엔티티 수준 검색을</strong> 지원하며, 엔티티 수준 결과에 대해 구성 가능한 일치 정책을 제공합니다.</li>
<li>세 가지 <strong>다중 벡터 검색 전략인</strong> TokenANN(전면 검색), Muvera(투영 기반, 훈련 불필요), Lemur(학습된 압축)를 추가했습니다.</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>검색 및 인덱스 전면 개편</strong></h4><ul>
<li>블록 압축, 가중치 양자화 및 영구 저장 형식을 적용하여 <strong>스파스 역색인을</strong> 전면 개편하고, <strong>SINDI를</strong> 기본 스파스 역색인 알고리즘으로 도입했습니다.</li>
<li>전체 <strong>Faiss 제품군</strong> (SVS, Panorama, PQ, IVFPQ, ScaNN) 및 근사 중복 감지를 위한 <strong>MinHash DIDO를</strong> 통해 인덱스 적용 범위를 확장했습니다.</li>
<li>비동기 임베딩 및 누락된 모달리티를 위해 <strong>null 허용 벡터 필드를</strong> 지원하며, 검색 시 자동 필터링을 적용합니다.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>벡터 Lakebase 스토리지 및 컴퓨팅 아키텍처</strong></h4><ul>
<li>S3 / GCS / Azure 내의 데이터를 그대로 색인화하고 쿼리할 수 있는 <strong>External Collection을</strong> 도입하며, Lance, Parquet, Iceberg 및 Vortex 테이블 형식을 지원합니다.</li>
<li>오브젝트 스토리지에서 효율적인 포인트 읽기를 위한 혼합 형식 스토리지 레이어인 <strong>Loon(Storage V3)</strong>과 개방형 열 기반 형식인 <strong>Vortex를</strong> 추가했습니다.</li>
<li>서비스가 계속 쓰기 작업을 수행하는 동안 배치 처리를 위해 MVCC 방식의 격리를 적용한 <strong>특정 시점 스냅샷을</strong> 지원합니다.</li>
<li>Spark / Databricks / EMR 파이프라인에서 Milvus로 직접 읽고 쓸 수 있도록 <strong>Spark DataSource v2</strong> 로 통합되었습니다.</li>
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
    </button></h2><p><strong>일정: 2026년 말 및 그 이후</strong></p>
<p>중점: <strong>스토리지 인텔리전스</strong>, <strong>쓰기 경로 무결성</strong>, <strong>컴퓨팅 확장성</strong>, 그리고 <strong>Vector Lakebase와의</strong> <strong>상호 운용성</strong> <strong>확대</strong>.</p>
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>스토리지 및 쓰기 경로</strong></h4><ul>
<li>스토리지 계층에서 페이지 인덱스 및 블룸 필터 프루닝을 활용한 <strong>술어 푸시다운을</strong> 추가합니다.</li>
<li>쓰기 시 중복을 방지하기 위해 데이터 수집 시 <strong>기본 키</strong> 중복 <strong>제거 기능을</strong> 구현합니다.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>컴퓨팅 및 탄력성</strong></h4><ul>
<li>데이터 플레인에서 엔진 내에서 사용자 <strong>정의</strong> 로직을 실행할 수 있도록 <strong>사용자 정의 함수(UDF)를</strong> 지원합니다.</li>
<li>사용자 정의 샤딩 키를 지원하여 데이터 증가에 따라 샤드를 재분할할 수 있도록 <strong>샤드 분할 기능을</strong> 활성화합니다.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>Spark 및</strong> <strong>Vector Lakebase</strong> <strong>확장</strong></h4><ul>
<li>더 풍부한 <strong>네이티브 배치 연산자</strong> 라이브러리를 통해 Spark 커넥터를 확장합니다.</li>
<li>타임 트래블, 스키마 진화, 스냅샷 롤백을 포함한 <strong>테이블 형식</strong> 기능을 추가합니다.</li>
<li><strong>CDC 기반의 최신 외부 인덱스</strong>, Apache Paimon 지원 및 추가 데이터 형식을 통해 Vector Lakebase의 상호 운용성을 확장합니다.</li>
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
    </button></h2><p>Milvus는 전 세계 개발자 커뮤니티가 주도하는 오픈소스 프로젝트입니다. 모든 커뮤니티 구성원들이 차세대 멀티모달 데이터베이스를 함께 만들어 가실 것을 초대합니다:</p>
<ul>
<li><p>💬 <strong>피드백 공유</strong>: <a href="https://github.com/milvus-io/milvus/discussions">GitHub</a> Discussions에서 새로운 기능이나 최적화 아이디어를 제안해 주세요.</p></li>
<li><p>🐛 <strong>문제 보고</strong>: <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues를</a> 통해 버그를 신고해 주세요.</p></li>
<li><p>🔧 <strong>코드 기여</strong>: PR을 제출하여 핵심 기능 개발에 기여해 주세요.</p>
<ul>
<li><strong>풀 리퀘스트</strong>(PR<strong>)</strong>: <a href="https://github.com/milvus-io/milvus/pulls">코드베이스</a>에 직접 기여해 주세요. 버그 수정, 기능 추가, 문서 개선 등 어떤 형태의 기여라도 환영합니다.</li>
<li><strong>개발 가이드</strong>: 코드 기여에 대한 지침은 <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">기여자 가이드를</a> 확인해 주세요.</li>
</ul></li>
<li><p>🗣️ <strong>대화에 참여하세요</strong>: <a href="https://milvus.io/discord">Discord</a>, <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Milvus Office Hours</a> 또는 <a href="https://milvus.io/community">모든 커뮤니티 채널에서</a> 질문을 하고 유지보수 담당자들을 만나보세요.</p></li>
<li><p>⭐ <strong>소문 내기</strong>: 모범 사례와 성공 사례를 공유하고, <a href="https://twitter.com/milvusio">X</a>, <a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a>, <a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube에서</a> Milvus를 팔로우해 주세요.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
