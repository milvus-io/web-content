---
id: scalar_index.md
related_key: scalar_index
summary: >-
  スカラーインデックスは、ベクトルフィールド以外のフィールドに対するフィルタリングを高速化します。このリファレンスでは、Milvus
  がスカラーインデックスをどのように選択するか、指定可能なインデックス種別、および各インデックスがサポートするデータ型について説明します。
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
    </button></h1><p>スカラーインデックスは、カテゴリ、価格、タイムスタンプ、場所など、ベクトルではないフィールドでのフィルタリングを高速化します。フィルタ式によって検索範囲が絞り込まれた場合、スカラーインデックスを使用することで、Milvusはフィールドをスキャンすることなく、一致するエンティティを特定できます。</p>
<p>どのインデックスを選択すべきか迷った場合は、<code translate="no">AUTOINDEX</code> を使用してください。特定の動作が必要な場合にのみ、インデックスタイプを手動で指定してください。</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">スカラーインデックスの選択<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>次の表は、<code translate="no">AUTOINDEX</code> を使用する際に Milvus がデフォルトで選択するインデックスと、各データ型に対して手動で指定できるインデックス型を一覧表示しています。</p>
<table>
<thead>
<tr><th>データ型</th><th>AUTOINDEX のデフォルト</th><th>手動で指定可能なインデックス種別</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">TRIE</code>,<code translate="no">NGRAM</code>,<code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> 型付きスカラーまたは配列へのキャスト</td><td><code translate="no">HYBRID</code></td><td><code translate="no">json_cast_type</code> に依存します。<a href="#JSON-field-indexing">JSON フィールドのインデックス参照を</a>参照してください。</td></tr>
<tr><td><code translate="no">JSON</code> 以下の場合<code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> 経由して<code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>,<code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>未対応</td><td>なし</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> は内部戦略であり、直接指定できる型ではありません。<a href="#How-AUTOINDEX-selects">「AUTOINDEX の選択方法</a>」を参照してください。</p>
<p>以下の制限が適用されます：</p>
<ul>
<li><strong>主キー：</strong> <code translate="no">BITMAP</code> は主キーフィールドでは使用できません。</li>
<li><strong>配列：</strong>再帰的配列およびNULL許容要素を持つ配列は、<code translate="no">AUTOINDEX</code> を含むスカラーインデックス指定をサポートしていません。通常の配列は、ブール型、整数型、浮動小数点型、およびVARCHAR型の要素をサポートしています。</li>
<li><strong>構造体配列：</strong>スカラーのサブフィールドを個別にインデックス付けします。そのサポート状況は通常の配列とは異なる場合があります。たとえば、ブール型の構造体サブフィールドでは、明示的な<code translate="no">STL_SORT</code> はサポートされません。</li>
<li><strong>TEXT:</strong> <code translate="no">AUTOINDEX</code> を含む、ユーザー作成のスカラーインデックスは利用できません。テキスト解析と BM25 検索では、それぞれ別のメカニズムが使用されます。</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">インデックス型<button data-href="#Index-types" class="anchor-icon" translate="no">
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
<thead>
<tr><th>インデックス型</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>汎用的な等価、メンバーシップ、および範囲フィルタ。</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>固有値の少ないフィールド、およびコンパクトなビット単位のフィルタリング。</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>ソート済み値の検索および範囲フィルタリング。</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>文字列の等価比較および接頭辞一致。</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>候補を絞り込んだ文字列に対するLIKEおよび正規表現。</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>完全な接頭辞、接尾辞、および中置部分文字列の一致。</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>GEOMETRY フィールドに対する空間フィルタリング。</td></tr>
</tbody>
</table>
<p>作成例、インデックス・パラメータ、およびサポートされているクエリについては、<a href="/docs/ja/bitmap.md">BITMAP</a>、<a href="/docs/ja/inverted.md">INVERTED</a>、<a href="/docs/ja/ngram.md">NGRAM</a>、<a href="/docs/ja/stl-sort.md">STL_SORT</a>、<a href="/docs/ja/trie.md">TRIE</a>、<a href="/docs/ja/fmindex.md">FMINDEX</a>、および<a href="/docs/ja/rtree.md">RTREE</a> を参照してください。</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">AUTOINDEX の選択方法<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AUTOINDEX</code> を使用する場合、Milvus はフィールド型、サーバー構成、および一部のフィールドについては固有値の数（カーディナリティ）に基づいてインデックスを選択します。デフォルトの選択については、「<a href="#Choosing-a-scalar-index">スカラーインデックスの選択</a>」に記載されています。</p>
<p>ほとんどのフィールドにおいて、<code translate="no">AUTOINDEX</code> は、カーディナリティに基づいてインデックスを選択する内部の<code translate="no">HYBRID</code> 戦略を使用します。</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> ビルドに含まれる異なる値が100未満の場合。</li>
<li><strong><code translate="no">STL_SORT</code></strong> ビルドに含まれる異なる値が100個以上の場合。</li>
</ul>
<p>配列インデックスには別の互換性ポリシーが適用されます。高カーディナリティの分岐では、クラスタが<code translate="no">STL_SORT</code> をサポートしている場合はそれを使用し、そうでない場合は<code translate="no">INVERTED</code> を使用します。「<a href="#Version-compatibility">バージョンの互換性</a>」を参照してください。</p>
<p><code translate="no">HYBRID</code> は内部専用であり、直接指定することはできません。内部選択では、そのフィールドに対して明示的な選択肢として利用できないインデックス（例：浮動小数点値に対するビットマップインデックス）を使用することも可能です。</p>
<blockquote>
<p>これらの選択はデフォルト設定です。管理者は `<code translate="no">scalarAutoIndex.params.build</code>` を通じてこれらを変更できます。`<code translate="no">scalarAutoIndex.enable</code> ` 設定のデフォルトは `<code translate="no">false</code>` であり、この設定ではインデックス型が省略された場合でも、明示的な `<code translate="no">AUTOINDEX</code> ` および選択が許可されます。これを `<code translate="no">true</code> ` に設定すると、それ以外では有効な手動リクエストに対しても自動選択が適用されます。</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">JSONフィールドのインデックス作成<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON値にインデックスを付けるには、<code translate="no">json_cast_type</code> を指定して、インデックス対象となる値の型を明示します。このパラメータは、自動インデックス作成と手動インデックス作成の両方で必須です。パスを指定するには<code translate="no">json_path</code> を使用します。省略された場合、Milvusはリクエストで指定されたフィールド名を使用します。</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX のデフォルト</th><th>手動インデックス作成時のタイプ</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code>,<code translate="no">STL_SORT</code>,<code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p><code translate="no">JSON</code> キャストは、型付きスカラーパスインデックスではなく完全な JSON インデックスを選択し、<code translate="no">AUTOINDEX</code> のデフォルト値を<code translate="no">HYBRID</code> から<code translate="no">INVERTED</code> に変更します。</p>
<p>オプションの<code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> は、<code translate="no">DOUBLE</code> キャストにおける文字列値を変換します。他のキャスト型では使用できません。<code translate="no">TRIE</code> も<code translate="no">FMINDEX</code> も、JSONフィールドをサポートしていません。</p>
<h2 id="Supported-predicates" class="common-anchor-header">サポートされている述語<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、各インデックスがどの述語の評価を支援できるかを示しています。<strong>インデックスがサポートされているからといって、Milvusがすべてのクエリでそのインデックスを使用するとは限りません。</strong>特定の式やパターンに対してインデックスが不適切な場合<strong>、</strong>Milvusはフィールドデータをスキャンすることがあります<strong>。</strong></p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">比較およびメンバーシップ<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>等価比較およびメンバーシップには、<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">in</code> 、<code translate="no">not in</code> が含まれます。範囲比較には、<code translate="no">&lt;</code> 、<code translate="no">&lt;=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&gt;=</code> 、および<code translate="no">10 &lt;= price &lt; 50</code> などの式が含まれます。</p>
<table>
<thead>
<tr><th>インデックス型</th><th>フィールドのデータ型</th><th>インデックスでサポートされる述語</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>等価およびメンバーシップ</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>整数、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code></td><td>等価、包含、および範囲</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>等価性および包含関係</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>整数、<code translate="no">VARCHAR</code></td><td>等価性、所属、および範囲</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>整数、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> 、<code translate="no">TIMESTAMPTZ</code> 、<code translate="no">VARCHAR</code></td><td>等価性、集合への所属、および範囲</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>等価性、包含関係、および範囲；範囲の評価では複数のインデックス付き文字列が参照される場合がある</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>文字列パターンのみ。直接的な等価性、包含関係、範囲検索は行われない</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>文字列パターンのみ。直接的な等価性、包含関係、範囲検索は行われない</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>以下に挙げる空間述語</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>サポートされるスカラー型</td><td>選択したインデックスによって異なります。内部の<code translate="no">HYBRID</code> による選択では、対応するビットマップ・ソート済み・反転インデックスの機能を使用します。</td></tr>
</tbody>
</table>
<p>VARCHAR の範囲比較では、文字列値を数値として解釈するのではなく、文字列値として比較されます。この表はリテラル値との比較のみを説明しており、算術式や 2 つのフィールド間の比較が同様のインデックスによる高速化を受けるとは限りません。</p>
<h3 id="String-patterns" class="common-anchor-header">文字列パターン<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>この表は VARCHAR フィールドに適用されます。JSON 文字列パスについては、JSON インデックス作成テーブルでサポートされているインデックスおよび `<code translate="no">VARCHAR</code> ` キャストを使用してください。対応する文字列の挙動が適用されます。</p>
<ul>
<li><strong>はい：</strong>インデックスは完全一致を返します。</li>
<li><strong>インデックス化された値のチェック：</strong>Milvus は、インデックスに格納されている文字列に対してパターンを評価します。この際、多数の異なる文字列を参照する必要がある場合があります。</li>
<li><strong>候補：</strong>インデックスによって一致の可能性のある候補が絞り込まれ、その後 Milvus が元の値をチェックします。</li>
<li><strong>スキャン：</strong>インデックスは述語に対応しません。Milvus は別の適格なパスを使用するか、フィールドをスキャンします。</li>
</ul>
<table>
<thead>
<tr><th>インデックスのタイプ</th><th>プレフィックス<code translate="no">like &quot;abc%&quot;</code></th><th>サフィックス<code translate="no">like &quot;%abc&quot;</code></th><th>部分文字列<code translate="no">like &quot;%abc%&quot;</code></th><th>一般LIKE<code translate="no">like &quot;a%b_c&quot;</code></th><th>正規表現<code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>はい</td><td>スキャン</td><td>スキャン</td><td>はい</td><td>スキャン</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>インデックス付き値を確認</td><td>インデックス値を確認する</td><td>インデックス化された値を確認</td><td>インデックス化された値を確認</td><td>インデックス化された値を確認</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>はい</td><td>インデックス付き値を確認する</td><td>インデックス付き値を確認する</td><td>インデックス値を確認する</td><td>インデックス値を確認する</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>はい</td><td>インデックス付き値を確認する</td><td>インデックス値を確認する</td><td>インデックス値を確認する</td><td>インデックス付き値を確認する</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>候補者</td><td>候補</td><td>候補；設定されたグラム長範囲内のリテラルに完全に一致するもの</td><td>候補</td><td>候補</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>はい</td><td>はい</td><td>はい</td><td>候補者</td><td>候補</td></tr>
</tbody>
</table>
<p>これらのエントリは、クエリプランニング後の演算子について記述しています。Milvus は、リテラルな LIKE パターンを等価比較に、また単純なアンカー付き正規表現を等価比較、接頭辞一致、または接尾辞一致に簡略化することができます。例えば、<code translate="no">name =~ &quot;^abc$&quot;</code> は等価比較となり、等価比較テーブルに従います。</p>
<p><code translate="no">INVERTED</code> より複雑な LIKE パターンではインデックスを使用できますが、単純な接尾辞や部分文字列の形式はスキャンとして扱われます。<code translate="no">NGRAM</code> では、リテラルテキストの長さが少なくとも<code translate="no">min_gram</code> 文字以上である必要があります。一般的な LIKE では、空でない各リテラルフラグメントがその最小長を満たす必要があり、正規表現の高速化は適切なリテラルの抽出に依存します。 それ以外の場合、Milvusはデータをスキャンします。<code translate="no">FMINDEX</code> も、パターンによるフィルタリング効果が乏しい場合や、インデックス経由での解決にコストがかかりすぎる場合には、スキャンを選択することがあります。</p>
<p>これらは文字列値の述語です。<code translate="no">TEXT_MATCH</code> や<code translate="no">PHRASE_MATCH</code> などのトークンベースの関数は、フィールドプロパティを通じて構成されたテキストマッチインデックスを使用します。スカラーの<code translate="no">INVERTED</code> インデックスを選択しても、これらの関数は有効になりません。</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">配列、JSON、および空間述語<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>インデックスのタイプ</th><th>データ型またはキャスト</th><th>インデックスを使用できる述語</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>、<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code> 、または条件を満たす<code translate="no">AUTOINDEX</code> の選択</td><td>サポートされている要素型を持つ通常の配列</td><td><code translate="no">ARRAY_CONTAINS</code>、<code translate="no">ARRAY_CONTAINS_ANY</code> 、<code translate="no">ARRAY_CONTAINS_ALL</code></td><td>位置に関係なく要素に一致します。インデックスおよび型の制限は引き続き適用されます。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">STL_SORT</code></td><td>ブール値、整数、またはVARCHAR値の通常の配列</td><td>配列全体の<code translate="no">==</code> および<code translate="no">!=</code></td><td>インデックス候補の後に元の配列のチェックを行うことができます。浮動小数点配列はスキャンにフォールバックします。ビットマップインデックスはこの候補パスをサポートしません。</td></tr>
<tr><td><code translate="no">INVERTED</code>,<code translate="no">BITMAP</code> 、<code translate="no">STL_SORT</code> 、または適格な<code translate="no">AUTOINDEX</code> の選択</td><td><code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 、または<code translate="no">VARCHAR</code></td><td>キャストされた型に応じた比較およびメンバーシップ</td><td>インデックス付きパスとキャストは、クエリと一致する必要があります。文字列パターンは、前述の表に従います。</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>JSONパスが以下に変換されたもの<code translate="no">VARCHAR</code></td><td>LIKEおよび正規表現パターン</td><td>VARCHAR NGRAM インデックスと同じパターン適格性ルールを使用します。</td></tr>
<tr><td><code translate="no">INVERTED</code>、<code translate="no">STL_SORT</code> 、または適格な<code translate="no">AUTOINDEX</code> の選択</td><td><code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 、または<code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>、<code translate="no">JSON_CONTAINS_ANY</code> 、<code translate="no">JSON_CONTAINS_ALL</code></td><td>互換性のある要素型が必要です。型が混在している、またはネストされた配列のオペランドは、スキャン処理に切り替わる場合があります。</td></tr>
<tr><td><code translate="no">INVERTED</code> キャストあり<code translate="no">JSON</code></td><td>完全な JSON インデックス</td><td>サポートされているスカラーパスでの比較およびメンバーシップ、サポートされている文字列パターン、サポートされている配列パスでのJSON包含関係</td><td>文字列パスはINVERTED挙動に従います。配列の包含には、互換性のある要素型が必要です。</td></tr>
<tr><td>JSON パスインデックスおよび完全な JSON インデックス</td><td>インデックス付きJSONパス</td><td><code translate="no">exists</code></td><td>パスが存在するかどうかをテストします。これは、パスの値をテストすることや、フィールド全体が null であるかどうかをテストすることとは異なります。</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>,<code translate="no">ST_INTERSECTS</code>,<code translate="no">ST_CONTAINS</code>,<code translate="no">ST_WITHIN</code>,<code translate="no">ST_TOUCHES</code>,<code translate="no">ST_OVERLAPS</code>,<code translate="no">ST_CROSSES</code>,<code translate="no">ST_DWITHIN</code></td><td>バウンディングボックスを使用して候補を特定し、その後、正確な空間的関係を検証します。<code translate="no">ST_ISVALID</code> は RTREE を使用しません。</td></tr>
</tbody>
</table>
<p>配列の包含関係のサポートは、<code translate="no">values[0]</code> のように特定の位置にある要素のインデックス検索や、配列の長さの検索を意味するものではない。配列全体の等価性チェックでは、順序と長さも確認する必要があり、これは要素の所属関係だけでは確立できない。</p>
<p><code translate="no">IS NULL</code> および<code translate="no">IS NOT NULL</code> は妥当性情報を使用し、特定のスカラーインデックス型を必要としません。述語は<code translate="no">and</code> 、<code translate="no">or</code> 、および<code translate="no">not</code> と組み合わせることができ、各部分はそれぞれ独自の適格な実行パスを使用できます。</p>
<h2 id="Version-compatibility" class="common-anchor-header">バージョンの互換性<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>ほとんどのスカラーインデックス（<code translate="no">BITMAP</code> 、<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">TRIE</code> 、および通常のスカラーフィールド上の<code translate="no">NGRAM</code> ）には、バージョン要件はありません。以下の要件は、配列フィールド上のインデックス、JSONパスインデックス、および<code translate="no">FMINDEX</code> といった、より新しい組み合わせにのみ適用されます。</p>
<p>これらの要件では、スカラーインデックスエンジンのバージョン番号が使用されます。これは、Milvusのソフトウェアリリース番号とは異なる内部の機能カウンターです。</p>
<table>
<thead>
<tr><th>機能</th><th>要件</th></tr>
</thead>
<tbody>
<tr><td>明示的<code translate="no">FMINDEX</code></td><td>スカラーインデックスエンジンバージョン 5 以降</td></tr>
<tr><td>明示的通常の配列に対する<code translate="no">STL_SORT</code> </td><td>スカラーインデックスエンジン バージョン 3 以降（配列のソート機能が有効になっているもの）</td></tr>
<tr><td><code translate="no">HYBRID</code> 通常の配列に対して<code translate="no">STL_SORT</code> を選択</td><td>スカラーインデックスエンジンバージョン 5 以降で、配列のソート機能が有効になっている場合</td></tr>
<tr><td><code translate="no">BITMAP</code>、JSONスカラーパスに対する<code translate="no">STL_SORT</code> 、または<code translate="no">HYBRID</code> </td><td>スカラーインデックスエンジンバージョン 4 以降</td></tr>
<tr><td><code translate="no">STL_SORT</code> 、または型指定された JSON 配列パスでは `<code translate="no">HYBRID</code> `</td><td>スカラーインデックスエンジンバージョン 3 以降で、配列のソートサポートが有効になっていること</td></tr>
</tbody>
</table>
<p>配列または JSON の互換性要件が満たされない場合、影響を受ける自動リクエストは<code translate="no">INVERTED</code> にフォールバックし、サポートされていない組み合わせに対する明示的なリクエストは失敗します。通常の配列の<code translate="no">HYBRID</code> については、高カーディナリティの分岐では、ソートされたインデックスが利用可能になるまで<code translate="no">INVERTED</code> を引き続き使用します。</p>
<h2 id="Performance-considerations" class="common-anchor-header">パフォーマンスに関する考慮事項<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスのパフォーマンスは、データの分布やアプリケーションが使用するフィルターに依存します。カーディナリティ、文字列の長さ、配列の長さ、および一致するエンティティの数は、すべてメモリ使用量やクエリのレイテンシに影響を与える可能性があります。代表的なデータとフィルター式を使用してインデックスを比較し、メモリ使用量、構築時間、およびクエリのレイテンシをまとめて測定してください。</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">メモリ要件の見積もり<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の式は、メモリマッピングを無効にした状態で、ロード後のスカラーインデックスに必要なメモリの概算値を示しています。<code translate="no">STL_SORT</code> の式は、NULL値のない通常のスカラーフィールドを前提としています。</p>
<ul>
<li><code translate="no">N</code>: エンティティの数。</li>
<li><code translate="no">D</code>: 異なる値の数。</li>
<li><code translate="no">l</code>: 異なる文字列の平均長（<strong>バイト</strong>単位）。</li>
<li><code translate="no">S</code>: ストレージ圧縮前の構築済みインデックスのサイズ（<strong>バイト</strong>単位）。</li>
</ul>
<table>
<thead>
<tr><th>インデックス型</th><th>おおよそのメモリ使用量（バイト単位）</th><th>直感的な説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> <code translate="no">INT8</code> 、 、 、または<code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>エンティティあたり約 12 バイト。</td></tr>
<tr><td><code translate="no">STL_SORT</code> <code translate="no">INT64</code> 、 、または<code translate="no">DOUBLE</code> <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>値が大きい場合は、エンティティあたり約20バイト。</td></tr>
<tr><td><code translate="no">STL_SORT</code> で<code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>繰り返し出現する文字列はメモリを共有するため、通常、異なる文字列が少ないほどメモリ使用量は少なくなります。</td></tr>
<tr><td><code translate="no">BITMAP</code>、高密度ビットマップを使用する場合</td><td><code translate="no">(D + 1) * N / 8</code></td><td>各エンティティごとに、異なる値ごとに約 1 ビットが必要であり、さらに有効なエンティティを追跡するためのビットマップが 1 つ必要になります。</td></tr>
<tr><td><code translate="no">INVERTED</code> または<code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>構築済みのインデックスのサイズを目安としてください。</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>構築されたインデックスのサイズの約 2 倍の容量を確保します。</td></tr>
</tbody>
</table>
<p>その結果を<code translate="no">1024 * 1024</code> で割って、バイトを<strong>MiB</strong>に変換します。たとえば、100万個のNULLではない<code translate="no">INT64</code> 値を持つ<code translate="no">STL_SORT</code> インデックスでは、メインのデータ構造に<strong>約19 MiB</strong>が必要です。すべての文字列が一意であるVARCHARフィールドの場合、推定値は<code translate="no">(l + 24) * N</code> に単純化されます。100万個の一意な文字列が平均32バイトだとすると、<strong>約53 MiB</strong>になります。</p>
<p>BITMAPの計算式は、高密度ビットマップ格納を表しています。オプションのオフセットキャッシュを有効にすると、64ビットシステムで約<code translate="no">8 * N</code> バイトが追加されます。<code translate="no">INVERTED</code> 、<code translate="no">NGRAM</code> 、および<code translate="no">FMINDEX</code> については、代表的なデータに対してインデックスを構築し、<code translate="no">S</code> を算出してください。生データのサイズは、構築されたインデックスのサイズの代用にはなりません。<code translate="no">AUTOINDEX</code> については、実際に選択されたインデックスの計算式を使用し、セグメントごとの推定値を適用した後、ロードされたセグメントおよびレプリカ全体でそれらを合計します。</p>
<p>これらは概算の計画値であり、メモリの制限値ではありません。これらは、構築、ロード、およびクエリ中に使用される一時メモリを省略しており、数値型<code translate="no">STL_SORT</code> に比べて、文字列およびビットマップインデックスの場合、一意の値やデータの分布の影響をより強く受けます。正確性の固定された割合は保証されません。 メモリマッピング、古いインデックス形式、配列、およびJSONフィールドについては、別途測定が必要です。デプロイメントのサイズを決定する前に、代表的なデータとクエリを使用して実際のメモリ使用量を確認し、ピーク時の使用量に備えて余裕を持たせてください。</p>
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
<li>インデックスの作成および構成の例については、<a href="/docs/ja/bitmap.md">BITMAP</a>、<a href="/docs/ja/inverted.md">INVERTED</a>、<a href="/docs/ja/ngram.md">NGRAM</a>、<a href="/docs/ja/stl-sort.md">STL_SORT</a>、<a href="/docs/ja/trie.md">TRIE</a>、<a href="/docs/ja/fmindex.md">FMINDEX</a>、<a href="/docs/ja/rtree.md">およびRTREEを</a>参照してください。</li>
<li>フィールド定義およびコレクションスキーマについては、「<a href="/docs/ja/schema.md">スキーマの解説</a>」を参照してください。</li>
</ul>
