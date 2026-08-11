---
id: ngram.md
title: NGRAM
summary: >-
  Индекс NGRAM в Milvus ускоряет выполнение запросов типа LIKE и соответствующих
  фильтров на основе регулярных выражений для полей типа VARCHAR или
  определённых путей в полях JSON. Перед созданием индекса Milvus разбивает
  текст на короткие, перекрывающиеся подстроки фиксированной длины n, называемые
  n-граммами. При выполнении запроса Milvus использует эти n-граммы для сужения
  круга потенциальных объектов перед проверкой исходного условия фильтрации.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс « <code translate="no">NGRAM</code> » в Milvus ускоряет выполнение запросов типа « <code translate="no">LIKE</code> » и соответствующих фильтров на основе регулярных выражений по полям « <code translate="no">VARCHAR</code> » или конкретным путям JSON внутри полей « <code translate="no">JSON</code> ». Перед созданием индекса Milvus разбивает текст на короткие, перекрывающиеся подстроки фиксированной длины <em>n</em>, называемые <em>n-грамами</em>. Например, при <em>n = 3</em> слово <em>«Milvus»</em> разбивается на 3-граммы: <em>«Mil»</em>, <em>«ilv»</em>, <em>«lvu»</em> и <em>«vus».</em> Затем эти n-граммы хранятся в инвертированном индексе, который сопоставляет каждую грамму с идентификаторами документов, в которых она встречается. Во время выполнения запроса этот индекс позволяет Milvus быстро сузить поиск до небольшого набора кандидатов ещё до проверки исходного условия фильтрации.</p>
<p>Используйте его, когда требуется быстрая фильтрация по префиксам, суффиксам, инфиксам, подстановочным знакам или подходящим регулярным выражениям, например:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Подробную информацию о синтаксисе выражений фильтрации « <code translate="no">LIKE</code> » и регулярных выражений см. в разделе <a href="/docs/ru/pattern-matching.md">«Сопоставление шаблонов</a>».</p>
</div>
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
    </button></h2><p>Milvus реализует индекс « <code translate="no">NGRAM</code> » в два этапа:</p>
<ol>
<li><p><strong>Построение индекса</strong>: генерация n-грамм для каждого документа и построение инвертированного индекса во время загрузки.</p></li>
<li><p><strong>Ускорение запросов</strong>: с помощью индекса выполняется фильтрация до небольшого набора кандидатов, после чего проверяются точные совпадения.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Этап 1: Построение индекса<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Во время загрузки данных Milvus создает индекс NGRAM, выполняя два основных шага:</p>
<ol>
<li><p><strong>Разбиение текста на n-граммы</strong>: Milvus продвигает окно размером <em>n</em> по каждой строке в целевом поле и извлекает перекрывающиеся подстроки, или <em>n-граммы</em>. Длина этих подстрок находится в настраиваемом диапазоне, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: Самая короткая n-грамма, которую необходимо сгенерировать. Этот параметр также определяет минимальную длину подстроки запроса, для которой индекс может быть полезен.</p></li>
<li><p><code translate="no">max_gram</code>: Самая длинная n-грамма, которую следует сгенерировать. Во время запроса она также используется в качестве максимального размера окна при разбиении длинных строк запроса.</p></li>
</ul>
<p>Например, при значениях <code translate="no">min_gram=2</code> и <code translate="no">max_gram=3</code> строка <code translate="no">&quot;AI database&quot;</code> разбивается следующим образом:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>Построение индекса n-грамм</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>Создание инвертированного индекса</strong>: создаётся <strong>инвертированный индекс</strong>, который сопоставляет каждый сгенерированный n-грамм со списком идентификаторов документов, содержащих его.</p>
<p>Например, если 2-грамма <code translate="no">&quot;AI&quot;</code> встречается в документах с идентификаторами 1, 5, 6, 8 и 9, в индексе записывается <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Затем этот индекс используется при выполнении запроса для быстрого сужения области поиска.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>Построение индекса n-грамм 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Этап 2: Ускорение запросов<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>При выполнении фильтра « <code translate="no">LIKE</code> » или подходящего фильтра на основе регулярных выражений Milvus использует индекс NGRAM для ускорения запроса, выполняя следующие шаги:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>Ускорение запросов</span>
  
 </span></p>
