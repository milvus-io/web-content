---
id: binary-vector.md
title: Binärer Vektor
summary: >-
  Binäre Vektoren sind eine besondere Form der Datendarstellung, bei der
  herkömmliche hochdimensionale Gleitkomma-Vektoren in binäre Vektoren
  umgewandelt werden, die nur 0s und 1s enthalten. Durch diese Umwandlung wird
  nicht nur die Größe des Vektors komprimiert, sondern es werden auch Speicher-
  und Rechenkosten gesenkt, während die semantischen Informationen erhalten
  bleiben. Wenn die Genauigkeit für unkritische Merkmale nicht entscheidend ist,
  können binäre Vektoren die Integrität und den Nutzen der ursprünglichen
  Fließkomma-Vektoren weitgehend erhalten.
---
<h1 id="Binary-Vector" class="common-anchor-header">Binärer Vektor<button data-href="#Binary-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Binäre Vektoren sind eine besondere Form der Datendarstellung, bei der herkömmliche hochdimensionale Fließkomma-Vektoren in binäre Vektoren umgewandelt werden, die nur 0en und 1en enthalten. Durch diese Umwandlung wird nicht nur die Größe des Vektors komprimiert, sondern es werden auch die Speicher- und Rechenkosten reduziert, während die semantischen Informationen erhalten bleiben. Wenn die Genauigkeit für unkritische Merkmale nicht entscheidend ist, können binäre Vektoren die Integrität und den Nutzen der ursprünglichen Fließkomma-Vektoren weitgehend erhalten.</p>
<p>Binäre Vektoren haben ein breites Anwendungsspektrum, insbesondere in Situationen, in denen Berechnungseffizienz und Speicheroptimierung entscheidend sind. In groß angelegten KI-Systemen wie Suchmaschinen oder Empfehlungssystemen ist die Echtzeitverarbeitung großer Datenmengen von entscheidender Bedeutung. Durch die Verkleinerung der Vektoren tragen binäre Vektoren dazu bei, die Latenzzeit und die Rechenkosten zu senken, ohne die Genauigkeit wesentlich zu beeinträchtigen. Darüber hinaus sind Binärvektoren in ressourcenbeschränkten Umgebungen nützlich, wie z. B. bei mobilen Geräten und eingebetteten Systemen, wo Speicher und Verarbeitungsleistung begrenzt sind. Durch die Verwendung binärer Vektoren können komplexe KI-Funktionen in diesen eingeschränkten Umgebungen bei gleichbleibend hoher Leistung implementiert werden.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Binäre Vektoren sind eine Methode zur Kodierung komplexer Objekte (wie Bilder, Text oder Audio) in binäre Werte fester Länge. In Milvus werden binäre Vektoren typischerweise als Bit- oder Byte-Arrays dargestellt. Zum Beispiel kann ein 8-dimensionaler Binärvektor als <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code> dargestellt werden.</p>
<p>Das folgende Diagramm zeigt, wie binäre Vektoren das Vorhandensein von Schlüsselwörtern in Textinhalten darstellen. In diesem Beispiel wird ein 10-dimensionaler Binärvektor verwendet, um zwei verschiedene Texte<strong>(Text 1</strong> und <strong>Text 2</strong>) darzustellen, wobei jede Dimension einem Wort des Vokabulars entspricht: 1 bedeutet, dass das Wort im Text vorhanden ist, während 0 sein Fehlen anzeigt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/binary-vector.png" alt="Binary Vector" class="doc-image" id="binary-vector" />
   </span> <span class="img-wrapper"> <span>Binärer Vektor</span> </span></p>
<p>Binäre Vektoren haben die folgenden Eigenschaften:</p>
<ul>
<li><p><strong>Effiziente Speicherung:</strong> Jede Dimension benötigt nur 1 Bit Speicherplatz, was den Speicherplatz erheblich reduziert.</p></li>
<li><p><strong>Schnelle Berechnung:</strong> Die Ähnlichkeit zwischen Vektoren kann mit bitweisen Operationen wie XOR schnell berechnet werden.</p></li>
<li><p><strong>Feste Länge:</strong> Die Länge des Vektors bleibt unabhängig von der ursprünglichen Textlänge konstant, was die Indizierung und das Auffinden erleichtert.</p></li>
<li><p><strong>Einfach und intuitiv:</strong> Spiegelt direkt das Vorhandensein von Schlüsselwörtern wider und eignet sich daher für bestimmte spezialisierte Suchaufgaben.</p></li>
</ul>
<p>Binäre Vektoren können durch verschiedene Methoden erzeugt werden. Bei der Textverarbeitung können vordefinierte Vokabulare verwendet werden, um entsprechende Bits auf der Grundlage des Vorhandenseins von Wörtern zu setzen. Bei der Bildverarbeitung können Wahrnehmungs-Hashing-Algorithmen (wie <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>) binäre Merkmale von Bildern erzeugen. Bei Anwendungen des maschinellen Lernens können die Modellausgaben binarisiert werden, um binäre Vektordarstellungen zu erhalten.</p>
<p>Nach der binären Vektorisierung können die Daten in Milvus zur Verwaltung und zum Abruf der Vektoren gespeichert werden. Das folgende Diagramm zeigt den grundlegenden Prozess.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/use-binary-vector.png" alt="Use Binary Vector" class="doc-image" id="use-binary-vector" />
   </span> <span class="img-wrapper"> <span>Binäre Vektoren verwenden</span> </span></p>
