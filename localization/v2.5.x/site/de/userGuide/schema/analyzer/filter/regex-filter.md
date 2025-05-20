---
id: regex-filter.md
title: Regex
summary: >-
  Der Regex-Filter ist ein Filter für reguläre Ausdrücke: Jedes vom Tokenizer
  erzeugte Token wird nur behalten, wenn es mit dem von Ihnen angegebenen
  Ausdruck übereinstimmt; alles andere wird verworfen.
---
<h1 id="Regex" class="common-anchor-header">Regex<button data-href="#Regex" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Filter <code translate="no">regex</code> ist ein Filter mit regulären Ausdrücken: Jedes vom Tokenizer erzeugte Token wird nur dann beibehalten, wenn es mit dem von Ihnen angegebenen Ausdruck übereinstimmt; alles andere wird verworfen.</p>
<h2 id="Configuration" class="common-anchor-header">Konfiguration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <code translate="no">regex</code> Filter ist ein benutzerdefinierter Filter in Milvus. Um ihn zu verwenden, geben Sie <code translate="no">&quot;type&quot;: &quot;regex&quot;</code> in der Filterkonfiguration an, zusammen mit einem <code translate="no">expr</code> Parameter, um die gewünschten regulären Ausdrücke anzugeben.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;regex&quot;</span>,
        <span class="hljs-string">&quot;expr&quot;</span>: <span class="hljs-string">&quot;^(?!test)&quot;</span> <span class="hljs-comment"># keep tokens that do NOT start with &quot;test&quot;</span>
    }]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der <code translate="no">regex</code> Filter akzeptiert die folgenden konfigurierbaren Parameter.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">expr</code></p></td>
     <td><p>Ein Muster für reguläre Ausdrücke, das auf jedes Token angewendet wird. Übereinstimmende Token werden beibehalten, nicht übereinstimmende Token werden verworfen. Einzelheiten zur Regex-Syntax finden Sie unter <a href="https://docs.rs/regex/latest/regex/#syntax">Syntax</a>.</p></td>
   </tr>
</table>
<p>Der Filter <code translate="no">regex</code> wirkt auf die vom Tokenizer erzeugten Terme und muss daher in Kombination mit einem Tokenizer verwendet werden.</p>
<p>Nachdem Sie <code translate="no">analyzer_params</code> definiert haben, können Sie sie bei der Definition eines Sammelschemas auf ein <code translate="no">VARCHAR</code> Feld anwenden. Dadurch kann Milvus den Text in diesem Feld unter Verwendung des angegebenen Analysators für eine effiziente Tokenisierung und Filterung verarbeiten. Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md#Example-use">Beispielanwendung</a>.</p>
<h2 id="Examples" class="common-anchor-header">Beispiele<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie die Analyzer-Konfiguration auf Ihr Sammelschema anwenden, überprüfen Sie das Verhalten mit der Methode <code translate="no">run_analyzer</code>.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Analyzer-Konfiguration</h3><div class="multipleCode">
   <a href="#plaintext">Klartext</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext">{
    &quot;tokenizer&quot;: &quot;standard&quot;,
    &quot;filter&quot;: [{
        &quot;type&quot;: &quot;regex&quot;,
        &quot;expr&quot;: &quot;^(?!test)&quot;
    }]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">Überprüfung mit <code translate="no">run_analyzer</code></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;testItem apple testCase banana&quot;</span>

<span class="hljs-comment"># Run the standard analyzer with the defined configuration</span>
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Erwartete Ausgabe</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;apple&#x27;</span>, <span class="hljs-string">&#x27;banana&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
