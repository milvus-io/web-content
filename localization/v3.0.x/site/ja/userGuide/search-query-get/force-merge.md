---
id: force-merge.md
title: フォース・マージ・コンパクションCompatible with Milvus 3.0.x
summary: 強制マージコンパクションを使用して、小さなセグメントを統合し、クエリのパフォーマンスとストレージ効率を向上させます。
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">フォース・マージ・コンパクション<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>強制マージは、クエリのパフォーマンスとストレージの効率を向上させるために、小さくて断片化されたセグメントを、より少なくて大きなセグメントに統合するように設計されています。このガイドでは、強制マージ圧縮の使用方法を説明します。</p>
<div class="alert note">
<p>この機能はパブリック・プレビューです。本番環境では使用しないでください。</p>
</div>
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
    </button></h2><p>標準的な<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">コンパクションでは</a>、多対一のマージによってセグメント・サイズを設定された<code translate="no">maxSize</code> の近くに維持しますが、それでも、制限を超えないとそれ以上マージできない中間のサイズの断片が残ることがあります。たとえば、下図のように、コレクションに 2 MB のセグメントが 5 つあり、<code translate="no">maxSize</code> が 3 MB の場合、2 つのセグメントをマージすると制限を超えるため、標準のコンパクションではセグメント数をこれ以上減らすことができず、断片化されたレイアウトが残ります。</p>
<p>Force merge は<code translate="no">target_size</code> パラメータを追加し、可能な限り厳しい許容範囲内でセグメントを希望のサイズに再編成します。下図のように、指定された<code translate="no">target_size</code> が 4 MB の場合、5 つの 2 MB の小さなセグメントをより少ない大きなセグメントにマージすることができます。これは過剰なセグメント数を減らし、デフォルトの<code translate="no">maxSize</code> 設定よりも大きなターゲットをサポートし、ターゲットが非常に大きい場合、システムは現在のハードウェアとQueryNodeトポロジーに対して実用的な出力サイズとセグメント数を選択することができます。</p>
<p>どのコンパクション方法を使用するかについては、<a href="#faq">FAQを</a>参照してください。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>強制マージコンパクションは、既存の <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a>APIを<code translate="no">target_size</code> 。これは完全な下位互換性があります。<code translate="no">target_size</code> を使用しない既存のコンパクション呼び出しは、従来どおり動作します。</p>
<p>強制マージは非同期に動作します。検索操作やクエリ操作をブロックすることはありませんが、実行中に I/O やメモリのリソースを消費します。</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">強制マージコンパクションの使用<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvusバージョン3.0以降</p></li>
<li><p>PyMilvus 3.0以降</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">グローバル設定<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の設定パラメータは強制併合の動作を制御します。Milvusの設定ファイルまたは環境変数で設定してください。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>デフォルト値</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>デフォルトのセグメント最大サイズ(MB)。<code translate="no">target_size</code> が 0 または省略されたときにターゲットとして使用される。また、明示的な<code translate="no">target_size</code> の最小許容値としても機能する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>アルゴリズム選択のためのセグメント数のしきい値。セグメント数がこの値を超えると、Milvusはより高速な貪欲アルゴリズムを使用してマージ計画を行います。</p><ul><li><p><strong>標準アルゴリズム</strong>（セグメント数 &lt;=<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> のときに使用）：より最適なマージ結果が得られるが、計算に時間がかかる。</p></li><li><p><strong>貪欲なアルゴリズム</strong>（セグメント数 &gt;<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> のときに使用）：最適なセグメントグルーピングがわずかに劣る代償として、計画をはるかに速く完了する。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>DataNodeのメモリをこの係数で割って、システムが許容する最大のセグメントサイズを計算します。</p><ul><li><p>値を大きくすると、マージに割り当てられるメモリは少なくなりますが、他のDataNode操作に割り当てられるメモリが増えるため、ノードの安定性が向上します。</p></li><li><p>値を小さくすると、より大きなマージが可能になりますが、メモリ圧迫が大きくなります。</p></li><li><p>例えば、デフォルトのファクターが4.0で、16GBのメモリを持つDataNodeの場合、マージバジェットは4GBです。つまり、1回の操作でマージされるセグメントの合計サイズが4 GBを超えることはありません。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>QueryNodeの最小メモリをこの係数で割ります。自動サイズ計算 (<code translate="no">target_size=max_int64</code>) の際に使用され、マージされたセグメントを QueryNode がロードできるようにします。</p><ul><li><p>値を大きくすると、QueryNode がロードしやすい小さなセグメントになります。</p></li><li><p>値を小さくすると、より大きなセグメントをロードできるようになりますが、メモリに制約のある QueryNode ではロードに失敗する可能性があります。</p></li><li><p>例えば、デフォルトのファクターが 4.0 で、最小の QueryNode のメモリが 16 GB の場合、自動計算されるターゲットサイズは 4 GB を超えません。これにより、QueryNode がロードできないほど大きなセグメントを Force Merge が生成するのを防ぐことができます。</p></li></ul></td>
   </tr>
