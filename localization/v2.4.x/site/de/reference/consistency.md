---
id: consistency.md
summary: Erfahren Sie mehr über die vier Konsistenzstufen in Milvus.
title: Konsistenz
---
<h1 id="Consistency" class="common-anchor-header">Konsistenz<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema werden die vier Konsistenzstufen in Milvus und die dafür am besten geeigneten Szenarien vorgestellt. Der Mechanismus zur Gewährleistung der Konsistenz in Milvus wird ebenfalls in diesem Thema behandelt.</p>
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
    </button></h2><p>Konsistenz in einer verteilten Datenbank bezieht sich speziell auf die Eigenschaft, die sicherstellt, dass jeder Knoten oder jede Replik dieselbe Sicht auf die Daten hat, wenn sie zu einem bestimmten Zeitpunkt Daten schreiben oder lesen.</p>
<p>Milvus unterstützt vier Konsistenzstufen: strong, bounded staleness, session und eventually. Die Standardkonsistenzstufe in Milvus ist "bounded staleness".  Sie können die Konsistenzstufe bei der Durchführung einer <a href="/docs/de/v2.4.x/single-vector-search.md">Einzelvektorsuche</a>, einer <a href="/docs/de/v2.4.x/multi-vector-search.md">hybriden Suche</a> oder einer <a href="/docs/de/v2.4.x/get-and-scalar-query.md">Abfrage</a> leicht anpassen, um sie optimal auf Ihre Anwendung abzustimmen.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Konsistenzstufen<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>Wie im <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC-Theorem</a> definiert, muss eine verteilte Datenbank einen Kompromiss zwischen Konsistenz, Verfügbarkeit und Latenzzeit eingehen. Eine hohe Konsistenz bedeutet eine hohe Genauigkeit, aber auch eine hohe Suchlatenz, während eine niedrige Konsistenz zu einer schnellen Suchgeschwindigkeit, aber einem gewissen Verlust an Datentransparenz führt. Daher eignen sich verschiedene Konsistenzniveaus für verschiedene Szenarien.</p>
<p>Im Folgenden werden die Unterschiede zwischen den vier von Milvus unterstützten Konsistenzstufen und den jeweiligen Szenarien erläutert.</p>
<h3 id="Strong" class="common-anchor-header">Stark</h3><p>Strong ist die höchste und strengste Konsistenzstufe. Sie stellt sicher, dass die Benutzer die neueste Version der Daten lesen können.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>Starke Konsistenz</span> </span></p>
<p>Das PACELC-Theorem besagt, dass sich die Latenzzeit erhöht, wenn die Konsistenzstufe auf Strong eingestellt wird. Daher empfehlen wir, bei Funktionstests starke Konsistenz zu wählen, um die Genauigkeit der Testergebnisse zu gewährleisten. Starke Konsistenz eignet sich auch am besten für Anwendungen, die strenge Anforderungen an die Datenkonsistenz auf Kosten der Suchgeschwindigkeit stellen. Ein Beispiel hierfür ist ein Online-Finanzsystem, das sich mit der Bezahlung von Bestellungen und der Rechnungsstellung befasst.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Begrenzte Unbeständigkeit</h3><p>Bounded Staleness lässt, wie der Name schon sagt, Dateninkonsistenz während eines bestimmten Zeitraums zu. In der Regel sind die Daten jedoch außerhalb dieses Zeitraums immer global konsistent.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>Konsistenz von Bounded Staleness</span> </span></p>
<p>Bounded Staleness eignet sich für Szenarien, in denen die Suchlatenz kontrolliert werden muss und sporadische Unsichtbarkeit der Daten akzeptiert werden kann. In Empfehlungssystemen wie Videoempfehlungsmaschinen hat die Unsichtbarkeit von Daten manchmal nur geringe Auswirkungen auf die Gesamtauffindungsrate, kann aber die Leistung des Empfehlungssystems erheblich steigern.</p>
<h3 id="Session" class="common-anchor-header">Sitzung</h3><p>Session stellt sicher, dass alle Daten, die geschrieben werden, sofort in der gleichen Sitzung gelesen werden können. Mit anderen Worten: Wenn Sie Daten über einen Client schreiben, werden die neu eingefügten Daten sofort durchsuchbar.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>Session-Konsistenz</span> </span></p>
<p>Wir empfehlen die Wahl von Session als Konsistenzebene für Szenarien, in denen die Anforderung an die Datenkonsistenz in derselben Session hoch ist. Ein Beispiel ist das Löschen der Daten eines Bucheintrags aus dem Bibliothekssystem. Nach der Bestätigung der Löschung und dem Auffrischen der Seite (einer anderen Sitzung) sollte das Buch nicht mehr in den Suchergebnissen erscheinen.</p>
<h3 id="Eventually" class="common-anchor-header">Eventuell</h3><p>Es gibt keine garantierte Reihenfolge der Lese- und Schreibvorgänge, und die Replikate konvergieren schließlich zum gleichen Zustand, wenn keine weiteren Schreibvorgänge durchgeführt werden. Bei der Konsistenzstufe &quot;eventually&quot; beginnen die Replikate bei Leseanforderungen mit den zuletzt aktualisierten Werten zu arbeiten. Eventuell konsistent ist die schwächste der vier Stufen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>Eventuelle Konsistenz</span> </span></p>
<p>Nach dem PACELC-Theorem kann die Suchlatenz jedoch enorm verkürzt werden, wenn die Konsistenz geopfert wird. Daher eignet sich die Stufe "Eventuell konsistent" am besten für Szenarien, die keine hohen Anforderungen an die Datenkonsistenz stellen, aber eine blitzschnelle Suchleistung erfordern. Ein Beispiel hierfür ist das Abrufen von Rezensionen und Bewertungen von Amazon-Produkten mit der Stufe "eventually consistent".</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Garantierter Zeitstempel<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus realisiert verschiedene Konsistenzstufen durch die Einführung des <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Guarantee Timestamp</a> (GuaranteeTs).</p>
<p>Ein GuaranteeTs dient dazu, den Abfrageknoten mitzuteilen, dass eine Such- oder Abfrageanfrage erst dann durchgeführt wird, wenn alle Daten vor dem GuaranteeTs von den Abfrageknoten gesehen werden können. Wenn Sie die Konsistenzstufe angeben, wird die Konsistenzstufe auf einen bestimmten GuaranteeTs-Wert abgebildet. Verschiedene GuaranteeTs-Werte entsprechen verschiedenen Konsistenzstufen:</p>
<ul>
<li><p><strong>Stark</strong>: GuaranteeTs wird als identisch mit dem neuesten Systemzeitstempel festgelegt, und Abfrageknoten warten, bis alle Daten vor dem neuesten Systemzeitstempel zu sehen sind, bevor sie die Such- oder Abfrageanfrage bearbeiten.</p></li>
<li><p><strong>Begrenzte Staleness</strong>: GuaranteeTs wird relativ kleiner als der neueste Systemzeitstempel gesetzt, und Abfrageknoten suchen auf einer tolerierbaren, weniger aktuellen Datenansicht.</p></li>
<li><p><strong>Sitzung</strong>: Der Client verwendet den Zeitstempel des letzten Schreibvorgangs als GuaranteeTs, so dass jeder Client zumindest die vom selben Client eingefügten Daten abrufen kann.</p></li>
<li><p><strong>Eventuell</strong>: GuaranteeTs wird auf einen sehr kleinen Wert gesetzt, um die Konsistenzprüfung zu überspringen. Abfrageknoten suchen sofort in der vorhandenen Datenansicht.</p></li>
</ul>
<p>Unter <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Funktionsweise von GuaranteeTs</a> finden Sie weitere Informationen über den Mechanismus zur Gewährleistung verschiedener Konsistenzstufen in Milvus.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie, wie Sie die Konsistenzstufe einstellen können, wenn:<ul>
<li><a href="/docs/de/v2.4.x/single-vector-search.md">eine Ein-Vektor-Suche durchführen</a></li>
<li><a href="/docs/de/v2.4.x/multi-vector-search.md">eine hybride Suche durchführen</a></li>
<li><a href="/docs/de/v2.4.x/get-and-scalar-query.md">eine skalare Abfrage durchführen</a></li>
</ul></li>
</ul>
