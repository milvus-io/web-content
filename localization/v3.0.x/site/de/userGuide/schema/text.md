---
id: text.md
title: TextfeldCompatible with Milvus 3.0.x
summary: >-
  „TEXT“ ist ein skalarer Feldtyp zum Speichern von Dokumenttext, Textpassagen
  und anderen Langtextinhalten in Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Textfeld<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>In KI-Suchanwendungen hilft Ihnen die Vektorsuche dabei, semantisch ähnliche Entitäten zu finden, doch oft benötigt die Anwendung auch den ursprünglichen Quelltext hinter jedem Treffer. Ein LLM oder Agent kann diesen Text als Kontext nutzen, um das Ergebnis zu lesen, zu zitieren, zusammenzufassen oder in eine Eingabeaufforderung einzubinden.</p>
<p>Milvus bietet den Skalarfeldtyp „ <code translate="no">TEXT</code> “ zum direkten Speichern langer Quelltexte zusammen mit Entitäten an. Typische Werte sind Textpassagen, lange Dokumente, Artikeltexte, Tickets und Protokolle. Im Gegensatz zu „ <code translate="no">VARCHAR</code> “, das eine feste „ <code translate="no">max_length</code> “ erfordert, müssen Sie bei „ <code translate="no">TEXT</code> “ keine maximale Byte-Länge im Sammlungsschema festlegen.</p>
<p>Um ein Feld vom Typ „ <code translate="no">TEXT</code> “ zu definieren, setzen Sie „ <code translate="no">datatype</code> “ auf „ <code translate="no">DataType.TEXT</code> “.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem das Feld definiert wurde, kann jede Entität einen Zeichenfolgenwert in diesem Feld enthalten. Sie fügen „ <code translate="no">TEXT</code> “-Werte wie andere skalare Felder ein und geben sie in Abfrage- oder Suchergebnissen zurück, indem Sie das Feld in „ <code translate="no">output_fields</code> “ auflisten.</p>
<div class="alert note">
<p><code translate="no">TEXT</code> Felder unterstützen Nullwerte. Um diese Funktion zu aktivieren, setzen Sie „ <code translate="no">nullable</code> “ auf „ <code translate="no">True</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullfähiges Feld</a>“.</p>
</div>
<h2 id="Limits" class="common-anchor-header">Einschränkungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Ein „ <code translate="no">TEXT</code> “-Feld kann kein Primärfeld sein. Primärfelder unterstützen „ <code translate="no">INT64</code> “ und „ <code translate="no">VARCHAR</code> “.</li>
<li>In Milvus 3.0.0 unterstützen „ <code translate="no">TEXT</code> “-Felder „ <code translate="no">PHRASE_MATCH</code> “ nicht.</li>
<li>In Milvus 3.0.0 unterstützen „ <code translate="no">TEXT</code> “-Felder keine Standardwerte.</li>
<li>In Milvus 3.0.0 werden „ <code translate="no">TEXT</code> “-Felder in externen Sammlungen nicht unterstützt.</li>
<li>In Milvus 3.0.0 unterstützen „ <code translate="no">TEXT</code> “-Felder keine Skalarindizes.</li>
<li><code translate="no">TEXT</code> ist nicht für die reguläre Metadatenfilterung vorgesehen. Wenn Sie nach Metadaten mit kurzen Zeichenfolgen filtern müssen und der Feldwert innerhalb der Längenbeschränkung von „ <code translate="no">VARCHAR</code> “ liegt, verwenden Sie „ <code translate="no">VARCHAR</code> “.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Wählen Sie TEXT oder VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> und „ <code translate="no">VARCHAR</code> “ speichern beide Zeichenfolgenwerte, dienen jedoch unterschiedlichen Anwendungsanforderungen. Verwenden Sie „ <code translate="no">VARCHAR</code> “ für kurze, begrenzte Metadaten, die Entitäten identifizieren, kategorisieren oder filtern. Verwenden Sie „ <code translate="no">TEXT</code> “ für längere Quellinhalte, die einem LLM oder Agenten genügend Kontext bieten, um zu lesen, zu zitieren, zusammenzufassen oder eine Eingabeaufforderung zu erstellen.</p>
<table>
<thead>
<tr><th>Aspekt</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Am besten geeignet für</td><td>Kurze Metadaten, die zur Identifizierung, Kategorisierung oder zum Filtern von Entitäten verwendet werden, wie z. B. <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> oder <code translate="no">external_id</code>.</td><td>Längere Quellinhalte, die von LLM- oder Agenten-Workflows verwendet werden, wie z. B. <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> oder <code translate="no">log_message</code>.</td></tr>
<tr><td>Längeneinstellung</td><td>Erfordert „ <code translate="no">max_length</code> “, das die maximale Anzahl an Bytes definiert, die das Feld speichern kann. Der Maximalwert beträgt „ <code translate="no">65,535</code> “ Bytes. Wenn ein Wert diese Grenze überschreiten könnte, verwenden Sie „ <code translate="no">TEXT</code> “.</td><td>Erfordert kein „ <code translate="no">max_length</code> “, sodass das Schema keine feste Byte-Begrenzung für den Textwert benötigt.</td></tr>
<tr><td>Speicherverhalten</td><td>Jeder Wert wird innerhalb des für das Feld konfigurierten „ <code translate="no">max_length</code> “ gespeichert.</td><td>Verwendet die automatische Speicherauswahl für größere Textwerte. Weitere Informationen finden Sie unter <a href="#how-milvus-stores-large-text-values">„So speichert Milvus große TEXT-Werte</a>“.</td></tr>
<tr><td>Unterstützung als Primärfeld</td><td>Kann als Primärfeld verwendet werden.</td><td>Kann nicht als Primärfeld verwendet werden.</td></tr>
<tr><td>Filterung</td><td>Verwenden Sie dieses Feld für kurze Zeichenfolgen-Metadaten, die in Filterausdrücken erscheinen müssen, wie z. B. „ <code translate="no">category == &quot;news&quot;</code> “ oder „ <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code> “.</td><td>Nicht für die reguläre Metadatenfilterung vorgesehen.</td></tr>
</tbody>
</table>
<p>Weitere Informationen zu „ <code translate="no">VARCHAR</code> “-Feldern finden Sie unter <a href="/docs/de/string.md">„VarChar-Feld</a>“.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">So speichert Milvus große TEXT-Werte<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Erweitern, um die Funktionsweise anzuzeigen</summary></p>
<p>Wenn Sie eine Entität einfügen, ist die Zeichenfolge, die Sie für ein „ <code translate="no">TEXT</code> “-Feld angeben, der Wert für „ <code translate="no">TEXT</code> “. Milvus vergleicht die Größe dieses Werts mit <a href="/docs/de/configure_datanode.md#dataNodetextinlineThreshold">„dataNode.text.inlineThreshold“</a> – standardmäßig „ <code translate="no">65,536</code> “ Bytes – und wählt dann einen von zwei internen Speicherpfaden aus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Speicherung großer Textmengen</span>
  
 </span></p>
