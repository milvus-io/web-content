---
id: video_similarity_search.md
summary: Erstellen Sie mit Milvus ein System zur Suche nach Videoähnlichkeiten.
title: Video-Ähnlichkeitssuche
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Video-Ähnlichkeitssuche<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie man Milvus, die Open-Source-Vektordatenbank, verwendet, um ein System zur Suche nach Videoähnlichkeit aufzubauen.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Offenes Jupyter-Notizbuch</a></li>
</ul>
<p>Zu den verwendeten ML-Modellen und Software von Drittanbietern gehören:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Heutzutage können die Leute, nachdem sie einen Film oder ein Video gesehen haben, das ihnen gefällt, ganz einfach Screenshots machen und ihre Gedanken auf verschiedenen sozialen Netzwerkplattformen posten. Wenn die Follower die Screenshots sehen, kann es für sie sehr schwierig sein, zu erkennen, um welchen Film es sich handelt, wenn der Name des Films nicht explizit in dem Posting steht. Um den Namen des Films herauszufinden, kann man ein System zur Suche nach Videoähnlichkeiten nutzen. Mit diesem System können Nutzer ein Bild hochladen und erhalten Videos oder Filme, die ähnliche Schlüsselbilder wie das hochgeladene Bild enthalten.</p>
<p><br/></p>
<p>In diesem Lernprogramm lernen Sie, wie man ein System zur Suche nach Videoähnlichkeit aufbaut. Dieses Tutorial verwendet etwa 100 animierte Gifs auf Tumblr, um das System aufzubauen. Sie können jedoch auch Ihre eigenen Videodatensätze vorbereiten. Das System verwendet zunächst OpenCV, um Schlüsselbilder in Videos zu extrahieren, und ermittelt dann mit ResNet-50 Merkmalsvektoren für jedes Schlüsselbild. Alle Vektoren werden in Milvus gespeichert und durchsucht, das die IDs ähnlicher Vektoren zurückgibt. Anschließend werden die IDs dem entsprechenden in MySQL gespeicherten Video zugeordnet.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_durchsuchen</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_durchsuchen_demo</span> </span></p>
