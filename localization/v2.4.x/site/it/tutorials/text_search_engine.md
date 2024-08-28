---
id: text_search_engine.md
summary: Costruite un motore di ricerca testuale con Milvus.
title: Motore di ricerca testuale
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Motore di ricerca per testo<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>In questo tutorial imparerete a usare Milvus, il database vettoriale open-source, per costruire un motore di ricerca di testi.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Taccuino Jupyter aperto</a></li>
</ul>
<p>Il modello ML e i software di terze parti utilizzati includono:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Una delle principali applicazioni di Milvus nel campo dell'elaborazione del linguaggio naturale (NLP) è il motore di ricerca testuale. È un ottimo strumento che può aiutare gli utenti a trovare le informazioni che stanno cercando. Può anche far emergere informazioni difficili da trovare. I motori di ricerca testuale confrontano le parole chiave o la semantica inserite dagli utenti con un database di testi e restituiscono i risultati che soddisfano determinati criteri.</p>
<p><br/></p>
<p>In questa esercitazione imparerete a costruire un motore di ricerca testuale. Questa esercitazione utilizza BERT per convertire i testi in vettori di lunghezza fissa. Milvus viene utilizzato come database vettoriale per la memorizzazione e la ricerca di similarità vettoriale. Si utilizza quindi MySQL per mappare gli ID dei vettori generati da Milvus ai dati del testo.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>motore_di_ricerca_di_testo</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>motore_di_ricerca_di_testo</span> </span></p>
