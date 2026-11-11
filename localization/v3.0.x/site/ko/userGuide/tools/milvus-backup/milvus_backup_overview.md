---
id: milvus_backup_overview.md
summary: Milvus Backup은 Milvus 데이터의 백업 및 복원을 위한 CLI 및 HTTP API 워크플로를 제공합니다.
title: Milvus 백업
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus 백업<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup은 Milvus 컬렉션을 백업하고, 동일한 인스턴스나 다른 인스턴스에서 이를 복원합니다. 이 도구는 명령줄 인터페이스(CLI)와 HTTP API를 제공합니다.</p>
<p>Milvus Backup <strong>0.6.0에서는</strong> Milvus 3.0용 스냅샷 백업, 버전 관리되는 v2 구성 스키마, 백업 생성을 위한 목적별 사전 설정이 추가되었습니다. Milvus 3.0에 대한 공식 백업 및 복원 지원은 <strong>Milvus 3.0.1부터</strong> 시작됩니다.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">가이드 선택<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup은 Milvus 서버 버전과는 별도로 자체 릴리스 버전을 갖습니다. 현재 가이드는 0.6.x 시리즈를 다루며, ‘Backup 0.5.x’ 섹션에는 이전 워크플로가 유지되어 있습니다. 페이지 제목 라벨을 통해 해당 Backup 시리즈를 확인할 수 있습니다. 설치 지침 및 예제에서는 검증된 특정 릴리스 버전을 사용합니다. 소스 및 대상 Milvus 서버의 호환성은 별도로 확인하십시오.</p>
<table>
<thead>
<tr><th>작업 내용</th><th>가이드</th></tr>
</thead>
<tbody>
<tr><td>Backup 0.5.x 계속 사용하기</td><td><a href="/docs/ko/milvus_backup_cli.md">0.5.x 명령어</a> 및 <a href="/docs/ko/milvus_backup_api.md">HTTP API</a>(예제는 0.5.16 버전을 기준으로 함)</td></tr>
<tr><td>기존 Backup 설치 환경 업그레이드</td><td><a href="/docs/ko/milvus_backup_upgrade.md">0.5.x에서 0.6.x로 업그레이드</a></td></tr>
<tr><td>Backup 0.6.x 설치 및 사용</td><td><a href="/docs/ko/milvus_backup_0_6_cli.md">명령어 및 구성</a>, 또는 <a href="/docs/ko/milvus_backup_0_6_api.md">HTTP API</a></td></tr>
<tr><td>Milvus 3.0.1 이상에서 스냅샷 백업 및 복원</td><td><a href="/docs/ko/snapshot-backup-and-restore.md">단일 인스턴스에서의 스냅샷 백업 및 복원</a></td></tr>
</tbody>
</table>
<p>기존의 <a href="/docs/ko/single-instance-backup-and-restore.md">동일 인스턴스</a>, <a href="/docs/ko/shared-bucket-backup-and-restore.md">공유 버킷</a>, <a href="/docs/ko/cross-bucket-backup-and-restore.md">버킷 간</a>, <a href="/docs/ko/multi-storage-backup-and-restore.md">스토리지 간</a> 가이드에는 0.5.16 버전의 구성 및 명령어가 그대로 유지됩니다. 해당 가이드의 예제는 새로운 Backup 릴리스가 출시되더라도 버전이 변경되지 않습니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>동일한 릴리스의 백업 바이너리와 구성 예제를 사용하십시오. <a href="/docs/ko/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x 가이드는</a> 0.5.16 버전을 기준으로 하며, <a href="/docs/ko/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">현재 가이드는</a> 0.6.0 버전을 기준으로 합니다.</li>
<li>Milvus, Milvus 스토리지 및 백업 대상에 대한 네트워크 액세스를 제공하십시오. 스냅샷 작업을 수행하려면 Milvus 서버가 백업 저장소에 접근할 수 있어야 합니다.</li>
<li>아래의 서버 호환성을 확인하십시오. Go는 소스 코드에서 빌드할 때만 필요하며, Backup 0.5.16의 경우 1.25 이상, 0.6.0의 경우 1.26 이상이 필요합니다.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">아키텍처<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Milvus 백업 구성 요소</span>
  
 </span></p>
