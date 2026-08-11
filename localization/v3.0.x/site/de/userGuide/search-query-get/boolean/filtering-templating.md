---
id: filtering-templating.md
title: Filter-Vorlagen
summary: >-
  In Milvus können komplexe Filterausdrücke mit zahlreichen Elementen,
  insbesondere solche, die Nicht-ASCII-Zeichen wie CJK-Zeichen enthalten, die
  Abfrageleistung erheblich beeinträchtigen. Um diesem Problem entgegenzuwirken,
  führt Milvus einen Mechanismus für Filterausdruck-Vorlagen ein, der die
  Effizienz steigern soll, indem er den Zeitaufwand für die Analyse komplexer
  Ausdrücke reduziert. Auf dieser Seite wird die Verwendung von
  Filterausdruck-Vorlagen bei Such-, Abfrage- und Löschvorgängen erläutert.
---
<h1 id="Filter-Templating" class="common-anchor-header">Filter-Vorlagen<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus können komplexe Filterausdrücke mit zahlreichen Elementen, insbesondere solche, die Nicht-ASCII-Zeichen wie CJK-Zeichen enthalten, die Abfrageleistung erheblich beeinträchtigen. Um diesem Problem entgegenzuwirken, führt Milvus einen Mechanismus für Filterausdruck-Vorlagen ein, der die Effizienz steigern soll, indem er den Zeitaufwand für das Parsen komplexer Ausdrücke reduziert. Auf dieser Seite wird die Verwendung von Filterausdruck-Vorlagen bei Such-, Abfrage- und Löschvorgängen erläutert.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit Filterausdrucksvorlagen können Sie Filterausdrücke mit Platzhaltern erstellen, die während der Abfrageausführung dynamisch durch Werte ersetzt werden können. Durch die Verwendung von Vorlagen vermeiden Sie es, große Arrays oder komplexe Ausdrücke direkt in den Filter einzubetten, wodurch die Parsing-Zeit reduziert und die Abfrageleistung verbessert wird.</p>
<p>Angenommen, Sie haben einen Filterausdruck, der zwei Felder umfasst: „ <code translate="no">age</code> “ und „ <code translate="no">city</code> “, und Sie möchten alle Personen finden, deren Alter über 25 liegt und die entweder in „北京“ (Peking) oder „上海“ (Shanghai) leben. Anstatt die Werte direkt in den Filterausdruck einzubetten, können Sie eine Vorlage verwenden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Hier sind „ <code translate="no">{age}</code> “ und „ <code translate="no">{city}</code> “ Platzhalter, die bei der Ausführung der Abfrage durch die tatsächlichen Werte in „ <code translate="no">filter_params</code> “ ersetzt werden.</p>
<p>Die Verwendung von Filterausdrucksvorlagen in Milvus bietet mehrere wesentliche Vorteile:</p>
<ul>
<li><p><strong>Reduzierte Parsing-Zeit</strong>: Durch das Ersetzen großer oder komplexer Filterausdrücke durch Platzhalter benötigt das System weniger Zeit für das Parsen und die Verarbeitung des Filters.</p></li>
<li><p><strong>Verbesserte Abfrageleistung</strong>: Durch den geringeren Parsing-Aufwand verbessert sich die Abfrageleistung, was zu höheren QPS und schnelleren Antwortzeiten führt.</p></li>
<li><p><strong>Skalierbarkeit</strong>: Wenn Ihre Datensätze wachsen und Filterausdrücke komplexer werden, sorgt die Verwendung von Vorlagen dafür, dass die Leistung effizient und skalierbar bleibt.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Suchvorgänge<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Für Suchvorgänge in Milvus wird der Ausdruck „ <code translate="no">filter</code> “ zur Definition der Filterbedingung verwendet, und der Parameter „ <code translate="no">filter_params</code> “ dient zur Angabe der Werte für die Platzhalter. Das Wörterbuch „ <code translate="no">filter_params</code> “ enthält die dynamischen Werte, die Milvus zur Ersetzung in der Filterausdruck verwendet.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel ersetzt Milvus bei der Ausführung der Suche „ <code translate="no">{age}</code> “ dynamisch durch „ <code translate="no">25</code> “ und „ <code translate="no">{city}</code> “ durch „ <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> “.</p>
<h2 id="Query-Operations" class="common-anchor-header">Abfrageoperationen<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Der gleiche Vorlagenmechanismus kann auf Abfrageoperationen in Milvus angewendet werden. In der Funktion „ <code translate="no">query</code> “ definieren Sie den Filterausdruck und verwenden „ <code translate="no">filter_params</code> “, um die zu ersetzenden Werte anzugeben.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Durch die Verwendung von ` <code translate="no">filter_params</code>` verarbeitet Milvus das dynamische Einfügen von Werten effizient und verbessert so die Geschwindigkeit der Abfrageausführung.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Löschvorgänge<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die Verwendung von Filterausdrucksvorlagen auch bei Löschvorgängen nutzen. Ähnlich wie bei der Suche und bei Abfragen definiert der Ausdruck „ <code translate="no">filter</code> “ die Bedingungen, und die Funktion „ <code translate="no">filter_params</code> “ liefert die dynamischen Werte für die Platzhalter.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Ansatz verbessert die Leistung von Löschvorgängen, insbesondere bei komplexen Filterbedingungen.</p>
<h2 id="Conclusion" class="common-anchor-header">Fazit<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Filterausdrucksvorlagen sind ein unverzichtbares Werkzeug zur Optimierung der Abfrageleistung in Milvus. Durch die Verwendung von Platzhaltern und dem „ <code translate="no">filter_params</code> “-Wörterbuch können Sie den Zeitaufwand für die Analyse komplexer Filterausdrücke erheblich reduzieren. Dies führt zu einer schnelleren Abfrageausführung und einer besseren Gesamtleistung.</p>
