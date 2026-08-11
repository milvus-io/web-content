---
id: struct-array-operators.md
title: StructArray-Operatoren
summary: >-
  StructArray-Operatoren filtern Entitäten, indem sie Prädikate auf skalare
  Unterfelder innerhalb eines StructArray-Feldes auswerten. Verwenden Sie diese
  Seite als Syntaxreferenz für „element_filter“ und die MATCH_*-Operatorfamilie.
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray-Operatoren<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray-Operatoren filtern Entitäten, indem sie Prädikate auf skalare Teilfelder innerhalb eines StructArray-Feldes auswerten. Verwenden Sie diese Seite als Syntaxreferenz für „ <code translate="no">element_filter</code> “ und die Operatorfamilie „ <code translate="no">MATCH_*</code> “.</p>
<p>Die StructArray-Filterung umfasst zwei Operatorfamilien:</p>
<table>
<thead>
<tr><th>Operatorfamilie</th><th>Hauptzweck</th><th>Verhalten des Ergebnisses</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Ermittelt Struct-Elemente, die ein skalares Prädikat erfüllen.</td><td>Bei der Suche auf Elementebene können die Treffer Element-Offsets enthalten. Bei Abfragen auf Zeilenebene oder bei der gefilterten Suche hängt die Form der Ergebnisse von der API und den Ausgabefeldern ab.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Wählen Sie Entitäten danach aus, wie viele Struct-Elemente ein skalares Prädikat erfüllen.</td><td>Filterung auf Zeilenebene. Diese Operatoren geben selbst keine Element-Offsets zurück.</td></tr>
</tbody>
</table>
<p>Verwenden Sie skalare Unterfelder in StructArray-Operatoren. Vektor-Unterfelder werden von Vektor-Suchpfaden verwendet und sind keine Eingaben für skalare Prädikate.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Wann welcher Operator zu verwenden ist<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Ziel</th><th>Verwendung</th></tr>
</thead>
<tbody>
<tr><td>Beschränken Sie die Vektorsuche auf Elementebene auf Elemente, die skalaren Bedingungen entsprechen.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Erfüllen mehrerer skalarer Bedingungen innerhalb desselben Struct-Elements.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Nur Entitäten zurückgeben, bei denen mindestens ein Struct-Element ein Prädikat erfüllt.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Gibt nur Entitäten zurück, bei denen alle Struct-Elemente ein Prädikat erfüllen.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Gibt nur Entitäten zurück, bei denen mindestens, höchstens oder genau <code translate="no">N</code> Struct-Elemente ein Prädikat erfüllen.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> oder <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Elementfilter<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">element_filter(structArrayField, predicate)</code> “, um Struct-Elemente in einem StructArray-Feld abzugleichen.</p>
<p>Verwenden Sie innerhalb des Prädikats „ <code translate="no">$[subfield]</code> “, um auf ein skalares Unterfeld des aktuellen Struct-Elements zu verweisen.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn innerhalb des Prädikats mehrere Bedingungen verwendet werden, beziehen sich alle „ <code translate="no">$[subfield]</code> “-Verweise auf dasselbe Struktur-Element:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie ein Prädikat auf Entitätsebene mit „ <code translate="no">element_filter</code> “ kombinieren, setzen Sie „ <code translate="no">element_filter</code> “ an das Ende des Ausdrucks:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> kann in einem Filterausdruck nur einmal vorkommen. Verschachteln Sie „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “ nicht innerhalb eines anderen „ <code translate="no">element_filter</code> “.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operatoren der „Match Family“<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">MATCH_*</code> “-Operatoren, wenn eine Entität danach ausgewählt werden soll, wie viele „Struct“-Elemente ein Prädikat erfüllen.</p>
<table>
<thead>
<tr><th>Operator</th><th>Bedeutung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Mindestens ein Struct-Element erfüllt das Prädikat.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Alle Struct-Elemente erfüllen das Prädikat.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Mindestens <code translate="no">N</code> Struct-Elemente erfüllen das Prädikat.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Höchstens <code translate="no">N</code> -Struktur-Elemente erfüllen das Prädikat.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>Genau <code translate="no">N</code> Struct-Elemente erfüllen das Prädikat.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> Sowohl „ <code translate="no">element_filter</code> “ als auch „ “ können ausdrücken, dass mindestens ein Struct-Element ein Prädikat erfüllt. Verwenden Sie „ <code translate="no">MATCH_ANY</code> “, wenn Sie nur eine Filterung auf Zeilenebene benötigen. Verwenden Sie „ <code translate="no">element_filter</code> “, wenn Sie Einschränkungen auf Elementebene benötigen, z. B. um zu filtern, welche Struct-Elemente an der Vektorsuche auf Elementebene teilnehmen.</p>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> ergibt „ <code translate="no">true</code> “, wenn mindestens ein Element im StructArray das Prädikat erfüllt.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem leeren `StructArray` gibt ` <code translate="no">MATCH_ANY</code> ` den Wert ` <code translate="no">false</code>` zurück.</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> ergibt „ <code translate="no">true</code> “, wenn jedes Element im StructArray das Prädikat erfüllt.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem leeren StructArray gibt „ <code translate="no">MATCH_ALL</code> “ „ <code translate="no">true</code> “ zurück.</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> ergibt „ <code translate="no">true</code> “, wenn die Anzahl der Elemente, die das Prädikat erfüllen, größer oder gleich „ <code translate="no">threshold</code> “ ist.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Für ` <code translate="no">MATCH_LEAST</code>` muss ` <code translate="no">threshold</code> ` eine positive ganze Zahl sein.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> ergibt „ <code translate="no">true</code> “, wenn die Anzahl der Elemente, die das Prädikat erfüllen, kleiner oder gleich „ <code translate="no">threshold</code> “ ist.</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Für ` <code translate="no">MATCH_MOST</code>` kann ` <code translate="no">threshold</code> ` Null oder eine positive ganze Zahl sein.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> ergibt „ <code translate="no">true</code> “, wenn die Anzahl der Elemente, die das Prädikat erfüllen, genau „ <code translate="no">threshold</code> “ beträgt.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Für ` <code translate="no">MATCH_EXACT</code>` kann ` <code translate="no">threshold</code> ` Null oder eine positive ganze Zahl sein.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Unterstützte Prädikate<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Syntax „ <code translate="no">$[...]</code> “ steht für den Skalarwert des aktuellen Struct-Elements. Die Unterstützung von Prädikaten hängt vom Typ des skalaren Unterfelds ab.</p>
<table>
<thead>
<tr><th>Unterfeldtyp</th><th>Unterstützung von Prädikaten auf Elementebene</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Skalare Prädikate wie „ <code translate="no">$[has_code] == true</code> “ oder „ <code translate="no">!($[has_code] == true)</code> “. Vermeiden Sie einfache boolesche Ausdrücke wie „ <code translate="no">$[has_code]</code> “.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>Vergleiche, verkettete Bereichsausdrücke, <code translate="no">in</code>, <code translate="no">not in</code>, arithmetische Ausdrücke mit <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> oder <code translate="no">%</code>, gefolgt von einem Vergleich, sowie logische Verknüpfungen.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Vergleich, verketteter Bereich, <code translate="no">in</code>, <code translate="no">not in</code>, arithmetische Ausdrücke mit <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> oder <code translate="no">/</code>, gefolgt von einem Vergleich, sowie logische Kombinationen. Der Operator <code translate="no">%</code> wird für Gleitkomma-Unterfelder nicht unterstützt.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Zeichenfolgenvergleich, verkettete Bereiche, „ <code translate="no">in</code> “, „ <code translate="no">not in</code> “, „ <code translate="no">like</code> “, „ <code translate="no">=~</code> “, „ <code translate="no">!~</code> “ sowie logische Verknüpfungen.</td></tr>
<tr><td>Vektor-Teilfelder</td><td>Werden nicht als skalare Prädikate für „ <code translate="no">$[...]</code> “ unterstützt. Verwenden Sie stattdessen Vektor-Teilfelder über die „EmbeddingList“-Suche oder die Vektorsuche auf Elementebene.</td></tr>
</tbody>
</table>
<p>Logische Operatoren wie „ <code translate="no">&amp;&amp;</code> “, „ <code translate="no">\|\|</code> “ und „ <code translate="no">!</code> “ gelten für Prädikatsausdrücke. Schreiben Sie beispielsweise „ <code translate="no">!($[has_code] == true)</code> “ anstelle von „ <code translate="no">!$[has_code]</code> “.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Nicht unterstützte Prädikate<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Prädikate auf Elementebene vom Typ „ <code translate="no">$[...]</code> “ unterstützen Folgendes nicht:</p>
<ul>
<li><p>Textabgleichsfunktionen wie „ <code translate="no">text_match(field, &quot;...&quot;)</code> “ oder „ <code translate="no">phrase_match(field, &quot;...&quot;)</code> “.</p></li>
<li><p>JSON-Pfad-Syntax, „ <code translate="no">exists</code> “ auf JSON-Pfaden oder JSON-Funktionen wie „ <code translate="no">json_contains</code> “, „ <code translate="no">json_contains_all</code> “ oder „ <code translate="no">json_contains_any</code> “.</p></li>
<li><p>Array-Container-Funktionen wie <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> oder <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> oder <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Geometrie-/GIS-Funktionen.</p></li>
<li><p>Timestamptz-Ausdrücke.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Vektorprädikate auf Feldebene.</p></li>
<li><p>Aufrufe generischer Filterfunktionen, sofern die jeweilige Funktionssignatur und der Ausführungspfad nicht explizit Prädikate auf StructArray-Ebene unterstützen.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Syntaxregeln<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><code translate="no">MATCH_*</code> Bei Operatornamen wird die Groß-/Kleinschreibung nicht berücksichtigt.</p></li>
<li><p>Verwenden Sie „ <code translate="no">$[subfield]</code> “ nur innerhalb von „ <code translate="no">element_filter</code> “- oder „ <code translate="no">MATCH_*</code> “-Prädikaten.</p></li>
<li><p>Verwenden Sie „ <code translate="no">$[subfield]</code> “ nicht als JSON-Pfad, Array-Container oder Vektorfeldreferenz.</p></li>
<li><p>Verschachteln Sie „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “ nicht innerhalb eines anderen „StructArray“-Operators.</p></li>
<li><p>Verwenden Sie benannte „ <code translate="no">threshold=N</code> “ für „ <code translate="no">MATCH_LEAST</code> “, „ <code translate="no">MATCH_MOST</code> “ und „ <code translate="no">MATCH_EXACT</code> “.</p></li>
<li><p><code translate="no">MATCH_ANY</code> Bei einem leeren StructArray wird „ <code translate="no">false</code> “ zurückgegeben.</p></li>
<li><p><code translate="no">MATCH_ALL</code> Bei einem leeren StructArray gibt er <code translate="no">true</code> zurück.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Siehe auch<button data-href="#See-also" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><a href="/docs/de/filtered-search-with-structarray.md">Gefilterte Suche mit StructArray</a></p></li>
<li><p><a href="/docs/de/basic-vector-search-with-structarray.md">Einfache Vektorsuche mit StructArray</a></p></li>
<li><p><a href="/docs/de/index-structarray-fields.md">StructArray-Felder indizieren</a></p></li>
<li><p><a href="/docs/de/structarray-limits.md">Einschränkungen bei StructArray</a></p></li>
</ul>
