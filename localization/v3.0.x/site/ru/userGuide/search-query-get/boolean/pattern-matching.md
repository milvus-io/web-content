---
id: pattern-matching.md
title: Сопоставление шаблонов
summary: >-
  Milvus поддерживает сопоставление строковых шаблонов с помощью шаблонов с
  подстановочными знаками LIKE и регулярных выражений RE2. Используйте фильтры
  шаблонов для сопоставления префиксов, суффиксов, подстрок, структурированных
  кодов, почтовых доменов, путей URL и других строковых шаблонов в полях
  VARCHAR, путях строк JSON или элементах ARRAY.
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
    </button></h1><p>В приложениях для агентского поиска векторный поиск и сопоставление шаблонов в стиле grep часто дополняют друг друга. Векторный поиск извлекает семантически релевантные сущности, а сопоставление шаблонов сужает результаты по точным строковым структурам, таким как коды ошибок, префиксы журналов, почтовые домены, пути URL или идентификаторы.</p>
<p>В Milvus вы можете выразить эти ограничения шаблонов в скалярных фильтрах с помощью <code translate="no">LIKE</code> для простого сопоставления с подстановочными знаками и <code translate="no">=~</code> или <code translate="no">!~</code> для регулярных выражений <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Вы можете комбинировать эти фильтры с <code translate="no">query</code>, <code translate="no">search</code> или гибридным поиском.</p>
<p>Выражения для сопоставления с шаблонами записываются в параметре <code translate="no">filter</code>. Например, следующий запрос ищет сообщения журнала, содержащие код ошибки <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Примеры на этой странице посвящены выражению, назначенному параметру <code translate="no">filter</code>. Тот же синтаксис выражения фильтра можно использовать в операциях Milvus, которые принимают скалярный фильтр, например <code translate="no">query</code>, <code translate="no">search</code> и гибридный поиск.</p>
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
    </button></h2><p>Сопоставление с образцом доступно для строковых значений.</p>
<table>
<thead>
<tr><th>Цель</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> поле</td><td>Да</td><td>Да</td><td>Типичная цель для сопоставления образцов в строковых полях.</td></tr>
<tr><td><code translate="no">JSON</code> путь с типом <code translate="no">VARCHAR</code> </td><td>Да</td><td>Да</td><td>Для положительного совпадения значение пути JSON должно быть строкой. Если вы создаете индекс на пути JSON для ускорения, установите <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> элемент</td><td>Да</td><td>Да</td><td>Сопоставление определенного элемента по индексу, например <code translate="no">tags[0]</code>. Сопоставление с образцом <strong>не</strong> сканирует все элементы; оно применяется только к элементу по указанному индексу.</td></tr>
<tr><td>Числовые, булевы, векторные, <code translate="no">TEXT</code>, или другие не<code translate="no">VARCHAR</code> цели.</td><td>Нет</td><td>Нет</td><td>Подбор шаблона доступен только для значений <code translate="no">VARCHAR</code>, путей JSON, которые преобразуются в строки, или индексированных элементов <code translate="no">ARRAY&lt;VARCHAR&gt;</code>.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Выберите LIKE или regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите самый простой оператор, который выражает нужный вам шаблон.</p>
<p>Если вам нужно точное совпадение строк, мы рекомендуем использовать <code translate="no">==</code> вместо сопоставления с образцом. Используйте <code translate="no">LIKE</code> или regex только в тех случаях, когда фильтр должен соответствовать шаблону.</p>
<table>
<thead>
<tr><th>Требование</th><th>Рекомендуемый оператор</th><th>Пример</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>Точное равенство строк</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Точное совпадение строки <code translate="no">active</code>.</td></tr>
<tr><td>Простое совпадение префикса</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Совпадает со строками, начинающимися с <code translate="no">Prod</code>.</td></tr>
<tr><td>Простое совпадение суффиксов</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Совпадает со строками, которые заканчиваются на <code translate="no">.json</code>.</td></tr>
<tr><td>Простое совпадение содержит</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Ищет значения, содержащие <code translate="no">vector database</code> в любом месте строки.</td></tr>
<tr><td>Поиск структурированного кода или шаблона фиксированной длины</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Совпадает со строками, которые с учетом регистра содержат <code translate="no">E</code> с последующими четырьмя цифрами, например <code translate="no">E1001</code>.</td></tr>
<tr><td>Сопоставление шаблонов без учета регистра</td><td><code translate="no">=~</code> с <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Сопоставляет <code translate="no">error</code>, <code translate="no">ERROR</code> или другие варианты регистра.</td></tr>
<tr><td>Исключить значения, соответствующие regex-шаблону</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Исключает строки, начинающиеся с <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Используйте <code translate="no">LIKE</code> для простого сопоставления с подстановочными знаками. Используйте regex, если шаблон требует классов символов, повторения, чередования, например <code translate="no">error|failed</code>, якорей или сопоставления без учета регистра.</p>
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
    </button></h2><p>Оператор <code translate="no">LIKE</code> предназначен для простого сопоставления строковых значений с подстановочными знаками. Он поддерживает только следующие подстановочные знаки:</p>
