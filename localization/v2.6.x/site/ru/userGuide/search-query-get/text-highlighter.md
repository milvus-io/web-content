---
id: text-highlighter.md
title: Выделитель текстаCompatible with Milvus 2.6.8+
summary: >-
  Выделитель в Milvus аннотирует совпадающие термины в текстовых полях,
  оборачивая их настраиваемыми тегами. Выделение помогает объяснить, почему
  документ соответствует, улучшает читаемость результатов и поддерживает богатую
  визуализацию в приложениях поиска и RAG.
beta: Milvus 2.6.8+
---
<h1 id="Text-Highlighter" class="common-anchor-header">Выделитель текста<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#Text-Highlighter" class="anchor-icon" translate="no">
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
    </button></h1><p>Выделитель в Milvus аннотирует совпадающие термины в текстовых полях, оборачивая их настраиваемыми тегами. Выделение помогает объяснить, почему документ совпадает, улучшает читаемость результатов и поддерживает богатый рендеринг в приложениях поиска и RAG.</p>
<p>Выделение выполняется как этап постобработки конечного набора результатов поиска. Оно не влияет на поиск кандидатов, логику фильтрации, ранжирование или оценку.</p>
<p>Выделитель обеспечивает три независимых измерения контроля:</p>
<ul>
<li><p><strong>Какие термины выделяются</strong></p>
<p>Вы можете выбрать, откуда берутся выделенные термины. Например, выделить поисковые термины, используемые в <strong>полнотекстовом поиске BM25</strong>, или термины запроса, указанные в <strong>выражениях фильтрации на основе текста</strong> (например, условия <code translate="no">TEXT_MATCH</code> ).</p></li>
<li><p><strong>Как отображаются выделенные термины</strong></p>
<p>Вы можете управлять тем, как совпавшие термины отображаются в результатах подсветки, настраивая метки, вставляемые до и после каждого совпадения. Например, используйте простые маркеры, такие как <code translate="no">{}</code>, или HTML-теги, такие как <code translate="no">&lt;em&gt;&lt;/em&gt;</code>, для богатой визуализации.</p></li>
<li><p><strong>Как возвращается выделенный текст</strong></p>
<p>Вы можете управлять тем, как выделенные результаты возвращаются в виде фрагментов, включая начало фрагментов, их длину и количество возвращаемых фрагментов.</p></li>
</ul>
<p>В следующих разделах рассматриваются эти сценарии.</p>
<h2 id="Search-term-highlighting-in-BM25-full-text-search" class="common-anchor-header">Выделение поисковых терминов в полнотекстовом поиске BM25<button data-href="#Search-term-highlighting-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Когда вы выполняете полнотекстовый поиск в BM25, вы можете выделить <strong>поисковые термины</strong> в возвращаемых результатах, чтобы объяснить, почему документ соответствует запросу. Чтобы узнать больше о полнотекстовом поиске в BM25, обратитесь к разделу <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p>
<p>В этом сценарии выделенные термины напрямую связаны с поисковыми терминами, используемыми в полнотекстовом поиске BM25. Выделитель использует эти термины для аннотирования совпадающего текста в итоговом результате.</p>
<p>Предположим, что в текстовом поле хранится следующее содержимое:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Конфигурация выделителя</strong></p>
<p>Чтобы выделить поисковые термины в полнотекстовом поиске BM25, создайте <code translate="no">LexicalHighlighter</code> и включите подсветку поисковых терминов для полнотекстового поиска BM25:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_search_text=<span class="hljs-literal">True</span>   <span class="hljs-comment"># Enable search term highlighting for BM25 full text search</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В этом примере:</p>
<ul>
<li><p><code translate="no">pre_tags</code> и <code translate="no">post_tags</code> управляют тем, как выделенный текст появляется в выдаче. В этом случае совпадающие термины обернуты тегом <code translate="no">{}</code> (например, <code translate="no">{term}</code>). Можно также указать несколько тегов в виде списка (например, <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). При выделении нескольких терминов теги применяются по порядку и поворачиваются в соответствии с последовательностью совпадений.</p></li>
<li><p><code translate="no">highlight_search_text=True</code> указывает Milvus на использование поисковых терминов в полнотекстовом поиске BM25 в качестве источника выделенных терминов.</p></li>
</ul>
<p>После создания объекта Highlighter примените его конфигурацию к запросу полнотекстового поиска BM25:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],      <span class="hljs-comment"># Search term used in BM25 full text search</span>
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Вывод выделения</strong></p>
<p>Когда подсветка включена, Milvus возвращает выделенный текст в специальном поле <code translate="no">highlight</code>. По умолчанию выделенная выдача возвращается в виде фрагмента, начиная с первого найденного термина.</p>
<p>В этом примере поисковым термином является <code translate="no">&quot;BM25&quot;</code>, поэтому он выделен в возвращаемом результате:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы управлять положением, длиной и количеством возвращаемых фрагментов, см. раздел <a href="/docs/ru/text-highlighter.md#Fragment-based-highlighting-output">Возвращать выделенный текст в виде фрагментов</a>.</p>
<h2 id="Query-term-highlighting-in-filtering" class="common-anchor-header">Выделение поисковых терминов при фильтрации<button data-href="#Query-term-highlighting-in-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Помимо выделения поисковых терминов, вы можете выделять термины, используемые в текстовых выражениях фильтрации.</p>
<div class="alert note">
<p>В настоящее время для выделения терминов запроса поддерживается только условие фильтрации <code translate="no">TEXT_MATCH</code>. Чтобы узнать больше, обратитесь к разделу <a href="/docs/ru/keyword-match.md">"Текстовое соответствие"</a>.</p>
</div>
<p>В этом сценарии выделенные термины используются в выражениях фильтрации на основе текста. Фильтрация определяет, какие документы совпадают, а подсветка аннотирует совпавшие участки текста.</p>
<p>Предположим, что следующее содержимое хранится в текстовом поле:</p>
<pre><code translate="no" class="language-python">This document explains how text filtering works <span class="hljs-keyword">in</span> Milvus.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Конфигурация выделителя</strong></p>
<p>Чтобы выделить термины запроса, используемые при фильтрации, создайте <code translate="no">LexicalHighlighter</code> и определите <code translate="no">highlight_query</code>, соответствующий условию фильтрации:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_query=[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>,     <span class="hljs-comment"># Text filtering type</span>
        <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,         <span class="hljs-comment"># Target text field</span>
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;text filtering&quot;</span> <span class="hljs-comment"># Terms to highlight</span>
    }]
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">pre_tags</code> <code translate="no">post_tags</code> и управляют тем, как выделенный текст появляется в выводе. В этом случае совпадающие термины оборачиваются тегами <code translate="no">{}</code> (например, <code translate="no">{term}</code>). Можно также указать несколько тегов в виде списка (например, <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). При выделении нескольких терминов теги применяются по порядку и поворачиваются в соответствии с последовательностью совпадений.</p></li>
<li><p><code translate="no">highlight_query</code> определяет, какие термины фильтрации должны быть выделены.</p></li>
</ul>
<p>После создания объекта Highlighter примените то же выражение фильтрации и конфигурацию Highlighter к поисковому запросу:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(text, &quot;text filtering&quot;)&#x27;</span>,
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Вывод с подсветкой</strong></p>
<p>Когда для фильтрации включена подсветка терминов запроса, Milvus возвращает выделенный текст в специальном поле <code translate="no">highlight</code>. По умолчанию выделенная выдача возвращается в виде фрагмента, начиная с первого найденного термина.</p>
<p>В этом примере первый найденный термин - <code translate="no">&quot;text&quot;</code>, поэтому возвращаемый выделенный текст начинается с этой позиции:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{text} {filtering} works in Milvus.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для управления позицией, длиной и количеством возвращаемых фрагментов см. раздел <a href="/docs/ru/text-highlighter.md#Fragment-based-highlighting-output">Возвращать выделенный текст в виде фрагментов</a>.</p>
<h2 id="Fragment-based-highlighting-output" class="common-anchor-header">Вывод выделенного текста на основе фрагментов<button data-href="#Fragment-based-highlighting-output" class="anchor-icon" translate="no">
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
    </button></h2><p>По умолчанию Milvus возвращает выделенный текст в виде фрагментов, начиная с первого найденного термина. Настройки, связанные с фрагментами, позволяют дополнительно контролировать возврат фрагментов, не меняя при этом, какие термины выделяются.</p>
