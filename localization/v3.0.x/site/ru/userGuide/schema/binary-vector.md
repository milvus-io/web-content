---
id: binary-vector.md
title: Двоичный вектор
summary: >-
  Двоичные векторы представляют собой особую форму представления данных, при
  которой традиционные многомерные векторы с плавающей запятой преобразуются в
  двоичные векторы, содержащие только нули и единицы. Такое преобразование не
  только уменьшает размер вектора, но и снижает затраты на хранение и
  вычисления, сохраняя при этом семантическую информацию. Когда точность для
  некритических признаков не является существенной, бинарные векторы позволяют
  эффективно сохранить большую часть целостности и полезности исходных векторов
  с плавающей запятой.
---
<h1 id="Binary-Vector" class="common-anchor-header">Двоичный вектор<button data-href="#Binary-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Бинарные векторы представляют собой особую форму представления данных, при которой традиционные высокоразмерные векторы с плавающей запятой преобразуются в бинарные векторы, содержащие только нули и единицы. Такое преобразование не только уменьшает размер вектора, но и снижает затраты на хранение и вычисления, сохраняя при этом семантическую информацию. Когда точность для некритичных характеристик не является существенной, бинарные векторы позволяют эффективно сохранить большую часть целостности и полезности исходных векторов с плавающей запятой.</p>
<p>Бинарные векторы имеют широкий спектр применений, особенно в ситуациях, когда решающее значение имеют вычислительная эффективность и оптимизация хранения. В крупномасштабных системах искусственного интеллекта, таких как поисковые системы или системы рекомендаций, ключевую роль играет обработка огромных объемов данных в режиме реального времени. За счет уменьшения размера векторов бинарные векторы помогают снизить задержку и вычислительные затраты без существенной потери точности. Кроме того, бинарные векторы полезны в средах с ограниченными ресурсами, таких как мобильные устройства и встроенные системы, где объем памяти и вычислительная мощность ограничены. Благодаря использованию бинарных векторов сложные функции искусственного интеллекта могут быть реализованы в этих ограниченных условиях с сохранением высокой производительности.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Бинарные векторы — это метод кодирования сложных объектов (таких как изображения, текст или аудио) в виде двоичных значений фиксированной длины. В Milvus бинарные векторы обычно представляются в виде битовых или байтовых массивов. Например, 8-мерный бинарный вектор можно представить в виде <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code>.</p>
<p>На приведенной ниже схеме показано, как бинарные векторы отображают наличие ключевых слов в текстовом контенте. В этом примере 10-мерный бинарный вектор используется для представления двух разных текстов (<strong>Текст 1</strong> и <strong>Текст 2</strong>), где каждое измерение соответствует слову в словаре: 1 указывает на наличие слова в тексте, а 0 — на его отсутствие.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/binary-vector.png" alt="Binary Vector" class="doc-image" id="binary-vector" /> 
   <span>Двоичный вектор</span>
  
 </span></p>
<p>Двоичные векторы обладают следующими характеристиками:</p>
<ul>
<li><p><strong>Эффективное хранение:</strong> каждое измерение требует всего 1 бита памяти, что значительно сокращает объем занимаемого пространства.</p></li>
<li><p><strong>Быстрые вычисления:</strong> степень сходства между векторами можно быстро вычислить с помощью побитовых операций, таких как XOR.</p></li>
<li><p><strong>Фиксированная длина:</strong> длина вектора остается постоянной независимо от длины исходного текста, что упрощает индексирование и поиск.</p></li>
<li><p><strong>Простота и интуитивность:</strong> непосредственно отражает наличие ключевых слов, что делает их подходящими для определённых специализированных задач поиска.</p></li>
</ul>
<p>Бинарные векторы можно генерировать различными способами. При обработке текста можно использовать заранее определенные словари для установки соответствующих битов в зависимости от наличия слов. При обработке изображений алгоритмы перцепционного хеширования (такие как <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>) могут генерировать бинарные признаки изображений. В приложениях машинного обучения выходы моделей можно бинаризировать для получения бинарных векторных представлений.</p>
<p>После бинарной векторизации данные можно сохранить в Milvus для управления и векторного поиска. На приведенной ниже схеме показан основной процесс.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/use-binary-vector.png" alt="Use Binary Vector" class="doc-image" id="use-binary-vector" /> 
   <span>Использование бинарных векторов</span>
  
 </span></p>
