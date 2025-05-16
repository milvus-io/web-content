---
id: roadmap.md
title: Tabella di marcia di Milvus
related_key: Milvus roadmap
summary: >-
  Milvus è un database vettoriale open-source costruito per alimentare le
  applicazioni di intelligenza artificiale. Ecco la nostra roadmap per guidare
  il nostro sviluppo.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Tabella di marcia di Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Benvenuti nella Roadmap di Milvus! Unitevi a noi nel nostro continuo viaggio per migliorare ed evolvere Milvus. Siamo entusiasti di condividere i nostri risultati, i piani futuri e la nostra visione di ciò che ci aspetta. La nostra roadmap è più di un elenco di funzionalità in arrivo: riflette il nostro impegno per l'innovazione e la nostra dedizione alla collaborazione con la comunità. Vi invitiamo ad approfondire la nostra roadmap, a fornire il vostro feedback e a contribuire a plasmare il futuro di Milvus!</p>
<h2 id="Roadmap" class="common-anchor-header">Tabella di marcia<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>Categoria</th>
            <th>Milvus 2.4.0 (recentemente raggiunto)</th>
            <th>Milvus 2.5.0 (in arrivo a metà anno)</th>
            <th>Tabella di marcia futura (Milvus 3.0 previsto entro il 24 gennaio)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI-developer Friendly</strong><br/> Uno<i>stack tecnologico facile da sviluppare, arricchito con le più recenti innovazioni dell'AI</i></td>
            <td><strong>Vettori multipli e ricerca ibrida</strong><br/><i>Struttura per il richiamo e la fusione multipla</i><br/><br/><strong>Accelerazione degli indici su GPU</strong><br/><i>Supporto per QPS più elevati e creazione di indici più rapida</i><br/><br/><strong>Libreria di modelli in PyMilvus</strong><br/><i>Modelli di incorporamento integrati per Milvus</i></td>
            <td><strong>Sparse Vector (GA)</strong><br/><i>Estrazione di caratteristiche locali e ricerca di parole chiave</i><br/><br/><strong>Milvus Lite (GA)</strong><br/> Una<i>versione leggera e in-memory di Milvus</i><br/><br/><strong>Embedding Models Gallery</strong><br/><i>Supporto per embedding di immagini e modelli multi-modali e reranker in librerie di modelli</i></td>
            <td><strong>Dati originali in entrata e in uscita</strong><br/><i>Supporto per i tipi di dati Blob</i><br/><br/><strong>Clustering dei dati</strong><br/><i>Co-località dei dati</i><br/><br/><strong>Ricerca vettoriale orientata agli scenari</strong><br/> ad esempio<i>ricerca multi-target e filtraggio NN</i><br/><br/><strong>Supporto Embedding e Reranker Endpoint</strong></td>
        </tr>
        <tr>
            <td><strong>Ricca funzionalità</strong><br/><i>Funzionalità di reperimento e gestione dei dati migliorate</i></td>
            <td><strong>Supporto per i tipi di dati FP16, BF16</strong><br/><i>Questi tipi di dati ML possono contribuire a ridurre l'utilizzo della memoria</i><br/><br/><strong>Ricerca per raggruppamento</strong><br/><i>Incorporamenti aggregati suddivisi</i><br/><br/><strong>Corrispondenza fuzzy e indice invertito</strong><br/><i>Supporto per la corrispondenza fuzzy e l'indicizzazione invertita per tipi scalari come varchar e int</i></td>
            <td><strong>Indice invertito per array e JSON</strong><br/><i>Indicizzazione per array e supporto parziale di JSON</i><br/><br/><strong>Indice</strong> Bitset<br/><i>Miglioramento della velocità di esecuzione e aggregazione futura dei dati</i><br/><br/><strong>Truncate Collection</strong><br/><i>Consente la cancellazione dei dati preservando i metadati</i><br/><br/><strong>Supporto per NULL e valori predefiniti</strong></td>
            <td><strong>Supporto per più tipi di dati</strong><br/><i>ad esempio Datetime, GIS</i><br/><br/><strong>Filtraggio avanzato del testo</strong><br/><i>ad esempio Match Phrase</i><br/><br/><strong>Deduplicazione delle chiavi primarie</strong></td>
        </tr>
        <tr>
            <td><strong>Efficienza dei costi e architettura</strong><br/><i>Sistemi avanzati che enfatizzano stabilità, efficienza dei costi, scalabilità e prestazioni</i></td>
            <td><strong>Supporto per un maggior numero di raccolte/partizioni</strong><br/><i>Gestisce oltre 10.000 raccolte in cluster più piccoli</i><br/><br/><strong>Ottimizzazione</strong> delle mappature<br/><i>Bilancia il consumo di memoria ridotto con la latenza</i><br/><br/><strong>Ottimizzazione dell'inserimento massivo</strong><br/><i>Semplifica l'importazione di grandi insiemi di dati</i></td>
            <td><strong>Lazy Load</strong><br/><i>I dati vengono caricati su richiesta attraverso le operazioni di lettura</i><br/><br/><strong>Major Compaction</strong><br/><i>Ridistribuisce i dati in base alla configurazione per migliorare le prestazioni di lettura</i><br/><br/> Mmap<strong>for Growing Data</strong><br/><i>File</i> Mmap<i>per l'espansione dei segmenti di dati</i></td>
            <td><strong>Controllo della memoria</strong><br/><i>Riduce i problemi di memoria esaurita e fornisce una gestione globale della memoria</i><br/><br/><strong>Introduzione dei LogNode</strong><br/><i>Garantisce la coerenza globale e risolve il collo di bottiglia a singolo punto nel coordinamento delle radici</i><br/><br/><strong>Formato di archiviazione V2</strong><br/><i>Il design del formato universale pone le basi per l'accesso ai dati basato su disco</i></td>
        </tr>
        <tr>
            <td><strong>Enterprise Ready</strong><br/><i>Progettato per soddisfare le esigenze degli ambienti di produzione aziendali</i></td>
            <td><strong>Milvus CDC</strong><br/><i>Capacità di replica dei dati</i><br/><br/><strong>Accesslog Enhancement</strong><br/><i>Registrazione dettagliata per audit e tracciamento</i></td>
            <td><strong>Nuovo gruppo di risorse</strong><br/><i>Gestione migliorata delle risorse</i><br/><br/><strong>Gancio di archiviazione</strong><br/><i>Supporto per la crittografia Bring Your Own Key (BYOK)</i></td>
            <td><strong>Regolazione dinamica del numero di repliche</strong><br/><i>Facilita le modifiche dinamiche al numero di repliche</i><br/><br/><strong>Modifica dinamica dello schema</strong><br/><i>ad esempio, aggiunta/eliminazione di campi, modifica delle lunghezze dei varchar</i><br/><br/><strong>SDK Rust e C#</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>La nostra roadmap è tipicamente strutturata in tre parti: la release più recente, la prossima release in arrivo e una visione a medio-lungo termine entro il prossimo anno.</li>
