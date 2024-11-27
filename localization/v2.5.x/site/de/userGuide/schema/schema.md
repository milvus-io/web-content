---
id: schema.md
title: Schema erklärt
summary: >-
  Ein Schema definiert die Datenstruktur einer Sammlung. Bevor Sie eine Sammlung
  erstellen, müssen Sie einen Entwurf für das Schema ausarbeiten. Diese Seite
  hilft Ihnen, das Schema einer Sammlung zu verstehen und selbst ein
  Beispielschema zu entwerfen.
---
<h1 id="Schema-Explained​" class="common-anchor-header">Schema Erklärt<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Schema definiert die Datenstruktur einer Sammlung. Bevor Sie eine Sammlung erstellen, müssen Sie einen Entwurf für das Schema ausarbeiten. Diese Seite hilft Ihnen, das Schema einer Sammlung zu verstehen und selbst ein Beispielschema zu entwerfen.</p>
<h2 id="Overview​" class="common-anchor-header">Übersicht<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus stellt ein Sammlungsschema eine Tabelle in einer relationalen Datenbank dar, die definiert, wie Milvus die Daten in der Sammlung organisiert. </p>
<p>Ein gut durchdachtes Schema ist von entscheidender Bedeutung, da es das Datenmodell abstrahiert und darüber entscheidet, ob Sie die Geschäftsziele durch eine Suche erreichen können. Da außerdem jede in die Sammlung eingefügte Datenzeile dem Schema entsprechen muss, trägt es zur Aufrechterhaltung der Datenkonsistenz und der langfristigen Qualität bei. Aus technischer Sicht führt ein gut definiertes Schema zu einer gut organisierten Speicherung von Spaltendaten und einer sauberen Indexstruktur, was die Suchleistung erhöht.</p>
<p>Ein Sammlungsschema hat einen Primärschlüssel, maximal vier Vektorfelder und mehrere skalare Felder. Das folgende Diagramm veranschaulicht, wie ein Artikel einer Liste von Schemafeldern zugeordnet werden kann.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-explained.PNG" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>Schema-Entwurf</span> </span></p>
<p>Der Entwurf des Datenmodells eines Suchsystems umfasst die Analyse der Geschäftsanforderungen und die Abstraktion der Informationen in ein schemaexprimiertes Datenmodell. So muss beispielsweise die Suche nach einem Textstück "indiziert" werden, indem die wörtliche Zeichenkette durch "Einbettung" in einen Vektor umgewandelt wird und eine Vektorsuche ermöglicht wird. Neben dieser grundlegenden Anforderung kann die Speicherung weiterer Eigenschaften wie Zeitstempel der Veröffentlichung und Autor erforderlich sein. Mit diesen Metadaten kann die semantische Suche durch Filterung verfeinert werden, so dass nur Texte gefunden werden, die nach einem bestimmten Datum oder von einem bestimmten Autor veröffentlicht wurden. Sie können diese Skalare auch mit dem Haupttext abrufen, um das Suchergebnis in der Anwendung darzustellen. Jedem Element sollte ein eindeutiger Bezeichner zugewiesen werden, um diese Textstücke zu organisieren, ausgedrückt als Ganzzahl oder String. Diese Elemente sind für eine ausgefeilte Suchlogik unerlässlich.</p>
<p>Lesen Sie <a href="/docs/de/schema-hands-on.md">Schema Design Hands-On</a>, um herauszufinden, wie Sie ein gut gestaltetes Schema erstellen.</p>
<h2 id="Create-Schema​" class="common-anchor-header">Schema erstellen<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeschnipsel zeigt, wie man ein Schema erstellt.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>​
​
schema = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_schema</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    &quot;fields&quot;: []​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">Primärfeld hinzufügen<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Primärfeld in einer Sammlung identifiziert eine Entität eindeutig. Es akzeptiert nur <strong>Int64</strong> oder <strong>VarChar</strong> Werte. Die folgenden Codeschnipsel zeigen, wie man das Primärfeld hinzufügt.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">False</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>; ​
​
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        <span class="hljs-comment">// highlight-start​</span>
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">false</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​
    <span class="hljs-comment">// highlight-end​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Beim Hinzufügen eines Feldes können Sie das Feld explizit als Primärfeld kennzeichnen, indem Sie seine <code translate="no">is_primary</code> Eigenschaft auf <code translate="no">True</code> setzen. Ein Primärfeld akzeptiert standardmäßig <strong>Int64-Werte</strong>. In diesem Fall sollte der Wert des Primärfelds ein Integer-Wert sein, ähnlich wie <code translate="no">12345</code>. Wenn Sie sich für die Verwendung von <strong>VarChar-Werten</strong> im Primärfeld entscheiden, sollte der Wert eine Zeichenkette sein, ähnlich wie <code translate="no">my_entity_1234</code>.</p>
