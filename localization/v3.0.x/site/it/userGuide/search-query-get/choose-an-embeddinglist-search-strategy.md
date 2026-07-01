---
id: choose-an-embeddinglist-search-strategy.md
title: Scegli una strategia di ricerca EmbeddingList
summary: >-
  Le strategie di ricerca EmbeddingList determinano il modo in cui Milvus
  costruisce un indice approssimativo dei candidati per la ricerca
  EmbeddingList. La strategia predefinita è tokenann. È possibile passare a
  muvera o lemur quando l'elenco di embedding è di grandi dimensioni, TokenANN
  risulta troppo oneroso o una rappresentazione a livello di riga
  appresa/compressa risulta più adatta. Il risultato finale viene comunque
  generato dal reranking di MaxSim quando è abilitata l’opzione
  `emb_list_rerank`.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Scegli una strategia di ricerca EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>Le strategie di ricerca EmbeddingList determinano il modo in cui Milvus costruisce un indice approssimativo dei candidati per la ricerca EmbeddingList. La strategia predefinita è " <code translate="no">tokenann</code>". È possibile passare a " <code translate="no">muvera</code> " o " <code translate="no">lemur</code> " quando l'elenco di embedding è di grandi dimensioni, TokenANN è troppo oneroso o una rappresentazione a livello di riga appresa/compressa risulta più adatta. Il risultato finale viene comunque generato dal reranking di MaxSim quando è abilitata l’opzione « <code translate="no">emb_list_rerank</code> ».</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Perché esistono le strategie di ricerca<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingList è progettato per righe che contengono più vettori, come gli embedding di token in un documento di testo, gli embedding di patch in un documento visivo o gli embedding di clip in un video. Anziché confrontare un vettore di query con un vettore di riga, MaxSim confronta un elenco di embedding di query con un elenco di embedding di documenti e aggrega le migliori corrispondenze.</p>
