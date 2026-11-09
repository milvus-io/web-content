---
id: number.md
title: 부울 및 숫자
summary: >-
  부울형 또는 숫자형 필드는 부울 값이나 숫자 값을 저장하는 스칼라 필드입니다. 이러한 값은 두 가지 가능한 값 중 하나이거나, 정수 및
  소수(부동소수점 수)일 수 있습니다. 이 필드들은 일반적으로 수량, 측정값 또는 논리적·수학적 처리가 필요한 데이터를 표현하는 데
  사용됩니다.
---
<h1 id="Boolean--Number" class="common-anchor-header">부울 및 숫자<button data-href="#Boolean--Number" class="anchor-icon" translate="no">
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
    </button></h1><p>부울 또는 숫자 필드는 부울 값이나 숫자 값을 저장하는 스칼라 필드입니다. 이러한 값은 두 가지 가능한 값 중 하나이거나,<strong>정수</strong> 및 소수(<strong>부동 소수점 수</strong>)일 수 있습니다. 이들은 일반적으로 수량, 측정값 또는 논리적·수학적 처리가 필요한 데이터를 표현하는 데 사용됩니다.</p>
<p>아래 표는 Milvus 클러스터에서 사용할 수 있는 숫자 필드의 데이터 유형을 설명합니다.</p>
<table>
<thead>
<tr><th>필드 유형</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">true</code> 또는 <code translate="no">false</code> 를 저장하는 부울 유형으로, 이진 상태를 표현하는 데 적합합니다.</td></tr>
<tr><td><code translate="no">INT8</code></td><td>8비트 정수로, 범위가 작은 정수 데이터를 저장하는 데 적합합니다.</td></tr>
<tr><td><code translate="no">INT16</code></td><td>16비트 정수로, 중간 범위의 정수 데이터를 저장하는 데 적합합니다.</td></tr>
<tr><td><code translate="no">INT32</code></td><td>32비트 정수형으로, 제품 수량이나 사용자 ID와 같은 일반적인 정수 데이터 저장에 이상적입니다.</td></tr>
<tr><td><code translate="no">INT64</code></td><td>64비트 정수형으로, 타임스탬프나 식별자 등 범위가 큰 데이터를 저장하는 데 적합합니다.</td></tr>
<tr><td><code translate="no">FLOAT</code></td><td>32비트 부동 소수점 숫자: 등급이나 온도와 같이 일반적인 정밀도가 필요한 데이터에 사용됩니다.</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>64비트 배정밀도 부동 소수점: 재무 정보나 과학적 계산과 같은 고정밀도 데이터에 사용됩니다.</td></tr>
</tbody>
</table>
<p>부울 필드를 선언하려면 <code translate="no">datatype</code> 을 <code translate="no">BOOL</code> 로 설정하기만 하면 됩니다. 숫자 필드를 선언하려면 사용 가능한 숫자 데이터 유형 중 하나로 설정하기만 하면 됩니다. 예를 들어, 정수 필드의 경우 <code translate="no">DataType.INT64</code>, 부동 소수점 필드의 경우 <code translate="no">DataType.FLOAT</code> 를 사용합니다.</p>
<div class="alert note">
<p>Milvus는 부울 및 숫자 필드에 대해 null 값과 기본값을 지원합니다. 이러한 기능을 사용하려면 <code translate="no">nullable</code> 을 <code translate="no">True</code> 으로 설정하고, <code translate="no">default_value</code> 을 숫자 값으로 설정하십시오. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">‘Nullable &amp; Default’를</a> 참조하십시오.</p>
</div>
<h2 id="Add-boolean-and-number-fields" class="common-anchor-header">부울 및 숫자 필드 추가<button data-href="#Add-boolean-and-number-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>부울 또는 숫자 데이터를 저장하려면 컬렉션 스키마에 해당 유형의 필드를 정의하십시오. 다음은 두 개의 숫자 필드가 포함된 컬렉션 스키마의 예입니다:</p>
<ul>
<li><p><code translate="no">age</code>: 정수 데이터를 저장하며, null 값을 허용하고, 기본값은 <code translate="no">18</code> 입니다.</p></li>
<li><p><code translate="no">broken</code>: 부울 데이터를 저장하며, null 값을 허용하지만 기본값은 없습니다.</p></li>
<li><p><code translate="no">price</code>: 부동 소수점 데이터를 저장하며, null 값을 허용하지만 기본값은 없습니다.</p></li>
</ul>
<div class="alert note">
<p>스키마를 정의할 때 ` <code translate="no">enable_dynamic_field=True</code> `를 설정하면, Milvus는 사전에 정의되지 않은 스칼라 필드를 삽입할 수 있도록 허용합니다. 그러나 이로 인해 쿼리 및 관리의 복잡성이 증가하여 성능에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="/docs/ko/enable-dynamic-field.md">‘동적 필드(Dynamic Field</a>)’를 참조하십시오.</p>
</div>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import necessary libraries</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Define server address</span>
SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=SERVER_ADDR)

