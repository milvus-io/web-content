---
id: language-identifier.md
title: Языковой идентификаторCompatible with Milvus v2.5.15+
summary: >-
  Идентификатор_языка - это специализированный токенизатор, предназначенный для
  расширения возможностей текстового поиска в Milvus за счет автоматизации
  процесса анализа языка. Его основная функция заключается в определении языка
  текстового поля и последующем динамическом применении предварительно
  настроенного анализатора, наиболее подходящего для этого языка. Это особенно
  ценно для приложений, работающих с различными языками, поскольку избавляет от
  необходимости вручную определять язык для каждого ввода.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Языковой идентификатор<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> - это специализированный токенизатор, предназначенный для расширения возможностей текстового поиска в Milvus путем автоматизации процесса анализа языка. Его основная функция заключается в определении языка текстового поля и последующем динамическом применении предварительно настроенного анализатора, наиболее подходящего для этого языка. Это особенно ценно для приложений, работающих с различными языками, поскольку избавляет от необходимости вручную определять язык для каждого ввода.</p>
<p>Интеллектуально направляя текстовые данные на соответствующий конвейер обработки, <code translate="no">language_identifier</code> упрощает ввод многоязычных данных и обеспечивает точную токенизацию для последующих операций поиска и извлечения.</p>
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
    </button></h2><p>Устройство <code translate="no">language_identifier</code> выполняет ряд шагов для обработки текстовой строки, и этот процесс очень важен для пользователей, чтобы понять, как правильно его настроить.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс обнаружения языка</span> </span></p>
