---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: 밀버스 오퍼레이터로 밀버스를 구성하는 방법을 알아보세요.
title: Milvus 오퍼레이터로 Milvus 구성하기
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Milvus Operator로 Milvus 구성하기<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>프로덕션 환경에서는 머신 유형 및 워크로드에 따라 Milvus 클러스터에 리소스를 할당해야 합니다. 배포 중에 구성하거나 클러스터가 실행되는 동안 구성을 업데이트할 수 있습니다.</p>
<p>이 항목에서는 Milvus Operator로 Milvus 클러스터를 설치할 때 구성하는 방법을 소개합니다.</p>
<p>이 항목에서는 Milvus Operator를 배포했다고 가정합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">Milvus Operator 배포하기를</a> 참조하세요.</p>
<p>Milvus Operator로 Milvus 클러스터 구성에는 다음이 포함됩니다:</p>
<ul>
<li>글로벌 리소스 구성</li>
<li>프라이빗 리소스 구성</li>
</ul>
<div class="alert note">
프라이빗 리소스 구성은 글로벌 리소스 구성을 덮어씁니다. 리소스를 전역으로 구성하면서 동시에 특정 구성 요소의 프라이빗 리소스를 지정하면 구성 요소는 프라이빗 구성의 우선순위를 지정하고 이에 먼저 응답합니다.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">글로벌 리소스 구성<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator를 사용하여 Milvus 클러스터를 시작할 때는 구성 파일을 지정해야 합니다. 여기서는 기본 구성 파일을 사용합니다.</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>구성 파일의 상세 내용은 다음과 같습니다:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">spec.components</code> 필드에는 모든 Milvus 구성 요소의 전역 및 비공개 리소스 구성이 모두 포함됩니다. 다음은 글로벌 리소스를 구성하는 데 일반적으로 사용되는 네 가지 필드입니다.</p>
<ul>
<li><code translate="no">image</code>: 사용된 Milvus 도커 이미지.</li>
<li><code translate="no">resources</code>: 각 구성 요소에 할당된 컴퓨팅 리소스.</li>
<li><code translate="no">tolerations</code> <code translate="no">nodeSelector</code> : K8s 클러스터에 있는 각 Milvus 구성 요소의 스케줄링 규칙. 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">톨러레이션과</a> <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector를</a> 참고하세요.</li>
<li><code translate="no">env</code>: 환경 변수.</li>
</ul>
<p>더 많은 필드를 구성하려면 <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">여기</a> 설명서를 참조하세요.</p>
<p>Milvus 클러스터에 대한 글로벌 리소스를 구성하려면 <code translate="no">milvuscluster_resource.yaml</code> 파일을 생성합니다.</p>
<h3 id="Example" class="common-anchor-header">예제</h3><p>다음 예는 Milvus 클러스터에 대한 글로벌 리소스를 구성하는 예제입니다.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    nodeSelector: {}
    tolerations: {}
    <span class="hljs-built_in">env</span>: {}
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
<button class="copy-code-btn"></button></code></pre>
<p>새 구성을 적용하려면 다음 명령을 실행합니다:</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
K8s 클러스터에 <code translate="no">my-release</code> 이라는 이름의 Milvus 클러스터가 있는 경우 구성 파일에 따라 클러스터 리소스가 업데이트됩니다. 그렇지 않으면 새 Milvus 클러스터가 생성됩니다.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">비공개 리소스 구성<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>원래 Milvus 2.0에서 Milvus 클러스터는 프록시, 루트 코디, 데이터 코디, 쿼리 코디, 인덱스 노드, 데이터 노드, 쿼리 노드 등 7가지 구성 요소를 포함합니다. 그러나 Milvus 2.1.0과 함께 새로운 구성 요소인 mix coord가 릴리즈되었습니다. 믹스 코드는 모든 코디네이터 구성 요소를 포함합니다. 따라서 믹스 코디를 시작하면 루트 코디, 데이터 코디, 쿼리 코디 등 다른 코디네이터를 설치 및 시작할 필요가 없습니다.</p>
<p>각 구성 요소를 구성하는 데 사용되는 공통 필드는 다음과 같습니다:</p>
<ul>
<li><code translate="no">replica</code>: 각 컴포넌트의 복제본 수입니다.</li>
<li><code translate="no">port</code>: 각 컴포넌트의 수신 포트 번호.</li>
<li>글로벌 리소스 구성에서 일반적으로 사용되는 네 가지 필드입니다: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (위 참조). 더 많은 구성 가능한 필드를 보려면 <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">이 문서에서</a> 각 구성 요소를 클릭하세요.</li>
</ul>
<div class="alert note">
또한 프록시를 구성할 때 'serviceType'이라는 추가 필드가 있습니다. 이 필드는 Milvus가 K8s 클러스터에서 제공하는 서비스 유형을 정의합니다.</div>
<p>특정 구성 요소에 대한 리소스를 구성하려면 먼저 <code translate="no">spec.componets</code> 필드에 구성 요소 이름을 추가한 다음 해당 구성 요소의 프라이빗 리소스를 구성합니다.</p>
<div class="filter">
<a href="#component">구성 요소 또는</a> <a href="#purpose">종속성 구성 목적</a> </div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>종속성</th>
    <th>구성 요소</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/ko/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_minio.md">MinIO 또는 S3</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/ko/v2.4.x/configure_rootcoord.md">루트 코디</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_proxy.md">프록시</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_querycoord.md">쿼리 좌표</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_querynode.md">쿼리 노드</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_indexnode.md">인덱스 노드</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datacoord.md">데이터 좌표</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datanode.md">데이터 노드</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_localstorage.md">로컬 스토리지</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_log.md">로그</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_msgchannel.md">메시지 채널</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_common.md">공통</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_indexcoord.md">인덱스 조정</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_metastore.md">메타스토어</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_mq.md">메시지 큐</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_trace.md">Trace</a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md">할당량 및 제한</a></li>
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
    <th>파라미터</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>성능 튜닝</td>
    <td>
        <ul>
            <li><a href="/docs/ko/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>데이터 및 메타</td>
    <td>
        <ul>
            <li><a href="/docs/ko/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>관리</td>
    <td>
        <ul>
            <li><a href="/docs/ko/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>할당량 및 제한</td>
    <td>
        <ul>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/ko/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">예제</h3><p>아래 예는 <code translate="no">milvuscluster.yaml</code> 파일에서 프록시 및 데이터노드의 복제본과 컴퓨팅 리소스를 구성하는 예제입니다.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
    rootCoord: 
      replicas: 1
      port: 8080
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;6&#x27;</span>
          memory: <span class="hljs-string">&#x27;10Gi&#x27;</span>
    dataCoord: {}
    queryCoord: {}
    indexCoord: {}
    dataNode: {}
    indexNode: {}
    queryNode: {}
    proxy:
      replicas: 1
      serviceType: ClusterIP
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;2&#x27;</span>
          memory: 4Gi
        requests:
          cpu: 100m
          memory: 128Mi
  config: {}
  dependencies: {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
이 예제에서는 글로벌 리소스뿐만 아니라 루트 코디와 프록시에 대한 프라이빗 컴퓨팅 리소스도 구성합니다. 이 구성 파일을 사용하여 Milvus 클러스터를 시작할 때, 프라이빗 리소스 구성은 루트 코디와 프록시에 적용되고 나머지 구성 요소는 글로벌 리소스 구성을 따릅니다.</div>
<p>새 구성을 적용하려면 다음 명령을 실행하세요:</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
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
<li>Milvus Operator로 다음 Milvus 종속성을 관리하는 방법을 알아보세요:<ul>
<li><a href="/docs/ko/v2.4.x/object_storage_operator.md">Milvus Operator로 오브젝트 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/meta_storage_operator.md">Milvus 오퍼레이터로 메타 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/message_storage_operator.md">Milvus 오퍼레이터로 메시지 저장소 구성하기</a></li>
</ul></li>
</ul>