<span class="hljs-comment"># Define the collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add an INT64 field `age` that supports null values with default value 18</span>
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, nullable=<span class="hljs-literal">True</span>, default_value=<span class="hljs-number">18</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;broken&quot;</span>, datatype=DataType.BOOL, nullable=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a FLOAT field `price` that supports null values without default value</span>
schema.add_field(field_name=<span class="hljs-string">&quot;price&quot;</span>, datatype=DataType.FLOAT, nullable=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .dataType(DataType.Int64)
        .isNullable(<span class="hljs-literal">true</span>)
        .defaultValue(<span class="hljs-number">18</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;broken&quot;</span>)
        .dataType(DataType.Bool)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;price&quot;</span>)
        .dataType(DataType.Float)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;pk&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">3</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;price&quot;</span>).
        WithDataType(entity.FieldTypeFloat).
        WithNullable(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;age&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithNullable(<span class="hljs-literal">true</span>).
        WithDefaultValueLong(<span class="hljs-number">18</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;broken&quot;</span>).
        WithDataType(entity.FieldTypeBool).
        WithNullable(<span class="hljs-literal">true</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">true</span>);
schema = schema
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;pk&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">3</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;price&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;age&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">18</span>)),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;broken&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
    );
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;pk&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">3</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;price&quot;</span>, milvus::DataType::FLOAT).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;age&quot;</span>, milvus::DataType::INT64).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>).<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-number">18</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;broken&quot;</span>, milvus::DataType::BOOL).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">default_value</span>: <span class="hljs-number">18</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;broken&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;price&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>,
    <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Define server address</span>
<span class="hljs-built_in">string</span> SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// Create a MilvusClient instance</span>
<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = SERVER_ADDR });

<span class="hljs-comment">// Define the collection schema</span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema { EnableDynamicFields = <span class="hljs-literal">true</span> };

<span class="hljs-comment">// Add an INT64 field `age` that supports null values with default value 18</span>
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;age&quot;</span>, DataType.Int64) { Nullable = <span class="hljs-literal">true</span>, DefaultValue = <span class="hljs-number">18</span> });
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;broken&quot;</span>, DataType.Bool) { Nullable = <span class="hljs-literal">true</span> });
<span class="hljs-comment">// Add a FLOAT field `price` that supports null values without default value</span>
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;price&quot;</span>, DataType.Float) { Nullable = <span class="hljs-literal">true</span> });
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;pk&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>));
schema.Fields.Add(FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-number">3</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> ageField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;age&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;nullable&quot;: true,
    &quot;defaultValue&quot;: 18
}&#x27;</span>

