---
id: elasticsearch-queries-to-milvus.md
title: Запросы Elasticsearch к Milvus
summary: >-
  Elasticsearch, построенный на базе Apache Lucene, является ведущей поисковой
  системой с открытым исходным кодом. Однако в современных приложениях
  искусственного интеллекта он сталкивается с такими проблемами, как высокая
  стоимость обновления, низкая производительность в реальном времени,
  неэффективное управление шардами, не облачный нативный дизайн и чрезмерные
  требования к ресурсам. Milvus, являясь облачной векторной базой данных, решает
  эти проблемы за счет разделения хранения и вычислений, эффективного
  индексирования для высокоразмерных данных и бесшовной интеграции с
  современными инфраструктурами. Она обеспечивает превосходную
  производительность и масштабируемость для рабочих нагрузок ИИ.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Запросы Elasticsearch к Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, построенный на базе Apache Lucene, является ведущей поисковой системой с открытым исходным кодом. Однако в современных приложениях искусственного интеллекта он сталкивается с такими проблемами, как высокая стоимость обновления, низкая производительность в реальном времени, неэффективное управление шардами, не облачный нативный дизайн и чрезмерные требования к ресурсам. Milvus, являясь облачной векторной базой данных, решает эти проблемы за счет разделения хранения и вычислений, эффективного индексирования для высокоразмерных данных и бесшовной интеграции с современными инфраструктурами. Она обеспечивает превосходную производительность и масштабируемость для рабочих нагрузок ИИ.</p>
<p>Цель этой статьи - облегчить миграцию вашей кодовой базы с Elasticsearch на Milvus, предоставив различные примеры преобразования запросов между ними.</p>
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
    </button></h2><p>В Elasticsearch операции в контексте запроса генерируют оценки релевантности, а операции в контексте фильтра - нет. Аналогично, поиск в Milvus выдает оценки сходства, а его фильтроподобные запросы - нет. При переносе кодовой базы с Elasticsearch на Milvus ключевым принципом является преобразование полей, используемых в контексте запроса Elasticsearch, в векторные поля, чтобы обеспечить генерацию оценок сходства.</p>
<p>В таблице ниже приведены некоторые шаблоны запросов Elasticsearch и их эквиваленты в Milvus.</p>
<table>
   <tr>
     <th><p>Запросы Elasticsearch</p></th>
     <th><p>Эквиваленты в Milvus</p></th>
     <th><p>Примечания</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Полнотекстовые запросы</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Match-query">Запрос на соответствие</a></p></td>
     <td><p>Полнотекстовый поиск</p></td>
     <td><p>Оба предоставляют схожие возможности.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Запросы на уровне терминов</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#IDs">Идентификаторы</a></p></td>
     <td><p><code translate="no">in</code> оператор</p></td>
     <td rowspan="6"><p>Оба предоставляют одинаковый или похожий набор возможностей при использовании этих запросов Elasticsearch в контексте фильтра.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Prefix-query">Префиксный запрос</a></p></td>
     <td><p><code translate="no">like</code> оператор</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Range-query">Запрос диапазона</a></p></td>
     <td><p>Операторы сравнения, такие как <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, и <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Term-query">Запрос термина</a></p></td>
     <td><p>Операторы сравнения типа <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Terms-query">Запрос терминов</a></p></td>
     <td><p><code translate="no">in</code> оператор</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Wildcard-query">Дикий символ запроса</a></p></td>
     <td><p><code translate="no">like</code> оператор</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Boolean-query">Булевский запрос</a></p></td>
     <td><p>Логические операторы типа <code translate="no">AND</code></p></td>
     <td><p>Оба оператора предоставляют схожие возможности при использовании в контексте фильтра.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Векторные запросы</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Knn-query">kNN-запрос</a></p></td>
     <td><p>Поиск</p></td>
     <td><p>Milvus предоставляет более продвинутые возможности векторного поиска.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Взаимное слияние рангов</a></p></td>
     <td><p>Гибридный поиск</p></td>
     <td><p>Milvus поддерживает несколько стратегий ранжирования.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Полнотекстовые запросы<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>В Elasticsearch полнотекстовые запросы позволяют искать в анализируемых текстовых полях, например в теле письма. Строка запроса обрабатывается с помощью того же анализатора, который был применен к полю во время индексирования.</p>
