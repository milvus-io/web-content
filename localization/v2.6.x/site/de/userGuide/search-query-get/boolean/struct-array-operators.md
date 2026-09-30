---
id: struct-array-operators.md
title: StructArray-OperatorenCompatible with Milvus 3.0.x
summary: >-
  Verwenden Sie Elementfilter und Match-Family-Operatoren, um skalare
  Unterfelder innerhalb von StructArray-Feldern zu filtern.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray-Operatoren<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Das Array of Structs oder StructArray in einer Entität speichert eine geordnete Menge von Struct-Elementen. Jede Struct im Array hat das gleiche vordefinierte Schema, das mehrere Vektoren und skalare Felder umfasst. Wenn ein skalares Unterfeld in einer Struct indiziert ist, können Sie <strong>Elementfilter</strong> und <strong>Operatoren aus der Match-Familie</strong> verwenden, um eine skalare Filterung darauf durchzuführen.</p>
<p>Ein Elementfilter wählt Entitäten aus, die mindestens einen Wert in einem StructArray-Feld enthalten, das dem angegebenen Prädikat entspricht. Im Gegensatz dazu werden die Operatoren der Match-Familie verwendet, um Entitäten zu finden, die eine bestimmte Anzahl oder ein bestimmtes Verhältnis von Werten in einem StructArray-Feld enthalten, das dem angegebenen Prädikat entspricht.</p>
<div class="alert note">
<p>Wenn Sie Prädikate für <code translate="no">$[subField]</code> erstellen, stellen Sie sicher, dass das Unterfeld indiziert ist, wenn Sie mit großen Datensätzen arbeiten, da diese Operatoren eine Iteration durch die Array-Elemente für jede mögliche Entität erfordern.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">Element-Filter<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie Elementfilter, wenn Sie prüfen müssen, ob eine Entität die Werte enthält, die einem bestimmten Prädikat in ihrem StructArray-Feld entsprechen.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Wie im obigen Elementfilterausdruck gezeigt, gibt der Elementfilter Entitäten zurück, die mindestens einen Chunk enthalten, der im Unterfeld <code translate="no">text</code> mit "Red" beginnt. Der erste Parameter ist der Name des StructArray-Feldes, während der zweite Parameter das Prädikat ist, das für das Struct-Teilfeld gilt.</p>
<p>Sie können Vergleichs-, Bereichs- und arithmetische Operatoren verwenden, um die Bedingung zu erstellen, und logische Operatoren, um mehrere Bedingungen zu verketten, wie in <a href="/docs/de/v2.6.x/basic-operators.md">Grundlegende Operatoren</a> gezeigt.</p>
<p>Wenn Sie jedoch einen Filterausdruck erstellen, der sowohl ein Prädikat auf Entitätsebene als auch einen Elementfilter kombiniert, sollten Sie das Element fltler immer am Ende platzieren, wie im folgenden Beispiel gezeigt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">Operatoren der Abgleichsfamilie<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Operatoren der Match-Familie funktionieren auch über ein StructArray-Feld. Anstatt einfach zu prüfen, ob ein Element existiert, können Sie bestimmen, wie viele Elemente (oder welcher Anteil) ein Elementprädikat erfüllen müssen.</p>
<ul>
<li><p><a href="/docs/de/v2.6.x/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>: gibt Entitäten zurück, die mindestens einen Chunk enthalten, der mit "Red" im Unterfeld <code translate="no">text</code> beginnt; semantisch ist dies äquivalent zu <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/de/v2.6.x/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>Red": gibt Entitäten zurück, deren Textteilfelder in allen Chunks mit "Red" beginnen.</p></li>
<li><p><a href="/docs/de/v2.6.x/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a><code translate="no">k</code>: gibt Entitäten zurück, die mindestens Chunks enthalten, die mit "Red" im <code translate="no">text</code> Teilfeld beginnen.</p></li>
<li><p><a href="/docs/de/v2.6.x/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a>Red": Gibt Entitäten zurück, die höchstens <code translate="no">k</code> Chunks enthalten, die mit "Red" im <code translate="no">text</code> Sub-Feld beginnen.</p></li>
<li><p><a href="/docs/de/v2.6.x/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a>MATCH_ANY: gibt Entitäten zurück, die genau <code translate="no">k</code> chunks enthalten, die mit "Red" im <code translate="no">text</code> Teilfeld beginnen.</p></li>
</ul>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Operator wird als wahr ausgewertet, wenn <strong>mindestens ein</strong> Element im Array das Prädikat erfüllt, was anzeigt, dass das strukturelle Äquivalent eines logischen <code translate="no">OR</code> über alle Arrayelemente.</p>
<p>MATCH_ANY-Operatoren und Elementfilter sind semantisch identisch und können austauschbar verwendet werden. Wenn Sie die Logik <code translate="no">count(matches) &gt;= 1</code> ausdrücken müssen, sollten Sie sie verwenden.</p>
<p><strong>BEISPIEL:</strong></p>
<p>Das folgende Beispiel gibt Entitäten zurück, bei denen irgendein Teil des Dokuments mit "Red" beginnt.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Operator ergibt nur dann den Wert "wahr", wenn <strong>jedes einzelne</strong> Element im Array das Prädikat erfüllt.</p>
<p>Wenn Sie die Logik <code translate="no">count(matches) == total elements</code> ausdrücken müssen, verwenden Sie diesen Operator.</p>
<p><strong>BEISPIEL:</strong></p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Operator ist ein quantitativer Filter, der wahr zurückgibt, wenn die Anzahl der Elemente, die das Prädikat erfüllen, <strong>größer oder gleich</strong> einer angegebenen Konstante <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k ist.</p>
<p>Wenn Sie die Logik <code translate="no">count(matches) &gt;= k</code> ausdrücken müssen, verwenden Sie diesen Operator.</p>
<p><strong>BEISPIEL:</strong></p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Operator ist ein quantitativer Filter, der wahr zurückgibt, wenn die Anzahl der Elemente, die das Prädikat erfüllen, <strong>kleiner oder gleich</strong> einer angegebenen Konstante <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k ist.</p>
<p>Dies ist besonders nützlich, um Entitäten herauszufiltern, die zu sehr auf ein bestimmtes Schlüsselwort abzielen (Rauschunterdrückung).</p>
<p><strong>BEISPIEL:</strong></p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Operator ist der restriktivste quantitative Operator in der Familie. Er gibt true zurück, wenn und nur wenn die Anzahl der Elemente, die das Prädikat erfüllen, <strong>genau</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k ist.</p>
<p><strong>BEISPIEL:</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
