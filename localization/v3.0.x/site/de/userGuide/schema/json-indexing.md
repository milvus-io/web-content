---
id: json-indexing.md
title: JSON-Indizierung
summary: >-
  JSON-Felder bieten eine flexible Möglichkeit, strukturierte Metadaten in
  Milvus zu speichern. Ohne Indizierung erfordern Abfragen auf JSON-Feldern
  einen vollständigen Durchlauf der gesamten Sammlung, was mit zunehmender Größe
  Ihres Datensatzes zu Verzögerungen führt. Bei der JSON-Indizierung werden
  Indizes für bestimmte Pfade innerhalb Ihrer JSON-Daten erstellt, sodass
  Gleichheits-, Bereichs- und andere Filterabfragen auf diesen Pfaden schnell
  ausgeführt werden können.
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
    </button></h1><p>JSON-Felder bieten eine flexible Möglichkeit, strukturierte Metadaten in Milvus zu speichern. Ohne Indizierung erfordern Abfragen auf JSON-Feldern vollständige Durchläufe der Sammlung, was mit zunehmender Größe Ihres Datensatzes zu Verzögerungen führt. Die JSON-Indizierung erstellt einen Index für einen bestimmten Pfad innerhalb Ihrer JSON-Daten, sodass Gleichheits-, Bereichs- und andere Filterabfragen auf diesem Pfad schnell ausgeführt werden können.</p>
