---
id: json-indexing.md
title: JSONインデックス作成
summary: >-
  JSONフィールドは、Milvusに構造化されたメタデータを保存するための柔軟な手段を提供します。インデックスを作成しない場合、JSONフィールドに対するクエリではコレクション全体のスキャンが必要となり、データセットが大きくなるにつれて処理速度が低下します。JSONインデックスを作成すると、JSONデータ内の特定のパスに対してインデックスが生成されるため、それらのパスに対する等値クエリ、範囲クエリ、その他のフィルタクエリが高速に実行されます。
---
<h1 id="JSON-Indexing" class="common-anchor-header">JSONインデックス作成<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>JSONフィールドは、Milvusに構造化されたメタデータを格納するための柔軟な方法を提供します。インデックスを作成しない場合、JSONフィールドに対するクエリではコレクション全体のスキャンが必要となり、データセットが大きくなるにつれて処理速度が低下します。JSONインデックスを作成すると、JSONデータ内の特定のパスに対してインデックスが作成されるため、そのパスに対する等値比較、範囲指定、その他のフィルタクエリが高速に実行されます。</p>
<p>JSONインデックスは、次のような場合に最適です：</p>
<ul>
<li><p>一貫性があり、既知のキーを持つ構造化されたスキーマ</p></li>
<li><p>特定のJSONパスに対する等値、<code translate="no">IN</code> 、範囲、およびテキスト一致クエリ</p></li>
<li><p>どのキーをインデックスに登録するかを厳密に制御する必要があるシナリオ</p></li>
</ul>
<p>クエリパターンが多様な複雑なJSONドキュメントについては、代替手段として<a href="/docs/ja/json-shredding.md">JSONシュレッディング</a>を検討してください。</p>
<h2 id="Index-type-overview" class="common-anchor-header">インデックス種類の概要<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus は、JSON パス用に 4 種類のインデックスタイプを提供しています。それぞれが異なるクエリパターンに適しています。</p>
<p>インデックス・タイプを選択する前に、JSON<strong>パスのキャスト・タイプを</strong>特定してください。キャスト・タイプによって、Milvus がそのパスの値をどのように解釈するか、および利用可能なインデックス・タイプが決まります。</p>
<h3 id="Understand-cast-types" class="common-anchor-header">キャストタイプの理解<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> キャストタイプとは、<code translate="no">json_path</code> にある値を解釈およびインデックス化するために使用されるデータ型です。これはフィールドのスキーマ型とは異なります。フィールド自体は依然として<code translate="no">JSON</code> フィールドですが、インデックス化された各パスは、特定のスカラー、配列、またはJSONオブジェクト型として扱われます。</p>
<p>パスに格納されている値に一致するキャスト型を選択してください。特定のインデックス型でキャスト型が機能するかどうかを確認するには、「<a href="/docs/ja/json-indexing.md#compatibility-reference">互換性リファレンス</a>」を参照してください。</p>
<table>
<thead>
<tr><th>キャスト型</th><th>パス値が以下の場合は、これを使用してください…</th><th>値の例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>ブール値</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>数値</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>文字列値</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>ブール値の配列</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>数値の配列</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>文字列値の配列</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>JSONオブジェクト全体またはサブオブジェクト。JSONオブジェクト全体のインデックス指定は、Milvus 3.0.0以降で非推奨となります。</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>同じパスにある値の型が一致しない場合、キャストされた型に一致する値のみがインデックスに登録されます。たとえば、<code translate="no">metadata[&quot;price&quot;]</code> に<code translate="no">99.99</code> と<code translate="no">&quot;99.99&quot;</code> の両方が含まれている場合、<code translate="no">DOUBLE</code> というキャスト型のインデックスには数値が含まれ、文字列値は除外されます。インデックス作成時に文字列値を変換するには、<code translate="no">json_cast_function</code> を使用してください。詳細は<a href="/docs/ja/json-indexing.md#example-5-convert-data-type-at-index-time">「例 5: インデックス作成時にデータ型を変換する」</a>を参照してください。</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">インデックス・タイプの選択<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>キャストタイプを選択したら、クエリパターンに応じてインデックスタイプを選択します。</p>
<table>
<thead>
<tr><th>クエリパターン</th><th>推奨されるインデックス型</th><th>キャスト型の要件</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>スカラー値に対する等値条件と範囲条件の混合</td><td><code translate="no">AUTOINDEX</code></td><td><code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 、または<code translate="no">VARCHAR</code> を使用してください。</td><td>Milvus が値のカーディナリティに基づいて内部インデックスのレイアウトを選択できるようにします。</td></tr>
<tr><td>JSON配列内の値に対するフィルタ</td><td><code translate="no">INVERTED</code></td><td><code translate="no">ARRAY_BOOL</code> 、<code translate="no">ARRAY_DOUBLE</code> 、または<code translate="no">ARRAY_VARCHAR</code> を使用してください。</td><td>すべての配列キャスト型で必須です。</td></tr>
<tr><td>オブジェクト全体またはサブオブジェクトのインデックス指定（非推奨）</td><td><code translate="no">INVERTED</code> または<code translate="no">AUTOINDEX</code> （互換性のみ）</td><td><code translate="no">JSON</code> を使用してください。</td><td>互換性のためにサポートされています。新しいワークロードについては、パス固有のインデックスを作成するか、<a href="/docs/ja/json-shredding.md">JSON シュレッディング</a>を検討してください。</td></tr>
<tr><td>数値またはソート可能な文字列に対する範囲フィルター</td><td><code translate="no">STL_SORT</code> または<code translate="no">AUTOINDEX</code></td><td><code translate="no">DOUBLE</code> または<code translate="no">VARCHAR</code> を使用してください。</td><td><code translate="no">STL_SORT</code> を使用してソート済みレイアウトを強制します。自動選択を希望する場合は、<code translate="no">AUTOINDEX</code> を使用してください。</td></tr>
<tr><td>カーディナリティの低い値に対する等価フィルタまたは<code translate="no">IN</code> フィルタ</td><td><code translate="no">BITMAP</code> または<code translate="no">AUTOINDEX</code></td><td><code translate="no">BOOL</code> または<code translate="no">VARCHAR</code> を使用します。</td><td><code translate="no">BITMAP</code> を使用して、ビットマップレイアウトを強制します。数値については、<code translate="no">AUTOINDEX</code> または<code translate="no">STL_SORT</code> を使用します。</td></tr>
</tbody>
</table>
<p>迷った場合は、スカラーパスに対してはまず<code translate="no">AUTOINDEX</code> から始めてください。配列キャスト型やテキスト一致クエリに対しては、明示的に<code translate="no">INVERTED</code> を使用してください。<code translate="no">INVERTED</code> または<code translate="no">AUTOINDEX</code> によるオブジェクト全体の JSON インデックス作成は引き続きサポートされていますが、Milvus 3.0.0 以降では非推奨となります。</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> の動作は、指定した<code translate="no">json_cast_type</code> によって異なります。Milvus 3.0では、JSONパスインデックスにおいて、<code translate="no">AUTOINDEX</code> が常に<code translate="no">INVERTED</code> に解決されることはなくなりました。</p>
<table>
<thead>
<tr><th>型のキャスト</th><th><code translate="no">AUTOINDEX</code> の動作</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>、<code translate="no">DOUBLE</code> 、<code translate="no">VARCHAR</code></td><td>値のカーディナリティに基づいて、<code translate="no">BITMAP</code> と<code translate="no">STL_SORT</code> のいずれかを選択します。</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>、<code translate="no">ARRAY_DOUBLE</code> 、<code translate="no">ARRAY_VARCHAR</code></td><td>サポートされていません。インデックス型として明示的に<code translate="no">INVERTED</code> を使用してください。</td></tr>
<tr><td><code translate="no">JSON</code></td><td>オブジェクト全体またはサブオブジェクトのインデックス作成に `<code translate="no">INVERTED</code> ` を使用します。このモードは Milvus 3.0.0 以降で非推奨となります。</td></tr>
</tbody>
</table>
<p>スカラーキャスト型（<code translate="no">BOOL</code> 、<code translate="no">DOUBLE</code> 、および<code translate="no">VARCHAR</code> ）の場合、Milvusに内部インデックスレイアウトを選定させたいときは、<code translate="no">AUTOINDEX</code> を初期設定として推奨します。インデックス構築中、MilvusはJSONパス上の値の<strong>カーディナリティ</strong>を測定します。カーディナリティとは、そのパスにある異なる値の数を指します。</p>
<p>このカーディナリティに基づいて、Milvusは次の2つの内部レイアウトのいずれかを選択します：</p>
<ul>
<li><p><strong>低カーディナリティ</strong>：値が頻繁に繰り返される場合。例：<code translate="no">metadata[&quot;in_stock&quot;]</code> （<code translate="no">true</code> や<code translate="no">false</code> を含む）や、<code translate="no">metadata[&quot;status&quot;]</code> （ステータス文字列のセットが小さい場合）など。Milvusは、高速な等価比較および<code translate="no">IN</code> フィルターのために、内部で<code translate="no">BITMAP</code> インデックスを構築します。</p></li>
<li><p><strong>高カーディナリティ</strong>：<code translate="no">metadata[&quot;price&quot;]</code> 、<code translate="no">metadata[&quot;created_at&quot;]</code> 、<code translate="no">metadata[&quot;product_id&quot;]</code> など、ほとんどの値が異なる値です。Milvus は、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、<code translate="no">&lt;=</code> などの高速な範囲フィルタ処理のために、内部で<code translate="no">STL_SORT</code> インデックスを構築します。</p></li>
</ul>
<p><code translate="no">BITMAP</code> と<code translate="no">STL_SORT</code> のしきい値のデフォルトは、<strong>100個の異なる値</strong>です。このしきい値は<code translate="no">bitmap_cardinality_limit</code> で調整できます。<a href="/docs/ja/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">詳細は「AUTOINDEXのBITMAPとSTL_SORTのしきい値を調整するには？」</a>を参照してください。</p>
<div class="alert note">
<p><strong>Milvus 3.0 での動作変更</strong>。以前のバージョンでは、JSON パスに対する<code translate="no">AUTOINDEX</code> は常に<code translate="no">INVERTED</code> インデックスを構築していました。Milvus 3.0 以降、<code translate="no">AUTOINDEX</code> はスカラーキャスト型に対して<code translate="no">BITMAP</code> と<code translate="no">STL_SORT</code> のいずれかを選択します。<code translate="no">JSON</code> については、オブジェクト全体の JSON インデックス作成は非推奨となっていますが、<code translate="no">AUTOINDEX</code> は引き続き<code translate="no">INVERTED</code> を使用します。配列キャスト型およびテキスト一致クエリについては、<code translate="no">INVERTED</code> を明示的に指定してください。</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> は、テキスト一致クエリや配列インデックスが必要な場合に最適です。また、非推奨となったオブジェクト全体の JSON インデックスに対しても引き続き利用可能です。</p>
<p>以下の場合は、<code translate="no">INVERTED</code> を明示的に指定してください：</p>
<ul>
<li><p>JSON配列内の値にインデックスを付ける必要がある場合。</p></li>
<li><p>既存のインデックスがJSONオブジェクト全体またはサブオブジェクトを対象としており、<code translate="no">INVERTED</code> の動作を明示的に指定したい場合。</p></li>
<li><p>等価比較、<code translate="no">IN</code> 、範囲、テキスト一致、および配列クエリをすべて処理できる単一のインデックスタイプが必要な場合。互換性のため、オブジェクト全体のサポートは引き続き利用可能ですが、その代償としてインデックスサイズが大きくなります。</p></li>
</ul>
<p>JSON オブジェクト全体（<code translate="no">json_cast_type=&quot;JSON&quot;</code> ）に対する既存のインデックスについては、引き続き `<code translate="no">INVERTED</code> ` または `<code translate="no">AUTOINDEX</code>` のいずれかを使用できます。<code translate="no">AUTOINDEX</code> では、このキャスト型に `<code translate="no">INVERTED</code> ` が使用されます。新しいワークロードでは、オブジェクト全体の JSON インデックス作成は推奨されなくなりました。</p>
<p>詳細については、<a href="/docs/ja/inverted.md">INVERTED</a>を参照してください。</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> は、JSONパスからの値をソート順に格納します。これは、数値またはソート可能な文字列値に対する範囲フィルタ用に最適化されています。</p>
<p><code translate="no">STL_SORT</code> <code translate="no">DOUBLE</code> および のキャスト型のみをサポートしています。次のような場合に使用してください:<code translate="no">VARCHAR</code> </p>
<ul>
<li><p>フィルタで、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、または<code translate="no">&lt;=</code> を使用して値を比較する場合。</p></li>
<li><p>価格、タイムスタンプ、ID、ソート可能なコードなど、インデックス付き値のカーディナリティが高い場合。</p></li>
<li><p><code translate="no">AUTOINDEX</code> にレイアウトを決定させるのではなく、ソート済みレイアウトを強制したい場合。</p></li>
</ul>
<p><code translate="no">STL_SORT</code> <code translate="no">BOOL</code> 、 、または 型のキャストはサポートされていません。配列には を使用してください。既存のオブジェクト全体のインデックスでは、引き続き または を使用できますが、オブジェクト全体の JSON インデックスは非推奨となっています。<code translate="no">ARRAY_*</code> <code translate="no">JSON</code> <code translate="no">INVERTED</code> <code translate="no">INVERTED</code> <code translate="no">AUTOINDEX</code></p>
<p>詳細については、<a href="/docs/ja/stl-sort.md">STL_SORT</a>を参照してください。</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> は、JSONパス上の各異なる値に対してコンパクトなビットマップを作成します。これは、頻繁に繰り返される値に対する等価性および<code translate="no">IN</code> フィルターに対して最適化されています。</p>
<p><code translate="no">BITMAP</code> <code translate="no">BOOL</code> および のキャスト型のみをサポートしています。次のような場合に使用してください:<code translate="no">VARCHAR</code> </p>
<ul>
<li><p>フィルタで `<code translate="no">==</code> ` または `<code translate="no">IN</code>` を使用する場合。</p></li>
<li><p>インデックス化された値のカーディナリティが低い場合（ブール値、ステータス値、または少数のカテゴリなど）。</p></li>
<li><p><code translate="no">AUTOINDEX</code> に選択を任せるのではなく、ビットマップレイアウトを強制したい場合。</p></li>
</ul>
<p><code translate="no">BITMAP</code> <code translate="no">DOUBLE</code> 、 、または のキャスト型はサポートされていません。数値については、代わりに 、 、または を使用してください。<code translate="no">ARRAY_*</code> <code translate="no">JSON</code> <code translate="no">AUTOINDEX</code> <code translate="no">STL_SORT</code> <code translate="no">INVERTED</code> </p>
<p>詳細については、<a href="/docs/ja/bitmap.md">BITMAP</a>を参照してください。</p>
<h3 id="Compatibility-reference" class="common-anchor-header">互換性リファレンス<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>サポートされている<code translate="no">(cast type, index type)</code> の組み合わせについては、以下のマトリックスをクイックリファレンスとしてご利用ください。</p>
<table>
<thead>
<tr><th>型へのキャスト</th><th>説明</th><th>値の例</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>ブール値（<code translate="no">true</code>/<code translate="no">false</code> ）。</td><td><code translate="no">true</code></td><td>はい</td><td>はい</td><td>いいえ</td><td>はい</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>数値（整数または浮動小数点数）。</td><td><code translate="no">99.99</code></td><td>はい</td><td>はい</td><td>はい</td><td>いいえ</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>文字列値。</td><td><code translate="no">&quot;electronics&quot;</code></td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>ブール値の配列。</td><td><code translate="no">[true, false]</code></td><td>いいえ</td><td>はい</td><td>いいえ</td><td>いいえ</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>数値の配列。</td><td><code translate="no">[1.2, 3.14]</code></td><td>いいえ</td><td>はい</td><td>いいえ</td><td>いいえ</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>文字列の配列。</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>いいえ</td><td>はい</td><td>いいえ</td><td>いいえ</td></tr>
<tr><td><code translate="no">JSON</code></td><td>自動型推論およびフラット化が適用された、JSON オブジェクト全体またはサブオブジェクト。Milvus 3.0.0 以降で非推奨となりました。</td><td>任意のネストされたオブジェクト</td><td>はい（非推奨）</td><td>はい（非推奨）</td><td>いいえ</td><td>いいえ</td></tr>
</tbody>
</table>
<p><code translate="no">No</code> とマークされたセルについては、Milvusはインデックス作成時にリクエストを拒否します。配列のキャスト型については、明示的に<code translate="no">INVERTED</code> を使用してください（<code translate="no">AUTOINDEX</code> では配列は対象外です）。</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">JSONインデックスの作成<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、さまざまな形式の JSON データに対するインデックス作成の手順を説明します。すべての例では、以下のサンプル構造を使用しており、<code translate="no">metadata</code> という名前の<code translate="no">JSON</code> フィールドを含むコレクションがすでに存在していることを前提としています。</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">JSONのサンプル構造<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">基本的な設定<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の例では、Milvus デプロイメントに接続された「<code translate="no">client</code> 」という名前の<code translate="no">MilvusClient</code> があり、かつ「<code translate="no">metadata</code> 」という名前の<code translate="no">JSON</code> フィールドがすでに含まれているコレクションが存在することを前提としています。これらをゼロから設定する必要がある場合は、以下のブロックを展開してください。</p>
<p><details></p>
<p><summary>接続してサンプルコレクションを作成する</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>以下の例で追加されたインデックス定義を収集するための index-params オブジェクトを準備します:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>以下の各例は、1つの<code translate="no">index_params.add_index(...)</code> 呼び出しを示しています。ご自身のデータに一致するものを選び、同じ<code translate="no">index_params</code> オブジェクトに対して呼び出してください。その後、最後に1つの<code translate="no">client.create_index(...)</code> 呼び出しですべてを適用します。詳細については、<a href="/docs/ja/json-indexing.md#apply-the-index">「インデックスの適用</a>」を参照してください。</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">例 1: AUTOINDEX を使用してトップレベルキーをインデックス化<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>製品カテゴリによる高速フィルタリングを行うために、<code translate="no">category</code> フィールドにインデックスを付与します。<code translate="no">AUTOINDEX</code> を使用すると、Milvusはデータ内に存在するカテゴリの個数に基づいて、<code translate="no">BITMAP</code> または<code translate="no">STL_SORT</code> を自動的に選択します。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">例 2: ネストされたキーのインデックス作成<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>サプライヤーの連絡先検索のために、深くネストされた<code translate="no">email</code> フィールドにインデックスを付与します。<code translate="no">json_path</code> パラメータは、任意の深さの角括弧表記を受け付けます。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">例 3: STL_SORT を使用した範囲クエリ<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>パスに対するクエリが範囲比較（<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、<code translate="no">&lt;=</code> ）が中心となることが分かっている場合は、直接<code translate="no">STL_SORT</code> を選択してください。これにより、カーディナリティ測定がバイパスされ、ソート済みレイアウトが即座に構築されます。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>インデックス作成後は、<code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> のような範囲クエリでは、フルスキャンではなく二分探索が使用されます。</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">例 4: BITMAP を使用した等価クエリ<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>ステータスコード、ブール値、または列挙型のような文字列など、カーディナリティの低いキーについては、直接<code translate="no">BITMAP</code> を選択してください。等値クエリや<code translate="no">IN</code> クエリはビットマップ演算になります。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> また、<code translate="no">status</code> 列のように、固有の文字列値がごく少数しかないフィールドにも非常に適しています。</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">例 5: インデックス作成時にデータ型を変換する<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>数値データが誤って文字列として格納されている場合は、<code translate="no">STRING_TO_DOUBLE</code> を使用して、インデックスの構築中にその値を数値に変換します。</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>行の変換に失敗した場合（たとえば、<code translate="no">&quot;invalid&quot;</code> のような数値以外の文字列）、その行はインデックス作成時にスキップされます。</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">例 6: JSON オブジェクト全体のインデックス作成<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>Milvus 3.0.0 以降、JSON フラットインデックスとも呼ばれるオブジェクト全体の JSON インデックス作成（<code translate="no">json_cast_type=&quot;JSON&quot;</code> ）は非推奨となりました。互換性の観点から、既存のインデックスおよび新しいインデックス作成リクエストは引き続きサポートされますが、新しいワークロードではこのモードの使用は推奨されなくなりました。既知のクエリパスに対しては、JSON パスインデックスを作成してください。 クエリパターンが広範囲に及ぶ複雑または変化し続けるJSONドキュメントについては、<a href="/docs/ja/json-shredding.md">JSONシュレッディング</a>を検討してください。JSONシュレッディングでは、配列内の値の処理は高速化されません。そのようなクエリには、配列のキャスト型を使用したJSONパスインデックスを使用してください。</p>
</div>
<p>互換性のある既存のワークロードの場合、<code translate="no">json_cast_type=&quot;JSON&quot;</code> に設定すると、指定されたパスにある構造全体がインデックス化されます。Milvusはネストされたオブジェクトをパスにフラット化し、各値の型を自動的に推論します。そのパス下のすべてのキーが検索可能になります。</p>
<p><code translate="no">AUTOINDEX</code> フラット化と型推論は逆インデックスの機能であるため、<code translate="no">JSON</code> のキャスト型に対しては、<code translate="no">INVERTED</code> が透過的に使用されます。</p>
<p><code translate="no">metadata</code> オブジェクト全体をインデックス化するには：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>または、すべての<code translate="no">supplier</code> 情報など、サブオブジェクトをインデックス化します:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>オブジェクト全体をインデックス化すると、インデックスのサイズが増加します。ドキュメントが深くネストされており、クエリパターンが多様な新しいワークロードでは、パス固有のインデックスを使用するか、<a href="/docs/ja/json-shredding.md">JSONシュレッディング</a>を検討してください。</p>
<h3 id="Apply-the-index" class="common-anchor-header">インデックスの適用<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>すべてのインデックスパラメータを追加したら、コレクションに適用します:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>インデックスの構築は非同期で実行されます。<code translate="no">client.describe_index(...)</code> を使用して、特定のインデックスの構築状態を確認してください。構築が完了すると、<code translate="no">state</code> フィールドに「<code translate="no">Finished</code> 」と表示され、<code translate="no">total_rows</code> 、<code translate="no">indexed_rows</code> 、<code translate="no">pending_index_rows</code> には進行状況が表示されます。</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>応答例：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">state</code> が<code translate="no">Finished</code> と報告すると、インデックス化されたパスに対するクエリは自動的に新しいインデックスを使用するようになります。</p>
<p><code translate="no">AUTOINDEX</code> のエントリの場合、このレスポンス内の<code translate="no">index_type</code> フィールドは<code translate="no">AUTOINDEX</code> として報告されます。Milvusは現在、ビルド時にどの基盤レイアウト（<code translate="no">BITMAP</code> または<code translate="no">STL_SORT</code> ）が選択されたかを公開していません。この選択は内部的な最適化として扱ってください。つまり、そのパスに対する等値クエリ、<code translate="no">IN</code> 、および範囲クエリは、どのレイアウトが選択されたかに関係なく正常に動作します。</p>
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">AUTOINDEX と明示的なインデックス型のどちらを選択すればよいですか？<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>まずは<code translate="no">AUTOINDEX</code> から始めてください。これはデータのカーディナリティに基づいて適切なレイアウトを選択し、JSONパスに対するほとんどの等値クエリ、<code translate="no">IN</code> 、および範囲クエリをカバーします。以下の場合は、明示的なタイプを選択してください：</p>
<ul>
<li><p>クエリのパターンが分かっている場合（例えば、常に範囲クエリを使用する場合は<code translate="no">STL_SORT</code> を、低カーディナリティの値に対する等値クエリを常に使用する場合は<code translate="no">BITMAP</code> を使用するなど）、カーディナリティの測定を省略したい場合。</p></li>
<li><p>テキスト一致または部分文字列クエリが必要な場合。<code translate="no">INVERTED</code> を使用してください。</p></li>
<li><p>配列キャスト型をインデックス登録する場合。明示的に `<code translate="no">INVERTED</code> ` を使用してください。</p></li>
<li><p>既存のオブジェクト全体を対象とした JSON インデックスを管理している場合です。互換性のため、<code translate="no">INVERTED</code> と<code translate="no">AUTOINDEX</code> の両方が引き続きサポートされていますが、オブジェクト全体を対象とした JSON インデックスは Milvus 3.0.0 以降で非推奨となります。</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">クエリのフィルタ式で、インデックス登録されたキャスト型とは異なる型が使用された場合はどうなりますか？<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>フィルタ式で、インデックスの `<code translate="no">json_cast_type</code>` とは異なる型が使用されている場合、Milvus はそのインデックスを使用せず、データが許容する限り、より低速なブルートフォーススキャンにフォールバックする可能性があります。 最高のパフォーマンスを得るためには、常にフィルタ式をインデックスのキャスト型に合わせるようにしてください。たとえば、<code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> で数値インデックスが作成された場合、数値のフィルタ条件のみがインデックスを活用します。</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">JSONキーのデータ型がエンティティごとに一貫していない場合はどうなりますか？<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>データ型の不一致は、<strong>部分的なインデックス作成</strong>につながる可能性があります。たとえば、<code translate="no">metadata[&quot;price&quot;]</code> が数値（<code translate="no">99.99</code> ）と文字列（<code translate="no">&quot;99.99&quot;</code> ）の両方の形式で格納されており、<code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> でインデックスを作成した場合、数値のみがインデックス化されます。文字列形式のエントリはスキップされ、フィルタ結果には表示されません。 インデックス作成時に `<code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` を使用して文字列を数値に変換するか、すべてのエントリが同一の型になるようソースデータを修正してください。</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">同じ JSON キーに対して複数のインデックスを作成することはできますか？<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。Milvus では、キャスト型やインデックス型に関係なく、<code translate="no">(field, json_path)</code> のペアごとに最大 1 つのインデックスしか作成できません。 同じパス上に<code translate="no">INVERTED</code> インデックスと<code translate="no">BITMAP</code> インデックスの両方を作成することはできません。また、同じパス上に異なるキャスト型を持つ2つのインデックスを作成することもできません。ただし、JSONオブジェクト全体に対するインデックスと、そのオブジェクト内のネストされたキーに対する別のインデックスを作成することは可能です。これらは異なるパスとなるためです。</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">AUTOINDEXのBITMAPとSTL_SORTのしきい値はどのように調整すればよいですか？<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>デフォルトでは、<code translate="no">AUTOINDEX</code> は、インデックス対象の値の<strong>異なる値が100以下である</strong>場合に<code translate="no">BITMAP</code> を、それ以外の場合は<code translate="no">STL_SORT</code> を選択します。インデックスパラメータに<code translate="no">&quot;bitmap_cardinality_limit&quot;</code> を追加することで、このしきい値を上書きできます（範囲：1～1000）：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>ほとんどのユーザーはこの設定を調整する必要はありません。ビットマップ化したい中程度のカーディナリティを持つフィールドがある場合はこの値を上げ、<code translate="no">AUTOINDEX</code> を<code translate="no">STL_SORT</code> に早期に切り替えるにはこの値を下げてください。<code translate="no">INVERTED</code> 、<code translate="no">STL_SORT</code> 、または<code translate="no">BITMAP</code> を明示的に指定した場合は、この設定は無視されます。</p>
