---
id: array-operators.md
title: Операторы ARRAY
summary: >-
  Milvus предоставляет мощные операторы для работы с полями массивов, что
  позволяет фильтровать и извлекать сущности на основе содержимого массивов.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Операторы ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет мощные операторы для запросов к полям массивов, позволяющие фильтровать и извлекать сущности на основе содержимого массивов.</p>
<div class="alert note">
<p>Все элементы массива должны быть одного типа, а вложенные структуры внутри массивов обрабатываются как простые строки. Поэтому при работе с полями ARRAY рекомендуется избегать чрезмерно глубокого вложения и обеспечивать максимально плоскую структуру данных для оптимальной производительности.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Доступные операторы ARRAY<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Операторы ARRAY позволяют осуществлять детализированный запрос по полям массивов в Milvus. К этим операторам относятся:</p>
<ul>
<li><p><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: проверяет, существует ли конкретный элемент в поле типа ARRAY.</p></li>
<li><p><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: гарантирует, что все элементы указанного списка присутствуют в поле массива.</p></li>
<li><p><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: проверяет, присутствует ли в поле массива хотя бы один из элементов из указанного списка.</p></li>
<li><p><a href="/docs/ru/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: возвращает количество элементов в поле массива и может сочетаться с операторами сравнения для фильтрации.</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор ` <code translate="no">ARRAY_CONTAINS</code> ` проверяет, присутствует ли конкретный элемент в поле массива. Он полезен, когда нужно найти сущности, в массиве которых присутствует заданный элемент.</p>
<p><strong>Пример</strong></p>
<p>Предположим, у вас есть поле-массив <code translate="no">history_temperatures</code>, содержащее зафиксированные минимальные температуры за разные годы. Чтобы найти все сущности, в массиве которых присутствует значение <code translate="no">23</code>, можно использовать следующее выражение фильтра:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, в массиве которых <code translate="no">history_temperatures</code> содержится значение <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор <code translate="no">ARRAY_CONTAINS_ALL</code> гарантирует, что все элементы указанного списка присутствуют в поле массива. Этот оператор полезен, когда требуется найти сущности, содержащие несколько значений в массиве.</p>
<p><strong>Пример</strong></p>
<p>Если необходимо найти все сущности, в массиве которых <code translate="no">history_temperatures</code> содержатся как <code translate="no">23</code>, так и <code translate="no">24</code>, можно использовать:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, в массиве которых <code translate="no">history_temperatures</code> содержатся оба указанных значения.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор ` <code translate="no">ARRAY_CONTAINS_ANY</code> ` проверяет, присутствует ли в поле массива хотя бы один из элементов указанного списка. Это полезно, когда требуется найти сущности, содержащие хотя бы одно из указанных значений в массиве.</p>
<p><strong>Пример</strong></p>
<p>Чтобы найти все сущности, в массиве которых <code translate="no">history_temperatures</code> содержится либо <code translate="no">23</code>, либо <code translate="no">24</code>, можно использовать:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, в массиве которых <code translate="no">history_temperatures</code> содержится хотя бы одно из значений: <code translate="no">23</code> или <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>Функция <code translate="no">ARRAY_LENGTH</code> возвращает длину (количество элементов) массивного поля. Она принимает ровно один параметр: идентификатор массивного поля.</p>
<p><strong>Пример</strong></p>
<p>Чтобы найти все сущности, у которых массив <code translate="no">history_temperatures</code> содержит менее 10 элементов:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это вернёт все сущности, у которых массив <code translate="no">history_temperatures</code> содержит менее 10 элементов.</p>