<li>Man mano che progrediamo, impariamo continuamente e occasionalmente modifichiamo la nostra attenzione, aggiungendo o rimuovendo elementi a seconda delle necessità.</li>
<li>Questi piani sono indicativi e soggetti a modifiche, e possono variare in base ai servizi in abbonamento.</li>
<li>Ci atteniamo costantemente alla nostra tabella di marcia, con le nostre <a href="/docs/it/v2.4.x/release_notes.md">note di rilascio</a> come riferimento.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Come contribuire<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>In quanto progetto open-source, Milvus si basa sul contributo della comunità. Ecco come potete partecipare al nostro viaggio.</p>
<h3 id="Share-feedback" class="common-anchor-header">Condividere il feedback</h3><ul>
<li><p>Segnalazione di problemi: Riscontrate un bug o avete un suggerimento? Aprite un problema sulla nostra <a href="https://github.com/milvus-io/milvus/issues">pagina GitHub</a>.</p></li>
<li><p>Suggerimenti di funzionalità: Avete idee per nuove funzionalità o miglioramenti? <a href="https://github.com/milvus-io/milvus/discussions">Saremo lieti di ascoltarle!</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contributi al codice</h3><ul>
<li><p>Richieste di prelievo: Contribuite direttamente alla nostra <a href="https://github.com/milvus-io/milvus/pulls">base di codice</a>. Che si tratti di correggere bug, aggiungere funzionalità o migliorare la documentazione, i vostri contributi sono benvenuti.</p></li>
<li><p>Guida allo sviluppo: Consultate la nostra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guida per i collaboratori</a> per <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">le</a> linee guida sui contributi al codice.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Diffondere la parola</h3><ul>
<li><p>Condivisione sociale: Amate Milvus? Condividete i vostri casi d'uso e le vostre esperienze sui social media e sui blog tecnologici.</p></li>
<li><p>Metteteci le stelline su GitHub: Dimostrate il vostro sostegno assegnando una stella al nostro <a href="https://github.com/milvus-io/milvus">repository GitHub</a>.</p></li>
</ul>