<p>Предположим, что следующее содержимое хранится в текстовом поле:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Конфигурация выделителя</strong></p>
<p>Чтобы управлять формой выделенных фрагментов, настройте параметры, связанные с фрагментами, на странице <code translate="no">LexicalHighlighter</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],
    highlight_search_text=<span class="hljs-literal">True</span>,
    fragment_offset=<span class="hljs-number">5</span>,     <span class="hljs-comment"># Number of characters to reserve before the first matched term</span>
    fragment_size=<span class="hljs-number">60</span>,      <span class="hljs-comment"># Max. length of each fragment to return</span>
    num_of_fragments=<span class="hljs-number">1</span>     <span class="hljs-comment"># Max. number of fragments to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В этой конфигурации:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> резервирует ведущий контекст перед первым выделенным фрагментом.</p></li>
<li><p><code translate="no">fragment_size</code> ограничивает объем текста, включаемого в каждый фрагмент.</p></li>
<li><p><code translate="no">num_of_fragments</code> управляет количеством возвращаемых фрагментов.</p></li>
</ul>
<p>После создания объекта Highlighter примените конфигурацию Highlighter к поисковому запросу:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Вывод с выделением</strong></p>
<p>При включенном выделении на основе фрагментов Milvus возвращает выделенный текст в виде фрагментов в поле <code translate="no">highlight</code>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;Use {BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>В этом выводе:</p>
<ul>
<li><p>Фрагмент не начинается точно с <code translate="no">{BM25}</code>, потому что установлено значение <code translate="no">fragment_offset</code>.</p></li>
<li><p>Возвращается только один фрагмент, потому что <code translate="no">num_of_fragments</code> равен 1.</p></li>
<li><p>Длина фрагмента ограничена значением <code translate="no">fragment_size</code>.</p></li>
</ul>
<h2 id="Examples" class="common-anchor-header">Примеры<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>Перед использованием подсветки убедитесь, что ваша коллекция правильно настроена.</p>
<p>В приведенном ниже примере создается коллекция, поддерживающая полнотекстовый поиск BM25 и запросы <code translate="no">TEXT_MATCH</code>, а затем в нее вставляются примеры документов.</p>
<p><details></p>
<p><summary><strong>Подготовьте коллекцию</strong></summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    LexicalHighlighter,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;highlighter_demo&quot;</span>

<span class="hljs-comment"># Clean up existing collection</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Define schema</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">2000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Required for BM25</span>
    enable_match=<span class="hljs-literal">True</span>,     <span class="hljs-comment"># Required for TEXT_MATCH</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="hljs-comment"># Add BM25 function</span>
schema.add_function(Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;sparse_vector&quot;</span>],
))

