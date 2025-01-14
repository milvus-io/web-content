---
id: ascii-folding-filter.md
title: Складывание ASCII
summary: >-
  Фильтр `asciifolding`** ** преобразует символы за пределами блока Basic Latin
  Unicode (первые 127 символов ASCII) в их эквиваленты ASCII.
---
<h1 id="ASCII-folding​" class="common-anchor-header">Складывание ASCII<button data-href="#ASCII-folding​" class="anchor-icon" translate="no">
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
    </button></h1><p>Фильтр <code translate="no">asciifolding</code>** ** преобразует символы за пределами <a href="https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)">блока Basic Latin Unicode</a> (первые 127 символов ASCII) в их эквиваленты ASCII. Например, он преобразует символы типа <code translate="no">í</code> в <code translate="no">i</code>, что делает обработку текста более простой и последовательной, особенно для многоязычного контента.</p>
<h2 id="Configuration​" class="common-anchor-header">Конфигурация<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>Фильтр <code translate="no">asciifolding</code> встроен в Milvus. Чтобы использовать его, просто укажите его имя в секции <code translate="no">filter</code> в разделе <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;asciifolding&quot;</span>],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Фильтр <code translate="no">asciifolding</code> работает с терминами, сгенерированными токенизатором, поэтому он должен использоваться в сочетании с токенизатором.</p>
<p>Определив <code translate="no">analyzer_params</code>, вы можете применить их к полю <code translate="no">VARCHAR</code> при определении схемы коллекции. Это позволит Milvus обрабатывать текст в этом поле с помощью указанного анализатора для эффективной токенизации и фильтрации. Подробнее см. в разделе <a href="/docs/ru/analyzer-overview.md#Example-use">Пример использования</a>.</p>
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
    </button></h2><p>Вот пример того, как фильтр <code translate="no">asciifolding</code> обрабатывает текст.</p>
<p><strong>Исходный текст</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Café Möller serves crème brûlée and piñatas.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ожидаемый результат</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Cafe&quot;</span>, <span class="hljs-string">&quot;Moller&quot;</span>, <span class="hljs-string">&quot;serves&quot;</span>, <span class="hljs-string">&quot;creme&quot;</span>, <span class="hljs-string">&quot;brulee&quot;</span>, <span class="hljs-string">&quot;and&quot;</span>, <span class="hljs-string">&quot;pinatas&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
