---
id: manage-collections.md
title: Erläuterung zu Sammlungen
summary: >-
  In Milvus können Sie mehrere Sammlungen erstellen, um Ihre Daten zu verwalten,
  und Ihre Daten als Entitäten in die Sammlungen einfügen. Sammlungen und
  Entitäten entsprechen in etwa den Tabellen und Datensätzen in relationalen
  Datenbanken. Auf dieser Seite erfahren Sie mehr über Sammlungen und die damit
  verbundenen Konzepte.
---
<h1 id="Collection-Explained" class="common-anchor-header">Erläuterung zu Sammlungen<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus können Sie mehrere Sammlungen erstellen, um Ihre Daten zu verwalten, und Ihre Daten als Entitäten in die Sammlungen einfügen. Sammlungen und Entitäten entsprechen in etwa den Tabellen und Datensätzen in relationalen Datenbanken. Auf dieser Seite erfahren Sie mehr über Sammlungen und die damit verbundenen Konzepte.</p>
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
    </button></h2><p>Eine Sammlung ist eine zweidimensionale Tabelle mit festen Spalten und variablen Zeilen. Jede Spalte steht für ein Feld, und jede Zeile steht für eine Entität.</p>
<p>Die folgende Tabelle zeigt eine Sammlung mit acht Spalten und sechs Entitäten.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>Erläuterung der Sammlung</span>
  
 </span></p>
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
    </button></h2><p>Bei der Beschreibung eines Objekts werden üblicherweise dessen Attribute wie Größe, Gewicht und Position genannt. Diese Attribute können als Felder in einer Sammlung verwendet werden. Jedes Feld weist verschiedene einschränkende Eigenschaften auf, wie beispielsweise den Datentyp und die Dimensionalität eines Vektorfeldes. Ein Sammlungsschema lässt sich erstellen, indem die Felder angelegt und deren Reihenfolge festgelegt werden. Informationen zu möglichen Datentypen finden Sie unter <a href="/docs/de/schema.md">„Schema erklärt</a>“.</p>
<p>Sie sollten alle im Schema definierten Felder in die einzufügenden Entitäten aufnehmen. Um einige davon optional zu machen, sollten Sie die Aktivierung des dynamischen Feldes in Betracht ziehen. Weitere Informationen finden Sie unter <a href="/docs/de/enable-dynamic-field.md">„Dynamisches Feld</a>“.</p>
<ul>
<li><p><strong>Felder als nullfähig festlegen oder Standardwerte festlegen</strong></p>
<p>Einzelheiten dazu, wie Sie ein Feld nullfähig machen oder einen Standardwert festlegen, finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullfähig &amp; Standardwert</a>“.</p></li>
<li><p><strong>Dynamisches Feld aktivieren</strong></p>
<p>Einzelheiten zur Aktivierung und Verwendung des dynamischen Feldes finden Sie unter <a href="/docs/de/enable-dynamic-field.md">„Dynamisches Feld</a>“.</p></li>
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
    </button></h2><p>Ähnlich wie das Primärfeld in einer relationalen Datenbank verfügt eine Sammlung über ein Primärfeld, um eine Entität von anderen zu unterscheiden. Jeder Wert im Primärfeld ist global eindeutig und entspricht einer bestimmten Entität.</p>
<p>Wie in der obigen Tabelle dargestellt, dient das Feld <strong>„id“</strong> als Primärfeld, und die erste ID <strong>0</strong> entspricht einer Entität mit dem Titel <em>„The Mortality Rate of Coronavirus is Not Important</em>“. Es wird keine andere Entität geben, deren Primärfeld den Wert 0 hat.</p>
<p>Ein Primärfeld akzeptiert nur Ganzzahlen oder Zeichenfolgen. Beim Einfügen von Entitäten sollten Sie die Werte des Primärfelds standardmäßig angeben. Wenn Sie jedoch bei der Erstellung der Sammlung <strong>„AutoId“</strong> aktiviert haben, generiert Milvus diese Werte beim Einfügen der Daten. In diesem Fall sollten Sie die Werte des Primärfelds aus den einzufügenden Entitäten weglassen.</p>
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
    </button></h2><p>Das Anlegen von Indizes für bestimmte Felder verbessert die Sucheffizienz. Es wird empfohlen, Indizes für alle Felder anzulegen, auf die Ihr Dienst angewiesen ist; dabei sind Indizes für Vektorfelder zwingend erforderlich.</p>
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
    </button></h2><p>Entitäten sind Datensätze, die denselben Satz von Feldern in einer Sammlung gemeinsam haben. Die Werte in allen Feldern derselben Zeile bilden eine Entität.</p>
<p>Sie können so viele Entitäten in eine Sammlung einfügen, wie Sie benötigen. Mit steigender Anzahl von Entitäten nimmt jedoch auch der Speicherbedarf zu, was sich auf die Suchleistung auswirkt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/schema.md">„Schema erklärt</a>“.</p>
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
    </button></h2><p>Das Laden einer Sammlung ist die Voraussetzung für die Durchführung von Ähnlichkeitssuchen und Abfragen in Sammlungen. Wenn Sie eine Sammlung laden, lädt Milvus alle Indexdateien und die Rohdaten in jedem Feld in den Arbeitsspeicher, um eine schnelle Reaktion auf Suchanfragen und Abfragen zu gewährleisten.</p>
