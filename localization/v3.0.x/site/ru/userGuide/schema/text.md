---
id: text.md
title: Текстовое полеCompatible with Milvus 3.0.x
summary: >-
  TEXT — это тип скалярного поля, предназначенный для хранения текста
  документов, отрывков и другого длинного текстового контента в Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Текстовое поле<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>В приложениях искусственного интеллекта для поиска векторный поиск помогает находить семантически схожие сущности, но приложению часто также требуется исходный текст, лежащий в основе каждого совпадения. LLM или агент может использовать этот текст в качестве контекста для чтения, цитирования, составления резюме или включения результата в запрос.</p>
<p>Milvus предоставляет скалярный тип поля « <code translate="no">TEXT</code> » для хранения длинного исходного текста непосредственно вместе с сущностями. Типичные значения включают отрывки, длинные документы, тексты статей, заявки и журналы. В отличие от поля « <code translate="no">VARCHAR</code> », которое требует фиксированного значения « <code translate="no">max_length</code> », поле « <code translate="no">TEXT</code> » не требует установки максимальной длины в байтах в схеме коллекции.</p>
<p>Чтобы определить поле типа « <code translate="no">TEXT</code> », установите для параметра « <code translate="no">datatype</code> » значение « <code translate="no">DataType.TEXT</code> ».</p>
<div class="alert note">
<p>Для работы этой функции требуется Storage V3. Инструкции по включению и сведения о совместимости см. в разделе <a href="/docs/ru/storage-v3.md">«Storage V3</a>».</p>
</div>
<p><a href="/docs/ru/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a> По умолчанию установлено значение « <code translate="no">false</code> », что означает, что Storage V3 по умолчанию отключен. Перед созданием коллекции, содержащей поле « <code translate="no">TEXT</code> », установите для этого параметра значение « <code translate="no">true</code> »; в противном случае Milvus отклонит схему коллекции.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>После определения поля каждая сущность может содержать строковое значение в этом поле. Значения <code translate="no">TEXT</code> вставляются так же, как и в другие скалярные поля, и возвращаются в результатах запросов или поиска путем указания поля в <code translate="no">output_fields</code>.</p>
<div class="alert note">
<p><code translate="no">TEXT</code> Поля поддерживают нулевые значения. Чтобы включить эту функцию, установите для параметра « <code translate="no">nullable</code> » значение « <code translate="no">True</code> ». Подробности см. в разделе <a href="/docs/ru/nullable-and-default.md">«Поля, допускающие нулевые значения</a>».</p>
</div>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Поле <code translate="no">TEXT</code> не может быть первичным полем, ключом разбиения или кластеризующим ключом.</li>
<li><code translate="no">TEXT</code> не может использоваться в качестве типа элемента поля с параметром « <code translate="no">ARRAY</code> », включая скалярное подполе в <code translate="no">StructArray</code>.</li>
<li>В Milvus 3.0.0 поля типа « <code translate="no">TEXT</code> » не поддерживают значения по умолчанию.</li>
<li>В Milvus 3.0.0 поля типа « <code translate="no">TEXT</code> » не поддерживаются во внешних коллекциях.</li>
<li>Пользователи не могут создавать скалярный индекс для поля типа « <code translate="no">TEXT</code> ». При использовании типа « <code translate="no">enable_match=True</code> » Milvus создает управляемый системой текстовый индекс для сопоставления текста. Этот внутренний индекс не является скалярным индексом, созданным пользователем.</li>
<li>Общие операторы скалярного фильтрации нельзя применять напрямую к полю <code translate="no">TEXT</code>. К ним относятся операторы сравнения, такие как <code translate="no">==</code> и <code translate="no">!=</code>, операторы диапазона, такие как <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;</code> и <code translate="no">&lt;=</code>, а также <code translate="no">IN</code>, <code translate="no">LIKE</code>, операторы регулярных выражений (<code translate="no">=~</code> и <code translate="no">!~</code>) и <code translate="no">IS NULL</code> или <code translate="no">IS NOT NULL</code>. Для фильтрации по проанализированным терминам определите поле с помощью <code translate="no">enable_analyzer=True</code> и <code translate="no">enable_match=True</code>, а затем используйте <a href="/docs/ru/keyword-match.md"><code translate="no">TEXT_MATCH</code> или <code translate="no">TEXT_MATCH_FUZZY</code></a>. Для полнотекстового поиска с ранжированием по релевантности используйте BM25.</li>
<li>В Milvus 3.0.0 функция BM25 или MinHash, использующая поле <code translate="no">TEXT</code> в качестве входных данных, должна быть определена при создании коллекции. Её нельзя добавить позже с помощью <code translate="no">add_function_field</code> или <code translate="no">AlterCollectionSchema</code>, даже если существующая коллекция пуста, поскольку Milvus не может заполнить выходные данные функции на основе сохраненных значений <code translate="no">TEXT</code>. Чтобы добавить такую функцию в существующую коллекцию, используйте поле ввода « <code translate="no">VARCHAR</code> » или заново создайте коллекцию, включив данную функцию в её схему. Подробности о добавлении функции и генерируемого ею векторного поля см. в разделе <a href="/docs/ru/add-fields-to-an-existing-collection.md#add-a-function-and-its-generated-vector-field--milvus-30x">«Изменение схемы коллекции</a>».</li>
<li>Функции вложения текста также должны быть определены при создании коллекции. Milvus 3.0.0 не поддерживает их добавление во время выполнения.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Выберите TEXT или VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> и « <code translate="no">VARCHAR</code> » — оба хранят строковые значения, но предназначены для разных задач. Используйте « <code translate="no">VARCHAR</code> » для коротких, ограниченных метаданных, которые идентифицируют, классифицируют или фильтруют сущности. Используйте « <code translate="no">TEXT</code> » для более длинного исходного контента, который предоставляет LLM или агенту достаточно контекста для чтения, цитирования, резюмирования или построения подсказки.</p>
<table>
<thead>
<tr><th>Аспект</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Лучше всего подходит для</td><td>Короткие метаданные, используемые для идентификации, классификации или фильтрации объектов, например <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> или <code translate="no">external_id</code>.</td><td>Более длинный исходный контент, используемый LLM или рабочими процессами агентов, например <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> или <code translate="no">log_message</code>.</td></tr>
<tr><td>Параметр «Length»</td><td>Требуется параметр <code translate="no">max_length</code>, который определяет максимальное количество байтов, которое может хранить поле. Максимальное значение составляет <code translate="no">65,535</code> байт. Если значение может превысить этот предел, используйте параметр <code translate="no">TEXT</code>.</td><td>Не требует значения <code translate="no">max_length</code>, поэтому в схеме не требуется фиксированное ограничение на количество байтов для текстового значения.</td></tr>
<tr><td>Поведение хранения</td><td>Каждое значение хранится в пределах настроенного для поля параметра « <code translate="no">max_length</code> ».</td><td>Использует автоматический выбор хранилища для больших текстовых значений. Подробности см. в разделе <a href="#how-milvus-stores-large-text-values">«Как Milvus хранит большие значения TEXT</a>».</td></tr>
<tr><td>Поддержка в качестве основного поля</td><td>Может использоваться в качестве первичного поля.</td><td>Не может использоваться в качестве первичного поля.</td></tr>
<tr><td>Фильтрация</td><td>Используйте для коротких строковых метаданных, которые должны появляться в выражениях фильтрации, таких как <code translate="no">category == &quot;news&quot;</code> или <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>Не поддерживает общие скалярные операторы фильтрации. Для фильтрации по проанализированным терминам используйте текстовые операторы с поддержкой сопоставления, а для полнотекстового поиска с ранжированием по релевантности — алгоритм BM25.</td></tr>
</tbody>
</table>
<p>Подробнее о полях типа « <code translate="no">VARCHAR</code> » см. в разделе <a href="/docs/ru/string.md">«Поле VarChar</a>».</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Как Milvus хранит большие значения TEXT<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Разверните, чтобы узнать, как это работает</summary></p>
<p>При вставке сущности строка, указанная вами для поля « <code translate="no">TEXT</code> », является значением <code translate="no">TEXT</code>. Milvus сравнивает размер этого значения с <a href="/docs/ru/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>, который по умолчанию равен <code translate="no">65,536</code> байтам, а затем выбирает один из двух внутренних путей хранения.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Хранение больших текстовых</span> </span>данных <span class="img-wrapper">
  
 </span></p>
