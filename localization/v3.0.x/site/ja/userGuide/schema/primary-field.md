---
id: primary-field.md
title: 主キーと自動生成ID
summary: >-
  Milvus
  のすべてのコレクションには、各エンティティを一意に識別するためのプライマリフィールドが必須です。このフィールドにより、すべてのエンティティを曖昧さなく挿入、更新、照会、または削除できるようになります。
---
<h1 id="Primary-Field--AutoID" class="common-anchor-header">主キーと自動生成ID<button data-href="#Primary-Field--AutoID" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus のすべてのコレクションには、各エンティティを一意に識別するためのプライマリフィールドが必要です。このフィールドにより、すべてのエンティティを曖昧さなく挿入、更新、クエリ、または削除できるようになります。</p>
<p>ユースケースに応じて、MilvusにIDを自動生成させる（AutoID）か、手動で独自のIDを割り当てるかを選択できます。</p>
<h2 id="What-is-a-primary-field" class="common-anchor-header">プライマリフィールドとは？<button data-href="#What-is-a-primary-field" class="anchor-icon" translate="no">
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
    </button></h2><p>主フィールドは、従来のデータベースにおける主キーと同様に、コレクション内の各エンティティに対する一意のキーとして機能します。Milvusは、挿入、アップサート、削除、およびクエリ操作の際に、主フィールドを使用してエンティティを管理します。</p>
<p>主な要件：</p>
<ul>
<li><p>各コレクションには、プライマリフィールド<strong>が1つだけ</strong>存在する必要があります。</p></li>
<li><p>プライマリフィールドの値はNULLにできません。</p></li>
<li><p>データ型は作成時に指定する必要があり、後から変更することはできません。</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">サポートされているデータ型<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>プライマリフィールドには、エンティティを一意に識別できる、サポートされているスカラーデータ型を使用する必要があります。</p>
<table>
   <tr>
     <th><p>データ型</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">INT64</code></p></td>
     <td><p>64 ビットの整数型で、AutoID で一般的に使用されます。これは、ほとんどのユースケースで推奨されるオプションです。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code></p></td>
     <td><p>可変長文字列型。エンティティ識別子が外部システムから取得される場合（例：製品コードやユーザーID）に使用します。値ごとに許可される最大バイト数を定義するには、<code translate="no">max_length</code> プロパティが必要です。</p></td>
   </tr>
</table>
<h2 id="Choose-between-AutoID-and-Manual-IDs" class="common-anchor-header">AutoID と手動 ID の選択<button data-href="#Choose-between-AutoID-and-Manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、主キー値の割り当てに関して2つのモードをサポートしています。</p>
<table>
   <tr>
     <th><p>モード</p></th>
     <th><p>説明</p></th>
     <th><p>推奨される用途</p></th>
   </tr>
   <tr>
     <td><p>AutoID</p></td>
     <td><p>Milvus は、挿入またはインポートされたエンティティに対して一意の識別子を自動的に生成します。</p></td>
     <td><p>ID を手動で管理する必要がないほとんどのシナリオ。</p></td>
   </tr>
   <tr>
     <td><p>手動による ID 設定</p></td>
     <td><p>データの挿入やインポート時に、一意のIDを自身で指定します。</p></td>
     <td><p>IDを外部システムや既存のデータセットと整合させる必要がある場合。</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>どちらのモードを選択すべきか迷った場合は、データ取り込みを簡素化し、一意性を保証するため、まずは「<a href="/docs/ja/primary-field.md#Quickstart-Use-AutoID">AutoID」から始めてください</a>。</p></li>
