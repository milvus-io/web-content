---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Mehrmandantenfähigkeit in Milvus.
title: Strategien zur Mehrmandantenfähigkeit
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Mehrmandantenstrategien<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>Da ChatGPT immer beliebter wird, erstellen immer mehr Entwickler ihre eigenen SaaS-Dienste unter Verwendung des CVP-Stacks (ChatGPT, Vector Database, Prompt). In diesem Leitfaden wird erklärt, wie man Multi-Tenancy auf Milvus, einer der weltweit am häufigsten verwendeten Vektordatenbanken, erreichen kann, um mit diesem Trend Schritt zu halten.</p>
<p>Multi-Tenancy ist eine Architektur, bei der eine einzige Milvus-Instanz mehrere Mandanten bedient. Die einfachste Möglichkeit, Mandanten zu unterscheiden, besteht darin, ihre Daten und Ressourcen von denen anderer zu trennen. Jeder Tenant hat seine eigenen dedizierten Ressourcen oder teilt sich Ressourcen mit anderen, um Milvus-Objekte wie Datenbanken, Sammlungen und Partitionen zu verwalten. Basierend auf diesen Objekten gibt es entsprechende Methoden, um Milvus-Multi-Tenancy zu erreichen.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Datenbankorientierte Mandantenfähigkeit<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Seit Milvus Version 2.2.9 ist die Objektdatenbank nun verfügbar. Sie können mehrere Datenbanken in einem einzigen Milvus-Cluster erstellen. Diese neue Funktion ermöglicht eine datenbankorientierte Mandantenfähigkeit, indem jedem Mandanten eine Datenbank zugewiesen wird, so dass er seine eigenen Sammlungen und Partitionen erstellen kann, um das Beste aus seinen Daten herauszuholen. Diese Strategie gewährleistet zwar die Datenisolierung und die Suchleistung für die Mandanten, aber es kann zu einer Verschwendung von Ressourcen für untätige Mandanten kommen.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">Sammlungsorientierte Multi-Tenancy<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt zwei Möglichkeiten, um eine sammlungsorientierte Mandantenfähigkeit zu erreichen.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Eine Sammlung für alle Tenants</h3><p>Die Verwendung einer einzigen Sammlung zur Umsetzung der Mandantenfähigkeit durch Hinzufügen eines Mandantenfeldes zur Unterscheidung zwischen den Mandanten ist eine einfache Option. Fügen Sie bei der ANN-Suche nach einem bestimmten Tenant einen Filterausdruck hinzu, um alle Entitäten herauszufiltern, die zu anderen Tenants gehören. Dies ist der einfachste Weg, um Multi-Tenancy zu erreichen. Beachten Sie jedoch, dass die Leistung des Filters zum Flaschenhals der ANN-Suche werden kann.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Eine Sammlung pro Mandant</h3><p>Ein anderer Ansatz besteht darin, eine Sammlung für jeden Mandanten zu erstellen, um seine eigenen Daten zu speichern, anstatt die Daten aller Mandanten in einer einzigen Sammlung zu speichern. Dies bietet eine bessere Datenisolierung und Abfrageleistung. Beachten Sie jedoch, dass dieser Ansatz mehr Investitionen in die Ressourcenplanung, die Betriebsfähigkeit und die Kosten erfordert und möglicherweise nicht anwendbar ist, wenn die Anzahl der Mandanten die maximale Anzahl von Sammlungen überschreitet, die ein einzelner Milvus-Cluster unterstützt.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Partitionsorientierte Multi-Mandantenschaft<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt auch zwei Möglichkeiten, um eine partitionierte Mandantenfähigkeit zu erreichen:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Eine Partition pro Mandant</h3><p>Die Verwaltung einer einzigen Sammlung ist viel einfacher als die Verwaltung mehrerer Sammlungen. Anstatt mehrere Sammlungen zu erstellen, können Sie jedem Mandanten eine Partition zuweisen, um eine flexible Datenisolierung und Speicherverwaltung zu erreichen. Die Suchleistung der partitionorientierten Mandantenfähigkeit ist wesentlich besser als die der sammlungsorientierten Mandantenfähigkeit. Beachten Sie jedoch, dass die Anzahl der Mandanten der Sammlung die maximale Anzahl von Partitionen, die eine Sammlung enthalten kann, nicht überschreiten sollte.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Partitionsschlüssel-basierte Mandantenfähigkeit</h3><p>Milvus 2.2.9 führt eine neue Funktion namens Partitionsschlüssel ein. Bei der Erstellung einer Sammlung kann ein Mandantenfeld als Partitionsschlüsselfeld festgelegt werden. Milvus speichert Entitäten in einer Partition entsprechend den Werten im Partitionsschlüsselfeld. Bei der Durchführung von ANN-Suchen wechselt Milvus zu einer Partition, die auf dem angegebenen Partitionsschlüssel basiert, filtert Entitäten gemäß dem Partitionsschlüssel und sucht unter den gefilterten Entitäten.</p>
</div>
<p>Diese Strategie hebt die Begrenzung der maximalen Anzahl von Mandanten auf, die eine Milvus-Sammlung unterstützen kann, und vereinfacht die Ressourcenverwaltung erheblich, da Milvus automatisch Partitionen für Sie verwaltet.</p>
<p>Zusammenfassend lässt sich sagen, dass Sie eine oder mehrere der oben genannten Multi-Tenancy-Strategien verwenden können, um Ihre eigene Lösung zu erstellen. Die folgende Tabelle enthält Vergleiche zwischen diesen Strategien in Bezug auf die Datenisolierung, die Suchleistung und die maximale Anzahl von Mandanten.</p>
<table>
<thead>
<tr><th></th><th>Datenisolierung</th><th>Suchperf.</th><th>Max. Anzahl von Mandanten</th><th>Empfohlene Szenarien</th></tr>
</thead>
<tbody>
<tr><td>Datenbankorientiert</td><td>Stark</td><td>Stark</td><td>64</td><td>Für diejenigen, bei denen die Sammlungen je nach Projekt variieren müssen, besonders geeignet für die Datenisolierung zwischen Abteilungen in Ihrem Unternehmen.</td></tr>
<tr><td>Eine Sammlung für alle</td><td>Schwach</td><td>Mittel</td><td>K.A.</td><td>Für Unternehmen, die nur über begrenzte Ressourcen verfügen und denen eine Datenisolierung nicht wichtig ist.</td></tr>
<tr><td>Eine Sammlung pro Mieter</td><td>Stark</td><td>Stark</td><td>Weniger als 10.000</td><td>Für diejenigen, die weniger als 10.000 Mandanten pro Cluster haben.</td></tr>
<tr><td>Eine Partition pro Mandant</td><td>Mittel</td><td>Stark</td><td>4,096</td><td>Für diejenigen, die weniger als 4.096 Mieter pro Sammlung haben.</td></tr>
<tr><td>Partitionsschlüssel-basiert</td><td>Mittel</td><td>Stark</td><td>10,000,000+</td><td>Für Unternehmen, die einen raschen Anstieg der Mieterzahlen in die Millionen voraussagen.</td></tr>
</tbody>
</table>
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
    </button></h2><p><a href="/docs/de/v2.4.x/manage_databases.md">Verwalten von</a><a href="/docs/de/v2.4.x/schema.md">Datenbankschemata</a></p>
