---
id: create-structarray-field.md
title: Ein StructArray-Feld erstellen
summary: >-
  Erstellen Sie ein StructArray-Feld, wenn eine Entität eine geordnete Liste
  strukturierter Elemente enthalten soll. Ein StructArray-Feld ist ein
  Array-Feld, dessen Elementtyp „Struct“ ist. Jedes Struct-Element folgt
  demselben Schema und kann skalare Unterfelder, Vektor-Unterfelder oder beides
  enthalten.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Ein StructArray-Feld erstellen<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Erstellen Sie ein StructArray-Feld, wenn eine Entität eine geordnete Liste strukturierter Elemente enthalten soll. Ein StructArray-Feld ist ein Array-Feld, dessen Elementtyp „Struct“ ist. Jedes Struct-Element folgt demselben Schema und kann skalare Unterfelder, Vektor-Unterfelder oder beides enthalten.</p>
<p>Auf dieser Seite erfahren Sie, wie Sie ein Struct-Schema definieren, es als StructArray-Feld hinzufügen, Unterfelder für die spätere Suche und Filterung auswählen und die geltenden Schemaregeln verstehen, bevor Sie Daten einfügen oder indizieren.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Auf dieser Seite wird eine Sammlung namens „ <code translate="no">tech_articles</code> “ verwendet. Jede Entität repräsentiert einen technischen Artikel, und das Feld „ <code translate="no">chunks</code> “ speichert Daten auf Chunk-Ebene als Struct-Elemente.</p>
<table>
<thead>
<tr><th>Feld</th><th>Typ</th><th>Zweck</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Primärschlüssel für den Artikel.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Artikeltitel.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Kategorie auf Artikelebene.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vektorfeld auf Artikelebene, das später in Beispielen zur hybriden Suche verwendet wird.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>„StructArray“-Feld, das Text auf Chunk-Ebene, Metadaten und Einbettungen speichert.</td></tr>
</tbody>
</table>
<p>Das StructArray-Feld „ <code translate="no">chunks</code> “ enthält die folgenden Unterfelder.</p>
<table>
<thead>
<tr><th>Unterfeld</th><th>Typ</th><th>Zweck</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Chunk-Text.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Abschnittsname, z. B. „ <code translate="no">index</code> “, „ <code translate="no">search</code> “ oder „ <code translate="no">filter</code> “.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Seitennummer oder logische Position des Abschnitts.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Bewertung auf Chunk-Ebene, die in den Beispielen zur skalaren Filterung und zum Bereich verwendet wird.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Angabe, ob der Textabschnitt Code enthält.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vektor-Unterfeld für die EmbeddingList-Suche mit „ <code translate="no">MAX_SIM*</code> “-Metriken.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vektor-Unterfeld für die Suche auf Elementebene mit regulären Vektormetriken.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Ein Vektorfeld oder Vektor-Unterfeld akzeptiert nur einen Index. Wenn Sie sowohl die „EmbeddingList“-Suche als auch die Suche auf Elementebene benötigen, definieren Sie zwei separate Vektor-Unterfelder. In diesem Beispiel dient „ <code translate="no">chunks[emb_list_vector]</code> “ der „EmbeddingList“-Suche und „ <code translate="no">chunks[emb]</code> “ der Suche auf Elementebene.</p>
</div>
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
    </button></h2><p>Ein „StructArray“-Feld speichert für jedes „Struct“-Unterfeld einen Array-Wert. Wenn Sie ein „Struct“-Schema definieren, wählen Sie die Unterfeldtypen aus den unterstützten Skalar- und Vektorfamilien aus.</p>
