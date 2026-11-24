---
id: minhash-function.md
title: Функция MinHashCompatible with Milvus 3.0.x
summary: >-
  Используйте MinHash для преобразования текста в двоичные векторы с целью
  поиска схожести по критерию Жаккара и выявления почти-дубликатов.
beta: Milvus 3.0.x
---
<h1 id="MinHash-Function" class="common-anchor-header">Функция MinHash<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#MinHash-Function" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Функция MinHash</strong> преобразует исходный текст в <strong>двоичные векторы</strong>, которые аппроксимируют <a href="https://en.wikipedia.org/wiki/Jaccard_index">сходство по Джакарду</a> между документами. Она применяет метод «шинглирования» текста и несколько хеш-функций для получения сигнатурных векторов фиксированной длины, что позволяет быстро выявлять почти-дубликаты и удалять дубликаты документов в больших объемах.</p>
<p>Являясь встроенной функцией, MinHash работает непосредственно в Milvus и не требует внешнего вывода модели или предварительной обработки. Вы вводите исходный текст, и Milvus автоматически генерирует сигнатурные векторы MinHash.</p>
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
<li><p>Поле вывода должно быть массивом « <code translate="no">BINARY_VECTOR</code> » с размером, удовлетворяющим условию <code translate="no">dim % 32 == 0</code>, поскольку каждая сигнатурная векторная подпись MinHash представляет собой 32-битное хеш-значение.</p></li>
<li><p><code translate="no">dim</code> бинарного векторного поля должен равняться <code translate="no">32 * num_hashes</code>. Несоответствие приводит к ошибке.</p></li>
<li><p>При использовании индекса <code translate="no">MINHASH_LSH</code> с выходом функции MinHash параметр <code translate="no">mh_element_bit_width</code> должен быть установлен в значение <code translate="no">32</code>.</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">Как работает MinHash<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
<p><summary>Развернуть, чтобы увидеть, как это работает</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> — это метод хеширования с учетом локальности, который оценивает <a href="https://en.wikipedia.org/wiki/Jaccard_index">сходство по индексу Жаккара</a> между множествами. В Milvus функция MinHash работает по следующему алгоритму: вы предоставляете исходный текст в качестве входных данных, а Milvus генерирует бинарный вектор в качестве выходных данных, выполняя все промежуточные шаги внутренне.</p>
<p>Общий рабочий процесс состоит из <strong>общего конвейера обработки текста</strong>, используемого как для приема документов, так и для обработки запросов, за которым следуют операции, специфичные для конкретных этапов хранения и извлечения данных.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" /> 
   <span>Iaqkbfeh8oqggsx6nsocfosondo</span>
  
 </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">Общий конвейер обработки текста<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Как при приёме документов, так и при обработке запросов исходный текст проходит через одну и ту же четырёхэтапную трансформацию:</p>
<ol>
<li><p><strong>Анализ текста</strong>: текст обрабатывается <a href="/docs/ru/analyzer-overview.md">анализатором</a> (если <code translate="no">token_level</code> — <code translate="no">&quot;word&quot;</code>) или используется напрямую (если <code translate="no">token_level</code> — <code translate="no">&quot;char&quot;</code>). Токенизация на уровне слов применяет анализатор, настроенный для поля ввода, чтобы разбить текст на термины — например, <code translate="no">&quot;milvus is vector db&quot;</code> превращается в <code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code>.</p></li>
<li><p><strong>Разделение на «шинглы</strong>»: токены разбиваются на перекрывающиеся n-граммы (шинглы) размером <code translate="no">shingle_size</code>. Например, при использовании 3-грамм на уровне слов токены <code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> превращаются в такие шинглы, как <code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code>.</p></li>
<li><p><strong>Генерация сигнатуры MinHash</strong>: к набору шинглов применяются несколько хеш-функций (H1, H2, …, Hn, где n = <code translate="no">num_hashes</code>). Для каждой хеш-функции выбирается минимальное хеш-значение среди всех «шинглов». Совокупность этих минимальных значений формирует подпись MinHash — представление фиксированной длины, которое аппроксимирует сходство по Жаккарду исходного документа.</p></li>
<li><p><strong>Кодирование в виде бинарного вектора</strong>: каждое значение сигнатуры представляет собой 32-битный хеш, а полная сигнатура упаковывается в вектор размером <code translate="no">BINARY_VECTOR</code> с размером измерений <code translate="no">32 * num_hashes</code>.</p></li>
</ol>
<h3 id="Document-ingestion" class="common-anchor-header">Прием документов<button data-href="#Document-ingestion" class="anchor-icon" translate="no">
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
    </button></h3><p>При вставке бинарный вектор, сгенерированный общим конвейером, сохраняется в индексе « <code translate="no">MINHASH_LSH</code> ». Индекс поддерживает таблицу LSH (Locality-Sensitive Hashing), которая группирует схожие сигнатуры в одни и те же сегменты, что обеспечивает быстрый поиск кандидатов при выполнении запроса.</p>