<p>Die JSON-Indizierung eignet sich ideal für:</p>
<ul>
<li><p>Strukturierte Schemata mit konsistenten, bekannten Schlüsseln</p></li>
<li><p>Gleichheits-, „ <code translate="no">IN</code> “-Abfragen, Bereichsabfragen und Textvergleichsabfragen auf bestimmten JSON-Pfaden</p></li>
<li><p>Szenarien, in denen Sie präzise steuern müssen, welche Schlüssel indiziert werden</p></li>
</ul>
<p>Bei komplexen JSON-Dokumenten mit vielfältigen Abfragemustern sollten Sie <a href="/docs/de/json-shredding.md">JSON-Shredding</a> als Alternative in Betracht ziehen.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Übersicht über die Indizierungstypen<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet vier Indextypen für JSON-Pfade an. Jeder ist für ein anderes Abfragemuster geeignet.</p>
<p>Bevor Sie sich für einen Indextyp entscheiden, ermitteln Sie den <strong>Cast-Typ</strong> für den JSON-Pfad. Der Cast-Typ bestimmt, wie Milvus den Wert an diesem Pfad interpretiert und welche Indextypen verfügbar sind.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Cast-Typen verstehen<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> Der Cast-Typ ist der Datentyp, der zur Interpretation und Indizierung des Werts unter <code translate="no">json_path</code> verwendet wird. Er unterscheidet sich vom Feldschematyp: Das Feld ist weiterhin ein „ <code translate="no">JSON</code> “-Feld, aber jeder indizierte Pfad wird als spezifischer Skalar-, Array- oder JSON-Objekttyp behandelt.</p>
<p>Wählen Sie den Cast-Typ aus, der zu den unter dem Pfad gespeicherten Werten passt. Informationen dazu, ob ein Cast-Typ mit einem bestimmten Indextyp kompatibel ist, finden Sie in <a href="/docs/de/json-indexing.md#compatibility-reference">der Kompatibilitätsreferenz</a>.</p>
<table>
<thead>
<tr><th>Konvertierungstyp</th><th>Verwenden Sie diesen, wenn der Pfadwert…</th><th>Beispielwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Ein boolescher Wert</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Ein numerischer Wert</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Ein Zeichenfolgenwert</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Ein Array aus booleschen Werten</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Ein Array aus numerischen Werten</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Ein Array aus Zeichenfolgen</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Ein gesamtes JSON-Objekt oder Unterobjekt. Die Indizierung ganzer JSON-Objekte ist ab Milvus 3.0.0 veraltet.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Wenn Werte unter demselben Pfad inkonsistente Typen aufweisen, werden nur Werte indiziert, die dem umgewandelten Typ entsprechen. Wenn beispielsweise <code translate="no">metadata[&quot;price&quot;]</code> sowohl <code translate="no">99.99</code> als auch <code translate="no">&quot;99.99&quot;</code> enthält, umfasst ein Index vom Typ „ <code translate="no">DOUBLE</code> “ den numerischen Wert und lässt den Zeichenfolgenwert außer Acht. Um Zeichenfolgenwerte während der Indizierung zu konvertieren, verwenden Sie „ <code translate="no">json_cast_function</code> “; siehe <a href="/docs/de/json-indexing.md#example-5-convert-data-type-at-index-time">Beispiel 5: Datentyp zum Zeitpunkt der Indizierung konvertieren</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Wählen Sie einen Indextyp aus<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Sie einen Cast-Typ ausgewählt haben, wählen Sie den Indextyp entsprechend Ihrem Abfragemuster aus.</p>
<table>
<thead>
<tr><th>Abfragemuster</th><th>Empfohlener Indextyp</th><th>Anforderungen an den Cast-Typ</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td>Gemischte Gleichheits- und Bereichsfilter auf Skalarwerten</td><td><code translate="no">AUTOINDEX</code></td><td>Verwenden Sie „ <code translate="no">BOOL</code> “, „ <code translate="no">DOUBLE</code> “ oder „ <code translate="no">VARCHAR</code> “.</td><td>Lassen Sie Milvus das interne Indexlayout basierend auf der Kardinalität der Werte auswählen.</td></tr>
<tr><td>Filter auf Werte innerhalb von JSON-Arrays</td><td><code translate="no">INVERTED</code></td><td>Verwenden Sie „ <code translate="no">ARRAY_BOOL</code> “, „ <code translate="no">ARRAY_DOUBLE</code> “ oder „ <code translate="no">ARRAY_VARCHAR</code> “.</td><td>Erforderlich für alle Array-Cast-Typen.</td></tr>
<tr><td>Indizierung des gesamten Objekts oder von Teilobjekten (veraltet)</td><td><code translate="no">INVERTED</code> oder <code translate="no">AUTOINDEX</code> (nur aus Kompatibilitätsgründen)</td><td>Verwenden Sie <code translate="no">JSON</code>.</td><td>Wird aus Kompatibilitätsgründen unterstützt. Erstellen Sie für neue Workloads pfadspezifische Indizes oder ziehen Sie <a href="/docs/de/json-shredding.md">JSON-Shredding</a> in Betracht.</td></tr>
<tr><td>Bereichsfilter für Zahlen oder sortierbare Zeichenfolgen</td><td><code translate="no">STL_SORT</code> oder <code translate="no">AUTOINDEX</code></td><td>Verwenden Sie „ <code translate="no">DOUBLE</code> “ oder „ <code translate="no">VARCHAR</code> “.</td><td>Verwenden Sie „ <code translate="no">STL_SORT</code> “, um ein sortiertes Layout zu erzwingen; verwenden Sie „ <code translate="no">AUTOINDEX</code> “, wenn Sie eine automatische Auswahl wünschen.</td></tr>
<tr><td>Gleichheits- oder „ <code translate="no">IN</code> “-Filter für Werte mit geringer Kardinalität</td><td><code translate="no">BITMAP</code> oder <code translate="no">AUTOINDEX</code></td><td>Verwenden Sie „ <code translate="no">BOOL</code> “ oder „ <code translate="no">VARCHAR</code> “.</td><td>Verwenden Sie „ <code translate="no">BITMAP</code> “, um ein Bitmap-Layout zu erzwingen. Verwenden Sie für numerische Werte „ <code translate="no">AUTOINDEX</code> “ oder „ <code translate="no">STL_SORT</code> “.</td></tr>
</tbody>
</table>
<p>Im Zweifelsfall beginnen Sie bei skalaren Pfaden mit <code translate="no">AUTOINDEX</code>. Verwenden Sie <code translate="no">INVERTED</code> explizit für Array-Cast-Typen und Textabgleich-Abfragen. Die JSON-Indizierung ganzer Objekte mit <code translate="no">INVERTED</code> oder <code translate="no">AUTOINDEX</code> wird weiterhin unterstützt, ist jedoch ab Milvus 3.0.0 veraltet.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> hängt vom angegebenen „ <code translate="no">json_cast_type</code> “ ab. In Milvus 3.0 wird „ <code translate="no">AUTOINDEX</code> “ bei JSON-Pfadindizes nicht mehr immer zu „ <code translate="no">INVERTED</code> “ aufgelöst.</p>
<table>
<thead>
<tr><th>Typumwandlung</th><th><code translate="no">AUTOINDEX</code> Verhalten</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, „ <code translate="no">DOUBLE</code> “, <code translate="no">VARCHAR</code></td><td>Wählt je nach Kardinalität des Werts zwischen <code translate="no">BITMAP</code> und <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, „ <code translate="no">ARRAY_DOUBLE</code> “, <code translate="no">ARRAY_VARCHAR</code></td><td>Nicht unterstützt. Verwenden Sie „ <code translate="no">INVERTED</code> “ explizit als Indextyp.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Verwendet „ <code translate="no">INVERTED</code> “ für die Indizierung ganzer Objekte oder Teilobjekte. Dieser Modus ist ab Milvus 3.0.0 veraltet.</td></tr>
</tbody>
</table>
<p>Für skalare Cast-Typen (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> und <code translate="no">VARCHAR</code>) ist „ <code translate="no">AUTOINDEX</code> “ der empfohlene Ausgangspunkt, wenn Sie möchten, dass Milvus das interne Indexlayout auswählt. Während der Indexerstellung ermittelt Milvus die <strong>Kardinalität</strong> der Werte am JSON-Pfad. Kardinalität bezeichnet die Anzahl der unterschiedlichen Werte an diesem Pfad.</p>
<p>Basierend auf der Kardinalität wählt Milvus eines von zwei internen Layouts aus:</p>
<ul>
<li><p><strong>Niedrige Kardinalität</strong>: Werte wiederholen sich häufig, wie beispielsweise <code translate="no">metadata[&quot;in_stock&quot;]</code> zusammen mit <code translate="no">true</code> und <code translate="no">false</code> oder <code translate="no">metadata[&quot;status&quot;]</code> mit einer kleinen Menge von Status-Strings. Milvus erstellt intern einen „ <code translate="no">BITMAP</code> “-Index für schnelle Gleichheits- und „ <code translate="no">IN</code> “-Filter.</p></li>
<li><p><strong>Hohe Kardinalität</strong>: Die meisten Werte sind unterschiedlich, wie beispielsweise <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code> oder <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus erstellt intern einen <code translate="no">STL_SORT</code> -Index für schnelle Bereichsfilter wie <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> und <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>Der Standardschwellenwert für „ <code translate="no">BITMAP</code> “ im Vergleich zu „<code translate="no">STL_SORT</code> “ beträgt <strong>100 eindeutige Werte</strong>. Sie können diesen Schwellenwert mit „ <code translate="no">bitmap_cardinality_limit</code> “ anpassen; siehe <a href="/docs/de/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">„Wie passe ich den Schwellenwert für „BITMAP-vs-STL_SORT“ von AUTOINDEX an?</a>“.</p>
<div class="alert note">
<p><strong>Verhaltensänderung in Milvus 3.0</strong>. In früheren Versionen erstellte „ <code translate="no">AUTOINDEX</code> “ für JSON-Pfade immer einen „ <code translate="no">INVERTED</code> “-Index. Ab Milvus 3.0 wählt „ <code translate="no">AUTOINDEX</code> “ bei skalaren Cast-Typen zwischen „ <code translate="no">BITMAP</code> “ und „ <code translate="no">STL_SORT</code> “ aus. Für „ <code translate="no">JSON</code> “ verwendet „ <code translate="no">AUTOINDEX</code> “ weiterhin „ <code translate="no">INVERTED</code> “, obwohl die Indizierung ganzer JSON-Objekte veraltet ist. Für Array-Cast-Typen und Textabgleich-Abfragen geben Sie „ <code translate="no">INVERTED</code> “ explizit an.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> ist am besten geeignet, wenn Sie Textabgleichabfragen oder Array-Indizierung benötigen. Es steht auch weiterhin für die veraltete JSON-Indizierung ganzer Objekte zur Verfügung.</p>
<p>Geben Sie „ <code translate="no">INVERTED</code> “ explizit an, wenn:</p>
<ul>
<li><p>Sie Werte innerhalb von JSON-Arrays indizieren müssen.</p></li>
<li><p>Sie einen bestehenden Index für ein gesamtes JSON-Objekt oder ein Unterobjekt pflegen und das „ <code translate="no">INVERTED</code> “-Verhalten explizit festlegen möchten.</p></li>
<li><p>Sie einen Index-Typ wünschen, der Gleichheits-, „ <code translate="no">IN</code> “--, Bereichs-, Textübereinstimmungs- und Array-Abfragen verarbeitet. Die Unterstützung für ganze Objekte bleibt aus Kompatibilitätsgründen weiterhin verfügbar, allerdings auf Kosten einer größeren Indexgröße.</p></li>
</ul>
<p>Für bestehende Indizes auf gesamte JSON-Objekte (<code translate="no">json_cast_type=&quot;JSON&quot;</code>) können Sie weiterhin entweder „ <code translate="no">INVERTED</code> “ oder „ <code translate="no">AUTOINDEX</code> “ verwenden. „ <code translate="no">AUTOINDEX</code> “ verwendet für diesen Cast-Typ „ <code translate="no">INVERTED</code> “. Die JSON-Indizierung ganzer Objekte wird für neue Workloads nicht mehr empfohlen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> speichert Werte aus einem JSON-Pfad in sortierter Reihenfolge. Es ist für Bereichsfilter auf numerische Werte oder sortierbare Zeichenfolgenwerte optimiert.</p>
<p><code translate="no">STL_SORT</code> Unterstützt nur die Typumwandlungen „ <code translate="no">DOUBLE</code> “ und „ <code translate="no">VARCHAR</code> “. Verwenden Sie diese Funktion, wenn:</p>
<ul>
<li><p>Ihre Filter Werte mit „ <code translate="no">&gt;</code> “, „ <code translate="no">&lt;</code> “, „ <code translate="no">&gt;=</code> “ oder „ <code translate="no">&lt;=</code> “ vergleichen.</p></li>
<li><p>Die indizierten Werte weisen eine hohe Kardinalität auf, wie beispielsweise Preise, Zeitstempel, IDs oder sortierbare Codes.</p></li>
<li><p>Sie möchten ein sortiertes Layout erzwingen, anstatt die Auswahl „ <code translate="no">AUTOINDEX</code> “ zu überlassen.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> <code translate="no">BOOL</code>, oder -Cast-Typen werden nicht unterstützt. Verwenden Sie für Arrays . Bestehende Indizes für ganze Objekte können weiterhin oder verwenden, die JSON-Indizierung für ganze Objekte ist jedoch veraltet. <code translate="no">ARRAY_*</code> <code translate="no">JSON</code> <code translate="no">INVERTED</code> <code translate="no">INVERTED</code> <code translate="no">AUTOINDEX</code></p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> erstellt für jeden eindeutigen Wert an einem JSON-Pfad eine kompakte Bitmap. Sie ist für Gleichheits- und „ <code translate="no">IN</code> “-Filter bei häufig wiederkehrenden Werten optimiert.</p>
<p><code translate="no">BITMAP</code> Unterstützt ausschließlich die Cast-Typen „ <code translate="no">BOOL</code> “ und „ <code translate="no">VARCHAR</code> “. Verwenden Sie diese Funktion, wenn:</p>
<ul>
<li><p>Ihre Filter „ <code translate="no">==</code> “ oder „ <code translate="no">IN</code> “ verwenden.</p></li>
<li><p>Die indizierten Werte eine geringe Kardinalität aufweisen, wie z. B. Boolesche Werte, Statuswerte oder eine kleine Menge von Kategorien.</p></li>
<li><p>Sie möchten ein Bitmap-Layout erzwingen, anstatt die Auswahl „ <code translate="no">AUTOINDEX</code> “ zu überlassen.</p></li>
</ul>
<p><code translate="no">BITMAP</code> <code translate="no">DOUBLE</code>, oder als Typkonvertierungen werden nicht unterstützt. Verwenden Sie für numerische Werte stattdessen , oder . <code translate="no">ARRAY_*</code> <code translate="no">JSON</code> <code translate="no">AUTOINDEX</code> <code translate="no">STL_SORT</code> <code translate="no">INVERTED</code> </p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Kompatibilitätsübersicht<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie die folgende Matrix als Kurzübersicht für unterstützte „ <code translate="no">(cast type, index type)</code> “-Kombinationen.</p>
<table>
<thead>
<tr><th>Typumwandlung</th><th>Beschreibung</th><th>Beispielwert</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Boolesche Werte (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Ja</td><td>Ja</td><td>Nein</td><td>Ja</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Numerische Werte (Ganzzahlen oder Gleitkommazahlen).</td><td><code translate="no">99.99</code></td><td>Ja</td><td>Ja</td><td>Ja</td><td>Nein</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Zeichenfolgenwerte.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Array aus Booleschen Werten.</td><td><code translate="no">[true, false]</code></td><td>Nein</td><td>Ja</td><td>Nein</td><td>Nein</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Array von Zahlen.</td><td><code translate="no">[1.2, 3.14]</code></td><td>Nein</td><td>Ja</td><td>Nein</td><td>Nein</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Zeichenfolgen-Array.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>Nein</td><td>Ja</td><td>Nein</td><td>Nein</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Ein vollständiges JSON-Objekt oder Unterobjekt mit automatischer Typinferenz und Abflachung. Ab Milvus 3.0.0 veraltet.</td><td>beliebiges verschachteltes Objekt</td><td>Ja (veraltet)</td><td>Ja (veraltet)</td><td>Nein</td><td>Nein</td></tr>
</tbody>
</table>
<p>Bei Zellen, die mit „ <code translate="no">No</code> “ gekennzeichnet sind, lehnt Milvus die Anfrage bei der Indexerstellung ab. Verwenden Sie für Array-Cast-Typen explizit „ <code translate="no">INVERTED</code> “ (da „<code translate="no">AUTOINDEX</code> “ keine Arrays abdeckt).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Erstellen eines JSON-Index<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt führt Sie durch die Indizierung verschiedener Formen von JSON-Daten. Alle Beispiele verwenden die unten stehende Beispielstruktur und setzen voraus, dass Sie bereits über eine Sammlung verfügen, die ein Feld vom Typ „ <code translate="no">JSON</code> “ mit dem Namen „ <code translate="no">metadata</code> “ enthält.</p>
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
    </button></h3><p>Die folgenden Beispiele setzen voraus, dass Sie über ein „ <code translate="no">MilvusClient</code> “ namens „ <code translate="no">client</code> “ verfügen, das mit Ihrer Milvus-Bereitstellung verbunden ist, sowie über eine Sammlung, die bereits ein Feld „ <code translate="no">JSON</code> “ namens „ <code translate="no">metadata</code> “ enthält. Wenn Sie diese von Grund auf einrichten müssen, erweitern Sie den folgenden Block.</p>
<p><details></p>
<p><summary>Verbinden und eine Beispielsammlung erstellen</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Bereiten Sie ein „index-params“-Objekt vor, um die in den folgenden Beispielen hinzugefügten Indexdefinitionen zu erfassen:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Jedes der folgenden Beispiele zeigt einen „ <code translate="no">index_params.add_index(...)</code> “-Aufruf. Wählen Sie die für Ihre Daten passenden Beispiele aus und rufen Sie sie für dasselbe „ <code translate="no">index_params</code> “-Objekt auf. Wenden Sie anschließend am Ende alles in einem einzigen „ <code translate="no">client.create_index(...)</code> “-Aufruf an. Weitere Informationen finden Sie unter <a href="/docs/de/json-indexing.md#apply-the-index">„Index anwenden</a>“.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Beispiel 1: Indizieren eines Top-Level-Schlüssels mit AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Indizieren Sie das Feld „ <code translate="no">category</code> “, um eine schnelle Filterung nach Produktkategorien zu ermöglichen. Bei „ <code translate="no">AUTOINDEX</code> “ wählt Milvus je nach Anzahl der unterschiedlichen Kategorien in Ihren Daten entweder „ <code translate="no">BITMAP</code> “ oder „ <code translate="no">STL_SORT</code> “ aus.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Beispiel 2: Indizieren eines verschachtelten Schlüssels<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Indizieren Sie das tief verschachtelte Feld „ <code translate="no">email</code> “ für die Suche nach Lieferantenkontakten. Der Parameter „ <code translate="no">json_path</code> “ akzeptiert Klammernotationen beliebiger Tiefe.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Beispiel 3: Bereichsabfragen mit STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie wissen, dass Ihre Abfragen auf einem Pfad überwiegend aus Bereichsvergleichen bestehen (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), wählen Sie direkt „ <code translate="no">STL_SORT</code> “. Dadurch wird die Kardinalitätsmessung umgangen und das sortierte Layout sofort erstellt.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Nach der Indizierung verwenden Bereichsabfragen wie <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> eine binäre Suche anstelle eines Vollscans.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Beispiel 4: Gleichheitsabfragen mit BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei Schlüsseln mit geringer Kardinalität, wie z. B. Statuscodes, booleschen Werten oder enum-ähnlichen Zeichenfolgen, wählen Sie direkt „ <code translate="no">BITMAP</code> “. Gleichheitsabfragen und Abfragen vom Typ „ <code translate="no">IN</code> “ werden zu Bitmap-Operationen.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> Eignet sich außerdem besonders gut für Felder wie eine „ <code translate="no">status</code> “-Spalte mit einer Handvoll unterschiedlicher Zeichenfolgenwerte.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Beispiel 5: Datentyp beim Erstellen des Index konvertieren<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn numerische Daten fälschlicherweise als Zeichenfolgen gespeichert wurden, verwenden Sie „ <code translate="no">STRING_TO_DOUBLE</code> “, um den Wert während der Indexerstellung in eine Zahl umzuwandeln.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn die Konvertierung für eine Zeile fehlschlägt (z. B. bei einer nicht-numerischen Zeichenfolge wie „ <code translate="no">&quot;invalid&quot;</code> “), wird diese Zeile bei der Indizierung übersprungen.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Beispiel 6: Indizierung ganzer JSON-Objekte<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>Ab Milvus 3.0.0 ist die Indizierung ganzer JSON-Objekte (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), auch als „JSON-Flat-Indizierung“ bekannt, veraltet. Bestehende Indizes und neue Anträge zur Indexerstellung werden aus Kompatibilitätsgründen weiterhin unterstützt, dieser Modus wird jedoch für neue Workloads nicht mehr empfohlen. Erstellen Sie JSON-Pfadindizes für bekannte Abfragepfade. Bei komplexen oder sich weiterentwickelnden JSON-Dokumenten mit breit gefächerten Abfragemustern sollten Sie <a href="/docs/de/json-shredding.md">JSON-Shredding</a> in Betracht ziehen. Beim JSON-Shredding werden Werte innerhalb von Arrays nicht beschleunigt; verwenden Sie für diese Abfragen JSON-Pfadindizes mit Array-Cast-Typen.</p>
</div>
<p>Bei kompatiblen bestehenden Workloads indiziert die Einstellung „ <code translate="no">json_cast_type=&quot;JSON&quot;</code> “ die gesamte Struktur unter dem angegebenen Pfad. Milvus glättet verschachtelte Objekte zu Pfaden und leitet automatisch den Typ jedes Werts ab. Alle Schlüssel unter dem Pfad werden durchsuchbar.</p>
<p><code translate="no">AUTOINDEX</code> „ <code translate="no">INVERTED</code> “ wird transparent für den Cast-Typ „ <code translate="no">JSON</code> “ verwendet, da die Abflachung und die Typinferenz Funktionen des invertierten Indexes sind.</p>
<p>Das gesamte „ <code translate="no">metadata</code> “-Objekt indizieren:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Oder indizieren Sie ein Unterobjekt, beispielsweise alle „ <code translate="no">supplier</code> “-Informationen:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Indizieren ganzer Objekte erhöht die Indexgröße. Verwenden Sie für neue Workloads mit tief verschachtelten Dokumenten und vielfältigen Abfragemustern pfadspezifische Indizes oder ziehen Sie <a href="/docs/de/json-shredding.md">JSON-Shredding</a> in Betracht.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Wenden Sie den Index an<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Sie alle Ihre Indexparameter hinzugefügt haben, wenden Sie diese auf Ihre Sammlung an:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Indexaufbauten laufen asynchron ab. Verwenden Sie „ <code translate="no">client.describe_index(...)</code> “, um den Aufbauzustand eines bestimmten Indexes zu überprüfen. Das Feld „ <code translate="no">state</code> “ zeigt „ <code translate="no">Finished</code> “ an, sobald der Aufbau abgeschlossen ist, und „ <code translate="no">total_rows</code> “, „ <code translate="no">indexed_rows</code> “ sowie „ <code translate="no">pending_index_rows</code> “ zeigen den Fortschritt während des Vorgangs an.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Beispielantwort:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald <code translate="no">state</code> den Status „ <code translate="no">Finished</code> “ meldet, verwenden Abfragen an den indizierten Pfad automatisch den neuen Index.</p>
<p>Bei „ <code translate="no">AUTOINDEX</code> “-Einträgen wird das Feld „ <code translate="no">index_type</code> “ in dieser Antwort als „ <code translate="no">AUTOINDEX</code> “ gemeldet. Milvus gibt derzeit nicht bekannt, welches zugrunde liegende Layout („<code translate="no">BITMAP</code> “ oder „ <code translate="no">STL_SORT</code> “) zum Zeitpunkt der Erstellung gewählt wurde. Betrachten Sie die Wahl als interne Optimierung: Gleichheits-, „ <code translate="no">IN</code> “- und Bereichsabfragen für den Pfad funktionieren unabhängig davon, welches Layout ausgewählt wurde.</p>
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">Wie entscheide ich mich zwischen AUTOINDEX und einem expliziten Indextyp?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Beginnen Sie mit „ <code translate="no">AUTOINDEX</code> “. Dieser wählt anhand der Kardinalität Ihrer Daten das richtige Layout aus und deckt die meisten Gleichheitsabfragen, <code translate="no">IN</code> sowie Bereichsabfragen auf JSON-Pfaden ab. Wählen Sie einen expliziten Typ, wenn:</p>
<ul>
<li><p>Sie Ihr Abfragemuster kennen (z. B. verwenden Sie für Bereichsabfragen immer „ <code translate="no">STL_SORT</code> “ und für Gleichheitsabfragen bei Werten mit geringer Kardinalität immer „ <code translate="no">BITMAP</code> “) und die Kardinalitätsmessung überspringen möchten.</p></li>
<li><p>Sie Textübereinstimmungs- oder Teilzeichenfolgenabfragen benötigen. Verwenden Sie „ <code translate="no">INVERTED</code> “.</p></li>
<li><p>Sie indizieren Array-Cast-Typen. Verwenden Sie explizit ` <code translate="no">INVERTED</code> `.</p></li>
<li><p>Sie pflegen einen bestehenden JSON-Index für ganze Objekte. Sowohl <code translate="no">INVERTED</code> als auch <code translate="no">AUTOINDEX</code> werden aus Kompatibilitätsgründen weiterhin unterstützt, die Indizierung ganzer Objekte im JSON-Format ist jedoch ab Milvus 3.0.0 veraltet.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Was passiert, wenn der Filterausdruck einer Abfrage einen anderen Typ verwendet als den indizierten Cast-Typ?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Ihr Filterausdruck einen anderen Typ verwendet als den im Index festgelegten „ <code translate="no">json_cast_type</code> “, nutzt Milvus den Index nicht und greift möglicherweise auf einen langsameren Brute-Force-Scan zurück, sofern die Daten dies zulassen. Um eine optimale Leistung zu erzielen, sollten Sie Ihren Filterausdruck stets an den „cast type“ des Index anpassen. Wenn beispielsweise ein numerischer Index mit „ <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> “ erstellt wird, nutzen nur numerische Filterbedingungen den Index.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Was passiert, wenn ein JSON-Schlüssel über verschiedene Entitäten hinweg inkonsistente Datentypen aufweist?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Inkonsistente Datentypen können zu <strong>einer unvollständigen Indizierung</strong> führen. Wenn beispielsweise „ <code translate="no">metadata[&quot;price&quot;]</code> “ sowohl als Zahl (<code translate="no">99.99</code>) als auch als Zeichenfolge (<code translate="no">&quot;99.99&quot;</code>) gespeichert ist und Sie einen Index mit „ <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code> “ erstellen, werden nur die numerischen Werte indiziert. Einträge in Zeichenfolgenform werden übersprungen und erscheinen nicht in den Filterergebnissen. Verwenden Sie „ <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> “, um Zeichenfolgen beim Erstellen des Indexes in Zahlen umzuwandeln, oder passen Sie die Quelldaten so an, dass alle Einträge denselben Typ haben.</p>
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
    </button></h3><p>Nein. Milvus erlaubt höchstens einen Index pro „ <code translate="no">(field, json_path)</code> “-Paar, unabhängig vom Cast-Typ oder Index-Typ. Sie können nicht sowohl einen „ <code translate="no">INVERTED</code> “- als auch einen „ <code translate="no">BITMAP</code> “-Index auf demselben Pfad erstellen oder zwei Indizes auf demselben Pfad mit unterschiedlichen Cast-Typen. Sie können jedoch einen Index für das gesamte JSON-Objekt und einen separaten Index für einen verschachtelten Schlüssel innerhalb dieses Objekts erstellen, da es sich dabei um unterschiedliche Pfade handelt.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">Wie passe ich den Schwellenwert für „BITMAP“ vs. „STL_SORT“ von AUTOINDEX an?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>Standardmäßig wählt „ <code translate="no">AUTOINDEX</code> “ „ <code translate="no">BITMAP</code> “, wenn die indizierten Werte <strong>100 oder weniger unterschiedliche Werte</strong> aufweisen, und andernfalls „ <code translate="no">STL_SORT</code> “. Sie können diesen Schwellenwert überschreiben, indem Sie „ <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> “ zu Ihren Indexparametern hinzufügen (Bereich: 1–1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Die meisten Benutzer müssen diese Einstellung nicht anpassen. Erhöhen Sie den Wert, wenn Sie ein Feld mit mittlerer Kardinalität haben, für das Sie eine Bitmap-Darstellung bevorzugen; senken Sie ihn, um „ <code translate="no">AUTOINDEX</code> “ schneller in Richtung „ <code translate="no">STL_SORT</code> “ zu verschieben. Die Einstellung wird ignoriert, wenn Sie „ <code translate="no">INVERTED</code> “, „ <code translate="no">STL_SORT</code> “ oder „ <code translate="no">BITMAP</code> “ explizit angeben.</p>
