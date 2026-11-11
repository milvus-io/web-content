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
<p>Die meisten StructArray-Einschränkungen ergeben sich aus einer der folgenden drei Quellen: dem StructArray-Schemamodell, dem von Ihnen für Vektor-Unterfelder gewählten Suchmodus und der Milvus-Version, auf der Ihre Sammlung läuft.</p>
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
    </button></h2><p>Die wichtigsten StructArray-Einschränkungen sind:</p>
<table>
<thead>
<tr><th>Bereich</th><th>Einschränkung</th></tr>
</thead>
<tbody>
<tr><td>Schemaform</td><td>Ein Struct kann nur als Elementtyp eines Array-Feldes verwendet werden. Struct wird nicht als Sammlungsfeld auf oberster Ebene unterstützt.</td></tr>
<tr><td>Schema der Unterfelder</td><td>Alle Struct-Elemente im selben StructArray-Feld teilen sich ein vordefiniertes Struct-Schema.</td></tr>
<tr><td>Verschachtelte Unterfelder</td><td>Ab Milvus 3.0.6 kann ein „Struct“ skalare „ <code translate="no">ARRAY</code> “-Unterfelder mit einer Verschachtelungsebene enthalten. Verschachtelte „ <code translate="no">Struct</code> “- und „ <code translate="no">ArrayOfStruct</code> “-Unterfelder sowie JSON-Unterfelder werden in keiner Version unterstützt.</td></tr>
<tr><td>Die Kapazität</td><td><code translate="no">max_capacity</code> ist erforderlich und begrenzt die Anzahl der Struct-Elemente, die eine Entität im Feld „StructArray“ speichern kann.</td></tr>
<tr><td>Änderungen an Unterfeldern</td><td>Ab Milvus 3.0.6 können Sie einem bestehenden „StructArray“-Feld ein Unterfeld mit der Eigenschaft „element-nullable“ hinzufügen oder ein Unterfeld daraus entfernen. In früheren Versionen muss das gesamte „StructArray“-Feld entfernt und erneut hinzugefügt werden.</td></tr>
<tr><td>Unterfeldpfad</td><td>Verwenden Sie „ <code translate="no">structArray[subfield]</code> “-Pfade wie beispielsweise <code translate="no">chunks[emb]</code> für Indizes, Suchziele, Ausgabefelder und Filter. Verwenden Sie nicht <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Form einfügen</td><td>Fügen Sie ein StructArray-Feld als Array von Objekten ein. Verwenden Sie innerhalb von Einfüge-Payloads keine Pfadsyntax.</td></tr>
<tr><td>Vektorindizes</td><td>Ein Vektorfeld oder Vektor-Unterfeld akzeptiert nur einen Index. Verwenden Sie separate Vektor-Unterfelder für die „EmbeddingList“-Suche und die Suche auf Elementebene.</td></tr>
<tr><td>Funktionen</td><td>Feldfunktionen werden für Felder oder Unterfelder innerhalb eines StructArray-Feldes nicht unterstützt.</td></tr>
<tr><td>Nullfähige Felder</td><td>Nullfähige StructArray-Felder sind versionsabhängig. Ein Nullwert auf Zeilenebene gilt für das gesamte StructArray-Feld. Ab Milvus 3.0.6 kann ein Unterfeld zusätzlich einen Nullwert in einem einzelnen Struct-Element zulassen: „ <code translate="no">nullable=True</code> “ für ein Skalar- oder Vektor-Unterfeld, „ <code translate="no">element_nullable=True</code> “ für ein Array-Unterfeld. Ein Struct-Element selbst kann nicht null sein.</td></tr>
<tr><td>Dynamisches Hinzufügen eines Feldes</td><td>Das Hinzufügen eines StructArray-Feldes zu einer bestehenden Sammlung ist versionsabhängig und setzt voraus, dass das hinzugefügte Feld nullfähig ist.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Schema-Beschränkungen<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray-Schemas unterliegen folgenden Einschränkungen:</p>
<table>
<thead>
<tr><th>Beschränkung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>„Struct“ ist kein Feldtyp auf oberster Ebene.</td><td>Erstellen Sie ein StructArray-Feld als „ <code translate="no">datatype=DataType.ARRAY</code> “ mit „ <code translate="no">element_type=DataType.STRUCT</code> “ und „ <code translate="no">struct_schema</code> “.</td></tr>
<tr><td>Alle Elemente teilen sich ein gemeinsames Schema.</td><td>Jedes „Struct“-Element in einem „StructArray“-Feld folgt derselben Unterfeldliste und denselben Unterfelddatentypen.</td></tr>
<tr><td><code translate="no">max_capacity</code> ist erforderlich.</td><td>Die Anzahl der Struct-Elemente in einer Entität darf die für das StructArray-Feld konfigurierte „ <code translate="no">max_capacity</code> “ nicht überschreiten.</td></tr>
<tr><td>Skalare „ <code translate="no">ARRAY</code> “-Unterfelder haben pro Unterfeld „ <code translate="no">max_capacity</code> “.</td><td>Ein skalares „ <code translate="no">ARRAY</code> “-Unterfeld deklariert eine „ <code translate="no">max_capacity</code> “ für sein inneres Array, und Milvus lehnt ein Struct-Element ab, dessen inneres Array die für dieses Unterfeld deklarierte Kapazität überschreitet. Die Werte müssen nicht über alle Unterfelder hinweg übereinstimmen. Der Wert muss größer als 0 sein und darf „ <code translate="no">proxy.maxArrayCapacity</code> “ nicht überschreiten, dessen Standardwert 4096 ist.</td></tr>
<tr><td>Unterfelder können sich in Milvus 3.0.6 und höher weiterentwickeln.</td><td>Fügen Sie ein nullfähiges Unterfeld hinzu oder entfernen Sie ein Unterfeld anhand seines Pfads, z. B. „ <code translate="no">chunks[lang]</code> “. Sie können nicht das letzte Unterfeld eines „StructArray“-Feldes, das letzte Vektorfeld der Sammlung oder ein von einer Funktion verwendetes Unterfeld entfernen. In früheren Versionen müssen Sie das „StructArray“-Feld entfernen und es mit dem aktualisierten Schema erneut hinzufügen.</td></tr>
<tr><td>Verschachtelte „Struct“-Elemente werden nicht unterstützt.</td><td>Eine „Struct“ darf keine verschachtelten „ <code translate="no">Struct</code> “, „ <code translate="no">ArrayOfStruct</code> “ oder JSON-Unterfelder enthalten. Ab Milvus 3.0.6 kann eine „Struct“ skalare „ <code translate="no">ARRAY</code> “-Unterfelder mit einer Verschachtelungsebene enthalten. Ein „ <code translate="no">ARRAY</code> “-Unterfeld darf keine Vektoren enthalten.</td></tr>
<tr><td>Funktionen werden innerhalb von „StructArray“ nicht unterstützt.</td><td>Definieren Sie keine Feldfunktionen für StructArray-Felder oder deren Unterfelder.</td></tr>
<tr><td>Feldeigenschaften sind bei StructArray-Feldern eingeschränkt.</td><td>Ab Milvus 3.0.6 akzeptiert „ <code translate="no">alter_collection_field()</code> “ für ein StructArray-Feld oder einen Unterfeldpfad nur „ <code translate="no">mmap.enabled</code> “, „ <code translate="no">field.description</code> “ und „ <code translate="no">warmup</code> “. Andere Eigenschaften wie „ <code translate="no">max_capacity</code> “ und „ <code translate="no">max_length</code> “ werden abgelehnt.</td></tr>
<tr><td>Die Textanalyse wird für Unterfelder nicht unterstützt.</td><td>Die Einstellung „ <code translate="no">enable_match</code> “ oder „ <code translate="no">enable_analyzer</code> “ für ein Struct-Unterfeld wird abgelehnt. Textindizes werden nur für Felder der obersten Ebene erstellt.</td></tr>
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
    </button></h2><p>„StructArray“-Unterfelder werden physisch im Array-Stil gespeichert. Die folgende Tabelle listet unterstützte und nicht unterstützte physische Typen auf:</p>
