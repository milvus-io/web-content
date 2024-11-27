---
id: question_answering_system.md
summary: Costruire un sistema di risposta alle domande con Milvus.
title: Sistema di risposta alle domande
---
<h1 id="Question-Answering-System" class="common-anchor-header">Sistema di risposta alle domande<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un sistema di risposta alle domande (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Aprire il taccuino Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">Prova la demo online</a></li>
</ul>
<p>Il modello ML e i software di terze parti utilizzati includono:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Il sistema di risposta alle domande è una comune applicazione del mondo reale che appartiene al campo dell'elaborazione del linguaggio naturale. I sistemi di AQ tipici includono sistemi di assistenza clienti online, chatbot di AQ e altro ancora. La maggior parte dei sistemi di risposta alle domande può essere classificata come: generativa o di recupero, a turno singolo o multiplo, a dominio aperto o specifica.</p>
<p></br></p>
<p>In questa esercitazione imparerete a costruire un sistema di AQ in grado di collegare le nuove domande degli utenti alle risposte massive precedentemente memorizzate nel database vettoriale. Per costruire un chatbot di questo tipo, preparate il vostro set di dati di domande e risposte corrispondenti. Memorizzate le domande e le risposte in MySQL, un database relazionale. Quindi utilizzare BERT, il modello di apprendimento automatico (ML) per l'elaborazione del linguaggio naturale (NLP) per convertire le domande in vettori. Questi vettori di domande sono memorizzati e indicizzati in Milvus.  Quando gli utenti inseriscono una nuova domanda, anche questa viene convertita in un vettore dal modello BERT e Milvus cerca il vettore di domande più simile a questo nuovo vettore. Il sistema QA restituisce la risposta corrispondente alle domande più simili.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