<li><p>手動で主キーを設定することにメリットがない限り、すべての場合において<code translate="no">autoId</code> を利用することをお勧めします。</p></li>
</ul>
</div>
<h2 id="Quickstart-Use-AutoID" class="common-anchor-header">クイックスタート：AutoIDの使用<button data-href="#Quickstart-Use-AutoID" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus に ID の生成を自動的に行わせることができます。</p>
<h3 id="Step-1-Create-a-collection-with-AutoID" class="common-anchor-header">ステップ 1: AutoID を使用してコレクションを作成する<button data-href="#Step-1-Create-a-collection-with-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><p>プライマリフィールドの定義で<code translate="no">auto_id=True</code> を有効にします。MilvusがIDの生成を自動的に処理します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define primary field with AutoID enabled</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-comment"># Primary field name</span></span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Milvus generates IDs automatically; Defaults to False</span></span>
<span class="highlighted-comment-line">    datatype=DataType.INT64</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
        Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
        APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect:&quot;</span>, err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := &amp;entity.Schema{
        CollectionName: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
        Fields: []*entity.Field{
                entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">true</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;embedding&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;category&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>),
        },
}

cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(<span class="hljs-string">&quot;demo_autoid&quot;</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo_autoid&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;category&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>),
    );

<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(
        HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(
            DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
                .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
                .<span class="hljs-title function_ invoke__">build</span>()?,
        )
        .<span class="hljs-keyword">await</span>?;
}

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;Primary field&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;Vector field&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;category&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;Scalar field&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>));

status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define schema fields</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Primary field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Milvus generates IDs automatically</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Vector field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Scalar field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>), <span class="hljs-comment">// Milvus generates IDs automatically</span>
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding&quot;</span>, dimension: <span class="hljs-number">4</span>), <span class="hljs-comment">// Vector field</span>
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;category&quot;</span>, maxLength: <span class="hljs-number">1000</span>) <span class="hljs-comment">// Scalar field of the VARCHAR type</span>
    }
};

<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span> })).Has)
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span> });
}

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> SCHEMA=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: true,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true,
            &quot;elementTypeParams&quot;: {}
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;4&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;1000&quot;
            }
        }
    ]
}&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/collections/create&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_autoid\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-Data" class="common-anchor-header">ステップ 2: データの挿入<button data-href="#Step-2-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>重要：</strong>データにプライマリフィールドの列を含めないでください。Milvusが自動的にIDを生成します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [461526052788333649, 461526052788333650]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}));
row1.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>);
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row2.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>);
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .data(rows)
        .build());
System.out.printf(<span class="hljs-string">&quot;Generated IDs: %s\n&quot;</span>, insertR.getPrimaryKeys());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

data := []any{
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
}

result, err := cli.Insert(ctx, milvusclient.NewRowBasedInsertOption(<span class="hljs-string">&quot;demo_autoid&quot;</span>, data...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to insert:&quot;</span>, err)
}
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.IDs.Len(); i++ {
        id, _ := result.IDs.GetAsInt64(i)
        fmt.Println(<span class="hljs-string">&quot;Generated ID:&quot;</span>, id)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>([
                serde_json::json!({<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>}),
                serde_json::json!({<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>}),
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

milvus::EntityRows data = {{{<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>}},
                           {{<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>}}};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data))
                                , response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">auto</span> ids = response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">IdArray</span>().<span class="hljs-built_in">IntIDArray</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;book&quot;</span>
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;toy&quot;</span>
    }
};

MutationResp res = <span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    RowsData = data
});
Console.WriteLine(<span class="hljs-string">&quot;Generated IDs: &quot;</span> + <span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, res.LongIds ?? []));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> INSERT_DATA=<span class="hljs-string">&#x27;[
    {
        &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4],
        &quot;category&quot;: &quot;book&quot;
    },
    {
        &quot;embedding&quot;: [0.2, 0.3, 0.4, 0.5],
        &quot;category&quot;: &quot;toy&quot;
    }
]&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/insert&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_autoid\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$INSERT_DATA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>既存のエンティティを扱う際は、IDの重複エラーを避けるため、<code translate="no">insert()</code> の代わりに<code translate="no">upsert()</code> を使用してください。</p>
</div>
<h2 id="Use-manual-IDs" class="common-anchor-header">手動でのID指定<button data-href="#Use-manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>IDを手動で管理する必要がある場合は、AutoIDを無効にして独自の値を指定してください。</p>
<h3 id="Step-1-Create-a-collection-without-AutoID" class="common-anchor-header">ステップ 1: AutoID を使用しないコレクションを作成する<button data-href="#Step-1-Create-a-collection-without-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define the primary field without AutoID</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,</span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># You&#x27;ll provide IDs manually at data ingestion</span></span>
<span class="highlighted-comment-line">    datatype=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">100</span> <span class="hljs-comment"># Required when datatype is VARCHAR</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
        Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
        APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect:&quot;</span>, err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := &amp;entity.Schema{
        CollectionName: <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
        Fields: []*entity.Field{
                entity.NewField().WithName(<span class="hljs-string">&quot;product_id&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithMaxLength(<span class="hljs-number">100</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;embedding&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;category&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>),
        },
}

cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;product_id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">100</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;category&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>),
    );

