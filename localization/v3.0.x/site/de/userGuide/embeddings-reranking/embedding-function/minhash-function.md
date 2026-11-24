---
id: minhash-function.md
title: MinHash-FunktionCompatible with Milvus 3.0.x
summary: >-
  Verwenden Sie MinHash, um Text in Binärvektoren umzuwandeln, die für die
  Jaccard-basierte Ähnlichkeitssuche und die Erkennung von Beinahe-Duplikaten
  genutzt werden können.
beta: Milvus 3.0.x
---
<h1 id="MinHash-Function" class="common-anchor-header">MinHash-Funktion<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#MinHash-Function" class="anchor-icon" translate="no">
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
    </button></h1><p>Die <strong>MinHash-Funktion</strong> wandelt Rohtext in <strong>binäre Vektoren</strong> um, die <a href="https://en.wikipedia.org/wiki/Jaccard_index">die Jaccard-Ähnlichkeit</a> zwischen Dokumenten approximieren. Sie wendet Text-Shingling und mehrere Hash-Funktionen an, um Signaturvektoren fester Länge zu erzeugen, was eine schnelle Erkennung von Beinahe-Duplikaten und die Deduplizierung von Dokumenten in großem Maßstab ermöglicht.</p>
<p>Als integrierte Funktion läuft MinHash innerhalb von Milvus und erfordert keine externe Modellinferenz oder Vorverarbeitung. Sie geben Rohtext ein, und Milvus generiert die MinHash-Signaturvektoren automatisch.</p>
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
<li><p>Das Ausgabefeld muss ein „ <code translate="no">BINARY_VECTOR</code> “ mit einer Dimension sein, die die Bedingung <code translate="no">dim % 32 == 0</code> erfüllt, da jede MinHash-Signatur ein 32-Bit-Hashwert ist.</p></li>
<li><p>Der „ <code translate="no">dim</code> “ des binären Vektorfeldes muss mit „ <code translate="no">32 * num_hashes</code> “ übereinstimmen. Eine Nichtübereinstimmung führt zu einem Fehler.</p></li>
<li><p>Bei Verwendung des Indexes „ <code translate="no">MINHASH_LSH</code> “ mit der Ausgabe der MinHash-Funktion muss „ <code translate="no">mh_element_bit_width</code> “ auf „ <code translate="no">32</code> “ gesetzt werden.</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">So funktioniert MinHash<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Erweitern, um die Funktionsweise anzuzeigen</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> ist eine lokalitätssensitive Hashing-Technik, die <a href="https://en.wikipedia.org/wiki/Jaccard_index">die Jaccard-Ähnlichkeit</a> zwischen Mengen schätzt. In Milvus folgt die MinHash-Funktion dieser Pipeline: Sie geben Rohtext als Eingabe ein, und Milvus erzeugt einen Binärvektor als Ausgabe – wobei alle Zwischenschritte intern abgewickelt werden.</p>
<p>Der gesamte Workflow besteht aus einer <strong>gemeinsamen Textverarbeitungs-Pipeline</strong>, die sowohl für die Dokumentenerfassung als auch für die Abfrageverarbeitung genutzt wird, gefolgt von phasenspezifischen Vorgängen für die Speicherung und den Abruf.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" /> 
   <span>Iaqkbfeh8oqggsx6nsocfosondo</span>
  
 </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">Gemeinsame Textverarbeitungs-Pipeline<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Sowohl die Dokumentenerfassung als auch die Abfrageverarbeitung leiten den Rohtext durch dieselbe vierstufige Transformation:</p>
