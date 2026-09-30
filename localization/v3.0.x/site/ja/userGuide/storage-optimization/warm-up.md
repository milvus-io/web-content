---
id: warm-up.md
title: ウォームアップCompatible with Milvus 2.6.4+
summary: >-
  ウォームアップは、セグメントがクエリ可能になる前に、選択したフィールドまたはインデックスをキャッシュにプリロードすることで、Tiered
  Storageを補完します。ウォームアップは、クラスタ、コレクション、または個々のフィールド/インデックスのレベルで構成でき、最初のクエリのレイテンシとリソースの使用量をきめ細かく制御できます。
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
    </button></h1><p><strong>ウォームアップは</strong>、セグメントがクエリ可能になる前に、選択したフィールドまたはインデックスをキャッシュにプリロードすることで、Tiered Storageを補完します。ウォームアップは、クラスタ、コレクション、または個々のフィールド/インデックス・レベルで構成でき、最初のクエリのレイテンシとリソース使用量をきめ細かく制御できます。</p>
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
    </button></h2><p>Tiered Storageの<a href="/docs/ja/tiered-storage-overview.md#Phase-1-Lazy-load">Lazy Loadは</a>、メタデータのみを最初にロードすることで効率を向上させます。しかし、必要なチャンクやインデックスをリモートストレージからフェッチする必要があるため、コールドデータへの最初のクエリで待ち時間が発生する可能性があります。</p>
<p><strong>ウォームアップは</strong>、セグメントの初期化中に重要なデータを積極的にキャッシュすることで、この問題を解決します。</p>
<p>特に以下のような場合に有効です：</p>
<ul>
<li><p>特定のスカラー・インデックスがフィルター条件で頻繁に使用される。</p></li>
<li><p>ベクトル・インデックスは検索パフォーマンスに不可欠であり、すぐに準備する必要がある。</p></li>
<li><p>QueryNode 再起動後または新規セグメントロード後のコールドスタート待ち時間は容認できない。</p></li>
</ul>
<p>対照的に、ウォームアップは、クエリの頻度が低いフィールドやインデックスには<strong>推奨されません</strong>。ウォームアップを無効にすると、セグメントのロード時間が短縮され、キャッシュ領域が節約されます。これは、大きなベクトルフィールドや重要でないスカラーフィールドに最適です。</p>
<h2 id="Configuration-levels" class="common-anchor-header">構成レベル<button data-href="#Configuration-levels" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p><strong>レベル</strong></p></th>
     <th><p><strong>設定範囲</strong></p></th>
     <th><p><strong>設定方法</strong></p></th>
     <th><p><strong>優先度</strong></p></th>
   </tr>
   <tr>
     <td><p>フィールド/インデックス</p></td>
     <td><p>単一のフィールドまたはインデックス</p></td>
     <td><p>SDKのメソッド： </p><ul><li><p><code translate="no">add_field()</code></p></li><li><p><code translate="no">alter_collection_field()</code></p></li><li><p><code translate="no">add_index()</code></p></li><li><p><code translate="no">alter_index_properties()</code></p></li></ul></td>
     <td><p>最高</p></td>
   </tr>
   <tr>
     <td><p>コレクション</p></td>
     <td><p>コレクション内のすべてのフィールド/インデックス</p></td>
     <td><p>SDKメソッド：</p><ul><li><p><code translate="no">create_collection()</code></p></li><li><p><code translate="no">alter_collection_properties()</code></p></li></ul></td>
     <td><p>中</p></td>
   </tr>
   <tr>
     <td><p>クラスタ</p></td>
     <td><p>クラスタ内のすべてのコレクション</p></td>
     <td><p><code translate="no">milvus.yaml</code> 設定ファイル</p></td>
     <td><p>最低（デフォルト）</p></td>
   </tr>
