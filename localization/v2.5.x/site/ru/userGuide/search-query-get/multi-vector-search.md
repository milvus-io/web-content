---
id: multi-vector-search.md
order: 2
summary: >-
  В этом руководстве показано, как выполнять гибридный поиск в Milvus и понимать
  ранжирование результатов.
title: Гибридный поиск
---
<h1 id="Hybrid-Search​" class="common-anchor-header">Гибридный поиск<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Гибридный поиск - это метод поиска, при котором одновременно выполняется несколько ANN-поисков, перебираются несколько наборов результатов этих ANN-поисков и в итоге возвращается один набор результатов. Использование гибридного поиска позволяет повысить точность поиска. Zilliz поддерживает проведение гибридного поиска в коллекции с несколькими векторными полями. </p>
<p>Гибридный поиск чаще всего используется в сценариях, включающих поиск по разреженным и плотным векторам и мультимодальный поиск. В этом руководстве на конкретном примере показано, как проводить гибридный поиск в Zilliz.</p>
<h2 id="Scenarios​" class="common-anchor-header">Сценарии<button data-href="#Scenarios​" class="anchor-icon" translate="no">
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
    </button></h2><p>Гибридный поиск подходит для следующих двух сценариев.</p>
<h3 id="Sparse-Dense-Vector-Search​" class="common-anchor-header">Поиск по разреженным и плотным векторам</h3><p>Различные типы векторов могут представлять различную информацию, а использование различных моделей встраивания позволяет более полно представить различные особенности и аспекты данных. Например, при использовании различных моделей встраивания для одного и того же предложения можно сгенерировать плотный вектор для представления семантического значения и разреженный вектор для представления частоты слов в предложении.</p>
<ul>
<li><p><strong>Разреженные векторы:</strong> Разреженные векторы характеризуются высокой размерностью вектора и наличием небольшого количества ненулевых значений. Такая структура делает их особенно хорошо подходящими для традиционных приложений информационного поиска. В большинстве случаев количество измерений, используемых в разреженных векторах, соответствует различным лексемам в одном или нескольких языках. Каждому измерению присваивается значение, которое указывает на относительную важность этой лексемы в документе. Такая схема удобна для задач, связанных с сопоставлением текстов.</p></li>
<li><p><strong>Плотные векторы:</strong> Плотные векторы - это вкрапления, полученные из нейронных сетей. Будучи расположенными в упорядоченном массиве, эти векторы отражают семантическую сущность входного текста. Обратите внимание, что плотные векторы не ограничиваются обработкой текста; они также широко используются в компьютерном зрении для представления семантики визуальных данных. Эти плотные векторы, обычно генерируемые моделями встраивания текста, характеризуются тем, что большинство или все элементы являются ненулевыми. Таким образом, плотные векторы особенно эффективны для приложений семантического поиска, поскольку они могут возвращать наиболее похожие результаты на основе векторного расстояния даже при отсутствии точных текстовых совпадений. Эта возможность позволяет получить более тонкие и учитывающие контекст результаты поиска, часто улавливая взаимосвязи между понятиями, которые могут быть упущены при использовании подходов, основанных на ключевых словах.</p></li>
</ul>
<p>Более подробную информацию см. в разделах <a href="/docs/ru/sparse_vector.md">"Разреженный вектор"</a> и <a href="/docs/ru/dense-vector.md">"Плотный вектор</a>".</p>
<h3 id="Multimodal-Search​" class="common-anchor-header">Мультимодальный поиск</h3><p>Мультимодальный поиск - это поиск сходства между неструктурированными данными в нескольких модальностях (например, изображения, видео, аудио, текст и т. д.). Например, человек может быть представлен с помощью различных модальностей данных, таких как отпечатки пальцев, отпечатки голоса и черты лица. Гибридный поиск поддерживает несколько поисков одновременно. Например, поиск человека по схожим отпечаткам пальцев и отпечаткам голоса.</p>
<h2 id="Workflow​" class="common-anchor-header">Рабочий процесс<button data-href="#Workflow​" class="anchor-icon" translate="no">
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
    </button></h2><p>Основной рабочий процесс при проведении гибридного поиска выглядит следующим образом.</p>
