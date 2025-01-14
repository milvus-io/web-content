---
id: chinese-analyzer.md
title: Китайский анализатор
related_key: 'chinese, analyzer'
summary: >-
  Анализатор `chinese` разработан специально для работы с китайским текстом,
  обеспечивая эффективную сегментацию и токенизацию.
---
<h1 id="Chinese​" class="common-anchor-header">Китайский<button data-href="#Chinese​" class="anchor-icon" translate="no">
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
    </button></h1><p>Анализатор <code translate="no">chinese</code> разработан специально для работы с китайским текстом, обеспечивая эффективную сегментацию и токенизацию.</p>
<h3 id="Definition​" class="common-anchor-header">Определение</h3><p>Анализатор <code translate="no">chinese</code> состоит из.</p>
<ul>
<li><p><strong>Токенизатор</strong>: Использует токенизатор <code translate="no">jieba</code> для сегментации китайского текста на лексемы, основанные на словарном запасе и контексте. Дополнительную информацию см. в разделе <a href="/docs/ru/jieba-tokenizer.md">Jieba</a>.</p></li>
<li><p><strong>Фильтр</strong>: Использует фильтр <code translate="no">cnalphanumonly</code> для удаления лексем, содержащих некитайские символы. Дополнительные сведения см. в разделе <a href="/docs/ru/cnalphanumonly-filter.md">Cnalphanumonly</a>.</p></li>
</ul>
<p>Функциональность анализатора <code translate="no">chinese</code> эквивалентна следующей пользовательской конфигурации анализатора.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Конфигурация .</h3><p>Чтобы применить анализатор <code translate="no">chinese</code> к полю, просто установите <code translate="no">type</code> на <code translate="no">chinese</code> в <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Анализатор <code translate="no">chinese</code> не принимает никаких дополнительных параметров.</p>
</div>
<h3 id="Example-output​" class="common-anchor-header">Пример вывода</h3><p>Вот как анализатор <code translate="no">chinese</code> обрабатывает текст.</p>
<p><strong>Исходный текст</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ожидаемый результат</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
