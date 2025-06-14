---
id: recommendation_system.md
summary: Erstellen Sie ein personalisiertes Empfehlungssystem mit Milvus.
title: Empfehlendes System
---
<h1 id="Recommender-System" class="common-anchor-header">Empfehlungssystem<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie man Milvus, die Open-Source-Vektordatenbank, zum Aufbau eines Empfehlungssystems verwendet.</p>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis oder MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Das Empfehlungssystem ist eine Teilmenge des Informationsfiltersystems, das in verschiedenen Szenarien eingesetzt werden kann, darunter personalisierte Film-, Musik-, Produkt- und Feed-Stream-Empfehlungen. Im Gegensatz zu Suchmaschinen verlangen Empfehlungssysteme nicht, dass die Benutzer ihre Bedürfnisse genau beschreiben, sondern entdecken die Bedürfnisse und Interessen der Benutzer durch die Analyse des Benutzerverhaltens.</p>
<p></br></p>
<p>In diesem Tutorial werden Sie lernen, wie man ein Filmempfehlungssystem erstellt, das Filme vorschlägt, die den Interessen des Benutzers entsprechen. Um ein solches Empfehlungssystem zu erstellen, laden Sie zunächst einen filmbezogenen Datensatz herunter. In diesem Tutorial wird MovieLens 1M verwendet. Alternativ können Sie Ihre eigenen Datensätze vorbereiten, die Informationen wie die Bewertungen von Filmen durch Benutzer, demografische Merkmale der Benutzer und Filmbeschreibungen enthalten sollten. Verwenden Sie PaddlePaddle, um Benutzer-IDs und Merkmale zu kombinieren und sie in 256-dimensionale Vektoren zu konvertieren. Konvertieren Sie Film-IDs und Merkmale auf ähnliche Weise in Vektoren. Speichern Sie die Filmvektoren in Milvus und verwenden Sie die Benutzervektoren für die Ähnlichkeitssuche. Wenn der Benutzervektor einem Filmvektor ähnlich ist, gibt Milvus den Filmvektor und seine ID als Empfehlungsergebnis zurück. Anschließend werden die Filminformationen mit Hilfe der in Redis oder MySQL gespeicherten ID des Filmvektors abgefragt.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>Empfehlungsgeber_system</span> </span></p>