<div class="alert note">
<p>Хотя бинарные векторы отлично подходят для определённых сценариев, они имеют ограничения в выразительной способности, что затрудняет отражение сложных семантических отношений. Поэтому в реальных сценариях бинарные векторы часто используются наряду с другими типами векторов для обеспечения баланса между эффективностью и выразительностью. Дополнительную информацию см. в разделах <a href="/docs/ru/dense-vector.md">«Плотный вектор</a> » и <a href="/docs/ru/sparse_vector.md">«Редкий вектор</a>».</p>
</div>
<h2 id="Use-binary-vectors" class="common-anchor-header">Использование бинарных векторов<button data-href="#Use-binary-vectors" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field" class="common-anchor-header">Добавление векторного поля<button data-href="#Add-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы использовать бинарные векторы в Milvus, сначала при создании коллекции необходимо определить векторное поле для хранения бинарных векторов. Этот процесс включает:</p>
<ol>
<li><p>Установку параметра ` <code translate="no">datatype</code> ` в значение поддерживаемого типа данных бинарного вектора, т. е. ` <code translate="no">BINARY_VECTOR</code>`.</p></li>
<li><p>Указание размеров вектора с помощью параметра ` <code translate="no">dim</code> `. Обратите внимание, что значение ` <code translate="no">dim</code> ` должно быть кратно 8, так как при вставке бинарные векторы должны преобразовываться в массив байтов. Каждые 8 булевых значений (0 или 1) будут упакованы в 1 байт. Например, если <code translate="no">dim=128</code>, для вставки потребуется массив размером 16 байт.</p></li>
</ol>
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

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> MilvusClientV2.CreateSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">128</span>)
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

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;pk&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithIsAutoID(<span class="hljs-literal">true</span>).
        WithIsPrimaryKey(<span class="hljs-literal">true</span>).
        WithMaxLength(<span class="hljs-number">100</span>),
    ).WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;binary_vector&quot;</span>).
        WithDataType(entity.FieldTypeBinaryVector).
        WithDim(<span class="hljs-number">128</span>),
    )
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
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">100</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::BinaryVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">128</span>),
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
schema-&gt;<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">true</span>);
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;pk&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">100</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>, milvus::DataType::BINARY_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">128</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    EnableDynamicFields = <span class="hljs-literal">true</span>,
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;pk&quot;</span>, DataType.VarChar, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>) { MaxLength = <span class="hljs-number">100</span> },
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BinaryVector) { Dimension = <span class="hljs-number">128</span> }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;isPrimary&quot;: true,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 100
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;binary_vector&quot;,
    &quot;dataType&quot;: &quot;BinaryVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 128
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ],
    \&quot;enableDynamicField\&quot;: true
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В этом примере добавляется векторное поле с именем « <code translate="no">binary_vector</code> » для хранения двоичных векторов. Тип данных этого поля — « <code translate="no">BINARY_VECTOR</code> », размерность — 128.</p>
<h3 id="Set-index-params-for-vector-field" class="common-anchor-header">Настройка параметров индекса для векторного поля<button data-href="#Set-index-params-for-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Для ускорения поиска необходимо создать индекс для поля бинарных векторов. Индексирование может значительно повысить эффективность поиска в больших массивах векторных данных.</p>
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
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;binary_vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;binary_vector_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;binary_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;binary_vector_index&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Hamming)];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;milvus::IndexDesc&gt; indexes = {
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>, <span class="hljs-string">&quot;binary_vector_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::HAMMING)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = [{
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>
}];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;binary_vector&quot;</span>,
    indexName: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,
    indexType: IndexType.AutoIndex,
    metricType: MetricType.Hamming);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;binary_vector&quot;,
            &quot;metricType&quot;: &quot;HAMMING&quot;,
            &quot;indexName&quot;: &quot;binary_vector_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше примере для поля <code translate="no">binary_vector</code> создается индекс с именем <code translate="no">binary_vector_index</code> с использованием типа индекса <code translate="no">AUTOINDEX</code>. Параметр <code translate="no">metric_type</code> установлен в значение <code translate="no">HAMMING</code>, что указывает на использование расстояния Хэмминга для измерения схожести.</p>
