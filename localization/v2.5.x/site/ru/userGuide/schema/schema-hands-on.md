---
id: schema-hands-on.md
title: Проектирование схем на практике
summary: >-
  Информационно-поисковые системы (ИС), также известные как поисковые системы,
  необходимы для различных приложений ИИ, таких как генерация с расширенным
  поиском (RAG), поиск изображений и рекомендации товаров. Первым шагом в
  разработке IR-системы является проектирование модели данных, которое включает
  в себя анализ бизнес-требований, определение способа организации информации и
  индексацию данных для обеспечения семантического поиска.
---
<h1 id="Schema-Design-Hands-On" class="common-anchor-header">Проектирование схем на практике<button data-href="#Schema-Design-Hands-On" class="anchor-icon" translate="no">
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
    </button></h1><p>Информационно-поисковые системы (IR), также известные как поисковые системы, необходимы для различных приложений искусственного интеллекта, таких как генерация с расширенным поиском (RAG), поиск изображений и рекомендации товаров. Первым шагом в разработке IR-системы является проектирование модели данных, которое включает в себя анализ бизнес-требований, определение способа организации информации и индексацию данных для обеспечения семантического поиска.</p>
<p>Milvus поддерживает определение модели данных через схему коллекции. Коллекция организует неструктурированные данные, такие как текст и изображения, вместе с их векторными представлениями, включая плотные и разреженные векторы различной точности, используемые для семантического поиска. Кроме того, Milvus поддерживает хранение и фильтрацию невекторных типов данных, называемых "скалярными". К скалярным типам относятся BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON и Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="schema-hands-on" class="doc-image" id="schema-hands-on" />
   </span> <span class="img-wrapper"> <span>схема-практикум</span> </span></p>
<p>Проектирование модели данных поисковой системы включает в себя анализ потребностей бизнеса и абстрагирование информации в виде модели данных, выраженной в виде схемы. Например, для поиска фрагмента текста он должен быть "проиндексирован" путем преобразования буквенной строки в вектор с помощью "встраивания", что позволяет осуществлять векторный поиск. Помимо этого основного требования, может потребоваться хранение других свойств, таких как время публикации и автор. Эти метаданные позволяют уточнить семантический поиск с помощью фильтрации, возвращая только тексты, опубликованные после определенной даты или определенным автором. Кроме того, их может потребоваться получить вместе с основным текстом для отображения результатов поиска в приложении. Чтобы упорядочить эти фрагменты текста, каждому из них должен быть присвоен уникальный идентификатор, выраженный в виде целого числа или строки. Эти элементы необходимы для реализации сложной логики поиска.</p>
<p>Хорошо продуманная схема очень важна, поскольку она абстрагирует модель данных и решает, можно ли достичь бизнес-целей с помощью поиска. Кроме того, поскольку каждая строка данных, вставляемая в коллекцию, должна соответствовать схеме, это значительно помогает поддерживать согласованность данных и их долгосрочное качество. С технической точки зрения, четко определенная схема приводит к хорошо организованному хранению данных в столбцах и более чистой структуре индексов, что повышает производительность поиска.</p>
<h2 id="An-Example-News-Search" class="common-anchor-header">Пример: Поиск новостей<button data-href="#An-Example-News-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Допустим, мы хотим создать поиск для новостного сайта, и у нас есть корпус новостей с текстом, уменьшенными изображениями и другими метаданными. Сначала нам нужно проанализировать, как мы хотим использовать эти данные для поддержки бизнес-требований поиска. Представьте, что нам необходимо получать новости на основе уменьшенного изображения и краткого содержания, а также использовать метаданные, такие как информация об авторе и время публикации, в качестве критериев для фильтрации результатов поиска. Эти требования можно разделить на следующие:</p>
<ul>
<li><p>Для поиска изображений по тексту мы можем встраивать изображения в векторы с помощью мультимодальной модели встраивания, которая может отображать текстовые и графические данные в одно и то же латентное пространство.</p></li>
<li><p>Краткий текст статьи встраивается в векторы с помощью модели встраивания текста.</p></li>
<li><p>Для фильтрации по времени публикации даты хранятся в виде скалярного поля, а для эффективной фильтрации необходим индекс для скалярного поля. Другие более сложные структуры данных, такие как JSON, можно хранить в скалярном поле и выполнять поиск по их содержимому (индексирование JSON - это будущая функция).</p></li>
<li><p>Чтобы получить байт миниатюры изображения и отобразить его на странице результатов поиска, также хранится url изображения. Аналогично, для текста и заголовка резюме. (В качестве альтернативы мы можем хранить необработанный текст и данные файла изображения как скалярные поля, если это необходимо).</p></li>
<li><p>Чтобы улучшить результат поиска по краткому тексту, мы разработали гибридный подход к поиску. Для одного из путей поиска мы используем регулярную модель встраивания для генерации плотного вектора из текста, такую как OpenAI's <code translate="no">text-embedding-3-large</code> или open-source <code translate="no">bge-large-en-v1.5</code>. Эти модели хорошо отражают общую семантику текста. Другой путь - использовать модели разреженного встраивания, такие как BM25 или SPLADE, для генерации разреженного вектора, напоминающего полнотекстовый поиск, который хорошо улавливает детали и отдельные понятия в тексте. Milvus поддерживает использование обоих методов в одной коллекции данных благодаря своей многовекторной функции. Поиск по нескольким векторам может быть выполнен за одну операцию <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Наконец, нам также необходимо поле ID для идентификации каждой отдельной новостной страницы, формально называемой "сущностью" в терминологии Milvus. Это поле используется в качестве первичного ключа (или сокращенно "pk").</p></li>
</ul>
<table>
   <tr>
     <th><p>Имя поля</p></th>
     <th><p>article_id (первичный ключ)</p></th>
     <th><p>заголовок</p></th>
     <th><p>автор_инфо</p></th>
     <th><p>публикация_тс</p></th>
     <th><p>адрес_изображения</p></th>
     <th><p>вектор_изображения</p></th>
     <th><p>резюме</p></th>
     <th><p>суммарный_плотный_вектор</p></th>
     <th><p>сводный_разреженный_вектор</p></th>
   </tr>
   <tr>
     <td><p>Тип</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>ПЛОСКИЙ_ВЕКТОР</p></td>
     <td><p>РАЗРЕЖЕННЫЙ_ПЛОСКИЙ_ВЕКТОР</p></td>
   </tr>
   <tr>
     <td><p>Нужный индекс</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (поддержка скоро появится)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>
