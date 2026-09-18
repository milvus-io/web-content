---
id: phrase-match.md
title: Совпадение по фразеCompatible with Milvus 2.5.17+
summary: >-
  Фразовый поиск позволяет находить документы, содержащие термины запроса в виде
  точной фразы. По умолчанию слова должны встречаться в том же порядке и
  непосредственно рядом друг с другом. Например, запрос «робототехника машинное
  обучение» найдет текст типа «…типичные модели робототехники машинного
  обучения…», где слова «робототехника», «машинное» и «обучение» идут подряд,
  без других слов между ними.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Совпадение по фразе<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>Поиск по фразе позволяет находить документы, содержащие термины вашего запроса в виде точной фразы. По умолчанию слова должны встречаться в том же порядке и непосредственно рядом друг с другом. Например, запрос <strong>«робототехника машинное обучение»</strong> найдет текст типа <em>«…типичные модели машинного обучения в робототехнике…»</em>, где слова <strong>«робототехника»</strong>, <strong>«машинное»</strong> и <strong>«обучение»</strong> идут подряд, без других слов между ними.</p>
<p>Однако в реальных сценариях строгое фразовое сопоставление может оказаться слишком жестким. Возможно, вам потребуется найти текст типа <em>«…модели машинного обучения, широко применяемые в робототехнике…».</em> В данном случае присутствуют те же ключевые слова, но они не расположены рядом и не в исходном порядке. Для решения этой проблемы фразовое сопоставление поддерживает параметр « <code translate="no">slop</code> », который обеспечивает гибкость. Значение параметра « <code translate="no">slop</code> » определяет, сколько позиционных сдвигов допускается между терминами в фразе. Например, при значении параметра « <code translate="no">slop</code> » равном 1 запрос <strong>«machine learning»</strong> может совпадать с текстом типа <em>«…machine deep learning…»</em>, где одно слово (<strong>«deep»</strong>) разделяет исходные термины.</p>
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
    </button></h2><p>Функция сопоставления фраз, реализованная на основе библиотеки поисковой системы <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, работает путем анализа информации о положении слов в документах. На приведенной ниже схеме показан этот процесс:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>Рабочий процесс фразового сопоставления</span>
  
 </span></p>
<ol>
<li><p><strong>Токенизация документа</strong>: при загрузке документов в Milvus текст разбивается на токены (отдельные слова или термины) с помощью анализатора, при этом для каждого токена фиксируется информация о его позиции. Например, <strong>doc_1</strong> токенируется в <strong>[«machine» (pos=0), «learning» (pos=1), «boosts» (pos=2), «efficiency» (pos=3)]</strong>. Дополнительную информацию об анализаторах см. в <a href="/docs/ru/analyzer-overview.md">разделе «Обзор анализаторов</a>».</p></li>
<li><p><strong>Создание инвертированного индекса</strong>: Milvus строит инвертированный индекс, сопоставляя каждый токен с документом (документами), в котором он встречается, и позициями токена в этих документах.</p></li>
<li><p><strong>Сопоставление фраз</strong>: при выполнении фразового запроса Milvus ищет каждый токен в инвертированном индексе и проверяет их позиции, чтобы определить, появляются ли они в правильном порядке и с нужной близостью. Параметр <code translate="no">slop</code> контролирует максимальное количество позиций, допустимое между совпадающими токенами:</p>
<ul>
<li><p><strong>slop = 0</strong> означает, что токены должны встречаться <strong>в точном порядке и непосредственно рядом друг с другом</strong> (т. е. без лишних слов между ними).</p>
<ul>
<li>В примере точно соответствует только <strong>doc_1</strong> (<strong>«machine»</strong> в <strong>позиции 0</strong>, <strong>«learning»</strong> в <strong>позиции 1</strong>).</li>
</ul></li>
<li><p><strong>slop = 2</strong> допускает до двух позиций гибкости или перестановки между совпадающими токенами.</p>
<ul>
<li><p>Это допускает обратный порядок (<strong>«learning machine»</strong>) или небольшой промежуток между токенами.</p></li>
<li><p>Следовательно, совпадают <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>«learning»</strong> в <strong>позиции 0</strong>, <strong>«machine»</strong> в <strong>позиции 1</strong>) и <strong>doc_3</strong> (<strong>«learning»</strong> в <strong>позиции 1</strong>, <strong>«machine»</strong> в <strong>позиции 2</strong>).</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Включение фразового сопоставления<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Фразовое сопоставление работает с типом поля ` <code translate="no">VARCHAR</code> ` — типом данных `string` в Milvus. Чтобы включить фразовое сопоставление, настройте схему коллекции, установив для параметров ` <code translate="no">enable_analyzer</code> ` и ` <code translate="no">enable_match</code> ` значение ` <code translate="no">True</code>`, аналогично <a href="/docs/ru/keyword-match.md">текстовому сопоставлению</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Установите значения параметров <code translate="no">enable_analyzer</code> и <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы включить поиск по фразам для конкретного поля <code translate="no">VARCHAR</code>, при определении схемы поля установите для обоих параметров <code translate="no">enable_analyzer</code> и <code translate="no">enable_match</code> значение <code translate="no">True</code>. Эта настройка указывает Milvus на необходимость токенизации текста и создания инвертированного индекса с позиционной информацией, необходимой для эффективного поиска по фразам.</p>
<p>Ниже приведён пример определения схемы для включения поиска по фразам:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Create a schema for a new collection</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)              <span class="hljs-comment">// Name of the field</span>
        .dataType(DataType.VarChar)     <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis (tokenization)</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

