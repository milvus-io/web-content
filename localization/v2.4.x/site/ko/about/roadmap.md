---
id: roadmap.md
title: Milvus 로드맵
related_key: Milvus roadmap
summary: Milvus는 AI 애플리케이션을 구동하기 위해 구축된 오픈 소스 벡터 데이터베이스입니다. 개발 로드맵은 다음과 같습니다.
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
    </button></h1><p>Milvus 로드맵에 오신 것을 환영합니다! Milvus를 개선하고 발전시키기 위한 지속적인 여정에 동참해 주세요. 그간의 성과와 향후 계획, 그리고 앞으로의 비전을 공유하게 되어 매우 기쁘게 생각합니다. 로드맵은 단순히 향후 출시될 기능의 목록이 아니라 혁신을 향한 저희의 노력과 커뮤니티와의 협력에 대한 헌신을 반영하고 있습니다. 로드맵을 자세히 살펴보고 피드백을 제공하여 Milvus의 미래를 만들어가는 데 도움을 주시기 바랍니다!</p>
<h2 id="Roadmap" class="common-anchor-header">로드맵<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>카테고리</th>
            <th>Milvus 2.4.0 (최근 달성)</th>
            <th>Milvus 2.5.0 (24년 중반 출시 예정)</th>
            <th>향후 로드맵(Milvus 3.0, 24년 내 출시 예정)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI-개발자 친화적</strong><br/><i>최신 AI 혁신으로 강화된 개발자 친화적 기술 스택</i></td>
            <td><strong>멀티-벡터 및 하이브리드 검색</strong><br/><i>멀티플렉스 리콜 및 융합을 위한 프레임워크</i><br/><br/><strong>GPU 인덱스 가속화</strong><br/><i>더 높은 QPS 및 더 빠른 인덱스 생성 지원</i><br/><br/><strong>PyMilvus의 모델 라이브러리</strong><br/><i>Milvus용 통합 임베딩 모델</i></td>
            <td><strong>Sparse Vector(GA)</strong><br/><i>로컬 특징 추출 및 키워드 검색</i><br/><br/><strong>Milvus Lite(GA)</strong><br/><i>Milvus의 경량 인메모리 버전</i><br/><br/><strong>임베딩 모델 갤러리</strong><br/><i>모델 라이브러리에서 이미지 및 멀티모달 임베딩과 리랭커 모델에 대한 지원</i></td>
            <td><strong>원본 데이터 인 및 데이터 아웃</strong><br/><i>블롭 데이터 유형 지원</i><br/><br/><strong>데이터 클러스터링</strong><br/><i>데이터 공동 위치성</i><br/><br/><strong>시나리오 지향 벡터 검색</strong><br/><i>멀티 타겟 검색 및 NN 필터링</i><br/><br/><strong>임베딩 및 리랭커 엔드포인트 지원</strong></td>
        </tr>
        <tr>
            <td><strong>풍부한 기능</strong><br/><i>향상된 검색 및 데이터 관리 기능</i></td>
            <td><strong>FP16, BF16 데이터 유형 지원</strong><br/><i>이러한 ML 데이터 유형은 메모리 사용량을 줄이는 데 도움이 됩니다</i><br/><br/><strong>그룹화 검색</strong><br/><i>집계 분할 임베딩</i><br/><br/> 퍼지<strong>일치 및 반전 인덱스</strong><br/><i>varchar 및 int와 같은 스칼라 유형에 대한 퍼지 일치 및 반전 인덱싱을 지원합니다</i>.</td>
            <td><strong>배열 및 JSON용 역 인덱스</strong><br/><i>배열 및 부분 지원 JSON용 인덱싱</i><br/><br/> 비트셋<strong>인덱스</strong><br/><i>실행 속도 개선 및 향후 데이터 집계</i><br/><br/><strong>수집 잘라내기</strong><br/><i>메타데이터를 보존하면서 데이터 정리 허용</i><br/><br/><strong>NULL 및 기본값 지원</strong></td>
            <td><strong>더 많은 데이터 유형 지원</strong><br/><i>예: 날짜 시간, GIS</i><br/><br/><strong>고급 텍스트 필터링</strong><br/><i>예: 일치 구문</i><br/><br/><strong>기본 키 중복 제거</strong></td>
        </tr>
        <tr>
            <td><strong>비용 효율성 및 아키텍처</strong><br/><i>안정성, 비용 효율성, 확장성 및 성능을 강조하는 고급 시스템</i></td>
            <td><strong>더 많은 컬렉션/파티션 지원</strong><br/><i>소규모 클러스터에서 10,000개 이상의 컬렉션 처리</i><br/><br/> Mmap<strong>최적화</strong><br/><i>메모리 소비 감소와 지연 시간의 균형을 유지</i><br/><br/><strong>대량 삽입 최적화</strong><br/><i>대용량 데이터 세트 가져오기 간소화</i></td>
            <td><strong>지연 로드</strong><br/><i>읽기 작업을 통해 온디맨드 방식으로 데이터 로드</i><br/><br/><strong>주요 압축</strong><br/><i>구성에 따라 데이터를 재분배하여 읽기 성능 향상</i><br/><br/><strong>데이터 증가를 위한</strong> Mmap<br/><i>데이터 세그먼트 확장을 위한</i> Mmap<i>파일</i></td>
            <td><strong>메모리 제어</strong><br/><i>메모리 부족 문제를 줄이고 글로벌 메모리 관리 제공</i><br/><br/><strong>LogNode 소개</strong><br/><i>글로벌 일관성을 보장하고 루트 조정의 단일 지점 병목 현상을 해결</i><br/><br/><strong>스토리지 포맷 V2</strong><br/><i>범용 포맷 설계로 디스크 기반 데이터 액세스의 토대 마련</i></td>
        </tr>
        <tr>
            <td><i>엔터프라이즈</i><strong>레디</strong><br/><i>엔터프라이즈 프로덕션 환경의 요구 사항을 충족하도록 설계됨</i></td>
            <td><strong>Milvus CDC</strong><br/><i>데이터 복제 기능</i><br/><br/><strong>액세스 로그 개선</strong><br/><i>감사 및 추적을 위한 상세 기록</i></td>
            <td><strong>새로운 리소스 그룹</strong><br/><i>향상된 리소스 관리</i><br/><br/><strong>스토리지 후크</strong><br/><i>BYOK(Bring Your Own Key) 암호화 지원</i></td>
            <td><strong>동적 복제본 수 조정</strong><br/><i>복제본 수의 동적 변경 용이</i><br/><br/> 동적<strong>스키마 수정</strong><br/><i>예: 필드 추가/삭제, 바차 길이 수정</i><br/><br/> Rust<strong>및 C# SDK</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>저희의 로드맵은 일반적으로 가장 최근 릴리스, 다음 릴리스, 그리고 향후 1년 이내의 중장기 비전 등 세 부분으로 구성됩니다.</li>
