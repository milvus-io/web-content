---
id: analyzer-overview.md
title: Обзор анализатора
summary: >-
  В области обработки текстов анализатор является ключевым компонентом,
  преобразующим исходный текст в структурированный формат, пригодный для поиска.
  Каждый анализатор, как правило, состоит из двух основных элементов:
  токенизатора и фильтра. Вместе они преобразуют входной текст в токены, очищают
  эти токены и готовят их для эффективного индексирования и поиска.
---
<h1 id="Analyzer-Overview" class="common-anchor-header">Обзор анализатора<button data-href="#Analyzer-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>В обработке текста <strong>анализатор</strong> является ключевым компонентом, преобразующим необработанный текст в структурированный формат, пригодный для поиска. Каждый анализатор, как правило, состоит из двух основных элементов: <strong>токенизатора</strong> и <strong>фильтра</strong>. Вместе они преобразуют входной текст в токены, очищают эти токены и готовят их для эффективного индексирования и поиска.</p>
<p>В Milvus анализаторы настраиваются при создании коллекции, когда вы добавляете поля типа « <code translate="no">VARCHAR</code> » в схему коллекции. Токены, сгенерированные анализатором, можно использовать для построения индекса для сопоставления по ключевым словам или преобразовать в разреженные вложения для полнотекстового поиска. Дополнительную информацию см. в разделах <a href="/docs/ru/full-text-search.md">«Полнотекстовый поиск</a>», <a href="/docs/ru/phrase-match.md">«Сопоставление фраз</a>» или <a href="/docs/ru/keyword-match.md">«Сопоставление текста</a>».</p>
<div class="alert note">
<p>Использование анализаторов может повлиять на производительность:</p>
<ul>
<li><p><strong>Полнотекстовый поиск:</strong> при полнотекстовом поиске каналы <strong>DataNode</strong> и <strong>QueryNode</strong> обрабатывают данные медленнее, поскольку им приходится дожидаться завершения токенизации. В результате для новых данных требуется больше времени, прежде чем они станут доступны для поиска.</p></li>
<li><p><strong>Сопоставление по ключевым словам:</strong> при сопоставлении по ключевым словам создание индекса также происходит медленнее, поскольку перед построением индекса необходимо завершить токенизацию.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer" class="common-anchor-header">Структура анализатора<button data-href="#Anatomy-of-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Анализатор в Milvus состоит ровно из одного <strong>токенизатора</strong> и <strong>нуля или более</strong> фильтров.</p>
<ul>
<li><p><strong>Токенизатор</strong>: токенизатор разбивает входной текст на дискретные единицы, называемые токенами. Эти токены могут быть словами или фразами, в зависимости от типа токенизатора.</p></li>
<li><p><strong>Фильтры</strong>: к токенам можно применять фильтры для их дальнейшей очистки, например, путем преобразования в нижний регистр или удаления общих слов.</p></li>
</ul>
<div class="alert note">
<p>Токенизаторы поддерживают только формат UTF-8. Поддержка других форматов будет добавлена в будущих версиях.</p>
</div>
<p>На приведенном ниже схеме рабочего процесса показано, как анализатор обрабатывает текст.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-process-workflow.png" alt="Analyzer Process Workflow" class="doc-image" id="analyzer-process-workflow" /> 
   <span>Схема работы анализатора</span>
  
 </span></p>
