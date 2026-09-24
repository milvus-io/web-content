---
id: search_with_jev.md
summary: >-
  Die Vektorsuche findet Informationen, die mit einer Suchanfrage in
  Zusammenhang stehen. Die Entwicklung einer nützlichen Suchanwendung erfordert
  zudem Entscheidungen: Welche Textstellen beantworten die Frage tatsächlich, ob
  eine frühere Antwort wiederverwendet werden kann und ob ein Agent über
  genügend Anhaltspunkte verfügt, um die Suche zu beenden.
title: RAG mit Milvus und PII Masker erstellen
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Suche mit Jev und Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Vektorsuche findet Informationen, die mit einer Suchanfrage in Zusammenhang stehen. Die Entwicklung einer nützlichen Suchanwendung erfordert zudem Entscheidungen: Welche Textpassagen beantworten die Frage tatsächlich, ob eine frühere Antwort wiederverwendet werden kann und ob ein Agent über genügend Anhaltspunkte verfügt, um die Suche zu beenden.</p>
<p>Milvus und Jev decken verschiedene Teile dieses Arbeitsablaufs ab. <a href="https://milvus.io/">Milvus</a> speichert Einbettungen und ruft Kandidaten-Datensätze ab, wobei Metadatenfilter für Einschränkungen wie Produktversion oder den Umfang der Wissensdatenbank zum Einsatz kommen. <a href="https://docs.typesafe.ai/introduction">Jev</a> bewertet die Bedeutung des abgerufenen Textes anhand von Anweisungen. Ihre Anwendung kann die Ergebnisse dieser Bewertung nutzen, um Belege auszuwählen oder den nächsten Suchschritt zu steuern.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Was macht Jev?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine Jev-Anfrage liefert Kontext und eine oder mehrere Beurteilungsfragen. Zu <a href="https://docs.typesafe.ai/primitives">den typisierten Ausgaben</a> gehören eine Auswahl aus festen Optionen, eine geordnete Bewertung und eine Ja/Nein-Wahrscheinlichkeit. Diese Ausgaben ermöglichen es dem Anwendungscode, eine Entscheidung zu treffen, ohne eine frei formulierte Erklärung analysieren zu müssen. Ein Generierungsmodell kann bei Bedarf weiterhin eine Antwort oder eine Folge-Suchanfrage verfassen.</p>
<p>Beispielsweise fragt ein Nutzer, wie man Atlas v2 installiert. Milvus kann die Suche auf die Dokumentation zu v2 beschränken und ähnliche Passagen zu Installation, Upgrades und Fehlerbehebung zurückgeben. Jev bewertet dann, welche Passagen die Ersteinrichtung erklären. Die Anwendung leitet die ausgewählten Belege an ein Modell zur Antwortgenerierung weiter.</p>
<p>Die Aufgaben sind klar definiert:</p>
<ol>
<li><strong>Abruf mit Milvus:</strong> Finden von Kandidaten innerhalb der erforderlichen Metadaten-Einschränkungen.</li>
<li><strong>Beurteilung mit Jev:</strong> Bewertung dieser Kandidaten anhand der Frage und eines aufgabenspezifischen Kriteriums.</li>
<li><strong>Ausführung im Anwendungscode:</strong> Ergebnisse neu anordnen, Kontext filtern, eine Antwort wiederverwenden oder die Suche fortsetzen.</li>
</ol>
<p>Einige Entscheidungen erfolgen bereits vor der Suche. Jev kann einen Suchbereich auswählen oder eingehende Dokumente bewerten, bevor sie in eine Sammlung aufgenommen werden. Die Zugriffskontrolle und exakte Filter bleiben in der Verantwortung der Anwendung.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Entdecken Sie die Suchszenarien<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Die Sammlung „Search with Jev“</a> enthält neun ausführbare Tutorials. Jedes verwendet einen kleinen synthetischen Datensatz und zeigt die abgerufenen Datensätze, die Bewertungen und die daraus resultierenden Aktionen.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Bessere Belege auswählen<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Suchergebnisse neu ordnen</a>: Dokumentationen und Erinnerungen von Programmieragenten neu anordnen. Eine Erinnerung an einen Laptop-Anschlussfehler kann einem Problem mit der Containerverbindung ähneln; eine nützlichere Erinnerung dokumentiert die tatsächliche Behebung des Problems zwischen Container und Host.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Filtern Sie den abgerufenen Kontext</a>: Unterscheiden Sie Anweisungen zur Erstinstallation von Passagen zu Upgrades und zur Fehlerbehebung, nachdem Milvus den Versionsfilter angewendet hat.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Grafikbeziehungen neu ordnen</a>: Beantworten Sie eine Frage zum Geburtsort eines Buchautors, indem Sie sowohl die Verbindung „Buch-Autor“ als auch die Beziehung „Autor-Geburtsort“ auswählen, und behalten Sie diese Reihenfolge beim Abrufen der Quellpassagen bei.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Steuerung der Suche und Wiederverwendung von Antworten<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Entscheiden, wann die Suche beendet werden soll</a>: Ein Generierungsmodell schlägt Suchanfragen auf der Grundlage gesammelter Hinweise vor, während Jev beurteilt, ob die ursprüngliche Frage beantwortbar ist. Die Beispiele umfassen eine direkte Antwort, eine Frage mit zwei Verknüpfungsschritten und eine nicht verfügbare Tatsache, bei der die Suchgrenze ohne Antwort erreicht wird.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Suchanfragen weiterleiten</a>: Wählen Sie zwischen Dokumentations-, Abrechnungs- oder Speichersuche und wenden Sie anschließend den entsprechenden Milvus-Filter an. Eine Anfrage außerhalb des Geltungsbereichs nimmt einen separaten Pfad.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Validierung der Wiederverwendung des semantischen Caches</a>: Rufen Sie eine ähnliche zwischengespeicherte Anfrage ab und prüfen Sie anschließend, ob deren Antwort auch die Anforderungen der neuen Anfrage hinsichtlich Aufgabe, Sprache und Kontext erfüllt.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Verbessern und überprüfen Sie die Wissenspipeline<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Dokumente vor der Indizierung kuratieren</a>: Unterscheiden Sie substanzielle operative Anleitungen von werblichen oder unvollständigen Inhalten, mit separaten Aktionen zum Indizieren, Überprüfen und Ausschließen.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Abgerufene Textstellen prüfen</a>: Identifizieren Sie Text, der versucht, einen Assistenten in die Irre zu führen, und behalten Sie dabei allgemeine Sicherheitshinweise bei. Dies ist ein zusätzlicher Prüfschritt, keine Sicherheitsgarantie.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Suchbelege bewerten</a>: Beurteilen Sie die Relevanz von Textpassagen, ob die Belege ausreichend sind und ob eine Antwort unbegründete Behauptungen enthält. In den Beispielen werden bewusst Belege entfernt oder unbegründete Aussagen hinzugefügt, um den Unterschied deutlich zu machen.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Eine vorgefertigte Schnittstelle zur Neugewichtung<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> stellt eine anwendungsseitige Schnittstelle „ <code translate="no">JevRerankFunction</code> “ bereit: Übergeben Sie eine Suchanfrage und Texte aus in Frage kommenden Dokumenten und erhalten Sie bewertete Ergebnisse mit ihren ursprünglichen Indizes, sortiert nach Relevanz. Verwenden Sie diese Indizes, um die von Milvus zurückgegebenen Datensätze neu zu ordnen.</p>
<p>Die <a href="https://github.com/milvus-io/milvus-model/pull/90">Jev-Integration</a> wurde integriert. Informationen zur aktuellen API finden Sie in den <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">Implementierungs- und Konstruktoroptionen</a>. Sie akzeptiert ` <code translate="no">TYPESAFE_API_KEY</code> ` und verwendet standardmäßig ` <code translate="no">jev-latest</code>`. Verwenden Sie eine Paketversion, die diese Integration enthält.</p>
<p>Der aktuelle Wrapper verwendet eine Relevanzabfrage nach dem „Claim-and-Evidence“-Prinzip. Prüfen Sie, ob dieses Kriterium zu Ihrer Aufgabe passt. Für benutzerdefinierte Bewertungen wie Speicherkompatibilität, Stoppen oder Routing folgen Sie den verlinkten Tutorials, in denen die TypeSafe-API direkt verwendet wird. Die Tutorials veranschaulichen direkte API-Aufrufe aus Python-Anwendungscode.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Probieren Sie es mit Milvus aus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Öffnen Sie das Tutorial zum Reranking in Colab</a>, um mit der Kandidatenauswahl und -bewertung zu beginnen. Informationen zur lokalen Einrichtung und die vollständige Liste der Tutorials finden Sie in der <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README-Datei der Sammlung</a>.</p>
<p>Die Beispiele verwenden einen <a href="https://aistudio.google.com/apikey">Gemini-API-Schlüssel</a> für Embeddings und einen <a href="https://console.typesafe.ai/">TypeSafe-API-Schlüssel</a> für Jev. Das Tutorial „Agentic Search“ nutzt zudem Gemini für die Abfrage- und Antwortgenerierung. Beispieltexte werden an diese API-Anbieter gesendet, und die Aufrufe können Credits verbrauchen.</p>
<p>Die Tutorials laufen standardmäßig mit <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> und enthalten Verbindungsoptionen für einen Milvus-Server oder <a href="https://zilliz.com/cloud">die Zilliz Cloud</a>. Die Arbeitsteilung ist bei allen Bereitstellungen gleich: Milvus ruft Kandidaten ab, und die Anwendung sendet den relevanten Text zur Beurteilung an Jev.</p>
<p>Betrachten Sie die Beispiele als Ausgangspunkt für Ihre eigenen Kriterien und Schwellenwerte. Ein Relevanzwert garantiert nicht, dass eine Antwort korrekt ist, und diese kleinen Trainingsdatensätze sagen nichts über die Genauigkeit oder Geschwindigkeit im Produktivbetrieb aus.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Entdecken Sie Implementierungen und Auswertungsergebnisse<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgenden Open-Source-Projekte wenden diese Ideen auf größere Such-Workflows an. Die verlinkten Berichte erläutern die Datensätze, Vergleiche und Einschränkungen der einzelnen Experimente.</p>
<table>
<thead>
<tr><th>Projekt</th><th>Such-Anwendungsfall</th><th>Jev-Arbeit</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Persistenter Markdown-Speicher für Programmieragenten</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Jev-Implementierung</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Bewertung</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Vektor-Graph-RAG</a></td><td>Vektor- und Graph-Retrieval für Multi-Hop-Fragen</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Jev-Implementierung</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Bewertung</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Iterative Suche in privatem Wissen</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Experiment-Runner</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Bewertung des Suchabbruchs</a> (eigenständiges Experiment)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Wiederverwendung von Antworten auf kompatible Anfragen</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Jev-Implementierung</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Auswertung</a></td></tr>
</tbody>
</table>
<p>Der Beitrag von DeepSearcher ist ein eigenständiges Experiment zur Suchbeendigung. Die anderen Implementierungslinks zeigen aufgabenspezifische Jev-Integrationen. Die Ergebnisse dieser Projekte sollten in ihrem jeweiligen Bewertungskontext betrachtet werden und nicht als gemeinsamer Benchmark behandelt werden.</p>
