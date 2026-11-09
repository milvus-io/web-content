---
id: weighted-ranker.md
title: Classificatore ponderato
summary: >-
  Weighted Ranker combina e ordina in modo intelligente i risultati provenienti
  da più percorsi di ricerca, assegnando a ciascuno di essi un peso di
  importanza diverso. Proprio come uno chef esperto bilancia diversi ingredienti
  per creare il piatto perfetto, Weighted Ranker bilancia i diversi risultati di
  ricerca per fornire i risultati combinati più pertinenti. Questo approccio è
  ideale quando si effettua una ricerca su più campi vettoriali o modalità in
  cui alcuni campi dovrebbero contribuire in modo più significativo alla
  classifica finale rispetto ad altri.
---
<h1 id="Weighted-Ranker" class="common-anchor-header">Classificatore ponderato<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Weighted Ranker combina e ordina in modo intelligente i risultati provenienti da più percorsi di ricerca, assegnando a ciascuno di essi un peso di importanza diverso. Proprio come uno chef esperto bilancia diversi ingredienti per creare il piatto perfetto, il Classificatore ponderato bilancia i diversi risultati di ricerca per fornire i risultati combinati più pertinenti. Questo approccio è ideale quando si effettua una ricerca su più campi vettoriali o modalità in cui alcuni campi dovrebbero contribuire in modo più significativo alla classifica finale rispetto ad altri.</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">Quando utilizzare il Classificatore ponderato<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Il Ranker ponderato è progettato specificamente per scenari di ricerca ibrida in cui è necessario combinare i risultati provenienti da più percorsi di ricerca vettoriale. È particolarmente efficace per:</p>
<table>
   <tr>
     <th><p>Caso d’uso</p></th>
     <th><p>Esempio</p></th>
     <th><p>Perché Weighted Ranker funziona bene</p></th>
   </tr>
   <tr>
     <td><p>Ricerca nell’e-commerce</p></td>
     <td><p>Ricerca di prodotti che combina la somiglianza delle immagini e la descrizione testuale</p></td>
     <td><p>Consente ai rivenditori di dare priorità alla somiglianza visiva per gli articoli di moda, mentre per i prodotti tecnici si dà maggiore risalto alle descrizioni testuali</p></td>
   </tr>
   <tr>
     <td><p>Ricerca di contenuti multimediali</p></td>
     <td><p>Ricerca di video che utilizza sia caratteristiche visive che trascrizioni audio</p></td>
     <td><p>Bilancia l’importanza dei contenuti visivi rispetto al dialogo parlato in base all’intento della query</p></td>
   </tr>
   <tr>
     <td><p>Recupero di documenti</p></td>
     <td><p>Ricerca di documenti aziendali con più embedding per sezioni diverse</p></td>
     <td><p>Assegna un peso maggiore agli embedding di titolo e abstract, pur tenendo conto degli embedding del testo completo</p></td>
   </tr>
</table>
<p>Se la vostra applicazione di ricerca ibrida richiede la combinazione di più percorsi di ricerca controllandone al contempo l’importanza relativa, Weighted Ranker è la scelta ideale.</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">Meccanismo di Weighted Ranker<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Il flusso di lavoro principale della strategia WeightedRanker è il seguente:</p>
<ol>
<li><p><strong>Raccolta dei punteggi di ricerca</strong>: raccolta dei risultati e dei punteggi da ciascun percorso di ricerca vettoriale (score_1, score_2).</p></li>
<li><p><strong>Normalizzazione dei punteggi</strong>: ogni ricerca può utilizzare metriche di similarità diverse, con conseguenti distribuzioni dei punteggi variabili. Ad esempio, l’utilizzo del prodotto interno (IP) come tipo di similarità potrebbe dare luogo a punteggi compresi tra [−∞,+∞], mentre l’utilizzo della distanza euclidea (L2) produce punteggi compresi tra [0,+∞]. Poiché gli intervalli dei punteggi delle diverse ricerche variano e non possono essere confrontati direttamente, è necessario normalizzare i punteggi di ciascun percorso di ricerca. In genere, si applica una funzion <code translate="no">arctan</code> a per trasformare i punteggi in un intervallo compreso tra [0, 1] (score_1_normalized, score_2_normalized). I punteggi più vicini a 1 indicano una maggiore somiglianza.</p></li>
<li><p><strong>Assegnazione dei pesi</strong>: in base all’importanza assegnata ai diversi campi vettoriali, ai punteggi normalizzati (score_1_normalized, score_2_normalized) vengono assegnati dei pesi (<strong>wi</strong>). I pesi di ciascun percorso devono essere compresi nell’intervallo [0,1]. I punteggi ponderati risultanti sono score_1_weighted e score_2_weighted.</p></li>
<li><p><strong>Unire i punteggi</strong>: i punteggi ponderati (score_1_weighted, score_2_weighted) vengono ordinati dal più alto al più basso per produrre un insieme finale di punteggi (score_final).</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" /> 
   <span>Classificatore ponderato</span>
  
 </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">Esempio di Weighted Ranker<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Questo esempio illustra una ricerca ibrida multimodale (topK=5) che coinvolge immagini e testo e mostra come la strategia WeightedRanker riorganizzi la classifica dei risultati provenienti da due ricerche ANN.</p>