<h3 id="Query-processing" class="common-anchor-header">Обработка запросов<button data-href="#Query-processing" class="anchor-icon" translate="no">
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
    </button></h3><p>Во время поиска текст запроса проходит через тот же общий конвейер для формирования бинарного вектора. Этот вектор используется для выполнения LSH-поиска в индексе <code translate="no">MINHASH_LSH</code>, который быстро выявляет пары кандидатов, которые, вероятно, схожи. Без уточнения по коэффициенту Жаккара Milvus возвращает кандидаты LSH, которые не ранжированы по оцененному сходству по Жаккару. Когда включено уточнение по коэффициенту Жаккара, Milvus использует сохраненные исходные сигнатуры MinHash для ранжирования кандидатов по оцененному коэффициенту сходства Жаккара и возвращает K лучших результатов.</p>
<p>Поскольку оба алгоритма используют одну и ту же логику преобразования, два документа с в значительной степени пересекающимся содержанием дают схожие сигнатуры MinHash. Это делает данную функцию эффективной для поиска почти-дубликатов даже в тех случаях, когда документы различаются порядком слов, форматированием или незначительными различиями в формулировках.</p>
<p></details></p>
<h2 id="Before-you-start" class="common-anchor-header">Перед началом работы<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед использованием функции MinHash спланируйте схему вашей коллекции так, чтобы она включала следующее:</p>
<ul>
<li><p><strong>Текстовое поле для исходного содержимого</strong></p>
<p>Ваша коллекция должна содержать поле « <code translate="no">VARCHAR</code> » для хранения исходного текста. Это поле служит входными данными для функции MinHash.</p></li>
<li><p><strong>Анализатор для текстового поля</strong> (при использовании токенизации на уровне слов)</p>
<p>Если для параметра « <code translate="no">token_level</code> » установлено значение « <code translate="no">&quot;word&quot;</code> » (по умолчанию), для текстового поля должен быть включен анализатор. Анализатор определяет, как текст токенизируется перед шинлингом. По умолчанию Milvus использует анализатор « <code translate="no">standard</code> ». Чтобы настроить другой анализатор, см. раздел <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md">«Выбор подходящего анализатора для вашего сценария использования</a>».</p></li>
<li><p><strong>Поле двоичного вектора для вывода MinHash</strong></p>
<p>Ваша коллекция должна содержать поле « <code translate="no">BINARY_VECTOR</code> » для хранения бинарных векторов, сгенерированных функцией MinHash. Размерность должна равняться значению « <code translate="no">32 * num_hashes</code> ».</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">Шаг 1. Создание коллекции с функцией MinHash<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать функцию MinHash, определите её при создании коллекции. Функция становится частью схемы коллекции и применяется автоматически при вставке и поиске данных.</p>
<h3 id="Define-schema-fields" class="common-anchor-header">Определение полей схемы<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Схема вашей коллекции должна содержать как минимум три поля:</p>
<ul>
<li><p><strong>Основной поле</strong>: однозначно идентифицирует каждую сущность в коллекции.</p></li>
<li><p><strong>Текстовое поле</strong> (<code translate="no">VARCHAR</code>): хранит исходные текстовые документы. Установите значение « <code translate="no">enable_analyzer=True</code> », чтобы Milvus мог обрабатывать текст для генерации сигнатуры MinHash. По умолчанию Milvus использует анализатор « <code translate="no">standard</code> » для анализа текста. Чтобы настроить другой анализатор, обратитесь к <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md">разделу «Выбор подходящего анализатора для вашего сценария использования</a>».</p></li>
<li><p><strong>Поле бинарных векторов</strong> (<code translate="no">BINARY_VECTOR</code>): хранит бинарные векторы, автоматически сгенерированные функцией MinHash. Размерность должна равняться значению <code translate="no">32 * num_hashes</code>.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;document_content&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">8192</span>)
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

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document_content&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">9000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">8192</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document_content&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">9000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">8192</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;dedup_collection&quot;</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document_content&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">9000</span>).WithEnableAnalyzer(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;binary_vector&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">8192</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: true,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true,
            &quot;autoID&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;document_content&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 9000,
                &quot;enable_analyzer&quot;: true
            }
        },
        {
            &quot;fieldName&quot;: &quot;binary_vector&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 8192
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-MinHash-function" class="common-anchor-header">Определение функции MinHash<button data-href="#Define-the-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h3><p>Функция MinHash преобразует проанализированный текст в бинарные векторы, которые аппроксимируют сходство по Джакарду между документами.</p>
<p>Определите функцию и добавьте её в свою схему:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">minhash_function = Function(
    name=<span class="hljs-string">&quot;minhash_function&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text</span>
    output_field_names=[<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment"># Name of the BINARY_VECTOR field for generated signatures</span>
    function_type=FunctionType.MINHASH,
    params={
        <span class="hljs-string">&quot;num_hashes&quot;</span>: <span class="hljs-number">256</span>, <span class="hljs-comment"># Number of hash functions; produces dim = 32 * 256 = 8192</span>
        <span class="hljs-string">&quot;shingle_size&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-comment"># N-gram size for shingling</span>
    }
)

schema.add_function(minhash_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-type">Function</span> <span class="hljs-variable">minhashFunction</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;minhash_function&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document_content&quot;</span>)) <span class="hljs-comment">// Name of the VARCHAR field containing raw text</span>
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;binary_vector&quot;</span>)) <span class="hljs-comment">// Name of the BINARY_VECTOR field for generated signatures</span>
        .functionType(FunctionType.MINHASH)
        .param(<span class="hljs-string">&quot;num_hashes&quot;</span>, <span class="hljs-string">&quot;256&quot;</span>) <span class="hljs-comment">// Number of hash functions; produces dim = 32 * 256 = 8192</span>
        .param(<span class="hljs-string">&quot;shingle_size&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>) <span class="hljs-comment">// N-gram size for shingling</span>
        .build();

