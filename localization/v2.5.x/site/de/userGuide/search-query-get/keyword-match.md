---
id: keyword-match.md
summary: >-
  Der Textabgleich in Milvus ermöglicht die präzise Suche nach Dokumenten auf
  der Grundlage bestimmter Begriffe. Diese Funktion wird in erster Linie für die
  gefilterte Suche nach bestimmten Bedingungen verwendet und kann eine skalare
  Filterung zur Verfeinerung der Abfrageergebnisse beinhalten, die eine
  Ähnlichkeitssuche innerhalb von Vektoren ermöglicht, die skalare Kriterien
  erfüllen.
title: Text-Abgleich
---
<h1 id="Text-Match​" class="common-anchor-header">Text-Abgleich<button data-href="#Text-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Textabgleich in Milvus ermöglicht die präzise Suche nach Dokumenten auf der Grundlage bestimmter Begriffe. Diese Funktion wird in erster Linie für eine gefilterte Suche verwendet, um bestimmte Bedingungen zu erfüllen, und kann eine skalare Filterung zur Verfeinerung der Abfrageergebnisse beinhalten, die eine Ähnlichkeitssuche innerhalb von Vektoren ermöglicht, die skalare Kriterien erfüllen.</p>
<div class="alert note">
<p>Der Textabgleich konzentriert sich auf die Suche nach exakten Vorkommen der Abfragebegriffe, ohne die Relevanz der übereinstimmenden Dokumente zu bewerten. Wenn Sie die relevantesten Dokumente auf der Grundlage der semantischen Bedeutung und Wichtigkeit der Abfragebegriffe abrufen möchten, empfehlen wir Ihnen die <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
</div>
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
    </button></h2><p>Milvus integriert <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, um den zugrunde liegenden invertierten Index und die begriffsbasierte Textsuche zu betreiben. Für jeden Texteintrag indiziert Milvus diesen nach folgendem Verfahren.</p>
<ol>
<li><p><a href="/docs/de/analyzer-overview.md">Analyzer</a>: Der Analyzer verarbeitet den eingegebenen Text, indem er ihn in einzelne Wörter (Token) zerlegt und dann je nach Bedarf Filter anwendet. So kann Milvus einen Index auf der Grundlage dieser Token erstellen.</p></li>
<li><p><a href="/docs/de/index-scalar-fields.md">Indizierung</a>: Nach der Textanalyse erstellt Milvus einen invertierten Index, der jedes einzelne Token den Dokumenten zuordnet, die es enthalten.</p></li>
</ol>
<p>Wenn ein Benutzer einen Textabgleich durchführt, wird der invertierte Index verwendet, um schnell alle Dokumente aufzufinden, die die Begriffe enthalten. Dies ist wesentlich schneller, als jedes Dokument einzeln zu durchsuchen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/keyword-match.png" alt="Text Match" class="doc-image" id="text-match" />
   </span> <span class="img-wrapper"> <span>Textabgleich</span> </span></p>
