---
id: pattern-matching.md
title: Сопоставление шаблонов
summary: >-
  Milvus поддерживает сопоставление строк с использованием шаблонов с
  подстановочными знаками LIKE и регулярных выражений RE2. Используйте фильтры
  по шаблонам для сопоставления префиксов, суффиксов, подстрок,
  структурированных кодов, доменов электронной почты, путей URL и других
  шаблонов строк в полях типа VARCHAR, путях строк JSON или элементах массива
  ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Сопоставление шаблонов<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>В приложениях для агентного поиска векторный поиск и сопоставление шаблонов в стиле grep часто дополняют друг друга. Векторный поиск извлекает объекты, имеющие семантическое отношение к запросу, а сопоставление шаблонов сужает круг результатов, отбирая строки с точным содержанием, такие как коды ошибок, префиксы журналов, домены электронной почты, пути URL или идентификаторы.</p>
<p>В Milvus эти ограничения по шаблонам можно выразить в скалярных фильтрах с помощью <code translate="no">LIKE</code> для простого сопоставления с подстановочными знаками и <code translate="no">=~</code> или <code translate="no">!~</code> для регулярных выражений <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Эти фильтры можно комбинировать с <code translate="no">query</code>, <code translate="no">search</code> или гибридным поиском.</p>
<p>Выражения для сопоставления шаблонов задаются в параметре <code translate="no">filter</code>. Например, следующий запрос находит сообщения журнала, содержащие код ошибки, такой как <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Примеры на этой странице посвящены выражению, заданному в параметре « <code translate="no">filter</code> ». Тот же синтаксис выражений фильтрации можно использовать в операциях Milvus, поддерживающих скалярные фильтры, таких как « <code translate="no">query</code> », « <code translate="no">search</code> » и гибридный поиск.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Поддерживаемые типы полей<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Сопоставление по шаблону доступно для строковых значений.</p>
<table>
<thead>
<tr><th>Цель</th><th><code translate="no">LIKE</code></th><th>Регулярное выражение <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> поле</td><td>Да</td><td>Да</td><td>Типичная цель для сопоставления шаблонов в строковых полях.</td></tr>
<tr><td><code translate="no">JSON</code> путь с типом преобразования <code translate="no">VARCHAR</code> </td><td>Да</td><td>Да</td><td>Значение JSON-пути должно быть строкой для положительных совпадений. Если вы создаете индекс по JSON-пути для ускорения, установите флаг « <code translate="no">json_cast_type=&quot;varchar&quot;</code> ».</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> элемент</td><td>Да</td><td>Да</td><td>Сопоставление с конкретным элементом по индексу, например <code translate="no">tags[0]</code>. При сопоставлении по шаблону <strong>не</strong> происходит сканирование всех элементов; оно применяется только к элементу с указанным индексом.</td></tr>
<tr><td>Числовые, логические, векторные, <code translate="no">TEXT</code> или другие цели, не относящиеся к типу «<code translate="no">VARCHAR</code> »</td><td>Нет</td><td>Нет</td><td>Сопоставление по шаблону доступно только для значений типа « <code translate="no">VARCHAR</code> », путей JSON, которые преобразуются в строки, или индексированных элементов типа « <code translate="no">ARRAY&lt;VARCHAR&gt;</code> ».</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Выберите LIKE или регулярное выражение<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите самый простой оператор, выражающий нужный вам шаблон.</p>
<p>Если вам требуется точное совпадение строк, мы рекомендуем использовать оператор « <code translate="no">==</code> » вместо сопоставления по шаблону. Используйте « <code translate="no">LIKE</code> » или регулярные выражения только в тех случаях, когда фильтр должен сопоставляться с шаблоном.</p>
<table>
<thead>
<tr><th>Требование</th><th>Рекомендуемый оператор</th><th>Пример</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>Точное совпадение строк</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Точное совпадение строки « <code translate="no">active</code> ».</td></tr>
<tr><td>Простое совпадение префикса</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Соответствует строкам, начинающимся со <code translate="no">Prod</code>.</td></tr>
<tr><td>Простое совпадение суффикса</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Соответствует строкам, заканчивающимся на <code translate="no">.json</code>.</td></tr>
<tr><td>Простое совпадение по содержанию</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Соответствует значениям, содержащим <code translate="no">vector database</code> в любом месте строки.</td></tr>
<tr><td>Поиск структурированного кода или шаблона фиксированной длины</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Соответствует строкам, в которых (с учетом регистра) присутствует <code translate="no">E</code>, за которым следуют четыре цифры, например <code translate="no">E1001</code>.</td></tr>
<tr><td>Сопоставление шаблонов без учета регистра</td><td><code translate="no">=~</code> с <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Находит <code translate="no">error</code>, <code translate="no">ERROR</code> или другие варианты с учетом регистра.</td></tr>
<tr><td>Исключение значений, соответствующих шаблону регулярного выражения</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Исключает строки, начинающиеся с <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Используйте <code translate="no">LIKE</code> для простого сопоставления с подстановочными знаками. Используйте регулярные выражения, если шаблон требует классов символов, повторений, альтернатив (например, <code translate="no">error|failed</code>), якорей или сопоставления без учета регистра.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Используйте LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>Оператор <code translate="no">LIKE</code> предназначен для простого сопоставления с подстановочными знаками в строковых значениях. Он поддерживает только следующие подстановочные знаки:</p>
<table>
<thead>
<tr><th>Символ-заменитель</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Соответствует нулю или большему количеству символов.</td></tr>
<tr><td><code translate="no">_</code></td><td>Соответствует ровно одному символу.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Распространенные шаблоны LIKE<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте позиции <code translate="no">%</code> и <code translate="no">_</code> для управления тем, где фиксированный текст появляется в найденной строке.</p>
<table>
<thead>
<tr><th>Требование</th><th>Шаблон</th><th>Пример фильтра</th></tr>
</thead>
<tbody>
<tr><td>Начинается с префикса</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Заканчивается суффиксом</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Содержит подстроку</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Соответствует одному символу в фиксированной позиции</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Поведение сопоставления LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">LIKE</code> для префиксов, суффиксов, содержания и совпадений одного символа в фиксированной позиции. <code translate="no">LIKE</code> не поддерживает классы символов, такие как <code translate="no">[0-9]</code>, альтернативы, такие как <code translate="no">error|failed</code>, количество повторений, такие как <code translate="no">{4}</code>, анкоры, такие как <code translate="no">^</code> или <code translate="no">$</code>, или флаги, игнорирующие регистр, такие как <code translate="no">(?i)</code>. Для этих шаблонов используйте регулярные выражения.</p>
<p>Используйте <code translate="no">==</code> для точного сравнения полных строк. Используйте <code translate="no">LIKE</code> только в том случае, если фильтру требуется сопоставление с подстановочными знаками.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Экранирование подстановочных знаков в шаблоне LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>В шаблонах <code translate="no">LIKE</code> символ <code translate="no">%</code> соответствует нулю или большему количеству символов, а <code translate="no">_</code> — ровно одному символу. Чтобы буквально сопоставить <code translate="no">%</code>, <code translate="no">_</code> или <code translate="no">\</code>, экранируйте символ обратной косой чертой (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> соответствует буквальному значению <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> соответствует значениям, начинающимся с литерала <code translate="no">_</code>.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> соответствует значениям, начинающимся с литерального обратного слеша.</li>
</ul>
<p>Литералы необработанных строк, записанные в виде <code translate="no">r&quot;...&quot;</code> или <code translate="no">r'...'</code>, сохраняют обратные косые черты в исходном виде в выражениях фильтров Milvus. Их рекомендуется использовать для шаблонов <code translate="no">LIKE</code> и регулярных выражений, содержащих обратные косые черты. Без необработанной строки обычные строковые литералы по-прежнему обрабатывают экранирующие последовательности перед вычислением шаблона, поэтому может потребоваться больше обратных косых черт.</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">Используйте регулярные выражения<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте фильтры на основе регулярных выражений, если шаблон требует таких возможностей регулярных выражений, как классы символов, повторения, альтернативы, якоря или сопоставление без учета регистра. Milvus применяет регулярное выражение <a href="https://github.com/google/re2/wiki/syntax">RE2</a> к строковому значению.</p>
<p>Правая часть выражения <code translate="no">=~</code> или <code translate="no">!~</code> должна представлять собой строковый литерал.</p>
<table>
<thead>
<tr><th>Оператор</th><th>Значение</th><th>Пример</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Соответствует значениям, удовлетворяющим шаблону регулярного выражения.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Исключает значения, удовлетворяющие шаблону регулярного выражения.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">Используйте литералы необработанных строк<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>Сырые строковые литералы рекомендуется использовать для шаблонов регулярных выражений, содержащих обратные косые черты. В сырой строке, записанной в виде <code translate="no">r&quot;...&quot;</code> или <code translate="no">r'...'</code>, обратные косые черты передаются механизму регулярных выражений дословно. Это позволяет избежать дополнительного экранирования, требуемого при использовании обычных строковых литералов.</p>
<p>Например:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это соответствует строкам, содержащим значение, похожее на дату, например <code translate="no">2026-07-01</code>.</p>
<p>Без использования необработанной строки обычные строковые литералы обрабатывают экранирующие последовательности до того, как шаблон регулярного выражения будет проанализирован, поэтому такие шаблоны, как <code translate="no">\d</code>, <code translate="no">\s</code> или экранированные литеральные символы, могут потребовать дополнительных обратных косых черт.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Распространённые шаблоны регулярных выражений<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>В приведенных ниже примерах используется распространенный синтаксис RE2 в выражениях фильтров Milvus. Полную информацию о синтаксисе регулярных выражений см. в справочнике <a href="https://github.com/google/re2/wiki/syntax">по синтаксису RE2</a>.</p>
<table>
<thead>
<tr><th>Требование</th><th>Шаблон</th><th>Пример фильтра</th></tr>
</thead>
<tbody>
<tr><td>Содержит буквальный текст</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Начинается с префикса</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Заканчивается суффиксом</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Соответствует последовательности цифр</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Соответствует фиксированному количеству цифр</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Соответствует домену электронной почты</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Соответствует, не учитывая регистр</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Соответствует всей строке</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Чтобы найти одно из нескольких слов, используйте альтернативу с помощью <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>При буквальном сопоставлении метасимволов регулярных выражений следует экранировать их в шаблоне регулярного выражения. Например, чтобы найти буквальную точку (<code translate="no">\.</code> в регулярном выражении), в строке фильтра Python следует написать <code translate="no">\\.</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примечание: Фильтры Milvus на основе регулярных выражений следуют синтаксису RE2. Если шаблон регулярного выражения использует синтаксис, который RE2 не поддерживает, или является недействительным по иным причинам, Milvus отклоняет выражение фильтра. Подробности о метасимволах регулярных выражений, флагах и поведении при сопоставлении см. в справочнике <a href="https://github.com/google/re2/wiki/syntax">по синтаксису RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Поведение сопоставления<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Сопоставление подстрок</strong></p>
<p>Сопоставление по регулярным выражениям в Milvus использует семантику подстрок. Шаблон не обязательно должен совпадать со всем значением поля. Например, следующий фильтр находит как <code translate="no">E1001</code>, так и <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы найти совпадение со всем значением поля, используйте анкоры <code translate="no">^</code> и <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Поля VARCHAR, допускающие нулевые значения</strong></p>
<p>Фильтры на основе регулярных выражений не сопоставляются с нулевыми значениями. Это относится как к <code translate="no">=~</code>, так и к <code translate="no">!~</code>. Если вы хотите исключить шаблон регулярного выражения, но сохранить нулевые значения, явно добавьте <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON-пути</strong></p>
<p>Для путей JSON фильтры регулярных выражений ведут себя по-разному, если путь отсутствует, имеет значение null или преобразуется в значение, не являющееся строкой:</p>
<table>
<thead>
<tr><th>Фильтр</th><th>Включает отсутствующие/нулевые/нестроковые значения?</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Нет</td><td>Соответствует только строковым значениям, удовлетворяющим шаблону регулярного выражения.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Да</td><td>Возвращает сущности, у которых путь отсутствует, имеет значение null, не является строкой или представляет собой строку, не соответствующую шаблону регулярного выражения.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Ускорение сопоставления шаблонов с помощью индексов<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает несколько типов индексов для строковых полей, которые можно использовать вместе с фильтрами « <code translate="no">LIKE</code> » и фильтрами на основе регулярных выражений для полей « <code translate="no">VARCHAR</code> » или строковых путей JSON, например: <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> и <code translate="no">BITMAP</code>. Сопоставление по шаблонам может работать и без индекса, но индекс позволяет повысить производительность при работе с большими наборами данных.</p>
<p>Эффективность индекса зависит от выражения шаблона, от того, может ли Milvus извлекать фиксированные литеральные подстроки, а также от кардинальности и распределения целевого поля. Для шаблонов префиксного типа, таких как <code translate="no">name LIKE &quot;Prod%&quot;</code>, могут быть более эффективны другие стратегии индексирования, чем для шаблонов инфиксного или суффиксного типа, таких как <code translate="no">description LIKE &quot;%vector%&quot;</code> или <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Используйте приведенную ниже таблицу в качестве отправной точки, а затем проведите тестирование с вашей собственной рабочей нагрузкой:</p>
<table>
<thead>
<tr><th>Шаблон или характеристика данных</th><th>Рекомендуемый индекс</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td>Содержит фиксированные литеральные подстроки, например <code translate="no">message =~ &quot;error.*timeout&quot;</code> или <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Помогает, когда Milvus может извлечь значимые литеральные подстроки из шаблона. Подробности см. в разделе <a href="/docs/ru/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Префиксные, точные или фильтры строк, основанные на равенстве, особенно для полей с низкой или умеренной кардинальностью</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> или <code translate="no">BITMAP</code></td><td>Могут быть более эффективны, если поле содержит повторяющиеся значения или если фильтр близок к точному сопоставлению. Подробности см. в разделах <a href="/docs/ru/stl-sort.md">STL_SORT</a>, <a href="/docs/ru/inverted.md">INVERTED</a> и <a href="/docs/ru/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Шаблоны регулярных выражений без фиксированных литералов или шаблоны, в которых преобладают классы символов, короткие токены или подстановочные знаки</td><td>Проведите тестирование производительности, прежде чем полагаться на ускорение за счёт индекса</td><td>Эти шаблоны могут обеспечивать ограниченную селективность индекса и привести к переходу на более широкое сканирование.</td></tr>
</tbody>
</table>
