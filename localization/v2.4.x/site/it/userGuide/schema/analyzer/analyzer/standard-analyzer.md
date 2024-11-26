---
id: standard-analyzer.md
title: Analizzatore standard
related_key: 'standard, analyzer'
summary: >-
  L'analizzatore `standard` è l'analizzatore predefinito di Milvus, che viene
  applicato automaticamente ai campi di testo se non viene specificato alcun
  analizzatore. Utilizza una tokenizzazione basata sulla grammatica, che lo
  rende efficace per la maggior parte delle lingue.
---
<h1 id="Standard​" class="common-anchor-header">Standard<button data-href="#Standard​" class="anchor-icon" translate="no">
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
    </button></h1><p>L'analizzatore <code translate="no">standard</code> è l'analizzatore predefinito di Milvus, che viene applicato automaticamente ai campi di testo se non viene specificato alcun analizzatore. Utilizza una tokenizzazione basata sulla grammatica, che lo rende efficace per la maggior parte delle lingue.</p>
<h2 id="Definition​" class="common-anchor-header">Definizione<button data-href="#Definition​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'analizzatore <code translate="no">standard</code> è composto da.</p>
<ul>
<li><p><strong>Tokenizzatore</strong>: Utilizza il tokenizer di <code translate="no">standard</code> per suddividere il testo in unità discrete di parole in base alle regole grammaticali. Per ulteriori informazioni, consultare <a href="/docs/it/standard-tokenizer.md">Standard</a>.</p></li>
<li><p><strong>Filtro</strong>: Utilizza il filtro di <code translate="no">lowercase</code> per convertire tutti i token in minuscolo, consentendo ricerche senza distinzione tra maiuscole e minuscole. Per ulteriori informazioni, fare riferimento a<a href="/docs/it/lowercase-filter.md"><code translate="no">lowercase filter</code></a>.</p></li>
</ul>
<p>La funzionalità dell'analizzatore <code translate="no">standard</code> è equivalente alla seguente configurazione dell'analizzatore personalizzato.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configuration​" class="common-anchor-header">Configurazione<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>Per applicare l'analizzatore <code translate="no">standard</code> a un campo, è sufficiente impostare <code translate="no">type</code> su <code translate="no">standard</code> in <code translate="no">analyzer_params</code> e includere i parametri opzionali necessari.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p>L'analizzatore <code translate="no">standard</code> accetta i seguenti parametri opzionali: </p>
<table data-block-token="RYdmdh6LRoVtrVxY4RHcvUTxned"><thead><tr><th data-block-token="IbXLd0A89oY8rjxRXsccdHxmn6d" colspan="1" rowspan="1"><p data-block-token="Afe5dOJUIoIEhOxAPyqcUlqdnih">Parametro</p>
</th><th data-block-token="LpTFdYXm6ox6Rgx5wAWciQjfnjn" colspan="1" rowspan="1"><p data-block-token="LR2QdjlzVoMv8ixoLDScpuhsnxb">Descrizione</p>
</th></tr></thead><tbody><tr><td data-block-token="AJKvdnlG8oAp8exzFbocIvf9nGf" colspan="1" rowspan="1"><p data-block-token="EXV8djjJtoYolLxllxRcIivYnre"><code translate="no">stop_words</code></p>
</td><td data-block-token="KWkqdOBuRoPg39xtTqWcf5RQnbb" colspan="1" rowspan="1"><p data-block-token="R8HedE6qTo4UmlxpQaLcE8oNn0b">Un array contenente un elenco di stop words, che saranno rimosse dalla tokenizzazione. L'impostazione predefinita è <code translate="no">_english_</code>, un insieme integrato di parole d'arresto inglesi comuni. I dettagli di <code translate="no">_english_</code> sono disponibili <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">qui</a>.</p>
</td></tr></tbody></table>
<p>Esempio di configurazione di stop word personalizzate.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Specifies the standard analyzer type​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>, [<span class="hljs-string">&quot;of&quot;</span>] <span class="hljs-comment"># Optional: List of words to exclude from tokenization​</span>
}​
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver definito <code translate="no">analyzer_params</code>, è possibile applicarle a un campo <code translate="no">VARCHAR</code> quando si definisce uno schema di raccolta. Ciò consente a Milvus di elaborare il testo in quel campo utilizzando l'analizzatore specificato per una tokenizzazione e un filtraggio efficienti. Per ulteriori informazioni, vedere <a href="/docs/it/analyzer-overview.md#">Esempio di utilizzo</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Esempio di output<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Ecco come l'analizzatore <code translate="no">standard</code> elabora il testo.</p>
<p><strong>Testo originale</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultato atteso</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;the&quot;</span>, <span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