<p>Sie können auch die Eigenschaften <code translate="no">autoId</code> auf <code translate="no">True</code> setzen, damit Milvus beim Einfügen von Daten automatisch Primärfeldwerte zuweist.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/primary-field.md">Primärfeld &amp; AutoID</a>.</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">Vektorfelder hinzufügen<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vektorfelder akzeptieren verschiedene spärliche und dichte Vektoreinbettungen. In Milvus können Sie vier Vektorfelder zu einer Sammlung hinzufügen. Die folgenden Codeschnipsel zeigen, wie man ein Vektorfeld hinzufügt.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    dim=<span class="hljs-number">5</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Der Parameter <code translate="no">dim</code> in den obigen Codeschnipseln gibt die Dimensionalität der Vektoreinbettungen an, die in dem Vektorfeld enthalten sein sollen. Der Wert <code translate="no">FLOAT_VECTOR</code> zeigt an, dass das Vektorfeld eine Liste von 32-Bit-Gleitkommazahlen enthält, die normalerweise zur Darstellung von Antilogarithmen verwendet werden.</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von 16-Bit-Gleitkommazahlen mit halber Genauigkeit und wird in der Regel für Deep-Learning-Szenarien mit eingeschränktem Speicher oder eingeschränkter Bandbreite oder für GPU-basierte Berechnungen verwendet.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von 16-Bit-Gleitkommazahlen, die eine geringere Genauigkeit, aber denselben Exponentenbereich wie Float32 haben. Dieser Datentyp wird häufig in Deep-Learning-Szenarien verwendet, da er die Speichernutzung reduziert, ohne die Genauigkeit wesentlich zu beeinträchtigen.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von 0en und 1en. Sie dienen als kompakte Merkmale zur Darstellung von Daten in Bildverarbeitungs- und Informationsabfrageszenarien.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Ein Vektorfeld dieses Typs enthält eine Liste von Nicht-Null-Zahlen und deren Folgenummern zur Darstellung spärlicher Vektoreinbettungen.</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">Skalare Felder hinzufügen<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>In häufigen Fällen können Sie skalare Felder verwenden, um die Metadaten der in Milvus gespeicherten Vektoreinbettungen zu speichern und ANN-Suchen mit Metadatenfilterung durchzuführen, um die Korrektheit der Suchergebnisse zu verbessern. Milvus unterstützt mehrere skalare Feldtypen, einschließlich <strong>VarChar</strong>, <strong>Boolean</strong>, <strong>Int</strong>, Float, <strong>Double</strong>, <strong>Array</strong> und JSON.</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">String-Felder hinzufügen</h3><p>In Milvus können Sie VarChar-Felder verwenden, um Zeichenketten zu speichern. Weitere Informationen über das VarChar-Feld finden Sie unter <a href="/docs/de/string.md">String-Feld</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    max_length=<span class="hljs-number">512</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">Zahlenfelder hinzufügen</h3><p>Die von Milvus unterstützten Zahlentypen sind <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, und <code translate="no">Double</code>. Weitere Informationen zu den Zahlenfeldern finden Sie unter <a href="/docs/de/number.md">Zahlenfeld</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">Boolesche Felder hinzufügen</h3><p>Milvus unterstützt boolesche Felder. Die folgenden Codeschnipsel zeigen, wie man ein boolesches Feld hinzufügt.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">BOOL</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">JSON-Felder hinzufügen</h3><p>Ein JSON-Feld speichert in der Regel halb-strukturierte JSON-Daten. Weitere Informationen zu JSON-Feldern finden Sie unter <a href="/docs/de/use-json-fields.md">JSON-Feld</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">Array-Felder hinzufügen</h3><p>Ein Array-Feld speichert eine Liste von Elementen. Die Datentypen aller Elemente in einem Array-Feld sollten gleich sein. Weitere Informationen zu Array-Feldern finden Sie unter <a href="/docs/de/array_data_type.md">Array-Feld</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,​
    element_type=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>)​
        .<span class="hljs-title function_">elementType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        .<span class="hljs-title function_">maxCapacity</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>,​
        <span class="hljs-variable">$arrayField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p></p>
