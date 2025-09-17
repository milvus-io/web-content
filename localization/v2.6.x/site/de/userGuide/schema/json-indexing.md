---
id: json-indexing.md
title: JSON-Indizierung
summary: >-
  JSON-Felder bieten eine flexible Möglichkeit zur Speicherung strukturierter
  Metadaten in Milvus. Ohne Indizierung erfordern Abfragen von JSON-Feldern
  Scans der gesamten Sammlung, die mit wachsendem Datenbestand langsam werden.
  Die JSON-Indizierung ermöglicht schnelle Abfragen durch die Erstellung von
  Indizes in Ihren JSON-Daten.
---
<h1 id="JSON-Indexing" class="common-anchor-header">JSON-Indizierung<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON-Felder bieten eine flexible Möglichkeit zur Speicherung strukturierter Metadaten in Milvus. Ohne Indizierung erfordern Abfragen von JSON-Feldern Scans der gesamten Kollektion, die mit wachsendem Datenbestand langsam werden. Die JSON-Indizierung ermöglicht schnelle Abfragen durch die Erstellung von Indizes in Ihren JSON-Daten.</p>
<p>JSON-Indizierung ist ideal für:</p>
<ul>
<li><p>Strukturierte Schemata mit konsistenten, bekannten Schlüsseln</p></li>
<li><p>Gleichheits- und Bereichsabfragen auf bestimmten JSON-Pfaden</p></li>
<li><p>Szenarien, in denen Sie genau steuern müssen, welche Schlüssel indiziert werden</p></li>
<li><p>Speichereffiziente Beschleunigung von gezielten Abfragen</p></li>
</ul>
<div class="alert note">
<p>Für komplexe JSON-Dokumente mit unterschiedlichen Abfragemustern sollten Sie <a href="/docs/de/json-shredding.md">JSON Shredding</a> als Alternative in Betracht ziehen.</p>
</div>
<h2 id="JSON-indexing-syntax" class="common-anchor-header">JSON-Indizierungssyntax<button data-href="#JSON-indexing-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie einen JSON-Index erstellen, geben Sie an:</p>
<ul>
<li><p><strong>JSON-Pfad</strong>: Den genauen Ort der Daten, die Sie indizieren möchten</p></li>
<li><p><strong>Typ der Datenaufbereitung</strong>: Wie die indizierten Werte zu interpretieren und zu speichern sind</p></li>
<li><p><strong>Optionale Typkonvertierung</strong>: Daten während der Indizierung umwandeln, falls erforderlich</p></li>
</ul>
<p>Hier ist die Syntax für die Indizierung eines JSON-Feldes:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;&lt;json_field_name&gt;&quot;</span>,  <span class="hljs-comment"># Name of the JSON field</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Must be AUTOINDEX or INVERTED</span>
    index_name=<span class="hljs-string">&quot;&lt;unique_index_name&gt;&quot;</span>,  <span class="hljs-comment"># Index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;&lt;path_to_json_key&gt;&quot;</span>,  <span class="hljs-comment"># Specific key to be indexed within JSON data</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;&lt;data_type&gt;&quot;</span>,  <span class="hljs-comment"># Data type to use when interpreting and indexing the value</span>
        <span class="hljs-comment"># &quot;json_cast_function&quot;: &quot;&lt;cast_function&gt;&quot;  # Optional: convert key values into a target type at index time</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wert / Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Der Name Ihres JSON-Feldes im Sammlungsschema.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Muss <code translate="no">"AUTOINDEX"</code> oder <code translate="no">"INVERTED"</code> für JSON-Indizierung sein.</p></td>
     <td><p><code translate="no">"AUTOINDEX"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>Eindeutiger Bezeichner für diesen Index.</p></td>
     <td><p><code translate="no">"category_index"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_path</code></p></td>
     <td><p>Der Pfad zu dem Schlüssel, den Sie innerhalb Ihres JSON-Objekts indizieren möchten.</p></td>
     <td><ul><li><p>Schlüssel der obersten Ebene: <code translate="no">'metadata["category"]'</code></p></li><li><p>Verschachtelter Schlüssel: <code translate="no">'metadata["supplier"]["contact"]["email"]'</code></p></li><li><p>Ganzes JSON-Objekt: <code translate="no">"metadata"</code></p></li><li><p>Unter-Objekt: <code translate="no">'metadata["supplier"]'</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_type</code></p></td>
     <td><p>Der Datentyp, der bei der Interpretation und Indizierung des Wertes verwendet werden soll. Muss mit dem tatsächlichen Datentyp des Schlüssels übereinstimmen.</p><p>Eine Liste der verfügbaren Cast-Typen finden Sie unter <a href="/docs/de/json-indexing.md#Supported-cast-types">Unterstützte Cast-Typen</a><a href="/docs/de/json-indexing.md#Supported-cast-types"> unten</a>.</p></td>
     <td><p><code translate="no">"VARCHAR"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_function</code></p></td>
     <td><p><strong>(Optional)</strong> Konvertiert die ursprünglichen Schlüsselwerte zum Zeitpunkt der Indexierung in einen Zieltyp. Diese Konfiguration ist nur erforderlich, wenn Schlüsselwerte in einem falschen Format gespeichert sind und Sie den Datentyp während der Indizierung konvertieren möchten.</p><p>Eine Liste der verfügbaren Cast-Funktionen finden Sie unter <a href="/docs/de/json-indexing.md#Supported-cast-functions">Unterstützte Cast-Funktionen weiter unten</a>.</p></td>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
   </tr>