<ul>
<li><strong>Inline-Speicherung</strong>: Ist der Wert von „ <code translate="no">TEXT</code> “ kleiner als „ <code translate="no">dataNode.text.inlineThreshold</code> “, speichert Milvus den ursprünglichen Textwert direkt im Feld „data“ unter „ <code translate="no">TEXT</code> “.</li>
<li><strong>LOB-Speicherung</strong>: Ist ein Wert in „ <code translate="no">TEXT</code> “ größer oder gleich „ <code translate="no">dataNode.text.inlineThreshold</code> “, behandelt Milvus den Wert als großes Objekt und speichert den Originaltext separat in einem Objektspeicher wie MinIO. Das Feld „ <code translate="no">TEXT</code> “ speichert einen internen Verweis auf den separat gespeicherten Text. Wenn das Feld „ <code translate="no">TEXT</code> “ in Abfrage- oder Suchergebnissen angefordert wird, nutzt Milvus diesen Verweis, um den Originaltext abzurufen und zurückzugeben.</li>
</ul>
<p>Diese Speicherauswahl erfolgt intern. Sie fügen das Feld „ <code translate="no">TEXT</code> “ ein, fragen es ab und durchsuchen es auf dieselbe Weise, unabhängig davon, welchen Speicherpfad Milvus verwendet. Informationen zur Anpassung des Schwellenwerts oder des damit verbundenen Verhaltens in Bezug auf Speicherung, Komprimierung und Garbage Collection finden Sie unter <a href="/docs/de/configure_datacoord.md">den Konfigurationen</a> <a href="/docs/de/configure_datanode.md">für „dataNode“</a> und <a href="/docs/de/configure_datacoord.md">„dataCoord</a>“.</p>
<p>Wenn Ihre Bereitstellung Objektspeicher verwendet, können große „ <code translate="no">TEXT</code> “-Werte als von Milvus verwaltete Objekte unter Pfaden wie <code translate="no">lobs/...</code> erscheinen. Diese Objekte sind Implementierungsdetails und sollten nicht manuell verschoben, kopiert oder gelöscht werden. Nachdem Sie Entitäten gelöscht, Partitionen entfernt oder Daten komprimiert haben, kann sich die Nutzung des Objektspeichers erst dann verringern, wenn die Milvus-Garbage-Collection nicht mehr referenzierte Daten großer Objekte nach Ablauf des Sicherheitsfensters entfernt hat.</p>
<p></details></p>
<p>Eine häufige Verwendung von „ <code translate="no">TEXT</code> “ ist die Volltextsuche mit BM25. In diesem Muster speichert das Feld „ <code translate="no">TEXT</code> “ den ursprünglichen Quellinhalt, und BM25 analysiert den Text und generiert Sparse-Vektoren für die Rangfolge von Übereinstimmungen auf Basis von Schlüsselwörtern. Suchergebnisse können dann den übereinstimmenden „ <code translate="no">TEXT</code> “-Wert als Kontext für LLM- oder Agenten-Workflows zurückgeben. Das folgende Beispiel zeigt, wie ein „ <code translate="no">TEXT</code> “-Feld als Eingabefeld für BM25 verwendet wird. Informationen zu den Konzepten und Abfrageoptionen der Volltextsuche finden Sie unter <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Schritt 1: Erstellen einer Sammlung mit einem TEXT-Feld<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Im folgenden Beispiel wird eine Sammlung mit einem Feld „ <code translate="no">TEXT</code> “ für Quellinhalte und einem Feld für spärliche Vektoren erstellt, in dem die von BM25 generierten spärlichen Vektoren gespeichert werden. Die BM25-Funktion wandelt den tokenisierten Text aus „ <code translate="no">content</code> “ in spärliche Vektoren um, die in „ <code translate="no">sparse</code> “ gespeichert werden.</p>
<p>Für die BM25-Volltextsuche muss das Eingabefeld „ <code translate="no">TEXT</code> “ auf „ <code translate="no">enable_analyzer=True</code> “ gesetzt sein.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Schritt 2: Erstellen eines Index für spärliche Vektoren<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie einen Index für das von der BM25-Funktion generierte Sparse-Vektor-Feld. Der Metriktyp muss auf „ <code translate="no">BM25</code> “ gesetzt sein.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Schritt 3: TEXT-Daten einfügen<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Fügen Sie Text direkt in das Feld „ <code translate="no">TEXT</code> “ ein. Geben Sie keine Werte für das Feld „ <code translate="no">sparse</code> “ an. Milvus generiert die spärlichen Vektoren intern, indem es die BM25-Funktion auf „ <code translate="no">content</code> “ anwendet.</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Schritt 4: BM25-Volltextsuche durchführen<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie den Rohtext der Abfrage als Suchdaten und führen Sie die Suche im Feld „sparse vector“ durch. Milvus wandelt den Abfragetext in einen spärlichen Vektor um, ordnet die Treffer mit BM25 nach und gibt das angeforderte Feld „ <code translate="no">TEXT</code> “ im Feld „ <code translate="no">output_fields</code> “ zurück.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Schritt 5: Lesen der zurückgegebenen TEXT-Werte<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Jeder Suchtreffer enthält den BM25-Score und den ursprünglichen Wert „ <code translate="no">TEXT</code> “.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu BM25-Funktionen, spärlichen Vektorindizes und der Abfragesyntax für die Volltextsuche finden Sie unter <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p>
