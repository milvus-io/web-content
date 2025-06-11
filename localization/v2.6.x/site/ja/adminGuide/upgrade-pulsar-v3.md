---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: Milvusの最新バージョンv2.5.xを使用できるように、MilvusのPulsarをV2からV3にアップグレードする方法をご紹介します。
title: MilvusのパルサーをV2からV3にアップグレード
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">Pulsarのアップグレード<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>この記事では、既にPulsar V2を使ったMilvusデプロイメントが動作している場合に、PulsarコンポーネントをV2からV3にアップグレードする手順を説明します。</p>
<p>Milvus v2.5以降、<strong>milvus-helmと</strong> <strong>milvus-operatorは</strong>、いくつかのバグとセキュリティ脆弱性を修正するため、デフォルトでPulsar V3を使用します。 Milvus 2.5はPulsar 2.xと互換性がありますが、Pulsar V3へのアップグレードはオプションです。安定性とパフォーマンスを向上させるため、Pulsar V3へのアップグレードをお勧めします。</p>
<p>Pulsar V2をMilvus v2.5.xと併用したい場合は、<a href="/docs/ja/use-pulsar-v2.md">Pulsar V2をMilvus v2.5.xと併用するを</a>ご参照ください。</p>
<div class="alert note">
<ol>
<li><p>アップグレード作業には短時間のサービス停止が必要です（データ量にもよりますが、通常数分から10分以上かかります）。</p></li>
<li><p>アップグレード作業前に、Milvusへのデータ書き込みを停止する必要があります。さもないと、書き込まれたデータが失われる可能性があります。</p></li>
<li><p>本記事では、Milvusが名前空間<code translate="no">default</code> 、名前<code translate="no">my-release</code> にインストールされていることを前提としています。このページからコピーしたコマンドを実行する際には、パラメータをご自身の名前空間とリリース名に変更してください。</p></li>
<li><p>作業環境がKubernetesクラスタの上記の名前空間配下にパーミッションがあり、以下のコマンドがインストールされていることを確認してください。</p>
<p>a. <code translate="no">kubectl</code> &gt;= 1.20</p>
<p>b. <code translate="no">helm</code> &gt;= 3.14.0</p>
<p>c.<code translate="no">cat</code>文字列操作のために、<code translate="no">grep</code> 、<code translate="no">awk</code> 。</p>
<p>d. milvus管理APIと対話するための<code translate="no">curl</code> または<strong>Attu v2.4+</strong></p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">ロードマップ<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>アップグレードプロセスには以下のステップが含まれます：</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">パルサーで消費されていないデータを永続化する。</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">milvusを停止し、パルサーV2を削除。</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">Pulsar V3とMilvusを起動します。</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">手順<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、MilvusでPulsarをV2からV3にアップグレードする詳細手順を説明します。</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">Pulsarで消費されなかったデータの永続化</h3><p>この手順では、Pulsar内の既存データがオブジェクト・ストレージ・サービスに永続化されていることを確認する必要があります。 2つのアプローチがあり、ニーズに合わせてお選びいただけます。</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">アプローチ1：Attuを使う</h4><p>Milvusデプロイメントのコレクション数が少なく、セグメント数もそれほど多くない場合は、Attuを使用してデータをオブジェクト・ストレージ・サービスに永続化することができます。</p>
<ol>
<li><p>全てのデータベースで全てのコレクションを選択し、<code translate="no">Segments</code> パネルに入り、<code translate="no">Flush</code> ボタンをクリックします。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" />
   </span> <span class="img-wrapper"> <span>コレクションのセグメントパネル</span> </span></p></li>
<li><p>ポップアップが表示されたら、<code translate="no">Flush</code> を再度クリックします。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" />
   </span> <span class="img-wrapper"> <span>Attuのデータフラッシュプロンプト</span> </span></p></li>
<li><p>すべてのコレクションのPersistent Segment Stateが<code translate="no">Flushed</code> になるまで待ちます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" />
   </span> <span class="img-wrapper"> <span>Attuでデータフラッシュステータスを表示する</span> </span></p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">アプローチ 2: 管理 API を使用する</h4><ol>
