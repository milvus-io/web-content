---
id: choose-the-right-analyzer-for-your-use-case.md
title: Выбор подходящего анализатора для вашего сценария использования
summary: Примечания
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Выбор подходящего анализатора для вашего сценария использования<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>Данное руководство посвящено практическим аспектам принятия решений при выборе анализатора. Технические сведения о компонентах анализатора и о том, как добавлять параметры анализатора, см. в разделе <a href="/docs/ru/analyzer-overview.md">«Обзор анализатора</a>».</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Понимание принципа работы анализаторов за 2 минуты<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>В Milvus анализатор обрабатывает текст, хранящийся в данном поле, чтобы сделать его доступным для поиска по таким признакам, как <a href="/docs/ru/full-text-search.md">полнотекстовый поиск</a> (BM25), <a href="/docs/ru/phrase-match.md">поиск по фразам</a> или <a href="/docs/ru/keyword-match.md">поиск по тексту</a>. Представьте себе, что это текстовый процессор, который преобразует ваш исходный контент в токены, доступные для поиска.</p>
<p>Анализатор работает по простой двухэтапной схеме:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>Рабочий процесс анализатора</span>
  
 </span></p>
<ol>
<li><p><strong>Токенизация (обязательный этап):</strong> на этом начальном этапе применяется <strong>токенизатор</strong>, который разбивает непрерывную текстовую строку на отдельные, значимые единицы, называемые токенами. Метод токенизации может значительно варьироваться в зависимости от языка и типа контента.</p></li>
<li><p><strong>Фильтрация токенов (необязательно):</strong> после токенизации применяются <strong>фильтры</strong> для изменения, удаления или уточнения токенов. Эти операции могут включать преобразование всех токенов в нижний регистр, удаление распространённых бессмысленных слов (таких как стоп-слова) или сведение слов к их корневой форме (стеминг).</p></li>
</ol>
<p><strong>Пример</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Почему важен выбор анализатора<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Выбор неподходящего анализатора может привести к тому, что релевантные документы станут недоступны для поиска или будут возвращаться нерелевантные результаты.</p>
<p>В приведенной ниже таблице обобщены типичные проблемы, вызванные неправильным выбором анализатора, а также представлены практические решения для диагностики проблем с поиском.</p>
<table>
   <tr>
     <th><p>Проблема</p></th>
     <th><p>Симптом</p></th>
     <th><p>Пример (входные и выходные данные)</p></th>
     <th><p>Причина (неподходящий анализатор)</p></th>
     <th><p>Решение (правильный анализатор)</p></th>
   </tr>
   <tr>
     <td><p>Чрезмерная токенизация</p></td>
     <td><p>При текстовом поиске по техническим терминам, идентификаторам или URL-адресам не удается найти соответствующие документы.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ru/standard-analyzer.md"><code translate="no">standard</code></a> анализатор</p></td>
     <td><p>Используйте <a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> токенизатора; сочетайте его с <a href="/docs/ru/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> фильтром.</p></td>
   </tr>
   <tr>
     <td><p>Недостаточная токенизация</p></td>
     <td><p>При поиске компонента многословной фразы не удаётся найти документы, содержащие полную фразу.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Анализатор с <a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> токеннизатором</p></td>
     <td><p>Используйте <a href="/docs/ru/standard-tokenizer.md"><code translate="no">standard</code></a> токенизер для разделения по знакам препинания и пробелам; используйте пользовательский фильтр <a href="/docs/ru/regex-filter.md">на</a> основе <a href="/docs/ru/regex-filter.md">регулярных выражений</a>.</p></td>
   </tr>
   <tr>
     <td><p>Несоответствия языков</p></td>
     <td><p>Результаты поиска на конкретном языке не имеют смысла или отсутствуют.</p></td>
     <td><p>Текст на китайском: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (один токен)</p></td>
     <td><p><a href="/docs/ru/english-analyzer.md"><code translate="no">english</code></a> анализатор</p></td>
     <td><p>Используйте языкоспецифический анализатор, например <a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>Несоответствие методов ввода</p></td>
     <td><p>Пользователи вводят текст в системе пиньинь, но индексируемый текст содержит китайские иероглифы.</p></td>
     <td><p>Китайский текст: <code translate="no">"足球"</code>; текст запроса: <code translate="no">"zuqiu"</code></p></td>
     <td><p>Анализатор, выдающий только лексемы в виде китайских иероглифов</p></td>
     <td><p>Используйте пользовательский анализатор с <a href="/docs/ru/jieba-tokenizer.md"><code translate="no">jieba</code></a> токеннизатором и <a href="/docs/ru/pinyin-filter.md"><code translate="no">pinyin</code></a> фильтром.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Первый вопрос: нужно ли выбирать анализатор?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Во многих случаях вам не нужно предпринимать никаких специальных действий. Давайте определим, относится ли ваш случай к их числу.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Поведение по умолчанию: анализатор « <code translate="no">standard</code> »<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Если при использовании функций извлечения текста, таких как полнотекстовый поиск, вы не указываете анализатор, Milvus автоматически использует <a href="/docs/ru/standard-analyzer.md"><code translate="no">standard</code></a> анализатор.</p>