<span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;broken&quot;,
    &quot;dataType&quot;: &quot;Bool&quot;,
    &quot;nullable&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> floatField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;price&quot;,
    &quot;dataType&quot;: &quot;Float&quot;,
    &quot;nullable&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;embedding&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 3
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$ageField</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$floatField</span>,
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-index-params" class="common-anchor-header">인덱스 매개변수 설정<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱싱은 검색 및 쿼리 성능을 향상시키는 데 도움이 됩니다. Milvus 클러스터에서 인덱싱은 벡터 필드의 경우 필수이지만, 스칼라 필드의 경우 선택 사항입니다.</p>
<p>다음 예제는 벡터 필드 ` <code translate="no">embedding</code> `와 스칼라 필드 ` <code translate="no">age</code>`에 대해 모두 ` <code translate="no">AUTOINDEX</code> ` 인덱스 유형을 사용하여 인덱스를 생성합니다. 이 유형을 사용하면 Milvus는 데이터 유형에 따라 가장 적합한 인덱스를 자동으로 선택합니다. 자세한 내용은 <a href="/docs/ko/index-explained.md">‘인덱스 설명’을</a> 참조하십시오.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index params</span>

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index `age` with AUTOINDEX</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;age&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;age_index&quot;</span>
)

<span class="hljs-comment"># Index `embedding` with AUTOINDEX and specify similarity metric type</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
        
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexOption1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>,
    index.NewAutoIndex(entity.COSINE))
indexOption2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>,
    index.NewAutoIndex(entity.L2))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;age&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;age_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex),
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;milvus::IndexDesc&gt; indexes = {
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;age_index&quot;</span>, milvus::IndexType::AUTOINDEX),
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;age&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Set index params</span>
<span class="hljs-keyword">var</span> indexParams = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-comment">// Index `age` with AUTOINDEX</span>
    <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;age_index&quot;</span>, IndexType.AutoIndex, <span class="hljs-literal">null</span>),
    <span class="hljs-comment">// Index `embedding` with AUTOINDEX and specify similarity metric type</span>
    <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-literal">null</span>, IndexType.AutoIndex, MetricType.Cosine)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;age&quot;,
            &quot;indexName&quot;: &quot;inverted_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection" class="common-anchor-header">컬렉션 생성<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마와 인덱스가 정의되면, 숫자 필드를 포함하는 컬렉션을 생성합니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption1, indexOption2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                        .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(indexes))
                                        .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create Collection</span>
<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Schema = schema,
    Indexes = indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 생성한 후, 스키마에 부합하는 엔티티를 삽입합니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = [
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>]},
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]}, <span class="hljs-comment"># `price` field is missing, which should be null</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.1</span>]},  <span class="hljs-comment"># `age` should default to 18, `price` is null</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">45</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.9</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.4</span>]},  <span class="hljs-comment"># `price` is null</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.8</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>]},  <span class="hljs-comment"># `age` should default to 18</span>
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">60</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>]}  <span class="hljs-comment"># `price` is null</span>
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 25, \&quot;price\&quot;: 99.99, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 30, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: null, \&quot;price\&quot;: null, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.2, 0.3, 0.1]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 45, \&quot;price\&quot;: null, \&quot;pk\&quot;: 4, \&quot;embedding\&quot;: [0.9, 0.1, 0.4]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: null, \&quot;price\&quot;: 59.99, \&quot;pk\&quot;: 5, \&quot;embedding\&quot;: [0.8, 0.5, 0.3]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 60, \&quot;price\&quot;: null, \&quot;pk\&quot;: 6, \&quot;embedding\&quot;: [0.1, 0.6, 0.9]}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

priceValues := []<span class="hljs-type">float32</span>{<span class="hljs-number">99.99</span>, <span class="hljs-number">59.99</span>}
priceValid := []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>}
priceCol, _ := column.NewNullableColumnFloat(<span class="hljs-string">&quot;price&quot;</span>, priceValues, priceValid)

ageValues := []<span class="hljs-type">int64</span>{<span class="hljs-number">25</span>, <span class="hljs-number">30</span>, <span class="hljs-number">45</span>, <span class="hljs-number">60</span>}
ageValid := []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>}
ageCol, _ := column.NewNullableColumnInt64(<span class="hljs-string">&quot;age&quot;</span>, ageValues, ageValid)