<li><p>Milvusプロキシのポート9091をローカルホストにプロキシする。</p>
<pre><code translate="no" class="language-bash">kubectl -n default port-forward deploy/my-release-milvus-proxy 9091:9091 &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>出力。</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>] <span class="hljs-number">8116</span><span class="hljs-string">​</span>
<span class="hljs-string">Forwarding</span> <span class="hljs-string">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span><span class="hljs-string">:9091</span> <span class="hljs-string">-&gt;</span> <span class="hljs-number">9091</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>後のクリーンアップのためにPidを保存。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">pid=8116​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>挿入された全てのデータをPulsarからOjbectストレージに永続化するアクションをトリガーする。</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>出力。</p>
<pre><code translate="no" class="language-yaml">{<span class="hljs-string">​</span>
  <span class="hljs-attr">&quot;segmentIDs&quot;:</span> [<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998181000</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953999383600</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998180800</span><span class="hljs-string">​</span>
  ]<span class="hljs-string">​</span>
}<span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>全てのセグメントがフラッシュされたことを確認する。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>完了すると、以下の出力が表示されます。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span><span class="hljs-attr">&quot;flushed&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">}</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>バックグランド<code translate="no">kubectl port-forward</code> プロセスを停止する。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kill</span> <span class="hljs-string">$pid​</span>

<button class="copy-code-btn"></button></code></pre>
<p>出力</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>]  <span class="hljs-string">+</span> <span class="hljs-number">8116 </span><span class="hljs-string">terminated</span>  <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">port-forward</span> <span class="hljs-string">deploy/my-release-milvus-proxy</span> <span class="hljs-number">9091</span><span class="hljs-string">:9091</span>                      <span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">Milvusを停止し、Pulsar V2を削除する</h3><p>このステップでは、Milvusポッドを停止し、Pulsar V2デプロイメントを削除する必要があります。 利用可能なセクションは2つに分かれています：</p>
<ul>
<li><p>Milvus Helmユーザの方へ</p>
<p>Milvus Helmチャートを使ってMilvusをインストールした場合は、「<a href="#Delete-Pulsar-V2-using-Helm">Helmを使ってPulsar v2を削除する</a>」に進んでください。</p></li>
<li><p>Milvus Operatorをお使いの方</p>
<p>Milvus Operatorを使ってMilvusをインストールした場合は、<a href="#Delete-Pulsar-V2-using-Milvus-Operator">Milvus Operatorを使ってPulsar v2を削除するを</a>ご覧ください。</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">Helmを使ってPulsar V2を削除する</h4><p>Milvus Helmチャートを使用してMilvusをインストールした場合は、以下の手順に従ってMilvusポッドを停止し、Pulsar V2配備を削除してください。</p>
<ol>
<li><p>後で復元できるよう、現在のMilvusリリース値を<code translate="no">values.yaml</code> 。</p>
<pre><code translate="no" class="language-bash">helm -n default get values my-release -o yaml &gt; values.yaml​
<span class="hljs-built_in">cat</span> values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>コマンドを使用して、Milvusとすべての依存関係を停止します。データ・ボリュームについては心配しないでください、デフォルトで保持されます。</p>
<pre><code translate="no" class="language-bash">helm -n default uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>出力</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[PersistentVolumeClaim] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>リスト・パルサーPVC &amp; PV（持続ボリューム・クレーム &amp; 持続ボリューム）をクリアする必要があります。</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>出力</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">Volume</span> <span class="hljs-string">Claims:​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​</span>
<span class="hljs-string">Volumes:​</span>
<span class="hljs-string">pvc-f590a4de-df31-4ca8-a424-007eac3c619a​</span>
<span class="hljs-string">pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​</span>
<span class="hljs-string">pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​</span>
<span class="hljs-string">pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​</span>
<span class="hljs-string">pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">pulsar-pvcs.txt</code> 、PVCリストがすべてPulsar用かどうかを確認します。エラーがないことを確認したら、PVCを削除します。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> pulsar-pvcs.txt |xargs -I {} kubectl -n default delete pvc {} --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>出力する。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> <span class="hljs-string">deleted​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(オプション）PVCを提供しているストレージ・クラスによっては、PVを手動で削除する必要もあります。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">cat</span> <span class="hljs-string">pulsar-pvs.txt</span> <span class="hljs-string">|xargs</span> <span class="hljs-string">-I</span> {} <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">delete</span> <span class="hljs-string">pvc</span> {} <span class="hljs-string">--wait=false​</span>