</table>
<p>上記の変更をMilvusクラスタに適用するには、<a href="/docs/ja/configure-helm.md#Configure-Milvus-via-configuration-file">HelmによるMilvusの設定</a>および<a href="/docs/ja/configure_operator.md">Milvus OperatorsによるMilvusの</a>設定の手順に従ってください。</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">強制マージコンパクションのトリガ<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>強制マージコンパクションをトリガするには、<code translate="no">target_size</code> パラメータを指定して<code translate="no">compact()</code> を呼び出します。パラメータの詳細については、以下の<a href="#parameter-reference">パラメータリファレンスを</a>参照してください。</p>
<p>3つのフォース マージ コンパクション モードが利用可能です：</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>以下に、各フォース・マージ・カンパクション・モードの使用例を示す。</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">デフォルト（標準コンパクション）</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">明示的ターゲットサイズ</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">自動サイズ計算</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">パラメータ参照</h4><p>以下の表は、パラメータについて説明したものです。</p>
<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>タイプ</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>必須。コンパクトにするコレクションの名前。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>オプション。MB 単位のターゲット・セグメント・サイズ。パラメータ値には3つのオプションがあります：</p><ul><li><p><strong>0 または省略</strong>: 設定された<code translate="no">dataCoord.segment.maxSize</code> を使用します (デフォルト: 512 MB)。標準のコンパクションと同じ。</p></li><li><p><strong>明示的な値</strong>：セグメントをMB単位で指定されたサイズ（例：2048）にマージする。設定された<code translate="no">dataCoord.segment.maxSize</code> 以上でなければならない。</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)：</strong>現在のセグメント分布と利用可能なノードリソースに基づいて最適なサイズを自動的に計算する。</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>指定された<code translate="no">target_size</code> が設定された<code translate="no">dataCoord.segment.maxSize</code> より小さい場合、リクエストはエラーで拒否される。</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">コンパクションの進行状況の確認<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>強制マージ コンパクションは非同期で実行されます。返されたジョブ ID を使用して進行状況を確認します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">ベストプラクティス<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>本番環境では強制マージ コンパクションを使用しないでください。</strong></p></li>
<li><p><strong>ほとんどの場合、自動サイズ計算モードを使用してください。</strong> <code translate="no">target_size</code> を<code translate="no">max_int64</code> に設定すると、Milvus がセグメント分布とノードリソースを分析して最適なサイズを決定します。特定のサイズ決定要件がない限り、この方法が推奨されます。</p></li>
<li><p><strong>パフォーマンスのトレードオフを考慮してください。</strong>強制マージコンパクションはリソースを大量に消費します。セグメントデータを読み取り、マージし、書き換えます。クエリーレイテンシーへの影響を最小にするため、トラフィックの少ない時間帯にスケジュールしてください。</p></li>
<li><p><strong>その前後でセグメント数を監視する。</strong> <code translate="no">get_compaction_state()</code> および<code translate="no">list_persistent_segments</code> を使用して、コンパクションによって予想よりも少ない、より大きなセグメントが生成されたことを確認します。</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Force Merge は標準的なコンパクションとどう違うのですか？</strong></p>
<p>これら 2 種類のコンパクション操作は目的が異なります。</p>
<ul>
<li><p>標準的なコンパクション（targetSize=0 または省略）は、最善の努力による漸進的なクリーンアップ・パスです。</p></li>
<li><p>強制マージ (targetSize&gt;0) は、コレクションレベルの再パッキングパスで、より少ない、より大きな、ターゲットに近いセグメントを作成します。</p></li>
</ul>
<p>標準的なコンパクションはタスクごとに m → 1 となるが、フォースマージはグループ化された入力全体で m → n となる。これが、標準的なコンパクションでは解決できないセグメントレイアウトを、フォースマージで解決できる理由です。次の表は、2 種類のオペレーションを比較したものである。</p>
<table>
   <tr>
     <th><p><strong>寸法</strong></p></th>
     <th><p><strong>標準コンパクション（デフォルト）</strong></p></th>
     <th><p><strong>フォース・マージ</strong></p></th>
   </tr>
   <tr>
     <td><p>APIトリガー</p></td>
     <td><p>targetSize=0（または未設定）、Major/L0フラグなし</p></td>
     <td><p>ターゲットサイズ&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>主な目標</p></td>
     <td><p>明らかなフラグメントのインクリメンタルなクリーンアップ。</p></td>
     <td><p>検索とバランスのためのコレクション全体の統合</p></td>
   </tr>
   <tr>
     <td><p>セグメントサイズのソース</p></td>
     <td><p>固定dataCoord.segment.maxSize (サーバ設定)</p></td>
     <td><p>ユーザーのtargetSize、その後maxSafeSizeで安全クランプ</p></td>
   </tr>
   <tr>
     <td><p>パラメータの有効性</p></td>
     <td><p>ユーザーサイズのチューニングなし</p></td>
     <td><p>ユーザ targetSize は &gt;= dataCoord.segment.maxSize でなければならない。</p></td>
   </tr>
   <tr>
     <td><p>安全上限</p></td>
     <td><p>コンフィグキャップのみ</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (スタンドアロン非プーリング：さらに半分になる)</p></td>
   </tr>
   <tr>
     <td><p>マージ形状</p></td>
     <td><p>m → 1タスクあたり、出力 &lt;= configMaxSize</p></td>
     <td><p>m → n, 出力がtargetSizeの近く</p></td>
   </tr>
   <tr>
     <td><p>中分割の挙動</p></td>
     <td><p>永久にスタックする可能性あり（例えば、2つの60%セグメントを合法的に1つの120%セグメントにすることはできない）</p></td>
     <td><p>リパック＋分割が機能。「60%でスタック」パターンはない</p></td>
   </tr>
   <tr>
     <td><p>コレクションをフラットにする能力</p></td>
     <td><p>限定的。繰り返し実行しても、多くのミディアムセグメントが残る可能性がある。</p></td>
     <td><p>セグメント数を減らし、充実度を高めるように設計されている。</p></td>
   </tr>
   <tr>
     <td><p>トポロジーの認識</p></td>
     <td><p>なし</p></td>
     <td><p>あり。QueryNode/レプリカ/シャードレイアウトを使用。</p></td>
   </tr>
   <tr>
     <td><p>リードパス並列性チューニング</p></td>
     <td><p>なし</p></td>
     <td><p>有効な場合、queryNodeCount / (replica × shards)を使用して出力数を調整する。</p></td>
   </tr>
   <tr>
     <td><p>典型的な使用例</p></td>
     <td><p>書き込み/削除後の毎日の高負荷クリーンアップ</p></td>
     <td><p>ベンチマーク準備、検索最適化、負荷並列アライメント</p></td>
   </tr>
   <tr>
     <td><p>スコープ</p></td>
     <td><p>コレクション全体のリパックを期待しない</p></td>
     <td><p>コレクションレベルのリパック結果を意図</p></td>
   </tr>