<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(
        HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(
            DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
                .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
                .<span class="hljs-title function_ invoke__">build</span>()?,
        )
        .<span class="hljs-keyword">await</span>?;
}

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;product_id&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">100</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;category&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>));

status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;product_id&quot;</span>, maxLength: <span class="hljs-number">100</span>, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">false</span>), <span class="hljs-comment">// You provide IDs manually</span>
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding&quot;</span>, dimension: <span class="hljs-number">4</span>), <span class="hljs-comment">// Vector field</span>
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;category&quot;</span>, maxLength: <span class="hljs-number">1000</span>) <span class="hljs-comment">// Scalar field of the VARCHAR type</span>
    }
};

<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span> })).Has)
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span> });
}

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> SCHEMA=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;product_id&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: true,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;100&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;4&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;1000&quot;
            }
        }
    ]
}&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/collections/create&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_manual_ids\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data-with-your-IDs" class="common-anchor-header">ステップ 2: 独自の ID を使用してデータを挿入する<button data-href="#Step-2-Insert-data-with-your-IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>すべての挿入操作において、プライマリフィールドの列を含める必要があります。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Each entity must contain the primary field `product_id`</span>
data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [&#x27;PROD-001&#x27;, &#x27;PROD-002&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-001&quot;</span>);
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}));
row1.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>);
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-002&quot;</span>);
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row2.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>);
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .data(rows)
        .build());
System.out.printf(<span class="hljs-string">&quot;Generated IDs: %s\n&quot;</span>, insertR.getPrimaryKeys());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

data = []any{
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
}

result, err = cli.Insert(ctx, milvusclient.NewRowBasedInsertOption(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, data...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to insert:&quot;</span>, err)
}
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.IDs.Len(); i++ {
        id, _ := result.IDs.GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Inserted ID:&quot;</span>, id)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>([
                serde_json::json!({<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>}),
                serde_json::json!({<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>}),
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

milvus::EntityRows data = {{{<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-001&quot;</span>}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>}},
                           {{<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-002&quot;</span>}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>}}};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data))
                                , response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">auto</span> string_ids = response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">IdArray</span>().<span class="hljs-built_in">StrIDArray</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> insert = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(insert);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Each entity must contain the primary field `product_id`</span>
<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;product_id&quot;</span>] = <span class="hljs-string">&quot;PROD-001&quot;</span>,
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;book&quot;</span>
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;product_id&quot;</span>] = <span class="hljs-string">&quot;PROD-002&quot;</span>,
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;toy&quot;</span>
    }
};

MutationResp res = <span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
    RowsData = data
});
Console.WriteLine(<span class="hljs-string">&quot;Generated IDs: &quot;</span> + <span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, res.StringIds ?? []));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> INSERT_DATA=<span class="hljs-string">&#x27;[
    {
        &quot;product_id&quot;: &quot;PROD-001&quot;,
        &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4],
        &quot;category&quot;: &quot;book&quot;
    },
    {
        &quot;product_id&quot;: &quot;PROD-002&quot;,
        &quot;embedding&quot;: [0.2, 0.3, 0.4, 0.5],
        &quot;category&quot;: &quot;toy&quot;
    }
]&#x27;</span>