<div class="alert note">
<p>Obwohl sich binäre Vektoren in bestimmten Szenarien hervorragend eignen, sind sie in ihrer Aussagekraft eingeschränkt, so dass es schwierig ist, komplexe semantische Beziehungen zu erfassen. Daher werden in realen Szenarien häufig binäre Vektoren zusammen mit anderen Vektortypen verwendet, um ein Gleichgewicht zwischen Effizienz und Aussagekraft zu erreichen. Weitere Informationen finden Sie unter <a href="/docs/de/dense-vector.md">Dense Vector</a> und <a href="/docs/de/sparse_vector.md">Sparse Vector</a>.</p>
</div>
<h2 id="Use-binary-vectors" class="common-anchor-header">Binäre Vektoren verwenden<button data-href="#Use-binary-vectors" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field" class="common-anchor-header">Vektorfeld hinzufügen</h3><p>Um binäre Vektoren in Milvus zu verwenden, definieren Sie zunächst ein Vektorfeld zum Speichern von binären Vektoren, wenn Sie eine Sammlung erstellen. Dieser Prozess beinhaltet:</p>
<ol>
<li><p>Einstellung von <code translate="no">datatype</code> auf den unterstützten binären Vektordatentyp, d.h. <code translate="no">BINARY_VECTOR</code>.</p></li>
<li><p>Angeben der Dimensionen des Vektors mit dem Parameter <code translate="no">dim</code>. Beachten Sie, dass <code translate="no">dim</code> ein Vielfaches von 8 sein muss, da binäre Vektoren beim Einfügen in ein Byte-Array umgewandelt werden müssen. Alle 8 booleschen Werte (0 oder 1) werden in 1 Byte gepackt. Wenn zum Beispiel <code translate="no">dim=128</code> verwendet wird, ist ein 16-Byte-Array für das Einfügen erforderlich.</p></li>
</ol>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">128</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

