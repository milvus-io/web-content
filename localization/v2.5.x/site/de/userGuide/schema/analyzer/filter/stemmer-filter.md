---
id: stemmer-filter.md
title: Wortstammfilter
summary: >-
  Der Stemmer-Filter reduziert Wörter auf ihre Grund- oder Wurzelform (bekannt
  als Stemming) und erleichtert so den Abgleich von Wörtern mit ähnlicher
  Bedeutung in verschiedenen Beugungsformen. Der Stemmer-Filter unterstützt
  mehrere Sprachen und ermöglicht so eine effektive Suche und Indizierung in
  verschiedenen sprachlichen Kontexten.
---
<h1 id="Stemmer" class="common-anchor-header">Wortstammfilter<button data-href="#Stemmer" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Filter <code translate="no">stemmer</code> reduziert Wörter auf ihre Grund- oder Wurzelform (bekannt als Stemming), wodurch es einfacher wird, Wörter mit ähnlicher Bedeutung in verschiedenen Beugungsformen zu finden. Der Filter <code translate="no">stemmer</code> unterstützt mehrere Sprachen und ermöglicht so eine effektive Suche und Indizierung in verschiedenen sprachlichen Kontexten.</p>
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
    </button></h2><p>Der <code translate="no">stemmer</code> Filter ist ein benutzerdefinierter Filter in Milvus. Um ihn zu verwenden, geben Sie <code translate="no">&quot;type&quot;: &quot;stemmer&quot;</code> in der Filterkonfiguration an, zusammen mit einem <code translate="no">language</code> Parameter, um die gewünschte Sprache für das Stemming auszuwählen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English</span>
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stemmer&quot;</span>);
                    put(<span class="hljs-string">&quot;language&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment">// Specifies the filter type as stop</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, 
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:     <span class="hljs-string">&quot;stemmer&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;stemmer&quot;,
      &quot;language&quot;: &quot;english&quot;
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Der <code translate="no">stemmer</code> Filter akzeptiert die folgenden konfigurierbaren Parameter.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">language</code></p></td>
     <td><p>Gibt die Sprache für den Stemming-Prozess an. Unterstützte Sprachen sind: <code translate="no">"arabic"</code>, <code translate="no">"danish"</code>, <code translate="no">"dutch"</code>, <code translate="no">"english"</code>, <code translate="no">"finnish"</code>, <code translate="no">"french"</code>, <code translate="no">"german"</code>, <code translate="no">"greek"</code>, <code translate="no">"hungarian"</code>, <code translate="no">"italian"</code>, <code translate="no">"norwegian"</code>, <code translate="no">"portuguese"</code>, <code translate="no">"romanian"</code>, <code translate="no">"russian"</code>, <code translate="no">"spanish"</code>, <code translate="no">"swedish"</code>, <code translate="no">"tamil"</code>, <code translate="no">"turkish"</code></p></td>
   </tr>
</table>
<p>Der Filter <code translate="no">stemmer</code> arbeitet mit den vom Tokenizer erzeugten Begriffen, muss also in Kombination mit einem Tokenizer verwendet werden.</p>
<p>Nachdem Sie <code translate="no">analyzer_params</code> definiert haben, können Sie sie auf ein <code translate="no">VARCHAR</code> Feld anwenden, wenn Sie ein Sammelschema definieren. Dadurch kann Milvus den Text in diesem Feld unter Verwendung des angegebenen Analysators für eine effiziente Tokenisierung und Filterung verarbeiten. Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md#Example-use">Beispielanwendung</a>.</p>
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
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English</span>
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stemmer&quot;</span>);
                    put(<span class="hljs-string">&quot;language&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:     <span class="hljs-string">&quot;stemmer&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;stemmer&quot;,
      &quot;language&quot;: &quot;english&quot;
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">Überprüfung mit <code translate="no">run_analyzer</code></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;running runs looked ran runner&quot;</span>

<span class="hljs-comment"># Run the standard analyzer with the defined configuration</span>
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
not support yet
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Erwartete Ausgabe</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;run&#x27;</span>, <span class="hljs-string">&#x27;run&#x27;</span>, <span class="hljs-string">&#x27;look&#x27;</span>, <span class="hljs-string">&#x27;ran&#x27;</span>, <span class="hljs-string">&#x27;runner&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
