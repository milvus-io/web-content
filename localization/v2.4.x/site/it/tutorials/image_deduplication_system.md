---
id: image_deduplication_system.md
summary: Costruire un sistema di deduplicazione delle immagini con Milvus.
title: Deduplicazione delle immagini
---
<h1 id="Image-Deduplication" class="common-anchor-header">Deduplicazione delle immagini<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un sistema di deduplicazione delle immagini.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Taccuino aperto</a></li>
</ul>
<p>Il modello ML e il software di terze parti utilizzati includono:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>Negli ultimi anni si è assistito a un'esplosione esponenziale dei contenuti generati dagli utenti. Le persone possono caricare istantaneamente una foto che hanno scattato su una piattaforma di social media. Tuttavia, con una tale abbondanza di dati relativi alle immagini, vediamo molti contenuti duplicati. Per migliorare l'esperienza dell'utente, queste immagini duplicate devono essere rimosse. Un sistema di deduplicazione delle immagini ci evita il lavoro manuale di confrontare le immagini nel database una per una per eliminare i duplicati. L'individuazione di immagini esattamente identiche non è affatto un compito complicato. Tuttavia, a volte un'immagine può essere ingrandita, ritagliata, modificata nella luminosità o nella scala di grigi. Il sistema di deduplicazione delle immagini deve identificare queste immagini simili ed eliminarle.</p>
<p>In questa esercitazione imparerete a costruire un sistema di deduplicazione delle immagini. Questa esercitazione utilizza il modello ResNet-50 per estrarre le caratteristiche delle immagini e convertirle in vettori. Questi vettori di immagini vengono poi memorizzati nel database vettoriale Milvus e in Milvus viene condotta anche una ricerca di similarità vettoriale.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro_deduplicazione_immagini</span> </span></p>
