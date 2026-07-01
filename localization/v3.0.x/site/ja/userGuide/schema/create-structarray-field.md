---
id: create-structarray-field.md
title: StructArrayフィールドの作成
summary: >-
  1つのエンティティに、構造化された要素の順序付きリストを含める必要がある場合は、StructArrayフィールドを作成します。StructArrayフィールドとは、要素型がStructであるArrayフィールドのことです。各Struct要素は同一のスキーマに従い、スカラーサブフィールド、ベクトルサブフィールド、あるいはその両方を含むことができます。
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">StructArrayフィールドの作成<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>1つのエンティティに、構造化された要素の順序付きリストを含める必要がある場合は、StructArrayフィールドを作成します。StructArrayフィールドは、要素型がStructであるArrayフィールドです。各Struct要素は同じスキーマに従い、スカラーサブフィールド、ベクトルサブフィールド、またはその両方を含むことができます。</p>
<p>このページでは、Structスキーマを定義し、それをStructArrayフィールドとして追加し、後の検索やフィルタリングに備えてサブフィールドを選択する方法、およびデータの挿入やインデックス作成の前に適用されるスキーマのルールを理解する方法について説明します。</p>
<h2 id="Before-you-begin" class="common-anchor-header">開始する前に<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>このページでは、<code translate="no">tech_articles</code> という名前のコレクションを使用しています。各エンティティは1つの技術記事を表しており、<code translate="no">chunks</code> フィールドには、チャンクレベルのデータがStruct要素として格納されています。</p>
<table>
<thead>
<tr><th>フィールド</th><th>タイプ</th><th>目的</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>記事の主キー。</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>記事のタイトル。</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>記事レベルのカテゴリ。</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>記事レベルのベクトルフィールド。後述のハイブリッド検索の例で使用されます。</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>チャンクレベルのテキスト、メタデータ、および埋め込みを格納する StructArray フィールド。</td></tr>
</tbody>
</table>
<p><code translate="no">chunks</code> のStructArrayフィールドには、以下のサブフィールドが含まれます。</p>
<table>
<thead>
<tr><th>サブフィールド</th><th>タイプ</th><th>目的</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>チャンクのテキスト。</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td><code translate="no">index</code> 、<code translate="no">search</code> 、<code translate="no">filter</code> などのセクション名。</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>チャンクのページ番号または論理的な位置。</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>スカラーフィルタリングや範囲の例で使用されるチャンクレベルのスコア。</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>チャンクにコードが含まれているかどうか。</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">MAX_SIM*</code> メトリックを使用した EmbeddingList 検索のためのベクトルサブフィールド。</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>通常のベクトルメトリクスを使用した要素レベル検索用のベクトルサブフィールド。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>ベクトルフィールドまたはベクトルサブフィールドは、1 つのインデックスのみを受け入れます。EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、2 つの別々のベクトルサブフィールドを定義してください。この例では、<code translate="no">chunks[emb_list_vector]</code> は EmbeddingList 検索用、<code translate="no">chunks[emb]</code> は要素レベルの検索用です。</p>
</div>
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
    </button></h2><p>StructArrayフィールドは、各Structサブフィールドに対して1つの配列値を格納します。Structスキーマを定義する際は、サポートされているスカラーおよびベクトルファミリーからサブフィールドの型を選択してください。</p>
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
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポート対象</td><td>サブフィールドを「<code translate="no">DataType.BINARY_VECTOR</code> 」として定義し、「<code translate="no">dim</code> 」に設定します。</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>サポートされていません</td><td>StructArray フィールドでは、スパースベクトルのサブフィールドはサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>`<code translate="no">VARCHAR</code>` を使用し、`<code translate="no">String</code>` は使用しないでください。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、JSON サブフィールドはサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、ジオメトリのサブフィールドおよび GIS 関数はサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、Text サブフィールドはサポートされていません。</td></tr>
<tr><td><code translate="no">Array</code></td><td>サポートされていません</td><td>StructArray フィールドでは、Timestamptz サブフィールドおよび時間指定式はサポートされていません。</td></tr>
<tr><td>StructArray フィールドでは、ネストされた<code translate="no">Array</code> 、<code translate="no">ArrayOfVector</code> 、<code translate="no">Struct</code> 、または<code translate="no">ArrayOfStruct</code></td><td>サポートされていません</td><td>StructArray フィールドには、ネストされた配列、ネストされたベクトル配列、ネストされた Struct フィールド、またはネストされた Array-of-Struct フィールドを含めることはできません。</td></tr>
</tbody>
</table>
<p>バージョン固有のサポート、Null 許容の挙動、およびその他の制限については、「<a href="/docs/ja/structarray-limits.md">StructArray の制限</a>」を参照してください。</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">StructArray フィールドを含むコレクションを作成する<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray フィールドを作成するには、まず各要素で使用される Struct スキーマを定義します。次に、Array フィールドを追加し、その要素型を Struct に設定します。</p>
<ol>
<li><p>コレクションスキーマを作成します。</p></li>
<li><p>主キーや記事レベルのフィールドなど、コレクションレベルのフィールドを追加します。</p></li>
<li><p>StructArray フィールド内に格納される要素用の Struct スキーマを作成します。</p></li>
<li><p>Structスキーマにスカラーおよびベクトルのサブフィールドを追加します。</p></li>
<li><p><code translate="no">element_type=DataType.STRUCT</code> を指定してArrayフィールドを追加します。</p></li>
<li><p><code translate="no">struct_schema</code> を Struct スキーマに設定します。</p></li>
<li><p><code translate="no">max_capacity</code> を設定して、各エンティティがこのフィールドに格納できる Struct 要素の数を制限します。</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">StructArray フィールドのパスの理解<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray フィールドを作成したら、<code translate="no">structArray[subfield]</code> パス構文を使用してそのサブフィールドを参照します。インデックスの作成、ベクトルサブフィールドの検索、サブフィールドの出力、またはスカラーフィルタの構築を行う際には、この構文を使用します。</p>
<table>
<thead>
<tr><th>パス</th><th>意味</th><th>一般的な使用法</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>各Struct要素内の<code translate="no">text</code> サブフィールド。</td><td>出力フィールドまたはスカラーフィルタリング。</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>各チャンクのセクションラベル。</td><td>スカラーフィルタリング。</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>チャンクレベルの品質スコア。</td><td>スカラーフィルタリングまたはスカラーインデックス。</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>埋め込みリストとして使用されるベクトルサブフィールド。</td><td><code translate="no">MAX_SIM*</code> による EmbeddingList の検索。</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>各 Struct 要素が個別に使用するベクトルサブフィールド。</td><td>要素レベルのベクトル検索。</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">StructArrayフィールドをNull可能にする<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x では、Null 許容の StructArray フィールドがサポートされています。Null 許容の StructArray フィールドを使用すると、エンティティは StructArray フィールド全体に対して `<code translate="no">null</code> ` を格納できるようになります。</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>警告
Nullable StructArrayフィールドは、Milvus v3.0.xでのみ利用可能です。Nullable StructArrayフィールドの場合、エンティティは有効なStructArray値を指定するか、フィールド全体を<code translate="no">null</code> に設定することができます。有効なStructArray値を挿入する際は、すべてのサブフィールドがnullであるか、有効な値を持つ必要があります。 一部のサブフィールドがnullで、他のサブフィールドが有効な値に設定されたエンティティを挿入すると、エラーが発生します。詳細については、「<a href="/docs/ja/structarray-limits.md">StructArrayの制限</a>」を参照してください。</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">既存のコレクションに StructArray フィールドを追加する<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x では、既存のコレクションに StructArray フィールドを追加することが可能です。コレクションにすでに存在するエンティティには新しいフィールドの値がないため、追加する StructArray フィールドは null 許容型である必要があります。</p>
<p>既存のコレクションにStructArrayフィールドを追加するには、まずStructスキーマを定義します。次に、<code translate="no">add_collection_struct_field()</code> を呼び出し、<code translate="no">nullable=True</code> を設定します。</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>StructArrayフィールドが追加されると、既存のエンティティは、その新しいフィールドのすべてのサブフィールドについて<code translate="no">null</code> を返します。</p>
<p>StructArrayフィールドが作成された後、その既存のStructArrayフィールドに新しいサブフィールドを追加することはできません。後で追加の要素属性が必要になった場合は、<code translate="no">drop_collection_field()</code> を呼び出してStructArrayフィールドを削除し、更新されたStructスキーマを使用して新しいStructArrayフィールドを追加してください。</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">スキーマのルール<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>ルール</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>Struct は Array 要素型として使用されます。</td><td><code translate="no">element_type=STRUCT</code> を使用して、StructArray フィールドを Array フィールドとして作成します。Struct をトップレベルのコレクションフィールドとして作成しないでください。</td></tr>
<tr><td>すべての要素は 1 つのスキーマを共有します。</td><td>同じ StructArray フィールド内のすべての Struct 要素は、そのフィールドに対して定義された Struct スキーマに従います。</td></tr>
<tr><td><code translate="no">max_capacity</code> は必須です。</td><td>これは、各エンティティが StructArray フィールドに格納できる Struct 要素の数を制限するものです。</td></tr>
<tr><td>サポートされているサブフィールド型のみ使用できます。</td><td>StructArray でサポートされているスカラーおよびベクトルサブフィールド型を使用してください。JSON、Geometry、Text、Timestamptz、SparseFloatVector、またはネストされた Struct / Array サブフィールドは定義しないでください。</td></tr>
<tr><td>ベクトルサブフィールドは、検索の前にインデックスを作成する必要があります。</td><td>ベクトル検索を実行する前に、<code translate="no">chunks[emb_list_vector]</code> や<code translate="no">chunks[emb]</code> などのパスにインデックスを作成してください。</td></tr>
<tr><td>1 つのベクトルサブフィールドには 1 つのインデックスがあります。</td><td>EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、2 つの別々のベクトルサブフィールドを作成してください。</td></tr>
<tr><td>既存の StructArray サブフィールドは固定されています。</td><td>StructArray フィールドを作成した後、その同じ StructArray フィールドにサブフィールドを追加することはできません。</td></tr>
<tr><td>Struct 内での関数の使用はサポートされていません。</td><td>StructArray フィールド内のフィールドやサブフィールドに対して関数を定義しないでください。</td></tr>
<tr><td>スカラーサブフィールドは、フィルタの要件に合致している必要があります。</td><td><code translate="no">section</code> 、<code translate="no">quality_score</code> 、<code translate="no">has_code</code> などのフィールドは、後でフィルタリング、グループ化、または出力する必要がある場合にのみ追加してください。</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">よくある間違い<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p><code translate="no">DataType.STRUCT</code> を、Array フィールドの要素型として使用するのではなく、最上位のコレクションフィールドとして作成してしまう。</p></li>
<li><p>StructArray フィールドで<code translate="no">max_capacity</code> を設定し忘れる。</p></li>
<li><p>JSON、Geometry、Text、Timestamptz、SparseFloatVector、ネストされた Array、ネストされた Struct、または Array-of-Struct など、サポートされていないサブフィールド型を定義してしまう。</p></li>
<li><p><code translate="no">String</code> をサブフィールド型として使用している。<code translate="no">VARCHAR</code> を使用し、<code translate="no">max_length</code> を設定してください。</p></li>
<li><p>EmbeddingList検索と要素レベル検索の両方に、1つのベクトルサブフィールドを使用している。</p></li>
<li><p>ベクトルサブフィールドのみを追加し、<code translate="no">section</code> 、<code translate="no">quality_score</code> 、<code translate="no">has_code</code> など、フィルタリングに必要なスカラーサブフィールドを省略すること。</p></li>
<li><p>ベクトルサブフィールドを、<code translate="no">$[...]</code> のようなスカラー述語の入力として扱う。ベクトル検索にはベクトルサブフィールドを、スカラー述語にはスカラーサブフィールドを使用する。</p></li>
<li><p>フィールド作成後、既存の StructArray フィールドに新しいサブフィールドを追加できるものと仮定する。</p></li>
<li><p>必須のパス構文 `<code translate="no">chunks[emb]</code> ` または `<code translate="no">chunks[emb_list_vector]</code>` の代わりに、`<code translate="no">chunks.emb</code> ` または `<code translate="no">chunks.emb_list_vector</code> ` を使用すること。</p></li>
<li><p>Null 許容 StructArray の挙動を、すべてのターゲットバージョンで利用可能であるかのように扱う。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">次の手順<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>StructArray フィールドにネストされたデータを挿入するには、「<a href="/docs/ja/insert-data-into-structarray-fields.md">StructArray フィールドへのデータの挿入</a>」を参照してください。</p></li>
<li><p>ベクトルおよびスカラーインデックスを作成するには、「<a href="/docs/ja/index-structarray-fields.md">StructArray フィールドのインデックス付け</a>」を参照してください。</p></li>
<li><p>StructArray のベクトルサブフィールドを検索するには、「StructArray を使用した基本的なベクトル検索」を参照してください。</p></li>
<li><p>サポートされているデータ型、Null 許容の挙動、およびバージョン固有の制限事項を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArray の制限事項</a>」を参照してください。</p></li>
</ol>
