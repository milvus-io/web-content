---
id: language-identifier.md
title: Идентификатор языкаCompatible with Milvus v2.5.15+
summary: >-
  language_identifier — это специализированный токенизатор, предназначенный для
  расширения возможностей текстового поиска в Milvus за счет автоматизации
  процесса языкового анализа. Его основная функция заключается в определении
  языка текстового поля и последующем динамическом применении заранее
  настроенного анализатора, наиболее подходящего для данного языка. Это особенно
  ценно для приложений, работающих с различными языками, поскольку избавляет от
  необходимости вручную назначать язык для каждого отдельного ввода.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Идентификатор языка<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> — это специализированный токенизатор, разработанный для расширения возможностей текстового поиска в Milvus за счет автоматизации процесса языкового анализа. Его основная функция заключается в определении языка текстового поля и последующем динамическом применении заранее настроенного анализатора, наиболее подходящего для данного языка. Это особенно ценно для приложений, работающих с различными языками, поскольку устраняет необходимость ручного назначения языка для каждого отдельного ввода.</p>
<p>Благодаря интеллектуальной маршрутизации текстовых данных в соответствующий конвейер обработки модуль « <code translate="no">language_identifier</code> » оптимизирует прием многоязычных данных и обеспечивает точную токенизацию для последующих операций поиска и извлечения.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Рабочий процесс определения языка<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> выполняет ряд шагов для обработки текстовой строки — этот рабочий процесс крайне важен для понимания пользователями того, как правильно настроить систему.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" /> 
   <span>Рабочий процесс определения языка</span>
  
 </span></p>
