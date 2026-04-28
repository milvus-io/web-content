---
id: filtering-templating.md
title: Шаблонизация фильтров
summary: >-
  В Milvus сложные выражения фильтров с большим количеством элементов, особенно
  те, в которых используются символы не ASCII, такие как символы CJK, могут
  значительно повлиять на производительность запроса. Для решения этой проблемы
  в Milvus внедрен механизм шаблонизации выражений фильтров, предназначенный для
  повышения эффективности за счет сокращения времени, затрачиваемого на разбор
  сложных выражений. На этой странице рассказывается об использовании шаблонов
  выражений фильтров в операциях поиска, запроса и удаления.
---
<h1 id="Filter-Templating" class="common-anchor-header">Шаблонизация фильтров<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>В Milvus сложные выражения фильтров с большим количеством элементов, особенно те, в которых используются символы не ASCII, например CJK, могут существенно повлиять на производительность запросов. Для решения этой проблемы в Milvus внедрен механизм шаблонизации выражений фильтров, предназначенный для повышения эффективности за счет сокращения времени, затрачиваемого на разбор сложных выражений. На этой странице рассказывается об использовании шаблонов выражений фильтров в операциях поиска, запроса и удаления.</p>
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
    </button></h2><p>Шаблонизация выражений фильтра позволяет создавать выражения фильтра с заполнителями, которые могут динамически подставляться в значения во время выполнения запроса. Использование шаблонов позволяет избежать встраивания больших массивов или сложных выражений непосредственно в фильтр, что сокращает время разбора и повышает производительность запроса.</p>
<p>Допустим, у вас есть выражение фильтра, включающее два поля <code translate="no">age</code> и <code translate="no">city</code>, и вы хотите найти всех людей, чей возраст больше 25 лет и которые живут либо в "北京" (Пекин), либо в "上海" (Шанхай). Вместо того чтобы напрямую вставлять значения в выражение фильтра, можно использовать шаблон:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Здесь <code translate="no">{age}</code> и <code translate="no">{city}</code> - это заполнители, которые будут заменены реальными значениями в <code translate="no">filter_params</code> при выполнении запроса.</p>
<p>Использование шаблонов выражений фильтров в Milvus имеет несколько ключевых преимуществ:</p>
<ul>
<li><p><strong>Сокращение времени разбора</strong>: заменяя большие или сложные выражения фильтра на шаблоны, система тратит меньше времени на разбор и обработку фильтра.</p></li>
<li><p><strong>Повышение производительности запросов</strong>: Благодаря уменьшению накладных расходов на парсинг повышается производительность запросов, что приводит к повышению QPS и ускорению времени отклика.</p></li>
<li><p><strong>Масштабируемость</strong>: По мере роста наборов данных и усложнения выражений фильтров шаблонизация обеспечивает эффективность и масштабируемость производительности.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Поисковые операции<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Для операций поиска в Milvus выражение <code translate="no">filter</code> используется для определения условия фильтрации, а параметр <code translate="no">filter_params</code> - для задания значений для заполнителей. Словарь <code translate="no">filter_params</code> содержит динамические значения, которые Milvus будет использовать для подстановки в выражение фильтра.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>В этом примере Milvus динамически заменит <code translate="no">{age}</code> на <code translate="no">25</code> и <code translate="no">{city}</code> на <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> при выполнении поиска.</p>
<h2 id="Query-Operations" class="common-anchor-header">Операции запроса<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Тот же механизм шаблонизации может быть применен к операциям запроса в Milvus. В функции <code translate="no">query</code> вы определяете выражение фильтрации и используете <code translate="no">filter_params</code> для указания значений для подстановки.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Используя <code translate="no">filter_params</code>, Milvus эффективно обрабатывает динамическую вставку значений, повышая скорость выполнения запроса.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Операции удаления<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы также можете использовать шаблонизацию выражений фильтра в операциях удаления. Как и в поиске и запросе, выражение <code translate="no">filter</code> определяет условия, а <code translate="no">filter_params</code> предоставляет динамические значения для заполнителей.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Такой подход повышает производительность операций удаления, особенно при работе со сложными условиями фильтрации.</p>
<h2 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Шаблонирование выражений фильтра является важным инструментом для оптимизации производительности запросов в Milvus. Используя заполнители и словарь <code translate="no">filter_params</code>, вы можете значительно сократить время, затрачиваемое на разбор сложных выражений фильтра. Это приводит к ускорению выполнения запросов и повышению общей производительности.</p>
