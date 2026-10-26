---
id: struct-array-operators.md
title: StructArray-Operatoren
summary: >-
  StructArray-Operatoren filtern Entitäten, indem sie Prädikate auf skalare
  Teilfelder innerhalb eines StructArray-Feldes auswerten. Verwenden Sie diese
  Seite als Syntaxreferenz für „element_filter“, die MATCH_*-Operatorfamilie und
  Prädikate auf Zeilenebene für StructArray-Pfade.
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
    </button></h1><p>StructArray-Operatoren filtern Entitäten, indem sie Prädikate auf skalare Unterfelder innerhalb eines StructArray-Feldes auswerten. Verwenden Sie diese Seite als Syntaxreferenz für „ <code translate="no">element_filter</code> “, die Operatorfamilie „ <code translate="no">MATCH_*</code> “ sowie Prädikate auf Zeilenebene für StructArray-Pfade.</p>
<p>Die StructArray-Filterung umfasst zwei Operatorfamilien und eine Reihe von Pfadprädikaten auf Zeilenebene:</p>
<table>
<thead>
<tr><th>Filterform</th><th>Hauptzweck</th><th>Verhalten des Ergebnisses</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Sucht nach Struct-Elementen, die ein skalares Prädikat erfüllen.</td><td>Bei der Suche auf Elementebene können die Treffer Element-Offsets enthalten. Bei Abfragen auf Zeilenebene oder bei der gefilterten Suche hängt die Form des Ergebnisses von der API und den Ausgabefeldern ab.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Wählen Sie Entitäten danach aus, wie viele Struct-Elemente ein skalares Prädikat erfüllen.</td><td>Filterung auf Zeilenebene. Diese Operatoren geben selbst keine Element-Offsets zurück.</td></tr>
<tr><td>Pfadprädikate auf Zeilenebene</td><td>Prüfen Sie die Position eines Elements, zählen Sie Struct-Elemente oder prüfen Sie Unterfeldwerte über Elemente hinweg ohne ein „ <code translate="no">$[...]</code> “-Prädikat.</td><td>Filterung auf Zeilenebene. Diese Prädikate geben keine Element-Offsets zurück.</td></tr>
</tbody>
</table>
<p>Verwenden Sie skalare Unterfelder in StructArray-Operatoren. Vektor-Unterfelder werden von Vektorsuchpfaden verwendet und sind keine Eingaben für skalare Prädikate.</p>
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
<tr><td>Beschränken Sie die Vektorsuche auf Elementebene auf Elemente, die skalare Bedingungen erfüllen.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Erfüllen mehrerer skalarer Bedingungen innerhalb desselben Struct-Elements.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Gibt nur Entitäten zurück, bei denen mindestens ein Struct-Element ein Prädikat erfüllt.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Gibt nur Entitäten zurück, bei denen alle Struct-Elemente ein Prädikat erfüllen.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Gibt nur Entitäten zurück, bei denen mindestens, höchstens oder genau <code translate="no">N</code> Struct-Elemente ein Prädikat erfüllen.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> oder <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Überprüfen Sie das Struct-Element an einer bestimmten Position, z. B. im ersten Chunk.</td><td>Ein Positionspfad wie <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Filtern Sie nach der Anzahl der Struct-Elemente in einer Entität.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Prüfen Sie, ob ein beliebiges Struktur-Element einen Unterfeldwert enthält, ohne Bedingungen für dasselbe Element zu kombinieren.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> oder <code translate="no">array_contains_all</code> auf einem Unterfeldpfad wie <code translate="no">chunks[section]</code></td></tr>
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
<p>Wenn innerhalb des Prädikats mehrere Bedingungen verwendet werden, beziehen sich alle „ <code translate="no">$[subfield]</code> “-Referenzen auf dasselbe Struct-Element:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie ein Prädikat auf Entitätsebene mit „ <code translate="no">element_filter</code> “ kombinieren, setzen Sie „ <code translate="no">element_filter</code> “ an das Ende des Ausdrucks:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> kann in einem Filterausdruck nur einmal vorkommen. Verschachteln Sie „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “ nicht innerhalb eines anderen „ <code translate="no">element_filter</code> “.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Operatoren für die Übereinstimmung mit Familien<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> ergibt „ <code translate="no">true</code> “, wenn die Anzahl der Elemente, die das Prädikat erfüllen, genau gleich „ <code translate="no">threshold</code> “ ist.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Für ` <code translate="no">MATCH_EXACT</code>` kann ` <code translate="no">threshold</code> ` Null oder eine positive ganze Zahl sein.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Prädikate auf Zeilenebene für StructArray-Pfade<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Neben ` <code translate="no">element_filter</code> ` und ` <code translate="no">MATCH_*</code>` kann ein regulärer Filterausdruck direkt auf ein StructArray-Feld oder eines seiner skalaren Unterfelder verweisen. Diese Prädikate werden auf Entitätsebene ausgewertet und geben keine Element-Offsets zurück.</p>
<h3 id="Access-a-Struct-element-by-position" class="common-anchor-header">Zugriff auf ein Struct-Element über die Position<button data-href="#Access-a-Struct-element-by-position" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">structArrayField[index][subfield]</code> “, um auf ein skalares Unterfeld des Struct-Elements an einer nullbasierten Position zu verweisen. Geben Sie zuerst die Position und dann den Namen des Unterfelds an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The first chunk belongs to the &quot;index&quot; section.</span>
chunks[<span class="hljs-number">0</span>][section] == <span class="hljs-string">&quot;index&quot;</span>

