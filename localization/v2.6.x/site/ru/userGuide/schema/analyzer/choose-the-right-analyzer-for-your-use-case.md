---
id: choose-the-right-analyzer-for-your-use-case.md
title: Выберите правильный анализатор для вашего случая использования
summary: Примечания
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Выберите правильный анализатор для вашего случая использования<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>Это руководство посвящено принятию практических решений по выбору анализатора. Технические подробности о компонентах анализатора и о том, как добавлять параметры анализатора, см. в разделе <a href="/docs/ru/analyzer-overview.md">Обзор анализатора</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Понимание анализаторов за 2 минуты<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>В Milvus анализатор обрабатывает текст, хранящийся в этом поле, чтобы сделать его доступным для поиска с помощью таких функций, как <a href="/docs/ru/full-text-search.md">полнотекстовый поиск</a> (BM25), <a href="/docs/ru/phrase-match.md">совпадение фраз</a> или <a href="/docs/ru/keyword-match.md">совпадение текста</a>. Считайте, что это текстовый процессор, который преобразует ваш необработанный контент в лексемы, пригодные для поиска.</p>
<p>Анализатор работает по простой двухступенчатой схеме:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс анализатора</span> </span></p>
<ol>
<li><p><strong>Токенизация (обязательно):</strong> На этом начальном этапе применяется <strong>токенизатор</strong>, разбивающий непрерывную строку текста на дискретные, осмысленные единицы, называемые токенами. Метод токенизации может значительно отличаться в зависимости от языка и типа содержимого.</p></li>
<li><p><strong>Фильтрация токенов (необязательно):</strong> После токенизации применяются <strong>фильтры</strong> для изменения, удаления или уточнения токенов. Эти операции могут включать преобразование всех лексем в строчные буквы, удаление общих бессмысленных слов (например, стоп-слов) или сокращение слов до их корневой формы (стемминг).</p></li>
</ol>
<p><strong>Пример</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Почему выбор анализатора имеет значение<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Выбор неправильного анализатора может сделать релевантные документы непоисковыми или вернуть нерелевантные результаты.</p>
<p>В следующей таблице приведены общие проблемы, возникающие из-за неправильного выбора анализатора, и даны практические решения для диагностики проблем поиска.</p>
<table>
   <tr>
     <th><p>Проблема</p></th>
     <th><p>Симптом</p></th>
     <th><p>Пример (вход и выход)</p></th>
     <th><p>Причина (плохой анализатор)</p></th>
     <th><p>Решение (хороший анализатор)</p></th>
   </tr>
   <tr>
     <td><p>Чрезмерная токинизация</p></td>
     <td><p>Текстовые запросы к техническим терминам, идентификаторам или URL не находят нужных документов.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ru/standard-analyzer.md"><code translate="no">standard</code></a> анализатор</p></td>
     <td><p>Используйте <a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> токенизатор; комбинируйте с <a href="/docs/ru/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> фильтром.</p></td>
   </tr>
   <tr>
     <td><p>Недостаточная токенизация</p></td>
     <td><p>Поиск компонента многословной фразы не возвращает документы, содержащие полную фразу.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Анализатор с <a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> токенизатором</p></td>
     <td><p>Используйте <a href="/docs/ru/standard-tokenizer.md"><code translate="no">standard</code></a> токенайзер для разделения на знаки препинания и пробелы; используйте пользовательский <a href="/docs/ru/regex-filter.md">регекс-фильтр</a>.</p></td>
   </tr>
   <tr>
     <td><p>Языковые несоответствия</p></td>
     <td><p>Результаты поиска для определенного языка не имеют смысла или отсутствуют.</p></td>
     <td><p>Китайский текст: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (одна лексема).</p></td>
     <td><p><a href="/docs/ru/english-analyzer.md"><code translate="no">english</code></a> анализатор</p></td>
     <td><p>Используйте анализатор для конкретного языка, например <a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Первый вопрос: Нужно ли вам выбирать анализатор?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Для многих случаев вам не нужно делать ничего особенного. Давайте определим, относитесь ли вы к их числу.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Поведение по умолчанию: <code translate="no">standard</code> анализатор<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы не указываете анализатор при использовании таких функций поиска текста, как полнотекстовый поиск, Milvus автоматически использует <a href="/docs/ru/standard-analyzer.md"><code translate="no">standard</code></a> анализатор.</p>
