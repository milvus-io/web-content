---
id: add-fields-to-an-existing-collection.md
title: Kollektionsschema ändern
summary: >-
  Ändern Sie ein vorhandenes Sammlungsschema, indem Sie Skalarfelder,
  Vektorfelder und durch Funktionen erzeugte Vektorfelder hinzufügen oder
  entfernen, ohne die Sammlung neu zu erstellen.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Kollektionsschema ändern<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Wenn eine Sammlung von der Entwicklung in die Produktion übergeht, ändern sich häufig die Felder der einzelnen Entitäten. Möglicherweise fügen Sie Skalarfelder wie „ <code translate="no">source_uri</code> “ oder „ <code translate="no">review_status</code> “ für Filter- und Anwendungslogik hinzu, fügen ein neues Vektorfeld für von Ihrer Anwendung generierte Einbettungen hinzu, fügen ein von BM25 generiertes spärliches Vektorfeld für die lexikalische Suche in vorhandenem Text hinzu oder entfernen Felder, die nicht mehr verwendet werden. Mit „Sammlungsschema ändern“ können Sie unterstützte Feldänderungen direkt vornehmen, anstatt die Sammlung neu zu erstellen.</p>
<div class="alert note">
<p>Dieses Handbuch behandelt Schemaänderungen auf Feldebene in verwalteten Sammlungen, einschließlich benutzerdefinierter Felder und durch Funktionen generierter Vektorfelder. Informationen zum Hinzufügen eines Feldes zu einer externen Sammlung finden Sie unter <a href="/docs/de/alter-external-collection-schema.md">„Alter External Collection Schema</a>“. Informationen zu Änderungen an Feldeigenschaften, wie z. B. die Änderung von „ <code translate="no">max_length</code> “ bei einem „ <code translate="no">VARCHAR</code> “-Feld oder von „ <code translate="no">max_capacity</code> “ bei einem „ <code translate="no">ARRAY</code> “-Feld, finden Sie unter <a href="/docs/de/alter-collection-field.md">„Alter Collection Field</a>“. Informationen zum dynamischen Feldverhalten finden Sie unter <a href="/docs/de/enable-dynamic-field.md">„Dynamisches Feld</a> “ und <a href="/docs/de/modify-collection.md">„Sammlung ändern</a>“.</p>
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
    </button></h2><p><strong>Benutzerdefinierte Felder hinzufügen</strong></p>