<ol>
<li><p><strong>Textanalyse</strong>: Der Text wird von einem <a href="/docs/de/analyzer-overview.md">Analysator</a> verarbeitet (wenn „ <code translate="no">token_level</code> “ auf „ <code translate="no">&quot;word&quot;</code> “ gesetzt ist) oder direkt verwendet (wenn „ <code translate="no">token_level</code> “ auf „ <code translate="no">&quot;char&quot;</code> “ gesetzt ist). Bei der Tokenisierung auf Wortebene wird der für das Eingabefeld konfigurierte Analysator angewendet, um den Text in Terme zu segmentieren – beispielsweise wird aus „ <code translate="no">&quot;milvus is vector db&quot;</code> “ „ <code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code> “.</p></li>
<li><p><strong>Shingling</strong>: Die Token werden in überlappende n-Gramme (Shingles) der Größe <code translate="no">shingle_size</code> aufgeteilt. Bei 3-Grammen auf Wortebene werden beispielsweise aus den Token „ <code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> “ Shingles wie „ <code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code> “.</p></li>
<li><p><strong>Erstellung der MinHash-Signatur</strong>: Auf die Shingle-Menge werden mehrere Hash-Funktionen (H1, H2, …, Hn, wobei n = <code translate="no">num_hashes</code>) angewendet. Für jede Hash-Funktion wird der minimale Hash-Wert über alle Shingles hinweg ausgewählt. Die Sammlung dieser Minimalwerte bildet die MinHash-Signatur – eine Darstellung fester Länge, die die Jaccard-Ähnlichkeit des Originaldokuments approximiert.</p></li>
<li><p><strong>Binäre Vektorkodierung</strong>: Jeder Signaturwert ist ein 32-Bit-Hash, und die vollständige Signatur wird in ein <code translate="no">BINARY_VECTOR</code> der Dimension <code translate="no">32 * num_hashes</code> gepackt.</p></li>
</ol>
<h3 id="Document-ingestion" class="common-anchor-header">Dokumenteneingabe<button data-href="#Document-ingestion" class="anchor-icon" translate="no">
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
    </button></h3><p>Beim Einfügen wird der von der gemeinsamen Pipeline erzeugte Binärvektor im „ <code translate="no">MINHASH_LSH</code> “-Index gespeichert. Der Index verwaltet eine LSH-Tabelle (Locality-Sensitive Hashing), die ähnliche Signaturen in denselben Buckets gruppiert und so eine schnelle Abfrage von Kandidaten bei der Suche ermöglicht.</p>
<h3 id="Query-processing" class="common-anchor-header">Abfrageverarbeitung<button data-href="#Query-processing" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Suche durchläuft der Suchtext dieselbe gemeinsame Pipeline, um einen Binärvektor zu erzeugen. Dieser Vektor wird verwendet, um eine LSH-Abfrage im „ <code translate="no">MINHASH_LSH</code> “-Index durchzuführen, wodurch schnell Kandidatenpaare identifiziert werden, die wahrscheinlich ähnlich sind. Ohne Jaccard-Verfeinerung gibt Milvus LSH-Kandidaten zurück, die nicht nach der geschätzten Jaccard-Ähnlichkeit gereiht sind. Wenn die Jaccard-Verfeinerung aktiviert ist, verwendet Milvus die gespeicherten rohen MinHash-Signaturen, um die Kandidaten nach der geschätzten Jaccard-Ähnlichkeit zu ordnen und die Top-K-Ergebnisse zurückzugeben.</p>
<p>Da beide Verfahren dieselbe Transformationslogik nutzen, erzeugen zwei Dokumente mit stark überlappendem Inhalt ähnliche MinHash-Signaturen. Dadurch eignet sich die Funktion besonders gut zum Auffinden von Beinahe-Duplikaten, selbst wenn sich die Dokumente in der Wortreihenfolge, der Formatierung oder in geringfügigen Formulierungen unterscheiden.</p>
<p></details></p>
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
    </button></h2><p>Bevor Sie die MinHash-Funktion verwenden, sollten Sie Ihr Erfassungsschema so planen, dass es Folgendes enthält:</p>
