---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  Индекс NGRAM в Milvus создан для ускорения запросов LIKE к полям VARCHAR или
  определенным путям JSON внутри полей JSON. Перед построением индекса Milvus
  разбивает текст на короткие, перекрывающиеся подстроки фиксированной длины n,
  называемые n-граммами. Например, при n = 3 слово "Milvus" разбивается на 3
  грамма: "Mil", "ilv", "lvu" и "vus". Эти n-грамм хранятся в инвертированном
  индексе, который сопоставляет каждую грамму с идентификаторами документов, в
  которых она встречается. Во время запроса этот индекс позволяет Milvus быстро
  сузить поиск до небольшого набора кандидатов, что приводит к значительному
  ускорению выполнения запроса.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Индекс <code translate="no">NGRAM</code> в Milvus построен для ускорения запросов <code translate="no">LIKE</code> по полям <code translate="no">VARCHAR</code> или определенным путям JSON внутри полей <code translate="no">JSON</code>. Перед построением индекса Milvus разбивает текст на короткие, перекрывающиеся подстроки фиксированной длины <em>n</em>, называемые <em>n-граммами</em>. Например, при <em>n = 3</em> слово <em>"Milvus"</em> разбивается на 3 грамма: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu"</em> и <em>"vus".</em> Эти n-грамм хранятся в инвертированном индексе, который сопоставляет каждую грамму с идентификаторами документов, в которых она встречается. Во время запроса этот индекс позволяет Milvus быстро сузить поиск до небольшого набора кандидатов, что приводит к значительному ускорению выполнения запроса.</p>
<p>Используйте его, когда вам нужна быстрая префиксная, суффиксная, инфиксная или подстановочная фильтрация, например:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Подробные сведения о синтаксисе выражений фильтрации см. в разделе <a href="/docs/ru/basic-operators.md#Range-operators">Основные операторы</a>.</p>
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
    </button></h2><p>Milvus реализует индекс <code translate="no">NGRAM</code> в двухфазном процессе:</p>
<ol>
<li><p><strong>Построение индекса</strong>: Генерирование n-грамм для каждого документа и построение инвертированного индекса во время загрузки.</p></li>
<li><p><strong>Ускорение запросов</strong>: Используйте индекс для фильтрации по небольшому набору кандидатов, а затем проверяйте точные совпадения.</p></li>
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
    </button></h3><p>Во время ввода данных Milvus строит индекс NGRAM, выполняя два основных этапа:</p>
