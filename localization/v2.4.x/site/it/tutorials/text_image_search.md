---
id: text_image_search.md
summary: Creare un motore di ricerca da testo a immagine con Milvus.
title: Motore di ricerca da testo a immagine
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Motore di ricerca da testo a immagine<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo tutorial mostra come utilizzare Milvus, il database vettoriale open-source, per costruire un motore di ricerca da testo a immagine.</p>
<p>È possibile costruire rapidamente un motore di ricerca da testo a immagine minimamente fattibile seguendo il tutorial di base. In alternativa, è possibile leggere l'esercitazione approfondita che copre tutto, dalla selezione del modello alla distribuzione del servizio. È possibile creare un motore di ricerca text-to-image più avanzato, adatto alle proprie esigenze aziendali, seguendo le istruzioni dell'esercitazione approfondita.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Esercitazione di base nel notebook</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Esercitazione di approfondimento nel notebook</a></p></li>
</ul>
<p>Il modello ML e il software di terze parti utilizzati includono:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>Al giorno d'oggi, i motori di ricerca testuali tradizionali stanno perdendo il loro fascino e sempre più persone si rivolgono a TikTok come motore di ricerca preferito. Durante una ricerca testuale tradizionale, le persone inseriscono delle parole chiave e vengono mostrati tutti i testi che le contengono. Tuttavia, le persone lamentano di non riuscire sempre a trovare ciò che desiderano in una ricerca di questo tipo. Inoltre, i risultati non sono abbastanza intuitivi. Le persone dicono di trovare le immagini e i video molto più intuitivi e piacevoli che dover scorrere righe di testo. Di conseguenza, è nato il motore di ricerca cross-modale testo-immagine. Con questo nuovo tipo di motore di ricerca, le persone possono trovare immagini rilevanti inserendo un pezzo di testo con alcune parole chiave.</p>
<p>In questa esercitazione imparerete a costruire un motore di ricerca da testo a immagine. Questa esercitazione utilizza il modello CLIP per estrarre le caratteristiche delle immagini e convertirle in vettori. Questi vettori di immagini vengono poi memorizzati nel database vettoriale Milvus. Quando gli utenti inseriscono dei testi di richiesta, anche questi vengono convertiti in vettori di incorporamento utilizzando lo stesso modello ML CLIP. Successivamente, viene eseguita una ricerca di similarità vettoriale in Milvus per recuperare i vettori immagine più simili al vettore testo in ingresso.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Ricerca_testo_immagine</span> </span></p>