<p>Анализатор « <code translate="no">standard</code> »:</p>
<ul>
<li><p>разделяет текст по пробелам и знакам препинания</p></li>
<li><p>Преобразует все лексемы в нижний регистр</p></li>
<li><p>удаляет встроенный набор распространённых английских стоп-слов и большинство знаков препинания</p></li>
</ul>
<p><strong>Пример преобразования</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Критерии выбора: быстрая проверка<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте эту таблицу, чтобы быстро определить, соответствует ли вашим потребностям анализатор « <code translate="no">standard</code> » по умолчанию. Если нет, вам нужно будет выбрать другой вариант.</p>
<table>
   <tr>
     <th><p>Ваш контент</p></th>
     <th><p>Подходит ли стандартный анализатор?</p></th>
     <th><p>Почему</p></th>
     <th><p>Что вам нужно</p></th>
   </tr>
   <tr>
     <td><p>Статьи в блоге на английском языке</p></td>
     <td><p>✅ Да</p></td>
     <td><p>По умолчанию достаточно.</p></td>
     <td><p>Используйте настройки по умолчанию (настройка не требуется).</p></td>
   </tr>
   <tr>
     <td><p>Документы на китайском языке</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>В китайских словах нет пробелов, поэтому они будут рассматриваться как один токен.</p></td>
     <td><p>Используйте встроенный <a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a> анализатор.</p></td>
   </tr>
   <tr>
     <td><p>Документы на арабском языке</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>арабский текст может содержать варианты букв, диакритические знаки, татвиль, арабо-индийские цифры и распространённые арабские стоп-слова, которые требуют специфической для данного языка обработки.</p></td>
     <td><p>Используйте встроенный <a href="/docs/ru/arabic-analyzer.md"><code translate="no">arabic</code></a> анализатор.</p></td>
   </tr>
   <tr>
     <td><p>Документы на тайском языке</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>В тайском тексте обычно не используются пробелы между словами, поэтому требуется сегментация слов с учётом особенностей языка.</p></td>
     <td><p>Используйте встроенный <a href="/docs/ru/thai-analyzer.md"><code translate="no">thai</code></a> анализатор.</p></td>
   </tr>
   <tr>
     <td><p>Техническая документация</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>Пунктуация удаляется из таких терминов, как « <code translate="no">C++</code> ».</p></td>
     <td><p>Создайте пользовательский анализатор с помощью <a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> токеннизатора и <a href="/docs/ru/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> фильтром.</p></td>
   </tr>
   <tr>
     <td><p>Языки, в которых слова разделены пробелами, например, французский или испанский</p></td>
     <td><p>⚠️ Возможно</p></td>
     <td><p>символы с диакритическими знаками (<code translate="no">café</code> против <code translate="no">cafe</code>) могут не сопоставляться.</p></td>
     <td><p>Для получения лучших результатов <a href="/docs/ru/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> рекомендуется для получения лучших результатов.</p></td>
   </tr>
   <tr>
     <td><p>Многоязычные или неизвестные языки</p></td>
     <td><p>❌ Нет</p></td>
     <td><p>Анализатору <code translate="no">standard</code> не хватает языкоспецифической логики, необходимой для обработки различных наборов символов и правил токенизации.</p></td>
     <td><p>Используйте пользовательский анализатор с <a href="/docs/ru/icu-tokenizer.md"><code translate="no">icu</code></a> токеннизатором, поддерживающим токеннизацию с учетом Unicode. </p><p>В качестве альтернативы рассмотрите возможность настройки <a href="/docs/ru/multi-language-analyzers.md">многоязычных анализаторов</a> или <a href="/docs/ru/language-identifier.md">идентификатора языка</a> для более точной обработки многоязычного контента.</p></td>
   </tr>
