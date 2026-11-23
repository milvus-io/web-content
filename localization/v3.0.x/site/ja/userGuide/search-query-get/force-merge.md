---
id: force-merge.md
title: 強制マージ圧縮Compatible with Milvus 3.0.x
summary: フォースマージ圧縮を使用して、小さなセグメントを統合し、クエリのパフォーマンスとストレージ効率を向上させます。
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">強制マージ圧縮<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>強制マージは、小規模で断片化されたセグメントを、より少ない数の大きなセグメントに統合し、クエリのパフォーマンスとストレージ効率を向上させるように設計されています。このガイドでは、強制マージ・コンパクテーションの使用方法について説明します。</p>
<div class="alert note">
<p>この機能はパブリック プレビュー段階です。本番環境では使用しないでください。</p>
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
    </button></h2><p>標準の<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">コンパクテーションでは</a>、多対一のマージを通じてセグメントサイズを設定された<code translate="no">maxSize</code> 付近に維持しますが、制限を超えずにそれ以上マージできない中規模の断片が残ってしまう場合があります。 たとえば、下図に示すように、コレクションに 2 MB のセグメントが 5 つあり、<code translate="no">maxSize</code> が 3 MB の場合、任意の 2 つのセグメントをマージすると制限を超過してしまうため、標準のコンパクテーションではセグメント数をさらに減らすことができず、断片化されたレイアウトが残ってしまいます。</p>
<p>強制マージでは、<code translate="no">target_size</code> パラメータが追加され、可能な場合は、許容範囲内でセグメントを所望のサイズに再編成できるようになります。 以下に示すように、指定された<code translate="no">target_size</code> が4 MBの場合、5つの2 MBの小さなセグメントをさらに統合して、より少ない数の大きなセグメントにまとめることができます。これにより、余分なセグメント数が削減され、デフォルトの<code translate="no">maxSize</code> 設定よりも大きなターゲットサイズに対応できるようになります。また、ターゲットサイズが非常に大きい場合、システムは現在のハードウェアおよびQueryNodeトポロジに適した出力サイズとセグメント数を選択できるようになります。</p>
<p>どの圧縮方式を使用すべきかについては、<a href="#faq">FAQを</a>参照してください。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>「強制マージ圧縮」は、既存の <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> APIに<code translate="no">target_size</code> パラメータを追加します。これは完全な下位互換性を備えており、<code translate="no">target_size</code> を指定しない既存のコンパクション呼び出しは、これまで通り動作し続けます。</p>
<p>強制マージは非同期で動作します。実行中は I/O およびメモリリソースを消費しますが、検索やクエリ操作をブロックすることはありません。</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">強制マージ・コンパクションの使用<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus バージョン 3.0 以降</p></li>
<li><p>PyMilvus 3.0 以降</p></li>
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
    </button></h3><p>以下の設定パラメータは、強制マージの動作を制御します。これらを Milvus の設定ファイルまたは環境変数で設定してください。</p>
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
     <td><p>セグメントのデフォルト最大サイズ（MB）。<code translate="no">target_size</code> が0の場合、または省略された場合に目標値として使用されます。また、明示的な<code translate="no">target_size</code> の最小許容値としても機能します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>アルゴリズム選択のためのセグメント数しきい値。セグメント数がこの値を超えると、Milvusはマージ計画に高速な貪欲アルゴリズムを使用します。</p><ul><li><p><strong>標準アルゴリズム</strong>（segment_count &lt;=<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> の場合に使用）：より最適なマージ結果を生成しますが、計算に時間がかかります。</p></li><li><p><strong>貪欲アルゴリズム</strong>（セグメント数が<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> を超える場合に使用）：セグメントのグループ化が若干最適ではないという代償を払う代わりに、計画処理を大幅に高速に完了します。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>DataNode のメモリはこの係数で割られ、システムが許容できる最大のセグメントサイズが算出されます。</p><ul><li><p>値が大きいほど、マージに割り当てられるメモリは少なくなりますが、他の DataNode 操作に割り当てられるメモリが増えるため、ノードの安定性が向上します。</p></li><li><p>値を小さくすると、より大規模なマージが可能になりますが、メモリへの負荷が高まります。</p></li><li><p>たとえば、デフォルトの係数 4.0 で、16 GB のメモリを搭載した DataNode の場合、マージの予算は 4 GB になります。つまり、1 回の操作でマージされるセグメントの合計サイズは 4 GB を超えることはできません。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>QueryNode の最小メモリはこの係数で割られます。自動サイズ計算 (<code translate="no">target_size=max_int64</code>) 中に使用され、マージされたセグメントが QueryNode によって確実に読み込まれるようにします。</p><ul><li><p>値を大きくすると、セグメントのサイズが小さくなり、QueryNode による読み込みが容易になります。</p></li><li><p>値を小さくすると、より大きなセグメントが生成されますが、メモリに制約のある QueryNode では読み込みに失敗する可能性があります。</p></li><li><p>たとえば、デフォルトの係数 4.0 で、最小の QueryNode のメモリが 16 GB の場合、自動計算された目標サイズは 4 GB を超えません。これにより、Force Merge によって QueryNode が読み込めないほど大きなセグメントが生成されるのを防ぎます。</p></li></ul></td>
   </tr>
