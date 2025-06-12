---
id: boolean.md
title: Filterung erklärt
summary: >-
  Milvus bietet leistungsstarke Filtermöglichkeiten, die eine präzise Abfrage
  Ihrer Daten ermöglichen. Mit Filterausdrücken können Sie bestimmte skalare
  Felder anvisieren und Suchergebnisse mit verschiedenen Bedingungen verfeinern.
  In diesem Handbuch wird die Verwendung von Filterausdrücken in Milvus anhand
  von Beispielen erläutert, die sich auf Abfrageoperationen konzentrieren. Sie
  können diese Filter auch in Such- und Löschanfragen anwenden.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Filterung erklärt<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet leistungsstarke Filtermöglichkeiten, die eine präzise Abfrage Ihrer Daten ermöglichen. Mit Filterausdrücken können Sie bestimmte skalare Felder anvisieren und die Suchergebnisse mit verschiedenen Bedingungen verfeinern. In diesem Leitfaden wird die Verwendung von Filterausdrücken in Milvus anhand von Beispielen erläutert, die sich auf Abfrageoperationen konzentrieren. Sie können diese Filter auch in Such- und Löschanfragen anwenden.</p>
<h2 id="Basic-operators" class="common-anchor-header">Grundlegende Operatoren<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt mehrere grundlegende Operatoren zum Filtern von Daten:</p>
<ul>
<li><p><strong>Vergleichsoperatoren</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> und <code translate="no">&lt;=</code> ermöglichen die Filterung auf der Grundlage von numerischen oder Textfeldern.</p></li>
<li><p><strong>Bereichsfilter</strong>: <code translate="no">IN</code> und <code translate="no">LIKE</code> helfen bei der Suche nach bestimmten Wertebereichen oder -mengen.</p></li>
<li><p><strong>Arithmetische Operatoren</strong>: <code translate="no">+</code> <code translate="no">-</code> , <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> und <code translate="no">**</code> werden für Berechnungen mit numerischen Feldern verwendet.</p></li>
<li><p><strong>Logische Operatoren</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, und <code translate="no">NOT</code> kombinieren mehrere Bedingungen zu komplexen Ausdrücken.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Beispiel: Filtern nach Farbe</h3><p>Um Entitäten mit Primärfarben (rot, grün oder blau) in einem skalaren Feld <code translate="no">color</code> zu finden, verwenden Sie den folgenden Filterausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Beispiel: Filtern von JSON-Feldern</h3><p>Milvus erlaubt es, Schlüssel in JSON-Feldern zu referenzieren. Wenn Sie zum Beispiel ein JSON-Feld <code translate="no">product</code> mit den Schlüsseln <code translate="no">price</code> und <code translate="no">model</code> haben und Produkte mit einem bestimmten Modell und einem Preis unter 1.850 finden möchten, verwenden Sie diesen Filterausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Beispiel: Filtern von Array-Feldern</h3><p>Wenn Sie ein Array-Feld <code translate="no">history_temperatures</code> haben, das die Aufzeichnungen der von Observatorien seit dem Jahr 2000 gemeldeten Durchschnittstemperaturen enthält, und Observatorien finden möchten, bei denen die Temperatur im Jahr 2009 (die 10. aufgezeichnete) 23°C übersteigt, verwenden Sie diesen Ausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu diesen grundlegenden Operatoren finden Sie unter <a href="/docs/de/basic-operators.md">Grundlegende Operatoren</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Vorlagen für Filterausdrücke<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie mit CJK-Zeichen filtern, kann die Verarbeitung aufgrund der größeren Zeichensätze und Kodierungsunterschiede komplexer sein. Dies kann zu einer langsameren Leistung führen, insbesondere mit dem <code translate="no">IN</code> Operator.</p>
<p>Milvus führt Filterausdruck-Vorlagen ein, um die Leistung bei der Arbeit mit CJK-Zeichen zu optimieren. Durch die Trennung der dynamischen Werte vom Filterausdruck kann die Abfragemaschine das Einfügen von Parametern effizienter handhaben.</p>
<h3 id="Example" class="common-anchor-header">Beispiel</h3><p>Um Personen über 25 Jahre zu finden, die entweder in "北京" (Peking) oder "上海" (Shanghai) leben, verwenden Sie den folgenden Vorlagenausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um die Leistung zu verbessern, verwenden Sie diese Variante mit Parametern:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Ansatz reduziert den Parsing-Overhead und verbessert die Abfragegeschwindigkeit. Weitere Informationen finden Sie unter <a href="/docs/de/filtering-templating.md">Filtervorlagen</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Datentypspezifische Operatoren<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet erweiterte Filteroperatoren für bestimmte Datentypen, wie JSON-, ARRAY- und VARCHAR-Felder.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON-Feld-spezifische Operatoren</h3><p>Milvus bietet erweiterte Operatoren für die Abfrage von JSON-Feldern, die eine präzise Filterung innerhalb komplexer JSON-Strukturen ermöglichen:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Prüft, ob ein JSON-Ausdruck im Feld existiert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Stellt sicher, dass alle Elemente des JSON-Ausdrucks vorhanden sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Filtert nach Entitäten, bei denen mindestens ein Element im JSON-Ausdruck vorhanden ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Einzelheiten zu JSON-Operatoren finden Sie unter <a href="/docs/de/json-operators.md">JSON-Operatoren</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Feldspezifische ARRAY-Operatoren</h3><p>Milvus bietet erweiterte Filteroperatoren für Array-Felder, wie <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code> und <code translate="no">ARRAY_LENGTH</code>, die eine feinkörnige Kontrolle über Array-Daten ermöglichen:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filtert Entitäten, die ein bestimmtes Element enthalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filtert Entitäten, in denen alle Elemente einer Liste vorhanden sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filtert Entitäten, die ein beliebiges Element aus der Liste enthalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filtert auf der Grundlage der Länge des Arrays.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Einzelheiten zu Array-Operatoren finden Sie unter <a href="/docs/de/array-operators.md">ARRAY-Operatoren</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR feldspezifische Operatoren</h3><p>Milvus bietet spezielle Operatoren für die präzise textbasierte Suche in VARCHAR-Feldern:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> Operator</h4><p>Der Operator <code translate="no">TEXT_MATCH</code> ermöglicht die präzise Suche nach Dokumenten auf der Grundlage bestimmter Suchbegriffe. Er ist besonders nützlich für gefilterte Suchen, die skalare Filter mit vektoriellen Ähnlichkeitssuchen kombinieren. Im Gegensatz zur semantischen Suche konzentriert sich Text Match auf das genaue Vorkommen von Begriffen.</p>
<p>Milvus verwendet Tantivy zur Unterstützung der invertierten Indizierung und der begriffsbasierten Textsuche. Der Prozess umfasst:</p>
<ol>
<li><p><strong>Analyzer</strong>: Tokenisiert und verarbeitet den Eingabetext.</p></li>
<li><p><strong>Indizierung</strong>: Erzeugt einen invertierten Index, der eindeutige Token auf Dokumente abbildet.</p></li>
</ol>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/keyword-match.md">Textabgleich</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> Operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>Der <strong>PHRASE_MATCH-Operator</strong> ermöglicht das präzise Auffinden von Dokumenten auf der Grundlage von exakten Phrasenübereinstimmungen, wobei sowohl die Reihenfolge als auch die Nachbarschaft der Suchbegriffe berücksichtigt werden.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/phrase-match.md">Phrase Match</a>.</p>
<h2 id="Random-sampling-operator--Milvus-26x" class="common-anchor-header">Zufallsstichproben-Operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-sampling-operator--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit dem Operator für Zufallsstichproben können Sie eine Teilmenge von Datenproben aus einer Sammlung auf Segmentebene extrahieren, was ideal für die Untersuchung und Verarbeitung umfangreicher Datensätze ist. Diese Funktion ist für diese Anwendungsfälle sehr nützlich:</p>
<ul>
<li><p><strong>Schnelle Datenvorschau</strong>: Sie liefert repräsentative Beispieldaten mit minimalem Ressourcenverbrauch, so dass Sie schnell die Gesamtstruktur und den Inhalt großer Vektordatensätze erfassen können.</p></li>
<li><p><strong>Kombinierte Filterung</strong>: Bei der Filterung nach mehreren Kriterien (z. B. Auswahl von Dokumenten nach Attributen) ermöglicht die Kombination mit Zufallsstichproben schnelle statistische Zusammenfassungen und Vorschauen auf die gefilterten Ergebnisse.</p></li>
<li><p><strong>Ressourceneinsparung bei der Verarbeitung großer Datenmengen</strong>: Bei sehr großen Datenbeständen kann das Aggregieren und Analysieren der gesamten Daten ressourcenintensiv sein. Zufallsstichproben reduzieren die Verarbeitungslast, indem sie die Menge der zu verarbeitenden Daten verringern.</p></li>
</ul>
<p>Verwenden Sie die folgende Syntax für Zufallsstichproben:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = RANDOM_SAMPLE(<span class="hljs-built_in">float</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">float</code><strong>:</strong> Ein Stichprobenfaktor im Bereich (0, 1), ohne Berücksichtigung der Grenzen. Zum Beispiel wählt <code translate="no">RANDOM_SAMPLE(0.001)</code> ungefähr 0,1% der Ergebnisse aus.</li>
</ul>
<div class="alert note">
<p>Beim Ausdruck <code translate="no">RANDOM_SAMPLE</code> wird die Groß- und Kleinschreibung nicht berücksichtigt. Sie können entweder <code translate="no">RANDOM_SAMPLE</code> oder <code translate="no">random_sample</code> verwenden.</p>
</div>
<h3 id="Combine-with-other-filters" class="common-anchor-header">Kombinieren mit anderen Filtern</h3><p>Der Zufallsstichprobenoperator muss mit anderen Filterausdrücken unter Verwendung der logischen <code translate="no">AND</code> kombiniert werden. Ein Beispiel:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hier wendet Milvus zuerst die Bedingung <code translate="no">color = 'red'</code> an und führt dann eine Zufallsstichprobe auf die Ergebnismenge durch.</p>
<h3 id="Example-Random-sampling-without-an-additional-filter" class="common-anchor-header">Beispiel: Zufallsstichproben ohne einen zusätzlichen Filter</h3><p>In diesem Beispiel nimmt die Abfrage eine zufällige Teilmenge (ca. 1%) der gesamten Daten in der angegebenen Sammlung:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Combined-filtering-with-random-sampling" class="common-anchor-header">Beispiel: Kombinierte Filterung mit Zufallsstichproben</h3><p>In diesem Beispiel filtert die Abfrage zunächst die Dokumente auf der Grundlage eines bestimmten Attributs (in diesem Fall die Dokumente, bei denen <code translate="no">color</code> gleich <code translate="no">'red'</code> ist). Nach der Filterung wird der Zufallsstichprobenoperator angewendet, um etwa 0,1 % der gefilterten Ergebnisse zurückzugeben:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