brokenValues := []<span class="hljs-type">bool</span>{}
brokenValid := []<span class="hljs-type">bool</span>{<span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>}
brokenCol, _ := column.NewNullableColumnBool(<span class="hljs-string">&quot;broken&quot;</span>, brokenValues, brokenValid)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-number">3</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>},
        {<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>},
        {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.1</span>},
        {<span class="hljs-number">0.9</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.4</span>},
        {<span class="hljs-number">0.8</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>},
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>},
    }).
    WithColumns(priceCol, ageCol, brokenCol),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">price_col</span> = FieldData::<span class="hljs-title function_ invoke__">float</span>(<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-built_in">vec!</span>[<span class="hljs-number">99.99</span>, <span class="hljs-number">59.99</span>])
    .<span class="hljs-title function_ invoke__">with_validity</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>])?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">age_col</span> = FieldData::<span class="hljs-title function_ invoke__">int64</span>(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-built_in">vec!</span>[<span class="hljs-number">25</span>, <span class="hljs-number">30</span>, <span class="hljs-number">45</span>, <span class="hljs-number">60</span>])
    .<span class="hljs-title function_ invoke__">with_validity</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>])?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">broken_col</span> = FieldData::<span class="hljs-title function_ invoke__">boolean</span>(<span class="hljs-string">&quot;broken&quot;</span>, <span class="hljs-built_in">vec!</span>[<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>])
    .<span class="hljs-title function_ invoke__">with_validity</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>])?;

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">columns</span>(<span class="hljs-built_in">vec!</span>[
                FieldData::<span class="hljs-title function_ invoke__">int64</span>(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">vec!</span>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]),
                FieldData::<span class="hljs-title function_ invoke__">float_vector</span>(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-built_in">vec!</span>[
                    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>],
                    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>],
                    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.1</span>],
                    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.9</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.4</span>],
                    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.8</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>],
                    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>],
                ]),
                price_col,
                age_col,
                broken_col,
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">25</span>)}, {<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-built_in">float</span>(<span class="hljs-number">99.99</span>)}, {<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">1</span>)}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>}}},
    {{<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">30</span>)}, {<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-built_in">float</span>(<span class="hljs-number">149.50</span>)}, {<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">2</span>)}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>}}},
    {{<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">35</span>)}, {<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-built_in">float</span>(<span class="hljs-number">199.99</span>)}, {<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">3</span>)}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.1</span>}}},
    {{<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">45</span>)}, {<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">4</span>)}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.9</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.4</span>}}},
    {{<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-built_in">float</span>(<span class="hljs-number">59.99</span>)}, {<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">5</span>)}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>}}},
    {{<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">60</span>)}, {<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-built_in">int64_t</span>(<span class="hljs-number">6</span>)}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>}}}
};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">price</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.1</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-number">45</span>, <span class="hljs-attr">price</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.9</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.4</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">59.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.8</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>] },
  { <span class="hljs-attr">age</span>: <span class="hljs-number">60</span>, <span class="hljs-attr">price</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>] },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Sample data</span>