<ul>
<li><p>Risultati della ricerca ANN sulle immagini (topK=5):</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punteggio (immagine)</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0,92</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0,88</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0,85</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0,83</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0,8</p></td>
</tr>
</table></p></li>
<li><p>Risultati della ricerca ANN sui testi (topK=5):</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punteggio (testo)</strong></p></th>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0,91</p></td>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0,87</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>0,85</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0,82</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>0,78</p></td>
</tr>
</table></p></li>
<li><p>Utilizzare WeightedRanker per assegnare pesi ai risultati della ricerca per immagini e per testo. Supponiamo che il peso per la ricerca per immagini con ANN sia 0,6 e quello per la ricerca testuale sia 0,4.</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punteggio (immagine)</strong></p></th>
<th><p><strong>Punteggio (testo)</strong></p></th>
<th><p><strong>Punteggio ponderato</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0,92</p></td>
<td><p>0,87</p></td>
<td><p>0,6 × 0,92 + 0,4 × 0,87 = 0,90</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0,88</p></td>
<td><p>N/A</p></td>
<td><p>0,6 × 0,88 + 0,4 × 0 = 0,528</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0,85</p></td>
<td><p>N/A</p></td>
<td><p>0,6 × 0,85 + 0,4 × 0 = 0,51</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0,83</p></td>
<td><p>0,91</p></td>
<td><p>0,6 × 0,83 + 0,4 × 0,91 = 0,86</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0,80</p></td>
<td><p>0,82</p></td>
<td><p>0,6 × 0,80 + 0,4 × 0,82 = 0,81</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>Non presente nell'immagine</p></td>
<td><p>0,85</p></td>
<td><p>0,6 × 0 + 0,4 × 0,85 = 0,34</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>Non presente nell'immagine</p></td>
<td><p>0,78</p></td>
<td><p>0,6 × 0 + 0,4 × 0,78 = 0,312</p></td>
</tr>
</table></p></li>
<li><p>Risultati finali dopo la riclassificazione (topK=5):</p>
<p><table>
<tr>
<th><p><strong>Posizione</strong></p></th>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punteggio finale</strong></p></th>
</tr>
<tr>
<td><p>1</p></td>
<td><p>101</p></td>
<td><p>0,90</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0,86</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0,81</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0,528</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0,51</p></td>
</tr>
</table></p></li>
</ul>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">Utilizzo del Weighted Ranker<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si utilizza la strategia WeightedRanker, è necessario inserire i valori di ponderazione. Il numero di valori di ponderazione da inserire deve corrispondere al numero di richieste di ricerca ANN di base nella ricerca ibrida. I valori di ponderazione inseriti devono rientrare nell'intervallo [0,1], dove i valori più vicini a 1 indicano una maggiore importanza.</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">Creazione di un Weighted Ranker<button data-href="#Create-a-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Ad esempio, supponiamo che in una ricerca ibrida siano presenti due richieste di ricerca ANN di base: la ricerca testuale e la ricerca per immagini. Se la ricerca testuale è considerata più importante, è opportuno assegnarle un peso maggiore.</p>
<div class="alert note">
<p>Milvus 2.6.x e versioni successive consentono di configurare le strategie di riclassificazione direttamente tramite l’API <code translate="no">Function</code>. Se si utilizza una versione precedente (anteriore alla v2.6.0), consultare la documentazione <a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">sulla riclassificazione</a> per le istruzioni di configurazione.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;weight&quot;</span>)
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>)
                .param(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;weight&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields().
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>).
    WithParam(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weight&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">input_fields</span>(<span class="hljs-type">Vec</span>::&lt;<span class="hljs-type">String</span>&gt;::<span class="hljs-title function_ invoke__">new</span>())
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;reranker&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;weighted&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;weights&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;norm_score&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;weight&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;

<span class="hljs-comment">// Note: defining a weighted rerank function with FunctionSchema params</span>
<span class="hljs-comment">// (reranker/weights/norm_score) is not yet supported in milvus-sdk-csharp as of v3.0.0</span>
<span class="hljs-comment">// (FunctionSchema.Params cannot be populated externally). Use WeightedReranker instead.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;weight&quot;,
  &quot;inputFieldNames&quot;: [],
  &quot;functionType&quot;: &quot;RERANK&quot;,
  &quot;params&quot;: {
    &quot;reranker&quot;: &quot;weighted&quot;,
    &quot;weights&quot;: &quot;[0.1, 0.9]&quot;,
    &quot;norm_score&quot;: &quot;true&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Obbligatorio?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore/Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Identificatore univoco per questa funzione</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Elenco dei campi vettoriali a cui applicare la funzione (deve essere vuoto per il Weighted Ranker)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il tipo di funzione da invocare; utilizzare <code translate="no">RERANK</code> per specificare una strategia di riclassificazione</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il metodo di riclassificazione da utilizzare.</p><p>Deve essere impostato su <code translate="no">weighted</code> per utilizzare il Weighted Ranker.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Array di pesi corrispondenti a ciascun percorso di ricerca; valori ∈ [0,1].</p><p>Per ulteriori dettagli, consultare la sezione " <a href="/docs/it/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Meccanismo del Weighted Ranker</a>".</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>No</p></td>
     <td><p>Se normalizzare i punteggi grezzi (utilizzando arctan) prima della ponderazione.</p><p>Per ulteriori dettagli, consultare la sezione " <a href="/docs/it/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Meccanismo del Ranker ponderato</a>".</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Applicazione alla ricerca ibrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Weighted Ranker è progettato specificamente per operazioni di ricerca ibrida che combinano più campi vettoriali. Quando si esegue una ricerca ibrida, è necessario specificare i pesi per ciascun percorso di ricerca:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to the Milvus server</span>
milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(rerank)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

<span class="hljs-comment">// Define two ANN sub-search requests</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{textEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{imageEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
rerank := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})

