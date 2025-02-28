---
id: video_similarity_search.md
summary: Costruite un sistema di ricerca per similarità video con Milvus.
title: Ricerca per similarità video
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Ricerca per similarità video<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un sistema di ricerca della somiglianza dei video.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Taccuino Jupyter aperto</a></li>
</ul>
<p>I modelli di ML e i software di terze parti utilizzati includono:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Al giorno d'oggi, dopo aver visto un film o un video di loro gradimento, le persone possono facilmente scattare screenshot e condividere i loro pensieri pubblicandoli su varie piattaforme di social network. Quando i follower vedono gli screenshot, può essere davvero difficile per loro capire di quale film si tratti se il nome del film non è scritto esplicitamente nel post. Per capire il nome del film, le persone possono sfruttare un sistema di ricerca per somiglianza di video. Utilizzando il sistema, gli utenti possono caricare un'immagine e ottenere video o film che contengono fotogrammi chiave simili all'immagine caricata.</p>
<p><br/></p>
<p>In questa esercitazione imparerete a costruire un sistema di ricerca per similarità video. Per costruire il sistema vengono utilizzate circa 100 gif animate presenti su Tumblr. Tuttavia, è possibile preparare i propri set di dati video. Il sistema utilizza innanzitutto OpenCV per estrarre i fotogrammi chiave dei video e poi ottiene i vettori delle caratteristiche di ciascun fotogramma chiave utilizzando ResNet-50. Tutti i vettori vengono memorizzati in un database di ricerca. Tutti i vettori vengono memorizzati e ricercati in Milvus, che restituisce gli ID dei vettori simili. Quindi, mappano gli ID al video corrispondente memorizzato in MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