<h3 id="Match-query" class="common-anchor-header">Запрос на совпадение</h3><p>В Elasticsearch запрос на совпадение возвращает документы, которые соответствуют заданному тексту, числу, дате или логическому значению. Предоставленный текст анализируется перед поиском.</p>
<p>Ниже приведен пример поискового запроса Elasticsearch с запросом на совпадение.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus предоставляет такую же возможность с помощью функции полнотекстового поиска. Вы можете преобразовать приведенный выше запрос Elasticsearch в Milvus следующим образом:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше примере <code translate="no">message_sparse</code> - это разреженное векторное поле, полученное из поля VarChar с именем <code translate="no">message</code>. Milvus использует модель встраивания BM25 для преобразования значений в поле <code translate="no">message</code> в разреженные векторные вложения и сохраняет их в поле <code translate="no">message_sparse</code>. Получив поисковый запрос, Milvus встраивает полезную нагрузку запроса в обычный текст, используя ту же модель BM25, выполняет поиск по разреженному вектору и возвращает поля <code translate="no">id</code> и <code translate="no">message</code>, указанные в параметре <code translate="no">output_fields</code>, вместе с соответствующими оценками сходства.</p>
<p>Чтобы использовать эту функциональность, необходимо включить анализатор для поля <code translate="no">message</code> и определить функцию для получения из него поля <code translate="no">message_sparse</code>. Подробные инструкции по включению анализатора и созданию производной функции в Milvus см. в разделе <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Запросы на уровне терминов<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>В Elasticsearch запросы на уровне терминов используются для поиска документов на основе точных значений в структурированных данных, таких как диапазоны дат, IP-адреса, цены или идентификаторы продуктов. В этом разделе описаны возможные эквиваленты некоторых запросов уровня термина Elasticsearch в Milvus. Все примеры в этом разделе адаптированы для работы в контексте фильтра, чтобы соответствовать возможностям Milvus.</p>
<h3 id="IDs" class="common-anchor-header">Идентификаторы</h3><p>В Elasticsearch вы можете найти документы по их идентификаторам в контексте фильтра следующим образом:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>В Milvus вы также можете находить сущности по их идентификаторам следующим образом:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">этой странице</a>. Подробнее о запросах query и get, а также о выражениях фильтрации в Milvus читайте в разделе <a href="/docs/ru/get-and-scalar-query.md">Запросы</a> и <a href="/docs/ru/filtering">фильтрация</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Префиксный запрос</h3><p>В Elasticsearch вы можете найти документы, содержащие определенный префикс в указанном поле в контексте фильтра следующим образом:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>В Milvus вы можете найти сущности, значения которых начинаются с указанного префикса, следующим образом:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">этой странице</a>. Подробнее об операторе <code translate="no">like</code> в Milvus читайте в разделе <a href="/docs/ru/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Использование </a><code translate="no">LIKE</code><a href="/docs/ru/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> для поиска по шаблону</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Запрос диапазона</h3><p>В Elasticsearch вы можете найти документы, содержащие термины в заданном диапазоне, следующим образом:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>В Milvus вы можете найти сущности, значения которых в определенном поле находятся в заданном диапазоне следующим образом:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">этой странице</a>. Подробнее об операторах сравнения в Milvus см. в разделе <a href="/docs/ru/basic-operators.md#Comparison-operators">Операторы сравнения</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Запрос термина</h3><p>В Elasticsearch вы можете найти документы, содержащие <strong>точный</strong> термин в указанном поле, как показано ниже:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>В Milvus вы можете найти сущности, значения которых в указанном поле в точности соответствуют указанному термину, следующим образом:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">этой странице</a>. Подробнее об операторах сравнения в Milvus см. в разделе <a href="/docs/ru/basic-operators.md#Comparison-operators">Операторы сравнения</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Запрос терминов</h3><p>В Elasticsearch можно найти документы, содержащие один или несколько <strong>точных</strong> терминов в указанном поле, как показано ниже:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>В Milvus нет полного эквивалента этому запросу. Однако вы можете найти сущности, значения которых в указанном поле являются одним из указанных терминов, следующим образом:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">этой странице</a>. Подробнее об операторах диапазона в Milvus читайте в разделе <a href="/docs/ru/basic-operators.md#Range-operators">Операторы диапазона</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Запрос с подстановочным знаком</h3><p>В Elasticsearch вы можете найти документы, содержащие термины, соответствующие шаблону с подстановочным знаком, как показано ниже:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus не поддерживает подстановочные знаки в условиях фильтрации. Однако вы можете использовать оператор <code translate="no">like</code> для достижения аналогичного эффекта, как показано ниже:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">этой странице</a>. Подробнее об операторах диапазона в Milvus читайте в разделе <a href="/docs/ru/basic-operators.md#Range-operators">Операторы диапазона</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Булевский запрос<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>В Elasticsearch булевый запрос - это запрос, который подбирает документы, соответствующие булевым комбинациям других запросов.</p>
<p>Следующий пример адаптирован из примера в документации Elasticsearch на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">этой странице</a>. Запрос возвращает пользователей с <code translate="no">kimchy</code> в их именах с тегом <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>В Milvus вы можете сделать то же самое следующим образом:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше примере предполагается, что в целевой коллекции есть поле <code translate="no">user</code> типа <strong>VarChar</strong> и поле <code translate="no">tags</code> типа <strong>Array</strong>. Запрос вернет пользователей с <code translate="no">kimchy</code> в имени с тегом <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">Векторные запросы<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Векторные запросы в Elasticsearch - это специализированные запросы, которые работают с векторными полями для эффективного выполнения семантического поиска.</p>
<h3 id="Knn-query" class="common-anchor-header">Knn-запрос</h3><p>Elasticsearch поддерживает как приблизительные kNN-запросы, так и точные, грубые kNN-запросы. В любом случае можно найти <em>k</em> ближайших векторов к вектору запроса, измеряемых метрикой сходства, следующим образом:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus, как специализированная база данных векторов, использует типы индексов для оптимизации поиска векторов. Как правило, для высокоразмерных векторных данных приоритетным является поиск ближайших соседей (ANN). Хотя грубый kNN-поиск с типом индекса FLAT дает точные результаты, он требует много времени и ресурсов. В отличие от этого, поиск ANN с использованием AUTOINDEX или других типов индексов обеспечивает баланс между скоростью и точностью, предлагая значительно более быструю и ресурсоэффективную производительность, чем kNN.</p>
<p>Аналогичный векторный запрос в Mlivus выглядит следующим образом:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Пример Elasticsearch можно найти на <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">этой странице</a>. Подробнее о поиске с помощью ANN в Milvus читайте в статье <a href="/docs/ru/single-vector-search.md">Базовый поиск с помощью ANN</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Слияние реципрокных рангов</h3><p>Elasticsearch предоставляет функцию Reciprocal Rank Fusion (RRF) для объединения нескольких наборов результатов с различными показателями релевантности в один ранжированный набор результатов.</p>
<p>Следующий пример демонстрирует объединение традиционного поиска по терминам с векторным поиском по k-nearest neighbors (kNN) для улучшения релевантности поиска:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>В этом примере RRF объединяет результаты двух ретриверов:</p>
<ul>
<li><p>Стандартный поиск документов, содержащих термин <code translate="no">&quot;shoes&quot;</code> в поле <code translate="no">text</code>.</p></li>
<li><p>kNN-поиск по полю <code translate="no">vector</code> с использованием предоставленного вектора запроса.</p></li>
</ul>
<p>Каждый ретривер вносит до 50 лучших совпадений, которые повторно ранжируются RRF, и в итоге возвращается 10 лучших результатов.</p>
<p>В Milvus можно добиться аналогичного гибридного поиска, объединив поиск по нескольким векторным полям, применив стратегию ранжирования и получив топ-K результатов из объединенного списка. Milvus поддерживает стратегии RRF и взвешенного реранкинга. Более подробную информацию см. в разделе <a href="/docs/ru/reranking.md">"Реранжирование</a>".</p>
<p>Ниже приведен нестрогий эквивалент приведенного выше примера Elasticsearch в Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Этот пример демонстрирует гибридный поиск в Milvus, который сочетает в себе:</p>
<ol>
<li><p><strong>Плотный векторный поиск</strong>: Использование метрики внутреннего произведения (IP) с <code translate="no">nprobe</code>, установленным на 10, для приблизительного поиска ближайших соседей (ANN) на поле <code translate="no">vector</code>.</p></li>
<li><p><strong>Поиск по разреженному вектору</strong>: Использование метрики сходства BM25 с параметром <code translate="no">drop_ratio_search</code>, равным 0,2, на поле <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>Результаты этих поисков выполняются отдельно, объединяются и ранжируются с помощью ранжировщика Reciprocal Rank Fusion (RRF). Гибридный поиск возвращает 10 лучших сущностей из ранжированного списка.</p>
<p>В отличие от ранжирования RRF в Elasticsearch, которое объединяет результаты стандартных текстовых запросов и kNN-поиска, Milvus объединяет результаты поиска по разреженным и плотным векторам, предоставляя уникальную возможность гибридного поиска, оптимизированного для мультимодальных данных.</p>
<h2 id="Recap" class="common-anchor-header">Обзор<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>В этой статье мы рассмотрели преобразование типичных запросов Elasticsearch в их эквиваленты в Milvus, включая запросы на уровне терминов, булевы запросы, полнотекстовые запросы и векторные запросы. Если у вас возникнут дополнительные вопросы по преобразованию других запросов Elasticsearch, обращайтесь к нам.</p>
