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
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> ist eine lokalitätssensitive Hash-Technik, die <a href="https://en.wikipedia.org/wiki/Jaccard_index">die Jaccard-Ähnlichkeit</a> zwischen Mengen schätzt. In Milvus folgt die MinHash-Funktion dieser Pipeline: Sie geben Rohtext als Eingabe ein, und Milvus erzeugt einen Binärvektor als Ausgabe – wobei alle Zwischenschritte intern abgewickelt werden.</p>
<p>Der gesamte Workflow besteht aus einer <strong>gemeinsamen Textverarbeitungs-Pipeline</strong>, die sowohl für die Dokumentenerfassung als auch für die Abfrageverarbeitung genutzt wird, gefolgt von phasenspezifischen Vorgängen für die Speicherung und den Abruf.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" /> 
   <span>Iaqkbfeh8oqggsx6nsocfosondo</span>
  
 </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">Gemeinsame Textverarbeitungspipeline<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
<li><p><strong>Erstellung der MinHash-Signatur</strong>: Auf die Shingle-Menge werden mehrere Hash-Funktionen (H1, H2, …, Hn, wobei n = <code translate="no">num_hashes</code>) angewendet. Für jede Hash-Funktion wird der minimale Hash-Wert über alle Shingles ausgewählt. Die Sammlung dieser Minimalwerte bildet die MinHash-Signatur – eine Darstellung fester Länge, die die Jaccard-Ähnlichkeit des Originaldokuments approximiert.</p></li>
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
<p>Da beide Verfahren dieselbe Transformationslogik nutzen, erzeugen zwei Dokumente mit stark überlappendem Inhalt ähnliche MinHash-Signaturen. Dadurch eignet sich die Funktion besonders gut zum Auffinden von Beinahe-Duplikaten, selbst wenn sich die Dokumente in der Wortreihenfolge, der Formatierung oder in geringfügigen Formulierungsunterschieden unterscheiden.</p>
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
<p>Wenn „ <code translate="no">token_level</code> “ auf „ <code translate="no">&quot;word&quot;</code> “ (Standard) gesetzt ist, muss für das Textfeld ein Analysator aktiviert sein. Der Analysator legt fest, wie der Text vor dem Shingling tokenisiert wird. Standardmäßig verwendet Milvus den Analysator „ <code translate="no">standard</code> “. Informationen zum Konfigurieren eines anderen Analysators finden Sie unter <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md">„Wählen Sie den richtigen Analysator für Ihren Anwendungsfall</a>“.</p></li>
<li><p><strong>Ein Binärvektorfeld für die MinHash-Ausgabe</strong></p>
<p>Ihre Sammlung muss ein Feld vom Typ „ <code translate="no">BINARY_VECTOR</code> “ enthalten, um die von der MinHash-Funktion generierten Binärvektoren zu speichern. Die Dimension muss „ <code translate="no">32 * num_hashes</code> “ entsprechen.</p></li>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
    </button></h3><p>Die MinHash-Funktion wandelt den analysierten Text in binäre Vektoren um, die die Jaccard-Ähnlichkeit zwischen Dokumenten approximieren.</p>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
    </button></h2><p>Sobald Sie Daten eingefügt haben, suchen Sie nach nahezu identischen Dokumenten, indem Sie Suchanfragen im Rohtext eingeben. Milvus wandelt jede Suchanfrage automatisch in einen MinHash-Binärvektor um. Aktivieren Sie die Jaccard-Verfeinerung, um die LSH-Kandidaten nach der geschätzten Jaccard-Ähnlichkeit zu ordnen.</p>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setzen Sie „ <code translate="no">mh_search_with_jaccard</code> “ auf „ <code translate="no">True</code> “, um die Jaccard-Verfeinerung zu aktivieren. „ <code translate="no">refine_k</code> “ steuert die Kapazität des Kandidatenpools, der für die Verfeinerung verwendet wird. Milvus verwendet „ <code translate="no">max(refine_k, limit)</code> “ als Kapazität, verfeinert jedoch möglicherweise weniger Kandidaten, wenn die LSH-Abfrage weniger Treffer liefert. Eine Erhöhung von „ <code translate="no">refine_k</code> “ kann die Ergebnisqualität verbessern, ist jedoch mit zusätzlichem Rechenaufwand verbunden.</p>
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
