---
id: knowhere.md
summary: Erfahren Sie mehr über Knowhere in Milvus.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Abschnitt wird Knowhere vorgestellt, die zentrale Vektorausführungsmaschine von Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere ist die zentrale Vektorausführungsmaschine von Milvus, die mehrere Bibliotheken für die Suche nach Vektorähnlichkeit enthält, darunter <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> und <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere ist auch für die Unterstützung von heterogenem Computing ausgelegt. Sie steuert, auf welcher Hardware (CPU oder GPU) die Indexerstellung und Suchanfragen ausgeführt werden sollen. Daher hat Knowhere auch seinen Namen - es weiß, wo die Operationen ausgeführt werden sollen. Weitere Hardwaretypen, einschließlich DPU und TPU, werden in zukünftigen Versionen unterstützt.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere in der Milvus-Architektur<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Abbildung zeigt die Position von Knowhere in der Milvus-Architektur.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>Die unterste Schicht ist die Systemhardware. Darüber befinden sich die Indexbibliotheken von Drittanbietern. Auf der obersten Schicht interagiert Knowhere mit dem Indexknoten und dem Abfrageknoten über CGO, das es Go-Paketen ermöglicht, C-Code aufzurufen.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Knowhere Vorteile<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Folgenden sind die Vorteile von Knowhere gegenüber Faiss aufgeführt.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Unterstützung für BitsetView</h4><p>Milvus führt einen Bitset-Mechanismus ein, um &quot;soft deletion&quot; zu realisieren. Ein sanft gelöschter Vektor existiert noch in der Datenbank, wird aber bei einer Vektorähnlichkeitssuche oder -abfrage nicht berechnet.</p>
<p>Jedes Bit in einem Bitset entspricht einem indizierten Vektor. Wenn ein Vektor im Bitset mit "1" markiert ist, bedeutet dies, dass dieser Vektor "soft-deleted" ist und bei einer Vektorsuche nicht berücksichtigt wird. Der Bitset-Parameter wird auf alle exponierten Faiss-Indexabfrage-APIs in Knowhere angewendet, einschließlich CPU- und GPU-Indizes.</p>
<p>Weitere Informationen über den Bitset-Mechanismus finden Sie unter <a href="/docs/de/v2.4.x/bitset.md">Bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Unterstützung für mehrere Ähnlichkeitsmetriken zur Indizierung binärer Vektoren</h4><p>Knowhere unterstützt <a href="/docs/de/v2.4.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/de/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/de/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/de/v2.4.x/metric.md#Superstructure">Superstructure</a>, und <a href="/docs/de/v2.4.x/metric.md#Substructure">Substructure</a>. Jaccard und Tanimoto können verwendet werden, um die Ähnlichkeit zwischen zwei Mustersätzen zu messen, während Superstructure und Substructure verwendet werden können, um die Ähnlichkeit von chemischen Strukturen zu messen.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Unterstützung für AVX512-Befehlssatz</h4><p>Neben <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> und <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, den bereits von Faiss unterstützten Befehlssätzen, unterstützt Knowhere auch <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, was <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">die Leistung der Indexerstellung und -abfrage um 20 bis 30 %</a> im Vergleich zu AVX2 <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">verbessern</a> kann.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Automatische SIMD-Befehlsauswahl</h4><p>Knowhere unterstützt den automatischen Aufruf der geeigneten SIMD-Befehle (z. B. SIMD SSE, AVX, AVX2 und AVX512) auf jedem CPU-Prozessor (sowohl vor Ort als auch auf Cloud-Plattformen), so dass die Benutzer das SIMD-Flag (z. B. "-msse4") während der Kompilierung nicht manuell angeben müssen.</p>
<p>Knowhere wird durch Refactoring der Codebasis von Faiss erstellt. Gängige Funktionen (z. B. Ähnlichkeitsberechnungen), die auf SIMD-Beschleunigung angewiesen sind, werden ausgegliedert. Dann werden für jede Funktion vier Versionen (d.h. SSE, AVX, AVX2, AVX512) implementiert und jede in eine separate Quelldatei gestellt. Anschließend werden die Quelldateien einzeln mit dem entsprechenden SIMD-Flag weiter kompiliert. Daher kann Knowhere zur Laufzeit automatisch die am besten geeigneten SIMD-Anweisungen auf der Grundlage der aktuellen CPU-Flags auswählen und dann die richtigen Funktionszeiger mit Hooking verknüpfen.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Andere Leistungsoptimierungen</h4><p>Lesen Sie <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management System</a> für weitere Informationen über die Leistungsoptimierung von Knowhere.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Knowhere-Code-Struktur<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Berechnungen in Milvus beinhalten hauptsächlich Vektor- und Skalaroperationen. Knowhere verarbeitet nur die Operationen zur Vektorindizierung.</p>
<p>Ein Index ist eine Datenstruktur, die unabhängig von den ursprünglichen Vektordaten ist. Im Allgemeinen sind für die Indexierung vier Schritte erforderlich: Erstellen eines Indexes, Trainieren von Daten, Einfügen von Daten und Aufbau eines Indexes. In einigen KI-Anwendungen wird das Training von Datensätzen von der Vektorsuche getrennt. Daten aus Datensätzen werden zunächst trainiert und dann in eine Vektordatenbank wie Milvus für die Ähnlichkeitssuche eingefügt. Bei den offenen Datensätzen sift1M und sift1B wird beispielsweise zwischen Daten zum Trainieren und Daten zum Testen unterschieden.</p>
<p>In Knowhere sind die Daten für das Training und für die Suche jedoch identisch. Knowhere trainiert alle Daten in einem <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">Segment</a> und fügt dann alle trainierten Daten ein und baut einen Index für sie auf.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>Basis: Basisklasse</h4><p><code translate="no">DataObj</code> ist die Basisklasse für alle Datenstrukturen in Knowhere. <code translate="no">Size()</code> ist die einzige virtuelle Methode in <code translate="no">DataObj</code>. Die Klasse Index erbt von <code translate="no">DataObj</code> mit einem Feld namens &quot;size_&quot;. Die Index-Klasse hat auch zwei virtuelle Methoden - <code translate="no">Serialize()</code> und <code translate="no">Load()</code>. Die Klasse <code translate="no">VecIndex</code>, die von <code translate="no">Index</code> abgeleitet ist, ist die virtuelle Basisklasse für alle Vektorindizes. <code translate="no">VecIndex</code> bietet Methoden wie <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code> und <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>Basisklasse</span> </span></p>
<p>Einige andere Indextypen sind in der obigen Abbildung rechts aufgeführt.</p>
<ul>
<li><p>Der Faiss-Index hat zwei Basisklassen: <code translate="no">FaissBaseIndex</code> für alle Indizes auf Fließkomma-Vektoren und <code translate="no">FaissBaseBinaryIndex</code> für alle Indizes auf binären Vektoren.</p></li>
<li><p><code translate="no">GPUIndex</code> ist die Basisklasse für alle Faiss-GPU-Indizes.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> ist die Basisklasse für alle selbstentwickelten Indizes. Da in einer Indexdatei nur die Vektor-IDs gespeichert werden, kann die Dateigröße für 128-dimensionale Vektoren um zwei Größenordnungen reduziert werden.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>: Brute-Force-Suche</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Technisch gesehen handelt es sich bei <code translate="no">IDMAP</code> nicht um einen Index, sondern um eine Brute-Force-Suche. Wenn Vektoren in die Datenbank eingefügt werden, ist weder ein Datentraining noch ein Indexaufbau erforderlich. Die Suche wird direkt auf den eingefügten Vektordaten durchgeführt.</p>
<p>Aus Gründen der Code-Konsistenz erbt <code translate="no">IDMAP</code> jedoch auch von der Klasse <code translate="no">VecIndex</code> mit all ihren virtuellen Schnittstellen. Die Verwendung von <code translate="no">IDMAP</code> ist die gleiche wie bei den anderen Indizes.</p>
<h4 id="IVF-indices" class="common-anchor-header">IVF-Indizes</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>Die IVF-Indizes (inverted file) sind die am häufigsten verwendeten Indizes. Die Klasse <code translate="no">IVF</code> wird von <code translate="no">VecIndex</code> und <code translate="no">FaissBaseIndex</code> abgeleitet und erweitert sich zu <code translate="no">IVFSQ</code> und <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> wird von <code translate="no">GPUIndex</code> und <code translate="no">IVF</code> abgeleitet. Dann erweitert sich <code translate="no">GPUIVF</code> weiter zu <code translate="no">GPUIVFSQ</code> und <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> ist ein selbst entwickelter hybrider Index. Ein grober Quantisierer wird auf der GPU ausgeführt, während die Suche im Bucket auf der CPU stattfindet. Diese Art von Index kann das Auftreten von Speicherkopien zwischen CPU und GPU reduzieren, indem die Rechenleistung der GPU genutzt wird. <code translate="no">IVFSQHybrid</code> hat die gleiche Auffindungsrate wie <code translate="no">GPUIVFSQ</code>, bietet aber eine bessere Leistung.</p>
<p>Die Basisklassenstruktur für binäre Indizes ist relativ einfach. <code translate="no">BinaryIDMAP</code> und <code translate="no">BinaryIVF</code> sind von <code translate="no">FaissBaseBinaryIndex</code> und <code translate="no">VecIndex</code> abgeleitet.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Indizes von Drittanbietern</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>Drittanbieter-Indizes</span> </span></p>
<p>Derzeit werden neben Faiss nur zwei Arten von Indizes von Drittanbietern unterstützt: der baumbasierte Index <code translate="no">Annoy</code> und der graphbasierte Index <code translate="no">HNSW</code>. Diese beiden gebräuchlichen und häufig verwendeten Indizes von Drittanbietern sind beide von <code translate="no">VecIndex</code> abgeleitet.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Hinzufügen von Indizes zu Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie neue Indizes zu Knowhere hinzufügen möchten, können Sie zunächst auf bestehende Indizes verweisen:</p>
<ul>
<li><p>Um quantisierungsbasierte Indizes hinzuzufügen, lesen Sie <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Um graph-basierte Indizes hinzuzufügen, lesen Sie <code translate="no">HNSW</code>.</p></li>
<li><p>Um baumbasierte Indizes hinzuzufügen, lesen Sie bitte <code translate="no">Annoy</code>.</p></li>
</ul>
<p>Nachdem Sie auf einen bestehenden Index verwiesen haben, können Sie die folgenden Schritte ausführen, um einen neuen Index zu Knowhere hinzuzufügen.</p>
<ol>
<li><p>Fügen Sie den Namen des neuen Indexes in <code translate="no">IndexEnum</code> ein. Der Datentyp ist String.</p></li>
<li><p>Fügen Sie eine Datenvalidierungsprüfung für den neuen Index in der Datei <code translate="no">ConfAdapter.cpp</code> hinzu. Die Validierungsprüfung dient hauptsächlich dazu, die Parameter für das Datentraining und die Abfrage zu validieren.</p></li>
<li><p>Erstellen Sie eine neue Datei für den neuen Index. Die Basisklasse des neuen Index sollte <code translate="no">VecIndex</code> und die notwendige virtuelle Schnittstelle von <code translate="no">VecIndex</code> enthalten.</p></li>
<li><p>Fügen Sie die Indexerstellungslogik für den neuen Index in <code translate="no">VecIndexFactory::CreateVecIndex()</code> hinzu.</p></li>
<li><p>Fügen Sie den Unit-Test unter dem Verzeichnis <code translate="no">unittest</code> hinzu.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie gelernt haben, wie Knowhere in Milvus funktioniert, möchten Sie vielleicht auch:</p>
<ul>
<li><p>Lernen Sie <a href="/docs/de/v2.4.x/index.md">die verschiedenen Arten von Indizes kennen, die Milvus unterstützt</a>.</p></li>
<li><p>Lernen Sie <a href="/docs/de/v2.4.x/bitset.md">den Bitset-Mechanismus</a> kennen.</p></li>
<li><p>Verstehen, <a href="/docs/de/v2.4.x/data_processing.md">wie Daten</a> in Milvus <a href="/docs/de/v2.4.x/data_processing.md">verarbeitet werden</a>.</p></li>
</ul>