<span class="hljs-comment">// Create a schema for a new collection</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).                      <span class="hljs-comment">// Name of the field</span>
    WithDataType(entity.FieldTypeVarChar). <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
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
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;embeddings&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/CollectionSchema.h&quot;</span></span>

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-function">milvus::CollectionSchema <span class="hljs-title">schema</span><span class="hljs-params">(<span class="hljs-string">&quot;tech_articles&quot;</span>)</span></span>;
schema.<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">false</span>);
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>));
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)    <span class="hljs-comment">// Maximum length of the string</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)   <span class="hljs-comment">// Enables text analysis (tokenization)</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));    <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embeddings&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                    .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Необязательно: настройте анализатор<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Точность сопоставления фраз в значительной степени зависит от анализатора, используемого для токенизации ваших текстовых данных. Различные анализаторы подходят для разных языков и форматов текста, что влияет на токенизацию и точность позиционного сопоставления. Выбор подходящего анализатора для вашего конкретного случая использования позволит оптимизировать результаты сопоставления фраз.</p>
<p>По умолчанию Milvus использует стандартный анализатор, который разбивает текст на токены на основе пробелов и знаков препинания, удаляет токены длиной более 40 символов и преобразует текст в нижний регистр. Для использования по умолчанию дополнительные параметры не требуются. Подробности см. в разделе <a href="/docs/ru/standard-analyzer.md">«Стандартный анализатор</a> ».</p>
<p>Если вашему приложению требуется конкретный анализатор, настройте его с помощью параметра ` <code translate="no">analyzer_params</code> `. Например, вот как настроить анализатор ` <code translate="no">english</code> ` для сопоставления фраз в тексте на английском языке:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)              <span class="hljs-comment">// Name of the field</span>
        .dataType(DataType.VarChar)     <span class="hljs-comment">// Field data type set as VARCHAR</span>
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis</span>
        .analyzerParams(analyzerParams) <span class="hljs-comment">// Specifies the analyzer configuration</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).                      <span class="hljs-comment">// Name of the field</span>
    WithDataType(entity.FieldTypeVarChar). <span class="hljs-comment">// Field data type set as VARCHAR</span>
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis</span>
    WithAnalyzerParams(analyzerParams).    <span class="hljs-comment">// Specifies the analyzer configuration</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
<span class="hljs-keyword">const</span> analyzer_params = { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> };

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis</span>
    <span class="hljs-attr">analyzer_params</span>: analyzer_params, <span class="hljs-comment">// Specifies the analyzer configuration</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;},
                    &quot;enable_match&quot;: true
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
nlohmann::json analyzer_params = {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}};

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)               <span class="hljs-comment">// Enables text analysis</span>
                    .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params) <span class="hljs-comment">// Specifies the analyzer configuration</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));                <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus поддерживает несколько анализаторов, адаптированных для различных языков и сценариев использования. Подробную информацию см. в <a href="/docs/ru/analyzer-overview.md">разделе «Обзор анализаторов</a>».</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Использование поиска по фразам<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>После включения сопоставления для поля <code translate="no">VARCHAR</code> в схеме коллекции можно выполнять сопоставление фраз с помощью выражения <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>В выражении « <code translate="no">PHRASE_MATCH</code> » не учитывается регистр. Можно использовать как <code translate="no">PHRASE_MATCH</code>, так и <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Синтаксис выражения PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте выражение « <code translate="no">PHRASE_MATCH</code> » для указания поля, фразы и опциональной гибкости (<code translate="no">slop</code>) при поиске. Синтаксис следующий:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-title function_">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-built_in">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Имя поля « <code translate="no">VARCHAR</code> », по которому выполняется поиск по фразе.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> Точная фраза, которую нужно найти.</p></li>
