---
id: configure-helm.md
label: Helm
related_key: configure
summary: HelmチャートでMilvusを設定する。
title: HelmチャートでMilvusを設定する
---
<h1 id="Configure-Milvus-with-Helm-Charts" class="common-anchor-header">HelmチャートによるMilvusの設定<button data-href="#Configure-Milvus-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Helm Chartsを使用してMilvusコンポーネントおよびサードパーティの依存関係を設定する方法について説明します。</p>
<div class="alert note">
現在のリリースでは、すべてのパラメータはMilvusの再起動後に有効になります。</div>
<h2 id="Configure-Milvus-via-configuration-file" class="common-anchor-header">設定ファイルによるMilvusの設定<button data-href="#Configure-Milvus-via-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>設定ファイル<code translate="no">values.yaml</code> を使用してMilvusを設定することができます。</p>
<h3 id="Download-a-configuration-file" class="common-anchor-header">設定ファイルのダウンロード</h3><p><code translate="no">values.yaml</code> を直接<a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml">ダウンロード</a>するか、以下のコマンドで<a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml">ダウンロード</a>します。</p>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Modify-the-configuration-file" class="common-anchor-header">設定ファイルの変更</h3><p><code translate="no">values.yaml</code> の対応するパラメータを調整することで、アプリケーションシナリオに合わせてMilvusインスタンスを設定します。</p>
<p>具体的には、<code translate="no">values.yaml</code> の<code translate="no">extraConfigFiles</code> を検索し、以下のようにこのセクションに設定を記述します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Extra configs for milvus.yaml</span>
<span class="hljs-comment"># If set, this config will merge into milvus.yaml</span>
<span class="hljs-comment"># Please follow the config structure in the milvus.yaml</span>
<span class="hljs-comment"># at https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml</span>
<span class="hljs-comment"># Note: this config will be the top priority which will override the config</span>
<span class="hljs-comment"># in the image and helm chart.</span>
extraConfigFiles:
  user.yaml: |+
    <span class="hljs-comment">#    For example to set the graceful time for query nodes</span>
    <span class="hljs-comment">#    queryNodes:</span>
    <span class="hljs-comment">#      gracefulTime: 10</span>
<button class="copy-code-btn"></button></code></pre>
<p>各パラメータの詳細については、以下のリンクを参照してください。</p>
<p>並べ替え</p>
<div class="filter">
<a href="#component">コンポーネントまたは依存関係</a> <a href="#purpose">構成の目的</a></div>
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
    <td>クォータとリミット</td>
    <td>
        <ul>
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
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ja/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
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
<p>Kubernetesインストールに特化したその他のパラメータについては、<a href="https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration">Milvus Helm Chart Configurationを</a>参照してください。</p>
<h3 id="Start-Milvus" class="common-anchor-header">Milvusの起動</h3><p>設定ファイルの修正が完了したら、そのファイルを使ってMilvusを起動します。</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Milvus-via-command-line" class="common-anchor-header">コマンドラインからMilvusを設定する<button data-href="#Configure-Milvus-via-command-line" class="anchor-icon" translate="no">
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
    </button></h2><p>また、HelmコマンドでMilvusの設定を直接アップグレードすることもできます。</p>
<h3 id="Check-the-configurable-parameters" class="common-anchor-header">設定可能パラメータの確認</h3><p>アップグレードの前に、Helmチャートで設定可能なパラメータを確認することができます。</p>
<pre><code translate="no">$ helm show values milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Milvusの起動</h3><p>アップグレード用コマンドに<code translate="no">--values</code> または<code translate="no">--set</code> を追加して、Milvus を設定・起動します。</p>
<pre><code translate="no"><span class="hljs-comment"># For instance, upgrade the Milvus cluster with compaction disabled</span>
$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> dataCoord.enableCompaction=<span class="hljs-literal">false</span>
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
<li><p>Milvusのサービスを監視し、アラートを作成する方法を学びたい場合：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/monitor.md">Kubernetes上のPrometheus OperatorでMilvusを監視するを</a>学ぶ</li>
<li><a href="/docs/ja/v2.4.x/visualize.md">GrafanaでMilvusのメトリクスを可視化するを</a>学ぶ。</li>
</ul></li>
<li><p>リソースを割り当てる方法をお探しの場合：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/allocate.md#standalone">Kubernetesでリソースを割り当てる</a></li>
</ul></li>
</ul>
