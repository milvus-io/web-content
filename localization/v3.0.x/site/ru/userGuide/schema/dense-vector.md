---
id: dense-vector.md
title: Плотный вектор
summary: >-
  Плотные векторы — это представления числовых данных, широко используемые в
  машинном обучении и анализе данных. Они состоят из массивов действительных
  чисел, в которых большинство или все элементы отличаются от нуля. По сравнению
  с разреженными векторами плотные векторы содержат больше информации при
  одинаковом количестве измерений, поскольку каждое измерение содержит значимые
  значения. Такое представление позволяет эффективно отражать сложные
  закономерности и взаимосвязи, что упрощает анализ и обработку данных в
  высокомерных пространствах. Плотные векторы, как правило, имеют фиксированное
  количество измерений, которое варьируется от нескольких десятков до нескольких
  сотен или даже тысяч, в зависимости от конкретного применения и требований.
---
<h1 id="Dense-Vector" class="common-anchor-header">Плотный вектор<button data-href="#Dense-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Плотные векторы — это представления числовых данных, широко используемые в машинном обучении и анализе данных. Они состоят из массивов действительных чисел, в которых большинство или все элементы отличаются от нуля. По сравнению с разреженными векторами плотные векторы содержат больше информации при одинаковом количестве измерений, поскольку каждое измерение содержит значимые значения. Такое представление позволяет эффективно отражать сложные закономерности и взаимосвязи, что упрощает анализ и обработку данных в высокомерных пространствах. Плотные векторы обычно имеют фиксированное количество измерений, которое варьируется от нескольких десятков до нескольких сотен или даже тысяч, в зависимости от конкретного применения и требований.</p>
<p>Плотные векторы в основном используются в сценариях, требующих понимания семантики данных, таких как семантический поиск и системы рекомендаций. В семантическом поиске плотные векторы помогают выявить скрытые связи между запросами и документами, повышая релевантность результатов поиска. В системах рекомендаций они помогают выявлять сходства между пользователями и объектами, предлагая более персонализированные рекомендации.</p>
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
    </button></h2><p>Плотные векторы обычно представляются в виде массивов чисел с плавающей запятой фиксированной длины, например <code translate="no">[0.2, 0.7, 0.1, 0.8, 0.3, ..., 0.5]</code>. Размерность этих векторов обычно варьируется от сотен до тысяч, например 128, 256, 768 или 1024. Каждое измерение отражает определённые семантические особенности объекта, что позволяет применять векторы в различных сценариях посредством вычисления схожести.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/dense-vector.png" alt="Dense Vector" class="doc-image" id="dense-vector" /> 
   <span>Плотный вектор</span>
  
 </span></p>
<p>На изображении выше показано представление плотных векторов в двумерном пространстве. Хотя в реальных приложениях плотные векторы часто имеют гораздо большее количество измерений, эта двумерная иллюстрация наглядно демонстрирует несколько ключевых концепций:</p>
<ul>
<li><p><strong>Многомерное представление:</strong> каждая точка представляет концептуальный объект (такой как <strong>Milvus</strong>, <strong>векторная база данных</strong>, <strong>система поиска</strong> и т. д.), причем её положение определяется значениями её измерений.</p></li>
<li><p><strong>Семантические отношения:</strong> расстояния между точками отражают семантическое сходство между понятиями. Более близко расположенные точки указывают на понятия, которые более тесно связаны с семантической точки зрения.</p></li>
<li><p><strong>Эффект кластеризации:</strong> связанные концепции (такие как <strong>Milvus</strong>, <strong>векторная база данных</strong> и <strong>система поиска</strong>) располагаются близко друг к другу в пространстве, образуя семантический кластер.</p></li>
</ul>
<p>Ниже приведен пример реального плотного вектора, представляющего текст « <code translate="no">&quot;Milvus is an efficient vector database&quot;</code> »:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-number">-0.013052909</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">0.020387933</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.007869</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.11111383</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.030188112</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.0053388323</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">0.0010654867</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">0.072027855</span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">// ... more dimensions</span>
<span class="hljs-punctuation">]</span>

<button class="copy-code-btn"></button></code></pre>
<p>Плотные векторы можно генерировать с помощью различных моделей <a href="https://en.wikipedia.org/wiki/Embedding">вложения</a>, таких как модели CNN (например, <a href="https://pytorch.org/hub/pytorch_vision_resnet/">ResNet</a>, <a href="https://pytorch.org/vision/stable/models/vgg.html">VGG</a>) для изображений и языковые модели (например, <a href="https://en.wikipedia.org/wiki/BERT_(language_model)">BERT</a>, <a href="https://en.wikipedia.org/wiki/Word2vec">Word2Vec</a>) для текста. Эти модели преобразуют исходные данные в точки в многомерном пространстве, фиксируя семантические особенности данных. Кроме того, Milvus предлагает удобные методы, помогающие пользователям генерировать и обрабатывать плотные векторы, как подробно описано в разделе «Вложения».</p>
<p>После векторизации данные можно хранить в Milvus для управления и векторного поиска. На приведенной ниже схеме показан основной процесс.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/use-dense-vector.png" alt="Use Dense Vector" class="doc-image" id="use-dense-vector" /> 
   <span>Использование плотных векторов</span>
  
 </span></p>
