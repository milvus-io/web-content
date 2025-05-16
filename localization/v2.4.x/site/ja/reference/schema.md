---
id: schema.md
summary: Milvusでスキーマを定義する方法を学びます。
title: スキーマの管理
---
<h1 id="Manage-Schema" class="common-anchor-header">スキーマの管理<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックではMilvusにおけるスキーマについて紹介します。スキーマはコレクションとその中のフィールドのプロパティを定義するために使用されます。</p>
<h2 id="Field-schema" class="common-anchor-header">フィールドスキーマ<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>フィールドスキーマはフィールドの論理的定義です。<a href="#Collection-schema">コレクションスキーマを</a>定義し、<a href="/docs/ja/v2.4.x/manage-collections.md">コレクションを管理する</a>前に最初に定義する必要があります。</p>
<p>Milvusはコレクション内の主キーフィールドを1つだけサポートしています。</p>
<h3 id="Field-schema-properties" class="common-anchor-header">フィールドスキーマプロパティ</h3><table class="properties">
    <thead>
    <tr>
        <th>プロパティ</th>
        <th>説明</th>
        <th>備考</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>作成するコレクション内のフィールド名</td>
        <td>データ型：<br/>必須</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>フィールドのデータ型</td>
        <td>必須</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>フィールドの説明</td>
        <td>データ型：<br/>任意</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>フィールドを主キーフィールドとして設定するかどうか。</td>
        <td>データ型：ブール値（<code translate="no">true</code> または<code translate="no">false</code> ）。<br/>主キーフィールドには必須。</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (主キー・フィールドの場合は必須）</td>
            <td>ID（主キー）の自動割り当てを有効または無効にするスイッチ。</td>
            <td><code translate="no">True</code> または<code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (VARCHARフィールドでは必須）。</td>
            <td>挿入可能な文字列の最大バイト長。マルチバイト文字（Unicode文字など）はそれぞれ1バイト以上を占めることがあるので、挿入される文字列のバイト長が指定された上限を超えないようにしてください。</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>ベクトルの次元</td>
            <td>データ型：<br/>密なベクトル・フィールドでは必須。<a href="https://milvus.io/docs/sparse_vector.md">疎なベクトル</a>場では省略。</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>このフィールドがパーティション・キー・フィールドであるかどうか。</td>
        <td>データ型：Boolean (<code translate="no">true</code> または<code translate="no">false</code>)。</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">フィールド・スキーマの作成</h3><p>データ挿入の複雑さを軽減するために、Milvusではフィールドスキーマ作成時に、プライマリキーフィールドを除く各スカラーフィールドのデフォルト値を指定することができます。これは、データ挿入時にフィールドを空のままにした場合、このフィールドに指定したデフォルト値が適用されることを示します。</p>
<p>通常のフィールド・スキーマを作成する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>デフォルト・フィールド値を持つフィールド・スキーマを作成します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">サポートされるデータ型</h3><p><code translate="no">DataType</code> は、フィールドに含まれるデータの種類を定義します。フィールドによってサポートするデータ型が異なります。</p>
<ul>
<li><p>主キーフィールドは以下のデータ型をサポートします：</p>
<ul>
<li>INT64: numpy.int64</li>
<li>varchar: varchar</li>
</ul></li>
<li><p>スカラーフィールドがサポートします：</p>
<ul>
<li>BOOL: ブーリアン (<code translate="no">true</code> または<code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>varchar: varchar</li>
<li>JSON:<a href="/docs/ja/v2.4.x/use-json-fields.md">JSON</a></li>
<li>配列：<a href="/docs/ja/v2.4.x/array_data_type.md">配列</a></li>
</ul>
<p>複合データ型としてのJSONが利用できます。JSONフィールドはキーと値のペアで構成されます。各キーは文字列で、値は数値、文字列、ブーリアン値、配列、リストのいずれかです。詳細は<a href="/docs/ja/v2.4.x/use-json-fields.md">JSON: a new data typeを</a>参照。</p></li>
<li><p>ベクター・フィールドのサポート</p>
<ul>
<li>BINARY_VECTOR：バイナリ・データを0と1のシーケンスとして格納し、画像処理や情報検索でコンパクトな特徴表現に使用される。</li>
<li>FLOAT_VECTOR：32ビット浮動小数点数を格納。科学計算や機械学習で実数を表現する際によく使用される。</li>
<li>FLOAT16_VECTOR：16ビットの半精度浮動小数点数を格納し、ディープラーニングやGPU計算でメモリと帯域幅の効率化のために使用されます。</li>
<li>BFLOAT16_VECTOR：精度を落とした16ビット浮動小数点数を格納しますが、指数範囲はFloat32と同じで、精度に大きな影響を与えることなくメモリと計算量を削減するためにディープラーニングでよく使用されます。</li>
<li>SPARSE_FLOAT_VECTOR: スパース・ベクトルを表現するために使用される、非ゼロ要素とそれに対応するインデックスのリストを格納する。詳細は<a href="/docs/ja/v2.4.x/sparse_vector.md">スパースベクタを</a>参照してください。</li>
</ul>
<p>Milvusはコレクション内の複数のベクトルフィールドをサポートしています。詳細は<a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索を</a>参照。</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">コレクションスキーマ<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションスキーマはコレクションの論理的定義です。通常、コレクションスキーマを定義して<a href="/docs/ja/v2.4.x/manage-collections.md">コレクションを管理する</a>前に、<a href="#Field-schema">フィールドスキーマを</a>定義する必要があります。</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">コレクションスキーマのプロパティ</h3><table class="properties">
    <thead>
    <tr>
        <th>プロパティ</th>
        <th>説明</th>
        <th>注釈</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>作成するコレクション内のフィールド</td>
        <td>必須</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>コレクションの説明</td>
        <td>データ型：<br/>オプション</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>パーティション・キーとして機能するように設計されたフィールドの名前。</td>
        <td>データ型：<br/>オプション</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>ダイナミック・スキーマを有効にするかどうか。</td>
        <td>データ型：<code translate="no">true</code> <code translate="no">false</code><br/>オプション、デフォルトは 。 ダイナミック・スキーマの詳細については、<code translate="no">False</code><br/><a herf="enable-dynamic-field.md">ダイナミック・スキーマ</a>およびコレクションを管理するためのユーザー・ガイドを参照してください。</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">コレクションスキーマの作成</h3><div class="alert note">
  コレクションスキーマを定義する前に、フィールドスキーマを定義します。</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>スキーマを指定してコレクションを作成します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">shards_num</code> でシャード番号を定義できます。</li>
<li><code translate="no">using</code> でエイリアスを指定して、コレクションを作成するMilvusサーバーを定義できます。</li>
<li><a href="/docs/ja/v2.4.x/multi_tenancy.md">パーティションキーベースのマルチテナンシーを</a>実装する必要がある場合、<code translate="no">is_partition_key</code> を<code translate="no">True</code> に設定することで、フィールドのパーティションキー機能を有効にできます。</li>
<li><a href="/docs/ja/v2.4.x/enable-dynamic-field.md">動的フィールドを有効にする</a>必要がある場合、コレクションスキーマで<code translate="no">enable_dynamic_field</code> を<code translate="no">True</code> に設定することで、動的スキーマを有効にできます。</li>
</ul>
</div>
<p><br/>
また、<code translate="no">Collection.construct_from_dataframe</code> を使用してコレクションを作成することもできます。これは、DataFrameからコレクション・スキーマを自動的に生成し、コレクションを作成します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/v2.4.x/manage-collections.md">コレクションを管理する</a>際にスキーマを準備する方法を学びます。</li>
<li><a href="/docs/ja/v2.4.x/enable-dynamic-field.md">動的スキーマの</a>詳細。</li>
<li><a href="/docs/ja/v2.4.x/multi_tenancy.md">マルチテナントにおける</a>パーティション・キーについて。</li>
</ul>
