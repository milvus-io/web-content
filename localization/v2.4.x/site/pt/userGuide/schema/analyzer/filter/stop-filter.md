---
id: stop-filter.md
title: Filtro de paragem
summary: >-
  O filtro `stop` remove palavras de parada especificadas do texto tokenizado,
  ajudando a eliminar palavras comuns e menos significativas. É possível
  configurar a lista de palavras de parada utilizando o parâmetro `stop_words`.
---
<h1 id="Stop​" class="common-anchor-header">Parar<button data-href="#Stop​" class="anchor-icon" translate="no">
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
    </button></h1><p>O filtro <code translate="no">stop</code> remove as palavras de paragem especificadas do texto tokenizado, ajudando a eliminar palavras comuns e menos significativas. Pode configurar a lista de palavras de paragem utilizando o parâmetro <code translate="no">stop_words</code>.</p>
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
    </button></h2><p>O filtro <code translate="no">length</code> é um filtro personalizado no Milvus. Para o utilizar, especifique <code translate="no">&quot;type&quot;: &quot;stop&quot;</code> na configuração do filtro, juntamente com um parâmetro <code translate="no">stop_words</code> que fornece uma lista de palavras de paragem.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stop​</span>
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], <span class="hljs-comment"># Defines custom stop words and includes the English stop word list​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>O filtro <code translate="no">stop</code> aceita os seguintes parâmetros configuráveis.</p>
<table data-block-token="RvK3dMx74obnmXxlMe3cz6W1nUf"><thead><tr><th data-block-token="SRJcd5Os3oLiJyxkT6UcDba0nrb" colspan="1" rowspan="1"><p data-block-token="IBSbdC1ByokHmnxDXomccXXJnmh">Parâmetro</p>
</th><th data-block-token="V9fZd2VX7oCaeDxy8fKcDnGpnId" colspan="1" rowspan="1"><p data-block-token="FCA5dw1JEoRB2ExZpYwc8O47nld">Descrição</p>
</th></tr></thead><tbody><tr><td data-block-token="AO5idkJ6pobnMmxcDBjcw4T1ngh" colspan="1" rowspan="1"><p data-block-token="ZnnGd5pOloVEBkxy0ZNcPmxen2g"><code translate="no">stop_words</code></p>
</td><td data-block-token="OaeWdJElZowPJrxzIFccUVoYn22" colspan="1" rowspan="1"><p data-block-token="LWBNdMr8fokmXnxpL5cc9z8Pntd">Uma lista de palavras a serem removidas da tokenização. Por predefinição, é utilizada a lista predefinida <code translate="no">_english_</code>, que contém palavras de paragem comuns em inglês. Os detalhes de <code translate="no">_english_</code> podem ser encontrados <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">aqui</a>.</p>
</td></tr></tbody></table>
<p>O filtro <code translate="no">stop</code> opera nos termos gerados pelo tokenizador, portanto deve ser usado em combinação com um tokenizador.</p>
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
    </button></h2><p>Aqui está um exemplo de como o filtro <code translate="no">stop</code> processa o texto.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Saída esperada</strong> (com <code translate="no">stop_words: [&quot;the&quot;, &quot;over&quot;, &quot;_english_&quot;]</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;allows&quot;</span>, <span class="hljs-string">&quot;control&quot;</span>, <span class="hljs-string">&quot;common&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;processing&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
