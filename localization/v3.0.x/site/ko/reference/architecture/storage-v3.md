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
<p>스토리지 V3는 기본적으로 비활성화되어 있습니다. ` <code translate="no">common.storage.useLoonFFI</code> `가 적용되면, 새로운 쓰기 작업과 압축 결과물은 스토리지 V3를 사용합니다. 기존 데이터는 백그라운드 압축을 통해 해당 데이터가 재작성될 때까지 현재 레이아웃에 그대로 유지됩니다. Milvus는 이 전환 기간 동안 두 레이아웃 모두를 읽을 수 있습니다. 스토리지 V3는 일반적인 성능 최적화를 위한 것이 아니라, 이에 의존하는 기능을 사용하기 위해 활성화해야 합니다.</p>
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
<tr><td><a href="/docs/ko/text.md"><code translate="no">TEXT</code> field</a></td><td>컬렉션 스키마에 고정된 최대 길이를 설정하지 않고도 구절, 문서, 티켓 또는 로그와 같은 긴 소스 텍스트를 저장합니다.</td><td><a href="/docs/ko/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ko/add-fields-to-an-existing-collection.md">함수로 생성된 벡터 필드</a></td><td>기존 컬렉션에 BM25 또는 MinHash 함수를 추가하여 Milvus가 기존 <code translate="no">VARCHAR</code> 필드에서 새로운 벡터 필드를 생성하도록 합니다. Milvus는 백그라운드 압축을 통해 기존 엔티티에 대해 생성된 값을 비동기적으로 백필합니다.</td><td><ul><li><a href="/docs/ko/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ko/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ko/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
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
<p>Milvus가 Storage V3에 데이터를 한 번 기록하면, Storage V3를 읽을 수 없는 Milvus 버전으로 다운그레이드하는 것은 지원되지 않습니다. 나중에 Storage V3를 비활성화하더라도 모든 기존 Storage V3 데이터가 즉시 변환되거나 이전 버전과의 호환성이 복원되지는 않습니다.</p>
</div>
<p>Storage V3를 활성화하기 전에 다음 데이터 동작을 고려하십시오.</p>
<ul>
<li><code translate="no">dataCoord.compaction.storageVersion.enabled</code> 가 기본적으로 활성화되어 있으므로, 해당 조건을 충족하는 기존 데이터는 백그라운드 압축을 통해 점진적으로 Storage V3로 전환될 수 있습니다.</li>
<li>Storage V3를 비활성화하면 향후 쓰기 작업 및 대상 압축 출력에 대한 대상 스토리지 버전이 변경됩니다. 이는 모든 기존 Storage V3 데이터를 동기식으로 변환하거나 버전 다운그레이드를 안전하게 수행할 수 있게 해주는 것은 아닙니다.</li>
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
<p>Milvus는 이 설정을 새로 고침 가능한 항목으로 처리합니다. 배포 환경에서 지원하는 구성 업데이트 워크플로를 통해 변경 사항을 적용하십시오. 정적 구성 파일을 편집하는 것만으로는 실행 중인 배포 환경이 새로운 값을 반영했음을 보장할 수 없습니다.</p>
<p>기존 컬렉션에 함수(Function)와 해당 함수가 생성한 벡터 필드를 추가할 계획이라면, 기존 데이터 백필에 필요한 다음 두 가지 압축 설정도 활성화해야 합니다:</p>
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
