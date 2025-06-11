---
id: inverted.md
title: INVERTED
summary: >-
  Der INVERTED-Index in Milvus wurde entwickelt, um Filterabfragen sowohl für
  skalare Felder als auch für strukturierte JSON-Felder zu beschleunigen. Durch
  die Zuordnung von Begriffen zu den Dokumenten oder Datensätzen, die sie
  enthalten, verbessern invertierte Indizes die Abfrageleistung im Vergleich zu
  Brute-Force-Suchen erheblich.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Index <code translate="no">INVERTED</code> in Milvus wurde entwickelt, um Filterabfragen sowohl für skalare Felder als auch für strukturierte JSON-Felder zu beschleunigen. Durch die Zuordnung von Begriffen zu den Dokumenten oder Datensätzen, die sie enthalten, verbessern invertierte Indizes die Abfrageleistung im Vergleich zu Brute-Force-Suchen erheblich.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Auf der Grundlage von <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> implementiert Milvus die invertierte Indizierung zur Beschleunigung von Filterabfragen, insbesondere für Textdaten. Und so funktioniert es:</p>
<ol>
<li><p><strong>Tokenisierung der Daten</strong>: Milvus nimmt Ihre Rohdaten - in diesem Beispiel zwei Sätze:</p>
<ul>
<li><p><strong>"Milvus ist eine Cloud-native Vektordatenbank."</strong></p></li>
<li><p><strong>"Milvus hat eine sehr gute Leistung."</strong></p></li>
</ul>
<p>und zerlegt sie in eindeutige Wörter (z. B. <em>Milvus</em>, <em>ist</em>, <em>Cloud-nativ</em>, <em>Vektor</em>, <em>Datenbank</em>, <em>sehr</em>, <em>gut</em>, <em>bei</em>, <em>Leistung</em>).</p></li>
<li><p><strong>Erstellen Sie das Begriffswörterbuch</strong>: Diese eindeutigen Wörter werden in einer sortierten Liste, dem <strong>Term Dictionary</strong>, gespeichert. Mit diesem Wörterbuch kann Milvus schnell überprüfen, ob ein Wort existiert und seine Position im Index finden.</p></li>
<li><p><strong>Erstellen Sie die invertierte Liste</strong>: Für jedes Wort im Begriffslexikon führt Milvus eine <strong>invertierte Liste</strong>, die anzeigt, welche Dokumente dieses Wort enthalten. Zum Beispiel kommt <strong>"Milvus"</strong> in beiden Sätzen vor, so dass die invertierte Liste auf beide Dokument-IDs verweist.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Invertiert</span> </span></p>
<p>Da das Wörterbuch sortiert ist, kann die begriffsbasierte Filterung effizient durchgeführt werden. Anstatt alle Dokumente zu durchsuchen, sucht Milvus einfach nach dem Begriff im Wörterbuch und ruft seine invertierte Liste ab - was die Suche und das Filtern in großen Datensätzen erheblich beschleunigt.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Indexierung eines regulären skalaren Feldes<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Für Skalarfelder wie <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong> und <strong>ARRAY</strong> ist das Erstellen eines invertierten Index ganz einfach. Verwenden Sie die Methode <code translate="no">create_index()</code>, wobei der Parameter <code translate="no">index_type</code> auf <code translate="no">&quot;INVERTED&quot;</code> gesetzt wird.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Indizieren eines JSON-Feldes<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus erweitert seine Indizierungsfähigkeiten auf JSON-Felder, so dass Sie effizient nach verschachtelten oder strukturierten Daten filtern können, die in einer einzelnen Spalte gespeichert sind. Im Gegensatz zu skalaren Feldern müssen Sie beim Indizieren eines JSON-Feldes zwei zusätzliche Parameter angeben:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Gibt den zu indizierenden verschachtelten Schlüssel an.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Definiert den Datentyp (z. B. <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code> oder <code translate="no">&quot;bool&quot;</code>), in den der extrahierte JSON-Wert umgewandelt werden soll.</p></li>
</ul>
<p>Nehmen wir zum Beispiel ein JSON-Feld mit dem Namen <code translate="no">metadata</code> mit der folgenden Struktur:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Um invertierte Indizes für bestimmte JSON-Pfade zu erstellen, können Sie den folgenden Ansatz verwenden:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Beispiel Wert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Name des JSON-Feldes in Ihrem Schema.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Zu erstellender Indextyp; derzeit wird nur <code translate="no">INVERTED</code> für die JSON-Pfadindizierung unterstützt.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Optional) Ein benutzerdefinierter Indexname. Geben Sie verschiedene Namen an, wenn Sie mehrere Indizes für dasselbe JSON-Feld erstellen.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Gibt an, welcher JSON-Pfad indiziert werden soll. Sie können auf verschachtelte Schlüssel, Array-Positionen oder beides abzielen (z.B. <code translate="no">metadata["product_info"]["category"]</code> oder <code translate="no">metadata["tags"][0]</code>). Wenn der Pfad fehlt oder das Array-Element für eine bestimmte Zeile nicht existiert, wird diese Zeile während der Indizierung einfach übersprungen und es wird kein Fehler ausgelöst.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Datentyp, in den Milvus die extrahierten JSON-Werte umwandelt, wenn der Index erstellt wird. Gültige Werte:</p>
<ul>
<li><p><code translate="no">"bool"</code> oder <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> oder <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> oder <code translate="no">"VARCHAR"</code></p>
<p><strong>Hinweis</strong>: Bei ganzzahligen Werten verwendet Milvus intern double für den Index. Große Ganzzahlen über 2^53 verlieren an Präzision. Wenn der Cast fehlschlägt (aufgrund einer Typübereinstimmung), wird kein Fehler ausgelöst, und der Wert dieser Zeile wird nicht indiziert.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Überlegungen zur JSON-Indizierung<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Logik der Filterung</strong>:</p>
<ul>
<li><p>Wenn Sie <strong>einen Index vom Typ double (</strong><code translate="no">json_cast_type=&quot;double&quot;</code><strong>) erstellen</strong>, können nur Filterbedingungen vom Typ numerisch den Index verwenden. Wenn der Filter einen doppelten Index mit einer nicht-numerischen Bedingung vergleicht, greift Milvus auf die Brute-Force-Suche zurück.</p></li>
<li><p>Wenn Sie <strong>einen Index vom Typ varchar erstellen</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), können nur Filterbedingungen vom Typ string den Index verwenden. Andernfalls greift Milvus auf die Brute-Force-Suche zurück.</p></li>
<li><p>Die<strong>boolesche</strong> Indizierung verhält sich ähnlich wie der varchar-Typ.</p></li>
</ul></li>
<li><p><strong>Term-Ausdrücke</strong>:</p>
<ul>
<li>Sie können <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code> verwenden. Der Index funktioniert jedoch nur für skalare Werte, die unter diesem Pfad gespeichert sind. Wenn <code translate="no">json[&quot;field&quot;]</code> ein Array ist, fällt die Abfrage auf Brute-Force zurück (Array-artige Indizierung wird noch nicht unterstützt).</li>
</ul></li>
<li><p><strong>Numerische Genauigkeit</strong>:</p>
<ul>
<li>Intern indiziert Milvus alle numerischen Felder als Doubles. Wenn ein numerischer Wert <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span> überschreitet, verliert er an Präzision, und Abfragen auf diese Werte außerhalb des Bereichs stimmen möglicherweise nicht genau überein.</li>
</ul></li>
<li><p><strong>Datenintegrität</strong>:</p>
<ul>
<li>Milvus parst oder transformiert JSON-Schlüssel nicht über das von Ihnen angegebene Casting hinaus. Wenn die Quelldaten inkonsistent sind (z. B. speichern einige Zeilen einen String für den Schlüssel <code translate="no">&quot;k&quot;</code>, während andere eine Zahl speichern), werden einige Zeilen nicht indiziert.</li>
</ul></li>
</ul>
