---
id: full-text-search.md
title: Volltextsuche
related_key: 'full, text, search'
summary: >-
  Die Volltextsuche ist eine Funktion, die Dokumente abruft, die bestimmte
  Begriffe oder Phrasen in Textdatensätzen enthalten, und dann die Ergebnisse
  nach Relevanz einstuft.
---
<h1 id="Full-Text-Search​" class="common-anchor-header">Volltextsuche<button data-href="#Full-Text-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Volltextsuche ist eine Funktion, die Dokumente mit bestimmten Begriffen oder Phrasen in Textdatensätzen abruft und die Ergebnisse dann nach Relevanz einstuft. Diese Funktion überwindet die Beschränkungen der semantischen Suche, bei der präzise Begriffe übersehen werden können, und stellt sicher, dass Sie die genauesten und kontextuell relevanten Ergebnisse erhalten. Darüber hinaus vereinfacht es die Vektorsuche, indem es Rohtexteingaben akzeptiert und Ihre Textdaten automatisch in spärliche Einbettungen konvertiert, ohne dass Sie manuell Vektoreinbettungen erstellen müssen.</p>
<p>Durch die Verwendung des BM25-Algorithmus für die Relevanzbewertung ist diese Funktion besonders wertvoll in Retrieval-Augmented-Generating-Szenarien (RAG), bei denen Dokumente mit hoher Übereinstimmung mit bestimmten Suchbegriffen priorisiert werden.</p>
<div class="alert note">
<p>Durch die Integration der Volltextsuche mit der semantikbasierten dichten Vektorsuche können Sie die Genauigkeit und Relevanz der Suchergebnisse verbessern. Weitere Informationen finden Sie unter <a href="/docs/de/multi-vector-search.md">Hybride Suche</a>.</p>
</div>
<h2 id="Overview​" class="common-anchor-header">Überblick<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Volltextsuche vereinfacht den Prozess der textbasierten Suche, indem sie die Notwendigkeit der manuellen Einbettung eliminiert. Diese Funktion funktioniert über den folgenden Arbeitsablauf.</p>
<ol>
<li><p><strong>Texteingabe</strong>: Sie fügen Rohtextdokumente ein oder stellen Abfragetext bereit, ohne dass eine manuelle Einbettung erforderlich ist.</p></li>
<li><p><strong>Text-Analyse</strong>: Milvus verwendet einen Analysator, um den eingegebenen Text in einzelne, durchsuchbare Begriffe zu zerlegen.</p></li>
<li><p><strong>Funktions-Verarbeitung</strong>: Die eingebaute Funktion empfängt tokenisierte Begriffe und wandelt sie in spärliche Vektordarstellungen um.</p></li>
<li><p><strong>Sammlungsspeicher</strong>: Milvus speichert diese spärlichen Einbettungen in einer Sammlung, um sie effizient abrufen zu können.</p></li>
<li><p><strong>BM25-Bewertung</strong>: Während einer Suche wendet Milvus den BM25-Algorithmus an, um die Punktzahlen für die gespeicherten Dokumente zu berechnen und die übereinstimmenden Ergebnisse nach ihrer Relevanz für den Abfragetext zu ordnen.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>Volltextsuche</span> </span></p>
<p>Um die Volltextsuche zu nutzen, führen Sie die folgenden Schritte aus.</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">Erstellen Sie eine Sammlung</a>: Richten Sie eine Sammlung mit den erforderlichen Feldern ein und definieren Sie eine Funktion zur Umwandlung von Rohtext in Sparse Embeddings.</p></li>
<li><p><a href="#Insert-text-data">Daten einfügen</a>: Fügen Sie Ihre Rohtextdokumente in die Sammlung ein.</p></li>
<li><p><a href="#Perform-full-text-search">Suchen durchführen</a>: Verwenden Sie Abfragetexte, um Ihre Sammlung zu durchsuchen und relevante Ergebnisse zu erhalten.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">Erstellen Sie eine Sammlung für die Volltextsuche<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Volltextsuche zu ermöglichen, erstellen Sie eine Sammlung mit einem bestimmten Schema. Dieses Schema muss drei notwendige Felder enthalten.</p>
<ul>
<li><p>Das Primärfeld, das jede Entität in einer Sammlung eindeutig identifiziert.</p></li>
<li><p>Ein <code translate="no">VARCHAR</code> -Feld, das Rohtextdokumente speichert, wobei das <code translate="no">enable_analyzer</code> -Attribut auf <code translate="no">True</code> gesetzt ist. Dies ermöglicht Milvus die Tokenisierung von Text in spezifische Begriffe für die Funktionsverarbeitung.</p></li>
<li><p>Ein <code translate="no">SPARSE_FLOAT_VECTOR</code> Feld, das für die Speicherung von Sparse Embeddings reserviert ist, die Milvus automatisch für das <code translate="no">VARCHAR</code> Feld generiert.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">Definieren Sie das Sammlungsschema</h3><p>Erstellen Sie zunächst das Schema und fügen Sie die erforderlichen Felder hinzu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration.</p>
<ul>
<li><p><code translate="no">id</code>: dient als Primärschlüssel und wird automatisch mit <code translate="no">auto_id=True</code> generiert.</p></li>
<li><p><code translate="no">text</code>: speichert Ihre Rohtextdaten für Volltextsuchvorgänge. Der Datentyp muss <code translate="no">VARCHAR</code> sein, da <code translate="no">VARCHAR</code> der String-Datentyp von Milvus für die Textspeicherung ist. Setzen Sie <code translate="no">enable_analyzer=True</code>, um Milvus die Tokenisierung des Textes zu ermöglichen. Standardmäßig verwendet Milvus den <a href="/docs/de/standard-analyzer.md">Standard-Analysator</a> für die Textanalyse. Um einen anderen Analyzer zu konfigurieren, siehe <a href="/docs/de/analyzer-overview.md">Übersicht</a>.</p></li>
<li><p><code translate="no">sparse</code>: ein Vektorfeld, das für die Speicherung von intern generierten Sparse Embeddings für Volltextsuchoperationen reserviert ist. Der Datentyp muss <code translate="no">SPARSE_FLOAT_VECTOR</code> sein.</p></li>
</ul>
<p>Definieren Sie nun eine Funktion, die Ihren Text in Sparse-Vektor-Darstellungen umwandelt, und fügen Sie sie dann dem Schema hinzu.</p>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">Parameter</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">Beschreibung</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">Der Name der Funktion. Diese Funktion wandelt Ihren Rohtext aus dem Feld <code translate="no">text</code> in durchsuchbare Vektoren um, die im Feld <code translate="no">sparse</code> gespeichert werden.</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">Der Name des Feldes <code translate="no">VARCHAR</code>, das die Umwandlung des Textes in spärliche Vektoren erfordert. Für <code translate="no">FunctionType.BM25</code> akzeptiert dieser Parameter nur einen Feldnamen.</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">Der Name des Feldes, in dem die intern erzeugten Sparse-Vektoren gespeichert werden. Für <code translate="no">FunctionType.BM25</code> akzeptiert dieser Parameter nur einen Feldnamen.</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">Der Typ der zu verwendenden Funktion. Setzen Sie den Wert auf <code translate="no">FunctionType.BM25</code>.</p>
</td></tr></tbody></table>
<div class="alert note">
<p>Für Sammlungen mit mehreren <code translate="no">VARCHAR</code> Feldern, die eine Konvertierung von Text in Sparse Vectors erfordern, fügen Sie separate Funktionen zum Sammlungsschema hinzu und stellen sicher, dass jede Funktion einen eindeutigen Namen und <code translate="no">output_field_names</code> Wert hat.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">Konfigurieren Sie den Index</h3><p>Nachdem Sie das Schema mit den erforderlichen Feldern und der integrierten Funktion definiert haben, richten Sie den Index für Ihre Sammlung ein. Um diesen Prozess zu vereinfachen, verwenden Sie <code translate="no">AUTOINDEX</code> als <code translate="no">index_type</code>, eine Option, die es Milvus ermöglicht, den am besten geeigneten Indextyp auf der Grundlage der Struktur Ihrer Daten auszuwählen und zu konfigurieren.</p>
<pre><code translate="no" class="language-python">index_params = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">Parameter</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">Beschreibung</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">Der Name des zu indizierenden Vektorfeldes. Für die Volltextsuche sollte dies das Feld sein, das die generierten Sparse-Vektoren speichert. In diesem Beispiel setzen Sie den Wert auf <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">Der Typ des zu erstellenden Indexes. <code translate="no">AUTOINDEX</code> ermöglicht es Milvus, die Indexeinstellungen automatisch zu optimieren. Wenn Sie mehr Kontrolle über Ihre Indexeinstellungen benötigen, können Sie aus verschiedenen Indextypen wählen, die für Sparse-Vektoren in Milvus verfügbar sind. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">In Milvus unterstützte Indizes</a>.</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">Der Wert für diesen Parameter muss speziell für die Volltextsuche auf <code translate="no">BM25</code> gesetzt werden.</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">Erstellen Sie die Sammlung</h3><p>Erstellen Sie nun die Sammlung unter Verwendung der definierten Schema- und Indexparameter.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">Einfügen von Textdaten<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihre Sammlung und Ihren Index eingerichtet haben, können Sie nun Textdaten einfügen. Bei diesem Vorgang müssen Sie nur den Rohtext bereitstellen. Die integrierte Funktion, die wir zuvor definiert haben, erzeugt automatisch den entsprechenden Sparse-Vektor für jeden Texteintrag.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Artificial intelligence was founded as an academic discipline in 1956.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;</span>},​
])​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">Volltextsuche durchführen<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Daten in Ihre Sammlung eingefügt haben, können Sie eine Volltextsuche mit Rohtextabfragen durchführen. Milvus wandelt Ihre Abfrage automatisch in einen Sparse-Vektor um und ordnet die übereinstimmenden Suchergebnisse mit Hilfe des BM25-Algorithmus ein und gibt dann die TopK (<code translate="no">limit</code>) Ergebnisse zurück.</p>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.6},​
}​
​
MilvusClient.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;Who started AI research?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">Parameter</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">Beschreibung</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">Ein Wörterbuch mit Suchparametern.</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">Anteil der niederfrequenten Begriffe, die bei der Suche ignoriert werden sollen. Einzelheiten finden Sie unter <a href="/docs/de/sparse_vector.md">Sparse Vector</a>.</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">Der rohe Abfragetext.</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">Der Name des Feldes, das intern generierte Sparse-Vektoren enthält.</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">Maximale Anzahl der zurückzugebenden Top-Treffer.</p>
</td></tr></tbody></table>
<p></p>
