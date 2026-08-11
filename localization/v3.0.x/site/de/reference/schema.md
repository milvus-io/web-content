---
id: schema.md
title: Schema erklärt
summary: >-
  Ein Schema definiert die Datenstruktur einer Sammlung. Bevor Sie eine Sammlung
  anlegen, müssen Sie ein Schema dafür entwerfen. Diese Seite hilft Ihnen dabei,
  das Schema einer Sammlung zu verstehen und selbst ein Beispielschema zu
  entwerfen.
---
<h1 id="Schema-Explained" class="common-anchor-header">Schema erklärt<button data-href="#Schema-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Schema definiert die Datenstruktur einer Sammlung. Bevor Sie eine Sammlung erstellen, müssen Sie ein Schema dafür entwerfen. Diese Seite hilft Ihnen, das Schema einer Sammlung zu verstehen und selbst ein Beispielschema zu entwerfen.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei Milvus entspricht ein Sammlungsschema einer Tabelle in einer relationalen Datenbank, die festlegt, wie Milvus die Daten in der Sammlung organisiert.</p>
<p>Ein gut durchdachtes Schema ist unerlässlich, da es das Datenmodell abstrahiert und darüber entscheidet, ob Sie Ihre Geschäftsziele durch eine Suche erreichen können. Da zudem jede in die Sammlung eingefügte Datenzeile dem Schema entsprechen muss, trägt es zur Aufrechterhaltung der Datenkonsistenz und der langfristigen Datenqualität bei. Aus technischer Sicht führt ein klar definiertes Schema zu einer gut organisierten Speicherung der Spaltendaten und einer übersichtlicheren Indexstruktur, was die Suchleistung steigert.</p>
<p>Ein Sammlungsschema verfügt über einen Primärschlüssel, mindestens ein Vektorfeld und mehrere Skalarfelder. Das folgende Diagramm veranschaulicht, wie ein Artikel einer Liste von Schemafeldern zugeordnet wird.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/schema-design-anatomy.png" alt="Schema Design Anatomy" class="doc-image" id="schema-design-anatomy" /> 
   <span>Aufbau des Schema-Designs</span>
  
 </span></p>