<p>Milvus предоставляет различные типы индексов для более эффективного векторного поиска. AUTOINDEX — это специальный тип индекса, разработанный для облегчения освоения векторного поиска. Вам доступно множество типов индексов на выбор. Подробности см. в разделе <a href="/docs/ru/index-explained.md">«Объяснение индексов</a>».</p>
<p>Кроме того, Milvus поддерживает другие метрики сходства для бинарных векторов. Дополнительную информацию см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p>
<h3 id="Create-collection" class="common-anchor-header">Создание коллекции<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>После завершения настройки бинарных векторов и индекса создайте коллекцию, содержащую бинарные векторы. В приведенном ниже примере с помощью метода ` <code translate="no">create_collection</code> ` создается коллекция с именем ` <code translate="no">my_collection</code>`.</p>
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
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
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
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Schema = schema,
    Indexes = [indexParam]
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
<h3 id="Insert-data" class="common-anchor-header">Вставка данных<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>После создания коллекции используйте метод ` <code translate="no">insert</code> ` для добавления данных, содержащих двоичные векторы. Обратите внимание, что двоичные векторы должны предоставляться в виде массива байтов, где каждый байт представляет 8 булевых значений.</p>
<p>Например, для 128-мерного двоичного вектора требуется массив из 16 байтов (поскольку 128 бит ÷ 8 бит/байт = 16 байтов). Ниже приведён пример кода для вставки данных:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_bool_list_to_bytes</span>(<span class="hljs-params">bool_list</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(bool_list) % <span class="hljs-number">8</span> != <span class="hljs-number">0</span>:
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The length of a boolean list must be a multiple of 8&quot;</span>)

    byte_array = <span class="hljs-built_in">bytearray</span>(<span class="hljs-built_in">len</span>(bool_list) // <span class="hljs-number">8</span>)
    <span class="hljs-keyword">for</span> i, bit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(bool_list):
        <span class="hljs-keyword">if</span> bit == <span class="hljs-number">1</span>:
            index = i // <span class="hljs-number">8</span>
            shift = i % <span class="hljs-number">8</span>
            byte_array[index] |= (<span class="hljs-number">1</span> &lt;&lt; shift)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">bytes</span>(byte_array)

bool_vectors = [
    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,
    [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,
]

data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector)} <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;
<span class="hljs-keyword">import</span> java.nio.ByteBuffer;

<span class="hljs-comment">// Binary vectors (128 bits = 16 bytes)</span>
<span class="hljs-comment">// vector1: [1,0,0,1,1,0,1,1, 0,1,0,1,0,1,0,0] + [0]*112</span>
<span class="hljs-type">byte</span>[] vector1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[<span class="hljs-number">16</span>];
vector1[<span class="hljs-number">0</span>] = (<span class="hljs-type">byte</span>) <span class="hljs-number">0xD9</span>;
vector1[<span class="hljs-number">1</span>] = <span class="hljs-number">0x2A</span>;

<span class="hljs-comment">// vector2: [0,1,0,1,0,1,0,0, 1,1,0,0,1,1,0,1] + [0]*112</span>
<span class="hljs-type">byte</span>[] vector2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[<span class="hljs-number">16</span>];
vector2[<span class="hljs-number">0</span>] = <span class="hljs-number">0x2A</span>;
vector2[<span class="hljs-number">1</span>] = (<span class="hljs-type">byte</span>) <span class="hljs-number">0xB3</span>;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(vector1));
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(vector2));
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithBinaryVectorColumn(<span class="hljs-string">&quot;binary_vector&quot;</span>, <span class="hljs-number">128</span>, [][]<span class="hljs-type">byte</span>{
        {<span class="hljs-number">0</span>b11011001, <span class="hljs-number">0</span>b00101010, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
        {<span class="hljs-number">0</span>b00101010, <span class="hljs-number">0</span>b10110011, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
    }))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Binary vectors (128 bits = 16 bytes)</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">binary_vectors</span>: <span class="hljs-type">Vec</span>&lt;<span class="hljs-type">Vec</span>&lt;<span class="hljs-type">u8</span>&gt;&gt; = <span class="hljs-built_in">vec!</span>[
    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0xD9</span>, <span class="hljs-number">0x2A</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0x2A</span>, <span class="hljs-number">0xB3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
];

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">columns</span>(<span class="hljs-built_in">vec!</span>[FieldData::<span class="hljs-title function_ invoke__">binary_vector</span>(
                <span class="hljs-string">&quot;binary_vector&quot;</span>,
                binary_vectors,
            )])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Binary vectors (128 bits = 16 bytes)</span>
std::vector&lt;<span class="hljs-type">uint8_t</span>&gt; vector1 = {<span class="hljs-number">0xD9</span>, <span class="hljs-number">0x2A</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>};
std::vector&lt;<span class="hljs-type">uint8_t</span>&gt; vector2 = {<span class="hljs-number">0x2A</span>, <span class="hljs-number">0xB3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>};

milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;binary_vector&quot;</span>, vector1}},
    {{<span class="hljs-string">&quot;binary_vector&quot;</span>, vector2}}
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
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>] },
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>] },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Binary vectors (128 bits = 16 bytes)</span>
<span class="hljs-comment">// vector1: [1,0,0,1,1,0,1,1, 0,1,0,1,0,1,0,0] + [0]*112</span>
<span class="hljs-built_in">byte</span>[] vector1 = { <span class="hljs-number">0xD9</span>, <span class="hljs-number">0x2A</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> };

