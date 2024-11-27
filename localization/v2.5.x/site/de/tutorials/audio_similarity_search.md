---
id: audio_similarity_search.md
summary: Erstellen Sie mit Milvus ein System zur Suche nach Audio-Ähnlichkeiten.
title: Audio-Ähnlichkeitssuche
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">Audio-Ähnlichkeitssuche<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie man Milvus, die Open-Source-Vektordatenbank, zum Aufbau eines Audio-Ähnlichkeitssuchsystems verwendet.</p>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li>PANNs (Large-Scale Pretrained Audio Neural Networks)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Die Suche nach Sprache, Musik, Soundeffekten und anderen Arten von Audiodaten ermöglicht die schnelle Abfrage großer Mengen von Audiodaten und das Auffinden ähnlicher Klänge. Zu den Anwendungen von Systemen zur Suche nach Audioähnlichkeit gehören die Identifizierung ähnlicher Klangeffekte, die Minimierung von Verletzungen des geistigen Eigentums und vieles mehr. Die Audiosuche kann dazu verwendet werden, Online-Medien in Echtzeit zu durchsuchen und zu überwachen, um gegen die Verletzung von Rechten des geistigen Eigentums vorzugehen. Sie spielt auch eine wichtige Rolle bei der Klassifizierung und statistischen Analyse von Audiodaten.</p>
<p></br></p>
<p>In diesem Tutorial lernen Sie, wie man ein System für die Suche nach Audioähnlichkeit aufbaut, das ähnliche Soundclips zurückliefert. Die hochgeladenen Audioclips werden mithilfe von PANNs in Vektoren umgewandelt. Diese Vektoren werden in Milvus gespeichert, das automatisch eine eindeutige ID für jeden Vektor erzeugt. Anschließend können die Benutzer eine Vektorähnlichkeitssuche in Milvus durchführen und den Audioclip-Datenpfad abfragen, der der von Milvus zurückgegebenen eindeutigen Vektor-ID entspricht.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_Suche</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_Suche_demo</span> </span></p>