</table>
<p><strong>オーバーライド動作：</strong></p>
<ul>
<li><p>フィールドに独自のウォームアップ設定がある場合、その設定はコレクションレベルおよびクラスタレベルの設定よりも優先されます。</p></li>
<li><p>フィールド・レベルまたはインデックス・レベルの設定が存在しない場合は、コレクション・レベルの設定が適用されます。</p></li>
<li><p>フィールド・レベルまたはインデックス・レベルの設定もコレクション・レベルの設定も存在しない場合は、クラスタ・レベルの設定が適用されます。</p></li>
<li><p>alter操作を使用すると、最新のalter値が有効になります。</p></li>
</ul>
<h2 id="Configure-warmup-at-cluster-level" class="common-anchor-header">クラスタレベルでのウォームアップの構成<button data-href="#Configure-warmup-at-cluster-level" class="anchor-icon" translate="no">
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
    </button></h2><p>クラスタレベルのウォームアップはMilvus設定ファイル<code translate="no">milvus.yaml</code> で設定され、クラスタ内のすべてのコレクションに適用されます。これはベースラインのデフォルトとして機能します。</p>
<p>各ターゲットタイプは2つの設定をサポートしています：</p>
<table>
   <tr>
     <th><p>ウォームアップ設定</p></th>
     <th><p>説明</p></th>
     <th><p>典型的なシナリオ</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>セグメントがクエリ可能になる前にプリロードする。ロード時間は若干長くなるが、最初のクエリに待ち時間は発生しない。</p></td>
     <td><p>検索で使用される高頻度のスカラー・インデックスやキー・ベクター・インデックスなど、すぐに利用可能でなければならないパフォーマンス・クリティカルなデータに使用する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>プリロードをスキップする。セグメントはより速くクエリ可能になるが、最初のクエリがオンデマンドローディングのトリガーとなる可能性がある。</p></td>
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
     <th><p>ウォームアップ設定</p></th>
     <th><p>説明</p></th>
     <th><p>推奨される使用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>スカラーフィールドのデータをプリロードするかどうかを制御する。</p></td>
     <td><p>スカラー・フィールドが小さく、フィルターで頻繁にアクセスされる場合のみ、<code translate="no">sync</code> 。そうでない場合は、<code translate="no">disable</code> を使用してロード時間を短縮する。</p></td>
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
     <td><p>検索レイテンシにとって重要なベクトルインデックスには<code translate="no">sync</code> を使用する。バッチまたは低頻度のワークロードでは、<code translate="no">disable</code> を使用してセグメントをより速く準備する。</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-collection-level--Milvus-2611+" class="common-anchor-header">コレクションレベルでのウォームアップの構成<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-collection-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションレベルのウォームアップでは、特定のコレクションのクラスタデフォルトをオーバーライドできます。これは、コレクションがクラスタ全体のベースラインとは異なるアクセスパターンを持つ場合に便利です。</p>
<h3 id="Set-warmup-when-creating-a-collection" class="common-anchor-header">コレクションの作成時にウォームアップを設定する<button data-href="#Set-warmup-when-creating-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorField&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-collection" class="common-anchor-header">既存のコレクションのウォームアップ設定の変更<button data-href="#Alter-warmup-settings-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">load()</code> を呼び出す前に、コレクションプロパティを変更する必要があります。ロードされたコレクションを変更すると、エラーが返されます。ウォームアップ設定の変更は、次にコレクションをロードしたときに有効になります。</p>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,
        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>プロパティの参照</strong></p>
<table>
   <tr>
     <th><p><strong>プロパティ</strong></p></th>
     <th><p><strong>ウォームアップ設定</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>コレクション内のすべてのスカラー・フィールドのウォームアップ設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>コレクション内のすべてのスカラー・インデックスのウォームアップ設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>コレクション内のすべてのベクトル・フィールドのウォームアップ設定。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>コレクション内のすべてのベクトル・インデックスに対するウォームアップ設定。</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-field-level--Milvus-2611+" class="common-anchor-header">フィールドレベルでのウォームアップ設定<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-field-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>フィールド・レベルのウォームアップは最も細かい粒度を提供し、個々のフィールドのウォームアップ動作を制御できます。これは、特定のフィールドに固有のアクセス・パターンがある場合に便利です。</p>