<ul>
<li><p><strong>Ein Textfeld für Rohinhalte</strong></p>
<p>Ihre Sammlung muss ein Feld vom Typ „ <code translate="no">VARCHAR</code> “ enthalten, um Rohtext zu speichern. Dieses Feld dient als Eingabe für die MinHash-Funktion.</p></li>
<li><p><strong>Einen Analysator für das Textfeld</strong> (bei Verwendung der Tokenisierung auf Wortebene)</p>
<p>Wenn „ <code translate="no">token_level</code> “ auf „ <code translate="no">&quot;word&quot;</code> “ (Standard) gesetzt ist, muss für das Textfeld ein Analysator aktiviert sein. Der Analysator legt fest, wie der Text vor dem Shingling tokenisiert wird. Standardmäßig verwendet Milvus den Analysator „ <code translate="no">standard</code> “. Informationen zur Konfiguration eines anderen Analysators finden Sie unter <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md">„Wählen Sie den richtigen Analysator für Ihren Anwendungsfall</a>“.</p></li>
<li><p><strong>Ein binäres Vektorfeld für die MinHash-Ausgabe</strong></p>
<p>Ihre Sammlung muss ein Feld „ <code translate="no">BINARY_VECTOR</code> “ enthalten, um die von der MinHash-Funktion generierten Binärvektoren zu speichern. Die Dimension muss „ <code translate="no">32 * num_hashes</code> “ entsprechen.</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">Schritt 1: Erstellen Sie eine Sammlung mit einer MinHash-Funktion<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die MinHash-Funktion zu verwenden, definieren Sie diese beim Erstellen der Sammlung. Die Funktion wird Teil des Sammlungsschemas und wird beim Einfügen und Suchen von Daten automatisch angewendet.</p>
<h3 id="Define-schema-fields" class="common-anchor-header">Schemafelder definieren<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Ihr Sammlungsschema muss mindestens drei Felder enthalten:</p>
<ul>
<li><p><strong>Primärfeld</strong>: Identifiziert jede Entität in der Sammlung eindeutig.</p></li>
<li><p><strong>Textfeld</strong> (<code translate="no">VARCHAR</code>): Speichert Rohtextdokumente. Setzen Sie „ <code translate="no">enable_analyzer=True</code> “, damit Milvus den Text für die Generierung der MinHash-Signatur verarbeiten kann. Standardmäßig verwendet Milvus den Analyzer „ <code translate="no">standard</code> “ für die Textanalyse. Informationen zur Konfiguration eines anderen Analyzers finden Sie unter <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md">„Wählen Sie den richtigen Analyzer für Ihren Anwendungsfall</a>“.</p></li>
<li><p><strong>Binärvektorfeld</strong> (<code translate="no">BINARY_VECTOR</code>): Speichert Binärvektoren, die automatisch von der MinHash-Funktion generiert werden. Die Dimension muss mit <code translate="no">32 * num_hashes</code> übereinstimmen.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;document_content&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">8192</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> MilvusClientV2.CreateSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document_content&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">9000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">8192</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document_content&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">9000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">8192</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;dedup_collection&quot;</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document_content&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">9000</span>).WithEnableAnalyzer(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;binary_vector&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">8192</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: true,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true,
            &quot;autoID&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;document_content&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 9000,
                &quot;enable_analyzer&quot;: true
            }
        },
        {
            &quot;fieldName&quot;: &quot;binary_vector&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 8192
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-MinHash-function" class="common-anchor-header">Definieren Sie die MinHash-Funktion<button data-href="#Define-the-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h3><p>Die MinHash-Funktion wandelt analysierten Text in binäre Vektoren um, die die Jaccard-Ähnlichkeit zwischen Dokumenten approximieren.</p>
<p>Definieren Sie die Funktion und fügen Sie sie Ihrem Schema hinzu:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">minhash_function = Function(
    name=<span class="hljs-string">&quot;minhash_function&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text</span>
    output_field_names=[<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment"># Name of the BINARY_VECTOR field for generated signatures</span>
    function_type=FunctionType.MINHASH,
    params={
        <span class="hljs-string">&quot;num_hashes&quot;</span>: <span class="hljs-number">256</span>, <span class="hljs-comment"># Number of hash functions; produces dim = 32 * 256 = 8192</span>
        <span class="hljs-string">&quot;shingle_size&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-comment"># N-gram size for shingling</span>
    }
)

schema.add_function(minhash_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-type">Function</span> <span class="hljs-variable">minhashFunction</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;minhash_function&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document_content&quot;</span>)) <span class="hljs-comment">// Name of the VARCHAR field containing raw text</span>
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;binary_vector&quot;</span>)) <span class="hljs-comment">// Name of the BINARY_VECTOR field for generated signatures</span>
        .functionType(FunctionType.MINHASH)
        .param(<span class="hljs-string">&quot;num_hashes&quot;</span>, <span class="hljs-string">&quot;256&quot;</span>) <span class="hljs-comment">// Number of hash functions; produces dim = 32 * 256 = 8192</span>
        .param(<span class="hljs-string">&quot;shingle_size&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>) <span class="hljs-comment">// N-gram size for shingling</span>
        .build();

schema.addFunction(minhashFunction);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_function&quot;</span>,
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment">// Name of the VARCHAR field containing raw text</span>
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment">// Name of the BINARY_VECTOR field for generated signatures</span>
        <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">MINHASH</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">num_hashes</span>: <span class="hljs-number">256</span>, <span class="hljs-comment">// Number of hash functions; produces dim = 32 * 256 = 8192</span>
            <span class="hljs-attr">shingle_size</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// N-gram size for shingling</span>
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

