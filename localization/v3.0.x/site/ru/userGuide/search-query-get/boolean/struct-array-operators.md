---
id: struct-array-operators.md
title: Операторы StructArray
summary: >-
  Операторы StructArray фильтруют объекты путем вычисления предикатов над
  скалярными подполями внутри поля StructArray. Используйте эту страницу в
  качестве справочника по синтаксису для оператора element_filter и семейства
  операторов MATCH_*.
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
    </button></h1><p>Операторы StructArray фильтруют сущности путем вычисления предикатов над скалярными подполями внутри поля StructArray. Используйте эту страницу в качестве справочника по синтаксису операторов « <code translate="no">element_filter</code> » и семейства операторов « <code translate="no">MATCH_*</code> ».</p>
<p>Фильтрация StructArray включает два семейства операторов:</p>
<table>
<thead>
<tr><th>Семейство операторов</th><th>Основное назначение</th><th>Поведение результата</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Сопоставление элементов Struct, удовлетворяющих скалярному предикату.</td><td>При поиске на уровне элементов совпадения могут включать смещения элементов. При запросе на уровне строк или фильтрованном поиске форма результата зависит от API и полей вывода.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Выбор сущностей по количеству элементов Struct, удовлетворяющих скалярному предикату.</td><td>Фильтрация на уровне строк. Эти операторы сами по себе не возвращают смещения элементов.</td></tr>
</tbody>
</table>
<p>Используйте скалярные подполя в операторах StructArray. Векторные подполя используются векторными путями поиска и не являются входными данными для скалярных предикатов.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Когда использовать какой оператор<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Цель</th><th>Использование</th></tr>
</thead>
<tbody>
<tr><td>Ограничить векторный поиск на уровне элементов элементами, соответствующими скалярным условиям.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Сопоставить несколько скалярных условий в пределах одного и того же элемента Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Вернуть только сущности, у которых хотя бы один элемент Struct удовлетворяет предикату.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Возвращать только сущности, у которых все элементы Struct удовлетворяют предикату.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Возвращать только сущности, в которых не менее, не более или ровно <code translate="no">N</code> элементов Struct удовлетворяют предикату.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> или <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Фильтр по элементам<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте ` <code translate="no">element_filter(structArrayField, predicate)</code> ` для сопоставления элементов Struct в поле StructArray.</p>
<p>Внутри предиката используйте <code translate="no">$[subfield]</code> для ссылки на скалярное подполе текущего элемента Struct.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Если внутри предиката используется несколько условий, все ссылки на ` <code translate="no">$[subfield]</code> ` относятся к одному и тому же элементу структуры:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>При сочетании предиката на уровне сущности с <code translate="no">element_filter</code> поместите <code translate="no">element_filter</code> в конец выражения:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> может встречаться в выражении фильтра только один раз. Не вкладывайте <code translate="no">element_filter</code> или <code translate="no">MATCH_*</code> внутрь другого <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Операторы семейства соответствий<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте операторы <code translate="no">MATCH_*</code>, когда объект должен быть выбран на основе того, сколько элементов Struct удовлетворяют предикату.</p>
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
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Для пустого StructArray выражение « <code translate="no">MATCH_ANY</code> » возвращает « <code translate="no">false</code> ».</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> возвращает значение <code translate="no">true</code>, если каждый элемент в StructArray удовлетворяет предикату.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Для пустого StructArray выражение « <code translate="no">MATCH_ALL</code> » возвращает « <code translate="no">true</code> ».</p>
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
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Для <code translate="no">MATCH_LEAST</code> <code translate="no">threshold</code>  должно быть положительным целым числом.</p>
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
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
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
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Для <code translate="no">MATCH_EXACT</code> значение <code translate="no">threshold</code> может быть равно нулю или представлять собой положительное целое число.</p>
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
    </button></h2><p>Синтаксис <code translate="no">$[...]</code> представляет скалярное значение текущего элемента структуры. Поддержка предикатов зависит от типа скалярного подполя.</p>
<table>
<thead>
<tr><th>Тип подполя</th><th>Поддержка предикатов на уровне элементов</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Скалярные предикаты, такие как <code translate="no">$[has_code] == true</code> или <code translate="no">!($[has_code] == true)</code>. Следует избегать использования простых булевых выражений, таких как <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>сравнения, цепочки диапазонов, <code translate="no">in</code>, <code translate="no">not in</code>, арифметические выражения с <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> или <code translate="no">%</code>, за которыми следует сравнение, а также логические комбинации.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Сравнение, цепочка диапазонов, <code translate="no">in</code>, <code translate="no">not in</code>, арифметические выражения с <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> или <code translate="no">/</code>, за которыми следует сравнение, а также логические комбинации. Оператор <code translate="no">%</code> не поддерживается для подполей с плавающей запятой.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Сравнение строк, цепочки диапазонов, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> и логические комбинации.</td></tr>
<tr><td>Векторные подполя</td><td>Не поддерживаются в качестве входных данных для скалярных предикатов <code translate="no">$[...]</code>. Вместо этого используйте подполя векторов посредством поиска EmbeddingList или векторного поиска на уровне элементов.</td></tr>
</tbody>
</table>
<p>К выражениям предикатов применяются логические операторы, такие как <code translate="no">&amp;&amp;</code>, <code translate="no">\|\|</code> и <code translate="no">!</code>. Например, вместо <code translate="no">!$[has_code]</code> напишите <code translate="no">!($[has_code] == true)</code>.</p>
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
<li><p>Синтаксис JSON-путей, оператор <code translate="no">exists</code>, применяемый к JSON-путям, или функции JSON, такие как <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code> или <code translate="no">json_contains_any</code>.</p></li>
<li><p>Функции контейнера массивов, такие как <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> или <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> или <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Функции геометрии / ГИС.</p></li>
<li><p>Выражения с временными метками tz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Векторные предикаты на уровне полей.</p></li>
<li><p>Вызовы общих функций фильтрации, если только конкретная сигнатура функции и путь выполнения явно не поддерживают предикаты на уровне элементов StructArray.</p></li>
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
    </button></h2><ul>
<li><p><code translate="no">MATCH_*</code> В именах операторов не учитывается регистр.</p></li>
<li><p>Используйте <code translate="no">$[subfield]</code> только внутри предикатов <code translate="no">element_filter</code> или <code translate="no">MATCH_*</code>.</p></li>
<li><p>Не используйте <code translate="no">$[subfield]</code> в качестве пути JSON, контейнера массива или ссылки на поле вектора.</p></li>
<li><p>Не вкладывайте <code translate="no">element_filter</code> или <code translate="no">MATCH_*</code> внутрь другого оператора StructArray.</p></li>
<li><p>Используйте именованные <code translate="no">threshold=N</code> для <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> и <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> при применении к пустому StructArray возвращает <code translate="no">false</code>.</p></li>
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
    </button></h2><ul>
<li><p><a href="/docs/ru/filtered-search-with-structarray.md">Фильтрованный поиск с помощью StructArray</a></p></li>
<li><p><a href="/docs/ru/basic-vector-search-with-structarray.md">Базовый векторный поиск с использованием StructArray</a></p></li>
<li><p><a href="/docs/ru/index-structarray-fields.md">Индексирование полей StructArray</a></p></li>
<li><p><a href="/docs/ru/structarray-limits.md">Ограничения StructArray</a></p></li>
</ul>