<ul>
<li><p>Hinzugefügte benutzerdefinierte Felder müssen nullfähig sein. Legen Sie beim Aufruf von ` <code translate="no">add_collection_field()</code>` den Parameter ` <code translate="no">nullable=True</code> ` fest. Bei bestehenden Entitäten ist das hinzugefügte Feld vom Typ ` <code translate="no">NULL</code> `, es sei denn, Sie fügen ein Skalarfeld mit dem Parameter ` <code translate="no">default_value</code>` hinzu.</p></li>
<li><p>Das Hinzufügen benutzerdefinierter Skalarfelder wird ab Milvus 2.6.x unterstützt. Das Hinzufügen benutzerdefinierter Vektorfelder wird ab Milvus 2.6.18 unterstützt.</p></li>
<li><p>Das Hinzufügen von StructArray-Feldern wird ab Milvus 3.0.0 unterstützt. Hinzugefügte StructArray-Felder müssen nullfähig sein.</p></li>
<li><p>Feldnamen müssen innerhalb der Sammlung eindeutig sein.</p></li>
</ul>
<p><strong>Hinzufügen von durch Funktionen generierten Vektorfeldern</strong></p>
<ul>
<li><p>Bei jeder Schemaaktualisierung können jeweils nur eine Funktion und ein generiertes Vektorfeld hinzugefügt werden.</p></li>
<li><p>Die unterstützte Funktion bestimmt den Typ des generierten Vektorfeldes: „ <code translate="no">BM25</code> “ generiert ein „ <code translate="no">SPARSE_FLOAT_VECTOR</code> “-Feld, und „ <code translate="no">MINHASH</code> “ generiert ein „ <code translate="no">BINARY_VECTOR</code> “-Feld.</p></li>
<li><p>Das generierte Vektorfeld muss ein neues Feld sein. Es darf nicht auf ein Feld verweisen, das bereits im Schema der Sammlung vorhanden ist.</p></li>
<li><p>Das generierte Vektorfeld darf nicht nullfähig sein.</p></li>
<li><p>Die von der Funktion verwendeten Eingabefelder müssen bereits in der Sammlung vorhanden sein.</p></li>
<li><p>Beim Hinzufügen einer BM25- oder MinHash-Funktion zu einer bestehenden Sammlung muss die Funktionseingabe ein Feld vom Typ „ <code translate="no">VARCHAR</code> “ sein. Eine Eingabe vom Typ „ <code translate="no">TEXT</code> “ wird in diesem Workflow nicht unterstützt, da Milvus die generierte Ausgabe für bestehende Entitäten nicht anhand dieses Eingabetyps nachträglich einfügen kann.</p></li>
</ul>
<p><strong>Benutzerdefinierte Felder löschen</strong></p>
<ul>
<li><p>Sie können das Primärschlüsselfeld, das Partitionsschlüsselfeld, das Clustering-Schlüsselfeld oder das letzte Vektorfeld in einer Sammlung nicht entfernen.</p></li>
<li><p>Sie können ein gesamtes „ <code translate="no">ARRAY&lt;STRUCT&gt;</code> “-Feld löschen, jedoch kein einzelnes Unterfeld innerhalb eines „ <code translate="no">ARRAY&lt;STRUCT&gt;</code> “-Feldes.</p></li>
<li><p>Sie können ein Feld, das als Funktionseingabefeld verwendet oder als Funktionsausgabefeld generiert wird, nicht direkt löschen. Um ein Funktionsausgabefeld zu entfernen, löschen Sie die Funktion, die es generiert.</p></li>
</ul>
<p><strong>Von Funktionen generierte Vektorfelder löschen</strong></p>
<ul>
<li><p>In diesem Workflow zur Schemaänderung werden durch das Löschen einer Funktion sowohl die Funktion selbst als auch die von ihr generierten Ausgabefelder entfernt. Funktionseingabefelder verbleiben im Schema der Sammlung.</p></li>
<li><p>Das Löschen einer Funktion wird abgelehnt, wenn die Sammlung durch das Entfernen ihrer Ausgabefelder kein Vektorfeld mehr enthalten würde.</p></li>
</ul>
<div class="alert note">
<p>Für Schemaänderungen, die über die unterstützten Operationen zum Hinzufügen und Löschen hinausgehen, erstellen Sie die Sammlung neu oder migrieren Sie sie.</p>
</div>
<h2 id="Add-fields-to-an-existing-collection" class="common-anchor-header">Felder zu einer bestehenden Sammlung hinzufügen<button data-href="#Add-fields-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie den Weg zum Hinzufügen eines Feldes je nach Art der Erzeugung der Feldwerte:</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">Fügen Sie benutzerdefinierte Skalarfelder hinzu</a>, wenn Sie neue Metadaten für die Filterung, die Abfrageausgabe oder die Anwendungslogik benötigen.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">Fügen Sie „StructArray“-Felder hinzu</a>, wenn Sie ein Array-Feld benötigen, dessen Elemente dasselbe „Struct“-Schema teilen.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">Fügen Sie benutzerdefinierte Vektorfelder hinzu</a>, wenn Ihre Anwendung Einbettungen generiert und Vektorwerte in Milvus schreibt.</p></li>
<li><p><a href="#add-vector-fields-generated-by-functions--milvus-30x">Fügen Sie durch Funktionen generierte Vektorfelder hinzu</a>, wenn Milvus Vektorwerte aus bestehenden Feldern generieren soll, wie z. B. BM25-Sparse-Vektoren oder MinHash-Signaturen aus Text.</p></li>
</ul>
<p>In allen Fällen darf der Name des neuen Feldes in der Sammlung noch nicht vorhanden sein, und die Gesamtzahl der Felder darf die von Milvus festgelegte Obergrenze für die Anzahl der Felder nicht überschreiten. Weitere Informationen finden Sie unter <a href="/docs/de/limitations.md#number-of-resources-in-a-collection">„Milvus-Grenzwerte</a>“.</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">Benutzerdefinierte Skalarfelder hinzufügen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">add_collection_field()</code> “, um ein benutzerdefiniertes Skalarfeld zu einer bestehenden Sammlung hinzuzufügen.</p>
<p>Dies unterscheidet sich vom Speichern beliebiger Schlüssel im dynamischen Feld: Sobald die Schemaaktualisierung verfügbar ist, wird das neue Skalarfeld zu einem festen Bestandteil des Kollektionsschemas. Sie können Werte darin einfügen oder aktualisieren, dort, wo dies unterstützt wird, Indizes darauf anlegen, es in Abfragen und Suchfiltern verwenden und es in der Abfrage- oder Suchausgabe zurückgeben.</p>
<p>Da bestehende Entitäten bereits vor der Einführung des neuen Feldes eingefügt wurden, muss jedes hinzugefügte benutzerdefinierte Skalarfeld nullfähig sein:</p>
<ul>
<li><p>Wenn Sie ein Skalarfeld mit ` <code translate="no">nullable=True</code> ` und ohne ` <code translate="no">default_value</code>` hinzufügen, geben bestehende Entitäten für das neue Feld ` <code translate="no">NULL</code> ` zurück.</p></li>
<li><p>Wenn Sie ein Skalarfeld mit „ <code translate="no">nullable=True</code> “ und „ <code translate="no">default_value</code> “ hinzufügen, geben bestehende Entitäten den Standardwert anstelle von „ <code translate="no">NULL</code> “ zurück.</p></li>
</ul>
<p>Skalare Filterausdrücke stimmen nicht mit den skalaren Werten von „ <code translate="no">NULL</code> “ überein. Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullfähige Felder</a>“.</p>
<p><strong>Beispiel: Hinzufügen eines nullfähigen Skalarfelds</strong></p>
<p>Im folgenden Beispiel wird ein nullfähiges Feld vom Typ „ <code translate="no">source</code> “ zu einer bestehenden Sammlung namens „ <code translate="no">product_catalog</code> “ hinzugefügt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem das Feld hinzugefügt wurde, geben Entitäten, die bereits in der Sammlung vorhanden waren, „ <code translate="no">NULL</code> “ für „ <code translate="no">source</code> “ zurück. Neue Entitäten können bei der Einfügung oder Aktualisierung den Wert „ <code translate="no">source</code> “ festlegen.</p>
<p><strong>Beispiel: Hinzufügen eines Skalarfelds mit einem Standardwert</strong></p>
<p>Wenn vorhandene Entitäten anstelle von „ <code translate="no">NULL</code> “ einen konkreten Wert zurückgeben sollen, geben Sie beim Hinzufügen eines Skalarfeldes „ <code translate="no">default_value</code> “ an. Im folgenden Beispiel wird ein Feld „ <code translate="no">review_status</code> “ hinzugefügt und „ <code translate="no">&quot;unreviewed&quot;</code> “ als Standardwert verwendet.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem das Feld hinzugefügt wurde, geben Entitäten, die bereits in der Sammlung vorhanden waren, für „ <code translate="no">review_status</code> “ den Wert „ <code translate="no">&quot;unreviewed&quot;</code> “ zurück. Neue Entitäten können einen anderen Wert festlegen oder den Standardwert verwenden, wenn kein Wert angegeben wird.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">StructArray-Felder hinzufügen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">add_collection_struct_field()</code> “, um ein StructArray-Feld hinzuzufügen, das Arrays von Struct-Elementen akzeptiert. Gehen Sie wie folgt vor, um ein StructArray-Feld hinzuzufügen:</p>
<ol>
<li><p>Erstellen Sie ein Struct-Schema, das die erforderlichen Unterfelder der unterstützten Datentypen enthält. Informationen zu den zulässigen Datentypen finden Sie unter <a href="/docs/de/structarray-limits.md#Supported-subfield-data-types">„StructArray-Beschränkungen</a>“.</p></li>
<li><p>Verweisen Sie auf das oben erstellte Struct-Schema und legen Sie die maximale Kapazität des Feldes unter „ <code translate="no">add_collection_struct_field()</code> “ fest.</p></li>
<li><p>Legen Sie „ <code translate="no">nullable=True</code> “ in der Anfrage fest.</p></li>
</ol>
<p><strong>Beispiel: Hinzufügen eines nullfähigen StructArray-Feldes</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem das StructArray-Feld hinzugefügt wurde, geben bereits in der Sammlung vorhandene Entitäten für alle ihre Unterfelder den Wert „ <code translate="no">NULL</code> “ für „ <code translate="no">chunks</code> “ zurück. Achten Sie beim Einfügen einer neuen Entität darauf, dass alle Unterfelder entweder auf „ <code translate="no">NULL</code> “ gesetzt sind oder gültige Werte enthalten. Das Einfügen einer Entität, bei der einige Unterfelder auf „ <code translate="no">NULL</code> “ und andere auf gültige Werte gesetzt sind, führt zu Fehlern.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">Benutzerdefinierte Vektorfelder hinzufügen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">add_collection_field()</code> “, um ein benutzerdefiniertes Vektorfeld hinzuzufügen, wenn Ihre Anwendung Einbettungen generiert und Vektorwerte in Milvus schreibt.</p>
<p>Jedes hinzugefügte benutzerdefinierte Vektorfeld muss nullfähig sein. Vorhandene Entitäten verfügen über den Wert „ <code translate="no">NULL</code> “ für das neue Vektorfeld, bis Sie Vektorwerte über „Upsert“ oder einen Backfill-Workflow schreiben. Neue Entitäten können das Vektorfeld beim Einfügen bereits enthalten. Die Vektorsuche überspringt Entitäten, deren Vektorwert „ <code translate="no">NULL</code> “ lautet. Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullfähige Felder</a>“.</p>
<p><strong>Beispiel: Hinzufügen eines nullfähigen Vektorfeldes</strong></p>
<p>Im folgenden Beispiel wird ein nullfähiges dichtes Vektorfeld mit dem Namen „ <code translate="no">embedding_v2</code> “ zu einer bestehenden Sammlung hinzugefügt. Setzen Sie „ <code translate="no">dim</code> “ auf die Dimensionalität der von Ihrer Anwendung generierten Einbettungen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem das Feld hinzugefügt wurde, erstellen Sie einen Index für das neue Vektorfeld, bevor Sie darin suchen:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Bestehende Entitäten haben den Wert „ <code translate="no">NULL</code> “ für „ <code translate="no">embedding_v2</code> “ und werden bei der Suche nach diesem Feld übersprungen. Um bestehende Entitäten über „ <code translate="no">embedding_v2</code> “ durchsuchbar zu machen, schreiben Sie Nicht-NULL-Vektorwerte mittels „Upsert“ oder eines Backfill-Workflows. Neue Entitäten können beim Einfügen den Wert „ <code translate="no">embedding_v2</code> “ enthalten.</p>
<h3 id="Add-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">Von Funktionen generierte Vektorfelder hinzufügen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie diesen Workflow, wenn Milvus ein neues Vektorfeld aus Daten generieren soll, die bereits in einer bestehenden Sammlung gespeichert sind. Der Vorgang fügt zwei miteinander verbundene Schemaelemente hinzu:</p>
<ul>
<li><p>Eine Funktion, die ein oder mehrere vorhandene Eingabefelder ausliest.</p></li>
<li><p>Ein neues Vektorausgabefeld, das die von der Funktion generierten Werte speichert.</p></li>
</ul>
<p>Beispielsweise liest eine BM25-Funktion ein vorhandenes Feld „ <code translate="no">VARCHAR</code> “ und generiert ein Feld „ <code translate="no">SPARSE_FLOAT_VECTOR</code> “ für die lexikalische Suche. Eine MinHash-Funktion generiert ein Feld „ <code translate="no">BINARY_VECTOR</code> “ zur Erkennung von Beinahe-Duplikaten. Dieser Workflow fügt das Eingabefeld der Funktion nicht hinzu und ersetzt es auch nicht.</p>
<div class="alert note">
<p>Diese Funktion erfordert Storage V3. Anweisungen zur Aktivierung und Hinweise zur Kompatibilität finden Sie unter <a href="/docs/de/storage-v3.md">„Storage V3</a>“.</p>
</div>
<p>Das Hinzufügen einer Funktion und ihres generierten Vektorfeldes zu einer bestehenden Sammlung erfordert zudem eine Schema- und eine Speicherversionskomprimierung. Milvus lehnt die Anfrage ab, wenn eine dieser Einstellungen deaktiviert ist. Diese zusätzlichen Voraussetzungen gelten nur bei der Änderung einer bestehenden Sammlung; bei der Definition der Funktion im ursprünglichen Sammlungsschema wird dieser Workflow zum Nachfüllen bestehender Daten nicht verwendet.</p>
<p>Die unterstützte Funktion bestimmt den Typ des generierten Vektorfeldes:</p>
<table>
<thead>
<tr><th>Funktion</th><th>Typ des generierten Vektorfeldes</th><th>Typisches Eingabefeld</th><th>Typischer Anwendungsfall</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Ein „ <code translate="no">VARCHAR</code> “-Feld mit aktiviertem Analysator</td><td>Lexikalische Suche und Stichwortrelevanz</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Ein „ <code translate="no">VARCHAR</code> “-Feld</td><td>Erkennung von Beinahe-Duplikaten</td></tr>
</tbody>
</table>
<p>Einzelheiten zur Funktionsweise der einzelnen Funktionen finden Sie unter <a href="/docs/de/bm25-function.md">„BM25-Funktion</a> “ und <a href="/docs/de/minhash-function.md">„MinHash-Funktion</a>“.</p>
<p>Das generierte Vektorfeld darf in der Sammlung noch nicht vorhanden sein und darf nicht nullfähig sein. Das Eingabefeld der Funktion muss bereits vorhanden sein.</p>
<p><strong>Beispiel: Hinzufügen eines durch BM25 generierten spärlichen Vektorfeldes für die lexikalische Suche</strong></p>
<p>Im folgenden Beispiel werden eine BM25-Funktion namens „ <code translate="no">text_bm25</code> “ und ein generiertes spärliches Vektorfeld namens „ <code translate="no">text_sparse</code> “ zu einer bestehenden Sammlung hinzugefügt. Die Sammlung muss bereits über ein „ <code translate="no">VARCHAR</code> “-Feld namens „ <code translate="no">text</code> “ verfügen, für das der Analysator aktiviert ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie nach dem Hinzufügen der BM25-Funktion und des generierten Feldes einen Index für das spärliche Vektorfeld, bevor Sie es für die BM25-Suche verwenden:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Konzeptionell fügt dieser Vorgang die folgenden Feld- und Funktionsdefinitionen hinzu:</p>
<pre><code translate="no" class="language-plaintext">New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

