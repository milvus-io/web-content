---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: Milvus Operatorを使用したMilvusの設定方法について説明します。
title: Milvus OperatorでMilvusを設定する
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Milvus Operatorを使用したMilvusの設定<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>本番環境では、マシンのタイプとワークロードに基づいてMilvusクラスタにリソースを割り当てる必要があります。デプロイ時に設定することも、クラスタの実行中に設定を更新することもできます。</p>
<p>このトピックでは、Milvus Operatorを使用してMilvusクラスタをインストールする際の設定方法を紹介します。</p>
<p>このトピックでは、Milvus Operatorをデプロイしていることを前提としています。詳細については、「<a href="/docs/ja/v2.4.x/install_cluster-milvusoperator.md">Milvus Operatorのデプロイ</a>」を参照してください。</p>
<p>Milvus Operatorを使用したMilvusクラスタの設定には以下が含まれます：</p>
<ul>
<li>グローバルリソースの設定</li>
<li>プライベートリソース設定</li>
</ul>
<div class="alert note">
プライベートリソースの設定はグローバルリソースの設定を上書きします。リソースをグローバルに構成し、同時に特定のコンポーネントのプライベートリソースを指定すると、コンポーネントはプライベート構成を優先して応答します。</div>
<h2 id="Configure-global-resources" class="common-anchor-header">グローバルリソースの設定<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operatorを使用してMilvusクラスタを起動する場合、設定ファイルを指定する必要があります。この例ではデフォルトの設定ファイルを使用しています。</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>設定ファイルの詳細は次のとおりです：</p>
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
<p>フィールド<code translate="no">spec.components</code> 、すべてのMilvusコンポーネントのグローバルおよびプライベートリソース設定の両方が含まれます。以下はグローバルリソースの設定によく使用される4つのフィールドです。</p>
<ul>
<li><code translate="no">image</code>:使用するMilvus dockerイメージ。</li>
<li><code translate="no">resources</code>:各コンポーネントに割り当てられた計算リソース。</li>
<li><code translate="no">tolerations</code> and : K8sクラスタ内の各Milvusコンポーネントのスケジューリングルール。詳細は<code translate="no">nodeSelector</code><a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">許容</a>値と<a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelectorを</a>参照。</li>
<li><code translate="no">env</code>:環境変数。</li>
</ul>
<p>より多くのフィールドを設定したい場合は、<a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">こちらの</a>ドキュメントを参照してください。</p>
<p>Milvusクラスタのグローバルリソースを設定するには、<code translate="no">milvuscluster_resource.yaml</code> 。</p>
<h3 id="Example" class="common-anchor-header">例</h3><p>以下の例ではMilvusクラスタ用にグローバルリソースを設定しています。</p>
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
<p>以下のコマンドを実行して新しい設定を適用します：</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
K8sクラスタに<code translate="no">my-release</code> という名前のMilvusクラスタが存在する場合、クラスタリソースは設定ファイルに従って更新されます。そうでない場合は、新しいMilvusクラスタが作成されます。</div>
<h2 id="Configure-private-resources" class="common-anchor-header">プライベートリソースの設定<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>もともとMilvus 2.0では、Milvusクラスタにはプロキシ、ルート・コーダ、データ・コーダ、クエリ・コーダ、インデックス・ノード、データ・ノード、クエリ・ノードの7つのコンポーネントが含まれています。しかし、Milvus 2.1.0では新しいコンポーネント、mix coordがリリースされました。mix coordはすべてのコーディネータコンポーネントを含む。したがって、ミックス・コーディネータを起動するということは、ルート・コーディネータ、データ・コーディネータ、クエリ・コーディネータを含む他のコーディネータをインストールして起動する必要がないということです。</p>
<p>各コンポーネントの構成に使用される共通フィールドには、以下のものがあります：</p>
<ul>
<li><code translate="no">replica</code>:各コンポーネントのレプリカ数。</li>
<li><code translate="no">port</code>:各コンポーネントのリッスン・ポート番号。</li>
<li>グローバル・リソース構成でよく使用される4つのフィールド：<code translate="no">image</code> <code translate="no">env</code>,<code translate="no">nodeSelector</code>,<code translate="no">tolerations</code>,<code translate="no">resources</code> (上記参照)。その他の設定可能なフィールドについては、<a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">このドキュメントの</a>各コンポーネントをクリックしてください。</li>
</ul>
<div class="alert note">
さらに、プロキシを設定する際には、`serviceType`という追加フィールドがあります。このフィールドはK8sクラスタでMilvusが提供するサービスのタイプを定義します。</div>
<p>特定のコンポーネントのリソースを設定するには、まず<code translate="no">spec.componets</code> のフィールドにコンポーネント名を追加し、そのプライベートリソースを設定してください。</p>
<div class="filter">
<a href="#component">コンポーネントまたは依存関係</a> <a href="#purpose">設定目的</a></div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>依存関係</th>
    <th>コンポーネント</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/ja/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_minio.md">MinIOまたはS3</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_pulsar.md">パルサー</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/ja/v2.4.x/configure_rootcoord.md">ルート・コーデック</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_proxy.md">プロキシ</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_querycoord.md">クエリコーデック</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_querynode.md">クエリ・ノード</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_indexnode.md">インデックスノード</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datacoord.md">データ・ノード</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datanode.md">データノード</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_localstorage.md">ローカルストレージ</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_log.md">ログ</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_msgchannel.md">メッセージチャネル</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_common.md">共通</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_indexcoord.md">インデックス・コーダ</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_metastore.md">メタストア</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_mq.md">メッセージキュー</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_trace.md">トレース</a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md">クォータと制限</a></li>
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
    <th>目的</th>
    <th>パラメータ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>パフォーマンス・チューニング</td>
    <td>
        <ul>
            <li><a href="/docs/ja/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>データとメタ</td>
    <td>
        <ul>
            <li><a href="/docs/ja/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>管理</td>
    <td>
        <ul>
            <li><a href="/docs/ja/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>クォータと制限</td>
    <td>
        <ul>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">例</h3><p>以下の例では、プロキシとデータノードのレプリカと計算リソースを<code translate="no">milvuscluster.yaml</code> 。</p>
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
この例では、グローバルリソースだけでなく、root coordとproxyのプライベートコンピュートリソースも設定しています。この設定ファイルを使用してMilvusクラスタを起動すると、プライベートリソースの設定はルートCoordとProxyに適用され、その他のコンポーネントはグローバルリソースの設定に従います。</div>
<p>以下のコマンドを実行して新しい設定を適用します：</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvus Operatorを使用して次のMilvus依存関係を管理する方法を学びます：<ul>
<li><a href="/docs/ja/v2.4.x/object_storage_operator.md">Milvus Operatorを使用したオブジェクトストレージの構成</a></li>
<li><a href="/docs/ja/v2.4.x/meta_storage_operator.md">Milvus Operatorを使用したMeta Storageの構成</a></li>
<li><a href="/docs/ja/v2.4.x/message_storage_operator.md">Milvus Operatorを使用したメッセージストレージの構成</a></li>
</ul></li>
</ul>