<p>Анализатор <code translate="no">standard</code>:</p>
<ul>
<li><p>Разделяет текст на пробелы и знаки препинания</p></li>
<li><p>Преобразует все лексемы в строчные буквы</p></li>
<li><p>Удаляет встроенный набор распространенных английских стоп-слов и большинство знаков препинания.</p></li>
</ul>
<p><strong>Пример преобразования</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Критерии принятия решений: Быстрая проверка<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте эту таблицу, чтобы быстро определить, удовлетворяет ли стандартный анализатор <code translate="no">standard</code> вашим потребностям. Если нет, вам нужно выбрать другой путь.</p>
<table>
   <tr>
     <th><p>Ваш контент</p></th>
     <th><p>Стандартный анализатор подходит?</p></th>
     <th><p>Почему</p></th>
     <th><p>Что вам нужно</p></th>
   </tr>
   <tr>
     <td><p>Записи в блоге на английском языке</p></td>
     <td><p>✅ Да</p></td>
     <td><p>Поведение по умолчанию является достаточным.</p></td>
     <td><p>Используйте значение по умолчанию (настройка не требуется).</p></td>
   </tr>
   <tr>
     <td><p>Документы на китайском языке</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>Китайские слова не имеют пробелов и будут рассматриваться как один токен.</p></td>
     <td><p>Используйте встроенный <a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a> анализатор.</p></td>
   </tr>
   <tr>
     <td><p>Техническая документация</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>Пунктуация удаляется из таких терминов, как <code translate="no">C++</code>.</p></td>
     <td><p>Создайте собственный анализатор с <a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> токенизатором и <a href="/docs/ru/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> фильтром.</p></td>
   </tr>
   <tr>
     <td><p>Языки, разделенные пробелами, например французский/испанский текст</p></td>
     <td><p>⚠️ Возможно.</p></td>
     <td><p>Акцентированные символы (<code translate="no">café</code> vs. <code translate="no">cafe</code>) могут не совпадать.</p></td>
     <td><p>Для получения лучших результатов рекомендуется использовать собственный анализатор с <a href="/docs/ru/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> рекомендуется для получения лучших результатов.</p></td>
   </tr>
   <tr>
     <td><p>Многоязычные или неизвестные языки</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>В анализаторе <code translate="no">standard</code> отсутствует логика, необходимая для работы с различными наборами символов и правилами токенизации.</p></td>
     <td><p>Используйте собственный анализатор с <a href="/docs/ru/icu-tokenizer.md"><code translate="no">icu</code></a> токенизатором для уникодовой токенизации. </p><p>Кроме того, для более точной обработки <a href="/docs/ru/multi-language-analyzers.md">многоязычного</a> контента можно использовать <a href="/docs/ru/multi-language-analyzers.md">мультиязычные анализаторы</a> или <a href="/docs/ru/language-identifier.md">языковой идентификатор</a>.</p></td>
   </tr>
</table>
<p>Если стандартный анализатор <code translate="no">standard</code> не удовлетворяет вашим требованиям, вам необходимо реализовать другой анализатор. У вас есть два пути:</p>
<ul>
<li><p><a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Использовать встроенный анализатор</a> или</p></li>
<li><p><a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Создание собственного анализатора</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Путь A: Использование встроенных анализаторов<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Встроенные анализаторы - это заранее настроенные решения для распространенных языков. Это самый простой способ начать работу, когда стандартный анализатор по умолчанию не подходит.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Доступные встроенные анализаторы<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Анализатор</p></th>
     <th><p>Поддержка языка</p></th>
     <th><p>Компоненты</p></th>
     <th><p>Примечания</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Большинство языков, разделенных пробелами (английский, французский, немецкий, испанский и т.д.)</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">standard</code></p></li><li><p>Фильтры: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Анализатор общего назначения для начальной обработки текста. Для моноязычных сценариев более высокую производительность обеспечивают анализаторы, ориентированные на конкретный язык (например, <code translate="no">english</code>).</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Специализированный для английского языка, который применяет стемминг и удаление стоп-слов для лучшего соответствия английской семантике</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">standard</code></p></li><li><p>Фильтры: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Рекомендуется для англоязычного контента по сравнению с <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Китайский</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">jieba</code></p></li><li><p>Фильтры: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>В настоящее время по умолчанию используется словарь упрощенного китайского языка.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Пример реализации<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы использовать встроенный анализатор, просто укажите его тип на странице <code translate="no">analyzer_params</code> при определении схемы поля.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Подробнее об использовании см. в разделах <a href="/docs/ru/full-text-search.md">"Полнотекстовый поиск"</a>, <a href="/docs/ru/keyword-match.md">"Совпадение текста"</a> или <a href="/docs/ru/phrase-match.md">"Совпадение фразы</a>".</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Путь B: Создание пользовательского анализатора<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Если <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">встроенные опции</a> не удовлетворяют вашим потребностям, вы можете создать собственный анализатор, объединив токенизатор с набором фильтров. Это дает вам полный контроль над конвейером обработки текста.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Шаг 1: Выберите токенизатор на основе языка<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Выберите токенизатор в зависимости от основного языка вашего контента:</p>
