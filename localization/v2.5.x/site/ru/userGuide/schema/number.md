---
id: number.md
title: Числовое поле
related_key: 'number, integer, float, double'
summary: >-
  Числовые поля используются для хранения невекторных числовых данных в Milvus.
  Эти поля обычно используются для описания дополнительной информации, связанной
  с векторными данными, такой как возраст, цена и т. д. Используя эти данные, вы
  можете лучше описать векторы и повысить эффективность фильтрации данных и
  условных запросов.
---
<h1 id="Number-Field​" class="common-anchor-header">Числовое поле<button data-href="#Number-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>Числовые поля используются для хранения невекторных числовых данных в Milvus. Эти поля обычно используются для описания дополнительной информации, связанной с векторными данными, такой как возраст, цена и т. д. Используя эти данные, вы можете лучше описать векторы и повысить эффективность фильтрации данных и условных запросов.</p>
<p>Числовые поля особенно полезны во многих сценариях. Например, в рекомендациях по электронной коммерции поле цены может использоваться для фильтрации, а при анализе профиля пользователя возрастные диапазоны помогают уточнить результаты. В сочетании с векторными данными числовые поля могут помочь системе обеспечить схожий поиск и более точно удовлетворить индивидуальные потребности пользователей.</p>
<h2 id="Supported-number-field-types​" class="common-anchor-header">Поддерживаемые типы числовых полей<button data-href="#Supported-number-field-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает различные типы числовых полей для удовлетворения различных потребностей в хранении данных и запросов.</p>
<table><thead><th data-block-token="AGYrd69etohgaUxzUyGcXFw8npI" colspan="1" rowspan="1"><p data-block-token="Qbx1dsbirortMixjxXJcukoLnjR">Тип</p>
</th><th data-block-token="AGYrd69etohgaUxzUyGcXFw8npI" colspan="1" rowspan="1"><p data-block-token="Qbx1dsbirortMixjxXJcukoLnjR">Описание</p>
</th></tr></thead><tbody><tr><td data-block-token="FQ0rdk7NKoAmtUxD5n7cHWBfnKd" colspan="1" rowspan="1"><p data-block-token="J4YBdReSPol6jvxIPyxcs7lRnGQ"><code translate="no">BOOL</code></p>
</td><td data-block-token="XfVYdowyvoY7iwxNCIBcRbE4nFf" colspan="1" rowspan="1"><p data-block-token="WYGTdKI4RoBTXbxR2YbcxC2InOb">Булевский тип для хранения <code translate="no">true</code> или <code translate="no">false</code>, подходит для описания бинарных состояний.</p>
</td></tr><tr><td data-block-token="G6JBdjvguofEOnx6lmQcXkJdn6o" colspan="1" rowspan="1"><p data-block-token="PGcDd6i5Ao3jioxzrLkcV5lanUq"><code translate="no">INT8</code></p>
</td><td data-block-token="TEVDdqVe0ooqTbxqkW7cdu8OnMe" colspan="1" rowspan="1"><p data-block-token="G5AOdYaoEom6X0x3NUKc9YL1nRh">8-битное целое число, подходит для хранения целочисленных данных небольшого диапазона.</p>
</td></tr><tr><td data-block-token="Zc6cdGRmVoEOzdxaT8Pc4jdmnxg" colspan="1" rowspan="1"><p data-block-token="SaIUd6XDYoo2msxLCSXcNJk5nre"><code translate="no">INT16</code></p>
</td><td data-block-token="EamldyccGovIeKxaLQ4cxmjMng2" colspan="1" rowspan="1"><p data-block-token="Lx9FdawAgoIlZXxGomRcaglPnyc">16-битное целое число, для хранения целочисленных данных среднего диапазона.</p>
</td></tr><tr><td data-block-token="SPeCdRoc4owdXXxWSDVcNXwVnVf" colspan="1" rowspan="1"><p data-block-token="AL4sd4HrJokAj2xwglOcxIAcnNc"><code translate="no">INT32</code></p>
</td><td data-block-token="PySwdD4CHot4YgxrOwycN2ngnAb" colspan="1" rowspan="1"><p data-block-token="FYgYdL9PPoNme4xOo62cud2Gnob">32-битное целое число, идеально подходящее для хранения общих целочисленных данных, таких как количество продукции или идентификаторы пользователей.</p>
</td></tr><tr><td data-block-token="HZWpdo7SuoA04KxvZAxcflidn9c" colspan="1" rowspan="1"><p data-block-token="NbO6dTRRToj5YNxzjICcJe8YnPh"><code translate="no">INT64</code></p>
</td><td data-block-token="FberdUuiZoyA0mxK6T4cfYpqnUf" colspan="1" rowspan="1"><p data-block-token="ZuTHdAIJ5oT8G7xvkJdcGt70nGq">64-битное целое число, подходящее для хранения данных большого диапазона, таких как временные метки или идентификаторы.</p>
</td></tr><tr><td data-block-token="XWCHd4raooSVtXxKE58cE3j0nwd" colspan="1" rowspan="1"><p data-block-token="NWOCdcYiYoMVZRxknoicMsk5nae"><code translate="no">FLOAT</code></p>
</td><td data-block-token="PqINdhj44oido7xzrTMcQA2OnDh" colspan="1" rowspan="1"><p data-block-token="BA2jdC2afoK4duxqG8lcJln8nLH">32-битное число с плавающей точкой - для данных, требующих общей точности, таких как номиналы или температура.</p>
</td></tr><tr><td data-block-token="I3YZdrlQcoGhPExUIq0cQUDDnFe" colspan="1" rowspan="1"><p data-block-token="MKqAdpPoPovAxWxjeAXcF6PmnfK"><code translate="no">DOUBLE</code></p>
</td><td data-block-token="Vb2Cdz3wVoBoizxAwswc9CvFnXf" colspan="1" rowspan="1"><p data-block-token="R501ddb8Uoir53xLFwecx1BenVe">64-битное число с плавающей запятой двойной точности - для данных высокой точности, таких как финансовая информация или научные расчеты.</p>
</td></tr></tbody></table>
<h2 id="Add-number-field​" class="common-anchor-header">Добавление числового поля<button data-href="#Add-number-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать числовые поля в Milvus, определите соответствующие поля в схеме коллекции, установив для <code translate="no">datatype</code> поддерживаемый тип, например <code translate="no">BOOL</code> или <code translate="no">INT8</code>. Полный список поддерживаемых типов числовых полей см. в разделе <a href="#Supported-number-field-types">Поддерживаемые типы числовых полей</a>.</p>
<p>В следующем примере показано, как определить схему, включающую числовые поля <code translate="no">age</code> и <code translate="no">price</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64)​
schema.add_field(field_name=<span class="hljs-string">&quot;price&quot;</span>, datatype=DataType.FLOAT)​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)​
        .dataType(DataType.Int64)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;price&quot;</span>)​
        .dataType(DataType.Float)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;price&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,​
  },​
];​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;age&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> floatField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;price&quot;,​
    &quot;dataType&quot;: &quot;Float&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$floatField</span>,​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Основное поле и векторное поле являются обязательными при создании коллекции. Первичное поле уникально идентифицирует каждую сущность, а векторное поле имеет решающее значение для поиска по сходству. Подробнее см. в разделах <a href="/docs/ru/primary-field.md">Первичное поле и автоидентификация</a>, <a href="/docs/ru/dense-vector.md">Плотный вектор</a>, <a href="/docs/ru/binary-vector.md">Двоичный вектор</a> или <a href="/docs/ru/sparse_vector.md">Разреженный вектор</a>.</p>