<table>
<thead>
<tr><th>Physikalischer Typ eines Struct-Unterfelds</th><th>Unterstützung</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.BOOL</code> “.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.INT8</code> “, „ <code translate="no">DataType.INT16</code> “, „ <code translate="no">DataType.INT32</code> “ oder „ <code translate="no">DataType.INT64</code> “.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.FLOAT</code> “ oder „ <code translate="no">DataType.DOUBLE</code> “.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.VARCHAR</code> “ und legen Sie „ <code translate="no">max_length</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.FLOAT_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.FLOAT16_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.BFLOAT16_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.INT8_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Unterstützt</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.BINARY_VECTOR</code> “ und legen Sie „ <code translate="no">dim</code> “ fest.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Nicht unterstützt</td><td>Sparse-Vektor-Teilfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Nicht unterstützt</td><td>Verwenden Sie „ <code translate="no">VARCHAR</code> “ und nicht „ <code translate="no">String</code> “.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Nicht unterstützt</td><td>JSON-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Nicht unterstützt</td><td>Geometrie-Unterfelder und GIS-Funktionen werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Nicht unterstützt</td><td>Text-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Nicht unterstützt</td><td>Timestamptz-Unterfelder und zeitbezogene Ausdrücke werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Unterstützt ab Milvus 3.0.6</td><td>Definieren Sie das Unterfeld als „ <code translate="no">DataType.ARRAY</code> “ mit einem skalaren „ <code translate="no">element_type</code> “ und einem „ <code translate="no">max_capacity</code> “ für das innere Array. Jedes Struct-Element enthält dann ein inneres Array. Setzen Sie „ <code translate="no">nullable=True</code> “ für das Unterfeld, um ein nullwertiges inneres Array zuzulassen, und „ <code translate="no">element_nullable=True</code> “, um Nullwerte darin zuzulassen.</td></tr>
<tr><td><code translate="no">Array</code> von „ <code translate="no">Array</code> “ von „ <code translate="no">Array</code> “, „ <code translate="no">Array</code> “ von Vektoren, „ <code translate="no">Struct</code> “ oder <code translate="no">ArrayOfStruct</code></td><td>Nicht unterstützt</td><td>Die Verschachtelung von Arrays innerhalb einer Struktur ist auf eine Ebene beschränkt, das innere Array darf keine Vektoren enthalten, und verschachtelte Struktur- oder Array-of-Struct-Unterfelder werden nicht unterstützt.</td></tr>
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
    </button></h2><p>Die folgende Tabelle beschreibt das Verhalten von nullfähigen StructArrays und das dynamische Hinzufügen von StructArray-Feldern, vorbehaltlich der nachstehenden Verfügbarkeitserklärung:</p>