<p>Das Design des Datenmodells eines Suchsystems umfasst die Analyse der geschäftlichen Anforderungen und die Abstraktion von Informationen in ein schemabasiertes Datenmodell. So muss beispielsweise die Suche nach einem Textabschnitt „indiziert“ werden, indem die literale Zeichenfolge durch „Einbettung“ in einen Vektor umgewandelt und die Vektorsuche ermöglicht wird. Über diese grundlegende Anforderung hinaus kann es erforderlich sein, weitere Eigenschaften wie den Veröffentlichungszeitstempel und den Autor zu speichern. Diese Metadaten ermöglichen es, semantische Suchanfragen durch Filterung zu verfeinern, sodass nur Texte zurückgegeben werden, die nach einem bestimmten Datum oder von einem bestimmten Autor veröffentlicht wurden. Sie können diese Skalare auch zusammen mit dem Haupttext abrufen, um das Suchergebnis in der Anwendung darzustellen. Jedem sollte eine eindeutige Kennung zugewiesen werden, um diese Textteile zu organisieren; diese wird als Ganzzahl oder Zeichenkette ausgedrückt. Diese Elemente sind für die Realisierung einer ausgefeilten Suchlogik unerlässlich.</p>
<p>Lesen Sie den Artikel <a href="/docs/de/schema-hands-on.md">„Schema Design Hands-On“</a>, um zu erfahren, wie Sie ein gut durchdachtes Schema erstellen.</p>
<h2 id="Create-Schema" class="common-anchor-header">Schema erstellen<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeausschnitt veranschaulicht, wie ein Schema erstellt wird.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = []
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;fields&quot;: []
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field" class="common-anchor-header">Primärfeld hinzufügen<button data-href="#Add-Primary-Field" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Primärfeld in einer Sammlung identifiziert eine Entität eindeutig. Es akzeptiert ausschließlich Werte <strong>vom Typ „Int64“</strong> oder <strong>„VARCHAR</strong> “. Die folgenden Codeausschnitte zeigen, wie das Primärfeld hinzugefügt wird.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
<span class="highlighted-comment-line">    WithIsPrimaryKey(<span class="hljs-literal">true</span>).</span>
<span class="highlighted-comment-line">    WithIsAutoID(<span class="hljs-literal">false</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        $primaryField
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Beim Hinzufügen eines Feldes können Sie das Feld explizit als Primärfeld kennzeichnen, indem Sie dessen Eigenschaft „ <code translate="no">is_primary</code> “ auf „ <code translate="no">True</code> “ setzen. Ein Primärfeld akzeptiert standardmäßig <strong>Int64-Werte</strong>. In diesem Fall sollte der Wert des Primärfeldes aus Ganzzahlen bestehen, ähnlich wie in <code translate="no">12345</code>. Wenn Sie sich dafür entscheiden, <strong>VARCHAR-Werte</strong> im Primärfeld zu verwenden, sollte der Wert aus Zeichenketten bestehen, ähnlich wie in <code translate="no">my_entity_1234</code>.</p>
<p>Sie können außerdem die Eigenschaften „ <code translate="no">autoId</code> “ auf „ <code translate="no">True</code> “ setzen, damit Milvus die Werte für das Primärfeld beim Einfügen von Daten automatisch zuweist.</p>
<div class="alert note">
<p>Es wird empfohlen, in allen Fällen auf „ <code translate="no">autoId</code> “ zurückzugreifen, es sei denn, die manuelle Festlegung von Primärschlüsseln ist vorteilhaft.</p>
</div>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/primary-field.md">„Primärfeld &amp; AutoId</a>“.</p>
<h2 id="Add-Vector-Fields" class="common-anchor-header">Vektorfelder hinzufügen<button data-href="#Add-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Vektorfelder unterstützen verschiedene spärliche und dichte Vektor-Embeddings. In Milvus können Sie einer Sammlung vier Vektorfelder hinzufügen. Die folgenden Codeausschnitte veranschaulichen, wie ein Vektorfeld hinzugefügt wird.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
<span class="highlighted-wrapper-line">    WithDim(<span class="hljs-number">5</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Parameter ` <code translate="no">dim</code> ` in den obigen Codeausschnitten gibt die Dimensionalität der Vektoreinbettungen an, die im Vektorfeld gespeichert werden sollen. Der Wert ` <code translate="no">FLOAT_VECTOR</code> ` bedeutet, dass das Vektorfeld eine Liste von 32-Bit-Gleitkommazahlen enthält, die üblicherweise zur Darstellung von Antilogarithmen verwendet werden. Darüber hinaus unterstützt Milvus auch die folgenden Arten von Vektoreinbettungen:</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von 16-Bit-Gleitkommazahlen mit halber Genauigkeit und kommt in der Regel bei Deep-Learning- oder GPU-basierten Rechenszenarien zum Einsatz, bei denen Speicher- oder Bandbreitenbeschränkungen bestehen.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von 16-Bit-Gleitkommazahlen, die zwar eine reduzierte Genauigkeit, aber denselben Exponentenbereich wie Float32 aufweisen. Dieser Datentyp wird häufig in Deep-Learning-Szenarien verwendet, da er den Speicherbedarf senkt, ohne die Genauigkeit wesentlich zu beeinträchtigen.</p></li>
<li><p><code translate="no">INT8_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs speichert Vektoren, die aus 8-Bit-Ganzzahlen mit Vorzeichen (int8) bestehen, wobei jede Komponente im Bereich von –128 bis 127 liegt. Speziell auf quantisierte Deep-Learning-Architekturen – wie ResNet und EfficientNet – zugeschnitten, reduziert er die Modellgröße erheblich und steigert die Inferenzgeschwindigkeit, wobei nur ein minimaler Genauigkeitsverlust entsteht. <strong>Hinweis</strong>: Dieser Vektortyp wird nur für HNSW-Indizes unterstützt.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste aus Nullen und Einsen. Diese dienen als kompakte Merkmale zur Darstellung von Daten in Szenarien der Bildverarbeitung und der Informationsgewinnung.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von Zahlen ungleich Null sowie deren Sequenznummern, um spärliche Vektoreinbettungen darzustellen.</p></li>
</ul>
<h2 id="Add-Scalar-Fields" class="common-anchor-header">Skalarfelder hinzufügen<button data-href="#Add-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>In gängigen Fällen können Sie Skalarfelder verwenden, um die Metadaten der in Milvus gespeicherten Vektoreinbettungen abzulegen und ANN-Suchen mit Metadatenfilterung durchzuführen, um die Genauigkeit der Suchergebnisse zu verbessern. Milvus unterstützt mehrere Skalarfeldtypen, darunter <strong>VARCHAR</strong>, <strong>Boolean</strong>, <strong>Int</strong>, <strong>Float</strong> und <strong>Double</strong>.</p>
<h3 id="Add-VARCHAR-Fields" class="common-anchor-header">VARCHAR-Felder hinzufügen<button data-href="#Add-VARCHAR-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>In Milvus können Sie „ <code translate="no">VARCHAR</code> “-Felder zum Speichern von Zeichenketten verwenden. Weitere Informationen zum Feld „ <code translate="no">VARCHAR</code> “ finden Sie unter <a href="/docs/de/string.md">„VarChar-Feld</a>“.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
    datatype=DataType.VARCHAR,
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">512</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_varchar&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields" class="common-anchor-header">Zahlenfelder hinzufügen<button data-href="#Add-Number-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus unterstützt folgende Zahlentypen: „ <code translate="no">Int8</code> “, „ <code translate="no">Int16</code> “, „ <code translate="no">Int32</code> “, „ <code translate="no">Int64</code> “, „ <code translate="no">Float</code> “ und „ <code translate="no">Double</code> “. Weitere Informationen zu den Zahlenfeldern finden Sie unter <a href="/docs/de/number.md">„Zahlenfeld</a>“.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,
    datatype=DataType.INT64,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)
        .dataType(DataType.Int64)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_int64&quot;</span>).
    WithDataType(entity.FieldTypeInt64),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_int64&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields" class="common-anchor-header">Boolesche Felder hinzufügen<button data-href="#Add-Boolean-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus unterstützt boolesche Felder. Die folgenden Codeausschnitte veranschaulichen, wie ein boolesches Feld hinzugefügt wird.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,
    datatype=DataType.BOOL,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)
        .dataType(DataType.Bool)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_bool&quot;</span>).
    WithDataType(entity.FieldTypeBool),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_bool&quot;,
    &quot;dataType&quot;: &quot;Boolean&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Composite-Fields" class="common-anchor-header">Zusammengesetzte Felder hinzufügen<button data-href="#Add-Composite-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus ist ein zusammengesetztes Feld ein Feld, das in kleinere Unterfelder unterteilt werden kann, wie beispielsweise die Schlüssel in einem JSON-Feld oder die Indizes in einem Array-Feld.</p>
<h3 id="Add-JSON-fields" class="common-anchor-header">JSON-Felder hinzufügen<button data-href="#Add-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein JSON-Feld speichert in der Regel halbstrukturierte JSON-Daten. Weitere Informationen zu JSON-Feldern finden Sie unter <a href="/docs/de/json-field">„JSON-Feld</a>“.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,
    datatype=DataType.JSON,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)
        .dataType(DataType.JSON)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_json&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_json&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields" class="common-anchor-header">Array-Felder hinzufügen<button data-href="#Add-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein Array-Feld speichert eine Liste von Elementen. Die Datentypen aller Elemente in einem Array-Feld sollten identisch sein. Weitere Informationen zu Array-Feldern finden Sie unter <a href="/docs/de/array_data_type.md">„Array-Feld</a>“.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">5</span>,
    max_length=<span class="hljs-number">512</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">5</span>)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_array&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxLength(<span class="hljs-number">512</span>).
    WithMaxCapacity(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_array&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$arrayField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