<h2 id="How-to-Implement-the-Example-Schema" class="common-anchor-header">Как реализовать пример схемы<button data-href="#How-to-Implement-the-Example-Schema" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-Schema" class="common-anchor-header">Создание схемы</h3><p>Сначала мы создадим экземпляр клиента Milvus, который можно использовать для подключения к серверу Milvus и управления коллекциями и данными.</p>
<p>Чтобы настроить схему, мы используем <code translate="no">create_schema()</code> для создания объекта схемы и <code translate="no">add_field()</code> для добавления полей в схему.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .description(<span class="hljs-string">&quot;article id&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .description(<span class="hljs-string">&quot;article title&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author_info&quot;</span>)
        .dataType(DataType.JSON)
        .description(<span class="hljs-string">&quot;author information&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .dataType(DataType.Int32)
        .description(<span class="hljs-string">&quot;publish timestamp&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_url&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">500</span>)
        .description(<span class="hljs-string">&quot;image URL&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;image vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .description(<span class="hljs-string">&quot;article summary&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;summary dense vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .description(<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT64&quot;</span>, <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article id&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article title&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author_info&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;JSON&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;author information&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT32&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;publish timestamp&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image URL&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article summary&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary dense vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SPARSE_FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary sparse vector&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;article_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> titleField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;title&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 200
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> authorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;author_info&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> publishField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;dataType&quot;: &quot;Int32&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> imgField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_url&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 500
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> imgVecField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 1000
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryDenseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summarySparseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$titleField</span>,
        <span class="hljs-variable">$authorField</span>,
        <span class="hljs-variable">$publishField</span>,
        <span class="hljs-variable">$imgField</span>,
        <span class="hljs-variable">$imgVecField</span>,
        <span class="hljs-variable">$summaryField</span>,
        <span class="hljs-variable">$summaryDenseField</span>,
        <span class="hljs-variable">$summarySparseField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете заметить аргумент <code translate="no">uri</code> в <code translate="no">MilvusClient</code>, который используется для подключения к серверу Milvus. Вы можете задать аргументы следующим образом:</p>
<ul>
<li><p>Если вам нужна локальная векторная база данных только для небольших масштабов данных или создания прототипов, установка uri в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="/docs/ru/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</p></li>
<li><p>Если у вас большой объем данных, скажем, более миллиона векторов, вы можете настроить более производительный сервер Milvus на <a href="/docs/ru/quickstart.md">Docker или Kubernetes</a>. В этом случае используйте адрес и порт сервера в качестве uri, например,<code translate="no">http://localhost:19530</code>. Если вы включили функцию аутентификации на Milvus, используйте "<your_username>:<your_password>" в качестве токена, в противном случае не задавайте токен.</p></li>
<li><p>Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют публичной конечной точке и ключу API в Zilliz Cloud.</p></li>
</ul>
<p>Что касается <code translate="no">auto_id</code> в <code translate="no">MilvusClient.create_schema</code>, AutoID - это атрибут первичного поля, который определяет, нужно ли включать автоматическое приращение для первичного поля.  Поскольку мы установили поле<code translate="no">article_id</code> в качестве первичного ключа и хотим добавлять id статьи вручную, мы установили <code translate="no">auto_id</code> False, чтобы отключить эту функцию.</p>
<p>После добавления всех полей в объект схемы наш объект схемы соответствует записям в таблице выше.</p>
<h3 id="Define-Index" class="common-anchor-header">Определение индекса</h3><p>После определения схемы с различными полями, включая метаданные и векторные поля для изображений и сводных данных, на следующем этапе необходимо подготовить параметры индекса. Индексирование имеет решающее значение для оптимизации поиска и извлечения векторов, обеспечивая эффективную работу запросов. В следующем разделе мы определим параметры индекса для указанных векторных и скалярных полей в коллекции.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-built_in">new</span> ArrayList&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
indexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;
    }
  }
]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>После настройки и применения параметров индекса Milvus оптимизируется для обработки сложных запросов к векторным и скалярным данным. Такое индексирование повышает производительность и точность поиска по сходству в коллекции, позволяя эффективно извлекать статьи, основанные на векторах изображений и суммарных векторах. Используя индексы <code translate="no">AUTOINDEX</code> для плотных векторов, <code translate="no">SPARSE_INVERTED_INDEX</code> для разреженных векторов и <code translate="no">INVERTED_INDEX</code> для скаляров, Milvus может быстро определять и возвращать наиболее релевантные результаты, значительно улучшая общее впечатление пользователя и эффективность процесса поиска данных.</p>
<p>Существует множество типов индексов и метрик. Для получения дополнительной информации о них вы можете обратиться к разделам <a href="/docs/ru/overview.md#Index-types">Тип индекса Milvus</a> и <a href="/docs/ru/glossary.md#Metric-type">Тип метрики Milvus</a>.</p>
<h3 id="Create-Collection" class="common-anchor-header">Создание коллекции</h3><p>Определив схему и индексы, мы создаем "коллекцию" с этими параметрами. Коллекция для Milvus - это как таблица для реляционной БД.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Мы можем убедиться, что коллекция была успешно создана, описав ее.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(
    collection_name=collection_name
)
<span class="hljs-built_in">print</span>(collection_desc)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> collection_desc = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(collection_desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: $collection_name
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Other-Considerations" class="common-anchor-header">Другие соображения<button data-href="#Other-Considerations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Loading-Index" class="common-anchor-header">Загрузка индекса</h3><p>При создании коллекции в Milvus вы можете выбрать загрузку индекса сразу или отложить ее до массового ввода данных. Как правило, вам не нужно делать явный выбор, так как приведенные выше примеры показывают, что индекс автоматически создается для всех загруженных данных сразу после создания коллекции. Это обеспечивает немедленный поиск по поступившим данным. Однако если после создания коллекции выполняется большая массовая вставка и поиск данных не требуется до определенного момента, можно отложить построение индекса, опустив index_params в создании коллекции, и построить индекс, вызвав load явно после того, как будут получены все данные. Этот метод более эффективен для построения индекса на большой коллекции, но поиск не может быть выполнен до вызова load().</p>
<h3 id="How-to-Define-Data-Model-For-Multi-tenancy" class="common-anchor-header">Как определить модель данных для нескольких арендаторов</h3><p>Концепция нескольких арендаторов обычно используется в сценариях, когда одно программное приложение или сервис должны обслуживать несколько независимых пользователей или организаций, каждая из которых имеет свою собственную изолированную среду. Это часто встречается в облачных вычислениях, приложениях SaaS (Software as a Service) и системах баз данных. Например, в облачном сервисе хранения данных может использоваться многопользовательский подход, позволяющий разным компаниям хранить и управлять своими данными отдельно, используя при этом одну и ту же базовую инфраструктуру. Такой подход позволяет максимально эффективно использовать ресурсы, обеспечивая при этом безопасность и конфиденциальность данных для каждого арендатора.</p>
<p>Самый простой способ разграничить арендаторов - изолировать их данные и ресурсы друг от друга. Каждый арендатор либо имеет эксклюзивный доступ к определенным ресурсам, либо использует ресурсы совместно с другими для управления такими сущностями Milvus, как базы данных, коллекции и разделы. Для реализации многопользовательского доступа существуют специальные методы, согласованные с этими сущностями. Для получения дополнительной информации вы можете обратиться к <a href="/docs/ru/multi_tenancy.md#Multi-tenancy-strategies">странице Milvus multi-tenancy</a>.</p>
