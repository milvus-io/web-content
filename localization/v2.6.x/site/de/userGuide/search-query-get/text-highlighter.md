---
id: text-highlighter.md
title: Text-HighlighterCompatible with Milvus 2.6.8+
summary: >-
  Der Highlighter in Milvus kommentiert übereinstimmende Begriffe in
  Textfeldern, indem er sie mit anpassbaren Tags umgibt. Die Hervorhebung hilft
  zu erklären, warum ein Dokument übereinstimmt, verbessert die Lesbarkeit der
  Ergebnisse und unterstützt das Rich Rendering in Such- und RAG-Anwendungen.
beta: Milvus 2.6.8+
---
<h1 id="Text-Highlighter" class="common-anchor-header">Text-Highlighter<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#Text-Highlighter" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Highlighter in Milvus kommentiert übereinstimmende Begriffe in Textfeldern, indem er sie mit anpassbaren Tags umgibt. Die Hervorhebung hilft zu erklären, warum ein Dokument übereinstimmt, verbessert die Lesbarkeit der Ergebnisse und unterstützt das Rich Rendering in Such- und RAG-Anwendungen.</p>
<p>Die Hervorhebung wird als Nachbearbeitungsschritt für die endgültige Suchergebnismenge ausgeführt. Es hat keinen Einfluss auf die Suche nach Kandidaten, die Filterlogik, das Ranking oder die Bewertung.</p>
<p>Der Highlighter bietet drei unabhängige Dimensionen der Kontrolle:</p>
<ul>
<li><p><strong>Welche Begriffe werden hervorgehoben</strong></p>
<p>Sie können wählen, woher die hervorgehobenen Begriffe stammen. Sie können zum Beispiel Suchbegriffe hervorheben, die in der <strong>BM25-Volltextsuche</strong> verwendet werden, oder Abfragebegriffe, die in <strong>textbasierten Filterausdrücken</strong> angegeben sind (z. B. <code translate="no">TEXT_MATCH</code> Bedingungen).</p></li>
<li><p><strong>Wie hervorgehobene Begriffe dargestellt werden</strong></p>
<p>Sie können steuern, wie übereinstimmende Begriffe in der Hervorhebungsausgabe angezeigt werden, indem Sie die Tags konfigurieren, die vor und nach jeder Übereinstimmung eingefügt werden. Verwenden Sie z. B. einfache Markierungen wie <code translate="no">{}</code> oder HTML-Tags wie <code translate="no">&lt;em&gt;&lt;/em&gt;</code> für eine umfassende Darstellung.</p></li>
<li><p><strong>Wie hervorgehobener Text zurückgegeben wird</strong></p>
<p>Sie können steuern, wie hervorgehobene Ergebnisse als Fragmente zurückgegeben werden, einschließlich der Frage, wo die Fragmente beginnen, wie lang sie sind und wie viele Fragmente zurückgegeben werden.</p></li>
</ul>
<p>In den folgenden Abschnitten werden diese Szenarien durchgespielt.</p>
<h2 id="Search-term-highlighting-in-BM25-full-text-search" class="common-anchor-header">Hervorhebung von Suchbegriffen in der BM25-Volltextsuche<button data-href="#Search-term-highlighting-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie eine BM25-Volltextsuche durchführen, können Sie die <strong>Suchbegriffe</strong> im zurückgegebenen Ergebnis hervorheben, um zu erklären, warum ein Dokument der Anfrage entspricht. Weitere Informationen zur BM25-Volltextsuche finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<p>In diesem Szenario stammen die hervorgehobenen Begriffe direkt von den in der BM25-Volltextsuche verwendeten Suchbegriffen. Der Highlighter verwendet diese Begriffe, um den übereinstimmenden Text im Endergebnis zu kennzeichnen.</p>
<p>Angenommen, der folgende Inhalt wird in einem Textfeld gespeichert:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighter-Konfiguration</strong></p>
<p>Um Suchbegriffe in der BM25-Volltextsuche hervorzuheben, erstellen Sie eine <code translate="no">LexicalHighlighter</code> und aktivieren Sie die Hervorhebung von Suchbegriffen für die BM25-Volltextsuche:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_search_text=<span class="hljs-literal">True</span>   <span class="hljs-comment"># Enable search term highlighting for BM25 full text search</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel:</p>
<ul>
<li><p><code translate="no">pre_tags</code> und <code translate="no">post_tags</code> steuern, wie der hervorgehobene Text in der Ausgabe erscheint. In diesem Fall werden die übereinstimmenden Begriffe von <code translate="no">{}</code> umschlossen (z. B. <code translate="no">{term}</code>). Sie können auch mehrere Schlagwörter in einer Liste angeben (z. B. <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). Wenn mehrere Begriffe hervorgehoben sind, werden die Tags in der Reihenfolge der Übereinstimmung angewendet und gedreht.</p></li>
<li><p><code translate="no">highlight_search_text=True</code> weist Milvus an, die Suchbegriffe in der BM25-Volltextsuche als Quelle der hervorgehobenen Begriffe zu verwenden.</p></li>
</ul>
<p>Sobald das Highlighter-Objekt erstellt ist, wenden Sie seine Konfiguration auf Ihre BM25-Volltextsuchanfrage an:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],      <span class="hljs-comment"># Search term used in BM25 full text search</span>
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Hervorhebende Ausgabe</strong></p>
<p>Wenn die Hervorhebung aktiviert ist, gibt Milvus den hervorgehobenen Text in einem speziellen Feld <code translate="no">highlight</code> zurück. Standardmäßig wird die hervorgehobene Ausgabe als Fragment zurückgegeben, beginnend mit dem ersten übereinstimmenden Begriff.</p>
<p>In diesem Beispiel ist der Suchbegriff <code translate="no">&quot;BM25&quot;</code>, so dass er im zurückgegebenen Ergebnis hervorgehoben ist:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um die Position, Länge und Anzahl der zurückgegebenen Fragmente zu steuern, siehe <a href="/docs/de/text-highlighter.md#Fragment-based-highlighting-output">Hervorgehobenen Text als Fragmente zurückgeben</a>.</p>
<h2 id="Query-term-highlighting-in-filtering" class="common-anchor-header">Hervorhebung von Suchbegriffen bei der Filterung<button data-href="#Query-term-highlighting-in-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Zusätzlich zur Hervorhebung von Suchbegriffen können Sie auch Begriffe hervorheben, die in textbasierten Filterausdrücken verwendet werden.</p>
<div class="alert note">
<p>Derzeit wird nur die Filterbedingung <code translate="no">TEXT_MATCH</code> für die Hervorhebung von Suchbegriffen unterstützt. Weitere Informationen finden Sie unter <a href="/docs/de/keyword-match.md">Textabgleich</a>.</p>
</div>
<p>In diesem Szenario stammen die hervorgehobenen Begriffe aus textbasierten Filterausdrücken. Die Filterung bestimmt, welche Dokumente übereinstimmen, während der Highlighter die übereinstimmenden Textabschnitte mit Anmerkungen versieht.</p>
<p>Angenommen, der folgende Inhalt wird in einem Textfeld gespeichert:</p>
<pre><code translate="no" class="language-python">This document explains how text filtering works <span class="hljs-keyword">in</span> Milvus.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Textmarker-Konfiguration</strong></p>
<p>Um Abfrageausdrücke, die bei der Filterung verwendet werden, hervorzuheben, erstellen Sie eine <code translate="no">LexicalHighlighter</code> und definieren Sie eine <code translate="no">highlight_query</code>, die der Filterungsbedingung entspricht:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_query=[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>,     <span class="hljs-comment"># Text filtering type</span>
        <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,         <span class="hljs-comment"># Target text field</span>
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;text filtering&quot;</span> <span class="hljs-comment"># Terms to highlight</span>
    }]
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">pre_tags</code> und <code translate="no">post_tags</code> steuern, wie der hervorgehobene Text in der Ausgabe erscheint. In diesem Fall werden die übereinstimmenden Begriffe von <code translate="no">{}</code> umschlossen (z. B. <code translate="no">{term}</code>). Sie können auch mehrere Tags als Liste angeben (z. B. <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). Wenn mehrere Begriffe hervorgehoben werden, werden die Tags in der Reihenfolge der Übereinstimmung angewendet und gedreht.</p></li>
<li><p><code translate="no">highlight_query</code> definiert, welche Filterbegriffe hervorgehoben werden sollen.</p></li>
</ul>
<p>Sobald das Highlighter-Objekt erstellt ist, wenden Sie denselben Filterausdruck und die Highlighter-Konfiguration auf Ihre Suchanfrage an:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(text, &quot;text filtering&quot;)&#x27;</span>,
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Hervorhebung der Ausgabe</strong></p>
<p>Wenn die Hervorhebung von Suchbegriffen für die Filterung aktiviert ist, gibt Milvus den hervorgehobenen Text in einem speziellen <code translate="no">highlight</code> Feld zurück. Standardmäßig wird die hervorgehobene Ausgabe als Fragment zurückgegeben, beginnend mit dem ersten übereinstimmenden Begriff.</p>
<p>In diesem Beispiel ist der erste übereinstimmende Begriff <code translate="no">&quot;text&quot;</code>, so dass der hervorgehobene Text an dieser Position beginnt:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{text} {filtering} works in Milvus.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um die Position, Länge und Anzahl der zurückgegebenen Fragmente zu steuern, siehe <a href="/docs/de/text-highlighter.md#Fragment-based-highlighting-output">Hervorgehobenen Text als Fragmente zurückgeben</a>.</p>
<h2 id="Fragment-based-highlighting-output" class="common-anchor-header">Fragmentbasierte Hervorhebungsausgabe<button data-href="#Fragment-based-highlighting-output" class="anchor-icon" translate="no">
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
    </button></h2><p>Standardmäßig gibt Milvus hervorgehobenen Text als Fragmente zurück, beginnend mit dem ersten übereinstimmenden Begriff. Mit den fragmentbezogenen Einstellungen können Sie weiter steuern, wie die Fragmente zurückgegeben werden, ohne die hervorgehobenen Begriffe zu ändern.</p>
