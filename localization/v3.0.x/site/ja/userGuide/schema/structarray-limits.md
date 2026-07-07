---
id: structarray-limits.md
title: StructArray の制限事項
summary: >-
  StructArray のサポート範囲には、スキーマ定義、挿入ペイロード、インデックス作成、検索モード、および StructArray
  独自のフィルターが含まれます。本番環境で StructArray の動作に依存する前に、このページを制限事項のリファレンスとしてご利用ください。
---
<h1 id="StructArray-Limits" class="common-anchor-header">StructArray の制限事項<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray のサポート範囲は、スキーマ定義、挿入ペイロード、インデックス作成、検索モード、および StructArray 固有のフィルターに及びます。本番環境で StructArray の動作に依存する前に、このページを制限事項のリファレンスとしてご利用ください。</p>
<p>StructArrayの制限のほとんどは、StructArrayスキーマモデル、ベクトルサブフィールドに選択した検索モード、およびコレクションが実行されているMilvusバージョンのいずれかから生じます。</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">制限事項の概要<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>領域</th><th>制限</th></tr>
</thead>
<tbody>
<tr><td>スキーマの形状</td><td>Struct は、Array フィールドの要素型としてのみ使用できます。Struct は、トップレベルのコレクションフィールドとしてはサポートされていません。</td></tr>
<tr><td>サブフィールドのスキーマ</td><td>同じ StructArray フィールド内のすべての Struct 要素は、1 つの事前定義された Struct スキーマを共有します。</td></tr>
<tr><td>容量</td><td><code translate="no">max_capacity</code> は必須であり、1つのエンティティが StructArray フィールドに格納できる Struct 要素の数を制限します。</td></tr>
<tr><td>サブフィールドの変更</td><td>StructArray フィールドが作成された後、その既存の StructArray フィールドにサブフィールドを追加することはできません。</td></tr>
<tr><td>サブフィールドのパス</td><td>インデックス、検索対象、出力フィールド、およびフィルターには、<code translate="no">chunks[emb]</code> などの<code translate="no">structArray[subfield]</code> パスを使用してください。<code translate="no">chunks.emb</code> は使用しないでください。</td></tr>
<tr><td>シェイプの挿入</td><td>StructArrayフィールドをオブジェクトの配列として挿入してください。挿入ペイロード内ではパス構文を使用しないでください。</td></tr>
<tr><td>ベクトルインデックス</td><td>ベクトルフィールドまたはベクトルサブフィールドは、1つのインデックスのみを受け付けます。EmbeddingList検索と要素レベル検索には、それぞれ別のベクトルサブフィールドを使用してください。</td></tr>
<tr><td>関数</td><td>StructArrayフィールド内のフィールドまたはサブフィールドでは、フィールド関数はサポートされていません。</td></tr>
<tr><td>Null 許容フィールド</td><td>Null 許容の StructArray フィールドはバージョンに依存します。サポートされている場合、Null は個々の Struct 要素ごとに独立して適用されるのではなく、StructArray フィールド全体に適用されます。</td></tr>
<tr><td>動的なフィールドの追加</td><td>既存のコレクションへの StructArray フィールドの追加はバージョンに依存しており、追加するフィールドは null 許容である必要があります。</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">スキーマの制限<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>制限</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td>Struct はトップレベルのフィールド型ではありません。</td><td>StructArray フィールドを、<code translate="no">datatype=DataType.ARRAY</code> 、<code translate="no">element_type=DataType.STRUCT</code> 、および<code translate="no">struct_schema</code> として作成します。</td></tr>
<tr><td>すべての要素は 1 つのスキーマを共有します。</td><td>StructArray フィールド内のすべての Struct 要素は、同じサブフィールドリストおよびサブフィールドのデータ型に従います。</td></tr>
<tr><td><code translate="no">max_capacity</code> は必須です。</td><td>1 つのエンティティに含まれる Struct 要素の数は、StructArray フィールドに設定された<code translate="no">max_capacity</code> を超えてはなりません。</td></tr>
<tr><td>既存のサブフィールドは固定されています。</td><td>既存のサブフィールドは固定されています。既存の StructArray フィールドに新しいサブフィールドを追加することはできません。サブフィールドのスキーマを変更するには、StructArray フィールドを削除し、更新されたスキーマで再度追加してください。</td></tr>
<tr><td>ネストされた StructArray はサポートされていません。</td><td>StructArray フィールドには、ネストされた<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 、または<code translate="no">ArrayOfStruct</code> サブフィールドを含めることはできません。</td></tr>
<tr><td>StructArray 内の関数はサポートされていません。</td><td>StructArray フィールドまたはそのサブフィールドに対して、フィールド関数を定義しないでください。</td></tr>
</tbody>
</table>
<p>スキーマ作成の例については、「<a href="/docs/ja/create-structarray-field.md">StructArray フィールドの作成」を</a>参照してください。</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">サポートされているサブフィールドのデータ型<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray のサブフィールドは、物理的な配列形式のストレージにマッピングされます。次の表に、サポートされている物理型とサポートされていない物理型を示します。</p>
<table>
<thead>
<tr><th>Struct サブフィールドの物理型</th><th>サポート</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>サポート対象</td><td>サブフィールドを `<code translate="no">DataType.BOOL</code>` として定義します。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポート対象</td><td>サブフィールドを<code translate="no">DataType.INT8</code> 、<code translate="no">DataType.INT16</code> 、<code translate="no">DataType.INT32</code> 、または<code translate="no">DataType.INT64</code> として定義します。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポート対象</td><td>サブフィールドを<code translate="no">DataType.FLOAT</code> または<code translate="no">DataType.DOUBLE</code> として定義します。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポート対象サブフィールドを xml-ph-0000@deepl.internal または xml-ph-0001@deepl.internal として定義します。</td><td>サブフィールドを<code translate="no">DataType.VARCHAR</code> として定義し、<code translate="no">max_length</code> を設定します。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポート対象</td><td>サブフィールドを<code translate="no">DataType.FLOAT_VECTOR</code> として定義し、<code translate="no">dim</code> を設定します。サポート対象</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポート対象</td><td>サブフィールドを「<code translate="no">DataType.FLOAT16_VECTOR</code> 」として定義し、「<code translate="no">dim</code> 」に設定します。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポート対象</td><td>サブフィールドを「<code translate="no">DataType.BFLOAT16_VECTOR</code> 」として定義し、「<code translate="no">dim</code> 」に設定します。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポート対象</td><td>サブフィールドを「<code translate="no">DataType.INT8_VECTOR</code> 」として定義し、「<code translate="no">dim</code> 」に設定します。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポート対象</td><td>サブフィールドを<code translate="no">DataType.BINARY_VECTOR</code> として定義し、<code translate="no">dim</code> を設定します。サポート対象</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポートされていません</td><td>StructArray フィールドでは、スパースベクトルのサブフィールドはサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td><code translate="no">VARCHAR</code> を使用し、<code translate="no">String</code> は使用しないでください。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、JSON サブフィールドはサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、Geometry サブフィールドおよび GIS 関数はサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、Text サブフィールドはサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、Timestamptz サブフィールドおよび時間指定式はサポートされていません。</td></tr>
<tr><td>StructArray フィールドでは、ネストされた<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 、または<code translate="no">ArrayOfStruct</code></td><td>サポートされていません</td><td>StructArray フィールドは、ネストされた配列、ベクトル配列、Struct、または Array-of-Struct サブフィールドをサポートしていません。</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Null 許容および動的スキーマの制限<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Null 許容 StructArray の動作および動的な StructArray フィールドの追加は、バージョンによって制限されます。</p>
<table>
<thead>
<tr><th>機能</th><th>制限</th></tr>
</thead>
<tbody>
<tr><td>Null 許容 StructArray フィールド</td><td>Null 許容 StructArray および Null 許容ベクトル配列のサポートが含まれるバージョンでのみ利用可能です。</td></tr>
<tr><td>Python における null 値</td><td>PythonでStructArrayのnull値を挿入するには、<code translate="no">None</code> を使用してください。<code translate="no">Null</code> や<code translate="no">null</code> は使用しないでください。</td></tr>
<tr><td>Nullの適用範囲</td><td>NullはStructArrayフィールド全体に適用されます。たとえば、<code translate="no">chunks=None</code> は、<code translate="no">chunks</code> がNull可能である場合にのみ有効です。</td></tr>
<tr><td>部分的にNullなStructArrayの値</td><td>StructArrayフィールドに有効な配列値が含まれている場合、同じ値内でnullのサブフィールド配列と有効なサブフィールド配列を混在させてはなりません。</td></tr>
<tr><td>StructArray フィールドの動的追加</td><td>既存のコレクションへの StructArray フィールドの動的追加は、動的な StructArray フィールドのサポートが含まれるバージョンでのみサポートされています。</td></tr>
<tr><td>動的追加における null 許容要件</td><td>既存のコレクションに追加される StructArray フィールドは、既存のエンティティには新しいフィールドの値がないため、null 許容でなければなりません。</td></tr>
<tr><td>動的追加後の既存のエンティティ</td><td>既存のエンティティは、追加された StructArray フィールドについて、そのサブフィールド全体で `<code translate="no">null</code> ` を返します。</td></tr>
</tbody>
</table>
<p>Milvus v3.0.x では、Null 許容の StructArray フィールド、Null 許容のベクトル配列、および動的な StructArray フィールドの追加が利用可能です。</p>
<p>Null 許容の StructArray フィールドを使用した挿入の例については、「<a href="/docs/ja/insert-data-into-structarray-fields.md">StructArray フィールドへのデータの挿入</a>」を参照してください。</p>
<h2 id="Insert-limits" class="common-anchor-header">挿入の制限<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>制限</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td>ペイロードの形状</td><td>StructArray フィールドを、<code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> のような Struct オブジェクトの配列として挿入します。</td></tr>
<tr><td>サブフィールド名</td><td>各 Struct オブジェクト内では、<code translate="no">chunks[text]</code> のようなパスではなく、<code translate="no">text</code> や<code translate="no">emb</code> のようなサブフィールド名を使用してください。</td></tr>
<tr><td>スキーマとの整合性</td><td>各 Struct 要素は、Struct スキーマと一致している必要があります。</td></tr>
<tr><td>容量</td><td>1 つのエンティティに含まれる Struct 要素の数は、<code translate="no">max_capacity</code> を超えてはなりません。</td></tr>
<tr><td>ベクトルの次元</td><td>ベクトル値は、そのベクトルサブフィールドに対して設定された<code translate="no">dim</code> と一致している必要があります。</td></tr>
<tr><td>検索モードの重複</td><td>EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、ベクトルを 2 つの別々のベクトルサブフィールドに書き込んでください。</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">インデックスおよびメトリックの制限<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray ベクトルサブフィールドは、EmbeddingList 検索または要素レベル検索のいずれかに対してインデックス付けできます。各ベクトルフィールドまたはベクトルサブフィールドは 1 つのインデックスのみを受け入れるため、同じベクトルサブフィールドで両方のメトリックファミリーを使用することはできません。</p>
<table>
<thead>
<tr><th>検索モード</th><th>メトリックファミリー</th><th>結果レベル</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList検索</td><td><code translate="no">MAX_SIM</code>、<code translate="no">MAX_SIM_COSINE</code> 、<code translate="no">MAX_SIM_IP</code> 、<code translate="no">MAX_SIM_L2</code> 、またはバイナリ<code translate="no">MAX_SIM_*</code> メトリック</td><td>エンティティレベルの結果。</td></tr>
<tr><td>要素レベルの検索</td><td><code translate="no">L2</code> 、<code translate="no">IP</code> 、<code translate="no">COSINE</code> 、<code translate="no">HAMMING</code> などの通常のベクトルメトリクス、または<code translate="no">JACCARD</code></td><td>一致した要素のオフセットを含めることができる要素レベルの結果。</td></tr>
</tbody>
</table>
<p>両方のモードが必要な場合は、別々のベクトルサブフィールドを使用してください。たとえば、EmbeddingList 検索には<code translate="no">chunks[emb_list_vector]</code> を、要素レベルの検索には<code translate="no">chunks[emb]</code> を使用します。</p>
<p>コレクションスキーマを設計する際、StructArray のベクトルサブフィールドはベクトルサブフィールドとしてカウントされます。ベクトルフィールドとベクトルサブフィールドの合計数が、対象のバージョンおよびサービスティアの制限内になるようにしてください。</p>
<p>サポートされているインデックス型およびメトリック型のマトリックスについては、「<a href="/docs/ja/index-structarray-fields.md">インデックスの StructArray フィールド</a>」を参照してください。</p>
<h2 id="Search-limits" class="common-anchor-header">検索の制限<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>検索の動作</th><th>サポートと制限</th></tr>
</thead>
<tbody>
<tr><td>基本的な EmbeddingList 検索</td><td><code translate="no">MAX_SIM*</code> メトリックでインデックス付けされた StructArray ベクトルサブフィールドでサポートされています。エンティティレベルの結果を返します。</td></tr>
<tr><td>基本的な要素レベル検索</td><td>通常のベクトルメトリクスでインデックス付けされたStructArrayベクトルサブフィールドでサポートされています。一致した要素のオフセットを返すことができます。</td></tr>
<tr><td>範囲検索</td><td>検索モードおよびターゲットバージョンのインデックス／メトリック対応状況に応じてサポートされます。要素レベルの StructArray リクエストにおけるハイブリッド検索範囲の挙動については、ターゲットバージョンを確認してください。</td></tr>
<tr><td>グループ化検索</td><td>要素レベルのグループ化検索では、オフセットを返すことができます。要素レベルの StructArray リクエストにおけるハイブリッド検索のグループ化動作は、バージョンに依存します。</td></tr>
<tr><td>ハイブリッド検索</td><td>ハイブリッド検索リクエストには、対象バージョンがその検索の組み合わせをサポートしている場合にのみ、StructArrayベクトルサブフィールドのリクエストを含めることができます。各リクエストは、引き続きインデックス化されたベクトルサブフィールドのメトリックファミリーに従います。</td></tr>
<tr><td>オフセット出力</td><td>オフセットは、要素レベルの検索結果で利用可能です。EmbeddingList検索はエンティティレベルの結果を返し、主要な結果単位として要素オフセットを使用しません。</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">フィルタおよび演算子の制限<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArrayのスカラーフィルタリングは、<code translate="no">element_filter</code> や<code translate="no">MATCH_*</code> ファミリーなどのStructArray演算子によって処理されます。詳細な述語サポートマトリックスについては、「<a href="/docs/ja/struct-array-operators.md">StructArray演算子</a>」を参照してください。</p>
<p>大まかに言えば：</p>
<ul>
<li><p><code translate="no">$[subfield]</code> は、StructArray演算子の内部でのみ使用してください。</p></li>
<li><p>スカラー述語には、スカラーサブフィールドを使用してください。</p></li>
<li><p><code translate="no">$[...]</code> のスカラー述語の入力として、ベクトルサブフィールドを使用しないでください。</p></li>
<li><p>StructArrayの要素レベルの述語では、JSONパス構文、JSON関数、配列コンテナ関数、テキスト一致関数、Geometry / GIS関数、およびTimestamptz式はサポートされていません。</p></li>
<li><p>単純なブール式ではなく、<code translate="no">$[has_code] == true</code> などの明示的なブール比較を使用することを推奨します。</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">関連ページ<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>StructArray フィールドを作成するには、「<a href="/docs/ja/create-structarray-field.md">StructArray フィールドの作成</a>」を参照してください。</p></li>
<li><p>データを挿入するには、「<a href="/docs/ja/insert-data-into-structarray-fields.md">StructArray フィールドへのデータの挿入</a>」を参照してください。</p></li>
<li><p>ベクトルおよびスカラーインデックスを作成するには、「<a href="/docs/ja/index-structarray-fields.md">StructArray フィールドのインデックス作成</a>」を参照してください。</p></li>
<li><p>StructArray のフィルタ構文を確認するには、「<a href="/docs/ja/struct-array-operators.md">StructArray 演算子</a>」を参照してください。</p></li>
</ol>
