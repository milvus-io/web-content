---
id: storage-v3.md
title: 스토리지 V3Compatible with Milvus 3.0.x
summary: >-
  Milvus 3.0의 어떤 기능에 Storage V3가 필요한지, 이를 활성화하는 방법, 그리고 적용되는 호환성 제한 사항이 무엇인지
  알아보세요.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">스토리지 V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>AI 데이터셋은 컬렉션이 생성된 후에도 종종 변화합니다. 모델과 워크플로가 변경됨에 따라, 팀은 텍스트를 추가하거나, 기존 엔티티에 대한 새로운 벡터 필드를 생성하거나, Milvus 외부에 저장된 데이터를 사용해야 할 수도 있습니다. 이러한 워크플로를 지원하려면 데이터셋과 함께 진화할 수 있는 스토리지 모델이 필요합니다.</p>
<p>스토리지 V3는 Milvus 3.0에서 이러한 모델을 제공합니다. 이 모델은 버전 관리형 스토리지 레이아웃을 사용하여 시간이 지남에 따라 추가되거나 재작성된 데이터를 통합하는 한편, 애플리케이션은 동일한 Milvus API를 통해 컬렉션에 계속 액세스할 수 있도록 합니다.</p>
<p>스토리지 V3는 기본적으로 비활성화되어 있습니다. ` <code translate="no">common.storage.useLoonFFI</code> `가 적용되면 새로운 쓰기 작업과 압축 결과물은 스토리지 V3를 사용합니다. 기존 데이터는 백그라운드 압축을 통해 해당 데이터가 재작성될 때까지 현재 레이아웃에 그대로 유지됩니다. Milvus는 이 전환 기간 동안 두 레이아웃 모두를 읽을 수 있습니다. 스토리지 V3는 일반적인 성능 최적화를 위한 것이 아니라, 이에 의존하는 기능을 사용하기 위해 활성화해야 합니다.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Storage V3의 데이터 형식<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3는 매니페스트를 사용하여 기본 데이터 형식과 독립적으로 컬렉션 데이터를 기술합니다. 이를 통해 동일한 스토리지 계층에서 Milvus가 관리하는 데이터와 외부 시스템에 남아 있는 데이터 모두를 처리할 수 있습니다.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">관리되는 컬렉션 파일 형식<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>관리되는 컬렉션의 경우, ` <code translate="no">dataNode.storage.format</code> `가 새로운 Storage V3 데이터의 파일 형식을 선택합니다. 이 설정은 다음 값을 지원합니다:</p>
<table>
<thead>
<tr><th>형식</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>기본값으로, 광범위한 생태계 호환성과 성숙한 툴링을 갖춘 널리 채택된 열 기반 파일 형식입니다. Parquet는 데이터를 행 그룹으로 구성하며 열별 인코딩 및 압축을 지원하므로, Milvus는 필요한 열만 읽을 수 있고 대용량 순차 스캔을 효율적으로 처리할 수 있습니다.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>확장 가능하고 조합 가능한 인코딩 및 풍부한 통계 기능을 기반으로 구축된 선택적 차세대 컬럼형 파일 형식입니다. Milvus에서 Vortex는 컬럼 투영, 범위 읽기 및 임의 접근 읽기를 지원합니다. 이러한 기능을 통해 적합한 워크로드의 경우 불필요한 데이터 읽기를 줄일 수 있습니다.</td></tr>
</tbody>
</table>
<p><code translate="no">dataNode.storage.format</code> 를 변경하면 Storage V3의 새로운 쓰기 작업에 영향을 미칩니다. 기존 파일은 압축(compaction) 과정에서 해당 세그먼트가 다시 쓰여질 때까지 현재 형식을 유지합니다. 대표적인 벤치마크를 통해 <code translate="no">vortex</code> 가 해당 데이터 및 액세스 패턴에 더 적합하다는 것이 입증되지 않는 한, 대부분의 배포 환경에서는 기본 <code translate="no">parquet</code> 형식을 유지해야 합니다.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">외부 컬렉션 및 지원되는 소스 형식<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>외부 컬렉션을 사용하면 Milvus가 외부 파일이나 테이블에 저장된 데이터를 활용할 수 있습니다. Storage V3는 다음의 외부 소스 형식을 지원합니다:</p>
<table>
<thead>
<tr><th>형식</th><th>범주</th><th>예상 소스</th><th>Storage V3 지원 여부</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>파일 형식</td><td>Parquet 파일이 포함된 디렉터리 또는 오브젝트 스토리지 접두사.</td><td>파일을 검색하고, 메타데이터와 행 그룹을 읽은 다음, 이를 Storage V3 매니페스트에 기록합니다.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>파일 형식</td><td>Vortex 파일이 포함된 디렉터리 또는 오브젝트 스토리지 접두사.</td><td>파일을 검색하고 Vortex 레이아웃 및 통계를 사용하여 투영, 범위 읽기 및 임의 액세스 읽기를 수행합니다.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>테이블 형식</td><td>Lance 데이터셋 디렉터리입니다.</td><td>데이터셋 메타데이터를 읽고 해당 조각을 Storage V3 매니페스트에 매핑합니다.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>테이블 형식</td><td>Iceberg 메타데이터 JSON 파일 및 스냅샷 ID.</td><td>지정된 스냅샷을 해결하고, 데이터 파일을 계획하며, 위치 삭제 메타데이터를 보존합니다. 동일성 삭제는 지원되지 않으며, 외부 컬렉션을 새로 고치기 전에 위치 삭제로 변환해야 합니다.</td></tr>
</tbody>
</table>
<p>외부 소스는 읽기 전용입니다. Storage V3는 소스 데이터를 수정하거나 복사하지 않고 자체 매니페스트를 생성하고 새로 고칩니다. 그러면 Milvus는 외부 컬렉션을 통해 데이터에 대한 인덱스를 구축하고 검색 및 쿼리를 실행할 수 있습니다.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">클라우드 스토리지 및 계정 간 인증</h4><p>다음 표는 외부 컬렉션이 다른 클라우드 계정에 저장된 소스 데이터에 액세스하는 방법만을 설명합니다. Milvus에서 관리하는 데이터에 사용되는 오브젝트 스토리지에 대해서는 설명하지 않습니다.</p>
<table>
<thead>
<tr><th>클라우드 스토리지</th><th>지원되는 외부 형식</th><th>외부 컬렉션을 위한 계정 간 인증</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>위에 나열된 네 가지 형식 모두.</td><td>고객 소유의 IAM 역할 ARN을 지정하십시오. Storage V3는 AWS STS <code translate="no">AssumeRole</code> 를 사용하여 임시 자격 증명을 획득하고 필요에 따라 이를 갱신합니다. 역할의 신뢰 정책에서 요구하는 경우 외부 ID를 제공할 수도 있습니다.</td></tr>
<tr><td>Google Cloud Storage(GCS)</td><td>위에 나열된 네 가지 형식 모두.</td><td>대상 서비스 계정을 지정하십시오. Storage V3는 해당 서비스 계정을 사칭하고, 해당 계정의 단기 OAuth 액세스 토큰을 사용하여 소스 버킷에 액세스하며, 토큰이 만료되기 전에 갱신합니다.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> 및 <code translate="no">lance-table</code>. <code translate="no">iceberg-table</code> 은 지원되지 않습니다.</td><td>Milvus는 <code translate="no">milvus-tools</code> 비공개 gRPC 서비스를 통해 단기 유효한 SAS 자격 증명을 요청합니다. Storage V3는 SAS 자격 증명을 사용하여 소스 컨테이너에 액세스하며, 자격 증명은 만료되기 전에 갱신됩니다.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>위에 나열된 네 가지 형식 모두.</td><td>Milvus는 <code translate="no">milvus-tools</code> 비공개 gRPC 서비스를 통해 단기 SAS 자격 증명을 요청합니다. Storage V3는 SAS 자격 증명을 사용하여 소스 컨테이너에 액세스하며, 자격 증명은 만료되기 전에 갱신됩니다.</td></tr>
<tr><td>알리바바 클라우드 오브젝트 스토리지 서비스(OSS)</td><td>위에 나열된 네 가지 형식 모두.</td><td>고객 소유의 RAM 역할 ARN을 지정하십시오. Storage V3는 런타임의 워크로드 ID 또는 ECS RAM 역할을 사용하여 해당 역할을 인수한 다음, 임시 자격 증명을 사용하여 소스 버킷에 액세스합니다.</td></tr>
</tbody>
</table>
<p>외부 컬렉션 구성 및 사용 방법에 대한 지침은 <a href="/docs/ko/create-an-external-collection.md">‘외부 컬렉션 생성’을</a> 참조하십시오.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Storage V3가 필요한 기능<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>기능</th><th>설명</th><th>필요한 구성</th></tr>
</thead>
<tbody>
<tr><td>Vortex 파일 형식</td><td>Vortex 파일 형식으로 새로운 관리형 컬렉션 데이터를 기록합니다.</td><td><ul><li><a href="/docs/ko/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/ko/text.md"><code translate="no">TEXT</code> 필드</a></td><td>컬렉션 스키마에 고정된 최대 길이를 설정하지 않고도 구절, 문서, 티켓 또는 로그와 같은 긴 소스 텍스트를 저장할 수 있습니다.</td><td><a href="/docs/ko/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ko/add-fields-to-an-existing-collection.md">함수로 생성된 벡터 필드</a></td><td>기존 컬렉션에 BM25 또는 MinHash 함수를 추가하면 Milvus가 기존 <code translate="no">VARCHAR</code> 필드에서 새로운 벡터 필드를 생성합니다. Milvus는 백그라운드 압축을 통해 기존 엔티티에 대해 생성된 값을 비동기적으로 백필합니다.</td><td><ul><li><a href="/docs/ko/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ko/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ko/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/ko/create-an-external-collection.md">외부 컬렉션</a></td><td>데이터를 관리되는 컬렉션으로 복사하지 않고 Milvus 외부에 저장된 데이터를 쿼리할 수 있습니다. 소스 데이터가 변경되면 외부 컬렉션을 새로 고칩니다. 추가 소스 필드를 노출하려면 <a href="/docs/ko/alter-external-collection-schema.md">‘외부 컬렉션 스키마 변경’을</a> 참조하십시오.</td><td><a href="/docs/ko/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Storage V3를 활성화하기 전에<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Milvus가 Storage V3에 데이터를 한 번 기록하면, Storage V3를 읽을 수 없는 Milvus 버전으로 다운그레이드하는 것은 지원되지 않습니다. 나중에 Storage V3를 비활성화하더라도 기존의 모든 Storage V3 데이터가 즉시 변환되거나 이전 버전과의 호환성이 복원되지는 않습니다.</p>
</div>
<p>Storage V3를 활성화하기 전에 다음 데이터 동작을 고려하십시오.</p>
<ul>
<li><code translate="no">dataCoord.compaction.storageVersion.enabled</code> 가 기본적으로 활성화되어 있으므로, 해당 조건을 충족하는 기존 데이터는 백그라운드 압축을 통해 점진적으로 Storage V3로 전환될 수 있습니다.</li>
<li>Storage V3를 비활성화하면 향후 쓰기 작업 및 대상 압축 출력에 대한 대상 스토리지 버전이 변경됩니다. 이는 모든 기존 Storage V3 데이터를 동기식으로 변환하거나 버전 다운그레이드를 안전하게 수행하도록 보장하지는 않습니다.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Storage V3 활성화<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 구성에서 ` <code translate="no">common.storage.useLoonFFI</code> `를 ` <code translate="no">true</code> `로 설정하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 이 설정을 새로 고침 가능한 항목으로 처리합니다. 배포 환경에서 지원하는 구성 업데이트 워크플로를 통해 변경 사항을 적용하십시오. 정적 구성 파일을 편집하는 것만으로는 실행 중인 배포 환경에 새로운 값이 반영되었다고 보장할 수 없습니다.</p>
<p>기존 컬렉션에 함수(Function)와 해당 함수가 생성한 벡터 필드를 추가할 계획이라면, 기존 데이터 백필에 필요한 다음 두 가지 압축 설정도 활성화하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>기존 엔티티에 대한 함수 출력은 백그라운드 압축을 통해 비동기적으로 생성됩니다. 스키마 업데이트가 성공적으로 완료되었다고 해서 모든 기존 엔티티에 대한 백필이 완료된 것은 아닙니다.</p>
<h2 id="Related-documentation" class="common-anchor-header">관련 문서<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/ko/text.md">텍스트 필드</a></li>
<li><a href="/docs/ko/add-fields-to-an-existing-collection.md">컬렉션 스키마 변경</a></li>
<li><a href="/docs/ko/create-an-external-collection.md">외부 컬렉션 생성</a></li>
<li><a href="/docs/ko/install-overview.md">Milvus 배포 옵션 개요</a></li>
<li><a href="/docs/ko/upgrade_milvus_standalone-helm.md">Helm 차트를 사용하여 Milvus Standalone 업그레이드</a></li>
<li><a href="/docs/ko/upgrade_milvus_cluster-helm.md">Helm 차트를 사용하여 Milvus 클러스터 업그레이드</a></li>
<li><a href="/docs/ko/configure_common.md">일반 관련 구성</a></li>
<li><a href="/docs/ko/configure_datacoord.md">dataCoord 관련 구성</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Loon을 개발한 이유: 끊임없이 변화하는 AI 데이터를 위한 스토리지 엔진</a> — Storage V3 설계 동기에 대한 엔지니어링 배경.</li>
</ul>
