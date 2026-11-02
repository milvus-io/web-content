---
id: struct-array-operators.md
title: Операторы StructArray
summary: >-
  Операторы StructArray фильтруют сущности путем вычисления предикатов над
  скалярными подполями внутри поля StructArray. Используйте эту страницу в
  качестве справочника по синтаксису для оператора element_filter, семейства
  операторов MATCH_* и предикатов на уровне строк по путям StructArray.
---
<h1 id="StructArray-Operators" class="common-anchor-header">Операторы StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Операторы StructArray фильтруют сущности путем вычисления предикатов над скалярными подполями внутри поля StructArray. Используйте эту страницу в качестве справочника по синтаксису для оператора <code translate="no">element_filter</code>, семейства операторов <code translate="no">MATCH_*</code>, а также предикатов на уровне строк в путях StructArray.</p>
<p>Фильтрация StructArray включает два семейства операторов и набор предикатов на уровне строк для путей:</p>
<table>
<thead>
<tr><th>Форма фильтра</th><th>Основное назначение</th><th>Поведение результата</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Соответствие Элементы Struct, удовлетворяющие скалярному предикату.</td><td>При поиске на уровне элементов совпадения могут включать смещения элементов. При запросе на уровне строк или фильтрованном поиске форма результата зависит от API и полей вывода.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Выбор сущностей по количеству элементов Struct, удовлетворяющих скалярному предикату.</td><td>Фильтрация на уровне строк. Эти операторы сами по себе не возвращают смещения элементов.</td></tr>
<tr><td>Предикаты пути на уровне строк</td><td>Проверка положения одного элемента, подсчёт элементов Struct или проверка значений подполей по элементам без предиката « <code translate="no">$[...]</code> ».</td><td>Фильтрация на уровне строк. Эти предикаты не возвращают смещения элементов.</td></tr>
</tbody>
</table>
<p>Используйте скалярные подполя в операторах StructArray. Векторные подполя используются векторными путями поиска и не являются входными данными для скалярных предикатов.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Когда использовать тот или иной оператор<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Выбирайте оператор в зависимости от цели фильтрации:</p>
<table>
<thead>
<tr><th>Цель</th><th>Использование</th></tr>
</thead>
<tbody>
<tr><td>Ограничить векторный поиск на уровне элементов элементами, соответствующими скалярным условиям.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Сопоставить несколько скалярных условий в пределах одного элемента Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Вернуть только сущности, у которых хотя бы один элемент Struct удовлетворяет предикату.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Возвращать только сущности, у которых все элементы Struct удовлетворяют предикату.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Возвращать только сущности, в которых не менее, не более или ровно <code translate="no">N</code> элементов Struct удовлетворяют предикату.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> или <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Проверить элемент Struct в определенной позиции, например, в первом фрагменте.</td><td>Позиционный путь, например <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Фильтрация по количеству элементов Struct в сущности.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Проверить, содержит ли какой-либо элемент структуры значение подполя, без объединения условий для одного и того же элемента.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> или <code translate="no">array_contains_all</code> по пути к подполю, например <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">Пример данных<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведенных ниже примерах частичных сущностей показаны только поля <code translate="no">chunks</code> <strong>сущностей A</strong> и <strong>B</strong>. Они не являются полными данными вставки.</p>
<p><strong>Сущность A</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Сущность B</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Element-Filter" class="common-anchor-header">Фильтр элементов<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте <code translate="no">element_filter(structArrayField, predicate)</code> для сопоставления элементов Struct в поле StructArray.</p>
<p>Внутри предиката используйте <code translate="no">$[subfield]</code> для ссылки на скалярное подполе текущего элемента Struct.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Соответствуют как сущность A, так и сущность B: у всех семи показанных элементов для параметра « <code translate="no">section</code> » установлено значение « <code translate="no">&quot;index&quot;</code> ».</p>
<p>Когда внутри предиката используется несколько условий, все ссылки <code translate="no">$[subfield]</code> относятся к одному и тому же элементу Struct:</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>Соответствует только сущность B: все три её элемента удовлетворяют обоим условиям.</p>
<p>При сочетании предиката на уровне сущности с <code translate="no">element_filter</code> необходимо разместить <code translate="no">element_filter</code> в конце выражения:</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Пример с ` <code translate="no">category</code> ` иллюстрирует порядок выражений независимо от примера данных, в котором не определено ` <code translate="no">category</code>`.</p>
<p><code translate="no">element_filter</code> может встречаться в выражении фильтра только один раз. Не вкладывайте оператор « <code translate="no">element_filter</code> » или « <code translate="no">MATCH_*</code> » внутрь другого оператора « <code translate="no">element_filter</code> ».</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Операторы семейства сопоставлений<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте операторы <code translate="no">MATCH_*</code>, когда объект должен быть выбран на основе того, сколько элементов Struct удовлетворяют предикату. Эти операторы имеют следующие значения:</p>
<table>
<thead>
<tr><th>Оператор</th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>По крайней мере один элемент Struct удовлетворяет предикату.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Все элементы Struct удовлетворяют предикату.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>По крайней мере, <code translate="no">N</code> элементов Struct удовлетворяют предикату.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Не более чем <code translate="no">N</code> элементов структуры удовлетворяют предикату.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Ровно <code translate="no">N</code> элементов Struct удовлетворяют предикату.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> И « <code translate="no">element_filter</code> », и « » могут выражать, что хотя бы один элемент Struct удовлетворяет предикату. Используйте « <code translate="no">MATCH_ANY</code> », если вам нужна только фильтрация на уровне строк. Используйте « <code translate="no">element_filter</code> », если вам нужны ограничения на уровне элементов, например, для фильтрации элементов Struct, участвующих в векторном поиске на уровне элементов.</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> возвращает значение « <code translate="no">true</code> », если хотя бы один элемент в StructArray удовлетворяет предикату.</p>
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Соответствуют как сущность A, так и сущность B, поскольку каждая из них имеет по крайней мере один элемент, для которого <code translate="no">section</code> установлено в <code translate="no">&quot;index&quot;</code>.</p>
<p>Для пустого StructArray выражение <code translate="no">MATCH_ANY</code> возвращает <code translate="no">false</code>.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> даёт в результате значение <code translate="no">true</code>, если каждый элемент в StructArray удовлетворяет предикату.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>И сущность A, и сущность B соответствуют условию, поскольку для каждого показанного элемента <code translate="no">has_code</code> установлено в <code translate="no">true</code>.</p>
<p>Для пустого StructArray функция <code translate="no">MATCH_ALL</code> возвращает значение <code translate="no">true</code>.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> возвращает значение <code translate="no">true</code>, если количество элементов, удовлетворяющих предикату, больше или равно <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>Соответствует только сущность B: у сущности A нет подходящих элементов, а у сущности B их три.</p>
<p>Для <code translate="no">MATCH_LEAST</code> <code translate="no">threshold</code> должно быть положительным целым числом.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> возвращает значение <code translate="no">true</code>, если количество элементов, удовлетворяющих предикату, меньше или равно <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Ни одна из сущностей не соответствует условию: сущность A имеет четыре подходящих элемента, а сущность B — три.</p>
<p>Для <code translate="no">MATCH_MOST</code> значение <code translate="no">threshold</code> может быть равно нулю или быть положительным целым числом.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> возвращает значение <code translate="no">true</code>, если количество элементов, удовлетворяющих предикату, точно равно <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Ни одна из сущностей не соответствует условию, поскольку ни в одной из них нет элемента, у которого <code translate="no">section</code> установлено в <code translate="no">&quot;filter&quot;</code>.</p>
<p>Для <code translate="no">MATCH_EXACT</code> значение <code translate="no">threshold</code> может быть равно нулю или положительному целому числу.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Предикаты на уровне строк для путей StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Помимо <code translate="no">element_filter</code> и <code translate="no">MATCH_*</code>, обычное выражение фильтра может напрямую ссылаться на поле StructArray или одно из его скалярных подполей. Эти предикаты вычисляются на уровне сущности и не возвращают смещения элементов.</p>
<h3 id="Subfield-access" class="common-anchor-header">Доступ к подполям<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">Доступ к элементу Struct по позиции</h4><p>Используйте <code translate="no">structArrayField[index][subfield]</code> для ссылки на одно скалярное подполе элемента Struct по позиции с нулевым индексом. Сначала укажите позицию, а затем — имя подполя. Обратный путь <code translate="no">chunks[quality_score][0] &gt; 0.8</code> является недопустимым.</p>
<p>Например, проверьте показатель качества первого элемента:</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>Только сущность B соответствует этому выражению.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>Для сущностей A и B первый предикат раздела соответствует обеим сущностям, второй предикат оценки соответствует только сущности B, а строгий диапазон оценок не соответствует ни одной из них. Предикат <code translate="no">page</code> является общим примером; в примере данных не определено выражение <code translate="no">page</code>.</p>
<p>Позиционные пути поддерживают сравнение, предикаты « <code translate="no">in</code> », « <code translate="no">not in</code> » и цепочки диапазонов для скалярных подполей. Сущность не соответствует, если в поле StructArray отсутствует элемент в данной позиции.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">Операторы ARRAY<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">Подсчёт элементов Struct</h4><p>Используйте <code translate="no">array_length(structArrayField)</code> для фильтрации по количеству элементов Struct в объекте. Оператор <code translate="no">array_length</code>, примененный к пути подполя, например <code translate="no">array_length(chunks[section])</code>, возвращает то же количество, поскольку каждое подполе содержит одно значение на каждый элемент Struct.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>Предикаты подсчёта родительского поля соответствуют обоим сущностям для <code translate="no">&gt;= 3</code> и ни одной для <code translate="no">== 1</code>. Вы также можете подсчитывать значения по пути подполя:</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>Соответствует только сущность B, поскольку её подполе <code translate="no">quality_score</code> содержит три значения.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">Проверка значений подполей по всем элементам</h4><p>Например, проверьте, равен ли какой-либо показатель качества значению <code translate="no">0.74</code>:</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>Соответствует только сущность A.</p>
<p>Используйте <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> или <code translate="no">array_contains_all</code> в пути к скалярному подполю, чтобы проверить значения этого подполя во всех элементах Struct в сущности. Каждый путь к подполю оценивается отдельно, поэтому условия для разных подполей могут выполняться разными элементами Struct.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>Для приведённых в примере данных выражения <code translate="no">array_contains</code> и <code translate="no">array_contains_any</code> соответствуют обеим сущностям. Выражение <code translate="no">array_contains_all</code> не соответствует ни одной из них, поскольку ни одна из сущностей не содержит раздела <code translate="no">&quot;search&quot;</code>. Эти примеры не демонстрируют условия, выполняемые разными элементами по разным подполям.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> выбирает те же сущности, что и <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Используйте <code translate="no">MATCH_*</code> или <code translate="no">element_filter</code>, когда для одного и того же элемента Struct должны выполняться несколько условий, поскольку предикаты <code translate="no">$[...]</code> вычисляются для каждого элемента отдельно.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Проверка, является ли поле StructArray, допускающее значение null, равным null<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">IS NULL</code> или <code translate="no">IS NOT NULL</code> для поля StructArray, допускающего значение NULL, чтобы проверить значение всего поля. Значение NULL распространяется на всё поле StructArray, поэтому эти предикаты принимают только имя поля, а не путь к подполю.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>Информацию о применимости см. в разделе <a href="/docs/ru/structarray-limits.md#Nullable-and-dynamic-schema-limits">«Ограничения для нулевых и динамических схем</a>». Сущность A и сущность B имеют значения StructArray, не допускающие NULL.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Поддерживаемые предикаты<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Синтаксис « <code translate="no">$[...]</code> » представляет скалярное значение текущего элемента Struct. Поддержка предикатов зависит от типа скалярного подполя:</p>
<table>
<thead>
<tr><th>Тип подполя</th><th>Поддержка предикатов на уровне элемента</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Скалярные предикаты, такие как ` <code translate="no">$[has_code] == true</code> ` или ` <code translate="no">!($[has_code] == true)</code>`. Следует избегать использования простых булевых выражений, таких как ` <code translate="no">$[has_code]</code>`.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>сравнения, цепочки диапазонов, <code translate="no">in</code>, <code translate="no">not in</code>, арифметические выражения с <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> или <code translate="no">%</code>, за которыми следует сравнение, а также логические комбинации.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Сравнение, цепочка диапазонов, <code translate="no">in</code>, <code translate="no">not in</code>, арифметические выражения с <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> или <code translate="no">/</code>, за которыми следует сравнение, а также логические комбинации. Оператор <code translate="no">%</code> не поддерживается для подполей с плавающей запятой.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Сравнение строк, цепочки диапазонов, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> и логические комбинации.</td></tr>
<tr><td>Векторные подполя</td><td>Не поддерживаются в качестве входных данных для скалярных предикатов <code translate="no">$[...]</code>. Вместо этого используйте подполя векторов посредством поиска EmbeddingList или векторного поиска на уровне элементов.</td></tr>
</tbody>
</table>
<p>К выражениям предикатов применяются логические операторы, такие как <code translate="no">&amp;&amp;</code>, <code translate="no">||</code> и <code translate="no">!</code>. Например, вместо <code translate="no">!$[has_code]</code> напишите <code translate="no">!($[has_code] == true)</code>.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Неподдерживаемые предикаты<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Предикаты на уровне элементов <code translate="no">$[...]</code> не поддерживают:</p>
<ul>
<li><p>Функции сопоставления текста, такие как <code translate="no">text_match(field, &quot;...&quot;)</code> или <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>Синтаксис JSON-путей, оператор ` <code translate="no">exists</code> ` над JSON-путями или функции JSON, такие как ` <code translate="no">json_contains</code>`, ` <code translate="no">json_contains_all</code>` или ` <code translate="no">json_contains_any</code>`.</p></li>
<li><p>Функции контейнера массивов, такие как <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> или <code translate="no">array_length</code> на <code translate="no">$[subfield]</code>. Вместо этого используйте эти функции с путем к подполю, например <code translate="no">chunks[section]</code>, в предикате на уровне строки.</p></li>
<li><p><code translate="no">$[subfield] is null</code> или <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Функции геометрии / ГИС.</p></li>
<li><p>Выражения с временными метками tz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Векторные предикаты на уровне полей.</p></li>
<li><p>Вызовы общих функций фильтрации, за исключением случаев, когда конкретная сигнатура функции и путь выполнения явно поддерживают предикаты на уровне элементов StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Правила синтаксиса<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Соблюдайте следующие правила синтаксиса:</p>
<ul>
<li><p><code translate="no">MATCH_*</code> в именах операторов не учитывается регистр.</p></li>
<li><p>Используйте <code translate="no">$[subfield]</code> только внутри предикатов <code translate="no">element_filter</code> или <code translate="no">MATCH_*</code>. Например, выражение <code translate="no">array_length($[section])</code> будет отклонено.</p></li>
<li><p>Не используйте ` <code translate="no">$[subfield]</code> ` в качестве пути JSON, контейнера массива или ссылки на поле вектора.</p></li>
<li><p>Не вкладывайте <code translate="no">element_filter</code> или <code translate="no">MATCH_*</code> внутрь другого оператора StructArray.</p></li>
<li><p>Используйте именованные <code translate="no">threshold=N</code> для <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> и <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p>В позиционных путях указывайте позицию элемента перед именем подполя: <code translate="no">chunks[0][section]</code>, а не <code translate="no">chunks[section][0]</code>.</p></li>
<li><p>Используйте <code translate="no">IS NULL</code> и <code translate="no">IS NOT NULL</code> только для всего поля StructArray, например <code translate="no">chunks is null</code>. Не используйте их в пути к подполю, например <code translate="no">chunks[section]</code>, или в <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> применение к пустому StructArray возвращает <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> при применении к пустому StructArray возвращает <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">См. также<button data-href="#See-also" class="anchor-icon" translate="no">
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
    </button></h2><p>См. также:</p>
<ul>
<li><p><a href="/docs/ru/filtered-search-with-structarray.md">Фильтрованный поиск с использованием StructArray</a></p></li>
<li><p><a href="/docs/ru/basic-vector-search-with-structarray.md">Базовый векторный поиск с использованием StructArray</a></p></li>
<li><p><a href="/docs/ru/index-structarray-fields.md">Индексирование полей StructArray</a></p></li>
<li><p><a href="/docs/ru/structarray-limits.md">Ограничения StructArray</a></p></li>
</ul>