<ol>
<li><p>Генерирование плотных векторов с помощью моделей встраивания, таких как <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a> и <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers</a>.</p></li>
<li><p>Создание разреженных векторов с помощью таких моделей встраивания, как <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a> и т. д. В Milvus для создания разреженных векторов можно использовать Функцию. Дополнительные сведения см. в разделе <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p></li>
<li><p>Создайте коллекцию и определите схему коллекции, включающую плотные и разреженные векторные поля.</p></li>
<li><p>Вставьте разреженные векторы в коллекцию, только что созданную на предыдущем шаге.</p></li>
<li><p>Проведите гибридный поиск: ANN-поиск по плотным векторам вернет набор топ-K наиболее похожих результатов, а текстовое соответствие по разреженным векторам также вернет набор топ-K результатов.</p></li>
<li><p>Нормализация: Нормализуйте оценки двух наборов топ-K результатов, преобразовав их в диапазон между [0,1].</p></li>
<li><p>Выберите подходящую стратегию ранжирования для объединения и ранжирования двух наборов результатов top-K и, в конечном счете, верните окончательный набор результатов top-K.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс гибридного поиска</span> </span></p>
<h2 id="Examples​" class="common-anchor-header">Примеры<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе на конкретном примере показано, как проводить гибридный поиск на разреженных векторах для повышения точности текстового поиска.</p>
<h3 id="Create-a-collection-with-multiple-vector-fields​" class="common-anchor-header">Создание коллекции с несколькими векторными полями</h3><p>Процесс создания коллекции состоит из трех частей: определение схемы коллекции, настройка параметров индекса и создание коллекции.</p>
<h4 id="Define-schema​" class="common-anchor-header">Определение схемы</h4><p>В этом примере необходимо определить несколько векторных полей в схеме коллекции. В настоящее время каждая коллекция по умолчанию может включать до 4 векторных полей. Но вы также можете изменить значение параметра  <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>  чтобы при необходимости включить в коллекцию до 10 векторных полей.</p>
<p>В следующем примере определена схема коллекции, где <code translate="no">dense</code> и <code translate="no">sparse</code> - это два векторных поля.</p>
<ul>
<li><p><code translate="no">id</code>: Это поле служит первичным ключом для хранения текстовых идентификаторов. Тип данных этого поля - INT64.</p></li>
<li><p><code translate="no">text</code>: Это поле используется для хранения текстового содержимого. Тип данных этого поля - VARCHAR, максимальная длина - 1000 символов.</p></li>
<li><p><code translate="no">dense</code>: Это поле используется для хранения плотных векторов текстов. Тип данных этого поля - FLOAT_VECTOR, размерность вектора - 768.</p></li>
<li><p><code translate="no">sparse</code>: Это поле используется для хранения разреженных векторов текстов. Тип данных этого поля - SPARSE_FLOAT_VECTOR. В этом примере мы используем функцию для генерации разреженных векторов.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
<span class="hljs-comment"># Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)​
<span class="hljs-comment"># Define a sparse vector field to generate spare vectors with BM25</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">1000</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">768</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// WIP​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// Create a collection in customized setup mode​</span>
<span class="hljs-comment">// Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: true,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;text&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 1000​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;sparse&quot;,​
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
            },​
            {​
                &quot;fieldName&quot;: &quot;dense&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;768&quot;​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>При поиске разреженных векторов можно упростить процесс генерации разреженных векторов вкраплений, используя возможности полнотекстового поиска. Более подробную информацию см. в разделе <a href="/docs/ru/full-text-search.md">"Полнотекстовый поиск"</a>.</p>
<h4 id="Define-function-to-generate-sparse-vectors​" class="common-anchor-header">Определение функции для генерации разреженных векторов</h4><p>Для генерации разреженных векторов можно использовать функцию Function в Milvus. В следующем примере определена функция для генерации разреженных векторов с использованием алгоритма BM25. Дополнительные сведения см. в разделе <a href="/docs/ru/full-text-search.md">"Полнотекстовый поиск"</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define function to generate sparse vectors</span>

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">functions</span> = [
    {
      name: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      description: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-built_in">type</span>: FunctionType.BM25,
      input_field_names: [<span class="hljs-string">&#x27;text&#x27;</span>],
      output_field_names: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      params: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-index​" class="common-anchor-header">Создание индекса</h4><p>После определения схемы коллекции необходимо настроить индексы векторов и метрики сходства. В этом примере для плотного векторного поля <code translate="no">dense</code> создается индекс IVF_FLAT, а для разреженного векторного поля <code translate="no">sparse</code>- индекс SPARSE_INVERTED_INDEX. Чтобы узнать о типах поддерживаемых индексов, см. раздел <a href="https://milvus.io/docs/index.md?tab=floating">"Объяснение индексов"</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
<span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},​
)​
​
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,  <span class="hljs-comment"># Set to `BM25` when using function to generate sparse vectors</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
denseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForDenseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;dense_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(denseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
sparseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);​ <span class="hljs-comment">// Algorithm used for building and querying the index</span>
<span class="hljs-title class_">IndexParam</span> indexParamForSparseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">BM25</span>)​
        .<span class="hljs-title function_">extraParams</span>(sparseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.<span class="hljs-title function_">add</span>(indexParamForDenseField);​
indexParams.<span class="hljs-title function_">add</span>(indexParamForSparseField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_index&quot;,​
            &quot;indexType&quot;:&quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;:128}​
        },​
        {​
            &quot;fieldName&quot;: &quot;sparse&quot;,​
            &quot;metricType&quot;: &quot;BM25&quot;,​
            &quot;indexName&quot;: &quot;sparse_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection​" class="common-anchor-header">Создание коллекции</h4><p>Создайте коллекцию с именем <code translate="no">demo</code> со схемой коллекции и индексами, настроенными в предыдущих двух шагах.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Вставка данных</h3><p>Вставьте разреженно-плотные векторы в коллекцию <code translate="no">demo</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">2.7242085933685303</span>, <span class="hljs-number">6.021071434020996</span>, <span class="hljs-number">0.4754035174846649</span>, <span class="hljs-number">9.358858108520508</span>, <span class="hljs-number">5.173221111297607</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">1</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">8.584294319152832</span>, <span class="hljs-number">2.7640628814697266</span>, <span class="hljs-number">9.558855056762695</span>, <span class="hljs-number">2.584272861480713</span>, <span class="hljs-number">4.705013275146484</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">2</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">2.5525057315826416</span>, <span class="hljs-number">3.8815805912017822</span>, <span class="hljs-number">9.343480110168457</span>, <span class="hljs-number">7.888997554779053</span>, <span class="hljs-number">4.500918388366699</span>]},
]
​
res = client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    data=data​
)​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
<span class="hljs-type">float</span>[] dense1 = {<span class="hljs-number">2.7242086f</span>, <span class="hljs-number">6.0210714f</span>, <span class="hljs-number">0.47540352f</span>, <span class="hljs-number">9.3588581f</span>, <span class="hljs-number">5.1732211f</span>};
<span class="hljs-type">float</span>[] dense2 = {<span class="hljs-number">8.5842943f</span>, <span class="hljs-number">2.7640628f</span>, <span class="hljs-number">9.5588550f</span>, <span class="hljs-number">2.5842728f</span>, <span class="hljs-number">4.7050133f</span>};
<span class="hljs-type">float</span>[] dense3 = {<span class="hljs-number">2.5525057f</span>, <span class="hljs-number">3.8815806f</span>, <span class="hljs-number">9.3434801f</span>, <span class="hljs-number">7.8889976f</span>, <span class="hljs-number">4.5009184f</span>};
String[] docs = {
            <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
            <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
            <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>
};
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">0</span>]);
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">1</span>]);
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">2</span>]);
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));
​
List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);​
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .data(data)​
        .build();​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>
];