<ol>
<li><p><strong>Входные данные:</strong> Рабочий процесс начинается с текстовой строки в качестве входных данных.</p></li>
<li><p><strong>Определение языка:</strong> эта строка сначала передаётся в механизм определения языка, который пытается идентифицировать язык. Milvus поддерживает два механизма: <strong>whatlang</strong> и <strong>lingua</strong>.</p></li>
<li><p><strong>Выбор анализатора:</strong></p>
<ul>
<li><p><strong>Успех:</strong> если язык успешно определён, система проверяет, есть ли для названия обнаруженного языка соответствующий анализатор, настроенный в словаре <code translate="no">analyzers</code>. Если совпадение найдено, система применяет указанный анализатор к входному тексту. Например, текст, в котором обнаружен «мандаринский», будет направлен на токенизатор <code translate="no">jieba</code>.</p></li>
<li><p><strong>Резервный вариант:</strong> если обнаружение не удалось или если язык был успешно обнаружен, но вы не указали для него конкретный анализатор, система по умолчанию использует предварительно настроенный <strong>анализатор по умолчанию</strong>. Это очень важный момент, который следует уточнить: анализатор <code translate="no">default</code> является резервным вариантом как в случае сбоя обнаружения, так и в случае отсутствия подходящего анализатора.</p></li>
</ul></li>
</ol>
<p>После выбора подходящего анализатора текст токенизируется и обрабатывается, завершая рабочий процесс.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Доступные механизмы определения языка<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предлагает на выбор два механизма определения языка:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>Выбор зависит от конкретных требований вашего приложения к производительности и точности.</p>
<table>
   <tr>
     <th><p>Механизм</p></th>
     <th><p>Скорость</p></th>
     <th><p>Точность</p></th>
     <th><p>Формат вывода</p></th>
     <th><p>Оптимально подходит для</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Быстро</p></td>
     <td><p>Подходит для большинства языков</p></td>
     <td><p>Названия языков (например, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code> , <code translate="no">"Japanese"</code>)</p><p><strong>См.:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">столбец «Язык» в таблице поддерживаемых языков</a></p></td>
     <td><p>Приложения, работающие в режиме реального времени, где скорость имеет решающее значение</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Медленнее</p></td>
     <td><p>Более высокая точность, особенно для коротких текстов</p></td>
     <td><p>Названия языков на английском (например, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>См.:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Список поддерживаемых языков</a></p></td>
     <td><p>Приложения, в которых точность важнее скорости</p></td>
   </tr>
</table>
<p>Важным моментом является соглашение об именовании, используемое механизмом. Хотя оба механизма возвращают названия языков на английском, для некоторых языков они используют разные термины (например, <code translate="no">whatlang</code> возвращает <code translate="no">Mandarin</code>, а <code translate="no">lingua</code> — <code translate="no">Chinese</code>). Ключ анализатора должен точно совпадать с названием, возвращаемым выбранным механизмом определения.</p>
<h2 id="Configuration" class="common-anchor-header">Настройка<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Для правильного использования токенизатора <code translate="no">language_identifier</code> необходимо выполнить следующие шаги, чтобы определить и применить его конфигурацию.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Шаг 1: Выбор языков и анализаторов<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>Основой настройки <code translate="no">language_identifier</code> является подбор анализаторов для конкретных языков, которые вы планируете поддерживать. Система работает путем сопоставления обнаруженного языка с правильным анализатором, поэтому этот шаг имеет решающее значение для точной обработки текста.</p>
<p>Ниже приведено рекомендуемое сопоставление языков с подходящими анализаторами Milvus. Эта таблица служит связующим звеном между результатами работы механизма определения языка и наиболее подходящим инструментом для данной задачи.</p>
<table>
   <tr>
     <th><p>Язык (результат работы модуля определения языка)</p></th>
     <th><p>Рекомендуемый анализатор</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Стандартная токенизация английского языка с стеммингом и фильтрацией стоп-слов.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (через whatlang) или « <code translate="no">Chinese</code> » (через lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Сегментация китайских слов для текста, не разделённого пробелами.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Надежный токенизатор для сложных систем письма, включая японскую.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Пользовательская конфигурация, обрабатывающая французские диакритические знаки и символы.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>Соответствие — ключ к успеху:</strong> название вашего анализатора <strong>должно точно совпадать с</strong> языком, указанным в результатах работы механизма определения языка. Например, если вы используете <code translate="no">whatlang</code>, ключ для китайского текста должен быть <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Рекомендации:</strong> в<strong>приведенной</strong> выше таблице представлены рекомендуемые настройки для нескольких распространенных языков, но это не исчерпывающий список. Более подробное руководство по выбору анализаторов см. в статье <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md">«Выбор подходящего анализатора для вашего сценария использования</a>».</p></li>
<li><p><strong>Вывод модуля определения языка</strong>: полный список названий языков, возвращаемых модулями определения языка, см. в <a href="https://github.com/greyblake/whatlang-rs">таблице поддерживаемых языков Whatlang</a> и <a href="https://github.com/pemistahl/lingua-rs">списке поддерживаемых языков Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Шаг 2: Определение параметров анализатора (analyser_params)<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы использовать токенизатор « <code translate="no">language_identifier</code> » в Milvus, создайте словарь, содержащий следующие ключевые компоненты:</p>
<p><strong>Обязательные компоненты:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> набор конфигураций (config set) — словарь, содержащий все конфигурации анализаторов, который должен включать:</p>
<ul>
<li><p><code translate="no">default</code> – резервный анализатор, используемый в случае сбоя определения языка или если не найден подходящий анализатор</p></li>
<li><p><strong>Языковые анализаторы</strong> — каждый из которых определяется как <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, где:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> соответствует выводу выбранного вами механизма определения языка (например, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> соответствует стандартному формату параметров анализатора (см. <a href="/docs/ru/analyzer-overview.md#Analyzer-types">«Обзор анализаторов</a>»)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Дополнительные компоненты:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> – Указывает, какой механизм определения языка следует использовать (<code translate="no">whatlang</code> или <code translate="no">lingua</code>). По умолчанию используется <code translate="no">whatlang</code>, если не указано иное</p></li>
<li><p><code translate="no">mapping</code> – Создает пользовательские псевдонимы для ваших анализаторов, что позволяет использовать описательные имена вместо точного формата вывода механизма определения языка</p></li>
</ul>
<p>Токенизатор сначала определяет язык входного текста, а затем выбирает соответствующий анализатор из вашей конфигурации. Если определение языка не удалось или подходящего анализатора не существует, он автоматически переключается на ваш анализатор <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Рекомендуется: прямое сопоставление имен</h4><p>Имена ваших анализаторов должны точно совпадать с выводом выбранного вами механизма определения языка. Такой подход проще и позволяет избежать возможной путаницы.</p>
<p>Как для <code translate="no">whatlang</code>, так и для <code translate="no">lingua</code> используйте названия языков, указанные в соответствующей документации:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">языки, поддерживаемые whatlang</a> (используйте столбец «<strong>Language</strong>»)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">языки, поддерживаемые lingua</a></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);   <span class="hljs-comment">// Must be `language_identifier`</span>
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);        <span class="hljs-comment">// or `lingua`</span>
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// A set of analyzer configs</span>
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>); <span class="hljs-comment">// fallback if language detection fails</span>
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,            <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{         <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,       <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {                  <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {               <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>}, <span class="hljs-comment">// Must be `language_identifier`</span>
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},      <span class="hljs-comment">// or `lingua`</span>
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {                  <span class="hljs-comment">// A set of analyzer configs</span>
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}}, <span class="hljs-comment">// fallback if language detection fails</span>
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},       <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
    <span class="hljs-attr">analyzers</span>: {                 <span class="hljs-comment">// A set of analyzer configs</span>
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,   <span class="hljs-comment">// fallback if language detection fails</span>
      },
      <span class="hljs-title class_">English</span>: {                 <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-title class_">Mandarin</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// A set of analyzer configs</span>
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;whatlang&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;English&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;Mandarin&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Альтернативный подход: пользовательские имена с сопоставлением</h4><p>Если вы предпочитаете использовать пользовательские имена анализаторов или вам необходимо сохранить совместимость с существующими конфигурациями, вы можете использовать параметр <code translate="no">mapping</code>. Это создает псевдонимы для ваших анализаторов — будут работать как исходные имена механизмов обнаружения, так и ваши пользовательские имена.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;english_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
    put(<span class="hljs-string">&quot;mapping&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Maps detection output to custom name</span>
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>);
        put(<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>);
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Maps detection output to custom names</span>
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment">// Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;english_analyzer&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},      <span class="hljs-comment">// Custom analyzer name</span>
            {<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Custom analyzer name</span>
        }},
        {<span class="hljs-string">&quot;mapping&quot;</span>, {                                          <span class="hljs-comment">// Maps detection output to custom names</span>
            {<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>},
            {<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>}
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
      },
      <span class="hljs-attr">english_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-attr">chinese_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
    <span class="hljs-attr">mapping</span>: {            <span class="hljs-comment">// Maps detection output to custom names</span>
      <span class="hljs-title class_">English</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
      <span class="hljs-title class_">Chinese</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>
            },
            [<span class="hljs-string">&quot;english_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;chinese_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        [<span class="hljs-string">&quot;mapping&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Maps detection output to custom names</span>
        {
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            [<span class="hljs-string">&quot;Chinese&quot;</span>] = <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;lingua&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;english_analyzer&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;chinese_analyzer&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    },
    &quot;mapping&quot;: {
      &quot;English&quot;: &quot;english_analyzer&quot;,
      &quot;Chinese&quot;: &quot;chinese_analyzer&quot;
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>После определения <code translate="no">analyzer_params</code> вы можете применить их к полю <code translate="no">VARCHAR</code> при определении схемы коллекции. Это позволяет Milvus обрабатывать текст в этом поле с использованием указанного анализатора для эффективной токенизации и фильтрации. Подробности см. в разделе <a href="/docs/ru/analyzer-overview.md#Example-use">«Пример использования</a>».</p>
<h2 id="Examples" class="common-anchor-header">Примеры<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Ниже приведены готовые конфигурации для типичных сценариев. Каждый пример содержит как конфигурацию, так и код для проверки, чтобы вы могли сразу же протестировать настройку.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Распознавание английского и китайского языков<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)

<span class="hljs-comment"># Chinese text</span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});

<span class="hljs-comment">// English text</span>
List&lt;String&gt; english = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
english.add(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">enResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(english)
        .analyzerParams(analyzerParams)
        .build());

<span class="hljs-comment">// Chinese text</span>
List&lt;String&gt; chinese = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
chinese.add(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">cnResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(chinese)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>},
        },
    },
}

<span class="hljs-comment">// English text</span>
enResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> enResult {
    fmt.Println(<span class="hljs-string">&quot;English:&quot;</span>, tokens.Tokens)
}

<span class="hljs-comment">// Chinese text</span>
cnResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> cnResult {
    fmt.Println(<span class="hljs-string">&quot;Chinese:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
});

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">en_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params.<span class="hljs-title function_ invoke__">clone</span>())
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">cn_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}
        }}
    }}
};

