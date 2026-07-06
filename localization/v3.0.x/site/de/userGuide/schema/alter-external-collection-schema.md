---
id: alter-external-collection-schema.md
title: Externes Sammlungsschema ändernCompatible with Milvus 3.0.x
summary: >-
  Erfahren Sie, wie Sie ein zusätzliches Feld aus einer externen Datenquelle in
  einer bestehenden externen Sammlung anzeigen können.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">Externes Sammlungsschema ändern<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Externe Datenquellen entwickeln sich oft weiter, nachdem Sie eine externe Sammlung erstellt haben. Beispielsweise kann eine Lakehouse-Tabelle, in der bereits Embeddings gespeichert sind, später ein neues Skalarfeld enthalten, wie z. B. eine Punktzahl, eine Kategorie oder einen Zeitstempel, die Sie in Abfrageergebnissen zurückgeben oder in Filtern verwenden möchten.</p>
<p>Anstatt die externe Sammlung neu zu erstellen oder die Quelldaten in Milvus zu kopieren, fügen Sie ein Milvus-Feld hinzu, das dem vorhandenen Feld in der externen Datenquelle zugeordnet ist. Aktualisieren Sie nach dem Hinzufügen des Feldes die externe Sammlung, damit das neue Feld in Abfragen und Suchvorgängen verwendet werden kann.</p>
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
    </button></h2><ul>
<li><p>Externe Sammlungen unterstützen derzeit das Hinzufügen von Feldern nach ihrer Erstellung. Andere Schemaänderungen, wie das Löschen von Feldern, das Umbenennen von Feldern, das Ändern von Felddatentypen, das Ändern von Vektordimensionen oder das Neuzuordnen von „ <code translate="no">external_field</code> “, werden nicht unterstützt.</p></li>
<li><p>Sie können nur ein Feld hinzufügen, das bereits in der externen Datenquelle vorhanden ist. Bei diesem Vorgang wird ein vorhandenes externes Feld einem Milvus-Feld zugeordnet. Es wird weder ein neues Feld in der externen Datenquelle erstellt, noch werden Quelldaten nachträglich eingefügt.</p></li>
<li><p>Das Hinzufügen von „ <code translate="no">SPARSE_FLOAT_VECTOR</code> “-Feldern zu einer bestehenden externen Sammlung wird nicht unterstützt.</p></li>
<li><p>Das Hinzufügen von „StructArray“-Feldern zu einer bestehenden externen Sammlung wird nicht unterstützt. Wenn Ihre externe Sammlung ein „StructArray“-Feld benötigt, definieren Sie dieses beim Erstellen der Sammlung im Sammlungsschema.</p></li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">Feld hinzufügen<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie ein Feld zu einer externen Sammlung hinzufügen, stellen Sie sicher, dass das Feld bereits in der externen Datenquelle vorhanden ist. Rufen Sie anschließend „ <code translate="no">add_collection_field()</code> “ auf, um dieses Feld in Milvus verfügbar zu machen, indem Sie „ <code translate="no">external_field</code> “ auf den Feldnamen in der externen Datenquelle setzen. Setzen Sie „ <code translate="no">data_type</code> “ auf den Milvus-Datentyp, der dem Feld in der externen Datenquelle entspricht. Wenn das zugeordnete Feld beispielsweise Werte mit doppelter Genauigkeit speichert, verwenden Sie „ <code translate="no">DataType.DOUBLE</code> “.</p>
<p>Im Gegensatz zu verwalteten Sammlungen werden die Werte für das hinzugefügte Feld nach dem Aktualisieren der externen Sammlung aus der externen Datenquelle gelesen.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">Ein Skalarfeld hinzufügen<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">add_collection_field()</code> “, um ein Skalarfeld hinzuzufügen, wenn Sie das Feld in Abfrageergebnissen zurückgeben oder in Filtern verwenden möchten. Im folgenden Beispiel wird ein Feld „ <code translate="no">score</code> “ hinzugefügt, das dem Feld „ <code translate="no">score</code> “ in der externen Datenquelle zugeordnet ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;score&quot;</span>,
    data_type=DataType.DOUBLE,
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;score&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel lautet „ <code translate="no">score</code> “ der Milvus-Feldname, und „ <code translate="no">external_field=&quot;score&quot;</code> “ ordnet ihm das Feld „ <code translate="no">score</code> “ in der externen Datenquelle zu. Legen Sie „ <code translate="no">nullable=True</code> “ fest, da das Feld hinzugefügt wird, nachdem die Sammlung bereits erstellt wurde.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">Ein Vektorfeld hinzufügen<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Sie können auch ein Vektorfeld hinzufügen, wenn die externe Datenquelle bereits die Vektorwerte enthält. Legen Sie den Vektor „ <code translate="no">data_type</code> “ und „ <code translate="no">dim</code> “ so fest, dass sie mit dem Vektorfeld in der externen Datenquelle übereinstimmen.</p>
<p>Im folgenden Beispiel wird ein dichtes Vektorfeld mit dem Namen „ <code translate="no">image_embedding_v2</code> “ hinzugefügt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    data_type=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">768</span>,</span>
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie eine Vektorsuche für das hinzugefügte Vektorfeld durchführen möchten, erstellen Sie vor dem Aktualisieren der externen Sammlung einen Index für das Feld.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Refresh-the-external-collection" class="common-anchor-header">Aktualisieren Sie die externe Sammlung<button data-href="#Refresh-the-external-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Aktualisieren Sie nach einer Änderung des Schemas einer externen Sammlung die externe Sammlung, damit Milvus die Metadaten der externen Sammlung aktualisiert und die Schemaänderung in Abfrage-, Such- und Filterergebnissen wirksam wird.</p>
<pre><code translate="no" class="language-python">client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
