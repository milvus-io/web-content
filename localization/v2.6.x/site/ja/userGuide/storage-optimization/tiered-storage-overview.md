---
id: tiered-storage-overview.md
title: 階層ストレージの概要Compatible with Milvus 2.6.4+
summary: >-
  Milvusでは、従来のフルロードモードでは、各QueryNodeは初期化時にセグメントの全てのスキーマフィールドとインデックスを、たとえアクセスされることのないデータであってもロードする必要があります。これは即座にデータを利用できるようにしますが、特に大規模なデータセットを扱う場合、高いメモリ使用量、重いディスクアクティビティ、大きなI/Oオーバーヘッドなど、リソースの浪費につながることがよくあります。
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">階層ストレージの概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、従来の<strong>フルロードモードでは</strong>、各QueryNodeは初期化時に<a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">セグメントの</a>全てのスキーマフィールドとインデックスを、たとえアクセスされることのないデータであってもロードする必要があります。これにより、即座にデータを利用できるようになりますが、特に大規模なデータセットを扱う場合、メモリ使用量の多さ、ディスク使用量の多さ、I/Oオーバーヘッドの大きさなど、リソースの浪費につながることがよくあります。</p>
<p><strong>ティアード・ストレージは</strong>、データ・キャッシングをセグメントのロードから切り離すことで、この課題に対処します。Milvusは、すべてのデータを一度にロードする代わりに、ホットデータ（ローカルにキャッシュされたデータ）とコールドデータ（リモートで保存されたデータ）を区別するキャッシュレイヤーを導入します。QueryNodeは軽量なメタデータのみを最初にロードし、オンデマンドで動的にデータをプルまたはエヴィッシュします。これにより、ロード時間が大幅に短縮され、ローカルリソースの使用率が最適化され、QueryNodeは物理メモリまたはディスク容量をはるかに超えるデータセットを処理できるようになります。</p>
<p>以下のようなシナリオでは、Tiered Storageの有効化を検討できます：</p>
<ul>
<li><p>単一のQueryNodeで利用可能なメモリまたはNVMe容量を超えるコレクション</p></li>
<li><p>ファーストクエリのレイテンシよりも、より高速なロードが重要な分析ワークロードまたはバッチワークロード</p></li>
<li><p>アクセス頻度の低いデータのキャッシュミスを許容できる混合ワークロード</p></li>
</ul>
<div class="alert note">
<p>セグメントとチャンクの詳細については、<a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">セグメントの説明を</a>参照してください。</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storageは、QueryNodeがセグメントデータを管理する方法を変更します。ロード時にすべてのフィールドとインデックスをキャッシュする代わりに、QueryNodeは<strong>メタデータのみを</strong>ロードし、キャッシュレイヤーを使用して動的にデータをフェッチおよびエヴィクトします。</p>
<div class="alert note">
<p><strong>メタデータには</strong>スキーマ、インデックス定義、チャンクマップ、行数、リモートオブジェクトへの参照が含まれます。このデータは小さく、常にキャッシュされ、決して削除されることはない。</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">フルロード・モードとティアード・ストレージ・モードの比較<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>フルロードモードと階層化ストレージモードはどちらも同じデータを扱いますが、QueryNodeがこれらのコンポーネントをキャッシュするタイミングと方法が異なります。</p>
<ul>
<li><p><strong>フルロードモード</strong>：ロード時に、QueryNodeはメタデータ、フィールドデータ、インデックスを含む完全なコレクションデータをオブジェクトストレージからキャッシュします。</p></li>
<li><p><strong>階層ストレージモード</strong>：ロード時に、QueryNodeはメタデータのみをキャッシュします。フィールドデータはチャンク単位でオンデマンドでプルされます。インデックス・ファイルは、最初のクエリが必要とするまでリモートのままです。その後、セグメントごとのインデックス全体がフェッチされ、キャッシュされます。</p></li>
</ul>
<p>下図はこれらの違いを示している。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>フルロードモードと階層化ストレージモード</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">QueryNodeロードワークフロー<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Tiered Storageでは、ワークフローには3つのフェーズがあります：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>クエリノード・ロード・ワークフロー</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">遅延ロード</h4><p>初期化時、Milvusは遅延ロードを実行し、スキーマ定義、インデックス情報、チャンクマッピング、行数を含む<strong>メタデータのみを</strong>キャッシュします。</p>
<p>この段階ではフィールドデータやインデックスファイルはダウンロードされません。これにより、コレクションをすばやくクエリ可能にし、起動時のリソースの使用を最小限に抑えます。</p>
<p><strong>利点</strong></p>
<ul>
<li><p>コレクションのロード時間が大幅に短縮</p></li>
<li><p>最小限のメモリとディスクフットプリント</p></li>
<li><p>クエリノードがより多くのセグメントを同時に処理可能</p></li>
</ul>
<p><strong>構成</strong></p>
<p>Tiered Storageを有効にすると自動的に適用されます。手動設定は不要</p>
<h4 id="Partial-load" class="common-anchor-header">部分ロード</h4><p>クエリまたは検索操作が開始されると、QueryNode は部分ロードを実行し、必要なフィールド・チャンクまたはインデックスのみをオブジェクト・ストレージからフェッチし、再利用のために一時的にキャッシュします。</p>
<ul>
<li><p><strong>フィールド</strong>：<strong>チャンクレベルで</strong>オンデマンドにロード</p></li>
<li><p><strong>インデックス：</strong> <strong>セグメント</strong>レベルで初めてアクセスされたときにロードされる。</p></li>
</ul>
<p><strong>利点</strong></p>
<ul>
<li><p>メモリとディスクへの負荷を軽減</p></li>
<li><p>Milvusによる大規模データセットの効率的なクエリが可能</p></li>
<li><p>クエリレイテンシとリソース効率のバランス</p></li>
</ul>
<p><strong>構成</strong></p>
<p>部分ロードは、Tiered Storageが有効な場合のデフォルトの動作です。クリティカルなフィールドやインデックスのファーストヒットレイテンシを最小化するには、<strong>ウォームアップを</strong>使用してクエリ前にデータをプリロードします。構成例については<a href="/docs/ja/warm-up.md">Warm Upを</a>参照してください。</p>
<h4 id="Eviction" class="common-anchor-header">立ち退き</h4><p>リソースの健全な使用を維持するため、Milvusはしきい値に達すると未使用のキャッシュデータを自動的に解放します。</p>
<p>退避は<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU（Least Recently Used）</a>ポリシーに従い、設定可能なパラメータによって管理されます：</p>
<ul>
<li><p><strong>透かし：</strong>消去の開始と停止のしきい値を定義します。</p></li>
<li><p><strong>キャッシュTTL:</strong>定義された期間が経過すると、古くなったキャッシュ項目を削除します。</p></li>
<li><p><strong>オーバーコミット率：</strong>退去が加速する前に一時的なオーバーサブスクリプションを許可します。</p></li>
</ul>
<p><strong>利点</strong></p>
<ul>
<li><p>ワークロード全体でキャッシュ使用量を安定させる</p></li>
<li><p>クラッシュを防止しながらキャッシュの再利用を最大化</p></li>
<li><p>長期間にわたって予測可能なパフォーマンスを維持</p></li>
</ul>
<p><strong>構成</strong></p>
<p><code translate="no">milvus.yaml</code> で、立ち退きパラメータを有効にして調整する。詳細な構成については、「<a href="/docs/ja/eviction.md">Eviction</a>」を参照してください。</p>
<h2 id="Getting-started" class="common-anchor-header">はじめに<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
<li><p>Milvus 2.6.4 以上</p></li>
<li><p>専用のメモリとディスクリソースを持つQueryNode</p></li>
<li><p>オブジェクトストレージバックエンド（S3、MinIOなど）</p></li>
</ul>
<div class="alert warning">
<p>QueryNodeリソースは他のワークロードと共有しないでください。リソースを共有すると、Tiered Storageが利用可能な容量を誤って判断し、クラッシュにつながる可能性があります。</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">基本構成テンプレート<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus設定ファイル(<code translate="no">milvus.yaml</code>)を編集して、Tiered Storage設定を行います：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">次のステップ<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>ウォームアップの設定</strong>- アクセスパターンに合わせてプリロードを最適化します。<a href="/docs/ja/warm-up.md">ウォームアップを</a>参照してください。</p></li>
<li><p><strong>Tune Eviction</strong>- リソースの制約に合わせて適切な透かしとTTLを設定します。<a href="/docs/ja/eviction.md">立ち退き</a>」を参照してください。</p></li>
<li><p><strong>パフォーマンスを監視する</strong>- キャッシュ・ヒット率、退避頻度、およびクエリ・レイテンシのパターンを追跡します。</p></li>
<li><p><strong>設定の反復</strong>- 観察されたワークロード特性に基づいて設定を調整します。</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">実行時にTiered Storageパラメータを変更できますか?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>全てのパラメータはmilvusを起動する前に<code translate="no">milvus.yaml</code> 。変更を有効にするには再起動が必要です。</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">Tiered Storageはデータの耐久性に影響しますか?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。データの永続性はリモートオブジェクトストレージによって処理されます。Tiered StorageはQueryNode上のキャッシュのみを管理します。</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">Tiered Storageを使用するとクエリは常に速くなりますか？<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>必ずしもそうではありません。Tiered Storageはロード時間とリソース使用量を削減しますが、キャッシュされていない（コールド）データに触れるクエリは待ち時間が長くなる可能性があります。レイテンシーに敏感なワークロードには、フルロードモードを推奨します。</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Tiered Storageを有効にしてもQueryNodeのリソースが不足するのはなぜですか？<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>よくある原因は2つあります：</p>
<ul>
<li><p>QueryNodeのリソースが少なすぎる。ウォーターマークは利用可能なリソースに対する相対的なものなので、プロビジョニング不足は判断を誤らせます。</p></li>
<li><p>QueryNodeリソースは他のワークロードと共有されるため、Tiered Storageは実際に利用可能な容量を正しく評価できません。</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">高い同時実行数で失敗するクエリがあるのはなぜですか？<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>多くのクエリが同時にホットデータをヒットした場合、QueryNodeリソースの制限を超える可能性があります。リソース予約のタイムアウトが原因で失敗するスレッドもあります。負荷が下がってから再試行するか、より多くのリソースを割り当てることで解決できます。</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Tiered Storageを有効にすると、検索/クエリの待ち時間が長くなるのはなぜですか？<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>考えられる原因は以下のとおりです：</p>
<ul>
<li><p>ストレージから取得する必要があるコールドデータへのクエリが頻繁に発生する。</p></li>
<li><p>オーバーコミット比率が高すぎるため、頻繁な退避が発生する。</p></li>
<li><p>ウォーターマークが近すぎるため、同期消去が頻繁に発生する。</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">ティアード・ストレージは、キャッシュをオーバーコミットすることで無制限のデータを扱うことができますか？<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。オーバーコミット比率により、QueryNodeは物理メモリが許容するよりも多くのセグメントを扱うことができますが、高すぎる比率は頻繁な立ち退き、キャッシュのスラッシング、またはクエリの失敗につながる可能性があります。</p>