<ul>
<li><strong>Встроенное хранение</strong>: если значение <code translate="no">TEXT</code> меньше, чем <code translate="no">dataNode.text.inlineThreshold</code>, Milvus сохраняет исходное текстовое значение непосредственно в данных поля <code translate="no">TEXT</code>.</li>
<li><strong>Хранение LOB</strong>: если значение поля ` <code translate="no">TEXT</code> ` больше или равно ` <code translate="no">dataNode.text.inlineThreshold</code>`, Milvus рассматривает это значение как большой объект и хранит исходный текст отдельно в хранилище объектов, например MinIO. В данных поля ` <code translate="no">TEXT</code> ` сохраняется внутренняя ссылка на отдельно хранящийся текст. Когда поле ` <code translate="no">TEXT</code> ` запрашивается в результатах запроса или поиска, Milvus использует эту ссылку для извлечения и возврата исходного текста.</li>
</ul>
<p>Выбор хранилища является внутренним. Вы вставляете данные, запрашиваете и ищете поле ` <code translate="no">TEXT</code> ` одинаковым образом, независимо от того, какой путь к хранилищу использует Milvus. Для настройки порогового значения или связанного с ним поведения хранения, уплотнения и сборки мусора обратитесь к <a href="/docs/ru/configure_datanode.md">разделам «Настройки, связанные с dataNode</a> » и <a href="/docs/ru/configure_datacoord.md">«Настройки, связанные с dataCoord</a>».</p>
<p>Если в вашем развертывании используется объектное хранилище, большие значения <code translate="no">TEXT</code> могут отображаться в виде объектов, управляемых Milvus, по таким путям, как <code translate="no">lobs/...</code>. Эти объекты относятся к деталям реализации и не должны перемещаться, копироваться или удаляться вручную. После удаления сущностей, удаления раздела или уплотнения данных использование объектного хранилища может уменьшиться только после того, как сборщик мусора Milvus удалит данные крупных объектов, на которые больше нет ссылок, по истечении периода безопасности.</p>
<p></details></p>
<p>Одним из распространённых способов использования <code translate="no">TEXT</code> является полнотекстовый поиск с использованием BM25. В этой схеме поле <code translate="no">TEXT</code> хранит исходное содержимое, а BM25 анализирует текст и генерирует разреженные векторы для ранжирования совпадений по ключевым словам. Результаты поиска могут затем возвращать совпавшее значение <code translate="no">TEXT</code> в качестве контекста для рабочих процессов LLM или агентов. В следующем примере показано, как использовать поле « <code translate="no">TEXT</code> » в качестве поля ввода для BM25. Чтобы узнать о концепциях полнотекстового поиска и параметрах запросов, см. раздел <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>».</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Шаг 1. Создание коллекции с полем TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере создаётся коллекция с полем « <code translate="no">TEXT</code> » для исходного контента и полем «sparse vector» для разреженных векторов, сгенерированных BM25. Функция BM25 преобразует токенизированный текст из поля « <code translate="no">content</code> » в разреженные векторы, хранящиеся в поле « <code translate="no">sparse</code> ».</p>
<p>Для полнотекстового поиска BM25 входное поле <code translate="no">TEXT</code> должно иметь значение <code translate="no">enable_analyzer=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Шаг 2: Создание индекса разреженных векторов<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте индекс для поля разреженных векторов, сгенерированного функцией BM25. Тип метрики должен быть установлен в значение <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Шаг 3: Вставка данных типа TEXT<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Вставьте текст непосредственно в поле « <code translate="no">TEXT</code> ». Не указывайте значения для поля « <code translate="no">sparse</code> ». Milvus генерирует разреженные векторы внутренне, применяя функцию BM25 к « <code translate="no">content</code> ».</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Шаг 4: Выполнение полнотекстового поиска по BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте исходный текст запроса в качестве данных для поиска и выполните поиск по полю разреженных векторов. Milvus преобразует текст запроса в разреженный вектор, ранжирует совпадения с помощью BM25 и возвращает запрошенное поле « <code translate="no">TEXT</code> » в поле « <code translate="no">output_fields</code> ».</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Шаг 5: Чтение возвращённых значений TEXT<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Каждый результат поиска содержит оценку по алгоритму BM25 и исходное значение из поля « <code translate="no">TEXT</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительную информацию о функциях BM25, индексах разреженных векторов и синтаксисе запросов для полнотекстового поиска см. в разделе <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>».</p>