<h2 id="Enable-text-match" class="common-anchor-header">Aktivieren des Textabgleichs<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Textabgleich funktioniert mit dem Feldtyp <code translate="no">VARCHAR</code>, der in Milvus im Wesentlichen ein String-Datentyp ist. Um den Textabgleich zu aktivieren, setzen Sie sowohl <code translate="no">enable_analyzer</code> als auch <code translate="no">enable_match</code> auf <code translate="no">True</code> und konfigurieren dann optional einen Analyzer für die Textanalyse, wenn Sie Ihr Sammlungsschema definieren.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Setzen Sie <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code></h3><p>Um den Textabgleich für ein bestimmtes <code translate="no">VARCHAR</code> -Feld zu aktivieren, setzen Sie bei der Definition des Feldschemas die beiden Parameter <code translate="no">enable_analyzer</code> und <code translate="no">enable_match</code> auf <code translate="no">True</code>. Dies weist Milvus an, Text zu tokenisieren und einen invertierten Index für das angegebene Feld zu erstellen, was schnelle und effiziente Textabgleiche ermöglicht.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
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

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
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
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Optional: Konfigurieren Sie einen Analysator</h3><p>Die Leistung und Genauigkeit des Textabgleichs hängt vom ausgewählten Analysator ab. Verschiedene Analysatoren sind auf verschiedene Sprachen und Textstrukturen zugeschnitten, so dass die Wahl des richtigen Analysators die Suchergebnisse für Ihren speziellen Anwendungsfall erheblich beeinflussen kann.</p>
<p>Standardmäßig verwendet Milvus den Analysator <code translate="no">standard</code>, der Text auf der Grundlage von Leerzeichen und Interpunktion in Token umwandelt, Token mit mehr als 40 Zeichen entfernt und Text in Kleinbuchstaben konvertiert. Zur Anwendung dieser Standardeinstellung sind keine zusätzlichen Parameter erforderlich. Weitere Informationen finden Sie unter <a href="/docs/de/standard-analyzer.md">Standard</a>.</p>
<p>In Fällen, in denen ein anderer Analyzer erforderlich ist, können Sie diesen mit dem Parameter <code translate="no">analyzer_params</code> konfigurieren. Zum Beispiel, um den <code translate="no">english</code> Analyzer für die Verarbeitung von englischem Text anzuwenden.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">200</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    name: <span class="hljs-string">&quot;id&quot;</span>,
    data_type: DataType.Int64,
    is_primary_key: <span class="hljs-literal">true</span>,
  },
  {
    name: <span class="hljs-string">&quot;text&quot;</span>,
    data_type: <span class="hljs-string">&quot;VarChar&quot;</span>,
    enable_analyzer: <span class="hljs-literal">true</span>,
    enable_match: <span class="hljs-literal">true</span>,
    max_length: <span class="hljs-number">1000</span>,
    analyzer_params: { <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;english&#x27;</span> },
  },
  {
    name: <span class="hljs-string">&quot;sparse&quot;</span>,
    data_type: DataType.SparseFloatVector,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
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
                    &quot;max_length&quot;: 200,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Milvus bietet auch verschiedene andere Analyzer, die für unterschiedliche Sprachen und Szenarien geeignet sind. Weitere Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md">Übersicht</a>.</p>
<h2 id="Use-text-match" class="common-anchor-header">Textabgleich verwenden<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie die Textübereinstimmung für ein VARCHAR-Feld in Ihrem Sammlungsschema aktiviert haben, können Sie Textübereinstimmungen mit dem Ausdruck <code translate="no">TEXT_MATCH</code> durchführen.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">Syntax des TEXT_MATCH-Ausdrucks</h3><p>Der Ausdruck <code translate="no">TEXT_MATCH</code> wird verwendet, um das Feld und die Begriffe anzugeben, nach denen gesucht werden soll. Seine Syntax lautet wie folgt.</p>
<pre><code translate="no">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: Der Name des VARCHAR-Feldes, nach dem gesucht werden soll.</p></li>
<li><p><code translate="no">text</code>: Die Begriffe, nach denen gesucht werden soll. Mehrere Begriffe können durch Leerzeichen oder andere geeignete Trennzeichen getrennt werden, je nach Sprache und konfiguriertem Analysator.</p></li>
</ul>
<p>Standardmäßig verwendet <code translate="no">TEXT_MATCH</code> die Logik der <strong>ODER-Verknüpfung</strong>, d.h. es werden Dokumente zurückgegeben, die einen der angegebenen Begriffe enthalten. Um zum Beispiel nach Dokumenten zu suchen, die den Begriff <code translate="no">machine</code> oder <code translate="no">deep</code> im Feld <code translate="no">text</code> enthalten, verwenden Sie den folgenden Ausdruck.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch mehrere <code translate="no">TEXT_MATCH</code> Ausdrücke mit logischen Operatoren kombinieren, um einen <strong>UND-Abgleich</strong> durchzuführen.</p>
<ul>
<li><p>Um nach Dokumenten zu suchen, die sowohl <code translate="no">machine</code> als auch <code translate="no">deep</code> im Feld <code translate="no">text</code> enthalten, verwenden Sie den folgenden Ausdruck.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Um nach Dokumenten zu suchen, die sowohl <code translate="no">machine</code> als auch <code translate="no">learning</code>, aber nicht <code translate="no">deep</code> im Feld <code translate="no">text</code> enthalten, verwenden Sie die folgenden Ausdrücke:</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-keyword">export</span> filter=<span class="hljs-string">&quot;\&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Search-with-text-match​" class="common-anchor-header">Suche mit Textabgleich</h3><p>Textabgleich kann in Kombination mit der Vektorähnlichkeitssuche verwendet werden, um den Suchbereich einzugrenzen und die Suchleistung zu verbessern. Indem Sie die Sammlung vor der Vektorähnlichkeitssuche mit einem Textabgleich filtern, können Sie die Anzahl der zu durchsuchenden Dokumente reduzieren, was zu schnelleren Abfragezeiten führt.</p>
<p>In diesem Beispiel filtert der Ausdruck <code translate="no">filter</code> die Suchergebnisse so, dass nur Dokumente enthalten sind, die mit dem angegebenen Begriff <code translate="no">keyword1</code> oder <code translate="no">keyword2</code> übereinstimmen. Die Vektorähnlichkeitssuche wird dann auf dieser gefilterten Teilmenge von Dokumenten durchgeführt.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector)))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