</table>
<p>Если анализатор « <code translate="no">standard</code> » по умолчанию не соответствует вашим требованиям, вам необходимо реализовать другой. У вас есть два пути:</p>
<ul>
<li><p><a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Использовать встроенный анализатор</a> или</p></li>
<li><p><a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">создать собственный</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Вариант A: Использование встроенных анализаторов<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Встроенные анализаторы — это готовые решения для распространенных языков. Это самый простой способ начать работу, когда стандартный анализатор по умолчанию не подходит идеально.</p>
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
     <th><p>Поддерживаемые языки</p></th>
     <th><p>Компоненты</p></th>
     <th><p>Примечания</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Большинство языков, в которых слова разделены пробелами (английский, французский, немецкий, испанский и т. д.)</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">standard</code></p></li><li><p>Фильтры: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Универсальный анализатор для начальной обработки текста. Для одноязычных сценариев языковые анализаторы (такие как <code translate="no">english</code>) обеспечивают более высокую производительность.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Предназначен для английского языка; применяет стемминг и удаление стоп-слов для более точного семантического сопоставления в английском языке</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">standard</code></p></li><li><p>Фильтры: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Рекомендуется для контента исключительно на английском языке вместо <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Китайский</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">jieba</code></p></li><li><p>Фильтры: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>В настоящее время по умолчанию используется словарь упрощённого китайского языка.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>Арабский</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">standard</code></p></li><li><p>Фильтры: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Рекомендуется для арабского текста вместо <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Тайский</p></td>
     <td><ul><li><p>Токенизатор: <code translate="no">thai</code></p></li><li><p>Фильтры: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Рекомендуется для текста на тайском языке вместо <code translate="no">standard</code> или токенизации на основе пробелов.</p></td>
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
    </button></h3><p>Чтобы использовать встроенный анализатор, просто укажите его тип в параметре « <code translate="no">analyzer_params</code> » при определении схемы поля.</p>
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
<p>Подробные сведения об использовании см. в разделах <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>», <a href="/docs/ru/keyword-match.md">«Совпадение текста</a>» или <a href="/docs/ru/phrase-match.md">«Совпадение фраз</a>».</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Вариант B: Создание пользовательского анализатора<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Если <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">встроенные варианты</a> не соответствуют вашим потребностям, вы можете создать пользовательский анализатор, объединив токенизатор с набором фильтров. Это дает вам полный контроль над конвейером обработки текста.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Шаг 1: Выберите токенизатор в зависимости от языка<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
<h4 id="Western-languages" class="common-anchor-header">Западные языки</h4><p>Для языков, в которых слова разделяются пробелами, доступны следующие варианты:</p>
<table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Как работает</p></th>
     <th><p>Подходит для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Разделяет текст на основе пробелов и знаков препинания</p></td>
     <td><p>Обычный текст со смешанными знаками препинания</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Вывод: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Разделяет только по пробелам</p></td>
     <td><p>Предварительно обработанный контент, текст, отформатированный пользователем</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Результат: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Восточноазиатские языки</h4><p>Языки, в которых пробелы между словами используются не всегда, требуют специальных токенизаторов для правильной сегментации слов:</p>