<span class="hljs-comment">// English text</span>
milvus::RunAnalyzerRequest en_request;
en_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
en_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
milvus::RunAnalyzerResponse en_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(en_request, en_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Chinese text</span>
milvus::RunAnalyzerRequest cn_request;
cn_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
cn_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
milvus::RunAnalyzerResponse cn_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(cn_request, cn_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">Mandarin</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span> },
    },
  },
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">const</span> en_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;The Milvus vector database is built for scale!&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;English:&#x27;</span>, en_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">const</span> cn_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Milvus 向量数据库专为大规模应用而设计&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Chinese:&#x27;</span>, cn_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span> }
        }
    }
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span> }
});

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;whatlang\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;Mandarin\&quot;:{\&quot;tokenizer\&quot;:\&quot;jieba\&quot;}}}}&quot;,
    &quot;text&quot;: [&quot;The Milvus vector database is built for scale!&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Европейские языки с нормализацией диакритических знаков<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;French&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
            put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>));
        }});
    }});
}});

<span class="hljs-comment">// Test with accented text</span>
List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>:    []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>},
            },
        },
    },
}

<span class="hljs-comment">// Test with accented text</span>
result, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> result {
    fmt.Println(<span class="hljs-string">&quot;French:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
});

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Café français très délicieux&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;French&quot;</span>, {
                {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
                {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>}}
            }}
        }}
    }}
};