<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> List&lt;IDictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;&gt;
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25L</span>, [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-number">99.99f</span>, [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span> } },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">30L</span>, [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">2L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span> } }, <span class="hljs-comment">// `price` field is missing, which should be null</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-literal">null</span>, [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-literal">null</span>, [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">3L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.1f</span> } },  <span class="hljs-comment">// `age` should default to 18, `price` is null</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">45L</span>, [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-literal">null</span>, [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">4L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.9f</span>, <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.4f</span> } },  <span class="hljs-comment">// `price` is null</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-literal">null</span>, [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-number">59.99f</span>, [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">5L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.8f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.3f</span> } },  <span class="hljs-comment">// `age` should default to 18</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">60L</span>, [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-literal">null</span>, [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">6L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.9f</span> } }  <span class="hljs-comment">// `price` is null</span>
};

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    RowsData = data
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;age&quot;: 25, &quot;broken&quot;: false, &quot;price&quot;: 99.99, &quot;pk&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3]},
        {&quot;age&quot;: 30, &quot;broken&quot;: true, &quot;price&quot;: 149.50, &quot;pk&quot;: 2, &quot;embedding&quot;: [0.4, 0.5, 0.6]},
        {&quot;age&quot;: 35, &quot;broken&quot;: false, &quot;price&quot;: 199.99, &quot;pk&quot;: 3, &quot;embedding&quot;: [0.2, 0.3, 0.1]},
        {&quot;age&quot;: 45, &quot;broken&quot;: true, &quot;price&quot;: null, &quot;pk&quot;: 4, &quot;embedding&quot;: [0.9, 0.1, 0.4]},
        {&quot;age&quot;: null, &quot;broken&quot;: false, &quot;price&quot;: 59.99, &quot;pk&quot;: 5, &quot;embedding&quot;: [0.8, 0.5, 0.3]},
        {&quot;age&quot;: 60, &quot;broken&quot;: false, &quot;price&quot;: null, &quot;pk&quot;: 6, &quot;embedding&quot;: [0.1, 0.6, 0.9]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-filter-expressions" class="common-anchor-header">필터 표현식을 사용한 쿼리<button data-href="#Query-with-filter-expressions" class="anchor-icon" translate="no">
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
    </button></h2><p>엔티티를 삽입한 후, ` <code translate="no">query</code> ` 메서드를 사용하여 지정된 필터 표현식과 일치하는 엔티티를 검색합니다.</p>
<p><code translate="no">age</code> 값이 30보다 큰 엔티티를 가져오려면:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 45, &#x27;price&#x27;: None, &#x27;pk&#x27;: 4}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 60, &#x27;price&#x27;: None, &#x27;pk&#x27;: 6}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; 30&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());
System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=4, age=45}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=6, age=60})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter := <span class="hljs-string">&quot;age &gt; 30&quot;</span>
queryResult, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;pk&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;age&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;age&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;price&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;price&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;age &gt; 30&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> results.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;age &gt; 30&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;pk&quot;</span>);

milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> query_results = response.<span class="hljs-built_in">Results</span>();
milvus::EntityRows output_rows;
query_results.<span class="hljs-built_in">OutputRows</span>(output_rows);
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// data: [</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 45, &#x27;price&#x27;: None, &#x27;pk&#x27;: 4}&quot;,</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 60, &#x27;price&#x27;: None, &#x27;pk&#x27;: 6}&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;age &gt; 30&quot;</span>;

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Expression = filter,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters { OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span> } }
});

Console.WriteLine(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;age &gt; 30&quot;,
    &quot;outputFields&quot;: [&quot;age&quot;,&quot;price&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;pk&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:35,&quot;pk&quot;:3,&quot;price&quot;:199.99}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">price</code> 가 null인 엔티티를 가져오려면:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price is null&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 30, &#x27;price&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 45, &#x27;price&#x27;: None, &#x27;pk&#x27;: 4}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 60, &#x27;price&#x27;: None, &#x27;pk&#x27;: 6}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;price is null&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());
System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=2, age=30}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=3, age=18}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=4, age=45}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=6, age=60})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter := <span class="hljs-string">&quot;price is null&quot;</span>
queryResult, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;pk&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;age&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;age&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;price&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;price&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;price is null&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> results.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;price is null&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;pk&quot;</span>);

milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> query_results = response.<span class="hljs-built_in">Results</span>();
milvus::EntityRows output_rows;
query_results.<span class="hljs-built_in">OutputRows</span>(output_rows);
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;price is null&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;price is null&quot;</span>;

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Expression = filter,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters { OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span> } }
});

Console.WriteLine(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_collection&quot;,
  &quot;filter&quot;: &quot;price is null&quot;,
  &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;, &quot;pk&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">age</code> 의 값이 ` <code translate="no">18</code>`인 엔티티를 가져오려면 아래의 표현식을 사용하십시오. ` <code translate="no">age</code> `의 기본값은 ` <code translate="no">18</code>`이므로, 예상 결과에는 ` <code translate="no">age</code> `가 명시적으로 ` <code translate="no">18</code> `로 설정된 엔티티나 ` <code translate="no">age</code> `가 null로 설정된 엔티티가 포함되어야 합니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age == 18&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: 59.99, &#x27;pk&#x27;: 5}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age == 18&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());
System.out.println(resp.getQueryResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=null, pk=3, age=18}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={price=59.99, pk=5, age=18})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter = <span class="hljs-string">&quot;age == 18&quot;</span>
queryResult, err = client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;pk&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;age&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;age&quot;</span>))
fmt.Println(<span class="hljs-string">&quot;price&quot;</span>, queryResult.GetColumn(<span class="hljs-string">&quot;price&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;age == 18&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> results.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;age == 18&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;pk&quot;</span>);

milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> query_results = response.<span class="hljs-built_in">Results</span>();
milvus::EntityRows output_rows;
query_results.<span class="hljs-built_in">OutputRows</span>(output_rows);
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;age == 18&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// data: [</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: None, &#x27;pk&#x27;: 3}&quot;,</span>
<span class="hljs-comment">//     &quot;{&#x27;age&#x27;: 18, &#x27;price&#x27;: 59.99, &#x27;pk&#x27;: 5}&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;age == 18&quot;</span>;

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Expression = filter,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters { OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span> } }
});