<table>
<thead>
<tr><th>Physikalischer Typ eines Struct-Unterfelds</th><th>Unterstützung</th><th>Hinweise</th></tr>
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
<tr><td><code translate="no">ArrayOfVector</code></td><td>Nicht unterstützt</td><td>Sparse-Vektor-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Verwenden Sie „ <code translate="no">VARCHAR</code> “ und nicht „ <code translate="no">String</code> “.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>JSON-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Geometrie-Unterfelder und GIS-Funktionen werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Text-Unterfelder werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Nicht unterstützt</td><td>Timestamptz-Unterfelder und zeitbezogene Ausdrücke werden in StructArray-Feldern nicht unterstützt.</td></tr>
<tr><td>Verschachtelte „ <code translate="no">Array</code> “, „ <code translate="no">ArrayOfVector</code> “, „ <code translate="no">Struct</code> “ oder <code translate="no">ArrayOfStruct</code></td><td>Nicht unterstützt</td><td>Ein StructArray-Feld darf keine verschachtelten Arrays, verschachtelten Vektor-Arrays, verschachtelten Struct-Felder oder verschachtelten Array-of-Struct-Felder enthalten.</td></tr>
</tbody>
</table>
<p>Informationen zur versionsspezifischen Unterstützung, zum Verhalten bei nullfähigen Werten und zu weiteren Einschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Einschränkungen</a>“.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Erstellen einer Sammlung mit einem StructArray-Feld<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Um ein StructArray-Feld zu erstellen, definieren Sie zunächst das Struct-Schema, das von jedem Element verwendet wird. Fügen Sie anschließend ein Array-Feld hinzu und legen Sie dessen Elementtyp auf „Struct“ fest.</p>
<ol>
<li><p>Erstellen Sie das Sammlungsschema.</p></li>
<li><p>Fügen Sie Felder auf Sammlungsebene hinzu, z. B. den Primärschlüssel und Felder auf Artikelebene.</p></li>
<li><p>Erstellen Sie ein „Struct“-Schema für die im „StructArray“-Feld gespeicherten Elemente.</p></li>
<li><p>Fügen Sie dem „Struct“-Schema Skalar- und Vektor-Unterfelder hinzu.</p></li>
<li><p>Fügen Sie ein Array-Feld mit der Eigenschaft „ <code translate="no">element_type=DataType.STRUCT</code> “ hinzu.</p></li>
<li><p>Legen Sie „ <code translate="no">struct_schema</code> “ auf das „Struct“-Schema fest.</p></li>
<li><p>Legen Sie „ <code translate="no">max_capacity</code> “ fest, um zu begrenzen, wie viele „Struct“-Elemente jede Entität in dem Feld speichern kann.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">StructArray-Feldpfade verstehen<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie ein „StructArray“-Feld erstellt haben, verweisen Sie mit der „ <code translate="no">structArray[subfield]</code> “-Pfadsyntax auf dessen Unterfelder. Verwenden Sie diese Syntax, wenn Sie Indizes erstellen, Vektor-Unterfelder durchsuchen, Unterfelder ausgeben oder skalare Filter erstellen.</p>
<table>
<thead>
<tr><th>Pfad</th><th>Bedeutung</th><th>Häufige Verwendung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>Das Unterfeld „ <code translate="no">text</code> “ innerhalb jedes Struct-Elements.</td><td>Ausgabefeld oder skalare Filterung.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>Die Abschnittsbezeichnung für jeden Chunk.</td><td>Skalare Filterung.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>Der Qualitätswert auf Chunk-Ebene.</td><td>Skalare Filterung oder skalarer Index.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>Das Vektor-Teilfeld, das als Einbettungsliste verwendet wird.</td><td>Suche in der Einbettungsliste mit „ <code translate="no">MAX_SIM*</code> “.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>Das Vektor-Teilfeld, das von jedem Struct-Element unabhängig verwendet wird.</td><td>Vektorsuche auf Elementebene.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Ein StructArray-Feld als nullfähig definieren<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x unterstützt nullfähige StructArray-Felder. Ein nullfähiges StructArray-Feld ermöglicht es einer Entität, für das gesamte StructArray-Feld „ <code translate="no">null</code> “ zu speichern.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Warnung
Nullfähige StructArray-Felder sind nur in Milvus v3.0.x verfügbar. Bei einem nullfähigen StructArray-Feld kann eine Entität entweder einen gültigen StructArray-Wert angeben oder das gesamte Feld auf „ <code translate="no">null</code> “ setzen. Beim Einfügen eines gültigen StructArray-Werts sollten alle Unterfelder entweder null sein oder gültige Werte aufweisen. Das Einfügen einer Entität, bei der einige Unterfelder auf „null“ und andere auf gültige Werte gesetzt sind, führt zu einem Fehler. Weitere Informationen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Beschränkungen</a>“.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Hinzufügen eines StructArray-Feldes zu einer bestehenden Sammlung<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x unterstützt das Hinzufügen eines StructArray-Feldes zu einer bestehenden Sammlung. Das hinzugefügte StructArray-Feld muss nullfähig sein, da Entitäten, die bereits in der Sammlung vorhanden sind, keine Werte für das neue Feld haben.</p>
<p>Um ein StructArray-Feld zu einer bestehenden Sammlung hinzuzufügen, definieren Sie zunächst das Struct-Schema. Rufen Sie anschließend „ <code translate="no">add_collection_struct_field()</code> “ auf und setzen Sie „ <code translate="no">nullable=True</code> “.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem das StructArray-Feld hinzugefügt wurde, geben vorhandene Entitäten für das neue Feld über alle seine Unterfelder hinweg den Wert „ <code translate="no">null</code> “ zurück.</p>
<p>Nachdem ein „StructArray“-Feld erstellt wurde, können Sie diesem bestehenden „StructArray“-Feld keine neuen Unterfelder hinzufügen. Wenn Sie später zusätzliche Elementattribute benötigen, rufen Sie „ <code translate="no">drop_collection_field()</code> “ auf, um das „StructArray“-Feld zu entfernen, und fügen Sie anschließend ein neues „StructArray“-Feld mit dem aktualisierten „Struct“-Schema hinzu.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Schema-Regeln<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>Regel</th><th>Erläuterung</th></tr>
</thead>
<tbody>
<tr><td>„Struct“ wird als Array-Elementtyp verwendet.</td><td>Erstellen Sie ein „StructArray“-Feld als Array-Feld mit „ <code translate="no">element_type=STRUCT</code> “. Erstellen Sie „Struct“ nicht als Sammlungsfeld auf oberster Ebene.</td></tr>
<tr><td>Alle Elemente teilen sich ein gemeinsames Schema.</td><td>Jedes „Struct“-Element im selben „StructArray“-Feld folgt dem für dieses Feld definierten „Struct“-Schema.</td></tr>
<tr><td><code translate="no">max_capacity</code> ist erforderlich.</td><td>Es begrenzt die Anzahl der „Struct“-Elemente, die jede Entität im „StructArray“-Feld speichern kann.</td></tr>
<tr><td>Es sind nur unterstützte Unterfeldtypen zulässig.</td><td>Verwenden Sie skalare und vektorielle Unterfeldtypen, die von „StructArray“ unterstützt werden. Definieren Sie keine JSON-, Geometry-, Text-, Timestamptz-, SparseFloatVector- oder verschachtelte Struct-/Array-Unterfelder.</td></tr>
<tr><td>Vektor-Unterfelder benötigen vor der Suche Indizes.</td><td>Erstellen Sie Indizes auf Pfaden wie <code translate="no">chunks[emb_list_vector]</code> oder <code translate="no">chunks[emb]</code>, bevor Sie eine Vektorsuche ausführen.</td></tr>
<tr><td>Ein Vektor-Unterfeld hat einen Index.</td><td>Wenn Sie sowohl eine „EmbeddingList“-Suche als auch eine Suche auf Elementebene benötigen, erstellen Sie zwei separate Vektor-Unterfelder.</td></tr>
<tr><td>Vorhandene „StructArray“-Unterfelder sind fest vorgegeben.</td><td>Nachdem Sie ein StructArray-Feld erstellt haben, können Sie diesem StructArray-Feld keine weiteren Unterfelder mehr hinzufügen.</td></tr>
<tr><td>Funktionen werden innerhalb von „Struct“ nicht unterstützt.</td><td>Definieren Sie keine Funktionen für Felder oder Unterfelder innerhalb eines StructArray-Feldes.</td></tr>
<tr><td>Skalare Unterfelder sollten den Filteranforderungen entsprechen.</td><td>Fügen Sie Felder wie „ <code translate="no">section</code> “, „ <code translate="no">quality_score</code> “ oder „ <code translate="no">has_code</code> “ nur dann hinzu, wenn Sie diese später filtern, gruppieren oder ausgeben müssen.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Häufige Fehler<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>„ <code translate="no">DataType.STRUCT</code> “ als Sammlungsfeld auf oberster Ebene anlegen, anstatt es als Elementtyp eines Array-Feldes zu verwenden.</p></li>
<li><p>Das Vergessen, „ <code translate="no">max_capacity</code> “ für das StructArray-Feld festzulegen.</p></li>
<li><p>Definition nicht unterstützter Unterfeldtypen wie JSON, Geometry, Text, Timestamptz, SparseFloatVector, verschachteltes Array, verschachtelte Struktur oder Array-of-Struct.</p></li>
<li><p>Verwendung von „ <code translate="no">String</code> “ als Unterfeldtyp. Verwenden Sie „ <code translate="no">VARCHAR</code> “ und setzen Sie „ <code translate="no">max_length</code> “.</p></li>
<li><p>Verwendung eines einzigen Vektor-Unterfelds sowohl für die „EmbeddingList“-Suche als auch für die Suche auf Elementebene.</p></li>
<li><p>Das Hinzufügen nur von Vektor-Unterfeldern und das Auslassen von Skalar-Unterfeldern, die für die Filterung benötigt werden, wie z. B. „ <code translate="no">section</code> “, „ <code translate="no">quality_score</code> “ oder „ <code translate="no">has_code</code> “.</p></li>
<li><p>Vektor-Unterfelder werden als skalare Prädikate für <code translate="no">$[...]</code> behandelt. Verwenden Sie Vektor-Unterfelder für die Vektorsuche und skalare Unterfelder für skalare Prädikate.</p></li>
<li><p>Annahme, dass einem bestehenden StructArray-Feld nach dessen Erstellung neue Unterfelder hinzugefügt werden können.</p></li>
<li><p>Verwendung von <code translate="no">chunks.emb</code> oder <code translate="no">chunks.emb_list_vector</code> anstelle der erforderlichen Pfadsyntax <code translate="no">chunks[emb]</code> oder <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Das Verhalten von nullfähigen StructArrays wird so behandelt, als wäre es in jeder Zielversion verfügbar.</p></li>
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
    </button></h2><ol>
<li><p>Informationen zum Einfügen verschachtelter Daten in das StructArray-Feld finden Sie unter <a href="/docs/de/insert-data-into-structarray-fields.md">„Daten in StructArray-Felder einfügen</a>“.</p></li>
<li><p>Informationen zum Erstellen von Vektor- und Skalarindizes finden Sie unter <a href="/docs/de/index-structarray-fields.md">„StructArray-Felder indizieren</a>“.</p></li>
<li><p>Informationen zur Suche in StructArray-Vektor-Unterfeldern finden Sie unter „Grundlegende Vektorsuche mit StructArray“.</p></li>
<li><p>Informationen zu unterstützten Datentypen, dem Verhalten bei nullfähigen Werten und versionsspezifischen Einschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„Einschränkungen von StructArray</a>“.</p></li>
</ol>
