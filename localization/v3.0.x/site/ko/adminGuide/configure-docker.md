---
id: configure-docker.md
label: Docker Compose
related_key: configure
summary: Docker Compose를 사용하여 Milvus를 구성합니다.
title: Docker Compose를 사용하여 Milvus 구성하기
---
<h1 id="Configure-Milvus-with-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 Milvus 구성하기<button data-href="#Configure-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Docker Compose를 사용하여 Milvus 구성 요소 및 타사 종속성을 구성하는 방법을 설명합니다.</p>
<div class="alert note">
일부 매개변수는 Milvus가 실행 중인 상태에서도 변경할 수 있습니다. 자세한 내용은 <a href="/docs/ko/dynamic_config.md">‘실행 중 Milvus 구성’을</a> 참조하십시오. 다른 매개변수에 변경 사항을 적용하려면 Milvus를 다시 시작하십시오.
</div>
<h2 id="Download-a-configuration-file" class="common-anchor-header">구성 파일 다운로드<button data-href="#Download-a-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus.yaml</code> 를 직접 다운로드하거나 다음 명령어를 사용하여<a href="https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml">다운로드하십시오</a>.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-configuration-file" class="common-anchor-header">구성 파일 수정<button data-href="#Modify-the-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">user.yaml</code> 파일에서 애플리케이션 시나리오에 맞게 Milvus 인스턴스를 구성하십시오. 변경하려는 매개변수만 추가하고, 다운로드한 <code translate="no">milvus.yaml</code> 파일을 참조하여 매개변수 이름과 기본값을 확인하십시오. Milvus는 <code translate="no">milvus.yaml</code> 다음으로 <code translate="no">user.yaml</code> 를 읽으므로, <code translate="no">user.yaml</code> 에 있는 값이 기본값보다 우선 적용됩니다. 다음 예제는 로그 수준을 변경하는 것입니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">log:</span>
  <span class="hljs-attr">level:</span> <span class="hljs-string">warn</span>
<button class="copy-code-btn"></button></code></pre>
<p>각 매개변수에 대한 자세한 내용은 다음 링크를 참조하십시오.</p>
<p>정렬 기준:</p>
<div class="filter">
구성<a href="#component">요소 또는 종속성</a> <a href="#purpose">구성 목적</a> 
</div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>의존성</th>
    <th>구성 요소</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/ko/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/ko/configure_minio.md">MinIO 또는 S3</a></li>
            <li><a href="/docs/ko/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/ko/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/ko/configure_rootcoord.md">루트 코디네이터</a></li>
            <li><a href="/docs/ko/configure_proxy.md">프록시</a></li>
            <li><a href="/docs/ko/configure_querycoord.md">쿼리 코디네이터</a></li>
            <li><a href="/docs/ko/configure_querynode.md">쿼리 노드</a></li>
            <li><a href="/docs/ko/configure_indexnode.md">인덱스 노드 (레거시)</a></li>
            <li><a href="/docs/ko/configure_datacoord.md">데이터 좌표</a></li>
            <li><a href="/docs/ko/configure_datanode.md">데이터 노드</a></li>
            <li><a href="/docs/ko/configure_localstorage.md">로컬 스토리지</a></li>
            <li><a href="/docs/ko/configure_log.md">로그</a></li>
            <li><a href="/docs/ko/configure_msgchannel.md">메시지 채널</a></li>
            <li><a href="/docs/ko/configure_common.md">공통</a></li>
            <li><a href="/docs/ko/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/ko/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/ko/configure_indexcoord.md">인덱스 좌표 (레거시)</a></li>
            <li><a href="/docs/ko/configure_metastore.md">메타스토어</a></li>
            <li><a href="/docs/ko/configure_mq.md">메시지 큐</a></li>
            <li><a href="/docs/ko/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/ko/configure_trace.md">추적</a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md">할당량 및 제한</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-purpose table-wrapper">
<table id="purpose">
<thead>
  <tr>
    <th>목적</th>
    <th>매개 변수</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>성능 튜닝</td>
    <td>
        <ul>
            <li><a href="/docs/ko/configure_common.md#commongracefulTime"><code translate="no">common.gracefulTime</code></a></li>
            <li><a href="/docs/ko/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/ko/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/ko/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/ko/configure_datanode.md#dataNodesegmentinsertBufSize"><code translate="no">dataNode.segment.insertBufSize</code></a></li>
            <li><a href="/docs/ko/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/ko/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>데이터 및 메타데이터</td>
    <td>
        <ul>
            <li><a href="/docs/ko/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/ko/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/ko/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/ko/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>관리</td>
    <td>
        <ul>
            <li><a href="/docs/ko/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/ko/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/ko/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/ko/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/ko/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>할당량 및 제한</td>
    <td>
        <ul>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsflushRatemax"><code translate="no">quotaAndLimits.flushRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitscompactionRateenabled"><code translate="no">quotaAndLimits.compactionRate.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitscompactionRatemax"><code translate="no">quotaAndLimits.compactionRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/ko/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h2 id="Download-an-installation-file" class="common-anchor-header">설치 파일 다운로드<button data-href="#Download-an-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml">독립 실행형</a>용 설치 파일을 다운로드하여 <code translate="no">docker-compose.yml</code> 로 저장하십시오.</p>
<p>다음 명령을 실행해도 됩니다.</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For Milvus standalone</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-installation-file" class="common-anchor-header">설치 파일 수정<button data-href="#Modify-the-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">docker-compose.yml</code> 파일에서, <code translate="no">user.yaml</code> 파일이 위치한 로컬 경로를 <code translate="no">standalone</code> 서비스의 <code translate="no">volumes</code> 섹션에 있는 <code translate="no">/milvus/configs/user.yaml</code> 에 매핑하십시오. 기존 볼륨 항목과 이미지, 환경 변수, 상태 확인, 종속성 등 서비스의 다른 설정은 그대로 유지하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/local/path/to/your/user.yaml:/milvus/configs/user.yaml</span>   <span class="hljs-comment"># Map the local path to the container path</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
데이터는 <code translate="no">docker-compose.yml</code> 의 기본 구성에 따라 <code translate="no">./volumes</code> 폴더에 저장됩니다. 데이터 저장 폴더를 변경하려면 <code translate="no">docker-compose.yml</code> 를 편집하거나 <code translate="no">$ export DOCKER_VOLUME_DIRECTORY=</code> 를 실행하십시오.
</div>
<h2 id="Start-Milvus" class="common-anchor-header">Milvus 시작<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>구성 파일과 설치 파일 수정을 완료한 후 Milvus를 시작할 수 있습니다.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Docker Compose 또는 Helm을 사용하여 다음 Milvus 종속성을 관리하는 방법을 알아보세요:
<ul>
<li><a href="/docs/ko/deploy_s3.md">Docker Compose 또는 Helm을 사용하여 오브젝트 스토리지 구성</a></li>
<li><a href="/docs/ko/deploy_etcd.md">Docker Compose 또는 Helm을 사용하여 메타 스토리지 구성</a></li>
<li><a href="/docs/ko/deploy_pulsar.md">Docker Compose 또는 Helm을 사용하여 메시지 스토리지 구성하기</a></li>
</ul></li>
</ul>