<h4 id="Western-languages" class="common-anchor-header">Западные языки</h4><p>Для языков, разделенных пробелами, у вас есть следующие варианты:</p>
<table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Как это работает</p></th>
     <th><p>Лучший для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Разделяет текст на основе пробелов и знаков препинания</p></td>
     <td><p>Общий текст, смешанная пунктуация</p></td>
     <td><ul><li><p>Вход: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Выход: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Разделение только по пробельным символам</p></td>
     <td><p>Предварительно обработанный контент, текст, отформатированный пользователем</p></td>
     <td><ul><li><p>Вход: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Выходные данные: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Восточноазиатские языки</h4><p>Языки, основанные на словарях, требуют специализированных токенизаторов для правильной сегментации слов:</p>
<h5 id="Chinese" class="common-anchor-header">Китайский</h5><table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Как работает</p></th>
     <th><p>Лучший для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Сегментация на основе китайского словаря с интеллектуальным алгоритмом</p></td>
     <td><p><strong>Рекомендуется для китайского контента</strong> - сочетает в себе словарь и интеллектуальные алгоритмы, специально разработанные для китайского языка</p></td>
     <td><ul><li><p>Вход: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Выход: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Морфологический анализ на основе чистого словаря с китайским словарем<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>По сравнению с <code translate="no">jieba</code>, обрабатывает китайский текст более универсальным образом.</p></td>
     <td><ul><li><p>Вход: <code translate="no">"机器学习算法"</code></p></li><li><p>Выходные данные: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Японский и корейский</h5><table>
   <tr>
     <th><p>Язык</p></th>
     <th><p>Токенизатор</p></th>
     <th><p>Параметры словаря</p></th>
     <th><p>Лучший для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p>Японский</p></td>
     <td><p><a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (общего назначения), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (современные термины), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (академический)</p></td>
     <td><p>Морфологический анализ с обработкой правильных существительных</p></td>
     <td><ul><li><p>Вход: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Выход: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Корейский</p></td>
     <td><p><a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Морфологический анализ корейского языка</p></td>
     <td><ul><li><p>Вход: <code translate="no">"안녕하세요"</code></p></li><li><p>Выходные данные: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Многоязычие или неизвестные языки</h4><p>Для контента, в котором языки непредсказуемы или смешаны внутри документов:</p>
<table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Как это работает</p></th>
     <th><p>Лучше всего подходит для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Токенизация с учетом Юникода (Международные компоненты для Юникода)</p></td>
     <td><p>Смешанные шрифты, неизвестные языки или когда достаточно простой токенизации</p></td>
     <td><ul><li><p>Вход: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Выход: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Когда использовать icu</strong>:</p>
