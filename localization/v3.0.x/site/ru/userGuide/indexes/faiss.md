---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: >-
  Используйте функцию «FAISS index passthrough» для передачи строк фабрики
  индексов FAISS и параметров поиска, специфичных для данной фабрики, в Milvus
  3.0.
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p>Тип индекса « <code translate="no">FAISS</code> » — это пропускной механизм экспертного уровня, доступный в Milvus версии 3.0.0 и более поздних. Он позволяет предоставить <a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">строку фабрики индексов Faiss</a> вместо выбора фиксированного типа индекса Milvus.</p>
<p>Используйте <code translate="no">FAISS</code>, если у вас уже есть проверенный рецепт Faiss и вам требуется прямой контроль над его составом. Для типичных рецептов, имеющих специальный тип индекса Milvus, предпочтительнее использовать этот специальный тип, поскольку он обладает стабильным и задокументированным набором параметров.</p>
<div class="alert note">
<p>Строка фабрики, поддерживаемая исходным проектом Faiss, не всегда автоматически поддерживается Milvus. Совместимость зависит от типа векторного поля, метрики, размерности, модулей Faiss, скомпилированных в образ Milvus, а также от того, поддерживает ли результирующий индекс операции, требуемые Milvus.</p>
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
<li><p><code translate="no">FAISS</code> Поддерживаются поля типа « <code translate="no">FLOAT_VECTOR</code> » и « <code translate="no">BINARY_VECTOR</code> ». Не поддерживаются поля типа « <code translate="no">FLOAT16_VECTOR</code> », « <code translate="no">BFLOAT16_VECTOR</code> », « <code translate="no">INT8_VECTOR</code> » и « <code translate="no">SPARSE_FLOAT_VECTOR</code> ».</p></li>
<li><p>Универсальный адаптер <code translate="no">FAISS</code> работает на ЦП. Это не тип индекса Faiss для графического процессора.</p></li>
<li><p>Параметр сборки <code translate="no">faiss_index_name</code> является обязательным. Milvus передает его значение в Faiss без преобразования рецепта в специальный тип индекса Milvus.</p></li>
<li><p>Параметры сборки и поиска зависят от конкретного фабричного модуля. Параметр, поддерживаемый одним фабричным модулем, может быть отклонен другим.</p></li>
<li><p>Для скалярной фильтрации необходимо, чтобы базовый индекс Faiss поддерживал селектор ID. Тесты Milvus 3.0.0 охватывают фильтрованный поиск с использованием фабрик с плавающей запятой: <code translate="no">Flat</code>, <code translate="no">IVF64,Flat</code> и <code translate="no">HNSW16,Flat</code>. Не следует предполагать, что каждая фабрика поддерживает фильтры или что двоичные индексы <code translate="no">FAISS</code> поддерживают скалярную фильтрацию.</p></li>
<li><p>Итераторы поиска не поддерживаются.</p></li>
<li><p>Адаптер не обеспечивает извлечение необработанных векторов.</p></li>
<li><p>Поддержка поиска по диапазону зависит от фабрики. Float <code translate="no">Flat</code> имеет покрытие релизом. Не используйте поиск по диапазону с бинарными индексами <code translate="no">FAISS</code>.</p></li>
<li><p>Фабрика может успешно скомпилироваться, но при этом отклонять некоторые операции поиска Milvus. Например, автономная фабрика <code translate="no">PQ8x4</code> отклоняет селектор, используемый при поиске со скалярной фильтрацией. Проверяйте использование без фильтрации отдельно.</p></li>
<li><p>В Milvus 3.0.0 проверяйте оценки <code translate="no">COSINE</code> и пороговые значения для поиска по диапазону после перезагрузки индекса. Knowhere v3.0.6 не восстанавливает состояние косинусной нормализации адаптера <code translate="no">FAISS</code> во время десериализации.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Как это работает<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>Рабочий процесс пропуска индекса FAISS</span>
  
 </span></p>
