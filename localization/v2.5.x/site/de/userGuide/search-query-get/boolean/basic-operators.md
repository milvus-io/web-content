---
id: basic-operators.md
summary: >-
  Milvus bietet eine Vielzahl von grundlegenden Operatoren, mit denen Sie Daten
  effizient filtern und abfragen können. Mit diesen Operatoren können Sie Ihre
  Suchbedingungen auf der Grundlage von skalaren Feldern, numerischen
  Berechnungen, logischen Bedingungen und mehr verfeinern. Die Kenntnis der
  Verwendung dieser Operatoren ist entscheidend für die Erstellung präziser
  Abfragen und die Maximierung der Effizienz Ihrer Suchvorgänge.
title: Grundlegende Operatoren
---
<h1 id="Basic-Operators​" class="common-anchor-header">Grundlegende Operatoren<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet einen umfangreichen Satz von Basisoperatoren, die Ihnen helfen, Daten effizient zu filtern und abzufragen. Mit diesen Operatoren können Sie Ihre Suchbedingungen auf der Grundlage von skalaren Feldern, numerischen Berechnungen, logischen Bedingungen und mehr verfeinern. Das Verständnis für die Verwendung dieser Operatoren ist entscheidend für die Erstellung präziser Abfragen und die Maximierung der Effizienz Ihrer Suchen.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Vergleichsoperatoren<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vergleichsoperatoren werden verwendet, um Daten auf der Grundlage von Gleichheit, Ungleichheit oder Größe zu filtern. Sie sind auf numerische, Text- und Datumsfelder anwendbar.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Unterstützte Vergleichsoperatoren.</h3><ul>
<li><p><code translate="no">==</code> (Gleich)</p></li>
<li><p><code translate="no">!=</code> (Nicht gleich)</p></li>
<li><p><code translate="no">&gt;</code> (Größer als)</p></li>
<li><p><code translate="no">&lt;</code> (Kleiner als)</p></li>
<li><p><code translate="no">&gt;=</code> (Größer als oder gleich)</p></li>
<li><p><code translate="no">&lt;=</code> (Kleiner als oder gleich)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Beispiel 1: Filtern mit Größer als oder gleich (<code translate="no">&gt;=</code>)</h3><p>Wenn Sie alle Entitäten finden möchten, deren <code translate="no">rating</code> größer oder gleich 4 ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Beispiel 2: Filtern mit Kleiner als oder gleich (<code translate="no">&lt;=</code>)</h3><p>Um Entitäten zu finden, deren <code translate="no">discount</code> kleiner oder gleich 10% ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Bereichsoperatoren<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Bereichsoperatoren helfen bei der Filterung von Daten auf der Grundlage bestimmter Gruppen oder Bereiche von Werten.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Unterstützte Bereichsoperatoren.</h3><ul>
<li><p><code translate="no">IN</code>: Wird verwendet, um Werte innerhalb eines bestimmten Satzes oder Bereichs zu finden.</p></li>
<li><p><code translate="no">LIKE</code>: Wird verwendet, um ein Muster abzugleichen (meist für Textfelder).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Beispiel 1: Verwendung von <code translate="no">IN</code> für die Suche nach mehreren Werten</h3><p>Wenn Sie alle Entitäten finden möchten, bei denen <code translate="no">color</code> entweder &quot;rot&quot;, &quot;grün&quot; oder &quot;blau&quot; ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dies ist nützlich, wenn Sie die Zugehörigkeit zu einer Liste von Werten prüfen wollen.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Beispiel 2: Verwendung von <code translate="no">LIKE</code> für Mustervergleiche</h3><p>Der Operator <code translate="no">LIKE</code> wird für den Mustervergleich in Zeichenkettenfeldern verwendet. Er kann Teilzeichenfolgen an verschiedenen Positionen im Text entsprechen: als <strong>Präfix</strong>, <strong>Infix</strong> oder <strong>Suffix</strong>. Der Operator <code translate="no">LIKE</code> verwendet das Symbol <code translate="no">%</code> als Platzhalter, der mit einer beliebigen Anzahl von Zeichen (einschließlich Null) übereinstimmen kann.</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Präfix-Übereinstimmung (Beginnt mit)</h4><p>Um eine <strong>Präfixübereinstimmung</strong> durchzuführen, bei der die Zeichenfolge mit einem bestimmten Muster beginnt, können Sie das Muster an den Anfang stellen und <code translate="no">%</code> verwenden, um alle darauf folgenden Zeichen abzugleichen. Beispiel: Sie möchten alle Produkte finden, deren <code translate="no">name</code> mit &quot;Prod&quot; beginnt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dies entspricht allen Produkten, deren Name mit &quot;Prod&quot; beginnt, z. B. &quot;Produkt A&quot;, &quot;Produkt B&quot; usw.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Suffix-Übereinstimmung (Endet mit)</h4><p>Für eine <strong>Suffix-Übereinstimmung</strong>, bei der die Zeichenfolge mit einem bestimmten Muster endet, setzen Sie das Symbol <code translate="no">%</code> an den Anfang des Musters. Beispiel: Sie möchten alle Produkte finden, deren <code translate="no">name</code> mit &quot;XYZ&quot; endet.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Damit werden alle Produkte gefunden, deren Name mit &quot;XYZ&quot; endet, wie z. B. &quot;ProduktXYZ&quot;, &quot;MusterXYZ&quot; usw.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Infix-Abgleich (Enthält)</h4><p>Um eine <strong>Infix-Übereinstimmung</strong> durchzuführen, bei der das Muster an beliebiger Stelle in der Zeichenfolge erscheinen kann, können Sie das Symbol <code translate="no">%</code> sowohl am Anfang als auch am Ende des Musters platzieren. Beispiel: Sie möchten alle Produkte finden, deren <code translate="no">name</code> das Wort &quot;Pro&quot; enthält.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dies entspricht allen Produkten, deren Name die Teilzeichenkette &quot;Pro&quot; enthält, wie z. B. &quot;Product&quot;, &quot;ProLine&quot; oder &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Arithmetische Operatoren<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit arithmetischen Operatoren können Sie Bedingungen erstellen, die auf Berechnungen mit numerischen Feldern basieren.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Unterstützte arithmetische Operatoren.</h3><ul>
<li><p><code translate="no">+</code> (Addition)</p></li>
<li><p><code translate="no">-</code> (Subtraktion)</p></li>
<li><p><code translate="no">*</code> (Multiplikation)</p></li>
<li><p><code translate="no">/</code> (Division)</p></li>
<li><p><code translate="no">%</code> (Modulus)</p></li>
<li><p><code translate="no">**</code> (Potenzierung)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Beispiel 1: Verwendung der Addition (<code translate="no">+</code>)</h3><p>Suche nach Entitäten, bei denen der Preis <code translate="no">total</code> die Summe von <code translate="no">base_price</code> und <code translate="no">tax</code> ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Beispiel 2: Verwendung der Subtraktion (<code translate="no">-</code>)</h3><p>Um Entitäten zu finden, bei denen <code translate="no">quantity</code> größer als 50 und <code translate="no">quantity_sold</code> kleiner als 30 ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Beispiel 3: Verwendung der Multiplikation (<code translate="no">*</code>)</h3><p>Suche nach Entitäten, bei denen <code translate="no">price</code> größer als 100 und <code translate="no">quantity</code> größer als 10 ist, multipliziert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Beispiel 4: Verwendung der Division (<code translate="no">/</code>)</h3><p>Um Produkte zu finden, bei denen <code translate="no">total_price</code> geteilt durch <code translate="no">quantity</code> kleiner als 50 ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Beispiel 5: Verwendung von Modulus (<code translate="no">%</code>)</h3><p>Um Einheiten zu finden, bei denen <code translate="no">id</code> eine gerade Zahl ist (d.h. durch 2 teilbar).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Beispiel 6: Verwendung der Potenzierung (<code translate="no">**</code>)</h3><p>Um Entitäten zu finden, bei denen <code translate="no">price</code> hoch 2 größer als 1000 ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Logische Operatoren<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Logische Operatoren werden verwendet, um mehrere Bedingungen in einem komplexeren Filterausdruck zu kombinieren. Dazu gehören <code translate="no">AND</code>, <code translate="no">OR</code> und <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Unterstützte logische Operatoren.</h3><ul>
<li><p><code translate="no">AND</code>: Kombiniert mehrere Bedingungen, die alle wahr sein müssen.</p></li>
<li><p><code translate="no">OR</code>: Kombiniert Bedingungen, von denen mindestens eine wahr sein muss.</p></li>
<li><p><code translate="no">NOT</code>: Negiert eine Bedingung.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Beispiel 1: <code translate="no">AND</code> zum Kombinieren von Bedingungen verwenden</h3><p>Alle Produkte finden, bei denen <code translate="no">price</code> größer als 100 und <code translate="no">stock</code> größer als 50 ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Beispiel 2: <code translate="no">OR</code> zum Kombinieren von Bedingungen verwenden</h3><p>Um alle Produkte zu finden, bei denen <code translate="no">color</code> entweder &quot;rot&quot; oder &quot;blau&quot; ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Beispiel 3: Verwendung von <code translate="no">NOT</code> zum Ausschließen einer Bedingung</h3><p>Um alle Produkte zu finden, bei denen <code translate="no">color</code> nicht &quot;grün&quot; ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Tipps zur Verwendung grundlegender Operatoren mit JSON- und ARRAY-Feldern<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Basisoperatoren in Milvus sind zwar vielseitig und können auf skalare Felder angewendet werden, aber sie können auch effektiv mit den Schlüsseln und Indizes in JSON- und ARRAY-Feldern verwendet werden.</p>
<p>Wenn Sie zum Beispiel ein Feld <code translate="no">product</code> haben, das mehrere Schlüssel wie <code translate="no">price</code>, <code translate="no">model</code> und <code translate="no">tags</code> enthält, verweisen Sie immer direkt auf den Schlüssel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Um Datensätze zu finden, bei denen die erste Temperatur in einem Array von aufgezeichneten Temperaturen einen bestimmten Wert überschreitet, verwenden Sie.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Schlussfolgerung<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet eine Reihe von grundlegenden Operatoren, die Ihnen Flexibilität beim Filtern und Abfragen Ihrer Daten bieten. Durch die Kombination von Vergleichs-, Bereichs-, arithmetischen und logischen Operatoren können Sie leistungsstarke Filterausdrücke erstellen, um Ihre Suchergebnisse einzugrenzen und die benötigten Daten effizient abzurufen.</p>