<p>Angenommen, der folgende Inhalt ist in einem Textfeld gespeichert:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Hervorhebungskonfiguration</strong></p>
<p>Um die Form der hervorgehobenen Fragmente zu steuern, konfigurieren Sie fragmentbezogene Optionen in der <code translate="no">LexicalHighlighter</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],
    highlight_search_text=<span class="hljs-literal">True</span>,
    fragment_offset=<span class="hljs-number">5</span>,     <span class="hljs-comment"># Number of characters to reserve before the first matched term</span>
    fragment_size=<span class="hljs-number">60</span>,      <span class="hljs-comment"># Max. length of each fragment to return</span>
    num_of_fragments=<span class="hljs-number">1</span>     <span class="hljs-comment"># Max. number of fragments to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> reserviert führenden Kontext vor dem ersten hervorgehobenen Begriff.</p></li>
<li><p><code translate="no">fragment_size</code> begrenzt, wie viel Text in jedem Fragment enthalten ist.</p></li>
<li><p><code translate="no">num_of_fragments</code> steuert, wie viele Fragmente zurückgegeben werden.</p></li>
</ul>
<p>Sobald das Highlighter-Objekt erstellt ist, wenden Sie die Highlighter-Konfiguration auf Ihre Suchanfrage an:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Hervorhebung der Ausgabe</strong></p>
<p>Wenn die fragmentbasierte Hervorhebung aktiviert ist, gibt Milvus den hervorgehobenen Text als Fragmente im Feld <code translate="no">highlight</code> aus:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;Use {BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Ausgabe:</p>
<ul>
<li><p>Das Fragment beginnt nicht genau bei <code translate="no">{BM25}</code>, weil <code translate="no">fragment_offset</code> gesetzt ist.</p></li>
<li><p>Es wird nur ein Fragment zurückgegeben, da <code translate="no">num_of_fragments</code> gleich 1 ist.</p></li>
<li><p>Die Länge des Fragments wird durch <code translate="no">fragment_size</code> begrenzt.</p></li>
</ul>
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Vorbereitung<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>Bevor Sie den Textmarker verwenden, stellen Sie sicher, dass Ihre Sammlung richtig konfiguriert ist.</p>
<p>Das folgende Beispiel erstellt eine Sammlung, die BM25-Volltextsuche und <code translate="no">TEXT_MATCH</code> -Abfragen unterstützt, und fügt dann Beispieldokumente ein.</p>
<p><details></p>
<p><summary><strong>Bereiten Sie Ihre Sammlung vor</strong></summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    LexicalHighlighter,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;highlighter_demo&quot;</span>

<span class="hljs-comment"># Clean up existing collection</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Define schema</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">2000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Required for BM25</span>
    enable_match=<span class="hljs-literal">True</span>,     <span class="hljs-comment"># Required for TEXT_MATCH</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="hljs-comment"># Add BM25 function</span>
schema.add_function(Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;sparse_vector&quot;</span>],
))