<table>
<thead>
<tr><th>Подстановочный знак</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Сопоставляет ноль или более символов.</td></tr>
<tr><td><code translate="no">_</code></td><td>Соответствует ровно одному символу.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Общие шаблоны LIKE<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте позицию <code translate="no">%</code> и <code translate="no">_</code> для управления тем, где фиксированный текст появляется в вычисляемой строке.</p>
<table>
<thead>
<tr><th>Требование</th><th>Шаблон</th><th>Пример фильтра</th></tr>
</thead>
<tbody>
<tr><td>Начинается с префикса</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Заканчивается суффиксом</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Содержит подстроку</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Совпадает с одним символом в фиксированной позиции</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Поведение при сопоставлении LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте <code translate="no">LIKE</code> для префиксных, суффиксных, содержащих и односимвольных совпадений с фиксированной позицией. <code translate="no">LIKE</code> не поддерживает классы символов, такие как <code translate="no">[0-9]</code>, чередование, такое как <code translate="no">error|failed</code>, количество повторений, такое как <code translate="no">{4}</code>, якоря, такие как <code translate="no">^</code> или <code translate="no">$</code>, или флаги, не зависящие от регистра, такие как <code translate="no">(?i)</code>. Для таких шаблонов используйте regex.</p>
<p>Используйте <code translate="no">==</code> для точного равенства всех строк. Используйте <code translate="no">LIKE</code> только в том случае, если фильтр требует подстановочных знаков.</p>
<h2 id="Use-regex" class="common-anchor-header">Использовать regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте фильтры regex, если шаблон требует таких свойств регулярных выражений, как классы символов, повторение, чередование, якоря или сопоставление без учета регистра. Milvus применяет регулярное выражение <a href="https://github.com/google/re2/wiki/syntax">RE2</a> к строковому значению.</p>
<p>Правая часть <code translate="no">=~</code> или <code translate="no">!~</code> должна быть строковым литералом.</p>
<table>
<thead>
<tr><th>Оператор</th><th>Значение</th><th>Пример</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Сопоставляет значения, удовлетворяющие шаблону regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Исключает значения, удовлетворяющие шаблону regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Общие шаблоны regex<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>В следующих примерах используется общий синтаксис RE2 в выражениях фильтра Milvus. Полный синтаксис regex см. в справочнике по <a href="https://github.com/google/re2/wiki/syntax">синтаксису RE2</a>.</p>
<table>
<thead>
<tr><th>Требование</th><th>Шаблон</th><th>Пример фильтра</th></tr>
</thead>
<tbody>
<tr><td>Содержит буквальный текст</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Начинается с префикса</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Заканчивается суффиксом</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Совпадает с последовательностью цифр</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Сопоставляет фиксированное количество цифр</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Сопоставляет домен электронной почты</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Сопоставляет без учета регистра</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Совпадает с полной строкой</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Чтобы подобрать одно из нескольких слов, используйте чередование с <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>При буквальном сопоставлении метасимволов regex их следует экранировать в шаблоне regex. Например, для соответствия буквальной точке (<code translate="no">\.</code> в regex), напишите <code translate="no">\\.</code> в строке фильтра Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примечание: фильтры Milvus regex следуют синтаксису RE2. Если regex-шаблон использует синтаксис, который RE2 не поддерживает, или иным образом является неверным, Milvus отклоняет выражение фильтра. Для получения подробной информации о метасимволах, флагах и поведении regex-фильтров обратитесь к справочнику по <a href="https://github.com/google/re2/wiki/syntax">синтаксису RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Поведение при сопоставлении<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Согласование подстроки</strong></p>
<p>В Milvus regex-сопоставление использует семантику подстроки. Шаблон не обязательно должен соответствовать всему значению поля. Например, в следующем фильтре совпадают <code translate="no">E1001</code> и <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для соответствия всему значению поля используйте анкоры <code translate="no">^</code> и <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Нулевые поля VARCHAR</strong></p>
<p>Регекс-фильтры не совпадают с нулевыми значениями. Это относится и к <code translate="no">=~</code>, и к <code translate="no">!~</code>. Если вы хотите исключить шаблон regex, но сохранить нулевые значения, явно добавьте <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пути JSON</strong></p>
<p>Для путей JSON фильтры regex ведут себя по-разному, если путь отсутствует, является нулевым или преобразуется в нестроковое значение:</p>
<table>
<thead>
<tr><th>Фильтр</th><th>Включать отсутствующие/нулевые/нестроковые значения?</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Нет</td><td>Сопоставляет только строковые значения, удовлетворяющие шаблону regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Да</td><td>Возвращает сущности, в которых путь отсутствует, равен нулю, не является строкой или является строкой, не соответствующей шаблону regex.</td></tr>
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
    </button></h2><p>Milvus поддерживает несколько типов индексов для строковых полей, которые можно использовать вместе с <code translate="no">LIKE</code> и regex-фильтрами для полей <code translate="no">VARCHAR</code> или строковых путей JSON, таких как <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> и <code translate="no">BITMAP</code>. Согласование шаблонов может работать и без индекса, но индекс может повысить производительность при работе с большими наборами данных.</p>
