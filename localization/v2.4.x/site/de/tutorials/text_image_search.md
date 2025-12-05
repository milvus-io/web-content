---
id: text_image_search.md
summary: Erstellen Sie eine Text-Bild-Suchmaschine mit Milvus.
title: Text zu Bild Suchmaschine
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Text zu Bild Suchmaschine<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie man Milvus, die Open-Source-Vektordatenbank, zum Aufbau einer Text-Bild-Suchmaschine verwendet.</p>
<p>Sie können schnell eine minimale brauchbare Text-zu-Bild-Suchmaschine erstellen, indem Sie das Basis-Tutorial befolgen. Alternativ können Sie auch das Deep-Dive-Tutorial lesen, in dem alles von der Modellauswahl bis zur Servicebereitstellung behandelt wird. Sie können eine fortschrittlichere Text-zu-Bild-Suchmaschine für Ihre eigenen geschäftlichen Anforderungen erstellen, indem Sie die Anweisungen im Vertiefungstutorial befolgen.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Basis-Tutorial im Notebook</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Vertiefungstutorial im Notizbuch</a></p></li>
</ul>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>Heutzutage verlieren traditionelle Textsuchmaschinen ihren Charme und immer mehr Menschen wenden sich TikTok als ihrer Lieblingssuchmaschine zu. Bei einer herkömmlichen Textsuche gibt man Schlüsselwörter ein und bekommt alle Texte angezeigt, die dieses Schlüsselwort enthalten. Die Leute beschweren sich jedoch, dass sie bei einer solchen Suche nicht immer das finden, was sie wollen. Darüber hinaus sind die Ergebnisse nicht intuitiv genug. Die Menschen sagen, dass sie Bilder und Videos viel intuitiver und angenehmer finden, als sich durch Textzeilen wühlen zu müssen. Daraus entstand die cross-modale Text-Bild-Suchmaschine. Mit einer solchen neuen Art von Suchmaschine können Menschen relevante Bilder finden, indem sie einen Textabschnitt mit einigen Schlüsselwörtern eingeben.</p>
<p>In diesem Lernprogramm lernen Sie, wie man eine Text-Bild-Suchmaschine erstellt. In diesem Tutorial wird das CLIP-Modell verwendet, um Merkmale von Bildern zu extrahieren und sie in Vektoren umzuwandeln. Diese Bildvektoren werden dann in der Milvus-Vektordatenbank gespeichert. Wenn Benutzer Abfragetexte eingeben, werden diese Texte ebenfalls mit demselben ML-Modell CLIP in Einbettungsvektoren umgewandelt. Anschließend wird in Milvus eine Vektorähnlichkeitssuche durchgeführt, um die ähnlichsten Bildvektoren zum eingegebenen Textvektor zu finden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Text_Bild_Suche</span> </span></p>
