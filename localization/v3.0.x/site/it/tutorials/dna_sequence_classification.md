---
id: dna_sequence_classification.md
summary: Costruire un sistema di classificazione delle sequenze di DNA con Milvus.
title: Classificazione delle sequenze di DNA
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">Classificazione delle sequenze di DNA<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un modello di classificazione delle sequenze di DNA.</p>
<p>Il modello ML e i software di terze parti utilizzati includono:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>La sequenza del DNA è un concetto popolare nella tracciabilità dei geni, nell'identificazione delle specie, nella diagnosi delle malattie e in molti altri settori. Mentre tutti i settori industriali sono alla ricerca di un metodo di ricerca più intelligente ed efficiente, l'intelligenza artificiale ha attirato molta attenzione soprattutto nei settori biologici e medici. Sempre più scienziati e ricercatori contribuiscono all'apprendimento automatico e all'apprendimento profondo nel campo della bioinformatica. Per rendere i risultati sperimentali più convincenti, un'opzione comune è quella di aumentare la dimensione del campione. La collaborazione con i big data in genomica offre maggiori possibilità di applicazione nella realtà. Tuttavia, l'allineamento tradizionale delle sequenze ha dei limiti che lo rendono inadatto a grandi insiemi di dati. Per ridurre i compromessi, la vettorizzazione è una buona scelta per i grandi insiemi di sequenze di DNA.</p>
<p><br/></p>
<p>In questa esercitazione imparerete a costruire un modello di classificazione delle sequenze di DNA. Questa esercitazione utilizza CountVectorizer per estrarre le caratteristiche delle sequenze di DNA e convertirle in vettori. Poi, questi vettori vengono memorizzati in Milvus e le corrispondenti classi di DNA vengono memorizzate in MySQL. Gli utenti possono effettuare una ricerca di similarità vettoriale in Milvus e richiamare la classificazione del DNA corrispondente da MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>dna</span> </span></p>