<span class="hljs-comment"># The second chunk has a high quality score.</span>
chunks[<span class="hljs-number">1</span>][quality_score] &gt; <span class="hljs-number">0.9</span>

<span class="hljs-comment"># The first chunk is on page 1, 2, or 3.</span>
chunks[<span class="hljs-number">0</span>][page] <span class="hljs-keyword">in</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]

<span class="hljs-comment"># Chained range on a positional path.</span>
<span class="hljs-number">0.8</span> &lt; chunks[<span class="hljs-number">0</span>][quality_score] &lt; <span class="hljs-number">0.95</span>
<button class="copy-code-btn"></button></code></pre>
<p>Positionspfade unterstützen Vergleichsprädikate, „ <code translate="no">in</code> “, „ <code translate="no">not in</code> “ sowie verkettete Bereichsprädikate für skalare Unterfelder. Eine Entität entspricht nicht der Suche, wenn ihr „StructArray“-Feld an dieser Position kein Element enthält.</p>
<h3 id="Count-Struct-elements" class="common-anchor-header">Anzahl der Struct-Elemente<button data-href="#Count-Struct-elements" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">array_length(structArrayField)</code> “, um nach der Anzahl der Struct-Elemente in einer Entität zu filtern. „ <code translate="no">array_length</code> “ auf einem Unterfeldpfad, wie z. B. „ <code translate="no">array_length(chunks[section])</code> “, liefert dieselbe Anzahl, da jedes Unterfeld einen Wert pro Struct-Element enthält.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Articles with at least three chunks.</span>
array_length(chunks) &gt;= <span class="hljs-number">3</span>

<span class="hljs-comment"># Articles with exactly one chunk.</span>
array_length(chunks) == <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-subfield-values-across-elements" class="common-anchor-header">Unterfeldwerte über Elemente hinweg prüfen<button data-href="#Test-subfield-values-across-elements" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">array_contains</code> “, „ <code translate="no">array_contains_any</code> “ oder „ <code translate="no">array_contains_all</code> “ auf einen skalaren Unterfeldpfad, um die Werte dieses Unterfelds über alle Struct-Elemente in der Entität hinweg zu prüfen. Jeder Unterfeldpfad wird separat ausgewertet, sodass Bedingungen für verschiedene Unterfelder von unterschiedlichen Struct-Elementen erfüllt werden können.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># At least one chunk belongs to the &quot;index&quot; section.</span>
array_contains(chunks[section], <span class="hljs-string">&quot;index&quot;</span>)