<ol>
<li><p><strong>Вход:</strong> Рабочий процесс начинается с ввода текстовой строки.</p></li>
<li><p><strong>Определение языка:</strong> Эта строка сначала передается механизму определения языка, который пытается определить язык. Milvus поддерживает два механизма: <strong>whatlang</strong> и <strong>lingua</strong>.</p></li>
<li><p><strong>Выбор анализатора:</strong></p>
<ul>
<li><p><strong>Успех:</strong> Если язык успешно обнаружен, система проверяет, есть ли у обнаруженного названия языка соответствующий анализатор, настроенный в вашем словаре <code translate="no">analyzers</code>. Если совпадение найдено, система применяет указанный анализатор к вводимому тексту. Например, обнаруженный текст "Mandarin" будет направлен на токенизатор <code translate="no">jieba</code>.</p></li>
<li><p><strong>Обратное действие:</strong> Если обнаружение не удалось, или если язык был успешно обнаружен, но вы не указали для него конкретный анализатор, система по умолчанию переходит к предварительно настроенному <strong>анализатору по умолчанию</strong>. Это очень важный момент: анализатор <code translate="no">default</code> является запасным вариантом как при неудачном обнаружении, так и при отсутствии подходящего анализатора.</p></li>
</ul></li>
</ol>
<p>После выбора подходящего анализатора текст токенизируется и обрабатывается, завершая рабочий процесс.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Доступные механизмы обнаружения языков<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предлагает выбор между двумя механизмами обнаружения языков:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua .</a></p></li>
</ul>
<p>Выбор зависит от конкретных требований к производительности и точности вашего приложения.</p>
<table>
   <tr>
     <th><p>Движок</p></th>
     <th><p>Скорость</p></th>
     <th><p>Точность</p></th>
     <th><p>Формат вывода</p></th>
     <th><p>Лучший для</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Быстрый</p></td>
     <td><p>Хорошо подходит для большинства языков</p></td>
     <td><p>Названия языков (например, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Ссылка:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Колонка "Язык" в таблице поддерживаемых языков</a></p></td>
     <td><p>Приложения реального времени, для которых важна скорость</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Медленнее</p></td>
     <td><p>Более высокая точность, особенно для коротких текстов</p></td>
     <td><p>Имена на английском языке (например, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Ссылка:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Список поддерживаемых языков</a></p></td>
     <td><p>Приложения, в которых точность важнее скорости</p></td>
   </tr>
</table>
<p>Важнейшим моментом является соглашение о присвоении имен. Хотя оба движка возвращают названия языков на английском языке, они используют разные термины для некоторых языков (например, <code translate="no">whatlang</code> возвращает <code translate="no">Mandarin</code>, а <code translate="no">lingua</code> возвращает <code translate="no">Chinese</code>). Ключ анализатора должен точно совпадать с именем, возвращаемым выбранным механизмом обнаружения.</p>
<h2 id="Configuration" class="common-anchor-header">Конфигурация<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы правильно использовать токенизатор <code translate="no">language_identifier</code>, необходимо выполнить следующие шаги по определению и применению его конфигурации.</p>
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
    </button></h3><p>Суть настройки <code translate="no">language_identifier</code> заключается в настройке анализаторов на конкретные языки, которые вы планируете поддерживать. Система работает, сопоставляя обнаруженный язык с соответствующим анализатором, поэтому этот шаг очень важен для точной обработки текста.</p>
<p>Ниже приведено рекомендуемое сопоставление языков с подходящими анализаторами Milvus. Эта таблица служит связующим звеном между выходными данными системы обнаружения языков и наилучшим инструментом для работы.</p>
<table>
   <tr>
     <th><p>Язык (выходной сигнал детектора)</p></th>
     <th><p>Рекомендуемый анализатор</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Токенизация стандартного английского языка с фильтрацией стоп-слов и стемминга.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (через whatlang) или <code translate="no">Chinese</code> (через lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Сегментация китайских слов для текста, не разделенного пробелами.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Надежный токенизатор для сложных шрифтов, включая японский.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Пользовательская конфигурация для работы с французскими акцентами и символами.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>Ключевым моментом является соответствие:</strong> Название вашего анализатора <strong>должно точно соответствовать</strong> языку, на котором работает механизм обнаружения. Например, если вы используете <code translate="no">whatlang</code>, ключ для китайского текста должен быть <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Лучшие практики:</strong> В таблице выше приведены рекомендуемые конфигурации для нескольких распространенных языков, но это не исчерпывающий список. Более подробное руководство по выбору анализаторов см. в разделе <a href="/docs/ru/choose-the-right-analyzer-for-your-use-case.md">Выбор правильного анализатора для вашего случая использования</a>.</p></li>
<li><p><strong>Выходные данные детектора</strong>: Полный список названий языков, возвращаемых механизмами обнаружения, приведен в <a href="https://github.com/greyblake/whatlang-rs">таблице поддерживаемых языков Whatlang</a> и в <a href="https://github.com/pemistahl/lingua-rs">списке поддерживаемых языков Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Шаг 2: Определите параметры анализатора (analyzer_params)<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Чтобы использовать токенизатор <code translate="no">language_identifier</code> в Milvus, создайте словарь, содержащий эти ключевые компоненты:</p>
<p><strong>Необходимые компоненты:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - словарь, содержащий все конфигурации анализатора, которые должны включать:</p>
<ul>
<li><p><code translate="no">default</code> - Резервный анализатор, используемый при неудачном определении языка или при отсутствии подходящего анализатора.</p></li>
<li><p><strong>Языковые анализаторы</strong> - каждый из них определяется как <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, где:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> соответствует выбранному вами механизму обнаружения (например, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> соответствует стандартному формату параметров анализатора (см. <a href="/docs/ru/analyzer-overview.md#Analyzer-types">Обзор анализаторов</a>).</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Необязательные компоненты:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Указывает, какой движок обнаружения языка использовать (<code translate="no">whatlang</code> или <code translate="no">lingua</code>). По умолчанию используется <code translate="no">whatlang</code>, если не указано.</p></li>
<li><p><code translate="no">mapping</code> - Создает пользовательские псевдонимы для ваших анализаторов, позволяя вам использовать описательные имена вместо точного формата вывода движка обнаружения.</p></li>
</ul>
<p>Токенайзер работает, сначала определяя язык входного текста, а затем выбирая соответствующий анализатор из вашей конфигурации. Если обнаружение не удается или подходящего анализатора не существует, он автоматически возвращается к вашему анализатору <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Рекомендуется: Прямое сопоставление имен</h4><p>Имена ваших анализаторов должны точно совпадать с результатами выбранного вами механизма определения языка. Такой подход проще и позволяет избежать возможной путаницы.</p>
<p>Для <code translate="no">whatlang</code> и <code translate="no">lingua</code> используйте названия языков, указанные в соответствующей документации:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">поддерживаемые языки whatlang</a> (используйте колонку<strong>"Язык</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">поддерживаемые языки lingua</a></p></li>
</ul>
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
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Альтернативный подход: Пользовательские имена с отображением</h4><p>Если вы предпочитаете использовать собственные имена анализаторов или вам необходимо сохранить совместимость с существующими конфигурациями, вы можете использовать параметр <code translate="no">mapping</code>. Он создает псевдонимы для ваших анализаторов - будут работать как оригинальные имена движка обнаружения, так и ваши пользовательские имена.</p>
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
<p>Определив <code translate="no">analyzer_params</code>, вы можете применить их к полю <code translate="no">VARCHAR</code> при определении схемы коллекции. Это позволит Milvus обрабатывать текст в этом поле с помощью указанного анализатора для эффективной токенизации и фильтрации. Подробнее см. в разделе <a href="/docs/ru/analyzer-overview.md#Example-use">Пример использования</a>.</p>
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
    </button></h2><p>Здесь приведены некоторые готовые конфигурации для распространенных сценариев. Каждый пример включает в себя конфигурацию и проверочный код, чтобы вы могли сразу же протестировать настройку.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Обнаружение английского и китайского языков<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

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
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Европейские языки с нормализацией акцента<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
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
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
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
<li><p><strong>Один язык на поле:</strong> Работает с полем как с единой, однородной единицей текста. Он предназначен для работы с разными языками в разных записях данных, например, одна запись содержит английское предложение, а другая - французское.</p></li>
<li><p><strong>Нет строк со смешанными языками:</strong> Он <strong>не</strong> предназначен для обработки одной строки, содержащей текст на нескольких языках. Например, одно поле <code translate="no">VARCHAR</code>, содержащее английское предложение и японскую фразу в кавычках, будет обработано как один язык.</p></li>
<li><p><strong>Обработка доминирующего языка:</strong> В смешанных языковых сценариях механизм обнаружения, скорее всего, определит доминирующий язык, и соответствующий анализатор будет применен ко всему тексту. Это приведет к плохой токенизации или ее отсутствию для встроенного иностранного текста.</p></li>
</ul>
