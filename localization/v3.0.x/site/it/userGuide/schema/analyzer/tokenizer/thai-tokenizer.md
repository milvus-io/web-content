---
id: thai-tokenizer.md
title: ThailandeseCompatible with Milvus 3.0.0+
summary: >-
  Il tokenizzatore thailandese suddivide il testo thailandese in token di parole
  ed elimina gli spazi bianchi e i segmenti composti esclusivamente da segni di
  punteggiatura.
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">Thailandese<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p>Il tokenizzatore <code translate="no">thai</code> segmenta il testo in lingua thailandese in token di parole senza fare affidamento sugli spazi. Utilizza questo tokenizzatore quando devi creare una pipeline di analisi personalizzata per testi in lingua thailandese o misti (thailandese/inglese).</p>
<h2 id="Configuration" class="common-anchor-header">Configurazione<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Per il testo in thailandese, nella maggior parte dei casi utilizzare l’analizzatore integrato <a href="/docs/it/thai-analyzer.md"><code translate="no">thai</code></a> analizzatore integrato. L’analizzatore integrato include questo tokenizer insieme alla conversione in minuscolo, alla normalizzazione delle cifre decimali e alla rimozione delle parole vuote in tailandese. Utilizzare direttamente il tokenizer <code translate="no">thai</code> solo quando è necessario creare una pipeline di analisi personalizzata.</p>
</div>
<p>Per configurare un analizzatore utilizzando il tokenizer <code translate="no">thai</code>, impostare ` <code translate="no">tokenizer</code> ` su ` <code translate="no">thai</code> ` in ` <code translate="no">analyzer_params</code>`.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Il tokenizer <code translate="no">thai</code> non presenta parametri configurabili.</p>
<p>Il tokenizer può funzionare con uno o più filtri. Ad esempio, la seguente configurazione utilizza il tokenizer <code translate="no">thai</code> con il <a href="/docs/it/lowercase-filter.md"><code translate="no">lowercase</code></a> e <a href="/docs/it/decimaldigit-filter.md"><code translate="no">decimaldigit</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>Questa pipeline personalizzata non è equivalente all’analizzatore <code translate="no">thai</code> integrato poiché non include il dizionario di parole vuote <code translate="no">_thai_</code> integrato. Per la pipeline predefinita completa, utilizzare <code translate="no">{&quot;type&quot;: &quot;thai&quot;}</code>.</p>
<p>Il tokenizzatore applica il seguente comportamento:</p>
<ul>
<li><strong>Segmentazione in thailandese</strong>: segmenta il testo in thailandese in token di parole senza fare affidamento sugli spazi.</li>
<li><strong>Filtraggio degli spazi bianchi e della punteggiatura</strong>: filtra i segmenti composti esclusivamente da spazi bianchi e segni di punteggiatura. Ciò differisce dal <a href="/docs/it/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizer, che può conservare la punteggiatura e gli spazi come token.</li>
<li><strong>Testo con scrittura mista</strong>: genera token di parole in alfabeto latino in un testo misto in thailandese e inglese.</li>
<li><strong>Solo tokenizer</strong>: non converte i token in minuscolo, non normalizza le cifre Unicode né rimuove le parole vuote. Aggiungi filtri o utilizza l’ <a href="/docs/it/thai-analyzer.md"><code translate="no">thai</code></a> per tali operazioni.</li>
<li><strong>Semantica di posizione</strong>: utilizza posizioni dei token basate sui caratteri che includono spazi e segni di punteggiatura saltati, il che mantiene il comportamento di corrispondenza delle frasi e di prossimità coerente con altri tokenizzatori non latini.</li>
</ul>
<p>Dopo aver definito un'<code translate="no">analyzer_params</code>, è possibile applicare l'analizzatore a un campo <code translate="no">VARCHAR</code> durante la definizione di uno schema di raccolta. Per i dettagli, fare riferimento a <a href="/docs/it/analyzer-overview.md#Example-use">Esempio di utilizzo</a>.</p>
<h2 id="Examples" class="common-anchor-header">Esempi<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di applicare la configurazione dell’analizzatore allo schema della collezione, verificarne il comportamento utilizzando il metodo ` <code translate="no">run_analyzer</code> `.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Configurazione dell’analizzatore<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">Verifica tramite <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Risultato atteso<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;สวัสดี&#x27;</span>, <span class="hljs-string">&#x27;ทดสอบ&#x27;</span>, <span class="hljs-string">&#x27;ระบบ&#x27;</span>, <span class="hljs-string">&#x27;Milvus&#x27;</span>, <span class="hljs-string">&#x27;๑๒๓&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
