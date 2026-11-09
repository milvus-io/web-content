---
id: bm25-function.md
title: BM25-Funktion
summary: >-
  Die BM25-Funktion ermöglicht die Volltextsuche, indem sie Rohtext in spärliche
  Vektoren umwandelt und Dokumente anhand ihrer lexikalischen Relevanz bewertet.
  Sie nutzt termbasierte Übereinstimmungsermittlung und frequenzabhängige
  Gewichtung, um eine effiziente Suche nach Textdokumenten zu unterstützen, die
  eng mit den Suchbegriffen übereinstimmen.
---
<h1 id="BM25-Function" class="common-anchor-header">BM25-Funktion<button data-href="#BM25-Function" class="anchor-icon" translate="no">
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
    </button></h1><p>Die <strong>BM25-Funktion</strong> ermöglicht <a href="/docs/de/full-text-search.md">die Volltextsuche</a>, indem sie Rohtext in <strong>spärliche Vektoren</strong> umwandelt und Dokumente anhand ihrer lexikalischen Relevanz bewertet. Sie wendet termbasierte Übereinstimmungserkennung und frequenzabhängige Gewichtung an, um eine effiziente Suche nach Textdokumenten zu unterstützen, die eng mit den Suchbegriffen übereinstimmen.</p>
<p>Als lokale Textfunktion läuft die BM25-Funktion innerhalb von Milvus und erfordert weder Modellinferenz noch externe Integrationen. Sie bietet einen deterministischen und transparenten Abrufmechanismus für textbasierte Suchszenarien.</p>
<h2 id="How-BM25-works" class="common-anchor-header">So funktioniert BM25<button data-href="#How-BM25-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Der <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25-Algorithmus</a> ist ein termbasierter Relevanzbewertungsalgorithmus, der in der Volltextsuche weit verbreitet ist. In Milvus ist BM25 als Pipeline für die spärliche Suche implementiert, die Text in termgewichtete Darstellungen umwandelt und mithilfe verteilter spärlicher Indizes <em>die Top-K-Dokumente</em> abruft.</p>
<p>Der gesamte Workflow besteht aus zwei symmetrischen Pfaden: <strong>der Dokumentenerfassung</strong> und <strong>der Verarbeitung des Suchtextes</strong>, die dieselbe Textanalyselogik nutzen.</p>
<h3 id="Document-ingestion-From-text-to-sparse-representation" class="common-anchor-header">Dokumenteneingabe: Vom Text zur spärlichen Darstellung<button data-href="#Document-ingestion-From-text-to-sparse-representation" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn ein Dokument eingefügt wird, wird sein Rohtext zunächst von einem <strong><a href="/docs/de/analyzer-overview.md">Analysator</a></strong> verarbeitet, der den Text in einzelne Begriffe zerlegt.</p>
<p>Beispielsweise lässt sich das Dokument:</p>
<pre><code translate="no" class="language-plaintext">&quot;We are loving Milvus!&quot;
<button class="copy-code-btn"></button></code></pre>
<p>kann in die folgenden Begriffe zerlegt werden:</p>
<pre><code translate="no" class="language-plaintext">[&quot;we&quot;, &quot;love&quot;, &quot;milvus&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Jedes Dokument wird anschließend als Term-Frequenz-Darstellung (TF) dargestellt, die erfasst, wie oft jeder Term im Dokument vorkommt. Zum Beispiel:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;we&quot;: 1,
  &quot;love&quot;: 1,
  &quot;milvus&quot;: 1
}
<button class="copy-code-btn"></button></code></pre>
<p>Gleichzeitig aktualisiert Milvus Statistiken auf Korpusebene, darunter:</p>
<ul>
<li><p>die Dokumenthäufigkeit (DF) jedes Begriffs</p></li>
<li><p>die durchschnittliche Dokumentlänge</p></li>
<li><p>Posting-Listen, die jeden Begriff den Dokumenten zuordnen, in denen er vorkommt</p></li>
</ul>
<p>Die TF-Darstellung des Dokuments wird in <strong>spärliche Einbettungen</strong> eingefügt, wobei die Begriffs-Postings zur skalierbaren Abfrage auf Knoten verteilt werden.</p>
<h3 id="Query-text-process-Apply-IDF-weighting" class="common-anchor-header">Verarbeitung des Suchtextes: Anwendung der IDF-Gewichtung<button data-href="#Query-text-process-Apply-IDF-weighting" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn eine textbasierte Abfrage gestellt wird, wird sie von <strong>demselben Analysator</strong> verarbeitet, der bereits bei <a href="/docs/de/bm25-function.md#Document-ingestion-From-text-to-sparse-representation">der Dokumentenerfassung</a> zum Einsatz kam, wodurch eine konsistente Begriffssegmentierung gewährleistet wird.</p>
<p>Beispielsweise lässt sich die Abfrage:</p>
<pre><code translate="no" class="language-plaintext">&quot;who loves Milvus?&quot;
<button class="copy-code-btn"></button></code></pre>
<p>kann wie folgt analysiert werden:</p>
<pre><code translate="no" class="language-plaintext">[&quot;who&quot;, &quot;love&quot;, &quot;milvus&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Für jeden Suchbegriff ermittelt Milvus dessen <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">inverse Dokumenthäufigkeit</a> (IDF) anhand der Korpusstatistiken. Die IDF spiegelt wider, wie informativ ein Begriff über den gesamten Datensatz hinweg ist: Seltenere Begriffe erhalten höhere Gewichte, während häufige Begriffe niedrigere Gewichte erhalten.</p>
<p>Konzeptionell ergibt dies eine Menge von IDF-gewichteten Suchbegriffen, wie zum Beispiel:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;who&quot;: 0.1,
  &quot;love&quot;: 0.5,
  &quot;milvus&quot;: 1.2
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="BM25-scoring-and-top-K-retrieval" class="common-anchor-header">BM25-Bewertung und Top-K-Abruf<button data-href="#BM25-scoring-and-top-K-retrieval" class="anchor-icon" translate="no">
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
    </button></h3><p>BM25 ordnet Dokumente nach ihrer Relevanz, indem es einen Relevanzwert auf der Grundlage der übereinstimmenden Suchbegriffe berechnet. Die Bewertung erfolgt auf <strong>Begriffsebene</strong> und wird auf <strong>Dokumentebene</strong> aggregiert.</p>
<p><strong>Bewertung auf Begriffsebene</strong></p>
<p>Für jeden Suchbegriff, der in einem Dokument vorkommt, berechnet BM25 eine Bewertung auf Begriffsebene:</p>
<pre><code translate="no" class="language-plaintext">term_score =
  IDF(term) ×
  TF_boost(term, document, k1) ×
  length_normalization(document, b)
<button class="copy-code-btn"></button></code></pre>
<p>Dabei gilt:</p>
<ul>
<li><p><strong>IDF(Begriff)</strong> angibt, wie selten der Begriff in der Sammlung vorkommt</p></li>
<li><p><strong>TF_boost(…, k1)</strong> steigt mit der Termhäufigkeit an, erreicht jedoch bei zunehmender Häufigkeit einen Sättigungswert</p></li>
<li><p><strong>length_normalization(…, b)</strong> passt die Bewertung anhand der Dokumentlänge an</p></li>
</ul>
<p><strong>Bewertung auf Dokumentebene und Top-K-Abfrage</strong></p>
<p>Die endgültige Dokumentbewertung ist die Summe der Bewertungen auf Begriffsebene für alle übereinstimmenden Suchbegriffe:</p>
<pre><code translate="no" class="language-plaintext">document_score =
  sum of term_score over all matched query terms
<button class="copy-code-btn"></button></code></pre>
<p>Die Dokumente werden nach ihren Endwerten gereiht, und die Top-K-Dokumente mit den höchsten Werten werden zurückgegeben.</p>
<h2 id="Before-you-start" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie die Funktion BM25 verwenden, planen Sie Ihr Sammlungsschema so, dass es die lexikalische Volltextsuche unterstützt:</p>
<ul>
<li><p><strong>Ein Textfeld für Rohinhalte</strong></p>
<p>Ihre Sammlung muss ein Feld vom Typ „ <code translate="no">VARCHAR</code> “ enthalten, um Rohtext zu speichern. Dieses Feld ist die Textquelle, die für die Volltextsuche verarbeitet wird.</p></li>
<li><p><strong>Ein Analysator für das Textfeld</strong></p>
<p>Für das Textfeld muss ein Analysator aktiviert sein. Der Analysator legt fest, wie der Text tokenisiert und normalisiert wird, bevor die lexikalische Relevanz durch die BM25-Funktion berechnet wird.</p>
<p>Standardmäßig stellt Milvus einen integrierten Analysator bereit, der Text anhand von Leerzeichen und Satzzeichen in Token zerlegt. Wenn Ihre Anwendung ein benutzerdefiniertes Tokenisierungs- oder Normalisierungsverhalten erfordert, können Sie einen benutzerdefinierten Analysator definieren. Weitere Informationen finden Sie unter <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md">„Wählen Sie den richtigen Analysator für Ihren Anwendungsfall</a> “.</p></li>
<li><p><strong>Ein spärlicher Vektor für die BM25-Ausgabe</strong></p>
<p>Ihre Sammlung muss ein Feld vom Typ „ <code translate="no">SPARSE_FLOAT_VECTOR</code> “ enthalten, um die von der BM25-Funktion generierten spärlichen Darstellungen zu speichern. Dieses Feld wird für die Indizierung und den Abruf bei der Volltextsuche verwendet.</p></li>
</ul>
<p>Nachdem diese Überlegungen auf Schemaebene geklärt sind, fahren Sie mit der Erstellung der Sammlung und der Verwendung der BM25-Funktion fort.</p>
<h2 id="Step-1-Create-a-collection-with-a-BM25-function" class="common-anchor-header">Schritt 1: Erstellen einer Sammlung mit einer BM25-Funktion<button data-href="#Step-1-Create-a-collection-with-a-BM25-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die BM25-Funktion zu verwenden, müssen Sie diese beim Erstellen der Sammlung definieren. Die Funktion wird Teil des Sammlungsschemas und wird beim Einfügen von Daten sowie bei der Suche automatisch angewendet.</p>
<h4 id="Define-schema-fields" class="common-anchor-header">Schemafelder definieren</h4><p>Ihr Sammlungsschema muss mindestens drei Pflichtfelder enthalten:</p>
<ul>
<li><p><strong>Primärfeld</strong>: Identifiziert jede Entität in der Sammlung eindeutig.</p></li>
<li><p><strong>Textfeld</strong> (<code translate="no">VARCHAR</code>): Speichert Rohtextdokumente. Muss auf „ <code translate="no">enable_analyzer=True</code> “ gesetzt sein, damit Milvus den Text für das BM25-Relevanzranking verarbeiten kann. Standardmäßig verwendet Milvus den <a href="/docs/de/standard-analyzer.md"><code translate="no">standard</code></a><a href="/docs/de/standard-analyzer.md"> Analyzer</a> für die Textanalyse. Informationen zur Konfiguration eines anderen Analyzers finden Sie unter <a href="/docs/de/analyzer-overview.md">„Analyzer-Übersicht</a>“.</p></li>
<li><p><strong>Sparse-Vektor-Feld</strong> (<code translate="no">SPARSE_FLOAT_VECTOR</code>): Speichert spärliche Einbettungen, die automatisch von der BM25-Funktion generiert werden.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Text field</span></span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># Sparse vector field; no dim required for sparse vectors</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey: token
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64).<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>).<span class="hljs-title function_ invoke__">enable_analyzer</span>(<span class="hljs-literal">true</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;sparse&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>).<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Define-the-BM25-function" class="common-anchor-header">Definieren der BM25-Funktion</h4><p>Die BM25-Funktion wandelt tokenisierten Text in spärliche Vektoren um, die die BM25-Bewertung unterstützen.</p>
<p>Definieren Sie die Funktion und fügen Sie sie Ihrem Schema hinzu:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
<span class="highlighted-wrapper-line">    function_type=FunctionType.BM25, <span class="hljs-comment"># Set to `BM25`</span></span>
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">bm25_function</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Bm25)
    .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
    .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;sparse&quot;</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = schema.<span class="hljs-title function_ invoke__">add_function</span>(bm25_function);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, milvus::FunctionType::BM25);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>);