<ol>
<li><p><strong>Разложить текст на n-граммы</strong>: Milvus скользит окном <em>n</em> по каждой строке в целевом поле и извлекает перекрывающиеся подстроки, или <em>n-граммы</em>. Длина этих подстрок находится в настраиваемом диапазоне, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: Самая короткая n-грамма для генерации. Это также определяет минимальную длину подстроки запроса, для которой может быть использован индекс.</p></li>
<li><p><code translate="no">max_gram</code>: Самая длинная генерируемая n-грамма. Во время запроса она также используется в качестве максимального размера окна при разбиении длинных строк запроса.</p></li>
</ul>
<p>Например, при использовании <code translate="no">min_gram=2</code> и <code translate="no">max_gram=3</code> строка <code translate="no">&quot;AI database&quot;</code> разбивается следующим образом:</p>
<ul>
<li><strong>2-граммы:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, ...</li>
<li><strong>3-граммы:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Построить индекс Ngram</span> </span></p>
<blockquote>
<p><strong>Примечание</strong></p>
<ul>
<li><p>Для диапазона <code translate="no">[min_gram, max_gram]</code> Milvus генерирует все n-граммы для каждой длины между этими двумя значениями (включительно).<br>
Пример: для <code translate="no">[2,4]</code> и слова <code translate="no">&quot;text&quot;</code> Milvus генерирует:</p>
<ul>
<li><strong>2-граммы:</strong> <code translate="no">te</code>, <code translate="no">ex</code>, <code translate="no">xt</code></li>
<li><strong>3-граммы:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></li>
<li><strong>4-граммы</strong>: <code translate="no">text</code></li>
</ul></li>
<li><p>Декомпозиция N-грамм основана на символах и не зависит от языка. Например, в китайском языке <code translate="no">&quot;向量数据库&quot;</code> с <code translate="no">min_gram = 2</code> декомпозируется на: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>Пробелы и знаки препинания при декомпозиции рассматриваются как символы.</p></li>
<li><p>При разложении сохраняется исходный регистр, и соответствие зависит от регистра. Например, <code translate="no">&quot;Database&quot;</code> и <code translate="no">&quot;database&quot;</code> будут генерировать разные n-граммы и потребуют точного соответствия регистру при запросах.</p></li>
</ul>
</blockquote></li>
<li><p><strong>Построение инвертированного индекса</strong>: Создается <strong>инвертированный индекс</strong>, который сопоставляет каждую сгенерированную n-грамму со списком содержащих ее идентификаторов документов.</p>
<p>Например, если 2-грамма <code translate="no">&quot;AI&quot;</code> встречается в документах с идентификаторами 1, 5, 6, 8 и 9, в индекс записывается <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Этот индекс затем используется во время запроса для быстрого сужения области поиска.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Построение индекса Ngram 2</span> </span></p>
<div class="alert note">
<p>Более широкий диапазон <code translate="no">[min_gram, max_gram]</code> создает больше грамм и большие списки отображения. Если память ограничена, используйте режим mmap для очень больших списков отображения. Подробности см. в разделе <a href="/docs/ru/mmap.md">Использование mmap</a>.</p>
</div>
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
    </button></h3><p>Когда выполняется фильтр <code translate="no">LIKE</code>, Milvus использует индекс NGRAM для ускорения запроса на следующих этапах:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Ускорение запросов</span> </span></p>
