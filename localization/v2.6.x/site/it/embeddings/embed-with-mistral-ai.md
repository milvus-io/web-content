---
id: embed-with-mistral-ai.md
order: 11
summary: >-
  Questo articolo descrive come utilizzare la funzione
  MistralAIEmbeddingFunction per codificare documenti e query utilizzando il
  modello di incorporazione Mistral AI.
title: Mistral AI
---
<h1 id="Mistral-AI" class="common-anchor-header">Mistral AI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>I modelli di embedding di<a href="https://mistral.ai/">Mistral AI</a> sono modelli di text embedding progettati per convertire gli input testuali in vettori numerici densi, catturando efficacemente il significato sottostante del testo. Questi modelli sono altamente ottimizzati per compiti quali la ricerca semantica, la comprensione del linguaggio naturale e le applicazioni context-aware, rendendoli adatti a un'ampia gamma di soluzioni basate sull'intelligenza artificiale.</p>
<p>Milvus si integra con i modelli di embedding di Mistral AI tramite la classe MistralAIEmbeddingFunction. Questa classe fornisce metodi per codificare documenti e query utilizzando i modelli di embedding di Mistral AI e restituendo gli embeddings come vettori densi compatibili con l'indicizzazione di Milvus. Per utilizzare questa funzionalità, è necessario ottenere una chiave API da <a href="https://console.mistral.ai/">Mistral AI</a>.</p>
<p>Per utilizzare questa funzione, installare le dipendenze necessarie:</p>
<pre><code translate="no" class="language-python">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, istanziare la funzione MistralAIEmbeddingFunction:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> MistralAIEmbeddingFunction

ef = MistralAIEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>, <span class="hljs-comment"># Defaults to `mistral-embed`</span>
    api_key=<span class="hljs-string">&quot;MISTRAL_API_KEY&quot;</span> <span class="hljs-comment"># Provide your Mistral AI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parametri</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(stringa</em>)</p>
<p>Il nome del modello di incorporamento di Mistral AI da usare per la codifica. Il valore predefinito è <code translate="no">mistral-embed</code>. Per ulteriori informazioni, consultare <a href="https://docs.mistral.ai/capabilities/embeddings/">Embeddings</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(stringa</em>)</p>
<p>La chiave API per accedere all'API di Mistral AI.</p></li>
</ul>
<p>Per creare le incorporazioni per i documenti, utilizzare il metodo <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Il risultato atteso è simile al seguente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.06051636</span>, <span class="hljs-number">0.03207397</span>, <span class="hljs-number">0.04684448</span>, ..., -<span class="hljs-number">0.01618958</span>,
       <span class="hljs-number">0.02442932</span>, -<span class="hljs-number">0.01302338</span>]), array([-<span class="hljs-number">0.04675293</span>, <span class="hljs-number">0.06512451</span>, <span class="hljs-number">0.04290771</span>, ..., -<span class="hljs-number">0.01454926</span>,
       <span class="hljs-number">0.0014801</span> , <span class="hljs-number">0.00686646</span>]), array([-<span class="hljs-number">0.05978394</span>, <span class="hljs-number">0.08728027</span>, <span class="hljs-number">0.02217102</span>, ..., -<span class="hljs-number">0.00681305</span>,
       <span class="hljs-number">0.03634644</span>, -<span class="hljs-number">0.01802063</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Per creare embeddings per le query, utilizzare il metodo <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>,
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>L'output previsto è simile al seguente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.04916382</span>, <span class="hljs-number">0.04568481</span>, <span class="hljs-number">0.03594971</span>, ..., -<span class="hljs-number">0.02653503</span>,
       <span class="hljs-number">0.02804565</span>, <span class="hljs-number">0.00600815</span>]), array([-<span class="hljs-number">0.05938721</span>, <span class="hljs-number">0.07098389</span>, <span class="hljs-number">0.01773071</span>, ..., -<span class="hljs-number">0.01708984</span>,
       <span class="hljs-number">0.03582764</span>, <span class="hljs-number">0.00366592</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
