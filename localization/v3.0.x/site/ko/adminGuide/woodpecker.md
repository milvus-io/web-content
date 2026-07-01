---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: >-
  Milvus에서 Woodpecker가 기본 메시지 큐(WAL)로 어떻게 작동하는지, 그리고 임베디드 모드나 서비스 모드에서 이를 실행하는
  방법을 알아보세요.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Woodpecker는 Milvus 3.x의 <strong>기본 메시지 큐(사전 기록 로그, WAL)</strong> 입니다. 오브젝트 스토리지를 위해 설계된 클라우드 네이티브 WAL로, 높은 처리량, 낮은 운영 오버헤드, 원활한 확장성을 제공합니다. 아키텍처 및 벤치마크에 대한 자세한 내용은 <a href="/docs/ko/woodpecker_architecture.md">Woodpecker를</a> 참조하십시오.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
<li>Milvus 3.x에서 Woodpecker는 <strong>기본</strong> WAL/메시지 큐로, 로깅 서비스로서 순차적 쓰기 및 복구 기능을 제공합니다. Pulsar나 Kafka와 같은 외부 메시지 큐 서비스는 필요하지 않습니다.</li>
<li>Woodpecker는 Milvus/스트리밍 노드에 <strong>내장된</strong> 형태로(기본값) 실행되거나, 자체 포드를 갖춘 <strong>전용 서비스로</strong> (분산/클러스터 전용) 실행될 수 있습니다.</li>
<li>다음 세 가지 데이터 저장소( <code translate="no">storage.type</code> ) 모드를 지원합니다: 오브젝트 스토리지(<code translate="no">minio</code>, 기본값), 로컬 파일 시스템(<code translate="no">local</code>), 전용 <code translate="no">service</code>. <a href="#Deployment-modes">‘배포 모드’를</a> 참조하십시오.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">빠른 시작<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker를 활성화하려면 MQ 유형을 Woodpecker로 설정하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>참고: 실행 중인 클러스터에서 <code translate="no">mq.type</code> 를 전환하는 것은 업그레이드 작업입니다. 업그레이드 절차를 주의 깊게 따르고, 프로덕션 환경으로 전환하기 전에 새 클러스터에서 검증하십시오.</p>
<h2 id="Configuration" class="common-anchor-header">구성<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 Woodpecker의 전체 구성 블록입니다( <code translate="no">milvus.yaml</code> 파일을 편집하거나 <code translate="no">user.yaml</code> 에서 재정의하십시오):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">meta:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span> <span class="hljs-comment"># The Type of the metadata provider. currently only support etcd.</span>
    <span class="hljs-attr">prefix:</span> <span class="hljs-string">woodpecker</span> <span class="hljs-comment"># The Prefix of the metadata provider. default is woodpecker.</span>
  <span class="hljs-attr">client:</span>
    <span class="hljs-attr">segmentAppend:</span>
      <span class="hljs-attr">queueSize:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># The size of the queue for pending messages to be sent of each log.</span>
      <span class="hljs-attr">maxRetries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># Maximum number of retries for segment append operations.</span>
    <span class="hljs-attr">segmentRollingPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of a segment.</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10m</span> <span class="hljs-comment"># Maximum interval between two segments, default is 10 minutes.</span>
      <span class="hljs-attr">maxBlocks:</span> <span class="hljs-number">1000</span> <span class="hljs-comment"># Maximum number of blocks in a segment</span>
    <span class="hljs-attr">auditor:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10s</span> <span class="hljs-comment"># Maximum interval between two auditing operations, default is 10 seconds.</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">200ms</span> <span class="hljs-comment"># Maximum interval between two sync operations, default is 200 milliseconds.</span>
      <span class="hljs-attr">maxIntervalForLocalStorage:</span> <span class="hljs-string">10ms</span> <span class="hljs-comment"># Maximum interval between two sync operations local storage backend, default is 10 milliseconds.</span>
      <span class="hljs-attr">maxBytes:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">maxEntries:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># Maximum entries number of write buffer.</span>
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum number of flush retries.</span>
      <span class="hljs-attr">retryInterval:</span> <span class="hljs-string">1000ms</span> <span class="hljs-comment"># Maximum interval between two retries. default is 1000 milliseconds.</span>
      <span class="hljs-attr">maxFlushSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># Maximum size of a fragment in bytes to flush.</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to flush data</span>
    <span class="hljs-attr">segmentCompactionPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># The maximum size of the merged files.</span>
      <span class="hljs-attr">maxParallelUploads:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># The maximum number of parallel upload threads for compaction.</span>
      <span class="hljs-attr">maxParallelReads:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># The maximum number of parallel read threads for compaction.</span>
    <span class="hljs-attr">segmentReadPolicy:</span>
      <span class="hljs-attr">maxBatchSize:</span> <span class="hljs-string">16M</span> <span class="hljs-comment"># Maximum size of a batch in bytes.</span>
      <span class="hljs-attr">maxFetchThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to fetch data.</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span> <span class="hljs-comment"># The Type of the storage provider. Valid values: [minio, local]</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">/var/lib/milvus/woodpecker</span> <span class="hljs-comment"># The root path of the storage provider.</span>
