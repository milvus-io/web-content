---
id: filtering-templating.md
title: Шаблонизация фильтров
summary: >-
  В Milvus сложные выражения фильтров, содержащие множество элементов, особенно
  те, в которых используются символы, не входящие в кодировку ASCII, такие как
  символы CJK, могут существенно влиять на производительность запросов. Для
  решения этой проблемы в Milvus внедрен механизм шаблонизации выражений
  фильтров, призванный повысить эффективность за счет сокращения времени,
  затрачиваемого на разбор сложных выражений. На этой странице рассказывается об
  использовании шаблонизации выражений фильтров в операциях поиска, запроса и
  удаления.
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
    </button></h1><p>В Milvus сложные выражения фильтров, содержащие множество элементов, особенно те, в которых используются не-ASCII-символы, такие как символы CJK, могут существенно влиять на производительность запросов. Для решения этой проблемы в Milvus введен механизм шаблонизации выражений фильтров, предназначенный для повышения эффективности за счет сокращения времени, затрачиваемого на разбор сложных выражений. На этой странице объясняется использование шаблонизации выражений фильтров в операциях поиска, запроса и удаления.</p>
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
    </button></h2><p>Шаблонизация выражений фильтрации позволяет создавать выражения фильтрации с заполнителями, которые могут динамически заменяться значениями во время выполнения запроса. Используя шаблонизацию, вы избегаете встраивания больших массивов или сложных выражений непосредственно в фильтр, сокращая время разбора и повышая производительность запросов.</p>
<p>Предположим, у вас есть выражение фильтра, включающее два поля: <code translate="no">age</code> и <code translate="no">city</code>, и вы хотите найти всех людей, чей возраст превышает 25 лет и которые проживают либо в «北京» (Пекин), либо в «上海» (Шанхай). Вместо того чтобы напрямую вставлять значения в выражение фильтра, вы можете использовать шаблон:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Здесь <code translate="no">{age}</code> и <code translate="no">{city}</code> являются заполнителями, которые при выполнении запроса будут заменены фактическими значениями из <code translate="no">filter_params</code>.</p>
<p>Использование шаблонов выражений фильтра в Milvus имеет несколько ключевых преимуществ:</p>
<ul>
<li><p><strong>Сокращение времени разбора</strong>: благодаря замене больших или сложных выражений фильтра на заполнители система тратит меньше времени на разбор и обработку фильтра.</p></li>
<li><p><strong>Повышение производительности запросов</strong>: благодаря снижению накладных расходов на синтаксический анализ производительность запросов повышается, что приводит к увеличению количества запросов в секунду (QPS) и сокращению времени отклика.</p></li>
<li><p><strong>Масштабируемость</strong>: по мере роста ваших наборов данных и усложнения выражений фильтра шаблонизация гарантирует, что производительность останется эффективной и масштабируемой.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Операции поиска<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Для операций поиска в Milvus выражение <code translate="no">filter</code> используется для определения условия фильтрации, а параметр <code translate="no">filter_params</code> — для указания значений заполнителей. Словарь <code translate="no">filter_params</code> содержит динамические значения, которые Milvus будет использовать для подстановки в выражение фильтра.</p>
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
<p>В данном примере при выполнении поиска Milvus динамически заменит <code translate="no">{age}</code> на <code translate="no">25</code>, а <code translate="no">{city}</code> — на <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code>.</p>
<h2 id="Query-Operations" class="common-anchor-header">Операции с запросами<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Тот же механизм шаблонизации можно применять к операциям запросов в Milvus. В функции <code translate="no">query</code> вы определяете выражение фильтра и используете <code translate="no">filter_params</code> для указания значений, подлежащих замене.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Используя <code translate="no">filter_params</code>, Milvus эффективно обрабатывает динамическую вставку значений, повышая скорость выполнения запросов.</p>
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
    </button></h2><p>Шаблонизацию выражений фильтра можно использовать и в операциях удаления. Как и в случае с поиском и запросами, выражение <code translate="no">filter</code> определяет условия, а <code translate="no">filter_params</code> предоставляет динамические значения для заполнителей.</p>
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
    </button></h2><p>Шаблонизация выражений фильтрации — важный инструмент для оптимизации производительности запросов в Milvus. Используя заполнители и словарь <code translate="no">filter_params</code>, вы можете значительно сократить время, затрачиваемое на разбор сложных выражений фильтрации. Это приводит к ускорению выполнения запросов и повышению общей производительности.</p>