<p>Suchvorgänge und Abfragen sind speicherintensive Vorgänge. Um Ressourcen zu schonen, wird empfohlen, derzeit nicht verwendete Sammlungen freizugeben.</p>
<p>Weitere Details finden Sie unter <a href="/docs/de/load-and-release.md">„Laden und Freigeben</a>“.</p>
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
    </button></h2><p>Sobald Sie Indizes erstellt und die Sammlung geladen haben, können Sie eine Ähnlichkeitssuche starten, indem Sie einen oder mehrere Abfragevektoren eingeben. Wenn Milvus beispielsweise die Vektordarstellung Ihrer Abfrage in einer Suchanfrage erhält, verwendet es den angegebenen Metriktyp, um die Ähnlichkeit zwischen dem Abfragevektor und den Vektoren in der Zielsammlung zu messen, bevor es diejenigen zurückgibt, die semantisch der Abfrage ähnlich sind.</p>
<p>Sie können auch Metadatenfilterung in Suchvorgänge und Abfragen einbeziehen, um die Relevanz der Ergebnisse zu verbessern. Beachten Sie, dass Metadatenfilterbedingungen in Abfragen obligatorisch, in Suchvorgängen jedoch optional sind.</p>
<p>Einzelheiten zu den anwendbaren Metriktypen finden Sie unter <a href="/docs/de/metric.md">„Metriktypen</a>“.</p>
<p>Weitere Informationen zu Suchvorgängen und Abfragen finden Sie in den Artikeln im Kapitel „Suche und Neurangierung“, zu deren grundlegenden Funktionen unter anderem gehören:</p>
<ul>
<li><p><a href="/docs/de/single-vector-search.md">Grundlegende ANN-Suche</a></p></li>
<li><p><a href="/docs/de/filtered-search.md">Gefilterte Suche</a></p></li>
<li><p><a href="/docs/de/range-search.md">Bereichssuche</a></p></li>
<li><p><a href="/docs/de/grouping-search.md">Gruppierte Suche</a></p></li>
<li><p><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></p></li>
<li><p><a href="/docs/de/with-iterators.md">Such-Iterator</a></p></li>
<li><p><a href="/docs/de/get-and-scalar-query.md">Abfrage</a></p></li>
<li><p><a href="/docs/de/full-text-search.md">Volltextsuche</a></p></li>
<li><p><a href="/docs/de/keyword-match.md">Textübereinstimmung</a></p></li>
</ul>
<p>Darüber hinaus bietet Milvus auch Erweiterungen zur Verbesserung der Suchleistung und -effizienz. Diese sind standardmäßig deaktiviert, und Sie können sie je nach Ihren Serviceanforderungen aktivieren und nutzen. Es handelt sich dabei um</p>
<ul>
<li><p><a href="/docs/de/use-partition-key.md">Partitionsschlüssel verwenden</a></p></li>
<li><p><a href="/docs/de/mmap.md">mmap verwenden</a></p></li>
<li><p><a href="/docs/de/clustering-compaction.md">Clustering-Kompaktierung</a></p></li>
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
    </button></h2><p>Partitionen sind Teilmengen einer Sammlung, die denselben Feldsatz wie ihre übergeordnete Sammlung teilen und jeweils eine Teilmenge von Entitäten enthalten.</p>
<p>Durch die Zuordnung von Entitäten zu verschiedenen Partitionen können Sie Entitätsgruppen bilden. Sie können Suchvorgänge und Abfragen in bestimmten Partitionen durchführen, damit Milvus Entitäten in anderen Partitionen ignoriert und so die Sucheffizienz verbessert.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-partitions.md">„Partitionen verwalten</a>“.</p>
<h2 id="Shard" class="common-anchor-header">Shard<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Shards sind horizontale Abschnitte einer Sammlung. Jeder Shard entspricht einem Dateneingangskanal. Jede Sammlung verfügt standardmäßig über einen Shard. Sie können beim Erstellen einer Sammlung die geeignete Anzahl von Shards festlegen, basierend auf dem erwarteten Durchsatz und dem Volumen der in die Sammlung einzufügenden Daten.</p>
<p>Weitere Informationen zum Festlegen der Shard-Anzahl finden Sie unter <a href="/docs/de/create-collection.md">„Sammlung erstellen</a>“.</p>
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
    </button></h2><p>Sie können Aliase für Ihre Sammlungen erstellen. Eine Sammlung kann mehrere Aliase haben, Sammlungen können sich jedoch keinen Alias teilen. Beim Empfang einer Anfrage an eine Sammlung ermittelt Milvus die Sammlung anhand des angegebenen Namens. Wenn die Sammlung mit dem angegebenen Namen nicht existiert, sucht Milvus den angegebenen Namen als Alias weiter. Sie können Sammlungsaliase verwenden, um Ihren Code an verschiedene Szenarien anzupassen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-aliases.md">„Aliase verwalten</a>“.</p>
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
    </button></h2><p>Sie können Funktionen festlegen, mit denen Milvus bei der Erstellung einer Sammlung Felder ableitet. Beispielsweise verwendet die Volltextsuche eine benutzerdefinierte Funktion, um aus einem bestimmten „varchar“-Feld ein Sparse-Vektor-Feld abzuleiten. Weitere Informationen zur Volltextsuche finden Sie unter <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Konsistenzstufe<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Verteilte Datenbanksysteme verwenden in der Regel die Konsistenzstufe, um die Datenübereinstimmung zwischen Datenknoten und Replikaten zu definieren. Sie können separate Konsistenzstufen festlegen, wenn Sie eine Sammlung erstellen oder Ähnlichkeitssuchen innerhalb der Sammlung durchführen. Die verfügbaren Konsistenzstufen sind <strong>„Strong“</strong>, <strong>„Bounded Staleness“</strong>, <strong>„Session“</strong> und <strong>„Eventually</strong>“.</p>
<p>Einzelheiten zu diesen Konsistenzstufen finden Sie unter <a href="/docs/de/tune_consistency.md">„Konsistenzstufe</a>“.</p>
