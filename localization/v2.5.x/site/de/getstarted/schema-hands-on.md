---
id: schema-hands-on.md
title: Datenmodellentwurf für die Suche
summary: >-
  Information-Retrieval-Systeme, auch bekannt als Suchmaschinen, sind für
  verschiedene KI-Anwendungen wie Retrieval-augmented Generation (RAG), visuelle
  Suche und Produktempfehlungen unerlässlich. Das Herzstück dieser Systeme ist
  ein sorgfältig entworfenes Datenmodell zur Organisation, Indizierung und zum
  Abruf der Informationen.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Datenmodellentwurf für die Suche<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Information-Retrieval-Systeme, auch bekannt als Suchmaschinen, sind für verschiedene KI-Anwendungen wie Retrieval-augmented Generation (RAG), visuelle Suche und Produktempfehlungen unerlässlich. Das Herzstück dieser Systeme ist ein sorgfältig entworfenes Datenmodell zum Organisieren, Indizieren und Abrufen von Informationen.</p>
<p>Milvus ermöglicht es Ihnen, das Suchdatenmodell durch ein Sammlungsschema zu spezifizieren, das unstrukturierte Daten, ihre dichten oder spärlichen Vektordarstellungen und strukturierte Metadaten organisiert. Unabhängig davon, ob Sie mit Text, Bildern oder anderen Datentypen arbeiten, wird Ihnen diese praktische Anleitung helfen, wichtige Schemakonzepte zu verstehen und anzuwenden, um ein Suchdatenmodell in der Praxis zu entwerfen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>Datenmodell Anatomie</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">Datenmodell<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Entwurf eines Datenmodells für ein Suchsystem umfasst die Analyse der Geschäftsanforderungen und die Abstraktion der Informationen in ein schemaexprimiertes Datenmodell. Ein gut definiertes Schema ist wichtig, um das Datenmodell an den Geschäftszielen auszurichten und die Konsistenz der Daten und die Qualität der Dienste sicherzustellen.  Darüber hinaus ist die Auswahl geeigneter Datentypen und Indizes wichtig, um das Geschäftsziel wirtschaftlich zu erreichen.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Analyse des Geschäftsbedarfs</h3><p>Die effektive Erfüllung der geschäftlichen Anforderungen beginnt mit der Analyse der Abfragetypen, die die Benutzer durchführen werden, und der Bestimmung der am besten geeigneten Suchmethoden.</p>
<ul>
<li><p><strong>Benutzerabfragen:</strong> Identifizieren Sie die Arten von Abfragen, die die Benutzer voraussichtlich durchführen werden. So können Sie sicherstellen, dass Ihr Schema reale Anwendungsfälle unterstützt und die Suchleistung optimiert. Dazu können gehören:</p>
<ul>
<li><p>Abrufen von Dokumenten, die einer natürlichsprachlichen Abfrage entsprechen</p></li>
<li><p>Suche nach Bildern, die einem Referenzbild ähnlich sind oder einer Textbeschreibung entsprechen</p></li>
<li><p>Suche nach Produkten anhand von Attributen wie Name, Kategorie oder Marke</p></li>
<li><p>Filtern von Artikeln auf der Grundlage strukturierter Metadaten (z. B. Veröffentlichungsdatum, Tags, Bewertungen)</p></li>
<li><p>Kombinieren mehrerer Kriterien in hybriden Abfragen (z. B. bei der visuellen Suche unter Berücksichtigung der semantischen Ähnlichkeit von Bildern und ihren Beschriftungen)</p></li>
</ul></li>
<li><p><strong>Suchmethoden:</strong> Wählen Sie die geeigneten Suchtechniken, die sich an den Abfragetypen Ihrer Nutzer orientieren. Verschiedene Methoden dienen unterschiedlichen Zwecken und können oft kombiniert werden, um bessere Ergebnisse zu erzielen:</p>
<ul>
<li><p><strong>Semantische Suche</strong>: Verwendet dichte Vektorähnlichkeit, um Elemente mit ähnlicher Bedeutung zu finden, ideal für unstrukturierte Daten wie Text oder Bilder.</p></li>
<li><p><strong>Volltextsuche</strong>: Ergänzt die semantische Suche durch den Abgleich von Schlüsselwörtern.  Die Volltextsuche kann die lexikalische Analyse nutzen, um zu vermeiden, dass lange Wörter in fragmentierte Token zerlegt werden, und erfasst die speziellen Begriffe während des Abrufs.</p></li>
<li><p><strong>Filterung von Metadaten</strong>: Zusätzlich zur Vektorsuche können Beschränkungen wie Datumsbereiche, Kategorien oder Tags angewendet werden.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Übersetzt Geschäftsanforderungen in ein Suchdatenmodell</h3><p>Der nächste Schritt besteht darin, Ihre Geschäftsanforderungen in ein konkretes Datenmodell zu übersetzen, indem Sie die Kernkomponenten Ihrer Informationen und deren Suchmethoden identifizieren:</p>
<ul>
<li><p>Definieren Sie die Daten, die Sie speichern müssen, wie z. B. Rohinhalte (Text, Bilder, Audio), zugehörige Metadaten (Titel, Tags, Urheberschaft) und kontextbezogene Attribute (Zeitstempel, Nutzerverhalten usw.)</p></li>
<li><p>Bestimmen Sie die geeigneten Datentypen und -formate für jedes Element. Zum Beispiel:</p>
<ul>
<li><p>Textbeschreibungen → String</p></li>
<li><p>Bild- oder Dokumenteneinbettungen → dichte oder spärliche Vektoren</p></li>
<li><p>Kategorien, Tags oder Flaggen → String, Array und bool</p></li>
<li><p>Numerische Attribute wie Preis oder Bewertung → Integer oder Float</p></li>
<li><p>Strukturierte Informationen wie z.B. Autorendetails -&gt; json</p></li>
</ul></li>
</ul>
<p>Eine klare Definition dieser Elemente gewährleistet Datenkonsistenz, genaue Suchergebnisse und eine einfache Integration in nachgelagerte Anwendungslogiken.</p>
<h2 id="Schema-Design" class="common-anchor-header">Schema-Entwurf<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus wird das Datenmodell durch ein Sammlungsschema ausgedrückt. Die Gestaltung der richtigen Felder innerhalb eines Sammlungsschemas ist der Schlüssel zur Ermöglichung eines effektiven Abrufs. Jedes Feld definiert einen bestimmten Typ von Daten, die in der Sammlung gespeichert sind, und spielt eine bestimmte Rolle im Suchprozess. Milvus unterstützt zwei Haupttypen von Feldern: <strong>Vektorfelder</strong> und <strong>Skalarfelder</strong>.</p>
<p>Nun können Sie Ihr Datenmodell in ein Feldschema abbilden, das Vektoren und alle skalaren Hilfsfelder enthält. Vergewissern Sie sich, dass jedes Feld mit den Attributen Ihres Datenmodells korreliert, und achten Sie insbesondere auf den Vektortyp (dicht oder spärlich) und seine Dimension.</p>
<h3 id="Vector-Field" class="common-anchor-header">Vektorfeld</h3><p>Vektorfelder speichern Einbettungen für unstrukturierte Datentypen wie Text, Bilder und Audio. Diese Einbettungen können dicht, spärlich oder binär sein, je nach Datentyp und verwendeter Abrufmethode. Typischerweise werden dichte Vektoren für die semantische Suche verwendet, während spärliche Vektoren besser für die Volltextsuche oder den lexikalischen Abgleich geeignet sind. Binäre Vektoren sind nützlich, wenn die Speicher- und Rechenressourcen begrenzt sind. Eine Sammlung kann mehrere Vektorfelder enthalten, um multimodale oder hybride Abfragestrategien zu ermöglichen. Eine ausführliche Anleitung zu diesem Thema finden Sie in der <a href="/docs/de/multi-vector-search.md">Multi-Vector Hybrid Search</a>.</p>
<p>Milvus unterstützt die folgenden Vektordatentypen: <code translate="no">FLOAT_VECTOR</code> für <a href="/docs/de/dense-vector.md">Dense Vector</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> für <a href="/docs/de/sparse_vector.md">Sparse Vector</a> und <code translate="no">BINARY_VECTOR</code> für <a href="/docs/de/binary-vector.md">Binary Vector</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">Skalares Feld</h3><p>Skalare Felder speichern primitive, strukturierte Werte - üblicherweise als Metadaten bezeichnet - wie Zahlen, Zeichenketten oder Daten. Diese Werte können zusammen mit Vektorsuchergebnissen zurückgegeben werden und sind für die Filterung und Sortierung unerlässlich. Sie ermöglichen es Ihnen, die Suchergebnisse auf der Grundlage bestimmter Attribute einzugrenzen, z. B. die Beschränkung von Dokumenten auf eine bestimmte Kategorie oder einen bestimmten Zeitraum.</p>
<p>Milvus unterstützt skalare Typen wie <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code> und <code translate="no">ARRAY</code> zur Speicherung und Filterung von Nicht-Vektordaten. Diese Typen verbessern die Präzision und Anpassung von Suchvorgängen.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Nutzung erweiterter Funktionen beim Schemadesign<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Beim Entwerfen eines Schemas reicht es nicht aus, Ihre Daten einfach nur mit Hilfe der unterstützten Datentypen auf Felder abzubilden. Es ist wichtig, die Beziehungen zwischen den Feldern und die für die Konfiguration verfügbaren Strategien genau zu kennen. Durch die Berücksichtigung der wichtigsten Funktionen in der Entwurfsphase wird sichergestellt, dass das Schema nicht nur die unmittelbaren Anforderungen an die Datenverarbeitung erfüllt, sondern auch skalierbar und für künftige Anforderungen anpassbar ist. Durch die sorgfältige Integration dieser Funktionen können Sie eine starke Datenarchitektur aufbauen, die die Fähigkeiten von Milvus maximiert und Ihre breitere Datenstrategie und Ziele unterstützt. Im Folgenden finden Sie einen Überblick über die wichtigsten Funktionen zur Erstellung eines Sammelschemas:</p>
<h3 id="Primary-Key" class="common-anchor-header">Primärschlüssel</h3><p>Ein Primärschlüsselfeld ist eine grundlegende Komponente eines Schemas, da es jede Entität innerhalb einer Sammlung eindeutig identifiziert. Die Definition eines Primärschlüssels ist obligatorisch. Es muss ein skalares Feld vom Typ Ganzzahl oder String sein und als <code translate="no">is_primary=True</code> gekennzeichnet sein. Optional können Sie <code translate="no">auto_id</code> für den Primärschlüssel aktivieren, dem automatisch ganzzahlige Nummern zugewiesen werden, die monolithisch wachsen, wenn mehr Daten in die Sammlung aufgenommen werden.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/primary-field.md">Primärfeld &amp; AutoID</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">Partitionierung</h3><p>Um die Suche zu beschleunigen, können Sie optional die Partitionierung aktivieren. Indem Sie ein bestimmtes Skalarfeld für die Partitionierung festlegen und bei der Suche Filterkriterien auf der Grundlage dieses Feldes angeben, kann der Suchumfang effektiv auf die relevanten Partitionen beschränkt werden. Diese Methode erhöht die Effizienz der Suchvorgänge erheblich, indem sie den Suchbereich reduziert.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/use-partition-key.md">Partitionsschlüssel verwenden</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">Analysator</h3><p>Ein Analyzer ist ein wichtiges Werkzeug für die Verarbeitung und Umwandlung von Textdaten. Seine Hauptfunktion ist die Umwandlung von Rohtext in Token und deren Strukturierung für die Indizierung und den Abruf. Dies geschieht durch die Tokenisierung der Zeichenfolge, das Entfernen von Stoppwörtern und das Stemming der einzelnen Wörter in Token.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md">Analyzer Overview</a>.</p>
<h3 id="Function" class="common-anchor-header">Funktion</h3><p>Milvus ermöglicht es Ihnen, integrierte Funktionen als Teil des Schemas zu definieren, um bestimmte Felder automatisch abzuleiten. Sie können zum Beispiel eine integrierte BM25-Funktion hinzufügen, die einen Sparse-Vektor aus einem <code translate="no">VARCHAR</code> -Feld erzeugt, um die Volltextsuche zu unterstützen. Diese von Funktionen abgeleiteten Felder rationalisieren die Vorverarbeitung und gewährleisten, dass die Sammlung in sich geschlossen und abfragebereit bleibt.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Ein Beispiel aus der Praxis<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden das Schema-Design und das Code-Beispiel für eine Anwendung zur Suche nach Multimedia-Dokumenten beschrieben, wie im obigen Diagramm dargestellt. Dieses Schema wurde entwickelt, um einen Datensatz zu verwalten, der Artikel mit Daten enthält, die den folgenden Feldern zugeordnet sind:</p>
<table>
   <tr>
     <th><p><strong>Feld</strong></p></th>
     <th><p><strong>Datenquelle</strong></p></th>
     <th><p><strong>Verwendet von Suchmethoden</strong></p></th>
     <th><p><strong>Primärschlüssel</strong></p></th>
     <th><p><strong>Partitionsschlüssel</strong></p></th>
     <th><p><strong>Analyzer</strong></p></th>
     <th><p><strong>Funktion Input/Output</strong></p></th>
   </tr>
   <tr>
     <td><p>artikel_id (<code translate="no">INT64</code>)</p></td>
     <td><p>automatisch generiert mit aktiviert <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/de/get-and-scalar-query.md">Abfrage mit Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>Titel (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>Titel des Artikels</p></td>
     <td><p><a href="/docs/de/keyword-match.md">Textübereinstimmung</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>Zeitstempel (<code translate="no">INT32</code>)</p></td>
     <td><p>Veröffentlichungsdatum</p></td>
     <td><p><a href="/docs/de/use-partition-key.md">Filter nach Partitionsschlüssel</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>Text (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>Rohtext des Artikels</p></td>
     <td><p><a href="/docs/de/multi-vector-search.md">Hybride Suche mit mehreren Vektoren</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Eingabe</p></td>
   </tr>
   <tr>
     <td><p>text_dichter_vektor (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>dichter Vektor, der durch ein Texteinbettungsmodell erzeugt wurde</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">Einfache Vektorsuche</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>automatisch durch eine eingebaute BM25-Funktion erzeugter Sparse-Vektor</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">Volltextsuche</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Ausgabe</p></td>
   </tr>
</table>
<p>Weitere Informationen zu Schemata und eine detaillierte Anleitung zum Hinzufügen verschiedener Feldtypen finden Sie unter <a href="/docs/de/schema.md">Schema erklärt</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">Schema initialisieren</h3><p>Zu Beginn müssen wir ein leeres Schema erstellen. Mit diesem Schritt wird eine grundlegende Struktur für die Definition des Datenmodells geschaffen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Felder hinzufügen</h3><p>Sobald das Schema erstellt ist, müssen im nächsten Schritt die Felder festgelegt werden, aus denen die Daten bestehen sollen. Jedes Feld ist mit den entsprechenden Datentypen und Attributen verbunden.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel werden die folgenden Attribute für Felder angegeben:</p>
<ul>
<li><p>Primärschlüssel: <code translate="no">article_id</code> wird als Primärschlüssel verwendet und ermöglicht die automatische Zuweisung von Primärschlüsseln für eingehende Entitäten.</p></li>
<li><p>Partitionsschlüssel: <code translate="no">timestamp</code> wird als Partitionsschlüssel zugewiesen und ermöglicht die Filterung nach Partitionen. Dies kann sein</p></li>
<li><p>Textanalyzer: Der Textanalyzer wird auf die beiden String-Felder <code translate="no">title</code> und <code translate="no">text</code> angewendet, um eine Textübereinstimmung bzw. eine Volltextsuche zu unterstützen.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Optional) Funktionen hinzufügen</h3><p>Um die Möglichkeiten der Datenabfrage zu verbessern, können Funktionen in das Schema aufgenommen werden. So kann zum Beispiel eine Funktion erstellt werden, die bestimmte Felder verarbeitet.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel wird eine integrierte BM25-Funktion in das Schema eingefügt, die das Feld <code translate="no">text</code> als Eingabe verwendet und die resultierenden spärlichen Vektoren im Feld <code translate="no">text_sparse_vector</code> speichert.</p>
<h2 id="Next-Steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/de/create-collection.md">Sammlung erstellen</a></p></li>
<li><p><a href="/docs/de/alter-collection-field.md">Sammlungsfeld ändern</a></p></li>
</ul>
