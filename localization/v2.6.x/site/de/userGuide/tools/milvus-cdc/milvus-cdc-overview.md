---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC ist ein benutzerfreundliches Tool, das inkrementelle Daten in
  Milvus-Instanzen erfassen und synchronisieren kann.
title: CDC-Übersicht
---
<h1 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC ist ein benutzerfreundliches Tool, das inkrementelle Daten in Milvus-Instanzen erfassen und synchronisieren kann. Es stellt die Zuverlässigkeit von Geschäftsdaten sicher, indem es sie nahtlos zwischen Quell- und Zielinstanzen überträgt und so eine einfache inkrementelle Sicherung und Notfallwiederherstellung ermöglicht.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Wichtigste Funktionen<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Sequentielle Datensynchronisierung</strong>: Sorgt für Datenintegrität und -konsistenz, indem Datenänderungen sequentiell zwischen Milvus-Instanzen synchronisiert werden.</p></li>
<li><p><strong>Inkrementelle Datenreplikation</strong>: Repliziert inkrementelle Daten, einschließlich Einfügungen und Löschungen, von der Milvus-Quelle zur Milvus-Zielinstanz und bietet so eine dauerhafte Speicherung.</p></li>
<li><p><strong>CDC-Aufgabenverwaltung</strong>: Ermöglicht die Verwaltung von CDC-Aufgaben über OpenAPI-Anfragen, einschließlich der Erstellung, Statusabfrage und Löschung von CDC-Aufgaben.</p></li>
</ul>
<p>Darüber hinaus planen wir, unsere Fähigkeiten zu erweitern, um in Zukunft auch die Integration mit Stream-Processing-Systemen zu unterstützen.</p>
<h2 id="Architecture" class="common-anchor-header">Architektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC verwendet eine Architektur mit zwei Hauptkomponenten - einem HTTP-Server, der Aufgaben und Metadaten verwaltet, und einer <strong>Corelib</strong>, die die Aufgabenausführung mit einem Reader, der Daten von der Milvus-Quellinstanz erhält, und einem Writer, der verarbeitete Daten an die Milvus-Zielinstanz sendet, synchronisiert.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-architektur</span> </span></p>
<p>Im vorstehenden Diagramm,</p>
<ul>
<li><p><strong>HTTP-Server</strong>: Bearbeitet Benutzeranfragen, führt Aufgaben aus und verwaltet Metadaten. Er dient als Steuerungsebene für die Aufgabenorchestrierung innerhalb des Milvus-CDC-Systems.</p></li>
<li><p><strong>Corelib</strong>: Verantwortlich für die eigentliche Synchronisation von Aufgaben. Sie umfasst eine Lesekomponente, die Informationen aus dem etcd und der Message Queue (MQ) des Quell-Milvus abruft, sowie eine Schreibkomponente, die Nachrichten aus der MQ in API-Parameter für das Milvus-System übersetzt und diese Anfragen an das Ziel-Milvus sendet, um den Synchronisierungsprozess abzuschließen.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Arbeitsablauf<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Milvus-CDC-Datenverarbeitungsfluss umfasst die folgenden Schritte:</p>
<ol>
<li><p><strong>Aufgabenerstellung</strong>: Benutzer initiieren eine CDC-Aufgabe über HTTP-Anfragen.</p></li>
<li><p><strong>Abruf von Metadaten</strong>: Das System holt sammlungsspezifische Metadaten aus dem etcd der Milvus-Quelle, einschließlich Kanal- und Checkpoint-Informationen für die Sammlung.</p></li>
<li><p><strong>MQ-Verbindung</strong>: Mit den vorliegenden Metadaten stellt das System eine Verbindung zum MQ her, um mit dem Abonnieren des Datenstroms zu beginnen.</p></li>
<li><p><strong>Verarbeitung der Daten</strong>: Die Daten aus dem MQ werden gelesen, geparst und entweder mit dem Go SDK weitergegeben oder verarbeitet, um die in der Milvus-Quelle durchgeführten Operationen zu replizieren.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-workflow</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Inkrementelle Datensynchronisation</strong>: Derzeit ist Milvus-CDC so konzipiert, dass nur inkrementelle Daten synchronisiert werden können. Wenn Ihr Unternehmen eine vollständige Datensicherung benötigt, <a href="https://milvus.io/community">wenden</a> Sie <a href="https://milvus.io/community">sich</a> bitte <a href="https://milvus.io/community">an uns</a>, um Unterstützung zu erhalten.</p></li>
<li><p><strong>Umfang der Synchronisierung</strong>: Derzeit kann Milvus-CDC Daten auf Clusterebene synchronisieren. Wir arbeiten daran, in kommenden Versionen Unterstützung für die Synchronisierung von Daten auf Sammlungsebene hinzuzufügen.</p></li>
<li><p><strong>Unterstützte API-Anfragen</strong>: Milvus-CDC unterstützt derzeit die folgenden API-Anfragen. Wir planen, die Unterstützung für weitere Anfragen in zukünftigen Versionen zu erweitern:</p>
<ul>
<li><p>Sammlung erstellen/verwerfen</p></li>
<li><p>Einfügen/Löschen/Upload</p></li>
<li><p>Partition erstellen/löschen</p></li>
<li><p>Index erstellen/löschen</p></li>
<li><p>Laden/Freigeben/Flush</p></li>
<li><p>Partition laden/freigeben</p></li>
<li><p>Datenbank erstellen/verwerfen</p></li>
</ul></li>
</ul>
