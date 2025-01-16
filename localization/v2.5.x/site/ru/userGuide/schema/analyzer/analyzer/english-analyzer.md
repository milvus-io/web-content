---
id: english-analyzer.md
title: Анализатор английского языка
related_key: 'english, analyzer'
summary: >-
  Анализатор `english` в Milvus предназначен для обработки английского текста,
  применяя специфические для данного языка правила токенизации и фильтрации.
---
<h1 id="English​" class="common-anchor-header">Английский<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Анализатор <code translate="no">english</code> в Milvus предназначен для обработки английского текста, применяя специфические для данного языка правила токенизации и фильтрации.</p>
<h3 id="Definition​" class="common-anchor-header">Определение</h3><p>Анализатор <code translate="no">english</code> использует следующие компоненты.</p>
<ul>
<li><p><strong>Токенизатор</strong>: Использует <a href="/docs/ru/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> для разбиения текста на отдельные единицы слов.</p></li>
<li><p>Фильтры: Включает несколько фильтров для комплексной обработки текста.</p>
<ul>
<li><p><a href="/docs/ru/lowercase-filter.md"><code translate="no">lowercase</code></a>: : Преобразовывает все лексемы в строчные буквы, что позволяет осуществлять поиск без учета регистра.</p></li>
<li><p><a href="/docs/ru/stemmer-filter.md"><code translate="no">stemmer</code></a>: : Сокращает слова до их корневой формы для поддержки более широкого соответствия (например, "running" становится "run").</p></li>
<li><p><a href="/docs/ru/stop-filter.md"><code translate="no">stop_words</code></a>: Удаляет распространенные английские стоп-слова, чтобы сосредоточиться на ключевых терминах в тексте.</p></li>
</ul></li>
</ul>
<p>Функциональность анализатора <code translate="no">english</code> эквивалентна следующей пользовательской конфигурации анализатора.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Конфигурация .</h3><p>Чтобы применить анализатор <code translate="no">english</code> к полю, просто установите <code translate="no">type</code> на <code translate="no">english</code> в <code translate="no">analyzer_params</code>, и включите дополнительные параметры по мере необходимости.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Анализатор <code translate="no">english</code> принимает следующие необязательные параметры: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Параметр</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Описание</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Массив, содержащий список стоп-слов, которые будут удалены при токенизации. По умолчанию используется <code translate="no">_english_</code>, встроенный набор распространенных английских стоп-слов.</p>
</td></tr></tbody></table>
<p>Пример конфигурации с пользовательскими стоп-словами.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Определив <code translate="no">analyzer_params</code>, вы можете применить их к полю <code translate="no">VARCHAR</code> при определении схемы коллекции. Это позволит Milvus обрабатывать текст в этом поле с помощью указанного анализатора для эффективной токенизации и фильтрации. Подробнее см. в разделе <a href="/docs/ru/analyzer-overview.md#Example-use">Пример использования</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Пример вывода</h3><p>Вот как анализатор <code translate="no">english</code> обрабатывает текст.</p>
<p><strong>Исходный текст</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ожидаемый результат</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>