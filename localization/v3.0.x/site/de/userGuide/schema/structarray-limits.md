---
id: structarray-limits.md
title: Einschränkungen bei StructArray
summary: >-
  Die Unterstützung für StructArray umfasst Schemadefinitionen,
  Einfüge-Payloads, Indizierung, Suchmodi und StructArray-spezifische Filter.
  Nutzen Sie diese Seite als Referenz für die Einschränkungen, bevor Sie sich in
  der Produktion auf das Verhalten von StructArray verlassen.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Einschränkungen bei StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Unterstützung von StructArray umfasst Schemadefinitionen, Einfüge-Payloads, Indizierung, Suchmodi und StructArray-spezifische Filter. Nutzen Sie diese Seite als Referenz für die Einschränkungen, bevor Sie sich in der Produktion auf das Verhalten von StructArray verlassen.</p>
<p>Die meisten StructArray-Einschränkungen ergeben sich aus einer der folgenden drei Quellen: dem StructArray-Schemamodell, dem von Ihnen für Vektor-Unterfelder gewählten Suchmodus und der Milvus-Version, auf der Ihre Sammlung ausgeführt wird.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Einschränkungen im Überblick<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Bereich</th><th>Beschränkung</th></tr>
</thead>
<tbody>
<tr><td>Schemaform</td><td>Ein „Struct“ kann nur als Elementtyp eines Array-Feldes verwendet werden. „Struct“ wird nicht als Sammlungsfeld auf oberster Ebene unterstützt.</td></tr>
<tr><td>Schema der Unterfelder</td><td>Alle Struct-Elemente im selben StructArray-Feld teilen sich ein vordefiniertes Struct-Schema.</td></tr>
<tr><td>Kapazität</td><td><code translate="no">max_capacity</code> ist erforderlich und begrenzt die Anzahl der Struct-Elemente, die eine Entität im StructArray-Feld speichern kann.</td></tr>
<tr><td>Änderungen an Unterfeldern</td><td>Nachdem ein StructArray-Feld erstellt wurde, können Sie diesem bestehenden StructArray-Feld keine Unterfelder mehr hinzufügen.</td></tr>
<tr><td>Pfad für Unterfelder</td><td>Verwenden Sie „ <code translate="no">structArray[subfield]</code> “-Pfade wie beispielsweise <code translate="no">chunks[emb]</code> für Indizes, Suchziele, Ausgabefelder und Filter. Verwenden Sie nicht <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Form einfügen</td><td>Fügen Sie ein StructArray-Feld als Array von Objekten ein. Verwenden Sie innerhalb von Einfüge-Payloads keine Pfadsyntax.</td></tr>
<tr><td>Vektorindizes</td><td>Ein Vektorfeld oder Vektor-Unterfeld akzeptiert nur einen Index. Verwenden Sie separate Vektor-Unterfelder für die „EmbeddingList“-Suche und die Suche auf Elementebene.</td></tr>
<tr><td>Funktionen</td><td>Feldfunktionen werden für Felder oder Unterfelder innerhalb eines StructArray-Feldes nicht unterstützt.</td></tr>
<tr><td>Nullfähige Felder</td><td>Nullfähige StructArray-Felder sind versionsabhängig. Sofern unterstützt, gilt „null“ für das gesamte StructArray-Feld und nicht unabhängig davon für ein einzelnes Struct-Element.</td></tr>
<tr><td>Dynamisches Hinzufügen eines Feldes</td><td>Das Hinzufügen eines StructArray-Feldes zu einer bestehenden Sammlung ist versionsabhängig und setzt voraus, dass das hinzugefügte Feld nullfähig ist.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Schema-Einschränkungen<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Beschränkung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>„Struct“ ist kein Feldtyp auf oberster Ebene.</td><td>Erstellen Sie ein „StructArray“-Feld als „ <code translate="no">datatype=DataType.ARRAY</code> “ mit „ <code translate="no">element_type=DataType.STRUCT</code> “ und einem „ <code translate="no">struct_schema</code> “.</td></tr>
<tr><td>Alle Elemente teilen sich ein Schema.</td><td>Jedes „Struct“-Element in einem „StructArray“-Feld folgt derselben Unterfeldliste und denselben Unterfelddatentypen.</td></tr>
<tr><td><code translate="no">max_capacity</code> ist erforderlich.</td><td>Die Anzahl der Struct-Elemente in einer Entität darf das für das StructArray-Feld konfigurierte „ <code translate="no">max_capacity</code> “ nicht überschreiten.</td></tr>
<tr><td>Vorhandene Unterfelder sind fest vorgegeben.</td><td>Sie können einem bestehenden StructArray-Feld keine neuen Unterfelder anhängen. Um das Unterfeldschema zu ändern, löschen Sie das StructArray-Feld und fügen Sie es mit dem aktualisierten Schema erneut hinzu.</td></tr>
<tr><td>Verschachtelte StructArray-Felder werden nicht unterstützt.</td><td>Ein „StructArray“-Feld darf keine verschachtelten „ <code translate="no">Array</code> “- „ <code translate="no">ArrayOfVector</code> “- „ <code translate="no">Struct</code> “- oder „ <code translate="no">ArrayOfStruct</code> “-Unterfelder enthalten.</td></tr>
<tr><td>Funktionen werden innerhalb von „StructArray“ nicht unterstützt.</td><td>Definieren Sie keine Feldfunktionen für „StructArray“-Felder oder deren Unterfelder.</td></tr>
</tbody>
</table>
<p>Beispiele zur Schemaerstellung finden Sie unter <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“.</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Unterstützte Datentypen für Unterfelder<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray-Unterfelder werden physisch im Array-Stil gespeichert. Die folgende Tabelle listet unterstützte und nicht unterstützte physische Typen auf.</p>
<table>
<thead>
<tr><th>Physikalischer Typ des Struct-Unterfelds</th><th>Unterstützung</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.BOOL</code> “.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.INT8</code> “, „ <code translate="no">DataType.INT16</code> “, „ <code translate="no">DataType.INT32</code> “ oder „ <code translate="no">DataType.INT64</code> “.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.FLOAT</code> “ oder „ <code translate="no">DataType.DOUBLE</code> “.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.VARCHAR</code> “ und legen Sie „ <code translate="no">max_length</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.FLOAT_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.FLOAT16_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.BFLOAT16_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.INT8_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.BINARY_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Nicht unterstützt</td><td>Sparse-Vektor-Teilfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Verwenden Sie „ <code translate="no">VARCHAR</code> “ und nicht „ <code translate="no">String</code> “.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>JSON-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Geometrie-Unterfelder und GIS-Funktionen werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Text-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Timestamptz-Unterfelder und zeitbezogene Ausdrücke werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td>Verschachtelte „ <code translate="no">Array</code> “, „ <code translate="no">ArrayOfVector</code> “, „ <code translate="no">Struct</code> “ oder <code translate="no">ArrayOfStruct</code></td><td>Nicht unterstützt</td><td>StructArray-Felder unterstützen keine verschachtelten Array-, Vektor-Array-, Struct- oder Array-of-Struct-Unterfelder.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Einschränkungen bei nullfähigen und dynamischen Schemata<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Verhalten von nullfähigen StructArrays und das dynamische Hinzufügen von StructArray-Feldern sind versionsabhängig.</p>
<table>
<thead>
<tr><th>Funktionalität</th><th>Einschränkung</th></tr>
</thead>
<tbody>
<tr><td>Nullfähiges StructArray-Feld</td><td>Wird nur in Versionen unterstützt, die nullfähige StructArrays und nullfähige Vektor-Arrays unterstützen.</td></tr>
<tr><td>Null-Wert in Python</td><td>Verwenden Sie „ <code translate="no">None</code> “, um einen Null-Wert in ein StructArray in Python einzufügen. Verwenden Sie nicht „ <code translate="no">Null</code> “ oder „ <code translate="no">null</code> “.</td></tr>
<tr><td>Gültigkeitsbereich von „null“</td><td>„Null“ gilt für das gesamte StructArray-Feld. Beispielsweise ist „ <code translate="no">chunks=None</code> “ nur dann gültig, wenn „ <code translate="no">chunks</code> “ nullfähig ist.</td></tr>
<tr><td>Teilweise null-fähige StructArray-Werte</td><td>Wenn ein StructArray-Feld einen gültigen Array-Wert enthält, dürfen Sie in demselben Wert keine null-Subfeld-Arrays mit gültigen Subfeld-Arrays mischen.</td></tr>
<tr><td>Dynamisches Hinzufügen eines StructArray-Feldes</td><td>Das Hinzufügen eines StructArray-Feldes zu einer bestehenden Sammlung wird nur in Versionen unterstützt, die die dynamische Unterstützung von StructArray-Feldern enthalten.</td></tr>
<tr><td>Null-Anforderung für dynamisches Hinzufügen</td><td>Ein StructArray-Feld, das einer bestehenden Sammlung hinzugefügt wird, muss nullfähig sein, da bestehende Entitäten noch keinen Wert für das neue Feld haben.</td></tr>
<tr><td>Vorhandene Entitäten nach dem dynamischen Hinzufügen</td><td>Bestehende Entitäten geben für das hinzugefügte StructArray-Feld in allen seinen Unterfeldern den Wert „ <code translate="no">null</code> “ zurück.</td></tr>
</tbody>
</table>
<p>In Milvus v3.0.x sind nullfähige „StructArray“-Felder, nullfähige Vektor-Arrays und das dynamische Hinzufügen von „StructArray“-Feldern verfügbar.</p>
<p>Beispiele für das Einfügen mit nullfähigen StructArray-Feldern finden Sie unter <a href="/docs/de/insert-data-into-structarray-fields.md">„Daten in StructArray-Felder einfügen</a>“.</p>
<h2 id="Insert-limits" class="common-anchor-header">Einschränkungen beim Einfügen<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Begrenzung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Form der Nutzdaten</td><td>Fügen Sie das StructArray-Feld als Array von Struct-Objekten ein, z. B. <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Namen der Unterfelder</td><td>Verwenden Sie innerhalb jedes Struct-Objekts Unterfeldnamen wie „ <code translate="no">text</code> “ und „ <code translate="no">emb</code> “, nicht Pfade wie „ <code translate="no">chunks[text]</code> “.</td></tr>
<tr><td>Schema-Übereinstimmung</td><td>Jedes Struct-Element muss dem Struct-Schema entsprechen.</td></tr>
<tr><td>Kapazität</td><td>Die Anzahl der Struct-Elemente in einer Entität darf <code translate="no">max_capacity</code> nicht überschreiten.</td></tr>
<tr><td>Vektordimensionen</td><td>Vektorwerte müssen mit den für ihre Vektor-Unterfelder konfigurierten „ <code translate="no">dim</code> “ übereinstimmen.</td></tr>
<tr><td>Duplizierung im Suchmodus</td><td>Wenn Sie sowohl die „EmbeddingList“-Suche als auch die Suche auf Elementebene benötigen, schreiben Sie Vektoren in zwei separate Vektor-Unterfelder.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Index- und Metrikbeschränkungen<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein StructArray-Vektor-Unterfeld kann entweder für die „EmbeddingList“-Suche oder für die Suche auf Elementebene indiziert werden. Dasselbe Vektor-Unterfeld kann nicht beide Metrikfamilien verwenden, da jedes Vektorfeld oder Vektor-Unterfeld nur einen Index akzeptiert.</p>
<table>
<thead>
<tr><th>Suchmodus</th><th>Metrikfamilie</th><th>Ergebnisebene</th></tr>
</thead>
<tbody>
<tr><td>„EmbeddingList“-Suche</td><td><code translate="no">MAX_SIM</code>, „ <code translate="no">MAX_SIM_COSINE</code> “, „ <code translate="no">MAX_SIM_IP</code> “, „ <code translate="no">MAX_SIM_L2</code> “ oder „binary <code translate="no">MAX_SIM_*</code> “-Metriken</td><td>Ergebnisse auf Entitätsebene.</td></tr>
<tr><td>Suche auf Elementebene</td><td>Reguläre Vektormetriken wie <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> oder <code translate="no">JACCARD</code></td><td>Ergebnisse auf Elementebene, die den Offset des gefundenen Elements enthalten können.</td></tr>
</tbody>
</table>
<p>Verwenden Sie separate Vektor-Unterfelder, wenn beide Modi erforderlich sind. Verwenden Sie beispielsweise „ <code translate="no">chunks[emb_list_vector]</code> “ für die EmbeddingList-Suche und „ <code translate="no">chunks[emb]</code> “ für die Suche auf Elementebene.</p>
<p>StructArray-Vektor-Unterfelder zählen bei der Planung Ihres Sammlungsschemas als Vektor-Unterfelder. Halten Sie die Gesamtzahl der Vektorfelder und Vektor-Unterfelder innerhalb der Grenzen Ihrer Zielversion und Ihrer Service-Stufe.</p>
<p>Informationen zu den unterstützten Matrix-Index- und Metriktypen finden Sie unter <a href="/docs/de/index-structarray-fields.md">„Index-StructArray-Felder</a>“.</p>
<h2 id="Search-limits" class="common-anchor-header">Suchbeschränkungen<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Suchverhalten</th><th>Unterstützung und Einschränkungen</th></tr>
</thead>
<tbody>
<tr><td>Grundlegende „EmbeddingList“-Suche</td><td>Unterstützt für StructArray-Vektor-Unterfelder, die mit „ <code translate="no">MAX_SIM*</code> “-Metriken indiziert sind. Liefert Ergebnisse auf Entitätsebene.</td></tr>
<tr><td>Einfache Suche auf Elementebene</td><td>Wird für StructArray-Vektor-Teilfelder unterstützt, die mit regulären Vektormetriken indiziert sind. Kann Offsets der übereinstimmenden Elemente zurückgeben.</td></tr>
<tr><td>Bereichssuche</td><td>Wird je nach Suchmodus und der Unterstützung von Indizes/Metriken durch die Zielversion unterstützt. Für das Verhalten bei der hybriden Bereichssuche bei StructArray-Anfragen auf Elementebene überprüfen Sie bitte Ihre Zielversion.</td></tr>
<tr><td>Gruppierte Suche</td><td>Die gruppierte Suche auf Elementebene kann Offsets zurückgeben. Das Verhalten der hybriden Gruppensuche bei StructArray-Anfragen auf Elementebene ist versionsabhängig.</td></tr>
<tr><td>Hybride Suche</td><td>Eine hybride Suchanfrage kann nur dann StructArray-Vektor-Teilfeldanfragen enthalten, wenn die Zielversion diese Suchkombination unterstützt. Jede Anfrage folgt weiterhin der Metrikfamilie des indizierten Vektor-Teilfelds.</td></tr>
<tr><td>Offset-Ausgabe</td><td>Offsets sind für Suchergebnisse auf Elementebene verfügbar. Die EmbeddingList-Suche liefert Ergebnisse auf Entitätsebene und verwendet keine Element-Offsets als primäre Ergebniseinheit.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Filter- und Operatorbeschränkungen<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Die skalare Filterung von StructArray wird durch StructArray-Operatoren wie „ <code translate="no">element_filter</code> “ und die „ <code translate="no">MATCH_*</code> “-Familie abgewickelt. Die detaillierte Matrix zur Prädikatsunterstützung ist unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren“</a> zu finden.</p>
<p>Allgemein gilt:</p>
<ul>
<li><p>Verwenden Sie „ <code translate="no">$[subfield]</code> “ ausschließlich innerhalb von StructArray-Operatoren.</p></li>
<li><p>Verwenden Sie skalare Unterfelder für skalare Prädikate.</p></li>
<li><p>Verwenden Sie keine Vektor-Teilfelder als Eingaben für skalare Prädikate von „ <code translate="no">$[...]</code> “.</p></li>
<li><p>JSON-Path-Syntax, JSON-Funktionen, Array-Container-Funktionen, Textabgleichsfunktionen, Geometrie-/GIS-Funktionen und Timestamptz-Ausdrücke werden für Prädikate auf StructArray-Ebene nicht unterstützt.</p></li>
<li><p>Verwenden Sie vorzugsweise explizite boolesche Vergleiche wie „ <code translate="no">$[has_code] == true</code> “ anstelle von einfachen booleschen Ausdrücken.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Verwandte Seiten<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Informationen zum Erstellen eines StructArray-Feldes finden Sie unter <a href="/docs/de/create-structarray-field.md">„StructArray-Feld erstellen</a>“.</p></li>
<li><p>Informationen zum Einfügen von Daten finden Sie unter <a href="/docs/de/insert-data-into-structarray-fields.md">„Daten in StructArray-Felder einfügen</a>“.</p></li>
<li><p>Informationen zum Erstellen von Vektor- und Skalarindizes finden Sie unter <a href="/docs/de/index-structarray-fields.md">„StructArray-Felder indizieren</a>“.</p></li>
<li><p>Informationen zur StructArray-Filtersyntax finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p></li>
</ol>