<h2 id="Analyzer-types" class="common-anchor-header">Типы анализаторов<button data-href="#Analyzer-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предоставляет два типа анализаторов для удовлетворения различных потребностей в обработке текста:</p>
<ul>
<li><p><strong>Встроенный анализатор</strong>: это предопределенные конфигурации, которые позволяют решать типичные задачи обработки текста с минимальной настройкой. Встроенные анализаторы идеально подходят для универсального поиска, так как не требуют сложной настройки.</p></li>
<li><p><strong>Пользовательский анализатор</strong>: для более сложных задач пользовательские анализаторы позволяют определять собственную конфигурацию, указывая как токенизатор, так и ноль или несколько фильтров. Такой уровень настройки особенно полезен для специализированных сценариев использования, где требуется точный контроль над обработкой текста.</p></li>
</ul>
<div class="alert note">
<ul>
<li>Если при создании коллекции не указаны настройки анализатора, Milvus по умолчанию использует для всей обработки текста анализатор « <code translate="no">standard</code> ». Подробности см. в разделе <a href="/docs/ru/standard-analyzer.md">«Стандартный анализатор</a>».</li>
<li>Для обеспечения оптимальной производительности поиска и запросов выбирайте анализатор, соответствующий языку ваших текстовых данных. Например, хотя анализатор « <code translate="no">standard</code> » является универсальным, он может оказаться не лучшим выбором для языков с уникальными грамматическими структурами, таких как китайский, арабский, тайский, японский или корейский. В таких случаях рекомендуется использовать языкоспецифический анализатор, например <a href="/docs/ru/chinese-analyzer.md"><code translate="no">chinese</code></a>, <a href="/docs/ru/arabic-analyzer.md"><code translate="no">arabic</code></a>, или <a href="/docs/ru/thai-analyzer.md"><code translate="no">thai</code></a>, либо пользовательские анализаторы со специализированными токенизаторами (такими как <a href="/docs/ru/lindera-tokenizer.md"><code translate="no">lindera</code></a>, <a href="/docs/ru/icu-tokenizer.md"><code translate="no">icu</code></a>), и фильтров, чтобы обеспечить точную токенизацию и более качественные результаты поиска.</li>
</ul>
</div>
<h3 id="Built-in-analyzer" class="common-anchor-header">Встроенный анализатор<button data-href="#Built-in-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Встроенные анализаторы в Milvus предварительно настроены с использованием определённых токенизаторов и фильтров, что позволяет использовать их сразу, без необходимости самостоятельного определения этих компонентов. Каждый встроенный анализатор служит шаблоном, включающим предустановленный токенизатор и фильтры, а также дополнительные параметры для настройки.</p>
<p>Например, чтобы использовать встроенный анализатор « <code translate="no">standard</code> », просто укажите его имя <code translate="no">standard</code> в качестве параметра <code translate="no">type</code> и, при желании, добавьте дополнительные настройки, характерные для этого типа анализатора, такие как <code translate="no">stop_words</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы проверить результат работы анализатора, используйте метод <code translate="no">run_analyzer</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment"># Run analyzer</span>
result = client.run_analyzer(
    text,
    analyzer_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascrip# Sample text to analyze</span>
<span class="hljs-keyword">const</span> text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment">// Run analyzer</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    text,
    analyzer_params
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Результат будет следующим:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;efficient&#x27;, &#x27;system&#x27;, &#x27;relies&#x27;, &#x27;on&#x27;, &#x27;robust&#x27;, &#x27;analyzer&#x27;, &#x27;to&#x27;, &#x27;correctly&#x27;, &#x27;process&#x27;, &#x27;text&#x27;, &#x27;various&#x27;, &#x27;applications&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>Это демонстрирует, что анализатор правильно токенизирует входной текст, отфильтровывая стоп-слова <code translate="no">&quot;a&quot;</code>, <code translate="no">&quot;an&quot;</code> и <code translate="no">&quot;for&quot;</code>, возвращая оставшиеся значимые токены.</p>
<p>Настройка встроенного анализатора <code translate="no">standard</code>, приведенная выше, эквивалентна настройке <a href="/docs/ru/analyzer-overview.md#Custom-analyzer">пользовательского анализатора</a> со следующими параметрами, где опции <code translate="no">tokenizer</code> и <code translate="no">filter</code> явно определены для обеспечения аналогичной функциональности:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       &quot;lowercase&quot;,
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
   ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus предлагает следующие встроенные анализаторы, каждый из которых предназначен для конкретных задач обработки текста:</p>
<ul>
<li><p><code translate="no">standard</code>: Подходит для универсальной обработки текста с применением стандартной токенизации и фильтрации строчных букв.</p></li>
<li><p><code translate="no">english</code>: Оптимизирован для текстов на английском языке с поддержкой английских стоп-слов.</p></li>
<li><p><code translate="no">chinese</code>: Специализирован для обработки текстов на китайском языке, включая токенизацию, адаптированную к структурам китайского языка.</p></li>
<li><p><code translate="no">arabic</code>: Специализирован для арабского текста, с нормализацией арабского языка, нормализацией десятичных цифр, стеммингом арабских слов и удалением арабских стоп-слов.</p></li>
<li><p><code translate="no">thai</code>: Специализирован для текстов на тайском языке, с сегментацией слов на тайском, нормализацией десятичных цифр и удалением тайских стоп-слов.</p></li>
</ul>
<h3 id="Custom-analyzer" class="common-anchor-header">Пользовательский анализатор<button data-href="#Custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Для более сложной обработки текста пользовательские анализаторы в Milvus позволяют создавать индивидуальный конвейер обработки текста, задавая как <strong>токенизатор</strong>, так и <strong>фильтры</strong>. Такая настройка идеально подходит для специализированных задач, где требуется точный контроль.</p>
<h4 id="Tokenizer" class="common-anchor-header">Токенизатор</h4><p><strong>Токенизатор</strong> является <strong>обязательным</strong> компонентом пользовательского анализатора, который запускает конвейер анализатора, разбивая входной текст на дискретные единицы, или <strong>токены</strong>. Токенизация осуществляется по определённым правилам, таким как разделение по пробелам или знакам препинания, в зависимости от типа токенизатора. Этот процесс позволяет более точно и независимо обрабатывать каждое слово или фразу.</p>
<p>Например, токенизатор преобразует текст « <code translate="no">&quot;Vector Database Built for Scale&quot;</code> » в отдельные токены:</p>
<pre><code translate="no" class="language-plaintext">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример указания токенизатора</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter" class="common-anchor-header">Фильтр</h4><p><strong>Фильтры</strong> — это <strong>опциональные</strong> компоненты, работающие с токенами, сгенерированными токенизатором, и преобразующие или уточняющие их по мере необходимости. Например, после применения фильтра « <code translate="no">lowercase</code> » к токенизированным терминам « <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> » результат может выглядеть следующим образом:</p>
<pre><code translate="no" class="language-sql">[&quot;vector&quot;, &quot;database&quot;, &quot;built&quot;, &quot;for&quot;, &quot;scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Фильтры в пользовательском анализаторе могут быть как <strong>встроенными</strong>, так и <strong>пользовательскими</strong>, в зависимости от потребностей конфигурации.</p>
<ul>
<li><p><strong>Встроенные фильтры</strong>: предварительно настроены Milvus и требуют минимальной настройки. Вы можете использовать эти фильтры сразу после установки, указав их имена. Ниже перечислены встроенные фильтры, готовые к непосредственному использованию:</p>
<ul>
<li><p><code translate="no">lowercase</code>: Преобразует текст в нижний регистр, обеспечивая сопоставление без учета регистра. Подробности см. в разделе <a href="/docs/ru/lowercase-filter.md">«Преобразование в нижний регистр</a>».</p></li>
<li><p><code translate="no">asciifolding</code>: Преобразует символы, не входящие в ASCII, в их ASCII-эквиваленты, упрощая обработку многоязычного текста. Подробности см. в разделе <a href="/docs/ru/ascii-folding-filter.md">«ASCII folding</a>».</p></li>
<li><p><code translate="no">alphanumonly</code>: Сохраняет только алфавитно-цифровые символы, удаляя остальные. Подробности см. в разделе <a href="/docs/ru/alphanumonly-filter.md">«Alphanumonly</a>».</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Удаляет лексемы, содержащие любые символы, кроме китайских иероглифов, английских букв или цифр. Подробности см. в разделе <a href="/docs/ru/cnalphanumonly-filter.md">«Cnalphanumonly</a>».</p></li>
<li><p><code translate="no">cncharonly</code>: Удаляет лексемы, содержащие любые символы, отличные от китайских иероглифов. Подробности см. в разделе <a href="/docs/ru/cncharonly-filter.md">«Cncharonly</a>».</p></li>
<li><p><code translate="no">pinyin</code>: Добавляет формы токенов в пиньине для китайских токенов, что позволяет осуществлять сопоставление китайского текста на основе пиньиня. Подробности см. в разделе <a href="/docs/ru/pinyin-filter.md">«Pinyin</a>».</p></li>
</ul>
<p><strong>Пример использования встроенного фильтра:</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [&quot;lowercase&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Пользовательские фильтры</strong>: Пользовательские фильтры позволяют настраивать специализированные конфигурации. Вы можете определить пользовательский фильтр, выбрав допустимый тип фильтра (<code translate="no">filter.type</code>) и добавив конкретные настройки для каждого типа фильтра. Примеры типов фильтров, поддерживающих настройку:</p>
<ul>
<li><p><code translate="no">stop</code>: Удаляет указанные распространенные слова путем задания списка стоп-слов (например, <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). Подробности см. в разделе <a href="/docs/ru/stop-filter.md">«Стоп-слова</a>».</p></li>
<li><p><code translate="no">length</code>: Исключает лексемы на основе критериев длины, например, путем установки максимальной длины лексемы. Подробности см. в разделе <a href="/docs/ru/length-filter.md">«Length</a>».</p></li>
<li><p><code translate="no">stemmer</code>: Преобразует слова в их корневые формы для более гибкого сопоставления. Подробности см. в разделе <a href="/docs/ru/stemmer-filter.md">«Стеммер</a>».</p></li>
</ul>
<p><strong>Пример настройки пользовательского фильтра:</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
            put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment">// Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment">// Customizes stop words for this filter type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use" class="common-anchor-header">Пример использования<button data-href="#Example-use" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом примере вы создадите схему коллекции, включающую:</p>
<ul>
<li><p>Векторное поле для вложений.</p></li>
<li><p>Два поля типа « <code translate="no">VARCHAR</code> » для обработки текста:</p>
<ul>
<li><p>Одно поле использует встроенный анализатор.</p></li>
<li><p>В другом используется настраиваемый анализатор.</p></li>
</ul></li>
</ul>
<p>Прежде чем включить эти настройки в вашу коллекцию, вы проверите каждый анализатор с помощью метода ` <code translate="no">run_analyzer</code> `.</p>
<h3 id="Step-1-Initialize-MilvusClient-and-create-schema" class="common-anchor-header">Шаг 1: Инициализация MilvusClient и создание схемы<button data-href="#Step-1-Initialize-MilvusClient-and-create-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Начните с настройки клиента Milvus и создания новой схемы.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Set up a Milvus client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a new schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)  

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">true</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-and-verify-analyzer-configurations" class="common-anchor-header">Шаг 2: Определение и проверка конфигураций анализаторов<button data-href="#Step-2-Define-and-verify-analyzer-configurations" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Настройте и проверьте встроенный анализатор</strong> (<code translate="no">english</code>)<strong>:</strong></p>
<ul>
<li><p><strong>Настройка:</strong> Определите параметры встроенного анализатора английского языка.</p></li>
<li><p><strong>Проверка:</strong> Используйте <code translate="no">run_analyzer</code>, чтобы убедиться, что данная конфигурация обеспечивает ожидаемую токенизацию.</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Built-in analyzer configuration for English text processing</span>
analyzer_params_built_in = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Verify built-in analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_built_in)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Built-in analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Built-in analyzer output: [&#x27;milvus&#x27;, &#x27;simplifi&#x27;, &#x27;text&#x27;, &#x27;analysi&#x27;, &#x27;search&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus simplifies text ana

lysis for search.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Настройте и проверьте пользовательский анализатор:</strong></p>
<ul>
<li><p><strong>Настройка:</strong> Определите пользовательский анализатор, использующий стандартный токенизатор вместе со встроенным фильтром преобразования в нижний регистр и пользовательскими фильтрами для длины токенов и стоп-слов.</p></li>
<li><p><strong>Проверка:</strong> Воспользуйтесь <code translate="no">run_analyzer</code>, чтобы убедиться, что пользовательская конфигурация обрабатывает текст в соответствии с замыслом.</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom analyzer configuration with a standard tokenizer and custom filters</span>
analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter: convert tokens to lowercase</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,  <span class="hljs-comment"># Custom filter: restrict token length</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,  <span class="hljs-comment"># Custom filter: remove specified stop words</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Verify custom analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_custom)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Custom analyzer output: [&#x27;milvus&#x27;, &#x27;provides&#x27;, &#x27;flexible&#x27;, &#x27;customizable&#x27;, &#x27;analyzers&#x27;, &#x27;robust&#x27;, &#x27;text&#x27;, &#x27;processing&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Configure a custom analyzer</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    put(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
  <span class="hljs-attr">filter</span>: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      <span class="hljs-attr">max</span>: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      <span class="hljs-attr">stop_words</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};
<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, 
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
        <span class="hljs-string">&quot;max&quot;</span>:  <span class="hljs-number">40</span>,
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
    
bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-3-Add-fields-to-the-schema" class="common-anchor-header">Шаг 3: Добавление полей в схему<button data-href="#Step-3-Add-fields-to-the-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Теперь, когда вы проверили настройки анализаторов, добавьте их в поля схемы:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add VARCHAR field &#x27;title_en&#x27; using the built-in analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_built_in,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add VARCHAR field &#x27;title&#x27; using the custom analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_custom,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a vector field for embeddings</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .analyzerParams(analyzerParams)
        .enableMatch(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .build());

<span class="hljs-comment">// Add vector field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());
<span class="hljs-comment">// Add primary field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
      <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_en&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsBuiltIn,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsCustom,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
    },
  ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithAnalyzerParams(analyzerParams).
    WithEnableMatch(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Prepare-index-parameters-and-create-the-collection" class="common-anchor-header">Шаг 4: Подготовка параметров индекса и создание коллекции<button data-href="#Step-4-Prepare-index-parameters-and-create-the-collection" class="anchor-icon" translate="no">
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
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up index parameters for the vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)

<span class="hljs-comment"># Create the collection with the defined schema and index parameters</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Set up index params for vector field</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: indexParams,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.COSINE))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, idx)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>После настройки анализатора вы можете интегрировать его с функциями поиска по тексту, предоставляемыми Milvus. Подробнее:</p>
<ul>
<li><p><a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a></p></li>
<li><p><a href="/docs/ru/keyword-match.md">Совпадение текста</a></p></li>
<li><p><a href="/docs/ru/phrase-match.md">Совпадение фраз</a></p></li>
</ul>
