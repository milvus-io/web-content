---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  L'indicizzazione bitmap è una tecnica di indicizzazione efficiente progettata
  per migliorare le prestazioni delle query su campi scalari a bassa
  cardinalità.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indicizzazione bitmap è una tecnica di indicizzazione efficiente progettata per migliorare le prestazioni delle query su campi scalari a bassa cardinalità. La cardinalità si riferisce al numero di valori distinti in un campo. I campi con meno elementi distinti sono considerati a bassa cardinalità.</p>
<p>Questo tipo di indice aiuta a ridurre il tempo di recupero delle query scalari rappresentando i valori del campo in un formato binario compatto ed eseguendo efficienti operazioni bitwise su di essi. Rispetto ad altri tipi di indici, gli indici bitmap hanno in genere una maggiore efficienza di spazio e una maggiore velocità di interrogazione quando si tratta di campi a bassa cardinalità.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Il termine Bitmap combina due parole: <strong>Bit</strong> e <strong>Map</strong>. Un bit rappresenta la più piccola unità di dati in un computer, che può contenere solo il valore <strong>0</strong> o <strong>1</strong>. Una mappa, in questo contesto, si riferisce a un'unità di dati che non può essere utilizzata. Una mappa, in questo contesto, si riferisce al processo di trasformazione e organizzazione dei dati in base al valore da assegnare a 0 e a 1.</p>
<p>Un indice bitmap è costituito da due componenti principali: le bitmap e le chiavi. Le chiavi rappresentano i valori unici del campo indicizzato. Per ogni valore univoco, esiste una bitmap corrispondente. La lunghezza di queste bitmap è pari al numero di record della collezione. Ogni bit della bitmap corrisponde a un record della collezione. Se il valore del campo indicizzato in un record corrisponde alla chiave, il bit corrispondente viene impostato a <strong>1</strong>; altrimenti, viene impostato a <strong>0</strong>.</p>
<p>Si consideri una raccolta di documenti con i campi <strong>Categoria</strong> e <strong>Pubblico</strong>. Vogliamo recuperare i documenti che rientrano nella categoria <strong>Tech</strong> e che sono aperti al <strong>pubblico</strong>. In questo caso, le chiavi per gli indici bitmap sono <strong>Tech</strong> e <strong>Public</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>Indicizzazione bitmap</span> </span></p>
<p>Come mostrato nella figura, gli indici bitmap per <strong>Categoria</strong> e <strong>Pubblico</strong> sono.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], che mostra che solo il primo e il terzo documento rientrano nella categoria <strong>Tech</strong>.</p></li>
<li><p><strong>Pubblico</strong>: [1, 0, 0, 1, 0], che mostra che solo il 1° e il 4° documento sono aperti al <strong>pubblico</strong>.</p></li>
</ul>
<p>Per trovare i documenti che corrispondono a entrambi i criteri, eseguiamo un'operazione bitwise AND su queste due bitmap.</p>
<ul>
<li><strong>Tech</strong> AND <strong>Public</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>La bitmap risultante [1, 0, 0, 0, 0] indica che solo il primo documento<strong>(ID</strong> <strong>1</strong>) soddisfa entrambi i criteri. Utilizzando indici bitmap e operazioni bitwise efficienti, è possibile restringere rapidamente l'ambito di ricerca, eliminando la necessità di scansionare l'intero set di dati.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Creare un indice bitmap<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per creare un indice bitmap in Milvus, utilizzare il metodo <code translate="no">create_index()</code> e impostare il parametro <code translate="no">index_type</code> su <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, creiamo un indice bitmap sul campo <code translate="no">category</code> della collezione <code translate="no">my_collection</code>. Il metodo <code translate="no">add_index()</code> viene usato per specificare il nome del campo, il tipo di indice e il nome dell'indice.</p>
<p>Una volta creato l'indice bitmap, è possibile utilizzare il parametro <code translate="no">filter</code> nelle operazioni di query per eseguire un filtraggio scalare basato sul campo indicizzato. Ciò consente di restringere in modo efficiente i risultati della ricerca utilizzando l'indice bitmap. Per ulteriori informazioni, consultare <ins>Filtraggio</ins>.</p>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Gli indici bitmap sono supportati solo per i campi scalari che non sono chiavi primarie.</p></li>
<li><p>Il tipo di dati del campo deve essere uno dei seguenti.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (gli elementi devono essere uno dei seguenti: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Gli indici bitmap non supportano i seguenti tipi di dati.</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: I tipi in virgola mobile non sono compatibili con la natura binaria degli indici bitmap.</p></li>
<li><p><code translate="no">JSON</code>: I tipi di dati JSON hanno una struttura complessa che non può essere rappresentata in modo efficiente con gli indici bitmap.</p></li>
</ul></li>
<li><p>Gli indici bitmap non sono adatti a campi con elevata cardinalità (cioè campi con un gran numero di valori distinti).</p>
<ul>
<li><p>Come linea guida generale, gli indici bitmap sono più efficaci quando la cardinalità di un campo è inferiore a 500. Quando la cardinalità aumenta oltre questa soglia, gli indici bitmap sono più efficaci.</p></li>
<li><p>Quando la cardinalità aumenta oltre questa soglia, i vantaggi in termini di prestazioni degli indici bitmap diminuiscono e l'overhead di memorizzazione diventa significativo.</p></li>
<li><p>Per i campi con cardinalità elevata, è opportuno considerare l'uso di tecniche di indicizzazione alternative, come gli indici invertiti, a seconda del caso d'uso specifico e dei requisiti delle query.</p></li>
</ul></li>
</ul>
<h3 id="Structural-Similarity" class="common-anchor-header">Similitudine strutturale</h3><p>Quando una struttura chimica è parte di una struttura chimica più grande, la prima viene chiamata sottostruttura e la seconda sovrastruttura. Ad esempio, l'etanolo è una sottostruttura dell'acido acetico e l'acido acetico è una sovrastruttura dell'etanolo.</p>
<p>La somiglianza strutturale viene utilizzata per determinare se due formule chimiche sono simili tra loro nel senso che una è la sovrastruttura o la sottostruttura dell'altra.</p>
<p>Per determinare se A è una sovrastruttura di B, utilizzare la seguente formula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>sovrastruttura</span> </span></p>
<p>Dove:</p>
<ul>
<li>A è la rappresentazione binaria di una formula chimica da recuperare</li>
<li>B è la rappresentazione binaria di una formula chimica presente nel database.</li>
</ul>
<p>Se restituisce <code translate="no">0</code>, <strong>A</strong> non è una sovrastruttura di <strong>B</strong>. Altrimenti, il risultato è opposto.</p>
<p>Per determinare se A è una sottostruttura di B, utilizzare la seguente formula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>sottostruttura</span> </span></p>
<p>Dove:</p>
<ul>
<li>A è la rappresentazione binaria di una formula chimica da recuperare</li>
<li>B è la rappresentazione binaria di una formula chimica nel database.</li>
</ul>
<p>Se la formula restituisce <code translate="no">0</code>, <strong>A</strong> non è una sottostruttura di <strong>B</strong>. Altrimenti, il risultato è il contrario.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Perché il risultato top1 di una ricerca vettoriale non è il vettore di ricerca stesso, se il tipo di metrica è il prodotto interno?</font></summary>Ciò accade se non si sono normalizzati i vettori quando si usa il prodotto interno come metrica di distanza.</details>
<details>
<summary><font color="#4fc4f9">Che cos'è la normalizzazione? Perché è necessaria la normalizzazione?</font></summary></p>
<p>La normalizzazione si riferisce al processo di conversione di un incorporamento (vettore) in modo che la sua norma sia uguale a 1. Se si utilizza il prodotto interno per calcolare le somiglianze tra gli incorporamenti, è necessario normalizzare gli incorporamenti. Dopo la normalizzazione, il prodotto interno è uguale alla somiglianza del coseno.</p>
<p>
Per ulteriori informazioni, consultare <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a>.</p>
</details>
<details>
<summary><font color="#4fc4f9">Perché si ottengono risultati diversi utilizzando la distanza euclidea (L2) e il prodotto interno (IP) come metrica di distanza?</font></summary>Controllare se i vettori sono normalizzati. In caso contrario, è necessario normalizzare prima i vettori. In teoria, le somiglianze elaborate con L2 sono diverse da quelle elaborate con IP, se i vettori non sono normalizzati.</details>