<ol>
<li><p><strong>Извлечение термина запроса:</strong> из выражения <code translate="no">LIKE</code> извлекается непрерывная подстрока без подстановочных знаков (например, <code translate="no">&quot;%database%&quot;</code> превращается в <code translate="no">&quot;database&quot;</code>). Для фильтров на основе регулярных выражений Milvus, по возможности, извлекает фиксированные литеральные подстроки из шаблона регулярного выражения. Например, <code translate="no">message =~ &quot;error.*timeout&quot;</code> содержит литералы <code translate="no">error</code> и <code translate="no">timeout</code>.</p></li>
<li><p><strong>Разложение термина запроса:</strong> термин запроса разлагается на <em>n-граммы</em> в зависимости от его длины (<code translate="no">L</code>) и настроек <code translate="no">min_gram</code> и <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Если <code translate="no">L &lt; min_gram</code>, индекс использовать нельзя, и запрос переходит в режим полного сканирования.</p></li>
<li><p>Если <code translate="no">min_gram ≤ L ≤ max_gram</code>, весь термин запроса рассматривается как единая n-грамма, и дальнейшее разбиение не требуется.</p></li>
<li><p>Если <code translate="no">L &gt; max_gram</code>, термин запроса разбивается на перекрывающиеся граммы с использованием размера окна, равного <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Например, если для параметра ` <code translate="no">max_gram</code> ` установлено значение ` <code translate="no">3</code> `, а термин запроса — ` <code translate="no">&quot;database&quot;</code>` (длина <strong>8</strong>), он разбивается на 3-граммные подстроки, такие как ` <code translate="no">&quot;dat&quot;</code>`, ` <code translate="no">&quot;ata&quot;</code>`, ` <code translate="no">&quot;tab&quot;</code>` и т. д.</p></li>
<li><p><strong>Поиск по каждому граму и пересечение</strong>: Milvus ищет каждый из грамов запроса в инвертированном индексе, а затем выполняет пересечение полученных списков идентификаторов документов, чтобы найти небольшое множество документов-кандидатов. Эти кандидаты содержат все грамы из запроса.</p></li>
<li><p><strong>Проверка и возврат результатов:</strong> Затем исходный фильтр « <code translate="no">LIKE</code> » или фильтр на основе регулярных выражений применяется в качестве окончательной проверки только к небольшому набору кандидатов для поиска точных совпадений.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Создание индекса NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете создать индекс NGRAM для поля типа « <code translate="no">VARCHAR</code> » или для определённого пути внутри поля типа « <code translate="no">JSON</code> ».</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Пример 1: Создание для поля VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Для поля типа « <code translate="no">VARCHAR</code> » достаточно просто указать « <code translate="no">field_name</code> » и настроить параметры « <code translate="no">min_gram</code> » и « <code translate="no">max_gram</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Эта конфигурация генерирует 2-граммы и 3-граммы для каждой строки в поле « <code translate="no">text</code> » и сохраняет их в инвертированном индексе.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Пример 2: Создание на основе JSON-пути<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Для поля <code translate="no">JSON</code> помимо настроек грамм необходимо также указать:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – путь JSON, указывающий на значение, которое необходимо проиндексировать.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – должен быть <code translate="no">&quot;varchar&quot;</code> (регистр не имеет значения), поскольку индексирование NGRAM работает со строками.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>В данном примере:</p>
<ul>
<li><p>Индексируется только значение по адресу <code translate="no">json_field[&quot;body&quot;]</code>.</p></li>
<li><p>Значение преобразуется в <code translate="no">VARCHAR</code> перед токенизацией n-грамм.</p></li>
<li><p>Milvus генерирует подстроки длиной от 2 до 4 и сохраняет их в инвертированном индексе.</p></li>
</ul>
<p>Дополнительную информацию об индексировании поля JSON см. в разделе <a href="/docs/ru/json-indexing.md">«Индексирование JSON</a>».</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Запросы, ускоряемые с помощью NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Для применения индекса NGRAM необходимо:</p>
<ul>
<li><p>Запрос должен быть направлен на поле <code translate="no">VARCHAR</code> (или путь JSON), для которого создан индекс <code translate="no">NGRAM</code>.</p></li>
<li><p>Литеральная часть шаблона « <code translate="no">LIKE</code> » должна состоять как минимум из <code translate="no">min_gram</code> символов.
<em>(Например, если ожидаемый самый короткий термин запроса состоит из 2 символов, при создании индекса установите min_gram=2.)</em></p></li>
</ul>
<p>Поддерживаемые типы запросов:</p>
<ul>
<li><p><strong>Совпадение префикса</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Совпадение суффикса</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Совпадение инфикса</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Совпадение с подстановочными знаками</strong></p>
<p>Milvus поддерживает как « <code translate="no">%</code> » (ноль или более символов), так и « <code translate="no">_</code> » (ровно один символ).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Запросы по пути JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Фильтр на основе регулярных выражений</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Фильтр на основе регулярных выражений по пути JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Дополнительную информацию о синтаксисе выражений фильтра см. в разделе <a href="/docs/ru/pattern-matching.md">«Сопоставление шаблонов</a>».</p>
<h2 id="Drop-an-index" class="common-anchor-header">Удаление индекса<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте метод ` <code translate="no">drop_index()</code> ` для удаления существующего индекса из коллекции.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Примечания по использованию<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Типы полей</strong>: Поддерживается для полей типа « <code translate="no">VARCHAR</code> » и « <code translate="no">JSON</code> ». Для JSON необходимо указать как « <code translate="no">params.json_path</code> », так и « <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> ».</p></li>
<li><p><strong>Ускорение с помощью регулярных выражений</strong>: <code translate="no">NGRAM</code> ускоряет фильтрацию по регулярным выражениям только в том случае, если Milvus может извлечь фиксированные подстроки-литералы из шаблона регулярного выражения. Шаблоны, такие как <code translate="no">[a-z]+</code>, могут переходить на сканирование, поскольку не содержат фиксированных литералов.</p></li>
<li><p><strong>Регулярные выражения без учета регистра</strong>: шаблоны регулярных выражений с <code translate="no">(?i)</code> поддерживаются, но они могут пропустить оптимизацию <code translate="no">NGRAM</code>, поскольку индекс сохраняет исходный регистр.</p></li>
<li><p><strong>Этап проверки</strong>: для фильтров на основе регулярных выражений функция <code translate="no">NGRAM</code> генерирует кандидаты, а Milvus проверяет их с помощью полного шаблона RE2, поэтому ускорение индексации не влияет на результаты сопоставления.</p></li>
<li><p><strong>Unicode</strong>: разложение NGRAM основано на символах, не зависит от языка и включает пробелы и знаки препинания.</p></li>
<li><p><strong>Компромисс между объёмом памяти и временем</strong>: более широкие диапазоны грамм ( <code translate="no">[min_gram, max_gram]</code> ) генерируют больше грамм и приводят к увеличению размера индексов. Если памяти мало, для больших списков постингов рекомендуется использовать режим <code translate="no">mmap</code>. Дополнительную информацию см. в разделе <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">«Использование mmap</a>».</p></li>
<li><p><strong>Неизменяемость</strong>: параметры <code translate="no">min_gram</code> и <code translate="no">max_gram</code> нельзя изменять на месте — для их настройки необходимо перестроить индекс.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Рекомендации<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Выбирайте значения min_gram и max_gram в соответствии с поведением поиска</strong></p>
<ul>
<li><p>Начните с значений <code translate="no">min_gram=2</code> и <code translate="no">max_gram=3</code>.</p></li>
<li><p>Установите значение <code translate="no">min_gram</code> равным самому короткому литералу, который, как вы ожидаете, будут вводить пользователи.</p></li>
<li><p>Установите значение <code translate="no">max_gram</code>, близкое к типичной длине значимых подстрок; более высокое значение <code translate="no">max_gram</code> улучшает фильтрацию, но увеличивает объем занимаемого пространства.</p></li>
</ul></li>
<li><p><strong>Избегайте грамм с низкой селективностью</strong></p>
<p>Высокоповторяющиеся шаблоны (например, <code translate="no">&quot;aaaaaa&quot;</code>) обеспечивают слабую фильтрацию и могут дать ограниченный эффект.</p></li>
<li><p><strong>Нормализуйте данные последовательно</strong></p>
<p>Применяйте одинаковую нормализацию к импортируемому тексту и литералам запросов (например, преобразование в нижний регистр, обрезание), если это необходимо для вашего сценария использования.</p></li>
</ul>