<span class="hljs-comment"># 插入数据</span>
curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/insert&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_manual_ids\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$INSERT_DATA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ご担当いただく事項：</p>
<ul>
<li><p>すべてのエンティティにおいて、すべてのIDが一意であることを保証してください</p></li>
<li><p>すべての挿入／インポート操作において、主キーフィールドを含めること</p></li>
<li><p>IDの競合や重複の検出を自身で処理する</p></li>
</ul>
<h2 id="Advanced-usage" class="common-anchor-header">高度な使い方<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Migrate-data-with-existing-AutoIDs" class="common-anchor-header">既存の自動ID（AutoID）を含むデータの移行<button data-href="#Migrate-data-with-existing-AutoIDs" class="anchor-icon" translate="no">
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
    </button></h3><p>データ移行時に既存のIDを維持するには、<code translate="no">alter_collection_properties</code> を呼び出して<code translate="no">allow_insert_auto_id</code> プロパティを有効にしてください。このプロパティをtrueに設定すると、AutoIDが有効になっている場合でも、Milvusはユーザーが指定したIDを受け入れます。</p>
<p>設定の詳細については、「<a href="/docs/ja/modify-collection.md#Example-6-Enable-allowinsertautoid">コレクションの変更</a>」を参照してください。</p>
<h3 id="Ensure-global-AutoID-uniqueness-across-clusters" class="common-anchor-header">クラスタ間でグローバルなAutoIDの一意性を確保する<button data-href="#Ensure-global-AutoID-uniqueness-across-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>複数のMilvusクラスタを実行する場合は、AutoIDが重複しないように、各クラスタに一意のクラスタIDを設定してください。</p>
<p><strong>設定方法：</strong>クラスタを初期化する前に、<code translate="no">milvus.yaml</code> 内の<code translate="no">common.clusterID</code> 設定を編集します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">clusterID:</span> <span class="hljs-number">3</span>   <span class="hljs-comment"># Must be unique across all clusters (Range: 0-7)</span>
<button class="copy-code-btn"></button></code></pre>
<p>この設定では、<code translate="no">clusterID</code> が AutoID 生成に使用される一意の識別子を指定します。範囲は 0 から 7 までです（最大 8 つのクラスターに対応）。</p>
<div class="alert note">
<p>Milvusは内部でビット反転処理を行い、IDの重複なく将来の拡張を可能にしています。クラスタIDの設定以外に、手動での設定は不要です。</p>
</div>
<h2 id="Reference-How-AutoID-works" class="common-anchor-header">参考：AutoIDの仕組み<button data-href="#Reference-How-AutoID-works" class="anchor-icon" translate="no">
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
    </button></h2><p>AutoIDが内部で一意の識別子をどのように生成するかを理解することで、<a href="/docs/ja/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">クラスタIDを</a>正しく<a href="/docs/ja/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">設定したり</a>、IDに関連する問題をトラブルシューティングしたりするのに役立ちます。</p>
<p>AutoIDは、一意性を保証するために構造化された64ビット形式を使用しています：</p>
<pre><code translate="no" class="language-plaintext">[sign_bit][cluster_id][physical_ts][logical_ts]
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>セグメント</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sign_bit</code></p></td>
     <td><p>内部使用のために予約</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cluster_id</code></p></td>
     <td><p>IDを生成したクラスタを識別します（値の範囲：0～7）</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">physical_ts</code></p></td>
     <td><p>IDが生成された時点のタイムスタンプ（ミリ秒単位）</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">logical_ts</code></p></td>
     <td><p>同じミリ秒内に生成されたIDを区別するためのカウンター</p></td>
   </tr>
</table>
<div class="alert note">
<p><code translate="no">VARCHAR</code> をデータ型としてAutoIDを有効にしている場合でも、Milvusは数値IDを生成します。これらは最大長20文字（uint64の範囲）の数値文字列として格納されます。</p>
</div>
