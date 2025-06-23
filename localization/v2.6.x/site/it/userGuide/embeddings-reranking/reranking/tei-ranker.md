---
id: tei-ranker.md
title: Classificatore TEICompatible with Milvus 2.6.x
summary: >-
  Il TEI Ranker sfrutta il servizio Text Embedding Inference (TEI) di Hugging
  Face per migliorare la rilevanza delle ricerche attraverso una
  riclassificazione semantica. Rappresenta un approccio avanzato all'ordinamento
  dei risultati di ricerca che va oltre la tradizionale similarità vettoriale.
beta: Milvus 2.6.x
---
<h1 id="TEI-Ranker" class="common-anchor-header">Classificatore TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#TEI-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Il TEI Ranker sfrutta il servizio <a href="/docs/it/v2.6.x/tei-ranker.md">Text Embedding Inference (TEI)</a> di Hugging Face per migliorare la rilevanza delle ricerche attraverso una riclassificazione semantica. Rappresenta un approccio avanzato all'ordinamento dei risultati di ricerca che va oltre la tradizionale somiglianza vettoriale.</p>
<p>Rispetto a <a href="/docs/it/v2.6.x/vllm-ranker.md">vLLM Ranker</a>, TEI Ranker offre una semplice integrazione con l'ecosistema di Hugging Face e con i modelli di reranking pre-addestrati, rendendolo ideale per le applicazioni in cui la facilità di implementazione e di manutenzione sono prioritarie.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di implementare vLLM Ranker in Milvus, assicurarsi di avere:</p>
<ul>
<li><p>Una raccolta Milvus con un campo <code translate="no">VARCHAR</code> contenente il testo da rerankizzare.</p></li>
<li><p>Un servizio TEI funzionante con capacità di reranking. Per istruzioni dettagliate sulla configurazione di un servizio TEI, consultare la <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour">documentazione ufficiale TEI</a>.</p></li>
</ul>
<h2 id="Create-a-TEI-ranker-function" class="common-anchor-header">Creare una funzione TEI Ranker<button data-href="#Create-a-TEI-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Per utilizzare TEI Ranker nella vostra applicazione Milvus, create un oggetto Function che specifichi come deve funzionare il reranking. Questa funzione verrà passata alle operazioni di ricerca di Milvus per migliorare la classificazione dei risultati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure TEI Ranker</span>
tei_ranker = Function(
    name=<span class="hljs-string">&quot;tei_semantic_ranker&quot;</span>,            <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],        <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,     <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,               <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,                 <span class="hljs-comment"># Specifies TEI as the service provider</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],  <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># Your TEI service URL</span>
        <span class="hljs-string">&quot;maxBatch&quot;</span>: <span class="hljs-number">32</span>,                    <span class="hljs-comment"># Optional: batch size for processing (default: 32)</span>
        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-literal">True</span>,                <span class="hljs-comment"># Optional: Truncate the inputs that are longer than the maximum supported size</span>
        <span class="hljs-string">&quot;truncation_direction&quot;</span>: <span class="hljs-string">&quot;Right&quot;</span>,    <span class="hljs-comment"># Optional: Direction to truncate the inputs</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="TEI-ranker-specific-parameters" class="common-anchor-header">Parametri specifici di TEI Ranker</h3><p>I seguenti parametri sono specifici del ranker TEI:</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Richiesto?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore / Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>No</p></td>
     <td><p>Se troncare o meno gli input che superano la lunghezza massima della sequenza. Se <code translate="no">False</code>, gli input lunghi generano errori.</p></td>
     <td><p><code translate="no">True</code> oppure <code translate="no">False</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>No</p></td>
     <td><p>Direzione da cui troncare quando l'input è troppo lungo:</p>
<ul>
<li><p><code translate="no">"Right"</code> (predefinito):  I token vengono rimossi dalla fine della sequenza finché non viene soddisfatta la dimensione massima supportata.</p></li>
<li><p><code translate="no">"Left"</code>: I token vengono rimossi dall'inizio della sequenza.</p></li>
</ul></td>
     <td><p><code translate="no">"Right"</code> o <code translate="no">"Left"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Per i parametri generali condivisi da tutti i classificatori di modelli (ad esempio, <code translate="no">provider</code>, <code translate="no">queries</code>), fare riferimento a <a href="/docs/it/v2.6.x/model-ranker-overview.md#Create-a-model-ranker">Creare un classificatore di modelli</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Applicare alla ricerca vettoriale standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Per applicare TEI Ranker a una ricerca vettoriale standard:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with vLLM reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=tei_ranker,                         <span class="hljs-comment"># Apply tei reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">Applicare alla ricerca ibrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>TEI Ranker può essere utilizzato anche con la ricerca ibrida per combinare metodi di reperimento densi e radi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with vLLM reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=tei_ranker,                        <span class="hljs-comment"># Apply tei reranking to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