<span class="hljs-comment"># At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.</span>
array_contains_any(chunks[section], [<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>])

<span class="hljs-comment"># The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,</span>
<span class="hljs-comment"># not necessarily in the same chunk.</span>
array_contains_all(chunks[section], [<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-string">&quot;search&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> wählt dieselben Entitäten aus wie <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Verwenden Sie <code translate="no">MATCH_*</code> oder <code translate="no">element_filter</code>, wenn mehrere Bedingungen für dasselbe Struct-Element erfüllt sein müssen, da die Prädikate von <code translate="no">$[...]</code> pro Element ausgewertet werden.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Prüfen, ob ein nullfähiges „StructArray“-Feld null ist<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">IS NULL</code> “ oder „ <code translate="no">IS NOT NULL</code> “ für ein nullfähiges „StructArray“-Feld, um den gesamten Feldwert zu prüfen. „Null“ gilt für das gesamte „StructArray“-Feld, daher akzeptieren diese Prädikate nur den Feldnamen, nicht jedoch einen Unterfeldpfad.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Entities that have no chunks value.</span>
chunks <span class="hljs-keyword">is</span> null

<span class="hljs-comment"># Entities that have a chunks value.</span>
chunks <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> null
<button class="copy-code-btn"></button></code></pre>
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
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>Vergleiche, verkettete Bereichsausdrücke, <code translate="no">in</code>, <code translate="no">not in</code>, arithmetische Ausdrücke mit <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> oder <code translate="no">%</code>, gefolgt von einem Vergleich, sowie logische Kombinationen.</td></tr>
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
<li><p>Array-Container-Funktionen wie <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> oder <code translate="no">array_length</code> auf <code translate="no">$[subfield]</code>. Verwenden Sie diese Funktionen stattdessen auf einem Unterfeldpfad wie <code translate="no">chunks[section]</code> in einem Prädikat auf Zeilenebene.</p></li>
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
<li><p>Verwenden Sie „ <code translate="no">$[subfield]</code> “ nur innerhalb von „ <code translate="no">element_filter</code> “- oder „ <code translate="no">MATCH_*</code> “-Prädikaten. Beispielsweise wird „ <code translate="no">array_length($[section])</code> “ abgelehnt.</p></li>
<li><p>Verwenden Sie „ <code translate="no">$[subfield]</code> “ nicht als JSON-Pfad, Array-Container oder Vektorfeldreferenz.</p></li>
<li><p>Verschachteln Sie „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “ nicht innerhalb eines anderen StructArray-Operators.</p></li>
<li><p>Verwenden Sie benannte „ <code translate="no">threshold=N</code> “ für „ <code translate="no">MATCH_LEAST</code> “, „ <code translate="no">MATCH_MOST</code> “ und „ <code translate="no">MATCH_EXACT</code> “.</p></li>
<li><p>Schreiben Sie bei positionsbezogenen Pfaden die Elementposition vor den Namen des Unterfelds: „ <code translate="no">chunks[0][section]</code> “, nicht „ <code translate="no">chunks[section][0]</code> “.</p></li>
<li><p>Verwenden Sie „ <code translate="no">IS NULL</code> “ und „ <code translate="no">IS NOT NULL</code> “ nur für das gesamte StructArray-Feld, z. B. „ <code translate="no">chunks is null</code> “. Verwenden Sie sie nicht in einem Unterfeldpfad wie „ <code translate="no">chunks[section]</code> “ oder in „ <code translate="no">$[subfield]</code> “.</p></li>
<li><p><code translate="no">MATCH_ANY</code> Bei einem leeren StructArray wird <code translate="no">false</code> zurückgegeben.</p></li>
<li><p><code translate="no">MATCH_ALL</code> Bei einem leeren StructArray wird „ <code translate="no">true</code> “ zurückgegeben.</p></li>
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
