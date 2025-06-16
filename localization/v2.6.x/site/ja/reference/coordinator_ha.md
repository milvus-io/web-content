---
id: coordinator_ha.md
summary: Milvusコーディネーターが現役でスタンバイする動機と手順について学ぶ。
title: コーディネータHA
---
<h1 id="Coordinator-HA" class="common-anchor-header">コーディネータHA<button data-href="#Coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="/docs/ja/architecture_overview.md">Milvusアーキテクチャに</a>示すように、Milvusは多くのコンポーネントから構成され、それらが分散して動作する。すべてのコンポーネントの中で、Milvusはノードの<a href="/docs/ja/scaleout.md">スケールアップとスケールアウトを通じて</a>ワーカーの高可用性を確保し、コーディネータを唯一の弱点としている。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>2.2.3リリースでは、Milvusはコーディネータに高可用性を実装し、アクティブ-スタンバイモードで動作するようにすることで、サービスが利用できなくなる可能性のある単一障害点(SPoF)を軽減します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/coordinator_ha.png" alt="Coordinator HA" class="doc-image" id="coordinator-ha" />
   </span> <span class="img-wrapper"> <span>コーディネーターの高可用性</span> </span></p>
<p>上図は、コーディネータがアクティブ・スタンバイ・モードでどのように動作するかを示しています。コーディネーターのペアが開始すると、サーバーIDを使用してetcdに登録し、アクティブな役割を争います。etcdからアクティブな役割をリースすることに成功したコーディネータがサービスを開始し、ペアのもう一方のコーディネータはスタンバイ状態のままアクティブな役割を監視し、アクティブなコーディネータが死亡した場合にサービスを提供できるようにします。</p>
<h2 id="Enable-coordinator-HA" class="common-anchor-header">コーディネーターのHAを有効にする<button data-href="#Enable-coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="With-Helm" class="common-anchor-header">Helmを使用する</h3><p>複数のコーディネーターを起動してアクティブスタンバイで動作させるには、<code translate="no">values.yaml</code> ファイルを次のように変更します。</p>
<ul>
<li><code translate="no">xxxCoordinator.replicas</code> を<code translate="no">2</code> に設定します。</li>
<li><code translate="no">xxxCoordinator.activeStandby.enabled</code> を<code translate="no">true</code> に設定します。</li>
</ul>
<p>以下のコードスニペットでは、例としてRootCoordを使用しています。他のタイプのコーディネーターにも同じことができます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoordinator:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-comment"># You can set the number of replicas greater than 1 only if you also need to set activeStandby.enabled to true.</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>  <span class="hljs-comment"># Otherwise, remove this configuration item.</span>
  <span class="hljs-attr">resources:</span> {}
  <span class="hljs-attr">nodeSelector:</span> {}
  <span class="hljs-attr">affinity:</span> {}
  <span class="hljs-attr">tolerations:</span> []
  <span class="hljs-attr">extraEnv:</span> []
  <span class="hljs-attr">heaptrack:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">profiling:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>  <span class="hljs-comment"># Enable live profiling</span>
  <span class="hljs-attr">activeStandby:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>  <span class="hljs-comment"># Set this to true to have RootCoordinators work in active-standby mode.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-Docker" class="common-anchor-header">Dockerを使用する</h3><p>複数のコーディネータを起動してアクティブスタンバイで動作させるには、Milvusクラスタを起動するために使用する<code translate="no">docker-compose</code> ファイルにいくつかの定義を追加します。</p>
<p>以下のコードスニペットでは、例としてRootCoordを使用しています。他のタイプのコーディネータにも同じことができます。</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">rootcoord:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-rootcoord</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.2.3</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;rootcoord&quot;</span>]
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
      <span class="hljs-attr">PULSAR_ADDRESS:</span> <span class="hljs-string">pulsar://pulsar:6650</span>
      <span class="hljs-attr">ROOT_COORD_ADDRESS:</span> <span class="hljs-string">rootcoord:53100</span>
      <span class="hljs-comment"># add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
      <span class="hljs-attr">ROOT_COORD_ENABLE_ACTIVE_STANDBY:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;etcd&quot;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;pulsar&quot;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;minio&quot;</span>

