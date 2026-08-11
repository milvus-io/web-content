---
id: add-fields-to-an-existing-collection.md
title: コレクションスキーマの変更
summary: 既存のコレクションスキーマを、ユーザー定義フィールドや関数、およびそれらによって生成されるベクトルフィールドを追加または削除して変更します。
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">コレクションスキーマの変更<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>コレクションが開発環境から本番環境へ移行する際、そのスキーマは変更されることがよくあります。フィルタリングやアプリケーションロジックのために、<code translate="no">source_uri</code> や<code translate="no">review_status</code> といったスカラーフィールドを追加したり、アプリケーションによって生成された埋め込みデータ用の新しいベクトルフィールドを追加したり、既存のテキストに対する語彙検索のためにBM25関数とその生成されたスパースベクトルフィールドを追加したり、あるいは使用されなくなったフィールドや関数を削除したりすることがあります。 「コレクションスキーマの変更」を使用すると、コレクションを再作成することなく、サポートされているフィールドや関数の変更をその場で行うことができます。</p>
<div class="alert note">
<p>このガイドでは、管理対象コレクションにおけるユーザー定義フィールドおよび、その生成ベクトルフィールドを持つ関数のスキーマ変更について説明します。外部コレクションにフィールドを追加するには、<a href="/docs/ja/alter-external-collection-schema.md">「Alter External Collection Schema」</a>を参照してください。<code translate="no">VARCHAR</code> フィールドの<code translate="no">max_length</code> や、<code translate="no">ARRAY</code> フィールドの<code translate="no">max_capacity</code> の変更など、フィールドプロパティの変更については、<a href="/docs/ja/alter-collection-field.md">「Alter Collection Field</a>」を参照してください。 動的フィールドの動作については、「<a href="/docs/ja/enable-dynamic-field.md">動的フィールド</a>」および「<a href="/docs/ja/modify-collection.md">コレクションの変更</a>」を参照してください。</p>
</div>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>ユーザー定義フィールドの追加</strong></p>
<ul>
<li><p>追加するユーザー定義フィールドは、null 許容でなければなりません。<code translate="no">add_collection_field()</code> を呼び出す際は、<code translate="no">nullable=True</code> を設定してください。既存エンティティの場合、<code translate="no">default_value</code> を使用してスカラーフィールドを追加しない限り、追加されるフィールドは<code translate="no">NULL</code> となります。</p></li>
<li><p>ユーザー定義のスカラーフィールドの追加は、Milvus 2.6.x 以降でサポートされています。ユーザー定義のベクトルフィールドの追加は、Milvus 2.6.18 以降でサポートされています。</p></li>
<li><p>StructArray フィールドの追加は、Milvus 3.0.0 以降でサポートされています。追加する StructArray フィールドは、null 許容でなければなりません。</p></li>
<li><p>フィールド名は、コレクション内のフィールド間で一意である必要があります。</p></li>
</ul>
<p><strong>関数とその生成ベクトルフィールドの追加</strong></p>
<ul>
<li><p>スキーマの更新ごとに、1 つの関数と 1 つの生成ベクトルフィールドのみを追加できます。</p></li>
<li><p>サポートされている関数によって、生成されるベクトルフィールドの型が決まります。<code translate="no">BM25</code> は `<code translate="no">SPARSE_FLOAT_VECTOR</code> ` フィールドを生成し、<code translate="no">MINHASH</code> は `<code translate="no">BINARY_VECTOR</code> ` フィールドを生成します。</p></li>
<li><p>生成されるベクトルフィールドは新しいフィールドでなければなりません。コレクションスキーマにすでに存在するフィールドを参照することはできません。</p></li>
<li><p>生成されるベクトルフィールドは、NULL 許容であってはなりません。</p></li>
<li><p>この関数で使用される入力フィールドは、コレクション内にすでに存在している必要があります。</p></li>
<li><p>既存のコレクションに BM25 または MinHash 関数を追加する場合、関数の入力は<code translate="no">VARCHAR</code> フィールドでなければなりません。Milvus では、この入力タイプから既存エンティティに対して生成された出力をバックフィルできないため、このワークフローでは<code translate="no">TEXT</code> 入力はサポートされていません。</p></li>
</ul>
<p><strong>ユーザー定義フィールドの削除</strong></p>
<ul>
<li><p>コレクション内の主キーフィールド、パーティションキーフィールド、クラスタリングキーフィールド、および最後のベクトルフィールドを削除することはできません。</p></li>
<li><p><code translate="no">ARRAY&lt;STRUCT&gt;</code> フィールド全体を削除することはできますが、<code translate="no">ARRAY&lt;STRUCT&gt;</code> フィールド内の個々のサブフィールドを削除することはできません。</p></li>
<li><p>関数の入力フィールドとして使用されているフィールド、または関数の出力フィールドとして生成されたフィールドを直接削除することはできません。関数の出力フィールドを削除するには、そのフィールドを生成する関数を削除してください。</p></li>
</ul>
<p><strong>関数とその生成されたベクトルフィールドを削除する</strong></p>
<ul>
<li><p>このスキーマ変更ワークフローでは、関数を削除すると、その関数、生成されたベクトルフィールド、および関連するインデックスが削除されます。関数の入力フィールドはコレクションのスキーマに残ります。</p></li>
<li><p>関数を削除する際、その生成されたベクトルフィールドを削除するとコレクションにベクトルフィールドが一切残らなくなる場合は、関数の削除は拒否されます。</p></li>
</ul>
<div class="alert note">
<p>サポートされている追加および削除操作の範囲外でのスキーマ変更を行う場合は、コレクションを再作成するか、移行してください。</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">既存のコレクションへのフィールドおよび関数の追加<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>ユーザー定義フィールドを追加する場合と、ベクトルフィールドを生成する関数を追加する場合で、適切なワークフローを選択してください：</p>
<ul>
<li><p>フィルタリング、クエリ出力、またはアプリケーションロジック用に新しいメタデータが必要な場合は、<a href="#add-user-defined-scalar-fields--milvus-26x">ユーザー定義のスカラーフィールドを追加します</a>。</p></li>
<li><p>要素が同じ Struct スキーマを共有する配列フィールドが必要な場合は、<a href="#add-structarray-fields--milvus-300">StructArray フィールドを追加します</a>。</p></li>
<li><p>アプリケーションが埋め込みを生成し、ベクトル値をMilvusに書き込む場合は、<a href="#add-user-defined-vector-fields--milvus-2618">ユーザー定義のベクトルフィールドを追加してください</a>。</p></li>
<li><p>Milvusが既存のフィールド（テキストからのBM25スパースベクトルやMinHashシグネチャなど）からベクトル値を生成する必要がある場合は、<a href="#add-a-function-and-its-generated-vector-field--milvus-30x">関数とその生成されるベクトルフィールドを追加します</a>。</p></li>
</ul>
<p>いずれの場合も、新しいフィールド名はコレクション内に既に存在してはならず、フィールドの総数はMilvusのフィールド数制限を超えてはなりません。詳細については、「<a href="/docs/ja/limitations.md#number-of-resources-in-a-collection">Milvusの制限事項</a>」を参照してください。</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">ユーザー定義のスカラーフィールドを追加する<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add_collection_field()</code> を使用して、既存のコレクションにユーザー定義のスカラーフィールドを追加します。</p>
<p>これは、動的フィールドに任意のキーを格納することとは異なります。スキーマの更新が反映されると、新しいスカラーフィールドはコレクションスキーマの正規の一部となります。このフィールドへの値の挿入やアップサート、サポートされている場合はインデックスの作成、クエリや検索フィルターでの使用、およびクエリや検索結果での返却が可能になります。</p>
<p>既存エンティティは新しいフィールドが存在する以前に挿入されているため、追加するすべてのユーザー定義スカラーフィールドはNULL許容でなければなりません：</p>
<ul>
<li><p><code translate="no">nullable=True</code> を指定し、<code translate="no">default_value</code> を指定せずにスカラーフィールドを追加した場合、既存のエンティティは新しいフィールドに対して<code translate="no">NULL</code> を返します。</p></li>
<li><p><code translate="no">nullable=True</code> を指定し、<code translate="no">default_value</code> も指定してスカラーフィールドを追加した場合、既存のエンティティはその新しいフィールドに対して<code translate="no">NULL</code> を返します。</p></li>
</ul>
<p>スカラーフィルタ式は、<code translate="no">NULL</code> のスカラー値とは一致しません。詳細については、「<a href="/docs/ja/nullable-and-default.md">Nullable Fields</a>」を参照してください。</p>
<p><strong>例：Null 許容スカラーフィールドの追加</strong></p>
<p>次の例では、<code translate="no">product_catalog</code> という名前の既存のコレクションに、Null 許容の<code translate="no">source</code> フィールドを追加します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールドが追加されると、コレクションにすでに存在していたエンティティは、<code translate="no">source</code> に対して<code translate="no">NULL</code> を返します。新しいエンティティは、挿入またはアップサート時に<code translate="no">source</code> を設定できます。</p>
<p><strong>例：デフォルト値を持つスカラーフィールドを追加する</strong></p>
<p>既存のエンティティが `<code translate="no">NULL</code>` ではなく具体的な値を返すようにするには、スカラーフィールドを追加する際に `<code translate="no">default_value</code> ` を指定します。次の例では、`<code translate="no">review_status</code> ` フィールドを追加し、デフォルト値として `<code translate="no">&quot;unreviewed&quot;</code> ` を使用しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールドが追加された後、コレクションにすでに存在していたエンティティは、<code translate="no">review_status</code> に対して<code translate="no">&quot;unreviewed&quot;</code> を返します。新しいエンティティは、異なる値を設定することも、値が指定されていない場合はデフォルト値を使用することもできます。</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">StructArray フィールドの追加<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add_collection_struct_field()</code> を使用して、Struct 要素の配列を受け入れる StructArray フィールドを追加します。StructArray フィールドを追加するには、次のようにします。</p>
<ol>
<li><p>サポートされているデータ型の必要なサブフィールドを含む Struct スキーマを作成します。適用可能なデータ型については、<a href="/docs/ja/array-of-structs.md#Data-types">StructArray</a> を参照してください。</p></li>
<li><p>上記で作成した Struct スキーマを参照し、<code translate="no">add_collection_struct_field()</code> でフィールドの最大容量を設定します。</p></li>
<li><p>リクエスト内で `<code translate="no">nullable=True</code> ` を設定します。</p></li>
</ol>
<p><strong>例：Null 許容の StructArray フィールドを追加する</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>StructArrayフィールドが追加されると、コレクションにすでに存在するエンティティは、すべてのサブフィールドにおいて<code translate="no">chunks</code> に対して<code translate="no">NULL</code> を返します。新しいエンティティを挿入する際は、すべてのサブフィールドが<code translate="no">NULL</code> であるか、有効な値を持っていることを確認してください。一部のサブフィールドが<code translate="no">NULL</code> に設定され、他のサブフィールドが有効な値に設定されたエンティティを挿入すると、エラーが発生します。</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">ユーザー定義のベクトルフィールドを追加する<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>アプリケーションが埋め込みを生成し、ベクトル値をMilvusに書き込む場合は、`<code translate="no">add_collection_field()</code> `を使用してユーザー定義のベクトルフィールドを追加してください。</p>
<p>追加されるすべてのユーザー定義ベクトルフィールドは、Nullableでなければなりません。既存のエンティティについては、upsertまたはバックフィルワークフローを通じてベクトル値を書き込むまで、新しいベクトルフィールドの値は<code translate="no">NULL</code> となります。新しいエンティティは、挿入時にこのベクトルフィールドを含めることができます。ベクトル検索では、ベクトル値が<code translate="no">NULL</code> であるエンティティはスキップされます。詳細については、<a href="/docs/ja/nullable-and-default.md">「Nullableフィールド」</a>を参照してください。</p>
<p><strong>例: NULL許容のベクトルフィールドを追加する</strong></p>
<p>次の例では、<code translate="no">embedding_v2</code> という名前のヌル許容の密ベクトルフィールドを既存のコレクションに追加します。<code translate="no">dim</code> には、アプリケーションによって生成される埋め込みの次元数を設定してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールドを追加した後、検索を行う前に、新しいベクトルフィールドに対してインデックスを作成してください：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>既存エンティティの `<code translate="no">embedding_v2</code> ` には `<code translate="no">NULL</code> ` が設定されており、このフィールドで検索を行うとスキップされます。既存のエンティティを `<code translate="no">embedding_v2</code>` を通じて検索可能にするには、upsert またはバックフィルワークフローを通じて NULL 以外のベクトル値を書き込んでください。新しいエンティティについては、挿入時に `<code translate="no">embedding_v2</code> ` を指定できます。</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">関数とその生成ベクトルフィールドの追加<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>このワークフローは、Milvusが既存のコレクションにすでに格納されているデータから新しいベクトルフィールドを生成する必要がある場合に使用します。この操作により、3つの関連するスキーマ要素が追加されます：</p>
<ul>
<li><p>1つ以上の既存の入力フィールドから読み込む関数定義。</p></li>
<li><p>関数の出力を格納する新しいベクトルフィールド。</p></li>
<li><p>新しいベクトルフィールドにバインドされたインデックス定義。</p></li>
</ul>
<p>たとえば、BM25関数は既存の<code translate="no">VARCHAR</code> フィールドを読み取り、語彙検索用の<code translate="no">SPARSE_FLOAT_VECTOR</code> フィールドを生成します。また、MinHash関数は、近似重複検出用の<code translate="no">BINARY_VECTOR</code> フィールドを生成します。このワークフローでは、関数の入力フィールドを追加または置換することはありません。</p>
<div class="alert note">
<p>この機能を利用するには、Storage V3が必要です。有効化の手順および互換性に関する注意事項については、「<a href="/docs/ja/storage-v3.md">Storage V3</a>」を参照してください。</p>
</div>
<p>既存のコレクションに関数とその生成されたベクトルフィールドを追加するには、スキーマバージョンの圧縮およびストレージバージョンの圧縮も必要です。いずれかの設定が無効になっている場合、Milvusはリクエストを拒否します。これらの追加の前提条件は、既存のコレクションを変更する場合にのみ適用されます。初期のコレクションスキーマで関数を定義する場合、この既存データのバックフィルワークフローは使用されません。</p>
<p>サポートされている関数によって、生成されるベクトルフィールドの型が決まります：</p>
<table>
<thead>
<tr><th>関数</th><th>生成されるベクトルフィールドの型</th><th>代表的な入力フィールド</th><th>代表的なユースケース</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>アナライザーが有効な<code translate="no">VARCHAR</code> フィールド</td><td>語彙検索およびキーワードの関連性</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">VARCHAR</code> フィールド</td><td>近似重複の検出</td></tr>
</tbody>
</table>
<p>各関数の動作の詳細については、「<a href="/docs/ja/bm25-function.md">BM25関数</a>」および「<a href="/docs/ja/minhash-function.md">MinHash関数</a>」を参照してください。</p>
<p>生成されるベクトルフィールドは、コレクション内に既に存在してはならず、また null 許容であってはなりません。関数の入力フィールドは、既に存在している必要があります。</p>
<p><strong>例: BM25 関数とその生成されるスパースベクトルフィールドを追加する</strong></p>
<p>次の例では、<code translate="no">text_bm25</code> という名前のBM25関数と、その生成されるスパースベクトルフィールドである<code translate="no">text_sparse</code> を、既存のコレクションに追加します。コレクションには、アナライザーが有効化された<code translate="no">text</code> という名前の<code translate="no">VARCHAR</code> フィールドがすでに存在している必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">index_params</code> オブジェクトには、新しい関数の出力フィールドに対するインデックス定義が正確に1つ含まれている必要があります。Milvusは、関数、その生成されたベクトルフィールド、およびバウンドインデックス定義を、同じスキーマ変更として追加します。<code translate="no">add_function_field()</code> の後に、<code translate="no">create_index()</code> を個別に呼び出さないでください。</p>
<p>概念的には、この操作により、以下のFunction、生成された出力フィールド、およびバインドされたインデックス定義が追加されます：</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>リクエストが成功すると、<code translate="no">describe_collection()</code> は、コレクションスキーマ内の新しい<code translate="no">text_bm25</code> 関数とその生成された<code translate="no">text_sparse</code> ベクトルフィールドの両方を返します。Milvusは、新しいエンティティが書き込まれる際に、その関数出力を生成します。 既存のエンティティについては、Milvusはバックグラウンドでのコンパクションを通じて、生成されたベクトルフィールドを非同期的に埋めます。スキーマの可視性は、スキーマの更新が成功したことを確認するものではありますが、すべての既存エンティティに対するバックフィルが完了したことを示すものではありません。完全なBM25検索ワークフローについては、<a href="/docs/ja/full-text-search.md">「全文検索</a>」を参照してください。</p>
<p>Milvusは、近似重複検出のためのMinHash関数およびそれによって生成されるバイナリベクトルフィールドもサポートしています。MinHash関数は<code translate="no">FunctionType.MINHASH</code> を使用し、新しい<code translate="no">BINARY_VECTOR</code> 出力フィールドに書き込みを行います。設定の詳細については、<a href="/docs/ja/minhash-function.md">「MinHash関数」</a>を参照してください。</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">既存のコレクションからフィールドおよび関数を削除する<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>ユーザー定義フィールドがコレクションモデルの一部でなくなった場合は、そのフィールドを直接削除できます。関数とその生成されたベクトルフィールドを削除するには、その関数を削除してください。Milvusは、同じスキーマ変更の中で、生成されたフィールドとそのインデックスを削除します。</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">ユーザー定義フィールドの削除<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">drop_collection_field()</code> を使用して、コレクションモデルの一部でなくなったユーザー定義のスカラー、ベクトル、または StructArray フィールドを削除します。</p>
<p>フィールドを削除すると、まずコレクションスキーマとフィールドの可視性が変更されます：</p>
<ul>
<li><p><code translate="no">drop_collection_field()</code> が成功すると、コレクションスキーマが更新されます。<code translate="no">describe_collection()</code> は削除されたフィールドを返さなくなり、クエリや検索では<code translate="no">output_fields</code> でそのフィールドを返すことができなくなり、式内での使用もできなくなります。</p></li>
<li><p>削除されたフィールドに基づいて作成されたインデックスは、スキーマの更新の一環としてクリーンアップされます。</p></li>
</ul>
<p>ストレージのクリーンアップは、スキーマのクリーンアップとは別に行われます。詳細については、「<a href="#when-is-storage-space-reclaimed-after-dropping-a-field">フィールドの削除後、ストレージ領域はいつ解放されますか？</a>」を参照してください。</p>
<p><strong>例：ユーザー定義のスカラーフィールドを削除する</strong></p>
<p>次の例では、<code translate="no">experiment_tag</code> が<code translate="no">product_catalog</code> 内のユーザー定義スカラーフィールドであると仮定し、コレクションからこのフィールドを削除します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールドを削除した後、<code translate="no">describe_collection()</code> を呼び出して、そのフィールドがスキーマから削除されたことを確認できます。</p>
<p><strong>例: StructArrayフィールドの削除</strong></p>
<p>次の例では、<code translate="no">chunks</code> が<code translate="no">my_collection</code> 内の StructArray フィールドであると仮定し、コレクションからこのフィールドを削除します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>例：ユーザー定義のベクトルフィールドを削除する</strong></p>
<p>ベクトルフィールドも同様の `<code translate="no">drop_collection_field()</code> ` メソッドで削除できますが、削除後もコレクションには少なくとも 1 つのベクトルフィールドが残っている必要があります。これは、一時的に複数のベクトル表現を保持し、後でそのうちの 1 つに統一するコレクションで役立ちます。</p>
<p>以下の例では、<code translate="no">image_vector</code> が `<code translate="no">hybrid_catalog</code>` 内のユーザー定義ベクトルフィールドであり、コレクションには `<code translate="no">text_vector</code>` などの別のベクトルフィールドが依然として残っていることを前提としています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">image_vector</code> がコレクション内の最後のベクトル場である場合、削除操作は拒否されます。</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">関数とその生成されたベクトル場を削除する<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>BM25 関数や、それによって生成された疎ベクトルフィールドなど、関数やその生成されたベクトルフィールドが不要になった場合に、この操作を使用します。</p>
<p>関数名を引数として `<code translate="no">drop_function_field()</code> ` を呼び出します。Milvus は、関数の入力フィールドを保持したまま、その関数、生成されたベクトルフィールド、および関連するインデックスを削除します。</p>
<p><strong>例：BM25関数とその生成された疎ベクトルフィールドを削除する</strong></p>
<p>以下の例では、<code translate="no">text_bm25</code> が<code translate="no">product_catalog</code> 内の BM25 関数であり、<code translate="no">text_sparse</code> という名前の疎ベクトル出力フィールドを生成すると仮定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>操作が成功すると、<code translate="no">describe_collection()</code> は削除された関数やその生成されたベクトルフィールドを返さなくなります。関数の入力フィールドはスキーマに残ります。</p>
<p>関数の出力フィールドを削除することで、コレクションにベクトルフィールドが一切残らなくなる場合、この操作は拒否されます。</p>
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">フィールドや関数を追加するには、どのメソッドを使用すればよいですか？<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add_collection_field()</code> を使用して、ユーザー定義のスカラーフィールドまたはベクトルフィールドを追加します。</p>
<p>要素が同じ Struct スキーマを共有する配列フィールドが必要な場合は、<code translate="no">add_collection_struct_field()</code> を使用して StructArray フィールドを追加してください。</p>
<p><code translate="no">add_function_field()</code> を使用して、関数、その生成されたベクトルフィールド、およびバインドされたインデックスの定義を、同じスキーマ変更で追加します。</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">追加されたユーザー定義フィールドはなぜ null 許容でなければならないのですか？<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>既存エンティティは、新しいフィールドが存在する前に挿入されたため、そのフィールドの値を持っていません。<code translate="no">nullable=True</code> を設定することで、アプリケーションが値を書き込むまで、またはスカラーフィールドの場合はデフォルト値が適用されるまで、Milvus はその欠落値を `<code translate="no">NULL</code> ` として表現します。</p>
<p>このルールは、<code translate="no">add_collection_field()</code> で追加されたユーザー定義のスカラーフィールドおよびユーザー定義のベクトルフィールド、ならびに<code translate="no">add_collection_struct_field()</code> で追加された StructArray フィールドに適用されます。関数によって生成されたベクトルフィールドには適用されません。これらのフィールドは NULL 許容にできません。</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">ユーザー定義フィールドを追加した後、既存エンティティにはどのような影響がありますか？<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>ユーザー定義のスカラーフィールドの場合、<code translate="no">default_value</code> を設定しない限り、既存のエンティティは<code translate="no">NULL</code> を返します。<code translate="no">default_value</code> を設定した場合、既存のエンティティはそのデフォルト値を返します。</p>
<p>ユーザー定義のベクトルフィールドの場合、既存のエンティティでは新しいベクトルフィールドの値が<code translate="no">NULL</code> となります。追加されたフィールドに対するベクトル検索では、ベクトル値が<code translate="no">NULL</code> であるエンティティはスキップされます。既存のエンティティを新しいベクトルフィールドで検索可能にするには、upsertまたはバックフィルワークフローを通じてNULL以外のベクトル値を書き込んでください。新しいエンティティは、挿入時に新しいベクトルフィールドを含めることができます。</p>
<p>StructArrayフィールドの場合、既存のエンティティは、そのすべてのサブフィールドにわたって、新しいStructArrayフィールドに対して<code translate="no">NULL</code> を返します。新しいエンティティは、すべてのサブフィールドに対して<code translate="no">NULL</code> を指定するか、すべてのサブフィールドに対して有効な値を指定する必要があります。</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">既存のコレクションにBM25語彙検索を追加することはできますか？<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>はい。コレクションにすでにアナライザーが有効化された<code translate="no">VARCHAR</code> フィールドが存在する場合、BM25関数とその生成されたスパースベクトルフィールドを追加して、語彙検索を行うことができます。このワークフローでは、Milvusは関数、新しい<code translate="no">SPARSE_FLOAT_VECTOR</code> 出力フィールド、およびバウンドインデックスの定義を、同じスキーマ変更として追加します。 このスキーマ変更ワークフローでは、既存の<code translate="no">TEXT</code> フィールドをBM25の入力として使用することはできません。<code translate="no">TEXT</code> 入力を使用するには、コレクションの作成時にフィールドとBM25関数を定義してください。</p>
<p><code translate="no">add_function_field()</code> を呼び出す際は、新しい出力フィールド用の<code translate="no">metric_type=&quot;BM25&quot;</code> を含む<code translate="no">SPARSE_INVERTED_INDEX</code> インデックスを1つ持つ<code translate="no">index_params</code> オブジェクトを指定してください。Milvusは、同じスキーマ変更の一環として、インデックス定義を生成されたフィールドにバインドします。</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">関数とその生成されたベクトルフィールドを削除するにはどうすればよいですか？<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>関数名を引数として<code translate="no">drop_function_field()</code> を呼び出します。このスキーマ変更ワークフローにおいて、Milvusは関数、その生成されたベクトルフィールド、および関連するインデックスをまとめて削除しますが、関数の入力フィールドは保持されます。</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">コレクションのスキーマを変更した後、待機する必要がありますか？<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>通常、手動で待機する必要はありません。次の操作が更新されたスキーマに依存する場合は、まず `<code translate="no">describe_collection()</code> ` を呼び出して、Milvus が現在返しているスキーマを確認することができます。</p>
<p>分散デプロイ環境では、Milvus コンポーネントがコレクションのメタデータを更新する間に、わずかな伝播遅延が生じる場合があります。スキーマ変更直後の操作がスキーマ関連のエラーで失敗した場合は、スキーマを再読み込みして操作を再試行してください。</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">フィールドを削除した後、ストレージ領域はいつ解放されますか？<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>フィールドを削除すると、そのフィールドは現在のスキーマおよび通常のクエリ／検索の対象から除外されますが、そのフィールドの履歴データはオブジェクトストレージから直ちに物理的に削除されるわけではありません。</p>
<p>ストレージ容量は、後のコンパクション処理中に解放されます。コンパクションとは、既存のデータファイルを、よりコンパクトな新しいファイルに再編成するバックグラウンドプロセスです。フィールドが削除された後、新たにコンパクションされたファイルは現在のスキーマに従い、削除されたフィールドは除外されます。Milvusは、フィールドの削除後にストレージ容量が即座に、あるいは特定のタイミングで削減されることを保証するものではありません。</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">動的フィールドキーと同じ名前のスカラーフィールドを追加するとどうなりますか？<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>動的フィールドが有効になっている場合、既存の動的フィールドキーと同じ名前のスカラーフィールドを追加できます。新しいスカラーフィールドは、通常のクエリ出力において動的フィールドキーをマスクしますが、元の動的データは `<code translate="no">$meta</code>` に保持されます。</p>
<p>たとえば、既存エンティティに「<code translate="no">source</code> 」という名前の動的キーが格納されており、後で「<code translate="no">source</code> 」という名前のスカラーフィールドを追加した場合、「<code translate="no">source</code> 」に対する通常の出力では、スカラーフィールドが参照されます。元の動的値にアクセスするには、「<code translate="no">$meta</code> 」というパス構文（例：<code translate="no">$meta[&quot;source&quot;]</code> ）を使用してください。</p>
