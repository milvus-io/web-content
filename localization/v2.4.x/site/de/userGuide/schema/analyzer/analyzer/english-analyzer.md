---
id: english-analyzer.md
title: Englisch-Analysator
related_key: 'english, analyzer'
summary: >-
  Der `english` Analyzer in Milvus wurde entwickelt, um englischen Text zu
  verarbeiten, wobei sprachspezifische Regeln zur Tokenisierung und Filterung
  angewendet werden.
---
<h1 id="English​" class="common-anchor-header">Englisch<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <code translate="no">english</code> Analyzer in Milvus ist für die Verarbeitung von englischem Text konzipiert und wendet sprachspezifische Regeln zur Tokenisierung und Filterung an.</p>
<h3 id="Definition​" class="common-anchor-header">Definition</h3><p>Der <code translate="no">english</code> Analyzer verwendet die folgenden Komponenten.</p>
<ul>
<li><p><strong>Tokenisierer</strong>: Verwendet die <a href="/docs/de/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> um Text in diskrete Worteinheiten zu zerlegen.</p></li>
<li><p>Filter: Enthält mehrere Filter für eine umfassende Textverarbeitung.</p>
<ul>
<li><p><a href="/docs/de/lowercase-filter.md"><code translate="no">lowercase</code></a>: Konvertiert alle Token in Kleinbuchstaben und ermöglicht so eine Suche ohne Berücksichtigung der Groß-/Kleinschreibung.</p></li>
<li><p><a href="/docs/de/stemmer-filter.md"><code translate="no">stemmer</code></a>: Reduziert Wörter auf ihren Wortstamm, um einen breiteren Abgleich zu ermöglichen (z. B. wird "running" zu "run").</p></li>
<li><p><a href="/docs/de/stop-filter.md"><code translate="no">stop_words</code></a>: Entfernt gängige englische Stoppwörter, um sich auf die Schlüsselbegriffe im Text zu konzentrieren.</p></li>
</ul></li>
</ul>
<p>Die Funktionalität des <code translate="no">english</code> Analyzers entspricht der folgenden benutzerdefinierten Analyzer-Konfiguration.</p>
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
<h3 id="Configuration​" class="common-anchor-header">Konfiguration</h3><p>Um den <code translate="no">english</code> Analyzer auf ein Feld anzuwenden, setzen Sie einfach <code translate="no">type</code> auf <code translate="no">english</code> in <code translate="no">analyzer_params</code>, und fügen Sie bei Bedarf optionale Parameter hinzu.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Der Analyzer <code translate="no">english</code> akzeptiert die folgenden optionalen Parameter: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parameter</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Beschreibung</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Ein Array mit einer Liste von Stoppwörtern, die aus der Tokenisierung entfernt werden. Der Standardwert ist <code translate="no">_english_</code>, ein eingebauter Satz allgemeiner englischer Stoppwörter.</p>
</td></tr></tbody></table>
<p>Beispielkonfiguration mit benutzerdefinierten Stoppwörtern.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie <code translate="no">analyzer_params</code> definiert haben, können Sie sie bei der Definition eines Sammelschemas auf ein <code translate="no">VARCHAR</code> Feld anwenden. Dadurch kann Milvus den Text in diesem Feld unter Verwendung des angegebenen Analysators für eine effiziente Tokenisierung und Filterung verarbeiten. Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md#Example-use">Beispielverwendung</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Beispielhafte Ausgabe</h3><p>Hier sehen Sie, wie der <code translate="no">english</code> Analyzer Text verarbeitet.</p>
<p><strong>Ursprünglicher Text</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Erwartete Ausgabe</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
