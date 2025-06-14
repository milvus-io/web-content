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
            <th>Milvus 2.5.x (raggiunto nelle ultime versioni)</th>
            <th>Prossima release - Milvus 2.6 (metà CY25)</th>
            <th>Roadmap futura - Milvus 3.0 (entro 1 anno)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Elaborazione dei dati non strutturati guidata dall'intelligenza artificiale</strong><br/><i>Rafforzare la capacità di elaborare e analizzare i dati non strutturati utilizzando modelli di intelligenza artificiale e tecnologie avanzate</i>.</td>
            <td><strong>Ricerca full text</strong><br/><i>Supporto della ricerca full text con Sparse-BM25. La nuova API accetta il testo come input e genera automaticamente vettori sparsi all'interno di Milvus</i><br/><br/><strong>Sparse Vector (GA)</strong><br/><i>Supportare un metodo di archiviazione e indicizzazione efficiente per i vettori sparsi</i><br/></td>
            <td><strong>Data-In e Data-Out</strong><br/><i>Supporta i principali servizi di modello per l'inserimento del testo originale</i><br/><br/><strong>Advanced Reranker</strong><br/><i>Supporta reranker basati su modello e funzione di punteggio definita dall'utente</i><br/><br/><strong>Ricerca</strong> iterativa<br/><i>Rivede il vettore di query in base all'etichettatura dell'utente</i></td>
            <td><strong>Supporto dei tensori</strong><br/><i>Supporto di elenchi di vettori, usi tipici come Colbert, Copali e rappresentazione video</i><br/><br/><strong>Supporto di più tipi di dati</strong><br/><i>ad esempio Datetime, Map, GIS</i></td>
        </tr>
        <tr>
            <td><strong>Qualità e prestazioni della ricerca</strong><br/><i>Fornisce risultati accurati, pertinenti e veloci ottimizzando l'architettura, gli algoritmi e le API</i>.</td>
            <td><strong>Funzione Text Match</strong><br/><i>Filtrare rapidamente parole chiave/token in testo/varchar</i><br/><br/><strong>Miglioramento della ricerca per gruppi</strong><br/><i>Introdurre group_size e aggiungere il supporto per gruppi nella ricerca ibrida</i><br/><br/><strong>Bitmap Index e Inverted Index</strong><br/><i>Accelerare il filtraggio sui tag</i></td>
            <td><strong>Advanced Match</strong><br/> es<i>. phrase_match, multi_match </i><br/><br/><strong>Miglioramento dell'analizzatore</strong><br/><i>Miglioramento dell'analizzatore con supporto esteso al tokenizer e migliore osservabilità</i><br/><br/><strong>Filtraggio</strong> JSON<br/><i>Ottimizzazione dell'indicizzazione e del parsing JSON per un'elaborazione più veloce</i></td>
            <td><strong>Capacità di ordinamento</strong><br/><i>Ordinamento per campi scalari durante l'esecuzione</i><br/><br/><strong>Supporto del clustering dei dati</strong><br/><i>Co-località dei dati</i></td>
        </tr>
        <tr>
            <td><strong>Funzionalità e gestione ricche</strong><br/><i>Funzionalità di gestione dei dati robuste e facili da sviluppare</i></td>
            <td><strong>Supporto di file csv nell'importazione dei dati</strong><br/><i>Bulkinsert supporta il formato csv</i><br/><br/><strong>Supporto di valori nulli e predefiniti</strong><br/><i>I tipi</i> nulli<i>e predefiniti facilitano l'importazione di dati da altri DBMS</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Strumenti di gestione visiva per i DBA</i></td>
            <td><strong>Modifica dello schema</strong><br/><i>ad esempio aggiunta/eliminazione di campi, modifica della lunghezza di varchar</i><br/><br/><strong>Aggregazioni</strong><br/><i>Aggregazioni di campi scalari, ad esempio conteggio, valore distinto, min, max</i><br/><br/><strong>Supporto UDF</strong><br/><i>Funzione definita dall'utente</i></td>
            <td><strong>Aggiornamento in blocco</strong><br/><i>Supporta aggiornamenti in blocco del valore di un campo specifico</i><br/><br/><strong>Deduplicazione delle chiavi primarie</strong><br/><i>Utilizzando l'indice globale pk</i><br/><br/><strong>Versionamento e ripristino dei dati</strong><br/><i>Supporta il versionamento dei dati tramite snapshot</i></td>
        </tr>
        <tr>
            <td><strong>Efficienza dei costi e architettura</strong><br/><i>Sistemi all'avanguardia con stabilità, efficienza dei costi e distribuzione semplificata.</i></td>
            <td><strong>Ottimizzazione della memoria</strong><br/><i>Riduzione dell'OOM e potenziamento del carico</i><br/><br/><strong>Compattazione</strong> del clustering<br/><i>Ridistribuzione dei dati in base alla configurazione per accelerare le prestazioni di lettura</i><br/><br/><strong>Storage Format V2 (Beta)</strong><br/><i>Design dei formati universali e base per l'accesso ai dati su disco</i></td>
            <td><strong>Archiviazione a livelli</strong><br/><i>Supporto per l'archiviazione a caldo e a freddo per l'ottimizzazione dei costi</i><br/><br/><strong>Stream Node</strong><br/><i>Elaborazione di dati in streaming e semplificazione del flusso di scrittura incrementale</i><br/><br/><strong>MixCoord</strong><br/><i>Unione delle logiche Coord in un'unica soluzione</i></td>
            <td><strong>Vector Lake</strong><br/><i>Soluzione offline conveniente, connettore spark e integrazione con iceberg</i><br/><br/><strong>Logstore Component</strong><br/><i>Ridurre le dipendenze da componenti esterni come pulsar</i><br/><br/><strong>Data Evict Policy</strong><br/><i>Gli utenti possono definire la propria evict policy</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>La nostra roadmap è tipicamente strutturata in tre parti: la release più recente, la prossima release in arrivo e una visione a medio-lungo termine entro il prossimo anno.</li>
<li>Man mano che progrediamo, impariamo continuamente e occasionalmente modifichiamo la nostra attenzione, aggiungendo o rimuovendo elementi a seconda delle necessità.</li>
<li>Questi piani sono indicativi e soggetti a modifiche, e possono variare in base ai servizi in abbonamento.</li>
<li>Ci atteniamo costantemente alla nostra tabella di marcia, con le nostre <a href="/docs/it/v2.5.x/release_notes.md">note di rilascio</a> come riferimento.</li>
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
<li><p>Suggerimenti di funzionalità: Avete idee per nuove funzionalità o miglioramenti? Unitevi alla conversazione nel <a href="https://github.com/milvus-io/milvus/discussions/40263">nostro thread di discussione attivo</a>.</p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contributi al codice</h3><ul>
<li><p>Richieste di prelievo: Contribuite direttamente alla nostra <a href="https://github.com/milvus-io/milvus/pulls">base di codice</a>. Che si tratti di correggere bug, aggiungere funzionalità o migliorare la documentazione, i vostri contributi sono benvenuti.</p></li>
<li><p>Guida allo sviluppo: Consultate la nostra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guida per i collaboratori</a> per le linee guida sui contributi al codice.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Diffondere la parola</h3><ul>
<li><p>Condivisione sociale: Amate Milvus? Condividete i vostri casi d'uso e le vostre esperienze sui social media e sui blog tecnologici.</p></li>
<li><p>Metteteci le stelline su GitHub: Dimostrate il vostro sostegno assegnando una stella al nostro <a href="https://github.com/milvus-io/milvus">repository GitHub</a>.</p></li>
</ul>
