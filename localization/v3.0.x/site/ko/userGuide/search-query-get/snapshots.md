---
id: snapshots.md
title: 스냅샷Compatible with Milvus 3.0.x
summary: '스냅샷을 사용하여 롤백, 버전 관리 및 테스트를 위해 특정 시점의 수집 상태를 캡처하세요.'
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">스냅샷<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>스냅샷은 빠른 롤백, 버전 관리 및 테스트에 이상적인 Milvus 컬렉션의 특정 시점 이미지입니다. 특정 타임스탬프에서 컬렉션의 상태를 캡처하고 효율적인 저장 및 복원을 위해 스키마, 인덱스, 벡터 데이터 파일(빈로그) 등의 메타데이터와 매니페스트 파일만 저장합니다.</p>
<div class="alert note">
<p>스냅샷은 데이터의 빠른 특정 시점 이미지로, 빠른 롤백이나 테스트<strong>(며칠에서 몇 주)</strong>에 적합합니다. 동시에 백업은 장기적인 재해 복구<strong>(몇 주에서 몇 년)</strong>와 전체 스토리지 장애에 대한 더 나은 보호를 위해 별도로 저장된 독립적이고 완전한 사본입니다.</p>
<p>백업을 만들려면 <a href="/docs/ko/milvus_backup_overview.md">Milvus 백업을</a> 참조하세요.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">스냅샷 구조<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 실제 벡터 데이터를 복제하지 않고 데이터를 효율적으로 특정 시점에 캡처, 저장, 복원할 수 있도록 매니페스트 기반 스냅샷 아키텍처를 구현합니다. 이 아키텍처는 메타데이터 관리와 물리적 데이터 스토리지를 분리하여 오브젝트 스토리지의 기존 세그먼트 파일을 참조하는 경량 스냅샷을 가능하게 합니다.</p>
<p>컬렉션에 대한 스냅샷을 만들 때 Milvus는 다음을 수집합니다:</p>
<ul>
<li><p><strong>스냅샷 메타데이터</strong></p>
<p>스냅샷 이름 및 설명, 대상 컬렉션 ID, 스냅샷이 생성되는 시점 등 스냅샷 생성을 위한 기본 정보를 제공합니다.</p></li>
<li><p><strong>컬렉션 설명</strong></p>
<p>스키마 정의, 파티션 정보, 속성 등 대상 컬렉션에 대한 설명이 포함되어 있습니다.</p></li>
<li><p><strong>인덱스 정보</strong></p>
<p>인덱스 메타데이터와 인덱스 파일의 경로를 저장합니다.</p></li>
<li><p><strong>세그먼트 데이터</strong></p>
<p>벡터 데이터 파일(빈로그), 삭제 로그(델타로그), 인덱스 파일을 캡처합니다.</p></li>
</ul>
<p>위의 정보 중 각 세그먼트에 대한 Apache Avro 매니페스트 파일을 생성하고 스냅샷 메타데이터, 수집 설명, 인덱스 정보, 매니페스트 파일의 경로를 JSON 파일에 저장합니다. 다음 다이어그램은 스냅샷 폴더 구조를 보여줍니다.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>스냅샷을 만드는 데는 보통 밀리초가 걸리며, 복원하는 데는 데이터 볼륨에 따라 몇 초에서 몇 분이 걸립니다.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">스토리지 영향 및 고려 사항<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 스냅샷에서 세그먼트 또는 인덱스 파일을 참조하면 스냅샷을 삭제하지 않는 한 해당 파일을 가비지 수집하지 않습니다. 스냅샷은 대상 컬렉션의 크기에 비례하여 스토리지를 소비하며, 개체 스토리지 비용은 스냅샷 보존에 적용됩니다. 극단적인 경우에는 단일 스냅샷으로 인해 개체 스토리지 비용이 두 배가 될 수도 있습니다. 다음 사항을 따르는 것이 좋습니다.</p>
<ul>
<li>오래된 스냅샷을 정기적으로 제거하여 저장 공간을 절약하세요.</li>
<li>나중에 참조할 수 있도록 설명이 포함된 이름과 설명을 사용하세요.</li>
<li>항상 스냅샷 생성 및 복원 결과를 확인합니다.</li>
<li>모니터링 및 문제 해결을 위해 스냅샷 생성 타임스탬프, 스토리지 사용량, 복원 작업 ID를 추적하세요.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">제한 및 제한 사항<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>스냅샷은 생성 후에는 변경할 수 없습니다.</li>
<li>스냅샷은 원본과 동일한 클러스터 내의 새 컬렉션으로만 복원할 수 있습니다.</li>
<li>복원된 컬렉션은 동일한 스키마, 샤드 수, 파티션 수를 유지합니다.</li>
<li>복원된 기록 데이터는 TTL 정책과 충돌할 수 있습니다. 스냅샷을 만들기 전에 TTL을 비활성화하거나 TTL 설정을 조정하는 것이 좋습니다.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">더 읽어보기<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li>스냅샷<a href="/docs/ko/manage-snapshots.md">관리</a> - 스냅샷 만들기, 목록 만들기, 복원하기, 삭제하기.</li>
<li><a href="/docs/ko/snapshot-use-cases.md">스냅샷 사용 사례</a> - 일반적인 패턴 및 워크플로우.</li>
<li><a href="/docs/ko/milvus_backup_overview.md">Milvus 백업</a> - 클러스터 전반에 걸친 장기 백업 및 복원.</li>
</ul>