</table>
<p>上記の変更を Milvus クラスタに適用するには、「<a href="/docs/ja/configure-helm.md#Configure-Milvus-via-configuration-file">Helm を使用した Milvus の設定</a>」および「<a href="/docs/ja/configure_operator.md">Milvus Operator を使用した Milvus の設定</a>」の手順に従ってください。</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Force Merge コンパクションのトリガー<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Force Merge コンパクションは、<code translate="no">target_size</code> パラメータを指定して<code translate="no">compact()</code> を呼び出すことでトリガーします。パラメータの詳細については、以下の「<a href="#parameter-reference">パラメータリファレンス」を</a>参照してください。</p>
<p>利用可能な強制マージコンパクションモードは3つあります：</p>
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
<p>以下に、各強制マージ・コンパクション・モードの使用方法を示す例を示します。</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">デフォルト（標準コンパクション）</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">明示的なターゲットサイズ</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
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
<h4 id="Parameter-reference" class="common-anchor-header">パラメータリファレンス</h4><p>以下の表で、各パラメータについて説明します。</p>
<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>型</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>必須。圧縮対象のコレクションの名前。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>オプション。ターゲットのセグメントサイズ（MB単位）。このパラメータの値には3つのオプションがあります：</p><ul><li><p><strong>0 または省略</strong>：設定された<code translate="no">dataCoord.segment.maxSize</code> を使用します（デフォルト：512 MB）。標準の圧縮と同等です。</p></li><li><p><strong>明示的な値</strong>：セグメントを、指定されたサイズ（例：2048）に近くなるよう統合します。設定済みの<code translate="no">dataCoord.segment.maxSize</code> 以上である必要があります。</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>：現在のセグメント分布と利用可能なノードリソースに基づいて、最適なサイズを自動的に計算します。</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>指定された<code translate="no">target_size</code> が、設定された<code translate="no">dataCoord.segment.maxSize</code> よりも小さい場合、リクエストはエラーとして拒否されます。</p>
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
    </button></h3><p>強制マージコンパクションは非同期で実行されます。返されたジョブ ID を使用して進行状況を確認してください:</p>
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
<li><p><strong>本番環境では、強制マージコンパクションを使用しないでください。</strong></p></li>
<li><p><strong>ほとんどの場合、自動サイズ計算モードを使用してください。</strong> <code translate="no">target_size</code> を<code translate="no">max_int64</code> に設定すると、Milvusがセグメントの分布とノードリソースを分析し、最適なサイズを決定します。特定のサイズ要件がない限り、これが推奨されるアプローチです。</p></li>
<li><p><strong>パフォーマンス上のトレードオフを考慮してください。</strong>強制マージコンパクションはリソースを大量に消費する操作です。セグメントデータの読み取り、マージ、書き込みを行います。クエリのレイテンシへの影響を最小限に抑えるため、トラフィックが少ない時間帯にスケジュールしてください。</p></li>
<li><p><strong>処理前後のセグメント数を監視してください。</strong> <code translate="no">get_compaction_state()</code> および<code translate="no">list_persistent_segments</code> を使用して、コンパクションによって期待どおり、セグメント数が減少し、セグメントサイズが大きくなったことを確認してください。</p></li>
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
    </button></h2><p><strong>「強制マージ」と標準のコンパクションの違いは何ですか？</strong></p>
