---
id: how_to_enhance_your_rag.md
summary: >-
  Mit der zunehmenden Beliebtheit von RAG-Anwendungen (Retrieval Augmented
  Generation) wächst auch das Interesse an der Verbesserung ihrer Leistung.
  Dieser Artikel stellt alle Möglichkeiten zur Optimierung von RAG-Pipelines vor
  und bietet entsprechende Illustrationen, damit Sie die wichtigsten
  RAG-Optimierungsstrategien schnell verstehen.
title: Wie Sie die Leistung Ihrer RAG-Pipeline verbessern können
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">Wie Sie die Leistung Ihrer RAG-Pipeline verbessern können<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Mit der zunehmenden Beliebtheit von Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>)-Anwendungen wächst auch das Interesse an der Verbesserung ihrer Leistung. Dieser Artikel stellt alle Möglichkeiten zur Optimierung von RAG-Pipelines vor und bietet entsprechende Illustrationen, damit Sie die wichtigsten RAG-Optimierungsstrategien schnell verstehen.</p>
<p>Es ist wichtig zu beachten, dass wir diese Strategien und Techniken nur auf einer hohen Ebene erforschen und uns darauf konzentrieren, wie sie in ein RAG-System integriert werden. Wir werden uns jedoch nicht in komplizierte Details vertiefen oder Sie Schritt für Schritt durch die Implementierung führen.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">Eine Standard-RAG-Pipeline<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Diagramm zeigt die einfachste Vanilla-RAG-Pipeline. Zunächst werden Dokumentenstücke in einen Vektorspeicher (wie <a href="https://milvus.io/docs">Milvus</a> oder <a href="https://zilliz.com/cloud">Zilliz Cloud</a>) geladen. Dann ruft der Vektorspeicher die Top-K der relevantesten Chunks in Bezug auf die Anfrage ab. Diese relevanten Chunks werden dann in die Kontextabfrage des <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a> eingefügt, und schließlich liefert der LLM die endgültige Antwort.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Verschiedene Arten von RAG-Anreicherungstechniken<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir können verschiedene Ansätze zur RAG-Anreicherung auf der Grundlage ihrer Rolle in den Phasen der RAG-Pipeline klassifizieren.</p>
<ul>
<li><strong>Abfrageanreicherung</strong>: Modifizierung und Manipulation des Abfrageprozesses der RAG-Eingabe, um die Abfrageabsicht besser auszudrücken oder zu verarbeiten.</li>
<li><strong>Indizierungsverbesserung</strong>: Optimierung der Erstellung von Chunking-Indizes durch Techniken wie Multi-Chunking, schrittweise Indizierung oder Mehrweg-Indizierung.</li>
<li><strong>Retriever-Verbesserung</strong>: Anwendung von Optimierungstechniken und -strategien während des Abrufprozesses.</li>
<li><strong>Generator-Verbesserung</strong>: Anpassung und Optimierung von Prompts bei der Zusammenstellung von Prompts für den LLM, um bessere Antworten zu erhalten.</li>
<li><strong>RAG-Pipeline-Erweiterung</strong>: Dynamisches Umschalten von Prozessen innerhalb der gesamten RAG-Pipeline, einschließlich der Verwendung von Agenten oder Tools zur Optimierung von Schlüsselschritten in der RAG-Pipeline.</li>
</ul>
<p>Im Folgenden werden wir spezifische Methoden in jeder dieser Kategorien vorstellen.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Abfrageverbesserung<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Folgenden werden vier effektive Methoden zur Verbesserung Ihrer Abfrageerfahrung vorgestellt: Hypothetische Fragen, hypothetische Dokumenteinbettungen, Unterabfragen und Stepback-Prompts.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Hypothetische Fragen erstellen</h3><p>Bei der Erstellung von hypothetischen Fragen wird ein LLM verwendet, um mehrere Fragen zu generieren, die Benutzer zum Inhalt der einzelnen Dokumentabschnitte stellen könnten. Bevor die eigentliche Anfrage des Benutzers den LLM erreicht, ruft der Vektorspeicher die relevantesten hypothetischen Fragen, die sich auf die eigentliche Anfrage beziehen, zusammen mit den dazugehörigen Dokumentabschnitten ab und leitet sie an den LLM weiter.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Diese Methode umgeht das bereichsübergreifende Asymmetrieproblem bei der Vektorsuche, indem sie direkt eine Abfrage-zu-Abfrage-Suche durchführt und so die Belastung der Vektorsuche verringert. Allerdings führt dies zu zusätzlichem Overhead und Unsicherheit bei der Erstellung hypothetischer Fragen.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (Hypothetische Dokumenteneinbettungen)</h3><p>HyDE steht für Hypothetical Document Embeddings (hypothetische Dokumenteneinbettungen). Es nutzt ein LLM, um ein &quot;<strong><em>hypothetisches Dokument</em></strong>&quot; oder eine <strong><em>gefälschte</em></strong> Antwort als Antwort auf eine Benutzeranfrage ohne Kontextinformationen zu erstellen. Diese gefälschte Antwort wird dann in Vektoreinbettungen umgewandelt und zur Abfrage der relevantesten Dokumentenabschnitte in einer Vektordatenbank verwendet. Anschließend ruft die Vektordatenbank die Top-K der relevantesten Dokumentabschnitte ab und überträgt sie an das LLM und die ursprüngliche Benutzeranfrage, um die endgültige Antwort zu generieren.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Diese Methode ähnelt der Technik der hypothetischen Frage, da sie die domänenübergreifende Asymmetrie bei der Vektorsuche berücksichtigt. Sie hat jedoch auch Nachteile, wie z. B. die zusätzlichen Rechenkosten und die Unsicherheiten bei der Generierung gefälschter Antworten.</p>
<p>Weitere Informationen finden Sie in dem <a href="https://arxiv.org/abs/2212.10496">HyDE-Papier</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Erstellen von Unterabfragen</h3><p>Wenn eine Benutzerabfrage zu kompliziert ist, können wir sie mithilfe eines LLM in einfachere Unterabfragen zerlegen, bevor wir sie an die Vektordatenbank und den LLM weiterleiten. Schauen wir uns ein Beispiel an.</p>
<p>Stellen Sie sich vor, ein Nutzer fragt: &quot;<strong><em>Welche Unterschiede gibt es zwischen Milvus und Zilliz Cloud?</em></strong>&quot; Diese Frage ist ziemlich komplex und hat möglicherweise keine einfache Antwort in unserer Wissensdatenbank. Um dieses Problem anzugehen, können wir sie in zwei einfachere Unterabfragen aufteilen:</p>
<ul>
<li>Unterfrage 1: "Was sind die Merkmale von Milvus?"</li>
<li>Unterabfrage 2: "Was sind die Merkmale von Zilliz Cloud?"</li>
</ul>
<p>Sobald wir diese Unterabfragen haben, senden wir sie alle an die Vektordatenbank, nachdem wir sie in Vektoreinbettungen konvertiert haben. Die Vektordatenbank findet dann die Top-K-Dokumentenstücke, die für jede Unterabfrage am relevantesten sind. Schließlich verwendet der LLM diese Informationen, um eine bessere Antwort zu generieren.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Durch die Aufteilung der Benutzeranfrage in Unterabfragen wird es für unser System einfacher, relevante Informationen zu finden und präzise Antworten zu geben, selbst auf komplexe Fragen.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Stepback-Prompts erstellen</h3><p>Eine weitere Möglichkeit zur Vereinfachung komplexer Benutzeranfragen besteht in der Erstellung von <strong><em>Stepback-Prompts</em></strong>. Bei dieser Technik werden komplizierte Benutzeranfragen mithilfe eines LLM in <em><em>&quot;</em>Stepback-Fragen</em>&quot;** abstrahiert. Anschließend verwendet eine Vektordatenbank diese Stepback-Fragen, um die relevantesten Dokumententeile abzurufen. Schließlich generiert das LLM eine genauere Antwort auf der Grundlage dieser abgerufenen Dokumentenabschnitte.</p>
<p>Lassen Sie uns diese Technik anhand eines Beispiels veranschaulichen. Betrachten wir die folgende Anfrage, die recht komplex und nicht direkt zu beantworten ist:</p>
<p><strong><em>Ursprüngliche Benutzerabfrage: "Ich habe einen Datensatz mit 10 Milliarden Datensätzen und möchte ihn in Milvus für Abfragen speichern. Ist das möglich?"</em></strong></p>
<p>Um diese Benutzeranfrage zu vereinfachen, können wir ein LLM verwenden, um eine einfachere Stepback-Frage zu generieren:</p>
<p><strong><em>Stepback-Frage: "Wie groß darf der Datensatz sein, den Milvus verarbeiten kann?"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Diese Methode kann uns helfen, bessere und genauere Antworten auf komplexe Abfragen zu erhalten. Sie zerlegt die ursprüngliche Frage in eine einfachere Form, so dass unser System leichter relevante Informationen finden und genaue Antworten geben kann.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Indizierungsverbesserung<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Verbesserung der Indizierung ist eine weitere Strategie, um die Leistung Ihrer RAG-Anwendungen zu steigern. Sehen wir uns drei Techniken zur Verbesserung der Indizierung an.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Automatisches Zusammenführen von Dokumentenstücken (Chunks)</h3><p>Beim Aufbau eines Indexes können wir zwei Granularitätsebenen verwenden: Child Chunks und ihre entsprechenden Parent Chunks. Zunächst suchen wir nach Child Chunks auf einer feineren Detailebene. Dann wenden wir eine Merging-Strategie an: Wenn eine bestimmte Anzahl <strong><em>n</em></strong> von Child Chunks aus den ersten <strong><em>k</em></strong> Child Chunks zu demselben Parent Chunk gehört, stellen wir diesen Parent Chunk dem LLM als Kontextinformation zur Verfügung.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Diese Methodik wurde in <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a> implementiert.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Hierarchische Indizes konstruieren</h3><p>Bei der Erstellung von Indizes für Dokumente können wir einen zweistufigen Index erstellen: einen für Dokumentenzusammenfassungen und einen für Dokumentenkomplexe. Die Vektorsuche erfolgt in zwei Schritten: Zunächst werden die relevanten Dokumente auf der Grundlage der Zusammenfassung gefiltert, und anschließend werden die entsprechenden Dokumentabschnitte ausschließlich in diesen relevanten Dokumenten gefunden.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieser Ansatz erweist sich als vorteilhaft in Situationen, in denen große Datenmengen anfallen oder die Daten hierarchisch aufgebaut sind, wie z. B. bei der Suche nach Inhalten in einer Bibliothek.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Hybrides Retrieval und Reranking</h3><p>Bei der hybriden Retrieval- und Reranking-Technik werden eine oder mehrere zusätzliche Retrieval-Methoden mit dem <a href="https://zilliz.com/learn/vector-similarity-search">Vektorähnlichkeitsretrieval</a> integriert. Anschließend ordnet ein <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">Reranker</a> die abgerufenen Ergebnisse auf der Grundlage ihrer Relevanz für die Benutzeranfrage neu ein.</p>
<p>Zu den üblichen ergänzenden Retrieval-Algorithmen gehören lexikalische frequenzbasierte Methoden wie <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a> oder große Modelle, die spärliche Einbettungen wie <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a> verwenden. Zu den Re-Ranking-Algorithmen gehören RRF oder komplexere Modelle wie <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, die BERT-ähnlichen Architekturen ähneln.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Bei diesem Ansatz werden verschiedene Retrieval-Methoden eingesetzt, um die Retrieval-Qualität zu verbessern und potenzielle Lücken im Recall von Vektoren zu schließen.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Retriever-Verbesserung<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Verfeinerung der Retriever-Komponente innerhalb des RAG-Systems kann die RAG-Anwendungen ebenfalls verbessern. Lassen Sie uns einige effektive Methoden zur Verbesserung des Retrievers untersuchen.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Satzfenster-Retrieval</h3><p>In einem grundlegenden RAG-System ist das dem LLM übergebene Dokumentstück ein größeres Fenster, das das abgerufene Einbettungsstück umfasst. Dadurch wird sichergestellt, dass die dem LLM zur Verfügung gestellten Informationen ein breiteres Spektrum an kontextuellen Details umfassen und der Informationsverlust minimiert wird. Die Technik des Sentence Window Retrieval entkoppelt den für das Embedding Retrieval verwendeten Dokumentenchunk von dem dem LLM zur Verfügung gestellten Chunk.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Die Erweiterung der Fenstergröße kann jedoch zusätzliche störende Informationen einbringen. Wir können die Größe der Fenstererweiterung je nach den spezifischen Geschäftsanforderungen anpassen.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Metadaten-Filterung</h3><p>Um präzisere Antworten zu gewährleisten, können wir die abgerufenen Dokumente verfeinern, indem wir Metadaten wie Zeit und Kategorie filtern, bevor wir sie an den LLM weitergeben. Wenn beispielsweise Finanzberichte aus mehreren Jahren abgerufen werden, können die Informationen durch Filtern nach dem gewünschten Jahr so verfeinert werden, dass sie den spezifischen Anforderungen entsprechen. Diese Methode erweist sich als effektiv in Situationen mit umfangreichen Daten und detaillierten Metadaten, wie z. B. bei der Abfrage von Inhalten in Bibliothekssammlungen.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Generator-Erweiterung<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Lassen Sie uns weitere RAG-Optimierungstechniken erkunden, indem wir den Generator innerhalb eines RAG-Systems verbessern.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Komprimierung der LLM-Eingabeaufforderung</h3><p>Die Rauschinformationen in den abgerufenen Dokumentenstücken können die Genauigkeit der endgültigen Antwort von RAG erheblich beeinflussen. Das begrenzte Eingabefenster in LLMs stellt ebenfalls eine Hürde für genauere Antworten dar. Um diese Herausforderung zu bewältigen, können wir irrelevante Details komprimieren, wichtige Absätze hervorheben und die Gesamtlänge des Kontexts der abgerufenen Dokumentenabschnitte reduzieren.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieser Ansatz ähnelt der zuvor diskutierten hybriden Such- und Reranking-Methode, bei der ein Reranker eingesetzt wird, um irrelevante Dokumentenstücke auszusieben.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Anpassen der Chunk-Reihenfolge in der Eingabeaufforderung</h3><p>In der Arbeit &quot;<a href="https://arxiv.org/abs/2307.03172">Lost in the middle</a>&quot; haben Forscher festgestellt, dass LLMs während des Schlussfolgerungsprozesses häufig Informationen in der Mitte der gegebenen Dokumente übersehen. Stattdessen neigen sie dazu, sich mehr auf die Informationen am Anfang und am Ende des Dokuments zu verlassen.</p>
<p>Auf der Grundlage dieser Beobachtung können wir die Reihenfolge der abgerufenen Chunks anpassen, um die Qualität der Antworten zu verbessern: Beim Abrufen mehrerer Wissens-Chunks werden Chunks mit relativ geringem Vertrauen in der Mitte platziert, während Chunks mit relativ hohem Vertrauen an den beiden Enden angeordnet werden.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">RAG-Pipeline-Erweiterung<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir können auch die Leistung Ihrer RAG-Anwendungen verbessern, indem wir die gesamte RAG-Pipeline verbessern.</p>
<h3 id="Self-reflection" class="common-anchor-header">Selbstreflexion</h3><p>Bei diesem Ansatz wird das Konzept der Selbstreflexion von KI-Agenten genutzt. Wie funktioniert diese Technik dann?</p>
<p>Einige der anfänglich abgerufenen Top-K-Dokumente sind mehrdeutig und beantworten die Frage des Benutzers möglicherweise nicht direkt. In solchen Fällen können wir eine zweite Reflexionsrunde durchführen, um zu überprüfen, ob diese Teile die Anfrage wirklich beantworten können.</p>
<p>Diese Reflexion kann mit effizienten Reflexionsmethoden wie Natural Language Inference (NLI)-Modellen oder zusätzlichen Tools wie Internetsuchen zur Überprüfung durchgeführt werden.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieses Konzept der Selbstreflexion wurde in mehreren Arbeiten und Projekten untersucht, darunter <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, etc.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Abfrage-Routing mit einem Agenten</h3><p>Manchmal ist es nicht notwendig, ein RAG-System zur Beantwortung einfacher Fragen zu verwenden, da dies zu mehr Missverständnissen und Rückschlüssen aus irreführenden Informationen führen könnte. In solchen Fällen können wir einen Agenten als Router in der Abfragephase einsetzen. Dieser Agent beurteilt, ob die Anfrage die RAG-Pipeline durchlaufen muss. Ist dies der Fall, wird die nachfolgende RAG-Pipeline eingeleitet; andernfalls wird die Anfrage direkt vom LLM bearbeitet.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Der Agent kann verschiedene Formen annehmen, z. B. ein LLM, ein kleines Klassifizierungsmodell oder sogar einen Satz von Regeln.</p>
<p>Durch das Routing von Abfragen auf der Grundlage der Benutzerabsicht können Sie einen Teil der Abfragen umleiten, was zu einer erheblichen Verbesserung der Antwortzeit und einer spürbaren Verringerung des unnötigen Rauschens führt.</p>
<p>Wir können die Technik des Query Routing auf andere Prozesse innerhalb des RAG-Systems ausdehnen, z. B. auf die Bestimmung, wann Tools wie die Websuche eingesetzt werden sollen, auf die Durchführung von Unterabfragen oder die Suche nach Bildern. Dieser Ansatz stellt sicher, dass jeder Schritt im RAG-System auf der Grundlage der spezifischen Anforderungen der Abfrage optimiert wird, was zu einer effizienteren und genaueren Informationsbeschaffung führt.</p>
<h2 id="Summary" class="common-anchor-header">Zusammenfassung<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Während eine einfache RAG-Pipeline einfach erscheinen mag, erfordert das Erreichen einer optimalen Unternehmensleistung oft ausgefeiltere Optimierungstechniken.</p>
<p>Dieser Artikel fasst verschiedene gängige Ansätze zur Verbesserung der Leistung Ihrer RAG-Anwendungen zusammen. Wir haben auch klare Illustrationen zur Verfügung gestellt, damit Sie diese Konzepte und Techniken schnell verstehen und ihre Implementierung und Optimierung beschleunigen können.</p>
<p>Sie können die einfachen Implementierungen der wichtigsten in diesem Artikel aufgeführten Ansätze über diesen <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">GitHub-Link</a> erhalten.</p>