<span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">0</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">2.7242085933685303</span>, <span class="hljs-number">6.021071434020996</span>, <span class="hljs-number">0.4754035174846649</span>, <span class="hljs-number">9.358858108520508</span>, <span class="hljs-number">5.173221111297607</span>]
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">1</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">8.584294319152832</span>, <span class="hljs-number">2.7640628814697266</span>, <span class="hljs-number">9.558855056762695</span>, <span class="hljs-number">2.584272861480713</span>, <span class="hljs-number">4.705013275146484</span>]
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">2</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">2.5525057315826416</span>, <span class="hljs-number">3.8815805912017822</span>, <span class="hljs-number">9.343480110168457</span>, <span class="hljs-number">7.888997554779053</span>, <span class="hljs-number">4.500918388366699</span>]
    }
];
​
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [
            {
                &quot;id&quot;: 1,
                &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
                &quot;dense&quot;: [2.7242085933685303, 6.021071434020996, 0.4754035174846649, 9.358858108520508, 5.173221111297607]
            },
            {
                &quot;id&quot;: 2,
                &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
                &quot;dense&quot;: [8.584294319152832, 2.7640628814697266, 9.558855056762695, 2.584272861480713, 4.705013275146484]
            },
            {
                &quot;id&quot;: 3,
                &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
                &quot;dense&quot;: [2.5525057315826416, 3.8815805912017822, 9.343480110168457, 7.888997554779053, 4.500918388366699]
            }
        ],​
    &quot;collectionName&quot;: &quot;hybrid_search_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances​" class="common-anchor-header">Создание нескольких экземпляров AnnSearchRequest</h3><p>Гибридный поиск реализуется путем создания нескольких <code translate="no">AnnSearchRequest</code> в функции <code translate="no">hybrid_search()</code>, где каждый <code translate="no">AnnSearchRequest</code> представляет собой базовый запрос на поиск ANN для определенного векторного поля. Поэтому перед проведением гибридного поиска необходимо создать <code translate="no">AnnSearchRequest</code> для каждого векторного поля.</p>