<ol>
<li><p><strong>Извлечение термина запроса:</strong> Из выражения <code translate="no">LIKE</code> извлекается непрерывная подстрока без подстановочных знаков (например, <code translate="no">&quot;%database%&quot;</code> становится <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Декомпозиция термина запроса:</strong> Термин запроса декомпозируется на <em>n-граммы</em> в зависимости от его длины (<code translate="no">L</code>) и параметров <code translate="no">min_gram</code> и <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Если <code translate="no">L &lt; min_gram</code>, индекс не может быть использован, и запрос возвращается к полному сканированию.</p></li>
<li><p>Если <code translate="no">min_gram ≤ L ≤ max_gram</code>, то весь термин запроса рассматривается как одна n-грамма, и дальнейшая декомпозиция не требуется.</p></li>
<li><p>Если <code translate="no">L &gt; max_gram</code>, то термин запроса разбивается на перекрывающиеся граммы с помощью окна размером <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Например, если для <code translate="no">max_gram</code> установлено значение <code translate="no">3</code>, а термин запроса <code translate="no">&quot;database&quot;</code> имеет длину <strong>8</strong>, он разбивается на 3-граммовые подстроки <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code> и так далее.</p></li>
<li><p><strong>Поиск каждой грамы и пересечение</strong>: Milvus ищет каждую граму запроса в инвертированном индексе, а затем пересекает полученные списки идентификаторов документов, чтобы найти небольшой набор документов-кандидатов. Эти кандидаты содержат все граммы из запроса.</p></li>
<li><p><strong>Проверка и возврат результатов:</strong> Оригинальный фильтр <code translate="no">LIKE</code> затем применяется в качестве окончательной проверки только к небольшому набору кандидатов, чтобы найти точные совпадения.</p></li>
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
    </button></h2><p>Вы можете создать индекс NGRAM на поле <code translate="no">VARCHAR</code> или на определенном пути внутри поля <code translate="no">JSON</code>.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Пример 1: Создание на поле VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Для поля <code translate="no">VARCHAR</code> достаточно указать <code translate="no">field_name</code> и настроить <code translate="no">min_gram</code> и <code translate="no">max_gram</code>.</p>
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
<p>Эта конфигурация генерирует 2-граммы и 3-граммы для каждой строки в <code translate="no">text</code> и сохраняет их в инвертированном индексе.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Пример 2: Создание по пути JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Для поля <code translate="no">JSON</code>, помимо настроек грамматики, необходимо также указать:</p>
<ul>
<li><p><code translate="no">params.json_path</code> - путь JSON, указывающий на значение, которое вы хотите индексировать.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - должен быть <code translate="no">&quot;varchar&quot;</code> (без учета регистра), поскольку индексация NGRAM работает со строками.</p></li>
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
<li><p>Значение приводится к <code translate="no">VARCHAR</code> перед токенизацией n-грамм.</p></li>
<li><p>Milvus генерирует подстроки длиной от 2 до 4 и сохраняет их в инвертированном индексе.</p></li>
</ul>
<p>Для получения дополнительной информации о том, как индексировать поле JSON, обратитесь к разделу <a href="/docs/ru/use-json-fields.md">Поле JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Запросы, ускоренные с помощью NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы индекс NGRAM был применен:</p>
<ul>
<li><p>Запрос должен быть направлен на поле <code translate="no">VARCHAR</code> (или путь JSON), которое имеет индекс <code translate="no">NGRAM</code>.</p></li>
<li><p>Буквенная часть шаблона <code translate="no">LIKE</code> должна иметь длину не менее <code translate="no">min_gram</code> символов.<em>(Например, если самый короткий ожидаемый термин запроса составляет 2 символа, установите min_gram=2 при создании индекса).</em></p></li>
</ul>
<p>Поддерживаемые типы запросов:</p>
<ul>
<li><p><strong>Префиксное совпадение</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Суффиксное совпадение</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Инфиксное совпадение</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>совпадение с диким знаком</strong></p>
<p>Milvus поддерживает как <code translate="no">%</code> (ноль или более символов), так и <code translate="no">_</code> (ровно один символ).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Запросы пути в формате JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Для получения дополнительной информации о синтаксисе выражений фильтрации обратитесь к разделу <a href="/docs/ru/basic-operators.md">Основные операторы</a>.</p>
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
<li><p><strong>Типы полей</strong>: Поддерживаются поля <code translate="no">VARCHAR</code> и <code translate="no">JSON</code>. Для JSON необходимо указать <code translate="no">params.json_path</code> и <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Юникод</strong>: Разложение NGRAM основано на символах, не зависит от языка и включает пробельные символы и знаки препинания.</p></li>
<li><p><strong>Компромисс между пространством и временем</strong>: более широкие диапазоны грамм <code translate="no">[min_gram, max_gram]</code> дают больше грамм и большие индексы. Если память ограничена, используйте режим <code translate="no">mmap</code> для больших списков постинга. Для получения дополнительной информации обратитесь к разделу <a href="/docs/ru/mmap.md">Использование mmap</a>.</p></li>
<li><p><strong>Неизменяемость</strong>: <code translate="no">min_gram</code> и <code translate="no">max_gram</code> не могут быть изменены на месте - для их корректировки нужно перестроить индекс.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Лучшие практики<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Выберите min_gram и max_gram в соответствии с поведением поиска.</strong></p>
<ul>
<li><p>Начните с <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Установите <code translate="no">min_gram</code> на самый короткий литерал, который, как вы ожидаете, наберут пользователи.</p></li>
<li><p>Установите <code translate="no">max_gram</code> около типичной длины значимых подстрок; больший <code translate="no">max_gram</code> улучшает фильтрацию, но увеличивает пространство.</p></li>
</ul></li>
<li><p><strong>Избегайте графем с низкой селективностью</strong></p>
<p>Сильно повторяющиеся шаблоны (например, <code translate="no">&quot;aaaaaa&quot;</code>) обеспечивают слабую фильтрацию и могут дать ограниченный выигрыш.</p></li>
<li><p><strong>Нормализуйте последовательно</strong></p>
<p>Применяйте одинаковую нормализацию к вводимому тексту и литералам запроса (например, понижение регистра, обрезка), если это необходимо для вашего случая использования.</p></li>
</ul>