<span class="hljs-comment">// Test with accented text</span>
milvus::RunAnalyzerRequest request;
request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">French</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-attr">filter</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>],
      },
    },
  },
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">const</span> fr_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Café français très délicieux&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;French:&#x27;</span>, fr_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;French&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
                [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Café français très délicieux&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;lingua\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;French\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;,\&quot;filter\&quot;:[\&quot;lowercase\&quot;,\&quot;asciifolding\&quot;]}}}}&quot;,
    &quot;text&quot;: [&quot;Café français très délicieux&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Ожидаемый результат<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><p>В приведенном выше примере с европейскими языками генерируются следующие токены в указанном порядке. Объекты ответа SDK и формат вывода варьируются в зависимости от языка; ответ REST содержит эти токены по адресу <code translate="no">data.results[].tokens[].token</code>. Последовательность токенов для примера распознавания английского и китайского языков зависит от того, какой анализатор выбирает детектор для каждого входного значения, поэтому она здесь не приводится.</p>
<pre><code translate="no" class="language-plaintext">French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Примечания по использованию<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Один язык на поле:</strong> система обрабатывает поле как единую, однородную текстовую единицу. Она предназначена для работы с разными языками в разных записях данных, например, когда одна запись содержит предложение на английском языке, а следующая — на французском.</p></li>
<li><p><strong>Отсутствие смешанных языковых строк:</strong> функция <strong>не</strong> предназначена для обработки одной строки, содержащей текст на нескольких языках. Например, одно поле <code translate="no">VARCHAR</code>, содержащее как предложение на английском языке, так и цитату на японском, будет обработано как текст на одном языке.</p></li>
<li><p><strong>Обработка доминирующего языка:</strong> в случаях смешанных языков механизм распознавания, скорее всего, определит доминирующий язык, и к всему тексту будет применен соответствующий анализатор. Это приведет к некачественной токенизации встроенного текста на иностранном языке или к ее полному отсутствию.</p></li>
</ul>
