---
id: english-analyzer.md
title: Analizzatore di inglese
related_key: 'english, analyzer'
summary: >-
  L'analizzatore `inglese` di Milvus è progettato per elaborare testi in
  inglese, applicando regole specifiche della lingua per la tokenizzazione e il
  filtraggio.
---
<h1 id="English​" class="common-anchor-header">Inglese<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>L'analizzatore <code translate="no">english</code> di Milvus è progettato per elaborare testi in inglese, applicando regole specifiche per la lingua per la tokenizzazione e il filtraggio.</p>
<h3 id="Definition​" class="common-anchor-header">Definizione</h3><p>L'analizzatore <code translate="no">english</code> utilizza i seguenti componenti.</p>
<ul>
<li><p><strong>Tokenizzatore</strong>: Utilizza la funzione <a href="/docs/it/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> per dividere il testo in unità di parole discrete.</p></li>
<li><p>Filtri: Include diversi filtri per un'elaborazione completa del testo.</p>
<ul>
<li><p><a href="/docs/it/lowercase-filter.md"><code translate="no">lowercase</code></a>: Converte tutti i token in minuscolo, consentendo ricerche senza distinzione tra maiuscole e minuscole.</p></li>
<li><p><a href="/docs/it/stemmer-filter.md"><code translate="no">stemmer</code></a>: Riduce le parole alla loro forma radicale per supportare una corrispondenza più ampia (ad esempio, "running" diventa "run").</p></li>
<li><p><a href="/docs/it/stop-filter.md"><code translate="no">stop_words</code></a>: Rimuove le comuni stop words inglesi per concentrarsi sui termini chiave del testo.</p></li>
</ul></li>
</ul>
<p>La funzionalità dell'analizzatore <code translate="no">english</code> è equivalente alla seguente configurazione personalizzata dell'analizzatore.</p>
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
<h3 id="Configuration​" class="common-anchor-header">Configurazione</h3><p>Per applicare l'analizzatore <code translate="no">english</code> a un campo, è sufficiente impostare <code translate="no">type</code> su <code translate="no">english</code> in <code translate="no">analyzer_params</code> e includere i parametri opzionali necessari.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>L'analizzatore <code translate="no">english</code> accetta i seguenti parametri opzionali: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parametro</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Descrizione</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Un array contenente un elenco di stop words che saranno rimosse dalla tokenizzazione. L'impostazione predefinita è <code translate="no">_english_</code>, un insieme integrato di parole di arresto comuni in inglese.</p>
</td></tr></tbody></table>
<p>Esempio di configurazione con stop word personalizzate.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver definito <code translate="no">analyzer_params</code>, è possibile applicarle a un campo <code translate="no">VARCHAR</code> quando si definisce uno schema di raccolta. Questo permette a Milvus di elaborare il testo in quel campo usando l'analizzatore specificato per una tokenizzazione e un filtraggio efficienti. Per i dettagli, vedere <a href="/docs/it/analyzer-overview.md#Example-use">Esempio di utilizzo</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Esempio di output</h3><p>Ecco come l'analizzatore <code translate="no">english</code> elabora il testo.</p>
<p><strong>Testo originale</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultato atteso</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