<div class="alert note">
<p>В гибридном поиске каждый <code translate="no">AnnSearchRequest</code> поддерживает только один вектор запроса.</p>
</div>
<p>Предположим, текст запроса "Кто начал исследования ИИ?" уже преобразован в разреженный и плотный векторы. Исходя из этого, создаются два поисковых запроса <code translate="no">AnnSearchRequest</code> для векторных полей <code translate="no">sparse</code> и <code translate="no">dense</code> соответственно, как показано в следующем примере.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">AnnSearchRequest</span>​
​
search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.7425515055656433</span>, <span class="hljs-number">7.774101734161377</span>, <span class="hljs-number">0.7397570610046387</span>, <span class="hljs-number">2.429982900619507</span>, <span class="hljs-number">3.8253049850463867</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_1)

search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&#x27;Who started AI research&#x27;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_2)

reqs = [request_1, request_2]
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.TextVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.IndexParam;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusSearchRequest</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-type">float</span>[] denseQueryVector = {
                <span class="hljs-number">0.7425515f</span>, <span class="hljs-number">7.7741017f</span>, <span class="hljs-number">0.73975706f</span>, <span class="hljs-number">2.4299829f</span>, <span class="hljs-number">3.825305f</span>
        };

        <span class="hljs-type">String</span> <span class="hljs-variable">sparseQueryText</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Who started AI research&quot;</span>;

        List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(denseQueryVector));

        List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TextVec</span>(sparseQueryText));

        List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

        searchRequests.add(AnnSearchReq.builder()
                .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)  <span class="hljs-comment">// Field Name</span>
                .vectors(queryDenseVectors) <span class="hljs-comment">// Query Vector</span>
                .metricType(IndexParam.MetricType.IP) <span class="hljs-comment">// Inner Product Metric</span>
                .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>) <span class="hljs-comment">// Search Params</span>
                .topK(<span class="hljs-number">2</span>) <span class="hljs-comment">// Limit results to top 2</span>
                .build());

        searchRequests.add(AnnSearchReq.builder()
                .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>) <span class="hljs-comment">// Field Name</span>
                .vectors(querySparseVectors) <span class="hljs-comment">// Query Text Vector</span>
                .metricType(IndexParam.MetricType.BM25) <span class="hljs-comment">// BM25 Metric for sparse</span>
                .params(<span class="hljs-string">&quot;{}&quot;</span>) <span class="hljs-comment">// No additional parameters for BM25</span>
                .topK(<span class="hljs-number">2</span>) <span class="hljs-comment">// Limit results to top 2</span>
                .build());

        System.out.println(<span class="hljs-string">&quot;Generated Search Requests:&quot;</span>);
        searchRequests.forEach(System.out::println);
    }
}


<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.7425515055656433</span>, <span class="hljs-number">7.774101734161377</span>, <span class="hljs-number">0.7397570610046387</span>, <span class="hljs-number">2.429982900619507</span>, <span class="hljs-number">3.8253049850463867</span>]], 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span> } 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;Who started AI research&quot;</span>], 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {} <span class="hljs-comment">// BM25 does not require extra parameters</span>
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
};

<span class="hljs-comment">// Combine both search parameters into a single request list</span>
<span class="hljs-keyword">const</span> reqs = [search_param_1, search_param_2];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.7425515055656433, 7.774101734161377, 0.7397570610046387, 2.429982900619507, 3.8253049850463867]], 
        &quot;anns_field&quot;: &quot;dense&quot;,
        &quot;param&quot;: {
            &quot;metric_type&quot;: &quot;IP&quot;,
            &quot;params&quot;: {
                &quot;nprobe&quot;: 10
            }
        },
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [&quot;Who started AI research&quot;],
        &quot;anns_field&quot;: &quot;sparse&quot;,
        &quot;param&quot;: {
            &quot;metric_type&quot;: &quot;BM25&quot;,
            &quot;params&quot;: {}
        },
        &quot;limit&quot;: 2
    }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://your-milvus-server-address/v1/vector/search&quot;</span> \
     -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&quot;<span class="hljs-variable">$req</span>&quot;</span>


