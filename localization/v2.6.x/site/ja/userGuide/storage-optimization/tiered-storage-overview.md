---
id: tiered-storage-overview.md
title: 階層型ストレージの概要Compatible with Milvus 2.6.4+
summary: >-
  Milvusでは、従来のフルロードモードでは、各QueryNodeは初期化時にセグメントの全てのデータフィールドとインデックスをロードする必要があります。これは即座にデータを利用できるようにしますが、特に大規模なデータセットを扱う場合、高いメモリ使用量、重いディスクアクティビティ、大きなI/Oオーバーヘッドなど、リソースの浪費につながることがよくあります。
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">階層型ストレージの概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、従来の<em>フルロードモードでは</em>、各QueryNodeが初期化時に<a href="/docs/ja/glossary.md#Segment">セグメントの</a>全てのデータフィールドとインデックスをロードする必要があります。これにより、即座にデータを利用できるようになりますが、特に大規模なデータセットを扱う場合、高いメモリ使用量、重いディスクアクティビティ、大きなI/Oオーバーヘッドなど、リソースの浪費につながることがよくあります。</p>
<p><em>ティアード・ストレージは</em>、データ・キャッシングをセグメントのロードから切り離すことで、この課題に対処します。Milvusは、すべてのデータを一度にロードする代わりに、ホットデータ（ローカルにキャッシュされたデータ）とコールドデータ（リモートで保存されたデータ）を区別するキャッシュレイヤーを導入します。QueryNodeは軽量な<em>メタデータのみを</em>最初にロードし、オンデマンドで動的にデータをプルまたはエヴィッシュします。これにより、ロード時間が大幅に短縮され、ローカルリソースの使用率が最適化され、QueryNodeは物理メモリやディスク容量をはるかに超えるデータセットを処理できるようになります。</p>
<p>以下のようなシナリオでは、Tiered Storageを有効にすることを検討してください：</p>
<ul>
<li><p>単一のQueryNodeで利用可能なメモリまたはNVMe容量を超えるコレクション</p></li>
<li><p>ファーストクエリのレイテンシよりも、より高速なロードが重要な分析ワークロードまたはバッチワークロード</p></li>
<li><p>アクセス頻度の低いデータのキャッシュミスを許容できる混合ワークロード</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>メタデータには</em>、スキーマ、インデックス定義、チャンクマップ、行数、リモートオブジェクトへの参照が含まれる。この種のデータは小さく、常にキャッシュされ、削除されることはない。</p></li>
<li><p>セグメントとチャンクの詳細については、<a href="/docs/ja/glossary.md#Segment">セグメント</a> を参照。</p></li>
</ul>
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
    </button></h2><p>Tiered StorageはQueryNodeがセグメントデータを管理する方法を変更します。ロード時にすべてのフィールドとインデックスをキャッシュする代わりに、QueryNodeはメタデータのみをロードし、キャッシュレイヤーを使用して動的にデータをフェッチおよびエヴィクトします。</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">フルロードモードとティアードストレージモードの比較<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>フルロードモードと階層化ストレージモードはどちらも同じデータを扱いますが、QueryNodeがこれらのコンポーネントをキャッシュする<em>タイミングと</em> <em>方法が</em>異なります。</p>
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
    </button></h3><p>Tiered Storageでは、ワークフローは以下のフェーズに分かれます：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/load-workflow.png" alt="Load Workflow" class="doc-image" id="load-workflow" />
   </span> <span class="img-wrapper"> <span>ロードワークフロー</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">フェーズ1: 遅延ロード</h4><p>初期化時、Milvusは遅延ロードを実行し、スキーマ定義、インデックス情報、チャンクマッピングなどのセグメントレベルのメタデータのみをキャッシュします。</p>