<p>Ciò offre una migliore capacità di rappresentazione, ma l’esecuzione esatta di MaxSim su larga scala è onerosa. Una ricerca MaxSim con metodo brute-force richiederebbe il confronto dei vettori di query con ogni vettore in ogni riga candidata. Ciò risulta solitamente troppo lento per la ricerca in produzione.</p>
<table>
<thead>
<tr><th>### Problema - Ogni riga può contenere molti vettori. - L’applicazione esatta di MaxSim su tutte le righe è costosa. - Le dimensioni dell’indice e la latenza di ricerca possono aumentare rapidamente.</th><th>### Strategia - Utilizzare un metodo di recupero approssimativo nella prima fase. - Recuperare un numero di candidati superiore al topK richiesto. - Riclassificare i candidati con MaxSim esatto.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>In questo senso, « <code translate="no">emb_list_strategy</code> » è principalmente una strategia di creazione dell’indice e di recupero dei candidati. Viene configurata durante la creazione dell’indice e determina come viene generato l’insieme dei candidati ANN di primo stadio. I parametri relativi al tempo di ricerca, quali « <code translate="no">retrieval_ann_ratio</code> » e « <code translate="no">emb_list_rerank</code> », controllano quindi il numero di candidati recuperati e se viene applicata la riclassificazione tramite MaxSim.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Strategie disponibili<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Strategia</th><th>Unità di recupero dei candidati</th><th>Cosa risolve</th><th>Migliore adattamento</th><th>Principale compromesso</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Vettori individuali all'interno di ogni riga</td><td>Mantiene i vettori originali ed evita la perdita dovuta alla compressione.</td><td>Ricerca incentrata sulla qualità, elenchi di embedding brevi o medi, embedding ad alta discriminazione.</td><td>Indice più ampio e costo di recupero dei candidati più elevato.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Un vettore codificato per riga</td><td>Comprime una lista di embedding in una rappresentazione FDE a dimensione fissa senza addestramento.</td><td>Documenti più lunghi, embedding ad alta discriminazione, casi in cui TokenANN risulta troppo oneroso.</td><td>La proiezione casuale introduce una perdita di approssimazione; la dimensione FDE influisce sulla latenza.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Un vettore appreso per riga</td><td>Apprende una compressione specifica per il corpus, trasformando gli elenchi di embedding in vettori di riga a dimensione fissa.</td><td>Embedding a bassa discriminazione, recupero multimodale o di documenti visivi, elenchi di embedding di grandi dimensioni.</td><td>Richiede addestramento e può essere sensibile alla distribuzione del corpus e alla distorsione legata alla lunghezza dei documenti.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> indicizza ogni vettore nell’elenco di embedding. Durante la ricerca, ogni vettore di query esegue il recupero ANN, i vettori corrispondenti vengono aggregati nuovamente nelle rispettive righe e le righe candidate risultanti vengono riordinate con MaxSim.</p>
<div class="alert note">
<p><strong>Utilizzare TokenANN quando la qualità è la priorità assoluta.</strong> Si tratta dell’approssimazione più vicina al calcolo MaxSim originale poiché mantiene tutti i vettori disponibili nell’indice di primo livello.</p>
</div>
<ul>
<li><p><strong>Adatto a:</strong> frammenti di testo brevi, righe con un numero ridotto o moderato di vettori, forte separazione semantica a livello di token, baseline sensibili alla qualità.</p></li>
<li><p><strong>Meno adatto:</strong> documenti molto lunghi, pagine visive con migliaia di vettori di patch, limiti rigorosi di memoria o latenza.</p></li>
<li><p><strong>Comportamento a livello di elemento:</strong> TokenANN può recuperare candidati da singoli vettori prima di aggregarli nuovamente in righe. Il risultato finale della ricerca nell’EmbeddingList rimane a livello di riga dopo il punteggio MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> codifica ogni lista di embedding in un vettore a dimensione fissa utilizzando proiezioni casuali. Ciò trasforma il recupero di primo stadio in una ricerca vettoriale standard a livello di riga. I candidati vengono quindi riclassificati con MaxSim.</p>
<div class="alert note">
<p><strong>Utilizzate MUVERA quando TokenANN risulta troppo oneroso ma non volete una fase di addestramento.</strong> Rappresenta un pratico compromesso tra qualità e costo.</p>
</div>
<ul>
<li><p><strong>Adatto a:</strong> documenti di testo lunghi, spazi di embedding ad alta discriminazione, carichi di lavoro che richiedono una dimensione dell’indice inferiore rispetto a TokenANN.</p></li>
<li><p><strong>Meno adatto:</strong> spazi di embedding a bassa discriminazione o casi in cui la rappresentazione FDE diventa troppo ad alta dimensione per il budget di latenza.</p></li>
<li><p><strong>Parametri importanti:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code> e <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> addestra un modello per comprimere ogni lista di embedding in una rappresentazione a dimensionalità fissa. La ricerca ANN di primo stadio viene eseguita sui vettori a livello di riga appresi, e i candidati vengono riclassificati con MaxSim.</p>
<div class="alert note">
<p><strong>Utilizzare LEMUR quando la compressione appresa giustifica il costo di addestramento.</strong> Può funzionare bene per spazi di embedding a bassa discriminazione e per il recupero multimodale, ma dovrebbe essere convalidato rispetto al corpus di destinazione poiché può essere sensibile alla distribuzione della lunghezza dei documenti.</p>
</div>
<ul>
<li><p><strong>Adatto a:</strong> ricerca di documenti visivi, embedding multimodali di patch, spazi di embedding a bassa discriminazione, elenchi di embedding di grandi dimensioni in cui TokenANN non è pratico.</p></li>
<li><p><strong>Meno adatto:</strong> corpora che cambiano frequentemente, embedding ad alta discriminazione con lunghezze dei documenti altamente asimmetriche, carichi di lavoro in cui il costo di addestramento è inaccettabile.</p></li>
<li><p><strong>Parametri importanti:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code> e <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Comportamento e configurazione predefiniti<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>La strategia predefinita per EmbeddingList in Knowhere è <code translate="no">tokenann</code>. Se non si specifica <code translate="no">emb_list_strategy</code>, Knowhere utilizza TokenANN. I valori predefiniti in fase di ricerca includono <code translate="no">retrieval_ann_ratio=3.0</code> e <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Elementi di configurazione per strategia<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente elenca le voci di configurazione specifiche per ciascuna strategia. In Milvus, le voci relative alla fase di compilazione vengono solitamente passate nella mappa <code translate="no">params</code> durante la creazione di un indice. Se sono necessari valori predefiniti lato server, questi devono essere definiti nel file di configurazione di Milvus nella sezione <code translate="no">knowhere</code>.</p>
<table>
<thead>
<tr><th>Strategia</th><th>Elemento di configurazione</th><th>Fase</th><th>Impostazione predefinita</th><th>Quando modificarla</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Creazione dell'indice</td><td><code translate="no">tokenann</code></td><td>Utilizzare esplicitamente quando si desidera il comportamento predefinito di indicizzazione vettore-elemento o quando si utilizza DiskANN.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Creazione dell'indice</td><td><code translate="no">tokenann</code></td><td>Da utilizzare quando si desidera un recupero codificato a livello di riga senza addestramento.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Creazione dell'indice</td><td><code translate="no">4</code></td><td>Controlla il numero di proiezioni SimHash. Valori più elevati creano più bucket e possono migliorare la qualità della codifica, ma aumentano la dimensionalità codificata.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Creazione dell'indice</td><td><code translate="no">7</code></td><td>Controlla il numero di codifiche FDE indipendenti che vengono concatenate. Valori più alti possono migliorare la robustezza, ma aumentano il costo dell’indice e della ricerca.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Creazione dell'indice</td><td><code translate="no">42</code></td><td>Da impostare per proiezioni casuali riproducibili, specialmente nei test e nei confronti di benchmark.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Creazione dell'indice</td><td><code translate="no">tokenann</code></td><td>Da utilizzare quando si prevede che la compressione a livello di riga appresa funzioni meglio della proiezione casuale fissa.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Creazione dell'indice</td><td><code translate="no">256</code></td><td>Controlla la dimensione della rappresentazione compressa. Aumentare per una maggiore capacità; diminuire per un minor consumo di memoria e un recupero più veloce.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Creazione dell'indice</td><td><code translate="no">20000</code></td><td>Aumentare quando il corpus è eterogeneo e la compressione appresa non è adeguata; ridurre solo per test di piccole dimensioni o per creazioni più veloci.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Creazione dell'indice</td><td><code translate="no">50</code></td><td>Aumentare se l'addestramento non ha raggiunto la convergenza; ridurre quando il tempo di creazione è il vincolo principale.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Creazione dell'indice</td><td><code translate="no">512</code></td><td>Regolare in base alla velocità di addestramento e all'utilizzo della memoria.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Creazione dell'indice</td><td><code translate="no">0.001</code></td><td>Regolare quando l'addestramento è instabile o converge troppo lentamente.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Creazione dell'indice</td><td><code translate="no">42</code></td><td>Impostare per eseguire sessioni di addestramento riproducibili.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Creazione dell'indice</td><td><code translate="no">2</code></td><td>Aumentare solo quando il corpus richiede un estrattore di caratteristiche più espressivo e si è in grado di sostenere i costi aggiuntivi di addestramento.</td></tr>
<tr><td>Tutte le strategie</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Ricerca</td><td><code translate="no">3.0</code></td><td>Aumentare per recuperare più candidati di primo livello e migliorare il recall; diminuire per ridurre la latenza.</td></tr>
<tr><td>Tutte le strategie</td><td><code translate="no">emb_list_rerank</code></td><td>Ricerca</td><td><code translate="no">true</code></td><td>Lasciare abilitata per il riclassamento MaxSim. Disabilitare solo per esperimenti controllati in cui la qualità della rete neurale artificiale (ANN) di primo stadio viene misurata direttamente.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Configurazione della strategia in Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, la strategia viene passata come parametro dell’indice durante la creazione di un indice su un campo EmbeddingList, come un sottocampo vettoriale StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Per LEMUR, fornire i parametri di addestramento di LEMUR nella stessa mappa " <code translate="no">params</code> ".</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Configurazione delle impostazioni predefinite lato server in Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus può anche precompilare i parametri dell’indice da <code translate="no">milvus.yaml</code>. La sezione pertinente è <code translate="no">knowhere</code>. I parametri sono organizzati per tipo di indice e fase, utilizzando lo schema <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>. I parametri dell’indice forniti dall’utente hanno la precedenza su questi valori predefiniti.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>È preferibile utilizzare parametri specifici per ogni indice nella selezione delle strategie.</strong> Un valore predefinito nel file di configurazione di Milvus si applica in generale agli indici di quel tipo e di quella fase. Utilizzare i parametri di <code translate="no">create_index</code> quando collezioni o campi diversi richiedono strategie EmbeddingList diverse.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Configurare il recupero dei candidati in fase di ricerca<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>La strategia determina le modalità di costruzione dell’indice. Al momento della ricerca, utilizzare <code translate="no">retrieval_ann_ratio</code> per controllare il numero di candidati della prima fase recuperati prima del riordino con MaxSim. Valori più elevati di solito migliorano il recall ma aumentano la latenza.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parametro</th><th>Fase</th><th>Predefinito</th><th>Significato</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Creazione dell'indice</td><td><code translate="no">tokenann</code></td><td>Determina le modalità di indicizzazione e recupero dei candidati di EmbeddingList.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Ricerca</td><td><code translate="no">3.0</code></td><td>Fattore di espansione dei candidati per il primo round ANN.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Ricerca</td><td><code translate="no">true</code></td><td>Se riclassificare i candidati recuperati con MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Note sulla compatibilità:</strong> MUVERA e LEMUR attualmente supportano i dati fp32 in Knowhere. DiskANN supporta EmbeddingList solo con la strategia TokenANN. Se si utilizzano tipi di vettori non fp32 o DiskANN, verificare il supporto della strategia prima di modificare l’impostazione predefinita.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">Come scegliere una strategia<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Non esiste una strategia universalmente migliore. Scegli in base alla lunghezza dell’embedding list, alla discriminazione dello spazio di embedding, al budget di latenza, alle dimensioni dell’indice e alla disponibilità di una fase di addestramento.</p>
<table>
<thead>
<tr><th>Domanda</th><th>Segnale</th><th>Punto di partenza consigliato</th></tr>
</thead>
<tbody>
<tr><td>È necessaria una linea di base di alta qualità?</td><td>Vuoi misurare la migliore approssimazione pratica prima di ottimizzare il costo.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Le righe contengono un numero ridotto o moderato di vettori?</td><td>Ogni riga contiene un numero ridotto di vettori di token, patch o clip.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokenANN è troppo grande o troppo lento?</td><td>La dimensione dell’indice o la latenza di recupero nella prima fase rappresentano il collo di bottiglia.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Vuoi la compressione senza addestramento?</td><td>È necessario un modello operativo più semplice e una codifica riproducibile.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Lo spazio di embedding presenta una bassa discriminabilità?</td><td>I candidati ANN a livello di token sono rumorosi e la proiezione casuale non preserva un segnale sufficiente.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>Il carico di lavoro è visivo o multimodale?</td><td>Le righe contengono molti vettori di patch e TokenANN è troppo onerosa.</td><td><code translate="no">lemur</code> oppure <code translate="no">muvera</code></td></tr>
<tr><td>La lunghezza dei documenti è fortemente asimmetrica?</td><td>Alcune righe contengono molti più vettori rispetto ad altre.</td><td>Inizia con <code translate="no">muvera</code>; verifica attentamente <code translate="no">lemur</code>.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Flusso di lavoro di valutazione suggerito<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Inizia con <code translate="no">tokenann</code> come riferimento di qualità quando le dimensioni del set di dati lo consentono.</p></li>
<li><p>Esegui le stesse query con <code translate="no">muvera</code> e confronta recall, nDCG, latenza e dimensione dell'indice.</p></li>
<li><p>Provare <code translate="no">lemur</code> quando l’elenco degli embedding è ampio, lo spazio degli embedding è rumoroso o il carico di lavoro è visivo o multimodale.</p></li>
<li><p>Ottimizzare l'<code translate="no">retrieval_ann_ratio</code> prima di modificare troppi parametri di compilazione. Aumentarlo se il recall è basso; ridurlo se la latenza è troppo elevata.</p></li>
<li><p>Verifica sempre su query rappresentative e distribuzioni della lunghezza dei documenti. Una strategia che funziona su testi brevi potrebbe non funzionare su documenti visivi o corpora long-tail.</p></li>
</ol>
<table>
<thead>
<tr><th>### Priorità alla qualità: iniziare con ` <code translate="no">tokenann</code>`. Utilizzarlo come riferimento per la qualità dell’approssimazione di MaxSim.</th><th>### Equilibrato Prova <code translate="no">muvera</code> quando hai bisogno di costi inferiori senza aggiungere una pipeline di addestramento.</th><th>### Compressa: provate <code translate="no">lemur</code> quando la compressione appresa a livello di riga è suscettibile di superare le prestazioni della proiezione casuale fissa.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Riferimenti utilizzati per questa bozza<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Test di Milvus per <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code> e <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Gestione dei file di configurazione di Milvus per le impostazioni predefinite dell'indice lato server nella sezione " <code translate="no">knowhere</code> ".</p></li>
<li><p>Definizioni dei parametri di Knowhere per i valori predefiniti e i nomi delle strategie supportate.</p></li>
<li><p>Verifiche di compatibilità Knowhere per il supporto esclusivo di MUVERA/LEMUR in fp32 e di DiskANN esclusivamente con TokenANN.</p></li>
<li><p>Note di valutazione interne che mettono a confronto TokenANN, MUVERA e LEMUR per il recupero dei candidati MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>Nota sulla pubblicazione:</strong> prima di pubblicare esternamente, verificare quali parametri siano ufficialmente supportati nella versione di Milvus di destinazione e se il prodotto intenda esporre tutti i parametri Knowhere di basso livello o solo un sottoinsieme più ristretto e documentato.</p>
</div>