<button class="copy-code-btn"></button></code></pre>
<p>Поскольку параметр <code translate="no">limit</code> имеет значение 2, каждый <code translate="no">AnnSearchRequest</code> возвращает 2 результата поиска. В данном примере создано 2 <code translate="no">AnnSearchRequest</code>, поэтому всего будет возвращено 4 результата поиска.</p>
<h3 id="Configure-a-reranking-strategy​" class="common-anchor-header">Настройка стратегии ранжирования</h3><p>Чтобы объединить и ранжировать два набора результатов поиска ANN, необходимо выбрать подходящую стратегию ранжирования. Zilliz поддерживает два типа стратегий ранжирования: <strong>WeightedRanker</strong> и <strong>RRFRanker</strong>. При выборе стратегии ранжирования следует учитывать, есть ли акцент на одном или нескольких базовых ANN-поисках по векторным полям.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Эта стратегия рекомендуется, если вы хотите, чтобы в результатах был сделан акцент на определенном векторном поле. WeightedRanker позволяет присваивать более высокие веса определенным векторным полям, делая на них больший акцент. Например, при мультимодальном поиске текстовые описания изображения могут считаться более важными, чем цвета на этом изображении.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Эта стратегия рекомендуется, когда нет конкретного акцента. RRF может эффективно сбалансировать важность каждого векторного поля.</p></li>
</ul>
<p>Более подробную информацию о механизмах работы этих двух стратегий ранжирования см. в разделе <a href="/docs/ru/reranking.md">Ранжирование</a>.</p>
<p>Следующие два примера демонстрируют использование стратегий ранжирования WeightedRanker и RRFRanker.</p>
<ol>
<li><p><strong>Пример 1: Использование WeightedRanker</strong></p>
<p>При использовании стратегии WeightedRanker необходимо ввести значения веса в функцию <code translate="no">WeightedRanker</code>. Количество базовых ANN в гибридном поиске соответствует количеству значений, которые необходимо ввести. Вводимые значения должны находиться в диапазоне [0,1], причем значения ближе к 1 означают большую важность.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">WeightedRanker</span>​
​
ranker = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;ws&quot;,​
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Пример 2: Использование RRFRanker</strong></p>
<p>При использовании стратегии RRFRanker необходимо ввести в RRFRanker значение параметра <code translate="no">k</code>. По умолчанию значение <code translate="no">k</code> равно 60. Этот параметр помогает определить, как объединяются ранги из разных поисковых запросов ANN, стремясь сбалансировать и объединить значимость всех поисковых запросов.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">RRFRanker</span>​
​
ranker = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;rrf&quot;,​
        &quot;params&quot;: { &quot;k&quot;: 100}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search​" class="common-anchor-header">Выполнение гибридного поиска</h3><p>Перед проведением гибридного поиска необходимо загрузить коллекцию в память. Если какие-либо векторные поля коллекции не имеют индекса или не загружены, при вызове метода Hybrid Search возникнет ошибка. </p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
res = client.hybrid_search(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    reqs=reqs,​
    ranker=ranker,​
    limit=<span class="hljs-number">2</span>​
)​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .searchRequests(searchRequests)​
        .ranker(reranker)​
        .topK(<span class="hljs-number">2</span>)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>​
})​
​
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;​
​
<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],​
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,​
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,​
    \&quot;rerank\&quot;: {​
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,​
        \&quot;params\&quot;: {​
            \&quot;k\&quot;: 10​
        }​
    },​
    \&quot;limit\&quot;: 3,​
    \&quot;outputFields\&quot;: [​
        \&quot;user_id\&quot;,​
        \&quot;word_count\&quot;,​
        \&quot;book_describe\&quot;​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ниже приведен результат.</p>
<pre><code translate="no" class="language-json">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]​

<button class="copy-code-btn"></button></code></pre>
<p>Поскольку в методе Hybrid Search указано <code translate="no">limit=2</code>, Zilliz проранжирует четыре результата поиска из шага 3 и в итоге вернет только 2 наиболее похожих результата поиска. </p>