schema.addFunction(minhashFunction);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_function&quot;</span>,
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment">// Name of the VARCHAR field containing raw text</span>
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment">// Name of the BINARY_VECTOR field for generated signatures</span>
        <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">MINHASH</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">num_hashes</span>: <span class="hljs-number">256</span>, <span class="hljs-comment">// Number of hash functions; produces dim = 32 * 256 = 8192</span>
            <span class="hljs-attr">shingle_size</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// N-gram size for shingling</span>
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

minhashFunction := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;minhash_function&quot;</span>).
    WithType(entity.FunctionTypeMinHash).
    WithInputFields(<span class="hljs-string">&quot;document_content&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithParam(<span class="hljs-string">&quot;num_hashes&quot;</span>, <span class="hljs-number">256</span>).
    WithParam(<span class="hljs-string">&quot;shingle_size&quot;</span>, <span class="hljs-number">3</span>)

schema.WithFunction(minhashFunction)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> minhashFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;minhash_function&quot;,
    &quot;type&quot;: &quot;MinHash&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document_content&quot;
    ],
    &quot;outputFieldNames&quot;: [
        &quot;binary_vector&quot;
    ],
    &quot;params&quot;: {
        &quot;num_hashes&quot;: 256,
        &quot;shingle_size&quot;: 3
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Параметры настройки</strong></p>
<p>Словарь <code translate="no">params</code> функции MinHash принимает следующие параметры. В именах всех параметров <strong>не</strong> учитывается <strong>регистр</strong>.</p>
<table>
   <tr>
     <th><p><strong>Параметр</strong></p></th>
     <th><p><strong>Тип</strong></p></th>
     <th><p><strong>По умолчанию</strong></p></th>
     <th><p><strong>Описание</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>Производный от <code translate="no">dim / 32</code></p></td>
     <td><p>Количество хеш-функций для генерации подписи. Размер выходного двоичного вектора равен <code translate="no">32 &ast; num_hashes</code>. Более высокие значения уменьшают дисперсию при оценке сходства, но увеличивают вычислительную нагрузку. Рекомендуется: <code translate="no">256</code> (dim = 8192).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>Размер N-граммы для шинглирования. На уровне слов: обычно 1–3. На уровне символов: обычно 2–6.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>Используемая хеш-функция. Варианты: </p><ul><li><p><code translate="no">"xxhash"</code> (быстрая)</p></li><li><p><code translate="no">"sha1"</code> (медленнее, более высокая устойчивость к коллизиям).</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>Уровень токенизации. Варианты:</p><ul><li><p><code translate="no">"word"</code>: использует анализатор поля для токенизации, а затем применяет n-граммное шинглирование.</p></li><li><p><code translate="no">"char"</code> / <code translate="no">"character"</code>: применяет n-граммное шинглирование непосредственно к исходным символам (без анализатора).</p><p>Уровень слова обеспечивает более сильную семантику и более высокую эффективность, но зависит от языкоспецифической токенизации. Уровень символа не зависит от языка, но генерирует шинглы более высокой размерности со слабой семантикой.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>Случайное начальное значение для инициализации функции MinHash.</p></td>
   </tr>
</table>
<h3 id="Configure-the-index" class="common-anchor-header">Настройка индекса<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Рекомендуемый тип индекса для двоичных векторов MinHash — « <code translate="no">MINHASH_LSH</code> » с типом метрики « <code translate="no">MHJACCARD</code> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: <span class="hljs-number">32</span>,
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">128</span>);
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">32</span>);
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">128</span>,
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">32</span>,
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>, <span class="hljs-string">&quot;binary_vector&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">128</span>).
        WithElementBitWidth(<span class="hljs-number">32</span>).
        WithRawData(<span class="hljs-literal">true</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;binary_vector&quot;,
        &quot;indexName&quot;: &quot;binary_vector&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_lsh_band&quot;: 128,
            &quot;mh_element_bit_width&quot;: 32,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Установите значение <code translate="no">with_raw_data</code> равным <code translate="no">True</code>, если при поиске будет использоваться уточнение по коэффициенту Жаккара. Исходные сигнатуры MinHash необходимы для расчёта оценочного коэффициента сходства по Жаккару для кандидатов, возвращаемых в результате поиска по LSH.</p>
<h3 id="Create-the-collection" class="common-anchor-header">Создание коллекции<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте коллекцию, используя параметры схемы и индекса, определенные выше:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;dedup_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

request=$(jq -n --argjson schema <span class="hljs-string">&quot;<span class="hljs-variable">$schema</span>&quot;</span> --argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$minhashFunction</span>&quot;</span> --argjson indexParams <span class="hljs-string">&quot;<span class="hljs-variable">$indexParams</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;dedup_collection&quot;,
    schema: ($schema + {functions: [$fn]}),
    indexParams: $indexParams
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;dedup_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-documents" class="common-anchor-header">Шаг 2: Вставка документов<button data-href="#Step-2-Insert-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>После настройки коллекции добавьте текстовые данные. Вам нужно предоставить только исходный текст — функция MinHash автоматически сгенерирует бинарный вектор для каждого документа.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.insert(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    [
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>},
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

List&lt;String&gt; documents = Arrays.asList(
        <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>
);

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (String document : documents) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;document_content&quot;</span>, document);
    rows.add(row);
}

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;dedup_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [
        { <span class="hljs-attr">document_content</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span> },
        { <span class="hljs-attr">document_content</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span> },
        { <span class="hljs-attr">document_content</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span> },
    ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
)

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>).
    WithColumns(column.NewColumnVarChar(<span class="hljs-string">&quot;document_content&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>,
    })))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;dedup_collection&quot;,
    &quot;data&quot;: [
        {&quot;document_content&quot;: &quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;},
        {&quot;document_content&quot;: &quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;},
        {&quot;document_content&quot;: &quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">Шаг 3: Поиск с помощью MinHash<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>После добавления данных выполните поиск документов, близких по содержанию, с помощью запросов в виде исходного текста. Milvus автоматически преобразует каждый запрос в двоичный вектор MinHash. Включите уточнение по коэффициенту Жаккара, чтобы ранжировать кандидаты LSH по расчетному коэффициенту сходства Жаккара.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">3</span>,
    },
}