<p>Эффективность индекса зависит от выражения шаблона, от того, может ли Milvus извлекать фиксированные подстроки литералов, а также от кардинальности и распределения целевого поля. Для шаблонов префиксного типа, таких как <code translate="no">name LIKE &quot;Prod%&quot;</code>, могут быть использованы иные стратегии индексирования, чем для инфиксных или суффиксных шаблонов, таких как <code translate="no">description LIKE &quot;%vector%&quot;</code> или <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Используйте следующую таблицу в качестве отправной точки, а затем проведите сравнение с вашей собственной рабочей нагрузкой:</p>
<table>
<thead>
<tr><th>Шаблон или характеристика данных</th><th>Индекс, который следует рассмотреть</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td>Содержит фиксированные буквенные подстроки, например <code translate="no">message =~ &quot;error.*timeout&quot;</code> или <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Помогает, когда Milvus может извлечь из шаблона значимые буквенные подстроки. Подробности см. в разделе <a href="/docs/ru/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Префиксные, точные или равнозначные строковые фильтры, особенно для полей с низкой или умеренной кардинальностью</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, или <code translate="no">BITMAP</code></td><td>Может быть более эффективным, если поле имеет повторяющиеся значения или если фильтр близок к точному совпадению. Подробнее см. в разделах <a href="/docs/ru/stl-sort.md">STL_SORT</a>, <a href="/docs/ru/inverted.md">INVERTED</a> и <a href="/docs/ru/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Шаблоны Regex без фиксированных литералов или шаблоны, в которых преобладают символьные классы, короткие лексемы или подстановочные знаки</td><td>Проведите бенчмарк, прежде чем полагаться на индексное ускорение</td><td>Эти шаблоны могут обеспечить ограниченную индексную селективность и могут вернуться к более широкому сканированию.</td></tr>
</tbody>
</table>
