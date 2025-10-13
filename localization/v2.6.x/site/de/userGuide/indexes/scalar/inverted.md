---
id: inverted.md
title: INVERTED
summary: >-
  Wenn Sie häufig Filterabfragen auf Ihren Daten durchführen müssen, können
  INVERTED-Indizes die Abfrageleistung drastisch verbessern. Anstatt alle
  Dokumente zu durchsuchen, verwendet Milvus invertierte Indizes, um schnell die
  genauen Datensätze zu finden, die Ihren Filterbedingungen entsprechen.
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
    </button></h1><p>Wenn Sie häufig Filterabfragen auf Ihren Daten durchführen müssen, können <code translate="no">INVERTED</code> Indizes die Abfrageleistung drastisch verbessern. Anstatt alle Dokumente zu durchsuchen, verwendet Milvus invertierte Indizes, um schnell die genauen Datensätze zu finden, die Ihren Filterbedingungen entsprechen.</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">Wann sollte man INVERTED-Indizes verwenden?<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie INVERTED-Indizes, wenn Sie Folgendes benötigen:</p>
<ul>
<li><p><strong>Nach bestimmten Werten filtern</strong>: Alle Datensätze finden, bei denen ein Feld einem bestimmten Wert entspricht (z. B. <code translate="no">category == &quot;electronics&quot;</code>)</p></li>
<li><p><strong>Textinhalte filtern</strong>: Effiziente Suchen in <code translate="no">VARCHAR</code> Feldern durchführen</p></li>
<li><p><strong>Abfrage von JSON-Feldwerten</strong>: Filtern nach bestimmten Schlüsseln innerhalb von JSON-Strukturen</p></li>
</ul>
<p><strong>Leistungsvorteil</strong>: INVERTED-Indizes können die Abfragezeit bei großen Datensätzen von Sekunden auf Millisekunden reduzieren, da keine vollständigen Auflistungsscans mehr erforderlich sind.</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">Wie INVERTED-Indizes funktionieren<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein <strong>INVERTED-Index</strong> in Milvus ordnet jeden eindeutigen Feldwert (Term) dem Satz von Dokument-IDs zu, in denen dieser Wert vorkommt. Diese Struktur ermöglicht eine schnelle Suche nach Feldern mit sich wiederholenden oder kategorischen Werten.</p>
<p>Wie im Diagramm dargestellt, läuft der Prozess in zwei Schritten ab:</p>
<ol>
<li><p><strong>Vorwärtszuordnung (ID → Begriff):</strong> Jede Dokument-ID verweist auf den in ihr enthaltenen Feldwert.</p></li>
<li><p><strong>Umgekehrtes Mapping (Term → IDs):</strong> Milvus sammelt eindeutige Begriffe und erstellt ein umgekehrtes Mapping von jedem Begriff zu allen IDs, die ihn enthalten.</p></li>
</ol>
<p>Zum Beispiel wird der Wert <strong>"Elektronik"</strong> den IDs <strong>1</strong> und <strong>3</strong> zugeordnet, während <strong>"Bücher"</strong> den IDs <strong>2</strong> und <strong>5</strong> zugeordnet wird.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-inverted-index-works.png" alt="How Inverted Index Works" class="doc-image" id="how-inverted-index-works" />
   </span> <span class="img-wrapper"> <span>So funktioniert der umgekehrte Index</span> </span></p>
<p>Wenn Sie nach einem bestimmten Wert filtern (z. B. <code translate="no">category == &quot;electronics&quot;</code>), sucht Milvus einfach nach dem Begriff im Index und ruft die passenden IDs direkt ab. Dadurch wird das Scannen des gesamten Datensatzes vermieden und eine schnelle Filterung ermöglicht, insbesondere bei kategorischen oder wiederholten Werten.</p>
<p>INVERTED-Indizes unterstützen alle skalaren Feldtypen, wie <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>JSON</strong> und <strong>ARRAY</strong>. Die Indexparameter für die Indizierung eines JSON-Feldes unterscheiden sich jedoch geringfügig von den regulären skalaren Feldern.</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">Erstellen von Indizes für Nicht-JSON-Felder<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Um einen Index für ein Nicht-JSON-Feld zu erstellen, folgen Sie diesen Schritten:</p>
<ol>
<li><p>Bereiten Sie Ihre Indexparameter vor:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Fügen Sie den Index <code translate="no">INVERTED</code> hinzu:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Erstellen Sie den Index:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">Erstellen von Indizes auf JSON-Feldern<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können auch INVERTED-Indizes auf bestimmten Pfaden innerhalb von JSON-Feldern erstellen. Dies erfordert zusätzliche Parameter, um den JSON-Pfad und den Datentyp anzugeben:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Ausführliche Informationen über die Indizierung von JSON-Feldern, einschließlich unterstützter Pfade, Datentypen und Einschränkungen, finden Sie unter <a href="/docs/de/use-json-fields.md">JSON-Feld</a>.</p>
<h2 id="Best-practices" class="common-anchor-header">Bewährte Verfahren<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Erstellen Sie Indizes nach dem Laden von Daten</strong>: Erstellen Sie Indizes auf Sammlungen, die bereits Daten enthalten, um die Leistung zu verbessern.</p></li>
<li><p><strong>Verwenden Sie beschreibende Indexnamen</strong>: Wählen Sie Namen, die das Feld und den Zweck klar angeben.</p></li>
<li><p><strong>Überwachen Sie die Indexleistung</strong>: Überprüfen Sie die Abfrageleistung vor und nach der Erstellung von Indizes</p></li>
<li><p><strong>Berücksichtigen Sie Ihre Abfragemuster</strong>: Erstellen Sie Indizes für Felder, nach denen Sie häufig filtern</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Erfahren Sie mehr über <a href="/docs/de/index-explained.md">andere Indextypen</a></p></li>
<li><p>Siehe <a href="/docs/de/use-json-fields.md#Index-values-inside-the-JSON-field">JSON-Feldindizierung</a> für erweiterte JSON-Indizierungsszenarien</p></li>
</ul>