<li>작업을 진행하면서 지속적으로 학습하고 필요에 따라 항목을 추가하거나 제거하면서 초점을 조정하기도 합니다.</li>
<li>이러한 계획은 참고용이며 변경될 수 있으며 구독 서비스에 따라 달라질 수 있습니다.</li>
<li>저희는 꾸준히 로드맵을 준수하고 있으며, <a href="/docs/ko/v2.4.x/release_notes.md">릴리스 노트는</a> 참고 자료로 활용하고 있습니다.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">기여 방법<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>오픈 소스 프로젝트인 Milvus는 커뮤니티 기여를 통해 성장하고 있습니다. Milvus의 여정에 동참할 수 있는 방법은 다음과 같습니다.</p>
<h3 id="Share-feedback" class="common-anchor-header">피드백 공유</h3><ul>
<li><p>문제 보고: 버그를 발견했거나 제안 사항이 있으신가요? <a href="https://github.com/milvus-io/milvus/issues">GitHub 페이지에서</a> 이슈를 개설하세요.</p></li>
<li><p>기능 제안: 새로운 기능이나 개선에 대한 아이디어가 있으신가요? <a href="https://github.com/milvus-io/milvus/discussions">여러분의 의견을 듣고 싶습니다!</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">코드 기여</h3><ul>
<li><p>풀 리퀘스트: <a href="https://github.com/milvus-io/milvus/pulls">코드베이스에</a> 직접 기여하세요. 버그 수정, 기능 추가, 문서 개선 등 어떤 것이든 여러분의 기여를 환영합니다.</p></li>
<li><p>개발 가이드: <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">기여자 가이드에서</a> 코드 기여에 대한 가이드라인을 확인하세요.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">널리 알리기</h3><ul>
<li><p>소셜 공유: Milvus를 사랑하시나요? 소셜 미디어와 기술 블로그에서 사용 사례와 경험을 공유하세요.</p></li>
<li><p>깃허브에서 별표 표시하기: <a href="https://github.com/milvus-io/milvus">GitHub 리포지토리에</a> 별표를 달아 지지를 표시하세요.</p></li>
</ul>