</div>
<h2 id="Set-index-params​" class="common-anchor-header">Установка индексных параметров<button data-href="#Set-index-params​" class="anchor-icon" translate="no">
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
    </button></h2><p>Установка параметров индекса для числовых полей необязательна, но может значительно повысить эффективность поиска.</p>
<p>В следующем примере мы создаем <code translate="no">AUTOINDEX</code> для числового поля <code translate="no">age</code>, что позволяет Milvus автоматически создавать соответствующий индекс на основе типа данных. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/glossary.md#Auto-Index">АВТОИНДЕКС</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;age&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .build());​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;inverted_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;age&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;age&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Помимо <code translate="no">AUTOINDEX</code>, вы можете указать другие типы индексов для числовых полей. Поддерживаемые типы индексов см. в разделе <a href="/docs/ru/scalar_index.md">Скалярные индексы</a>.</p>
<p>Кроме того, перед созданием коллекции необходимо создать индекс для векторного поля. В этом примере мы используем <code translate="no">AUTOINDEX</code>, чтобы упростить настройку векторного индекса.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add vector index​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings​</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexes.<span class="hljs-keyword">add</span>(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> indexParams = [​
  {​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;age&quot;</span>,​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
  },​
  {​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
  },​
];​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;age&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        },​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection​" class="common-anchor-header">Создание коллекции<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>После того как схема и индексы определены, можно создать коллекцию, включающую числовые поля.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_scalar_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">Вставка данных<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>После создания коллекции вы можете вставить данные, включающие числовые поля.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>]},​
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.50</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]},​
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">35</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">199.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>]},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 25, \&quot;price\&quot;: 99.99, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 30, \&quot;price\&quot;: 149.50, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 35, \&quot;price\&quot;: 199.99, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>] },​
  { <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">149.5</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>] },​
  { <span class="hljs-attr">age</span>: <span class="hljs-number">35</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">199.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;age&quot;: 25, &quot;price&quot;: 99.99, &quot;pk&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3]},​
        {&quot;age&quot;: 30, &quot;price&quot;: 149.50, &quot;pk&quot;: 2, &quot;embedding&quot;: [0.4, 0.5, 0.6]},​
        {&quot;age&quot;: 35, &quot;price&quot;: 199.99, &quot;pk&quot;: 3, &quot;embedding&quot;: [0.7, 0.8, 0.9]}       ​
    ],​
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>В этом примере мы вставляем данные, включающие <code translate="no">age</code>, <code translate="no">price</code>, <code translate="no">pk</code> (основное поле) и векторное представление (<code translate="no">embedding</code>). Чтобы убедиться, что вставляемые данные соответствуют полям, определенным в схеме, рекомендуется заранее проверить типы данных, чтобы избежать ошибок.</p>
<p>Если при определении схемы вы установите значение <code translate="no">enable_dynamic_fields=True</code>, Milvus позволит вам вставлять числовые поля, которые не были определены заранее. Однако имейте в виду, что это может увеличить сложность запросов и управления, что потенциально может повлиять на производительность. Дополнительную информацию см. в разделе <a href="/docs/ru/enable-dynamic-field.md">Динамическое поле</a>.</p>
<h2 id="Search-and-query​" class="common-anchor-header">Поиск и запросы<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>После добавления числовых полей вы можете использовать их для фильтрации в операциях поиска и запросов, чтобы получить более точные результаты поиска.</p>
<h3 id="Filter-queries​" class="common-anchor-header">Фильтр запросов</h3><p>После добавления числовых полей их можно использовать для фильтрации в запросах. Например, вы можете запросить все сущности, в которых <code translate="no">age</code> находится в диапазоне от 30 до 40.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;30 &lt;= age &lt;= 40&quot;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;age&#x27;: 30, &#x27;price&#x27;: np.float32(149.5), &#x27;pk&#x27;: 2}&quot;, &quot;{&#x27;age&#x27;: 35, &#x27;price&#x27;: np.float32(199.99), &#x27;pk&#x27;: 3}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;30 &lt;= age &lt;= 40&quot;</span>;​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .filter(filter)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .build());​
System.out.println(resp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={price=149.5, pk=2, age=30}), QueryResp.QueryResult(entity={price=199.99, pk=3, age=35})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;30 &lt;= age &lt;= 40&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,​
    &quot;filter&quot;: &quot;30 &lt;= age &lt;= 40&quot;,​
    &quot;outputFields&quot;: [&quot;age&quot;,&quot;price&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;pk&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:35,&quot;pk&quot;:3,&quot;price&quot;:199.99}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Это выражение запроса возвращает все совпадающие сущности и выводит их поля <code translate="no">age</code> и <code translate="no">price</code>. Дополнительные сведения о фильтрации запросов см. в разделе <a href="/docs/ru/boolean.md">Фильтрация метаданных</a>.</p>
<h3 id="Vector-search-with-number-filtering​" class="common-anchor-header">Векторный поиск с фильтрацией по числам</h3><p>Помимо базовой фильтрации по числовым полям, можно комбинировать векторный поиск по сходству с фильтрами по числовым полям. Например, в следующем коде показано, как добавить фильтр по полю чисел к векторному поиску.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.06000000238418579, &#x27;entity&#x27;: {&#x27;age&#x27;: 25, &#x27;price&#x27;: 99.98999786376953}}, {&#x27;id&#x27;: 2, &#x27;distance&#x27;: -0.12000000476837158, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;price&#x27;: 149.5}}, {&#x27;id&#x27;: 3, &#x27;distance&#x27;: -0.18000000715255737, &#x27;entity&#x27;: {&#x27;age&#x27;: 35, &#x27;price&#x27;: 199.99000549316406}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>;​
​
SearchResp resp = client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
// Output​
//​
// [[SearchResp.SearchResult(entity={price=<span class="hljs-number">199.99</span>, age=<span class="hljs-number">35</span>}, score=-<span class="hljs-number">0.19054288</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">3</span>), SearchResp.SearchResult(entity={price=<span class="hljs-number">149.5</span>, age=<span class="hljs-number">30</span>}, score=-<span class="hljs-number">0.20163085</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">2</span>), SearchResp.SearchResult(entity={price=<span class="hljs-number">99.99</span>, age=<span class="hljs-number">25</span>}, score=-<span class="hljs-number">0.2364331</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)]]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;25 &lt;= age &lt;= 35&#x27;</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;annsField&quot;: &quot;embedding&quot;,​
    &quot;limit&quot;: 5,​
    &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:35,&quot;distance&quot;:-0.19054288,&quot;id&quot;:3,&quot;price&quot;:199.99},{&quot;age&quot;:30,&quot;distance&quot;:-0.20163085,&quot;id&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:25,&quot;distance&quot;:-0.2364331,&quot;id&quot;:1,&quot;price&quot;:99.99}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>В этом примере мы сначала определяем вектор запроса и добавляем условие фильтра <code translate="no">25 &lt;= age &lt;= 35</code> во время поиска. Это гарантирует, что результаты поиска будут не только похожи на вектор запроса, но и будут соответствовать заданному возрастному диапазону. Дополнительные сведения см. в разделе <a href="/docs/ru/boolean.md">Фильтрация метаданных</a>.</p>