<button class="copy-code-btn"></button></code></pre>
<p>주요 사항:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>: 현재 <code translate="no">etcd</code> 만 지원됩니다. 경량 메타데이터를 저장하기 위해 Milvus와 동일한 etcd를 재사용하십시오.</li>
<li><strong>prefix</strong>: 메타데이터의 키 접두사입니다. 기본값: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>클라이언트 측에서 세그먼트 추가/롤링/감사 동작을 제어하여 처리량과 종단 간 지연 시간의 균형을 맞춥니다.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>로그 세그먼트에 대한 동기화/플러시/압축/읽기 정책을 제어합니다. 이는 처리량 및 지연 시간 조정을 위한 주요 설정 항목입니다.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>: MinIO/S3 호환 오브젝트 스토리지(MinIO/S3/GCS/OSS 등)의 경우 <code translate="no">minio</code>; 로컬/공유 파일 시스템의 경우 <code translate="no">local</code>.</li>
<li><strong>rootPath</strong>: 스토리지 백엔드의 루트 경로( <code translate="no">local</code> 의 경우 유효함; <code translate="no">minio</code> 의 경우 경로는 버킷/접두사에 의해 결정됨).</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">배포 모드<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker는 세 가지 <code translate="no">storage.type</code> 모드를 지원합니다:</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>Woodpecker의 작동 방식</th><th>WAL 백엔드</th><th>Milvus 독립형</th><th>Milvus 분산(클러스터)</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> (기본값)</td><td>Milvus/스트리밍 노드에 내장</td><td>오브젝트 스토리지 (MinIO/S3 호환)</td><td>지원됨</td><td>지원됨</td></tr>
<tr><td><code translate="no">local</code></td><td>Milvus/스트리밍 노드에 내장됨</td><td>로컬 파일 시스템</td><td>지원됨</td><td>제한적 (모든 노드에 공유 파일 시스템(예: NFS) 필요)</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>전용 Woodpecker 서비스</strong> (자체 포드)</td><td>오브젝트 스토리지(MinIO/S3 호환)</td><td><strong>지원되지 않음</strong></td><td>지원됨</td></tr>
</tbody>
</table>
<p>참고:</p>
<ul>
<li><code translate="no">minio</code> 의 경우, Woodpecker는 Milvus와 동일한 오브젝트 스토리지(MinIO/S3/GCS/OSS 등)를 공유합니다.</li>
<li><code translate="no">local</code> 의 경우, 단일 노드 로컬 디스크는 Standalone 모드에서만 사용할 수 있습니다. 모든 파드가 공유 파일 시스템(예: NFS)에 액세스할 수 있는 경우, Cluster 모드에서도 <code translate="no">local</code> 를 사용할 수 있습니다.</li>
<li><strong><code translate="no">service</code> 이 모드는 Woodpecker를 별도로 독립적으로 확장 가능한 서비스로 실행하며, 분산/클러스터 배포에서만 사용할 수 있습니다.</strong> 독립형 배포는 내장 모드(<code translate="no">minio</code> 또는 <code translate="no">local</code>)를 사용합니다.</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">다음에 대한 오브젝트 스토리지 호환성 <code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표는 Woodpecker가 <code translate="no">storage.type=minio</code> 로 구성되었을 때 오브젝트 스토리지 백엔드의 현재 알려진 호환성을 요약한 것입니다. 이 정보는 <a href="https://github.com/zilliztech/woodpecker/discussions/150">GitHub 토론 #150을</a> 기반으로 합니다.</p>
<table>
<thead>
<tr><th>프로바이더/서비스</th><th>상태</th><th>비고</th></tr>
</thead>
<tbody>
<tr><td>Azure Blob Storage</td><td>지원됨</td><td>네이티브 Azure SDK를 사용합니다.</td></tr>
<tr><td>AWS S3</td><td>지원됨</td><td>조건부 쓰기(Conditional Write)를 완벽하게 지원하는 네이티브 S3.</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>지원됨</td><td>S3 조건부 쓰기 기능을 완벽하게 지원합니다.</td></tr>
<tr><td>Aliyun OSS</td><td>지원</td><td>S3 호환 인터페이스를 통해 지원됩니다.</td></tr>
<tr><td>Tencent COS</td><td>지원됨</td><td>S3 호환 인터페이스를 통해 지원됩니다.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>지원됨</td><td>S3 상호 운용성 모드를 통해 지원됩니다.</td></tr>
<tr><td>Huawei Cloud OBS</td><td>지원되지 않음</td><td>필요한 조건부 쓰기(Conditional Write) 기능이 없습니다.</td></tr>
<tr><td>VAST Data</td><td>지원됨</td><td>커뮤니티에서 검증됨; 버전 관리되지 않는 버킷에서만 작동합니다.</td></tr>
<tr><td>기타 S3 호환 스토리지</td><td>부분 지원</td><td>S3 조건부 쓰기(Conditional Write) 세미언틱에 대한 완전한 지원 여부에 따라 다릅니다.</td></tr>
</tbody>
</table>
<p>참고:</p>
<ul>
<li>호환성은 네이티브 SDK 지원 또는 S3 조건부 쓰기(Conditional Write) 세미언틱 지원 여부에 따라 달라집니다.</li>
<li>Woodpecker용 MinIO를 자체 호스팅하는 경우, <code translate="no">RELEASE.2024-12-18T13-15-44Z</code> 이상 버전을 사용하십시오.</li>
<li>이 매트릭스는 <a href="https://github.com/zilliztech/woodpecker/discussions/150">현재 논의 내용을</a> 반영한 것이며, 백엔드 지원이 추가로 검증됨에 따라 변경될 수 있습니다.</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">배포 가이드<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">Kubernetes상의 Milvus 클러스터에서 Woodpecker 활성화 (Milvus Operator, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/install_cluster-milvusoperator.md">Milvus Operator를</a> 설치한 후, 공식 샘플을 사용하여 Woodpecker가 활성화된 Milvus 클러스터를 시작합니다.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>이 샘플은 Woodpecker를 메시지 큐로 구성하고 스트리밍 노드를 활성화합니다. 첫 실행 시 이미지 가져오기에 시간이 걸릴 수 있으므로, 모든 파드가 준비될 때까지 기다리십시오:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>준비가 완료되면 다음과 유사한 파드가 표시됩니다:</p>
<pre><code translate="no">NAME                                               READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-7</span>f8f88499d<span class="hljs-operator">-</span>kc66r        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>cd7998d<span class="hljs-operator">-</span>x59kg          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-5</span>b56cf8446<span class="hljs-operator">-</span>pbnjm           <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-0</span><span class="hljs-number">-558</span>d9cdd57<span class="hljs-operator">-</span>sgbfx     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-58</span>fbfdfdd8<span class="hljs-operator">-</span>vtxfd   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
<button class="copy-code-btn"></button></code></pre>
<p>다음 명령어를 실행하여 Milvus 클러스터를 제거하십시오.</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>Woodpecker 매개변수를 조정해야 하는 경우, <a href="#Configuration">‘구성’</a> 섹션에 설명된 설정을 따르십시오.</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">Kubernetes에서 Milvus 클러스터에 Woodpecker 활성화하기 (Helm 차트, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>먼저 <a href="/docs/ko/install_cluster-helm.md">‘Helm을 사용하여 Kubernetes에서 Milvus</a> 실행’에 설명된 대로 Milvus Helm 차트를 추가하고 업데이트하십시오.</p>
<p>그런 다음 다음 예시 중 하나를 사용하여 배포하십시오:</p>
<p>– 클러스터 배포 (Woodpecker 및 스트리밍 노드 활성화 권장 설정):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– 독립형 배포 (Woodpecker 활성화):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>배포가 완료되면 문서를 참고하여 포트 포워딩을 설정하고 연결하십시오. Woodpecker 매개변수를 조정하려면 <a href="#Configuration">‘구성’</a> 섹션에 설명된 설정을 따르십시오.</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">Docker에서 Milvus 독립형(storage=local)용 Woodpecker 활성화<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 3.x에서 Docker 독립형 배포는 <strong>기본적으로</strong> <strong>로컬 파일 시스템을</strong> WAL 백엔드로 사용하는 Woodpecker를 활용하므로 별도의 구성이 필요하지 않습니다. <a href="/docs/ko/install_standalone-docker.md">‘Docker에서 Milvus 실행’을</a> 따르십시오:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Woodpecker를 조정하려면, 첫 실행 후 생성된 ` <code translate="no">user.yaml</code> ` 파일을 편집하고 ` <code translate="no">bash standalone_embed.sh restart</code> `를 실행하여 변경 사항을 적용하십시오(` <code translate="no">start</code> `를 새로 실행하면 ` <code translate="no">user.yaml</code>` 파일이 재생성되므로, ` <code translate="no">restart</code>`를 사용하여 변경 사항을 적용하십시오):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">Docker Compose를 사용하여 Milvus Standalone에서 Woodpecker 활성화하기 (storage=minio)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/install_standalone-docker-compose.md">'Docker Compose를 사용하여 Milvus 실행하기'를</a> 따르세요. 예시:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
<span class="hljs-comment"># By default, the Docker Compose standalone uses Woodpecker</span>
<span class="hljs-built_in">sudo</span> docker compose up -d
<span class="hljs-comment"># If you need to change Woodpecker parameters further, write an override:</span>
docker <span class="hljs-built_in">exec</span> -it milvus-standalone bash -lc <span class="hljs-string">&#x27;cat &gt; /milvus/configs/user.yaml &lt;&lt;EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF&#x27;</span>

<span class="hljs-comment"># Restart the container to apply the changes</span>
docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">Milvus 클러스터(Helm)에서 Woodpecker 서비스 모드 활성화<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker <strong>서비스 모드는</strong> <strong>Milvus 3.0의</strong> 기능입니다. 분산/클러스터 배포의 경우, ` <code translate="no">streaming.woodpecker.embedded=false</code>`를 설정하여 Woodpecker를 스트리밍 노드에 내장하는 대신 <strong>전용 서비스</strong> (별도의 파드)로 실행할 수 있습니다:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.33 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>이렇게 하면 Woodpecker가 전용 StatefulSet(<code translate="no">my-release-milvus-woodpecker</code>, 기본적으로 4개의 복제본)으로 배포되며, 헤드리스 서비스가 전면에 배치되고, 포트 <code translate="no">18080</code> (서비스), <code translate="no">17946</code> (가십), <code translate="no">9091</code> (메트릭)에서 가십 클러스터링을 수행하며, MinIO를 스토리지 백엔드로 사용합니다. 이 서비스는 <strong>3노드의</strong> 쿼럼이 필요합니다. 기본값인 <strong>4개의</strong> 복제본은 단일 노드 장애를 허용하면서도 쿼럼을 유지하므로, ` <code translate="no">woodpecker.replicaCount</code> `을 3보다 작게 설정하지 마십시오. 그러면 클러스터에는 별도의 ` <code translate="no">woodpecker</code> ` 파드 세트가 포함됩니다:</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Woodpecker의 <code translate="no">service</code> 모드는 <strong>분산/클러스터</strong> 배포 전용입니다. 독립형 배포의 경우 Woodpecker가 내장된 형태로 실행됩니다(<code translate="no">minio</code> 또는 <code translate="no">local</code>). Milvus Operator는 아직 Woodpecker 서비스 모드를 지원하지 않습니다.</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">처리량 튜닝 팁<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker의 처리량 및 지연 시간 프로필은 <strong>임베디드</strong> 모드와 <strong>서비스</strong> 모드(Milvus 3.0의 기능)에 따라 다릅니다. 아래 지침은 모드별로 정리되어 있습니다.</p>
<h3 id="Embedded-mode" class="common-anchor-header">임베디드 모드<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/woodpecker_architecture.md">Woodpecker의</a> 벤치마크 및 백엔드 제한 사항을 바탕으로, 다음 측면에서 엔드투엔드 쓰기 처리량을 최적화하십시오:</p>
<ul>
<li>스토리지 측면
<ul>
<li><strong>오브젝트 스토리지(MinIO/S3 호환)</strong>: 동시 처리량과 오브젝트 크기를 늘리십시오(매우 작은 오브젝트는 피하십시오). 네트워크 및 버킷 대역폭 제한을 주의 깊게 확인하십시오. SSD에 구축된 단일 MinIO 노드는 로컬에서 대개 100 MB/s 정도로 제한되는 반면, 단일 EC2에서 S3로의 전송은 GB/s 수준에 도달할 수 있습니다.</li>
<li><strong>로컬/공유 파일 시스템(로컬)</strong>: NVMe 또는 고속 디스크를 우선적으로 사용하십시오. 파일 시스템이 소량 쓰기 작업과 fsync 지연 시간을 잘 처리할 수 있도록 하십시오.</li>
</ul></li>
<li>Woodpecker 조정 매개변수
<ul>
<li><code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> 및 <code translate="no">maxFlushThreads</code> 값을 높여 더 큰 플러시 크기와 더 높은 병렬 처리를 구현하십시오.</li>
<li>매체 특성에 따라 <code translate="no">maxInterval</code> 을 조정하십시오(집계 기간을 늘려 처리량을 확보하는 대신 지연 시간을 감수).</li>
<li>오브젝트 스토리지의 경우, 세그먼트 전환을 줄이기 위해 <code translate="no">segmentRollingPolicy.maxSize</code> 값을 늘리는 것을 고려하십시오.</li>
</ul></li>
<li>클라이언트/애플리케이션 측
<ul>
<li>더 큰 배치 크기를 사용하고 더 많은 동시 쓰기 작업자/클라이언트를 활용하십시오.</li>
<li>빈번한 소량 쓰기를 방지하기 위해 새로 고침/인덱스 구축 타이밍(트리거링 전 배치)을 제어하십시오.</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">서비스 모드(Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>서비스 모드는 오브젝트 스토리지를 기반으로 하는 WAL의 높은 쓰기 처리량을 유지하면서 낮은 지연 시간을 제공합니다( <a href="#Latency">지연 시간</a> 참조). 위의 스토리지 측 및 클라이언트 측 튜닝은 여전히 적용되며, 또한 Woodpecker는 자체 서비스로 실행되므로 레플리카(<code translate="no">woodpecker.replicaCount</code>, 기본값 4)를 추가하여 쓰기 용량을 수평적으로 확장할 수 있고, 쓰기 작업은 1-RTT 쿼럼 복제 및 브로커 전달을 피하는 토폴로지 인식 읽기의 이점을 누릴 수 있습니다.</p>
<p><strong>일괄 삽입 데모</strong> — 다음을 사용하여 쓰기 처리량을 측정하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:19530&quot;</span>,
)

