---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Vergleichen Sie skalare Indextypen, prüfen Sie die Feldkompatibilität und
  machen Sie sich mit der automatischen Indexauswahl vertraut.
title: Skalarindex
---
<h1 id="Scalar-Index" class="common-anchor-header">Skalarindex<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Skalare Indizes können <a href="/docs/de/boolean.md">die Filterung</a> in Nicht-Vektorfeldern beschleunigen. Nutzen Sie diese Übersicht, um einen Index auszuwählen, die Feldkompatibilität zu prüfen und die automatische Auswahl zu verstehen.</p>
<p>Erwägen Sie die Indizierung von Feldern, die in häufig verwendeten oder langsamen Filtern zum Einsatz kommen. Wählen Sie für jedes Feld, das Sie in die Anforderung zur Indexerstellung aufnehmen, eine der beiden folgenden Optionen:</p>
<ul>
<li><strong>Index-Typ angeben:</strong> Wählen Sie einen Typ, der mit dem Datentyp des Feldes und Ihren Filtern kompatibel ist.</li>
<li><strong>„ <code translate="no">AUTOINDEX</code> “ verwenden:</strong> Setzen Sie „ <code translate="no">index_type</code> “ auf „ <code translate="no">AUTOINDEX</code> “, damit Milvus einen Typ auswählt. Siehe <a href="#AUTOINDEX-behavior">Verhalten von „AUTOINDEX</a>“.</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Öffnen Sie eine Indexanleitung, um die unterstützten Filter, Parameter und Erstellungsschritte anzuzeigen:</p>
<table>
<thead>
<tr><th>Indextyp</th><th>Verwendung für</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/de/inverted.md">INVERTED</a></td><td>Gleichheits-, Zugehörigkeits- und Bereichsfilter.</td></tr>
<tr><td><a href="/docs/de/bitmap.md">BITMAP</a></td><td>Felder mit wenigen unterschiedlichen Werten, wie z. B. Statuscodes.</td></tr>
<tr><td><a href="/docs/de/stl-sort.md">STL_SORT</a></td><td>Wert-Nachschlagevorgänge und Bereichsfilter.</td></tr>
<tr><td><a href="/docs/de/trie.md">TRIE</a></td><td>Exakte Zeichenfolgenabfragen und Präfixabgleich bei „ <code translate="no">VARCHAR</code> “-Feldern.</td></tr>
<tr><td><a href="/docs/de/ngram.md">NGRAM</a></td><td>LIKE- und zulässige Regex-Filter.</td></tr>
<tr><td><a href="/docs/de/rtree.md">RTREE</a></td><td>Räumliche Filter für „ <code translate="no">GEOMETRY</code> “-Felder.</td></tr>
</tbody>
</table>
<p>Überprüfen Sie vor dem Erstellen eines Indexes die unten stehende Feldkompatibilitätstabelle und die Filterunterstützung des ausgewählten Indexes.</p>
<p><details id="Filter-execution">
<summary><strong>Wie Filter Indizes nutzen</strong></summary></p>
<p>Ein Index wird nur für zulässige Ausdrücke verwendet; andere Filter können die Daten durchsuchen. Arithmetische Operationen und Vergleiche zwischen Feldern profitieren nicht von der Beschleunigung durch Literal-Lookup. Informationen zu logischen Kombinationen und NULL-Prüfungen finden Sie unter <a href="/docs/de/basic-operators.md">„Grundlegende Operatoren</a>“.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Unterstützte Feldtypen<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Ermitteln Sie den Datentyp Ihres Feldes, um die unterstützten expliziten Indizes anzuzeigen. In Array-Zeilen bedeutet „ <code translate="no">ARRAY&lt;T&gt;</code> “ „ <code translate="no">ARRAY</code> “ mit „ <code translate="no">element_type=T</code> “:</p>
<table>
<thead>
<tr><th>Feldtyp</th><th>Explizite Indextypen</th><th>Bedingungen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Skalare Boolesche Felder unterstützen „ <code translate="no">STL_SORT</code> “ nicht.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, „ <code translate="no">BITMAP</code> “, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> ist für Primärschlüsselfelder nicht verfügbar.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Ein explizites ` <code translate="no">BITMAP</code> ` ist nicht verfügbar.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, „ <code translate="no">BITMAP</code> “, „ <code translate="no">STL_SORT</code> “, „ <code translate="no">TRIE</code> “, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> ist für Primärschlüsselfelder nicht verfügbar. Siehe <a href="#String-pattern-indexes">Indexauswahl nach Filter</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>Siehe <a href="/docs/de/timestamptz-field.md">Feld „TIMESTAMPTZ</a>“.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>Siehe <a href="/docs/de/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Siehe <a href="/docs/de/array_data_type.md#Array-index-support">Unterstützung für Array-Indizes</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Siehe <a href="/docs/de/array_data_type.md#Array-index-support">„Unterstützung von Array-Indizes</a>“.</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>Siehe <a href="/docs/de/array_data_type.md#Array-index-support">Unterstützung für Array-Indizes</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Siehe <a href="/docs/de/array_data_type.md#Array-index-support">Unterstützung für Array-Indizes</a>.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Hängt vom indizierten Pfad und vom Umwandlungstyp ab.</td><td>Überprüfen Sie <a href="/docs/de/json-indexing.md#Understand-cast-types">die Kompatibilität und Anforderungen des JSON-Pfads</a>.</td></tr>
<tr><td>Nicht-Vektor-Unterfelder von `StructArray`</td><td>Hängt vom Datentyp des Unterfelds ab.</td><td>Indizieren Sie Unterfelder separat; „ <code translate="no">BOOL</code> “-Unterfelder können kein explizites „ <code translate="no">STL_SORT</code> “ verwenden. Siehe <a href="/docs/de/index-structarray-fields.md#Create-scalar-indexes">Regeln für Unterfelder</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Keine</td><td>Vom Benutzer erstellte skalare Indizes, einschließlich „ <code translate="no">AUTOINDEX</code> “, sind nicht verfügbar.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Skalare Indizes, einschließlich „ <code translate="no">AUTOINDEX</code> “, unterstützen keine rekursiven ARRAY-Felder oder Arrays mit nullfähigen Elementen. Siehe <a href="/docs/de/array_data_type.md#Array-index-support">„Unterstützung von Array-Indizes</a> für Filter mit gewöhnlichen Arrays“ und <a href="/docs/de/index-structarray-fields.md#Create-scalar-indexes">„Indizierung von StructArray-Feldern“</a> für Regeln zu Unterfeldern.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Wählen Sie einen Index für VARCHAR-Filter</strong></summary></p>
<p>Vergleichen Sie für ein „ <code translate="no">VARCHAR</code> “-Feld kompatible Indizes anhand Ihrer Filter:</p>
<table>
<thead>
<tr><th>Filteranforderungen</th><th>Index-Leitfäden und Bedingungen</th></tr>
</thead>
<tbody>
<tr><td>Exakte Zeichenfolgenabfragen und Präfixe</td><td><a href="/docs/de/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/de/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> oder <a href="/docs/de/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Wenige unterschiedliche Zeichenfolgenwerte</td><td><a href="/docs/de/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; Muster werden anhand der indizierten Werte ausgewertet.</td></tr>
<tr><td>LIKE oder reguläre Ausdrücke mit geeigneten festen Literalen</td><td><a href="/docs/de/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> auf „ <code translate="no">VARCHAR</code> “-Feldern oder JSON-Zeichenfolgenpfaden, vorbehaltlich der Bedingungen für die Gram-Länge und die erneute Überprüfung.</td></tr>
<tr><td>Regex ohne verwendbare feste Literale</td><td>Die Abfrage kann Daten durchsuchen oder viele indizierte Werte auswerten; prüfen Sie die Bedingungen des ausgewählten Index.</td></tr>
</tbody>
</table>
<p>Bereiche auf „ <code translate="no">VARCHAR</code> “ verwenden die Zeichenfolgenreihenfolge, auch wenn die Zeichenfolgen Zahlen enthalten. Die Indexverwendung hängt von der Abfrageplanung, extrahierbaren Literalen, der Kardinalität und der Datenverteilung ab. Siehe <a href="/docs/de/pattern-matching.md#Accelerate-pattern-matching-with-indexes">„Musterabgleich“</a> für Planungsregeln. Für JSON-Zeichenfolgenpfade überprüfen Sie die Pfad- und Typumwandlungsanforderungen unter <a href="/docs/de/json-indexing.md">„JSON-Indizierung</a>“.</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Verhalten von „AUTOINDEX“<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Setzen Sie „ <code translate="no">index_type</code> “ in der Indexdefinition jedes ausgewählten Feldes auf „ <code translate="no">AUTOINDEX</code> “. Milvus wählt einen Typ anhand des Datentyps und, sofern zutreffend, der Anzahl der unterschiedlichen Werte bei jedem Indexaufbau aus:</p>
<table>
<thead>
<tr><th>Feldtyp</th><th>Standardauswahl</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, „ <code translate="no">INT16</code> “, „ <code translate="no">INT32</code> “, „ <code translate="no">INT64</code> “, „ <code translate="no">FLOAT</code> “, „ <code translate="no">DOUBLE</code> “, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> bei weniger als 100 eindeutigen Werten; andernfalls „ <code translate="no">STL_SORT</code> “.</td></tr>
<tr><td><code translate="no">ARRAY</code> wobei „ <code translate="no">element_type</code> “ auf „ <code translate="no">INT8</code> “, „ <code translate="no">INT16</code> “, „ <code translate="no">INT32</code> “, „ <code translate="no">INT64</code> “, „ <code translate="no">FLOAT</code> “, „ <code translate="no">DOUBLE</code> “ oder <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> bei weniger als 100 verschiedenen Elementen; andernfalls <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> Pfade, die standardmäßig in <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> oder <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> standardmäßig in 3.0. Die <a href="/docs/de/json-indexing.md#Index-requirements">JSON-Opt-in-Konfiguration</a> aktiviert die oben genannte skalare Bitmap-/Sortierstrategie.</td></tr>
<tr><td><code translate="no">JSON</code> Pfade, die in „ <code translate="no">ARRAY_BOOL</code> “, „ <code translate="no">ARRAY_DOUBLE</code> “ oder <code translate="no">ARRAY_VARCHAR</code></td><td>Verwenden Sie explizites ` <code translate="no">INVERTED</code>`; die Standardzuordnung in 3.0.6 lehnt die automatische Auswahl für diese Typumwandlungen ab.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Nicht unterstützt.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Bei einem unterstützten Skalarfeld fordert eine Indexdefinition, in der „ <code translate="no">index_type</code> “ weggelassen wird, ebenfalls eine automatische Auswahl an. Felder, die nicht in der Anforderung enthalten sind, werden nicht indiziert.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Details zur Auswahl</strong></summary></p>
<ul>
<li><strong>Interne Layouts:</strong> Mit ` <code translate="no">AUTOINDEX</code> ` können Layouts ausgewählt werden, die nicht als explizite Optionen verfügbar sind, wie z. B. die Bitmap-Indizierung für ` <code translate="no">FLOAT</code> ` und ` <code translate="no">DOUBLE</code>`. Die kardinalitätsbasierte Strategie wird intern als „ <code translate="no">HYBRID</code> “ bezeichnet; Sie können sie nicht direkt angeben. Der ausgewählte Index bestimmt, welche Filter ihn verwenden können.</li>
<li><strong>Kardinalitätsschwelle:</strong> <a id="Cardinality-threshold"></a>Legen Sie „ <code translate="no">bitmap_cardinality_limit</code> “ (Bereich: 1–1000) fest, um die Standardschwelle zu überschreiben. Bei Werten unterhalb dieser Schwelle wird Bitmap verwendet; bei oder oberhalb dieser Schwelle gilt das Layout für hohe Kardinalität des Datentyps. Explizite „ <code translate="no">INVERTED</code> “, „ <code translate="no">STL_SORT</code> “ und „ <code translate="no">BITMAP</code> “-Erstellungen umgehen die kardinalitätsbasierte Auswahl und ignorieren diese Schwelle.</li>
<li><strong>Übersteuerungen durch den Administrator:</strong> Ändern Sie Typzuordnungen über „ <code translate="no">scalarAutoIndex.params.build</code> “. „ <code translate="no">scalarAutoIndex.enable=false</code> “ (Standard) erlaubt weiterhin explizite „ <code translate="no">AUTOINDEX</code> “; „ <code translate="no">true</code> “ wendet die automatische Auswahl auch auf gültige manuelle Anfragen an.</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Wählen Sie eine Anleitung für Ihre nächste Aufgabe:</p>
<ul>
<li><strong>Erstellen Sie einen Index:</strong> Nutzen Sie die <a href="#Index-types">Index-Anleitung</a> für Parameter und Beispiele zur Erstellung.</li>
<li><strong>Ressourcen planen:</strong> Lesen Sie die Speicherhinweise für <a href="/docs/de/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/de/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/de/inverted.md#Memory-considerations">INVERTED</a> oder <a href="/docs/de/ngram.md#Memory-considerations">NGRAM</a>. Vergleichen Sie Speicherverbrauch, Erstellungszeit und Abfragelatenz mit repräsentativen Daten und Filtern.</li>
<li><strong>Text-Suche konfigurieren:</strong> <a href="/docs/de/keyword-match.md">„Text Match“</a> und <a href="/docs/de/full-text-search.md">„Full Text Search“</a> decken Textanalyse, BM25, <code translate="no">TEXT_MATCH</code> sowie <code translate="no">PHRASE_MATCH</code> ab. Ein skalarer <code translate="no">INVERTED</code> -Index unterstützt diese Mechanismen nicht.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Löschen von skalaren Indizes in älteren Milvus-Versionen</strong></summary></p>
<p>In Milvus v2.6.3 oder früher müssen Sie die Sammlung freigeben, bevor Sie einen skalaren Index löschen. Ab v2.6.4 können Sie ihn löschen, ohne die Sammlung freizugeben.</p>
<p></details></p>
