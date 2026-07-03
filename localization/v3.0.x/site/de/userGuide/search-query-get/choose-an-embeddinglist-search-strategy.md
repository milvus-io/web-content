---
id: choose-an-embeddinglist-search-strategy.md
title: Wählen Sie eine Suchstrategie für die EmbeddingList-Suche
summary: >-
  Die Suchstrategien für „EmbeddingList“ legen fest, wie Milvus einen
  approximativen Kandidatenindex für die EmbeddingList-Suche erstellt. Die
  Standardstrategie ist „tokenann“. Sie können zu „muvera“ oder „lemur“
  wechseln, wenn die Embedding-Liste groß ist, „TokenANN“ zu rechenintensiv ist
  oder eine gelernte/komprimierte Darstellung auf Zeilenebene besser geeignet
  ist. Das Endergebnis wird weiterhin durch das MaxSim-Reranking ermittelt, wenn
  „emb_list_rerank“ aktiviert ist.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Wählen Sie eine Suchstrategie für die EmbeddingList-Suche<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>EmbeddingList-Suchstrategien legen fest, wie Milvus einen approximativen Kandidatenindex für die EmbeddingList-Suche erstellt. Die Standardstrategie ist „ <code translate="no">tokenann</code> “. Sie können zu „ <code translate="no">muvera</code> “ oder „ <code translate="no">lemur</code> “ wechseln, wenn die Embedding-Liste groß ist, TokenANN zu rechenintensiv ist oder eine gelernte/komprimierte Darstellung auf Zeilenebene besser geeignet ist. Das Endergebnis wird weiterhin durch das MaxSim-Reranking erzeugt, wenn „ <code translate="no">emb_list_rerank</code> “ aktiviert ist.</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Warum es Suchstrategien gibt<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>„EmbeddingList“ ist für Zeilen konzipiert, die mehrere Vektoren enthalten, wie beispielsweise Token-Einbettungen in einem Textdokument, Patch-Einbettungen in einem visuellen Dokument oder Clip-Einbettungen in einem Video. Anstatt einen Abfragevektor mit einem Zeilenvektor zu vergleichen, vergleicht MaxSim eine Abfrage-Einbettungsliste mit einer Dokument-Einbettungsliste und aggregiert die besten Übereinstimmungen.</p>
