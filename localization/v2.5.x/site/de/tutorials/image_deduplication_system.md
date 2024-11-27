---
id: image_deduplication_system.md
summary: Aufbau eines Bild-Deduplizierungssystems mit Milvus.
title: Bild-Deduplizierung
---
<h1 id="Image-Deduplication" class="common-anchor-header">Bild-Deduplizierung<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie man Milvus, die Open-Source-Vektordatenbank, verwendet, um ein System zur Bilddeduplizierung aufzubauen.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Offenes Notizbuch</a></li>
</ul>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>In den letzten Jahren ist eine exponentielle Zunahme von nutzergenerierten Inhalten zu beobachten. Menschen können ein Foto, das sie aufgenommen haben, sofort auf eine Social-Media-Plattform hochladen. Bei einer solchen Fülle von Bilddaten gibt es jedoch auch viele doppelte Inhalte. Um die Benutzerfreundlichkeit zu verbessern, müssen diese doppelten Bilder entfernt werden. Ein Bild-Deduplizierungssystem erspart uns die manuelle Arbeit, Bilder in der Datenbank einzeln zu vergleichen, um doppelte Bilder herauszufiltern. Das Heraussuchen exakt identischer Bilder ist keine komplizierte Aufgabe. Es kann jedoch vorkommen, dass ein Bild vergrößert, beschnitten oder in der Helligkeit oder Graustufe verändert wurde. Das Bild-Deduplizierungssystem muss diese ähnlichen Bilder identifizieren und ebenfalls eliminieren.</p>
<p>In diesem Lernprogramm lernen Sie, wie man ein Bild-Deduplizierungssystem aufbaut. In diesem Tutorial wird das ResNet-50-Modell verwendet, um Merkmale von Bildern zu extrahieren und sie in Vektoren umzuwandeln. Anschließend werden diese Bildvektoren in der Milvus-Vektordatenbank gespeichert und eine Vektorähnlichkeitssuche wird ebenfalls in Milvus durchgeführt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>Bildduplizierung_Workflow</span> </span></p>
