---
id: architecture_overview.md
summary: >-
  Milvus bietet eine schnelle, zuverlässige und stabile Vektordatenbank, die
  speziell für die Ähnlichkeitssuche und künstliche Intelligenz entwickelt
  wurde.
title: Milvus Architektur Überblick
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvus Architektur Überblick<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus basiert auf beliebten Vektorsuchbibliotheken wie Faiss, HNSW, DiskANN, SCANN und anderen und wurde für die Ähnlichkeitssuche in dichten Vektordatensätzen mit Millionen, Milliarden oder sogar Billionen von Vektoren entwickelt. Bevor Sie fortfahren, sollten Sie sich mit den <a href="/docs/de/v2.4.x/glossary.md">Grundprinzipien</a> des Embedding Retrieval vertraut machen.</p>
<p>Milvus unterstützt auch Daten-Sharding, Streaming Data Ingestion, dynamische Schemata, die Kombination von Vektor- und Skalardaten bei der Suche, Multi-Vektor- und Hybrid-Suche, Sparse Vector und viele andere erweiterte Funktionen. Die Plattform bietet Leistung nach Bedarf und kann für jedes Einbettungsszenario optimiert werden. Wir empfehlen die Bereitstellung von Milvus mit Kubernetes für optimale Verfügbarkeit und Elastizität.</p>
<p>Milvus verwendet eine Shared-Storage-Architektur mit Disaggregation von Speicher und Rechenleistung und horizontaler Skalierbarkeit für seine Rechenknoten. Nach dem Prinzip der Disaggregation von Daten- und Steuerungsebene besteht Milvus aus <a href="/docs/de/v2.4.x/four_layers.md">vier Schichten</a>: Zugriffsschicht, Koordinatordienst, Arbeitsknoten und Speicher. Diese Schichten sind voneinander unabhängig, wenn es um Skalierung oder Notfallwiederherstellung geht.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Architektur_Diagramm</span> </span></p>
<p>Gemäß der Abbildung können die Schnittstellen in die folgenden Kategorien eingeteilt werden:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong> einfügen / löschen / upsert</li>
<li><strong>DQL:</strong> Suchen / Abfragen</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie mehr über <a href="/docs/de/v2.4.x/four_layers.md">Computing/Storage Disaggregation</a> in Milvus</li>
<li>Lernen Sie die <a href="/docs/de/v2.4.x/main_components.md">Hauptkomponenten</a> von Milvus kennen.</li>
</ul>
