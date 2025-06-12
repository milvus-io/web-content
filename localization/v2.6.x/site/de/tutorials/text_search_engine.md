---
id: text_search_engine.md
summary: Erstellen Sie eine Textsuchmaschine mit Milvus.
title: Text-Suchmaschine
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Text-Suchmaschine<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Tutorial lernen Sie, wie Sie Milvus, die Open-Source-Vektordatenbank, verwenden, um eine Textsuchmaschine zu erstellen.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Offenes Jupyter-Notebook</a></li>
</ul>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Eine wichtige Anwendung von Milvus im Bereich der Verarbeitung natürlicher Sprache (NLP) ist die Textsuchmaschine. Es ist ein großartiges Werkzeug, das Benutzern helfen kann, die gesuchten Informationen zu finden. Es kann sogar Informationen aufdecken, die schwer zu finden sind. Textsuchmaschinen vergleichen die von den Benutzern eingegebenen Schlüsselwörter oder semantischen Begriffe mit einer Textdatenbank und geben dann die Ergebnisse zurück, die bestimmte Kriterien erfüllen.</p>
<p><br/></p>
<p>In diesem Lernprogramm lernen Sie, wie man eine Textsuchmaschine erstellt. In diesem Tutorium wird BERT verwendet, um Texte in Vektoren fester Länge zu konvertieren. Milvus wird als Vektordatenbank für die Speicherung und die Vektorähnlichkeitssuche verwendet. Anschließend wird MySQL verwendet, um die von Milvus generierten Vektor-IDs auf die Textdaten abzubilden.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