minhashFunction := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;minhash_function&quot;</span>).
    WithType(entity.FunctionTypeMinHash).
    WithInputFields(<span class="hljs-string">&quot;document_content&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithParam(<span class="hljs-string">&quot;num_hashes&quot;</span>, <span class="hljs-number">256</span>).
    WithParam(<span class="hljs-string">&quot;shingle_size&quot;</span>, <span class="hljs-number">3</span>)

schema.WithFunction(minhashFunction)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> minhashFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;minhash_function&quot;,
    &quot;type&quot;: &quot;MinHash&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document_content&quot;
    ],
    &quot;outputFieldNames&quot;: [
        &quot;binary_vector&quot;
    ],
    &quot;params&quot;: {
        &quot;num_hashes&quot;: 256,
        &quot;shingle_size&quot;: 3
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Konfigurationsoptionen</strong></p>
<p>Das „ <code translate="no">params</code> “-Dictionary der MinHash-Funktion akzeptiert die folgenden Parameter. Bei allen Parameternamen wird <strong>die Groß-/Kleinschreibung nicht berücksichtigt</strong>.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Typ</strong></p></th>
     <th><p><strong>Standard</strong></p></th>
     <th><p><strong>Beschreibung</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>Abgeleitet von <code translate="no">dim / 32</code></p></td>
     <td><p>Anzahl der Hash-Funktionen zur Signaturerzeugung. Die Dimension des ausgegebenen Binärvektors entspricht <code translate="no">32 &ast; num_hashes</code>. Höhere Werte verringern die Varianz bei der Ähnlichkeitsschätzung, erhöhen jedoch den Rechenaufwand. Empfohlen: <code translate="no">256</code> (dim = 8192).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>N-Gram-Größe für das Shingling. Auf Wortebene: Typischerweise 1–3. Auf Zeichenebene: Typischerweise 2–6.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>Zu verwendende Hash-Funktion. Optionen: </p><ul><li><p><code translate="no">"xxhash"</code> (schnell)</p></li><li><p><code translate="no">"sha1"</code> (langsamer, höhere Kollisionsresistenz).</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>Tokenisierungsstufe. Optionen:</p><ul><li><p><code translate="no">"word"</code>: Verwendet den Analysator des Feldes für die Tokenisierung und wendet anschließend N-Gram-Shingling an.</p></li><li><p><code translate="no">"char"</code> / <code translate="no">"character"</code>: Wendet N-Gram-Shingling direkt auf die Rohzeichen an (ohne Analysator).</p><p>Die Wort-Ebene bietet eine stärkere Semantik und höhere Effizienz, ist jedoch von der sprachspezifischen Tokenisierung abhängig. Die Zeichen-Ebene ist sprachunabhängig, erzeugt jedoch höherdimensionale Shingles mit schwächerer Semantik.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>Zufallsstartwert für die Initialisierung der MinHash-Funktion.</p></td>
   </tr>
</table>
<h3 id="Configure-the-index" class="common-anchor-header">Konfigurieren Sie den Index<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Der empfohlene Indextyp für MinHash-Binärvektoren ist „ <code translate="no">MINHASH_LSH</code> “ mit dem Metriktyp „ <code translate="no">MHJACCARD</code> “.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: <span class="hljs-number">32</span>,
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">128</span>);
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">32</span>);
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">128</span>,
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">32</span>,
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>, <span class="hljs-string">&quot;binary_vector&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">128</span>).
        WithElementBitWidth(<span class="hljs-number">32</span>).
        WithRawData(<span class="hljs-literal">true</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;binary_vector&quot;,
        &quot;indexName&quot;: &quot;binary_vector&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_lsh_band&quot;: 128,
            &quot;mh_element_bit_width&quot;: 32,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setzen Sie „ <code translate="no">with_raw_data</code> “ auf „ <code translate="no">True</code> “, wenn bei Suchvorgängen die Jaccard-Verfeinerung verwendet wird. Die rohen MinHash-Signaturen werden benötigt, um die geschätzte Jaccard-Ähnlichkeit für die von der LSH-Abfrage zurückgegebenen Kandidaten zu berechnen.</p>
<h3 id="Create-the-collection" class="common-anchor-header">Erstellen Sie die Sammlung<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie die Sammlung unter Verwendung der oben definierten Schema- und Indexparameter:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;dedup_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

request=$(jq -n --argjson schema <span class="hljs-string">&quot;<span class="hljs-variable">$schema</span>&quot;</span> --argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$minhashFunction</span>&quot;</span> --argjson indexParams <span class="hljs-string">&quot;<span class="hljs-variable">$indexParams</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;dedup_collection&quot;,
    schema: ($schema + {functions: [$fn]}),
    indexParams: $indexParams
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;dedup_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-documents" class="common-anchor-header">Schritt 2: Dokumente einfügen<button data-href="#Step-2-Insert-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>Fügen Sie nach der Einrichtung Ihrer Sammlung Textdaten ein. Sie müssen lediglich den Rohtext bereitstellen – die MinHash-Funktion generiert automatisch den Binärvektor für jedes Dokument.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.insert(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    [
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>},
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

List&lt;String&gt; documents = Arrays.asList(
        <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>
);

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (String document : documents) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;document_content&quot;</span>, document);
    rows.add(row);
}

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;dedup_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [
        { <span class="hljs-attr">document_content</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span> },
        { <span class="hljs-attr">document_content</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span> },
        { <span class="hljs-attr">document_content</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span> },
    ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
)

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;dedup_collection&quot;</span>).
    WithColumns(column.NewColumnVarChar(<span class="hljs-string">&quot;document_content&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>,
        <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>,
    })))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;dedup_collection&quot;,
    &quot;data&quot;: [
        {&quot;document_content&quot;: &quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;},
        {&quot;document_content&quot;: &quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;},
        {&quot;document_content&quot;: &quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">Schritt 3: Suche mit MinHash<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Daten eingefügt haben, suchen Sie nach nahezu identischen Dokumenten, indem Sie Rohtext-Abfragen eingeben. Milvus wandelt jede Abfrage automatisch in einen MinHash-Binärvektor um. Aktivieren Sie die Jaccard-Verfeinerung, um die LSH-Kandidaten nach der geschätzten Jaccard-Ähnlichkeit zu ordnen.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">3</span>,
    },
}