Console.WriteLine(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_collection&quot;,
  &quot;filter&quot;: &quot;age == 18&quot;,
  &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;, &quot;pk&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Vector-search-with-filter-expressions" class="common-anchor-header">필터 표현식을 사용한 벡터 검색<button data-href="#Vector-search-with-filter-expressions" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적인 숫자 필드 필터링 외에도, 벡터 유사도 검색을 숫자 필드 필터와 결합할 수 있습니다. 예를 들어, 다음 코드는 벡터 검색에 숫자 필드 필터를 추가하는 방법을 보여줍니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],
    limit=<span class="hljs-number">5</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: -0.2016308456659317, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;price&#x27;: None}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.23643313348293304, &#x27;entity&#x27;: {&#x27;age&#x27;: 25, &#x27;price&#x27;: 99.98999786376953}}]&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, -<span class="hljs-number">0.6f</span>, <span class="hljs-number">0.1f</span>})))
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     SearchResp.SearchResult(entity={price=null, age=30}, score=-0.20163085, id=2),</span>
<span class="hljs-comment">//     SearchResp.SearchResult(entity={price=99.99, age=25}, score=-0.23643313, id=1)</span>
<span class="hljs-comment">//   ]</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3</span>, <span class="hljs-number">-0.6</span>, <span class="hljs-number">0.1</span>}
filter = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithFilter(filter).
    WithAnnParam(annParam).
    WithOutputFields(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;age: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;age&quot;</span>))
    fmt.Println(<span class="hljs-string">&quot;price: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;price&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, results.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.3</span>, <span class="hljs-number">-0.6</span>, <span class="hljs-number">0.1</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">auto</span> search_results = response.<span class="hljs-built_in">Results</span>();
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : search_results.<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;25 &lt;= age &lt;= 35&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    <span class="hljs-attr">filter</span>: filter
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// Example output:</span>
<span class="hljs-comment">// data: [</span>
<span class="hljs-comment">//     &quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: -0.2016308456659317, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;price&#x27;: None}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.23643313348293304, &#x27;entity&#x27;: {&#x27;age&#x27;: 25, &#x27;price&#x27;: 99.98999786376953}}]&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>;

<span class="hljs-keyword">var</span> searchResp = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;embedding&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.3f</span>, <span class="hljs-number">-0.6f</span>, <span class="hljs-number">0.1f</span> }) },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span> },
        Nprobe = <span class="hljs-number">10</span>,
        Expression = filter
    }
});

Console.WriteLine(searchResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3, -0.6, 0.1]
    ],
    &quot;annsField&quot;: &quot;embedding&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:35,&quot;distance&quot;:-0.19054288,&quot;id&quot;:3,&quot;price&quot;:199.99},{&quot;age&quot;:30,&quot;distance&quot;:-0.20163085,&quot;id&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:25,&quot;distance&quot;:-0.2364331,&quot;id&quot;:1,&quot;price&quot;:99.99}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 먼저 쿼리 벡터를 정의하고, 검색 과정에서 필터 조건 <code translate="no">25 &lt;= age &lt;= 35</code> 을 추가합니다. 이를 통해 검색 결과가 쿼리 벡터와 유사할 뿐만 아니라 지정된 연령 범위도 충족하도록 보장합니다. 자세한 내용은 <a href="/docs/ko/boolean.md">‘필터링 설명’을</a> 참조하십시오.</p>