<p>この段階では実際のフィールドデータやインデックスファイルはキャッシュされません。これにより、メモリとディスクの消費を最小限に抑えながら、コレクションを起動後すぐにクエリ可能にすることができます。</p>
<p>フィールドデータとインデックスファイルは最初にアクセスされるまでリモートストレージに残るため、<em>最初のクエリは</em>必要なデータをオンデマンドでフェッチする必要があり、さらに待ち時間が発生する可能性があります。クリティカルなフィールドやインデックスについてこの影響を軽減するには、<a href="/docs/ja/tiered-storage-overview.md#Phase-2-Warm-up">ウォームアップ</a>戦略を使用して、セグメントがクエリ可能になる前にそれらを事前にロードすることができます。</p>
<p><strong>構成</strong></p>
<p>Tiered Storageを有効にすると自動的に適用されます。その他の手動設定は必要ありません。</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">フェーズ2：ウォームアップ</h4><p><a href="/docs/ja/tiered-storage-overview.md#Phase-1-Lazy-load">遅延ロードによって</a>もたらされるファーストヒットレイテンシを削減するために、Milvusは*Warm Upメカニズムを提供します。</p>
<p>セグメントがクエリ可能になる前に、Milvusはオブジェクトストレージから特定のフィールドまたはインデックスをプロアクティブにフェッチしてキャッシュし、最初のクエリがオンデマンドロードをトリガする代わりにキャッシュされたデータに直接ヒットするようにします。</p>
<p><strong>設定</strong></p>
<p>ウォームアップ設定は<strong>milvus.yamlの</strong>Tiered Storageセクションで定義されます。フィールドまたはインデックスタイプごとにプリロードを有効または無効にし、優先するストラテジーを指定できます。構成例については<a href="/docs/ja/warm-up.md">ウォームアップを</a>参照してください。</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">フェーズ 3: 部分ロード</h4><p>クエリまたは検索が開始されると、QueryNode は<em>パーシャルロードを</em>実行し、オブジェクトストレージから必要なデータチャンクまたはインデックスファイルのみをフェッチします。</p>
<ul>
<li><p><strong>フィールド</strong>：<strong>チャンクレベルで</strong>オンデマンドにロードされます。現在のクエリ条件に一致するデータチャンクのみがフェッチされ、I/Oとメモリの使用を最小限に抑えます。</p></li>
<li><p><strong>インデックス</strong>：<strong>セグメント・</strong>レベルでオンデマンドでロードされます。インデックス・ファイルは完全な単位としてフェッチされる必要があり、チャンク間で分割することはできません。</p></li>
</ul>
<p><strong>構成</strong></p>
<p>部分ロードは、Tiered Storageが有効な場合に自動的に適用される。手動設定は不要。クリティカルなデータのファーストヒットレイテンシを最小化するには、<a href="/docs/ja/warm-up.md">ウォームアップと</a>組み合わせます。</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">フェーズ4: エビクション</h4><p>健全なリソース利用を維持するため、Milvusはしきい値に達すると未使用のキャッシュデータを自動的に解放します。</p>
<p>退避は<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU(Least Recently Used)</a>ポリシーに従い、アクセス頻度の低いデータが最初に削除され、アクティブなデータはキャッシュに残ります。</p>
<p>立ち退きは、以下の設定可能な項目によって管理されます：</p>
<ul>
<li><p><strong>ウォーターマーク</strong>：メモリまたはディスクのしきい値を定義して、立ち退きのトリガーと停止を設定します。</p></li>
<li><p><strong>キャッシュTTL</strong>: 定義された非アクティブ時間が経過すると、古いキャッシュ・データを削除します。</p></li>
<li><p><strong>オーバーコミット率</strong>：積極的な立ち退きを開始する前に一時的なキャッシュのオーバーサブスクリプションを許可し、短期的なワークロードの急増を吸収するのに役立ちます。</p></li>
</ul>
<p><strong>構成</strong></p>
<p><strong>milvus.yamlで</strong>evictionパラメータを有効にして調整します。詳細な設定については、「<a href="/docs/ja/eviction.md">Eviction</a>」を参照してください。</p>
<h2 id="Getting-started" class="common-anchor-header">開始<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
<li><p>milvus 2.6.4以上</p></li>
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
    </button></h3><p>いいえ。オーバーコミット比率により、QueryNodeは物理メモリが許容するよりも多くのセグメントを扱うことができますが、高すぎる比率は頻繁な立ち退き、キャッシュのスラッシング、クエリの失敗を引き起こす可能性があります。</p>
