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
            <th>Milvus 2.5.0(최근 릴리스에서 달성)</th>
            <th>다음 릴리스(CY25 중반)</th>
            <th>향후 로드맵 (1년 이내)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI 기반 비정형 데이터 처리</strong><br/><i>AI 모델과 첨단 기술을 활용한 비정형 데이터 처리 및 분석 역량 강화.</i></td>
            <td><strong>전체 텍스트 검색</strong><br/><i>Sparse-BM25로 전체 텍스트 검색을 지원합니다. 새로운 API는 텍스트를 입력으로 받아 밀버스 내부에서 자동으로 스파스 벡터를 생성합니다</i><br/><br/><strong>스파스 벡터(GA)</strong><br/><i>스파스 벡터의 효율적인 저장 및 인덱싱 방식 지원</i><br/></td>
            <td><br/><i>원본 데이터 수집을 위한 주요 모델 서비스 지원</i><br/><br/><strong>고급 리랭커</strong><br/><i>모델 기반 리랭커 및 사용자 정의 스코어링 기능 지원</i><br/><br/><strong>JSON 향상</strong><br/><i>처리 속도를 높이기 위한 JSON 색인 및 파싱</i><i>지원</i></td>
            <td><strong>원본 데이터 인 및 데이터 아웃</strong><br/><i>원본 데이터 처리를 위한 블롭 및 URL 참조 지원</i><br/><br/><strong>더 많은 데이터 유형 지원</strong><br/><i>데이터 시간, 지도, GIS</i> 등<br/><br/><strong>텐서 지원</strong><br/><i>벡터 목록, 콜버트, 코팔리 등과 같은 일반적인 사용법을 지원합니다.</i></td>
        </tr>
        <tr>
            <td><strong>검색 품질 및 성능</strong><br/><i>아키텍처, 알고리즘, API를 최적화하여 정확하고 관련성이 높으며 빠른 결과를 제공합니다</i>.</td>
            <td><strong>텍스트 일치 기능</strong><br/><i>텍스트/바카르에서 키워드/토큰을 빠르게 필터링</i><br/><br/><strong>그룹 검색 개선</strong><br/><i>하이브리드 검색에서 group_size 도입 및 그룹별 추가 지원</i><br/><br/><strong>비트맵 인덱스 및 반전 인덱스</strong><br/><i>태그에 대한 필터링 가속화</i></td>
            <td><strong>고급 일치</strong><br/><i>예: 일치 구문, 퍼지 일치 및 기타 토큰화 도구</i><br/><br/><strong>집계</strong><br/><i>스칼라 필드 집계(예: 최소, 최대, 카운트, 고유).</i><br/></td>
            <td><strong>부분 업데이트</strong><br/><i>특정 필드 값에 대한 업데이트 지원</i><br/><br/><strong>정렬 기능</strong><br/><i>실행 중 스칼라 필드별 정렬</i><br/><br/><strong>데이터 클러스터링 지원</strong><br/><i>데이터 공동 위치성</i></td>
        </tr>
        <tr>
            <td><strong>풍부한 기능 및 관리</strong><br/><i>개발자 친화적이고 강력한 데이터 관리 기능</i></td>
            <td><strong>데이터 가져오기에서 CSV 파일 지원</strong><br/><i>Bulkinsert는 CSV 형식을 지원합니다</i><br/><br/><strong>Null 및 기본값 지원</strong><br/> Null<i>및 기본값 유형으로 다른 DBMS에서 데이터를 쉽게 가져올 수</i><strong>있습니다</strong><br/><br/><strong>Milvus WebUI(베타)</strong><br/><i>DBA를 위한 시각적 관리 도구</i></td>
            <td><strong>기본 키 중복 제거</strong><br/><i>글로벌 pk 인덱스 사용</i><br/><br/><strong>온라인 스키마 변경</strong><br/><i>예: 필드 추가/삭제, varchar 길이 수정</i><br/><br/><strong>데이터 버전 관리 및 복원</strong><br/><i>스냅샷을 통한 데이터 버전 관리 지원</i></td>
            <td><strong>Rust 및 C++ SDK</strong><br/><i>더 많은 클라이언트 지원</i><br/><br/><strong>UDF 지원 </strong><br/><i>사용자 정의 기능</i></td>
        </tr>
        <tr>
            <td><strong>비용 효율성 및 아키텍처</strong><br/><i>안정성, 비용 효율성 및 확장성을 우선시하는 최첨단 시스템 </i></td>
            <td><strong>필드별 로드</strong><br/><i>로드할 컬렉션의 일부 선택</i><br/><br/><strong>메모리 최적화</strong><br/><i>OOM 감소 및 로드 향상</i><br/><br/><strong>스트리밍 노드(베타)</strong><br/><i>글로벌 일관성 제공 및 루트 코디네이터의 성능 병목 현상 해결</i><br/><br/><strong>스토리지 포맷 V2(베타)</strong><br/><i>범용 포맷 설계 및 디스크 기반 데이터 액세스 기반</i><br/><br/><strong>클러스터링 압축</strong><br/><i>구성에 따른 데이터 재배분으로 읽기 성능 가속화</i></td>
            <td><strong>지연 로드</strong><br/><i>load()를 명시적으로 호출하지 않고 첫 번째 읽기 작업으로 로드 시작 가능</i><br/><br/> 계층형<strong>스토리지</strong><br/><i>비용 최적화를 위한 핫 스토리지 및 콜드 스토리지 지원</i><br/><br/><strong>필드별 릴리스</strong><br/><i>메모리 사용량 절감을 위한 컬렉션 일부 해제</i><br/><br/><strong>스트리밍 노드(GA)</strong><br/><i>스트리밍 데이터 처리 및 아키텍처 간소화</i></td>
            <td><i>종속성</i><strong>제거</strong><br/><i>펄서 등 외부 구성 요소에 대한 종속성을 줄이거나 제거</i><br/><br/><strong>코디 로직을 MixCoord로 병합</strong><br/><i>아키텍처 단순화</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>저희의 로드맵은 일반적으로 가장 최근 릴리스, 다음 릴리스, 그리고 향후 1년 이내의 중장기 비전 등 세 부분으로 구성됩니다.</li>
<li>작업을 진행하면서 지속적으로 학습하고 필요에 따라 항목을 추가하거나 제거하면서 초점을 조정하기도 합니다.</li>
<li>이러한 계획은 참고용이며 변경될 수 있으며 구독 서비스에 따라 달라질 수 있습니다.</li>
<li>저희는 꾸준히 로드맵을 준수하고 있으며, <a href="/docs/ko/release_notes.md">릴리스 노트는</a> 참고 자료로 활용하고 있습니다.</li>
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
<li><p>GitHub에서 별표 표시하기: <a href="https://github.com/milvus-io/milvus">GitHub 리포지토리에</a> 별표를 표시하여 지지를 표시하세요.</p></li>
</ul>