<table>
<thead>
<tr><th>Funktionalität</th><th>Einschränkung</th></tr>
</thead>
<tbody>
<tr><td>Nullfähiges StructArray-Feld</td><td>Vorbehaltlich der nachstehenden Verfügbarkeitserklärung setzen Sie „ <code translate="no">nullable=True</code> “ für das übergeordnete StructArray; konfigurieren Sie Struct-Unterfelder nicht separat als nullfähig.</td></tr>
<tr><td>NULL-Wert in Python</td><td>Verwenden Sie „ <code translate="no">None</code> “, um einen null-Wert für ein StructArray in Python einzufügen. Verwenden Sie nicht „ <code translate="no">Null</code> “ oder „ <code translate="no">null</code> “.</td></tr>
<tr><td>Gültigkeitsbereich von „NULL“</td><td>NULL gilt für das gesamte StructArray-Feld. Beispielsweise ist „ <code translate="no">chunks=None</code> “ nur gültig, wenn „ <code translate="no">chunks</code> “ nullfähig ist.</td></tr>
<tr><td>Teilweise null-fähige StructArray-Werte</td><td>Wenn ein StructArray-Feld einen gültigen Array-Wert enthält, dürfen Sie in demselben Wert keine null-Subfeld-Arrays mit gültigen Subfeld-Arrays mischen.</td></tr>
<tr><td>Null auf Elementebene</td><td>Unterstützt ab Milvus 3.0.6. Ein Skalar-, Vektor- oder „ <code translate="no">ARRAY</code> “-Unterfeld kann einen Nullwert in einzelnen Struct-Elementen zulassen: „ <code translate="no">nullable=True</code> “ für ein Skalar- oder Vektor-Unterfeld, „ <code translate="no">element_nullable=True</code> “ für ein „ <code translate="no">ARRAY</code> “-Unterfeld. Die Einstellung „ <code translate="no">nullable</code> “ auf Zeilenebene wird weiterhin vom übergeordneten StructArray übernommen; die Einstellung „ <code translate="no">nullable=True</code> “ für ein Unterfeld aktiviert Null auf Elementebene, nicht auf Zeilenebene.</td></tr>
<tr><td>Null-Struct-Element</td><td>Ein Struct-Element selbst kann nicht null sein, wie z. B. ` <code translate="no">[null, {...}]</code>`. Setzen Sie stattdessen die Unterfeldwerte des Elements auf null.</td></tr>
<tr><td>Ausgelassene Unterfelder</td><td>Ab Milvus 3.0.6 können Sie ein auf Null setzbares Unterfeld aus einem Struct-Element weglassen, und Milvus speichert dafür den Wert „null“. Ein Unterfeld, das nicht auf Null gesetzt werden kann, muss in jedem Struct-Element vorhanden sein. In früheren Versionen musste jedes Struct-Element jedes Unterfeld bereitstellen.</td></tr>
<tr><td>Dynamisches Hinzufügen eines StructArray-Feldes</td><td>Vorbehaltlich der nachstehenden Verfügbarkeitserklärung.</td></tr>
<tr><td>Nullbarkeitsanforderung für dynamisches Hinzufügen</td><td>Ein StructArray-Feld, das einer bestehenden Sammlung hinzugefügt wird, muss nullfähig sein, da bestehende Entitäten keinen Wert für das neue Feld haben.</td></tr>
<tr><td>Bestehende Entitäten nach dem dynamischen Hinzufügen</td><td>Bestehende Entitäten geben für das hinzugefügte StructArray-Feld „ <code translate="no">null</code> “ zurück.</td></tr>
<tr><td>Dynamisches Hinzufügen von Unterfeldern</td><td>Unterstützt ab Milvus 3.0.6. Ein hinzugefügtes Unterfeld muss mit „ <code translate="no">nullable=True</code> “ angelegt werden; ein hinzugefügtes „ <code translate="no">ARRAY</code> “-Unterfeld akzeptiert zusätzlich „ <code translate="no">element_nullable=True</code> “ für Nullwerte innerhalb des inneren Arrays. Vorhandene Entitäten geben für das neue Unterfeld in jedem ihrer „Struct“-Elemente den Wert „null“ zurück, und Entitäten, deren „StructArray“-Feld null ist, bleiben null.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 und spätere Versionen unterstützen nullfähige „StructArray“-Felder, nullfähige Vektor-Arrays und das dynamische Hinzufügen von „StructArray“-Feldern sowohl in Standalone- als auch in verteilten Bereitstellungen. Frühere Milvus-Versionen unterstützen diese Funktionen nicht.</p>
<p>Milvus 3.0.6 und spätere Versionen unterstützen zusätzlich Nullwerte auf Elementebene, skalare „ <code translate="no">ARRAY</code> “-Unterfelder sowie das Hinzufügen oder Entfernen von Unterfeldern eines bestehenden „StructArray“-Feldes. Diese Funktionen erfordern Storage V2 und sind in externen Sammlungen nicht verfügbar.</p>
<p>In der Zilliz Cloud sind diese Funktionen auf On-Demand-Clustern verfügbar, auf denen Milvus 3.0.0 oder höher ausgeführt wird. Serving-Cluster unterstützen sie nicht.</p>
<p>Beispiele für das Einfügen von Daten in StructArray-Felder, die Nullwerte zulassen, finden Sie unter <a href="/docs/de/insert-data-into-structarray-fields.md">„Daten in StructArray-Felder einfügen</a>“.</p>
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
    </button></h2><p>Für StructArray-Einfüge-Payloads gelten die folgenden Beschränkungen:</p>