schema-&gt;<span class="hljs-built_in">AddFunction</span>(function);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Configure-the-index" class="common-anchor-header">Konfigurieren Sie den Index</h4><p>Nachdem Sie das Schema mit den erforderlichen Feldern und der integrierten Funktion definiert haben, richten Sie den Index für Ihre Sammlung ein.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,

    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }

)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
params.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);
params.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(params)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.05</span>))
indexOption.WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)
indexOption.WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)
indexOption.WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;sparse&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
    .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;inverted_index_algo&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;bm25_k1&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;1.2&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;bm25_b&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;0.75&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> index_params = milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndxType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25);
index_params.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
index_params.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-string">&quot;1.2&quot;</span>);
index_params.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-string">&quot;0.75&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{
               &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,
               &quot;bm25_k1&quot;: 1.2,
               &quot;bm25_b&quot;: 0.75
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-the-collection" class="common-anchor-header">Erstellen Sie die Sammlung</h4><p>Erstellen Sie nun die Sammlung unter Verwendung der definierten Schema- und Indexparameter:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
    schema=schema,
    index_params=index_params
)

client.load_collection(<span class="hljs-string">&#x27;my_collection&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;
<span class="hljs-keyword">use</span> serde_json::json;

client.<span class="hljs-title function_ invoke__">create_collection</span>(
    CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">schema</span>(schema)
        .<span class="hljs-title function_ invoke__">index_param</span>(index_params)
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">load_collection</span>(LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>().<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema))
                                    .<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_params));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Sammlung mit einer BM25-Funktion erstellt ist, können Sie Text einfügen und lexikalische Suchen auf der Grundlage von Textabfragen durchführen.</p>
