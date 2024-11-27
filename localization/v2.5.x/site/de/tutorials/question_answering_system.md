---
id: question_answering_system.md
summary: Erstellen Sie mit Milvus ein System zur Beantwortung von Fragen.
title: System zur Beantwortung von Fragen
---
<h1 id="Question-Answering-System" class="common-anchor-header">System zur Beantwortung von Fragen<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie man Milvus, die Open-Source-Vektordatenbank, verwendet, um ein System zur Beantwortung von Fragen (QA) aufzubauen.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Jupyter-Notizbuch öffnen</a></li>
<li><a href="https://milvus.io/milvus-demos/">Online-Demo ausprobieren</a></li>
</ul>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Systeme zur Beantwortung von Fragen sind eine häufige Anwendung in der realen Welt, die zum Bereich der Verarbeitung natürlicher Sprache gehört. Typische QA-Systeme sind Online-Kundenservicesysteme, QA-Chatbots und mehr. Die meisten Systeme zur Beantwortung von Fragen können wie folgt klassifiziert werden: generative oder Retrieval-Systeme, Ein-Runden- oder Mehr-Runden-Systeme, offene Domänen oder spezifische Systeme zur Beantwortung von Fragen.</p>
<p></br></p>
<p>In diesem Tutorial lernen Sie, wie Sie ein QA-System aufbauen, das neue Benutzerfragen mit massiven Antworten verknüpfen kann, die zuvor in der Vektordatenbank gespeichert wurden. Um einen solchen Chatbot zu erstellen, bereiten Sie Ihren eigenen Datensatz mit Fragen und entsprechenden Antworten vor. Speichern Sie die Fragen und Antworten in MySQL, einer relationalen Datenbank. Verwenden Sie dann BERT, das Modell für maschinelles Lernen (ML) für die Verarbeitung natürlicher Sprache (NLP), um Fragen in Vektoren umzuwandeln. Diese Fragevektoren werden in Milvus gespeichert und indiziert.  Wenn Benutzer eine neue Frage eingeben, wird diese ebenfalls vom BERT-Modell in einen Vektor umgewandelt, und Milvus sucht nach dem ähnlichsten Fragevektor zu diesem neuen Vektor. Das QA-System gibt die entsprechende Antwort auf die ähnlichsten Fragen zurück.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
