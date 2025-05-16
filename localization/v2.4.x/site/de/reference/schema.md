---
id: schema.md
summary: 'Lernen Sie, wie man ein Schema in Milvus definiert.'
title: Schema verwalten
---
<h1 id="Manage-Schema" class="common-anchor-header">Schema verwalten<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird das Schema in Milvus vorgestellt. Ein Schema wird verwendet, um die Eigenschaften einer Sammlung und die darin enthaltenen Felder zu definieren.</p>
<h2 id="Field-schema" class="common-anchor-header">Feldschema<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Feldschema ist die logische Definition eines Feldes. Es ist das erste, was Sie definieren müssen, bevor Sie ein <a href="#Collection-schema">Sammlungsschema</a> definieren und <a href="/docs/de/v2.4.x/manage-collections.md">Sammlungen verwalten können</a>.</p>
<p>Milvus unterstützt nur ein Primärschlüsselfeld in einer Sammlung.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Eigenschaften des Feldschemas</h3><table class="properties">
    <thead>
    <tr>
        <th>Eigenschaften</th>
        <th>Beschreibung</th>
        <th>Hinweis</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Name des Feldes in der zu erstellenden Sammlung</td>
        <td>Datentyp: String.<br/>Obligatorisch</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Datentyp des Feldes</td>
        <td>Obligatorisch</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Beschreibung des Feldes</td>
        <td>Datentyp: Zeichenfolge.<br/>Fakultativ</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Angabe, ob das Feld als Primärschlüsselfeld festgelegt werden soll oder nicht</td>
        <td>Datentyp: Boolescher Wert (<code translate="no">true</code> oder <code translate="no">false</code>).<br/>Obligatorisch für das Primärschlüsselfeld</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Obligatorisch für das Primärschlüsselfeld)</td>
            <td>Schalter zum Aktivieren oder Deaktivieren der automatischen ID-Zuweisung (Primärschlüssel).</td>
            <td><code translate="no">True</code> oder <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Obligatorisch für das VARCHAR-Feld)</td>
            <td>Maximale Bytelänge für Zeichenketten, die eingefügt werden können. Beachten Sie, dass Multibyte-Zeichen (z. B. Unicode-Zeichen) jeweils mehr als ein Byte belegen können. Stellen Sie daher sicher, dass die Bytelänge der eingefügten Zeichenketten den angegebenen Grenzwert nicht überschreitet.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimension des Vektors</td>
            <td>Datentyp: Integer &isin;[1, 32768].<br/>Obligatorisch für ein dichtes Vektorfeld. Bei einem <a href="https://milvus.io/docs/sparse_vector.md">spärlichen V</a> ektorfeld weglassen.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Angabe, ob dieses Feld ein Partitionsschlüsselfeld ist.</td>
        <td>Datentyp: Boolescher Wert (<code translate="no">true</code> oder <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Ein Feldschema erstellen</h3><p>Um die Komplexität beim Einfügen von Daten zu verringern, ermöglicht Milvus die Angabe eines Standardwerts für jedes Skalarfeld während der Erstellung des Feldschemas, außer für das Primärschlüsselfeld. Dies bedeutet, dass, wenn Sie beim Einfügen von Daten ein Feld leer lassen, der von Ihnen angegebene Standardwert für dieses Feld gilt.</p>
<p>Erstellen Sie ein reguläres Feldschema:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie ein Feldschema mit Standardfeldwerten:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Unterstützte Datentypen</h3><p><code translate="no">DataType</code> definiert die Art der Daten, die ein Feld enthält. Verschiedene Felder unterstützen unterschiedliche Datentypen.</p>
<ul>
<li><p>Primärschlüsselfeld unterstützt:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>Skalar-Feld unterstützt:</p>
<ul>
<li>BOOL: Boolean (<code translate="no">true</code> oder <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/de/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/de/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>JSON ist als zusammengesetzter Datentyp verfügbar. Ein JSON-Feld besteht aus Schlüssel-Werte-Paaren. Jeder Schlüssel ist eine Zeichenfolge, und ein Wert kann eine Zahl, eine Zeichenfolge, ein boolescher Wert, ein Array oder eine Liste sein. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/use-json-fields.md">JSON: ein neuer Datentyp</a>.</p></li>
<li><p>Vektorfeld unterstützt:</p>
<ul>
<li>BINARY_VECTOR: Speichert binäre Daten als eine Folge von 0en und 1en, die für eine kompakte Merkmalsdarstellung in der Bildverarbeitung und beim Informationsabruf verwendet werden.</li>
<li>FLOAT_VECTOR: Speichert 32-Bit-Gleitkommazahlen, die häufig in der wissenschaftlichen Datenverarbeitung und beim maschinellen Lernen zur Darstellung reeller Zahlen verwendet werden.</li>
<li>FLOAT16_VECTOR: Speichert 16-Bit-Gleitkommazahlen mit halber Genauigkeit, die bei Deep Learning und GPU-Berechnungen für Speicher- und Bandbreiteneffizienz verwendet werden.</li>
<li>BFLOAT16_VECTOR: Speichert 16-Bit-Gleitkommazahlen mit verringerter Genauigkeit, aber demselben Exponentenbereich wie Float32, die beim Deep Learning zur Verringerung der Speicher- und Berechnungsanforderungen ohne wesentliche Beeinträchtigung der Genauigkeit verwendet werden.</li>
<li>SPARSE_FLOAT_VECTOR: Speichert eine Liste von Nicht-Null-Elementen und ihren entsprechenden Indizes, die zur Darstellung von Sparse-Vektoren verwendet werden. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/sparse_vector.md">Sparse Vectors</a>.</li>
</ul>
<p>Milvus unterstützt mehrere Vektorfelder in einer Sammlung. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/multi-vector-search.md">Hybride Suche</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Sammlungsschema<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Sammlungsschema ist die logische Definition einer Sammlung. Normalerweise müssen Sie das <a href="#Field-schema">Feldschema</a> definieren, bevor Sie ein Sammlungsschema definieren und <a href="/docs/de/v2.4.x/manage-collections.md">Sammlungen verwalten können</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Eigenschaften des Sammlungsschemas</h3><table class="properties">
    <thead>
    <tr>
        <th>Eigenschaften</th>
        <th>Beschreibung</th>
        <th>Hinweis</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Felder in der zu erstellenden Sammlung</td>
        <td>Obligatorisch</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Beschreibung der Sammlung</td>
        <td>Datentyp: String.<br/>Optional</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Name eines Feldes, das als Partitionsschlüssel fungieren soll.</td>
        <td>Datentyp: String.<br/>Optional</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Angabe, ob das dynamische Schema aktiviert werden soll oder nicht</td>
        <td>Datentyp: Boolescher Wert (<code translate="no">true</code> oder <code translate="no">false</code>).<br/>Optional, Standardwert ist <code translate="no">False</code>.<br/>Einzelheiten zum dynamischen Schema finden Sie unter <a herf="enable-dynamic-field.md">Dynamisches Schema</a> und in den Benutzerhandbüchern für die Verwaltung von Sammlungen.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Erstellen eines Sammlungsschemas</h3><div class="alert note">
  Definieren Sie die Feldschemata, bevor Sie ein Sammlungsschema definieren.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine Sammlung mit dem angegebenen Schema:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Sie können die Shard-Nummer mit <code translate="no">shards_num</code> definieren.</li>
<li>Sie können den Milvus-Server definieren, auf dem Sie eine Sammlung erstellen möchten, indem Sie den Alias in <code translate="no">using</code> angeben.</li>
<li>Sie können die Partitionsschlüssel-Funktion für ein Feld aktivieren, indem Sie <code translate="no">is_partition_key</code> auf <code translate="no">True</code> für das Feld setzen, wenn Sie eine <a href="/docs/de/v2.4.x/multi_tenancy.md">auf Partitionsschlüsseln basierende Mandantenfähigkeit</a> implementieren möchten.</li>
<li>Sie können das dynamische Schema aktivieren, indem Sie <code translate="no">enable_dynamic_field</code> auf <code translate="no">True</code> im Sammlungsschema setzen, wenn Sie <a href="/docs/de/v2.4.x/enable-dynamic-field.md">ein dynamisches Feld aktivieren</a> müssen.</li>
</ul>
</div>
<p><br/>
Sie können auch eine Sammlung mit <code translate="no">Collection.construct_from_dataframe</code> erstellen, die automatisch ein Sammelschema aus DataFrame generiert und eine Sammlung erstellt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
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
<li>Erfahren Sie, wie Sie bei der <a href="/docs/de/v2.4.x/manage-collections.md">Verwaltung von Sammlungen</a> ein Schema vorbereiten.</li>
<li>Lesen Sie mehr über <a href="/docs/de/v2.4.x/enable-dynamic-field.md">dynamische Schemata</a>.</li>
<li>Lesen Sie mehr über Partitionsschlüssel in <a href="/docs/de/v2.4.x/multi_tenancy.md">Multi-Tenancy</a>.</li>
</ul>
