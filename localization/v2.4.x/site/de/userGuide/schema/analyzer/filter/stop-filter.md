---
id: stop-filter.md
title: Filter anhalten
summary: >-
  Der Filter "stop" entfernt bestimmte Stoppwörter aus tokenisiertem Text und
  hilft so, häufige, weniger aussagekräftige Wörter zu eliminieren. Sie können
  die Liste der Stoppwörter mit dem Parameter "stop_words" konfigurieren.
---
<h1 id="Stop​" class="common-anchor-header">Stopp<button data-href="#Stop​" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Filter <code translate="no">stop</code> entfernt bestimmte Stoppwörter aus tokenisiertem Text und hilft so, häufige, weniger aussagekräftige Wörter zu eliminieren. Sie können die Liste der Stoppwörter mit dem Parameter <code translate="no">stop_words</code> konfigurieren.</p>
<h2 id="Configuration​" class="common-anchor-header">Konfiguration<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Filter <code translate="no">length</code> ist ein benutzerdefinierter Filter in Milvus. Um ihn zu verwenden, geben Sie <code translate="no">&quot;type&quot;: &quot;stop&quot;</code> in der Filterkonfiguration an, zusammen mit einem <code translate="no">stop_words</code> Parameter, der eine Liste von Stoppwörtern bereitstellt.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stop​</span>
        <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>, <span class="hljs-string">&quot;_english_&quot;</span>], <span class="hljs-comment"># Defines custom stop words and includes the English stop word list​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Der Filter <code translate="no">stop</code> akzeptiert die folgenden konfigurierbaren Parameter.</p>
<table data-block-token="RvK3dMx74obnmXxlMe3cz6W1nUf"><thead><tr><th data-block-token="SRJcd5Os3oLiJyxkT6UcDba0nrb" colspan="1" rowspan="1"><p data-block-token="IBSbdC1ByokHmnxDXomccXXJnmh">Parameter</p>
</th><th data-block-token="V9fZd2VX7oCaeDxy8fKcDnGpnId" colspan="1" rowspan="1"><p data-block-token="FCA5dw1JEoRB2ExZpYwc8O47nld">Beschreibung</p>
</th></tr></thead><tbody><tr><td data-block-token="AO5idkJ6pobnMmxcDBjcw4T1ngh" colspan="1" rowspan="1"><p data-block-token="ZnnGd5pOloVEBkxy0ZNcPmxen2g"><code translate="no">stop_words</code></p>
</td><td data-block-token="OaeWdJElZowPJrxzIFccUVoYn22" colspan="1" rowspan="1"><p data-block-token="LWBNdMr8fokmXnxpL5cc9z8Pntd">Eine Liste von Wörtern, die aus der Tokenisierung entfernt werden sollen. Standardmäßig wird die vordefinierte Liste <code translate="no">_english_</code> verwendet, die gängige englische Stoppwörter enthält. Die Details von <code translate="no">_english_</code> finden Sie <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">hier</a>.</p>
</td></tr></tbody></table>
<p>Der Filter <code translate="no">stop</code> arbeitet mit den vom Tokenizer erzeugten Begriffen und muss daher in Kombination mit einem Tokenizer verwendet werden.</p>
<p>Nachdem Sie <code translate="no">analyzer_params</code> definiert haben, können Sie sie bei der Definition eines Sammelschemas auf ein <code translate="no">VARCHAR</code> Feld anwenden. Dadurch kann Milvus den Text in diesem Feld unter Verwendung des angegebenen Analysators für eine effiziente Tokenisierung und Filterung verarbeiten. Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md#Example-use">Beispielanwendung</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Beispiel-Ausgabe<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Hier ist ein Beispiel dafür, wie der <code translate="no">stop</code> Filter Text verarbeitet.</p>
<p><strong>Ursprünglicher Text</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The stop filter allows control over common stop words for text processing.&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Erwartete Ausgabe</strong> (mit <code translate="no">stop_words: [&quot;the&quot;, &quot;over&quot;, &quot;_english_&quot;]</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;allows&quot;</span>, <span class="hljs-string">&quot;control&quot;</span>, <span class="hljs-string">&quot;common&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;processing&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
