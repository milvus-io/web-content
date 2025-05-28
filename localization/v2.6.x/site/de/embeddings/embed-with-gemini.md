---
id: embed-with-gemini.md
order: 2
summary: >-
  Milvus lässt sich über die Klasse GeminiEmbeddingFunction mit den Modellen von
  OpenAI integrieren.
title: Gemini
---
<h1 id="Gemini" class="common-anchor-header">Gemini<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist mit den Gemini-Modellen über die Klasse <strong>GeminiEmbeddingFunction</strong> integriert. Diese Klasse bietet Methoden zur Kodierung von Dokumenten und Abfragen unter Verwendung der trainierten Gemini-Modelle und gibt die Einbettungen als dichte Vektoren zurück, die mit der Milvus-Indizierung kompatibel sind. Um diese Funktionalität zu nutzen, erhalten Sie einen API-Schlüssel von <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a>, indem Sie ein Konto auf deren Plattform erstellen.</p>
<p>Um diese Funktion zu nutzen, installieren Sie die erforderlichen Abhängigkeiten:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dann instanziieren Sie die <strong>GeminiEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameter</strong>:</p>
<ul>
<li><p><strong>model_name</strong><em>(String</em>)</p>
<p>Der Name des Gemini-Modells, das für die Kodierung verwendet werden soll. Gültige Optionen sind <strong>gemini-embedding-exp-03-07</strong>(Standard), <strong>models/embedding-001</strong> und <strong>models/text-embedding-004</strong>.</p></li>
<li><p><strong>api_key</strong><em>(Zeichenfolge</em>)</p>
<p>Der API-Schlüssel für den Zugriff auf die Gemini-API.</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) Optionale Konfiguration für das Einbettungsmodell.</p>
<ul>
<li>Die <strong>output_dimensionality</strong> kann für die Anzahl der resultierenden Ausgabeeinbettungen angegeben werden.</li>
<li>Der <strong>task_type</strong> kann angegeben werden, um optimierte Einbettungen für bestimmte Aufgaben zu generieren, wodurch Zeit und Kosten gespart und die Leistung verbessert werden kann. Wird nur im Modell <strong>gemini-embedding-exp-03-07</strong> unterstützt.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>Modell Name</th><th>Abmessungen</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>models/einbettung-001</td><td>768</td></tr>
<tr><td>models/text-einbettung-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Aufgabe Typ</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>SEMANTISCHE_ÄHNLICHKEIT</td><td>Dient der Erzeugung von Einbettungen, die für die Bewertung der Textähnlichkeit optimiert sind.</td></tr>
<tr><td>KLASSIFIZIERUNG</td><td>Dient der Erzeugung von Einbettungen, die für die Klassifizierung von Texten anhand vorgegebener Etiketten optimiert sind.</td></tr>
<tr><td>CLUSTERUNG</td><td>Dient zur Erzeugung von Einbettungen, die für das Clustern von Texten auf der Grundlage ihrer Ähnlichkeiten optimiert sind.</td></tr>
<tr><td>RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING und FACT_VERIFICATION</td><td>Dienen der Erzeugung von Einbettungen, die für die Dokumentensuche oder das Information Retrieval optimiert sind.</td></tr>
<tr><td>CODE_RETRIEVAL_QUERY</td><td>Dient zum Abrufen eines Codeblocks auf der Grundlage einer natürlichsprachlichen Abfrage, z. B. zum Sortieren eines Arrays oder zum Umkehren einer verknüpften Liste. Die Einbettungen der Codeblöcke werden mit RETRIEVAL_DOCUMENT berechnet.</td></tr>
</tbody>
</table>
<p>Um Einbettungen für Dokumente zu erstellen, verwenden Sie die Methode <strong>encode_documents()</strong>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = gemini_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, gemini_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Die erwartete Ausgabe ist ähnlich wie die folgende:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.00894029</span>,  <span class="hljs-number">0.00573813</span>,  <span class="hljs-number">0.013351</span>  , ..., -<span class="hljs-number">0.00042766</span>,
       -<span class="hljs-number">0.00603091</span>, -<span class="hljs-number">0.00341043</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00222347</span>,  <span class="hljs-number">0.03725113</span>,  <span class="hljs-number">0.01152256</span>, ...,  <span class="hljs-number">0.01047272</span>,
       -<span class="hljs-number">0.01701597</span>,  <span class="hljs-number">0.00565377</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00661134</span>,  <span class="hljs-number">0.00232328</span>, -<span class="hljs-number">0.01342973</span>, ..., -<span class="hljs-number">0.00514429</span>,
       -<span class="hljs-number">0.02374139</span>, -<span class="hljs-number">0.00701721</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim: <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Um Einbettungen für Abfragen zu erstellen, verwenden Sie die Methode <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Die erwartete Ausgabe ist ähnlich wie die folgende:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.02066572</span>,  <span class="hljs-number">0.02459551</span>,  <span class="hljs-number">0.00707774</span>, ...,  <span class="hljs-number">0.00259341</span>,
       -<span class="hljs-number">0.01797572</span>, -<span class="hljs-number">0.00626168</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00674969</span>,  <span class="hljs-number">0.03023903</span>,  <span class="hljs-number">0.01230692</span>, ...,  <span class="hljs-number">0.00160009</span>,
       -<span class="hljs-number">0.01710967</span>,  <span class="hljs-number">0.00972728</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
