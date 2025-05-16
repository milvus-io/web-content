---
id: scalar_index.md
related_key: scalar_index
summary: Skalarer Index in Milvus.
title: Skalarer Index
---
<h1 id="Scalar-Index" class="common-anchor-header">Skalarer Index<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt gefilterte Suchen, die sowohl skalare als auch vektorielle Felder kombinieren. Um die Effizienz der Suche nach skalaren Feldern zu verbessern, hat Milvus ab Version 2.1.0 die Skalarfeldindizierung eingeführt. Dieser Artikel gibt einen Überblick über die Skalarfeld-Indizierung in Milvus und hilft Ihnen, deren Bedeutung und Implementierung zu verstehen.</p>
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
    </button></h2><p>Wenn Sie in Milvus eine Suche nach Vektorähnlichkeit durchführen, können Sie logische Operatoren verwenden, um skalare Felder in booleschen Ausdrücken zu organisieren.</p>
<p>Wenn Milvus eine Suchanfrage mit einem solchen booleschen Ausdruck erhält, parst es den booleschen Ausdruck in einen abstrakten Syntaxbaum (AST), um einen physischen Plan für die Attributfilterung zu erstellen. Milvus wendet dann den physischen Plan in jedem Segment an, um ein <a href="/docs/de/v2.4.x/bitset.md">Bitset</a> als Filterergebnis zu erzeugen, und schließt das Ergebnis als Vektorsuchparameter ein, um den Suchbereich einzugrenzen. In diesem Fall hängt die Geschwindigkeit der Vektorsuche stark von der Geschwindigkeit der Attributfilterung ab.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Attributfilterung in einem Segment</span> </span></p>
<p>Die Skalarfeld-Indizierung ist eine Möglichkeit, die Geschwindigkeit der Attributfilterung zu gewährleisten, indem skalare Feldwerte auf eine bestimmte Weise sortiert werden, um den Informationsabruf zu beschleunigen.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Algorithmen zur Indizierung skalarer Felder<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus zielt darauf ab, mit seinen Skalarfeld-Indizierungsalgorithmen einen geringen Speicherverbrauch, eine hohe Filtereffizienz und eine kurze Ladezeit zu erreichen. Diese Algorithmen werden in zwei Haupttypen eingeteilt: <a href="#auto-indexing">automatische Indizierung</a> und <a href="#inverted-indexing">invertierte Indizierung</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Automatische Indizierung</h3><p>Milvus bietet die Option <code translate="no">AUTOINDEX</code> an, damit Sie nicht manuell einen Index-Typ auswählen müssen. Wenn die Methode <code translate="no">create_index</code> aufgerufen wird und <code translate="no">index_type</code> nicht angegeben ist, wählt Milvus automatisch den am besten geeigneten Indextyp auf der Grundlage des Datentyps aus.</p>
<p>In der folgenden Tabelle sind die von Milvus unterstützten Datentypen und die entsprechenden automatischen Indizierungsalgorithmen aufgeführt.</p>
<table>
<thead>
<tr><th>Datentyp</th><th>Automatischer Indizierungsalgorithmus</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Invertierter Index</td></tr>
<tr><td>INT8</td><td>Invertierter Index</td></tr>
<tr><td>INT16</td><td>Invertierter Index</td></tr>
<tr><td>INT32</td><td>Invertierter Index</td></tr>
<tr><td>INT64</td><td>Invertierter Index</td></tr>
<tr><td>FLOAT</td><td>Invertierter Index</td></tr>
<tr><td>DOUBLE</td><td>Invertierter Index</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Invertierte Indizierung</h3><p>Die invertierte Indizierung bietet eine flexible Möglichkeit, einen Index für ein skalares Feld zu erstellen, indem Indexparameter manuell angegeben werden. Diese Methode eignet sich für verschiedene Szenarien, einschließlich Punktabfragen, Musterabgleichsabfragen, Volltextsuchen, JSON-Suchen, boolesche Suchen und sogar Präfixabgleichsabfragen.</p>
<p>Die in Milvus implementierten invertierten Indizes werden von <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, einer Volltext-Suchmaschinenbibliothek, unterstützt. Tantivy sorgt dafür, dass die invertierte Indexierung in Milvus sowohl effizient als auch schnell ist.</p>
<p>Ein invertierter Index hat zwei Hauptkomponenten: ein Begriffswörterbuch und eine invertierte Liste. Das Begriffswörterbuch enthält alle tokenisierten Wörter in alphabetischer Reihenfolge, während die invertierte Liste die Liste der Dokumente enthält, in denen jedes Wort vorkommt. Mit diesem Aufbau sind Punkt- und Bereichsabfragen viel schneller und effizienter als Brute-Force-Suchen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Diagramm des invertierten Index</span> </span></p>
<p>Die Vorteile der Verwendung eines invertierten Indexes zeigen sich besonders bei den folgenden Operationen:</p>
<ul>
<li><strong>Punktabfrage</strong>: Bei der Suche nach Dokumenten, die das Wort <strong>"Milvus"</strong> enthalten, wird zunächst geprüft, ob <strong>"Milvus"</strong> im Begriffswörterbuch vorhanden ist. Wenn es nicht gefunden wird, enthalten keine Dokumente das Wort. Wird es jedoch gefunden, wird die mit <strong>Milvus</strong> verknüpfte invertierte Liste abgerufen, in der die Dokumente aufgeführt sind, die das Wort enthalten. Diese Methode ist weitaus effizienter als eine rohe Suche durch eine Million Dokumente, da das sortierte Begriffswörterbuch die Zeitkomplexität beim Auffinden des Wortes <strong>Milvus</strong> erheblich reduziert.</li>
<li><strong>Bereichsabfrage</strong>: Die Effizienz von Bereichsabfragen, z. B. das Auffinden von Dokumenten mit Wörtern, die alphabetisch größer als <strong>very</strong> sind, wird ebenfalls durch das sortierte Begriffswörterbuch verbessert. Dieser Ansatz ist effizienter als eine Brute-Force-Suche und liefert schnellere und genauere Ergebnisse.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Testergebnisse</h3><p>Um die Leistungsverbesserungen durch skalare Indizes in Milvus zu demonstrieren, wurde ein Experiment durchgeführt, bei dem die Leistung verschiedener Ausdrücke mit invertierter Indizierung und Brute-Force-Suche auf Rohdaten verglichen wurde.</p>
<p>Das Experiment umfasste das Testen verschiedener Ausdrücke unter zwei Bedingungen: mit einem invertierten Index und mit einer Brute-Force-Suche. Um die Fairness zu gewährleisten, wurde bei allen Tests die gleiche Datenverteilung beibehalten und jedes Mal dieselbe Sammlung verwendet. Vor jedem Test wurde die Sammlung freigegeben, der Index gelöscht und neu aufgebaut. Außerdem wurde vor jedem Test eine Warmabfrage durchgeführt, um die Auswirkungen kalter und heißer Daten zu minimieren, und jede Abfrage wurde mehrfach ausgeführt, um die Genauigkeit zu gewährleisten.</p>
<p>Bei einem Datensatz von <strong>1 Million</strong> Datensätzen kann die Verwendung eines <strong>invertierten Index</strong> eine bis zu <strong>30-fache</strong> Leistungssteigerung bei Punktabfragen bewirken. Bei größeren Datensätzen können die Leistungssteigerungen sogar noch deutlicher ausfallen.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Leistungsempfehlungen<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Fähigkeiten von Milvus bei der Indizierung von Skalarfeldern voll auszunutzen und die Leistung bei der Suche nach Vektorähnlichkeit zu entfesseln, benötigen Sie ein Modell, mit dem Sie die Größe des erforderlichen Speichers auf der Grundlage der vorhandenen Daten schätzen können.</p>
<p>In den folgenden Tabellen sind die Schätzungsfunktionen für alle von Milvus unterstützten Datentypen aufgeführt.</p>
<ul>
<li><p>Numerische Felder</p>
<table>
<thead>
<tr><th>Datentyp</th><th>Speicherschätzungsfunktion (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>AnzahlZeilen * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>AnzahlZeilen * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>AnzahlZeilen * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>AnzahlZeile * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>AnzahlZeilen * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>String-Felder</p>
<table>
<thead>
<tr><th>Länge der Zeichenkette</th><th>Speicherschätzungsfunktion (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Um ein skalares Feld zu indizieren, lesen Sie <a href="/docs/de/v2.4.x/index-scalar-fields.md">Index auf Skalaren erstellen</a>.</p></li>
<li><p>Um mehr über die oben erwähnten verwandten Begriffe und Regeln zu erfahren, lesen Sie</p>
<ul>
<li><a href="/docs/de/v2.4.x/bitset.md">Bitset</a></li>
<li><a href="/docs/de/v2.4.x/multi-vector-search.md">Hybride Suche</a></li>
<li><a href="/docs/de/v2.4.x/boolean.md">Regeln für boolesche Ausdrücke</a></li>
<li><a href="/docs/de/v2.4.x/schema.md#Supported-data-type">Unterstützte Datentypen</a></li>
</ul></li>
</ul>