results = client.search(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document_content&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document_content&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>);
searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">3</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;dedup_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document_content&quot;</span>))
        .searchParams(searchParams)
        .build());

<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; hits : results.getSearchResults()) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : hits) {
        System.out.println(<span class="hljs-string">&quot;ID: &quot;</span> + hit.getId() + <span class="hljs-string">&quot;, Distance: &quot;</span> + hit.getScore());
        System.out.println(<span class="hljs-string">&quot;Document: &quot;</span> + hit.getEntity().get(<span class="hljs-string">&quot;document_content&quot;</span>));
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document_content&quot;</span>],
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">3</span>,
    },
});

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> results.<span class="hljs-property">results</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`ID: <span class="hljs-subst">${hit.id}</span>, Distance: <span class="hljs-subst">${hit.score}</span>`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Document: <span class="hljs-subst">${hit.document_content}</span>`</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

annParam := index.NewMinHashLSHAnnParam().
    WithSearchWithJACCARD(<span class="hljs-literal">true</span>).
    WithRefineK(<span class="hljs-number">3</span>)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithAnnParam(annParam).
    WithOutputFields(<span class="hljs-string">&quot;document_content&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;dedup_collection&quot;,
    &quot;data&quot;: [&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;],
    &quot;annsField&quot;: &quot;binary_vector&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;document_content&quot;],
    &quot;searchParams&quot;: {
        &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
        &quot;params&quot;: {
            &quot;mh_search_with_jaccard&quot;: true,
            &quot;refine_k&quot;: 3
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setzen Sie „ <code translate="no">mh_search_with_jaccard</code> “ auf „ <code translate="no">True</code> “, um die Jaccard-Verfeinerung zu aktivieren. „ <code translate="no">refine_k</code> “ steuert die Kapazität des Kandidatenpools, der für die Verfeinerung verwendet wird. Milvus verwendet „ <code translate="no">max(refine_k, limit)</code> “ als Kapazität, kann jedoch möglicherweise weniger Kandidaten verfeinern, wenn die LSH-Abfrage weniger Treffer liefert. Eine Erhöhung von „ <code translate="no">refine_k</code> “ kann die Ergebnisqualität verbessern, ist jedoch mit zusätzlichem Rechenaufwand verbunden.</p>
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
<li><p><a href="/docs/de/full-text-search.md">Volltextsuche</a>: Verwenden Sie BM25 für das lexikalische Relevanz-Ranking anstelle der Erkennung von Beinahe-Duplikaten.</p></li>
<li><p><a href="/docs/de/analyzer-overview.md">Übersicht über Analysatoren</a>: Konfigurieren Sie benutzerdefinierte Analysatoren für die Text-Tokenisierung.</p></li>
<li><p><a href="/docs/de/minhash-lsh.md">MINHASH_LSH-Index</a>: Erfahren Sie mehr über die Optimierung der LSH-Parameter für Recall und Leistung.</p></li>
</ul>
