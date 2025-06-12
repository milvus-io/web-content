---
id: binary-vector.md
title: Двоичный вектор
summary: >-
  Двоичные векторы - это особая форма представления данных, которая преобразует
  традиционные высокоразмерные векторы с плавающей точкой в двоичные векторы,
  содержащие только 0 и 1. Это преобразование не только уменьшает размер
  вектора, но и снижает затраты на хранение и вычисления, сохраняя при этом
  семантическую информацию. Когда точность для некритичных характеристик не
  важна, двоичные векторы могут эффективно сохранить большую часть целостности и
  полезности исходных векторов с плавающей точкой.
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
    </button></h1><p>Двоичные векторы - это особая форма представления данных, которая преобразует традиционные высокоразмерные векторы с плавающей точкой в двоичные векторы, содержащие только 0 и 1. Это преобразование не только уменьшает размер вектора, но и снижает затраты на хранение и вычисления, сохраняя при этом семантическую информацию. Когда точность для некритичных характеристик не важна, двоичные векторы могут эффективно сохранять большую часть целостности и полезности исходных векторов с плавающей точкой.</p>
<p>Двоичные векторы имеют широкий спектр применения, особенно в ситуациях, когда эффективность вычислений и оптимизация хранения данных имеют решающее значение. В крупномасштабных системах искусственного интеллекта, таких как поисковые или рекомендательные системы, обработка огромных объемов данных в реальном времени является ключевой задачей. Уменьшая размер векторов, двоичные векторы помогают снизить время ожидания и вычислительные затраты без существенного ущерба для точности. Кроме того, двоичные векторы полезны в средах с ограниченными ресурсами, таких как мобильные устройства и встроенные системы, где память и вычислительная мощность ограничены. Благодаря использованию двоичных векторов сложные функции искусственного интеллекта могут быть реализованы в таких ограниченных условиях при сохранении высокой производительности.</p>
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
    </button></h2><p>Двоичные векторы - это метод кодирования сложных объектов (таких как изображения, текст или аудио) в двоичные значения фиксированной длины. В Milvus двоичные векторы обычно представляются в виде массивов битов или массивов байтов. Например, 8-мерный двоичный вектор может быть представлен как <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code>.</p>
<p>На диаграмме ниже показано, как двоичные векторы представляют наличие ключевых слов в текстовом контенте. В этом примере для представления двух разных текстов<strong>(Текст 1</strong> и <strong>Текст 2</strong>) используется 10-мерный двоичный вектор, где каждое измерение соответствует слову в словаре: 1 означает присутствие слова в тексте, а 0 - его отсутствие.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/binary-vector.png" alt="Binary Vector" class="doc-image" id="binary-vector" />
   </span> <span class="img-wrapper"> <span>Двоичный вектор</span> </span></p>
<p>Двоичные векторы обладают следующими характеристиками:</p>
<ul>
<li><p><strong>Эффективное хранение:</strong> Каждое измерение требует всего 1 бит памяти, что значительно сокращает пространство для хранения.</p></li>
<li><p><strong>Быстрое вычисление:</strong> Сходство между векторами может быть быстро вычислено с помощью побитовых операций, таких как XOR.</p></li>
<li><p><strong>Фиксированная длина:</strong> Длина вектора остается неизменной независимо от длины исходного текста, что упрощает индексирование и поиск.</p></li>
<li><p><strong>Простота и интуитивность:</strong> Непосредственно отражает наличие ключевых слов, что делает его подходящим для некоторых специализированных поисковых задач.</p></li>
</ul>
<p>Бинарные векторы могут быть сгенерированы различными методами. При обработке текстов можно использовать предопределенные словари для установки соответствующих битов на основе наличия слов. При обработке изображений алгоритмы перцептивного хэширования (например, <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>) могут генерировать двоичные характеристики изображений. В приложениях машинного обучения выходные данные моделей могут быть бинаризованы для получения двоичных векторных представлений.</p>
<p>После бинарной векторизации данные могут быть сохранены в Milvus для управления и поиска векторов. На диаграмме ниже показан основной процесс.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/use-binary-vector.png" alt="Use Binary Vector" class="doc-image" id="use-binary-vector" />
   </span> <span class="img-wrapper"> <span>Использование бинарного вектора</span> </span></p>
<div class="alert note">
<p>Хотя двоичные векторы отлично подходят для определенных сценариев, их выразительные возможности ограничены, что затрудняет передачу сложных семантических отношений. Поэтому в реальных сценариях двоичные векторы часто используются вместе с другими типами векторов, чтобы сбалансировать эффективность и выразительность. Дополнительные сведения см. в разделах <a href="/docs/ru/dense-vector.md">"Плотный вектор"</a> и <a href="/docs/ru/sparse_vector.md">"Разреженный вектор</a>".</p>
</div>
<h2 id="Use-binary-vectors" class="common-anchor-header">Использование двоичных векторов<button data-href="#Use-binary-vectors" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field" class="common-anchor-header">Добавить векторное поле</h3><p>Чтобы использовать двоичные векторы в Milvus, сначала определите векторное поле для хранения двоичных векторов при создании коллекции. Этот процесс включает в себя:</p>
<ol>
<li><p>Установка <code translate="no">datatype</code> в поддерживаемый тип данных двоичного вектора, т. е. <code translate="no">BINARY_VECTOR</code>.</p></li>
<li><p>Указание размеров вектора с помощью параметра <code translate="no">dim</code>. Обратите внимание, что <code translate="no">dim</code> должен быть кратен 8, так как при вставке двоичные векторы должны быть преобразованы в массив байтов. Каждые 8 булевых значений (0 или 1) будут упакованы в 1 байт. Например, если <code translate="no">dim=128</code>, то для вставки потребуется 16-байтовый массив.</p></li>
</ol>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
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
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">128</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