<div class="alert note">
<p>Помимо плотных векторов Milvus также поддерживает разреженные и бинарные векторы. Разреженные векторы подходят для точного сопоставления на основе конкретных терминов, например, для поиска по ключевым словам и сопоставления терминов, тогда как бинарные векторы обычно используются для эффективной обработки бинаризованных данных, таких как сопоставление образов и некоторые приложения хеширования. Дополнительную информацию см. в разделах <a href="/docs/ru/binary-vector.md">«Бинарные векторы</a> » и <a href="/docs/ru/sparse_vector.md">«Разреженные векторы</a>».</p>
</div>
<h2 id="Use-dense-vectors" class="common-anchor-header">Использование плотных векторов<button data-href="#Use-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field" class="common-anchor-header">Добавление поля векторов<button data-href="#Add-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы использовать плотные векторы в Milvus, сначала при создании коллекции необходимо определить векторное поле для хранения плотных векторов. Этот процесс включает:</p>
<ol>
<li><p>Установку параметра ` <code translate="no">datatype</code> ` в значение, соответствующее поддерживаемому типу данных плотного вектора. Список поддерживаемых типов данных плотных векторов см. в разделе «Типы данных».</p></li>
<li><p>Указание размерности плотного вектора с помощью параметра <code translate="no">dim</code>.</p></li>
</ol>
<p>В приведенном ниже примере мы добавляем векторное поле с именем <code translate="no">dense_vector</code> для хранения плотных векторов. Тип данных поля — <code translate="no">FLOAT_VECTOR</code>, размерность — <code translate="no">4</code>.</p>
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
schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
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
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
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

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">100</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">4</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">true</span>)
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
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    );
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">true</span>);
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;pk&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">100</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
});

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>
    }
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    EnableDynamicFields = <span class="hljs-literal">true</span>,
    Fields =
    {
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;pk&quot;</span>, maxLength: <span class="hljs-number">100</span>, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>),
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;dense_vector&quot;</span>, dimension: <span class="hljs-number">4</span>)
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
    &quot;fieldName&quot;: &quot;dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 4
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Поддерживаемые типы данных для плотных векторных полей</strong>:</p>
<table>
   <tr>
     <th><p>Тип данных</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Хранит 32-битные числа с плавающей запятой, которые обычно используются для представления действительных чисел в научных вычислениях и машинном обучении. Идеально подходит для сценариев, требующих высокой точности, таких как различение похожих векторов.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>Хранит 16-битные числа с плавающей запятой половинной точности, используемые для глубокого обучения и вычислений на графическом процессоре (GPU). Это позволяет сэкономить место для хранения в сценариях, где точность не является критической, например, на этапе отбора с низкой точностью в системах рекомендаций.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>Хранит 16-битные числа с плавающей запятой Brain (bfloat16), предлагая тот же диапазон экспонент, что и Float32, но с пониженной точностью. Подходит для сценариев, требующих быстрой обработки больших объемов векторов, например, при крупномасштабном поиске изображений.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Хранит векторы, отдельные элементы которых в каждом измерении представляют собой 8-битные целые числа (int8), причем диапазон значений каждого элемента составляет от –128 до 127. Разработанный для квантованных моделей глубокого обучения (например, ResNet, EfficientNet), INT8_VECTOR уменьшает размер модели и ускоряет инференцию с минимальной потерей точности.<br/><strong>Примечание</strong>: этот тип вектора поддерживается только для индексов HNSW.</p></td>
   </tr>
</table>
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
    </button></h3><p>Для ускорения семантического поиска необходимо создать индекс для векторного поля. Индексирование может значительно повысить эффективность поиска в крупномасштабных векторных данных.</p>
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
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;dense_vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;dense_vector_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

idx := index.NewAutoIndex(entity.IP)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;dense_vector_index&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

