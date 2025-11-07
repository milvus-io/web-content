---
id: warm-up.md
title: ウォームアップCompatible with Milvus 2.6.4+
summary: >-
  Milvusでは、Warm Upは、コールドデータが初めてアクセスされたときに発生するファーストヒットレイテンシを緩和することによって、Tiered
  Storageを補完する。ウォームアップが設定されると、セグメントがクエリ可能になる前に、選択されたタイプのフィールドやインデックスがキャッシュにプリロードされ、頻繁にアクセスされるデータがロード後すぐに利用できるようになる。
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">ウォームアップ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusの<strong>Warm Upは</strong>、コールドデータが初めてアクセスされる際に発生するファーストヒットレイテンシを緩和することで、Tiered Storageを補完します。ウォームアップを設定すると、セグメントがクエリ可能になる前に、選択されたタイプのフィールドやインデックスがキャッシュにプリロードされ、頻繁にアクセスされるデータがロード後すぐに利用できるようになります。</p>
<h2 id="Why-warm-up" class="common-anchor-header">ウォームアップの理由<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p>ティアード・ストレージの<a href="/docs/ja/tiered-storage-overview.md#Phase-1-Lazy-load">レイジー・ロードは</a>、メタデータのみを最初にロードすることで効率を向上させる。しかし、必要なチャンクやインデックスをオブジェクトストレージからフェッチする必要があるため、コールドデータへの最初のクエリで待ち時間が発生する可能性があります。</p>
<p><strong>ウォームアップは</strong>、セグメントの初期化中に重要なデータを積極的にキャッシュすることで、この問題を解決します。</p>
<p>特に以下のような場合に有効です：</p>
<ul>
<li><p>特定のスカラー・インデックスがフィルター条件で頻繁に使用される。</p></li>
<li><p>ベクトル・インデックスは検索パフォーマンスに不可欠であり、すぐに準備する必要がある。</p></li>
<li><p>QueryNode 再起動後または新規セグメントロード後のコールドスタート待ち時間は容認できない。</p></li>
</ul>
<p>対照的に、ウォームアップは、クエリーの頻度が低いフィールドやインデックスには<strong>推奨されません</strong>。ウォームアップを無効にすると、セグメントのロード時間が短縮され、キャッシュ領域が節約される。</p>
<h2 id="Configuration" class="common-anchor-header">構成<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>ウォームアップは、<code translate="no">milvus.yaml</code> の<code translate="no">queryNode.segcore.tieredStorage.warmup</code> で制御されます。 スカラー・フィールド、スカラー・インデックス、ベクター・フィールド、およびベクター・インデックスに対して個別に設定できます。各ターゲットは2つのモードをサポートしています：</p>
<table>
   <tr>
     <th><p>モード</p></th>
     <th><p>説明</p></th>
     <th><p>典型的なシナリオ</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>セグメントがクエリ可能になる前にプリロードする。ロード時間は若干長くなるが、最初のクエリに待ち時間は発生しない。</p></td>
     <td><p>検索で使用される高頻度のスカラー・インデックスやキー・ベクター・インデックスなど、即座に利用可能でなければならないパフォーマンス・クリティカルなデータに使用する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>プリロードをスキップする。セグメントはより速くクエリ可能になるが、最初のクエリがオンデマンドローディングのトリガーになる可能性がある。</p></td>
     <td><p>未加工のベクトルフィールドや重要でないスカラーフィールドのような、アクセス頻度の低いデータや大きなデータに使います。</p></td>
   </tr>
</table>
<p><strong>YAMLの例</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>値</p></th>
     <th><p>説明</p></th>
     <th><p>推奨される使用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>スカラーフィールドのデータをプリロードするかどうかを制御する。</p></td>
     <td><p>スカラー・フィールドが小さく、フィルターで頻繁にアクセスされる場合のみ、<code translate="no">sync</code> を使用する。そうでない場合は、<code translate="no">disable</code> を使用してロード時間を短縮する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>スカラー・インデックスをプリロードするかどうかを制御する。</p></td>
     <td><p>頻繁なフィルター条件や範囲クエリーに関係するスカラー・インデックスには<code translate="no">sync</code> を使用する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>ベクトル・フィールド・データをプリロードするかどうかを制御する。</p></td>
     <td><p>キャッシュの大量使用を避けるため、通常は<code translate="no">disable</code> を使用する。<code translate="no">sync</code> を有効にするのは、検索後すぐに生のベクトルを取得する必要がある場合のみである（例えば、ベクトル・リコールによる類似結果）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>ベクトルインデックスをプリロードするかどうかを制御します。</p></td>
     <td><p>検索レイテンシにとって重要なベクトルインデックスには<code translate="no">sync</code> を使用する。バッチまたは低頻度のワークロードでは、<code translate="no">disable</code> を使用すると、セグメントの準備が速くなります。</p></td>
   </tr>
</table>
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
    </button></h2><p>ウォームアップは最初のロードにのみ影響する。キャッシュされたデータが後で削除された場合、次のクエリではオンデマンドで再ロードされます。</p>
<ul>
<li><p><code translate="no">sync</code> を使いすぎないようにする。多くのフィールドをプリロードしすぎると、ロード時間が長くなり、キャッシュに負担がかかります。</p></li>
<li><p>ウォームアップは控えめに開始し、頻繁にアクセスされるフィールドとインデックスに対してのみ有効にします。</p></li>
<li><p>クエリの待ち時間とキャッシュのメトリクスを監視し、必要に応じてプリロードを拡張します。</p></li>
<li><p>作業負荷が混在している場合は、<code translate="no">sync</code> をパフォーマンス重視のコレクションに適用し、<code translate="no">disable</code> をキャパシティ重視のコレクションに適用します。</p></li>
</ul>
