---
id: recommendation_system.md
summary: Costruire un sistema di raccomandazione personalizzato con Milvus.
title: Sistema di raccomandazione
---
<h1 id="Recommender-System" class="common-anchor-header">Sistema di raccomandazione<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un sistema di raccomandazione.</p>
<p>Il modello ML e i software di terze parti utilizzati includono:</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis o MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Il sistema di raccomandazione è un sottoinsieme del sistema di filtraggio delle informazioni, che può essere utilizzato in vari scenari, tra cui la raccomandazione personalizzata di film, musica, prodotti e flussi di feed. A differenza dei motori di ricerca, i sistemi di raccomandazione non richiedono agli utenti di descrivere accuratamente le loro esigenze, ma scoprono i bisogni e gli interessi degli utenti analizzando i loro comportamenti.</p>
<p></br></p>
<p>In questa esercitazione imparerete a costruire un sistema di raccomandazione di film in grado di suggerire i film che soddisfano gli interessi degli utenti. Per costruire un sistema di raccomandazione di questo tipo, occorre innanzitutto scaricare un set di dati relativi ai film. Questo tutorial utilizza MovieLens 1M. In alternativa, è possibile preparare i propri set di dati, che dovrebbero includere informazioni come le valutazioni degli utenti sui film, le caratteristiche demografiche degli utenti e la descrizione dei film. Utilizzare PaddlePaddle per combinare gli ID utente e le caratteristiche e convertirli in vettori a 256 dimensioni. Convertire gli ID e le caratteristiche dei film in vettori in modo analogo. Memorizzare i vettori dei film in Milvus e utilizzare i vettori degli utenti per la ricerca di similarità. Se il vettore utente è simile a un vettore film, Milvus restituirà il vettore film e il suo ID come risultato della raccomandazione. Quindi, è possibile interrogare le informazioni sui film utilizzando l'ID del vettore film memorizzato in Redis o MySQL.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>sistema di raccomandazione</span> </span></p>
