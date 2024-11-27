---
id: audio_similarity_search.md
summary: Costruire un sistema di ricerca per similarità audio con Milvus.
title: Ricerca per similarità audio
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">Ricerca per similarità audio<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un sistema di ricerca di similarità audio.</p>
<p>Il modello ML e il software di terze parti utilizzati includono:</p>
<ul>
<li>PANNs (Reti neurali audio preaddestrate su larga scala)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>La ricerca di parlato, musica, effetti sonori e altri tipi di audio permette di interrogare rapidamente volumi enormi di dati audio e di far emergere suoni simili. Le applicazioni dei sistemi di ricerca per similarità audio includono l'identificazione di effetti sonori simili, la riduzione al minimo delle violazioni della proprietà intellettuale e altro ancora. L'audio retrieval può essere utilizzato per cercare e monitorare i media online in tempo reale per reprimere le violazioni dei diritti di proprietà intellettuale. Assume inoltre un ruolo importante nella classificazione e nell'analisi statistica dei dati audio.</p>
<p></br></p>
<p>In questa esercitazione imparerete a costruire un sistema di ricerca per similarità audio in grado di restituire clip audio simili. I clip audio caricati vengono convertiti in vettori utilizzando i PANN. Questi vettori vengono memorizzati in Milvus, che genera automaticamente un ID univoco per ogni vettore. Gli utenti possono quindi effettuare una ricerca di similarità vettoriale in Milvus e interrogare il percorso dei dati del clip audio corrispondente all'ID univoco del vettore restituito da Milvus.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
