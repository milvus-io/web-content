---
id: alphanumonly-filter.md
title: Alphanumonly-Filter
summary: >-
  Der Filter "alphanumonly" entfernt Token, die Nicht-ASCII-Zeichen enthalten,
  und behält nur alphanumerische Begriffe bei. Dieser Filter ist nützlich für
  die Verarbeitung von Text, bei dem nur einfache Buchstaben und Zahlen relevant
  sind und Sonderzeichen oder Symbole ausgeschlossen sind.
---
<h1 id="Alphanumonly​" class="common-anchor-header">Nur alphanumerische Begriffe<button data-href="#Alphanumonly​" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Filter <code translate="no">alphanumonly</code> entfernt Token, die Nicht-ASCII-Zeichen enthalten, und behält nur alphanumerische Begriffe bei. Dieser Filter ist nützlich für die Verarbeitung von Text, bei dem nur einfache Buchstaben und Zahlen relevant sind und keine Sonderzeichen oder Symbole enthalten sind.</p>
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
    </button></h2><p>Der Filter <code translate="no">alphanumonly</code> ist in Milvus integriert. Um ihn zu verwenden, geben Sie einfach seinen Namen im Abschnitt <code translate="no">filter</code> unter <code translate="no">analyzer_params</code> an.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;alphanumonly&quot;</span>],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Der Filter <code translate="no">alphanumonly</code> arbeitet mit den Begriffen, die vom Tokenizer erzeugt wurden, und muss daher in Kombination mit einem Tokenizer verwendet werden.</p>
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
    </button></h2><p>Hier ist ein Beispiel dafür, wie der <code translate="no">alphanumonly</code> Filter Text verarbeitet.</p>
<p><strong>Ursprünglicher Text</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 2.0 @ Scale! #AI #Vector_Databasé&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Erwartete Ausgabe</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>, <span class="hljs-string">&quot;AI&quot;</span>, <span class="hljs-string">&quot;Vector&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