<button class="copy-code-btn"></button></code></pre>
<p>NotFoundエラーが出力されても問題ありません。kubernetesコントローラによって既に削除されています。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">Milvus Operatorを使ったPulsar V2の削除</h4><p>Milvus Operatorを使ってMilvusをインストールした場合は、以下の手順でMilvusポッドを停止し、Pulsar V2デプロイメントを削除してください。</p>
<ol>
<li><p>後で使用するため、現在のMilvus Manifestを<code translate="no">milvus.yaml</code> 。</p>
<pre><code translate="no" class="language-bash">kubectl -n default get milvus my-release -o yaml &gt; milvus.yaml​
<span class="hljs-built_in">head</span> milvus.yaml -n 20​

<button class="copy-code-btn"></button></code></pre>
<p>出力します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-string">annotations:​</span>
    <span class="hljs-attr">milvus.io/dependency-values-merged:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/pod-service-label-added:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/querynode-current-group-id:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-attr">creationTimestamp:</span> <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-string">finalizers:​</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus.milvus.io/finalizer​</span>
  <span class="hljs-attr">generation:</span> <span class="hljs-number">3</span><span class="hljs-string">​</span>
  <span class="hljs-string">labels:​</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus​</span>
    <span class="hljs-attr">milvus.io/operator-version:</span> <span class="hljs-number">1.1</span><span class="hljs-number">.2</span><span class="hljs-string">​</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">my-release​</span>
<span class="hljs-attr">namespace:</span> <span class="hljs-string">default​</span>
<span class="hljs-attr">resourceVersion:</span> <span class="hljs-string">&quot;692217324&quot;</span><span class="hljs-string">​</span>
<span class="hljs-attr">uid:</span> <span class="hljs-string">7a469ed0-9df1-494e-bd9a-340fac4305b5​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">components:​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>以下の内容を含む<code translate="no">patch.yaml</code> Fileを作成します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># a patch to retain etcd &amp; storage data and delete pulsar data while delete milvus​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">etcd:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">storage:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Delete​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>milvusを削除する間、<code translate="no">kubectl patch</code> 、etcdとストレージ・データを保持し、パルサー・データを削除する。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">patch</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release</span> <span class="hljs-string">--patch-file</span> <span class="hljs-string">patch.yaml</span> <span class="hljs-string">--type=merge​</span>

<button class="copy-code-btn"></button></code></pre>
<p>出力。</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>milvusを停止し、パルサーV2を削除する。etcdとオブジェクト・ストレージのデータ量はデフォルトで保持されるため、心配する必要はない。</p>
<pre><code translate="no" class="language-bash">kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​
kubectl -n default get milvus my-release​
kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>出力：milvusの停止とpulsarボリュームの削除には数分かかる場合があります。</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   True      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>コマンドが終了するまでお待ちください。</p></li>
<li><p>milvusリソースがなくなっていることを再度確認してください。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">get</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release​</span>

