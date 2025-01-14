---
id: json-operators.md
summary: >-
  Milvus поддерживает расширенные операторы для запросов и фильтрации полей
  JSON, что делает их идеальными для управления сложными структурированными
  данными. Эти операторы позволяют выполнять высокоэффективные запросы к
  документам JSON, позволяя вам извлекать сущности на основе определенных
  элементов, значений или условий в полях JSON. В этом разделе мы расскажем вам
  об использовании операторов JSON в Milvus и приведем практические примеры,
  иллюстрирующие их функциональность.
title: Операторы JSON
---
<h1 id="JSON-Operators​" class="common-anchor-header">Операторы JSON<button data-href="#JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus поддерживает расширенные операторы для запросов и фильтрации полей JSON, что делает их идеальными для управления сложными структурированными данными. Эти операторы позволяют выполнять высокоэффективные запросы к документам JSON, позволяя вам извлекать сущности на основе определенных элементов, значений или условий в полях JSON. В этом разделе мы расскажем вам об использовании специфических операторов JSON в Milvus и приведем практические примеры, иллюстрирующие их функциональность.</p>
<div class="alert note">
<p>JSON-поля не могут работать со сложными вложенными структурами и рассматривают все вложенные структуры как обычные строки. Поэтому при работе с полями JSON рекомендуется избегать слишком глубокой вложенности и следить за тем, чтобы структуры данных были как можно более плоскими для достижения оптимальной производительности.</p>
</div>
<h2 id="Available-JSON-Operators​" class="common-anchor-header">Доступные операторы JSON<button data-href="#Available-JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предоставляет несколько мощных операторов JSON, которые помогают фильтровать и запрашивать данные JSON, а именно.</p>
<ul>
<li><p><a href="#JSON_CONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: Фильтрует сущности, в поле которых встречается указанное выражение JSON.</p></li>
<li><p><a href="#JSON_CONTAINS_ALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: : Убеждается, что все элементы указанного JSON-выражения присутствуют в поле.</p></li>
<li><p><a href="#JSON_CONTAINS_ANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: : Фильтрует сущности, в которых хотя бы один член JSON-выражения присутствует в поле.</p></li>
</ul>
<p>Давайте рассмотрим эти операторы на примерах, чтобы увидеть, как они могут применяться в реальных сценариях.</p>
<h2 id="JSONCONTAINS​" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор <code translate="no">json_contains</code> проверяет, существует ли определенный элемент или подмассив в поле JSON. Он полезен, когда нужно убедиться, что массив или объект JSON содержит определенное значение.</p>
<p><strong>Пример</strong></p>
<p>Представьте, что у вас есть коллекция продуктов, каждый из которых имеет поле <code translate="no">tags</code>, содержащее JSON-массив строк, например <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Вы хотите отфильтровать товары, имеющие тег <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>В этом примере Milvus вернет все товары, в которых поле <code translate="no">tags</code> содержит элемент <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL​" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор <code translate="no">json_contains_all</code> гарантирует, что все элементы указанного JSON-выражения присутствуют в целевом поле. Он особенно полезен, когда нужно сопоставить несколько значений в массиве JSON.</p>
<p><strong>Пример</strong></p>
<p>Продолжая сценарий с тегами продуктов, если вы хотите найти все продукты, имеющие теги <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, и <code translate="no">&quot;new&quot;</code>, вы можете использовать оператор <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Этот запрос вернет все товары, в которых массив <code translate="no">tags</code> содержит все три указанных элемента: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, и <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCOTAINSANY​" class="common-anchor-header">JSON_COTAINS_ANY<button data-href="#JSONCOTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор <code translate="no">json_contains_any</code> фильтрует сущности, в которых хотя бы один член выражения JSON существует в поле. Это полезно, когда нужно подобрать сущности по любому из нескольких возможных значений.</p>
<p><strong>Пример</strong></p>
<p>Допустим, вы хотите отфильтровать продукты, имеющие хотя бы один из тегов <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code> или <code translate="no">&quot;new&quot;</code>. Для этого можно использовать оператор <code translate="no">json_contains_any</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>В этом случае Milvus вернет все товары, у которых есть хотя бы один из тегов в списке <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Даже если у товара есть только один из этих тегов, он будет включен в результат.</p>
