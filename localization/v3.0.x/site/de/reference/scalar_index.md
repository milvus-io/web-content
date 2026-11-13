---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Skalarindizes beschleunigen die Filterung bei Nicht-Vektorfeldern. In dieser
  Referenz wird erläutert, wie Milvus Skalarindizes auswählt, welche Indextypen
  Sie angeben können und welche Datentypen die einzelnen Indizes unterstützen.
title: Skalare Indizes
---
<h1 id="Scalar-Index" class="common-anchor-header">Skalare Indizes<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Skalare Indizes beschleunigen die Filterung bei Nicht-Vektorfeldern wie Kategorien, Preisen, Zeitstempeln und Standorten. Wenn ein Filterausdruck die Suche eingrenzt, ermöglicht ein skalarer Index Milvus, passende Entitäten zu finden, ohne das Feld zu durchsuchen.</p>
<p>Wenn Sie sich nicht sicher sind, welchen Index Sie wählen sollen, verwenden Sie „ <code translate="no">AUTOINDEX</code> “. Legen Sie einen Indextyp nur dann manuell fest, wenn Sie ein bestimmtes Verhalten benötigen.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Auswahl eines skalaren Index<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle listet den Index auf, den Milvus standardmäßig auswählt, wenn Sie „ <code translate="no">AUTOINDEX</code> “ verwenden, sowie die Indextypen, die Sie für jeden Datentyp manuell festlegen können.</p>
<table>
<thead>
<tr><th>Datentyp</th><th>AUTOINDEX-Standard</th><th>Manuelle Indextypen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> mit einem typisierten Skalar oder Array-Cast</td><td><code translate="no">HYBRID</code></td><td>Hängt von <code translate="no">json_cast_type</code> ab; siehe <a href="#JSON-field-indexing">JSON-Feldindizierung</a>.</td></tr>
<tr><td><code translate="no">JSON</code> mit <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> über <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Nicht unterstützt</td><td>Keine</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> ist eine interne Strategie und kein Typ, den Sie direkt angeben können. Siehe <a href="#How-AUTOINDEX-selects">„Wie AUTOINDEX auswählt</a>“.</p>
<p>Es gelten die folgenden Einschränkungen:</p>
<ul>
<li><strong>Primärschlüssel:</strong> „ <code translate="no">BITMAP</code> “ ist für Primärschlüsselfelder nicht verfügbar.</li>
<li><strong>Arrays:</strong> Rekursive Arrays und Arrays mit nullfähigen Elementen unterstützen keine skalare Indizierung, einschließlich „ <code translate="no">AUTOINDEX</code> “. Gewöhnliche Arrays unterstützen boolesche, ganzzahlige, Gleitkomma- und VARCHAR-Elemente.</li>
<li><strong>Struktur-Arrays:</strong> Skalare Unterfelder werden einzeln indiziert. Ihre Unterstützung kann sich von der bei gewöhnlichen Arrays unterscheiden; beispielsweise unterstützt ein boolesches Struktur-Unterfeld kein explizites ` <code translate="no">STL_SORT</code>`.</li>
<li><strong>TEXT:</strong> Vom Benutzer erstellte skalare Indizes, einschließlich „ <code translate="no">AUTOINDEX</code> “, sind nicht verfügbar. Die Textanalyse und die BM25-Suche verwenden separate Mechanismen.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Index-Typen<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Indextyp</th><th>Verwendungszweck</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Allgemeine Gleichheits-, Zugehörigkeits- und Bereichsfilter.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Felder mit wenigen unterschiedlichen Werten; kompakte bitweise Filterung.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Sortierte Wertsuche und Bereichsfilterung.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>String-Gleichheit und Präfixabgleich.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>LIKE und reguläre Ausdrücke für Zeichenfolgen durch Eingrenzung der Kandidaten.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Exakter Abgleich von Präfix-, Suffix- und Infix-Teilzeichenfolgen.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Räumliche Filterung bei GEOMETRY-Feldern.</td></tr>
</tbody>
</table>
<p>Beispiele zur Erstellung, Indexparameter und unterstützte Abfragen finden Sie unter <a href="/docs/de/bitmap.md">BITMAP</a>, <a href="/docs/de/inverted.md">INVERTED</a>, <a href="/docs/de/ngram.md">NGRAM</a>, <a href="/docs/de/stl-sort.md">STL_SORT</a>, <a href="/docs/de/trie.md">TRIE</a>, <a href="/docs/de/fmindex.md">FMINDEX</a> und <a href="/docs/de/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">So wählt AUTOINDEX aus<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei „ <code translate="no">AUTOINDEX</code> “ wählt Milvus einen Index anhand des Feldtyps, der Serverkonfiguration und – bei einigen Feldern – der Anzahl der unterschiedlichen Werte (Kardinalität) aus. Die Standardauswahlen sind unter <a href="#Choosing-a-scalar-index">„Auswahl eines skalaren Index“</a> aufgeführt.</p>
<p>Für die meisten Felder verwendet „ <code translate="no">AUTOINDEX</code> “ eine interne „ <code translate="no">HYBRID</code> “-Strategie, die einen Index anhand der Kardinalität auswählt:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> wenn ein Build weniger als 100 unterschiedliche Werte enthält.</li>
<li><strong><code translate="no">STL_SORT</code></strong> wenn ein Build 100 oder mehr unterschiedliche Werte enthält.</li>
</ul>
<p>Array-Indizes verwenden eine separate Kompatibilitätsrichtlinie: Ihr Zweig für hohe Kardinalität nutzt „ <code translate="no">STL_SORT</code> “, sofern der Cluster dies unterstützt, andernfalls „ <code translate="no">INVERTED</code> “. Siehe <a href="#Version-compatibility">„Versionskompatibilität</a>“.</p>
<p><code translate="no">HYBRID</code> ist nur intern – Sie können sie nicht direkt angeben. Eine interne Auswahl kann auch einen Index verwenden, der als explizite Auswahl für dieses Feld nicht verfügbar ist, wie z. B. die Bitmap-Indizierung für Gleitkommawerte.</p>
<blockquote>
<p>Diese Auswahlen sind Standardwerte. Administratoren können sie über „ <code translate="no">scalarAutoIndex.params.build</code> “ ändern. Die Einstellung „ <code translate="no">scalarAutoIndex.enable</code> “ ist standardmäßig auf „ <code translate="no">false</code> “ gesetzt, was weiterhin eine explizite „ <code translate="no">AUTOINDEX</code> “- und „selection“-Anweisung zulässt, wenn der Indextyp weggelassen wird; die Einstellung auf „ <code translate="no">true</code> “ wendet die automatische Auswahl auch auf ansonsten gültige manuelle Anfragen an.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Indizierung von JSON-Feldern<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Um JSON-Werte zu indizieren, geben Sie „ <code translate="no">json_cast_type</code> “ an, um den Typ der zu indizierenden Werte anzugeben. Dieser Parameter ist sowohl für die automatische als auch für die manuelle Indizierung erforderlich. Verwenden Sie „ <code translate="no">json_path</code> “, um den Pfad anzugeben; wird dieser weggelassen, verwendet Milvus den in der Anfrage angegebenen Feldnamen.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX-Standard</th><th>Manuelle Indizierungstypen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>Der Typumwandler „ <code translate="no">JSON</code> “ wählt eine vollständige JSON-Indizierung anstelle eines typisierten Skalarpfad-Indexes und ändert die Standardeinstellung für „ <code translate="no">AUTOINDEX</code> “ von „ <code translate="no">HYBRID</code> “ in „ <code translate="no">INVERTED</code> “.</p>
<p>Der optionale Typ „ <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> “ konvertiert Zeichenfolgenwerte für einen „ <code translate="no">DOUBLE</code> “-Cast. Er kann nicht mit anderen Cast-Typen verwendet werden. Weder „ <code translate="no">TRIE</code> “ noch „ <code translate="no">FMINDEX</code> “ unterstützen JSON-Felder.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Unterstützte Prädikate<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgenden Tabellen zeigen, bei der Auswertung welcher Prädikate die einzelnen Indizes helfen können. <strong>Die Indexunterstützung garantiert nicht, dass Milvus den Index für jede Abfrage verwendet.</strong> Milvus kann Felddaten scannen, wenn der Index für einen bestimmten Ausdruck oder ein bestimmtes Muster ungeeignet ist.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Vergleiche und Zugehörigkeit<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>Zu den Gleichheits- und Zugehörigkeitsprädikaten gehören „ <code translate="no">==</code> “, „ <code translate="no">!=</code> “, „ <code translate="no">in</code> “ und „ <code translate="no">not in</code> “. Zu den Bereichsvergleichen gehören „ <code translate="no">&lt;</code> “, „ <code translate="no">&lt;=</code> “, „ <code translate="no">&gt;</code> “, „ <code translate="no">&gt;=</code> “ sowie Ausdrücke wie „ <code translate="no">10 &lt;= price &lt; 50</code> “.</p>
<table>
<thead>
<tr><th>Indextyp</th><th>Felddatentypen</th><th>Vom Index unterstützte Prädikate</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Gleichheit und Zugehörigkeit</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Ganzzahlen, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Gleichheit, Zugehörigkeit und Bereiche</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Gleichheit und Zugehörigkeit</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Ganzzahlen, <code translate="no">VARCHAR</code></td><td>Gleichheit, Zugehörigkeit und Bereiche</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Ganzzahlen, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Gleichheit, Zugehörigkeit und Bereiche</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Gleichheit, Zugehörigkeit und Bereiche; bei der Auswertung von Bereichen können mehrere indizierte Zeichenfolgen durchlaufen werden</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Nur Zeichenfolgenmuster; keine direkte Gleichheits-, Zugehörigkeits- oder Bereichssuche</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Nur Zeichenfolgenmuster; keine direkte Gleichheits-, Zugehörigkeits- oder Bereichssuche</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Räumliche Prädikate, siehe unten</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Unterstützte Skalartypen</td><td>Hängt vom ausgewählten Index ab. Interne „ <code translate="no">HYBRID</code> “-Auswahlen nutzen die Funktionen ihres Bitmap-, sortierten oder invertierten Indexes.</td></tr>
</tbody>
</table>
<p>VARCHAR-Bereiche vergleichen Zeichenfolgenwerte, anstatt sie als Zahlen zu interpretieren. Die Tabelle beschreibt ausschließlich Vergleiche mit Literalwerten; dies bedeutet nicht, dass arithmetische Ausdrücke oder Vergleiche zwischen zwei Feldern dieselbe Indexbeschleunigung erhalten.</p>
<h3 id="String-patterns" class="common-anchor-header">Zeichenfolgenmuster<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Diese Tabelle gilt für VARCHAR-Felder. Verwenden Sie für JSON-Zeichenfolgenpfade einen Index und einen „ <code translate="no">VARCHAR</code> “-Cast, die von der JSON-Indizierungstabelle unterstützt werden; es gilt das entsprechende Zeichenfolgenverhalten.</p>
<ul>
<li><strong>Ja:</strong> Der Index liefert exakte Übereinstimmungen.</li>
<li><strong>Indizierte Werte prüfen:</strong> Milvus gleicht das Muster mit den im Index gespeicherten Zeichenfolgen ab, was den Zugriff auf viele verschiedene Zeichenfolgen erfordern kann.</li>
<li><strong>Kandidaten:</strong> Der Index grenzt mögliche Übereinstimmungen ein, anschließend überprüft Milvus die Originalwerte.</li>
<li><strong>Scan:</strong> Der Index bedient das Prädikat nicht; Milvus verwendet einen anderen zulässigen Pfad oder durchsucht das Feld.</li>
</ul>
<table>
<thead>
<tr><th>Indextyp</th><th>Präfix <code translate="no">like &quot;abc%&quot;</code></th><th>Suffix <code translate="no">like &quot;%abc&quot;</code></th><th>Teilzeichenfolge <code translate="no">like &quot;%abc%&quot;</code></th><th>Allgemeines LIKE <code translate="no">like &quot;a%b_c&quot;</code></th><th>Regex <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Ja</td><td>Scannen</td><td>Scan</td><td>Ja</td><td>Scannen</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Ja</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Ja</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td><td>Indizierte Werte prüfen</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Kandidaten</td><td>Kandidaten</td><td>Kandidaten; exakt für ein Literal innerhalb des konfigurierten Gram-Längenbereichs</td><td>Kandidaten</td><td>Kandidaten</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Ja</td><td>Ja</td><td>Ja</td><td>Kandidaten</td><td>Kandidaten</td></tr>
</tbody>
</table>
<p>Diese Einträge beschreiben den Operator nach der Abfrageplanung. Milvus kann ein literales LIKE-Muster auf Gleichheit vereinfachen und einen einfachen, verankerten regulären Ausdruck auf Gleichheit, Präfix- oder Suffixübereinstimmung; beispielsweise wird „ <code translate="no">name =~ &quot;^abc$&quot;</code> “ zu einem Gleichheitstest und folgt der Gleichheitstabelle.</p>
<p><code translate="no">INVERTED</code> behandelt einfache Suffix- und Teilzeichenfolgenformen als Scans, auch wenn komplexere LIKE-Muster den Index nutzen können. „ <code translate="no">NGRAM</code> “ erfordert einen literalen Text mit einer Länge von mindestens „ <code translate="no">min_gram</code> “ Zeichen; bei allgemeinen LIKE-Musteranfragen muss jedes nicht leere Literalfragment diese Mindestlänge erfüllen, und die Beschleunigung durch reguläre Ausdrücke hängt von der Extraktion geeigneter Literale ab. Andernfalls führt Milvus einen Scan der Daten durch. „ <code translate="no">FMINDEX</code> “ kann ebenfalls einen Scan wählen, wenn ein Muster nur wenig nützliche Filterung bietet oder die Auflösung über den Index zu aufwendig ist.</p>
<p>Dies sind Prädikate für Zeichenfolgenwerte. Tokenbasierte Funktionen wie „ <code translate="no">TEXT_MATCH</code> “ und „ <code translate="no">PHRASE_MATCH</code> “ nutzen eine über Feldeigenschaften konfigurierte Textabgleich-Indizierung; die Auswahl eines skalaren „ <code translate="no">INVERTED</code> “-Indexes aktiviert diese Funktionen nicht.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Array-, JSON- und räumliche Prädikate<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Indextyp</th><th>Datentyp oder Typumwandlung</th><th>Prädikate, die den Index verwenden können</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, „ <code translate="no">BITMAP</code> “, „ <code translate="no">STL_SORT</code> “ oder eine zulässige Auswahl aus „ <code translate="no">AUTOINDEX</code> “</td><td>Gewöhnliche Arrays mit unterstützten Elementtypen</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Passt auf Elemente unabhängig von ihrer Position. Index- und Typbeschränkungen gelten weiterhin.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Gewöhnliche Arrays mit booleschen, ganzzahligen oder VARCHAR-Werten</td><td><code translate="no">==</code> s des gesamten Arrays und <code translate="no">!=</code></td><td>Es können Indexkandidaten verwendet werden, gefolgt von Überprüfungen der ursprünglichen Arrays. Bei Gleitkomma-Arrays wird auf das Scannen zurückgegriffen; Bitmap-Indizes unterstützen diesen Kandidatenpfad nicht.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> oder eine zulässige Auswahl aus <code translate="no">AUTOINDEX</code> </td><td>JSON-Pfade, die in „ <code translate="no">BOOL</code> “, „ <code translate="no">DOUBLE</code> “ oder <code translate="no">VARCHAR</code></td><td>Vergleiche und Zugehörigkeitsprüfungen entsprechend dem Umwandlungstyp</td><td>Der indizierte Pfad und die Umwandlung müssen mit der Abfrage übereinstimmen. Zeichenfolgenmuster richten sich nach der vorstehenden Tabelle.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>JSON-Pfade, die in <code translate="no">VARCHAR</code></td><td>LIKE- und Regex-Muster</td><td>Es gelten dieselben Regeln zur Musterzulässigkeit wie bei VARCHAR-NGRAM-Indizes.</td></tr>
<tr><td><code translate="no">INVERTED</code>, „ <code translate="no">STL_SORT</code> “ oder eine zulässige Auswahl aus „ <code translate="no">AUTOINDEX</code> “</td><td>JSON-Pfade, die in „ <code translate="no">ARRAY_BOOL</code> “, „ <code translate="no">ARRAY_DOUBLE</code> “ oder <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, „ <code translate="no">JSON_CONTAINS_ANY</code> “, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Erfordert kompatible Elementtypen. Operanden mit gemischten Typen oder verschachtelten Arrays können auf das Scannen zurückgreifen.</td></tr>
<tr><td><code translate="no">INVERTED</code> mit Typumwandlung <code translate="no">JSON</code></td><td>Vollständiger JSON-Index</td><td>Vergleiche und Zugehörigkeitsprüfungen auf unterstützten Skalarpfaden; unterstützte Zeichenfolgenmuster; JSON-Einschluss auf unterstützten Array-Pfaden</td><td>Zeichenfolgenpfade folgen dem INVERTED-Verhalten. Die Array-Inklusion erfordert kompatible Elementtypen.</td></tr>
<tr><td>JSON-Pfadindizes und vollständige JSON-Indizes</td><td>Indizierte JSON-Pfade</td><td><code translate="no">exists</code></td><td>Prüft, ob der Pfad existiert, was sich von der Prüfung seines Werts oder der Prüfung, ob das gesamte Feld null ist, unterscheidet.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Verwendet Begrenzungsrahmen, um Kandidaten zu finden, und prüft anschließend die genaue räumliche Beziehung. <code translate="no">ST_ISVALID</code> verwendet kein RTREE.</td></tr>
</tbody>
</table>
<p>Die Unterstützung der Array-Inklusion impliziert keine Indexsuche nach einem Element an einer bestimmten Position, wie beispielsweise bei <code translate="no">values[0]</code>, oder nach der Array-Länge. Bei der Gleichheit des gesamten Arrays müssen auch Reihenfolge und Länge überprüft werden, was durch die bloße Elementzugehörigkeit allein nicht festgestellt werden kann.</p>
<p><code translate="no">IS NULL</code> und „ <code translate="no">IS NOT NULL</code> “ nutzen Gültigkeitsinformationen und erfordern keinen bestimmten skalaren Indextyp. Sie können Prädikate mit „ <code translate="no">and</code> “, „ <code translate="no">or</code> “ und „ <code translate="no">not</code> “ kombinieren; jeder Teil kann seinen eigenen zulässigen Ausführungspfad nutzen.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Versionskompatibilität<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Die meisten skalaren Indizes – „ <code translate="no">BITMAP</code> “, „ <code translate="no">INVERTED</code> “, „ <code translate="no">STL_SORT</code> “, „ <code translate="no">TRIE</code> “ und „ <code translate="no">NGRAM</code> “ auf gewöhnlichen skalaren Feldern – haben keine Versionsanforderungen. Die folgenden Anforderungen gelten nur für die neueren Kombinationen: Indizes auf Array-Feldern, JSON-Path-Indizes und „ <code translate="no">FMINDEX</code> “.</p>
<p>Diese Anforderungen basieren auf den Versionsnummern der Skalar-Index-Engine, einem internen Funktionszähler, der sich von den Milvus-Software-Versionsnummern unterscheidet.</p>
<table>
<thead>
<tr><th>Funktion</th><th>Anforderung</th></tr>
</thead>
<tbody>
<tr><td>Explizit <code translate="no">FMINDEX</code></td><td>Version 5 oder höher der Skalar-Index-Engine</td></tr>
<tr><td>Explizite „ <code translate="no">STL_SORT</code> “ für gewöhnliche Arrays</td><td>Scalar-Index-Engine Version 3 oder neuer, mit aktivierter Array-Sortierunterstützung</td></tr>
<tr><td><code translate="no">HYBRID</code> Auswahl von „ <code translate="no">STL_SORT</code> “ für gewöhnliche Arrays</td><td>Scalar-Index-Engine Version 5 oder neuer, mit aktivierter Unterstützung für Array-Sortierung</td></tr>
<tr><td><code translate="no">BITMAP</code>, „ <code translate="no">STL_SORT</code> “ oder „ <code translate="no">HYBRID</code> “ für JSON-Skalarpfade</td><td>Scalar-Index-Engine Version 4 oder neuer</td></tr>
<tr><td><code translate="no">STL_SORT</code> oder „ <code translate="no">HYBRID</code> “ bei typisierten JSON-Array-Pfaden</td><td>Scalar-Index-Engine Version 3 oder neuer, mit aktivierter Unterstützung für Array-Sortierung</td></tr>
</tbody>
</table>
<p>Wenn eine Anforderung an die Array- oder JSON-Kompatibilität nicht erfüllt ist, können betroffene automatische Abfragen auf „ <code translate="no">INVERTED</code> “ zurückgreifen, und explizite Abfragen für nicht unterstützte Kombinationen schlagen fehl. Bei „ <code translate="no">HYBRID</code> “ für gewöhnliche Arrays verwendet der Zweig mit hoher Kardinalität weiterhin „ <code translate="no">INVERTED</code> “, bis eine sortierte Indizierung verfügbar ist.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Überlegungen zur Leistung<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Indexleistung hängt von der Datenverteilung und den von Ihrer Anwendung verwendeten Filtern ab. Kardinalität, Zeichenfolgenlänge, Array-Länge und die Anzahl der übereinstimmenden Entitäten können sich alle auf den Speicherverbrauch und die Abfragelatenz auswirken. Vergleichen Sie Indizes anhand repräsentativer Daten und Filterausdrücke und messen Sie dabei gemeinsam den Speicherverbrauch, die Erstellungszeit und die Abfragelatenz.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Schätzung des Speicherbedarfs<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Formeln geben einen groben Überblick über den Speicherbedarf eines skalaren Indexes nach dem Laden bei deaktivierter Speicherzuordnung. Die Formeln unter <code translate="no">STL_SORT</code> gehen von gewöhnlichen skalaren Feldern ohne Nullwerte aus.</p>
<ul>
<li><code translate="no">N</code>: Anzahl der Entitäten.</li>
<li><code translate="no">D</code>: Anzahl der unterschiedlichen Werte.</li>
<li><code translate="no">l</code>: durchschnittliche Länge der eindeutigen Zeichenfolgen in <strong>Byte</strong>.</li>
<li><code translate="no">S</code>: Größe des erstellten Index vor der Speicherkomprimierung in <strong>Byte</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Indextyp</th><th>Grobe Schätzung des Speicherbedarfs in Byte</th><th>Intuition</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> auf <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code> oder <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Etwa 12 Byte pro Entität.</td></tr>
<tr><td><code translate="no">STL_SORT</code> auf <code translate="no">INT64</code>, <code translate="no">DOUBLE</code> oder <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Etwa 20 Byte pro Entität bei größeren Werten.</td></tr>
<tr><td><code translate="no">STL_SORT</code> auf <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>Wiederholte Zeichenfolgen teilen sich den Speicherplatz, sodass weniger unterschiedliche Zeichenfolgen in der Regel weniger Speicherplatz beanspruchen.</td></tr>
<tr><td><code translate="no">BITMAP</code>, unter Verwendung dichter Bitmaps</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Jeder eindeutige Wert benötigt etwa ein Bit pro Entität sowie eine Bitmap zur Verfolgung gültiger Entitäten.</td></tr>
<tr><td><code translate="no">INVERTED</code> oder <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Beginnen Sie mit etwa der Größe des erstellten Index.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Planen Sie etwa das Doppelte der Größe des erstellten Index ein.</td></tr>
</tbody>
</table>
<p>Teilen Sie das Ergebnis durch <code translate="no">1024 * 1024</code>, um Bytes in <strong>MiB</strong> umzurechnen. Beispielsweise benötigt ein „ <code translate="no">STL_SORT</code> “-Index mit einer Million nicht-null-Werten vom Typ „ <code translate="no">INT64</code> “ etwa <strong>19 MiB</strong> für seine Hauptdatenstrukturen. Bei VARCHAR-Feldern, bei denen jede Zeichenkette eindeutig ist, vereinfacht sich die Schätzung auf <code translate="no">(l + 24) * N</code>; eine Million eindeutige Zeichenketten mit durchschnittlich 32 Bytes ergeben etwa <strong>53 MiB</strong>.</p>
<p>Die BITMAP-Formel beschreibt die Speicherung dichter Bitmaps; die Aktivierung des optionalen Offset-Caches fügt auf einem 64-Bit-System etwa <code translate="no">8 * N</code> Byte hinzu. Für <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> und <code translate="no">FMINDEX</code> erstellen Sie einen Index auf repräsentativen Daten, um <code translate="no">S</code> zu erhalten – die Rohdatengröße ist kein Ersatz für die Größe des erstellten Indexes. Für <code translate="no">AUTOINDEX</code> verwenden Sie die Formel für den tatsächlich ausgewählten Index, wenden Sie die Schätzwerte pro Segment an und addieren Sie diese dann über alle geladenen Segmente und Replikate hinweg.</p>
<p>Dies sind ungefähre Planungswerte, keine Speichergrenzen. Sie berücksichtigen nicht den temporären Speicher, der während der Erstellung, des Ladens und bei Abfragen verwendet wird, und reagieren bei String- und Bitmap-Indizes empfindlicher auf eindeutige Werte und die Datenverteilung als bei numerischen Indizes ( <code translate="no">STL_SORT</code>). Es wird kein fester Prozentsatz für die Genauigkeit garantiert. Speicherzuordnung, ältere Indexformate, Arrays und JSON-Felder erfordern separate Messungen. Überprüfen Sie vor der Dimensionierung einer Bereitstellung die tatsächliche Speicherauslastung mit repräsentativen Daten und Abfragen und planen Sie Spielraum für Spitzenauslastung ein.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Beispiele für die Erstellung und Konfiguration von Indizes finden Sie unter <a href="/docs/de/bitmap.md">BITMAP</a>, <a href="/docs/de/inverted.md">INVERTED</a>, <a href="/docs/de/ngram.md">NGRAM</a>, <a href="/docs/de/stl-sort.md">STL_SORT</a>, <a href="/docs/de/trie.md">TRIE</a>, <a href="/docs/de/fmindex.md">FMINDEX</a> und <a href="/docs/de/rtree.md">RTREE</a>.</li>
<li>Informationen zu Felddefinitionen und Sammlungsschemata finden Sie unter <a href="/docs/de/schema.md">„Schema Explained</a>“.</li>
</ul>