</table>
<h3 id="Supported-cast-types" class="common-anchor-header">Unterstützte Cast-Typen<button data-href="#Supported-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus unterstützt die folgenden Datentypen für das Casting zur Indexierungszeit. Diese Typen stellen sicher, dass Ihre Daten für eine effiziente Filterung korrekt interpretiert werden.</p>
<table>
   <tr>
     <th><p>Cast-Typ</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Beispiel JSON-Wert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">BOOL</code> / <code translate="no">bool</code></p></td>
     <td><p>Wird verwendet, um boolesche Werte zu indizieren und Abfragen zu ermöglichen, die nach wahr/falsch-Bedingungen filtern.</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">DOUBLE</code> / <code translate="no">double</code></p></td>
     <td><p>Wird für numerische Werte verwendet, einschließlich ganzer Zahlen und Gleitkommazahlen. Sie ermöglicht die Filterung auf der Grundlage von Bereichen oder Gleichheit (z. B. <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">==</code>).</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code> / <code translate="no">varchar</code></p></td>
     <td><p>Wird für die Indizierung von String-Werten verwendet, was für textbasierte Daten wie Namen, Kategorien oder IDs üblich ist.</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_BOOL</code> / <code translate="no">array_bool</code></p></td>
     <td><p>Wird verwendet, um ein Array mit booleschen Werten zu indizieren.</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_DOUBLE</code> / <code translate="no">array_double</code></p></td>
     <td><p>Wird verwendet, um ein Array mit numerischen Werten zu indizieren.</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_VARCHAR</code> / <code translate="no">array_varchar</code></p></td>
     <td><p>Dient zur Indizierung eines Arrays von Strings, was ideal für eine Liste von Tags oder Schlüsselwörtern ist.</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JSON</code> / <code translate="no">json</code></p></td>
     <td><p>Ganze JSON-Objekte oder Unterobjekte mit automatischer Typinferenz und Flattening.</p><p>Die Indizierung ganzer JSON-Objekte erhöht die Indexgröße. Für Szenarien mit vielen Schlüsseln empfiehlt sich <a href="/docs/de/json-shredding.md">JSON Shredding</a>.</p></td>
     <td><p>Jedes JSON-Objekt</p></td>
   </tr>
</table>
<div class="alert note">
<p>Arrays sollten für eine optimale Indizierung Elemente desselben Typs enthalten. Weitere Informationen finden Sie unter <a href="/docs/de/array_data_type.md">Array-Feld</a>.</p>
</div>
<h3 id="Supported-cast-functions" class="common-anchor-header">Unterstützte Cast-Funktionen<button data-href="#Supported-cast-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Ihr JSON-Feldschlüssel Werte in einem falschen Format enthält (z. B. Zahlen, die als Strings gespeichert sind), können Sie eine Cast-Funktion an das Argument <code translate="no">json_cast_function</code> übergeben, um diese Werte zum Zeitpunkt der Indexierung zu konvertieren.</p>
<p>Bei Cast-Funktionen wird die Groß- und Kleinschreibung nicht berücksichtigt. Die folgenden Funktionen werden unterstützt:</p>
<table>
   <tr>
     <th><p>Cast-Funktion</p></th>
     <th><p>Konvertiert von → nach</p></th>
     <th><p>Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">STRING_TO_DOUBLE</code> / <code translate="no">string_to_double</code></p></td>
     <td><p>String → Numerisch (double)</p></td>
     <td><p>Konvertiert <code translate="no">"99.99"</code> in <code translate="no">99.99</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Wenn die Konvertierung fehlschlägt (z. B. nicht-numerische Zeichenkette), wird der Wert übersprungen und nicht indiziert.</p>
</div>
<h2 id="Create-JSON-indexes" class="common-anchor-header">JSON-Indizes erstellen<button data-href="#Create-JSON-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt wird anhand von praktischen Beispielen gezeigt, wie Indizes für verschiedene Arten von JSON-Daten erstellt werden können. Alle Beispiele verwenden die unten gezeigte Beispiel-JSON-Struktur und gehen davon aus, dass Sie bereits eine Verbindung zu <strong>MilvusClient</strong> mit einem ordnungsgemäß definierten Sammelschema hergestellt haben.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Beispiel-JSON-Struktur<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Grundlegende Einrichtung<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Bevor Sie JSON-Indizes erstellen, bereiten Sie Ihre Indexparameter vor:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-1-Index-a-simple-JSON-key" class="common-anchor-header">Beispiel 1: Index für einen einfachen JSON-Schlüssel<button data-href="#Example-1-Index-a-simple-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie einen Index für das Feld <code translate="no">category</code>, um eine schnelle Filterung nach Produktkategorie zu ermöglichen:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Beispiel 2: Index für einen verschachtelten Schlüssel<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie einen Index für das tief verschachtelte Feld <code translate="no">email</code> für die Suche nach Lieferantenkontakten:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the nested JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Convert-data-type-at-index-time" class="common-anchor-header">Beispiel 3: Datentyp zur Indexzeit konvertieren<button data-href="#Example-3-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Manchmal werden numerische Daten fälschlicherweise als Zeichenketten gespeichert. Verwenden Sie die Funktion <code translate="no">STRING_TO_DOUBLE</code> cast, um sie richtig zu konvertieren und zu indizieren:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Wichtig</strong>: Wenn die Konvertierung für ein Dokument fehlschlägt (z. B. für eine nicht numerische Zeichenkette wie <code translate="no">&quot;invalid&quot;</code>), wird der Wert dieses Dokuments aus dem Index ausgeschlossen und erscheint nicht in den gefilterten Ergebnissen.</p>
<h3 id="Example-4-Index-entire-objects" class="common-anchor-header">Beispiel 4: Ganze Objekte indizieren<button data-href="#Example-4-Index-entire-objects" class="anchor-icon" translate="no">
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
    </button></h3><p>Indizieren Sie das gesamte JSON-Objekt, um Abfragen auf jedes Feld darin zu ermöglichen. Wenn Sie <code translate="no">json_cast_type=&quot;JSON&quot;</code> verwenden, wird das System automatisch:</p>
<ul>
<li><p><strong>Verflacht die JSON-Struktur</strong>: Verschachtelte Objekte werden für eine effiziente Indizierung in flache Pfade umgewandelt.</p></li>
<li><p><strong>Ermittelt Datentypen</strong>: Jeder Wert wird auf der Grundlage seines Inhalts automatisch als numerisch, String, boolesch oder Datum kategorisiert.</p></li>
<li><p><strong>Erzeugt eine umfassende Abdeckung</strong>: Alle Schlüssel und verschachtelten Pfade innerhalb des Objekts werden durchsuchbar</p></li>
</ul>
<p>Für die obige <a href="/docs/de/json-indexing.md#Sample-JSON-structure">JSON-Beispielstruktur</a> indizieren Sie das gesamte Objekt <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the entire JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch nur einen Teil der JSON-Struktur indizieren, z. B. alle <code translate="no">supplier</code> Informationen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index a sub-object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-index-configuration" class="common-anchor-header">Anwenden der Indexkonfiguration<button data-href="#Apply-index-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Sie alle Indexparameter definiert haben, wenden Sie sie auf Ihre Sammlung an:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply all index configurations to the collection</span>
MilvusClient.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Indizierung abgeschlossen ist, werden Ihre JSON-Feldabfragen automatisch diese Indizes verwenden, um die Leistung zu steigern.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Was passiert, wenn der Filterausdruck einer Abfrage einen anderen Typ verwendet als der indizierte Cast-Typ?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Ihr Filterausdruck einen anderen Typ verwendet als der Index <code translate="no">json_cast_type</code>, wird Milvus den Index nicht verwenden und kann auf einen langsameren Brute-Force-Scan zurückgreifen, wenn die Daten dies zulassen. Um die beste Leistung zu erzielen, sollten Sie Ihren Filterausdruck immer an den Cast-Typ des Indexes anpassen. Wenn zum Beispiel ein numerischer Index mit <code translate="no">json_cast_type=&quot;double&quot;</code> erstellt wird, werden nur numerische Filterbedingungen den Index nutzen.</p>
<h3 id="When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Was passiert beim Erstellen eines JSON-Index, wenn ein JSON-Schlüssel inkonsistente Datentypen in verschiedenen Entitäten aufweist?<button data-href="#When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Inkonsistente Typen können zu einer <strong>teilweisen Indizierung</strong> führen. Wenn zum Beispiel ein Feld <code translate="no">metadata[&quot;price&quot;]</code> sowohl als Zahl (<code translate="no">99.99</code>) als auch als Zeichenkette (<code translate="no">&quot;99.99&quot;</code>) gespeichert ist und Sie einen Index mit <code translate="no">json_cast_type=&quot;double&quot;</code> erstellen, werden nur die numerischen Werte indiziert. Die Einträge in String-Form werden übersprungen und erscheinen nicht in den Filterergebnissen.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Kann ich mehrere Indizes für denselben JSON-Schlüssel erstellen?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein, jeder JSON-Schlüssel unterstützt nur einen Index. Sie müssen einen einzigen <code translate="no">json_cast_type</code> wählen, der Ihren Daten entspricht. Sie können jedoch einen Index für das gesamte JSON-Objekt und einen Index für einen verschachtelten Schlüssel innerhalb dieses Objekts erstellen.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Unterstützt ein JSON-Feld die Festlegung eines Standardwerts?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein, JSON-Felder unterstützen keine Standardwerte. Sie können jedoch <code translate="no">nullable=True</code> festlegen, wenn Sie das Feld definieren, um leere Einträge zuzulassen. Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">Nullable &amp; Default</a>.</p>