<p>これら2種類のコンパクション操作は、それぞれ異なる目的を果たします。</p>
<ul>
<li><p>標準のコンパクション（targetSize=0 または省略）は、ベストエフォート型の増分クリーンアップパスです。</p></li>
<li><p>強制マージ（targetSize&gt;0）は、コレクションレベルの再パッキング処理であり、より少なく、より大きく、目標サイズに近いセグメントを生成します。</p></li>
</ul>
<p>主な違いはマージの形状です。標準の圧縮は、タスクごとに実質的に m → 1 となるのに対し、強制マージはグループ化された入力全体で m → n となります。これが、強制マージが標準の圧縮では解決できないセグメントのレイアウトを解決できる理由です。次の表は、これら 2 種類の操作を比較したものです。</p>
<table>
   <tr>
     <th><p><strong>次元</strong></p></th>
     <th><p><strong>標準コンパクション（デフォルト）</strong></p></th>
     <th><p><strong>強制マージ</strong></p></th>
   </tr>
   <tr>
     <td><p>API トリガー</p></td>
     <td><p>targetSize=0（または未設定）、Major/L0フラグなし</p></td>
     <td><p>targetSize &gt; 0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>主な目的</p></td>
     <td><p>明らかなフラグメントの段階的なクリーンアップ；定期的なメンテナンス</p></td>
     <td><p>検索およびバランス調整のためのコレクション全体の統合</p></td>
   </tr>
   <tr>
     <td><p>セグメントサイズのソース</p></td>
     <td><p>dataCoord.segment.maxSize（サーバー設定）で固定</p></td>
     <td><p>ユーザーが指定した targetSize を基に、maxSafeSize によって安全にクリップされる</p></td>
   </tr>
   <tr>
     <td><p>パラメータの有効性</p></td>
     <td><p>ユーザーによるサイズ調整は不可</p></td>
     <td><p>ユーザーの targetSize は dataCoord.segment.maxSize 以上でなければならない。そうでない場合は拒否される</p></td>
   </tr>
   <tr>
     <td><p>安全上界</p></td>
     <td><p>設定上限のみ</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor（スタンドアロン、非プーリングの場合：さらに半減）</p></td>
   </tr>
   <tr>
     <td><p>マージ形状</p></td>
     <td><p>m → タスクごとに 1、出力 &lt;= configMaxSize</p></td>
     <td><p>m → n、出力は targetSize 付近</p></td>
   </tr>
   <tr>
     <td><p>中セグメントの挙動</p></td>
     <td><p>永久にスタックする可能性がある（例えば、2つの60%のセグメントは、規則上1つの120%のセグメントにはなれない）</p></td>
     <td><p>再パッケージ化＋分割が機能する。「60%でスタックする」というパターンは発生しない</p></td>
   </tr>
   <tr>
     <td><p>コレクションの平坦化能力</p></td>
     <td><p>限定的。繰り返し実行しても、多くの中規模セグメントが残る可能性がある</p></td>
     <td><p>強力。セグメント数を減らし、充填率をさらに高めるよう設計されている</p></td>
   </tr>
   <tr>
     <td><p>トポロジーの認識</p></td>
     <td><p>なし</p></td>
     <td><p>あり；QueryNode／レプリカ／シャードのレイアウトを利用する</p></td>
   </tr>
   <tr>
     <td><p>読み取りパス並列性のチューニング</p></td>
     <td><p>なし</p></td>
     <td><p>有効な場合、queryNodeCount / (レプリカ数 × シャード数) を使用して出力数を調整します</p></td>
   </tr>
   <tr>
     <td><p>代表的なユースケース</p></td>
     <td><p>書き込み／削除後の、チャーン率の高い日次クリーンアップ</p></td>
     <td><p>ベンチマークの準備、検索の最適化、ロード並列性の調整</p></td>
   </tr>
   <tr>
     <td><p>想定される範囲</p></td>
     <td><p>コレクション全体の再パックは想定しない</p></td>
     <td><p>コレクションレベルでの再パッキング結果を想定</p></td>
   </tr>
</table>
<p><strong>選択の指針：</strong></p>
<ul>
<li><p>リスクが低く、段階的なクリーンアップを行う場合は、標準のコンパクションを選択してください。</p></li>
<li><p>検索や読み込みの挙動に合わせて、コレクションを明示的により少ない数の大きなセグメントに再構成したい場合は、「強制マージ」を選択してください。</p></li>
</ul>
<p><strong>「強制マージ」と「クラスタリング・コンパクテーション」の違いは何ですか？</strong></p>
<p>クラスタリング・コンパクション（<code translate="no">is_clustering=True</code> ）は、検索のプリニングを改善するために、クラスタリング・キーに基づいてセグメント内のデータを再編成します。強制マージ（<code translate="no">target_size=N</code> ）は、データの分布を変更することなくセグメントサイズを最適化します。これらは異なる目的を果たし、併用することも可能です。まずクラスタリング・コンパクションを実行してデータを整理し、その後、強制マージを実行して結果として得られたセグメントを統合します。</p>
<p><strong>クエリが実行中のコレクションに対してフォースマージを実行できますか？</strong></p>
<p>はい。Force Merge は非同期で実行されるため、クエリをブロックすることはありません。ただし、DataNode およびディスク I/O リソースを消費するため、コンパクション中はクエリのレイテンシが増加する可能性があります。最良の結果を得るには、トラフィックが少ない時間帯に Force Merge をスケジュールしてください。</p>
<p><strong>target_size を maxSize より小さく設定した場合はどうなりますか？</strong></p>
<p>リクエストはエラーとして拒否されます。ターゲットサイズは、設定された<code translate="no">dataCoord.segment.maxSize</code> 以上である必要があります。</p>
