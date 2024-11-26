---
id: lowercase-filter.md
title: Filtro de letras minúsculas
summary: >-
  O filtro `lowercase` converte os termos gerados por um tokenizador para
  minúsculas, tornando as pesquisas insensíveis a maiúsculas e minúsculas.
---
<h1 id="Lowercase​" class="common-anchor-header">Minúsculas<button data-href="#Lowercase​" class="anchor-icon" translate="no">
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
    </button></h1><p>O filtro <code translate="no">lowercase</code> converte os termos gerados por um tokenizador para minúsculas, tornando as pesquisas insensíveis a maiúsculas e minúsculas. Por exemplo, ele pode converter <code translate="no">[&quot;High&quot;, &quot;Performance&quot;, &quot;Vector&quot;, &quot;Database&quot;]</code> em <code translate="no">[&quot;high&quot;, &quot;performance&quot;, &quot;vector&quot;, &quot;database&quot;]</code>.</p>
<h2 id="Configuration​" class="common-anchor-header">Configuração<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>O filtro <code translate="no">lowercase</code> está incorporado no Milvus. Para o utilizar, basta especificar o seu nome na secção <code translate="no">filter</code> dentro de <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>O filtro <code translate="no">lowercase</code> opera nos termos gerados pelo tokenizador, por isso deve ser usado em combinação com um tokenizador.</p>
<p>Depois de definir <code translate="no">analyzer_params</code>, pode aplicá-los a um campo <code translate="no">VARCHAR</code> ao definir um esquema de coleção. Isto permite que o Milvus processe o texto nesse campo utilizando o analisador especificado para uma tokenização e filtragem eficientes. Para mais pormenores, consulte <a href="/docs/pt/analyzer-overview.md#Example-use">Exemplo de utilização</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Exemplo de saída<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui está um exemplo de como o filtro <code translate="no">lowercase</code> processa o texto.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Lowercase Filter Ensures Uniformity In Text Processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Saída esperada</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;the&quot;</span>, <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;ensures&quot;</span>, <span class="hljs-string">&quot;uniformity&quot;</span>, <span class="hljs-string">&quot;in&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;processing&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
