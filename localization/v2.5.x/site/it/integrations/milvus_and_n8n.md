---
id: milvus_and_n8n.md
summary: >-
  n8n è una potente piattaforma open-source per l'automazione dei flussi di
  lavoro che consente di collegare tra loro diverse applicazioni, servizi e API
  per creare flussi di lavoro automatizzati senza dover ricorrere alla codifica.
  Grazie alla sua interfaccia visiva basata sui nodi, n8n consente agli utenti
  di creare processi di automazione complessi collegando semplicemente i nodi
  che rappresentano diversi servizi o azioni. È auto-ostabile, altamente
  estensibile e supporta licenze fair-code ed enterprise.
title: Come iniziare con Milvus e n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Come iniziare con Milvus e n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Introduzione a n8n e al nodo Milvus Vector Store<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> è una potente piattaforma open-source per l'automazione dei flussi di lavoro che consente di collegare tra loro varie applicazioni, servizi e API per creare flussi di lavoro automatizzati senza bisogno di codifica. Grazie all'interfaccia visiva basata sui nodi, n8n consente agli utenti di creare processi di automazione complessi collegando semplicemente i nodi che rappresentano diversi servizi o azioni. È auto-ostabile, altamente estensibile e supporta licenze fair-code e aziendali.</p>
<p>Il nodo <strong>Milvus Vector Store</strong> di n8n integra <a href="https://milvus.io/">Milvus</a> nei vostri flussi di lavoro di automazione. Ciò consente di eseguire ricerche semantiche, di alimentare sistemi di retrieval-augmented generation (RAG) e di costruire applicazioni AI intelligenti, il tutto all'interno dell'ecosistema n8n.</p>
<p>Questa documentazione si basa principalmente sulla <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentazione</a> ufficiale di <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store</a>. Se trovate contenuti obsoleti o incoerenti, date priorità alla documentazione ufficiale e non esitate a segnalarci un problema.</p>
<h2 id="Key-Features" class="common-anchor-header">Caratteristiche principali<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Con il nodo Milvus Vector Store di n8n, è possibile:</p>
<ul>
<li>interagire con il database Milvus come un <a href="https://docs.n8n.io/glossary/#ai-vector-store">archivio vettoriale</a></li>
<li>Inserire documenti in Milvus</li>
<li>Ottenere documenti da Milvus</li>
<li>Recuperare i documenti per fornirli a un retriever collegato a una <a href="https://docs.n8n.io/glossary/#ai-chain">catena</a></li>
<li>Collegarsi direttamente a un <a href="https://docs.n8n.io/glossary/#ai-agent">agente</a> come <a href="https://docs.n8n.io/glossary/#ai-tool">strumento</a></li>
<li>Filtrare i documenti in base ai metadati</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Modelli di utilizzo dei nodi<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile utilizzare il nodo Milvus Vector Store in n8n secondo i seguenti schemi.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Utilizzo come nodo normale per inserire e recuperare documenti</h3><p>È possibile utilizzare Milvus Vector Store come nodo regolare per inserire o recuperare documenti. Questo modello inserisce Milvus Vector Store nel flusso di connessione regolare senza utilizzare un agente.</p>
<p>Vedere questo <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">modello di esempio</a> per costruire un sistema che memorizza i documenti in Milvus e li recupera per supportare le risposte citate e basate sulla chat.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Collegarsi direttamente a un agente AI come strumento</h3><p>È possibile collegare il nodo Milvus Vector Store direttamente al connettore strumento di un <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">agente AI</a> per utilizzare un archivio vettoriale come risorsa quando si risponde alle domande.</p>
<p>In questo caso, la connessione sarebbe: Agente AI (connettore strumenti) -&gt; nodo Milvus Vector Store. Si veda questo <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">modello di esempio</a> in cui i dati sono incorporati e indicizzati in Milvus e l'agente AI utilizza l'archivio vettoriale come strumento di conoscenza per rispondere alle domande.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Utilizzare un retriever per recuperare i documenti</h3><p>È possibile utilizzare il nodo <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a> con il nodo Milvus Vector Store per recuperare i documenti dal nodo Milvus Vector Store. Questo è spesso usato con il nodo <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Catena di domande e risposte</a> per recuperare i documenti dall'archivio vettoriale che corrispondono all'input della chat.</p>
<p>Un tipico flusso di connessione tra i nodi è il seguente: Catena di domande e risposte (connettore Retriever) -&gt; Vector Store Retriever (connettore Vector Store) -&gt; Milvus Vector Store.</p>
<p>Guardate questo <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">esempio di flusso di lavoro</a> per vedere come ingerire dati esterni in Milvus e costruire un sistema di domande e risposte semantiche basato sulla chat.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Utilizzare lo strumento di risposta alle domande di Vector Store per rispondere alle domande</h3><p>Un altro schema utilizza il <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Tool</a> per riassumere i risultati e rispondere alle domande del nodo Milvus Vector Store. Invece di collegare direttamente il Milvus Vector Store come strumento, questo schema utilizza uno strumento specificamente progettato per riassumere i dati nel Vector Store.</p>
<p>Il flusso di connessioni sarebbe il seguente: Agente AI (connettore di strumenti) -&gt; Strumento di risposta alle domande del Vector Store (connettore del Vector Store) -&gt; Milvus Vector store.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Modalità di funzionamento del nodo<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Il nodo Milvus Vector Store supporta diverse modalità di funzionamento, ciascuna adatta a diversi casi d'uso del flusso di lavoro. La comprensione di queste modalità aiuta a progettare flussi di lavoro più efficaci.</p>
<p>Di seguito viene fornita una panoramica di alto livello delle modalità di funzionamento e delle opzioni disponibili. Per un elenco completo dei parametri di ingresso e delle opzioni di configurazione di ciascuna modalità, consultare la <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentazione ufficiale</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Panoramica delle modalità operative</h3><p>Il nodo Milvus Vector Store supporta quattro modalità distinte:</p>
<ul>
<li><strong>Ottieni molti</strong>: Recupera più documenti in base alla somiglianza semantica con un prompt.</li>
<li><strong>Inserisci documenti</strong>: Inserire nuovi documenti nella collezione Milvus.</li>
<li><strong>Recupera documenti (come archivio vettoriale per catena/strumento)</strong>: Utilizza il nodo come recuperatore all'interno di un sistema a catena.</li>
<li><strong>Recupero di documenti (come strumento per l'agente AI)</strong>: Utilizzare il nodo come risorsa per un agente AI durante le attività di risposta alle domande.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Opzioni aggiuntive del nodo</h3><ul>
<li><strong>Filtro metadati</strong> (solo in modalità Get Many): Filtrare i risultati in base a chiavi di metadati personalizzate. I campi multipli applicano una condizione AND.</li>
<li><strong>Cancella raccolta</strong> (solo in modalità Inserisci documenti): Rimuove i documenti esistenti dalla raccolta prima di inserirne di nuovi.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Risorse correlate</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">Documentazione sull'integrazione di n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">Documentazione su LangChain Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">Documentazione sull'intelligenza artificiale avanzata n8n</a></li>
</ul>