<h5 id="Chinese" class="common-anchor-header">Китайский</h5><table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Как это работает</p></th>
     <th><p>Оптимально подходит для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Сегментация на основе китайского словаря с использованием интеллектуального алгоритма</p></td>
     <td><p><strong>Рекомендуется для китайского контента</strong> — сочетает словарь с интеллектуальными алгоритмами, специально разработанными для китайского языка</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Результат: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Чисто словарный морфологический анализ с использованием китайского словаря (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>По сравнению с <code translate="no">jieba</code>, обрабатывает китайский текст более универсальным способом</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"机器学习算法"</code></p></li><li><p>Результат: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">Тайский</h5><p>Для большинства текстов на тайском языке используйте встроенный <a href="/docs/ru/thai-analyzer.md"><code translate="no">thai</code></a> анализатор. Используйте автономный <a href="/docs/ru/thai-tokenizer.md"><code translate="no">thai</code></a> токенизатор только в том случае, если вам нужно построить пользовательский конвейер анализаторов.</p>
<table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Принцип работы</p></th>
     <th><p>Для чего лучше всего подходит</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Разделяет текст на тайском языке на токены слов и отфильтровывает пробелы и сегменты, состоящие исключительно из знаков препинания</p></td>
     <td><p>Настраиваемые конвейеры анализаторов для текста на тайском языке или смешанного текста на тайском и английском языках</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>Выход: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Японский и корейский</h5><table>
   <tr>
     <th><p>Язык</p></th>
     <th><p>Токенизатор</p></th>
     <th><p>Параметры словаря</p></th>
     <th><p>Идеально подходит для</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p>Японский</p></td>
     <td><p><a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (универсальный), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (современные термины), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (академический)</p></td>
     <td><p>Морфологический анализ с обработкой собственных имен</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Вывод: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Корейский</p></td>
     <td><p><a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Морфологический анализ корейского языка</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"안녕하세요"</code></p></li><li><p>Вывод: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Многоязычные или неизвестные языки</h4><p>Для контента, в котором языки непредсказуемы или смешаны в пределах одного документа:</p>
<table>
   <tr>
     <th><p>Токенизатор</p></th>
     <th><p>Как это работает</p></th>
     <th><p>Идеально подходит для</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Токенизация с поддержкой Unicode (International Components for Unicode)</p></td>
     <td><p>Смешанные алфавиты, неизвестные языки или случаи, когда достаточно простой токенизации</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Вывод: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Когда использовать icu</strong>:</p>
<ul>
<li><p>Смешанные языки, когда идентификация языка нецелесообразна.</p></li>
<li><p>Вы не хотите нести дополнительную нагрузку, связанную с использованием <a href="/docs/ru/multi-language-analyzers.md">многоязычных анализаторов</a> или <a href="/docs/ru/language-identifier.md">идентификатора языка</a>.</p></li>
<li><p>Контент имеет основной язык с редкими иностранными словами, которые мало влияют на общее значение (например, текст на английском языке с единичными названиями брендов или техническими терминами на японском или французском языках).</p></li>
</ul>
<p><strong>Альтернативные подходы</strong>: Для более точной обработки многоязычного контента рассмотрите возможность использования многоязычных анализаторов или идентификатора языка. Подробности см. в разделах <a href="/docs/ru/multi-language-analyzers.md">«Многоязычные анализаторы</a> » или <a href="/docs/ru/language-identifier.md">«Идентификатор языка</a>».</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Шаг 2: Добавление фильтров для повышения точности<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>После <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">выбора токенизатора</a> примените фильтры в соответствии с вашими конкретными требованиями к поиску и характеристиками контента.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Часто используемые фильтры</h4><p>Эти фильтры необходимы для большинства языковых конфигураций с разделителями пробелами (английский, французский, немецкий, испанский и т. д.) и значительно повышают качество поиска:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Принцип работы</p></th>
     <th><p>Когда использовать</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Преобразование всех токенов в нижний регистр</p></td>
     <td><p>Универсально — применяется ко всем языкам, в которых различаются регистр букв</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Результат: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Свести слова к их корню</p></td>
     <td><p>Языки с флективными формами слов (английский, французский, немецкий и т. д.)</p></td>
     <td><p>Для английского языка:</p><ul><li><p>Входные данные: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Результат: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Удаление общих бессмысленных слов</p></td>
     <td><p>Большинство языков — особенно эффективно для языков, в которых слова разделены пробелами</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Результат: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Для восточноазиатских языков (китайский, японский, корейский и т. д.) следует сосредоточиться на <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">языковых фильтрах</a>. Эти языки обычно используют иные подходы к обработке текста, и стемминг может не дать значительного эффекта.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Фильтры нормализации текста</h4><p>Эти фильтры стандартизируют вариации текста для повышения согласованности сопоставлений:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Принцип работы</p></th>
     <th><p>Когда использовать</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Преобразование символов с диакритическими знаками в их ASCII-эквиваленты</p></td>
     <td><p>Международный контент, пользовательский контент</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Вывод: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Фильтрация токенов</h4><p>Управление тем, какие токены сохраняются, на основе содержания символов или длины:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Как это работает</p></th>
     <th><p>Когда использовать</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Удаление отдельных токенов-знаков препинания</p></td>
     <td><p>Очистка результатов работы токенизаторов <code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code>, которые возвращают знаки препинания в виде отдельных токенов</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Вывод: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Оставить только буквы и цифры</p></td>
     <td><p>Технический контент, очистка текста</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Результат: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Удалить токены, выходящие за пределы указанного диапазона длины</p></td>
     <td><p>Фильтрация шума (чрезмерно длинные токены)</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Результат: <code translate="no">[['a'], ['very'], []]</code> (если <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Пользовательская фильтрация на основе шаблонов</p></td>
     <td><p>Требования к токенам для конкретной области</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Вывод: <code translate="no">[[], ['prod456']]</code> (если <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Фильтры для конкретных языков</h4><p>Эти фильтры учитывают особенности конкретных языков:</p>
<table>
   <tr>
     <th><p>Фильтр</p></th>
     <th><p>Язык</p></th>
     <th><p>Принцип работы</p></th>
     <th><p>Примеры</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Немецкий</p></td>
     <td><p>Разделяет сложные слова на компоненты, по которым можно выполнять поиск</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Результат: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Китайский</p></td>
     <td><p>Сохраняет китайские иероглифы + алфавитно-цифровые символы</p></td>
     <td><ul><li><p>Ввод: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Вывод: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Китайский</p></td>
     <td><p>Сохраняет только китайские иероглифы</p></td>
     <td><ul><li><p>Ввод: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Результат: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>Китайский</p></td>
     <td><p>Генерирует формы токенов пиньинь для китайских токенов</p></td>
     <td><ul><li><p>Входные данные: <code translate="no">["中文"]</code></p></li><li><p>Вывод: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Шаг 3: Объединение и реализация<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы создать собственный анализатор, необходимо определить токенизатор и список фильтров в словаре ` <code translate="no">analyzer_params</code> `. Фильтры применяются в том порядке, в котором они перечислены.</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Заключительный этап: тестирование с помощью <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Всегда проверяйте конфигурацию перед применением к коллекции:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Распространённые проблемы, на которые следует обратить внимание:</p>
<ul>
<li><p><strong>Чрезмерная токенизация</strong>: неправильное разделение технических терминов</p></li>
<li><p><strong>Недостаточная токенизация</strong>: фразы разделены некорректно</p></li>
<li><p><strong>Отсутствующие токены</strong>: важные термины отфильтровываются</p></li>
</ul>
<p>Подробные сведения об использовании см. в документации по <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Рекомендуемые настройки для различных сценариев использования<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе приведены рекомендуемые настройки токенизатора и фильтра для типичных сценариев использования при работе с анализаторами в Milvus. Выберите комбинацию, которая наилучшим образом соответствует типу вашего контента и требованиям к поиску.</p>
<div class="alert note">
<p>Прежде чем применить анализатор к вашей коллекции, мы рекомендуем вам использовать <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> для тестирования и проверки эффективности текстового анализа.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Языки с диакритическими знаками (французский, испанский, немецкий и т. д.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте токенизатор « <code translate="no">standard</code> » с преобразованием в нижний регистр, стеммингом с учётом особенностей языка и удалением стоп-слов. Эта конфигурация также подходит для других европейских языков при изменении значений параметров « <code translate="no">language</code> » и « <code translate="no">stop_words</code> ».</p>
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
    </button></h3><p>Для обработки текстов на английском языке с комплексной фильтрацией. Вы также можете использовать встроенный <a href="/docs/ru/english-analyzer.md"><code translate="no">english</code></a> анализатор:</p>
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
    </button></h3><p>Используйте токенизатор <code translate="no">jieba</code> и примените фильтр символов, чтобы сохранить только китайские иероглифы, латинские буквы и цифры.</p>
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
<p>Для упрощённого китайского языка « <code translate="no">cnalphanumonly</code> » удаляет все токены, кроме китайских иероглифов, алфавитно-цифрового текста и цифр. Это предотвращает влияние знаков препинания на качество поиска.</p>
</div>
<p>Если пользователи могут искать китайский текст, вводя пиньинь, используйте настраиваемый анализатор с токенизатором <code translate="no">jieba</code> и <a href="/docs/ru/pinyin-filter.md"><code translate="no">pinyin</code></a> фильтр вместо встроенного анализатора <code translate="no">chinese</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">Японский контент<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте токенизатор « <code translate="no">lindera</code> » с японским словарем и фильтрами для очистки от знаков препинания и управления длиной токенов:</p>
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
    </button></h3><p>Аналогично японскому языку: используйте токенизатор <code translate="no">lindera</code> с корейским словарём:</p>
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
    </button></h3><p>При работе с контентом, охватывающим несколько языков или непредсказуемо использующим различные алфавиты, начните с анализатора <code translate="no">icu</code>. Этот анализатор, поддерживающий Unicode, эффективно обрабатывает смешанные алфавиты и символы.</p>
<p><strong>Базовая многоязычная настройка (без стемминга)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Расширенная многоязычная обработка</strong>:</p>
<p>Для более точного управления поведением токенов в разных языках:</p>
<ul>
<li><p>Используйте конфигурацию <strong>многоязычного анализатора</strong>. Подробности см. в разделе <a href="/docs/ru/multi-language-analyzers.md">«Многоязычные анализаторы</a>».</p></li>
<li><p>Реализуйте <strong>идентификатор языка</strong> в вашем контенте. Подробности см. в разделе <a href="/docs/ru/language-identifier.md">«Идентификатор языка</a>».</p></li>
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
    </button></h2><p>После выбора анализатора вы можете интегрировать его с функциями поиска по тексту, предоставляемыми Milvus.</p>
<ul>
<li><p><strong>Полнотекстовый поиск</strong></p>
<p>Анализаторы напрямую влияют на полнотекстовый поиск на основе алгоритма BM25 посредством генерации разреженных векторов. Используйте один и тот же анализатор как для индексирования, так и для запросов, чтобы обеспечить согласованную токенизацию. Языковые анализаторы, как правило, обеспечивают более высокие оценки по алгоритму BM25, чем универсальные. Подробности реализации см. в разделе <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>».</p></li>
<li><p><strong>Сопоставление текста</strong></p>
<p>Операции сопоставления текста выполняют точное сопоставление токенов между запросами и индексированным контентом на основе результатов работы вашего анализатора. Подробности реализации см. в разделе <a href="/docs/ru/keyword-match.md">«Сопоставление текста</a>».</p></li>
<li><p><strong>Совпадение фраз</strong></p>
<p>Для сопоставления фраз требуется согласованная токенизация многословных выражений, чтобы сохранить границы фраз и их смысл. Подробности реализации см. в разделе <a href="/docs/ru/phrase-match.md">«Сопоставление фраз</a>».</p></li>
</ul>
