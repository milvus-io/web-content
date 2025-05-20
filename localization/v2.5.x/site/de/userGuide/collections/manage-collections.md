---
id: manage-collections.md
title: Sammlung erklärt
summary: >-
  In Milvus können Sie mehrere Sammlungen erstellen, um Ihre Daten zu verwalten,
  und Ihre Daten als Entitäten in die Sammlungen einfügen. Sammlungen und
  Entitäten sind vergleichbar mit Tabellen und Datensätzen in relationalen
  Datenbanken. Auf dieser Seite erfahren Sie mehr über Sammlungen und verwandte
  Konzepte.
---
<h1 id="Collection-Explained" class="common-anchor-header">Sammlung erklärt<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus können Sie mehrere Sammlungen erstellen, um Ihre Daten zu verwalten, und Ihre Daten als Entitäten in die Sammlungen einfügen. Sammlungen und Entitäten sind vergleichbar mit Tabellen und Datensätzen in relationalen Datenbanken. Diese Seite hilft Ihnen dabei, etwas über Sammlungen und verwandte Konzepte zu lernen.</p>
<h2 id="Collection" class="common-anchor-header">Sammlung<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine Sammlung ist eine zweidimensionale Tabelle mit festen Spalten und variablen Zeilen. Jede Spalte steht für ein Feld und jede Zeile für eine Entität.</p>
<p>Das folgende Diagramm zeigt eine Sammlung mit acht Spalten und sechs Entitäten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>Sammlung erklärt</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Schema und Felder<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Beschreibung eines Objekts werden in der Regel seine Attribute, wie Größe, Gewicht und Position, angegeben. Sie können diese Attribute als Felder in einer Sammlung verwenden. Jedes Feld hat verschiedene einschränkende Eigenschaften, wie z. B. den Datentyp und die Dimensionalität eines Vektorfeldes. Sie können ein Sammlungsschema erstellen, indem Sie die Felder anlegen und ihre Reihenfolge festlegen. Mögliche anwendbare Datentypen finden Sie unter <a href="/docs/de/schema.md">Schema erklärt</a>.</p>
<p>Sie sollten alle schema-definierten Felder in die einzufügenden Entitäten aufnehmen. Um einige von ihnen optional zu machen, sollten Sie dynamische Felder aktivieren. Einzelheiten finden Sie unter <a href="/docs/de/enable-dynamic-field.md">Dynamisches Feld</a>.</p>
<ul>
<li><p><strong>Löschen von Feldern oder Festlegen von Standardwerten</strong></p>
<p>Einzelheiten dazu, wie Sie ein Feld löschbar machen oder den Standardwert festlegen, finden Sie unter <a href="/docs/de/nullable-and-default.md">Löschbar &amp; Standard</a>.</p></li>
<li><p><strong>Dynamisches Feld aktivieren</strong></p>
<p>Einzelheiten zur Aktivierung und Verwendung des dynamischen Feldes finden Sie unter <a href="/docs/de/enable-dynamic-field.md">Dynamisches Feld</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Primärschlüssel und AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>Ähnlich wie das Primärfeld in einer relationalen Datenbank hat eine Sammlung ein Primärfeld, um eine Entität von anderen zu unterscheiden. Jeder Wert im Primärfeld ist global eindeutig und entspricht einer bestimmten Entität.</p>
<p>Wie im obigen Diagramm dargestellt, dient das Feld mit dem Namen <strong>id</strong> als Primärfeld, und die erste ID <strong>0</strong> entspricht einer Entität mit dem Titel <em>Die Sterblichkeitsrate des Coronavirus ist nicht wichtig</em>. Es wird keine andere Entität geben, die das Primärfeld 0 hat.</p>
<p>Ein Primärfeld kann nur ganze Zahlen oder Zeichenketten enthalten. Beim Einfügen von Entitäten sollten Sie die Werte des Primärfelds standardmäßig einschließen. Wenn Sie jedoch <strong>AutoId</strong> bei der Erstellung der Sammlung aktiviert haben, wird Milvus diese Werte beim Einfügen der Daten generieren. In einem solchen Fall sollten Sie die Werte des Primärfeldes aus den einzufügenden Entitäten ausschließen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/primary-field.md">Primärfeld &amp; AutoId</a>.</p>
<h2 id="Index" class="common-anchor-header">Index<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Erstellung von Indizes für bestimmte Felder verbessert die Sucheffizienz. Es wird empfohlen, Indizes für alle Felder zu erstellen, auf die Ihr Dienst angewiesen ist, wobei Indizes für Vektorfelder obligatorisch sind.</p>
<h2 id="Entity" class="common-anchor-header">Entität<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>Entitäten sind Datensätze, die in einer Sammlung denselben Satz von Feldern verwenden. Die Werte in allen Feldern der gleichen Zeile bilden eine Entität.</p>
<p>Sie können so viele Entitäten in eine Sammlung einfügen, wie Sie benötigen. Mit der Anzahl der Entitäten steigt jedoch auch die benötigte Speichergröße, was die Suchleistung beeinträchtigt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/schema.md">Schema erklärt</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">Laden und Freigeben<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Laden einer Sammlung ist die Voraussetzung für die Durchführung von Ähnlichkeitssuchen und Abfragen in Sammlungen. Wenn Sie eine Sammlung laden, lädt Milvus alle Indexdateien und die Rohdaten in jedem Feld in den Speicher, um schnell auf Suchen und Abfragen zu reagieren.</p>
<p>Suchvorgänge und Abfragen sind speicherintensive Operationen. Um Kosten zu sparen, sollten Sie die derzeit nicht genutzten Sammlungen freigeben.</p>
<p>Weitere Einzelheiten finden Sie unter <a href="/docs/de/load-and-release.md">Laden und Freigeben</a>.</p>
<h2 id="Search-and-Query" class="common-anchor-header">Suche und Abfrage<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Indizes erstellt und die Sammlung geladen haben, können Sie eine Ähnlichkeitssuche starten, indem Sie einen oder mehrere Abfragevektoren eingeben. Wenn Sie zum Beispiel die Vektordarstellung Ihrer Abfrage in einer Suchanfrage erhalten, verwendet Milvus den angegebenen Metrik-Typ, um die Ähnlichkeit zwischen dem Abfragevektor und den Vektoren in der Zielsammlung zu messen, bevor es diejenigen zurückgibt, die der Abfrage semantisch ähnlich sind.</p>
<p>Sie können auch Metadatenfilterung in Suchvorgänge und Abfragen integrieren, um die Relevanz der Ergebnisse zu verbessern. Beachten Sie, dass die Bedingungen für die Filterung von Metadaten in Abfragen obligatorisch, in Suchen jedoch optional sind.</p>
<p>Einzelheiten zu den anwendbaren Metrik-Typen finden Sie unter <a href="/docs/de/metric.md">Metrik-Typen</a>.</p>
<p>Weitere Informationen über Suchen und Abfragen finden Sie in den Artikeln des Kapitels Suchen &amp; Reranken, darunter die grundlegenden Funktionen:</p>
<ul>
<li><p><a href="/docs/de/single-vector-search.md">Grundlegende ANN-Suche</a></p></li>
<li><p><a href="/docs/de/filtered-search.md">Gefilterte Suche</a></p></li>
<li><p><a href="/docs/de/range-search.md">Bereichssuche</a></p></li>
<li><p><a href="/docs/de/grouping-search.md">Gruppierungssuche</a></p></li>
<li><p><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></p></li>
<li><p><a href="/docs/de/with-iterators.md">Such-Iterator</a></p></li>
<li><p><a href="/docs/de/get-and-scalar-query.md">Abfrage</a></p></li>
<li><p><a href="/docs/de/full-text-search.md">Volltextsuche</a></p></li>
<li><p><a href="/docs/de/keyword-match.md">Text-Abgleich</a></p></li>
</ul>
<p>Darüber hinaus bietet Milvus auch Erweiterungen zur Verbesserung der Suchleistung und -effizienz. Diese sind standardmäßig deaktiviert, und Sie können sie je nach Ihren Serviceanforderungen aktivieren und verwenden. Diese sind</p>
<ul>
<li><p><a href="/docs/de/use-partition-key.md">Partitionsschlüssel verwenden</a></p></li>
<li><p><a href="/docs/de/mmap.md">mmap verwenden</a></p></li>
<li><p><a href="/docs/de/clustering-compaction.md">Clustering Verdichtung</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">Partition<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Partitionen sind Teilmengen einer Sammlung, die denselben Feldsatz wie die übergeordnete Sammlung haben und jeweils eine Teilmenge von Entitäten enthalten.</p>
<p>Durch die Zuweisung von Entitäten in verschiedene Partitionen können Sie Entitätsgruppen erstellen. Sie können Suchen und Abfragen in bestimmten Partitionen durchführen, damit Milvus Entitäten in anderen Partitionen ignoriert und die Sucheffizienz verbessert.</p>
<p>Details finden Sie unter <a href="/docs/de/manage-partitions.md">Verwalten von Partitionen</a>.</p>
<h2 id="Shard" class="common-anchor-header">Scherben<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Shards sind horizontale Abschnitte einer Sammlung. Jeder Shard entspricht einem Dateneingabekanal. Jede Sammlung verfügt standardmäßig über einen Shard. Sie können die entsprechende Anzahl von Shards beim Erstellen einer Sammlung auf der Grundlage des erwarteten Durchsatzes und des Volumens der in die Sammlung einzufügenden Daten festlegen.</p>
<p>Einzelheiten zum Festlegen der Shard-Anzahl finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
<h2 id="Alias" class="common-anchor-header">Alias<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Aliasnamen für Ihre Sammlungen erstellen. Eine Sammlung kann mehrere Aliasnamen haben, aber Sammlungen können keinen Alias gemeinsam nutzen. Wenn eine Anfrage für eine Sammlung eingeht, sucht Milvus die Sammlung anhand des angegebenen Namens. Wenn die Sammlung mit dem angegebenen Namen nicht existiert, fährt Milvus mit der Suche nach dem angegebenen Namen als Alias fort. Sie können Sammlungs-Aliase verwenden, um Ihren Code an verschiedene Szenarien anzupassen.</p>
<p>Weitere Details finden Sie unter <a href="/docs/de/manage-aliases.md">Aliase verwalten</a>.</p>
<h2 id="Function" class="common-anchor-header">Funktion<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Funktionen für Milvus festlegen, um Felder bei der Erstellung der Sammlung abzuleiten. Die Volltextsuchfunktion verwendet beispielsweise die benutzerdefinierte Funktion, um ein Sparse-Vektor-Feld aus einem bestimmten Varchar-Feld abzuleiten. Weitere Informationen zur Volltextsuche finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Konsistenzebene<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Verteilte Datenbanksysteme verwenden in der Regel die Konsistenzstufe, um die Gleichheit der Daten über Datenknoten und Replikate hinweg zu definieren. Sie können separate Konsistenzstufen festlegen, wenn Sie eine Sammlung erstellen oder Ähnlichkeitssuchen innerhalb der Sammlung durchführen. Die anwendbaren Konsistenzstufen sind <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> und <strong>Eventually</strong>.</p>
<p>Einzelheiten zu diesen Konsistenzstufen finden Sie unter <a href="/docs/de/tune_consistency.md">Konsistenzstufe</a>.</p>