<span class="hljs-comment">#   add the following to have RootCoords work in active-standby mode</span>
<span class="hljs-comment">#   rootcoord-1:</span>
<span class="hljs-comment">#    container_name: milvus-rootcoord-1</span>
<span class="hljs-comment">#    image: milvusdb/milvus:v2.2.3</span>
<span class="hljs-comment">#    command: [&quot;milvus&quot;, &quot;run&quot;, &quot;rootcoord&quot;]</span>
<span class="hljs-comment">#    environment:</span>
<span class="hljs-comment">#      ETCD_ENDPOINTS: etcd:2379</span>
<span class="hljs-comment">#      MINIO_ADDRESS: minio:9000</span>
<span class="hljs-comment">#      PULSAR_ADDRESS: pulsar://pulsar:6650</span>
<span class="hljs-comment">#      ROOT_COORD_ADDRESS: rootcoord-1:53100</span>
<span class="hljs-comment">#      # add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
<span class="hljs-comment">#      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true</span>
<span class="hljs-comment">#    depends_on:</span>
<span class="hljs-comment">#      - &quot;etcd&quot;</span>
<span class="hljs-comment">#      - &quot;pulsar&quot;</span>
<span class="hljs-comment">#      - &quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-MacLinux-shell" class="common-anchor-header">Mac/Linuxシェル</h3><p>複数のコーディネータを起動し、アクティブスタンバイで動作させるには、次のようにします。</p>
<ol>
<li><p>Milvusのソースコードをローカルドライブにダウンロードし、以下のように<a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">ソースコードからMilvusクラスタを起動</a>します：</p>
<pre><code translate="no" class="language-shell">sudo ./scripts/start_cluster.sh
<button class="copy-code-btn"></button></code></pre>
<p>Milvusはこのステップの最後に、各タイプのコーディネータを1つだけ使用して実行されます。</p></li>
<li><p><code translate="no">milvus.yaml</code> を更新して、各タイプのコーディネータのポート番号を変更します。以下では例として<strong>rootCoordを</strong>使用します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoord:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">53100</span> <span class="hljs-comment"># change to 53001</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>スタンバイ・コーディネータを起動します。</p>
<pre><code translate="no" class="language-shell">sudo nohup ./bin/milvus run rootcoord &gt; /tmp/rootcoord2.log 2&gt;&amp;1 &amp;
<button class="copy-code-btn"></button></code></pre>
<p>この手順の最後に、以下のコマンドを実行して、2 つのコーディネータ・プロセスが存在することを確認します。</p>
<pre><code translate="no" class="language-shell">ps aux|grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>以下のような出力になるはずです。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">&gt; </span><span class="language-bash">ps aux|grep milvus</span>
root        12813   0.7 0.2 410709648   82432   ??  S   5:18PM  0:33.28 ./bin/milvus run rootcoord
root        12816   0.5 0.2 409487968   62352   ??  S   5:18PM  0:22.69 ./bin/milvus run proxy
root        17739   0.1 0.3 410289872   91792 s003  SN  6:01PM  0:00.30 ./bin/milvus run rootcoord
...
<button class="copy-code-btn"></button></code></pre>
<p>また、スタンバイ・コーディネーターは、次のように 10 秒ごとにログ・エントリーを出力します：</p>
<pre><code translate="no" class="language-shell">[INFO] [sessionutil/session_util.go:649] [&quot;serverName: rootcoord is in STANDBY ...&quot;]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ペアのアクティブなコーディネーターを終了し、スタンバイコーディネーターの動作を確認します。</p>
<p>スタンバイ・コーディネーターがアクティブな役割を引き継ぐのに60秒かかることがわかります。</p>
<pre><code translate="no" class="language-shell">[2022/09/21 11:58:33.855 +08:00] [DEBUG] [sessionutil/session_util.go:677] [&quot;watch the ACTIVE key&quot;] [DELETE=&quot;key:\&quot;by-dev/meta/session/rootcoord\&quot; mod_revision:167 &quot;]
[2022/09/21 11:58:33.856 +08:00] [DEBUG] [sessionutil/session_util.go:677] [&quot;watch the ACTIVE key&quot;] [DELETE=&quot;key:\&quot;by-dev/meta/session/rootcoord-15\&quot; mod_revision:167 &quot;]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:683] [&quot;stop watching ACTIVE key&quot;]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:655] [&quot;start retrying to register as ACTIVE service...&quot;]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:641] [&quot;register ACTIVE service successfully&quot;] [ServerID=19]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:690] [&quot;quit STANDBY mode, this node will become ACTIVE&quot;]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:638] [&quot;rootcoord switch from standby to active, activating&quot;]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:306] [&quot;RootCoord Register Finished&quot;]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [rootcoord/service.go:148] [&quot;RootCoord start done ...&quot;]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [components/root_coord.go:58] [&quot;RootCoord successfully started&quot;]
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Related-configuration-items" class="common-anchor-header">関連する設定項目<button data-href="#Related-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>コーディネータ HA はデフォルトで無効になっています。Milvus 設定ファイルの次の項目を変更することで、この機能を手動で有効にできます。</p>
<ul>
<li><a href="/docs/ja/configure_rootcoord.md#rootCoordactiveStandbyenabled">rootCoord.activeStandby.enabled</a></li>
<li><a href="/docs/ja/configure_querycoord.md#queryCoordactiveStandbyenabled">queryCoord.activeStandby.enabled</a></li>
<li><a href="/docs/ja/configure_datacoord.md#dataCoordactiveStandbyenabled">dataCoord.activeStandby.enabled</a></li>
</ul>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>現在のところ、アクティブサービスとスタンバイサービス間の強い一貫性保証はありません。したがって、スタンバイ・コーディネーターは、アクティブな役割を引き継ぐ間にメタデータを再読み込みする必要があります。</p>
<p>Etcd は、現在のセッションがタイムアウトした後にのみリースを解放します。セッションタイムアウトのデフォルトは60秒です。したがって、アクティブなコーディネータが死亡してからスタンバイ・コーディネータがアクティブな役割を引き継ぐまでの間には60秒の間隔があります。</p>