<span class="hljs-comment"># 2. Create a collection</span>
res = client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    shards_num=<span class="hljs-number">2</span>,
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># 3. Insert randomly generated vectors</span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

batch_size = <span class="hljs-number">1000</span>
batch_count = <span class="hljs-number">2000</span>
<span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_count):
    start_time = time.time()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserting <span class="hljs-subst">{j}</span>th vectors <span class="hljs-subst">{j * batch_size}</span> startTime<span class="hljs-subst">{start_time}</span>&quot;</span>)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size):
        current_color = random.choice(colors)
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: (j*batch_size + i),
            <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">512</span>) ],
            <span class="hljs-string">&quot;color&quot;</span>: current_color,
            <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
        })
    res = client.insert(
        collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
        data=data
    )
    data = []
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{j}</span>th vectors endTime:<span class="hljs-subst">{time.time()}</span> costTime:<span class="hljs-subst">{time.time() - start_time}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Latency" class="common-anchor-header">지연 시간<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">임베디드 모드<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker는 처리량, 비용, 지연 시간 간의 절충점을 고려하여 오브젝트 스토리지를 위해 설계된 클라우드 네이티브 WAL입니다. 경량 임베디드 모드는 비용 및 처리량 최적화를 우선시하는데, 이는 대부분의 시나리오에서 개별 쓰기 요청에 대한 낮은 지연 시간을 요구하기보다는 특정 시간 내에 데이터가 기록되기만 하면 되기 때문입니다. 따라서 Woodpecker는 일괄 쓰기를 채택하며, 로컬 파일 시스템 스토리지 백엔드의 경우 기본 간격은 10ms이고, MinIO와 유사한 스토리지 백엔드의 경우 200ms입니다. 쓰기 작업 속도가 느릴 때 최대 지연 시간은 간격 시간에 플러시 시간을 더한 값과 같습니다.</p>
<p>배치 삽입은 시간 간격뿐만 아니라 배치 크기(기본값 2MB)에 의해서도 트리거된다는 점에 유의하십시오.</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">서비스 모드 (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>서비스 모드는 비용을 낮게 유지하면서도 <strong>밀리초 수준의 쓰기 지연 시간을</strong> 제공합니다(이는 기존의 3개 복제본을 사용하는 로컬 디스크 WAL과 비슷한 수준입니다). 일반적인 3개 복제본, AZ 간 배포 환경에서 쓰기 지연 시간은 밀리초 범위를 유지합니다. 이는 다음을 통해 달성됩니다:</p>
<ul>
<li><strong>단일 RTT 쿼럼 쓰기</strong> — 클라이언트 주도형 복제는 단일 왕복(RTT) 내에 쿼럼 쓰기를 완료하며, AZ 간 트래픽은 2개의 복제본에 해당하는 데이터량으로 고정됩니다(브로커/리더 기반 복제에서 일반적으로 발생하는 추가적인 약 1/3의 AZ 간 트래픽과 대비).</li>
<li><strong>토폴로지를 고려한 단일 홉 읽기</strong> — 각 읽기 요청은 브로커를 통해 전달되는 대신 가장 가까운 복제본으로 직접 전송되므로, 브로커 기반 시스템에서 발생하는 무작위 AZ 간 읽기(AZ 간 읽기 트래픽의 약 2/3)를 피할 수 있습니다.</li>
<li><strong>세그먼트 롤링 후 즉시 오브젝트 스토리지 업로드</strong> — 각 세그먼트는 전체 수명 주기를 추적하며, 롤링되는 즉시 오브젝트 스토리지에 업로드되어 지연 시간을 희생하지 않으면서 로컬 디스크 사용량과 스토리지 비용을 낮게 유지합니다.</li>
<li><strong>지속적인 노드 간 복제 없음</strong> — 로그가 공유 스토리지 역할을 하는 오브젝트 스토리지에 영구 저장되므로, 장애 조치 시 생존한 복제본만 재업로드되며(전체 노드 복사 없음), 확장성이 노드 간 복제 대역폭에 제한받지 않고, 대규모 노드 교체 시에도 복제 폭주가 발생하지 않습니다.</li>
</ul>
<p>AZ 간 배포 환경에서 서비스 모드는 브로커 기반 로그 시스템에 비해 AZ 간 <strong>쓰기 트래픽의</strong> 약 <strong>1/3</strong>, <strong>읽기 트래픽의 약 2/3를</strong> 절감합니다. 전체 설계 및 비용 분석에 대해서는 <a href="/docs/ko/woodpecker_architecture.md">Woodpecker 아키텍처를</a> 참조하십시오.</p>
<p>아키텍처, 배포 모드(MemoryBuffer / QuorumBuffer) 및 성능에 대한 자세한 내용은 <a href="/docs/ko/woodpecker_architecture.md">Woodpecker 아키텍처를</a> 참조하십시오.</p>
<p>매개변수에 대한 자세한 내용은 Woodpecker <a href="https://github.com/zilliztech/woodpecker">GitHub 저장소를</a> 참조하십시오.</p>