std::vector&lt;milvus::IndexDesc&gt; indexes = {
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>, <span class="hljs-string">&quot;dense_vector_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::IP)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = {
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;dense_vector_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dense_vector&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> indexParams = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> IndexParam(
        fieldName: <span class="hljs-string">&quot;dense_vector&quot;</span>,
        indexName: <span class="hljs-string">&quot;dense_vector_index&quot;</span>,
        indexType: IndexType.AutoIndex,
        metricType: MetricType.Ip)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;dense_vector&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;dense_vector_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше примере для поля <code translate="no">dense_vector</code> создается индекс с именем <code translate="no">dense_vector_index</code> с использованием типа индекса <code translate="no">AUTOINDEX</code>. Параметр <code translate="no">metric_type</code> установлен в значение <code translate="no">IP</code>, что указывает на использование внутреннего произведения в качестве метрики расстояния.</p>
<p>Milvus предоставляет различные типы индексов для более эффективного векторного поиска. AUTOINDEX — это специальный тип индекса, разработанный для облегчения освоения векторного поиска. Вам доступно множество типов индексов на выбор. Подробности см. в разделе <a href="/docs/ru/index-explained.md">«Объяснение индексов</a>».</p>
<p>Milvus поддерживает и другие типы метрик. Дополнительную информацию см. в разделе <a href="/docs/ru/metric.md">«Типы метрик</a>».</p>
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
    </button></h3><p>После завершения настройки параметров плотного вектора и индекса можно создать коллекцию, содержащую плотные векторы. В приведенном ниже примере с помощью метода ` <code translate="no">create_collection</code> ` создается коллекция с именем ` <code translate="no">my_collection</code>`.</p>
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
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
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
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// CreateCollection creates the configured indexes and loads the collection automatically.</span>
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                            .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(indexes))
                                            .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createRes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(createRes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Schema = schema,
    Indexes = indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
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
    </button></h3><p>После создания коллекции используйте метод ` <code translate="no">insert</code> ` для добавления данных, содержащих плотные векторы. Убедитесь, что размерность вставляемых плотных векторов соответствует значению ` <code translate="no">dim</code> `, заданному при добавлении поля плотных векторов.</p>
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
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>]},
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
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.1, 0.2, 0.3, 0.7]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.2, 0.3, 0.4, 0.8]}&quot;</span>, JsonObject.class));

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
    WithFloatVectorColumn(<span class="hljs-string">&quot;dense_vector&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>},
        {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>},
    }),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}

flushTask, err := client.Flush(ctx, milvusclient.NewFlushOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<span class="hljs-keyword">if</span> err := flushTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rows</span> = <span class="hljs-built_in">vec!</span>[
    serde_json::json!({<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]}),
    serde_json::json!({<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>]}),
];

<span class="hljs-keyword">let</span> <span class="hljs-variable">insert</span> = client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>(rows)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{} rows inserted&quot;</span>, insert.<span class="hljs-title function_ invoke__">insert_count</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::EntityRows data = {{{<span class="hljs-string">&quot;dense_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>}}},
                           {{<span class="hljs-string">&quot;dense_vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>}}}};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">Flush</span>(milvus::<span class="hljs-built_in">FlushRequest</span>().<span class="hljs-built_in">AddCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>] },
    { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>] }
];

<span class="hljs-keyword">const</span> insertRes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(insertRes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;dense_vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.7f</span> }
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;dense_vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.8f</span> }
    }
};

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    RowsData = data
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;dense_vector&quot;: [0.1, 0.2, 0.3, 0.7]},
        {&quot;dense_vector&quot;: [0.2, 0.3, 0.4, 0.8]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572531&quot;,&quot;453577185629572532&quot;]}}</span>
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
    </button></h3><p>Семантический поиск на основе плотных векторов — одна из ключевых функций Milvus, позволяющая быстро находить данные, наиболее похожие на вектор-запрос, на основе расстояния между векторами. Чтобы выполнить поиск по схожести, подготовьте вектор-запрос и параметры поиска, а затем вызовите метод ` <code translate="no">search</code> `.</p>
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

query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    search_params=search_params,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172271&#x27;, &#x27;distance&#x27;: 0.7599999904632568, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172271&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172270&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172270&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.7f</span>});

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;dense_vector&quot;</span>)
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

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                     <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
    WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">search</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;nprobe&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;10&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;pk&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, search.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                   .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;pk&quot;</span>)
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
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>];

<span class="hljs-keyword">const</span> searchRes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;pk&quot;</span>],
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(searchRes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> queryVector = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.7f</span> });

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;dense_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { queryVector },
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Nprobe = <span class="hljs-number">10</span>,
        OutputFields = { <span class="hljs-string">&quot;pk&quot;</span> }
    }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, res.SingleResults.SelectMany(r =&gt; r.Scores)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.1, 0.2, 0.3, 0.7]
    ],
    &quot;annsField&quot;: &quot;dense_vector&quot;,
    &quot;limit&quot;: 5,
    &quot;searchParams&quot;:{
        &quot;params&quot;:{&quot;nprobe&quot;:10}
    },
    &quot;outputFields&quot;: [&quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.55,&quot;id&quot;:&quot;453577185629572532&quot;,&quot;pk&quot;:&quot;453577185629572532&quot;},{&quot;distance&quot;:0.42,&quot;id&quot;:&quot;453577185629572531&quot;,&quot;pk&quot;:&quot;453577185629572531&quot;}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительную информацию о параметрах поиска по сходству см. в разделе <a href="/docs/ru/single-vector-search.md">«Базовый поиск с использованием нейронных сетей</a>».</p>