<p>フィールド・レベルのウォームアップは<strong>フィールドの生データにのみ</strong>適用され、そのフィールドのインデックスには適用されません。インデックスのウォームアップを設定するには、<a href="https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level">インデックス・レベルの設定を</a>使用します。</p>
<h3 id="Set-warmup-when-creating-a-field" class="common-anchor-header">フィールドの作成時にウォームアップを設定する<button data-href="#Set-warmup-when-creating-a-field" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
    warmup=<span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this field at load time</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    warmup=<span class="hljs-string">&quot;disable&quot;</span>  <span class="hljs-comment"># Do not preload vector raw data</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-field" class="common-anchor-header">既存のフィールドのウォームアップ設定を変更する<button data-href="#Alter-warmup-settings-on-an-existing-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">load()</code> を呼び出す前に、フィールド設定を変更する必要があります。ロードされたコレクションのフィールドを変更すると、エラーが返されます。ウォームアップ設定の変更は、次にコレクションをロードしたときに有効になります。</p>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    field_params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-warmup-at-index-level--Milvus-2611+" class="common-anchor-header">インデックスレベルでのウォームアップの構成<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-index-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックス・レベルのウォームアップでは、基礎となるフィールドのウォームアップ設定から独立して、個々のインデックスのプリロードを制御できます。</p>
<h3 id="Set-warmup-when-creating-an-index" class="common-anchor-header">インデックスの作成時にウォームアップを設定する<button data-href="#Set-warmup-when-creating-an-index" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">256</span>,
        <span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this index at load time</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>}  <span class="hljs-comment"># Do not preload this index</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-index" class="common-anchor-header">既存のインデックスのウォームアップ設定の変更<button data-href="#Alter-warmup-settings-on-an-existing-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">load()</code> を呼び出す前に、インデックス設定を変更する必要があります。ロードされたコレクション上のインデックスを変更すると、エラーが返されます。ウォームアップ設定の変更は、次にコレクションをロードしたときに有効になります。</p>
<pre><code translate="no" class="language-python">client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    properties={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Warmup-behavior-reference" class="common-anchor-header">ウォームアップ動作の参照<button data-href="#Warmup-behavior-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、セグメントのライフサイクルのさまざまな段階でのウォームアップ動作をまとめたものです。</p>
<table>
   <tr>
     <th><p><strong>ウォームアップ設定</strong></p></th>
     <th><p><strong>ロード段階</strong></p></th>
     <th><p><strong>検索/クエリ段階</strong></p></th>
     <th><p><strong>リリース段階</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>データはローカルストレージにロードされる。ロード先（ディスクまたはメモリ）はmmap設定に依存する。</p></td>
     <td><p>クエリはローカルキャッシュを直接ヒットする。</p></td>
     <td><p>ローカルキャッシュがクリアされる。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>データはローカル・ストレージにロードされない。</p></td>
     <td><p>データはオブジェクト・ストレージから必要に応じてフェッチされ、mmap設定に基づいてローカルにキャッシュされる。</p></td>
     <td><p>ローカルにキャッシュされたデータはクリアされる。</p></td>
   </tr>
</table>
<p><strong>mmapとの相互作用：</strong></p>
<table>
   <tr>
     <th><p><strong>ウォームアップ設定</strong></p></th>
     <th><p><strong>mmap有効</strong></p></th>
     <th><p><strong>データの場所</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>ローカル・ディスク (<code translate="no">localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>ローカルメモリー</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>初回アクセス時にローカルディスクにフェッチ</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>最初のアクセスでローカル・メモリにフェッチされる</p></td>
   </tr>
</table>
<p><strong>ローカル・キャッシュ・ディレクトリ構造（mmapが有効な場合）：</strong></p>
<table>
   <tr>
     <th><p><strong>データタイプ</strong></p></th>
     <th><p><strong>ディレクトリ・パス</strong></p></th>
   </tr>
   <tr>
     <td><p>スカラー／ベクトル・フィールド・データ</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>スカラー／ベクトル・インデックス・ファイル</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
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
    </button></h2><p>ウォームアップは最初のロードにのみ影響します。キャッシュされたデータが後で削除された場合、次のクエリではオンデマンドで再ロードされます。</p>
<ul>
<li><p><code translate="no">sync</code> を使いすぎないようにします。あまりに多くのフィールドをプリロードすると、ロード時間が長くなり、キャッシュが圧迫されます。</p></li>
<li><p>ウォームアップは控えめに開始し、頻繁にアクセスされるフィールドとインデックスに対してのみ有効にします。</p></li>
<li><p>クエリの待ち時間とキャッシュのメトリクスを監視し、必要に応じてプリロードを拡張します。</p></li>
<li><p>作業負荷が混在している場合は、<code translate="no">sync</code> をパフォーマンス重視のコレクションに適用し、<code translate="no">disable</code> をキャパシティ重視のコレクションに適用します。</p></li>
</ul>