<table>
<thead>
<tr><th>Beschränkung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Form der Nutzdaten</td><td>Fügen Sie das StructArray-Feld als Array von Struct-Objekten ein, z. B. ` <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>`.</td></tr>
<tr><td>Namen der Unterfelder</td><td>Verwenden Sie innerhalb jedes Struct-Objekts Unterfeldnamen wie „ <code translate="no">text</code> “ und „ <code translate="no">emb</code> “, nicht Pfade wie „ <code translate="no">chunks[text]</code> “.</td></tr>
<tr><td>Schema-Übereinstimmung</td><td>Jedes Struct-Element muss dem Struct-Schema entsprechen. Ab Milvus 3.0.6 kann ein nullfähiges Unterfeld in einem Struct-Element weggelassen oder auf „ <code translate="no">null</code> “ gesetzt werden.</td></tr>
<tr><td>Kapazität</td><td>Die Anzahl der Struct-Elemente in einer Entität darf „ <code translate="no">max_capacity</code> “ nicht überschreiten.</td></tr>
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
    </button></h2><p>Ein StructArray-Vektor-Unterfeld kann entweder für die „EmbeddingList“-Suche oder für die Suche auf Elementebene indiziert werden. Dasselbe Vektor-Unterfeld kann nicht beide Metrikfamilien verwenden, da jedes Vektorfeld oder Vektor-Unterfeld nur einen Index akzeptiert. Die Suchmodi verwenden die folgenden Metrikfamilien:</p>
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
<p>Vektor-Unterfelder von „StructArray“ werden als Vektorfelder auf die Begrenzung auf Sammlungsebene angerechnet <code translate="no">proxy.maxVectorFieldNum</code>, deren Standardwert 10 beträgt. Ein „StructArray“-Feld, dessen Vektor-Unterfelder die einzigen Vektorfelder der Sammlung sind, ist gültig, und das Entfernen eines solchen Feldes wird abgelehnt, wenn die Sammlung dadurch kein Vektorfeld mehr hätte. Halten Sie die Gesamtzahl der Vektorfelder und Vektorunterfelder innerhalb der Grenzen Ihrer Zielversion und Ihrer Service-Stufe ein.</p>
<p>Ab Milvus 3.0.6 unterstützt ein Vektor-Unterfeld mit nullfähigen Elementen nur die Suche auf Elementebene mit regulären Vektormetriken. „ <code translate="no">MAX_SIM*</code> “-Metriken, „EmbeddingList“-Indizes und die „EmbeddingList“-Suche werden bei Vektor-Unterfeldern mit nullfähigen Elementen abgelehnt, und „ <code translate="no">AUTOINDEX</code> “ wählt für diese keine „ <code translate="no">MAX_SIM*</code> “-Metrik aus. Null-Vektoren werden bei der Suche nicht berücksichtigt. Skalare Indizes werden bei element-nullfähigen Unterfeldern oder bei skalaren „ <code translate="no">ARRAY</code> “-Unterfeldern nicht unterstützt.</p>
<p>Informationen zur Matrix aus unterstützten Index- und Metriktypen finden Sie unter <a href="/docs/de/index-structarray-fields.md">„Index-StructArray-Felder</a>“.</p>
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
    </button></h2><p>Das Suchverhalten von StructArray unterliegt folgenden Einschränkungen:</p>
