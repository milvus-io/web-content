---
id: boolean.md
title: Filterfunktionen erklärt
summary: >-
  Milvus bietet leistungsstarke Filterfunktionen, die eine präzise Abfrage Ihrer
  Daten ermöglichen. Mit Filterausdrücken können Sie bestimmte skalare Felder
  gezielt ansprechen und Suchergebnisse anhand verschiedener Bedingungen
  verfeinern. In diesem Leitfaden wird anhand von Beispielen, die sich auf
  Abfrageoperationen konzentrieren, erläutert, wie Sie Filterausdrücke in Milvus
  verwenden. Sie können diese Filter auch in Such- und Löschanfragen anwenden.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Filterfunktionen erklärt<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet leistungsstarke Filterfunktionen, die eine präzise Abfrage Ihrer Daten ermöglichen. Mit Filterausdrücken können Sie bestimmte skalare Felder gezielt ansprechen und Suchergebnisse anhand verschiedener Bedingungen verfeinern. In diesem Leitfaden wird anhand von Beispielen, die sich auf Abfrageoperationen konzentrieren, erläutert, wie Sie Filterausdrücke in Milvus verwenden. Sie können diese Filter auch in Such- und Löschanfragen anwenden.</p>
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
<li><p><strong>Vergleichsoperatoren</strong>: „ <code translate="no">==</code> “, „ <code translate="no">!=</code> “, „ <code translate="no">&gt;</code> “, „ <code translate="no">&lt;</code> “, „ <code translate="no">&gt;=</code> “ und „ <code translate="no">&lt;=</code> “ ermöglichen die Filterung anhand von numerischen oder Textfeldern.</p></li>
<li><p><strong>Bereichs- und Musterfilter</strong>: <code translate="no">IN</code>, <code translate="no">LIKE</code>, <code translate="no">=~</code> und <code translate="no">!~</code> suchen nach Werten, Platzhaltermustern oder regulären Ausdrücken. Weitere Informationen zu Zeichenfolgenmustern finden Sie unter <a href="/docs/de/pattern-matching.md">„Musterabgleich</a>“.</p></li>
<li><p><strong>Arithmetische Operatoren</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> und <code translate="no">**</code> werden für Berechnungen mit numerischen Feldern verwendet.</p></li>
<li><p><strong>Bitweise Operatoren</strong>: In Milvus 3.0.0 und höher filtern „ <code translate="no">&amp;</code> “, „ <code translate="no">|</code> “ und „ <code translate="no">^</code> “ Integer-Felder, die mehrere Flags kodieren, wie z. B. Berechtigungen oder Statusbits. Weitere Informationen finden Sie unter <a href="/docs/de/basic-operators.md#Bitwise-operators">„Grundlegende Operatoren</a>“.</p></li>
<li><p><strong>Logische Operatoren</strong>: „ <code translate="no">AND</code> “, „ <code translate="no">OR</code> “ und „ <code translate="no">NOT</code> “ kombinieren mehrere Bedingungen zu komplexen Ausdrücken.</p></li>
<li><p><strong>Operatoren „IS NULL“ und „IS NOT NULL</strong>“: Die Operatoren „ <code translate="no">IS NULL</code> “ und „ <code translate="no">IS NOT NULL</code> “ dienen dazu, Felder danach zu filtern, ob sie einen NULL-Wert (Fehlen von Daten) enthalten. Weitere Informationen finden Sie unter <a href="/docs/de/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">„Grundlegende Operatoren</a>“.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Beispiel: Filtern nach Farbe<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>Um Entitäten mit Primärfarben (rot, grün oder blau) in einem Skalarfeld „ <code translate="no">color</code> “ zu finden, verwenden Sie den folgenden Filterausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">Beispiel: Filtern nach Berechtigungsbits<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>Um Entitäten zu finden, bei denen im ganzzahligen Feld „ <code translate="no">permissions</code> “ das Bit „ <code translate="no">SHARE</code> “ gesetzt ist, verwenden Sie den bitweisen UND-Operator (<code translate="no">&amp;</code>):</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">Beispiel: Filtern nach Regex-Muster<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Um Entitäten zu finden, deren Feld „ <code translate="no">message</code> “ einen Fehlercode wie „ <code translate="no">E1001</code> “ enthält, verwenden Sie den Regex-Abgleichoperator „ <code translate="no">=~</code> “:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Regex-Filter verwenden Teilzeichenfolgenabgleich. Um zu erzwingen, dass der gesamte Feldwert mit dem Muster übereinstimmt, fügen Sie die Anker „ <code translate="no">^</code> “ und „ <code translate="no">$</code> “ hinzu. Weitere Informationen finden Sie unter <a href="/docs/de/pattern-matching.md">„Musterabgleich</a>“.</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Beispiel: Filtern von JSON-Feldern<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus ermöglicht das Referenzieren von Schlüsseln in JSON-Feldern. Wenn Sie beispielsweise ein JSON-Feld „ <code translate="no">product</code> “ mit den Schlüsseln „ <code translate="no">price</code> “ und „ <code translate="no">model</code> “ haben und Produkte mit einem bestimmten Modell und einem Preis unter 1.850 suchen möchten, verwenden Sie diesen Filterausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Beispiel: Filtern von Array-Feldern<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie ein Array-Feld „ <code translate="no">history_temperatures</code> “ haben, das die von Wetterstationen seit dem Jahr 2000 gemeldeten Durchschnittstemperaturen enthält, und Wetterstationen suchen möchten, an denen die Temperatur im Jahr 2009 (dem 10. Erfassungsjahr) 23 °C übersteigt, verwenden Sie diesen Ausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu diesen grundlegenden Operatoren finden Sie unter <a href="/docs/de/basic-operators.md">„Grundlegende Operatoren</a>“.</p>
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
    </button></h2><p>Beim Filtern mit CJK-Zeichen kann die Verarbeitung aufgrund der größeren Zeichensätze und der unterschiedlichen Kodierungen komplexer sein. Dies kann zu einer geringeren Leistung führen, insbesondere beim Operator „ <code translate="no">IN</code> “.</p>