results = client.search(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document_content&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document_content&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>);
searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">3</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;dedup_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document_content&quot;</span>))
        .searchParams(searchParams)
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : results.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(<span class="hljs-string">&quot;ID: &quot;</span> + hit.getId() + <span class="hljs-string">&quot;, Distance: &quot;</span> + hit.getScore());
        System.out.println(<span class="hljs-string">&quot;Document: &quot;</span> + hit.getEntity().get(<span class="hljs-string">&quot;document_content&quot;</span>));
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document_content&quot;</span>],
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">3</span>,
    },
});

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> results.<span class="hljs-property">results</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`ID: <span class="hljs-subst">${hit.id}</span>, Distance: <span class="hljs-subst">${hit.score}</span>`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Document: <span class="hljs-subst">${hit.document_content}</span>`</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

annParam := index.NewMinHashLSHAnnParam().
    WithSearchWithJACCARD(<span class="hljs-literal">true</span>).
    WithRefineK(<span class="hljs-number">3</span>)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithAnnParam(annParam).
    WithOutputFields(<span class="hljs-string">&quot;document_content&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;dedup_collection&quot;,
    &quot;data&quot;: [&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;],
    &quot;annsField&quot;: &quot;binary_vector&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;document_content&quot;],
    &quot;searchParams&quot;: {
        &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
        &quot;params&quot;: {
            &quot;mh_search_with_jaccard&quot;: true,
            &quot;refine_k&quot;: 3
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Установите значение параметра ` <code translate="no">mh_search_with_jaccard</code> ` равным ` <code translate="no">True</code> `, чтобы включить уточнение по коэффициенту Джаккарда. Параметр ` <code translate="no">refine_k</code> ` контролирует размер пула кандидатов, используемого для уточнения. Milvus использует значение ` <code translate="no">max(refine_k, limit)</code> ` в качестве размера пула, но может уточнять меньшее количество кандидатов, если поиск по LSH возвращает меньше совпадений. Увеличение значения ` <code translate="no">refine_k</code> ` может улучшить качество результатов за счет дополнительных вычислений.</p>
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
<li><p><a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>: используйте BM25 для ранжирования по лексической релевантности вместо обнаружения почти-дубликатов.</p></li>
<li><p><a href="/docs/ru/analyzer-overview.md">Обзор анализаторов</a>: настройте пользовательские анализаторы для токенизации текста.</p></li>
<li><p><a href="/docs/ru/minhash-lsh.md">Индекс MINHASH_LSH</a>: ознакомьтесь с настройкой параметров LSH для повышения полноты поиска и производительности.</p></li>
</ul>