schema.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary vector&quot;</span>,
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
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
<p>В этом примере добавлено векторное поле с именем <code translate="no">binary_vector</code> для хранения двоичных векторов. Тип данных этого поля - <code translate="no">BINARY_VECTOR</code>, размерность - 128.</p>
<h3 id="Set-index-params-for-vector-field" class="common-anchor-header">Установка параметров индекса для векторного поля</h3><p>Для ускорения поиска необходимо создать индекс для двоичного векторного поля. Индексирование может значительно повысить эффективность поиска в больших векторных данных.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = {
  <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;binary_vector&quot;</span>, idx)
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
<p>В приведенном выше примере для поля <code translate="no">binary_vector</code> создается индекс с именем <code translate="no">binary_vector_index</code>, использующий тип индекса <code translate="no">AUTOINDEX</code>. Значение <code translate="no">metric_type</code> установлено в <code translate="no">HAMMING</code>, что указывает на использование расстояния Хэмминга для измерения сходства.</p>
<p>Milvus предоставляет различные типы индексов для более удобного векторного поиска. AUTOINDEX - это специальный тип индекса, предназначенный для сглаживания кривой обучения векторному поиску. Существует множество типов индексов, из которых вы можете выбирать. Подробнее см. в разделе xxx.</p>
<p>Кроме того, Milvus поддерживает другие метрики сходства для бинарных векторов. Для получения дополнительной информации обратитесь к разделу <a href="/docs/ru/metric.md">Типы метрик</a>.</p>
<h3 id="Create-collection" class="common-anchor-header">Создание коллекции</h3><p>После того как настройки бинарных векторов и индексов завершены, создайте коллекцию, содержащую бинарные векторы. В примере ниже используется метод <code translate="no">create_collection</code> для создания коллекции с именем <code translate="no">my_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Вставка данных</h3><p>После создания коллекции используйте метод <code translate="no">insert</code> для добавления данных, содержащих двоичные векторы. Обратите внимание, что двоичные векторы должны быть представлены в виде байтового массива, где каждый байт представляет собой 8 булевых значений.</p>
<p>Например, для 128-мерного двоичного вектора требуется 16-байтовый массив (так как 128 бит ÷ 8 бит/байт = 16 байт). Ниже приведен пример кода для вставки данных:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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

data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector) <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors}]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] convertBoolArrayToBytes(<span class="hljs-type">boolean</span>[] booleanArray) {
    <span class="hljs-type">byte</span>[] byteArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[booleanArray.length / Byte.SIZE];
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; booleanArray.length; i++) {
        <span class="hljs-keyword">if</span> (booleanArray[i]) {
            <span class="hljs-type">int</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> i / Byte.SIZE;
            <span class="hljs-type">int</span> <span class="hljs-variable">shift</span> <span class="hljs-operator">=</span> i % Byte.SIZE;
            byteArray[index] |= (<span class="hljs-type">byte</span>) (<span class="hljs-number">1</span> &lt;&lt; shift);
        }
    }

    <span class="hljs-keyword">return</span> byteArray;
}

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
{
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}
{
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithBinaryVectorColumn(<span class="hljs-string">&quot;binary_vector&quot;</span>, <span class="hljs-number">128</span>, [][]<span class="hljs-type">byte</span>{
        {<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010100, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
        {<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010101, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
    }))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Выполнение поиска по сходству</h3><p>Поиск по сходству - одна из основных функций Milvus, позволяющая быстро находить данные, наиболее похожие на вектор запроса, на основе расстояния между векторами. Чтобы выполнить поиск по сходству с использованием бинарных векторов, подготовьте вектор запроса и параметры поиска, а затем вызовите метод <code translate="no">search</code>.</p>
<p>В процессе поиска бинарные векторы также должны быть предоставлены в виде массива байтов. Убедитесь, что размерность вектора запроса соответствует размерности, указанной при определении <code translate="no">dim</code>, и что каждые 8 булевых значений преобразуются в 1 байт.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);

<span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
<span class="hljs-type">BinaryVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(convertBoolArrayToBytes(boolArray));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());
        
 System.out.println(searchR.getSearchResults());
 
 <span class="hljs-comment">// Output</span>
 <span class="hljs-comment">//</span>
 <span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>];

client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">byte</span>{<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010100, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                      <span class="hljs-comment">// limit</span>
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
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
        &quot;params&quot;:{&quot;nprobe&quot;:10}
    }&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,
    \&quot;limit\&quot;: 5,
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительную информацию о параметрах поиска сходства см. в разделе <a href="/docs/ru/single-vector-search.md">Базовый поиск ANN</a>.</p>