<h2 id="Step-2-Insert-text-data-into-the-collection" class="common-anchor-header">Schritt 2: Textdaten in die Sammlung einfügen<button data-href="#Step-2-Insert-text-data-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihre Sammlung und Ihren Index eingerichtet haben, können Sie Textdaten einfügen. Dabei müssen Sie lediglich den Rohtext bereitstellen. Die zuvor definierte BM25-Funktion generiert automatisch den Sparse-Vektor für jeden Texteintrag.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.insert(<span class="hljs-string">&#x27;my_collection&#x27;</span>, [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval is a field of study.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval focuses on finding relevant information in large datasets.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;data mining and information retrieval overlap in research.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>,
        <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>,
        <span class="hljs-string">&quot;data mining and information retrieval overlap in research.&quot;</span>,
    }),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">insert</span>(
    InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">rows</span>(<span class="hljs-built_in">vec!</span>[
            json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>}),
            json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>}),
            json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;data mining and information retrieval overlap in research.&quot;</span>}),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>}},
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>}},
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;data mining and information retrieval overlap in research.&quot;</span>}}
};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data))
                                , response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: [
        {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
        {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
        {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
    ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;text&quot;: &quot;information retrieval is a field of study.&quot;},
        {&quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;},
        {&quot;text&quot;: &quot;data mining and information retrieval overlap in research.&quot;}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text-query" class="common-anchor-header">Schritt 3: Suche mit Textabfrage<button data-href="#Step-3-Search-with-text-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Daten in Ihre Sammlung eingefügt haben, können Sie Volltextsuchen mithilfe von Rohtextabfragen durchführen. Milvus wandelt Ihre Abfrage automatisch in einen spärlichen Vektor um, ordnet die übereinstimmenden Suchergebnisse mithilfe des BM25-Algorithmus nach Relevanz und gibt anschließend die Top-K-Ergebnisse (<code translate="no">limit</code>) zurück.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
}

res = client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>], <span class="hljs-comment"># Fields to return in search results; sparse field cannot be output</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;text: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse&quot;</span>)
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
        .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                       .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)
                       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                       .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;sparse&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;BM25&#x27;</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        &quot;whats the focus of information retrieval?&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
        &quot;text&quot;
    ],
    &quot;searchParams&quot;:{
        &quot;metric_type&quot;: &quot;BM25&quot;,
        &quot;params&quot;:{}
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