<button class="copy-code-btn"></button></code></pre>
<p>出力は以下のようになるはずです。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-literal">No</span> <span class="hljs-string">resources</span> <span class="hljs-string">found</span> <span class="hljs-string">in</span> <span class="hljs-string">default</span> <span class="hljs-string">namespace.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">Pulsar V3とmilvusの起動</h3><p>このステップでは、Pulsar V3とMilvusポッドを起動する必要があります。 利用可能なセクションは2つに分かれています：</p>
<ul>
<li><p>Helmユーザの場合</p>
<p>Milvus Helmチャートを使ってMilvusをインストールした場合は、"<a href="#For-Helm-User">Helm User</a>"へ進んでください。</p></li>
<li><p>Milvus Operator ユーザ向け</p>
<p>Milvus Operatorを使ってMilvusをインストールした場合は、<a href="#For-Milvus-Operator-User">For Milvus Operator Userへ</a>進んでください。</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">Pulsar V3を起動し、Helmを使用する。</h4><ol>
<li><p>前のステップで保存した<code translate="no">values.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
<span class="hljs-string">pulsar:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
<span class="hljs-string">pulsarv3:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>ローカルのhelmレポを更新する</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm​
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>出力</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists with the same configuration, skipping​
Hang tight <span class="hljs-keyword">while</span> we grab the latest from your chart repositories...​
...Successfully got an update from the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
Update Complete. ⎈Happy Helming!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>編集した<code translate="no">values.yaml</code> を使用して、最新のhelmチャート・バージョンでmilvusリリースをインストールします。</p>
<pre><code translate="no" class="language-bash">helm -n default install my-release zilliztech/milvus --reset-values -f values.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>出力</p>
<pre><code translate="no" class="language-bash">NAME: my-release​
LAST DEPLOYED: Fri Nov 22 15:31:27 2024​
NAMESPACE: default​
STATUS: deployed​
REVISION: 1​
TEST SUITE: None​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">kubectl -n default get pods</code> を使って、すべてのポッドがスケジュールされ実行されているか確認してください。</p>
<p>すべてのポッドが起動するまで数分かかるかもしれません。</p>
<p>出力はこんな感じ。</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd-0                             1/1     Running     0          4m3s​
my-release-milvus-datanode-56487bc4bc-s6mbd   1/1     Running     0          4m5s​
my-release-milvus-indexnode-6476894d6-rv85d   1/1     Running     0          4m5s​
my-release-milvus-mixcoord-6d8875cb9c-67fcq   1/1     Running     0          4m4s​
my-release-milvus-proxy-7bc45d57c5-2qf8m      1/1     Running     0          4m4s​
my-release-milvus-querynode-77465747b-kt7f4   1/1     Running     0          4m4s​
my-release-minio-684ff4f5df-pnc97             1/1     Running     0          4m5s​
my-release-pulsarv3-bookie-0                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-1                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-2                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-init-6z4tk         0/1     Completed   0          4m1s​
my-release-pulsarv3-broker-0                  1/1     Running     0          4m2s​
my-release-pulsarv3-broker-1                  1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-0                   1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-1                   1/1     Running     0          4m2s​
my-release-pulsarv3-pulsar-init-wvqpc         0/1     Completed   0          4m1s​
my-release-pulsarv3-recovery-0                1/1     Running     0          4m3s​
my-release-pulsarv3-zookeeper-0               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-1               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-2               1/1     Running     0          4m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">Pulsar V3を起動し、Milvus Operatorを使用する。</h4><ol>
<li><p>前のステップで保存した<code translate="no">milvus.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-attr">annotations:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">resourceVersion:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">uid:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">chartVersion:</span> <span class="hljs-string">pulsar-v3​</span>
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        <span class="hljs-attr">values:</span> <span class="hljs-literal">null</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus Operatorがv1.1.2またはそれ以降のバージョンにアップグレードされていることを確認する。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">add</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">https://zilliztech.github.io/milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">update</span> <span class="hljs-string">milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">-n</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">upgrade</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">milvus-operator/milvus-operator​</span>

<button class="copy-code-btn"></button></code></pre>
<p>milvus with pulsar v3を起動するコマンドを使用します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">-f</span> <span class="hljs-string">milvus.yaml​</span>

<button class="copy-code-btn"></button></code></pre>
<p>出力</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">milvus.milvus.io/my-release</span> <span class="hljs-string">created​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>すべてのポッドがスケジュールされ、<code translate="no">kubectl -n default get pods</code> 。</p>
<p>すべてのポッドが起動するまで数分かかることがあります。</p>
<p>出力はこんな感じ。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">NAME</span>                                            <span class="hljs-string">READY</span>   <span class="hljs-string">STATUS</span>      <span class="hljs-string">RESTARTS</span>   <span class="hljs-string">AGE​</span>
<span class="hljs-string">my-release-etcd-0</span>                               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-milvus-datanode-57fd59ff58-5mdrk</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-indexnode-67867c6b9b-4wsbw</span>    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-mixcoord-797849f9bb-sf8z5</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-proxy-5d5bf98445-c55m6</span>        <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-querynode-0-64797f5c9-lw4rh</span>   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">92s​</span>
<span class="hljs-string">my-release-minio-79476ccb49-zvt2h</span>               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-pulsar-bookie-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-2</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-init-v8fdj</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-proxy-0</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-proxy-1</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-pulsar-init-5lhx7</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-recovery-0</span>                    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-0</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-1</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-2</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p></p>