<ul>
<li><p>Смешанные языки, когда идентификация языка нецелесообразна.</p></li>
<li><p>Вам не нужны накладные расходы на <a href="/docs/ru/multi-language-analyzers.md">многоязычные анализаторы</a> или <a href="/docs/ru/language-identifier.md">идентификатор языка</a>.</p></li>
<li><p>Контент имеет основной язык, в котором иногда встречаются иностранные слова, вносящие незначительный вклад в общий смысл (например, английский текст с единичными названиями брендов или техническими терминами на японском или французском).</p></li>
</ul>
<p><strong>Альтернативные подходы</strong>: Для более точной обработки многоязычного содержимого используйте многоязычные анализаторы или идентификатор языка. Подробнее см. в разделе <a href="/docs/ru/multi-language-analyzers.md">Многоязычные анализаторы</a> или <a href="/docs/ru/language-identifier.md">языковой идентификатор</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Шаг 2: Добавьте фильтры для повышения точности<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>После <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">выбора токенизатора</a> примените фильтры в соответствии с вашими требованиями к поиску и характеристиками контента.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Часто используемые фильтры</h4><p>Эти фильтры необходимы для большинства языковых конфигураций с раздельным пробелом (английский, французский, немецкий, испанский и т. д.) и значительно улучшают качество поиска:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Как работает</p></th>
     <th><p>Когда использовать</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Преобразовать все лексемы в нижний регистр</p></td>
     <td><p>Универсальный - применяется ко всем языкам с различием регистра</p></td>
     <td><ul><li><p>Вход: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Выход: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Сократить слова до их корневой формы</p></td>
     <td><p>Языки с падежными окончаниями слов (английский, французский, немецкий и т.д.)</p></td>
     <td><p>Для английского языка:</p><ul><li><p>Вход: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Выход: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Удалить общие бессмысленные слова</p></td>
     <td><p>Для большинства языков - особенно эффективно для языков, разделенных пробелами</p></td>
     <td><ul><li><p>Ввод: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Выходные данные: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Для восточноазиатских языков (китайского, японского, корейского и т. д.) используйте <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">фильтры, ориентированные на конкретный язык</a>. Эти языки обычно используют другие подходы к обработке текстов и не могут извлечь значительной пользы из стемминга.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Фильтры нормализации текста</h4><p>Эти фильтры стандартизируют варианты текста, чтобы улучшить согласованность совпадений:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Как работает</p></th>
     <th><p>Когда использовать</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Преобразование акцентированных символов в эквиваленты ASCII</p></td>
     <td><p>Международный контент, пользовательский контент</p></td>
     <td><ul><li><p>Вход: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Выход: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Фильтрация токенов</h4><p>Контролируйте, какие токены будут сохранены на основе содержания или длины символов:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Как это работает</p></th>
     <th><p>Когда использовать</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Удалить отдельные знаки препинания</p></td>
     <td><p>Очистка вывода токенизаторов <code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code>, которые возвращают знаки препинания в виде отдельных лексем</p></td>
     <td><ul><li><p>Вход: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Выход: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Оставить только буквы и цифры</p></td>
     <td><p>Технический контент, обработка чистого текста</p></td>
     <td><ul><li><p>Вход: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Выходные данные: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Удаление лексем, выходящих за пределы заданного диапазона длины</p></td>
     <td><p>Отфильтровать шум (слишком длинные лексемы)</p></td>
     <td><ul><li><p>Вход: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Выход: <code translate="no">[['a'], ['very'], []]</code> (если <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Пользовательская фильтрация на основе шаблонов</p></td>
     <td><p>Требования к токенам, специфичные для домена</p></td>
     <td><ul><li><p>Вход: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Выход: <code translate="no">[[], ['prod456']]</code> (если <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Фильтры по специфике языка</h4><p>Эти фильтры учитывают специфические особенности языка:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Язык</p></th>
     <th><p>Как работает</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Немецкий</p></td>
     <td><p>Разделяет сложные слова на компоненты для поиска</p></td>
     <td><ul><li><p>Вход: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Выход: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Китайский</p></td>
     <td><p>Сохраняет китайские иероглифы + алфавитно-цифровые</p></td>
     <td><ul><li><p>Ввод: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Выход: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Китайский</p></td>
     <td><p>Сохраняет только китайские иероглифы</p></td>
     <td><ul><li><p>Ввод: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Выход: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Шаг 3: Объединить и реализовать<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы создать свой собственный анализатор, вы определяете токенизатор и список фильтров в словаре <code translate="no">analyzer_params</code>. Фильтры применяются в том порядке, в котором они перечислены.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Финал: Протестируйте <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Всегда проверяйте свою конфигурацию перед применением к коллекции:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Общие проблемы для проверки:</p>
<ul>
<li><p><strong>Чрезмерная токинизация</strong>: Неправильное разделение технических терминов</p></li>
<li><p><strong>Недостаточная токинизация</strong>: Фразы не разделяются должным образом</p></li>
<li><p><strong>Пропущенные лексемы</strong>: Важные термины отфильтровываются</p></li>
</ul>
<p>Подробную информацию об использовании см. в разделе <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Рекомендуемые конфигурации для каждого случая использования<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе приведены рекомендуемые конфигурации токенизаторов и фильтров для распространенных случаев использования анализаторов в Milvus. Выберите комбинацию, которая лучше всего соответствует вашему типу контента и требованиям поиска.</p>
<div class="alert note">
<p>Прежде чем применять анализатор к вашей коллекции, мы рекомендуем вам использовать <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> для тестирования и проверки эффективности анализа текста.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Языки со знаками ударения (французский, испанский, немецкий и т. д.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте токенизатор <code translate="no">standard</code> с преобразованием строчных букв, стеммингом для конкретного языка и удалением стоп-слов. Эта конфигурация также работает для других европейских языков, если изменить параметры <code translate="no">language</code> и <code translate="no">stop_words</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">Английский контент<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Для обработки англоязычного текста с комплексной фильтрацией. Вы также можете использовать встроенный <a href="/docs/ru/english-analyzer.md"><code translate="no">english</code></a> анализатор:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">Китайский контент<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте токенизатор <code translate="no">jieba</code> и применяйте фильтр символов для сохранения только китайских символов, латинских букв и цифр.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Для упрощенного китайского языка <code translate="no">cnalphanumonly</code> удаляет все лексемы, кроме китайских иероглифов, буквенно-цифрового текста и цифр. Это позволяет избежать влияния пунктуации на качество поиска.</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">Японское содержимое<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте токенизатор <code translate="no">lindera</code> с японским словарем и фильтрами для очистки пунктуации и контроля длины лексем:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">Корейский контент<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Аналогично японскому, с использованием токенизатора <code translate="no">lindera</code> и корейского словаря:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Смешанный или многоязычный контент<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>При работе с контентом, который охватывает несколько языков или непредсказуемо использует скрипты, начните с анализатора <code translate="no">icu</code>. Этот анализатор с поддержкой Юникода эффективно справляется со смешанными шрифтами и символами.</p>
<p><strong>Базовая многоязычная настройка (без стемминга)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Расширенная многоязычная обработка</strong>:</p>
<p>Для лучшего контроля над поведением токенов в разных языках:</p>
<ul>
<li><p>Используйте <strong>многоязыковую</strong> конфигурацию <strong>анализатора</strong>. Подробности см. в разделе <a href="/docs/ru/multi-language-analyzers.md">Многоязычные анализаторы</a>.</p></li>
<li><p>Внедрите <strong>идентификатор языка</strong> в содержимое. Подробнее см. в разделе <a href="/docs/ru/language-identifier.md">Языковой идентификатор</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Интеграция с функциями поиска текста<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>После выбора анализатора вы можете интегрировать его с функциями текстового поиска, предоставляемыми Milvus.</p>
<ul>
<li><p><strong>Полнотекстовый поиск</strong></p>
<p>Анализаторы оказывают непосредственное влияние на полнотекстовый поиск на основе BM25 благодаря генерации разреженных векторов. Используйте один и тот же анализатор для индексации и запроса, чтобы обеспечить согласованную токенизацию. Анализаторы для конкретного языка обычно дают лучшие показатели BM25, чем общие. Подробности реализации см. в разделе <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p></li>
<li><p><strong>Текстовое соответствие</strong></p>
<p>Операции сопоставления текста выполняют точное сопоставление лексем между запросами и проиндексированным содержимым на основе результатов работы анализатора. Подробности реализации см. в разделе <a href="/docs/ru/keyword-match.md">Совпадение текста</a>.</p></li>
<li><p><strong>Совпадение фраз</strong></p>
<p>Сопоставление фраз требует последовательной токенизации многословных выражений для сохранения границ и смысла фраз. Подробности реализации см. в разделе <a href="/docs/ru/phrase-match.md">Совпадение фраз</a>.</p></li>
</ul>