<table>
<thead>
<tr><th>Suchverhalten</th><th>Unterstützung und Einschränkungen</th></tr>
</thead>
<tbody>
<tr><td>Grundlegende EmbeddingList-Suche</td><td>Wird für StructArray-Vektor-Teilfelder unterstützt, die mit „ <code translate="no">MAX_SIM*</code> “-Metriken indiziert sind. Liefert Ergebnisse auf Entitätsebene.</td></tr>
<tr><td>Einfache Suche auf Elementebene</td><td>Wird für StructArray-Vektor-Teilfelder unterstützt, die mit regulären Vektormetriken indiziert sind. Kann Offsets der übereinstimmenden Elemente zurückgeben.</td></tr>
<tr><td>Bereichssuche</td><td>Wird je nach Suchmodus und Index-/Metrikunterstützung der Zielversion unterstützt. Für das Verhalten bei der hybriden Bereichssuche bei StructArray-Anfragen auf Elementebene überprüfen Sie bitte Ihre Zielversion.</td></tr>
<tr><td>Gruppierte Suche</td><td>Die gruppierte Suche auf Elementebene kann Offsets zurückgeben. Das Verhalten der hybriden Gruppierungssuche bei StructArray-Anfragen auf Elementebene ist versionsabhängig.</td></tr>
<tr><td>Hybride Suche</td><td>Eine hybride Suchanfrage kann nur dann StructArray-Vektor-Unterfeldanfragen enthalten, wenn die Zielversion diese Suchkombination unterstützt. Jede Anfrage folgt weiterhin der Metrikfamilie des indizierten Vektor-Unterfelds.</td></tr>
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
    </button></h2><p>Die skalare Filterung von StructArray wird durch StructArray-Operatoren wie „ <code translate="no">element_filter</code> “ und die „ <code translate="no">MATCH_*</code> “-Familie abgewickelt. Die detaillierte Matrix zur Prädikatunterstützung ist unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren“</a> zu finden.</p>