hybridResults, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch).
    WithReranker(rerank).
    WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Define two ANN sub-search requests</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[text_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = WeightedRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">weights</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(rerank)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> text_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
                    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>);

<span class="hljs-keyword">auto</span> image_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
                    .<span class="hljs-built_in">AddFloatVector</span>(image_embedding);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(text_search)))
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(image_search)))
                    .<span class="hljs-built_in">WithRerank</span>(rerank)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;modern dining table&quot;</span> },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(imageEmbedding) },  <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment">// Text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">var</span> hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = <span class="hljs-keyword">new</span>[] { textSearch, imageSearch },  <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank,  <span class="hljs-comment">// Apply the weighted ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters { OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> } }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;search\&quot;: [
        {
            \&quot;annsField\&quot;: \&quot;text_vector\&quot;,
            \&quot;data\&quot;: [\&quot;modern dining table\&quot;],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;COSINE\&quot; },
            \&quot;limit\&quot;: 10
        },
        {
            \&quot;annsField\&quot;: \&quot;image_vector\&quot;,
            \&quot;data\&quot;: [<span class="hljs-variable">${IMAGE_EMBEDDING}</span>],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;IP\&quot; },
            \&quot;limit\&quot;: 10
        }
    ],
    \&quot;rerank\&quot;: <span class="hljs-variable">${rerank}</span>,
    \&quot;limit\&quot;: 10,
    \&quot;outputFields\&quot;: [\&quot;product_name\&quot;, \&quot;price\&quot;, \&quot;category\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulla ricerca ibrida, consultare <a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a>.</p>