schema.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary vector&quot;</span>,
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">100</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithDataType(entity.FieldTypeBinaryVector).
    WithDim(<span class="hljs-number">128</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;isPrimary&quot;: true,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 100
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;binary_vector&quot;,
    &quot;dataType&quot;: &quot;BinaryVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 128
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ],
    \&quot;enableDynamicField\&quot;: true
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel wird ein Vektorfeld mit dem Namen <code translate="no">binary_vector</code> zum Speichern von binären Vektoren hinzugefügt. Der Datentyp dieses Feldes ist <code translate="no">BINARY_VECTOR</code>, mit einer Dimension von 128.</p>
<h3 id="Set-index-params-for-vector-field" class="common-anchor-header">Setzen von Indexparametern für das Vektorfeld</h3><p>Um die Suche zu beschleunigen, muss ein Index für das binäre Vektorfeld erstellt werden. Die Indexierung kann die Abfrageeffizienz von großen Vektordaten erheblich verbessern.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;binary_vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = {
  <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;binary_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;binary_vector&quot;,
            &quot;metricType&quot;: &quot;HAMMING&quot;,
            &quot;indexName&quot;: &quot;binary_vector_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Im obigen Beispiel wird ein Index mit dem Namen <code translate="no">binary_vector_index</code> für das Feld <code translate="no">binary_vector</code> erstellt, wobei der Indextyp <code translate="no">AUTOINDEX</code> verwendet wird. <code translate="no">metric_type</code> ist auf <code translate="no">HAMMING</code> gesetzt, was anzeigt, dass die Hamming-Distanz für die Ähnlichkeitsmessung verwendet wird.</p>
<p>Milvus bietet verschiedene Indexarten für eine bessere Vektorsuche. AUTOINDEX ist ein spezieller Indextyp, der entwickelt wurde, um die Lernkurve der Vektorsuche zu glätten. Sie können aus einer Vielzahl von Index-Typen wählen. Einzelheiten finden Sie unter <a href="/docs/de/index-explained.md">Index erklärt</a>.</p>
<p>Außerdem unterstützt Milvus andere Ähnlichkeitsmetriken für binäre Vektoren. Weitere Informationen finden Sie unter <a href="/docs/de/metric.md">Metrik-Typen</a>.</p>
<h3 id="Create-collection" class="common-anchor-header">Sammlung erstellen</h3><p>Sobald die Einstellungen für binäre Vektoren und Indizes abgeschlossen sind, erstellen Sie eine Sammlung, die binäre Vektoren enthält. Das folgende Beispiel verwendet die Methode <code translate="no">create_collection</code>, um eine Sammlung mit dem Namen <code translate="no">my_collection</code> zu erstellen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Daten einfügen</h3><p>Nachdem Sie die Sammlung erstellt haben, fügen Sie mit der Methode <code translate="no">insert</code> Daten hinzu, die binäre Vektoren enthalten. Beachten Sie, dass binäre Vektoren in Form eines Byte-Arrays bereitgestellt werden sollten, wobei jedes Byte für 8 boolesche Werte steht.</p>
<p>Für einen 128-dimensionalen Binärvektor ist beispielsweise ein 16-Byte-Array erforderlich (da 128 Bits ÷ 8 Bits/Byte = 16 Bytes). Im Folgenden finden Sie einen Beispielcode zum Einfügen von Daten:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_bool_list_to_bytes</span>(<span class="hljs-params">bool_list</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(bool_list) % <span class="hljs-number">8</span> != <span class="hljs-number">0</span>:
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The length of a boolean list must be a multiple of 8&quot;</span>)

    byte_array = <span class="hljs-built_in">bytearray</span>(<span class="hljs-built_in">len</span>(bool_list) // <span class="hljs-number">8</span>)
    <span class="hljs-keyword">for</span> i, bit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(bool_list):
        <span class="hljs-keyword">if</span> bit == <span class="hljs-number">1</span>:
            index = i // <span class="hljs-number">8</span>
            shift = i % <span class="hljs-number">8</span>
            byte_array[index] |= (<span class="hljs-number">1</span> &lt;&lt; shift)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">bytes</span>(byte_array)

bool_vectors = [
    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,
    [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,
]

data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector) <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors}]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] convertBoolArrayToBytes(<span class="hljs-type">boolean</span>[] booleanArray) {
    <span class="hljs-type">byte</span>[] byteArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[booleanArray.length / Byte.SIZE];
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; booleanArray.length; i++) {
        <span class="hljs-keyword">if</span> (booleanArray[i]) {
            <span class="hljs-type">int</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> i / Byte.SIZE;
            <span class="hljs-type">int</span> <span class="hljs-variable">shift</span> <span class="hljs-operator">=</span> i % Byte.SIZE;
            byteArray[index] |= (<span class="hljs-type">byte</span>) (<span class="hljs-number">1</span> &lt;&lt; shift);
        }
    }

    <span class="hljs-keyword">return</span> byteArray;
}

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
{
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}
{
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithBinaryVectorColumn(<span class="hljs-string">&quot;binary_vector&quot;</span>, <span class="hljs-number">128</span>, [][]<span class="hljs-type">byte</span>{
        {<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010100, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
        {<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010101, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
    }))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Ähnlichkeitssuche durchführen</h3><p>Die Ähnlichkeitssuche ist eine der Hauptfunktionen von Milvus, die es Ihnen ermöglicht, schnell Daten zu finden, die einem Abfragevektor am ähnlichsten sind, basierend auf dem Abstand zwischen den Vektoren. Um eine Ähnlichkeitssuche mit binären Vektoren durchzuführen, bereiten Sie den Abfragevektor und die Suchparameter vor und rufen dann die Methode <code translate="no">search</code> auf.</p>
<p>Während der Suchoperationen müssen die binären Vektoren auch in Form eines Byte-Arrays bereitgestellt werden. Stellen Sie sicher, dass die Dimensionalität des Abfragevektors mit der bei der Definition von <code translate="no">dim</code> angegebenen Dimension übereinstimmt und dass alle 8 booleschen Werte in 1 Byte konvertiert werden.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}

query_bool_list = [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>
query_vector = convert_bool_list_to_bytes(query_bool_list)

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    search_params=search_params,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172268&#x27;, &#x27;distance&#x27;: 10.0, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172268&#x27;}}]&quot;] </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);

<span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
<span class="hljs-type">BinaryVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(convertBoolArrayToBytes(boolArray));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());
        
 System.out.println(searchR.getSearchResults());
 
 <span class="hljs-comment">// Output</span>
 <span class="hljs-comment">//</span>
 <span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>];

client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">byte</span>{<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010100, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                      <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.BinaryVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
    WithAnnParam(annSearchParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
        &quot;params&quot;:{&quot;nprobe&quot;:10}
    }&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,
    \&quot;limit\&quot;: 5,
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu Parametern für die Ähnlichkeitssuche finden Sie unter <a href="/docs/de/single-vector-search.md">Grundlegende ANN-Suche</a>.</p>