<p>Auf hoher Ebene gilt:</p>
<ul>
<li><p>Verwenden Sie „ <code translate="no">$[subfield]</code> “ ausschließlich innerhalb von StructArray-Operatoren.</p></li>
<li><p>Filterausdrücke auf Zeilenebene können auch direkt auf StructArray-Pfade verweisen: „ <code translate="no">chunks[0][section]</code> “ für eine Elementposition, „ <code translate="no">array_length(chunks)</code> “ für die Elementanzahl, „ <code translate="no">array_contains(chunks[section], ...)</code> “ für Unterfeldwerte über mehrere Elemente hinweg und „ <code translate="no">chunks is null</code> “ für ein nullfähiges StructArray-Feld.</p></li>
<li><p>Verwenden Sie skalare Unterfelder für skalare Prädikate.</p></li>
<li><p>Verwenden Sie keine Vektor-Unterfelder als Eingaben für skalare Prädikate vom Typ „ <code translate="no">$[...]</code> “.</p></li>
</ul>
<ul>
<li>JSON-Path-Syntax, JSON-Funktionen, Textabgleichsfunktionen, Geometrie-/GIS-Funktionen und Timestamptz-Ausdrücke werden für Prädikate auf StructArray-Ebene nicht unterstützt. Ab Milvus 3.0.6 werden „ <code translate="no">array_contains</code> “, „ <code translate="no">array_contains_any</code> “, „ <code translate="no">array_contains_all</code> “ und „ <code translate="no">array_length</code> “ auf „ <code translate="no">$[subfield]</code> “ für skalare „ <code translate="no">ARRAY</code> “-Unterfelder unterstützt, und „ <code translate="no">$[subfield] is null</code> “ / „ <code translate="no">is not null</code> “ wird für jeden Unterfeldtyp unterstützt.</li>
</ul>
<ul>
<li>Ab Milvus 3.0.6 führt ein Nullwert in einem Unterfeld eines Struct-Elements dazu, dass das Elementprädikat als „unkannt“ statt als „falsch“ gewertet wird. „ <code translate="no">element_filter</code> “ behält nur Elemente bei, deren Prädikat wahr ist, während „ <code translate="no">MATCH_*</code> “ ein unbekanntes Element als Fehltreffer zählt. Weitere Informationen finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</li>
</ul>
<ul>
<li>Verwenden Sie vorzugsweise explizite boolesche Vergleiche wie „ <code translate="no">$[has_code] == true</code> “ anstelle von einfachen booleschen Ausdrücken.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Import- und Speicherbeschränkungen<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Quelldateiformate</td><td>JSON-, JSONL-, CSV- und Parquet-Dateien können StructArray-Felder enthalten. NumPy-Dateien enthalten eine Datei pro Feld der obersten Ebene und können keine StructArray-Daten bereitstellen; verwenden Sie JSON-, CSV- oder Parquet-Dateien für Sammlungen, die ein StructArray-Feld enthalten. Informationen zu Dateiformaten finden Sie unter <a href="/docs/de/prepare-source-data.md#StructArray-fields-in-source-files">„Quelldaten vorbereiten</a>“.</td></tr>
<tr><td>Speicherformat</td><td><code translate="no">ARRAY</code> Unterfelder mit nullfähigen Elementen und skalare „ <code translate="no">ARRAY</code> “-Unterfelder erfordern „Storage V2“. „Storage V1“ ist für Sammlungen, die diese Unterfelder verwenden, nicht erreichbar: Das Erstellen der Sammlung und das Einfügen von Daten scheinen zwar erfolgreich zu verlaufen, doch beim Flush scheitern die Daten, was kein unterstützter Zustand ist. Storage V3 mit der Einstellung „ <code translate="no">common.storage.enableGrowingSourceFlush</code> “ auf „ <code translate="no">true</code> “ lehnt Anfragen ab, die auf Null-fähige Unterfelder oder skalare „ “-Unterfelder zurückgreifen.</td></tr>
<tr><td>Externe Sammlungen</td><td><code translate="no">ARRAY</code> Nullfähige Unterfelder und skalare „ “-Unterfelder werden in externen Sammlungen nicht unterstützt.</td></tr>
<tr><td>Import von Backups und Snapshots</td><td><code translate="no">ARRAY</code> Der Binlog-Import, z. B. bei der Wiederherstellung eines Backups, sowie der Import aus einer Snapshot-Quelle werden für Sammlungen abgelehnt, die auf Null setzbare Unterfelder oder skalare -Unterfelder enthalten.</td></tr>
<tr><td>Downgrade</td><td>Sammlungen mit nullfähigen Unterfeldern oder skalaren „ <code translate="no">ARRAY</code> “-Unterfeldern können nicht auf einer Version vor Milvus 3.0.6 ausgeführt werden. Das Wiedergeben des Write-Ahead-Logs auf der älteren Version führt zu einem Systemabsturz. Durch ein erneutes Upgrade auf Milvus 3.0.6 oder höher werden die Daten wiederhergestellt.</td></tr>
</tbody>
</table>
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
<li><p>Informationen zum Erstellen eines StructArray-Feldes finden Sie unter <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“.</p></li>
<li><p>Informationen zum Einfügen von Daten finden Sie unter <a href="/docs/de/insert-data-into-structarray-fields.md">„Daten in StructArray-Felder einfügen</a>“.</p></li>
<li><p>Informationen zum Erstellen von Vektor- und Skalarindizes finden Sie unter <a href="/docs/de/index-structarray-fields.md">„StructArray-Felder indizieren</a>“.</p></li>
<li><p>Informationen zur StructArray-Filtersyntax finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p></li>
</ol>