<span class="hljs-comment">// Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.search(
    collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment">// Your collection name</span>
    anns_field: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    data: [query_vector], <span class="hljs-comment">// Query vector</span>
    filter: filter,
    <span class="hljs-keyword">params</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    limit: <span class="hljs-number">10</span>, <span class="hljs-comment">// Max. number of results to return</span>
    output_fields: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment">//Fields to return</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;annsField&quot;: &quot;my_vector&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;text&quot;,&quot;id&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-text-match​" class="common-anchor-header">Abfrage mit Textabgleich</h3><p>Die Textübereinstimmung kann auch für die skalare Filterung in Abfrageoperationen verwendet werden. Durch die Angabe eines <code translate="no">TEXT_MATCH</code> -Ausdrucks im <code translate="no">expr</code> -Parameter der <code translate="no">query()</code> -Methode können Sie Dokumente abrufen, die mit den angegebenen Begriffen übereinstimmen.</p>
<p>Im folgenden Beispiel werden Dokumente abgerufen, bei denen das Feld <code translate="no">text</code> die beiden Begriffe <code translate="no">keyword1</code> und <code translate="no">keyword2</code> enthält.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-attr">filter</span>: filter, 
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo2&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Überlegungen<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Die Aktivierung des Textabgleichs für ein Feld löst die Erstellung eines invertierten Indexes aus, der Speicherressourcen verbraucht. Berücksichtigen Sie die Auswirkungen auf den Speicherplatz, wenn Sie sich für die Aktivierung dieser Funktion entscheiden, da diese je nach Textgröße, eindeutigen Token und dem verwendeten Analysator variieren.</p></li>
<li><p>Sobald Sie einen Analyzer in Ihrem Schema definiert haben, werden seine Einstellungen für diese Sammlung dauerhaft. Wenn Sie entscheiden, dass ein anderer Analyzer Ihren Anforderungen besser entspricht, können Sie die bestehende Sammlung löschen und eine neue mit der gewünschten Analyzer-Konfiguration erstellen.</p></li>
<li><p>Escape-Regeln in <code translate="no">filter</code> Ausdrücken:</p>
<ul>
<li>Zeichen, die in doppelten oder einfachen Anführungszeichen innerhalb von Ausdrücken eingeschlossen sind, werden als Stringkonstanten interpretiert. Wenn die Zeichenkettenkonstante Escape-Zeichen enthält, müssen die Escape-Zeichen mit einer Escape-Sequenz dargestellt werden. Verwenden Sie zum Beispiel <code translate="no">\\</code> für <code translate="no">\</code>, <code translate="no">\\t</code> für einen Tabulator <code translate="no">\t</code> und <code translate="no">\\n</code> für einen Zeilenumbruch.</li>
<li>Wenn eine Stringkonstante von einfachen Anführungszeichen eingeschlossen ist, sollte ein einfaches Anführungszeichen innerhalb der Konstante als <code translate="no">\\'</code> dargestellt werden, während ein doppeltes Anführungszeichen entweder als <code translate="no">&quot;</code> oder <code translate="no">\\&quot;</code> dargestellt werden kann. Beispiel: <code translate="no">'It\\'s milvus'</code>.</li>
<li>Wenn eine String-Konstante von doppelten Anführungszeichen eingeschlossen ist, sollte ein doppeltes Anführungszeichen innerhalb der Konstante als <code translate="no">\\&quot;</code> dargestellt werden, während ein einfaches Anführungszeichen entweder als <code translate="no">'</code> oder <code translate="no">\\'</code> dargestellt werden kann. Beispiel: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</li>
</ul></li>
</ul>