<span class="hljs-comment"># Create index</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>, <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>},
)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema, index_params=index_params)

<span class="hljs-comment"># Insert sample documents</span>
docs = [
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications &quot;</span>
    <span class="hljs-string">&quot;of every size from running a demo chatbot to building web-scale search.&quot;</span>,
]
client.insert(collection_name=COLLECTION_NAME, data=[{<span class="hljs-string">&quot;text&quot;</span>: t} <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> docs])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;✓ Collection created with <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents\n&quot;</span>)

<span class="hljs-comment"># Helper for search params</span>
SEARCH_PARAMS = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.0</span>}}

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># ✓ Collection created with 4 documents</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-1-Highlight-search-terms-in-BM25-full-text-search" class="common-anchor-header">Пример 1: Выделение поисковых терминов в полнотекстовом поиске BM25<button data-href="#Example-1-Highlight-search-terms-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом примере показано, как выделить условия поиска в полнотекстовом поиске BM25.</p>
<ul>
<li><p>В полнотекстовом поиске BM25 в качестве поискового термина используется <code translate="no">&quot;test&quot;</code>.</p></li>
<li><p>Выделитель обводит все вхождения слова "test" тегами <code translate="no">{</code> и <code translate="no">}</code>.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Highlight BM25 query terms</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ожидаемый результат</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{test} doc&#x27;]
[&#x27;{test} doc&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database that suits AI applications of every size from run&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-2-Highlight-query-terms-in-filtering" class="common-anchor-header">Пример 2: Выделение терминов запроса при фильтрации<button data-href="#Example-2-Highlight-query-terms-in-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом примере показано, как выделить термины, соответствующие фильтру <code translate="no">TEXT_MATCH</code>.</p>
<ul>
<li><p>В полнотекстовом поиске BM25 в качестве термина запроса используется <code translate="no">&quot;test&quot;</code>.</p></li>
<li><p>Параметр <code translate="no">queries</code> добавляет <code translate="no">&quot;my doc&quot;</code> в список выделения.</p></li>
<li><p>Выделитель обводит все совпадающие термины (<code translate="no">&quot;my&quot;</code>, <code translate="no">&quot;test&quot;</code>, <code translate="no">&quot;doc&quot;</code>) с <code translate="no">{</code> и <code translate="no">}</code></p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,   <span class="hljs-comment"># Also highlight BM25 term</span></span>
<span class="highlighted-comment-line">    highlight_query=[                     <span class="hljs-comment"># Additional TEXT_MATCH terms to highlight</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my doc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ожидаемый результат</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{my} first {test} {doc}&#x27;]
[&#x27;{my} second {test} {doc}&#x27;]
[&#x27;{my} first {test} {doc}. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{my} second {test} {doc}. Milvus is an open-source vector database that suits AI applications of every siz&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-3-Return-highlights-as-fragments" class="common-anchor-header">Пример 3: Возвращение фрагментов выделения<button data-href="#Example-3-Return-highlights-as-fragments" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом примере запрос ищет <code translate="no">&quot;Milvus&quot;</code> и возвращает фрагменты выделения со следующими настройками:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> сохраняет до 20 символов перед первым выделенным фрагментом в качестве ведущего контекста (по умолчанию 0).</p></li>
<li><p><code translate="no">fragment_size</code> ограничивает каждый фрагмент примерно 60 символами (по умолчанию 100).</p></li>
<li><p><code translate="no">num_of_fragments</code> ограничивает количество возвращаемых фрагментов на одно текстовое значение (по умолчанию 5).</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    fragment_offset=<span class="hljs-number">20</span>,  <span class="hljs-comment"># Keep 20 chars before match</span></span>
<span class="highlighted-comment-line">    fragment_size=<span class="hljs-number">60</span>,    <span class="hljs-comment"># Max ~60 chars per fragment</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;Milvus&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results[<span class="hljs-number">0</span>]):
    frags = hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}).get(<span class="hljs-string">&#x27;text&#x27;</span>, [])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Doc <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: <span class="hljs-subst">{frags}</span>&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ожидаемый результат</summary></p>
<pre><code translate="no" class="language-plaintext">Doc 1: [&#x27;my first test doc. {Milvus} is an open-source vector database &#x27;]
Doc 2: [&#x27;my second test doc. {Milvus} is an open-source vector database&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-4-Multi-query-highlighting" class="common-anchor-header">Пример 4: Выделение нескольких запросов<button data-href="#Example-4-Multi-query-highlighting" class="anchor-icon" translate="no">
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
    </button></h3><p>При поиске по нескольким запросам в полнотекстовом поиске BM25 результаты каждого запроса выделяются независимо. Результаты первого запроса содержат подсветку для его поискового запроса, результаты второго запроса содержат подсветку для его поискового запроса и так далее. Каждый запрос использует одну и ту же конфигурацию <code translate="no">highlighter</code>, но применяет ее независимо.</p>
<p>В примере ниже:</p>
<ul>
<li><p>Первый запрос выделяет <code translate="no">&quot;test&quot;</code> в своем наборе результатов.</p></li>
<li><p>Второй запрос выделяет <code translate="no">&quot;Milvus&quot;</code> в своем наборе результатов.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment"># Two queries</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> nq_idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results):
    query_term = [<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>][nq_idx]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Query &#x27;<span class="hljs-subst">{query_term}</span>&#x27;:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;    <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ожидаемый результат</summary></p>
<pre><code translate="no" class="language-plaintext">Query &#x27;test&#x27;:
  [&#x27;{test} doc&#x27;]
  [&#x27;{test} doc&#x27;]
Query &#x27;Milvus&#x27;:
  [&#x27;{Milvus} is an open-source vector database built for GenAI applications.&#x27;]
  [&#x27;{Milvus} is an open-source vector database that suits AI applications of every size from running a dem&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-5-Custom-HTML-tags" class="common-anchor-header">Пример 5: Пользовательские HTML-теги<button data-href="#Example-5-Custom-HTML-tags" class="anchor-icon" translate="no">
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
    </button></h3><p>Для подсветки можно использовать любые теги, например HTML-безопасные теги для веб-интерфейсов. Это удобно при отображении результатов поиска в браузере.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ожидаемый результат</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