<span class="hljs-comment"># Create index</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>, <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>},
)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema, index_params=index_params)

<span class="hljs-comment"># Insert sample documents</span>
docs = [
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications &quot;</span>
    <span class="hljs-string">&quot;of every size from running a demo chatbot to building web-scale search.&quot;</span>,
]
client.insert(collection_name=COLLECTION_NAME, data=[{<span class="hljs-string">&quot;text&quot;</span>: t} <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> docs])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;✓ Collection created with <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents\n&quot;</span>)

<span class="hljs-comment"># Helper for search params</span>
SEARCH_PARAMS = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.0</span>}}

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># ✓ Collection created with 4 documents</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-1-Highlight-search-terms-in-BM25-full-text-search" class="common-anchor-header">Beispiel 1: Hervorhebung von Suchbegriffen in der BM25-Volltextsuche<button data-href="#Example-1-Highlight-search-terms-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieses Beispiel zeigt, wie Sie Suchbegriffe in der BM25-Volltextsuche hervorheben können.</p>
<ul>
<li><p>Die BM25-Volltextsuche verwendet <code translate="no">&quot;test&quot;</code> als Suchbegriff</p></li>
<li><p>Der Textmarker umschließt alle Vorkommen von "test" mit den Tags <code translate="no">{</code> und <code translate="no">}</code> </p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Highlight BM25 query terms</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Erwartete Ausgabe</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{test} doc&#x27;]
[&#x27;{test} doc&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database that suits AI applications of every size from run&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-2-Highlight-query-terms-in-filtering" class="common-anchor-header">Beispiel 2: Hervorhebung von Suchbegriffen bei der Filterung<button data-href="#Example-2-Highlight-query-terms-in-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieses Beispiel zeigt, wie Begriffe hervorgehoben werden können, die mit einem <code translate="no">TEXT_MATCH</code> Filter übereinstimmen.</p>
<ul>
<li><p>Die BM25-Volltextsuche verwendet <code translate="no">&quot;test&quot;</code> als Abfragebegriff</p></li>
<li><p>Der Parameter <code translate="no">queries</code> fügt <code translate="no">&quot;my doc&quot;</code> zur Hervorhebungsliste hinzu.</p></li>
<li><p>Der Hervorhebungsfilter umschließt alle übereinstimmenden Begriffe (<code translate="no">&quot;my&quot;</code>, <code translate="no">&quot;test&quot;</code>, <code translate="no">&quot;doc&quot;</code>) mit <code translate="no">{</code> und <code translate="no">}</code></p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,   <span class="hljs-comment"># Also highlight BM25 term</span></span>
<span class="highlighted-comment-line">    highlight_query=[                     <span class="hljs-comment"># Additional TEXT_MATCH terms to highlight</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my doc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Erwartete Ausgabe</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{my} first {test} {doc}&#x27;]
[&#x27;{my} second {test} {doc}&#x27;]
[&#x27;{my} first {test} {doc}. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{my} second {test} {doc}. Milvus is an open-source vector database that suits AI applications of every siz&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-3-Return-highlights-as-fragments" class="common-anchor-header">Beispiel 3: Hervorhebungen als Fragmente zurückgeben<button data-href="#Example-3-Return-highlights-as-fragments" class="anchor-icon" translate="no">
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
    </button></h3><p>In diesem Beispiel sucht die Abfrage nach <code translate="no">&quot;Milvus&quot;</code> und gibt Hervorhebungsfragmente mit den folgenden Einstellungen zurück:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> Behält bis zu 20 Zeichen vor der ersten hervorgehobenen Spanne als führenden Kontext bei (Standard ist 0).</p></li>
<li><p><code translate="no">fragment_size</code> Begrenzt jedes Fragment auf etwa 60 Zeichen (Standard ist 100).</p></li>
<li><p><code translate="no">num_of_fragments</code> begrenzt die Anzahl der zurückgegebenen Fragmente pro Textwert (Standardwert ist 5).</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    fragment_offset=<span class="hljs-number">20</span>,  <span class="hljs-comment"># Keep 20 chars before match</span></span>
<span class="highlighted-comment-line">    fragment_size=<span class="hljs-number">60</span>,    <span class="hljs-comment"># Max ~60 chars per fragment</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;Milvus&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results[<span class="hljs-number">0</span>]):
    frags = hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}).get(<span class="hljs-string">&#x27;text&#x27;</span>, [])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Doc <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: <span class="hljs-subst">{frags}</span>&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Erwartete Ausgabe</summary></p>
<pre><code translate="no" class="language-plaintext">Doc 1: [&#x27;my first test doc. {Milvus} is an open-source vector database &#x27;]
Doc 2: [&#x27;my second test doc. {Milvus} is an open-source vector database&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-4-Multi-query-highlighting" class="common-anchor-header">Beispiel 4: Hervorhebung mehrerer Abfragen<button data-href="#Example-4-Multi-query-highlighting" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Suche mit mehreren Abfragen in der BM25-Volltextsuche werden die Ergebnisse jeder Abfrage unabhängig voneinander hervorgehoben. Die Ergebnisse der ersten Abfrage enthalten Hervorhebungen für ihren Suchbegriff, die Ergebnisse der zweiten Abfrage enthalten Hervorhebungen für ihren Suchbegriff und so weiter. Jede Abfrage verwendet dieselbe <code translate="no">highlighter</code> Konfiguration, wendet sie aber unabhängig voneinander an.</p>
<p>Im folgenden Beispiel:</p>
<ul>
<li><p>Die erste Abfrage hebt <code translate="no">&quot;test&quot;</code> in ihrer Ergebnismenge hervor.</p></li>
<li><p>Die zweite Abfrage hebt in ihrer Ergebnismenge <code translate="no">&quot;Milvus&quot;</code> hervor.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment"># Two queries</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> nq_idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results):
    query_term = [<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>][nq_idx]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Query &#x27;<span class="hljs-subst">{query_term}</span>&#x27;:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;    <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Erwartete Ausgabe</summary></p>
<pre><code translate="no" class="language-plaintext">Query &#x27;test&#x27;:
  [&#x27;{test} doc&#x27;]
  [&#x27;{test} doc&#x27;]
Query &#x27;Milvus&#x27;:
  [&#x27;{Milvus} is an open-source vector database built for GenAI applications.&#x27;]
  [&#x27;{Milvus} is an open-source vector database that suits AI applications of every size from running a dem&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-5-Custom-HTML-tags" class="common-anchor-header">Beispiel 5: Benutzerdefinierte HTML-Tags<button data-href="#Example-5-Custom-HTML-tags" class="anchor-icon" translate="no">
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
    </button></h3><p>Sie können beliebige Tags für die Hervorhebung verwenden, z. B. HTML-sichere Tags für Web-UIs. Dies ist nützlich, wenn die Suchergebnisse in einem Browser dargestellt werden.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Erwartete Ausgabe</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