<p>При построении индекса Milvus передает <code translate="no">faiss_index_name</code>, тип векторного поля, метрику и другие параметры построения адаптеру Knowhere FAISS. Адаптер вызывает <code translate="no">faiss::index_factory()</code> для полей типа <code translate="no">FLOAT_VECTOR</code> или <code translate="no">faiss::index_binary_factory()</code> для полей типа <code translate="no">BINARY_VECTOR</code>. Результирующий объект представляет собой нативный индекс Faiss, управляемый в рамках обычного жизненного цикла индекса Milvus.</p>
<p>При поиске адаптер преобразует предоставленные параметры, специфичные для конкретного фабричного объекта, в соответствующий объект Faiss <code translate="no">SearchParameters</code>. Для поддерживаемых фабрик с плавающей запятой он также передаёт набор битов фильтра Milvus в качестве селектора Faiss. Поддержка селекторов зависит от конкретного фабричного модуля, и выпущенные тесты не обеспечивают скалярную фильтрацию для двоичных индексов <code translate="no">FAISS</code>. Именно поэтому рецепт может быть действителен в автономном Faiss, но отклонять операцию, требуемую поисковым путем Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 или более поздней версии</li>
<li>PyMilvus 3.0.0 или более поздней версии</li>
<li>Знание синтаксиса фабрик индексов Faiss и требований к обучению выбранной фабрики</li>
</ul>
<p>Инструкции по установке см. в разделе <a href="/docs/ru/install-pymilvus.md">«Установка PyMilvus</a>».</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Выберите строку фабрики<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Строка фабрики описывает индекс Faiss как последовательность компонентов. Приведенные ниже примеры проверены в тестовой версии Milvus 3.0.0. Этот список не является исчерпывающим.</p>
<table>
<thead>
<tr><th>Строка фабрики</th><th>Тип поля</th><th>Показатели, проверенные в тестах релизной версии</th><th>Параметры поиска</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Нет</td><td>Точный поиск.</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>ЭКО с 64 инвертированными списками и несжатыми векторами.</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>Граф HNSW с плоским хранением векторов.</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Специфично для фабрики</td><td>Объединяет OPQ, IVF и PQ. Проверьте размер обучающей выборки и коэффициент восстановления на ваших данных.</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>, <code translate="no">k_factor</code></td><td>Использует плоский рефайнер после извлечения кандидатов PQ.</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Нет</td><td>Встроены тесты на выпуск. Поиск со скалярной фильтрацией завершается сбоем, поскольку индекс отклоняет селектор; проверьте использование без фильтрации отдельно.</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>Нет</td><td>Точный поиск по бинарным векторам.</td></tr>
</tbody>
</table>
<p>Записи « <code translate="no">COSINE</code> » указывают на покрытие тестами сборки и поиска. В Milvus 3.0.0 они не подтверждают правильность оценки или поиска по диапазону после перезагрузки индекса. См. раздел <a href="#limits">«Ограничения</a>».</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">Сборка и поиск по индексу с плавающей запятой<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере создаются 3 000 векторов размером 128. Этого достаточно для обучения рецепта « <code translate="no">IVF64,Flat</code> », используемого в примере. Разверните блок настройки и запустите его перед сборкой и поиском по индексу.</p>
<p><details></p>
<p><summary>Подготовка коллекции векторов с плавающей запятой</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Создание индекса<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Установите для параметра « <code translate="no">index_type</code> » значение « <code translate="no">FAISS</code> » и используйте « <code translate="no">faiss_index_name</code> » для выбора нативного рецепта-фабрики Faiss.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Строка фабрики <code translate="no">IVF64,Flat</code> создает индекс IVF с 64 инвертированными списками и сохраняет несжатые векторы в каждом списке.</p>
<h3 id="Search-the-index" class="common-anchor-header">Поиск по индексу<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Укажите параметры поиска, специфичные для фабрики, внутри <code translate="no">search_params.params</code>. Для фабрики IVF параметр <code translate="no">nprobe</code> определяет, сколько инвертированных списков просматривает Faiss.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Запрос использует <code translate="no">nprobe=8</code>, поэтому Faiss просматривает 8 из 64 инвертированных списков. Фильтр ограничивает результаты сущностями, у которых значение <code translate="no">category</code> равно <code translate="no">reference</code>.</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">Создание и поиск по двоичному индексу<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Для полей типа « <code translate="no">BINARY_VECTOR</code> » используйте строку фабрики двоичных данных, например <code translate="no">BFlat</code>, и совместимую двоичную метрику. Разверните блок настройки и запустите его перед созданием и поиском по индексу.</p>
<p><details></p>
<p><summary>Подготовка коллекции бинарных векторов</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Создание индекса<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>В качестве фабричной строки используйте <code translate="no">BFlat</code>, а в качестве метрики — <code translate="no">HAMMING</code> для этого примера с бинарными векторами.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">Выполните поиск по индексу<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> не имеет параметров поиска, специфичных для семейства. При построении запроса на поиск передайте пустое сопоставление <code translate="no">params</code>.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Каждый 128-мерный двоичный вектор занимает 16 байт. Дополнительные сведения см. в разделе <a href="/docs/ru/binary-vector.md">«Двоичный вектор</a>».</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">Настройка параметров сборки и поиска<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Тип индекса « <code translate="no">FAISS</code> » имеет один обязательный проходной параметр сборки.</p>
<table>
<thead>
<tr><th>Параметр</th><th>Расположение</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in <code translate="no">add_index()</code></td><td>Строка фабрики индекса Faiss. Например, <code translate="no">IVF64,Flat</code>.</td></tr>
</tbody>
</table>
<p>Укажите параметры поиска, специфичные для фабрики, внутри <code translate="no">search_params.params</code>. В приведенной ниже таблице перечислены типичные примеры; этот список не является исчерпывающим.</p>
<table>
<thead>
<tr><th>Параметр</th><th>Пример фабрики</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>Количество инвертированных списков для поиска.</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>Размер списка кандидатов для поиска HNSW.</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>Количество кандидатов, передаваемых рефинеру, относительно запрошенного top-K.</td></tr>
</tbody>
</table>
<p>Milvus передает только дополнительные параметры, распознаваемые адаптером. Неизвестные ключи сборки и ключи поиска, которые не поддерживаются конкретным семейством фабрик, отклоняются. Milvus не поддерживает универсальную схему параметров для всех возможных фабрик. Ознакомьтесь с документацией Faiss для выбранного фабрика, а затем проверьте весь процесс сборки и поиска на соответствие той версии и тому образу Milvus, которые вы планируете развернуть.</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">Обработка ошибок и неподдерживаемых операций<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>Если строка фабрики неверна или недоступна в сборке Milvus, построение индекса завершается сбоем. Перед загрузкой коллекции проверьте состояние индекса и причину сбоя.</p></li>
<li><p>Если тип параметра указан неверно, поиск завершится сбоем. Например, запрос <code translate="no">nprobe=&quot;invalid&quot;</code> отклоняется, поскольку параметр <code translate="no">nprobe</code> должен быть числовым.</p></li>
<li><p>Если параметр не относится к используемому фабричному модулю, адаптер отклоняет его как неподдерживаемый.</p></li>
<li><p>Если фабрика не поддерживает селектор Milvus, фильтрованный поиск может завершиться сбоем, даже если та же фабрика может выполнять поиск в автономной версии Faiss.</p></li>
<li><p>Не используйте <code translate="no">search_iterator()</code> с индексом <code translate="no">FAISS</code>.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Узнайте, как организованы индексы Milvus, в разделе <a href="/docs/ru/index-explained.md">«Объяснение индекса</a>».</li>
<li>Сравните специальные типы индексов <a href="/docs/ru/ivf-flat.md">IVF_FLAT</a> и <a href="/docs/ru/hnsw.md">HNSW</a>.</li>
<li>Ознакомьтесь с <a href="/docs/ru/metric.md">разделом «Типы метрик»</a> (Metric <a href="/docs/ru/metric.md">Types</a> ), прежде чем выбирать метрику для фабрики.</li>
</ul>