New function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Nach erfolgreicher Anfrage gibt „ <code translate="no">describe_collection()</code> “ sowohl das neue Vektorfeld „ <code translate="no">text_sparse</code> “ als auch die Funktion „ <code translate="no">text_bm25</code> “ im Schema der Sammlung zurück. Milvus generiert die Funktionsausgabe für neue Entitäten, sobald diese geschrieben werden. Bei bestehenden Entitäten füllt Milvus das generierte Vektorfeld asynchron durch eine Kompaktierung im Hintergrund. Die Schemasichtbarkeit bestätigt, dass die Schemaaktualisierung erfolgreich war, zeigt jedoch nicht an, dass die Nachfüllung für jede bestehende Entität abgeschlossen ist. Informationen zum vollständigen BM25-Such-Workflow finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<p>Milvus unterstützt außerdem durch MinHash generierte binäre Vektorfelder zur Erkennung von Beinahe-Duplikaten. Eine MinHash-Funktion verwendet „ <code translate="no">FunctionType.MINHASH</code> “ und schreibt in ein neues Ausgabefeld „ <code translate="no">BINARY_VECTOR</code> “. Details zur Konfiguration finden Sie unter <a href="/docs/de/minhash-function.md">„MinHash-Funktion</a>“.</p>
<h2 id="Drop-fields-from-an-existing-collection" class="common-anchor-header">Felder aus einer bestehenden Sammlung entfernen<button data-href="#Drop-fields-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Felder auf zwei Arten aus einer bestehenden Sammlung entfernen. Entfernen Sie benutzerdefinierte Skalar- oder Vektorfelder direkt, wenn sie nicht mehr Teil Ihres Sammlungsmodells sind. Entfernen Sie durch Funktionen generierte Vektorfelder, indem Sie die Funktion entfernen, die sie generiert.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">Benutzerdefinierte Felder entfernen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">drop_collection_field()</code> “, um ein benutzerdefiniertes Skalar-, Vektor- oder StructArray-Feld zu entfernen, das nicht mehr Teil Ihres Kollektionsmodells ist.</p>
<p>Das Löschen eines Feldes ändert zunächst das Kollektionsschema und die Sichtbarkeit des Feldes:</p>
<ul>
<li><p>Nachdem „ <code translate="no">drop_collection_field()</code> “ erfolgreich ausgeführt wurde, wird das Sammlungsschema aktualisiert: „ <code translate="no">describe_collection()</code> “ gibt das gelöschte Feld nicht mehr zurück, und Abfragen oder Suchvorgänge können das Feld nicht mehr in „ <code translate="no">output_fields</code> “ zurückgeben oder in Ausdrücken verwenden.</p></li>
<li><p>Indizes, die auf dem entfernten Feld basieren, werden im Rahmen der Schemaaktualisierung bereinigt.</p></li>
</ul>
<p>Die Bereinigung des Speicherplatzes erfolgt getrennt von der Schemabereinigung. Weitere Informationen finden Sie unter <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">„Wann wird Speicherplatz nach dem Löschen eines Feldes freigegeben?</a>“.</p>
<p><strong>Beispiel: Ein benutzerdefiniertes Skalarfeld löschen</strong></p>
<p>Das folgende Beispiel geht davon aus, dass „ <code translate="no">experiment_tag</code> “ ein benutzerdefiniertes Skalarfeld in „ <code translate="no">product_catalog</code> “ ist, und entfernt es aus der Sammlung.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach dem Löschen eines Feldes können Sie ` <code translate="no">describe_collection()</code> ` aufrufen, um zu überprüfen, ob das Feld nicht mehr Teil des Schemas ist.</p>
<p><strong>Beispiel: Ein StructArray-Feld löschen</strong></p>
<p>Das folgende Beispiel geht davon aus, dass „ <code translate="no">chunks</code> “ ein StructArray-Feld in „ <code translate="no">my_collection</code> “ ist, und entfernt es aus der Sammlung.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Beispiel: Ein benutzerdefiniertes Vektorfeld entfernen</strong></p>
<p>Sie können ein Vektorfeld mit derselben Methode ` <code translate="no">drop_collection_field()</code> ` entfernen, allerdings muss die Sammlung nach dem Entfernen noch mindestens ein Vektorfeld enthalten. Dies ist nützlich für Sammlungen, die vorübergehend mehrere Vektordarstellungen enthalten und später auf eine davon standardisiert werden.</p>
<p>Das folgende Beispiel geht davon aus, dass „ <code translate="no">image_vector</code> “ ein benutzerdefiniertes Vektorfeld in „ <code translate="no">hybrid_catalog</code> “ ist und dass die Sammlung noch ein weiteres Vektorfeld enthält, beispielsweise „ <code translate="no">text_vector</code> “.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ist <code translate="no">image_vector</code> das letzte Vektorfeld in der Sammlung, wird die Löschoperation abgelehnt.</p>
<h3 id="Drop-vector-fields-generated-by-functions--Milvus-30x" class="common-anchor-header">Vektorfelder löschen, die durch Funktionen generiert wurden<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-vector-fields-generated-by-functions--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie diese Operation, wenn Sie ein von einer Funktion generiertes Vektorfeld nicht mehr benötigen, beispielsweise ein von BM25 generiertes spärliches Vektorfeld.</p>
<p>Um ein generiertes Vektorfeld zu entfernen, rufen Sie „ <code translate="no">drop_collection_function()</code> “ für die Funktion auf, die es generiert. In diesem Arbeitsablauf entfernt Milvus die Funktion aus dem Sammlungsschema und löscht zudem die von ihr generierten Vektorausgabefelder.</p>
<p>Rufen Sie „ <code translate="no">drop_collection_field()</code> “ nicht für ein Funktionseingabefeld oder ein Funktionsausgabefeld auf. Wenn es sich bei dem Zielfeld um ein Funktionsausgabefeld handelt, rufen Sie stattdessen „ <code translate="no">drop_collection_function()</code> “ auf. Funktionseingabefelder bleiben nach dem Löschen der Funktion erhalten.</p>
<p><strong>Beispiel: Löschen einer BM25-Funktion und ihres generierten Feldes</strong></p>
<p>Das folgende Beispiel geht davon aus, dass „ <code translate="no">text_bm25</code> “ eine BM25-Funktion in „ <code translate="no">product_catalog</code> “ ist und ein spärliches Vektorausgabefeld namens „ <code translate="no">text_sparse</code> “ generiert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_function(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach erfolgreichem Abschluss des Vorgangs gibt „ <code translate="no">describe_collection()</code> “ weder die entfernte Funktion noch deren generierte Ausgabefelder zurück. Die Eingabefelder der Funktion verbleiben im Schema.</p>
<p>Wenn das Entfernen der Funktionsausgabefelder dazu führen würde, dass die Sammlung kein Vektorfeld mehr enthält, wird der Vorgang abgelehnt.</p>
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
    </button></h2><h3 id="Which-add-field-method-should-I-use" class="common-anchor-header">Welche Methode zum Hinzufügen von Feldern sollte ich verwenden?<button data-href="#Which-add-field-method-should-I-use" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">add_collection_field()</code> “, um ein benutzerdefiniertes Skalarfeld hinzuzufügen, wenn Ihre Anwendung Skalarwerte für die Filterung, die Abfrageausgabe oder die Anwendungslogik bereitstellt.</p>
<p>Verwenden Sie „ <code translate="no">add_collection_struct_field()</code> “, um ein „StructArray“-Feld hinzuzufügen, wenn Sie ein Array-Feld benötigen, dessen Elemente dasselbe „Struct“-Schema teilen.</p>
<p>Verwenden Sie „ <code translate="no">add_collection_field()</code> “, um ein benutzerdefiniertes Vektorfeld hinzuzufügen, wenn Ihre Anwendung Einbettungen generiert und Vektorwerte in Milvus schreibt.</p>
<p>Verwenden Sie den Workflow „generated-vector-field“, wenn Milvus Vektorwerte aus bestehenden Feldern erzeugen soll. Dieser Leitfaden zeigt den BM25-Pfad mit „ <code translate="no">add_function_field()</code> “ für die lexikalische Suche. Milvus unterstützt außerdem von MinHash generierte binäre Vektorfelder zur Erkennung von Beinahe-Duplikaten.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">Warum müssen hinzugefügte benutzerdefinierte Felder nullfähig sein?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Bestehende Entitäten wurden eingefügt, bevor das neue Feld existierte, daher verfügen sie über keine Werte für dieses Feld. Durch die Einstellung „ <code translate="no">nullable=True</code> “ stellt Milvus den fehlenden Wert als „ <code translate="no">NULL</code> “ dar, bis Ihre Anwendung einen Wert schreibt oder – bei Skalarfeldern – bis ein Standardwert gilt.</p>
<p>Diese Regel gilt für benutzerdefinierte Skalarfelder und benutzerdefinierte Vektorfelder, die mit ` <code translate="no">add_collection_field()</code>` hinzugefügt wurden, sowie für `StructArray`-Felder, die mit ` <code translate="no">add_collection_struct_field()</code>` hinzugefügt wurden. Sie gilt nicht für Vektorfelder, die durch Funktionen generiert werden, da diese nicht nullfähig sein können.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">Was passiert mit bestehenden Entitäten, nachdem ich ein benutzerdefiniertes Feld hinzugefügt habe?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei einem benutzerdefinierten Skalarfeld geben vorhandene Entitäten „ <code translate="no">NULL</code> “ zurück, sofern Sie keinen „ <code translate="no">default_value</code> “ festlegen. Wenn Sie einen „ <code translate="no">default_value</code> “ festlegen, geben vorhandene Entitäten diesen Standardwert zurück.</p>
<p>Bei einem benutzerdefinierten Vektorfeld haben bestehende Entitäten den Wert „ <code translate="no">NULL</code> “ für das neue Vektorfeld. Bei der Vektorsuche nach dem hinzugefügten Feld werden Entitäten übersprungen, deren Vektorwert „ <code translate="no">NULL</code> “ ist. Um bestehende Entitäten über das neue Vektorfeld durchsuchbar zu machen, schreiben Sie Nicht-NULL-Vektorwerte per „upsert“ oder über einen Backfill-Workflow. Neue Entitäten können das neue Vektorfeld beim Einfügen bereits enthalten.</p>
<p>Bei einem StructArray-Feld geben bestehende Entitäten für das neue StructArray-Feld über alle seine Unterfelder hinweg den Wert „ <code translate="no">NULL</code> “ zurück. Neue Entitäten müssen entweder für alle Unterfelder den Wert „ <code translate="no">NULL</code> “ oder gültige Werte für alle Unterfelder bereitstellen.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">Kann ich einer bestehenden Sammlung die lexikalische BM25-Suche hinzufügen?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Ja. Wenn die Sammlung bereits über ein Feld „ <code translate="no">VARCHAR</code> “ mit aktiviertem Analysator verfügt, können Sie ein von BM25 generiertes spärliches Vektorfeld für die lexikalische Suche hinzufügen. In diesem Workflow fügt Milvus das neue Ausgabefeld „ <code translate="no">SPARSE_FLOAT_VECTOR</code> “ sowie die BM25-Funktion hinzu, die Werte dafür generiert. Sie können in diesem Schemaänderungs-Workflow kein bestehendes „ <code translate="no">TEXT</code> “-Feld als BM25-Eingabe verwenden. Um eine „ <code translate="no">TEXT</code> “-Eingabe zu verwenden, definieren Sie das Feld und die BM25-Funktion beim Erstellen der Sammlung.</p>
<p>Nachdem Sie das von BM25 generierte spärliche Vektorfeld hinzugefügt haben, erstellen Sie einen „ <code translate="no">SPARSE_INVERTED_INDEX</code> “-Index mit „ <code translate="no">metric_type=&quot;BM25&quot;</code> “, bevor Sie das Feld für die BM25-Suche verwenden.</p>
<h3 id="Can-I-drop-a-vector-field-generated-by-a-function-directly" class="common-anchor-header">Kann ich ein von einer Funktion generiertes Vektorfeld direkt löschen?<button data-href="#Can-I-drop-a-vector-field-generated-by-a-function-directly" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Ein durch eine Funktion generiertes Vektorfeld ist Teil des Schema-Vertrags dieser Funktion. Verwenden Sie stattdessen „ <code translate="no">drop_collection_function()</code> “. Bei diesem Workflow zur Schemaänderung entfernt Milvus die Funktion und die von ihr generierten Vektorausgabefelder gemeinsam, während die Eingabefelder erhalten bleiben.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">Muss ich nach der Änderung eines Sammlungsschemas warten?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>In der Regel ist keine manuelle Wartezeit erforderlich. Wenn Ihr nächster Vorgang vom aktualisierten Schema abhängt, können Sie zunächst „ <code translate="no">describe_collection()</code> “ aufrufen, um das Schema zu überprüfen, das Milvus aktuell zurückgibt.</p>
<p>In einer verteilten Bereitstellung kann es zu einer kurzen Übertragungsphase kommen, während die Milvus-Komponenten die Metadaten der Sammlung aktualisieren. Wenn ein Vorgang unmittelbar nach der Schemaänderung mit einem schemabezogenen Fehler fehlschlägt, aktualisieren Sie das Schema und wiederholen Sie den Vorgang.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">Wann wird Speicherplatz nach dem Löschen eines Feldes freigegeben?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Durch das Entfernen eines Feldes wird dieses aus dem aktuellen Schema und der normalen Abfrage-/Suchsichtbarkeit entfernt, historische Daten für dieses Feld werden jedoch nicht sofort physisch aus dem Objektspeicher gelöscht.</p>
<p>Speicherplatz kann später während der Komprimierung freigegeben werden. Die Komprimierung ist ein Hintergrundprozess, der vorhandene Datendateien in neue, kompaktere Dateien umstrukturiert. Nachdem ein Feld entfernt wurde, entsprechen die neu komprimierten Dateien dem aktuellen Schema und lassen das entfernte Feld weg. Milvus garantiert keine sofortige oder zeitlich festgelegte Speicherplatzreduzierung nach dem Entfernen eines Feldes.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Was passiert, wenn ich ein Skalarfeld mit demselben Namen wie einen dynamischen Feldschlüssel hinzufüge?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn dynamische Felder aktiviert sind, können Sie ein Skalarfeld hinzufügen, dessen Name mit dem eines bestehenden dynamischen Feldschlüssels übereinstimmt. Das neue Skalarfeld maskiert den dynamischen Feldschlüssel in der normalen Abfrageausgabe, die ursprünglichen dynamischen Daten bleiben jedoch unter <code translate="no">$meta</code> erhalten.</p>
<p>Wenn beispielsweise vorhandene Entitäten einen dynamischen Schlüssel namens „ <code translate="no">source</code> “ speichern und Sie später ein Skalarfeld namens „ <code translate="no">source</code> “ hinzufügen, bezieht sich die normale Ausgabe für „ <code translate="no">source</code> “ auf das Skalarfeld. Um auf den ursprünglichen dynamischen Wert zuzugreifen, verwenden Sie die Pfadsyntax „ <code translate="no">$meta</code> “, z. B. „ <code translate="no">$meta[&quot;source&quot;]</code> “.</p>