</table>
<p><strong>選択の指針</strong></p>
<ul>
<li><p>低リスクでインクリメンタルなクリーンアップには標準的なコンパクションを選択する。</p></li>
<li><p>強制マージを選択するのは、検索や読み込みの動作に合わせて、コレクションをより少ない、より大きなセグメントに再形成したい場合です。</p></li>
</ul>
<p><strong>強制マージはクラスタリングコンパクションとどう違うのですか？</strong></p>
<p><a href="/docs/ja/clustering-compaction.md">クラスタリングコンパクション</a>(<code translate="no">is_clustering=True</code>) は、クラスタリングキーに基づいてセグメント内のデータを再編成し、検索の枝刈りを改善します。強制マージ (<code translate="no">target_size=N</code>) は、データの分布を変えずにセグメントサイズを最適化します。最初にクラスタリングコンパクションを実行してデータを整理し、次に Force Merge を実行して結果のセグメントを統合します。</p>
<p><strong>クエリ実行中のコレクションに対して Force Merge を実行できますか？</strong></p>
<p>はい。Force Merge は非同期に実行され、クエリーをブロックしません。しかし、DataNode とディスク I/O リソースを消費するため、コンパクション中にクエリの待ち時間が増加する可能性があります。最良の結果を得るには、トラフィックの少ない時間帯に Force Merge をスケジュールしてください。</p>
<p><strong>target_size を maxSize より小さく設定するとどうなりますか？</strong></p>
<p>リクエストはエラーで拒否されます。ターゲット・サイズは設定された<code translate="no">dataCoord.segment.maxSize</code> 以上でなければなりません。</p>