<span class="hljs-comment">// vector2: [0,1,0,1,0,1,0,0, 1,1,0,0,1,1,0,1] + [0]*112</span>
<span class="hljs-built_in">byte</span>[] vector2 = { <span class="hljs-number">0x2A</span>, <span class="hljs-number">0xB3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> };

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    ColumnsData =
    [
        <span class="hljs-keyword">new</span> BinaryVectorFieldData(<span class="hljs-string">&quot;binary_vector&quot;</span>, <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">byte</span>&gt;[]
        {
            vector1,
            vector2
        })
    ]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> data=<span class="hljs-string">&#x27;[
    {&quot;binary_vector&quot;: &quot;2SoAAAAAAAAAAAAAAAAAAA==&quot;},
    {&quot;binary_vector&quot;: &quot;KrMAAAAAAAAAAAAAAAAAAA==&quot;}
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Выполнение поиска по схожести<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Поиск по схожести — одна из ключевых функций Milvus, позволяющая быстро находить данные, наиболее схожие с вектором запроса, на основе расстояния между векторами. Чтобы выполнить поиск по схожести с использованием бинарных векторов, подготовьте вектор запроса и параметры поиска, а затем вызовите метод ` <code translate="no">search</code> `.</p>
<p>При выполнении поисковых операций бинарные векторы также должны предоставляться в виде массива байтов. Убедитесь, что размерность вектора запроса соответствует размерности, указанной при определении метода <code translate="no">dim</code>, и что каждые 8 булевых значений преобразуются в 1 байт.</p>
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
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}

query_bool_list = [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>
query_vector = convert_bool_list_to_bytes(query_bool_list)

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    search_params=search_params,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172268&#x27;, &#x27;distance&#x27;: 10.0, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172268&#x27;}}]&quot;] </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.nio.ByteBuffer;

<span class="hljs-comment">// query vector = vector1</span>
<span class="hljs-type">byte</span>[] queryBytes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[<span class="hljs-number">16</span>];
queryBytes[<span class="hljs-number">0</span>] = (<span class="hljs-type">byte</span>) <span class="hljs-number">0xD9</span>;
queryBytes[<span class="hljs-number">1</span>] = <span class="hljs-number">0x2A</span>;
<span class="hljs-type">ByteBuffer</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> ByteBuffer.wrap(queryBytes);

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(queryVector)))
        .annsField(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(searchR.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

queryVector := []<span class="hljs-type">byte</span>{<span class="hljs-number">0</span>b11011001, <span class="hljs-number">0</span>b00101010, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.BinaryVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
    WithAnnParam(annSearchParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// query vector = vector1</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span>: <span class="hljs-type">Vec</span>&lt;<span class="hljs-type">u8</span>&gt; = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0xD9</span>, <span class="hljs-number">0x2A</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Binary</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;pk&quot;</span>])
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Hamming)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, results.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// query vector = vector1</span>
std::vector&lt;<span class="hljs-type">uint8_t</span>&gt; query_vector = {<span class="hljs-number">0xD9</span>, <span class="hljs-number">0x2A</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;pk&quot;</span>)
                   .<span class="hljs-built_in">AddBinaryVector</span>(query_vector);

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
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;binary_vector&#x27;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// query vector = vector1</span>
<span class="hljs-built_in">byte</span>[] queryBytes = { <span class="hljs-number">0xD9</span>, <span class="hljs-number">0x2A</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> };

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    BinaryVectors = [<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">byte</span>&gt;(queryBytes)],
    VectorFieldName = <span class="hljs-string">&quot;binary_vector&quot;</span>,
    MetricType = MetricType.Hamming,
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Nprobe = <span class="hljs-number">10</span>,
        OutputFields = { <span class="hljs-string">&quot;pk&quot;</span> }
    }
});
Console.WriteLine(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
        &quot;params&quot;:{&quot;nprobe&quot;:10}
    }&#x27;</span>

<span class="hljs-built_in">export</span> data=<span class="hljs-string">&#x27;[
    {&quot;binary_vector&quot;: &quot;2SoAAAAAAAAAAAAAAAAAAA==&quot;}
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,
    \&quot;limit\&quot;: 5,
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительную информацию о параметрах поиска по сходству см. в разделе <a href="/docs/ru/single-vector-search.md">«Базовый поиск с использованием нейронных сетей</a>».</p>