<li><p><code translate="no">slop</code> (необязательно)<strong>:</strong> Целое число, определяющее максимальное количество позиций, допускаемых в совпадающих токенах.</p>
<ul>
<li><p><code translate="no">0</code> (по умолчанию): Соответствует только точным фразам. Пример: Фильтр для <strong>«machine learning»</strong> будет соответствовать именно <strong>«machine learning»</strong>, но не <strong>«machine boosts learning»</strong> или <strong>«learning machine».</strong></p></li>
<li><p><code translate="no">1</code>: Допускает незначительные вариации, такие как один дополнительный термин или небольшое смещение позиции. Пример: фильтр для <strong>«machine learning»</strong> найдет совпадение <strong>с «machine boosts learning»</strong> (один токен между <strong>«machine»</strong> и <strong>«learning»</strong>), но не <strong>с «learning machine»</strong> (термины в обратном порядке).</p></li>
<li><p><code translate="no">2</code>: Допускает большую гибкость, включая перестановку терминов местами или наличие до двух токенов между ними. Пример: Фильтр для <strong>«machine learning»</strong> будет сопоставляться с <strong>«learning machine»</strong> (термины переставлены местами) или <strong>«machine quickly boosts learning»</strong> (два токена между <strong>«machine»</strong> и <strong>«learning»</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Пример набора данных<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Предположим, у вас есть коллекция с именем <strong>tech_articles</strong>, содержащая следующие пять сущностей:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«Машинное обучение повышает эффективность анализа больших массивов данных»</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«Освоение машинного подхода имеет жизненно важное значение для прогресса современного искусственного интеллекта»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Архитектуры систем глубокого обучения оптимизируют вычислительную нагрузку»</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>«Машина быстро повышает эффективность модели для непрерывного обучения»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«Обучение сложным алгоритмам расширяет возможности ИИ»</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Запрос с поиском по фразе<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>При использовании метода <code translate="no">query()</code> <strong>PHRASE_MATCH</strong> действует как скалярный фильтр. Возвращаются только те документы, которые содержат указанную фразу (с учетом допустимого отклонения).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Пример: slop = 0 (точное совпадение)</h4><p>В этом примере возвращаются документы, содержащие точную фразу <strong>«machine learning»</strong> без каких-либо дополнительных токенов между словами.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;tech_articles&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(milvus::<span class="hljs-built_in">QueryRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>)
                                .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                            response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ожидаемые результаты поиска:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«Машинное обучение повышает эффективность анализа больших массивов данных»</p></td>
   </tr>
</table>
<p>Только документ 1 содержит точную фразу <strong>«machine learning»</strong> в указанном порядке без дополнительных токенов.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Поиск с помощью фразового сопоставления<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>В поисковых операциях <strong>PHRASE_MATCH</strong> используется для фильтрации документов перед применением ранжирования по векторному сходству. Этот двухэтапный подход сначала сужает набор кандидатов с помощью текстового сопоставления, а затем заново ранжирует этих кандидатов на основе векторных вложений.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Пример: slop = 1</h4><p>Здесь мы допускаем погрешность (slop) равную 1. Фильтр применяется к документам, содержащим фразу <strong>«learning machine»</strong>, с небольшой гибкостью.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .filter(filter)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithFilter(filter).
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>)
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Результаты сопоставления:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«Изучение машинного подхода имеет жизненно важное значение для прогресса современного ИИ»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Архитектуры систем глубокого обучения оптимизируют вычислительную нагрузку»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«Освоение передовых алгоритмов машинного обучения расширяет возможности ИИ»</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Пример: slop = 2</h4><p>В этом примере допускается значение slop равное 2, что означает, что между словами <strong>«machine»</strong> и <strong>«learning»</strong> допускается до двух дополнительных токенов (или терминов в обратном порядке) <strong>.</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)            <span class="hljs-comment">// Vector field name</span>
        .data(Collections.singletonList(queryVector)) <span class="hljs-comment">// Query vector</span>
        .filter(filter)                     <span class="hljs-comment">// Filter expression</span>
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)                           <span class="hljs-comment">// Maximum results to return</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit, maximum results to return</span>
    []entity.Vector{entity.FloatVector(queryVector)}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>). <span class="hljs-comment">// vector field name</span>
    WithFilter(filter).        <span class="hljs-comment">// filter expression</span>
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter, <span class="hljs-comment">// Filter expression</span>
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Maximum results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>) <span class="hljs-comment">// Vector field name</span>
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector) <span class="hljs-comment">// Query vector</span>
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>) <span class="hljs-comment">// Filter expression</span>
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>) <span class="hljs-comment">// Maximum results to return</span>
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Результаты поиска:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«Машинное обучение повышает эффективность анализа больших массивов данных»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Архитектуры систем глубокого обучения оптимизируют вычислительную нагрузку»</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Пример: slop = 3</h4><p>В этом примере значение slop, равное 3, обеспечивает ещё большую гибкость. Фильтр ищет фразу <strong>«machine learning»</strong>, при этом между словами допускается до трёх позиций токенов.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)            <span class="hljs-comment">// Vector field name</span>
        .data(Collections.singletonList(queryVector)) <span class="hljs-comment">// Query vector</span>
        .filter(filter)                     <span class="hljs-comment">// Filter expression</span>
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)                           <span class="hljs-comment">// Maximum results to return</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit, maximum results to return</span>
    []entity.Vector{entity.FloatVector(queryVector)}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>). <span class="hljs-comment">// vector field name</span>
    WithFilter(filter).        <span class="hljs-comment">// filter expression</span>
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter, <span class="hljs-comment">// Filter expression</span>
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Maximum results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>) <span class="hljs-comment">// Vector field name</span>
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector) <span class="hljs-comment">// Query vector</span>
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>) <span class="hljs-comment">// Filter expression</span>
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>) <span class="hljs-comment">// Maximum results to return</span>
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Результаты поиска:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«Машинное обучение повышает эффективность анализа больших массивов данных»</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«Изучение машинных подходов имеет жизненно важное значение для прогресса современного ИИ»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Архитектуры систем глубокого обучения оптимизируют вычислительную нагрузку»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«Изучение передовых алгоритмов машинного обучения расширяет возможности ИИ»</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Рекомендации<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Включение сопоставления фраз для поля приводит к созданию инвертированного индекса, что требует ресурсов хранения. При принятии решения о включении этой функции учитывайте влияние на хранение, поскольку оно зависит от размера текста, количества уникальных токенов и используемого анализатора.</p></li>
<li><p>После того как вы определили анализатор в схеме, его настройки становятся постоянными для данной коллекции. Если вы решите, что другой анализатор лучше подойдет для ваших нужд, можно удалить существующую коллекцию и создать новую с нужной конфигурацией анализатора.</p></li>
<li><p>Производительность поиска по фразам зависит от того, как выполняется токенизация текста. Прежде чем применять анализатор ко всей коллекции, воспользуйтесь методом ` <code translate="no">run_analyzer</code> `, чтобы проверить результаты токенизации. Дополнительные сведения см. в <a href="/docs/ru/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">разделе «Обзор анализаторов</a>».</p></li>
<li><p>Правила экранирования в выражениях <code translate="no">filter</code>:</p>
<ul>
<li><p>Символы, заключённые в двойные или одинарные кавычки внутри выражений, интерпретируются как строковые константы. Если строковая константа содержит символы экранирования, они должны быть представлены с помощью экранирующих последовательностей. Например, используйте ` <code translate="no">\\</code> ` для представления символа « <code translate="no">\</code> », ` <code translate="no">\\t</code> ` — для табуляции ` <code translate="no">\t</code>`, а ` <code translate="no">\\n</code> ` — для символа новой строки.</p></li>
<li><p>Если строковая константа заключена в одинарные кавычки, одинарная кавычка внутри константы должна представляться как <code translate="no">\\'</code>, тогда как двойная кавычка может представляться либо как <code translate="no">&quot;</code>, либо как <code translate="no">\\&quot;</code>. Пример: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Если строковая константа заключена в двойные кавычки, двойная кавычка внутри константы должна быть представлена как <code translate="no">\\&quot;</code>, а одинарная кавычка может быть представлена либо как <code translate="no">'</code>, либо как <code translate="no">\\'</code>. Пример: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
