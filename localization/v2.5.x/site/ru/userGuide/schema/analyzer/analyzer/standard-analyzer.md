---
id: standard-analyzer.md
title: Стандартный анализатор
related_key: 'standard, analyzer'
summary: >-
  Анализатор `standard` - это анализатор по умолчанию в Milvus, который
  автоматически применяется к текстовым полям, если анализатор не указан. Он
  использует грамматическую токенизацию, что делает его эффективным для
  большинства языков.
---
<h1 id="Standard​" class="common-anchor-header">Стандартный<button data-href="#Standard​" class="anchor-icon" translate="no">
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
    </button></h1><p>Анализатор <code translate="no">standard</code> - это анализатор по умолчанию в Milvus, который автоматически применяется к текстовым полям, если анализатор не указан. Он использует грамматическую токенизацию, что делает его эффективным для большинства языков.</p>
<h2 id="Definition​" class="common-anchor-header">Определение<button data-href="#Definition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Анализатор <code translate="no">standard</code> состоит из.</p>
<ul>
<li><p><strong>Токенизатор</strong>: Использует токенизатор <code translate="no">standard</code> для разбиения текста на отдельные единицы слов на основе правил грамматики. Дополнительную информацию см. в разделе <a href="/docs/ru/standard-tokenizer.md">Стандарт</a>.</p></li>
<li><p><strong>Фильтр</strong>: Использует фильтр <code translate="no">lowercase</code> для преобразования всех лексем в нижний регистр, что позволяет осуществлять поиск без учета регистра. Для получения дополнительной информации см.<a href="/docs/ru/lowercase-filter.md"><code translate="no">lowercase filter</code></a>.</p></li>
</ul>
<p>Функциональность анализатора <code translate="no">standard</code> эквивалентна следующей пользовательской конфигурации анализатора.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configuration​" class="common-anchor-header">Конфигурация .<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы применить анализатор <code translate="no">standard</code> к полю, просто установите <code translate="no">type</code> на <code translate="no">standard</code> в <code translate="no">analyzer_params</code>, и включите дополнительные параметры по мере необходимости.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p>Анализатор <code translate="no">standard</code> принимает следующие необязательные параметры: </p>
<table data-block-token="RYdmdh6LRoVtrVxY4RHcvUTxned"><thead><tr><th data-block-token="IbXLd0A89oY8rjxRXsccdHxmn6d" colspan="1" rowspan="1"><p data-block-token="Afe5dOJUIoIEhOxAPyqcUlqdnih">Параметр</p>
</th><th data-block-token="LpTFdYXm6ox6Rgx5wAWciQjfnjn" colspan="1" rowspan="1"><p data-block-token="LR2QdjlzVoMv8ixoLDScpuhsnxb">Описание</p>
</th></tr></thead><tbody><tr><td data-block-token="AJKvdnlG8oAp8exzFbocIvf9nGf" colspan="1" rowspan="1"><p data-block-token="EXV8djjJtoYolLxllxRcIivYnre"><code translate="no">stop_words</code></p>
</td><td data-block-token="KWkqdOBuRoPg39xtTqWcf5RQnbb" colspan="1" rowspan="1"><p data-block-token="R8HedE6qTo4UmlxpQaLcE8oNn0b">Массив, содержащий список стоп-слов, которые будут удалены при токенизации. По умолчанию используется <code translate="no">_english_</code>, встроенный набор распространенных английских стоп-слов. Подробности о <code translate="no">_english_</code> можно найти <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">здесь</a>.</p>
</td></tr></tbody></table>
<p>Пример настройки пользовательских стоп-слов.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>, [<span class="hljs-string">&quot;of&quot;</span>] <span class="hljs-comment"># Optional: List of words to exclude from tokenization​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p>Определив <code translate="no">analyzer_params</code>, вы можете применить их к полю <code translate="no">VARCHAR</code> при определении схемы коллекции. Это позволит Milvus обрабатывать текст в этом поле с помощью указанного анализатора для эффективной токенизации и фильтрации. Дополнительные сведения см. в разделе <a href="/docs/ru/analyzer-overview.md#">Пример использования</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Пример вывода<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Вот как анализатор <code translate="no">standard</code> обрабатывает текст.</p>
<p><strong>Исходный текст</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ожидаемый результат</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;the&quot;</span>, <span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