<p>Milvus führt Filterausdrucksvorlagen ein, um die Leistung bei der Arbeit mit CJK-Zeichen zu optimieren. Durch die Trennung dynamischer Werte vom Filterausdruck kann die Abfrage-Engine die Einfügung von Parametern effizienter verarbeiten.</p>
<h3 id="Example" class="common-anchor-header">Beispiel<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>Um Personen über 25 Jahre zu finden, die entweder in „北京“ (Peking) oder „上海“ (Shanghai) leben, verwenden Sie den folgenden Vorlagenausdruck:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um die Leistung zu verbessern, verwenden Sie diese Variante mit Parametern:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Ansatz reduziert den Parsing-Aufwand und verbessert die Abfragegeschwindigkeit. Weitere Informationen finden Sie unter <a href="/docs/de/filtering-templating.md">Filtervorlagen</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Datentyp-spezifische Operatoren<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet erweiterte Filteroperatoren für bestimmte Datentypen, wie z. B. JSON-, ARRAY- und VARCHAR-Felder.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON-feldspezifische Operatoren<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus bietet erweiterte Operatoren für die Abfrage von JSON-Feldern, die eine präzise Filterung innerhalb komplexer JSON-Strukturen ermöglichen:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Prüft, ob ein JSON-Ausdruck im Feld vorhanden ist.</p>
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
<p>Weitere Informationen zu JSON-Operatoren finden Sie unter <a href="/docs/de/json-operators.md">„JSON-Operatoren</a>“.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY-feldspezifische Operatoren<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus bietet erweiterte Filteroperatoren für Array-Felder, wie z. B. „ <code translate="no">ARRAY_CONTAINS</code> “, „ <code translate="no">ARRAY_CONTAINS_ALL</code> “, „ <code translate="no">ARRAY_CONTAINS_ANY</code> “ und „ <code translate="no">ARRAY_LENGTH</code> “, die eine detaillierte Steuerung der Array-Daten ermöglichen:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filtert Entitäten, die ein bestimmtes Element enthalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filtert Entitäten, bei denen alle Elemente einer Liste vorhanden sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filtert Entitäten, die ein beliebiges Element aus der Liste enthalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filtert anhand der Länge des Arrays.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu Array-Operatoren finden Sie unter <a href="/docs/de/array-operators.md">ARRAY-Operatoren</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR-feldspezifische Operatoren<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus bietet spezielle Operatoren für präzise textbasierte Suchen in VARCHAR-Feldern:</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">Operatoren für den Musterabgleich</h4><p>Die Operatoren „ <code translate="no">LIKE</code> “, „ <code translate="no">=~</code> “ und „ <code translate="no">!~</code> “ suchen nach Zeichenfolgenmustern in „ <code translate="no">VARCHAR</code> “-Feldern, JSON-Zeichenfolgenpfaden und bestimmten „ <code translate="no">ARRAY&lt;VARCHAR&gt;</code> “-Elementen. Verwenden Sie „ <code translate="no">LIKE</code> “ für einfache Platzhaltermuster. Verwenden Sie „ <code translate="no">=~</code> “ und „ <code translate="no">!~</code> “ für RE2-reguläre Ausdrücke.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/pattern-matching.md">„Musterabgleich</a>“.</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> Operator</h4><p>Der Operator „ <code translate="no">TEXT_MATCH</code> “ ermöglicht die präzise Dokumentensuche anhand bestimmter Suchbegriffe. Er eignet sich besonders für gefilterte Suchen, bei denen skalare Filter mit vektoriellen Ähnlichkeitssuchen kombiniert werden. Im Gegensatz zur semantischen Suche konzentriert sich „Text Match“ auf das exakte Vorkommen von Begriffen.</p>
<p>Milvus nutzt Tantivy zur Unterstützung der invertierten Indizierung und der termbasierten Textsuche. Der Prozess umfasst:</p>
<ol>
<li><p><strong>Analyzer</strong>: Tokenisiert und verarbeitet den Eingabetext.</p></li>
<li><p><strong>Indizierung</strong>: Erstellt einen invertierten Index, der eindeutige Token Dokumenten zuordnet.</p></li>
</ol>
<p>Weitere Details finden Sie unter <a href="/docs/de/keyword-match.md">„Text Match</a>“.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> Operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>Der Operator <strong>PHRASE_MATCH</strong> ermöglicht die präzise Suche nach Dokumenten anhand exakter Phrasenübereinstimmungen, wobei sowohl die Reihenfolge als auch die Nähe der Suchbegriffe berücksichtigt werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/phrase-match.md">Phrasenabgleich</a>.</p>
