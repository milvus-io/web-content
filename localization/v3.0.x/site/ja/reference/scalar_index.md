---
id: scalar_index.md
related_key: scalar_index
summary: スカラーインデックスの型を比較し、フィールドの互換性を確認し、自動インデックス選択の仕組みを理解します。
title: スカラーインデックス
---
<h1 id="Scalar-Index" class="common-anchor-header">スカラーインデックス<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>スカラーインデックスを使用すると、非ベクトル<a href="/docs/ja/boolean.md">フィールドのフィルタリングを</a>高速化できます。この概要を参照して、インデックスの選択、フィールドの互換性の確認、および自動選択の仕組みについて理解してください。</p>
<p>頻繁に使用されるフィールドや、フィルタ処理に時間がかかるフィールドには、インデックスの作成を検討してください。インデックス作成リクエストに含める各フィールドについて、次の 2 つのオプションのいずれかを選択します。</p>
<ul>
<li><strong>インデックス・タイプを指定する：</strong>フィールドのデータ型およびフィルターと互換性のあるものを選択します。</li>
<li><strong> <code translate="no">AUTOINDEX</code> を使用する：</strong> <code translate="no">index_type</code> を<code translate="no">AUTOINDEX</code> に設定し、Milvusにタイプを選定させます。「<a href="#AUTOINDEX-behavior">AUTOINDEXの動作</a>」を参照してください。</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">インデックス・タイプ<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>サポートされているフィルター、パラメーター、および作成手順については、インデックスガイドを開いてください：</p>
<table>
<thead>
<tr><th>インデックス種別</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ja/inverted.md">INVERTED</a></td><td>等価、メンバーシップ、および範囲フィルター。</td></tr>
<tr><td><a href="/docs/ja/bitmap.md">BITMAP</a></td><td>ステータスコードなど、異なる値が少ないフィールド。</td></tr>
<tr><td><a href="/docs/ja/stl-sort.md">STL_SORT</a></td><td>値の検索および範囲フィルタ。</td></tr>
<tr><td><a href="/docs/ja/trie.md">TRIE</a></td><td><code translate="no">VARCHAR</code> フィールドでの文字列の完全検索および接頭辞マッチング。</td></tr>
<tr><td><a href="/docs/ja/ngram.md">NGRAM</a></td><td>LIKE および適用可能な正規表現フィルタ。</td></tr>
<tr><td><a href="/docs/ja/rtree.md">RTREE</a></td><td><code translate="no">GEOMETRY</code> フィールドに対する空間フィルタ。</td></tr>
</tbody>
</table>
<p>インデックスを作成する前に、以下のフィールド互換性表と、選択したインデックスのフィルタ対応状況を確認してください。</p>
<p><details id="Filter-execution">
<summary><strong>フィルタによるインデックスの使用方法</strong></summary></p>
<p>インデックスは、条件を満たす式に対してのみ機能します。その他のフィルターはデータをスキャンします。算術演算やフィールド間の比較では、リテラル検索の高速化は継承されません。論理演算や NULL チェックについては、「<a href="/docs/ja/basic-operators.md">基本演算子</a>」を参照してください。</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">サポートされているフィールド型<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>フィールドのデータ型を確認し、サポートされている明示的インデックスを参照してください。配列行において、「<code translate="no">ARRAY&lt;T&gt;</code> 」は、<code translate="no">element_type=T</code> を伴う<code translate="no">ARRAY</code> を意味します：</p>
<table>
<thead>
<tr><th>フィールド型</th><th>明示的インデックスの種類</th><th>条件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>スカラーブール型フィールドは `<code translate="no">STL_SORT</code>` をサポートしていません。</td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> は主キーフィールドでは使用できません。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td><td>明示的な<code translate="no">BITMAP</code> は利用できません。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, `<code translate="no">BITMAP</code>`、`<code translate="no">STL_SORT</code>`、`<code translate="no">TRIE</code>`、<code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> は主キーフィールドでは使用できません。<a href="#String-pattern-indexes">フィルタによるインデックス選択を</a>参照してください。</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>「<a href="/docs/ja/timestamptz-field.md">TIMESTAMPTZ フィールド</a>」を参照してください。</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><a href="/docs/ja/rtree.md">RTREEを</a>参照してください。</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>「<a href="/docs/ja/array_data_type.md#Array-index-support">配列インデックスのサポート」</a>を参照してください。</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>、<code translate="no">ARRAY&lt;INT16&gt;</code> 、<code translate="no">ARRAY&lt;INT32&gt;</code> 、<code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>「<a href="/docs/ja/array_data_type.md#Array-index-support">配列インデックスのサポート」</a>を参照してください。</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>,<code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>「<a href="/docs/ja/array_data_type.md#Array-index-support">配列インデックスのサポート」</a>を参照してください。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td><td>「<a href="/docs/ja/array_data_type.md#Array-index-support">配列インデックスのサポート」</a>を参照してください。</td></tr>
<tr><td><code translate="no">JSON</code></td><td>インデックス付きパスおよびキャスト型によって異なります。</td><td><a href="/docs/ja/json-indexing.md#Understand-cast-types">JSONパスの互換性と要件</a>を確認してください。</td></tr>
<tr><td>StructArray の非ベクトルサブフィールド</td><td>サブフィールドのデータ型によって異なります。</td><td>サブフィールドは個別にインデックス指定してください。<code translate="no">BOOL</code> のサブフィールドでは、明示的な<code translate="no">STL_SORT</code> を使用することはできません。<a href="/docs/ja/index-structarray-fields.md#Create-scalar-indexes">サブフィールドのルール</a>をご覧ください。</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>なし</td><td><code translate="no">AUTOINDEX</code> を含む、ユーザー作成のスカラーインデックスは使用できません。</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p><code translate="no">AUTOINDEX</code> を含むスカラーインデックスは、再帰的な ARRAY フィールドや、NULL 許容要素を持つ配列をサポートしていません。通常の配列フィルターに対する配列インデックスのサポートおよびサブフィールドのルールについては、<a href="/docs/ja/array_data_type.md#Array-index-support">「配列フィルターに対する配列インデックスのサポート」</a>および「<a href="/docs/ja/index-structarray-fields.md#Create-scalar-indexes">StructArray フィールドのインデックス</a>」を参照してください。</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>VARCHAR フィルター用のインデックスを選択する</strong></summary></p>
<p><code translate="no">VARCHAR</code> フィールドの場合、フィルタに基づいて互換性のあるインデックスを比較してください：</p>
<table>
<thead>
<tr><th>フィルタリングの要件</th><th>インデックスガイドと条件</th></tr>
</thead>
<tbody>
<tr><td>文字列の完全一致および接頭辞検索</td><td><a href="/docs/ja/trie.md#Queries-accelerated-by-TRIE">TRIE</a>、<a href="/docs/ja/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a>、または<a href="/docs/ja/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>。</td></tr>
<tr><td>異なる文字列値が少数の場合</td><td><a href="/docs/ja/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; パターンは、インデックス付き値に対して評価されます。</td></tr>
<tr><td>LIKE または、適切な固定リテラルを含む正規表現</td><td><code translate="no">VARCHAR</code> フィールドまたは JSON 文字列パスに対する<a href="/docs/ja/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a>。ただし、グラムの長さおよび再チェックの条件に従います。</td></tr>
<tr><td>使用可能な固定リテラルを含まない正規表現</td><td>クエリはデータをスキャンするか、多数のインデックス付き値を評価する可能性があります。選択したインデックスの条件を確認してください。</td></tr>
</tbody>
</table>
<p><code translate="no">VARCHAR</code> に対する範囲指定では、文字列に数字が含まれている場合でも、文字列の順序が使用されます。インデックスの使用は、クエリのプランニング、抽出可能なリテラル、カーディナリティ、およびデータの分布によって異なります。プランニングのルールについては、<a href="/docs/ja/pattern-matching.md#Accelerate-pattern-matching-with-indexes">「パターンマッチング」</a>を参照してください。JSON 文字列パスについては、「<a href="/docs/ja/json-indexing.md">JSON インデックス</a>」のパスおよびキャストの要件を確認してください。</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">AUTOINDEXの動作<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>各選択フィールドのインデックス定義で、<code translate="no">index_type</code> を<code translate="no">AUTOINDEX</code> に設定してください。Milvusは、データ型および（該当する場合）各インデックス構築時の固有値の数に基づいて型を選択します：</p>
<table>
<thead>
<tr><th>フィールド型</th><th>デフォルトの選択</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>,<code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>,<code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 異なる値が100未満の場合；それ以外の場合は<code translate="no">STL_SORT</code> 。</td></tr>
<tr><td><code translate="no">ARRAY</code> <code translate="no">element_type</code> は、 、 、 、 、 、 、または<code translate="no">INT8</code> <code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">INT64</code> <code translate="no">FLOAT</code> <code translate="no">DOUBLE</code> <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> 異なる要素が100個未満の場合。それ以外の場合は<code translate="no">INVERTED</code> 。</td></tr>
<tr><td><code translate="no">JSON</code> パスは、<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 、または<code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> 3.0 ではデフォルトで `xml-ph-0000@deepl.internal` に変換されます。<a href="/docs/ja/json-indexing.md#Index-requirements">JSON オプトイン設定</a>を有効にすると、上記のスカラービットマップ／ソート済み戦略が有効になります。</td></tr>
<tr><td><code translate="no">JSON</code> <code translate="no">ARRAY_BOOL</code> 、 、または<code translate="no">ARRAY_DOUBLE</code> <code translate="no">ARRAY_VARCHAR</code></td><td>明示的に `<code translate="no">INVERTED</code>` を使用してください。デフォルトの 3.0.6 マッピングでは、これらのキャストに対する自動選択は拒否されます。</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>サポートされていません。</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>サポートされているスカラーフィールドの場合、<code translate="no">index_type</code> を省略したインデックス定義も自動選択を要求します。要求に含まれていないフィールドはインデックス化されません。</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>選択の詳細</strong></summary></p>
<ul>
<li><strong>内部レイアウト：</strong> <code translate="no">AUTOINDEX</code> を使用すると、<code translate="no">FLOAT</code> や<code translate="no">DOUBLE</code> に対するビットマップインデックスなど、明示的な選択肢としては利用できないレイアウトを選択することができます。カーディナリティに基づく戦略は、内部では<code translate="no">HYBRID</code> と呼ばれており、直接指定することはできません。選択されたインデックスによって、どのフィルタがそれを使用できるかが決まります。</li>
<li><strong>カーディナリティのしきい値：</strong> <a id="Cardinality-threshold"></a> <code translate="no">bitmap_cardinality_limit</code> （範囲：1～1000）を設定して、デフォルトのしきい値を上書きします。しきい値未満の場合はビットマップが使用され、しきい値以上ではデータ型のハイカーディナリティ・レイアウトが適用されます。明示的に指定された<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 、および<code translate="no">BITMAP</code> は、カーディナリティに基づく選択をバイパスし、このしきい値を無視します。</li>
<li><strong>管理者による上書き：</strong> <code translate="no">scalarAutoIndex.params.build</code> を通じて型マッピングを変更します。<code translate="no">scalarAutoIndex.enable=false</code> （デフォルト）では、明示的な<code translate="no">AUTOINDEX</code> が引き続き許可されます。<code translate="no">true</code> も、有効な手動リクエストに対して自動選択を適用します。</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>次のタスクに適したガイドを選択してください：</p>
<ul>
<li><strong>インデックスの作成：</strong>パラメータや作成例については、<a href="#Index-types">インデックスガイド</a>を参照してください。</li>
<li><strong>リソースの計画：</strong> <a href="/docs/ja/stl-sort.md#Memory-considerations">STL_SORT</a>、<a href="/docs/ja/bitmap.md#Memory-considerations">BITMAP</a>、<a href="/docs/ja/inverted.md#Memory-considerations">INVERTED</a>、<a href="/docs/ja/ngram.md#Memory-considerations">またはNGRAM</a>に関するメモリのガイダンスを参照してください。代表的なデータとフィルターを用いて、メモリ使用量、構築時間、クエリのレイテンシを比較してください。</li>
<li><strong>テキスト検索の設定：</strong> <a href="/docs/ja/keyword-match.md">「Text Match」</a>および「<a href="/docs/ja/full-text-search.md">Full Text Search</a>」では、テキスト分析、BM25、<code translate="no">TEXT_MATCH</code> 、および<code translate="no">PHRASE_MATCH</code> について解説しています。スカラーの<code translate="no">INVERTED</code> インデックスでは、これらのメカニズムは有効になりません。</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>旧バージョンのMilvusにおけるスカラーインデックスの削除</strong></summary></p>
<p>Milvus v2.6.3 以前では、スカラーインデックスを削除する前にコレクションをリリースする必要があります。v2.6.4 以降では、コレクションをリリースせずに削除できます。</p>
<p></details></p>