<p>Milvus Backup은 Milvus 인스턴스와 백업 스토리지 간의 컬렉션 메타데이터 및 데이터 백업을 조정합니다. Backup 0.6.0에서는 선택한 형식에 따라 컬렉션 데이터의 내보내기 및 복원 방식이 결정됩니다:</p>
<table>
<thead>
<tr><th>형식</th><th>백업 및 복원 동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus는 컬렉션 스냅샷 번들을 내보냅니다. Milvus Backup은 번들 정보를 기록하며, 복원 시 Milvus를 통해 번들을 가져옵니다. 서버는 결과적인 데이터 레이아웃을 관리합니다.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup은 컬렉션 데이터 파일과 메타데이터를 복사한 다음, 복원 시 컬렉션을 재구성하고 백업된 데이터를 가져옵니다.</td></tr>
<tr><td><code translate="no">auto</code></td><td>서버에서 지원하는 기능에 따라 형식을 선택합니다. Milvus 3.0에서는 스냅샷을 선택합니다.</td></tr>
</tbody>
</table>
<p>백업 디렉터리에는 메타데이터와 해당 형식에 필요한 파일이 포함되어 있습니다. 아카이빙하거나 이동할 때는 디렉터리 전체를 보존해야 합니다. 스냅샷 백업이 binlog 디렉터리 레이아웃을 사용한다고 가정해서는 안 됩니다.</p>
<p>0.6.0 버전에서 ‘ <code translate="no">create --for</code> ’ 사전 설정은 용도별 옵션을 구성합니다. ‘ <code translate="no">clone</code> ’는 선택한 형식을 유지하는 반면, ‘ <code translate="no">archive</code> ’ 및 ‘ <code translate="no">secondary</code> ’는 binlog가 필요합니다. 보조 서버(secondary)의 경우 구성된 복제 토폴로지도 필요하며, 인스턴스 간의 일반적인 마이그레이션에는 보조 서버가 필요하지 않습니다. <a href="/docs/ko/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">‘백업 형식 또는 용도 선택’을</a> 참조하십시오.</p>
<p>백업 0.6.0은 백업 중에 외부 컬렉션을 건너뜁니다. 작업이 성공적으로 완료되었다고 해서 외부 컬렉션 데이터가 포함되었다는 의미는 아닙니다.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">호환성 매트릭스<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0을 사용하기 위해 모든 Milvus 설치 환경을 3.0으로 업그레이드할 필요는 없습니다.</strong> 이 버전은 지원되는 Milvus 2.x 버전에서 바이너리 로그(binlog) 워크플로를 지원합니다. Milvus 3.0 계열에 대한 공식 백업 및 복원 지원은 <strong>Milvus 3.0.1부터</strong> 시작되며, 스냅샷 예제에서는 해당 계열을 사용합니다.</p>
<p>이 <a href="/docs/ko/milvus_backup_upgrade.md">업그레이드 가이드는</a> Milvus 2.6.11에서 Backup 0.5.16 및 0.6.0을 사용하여 검증되었으며, 여기에는 0.6.0을 통한 0.5.16 백업 복원도 포함됩니다. 이 테스트된 조합은 아래 호환성 매트릭스의 범위를 확장하지 않습니다.</p>
<p>소스 및 대상 Milvus 버전은 지원되는 조합이어야 합니다. 대상 버전이 더 새롭다고 해서 호환성이 보장되는 것은 아닙니다. 다음의 레거시 호환성 표는 Milvus Backup 0.5.7부터 문서화된 Milvus 2.x를 다루며, 2.x에서 3.0으로의 마이그레이션 호환성을 보장하지는 않습니다.</p>
<table>
<thead>
<tr><th>백업 출처 ↓ / 복원 대상 →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>없음</td><td>아니요</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>Milvus v2.3.x</td><td>아니요</td><td>아니요</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>Milvus v2.4.x</td><td>아니요</td><td>아니요</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>Milvus v2.5.x</td><td>아니요</td><td>아니요</td><td>아니요</td><td>예</td><td>예</td></tr>
<tr><td>Milvus v2.6.x</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>예</td></tr>
</tbody>
</table>
<p>버전 간 마이그레이션을 수행하기 전에, <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">백업 릴리스 문서를</a> 참조하여 소스 버전, 대상 버전 및 백업 형식을 확인하십시오. 이 가이드들은 나열되지 않은 조합에 대해서는 기존 호환성 매트릭스를 확장하지 않습니다.</p>
<h2 id="Release-notes" class="common-anchor-header">릴리스 노트<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
