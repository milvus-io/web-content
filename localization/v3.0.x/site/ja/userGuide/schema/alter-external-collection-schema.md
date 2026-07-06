---
id: alter-external-collection-schema.md
title: 外部コレクションのスキーマを変更するCompatible with Milvus 3.0.x
summary: 既存の外部コレクションにおいて、外部データソースから追加のフィールドを表示する方法について学びます。
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">外部コレクションのスキーマを変更する<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>外部コレクションを作成した後、外部データソースはしばしば変更されます。たとえば、すでに埋め込みデータを格納しているレイクハウステーブルに、後でスコア、カテゴリ、タイムスタンプなどの新しいスカラーフィールドが追加され、それらをクエリ結果として返したり、フィルタで使用したりしたい場合があります。</p>
<p>外部コレクションを再作成したり、ソースデータをMilvusにコピーしたりする代わりに、外部データソースの既存のフィールドに対応するMilvusフィールドを追加します。フィールドを追加した後、外部コレクションを更新することで、クエリや検索で新しいフィールドを使用できるようになります。</p>
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
    </button></h2><ul>
<li><p>外部コレクションでは現在、作成後のフィールド追加がサポートされています。フィールドの削除、フィールド名の変更、フィールドのデータ型の変更、ベクトルの次元の変更、<code translate="no">external_field</code> の再マッピングなど、その他のスキーマ変更はサポートされていません。</p></li>
<li><p>追加できるのは、外部データソースにすでに存在するフィールドのみです。この操作は、既存の外部フィールドをMilvusフィールドにマッピングするものです。外部データソースに新しいフィールドを作成したり、ソースデータをバックフィルしたりすることはありません。</p></li>
<li><p>既存の外部コレクションへの<code translate="no">SPARSE_FLOAT_VECTOR</code> フィールドの追加はサポートされていません。</p></li>
<li><p>既存の外部コレクションへの StructArray フィールドの追加はサポートされていません。外部コレクションに StructArray フィールドが必要な場合は、コレクションの作成時にコレクションスキーマ内で定義してください。</p></li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">フィールドの追加<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>外部コレクションにフィールドを追加する前に、そのフィールドが外部データソースにすでに存在することを確認してください。その後、<code translate="no">add_collection_field()</code> を呼び出し、<code translate="no">external_field</code> を外部データソースのフィールド名に設定することで、そのフィールドをMilvusで公開します。<code translate="no">data_type</code> には、外部データソースのフィールドと一致するMilvusのデータ型を設定します。たとえば、マッピングされたフィールドが倍精度値を格納している場合は、<code translate="no">DataType.DOUBLE</code> を使用します。</p>
<p>マネージドコレクションとは異なり、追加されたフィールドの値は、外部コレクションを更新した後に外部データソースから読み込まれます。</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">スカラーフィールドの追加<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>クエリ結果にフィールドを返したり、フィルタで使用したりしたい場合は、<code translate="no">add_collection_field()</code> を使用してスカラーフィールドを追加します。次の例では、外部データソースの `<code translate="no">score</code> ` フィールドにマッピングされる `<code translate="no">score</code> ` フィールドを追加しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;score&quot;</span>,
    data_type=DataType.DOUBLE,
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;score&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、<code translate="no">score</code> が Milvus のフィールド名であり、<code translate="no">external_field=&quot;score&quot;</code> は外部データソースの<code translate="no">score</code> フィールドにマッピングされます。コレクションがすでに作成された後にフィールドが追加されるため、<code translate="no">nullable=True</code> を設定します。</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">ベクトルフィールドの追加<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>外部データソースにベクトル値がすでに含まれている場合は、ベクトルフィールドを追加することもできます。ベクトル<code translate="no">data_type</code> および<code translate="no">dim</code> を、外部データソースのベクトルフィールドに合わせて設定します。</p>
<p>次の例では、<code translate="no">image_embedding_v2</code> という名前の密ベクトルフィールドを追加しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    data_type=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">768</span>,</span>
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>追加したベクトルフィールドに対してベクトル検索を実行する予定がある場合は、外部コレクションを更新する前に、そのフィールドのインデックスを作成してください。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Refresh-the-external-collection" class="common-anchor-header">外部コレクションの更新<button data-href="#Refresh-the-external-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>外部コレクションのスキーマを変更した後は、外部コレクションを更新して、Milvus が外部コレクションのメタデータを更新し、クエリ、検索、およびフィルタの結果にスキーマの変更が反映されるようにしてください。</p>
<pre><code translate="no" class="language-python">client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