<p>Dies bietet eine bessere Repräsentationskraft, doch exakte MaxSim-Berechnungen sind bei großem Umfang rechenintensiv. Eine Brute-Force-MaxSim-Suche müsste die Abfragevektoren mit jedem Vektor in jeder Kandidatenzeile vergleichen. Das ist für die Suche im Produktivbetrieb in der Regel zu langsam.</p>
<table>
<thead>
<tr><th>### Problem – Jede Zeile kann viele Vektoren enthalten. – Exaktes MaxSim über alle Zeilen ist rechenintensiv. – Indexgröße und Suchlatenz können schnell ansteigen.</th><th>### Strategie – Verwenden Sie eine approximative Methode zur ersten Suchstufe. – Rufen Sie mehr Kandidaten ab als die angeforderten Top-K. – Ordnen Sie die Kandidaten mit exaktem MaxSim neu.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>In diesem Sinne ist „ <code translate="no">emb_list_strategy</code> “ in erster Linie eine Strategie zum Erstellen von Indizes und zum Abrufen von Kandidaten. Sie wird beim Erstellen des Indexes konfiguriert und bestimmt, wie die ANN-Kandidatenmenge der ersten Stufe erzeugt wird. Suchzeitparameter wie „ <code translate="no">retrieval_ann_ratio</code> “ und „ <code translate="no">emb_list_rerank</code> “ steuern dann, wie viele Kandidaten abgerufen werden und ob eine MaxSim-Neurangfolge angewendet wird.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Verfügbare Strategien<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Strategie</th><th>Einheit zur Kandidatenauswahl</th><th>Was sie löst</th><th>Best-Fit</th><th>Wichtigster Kompromiss</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Einzelne Vektoren innerhalb jeder Zeile</td><td>Behält die ursprünglichen Vektoren bei und vermeidet Kompressionsverluste.</td><td>Qualitätsorientierte Suche, kurze oder mittellange Einbettungslisten, Einbettungen mit hoher Unterscheidungskraft.</td><td>Größerer Index und höherer Aufwand beim Abruf von Kandidaten.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Ein kodierter Vektor pro Zeile</td><td>Komprimiert eine Einbettungsliste ohne Training in eine FDE-Darstellung mit fester Dimension.</td><td>Längere Dokumente, Embeddings mit hoher Unterscheidungskraft, Fälle, in denen TokenANN zu ressourcenintensiv ist.</td><td>Die zufällige Projektion führt zu einem Approximationsverlust; die FDE-Dimension beeinflusst die Latenz.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Ein gelernter Vektor pro Zeile</td><td>Lernt eine korpus-spezifische Komprimierung von Einbettungslisten zu festdimensionalen Zeilenvektoren.</td><td>Embeddings mit geringer Unterscheidungskraft, multimodale oder visuelle Dokumentensuche, große Einbettungslisten.</td><td>Erfordert Training und kann empfindlich gegenüber der Korpusverteilung und Verzerrungen durch die Dokumentlänge sein.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> indiziert jeden Vektor in der Einbettungsliste. Während der Suche führt jeder Abfragevektor eine ANN-Suche durch, übereinstimmende Vektoren werden wieder zu ihren Zeilen zusammengefasst, und die resultierenden Zeilenkandidaten werden mit MaxSim neu gewichtet.</p>
<div class="alert note">
<p><strong>Verwenden Sie TokenANN, wenn Qualität oberste Priorität hat.</strong> Es ist die beste Annäherung an die ursprüngliche MaxSim-Berechnung, da alle Vektoren im Index der ersten Stufe verfügbar bleiben.</p>
</div>
<ul>
<li><p><strong>Gut geeignet für:</strong> kurze Textabschnitte, Zeilen mit einer geringen oder moderaten Anzahl von Vektoren, starke semantische Trennung auf Token-Ebene, qualitätssensitive Baselines.</p></li>
<li><p><strong>Weniger geeignet:</strong> sehr lange Dokumente, visuelle Seiten mit Tausenden von Patch-Vektoren, strenge Speicher- oder Latenzbeschränkungen.</p></li>
<li><p><strong>Verhalten auf Elementebene:</strong> TokenANN kann Kandidaten aus einzelnen Vektoren abrufen, bevor diese wieder zu Zeilen aggregiert werden. Das endgültige Suchergebnis der „EmbeddingList“ liegt nach der MaxSim-Bewertung weiterhin auf Zeilenebene vor.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> kodiert jede Einbettungsliste mithilfe zufälliger Projektionen in einen Vektor fester Dimension. Dadurch wird die Suche in der ersten Stufe zu einer standardmäßigen Vektorsuche auf Zeilenebene. Die Kandidaten werden anschließend mit MaxSim neu gewertet.</p>
<div class="alert note">
<p><strong>Verwenden Sie MUVERA, wenn TokenANN zu ressourcenintensiv ist, Sie aber auf einen Trainingsschritt verzichten möchten.</strong> Es stellt einen praktischen Mittelweg zwischen Qualität und Kosten dar.</p>
</div>
<ul>
<li><p><strong>Gut geeignet für:</strong> lange Textdokumente, Embedding-Räume mit hoher Unterscheidungskraft, Workloads, die eine geringere Indexgröße als bei TokenANN erfordern.</p></li>
<li><p><strong>Weniger geeignet:</strong> Einbettungsräume mit geringer Unterscheidungskraft oder Fälle, in denen die FDE-Darstellung für das Latenzbudget zu hochdimensional wird.</p></li>
<li><p><strong>Wichtige Parameter:</strong> „<code translate="no">muvera_num_projections</code> “, „ <code translate="no">muvera_num_repeats</code> “ und „ <code translate="no">muvera_seed</code> “.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> trainiert ein Modell, um jede Einbettungsliste in eine Darstellung fester Dimension zu komprimieren. Die ANN-Suche der ersten Stufe läuft auf den gelernten Vektoren auf Zeilenebene, und die Kandidaten werden mit MaxSim neu gewichtet.</p>
<div class="alert note">
<p><strong>Verwenden Sie LEMUR, wenn der Trainingsaufwand für die gelernte Komprimierung gerechtfertigt ist.</strong> Es eignet sich gut für Einbettungsräume mit geringer Unterscheidungskraft und für die multimodale Suche, sollte jedoch anhand des Zielkorpus validiert werden, da es empfindlich auf die Verteilung der Dokumentlängen reagieren kann.</p>
</div>
<ul>
<li><p><strong>Gut geeignet:</strong> visuelle Dokumentensuche, multimodale Patch-Einbettungen, Einbettungsräume mit geringer Unterscheidungskraft, große Einbettungslisten, bei denen TokenANN nicht praktikabel ist.</p></li>
<li><p><strong>Weniger geeignet:</strong> sich häufig ändernde Korpora, Embeddings mit hoher Unterscheidungskraft und stark schrägen Dokumentlängen, Anwendungsfälle, bei denen die Trainingskosten inakzeptabel sind.</p></li>
<li><p><strong>Wichtige Parameter: „</strong><code translate="no">lemur_hidden_dim</code><strong>“</strong>, „ <code translate="no">lemur_num_train_samples</code> “, „ <code translate="no">lemur_num_epochs</code> “, „ <code translate="no">lemur_batch_size</code> “, „ <code translate="no">lemur_learning_rate</code> “, „ <code translate="no">lemur_seed</code> “ und „ <code translate="no">lemur_num_layers</code> “.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Standardverhalten und Konfiguration<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Standardstrategie für „EmbeddingList“ in Knowhere ist „ <code translate="no">tokenann</code> “. Wenn Sie „ <code translate="no">emb_list_strategy</code> “ nicht angeben, verwendet Knowhere „TokenANN“. Zu den Standardwerten bei der Suche gehören „ <code translate="no">retrieval_ann_ratio=3.0</code> “ und „ <code translate="no">emb_list_rerank=true</code> “.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Konfigurationselemente nach Strategie<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle listet die strategiespezifischen Konfigurationselemente auf. In Milvus werden Elemente zur Erstellungszeit in der Regel beim Erstellen eines Indexes über die „ <code translate="no">params</code> “-Map übergeben. Wenn Sie serverseitige Standardwerte benötigen, sollten diese in der Milvus-Konfigurationsdatei im Abschnitt „ <code translate="no">knowhere</code> “ definiert werden.</p>
<table>
<thead>
<tr><th>Strategie</th><th>Konfigurationselement</th><th>Stufe</th><th>Standard</th><th>Wann sollte es geändert werden</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Index-Erstellung</td><td><code translate="no">tokenann</code></td><td>Verwenden Sie diese Option explizit, wenn Sie das Standardverhalten bei der Elementvektor-Indizierung wünschen oder wenn DiskANN verwendet wird.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Indexaufbau</td><td><code translate="no">tokenann</code></td><td>Verwenden Sie diese Option, wenn Sie eine zeilenbasierte, kodierte Abfrage ohne Training wünschen.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Indexaufbau</td><td><code translate="no">4</code></td><td>Steuert die Anzahl der SimHash-Projektionen. Höhere Werte erzeugen mehr Buckets und können die Kodierungsqualität verbessern, erhöhen jedoch die kodierte Dimensionalität.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Indexaufbau</td><td><code translate="no">7</code></td><td>Steuert, wie viele unabhängige FDE-Kodierungen verkettet werden. Höhere Werte können die Robustheit verbessern, erhöhen jedoch den Index- und Suchaufwand.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Indexaufbau</td><td><code translate="no">42</code></td><td>Wird für reproduzierbare Zufallsprojektionen festgelegt, insbesondere bei Tests und Benchmark-Vergleichen.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Indexaufbau</td><td><code translate="no">tokenann</code></td><td>Verwenden Sie diese Einstellung, wenn erwartet wird, dass die gelernte Komprimierung auf Zeilenebene besser funktioniert als die feste zufällige Projektion.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Indexaufbau</td><td><code translate="no">256</code></td><td>Steuert die Größe der komprimierten Darstellung. Erhöhen Sie diesen Wert für mehr Kapazität; verringern Sie ihn für geringeren Speicherbedarf und schnelleren Abruf.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Indexaufbau</td><td><code translate="no">20000</code></td><td>Erhöhen Sie diesen Wert, wenn der Korpus vielfältig ist und die gelernte Komprimierung unterangepasst ist; verringern Sie ihn nur für kleine Tests oder schnellere Erstellungen.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Indexaufbau</td><td><code translate="no">50</code></td><td>Erhöhen Sie den Wert, wenn das Training noch nicht konvergiert ist; verringern Sie ihn, wenn die Erstellungszeit die wichtigste Einschränkung darstellt.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Indexaufbau</td><td><code translate="no">512</code></td><td>Passen Sie den Wert an den Trainingsdurchsatz und die Speicherauslastung an.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Index-Erstellung</td><td><code translate="no">0.001</code></td><td>Anpassen, wenn das Training instabil ist oder zu langsam konvergiert.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Indexaufbau</td><td><code translate="no">42</code></td><td>Für reproduzierbare Trainingsläufe einstellen.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Indexaufbau</td><td><code translate="no">2</code></td><td>Erhöhen Sie diesen Wert nur, wenn der Korpus einen ausdrucksstärkeren Merkmalsextraktor benötigt und Sie sich zusätzliche Trainingskosten leisten können.</td></tr>
<tr><td>Alle Strategien</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Suche</td><td><code translate="no">3.0</code></td><td>Erhöhen Sie diesen Wert, um mehr Kandidaten der ersten Stufe zu finden und den Recall zu verbessern; verringern Sie ihn, um die Latenz zu reduzieren.</td></tr>
<tr><td>Alle Strategien</td><td><code translate="no">emb_list_rerank</code></td><td>Suche</td><td><code translate="no">true</code></td><td>Für das MaxSim-Reranking aktiviert lassen. Nur für kontrollierte Experimente deaktivieren, bei denen die Qualität des ANN der ersten Stufe direkt gemessen wird.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Konfigurieren der Strategie in Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus wird die Strategie als Indexparameter übergeben, wenn ein Index für ein EmbeddingList-Feld erstellt wird, beispielsweise für ein StructArray-Vektor-Unterfeld.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Für LEMUR geben Sie die LEMUR-Trainingsparameter in derselben „ <code translate="no">params</code> “-Zuordnung an.</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Konfigurieren der serverseitigen Standardeinstellungen in Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus kann Indexparameter auch aus „ <code translate="no">milvus.yaml</code> “ übernehmen. Der relevante Abschnitt ist „ <code translate="no">knowhere</code> “. Die Parameter sind nach Indextyp und -stufe gegliedert und folgen dem Muster „ <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code> “. Vom Benutzer bereitgestellte Indexparameter haben Vorrang vor diesen Standardwerten.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Bevorzugen Sie indexspezifische Parameter für die Strategieauswahl.</strong> Ein Standardwert aus der Milvus-Konfigurationsdatei gilt allgemein für Indizes dieses Typs und dieser Stufe. Verwenden Sie die Parameter unter <code translate="no">create_index</code>, wenn verschiedene Sammlungen oder Felder unterschiedliche „EmbeddingList“-Strategien erfordern.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Konfigurieren der Kandidatenauswahl zum Zeitpunkt der Suche<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Strategie bestimmt, wie der Index aufgebaut wird. Verwenden Sie zum Zeitpunkt der Suche den Parameter „ <code translate="no">retrieval_ann_ratio</code> “, um zu steuern, wie viele Kandidaten der ersten Stufe vor dem „MaxSim“-Reranking abgerufen werden. Höhere Werte verbessern in der Regel den Recall, erhöhen jedoch die Latenz.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Stufe</th><th>Standard</th><th>Bedeutung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Indexaufbau</td><td><code translate="no">tokenann</code></td><td>Legt fest, wie EmbeddingList-Kandidaten indiziert und abgerufen werden.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Suche</td><td><code translate="no">3.0</code></td><td>Erweiterungsfaktor für Kandidaten in der ersten ANN-Runde.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Suche</td><td><code translate="no">true</code></td><td>Legt fest, ob abgerufene Kandidaten mit MaxSim neu gewichtet werden sollen.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Hinweise zur Kompatibilität:</strong> MUVERA und LEMUR unterstützen derzeit fp32-Daten in Knowhere. DiskANN unterstützt EmbeddingList nur mit der TokenANN-Strategie. Wenn Sie andere Vektortypen als fp32 oder DiskANN verwenden, überprüfen Sie die Strategieunterstützung, bevor Sie die Standardeinstellung ändern.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">So wählen Sie eine Strategie aus<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt keine allgemein beste Strategie. Wählen Sie anhand der Länge der Einbettungsliste, der Unterscheidungskraft im Einbettungsraum, des Latenzbudgets, der Indexgröße und der Frage, ob Sie sich einen Trainingsschritt leisten können.</p>
<table>
<thead>
<tr><th>Frage</th><th>Signal</th><th>Empfohlener Ausgangspunkt</th></tr>
</thead>
<tbody>
<tr><td>Benötigen Sie eine hochwertige Baseline?</td><td>Sie möchten die beste praktische Annäherung ermitteln, bevor Sie die Kosten optimieren.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Sind die Zeilen kurz oder haben sie eine moderate Anzahl an Vektoren?</td><td>Jede Zeile enthält eine geringe Anzahl von Token-, Patch- oder Clip-Vektoren.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Ist TokenANN zu groß oder zu langsam?</td><td>Die Indexgröße oder die Latenz beim Abruf in der ersten Stufe stellt den Engpass dar.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Möchten Sie eine Komprimierung ohne Training?</td><td>Sie benötigen ein einfacheres Betriebsmodell und eine reproduzierbare Kodierung.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Weist der Einbettungsraum eine geringe Unterscheidungskraft auf?</td><td>ANN-Kandidaten auf Token-Ebene sind verrauscht, und die zufällige Projektion bewahrt nicht genügend Signal.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>Ist die Arbeitslast visuell oder multimodal?</td><td>Die Zeilen enthalten viele Patch-Vektoren, und TokenANN ist zu rechenintensiv.</td><td><code translate="no">lemur</code> oder <code translate="no">muvera</code></td></tr>
<tr><td>Ist die Dokumentenlänge stark ungleichverteilt?</td><td>Einige Zeilen enthalten weitaus mehr Vektoren als andere.</td><td>Beginnen Sie mit „ <code translate="no">muvera</code> “; überprüfen Sie „ <code translate="no">lemur</code> “ sorgfältig.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Vorgeschlagener Bewertungsablauf<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Beginnen Sie mit „ <code translate="no">tokenann</code> “ als Qualitäts-Baseline, sofern die Größe des Datensatzes dies zulässt.</p></li>
<li><p>Führen Sie dieselben Abfragen mit „ <code translate="no">muvera</code> “ durch und vergleichen Sie Recall, nDCG, Latenz und Indexgröße.</p></li>
<li><p>Probieren Sie „ <code translate="no">lemur</code> “ aus, wenn die Einbettungsliste groß ist, der Einbettungsraum verrauscht ist oder es sich um visuelle oder multimodale Workloads handelt.</p></li>
<li><p>Optimieren Sie „ <code translate="no">retrieval_ann_ratio</code> “, bevor Sie zu viele Parameter der Erstellungsphase ändern. Erhöhen Sie den Wert, wenn der Recall niedrig ist; verringern Sie ihn, wenn die Latenz zu hoch ist.</p></li>
<li><p>Führen Sie stets Validierungen anhand repräsentativer Abfragen und Dokumentlängenverteilungen durch. Eine Strategie, die bei kurzen Texten funktioniert, funktioniert möglicherweise nicht bei visuellen Dokumenten oder Long-Tail-Korpora.</p></li>
</ol>
<table>
<thead>
<tr><th>### Qualität an erster Stelle Beginnen Sie mit „ <code translate="no">tokenann</code> “. Verwenden Sie diesen Wert als Basis für die Approximationsqualität von MaxSim.</th><th>### Ausgewogen Probieren Sie „ <code translate="no">muvera</code> “ aus, wenn Sie geringere Kosten benötigen, ohne eine zusätzliche Trainingspipeline einzurichten.</th><th>### Komprimiert Probieren Sie „ <code translate="no">lemur</code> “ aus, wenn eine gelernte Komprimierung auf Zeilenebene voraussichtlich eine bessere Leistung als eine feste zufällige Projektion erbringt.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Für diesen Entwurf verwendete Referenzen<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Milvus-Tests zu „ <code translate="no">emb_list_strategy</code> “, „ <code translate="no">retrieval_ann_ratio</code> “ und „ <code translate="no">emb_list_rerank</code> “.</p></li>
<li><p>Die Behandlung von Milvus-Konfigurationsdateien für serverseitige Index-Standardwerte im Abschnitt „ <code translate="no">knowhere</code> “.</p></li>
<li><p>Knowhere-Parameterdefinitionen für Standardwerte und unterstützte Strategienamen.</p></li>
<li><p>Knowhere-Kompatibilitätsprüfungen für die ausschließliche Unterstützung von fp32-basierten MUVERA/LEMUR sowie von DiskANN und TokenANN.</p></li>
<li><p>Interne Evaluierungsnotizen zum Vergleich von TokenANN, MUVERA und LEMUR für die MaxSim-Kandidatenauswahl.</p></li>
</ul>
<div class="alert note">
<p><strong>Hinweis zur Veröffentlichung:</strong> Überprüfen Sie vor der externen Veröffentlichung, welche Parameter in der Zielversion von Milvus offiziell unterstützt werden und ob das Produkt alle Low-Level-Knowhere-Parameter oder nur eine kleinere, dokumentierte Teilmenge offenlegen möchte.</p>
</div>
