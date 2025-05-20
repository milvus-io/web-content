---
id: performance_faq.md
summary: >-
  Hier finden Sie Antworten auf häufig gestellte Fragen zur Suchleistung, zu
  Leistungsverbesserungen und zu anderen leistungsbezogenen Themen.
title: Leistung FAQ
---
<h1 id="Performance-FAQ" class="common-anchor-header">Leistung FAQ<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Wie stellt man <code translate="no">nlist</code> und <code translate="no">nprobe</code> für IVF-Indizes ein?</h4><p>Die Einstellung von <code translate="no">nlist</code> ist szenariospezifisch. Als Faustregel gilt, dass der empfohlene Wert von <code translate="no">nlist</code> <code translate="no">4 × sqrt(n)</code> ist, wobei <code translate="no">n</code> die Gesamtzahl der Entitäten in einem Segment ist.</p>
<p>Die Größe der einzelnen Segmente wird durch den Parameter <code translate="no">datacoord.segment.maxSize</code> bestimmt, der standardmäßig auf 512 MB eingestellt ist. Die Gesamtzahl der Entitäten in einem Segment n kann geschätzt werden, indem <code translate="no">datacoord.segment.maxSize</code> durch die Größe der einzelnen Entitäten dividiert wird.</p>
<p>Die Einstellung von <code translate="no">nprobe</code> ist spezifisch für den Datensatz und das Szenario und beinhaltet einen Kompromiss zwischen Genauigkeit und Abfrageleistung. Wir empfehlen, den idealen Wert durch wiederholtes Experimentieren zu finden.</p>
<p>Die folgenden Diagramme zeigen die Ergebnisse eines Tests, der mit dem sift50m-Datensatz und dem IVF_SQ8-Index durchgeführt wurde und bei dem die Abruf- und Abfrageleistung verschiedener <code translate="no">nlist</code>/<code translate="no">nprobe</code> -Paare verglichen wurde.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Genauigkeits-Test</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Leistungs-Test</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Warum dauern Abfragen auf kleineren Datensätzen manchmal länger?</h4><p>Abfrageoperationen werden auf Segmenten durchgeführt. Indizes verringern die Zeit, die für die Abfrage eines Segments benötigt wird. Wenn ein Segment nicht indiziert wurde, greift Milvus auf eine Brute-Force-Suche in den Rohdaten zurück, was die Abfragezeit drastisch erhöht.</p>
<p>Daher dauert die Abfrage eines kleinen Datensatzes (einer Sammlung) in der Regel länger, da kein Index erstellt wurde. Der Grund dafür ist, dass die Größe der Segmente nicht den von <code translate="no">rootCoord.minSegmentSizeToEnableindex</code> festgelegten Schwellenwert für die Indexerstellung erreicht hat. Rufen Sie <code translate="no">create_index()</code> auf, um Milvus zu zwingen, Segmente zu indizieren, die den Schwellenwert erreicht haben, aber noch nicht automatisch indiziert wurden, was die Abfrageleistung erheblich verbessert.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Welche Faktoren beeinflussen die CPU-Auslastung?</h4><p>Die CPU-Auslastung steigt, wenn Milvus Indizes aufbaut oder Abfragen ausführt. Im Allgemeinen ist die Indexerstellung CPU-intensiv, außer bei Verwendung von Annoy, das auf einem einzigen Thread läuft.</p>
<p>Bei der Ausführung von Abfragen wird die CPU-Auslastung durch <code translate="no">nq</code> und <code translate="no">nprobe</code> beeinflusst. Wenn <code translate="no">nq</code> und <code translate="no">nprobe</code> klein sind, ist die Gleichzeitigkeit gering und die CPU-Auslastung bleibt niedrig.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Wirkt sich das gleichzeitige Einfügen von Daten und Suchen auf die Abfrageleistung aus?</h4><p>Einfügevorgänge sind nicht CPU-intensiv. Da jedoch neue Segmente möglicherweise noch nicht den Schwellenwert für den Indexaufbau erreicht haben, greift Milvus auf die Brute-Force-Suche zurück, was die Abfrageleistung erheblich beeinträchtigt.</p>
<p>Der Parameter <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> bestimmt den Schwellenwert für die Indexerstellung für ein Segment und ist standardmäßig auf 1024 Zeilen eingestellt. Siehe <a href="/docs/de/v2.4.x/system_configuration.md">Systemkonfiguration</a> für weitere Informationen.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">Wird der Speicherplatz nach dem Löschen von Daten in Milvus sofort wieder freigegeben?</h4><p>Nein, der Speicherplatz wird nicht sofort freigegeben, wenn Sie Daten in Milvus löschen. Obwohl das Löschen von Daten Entitäten als "logisch gelöscht" kennzeichnet, wird der tatsächliche Speicherplatz möglicherweise nicht sofort freigegeben. Dies ist der Grund:</p>
<ul>
<li><strong>Verdichtung</strong>: Milvus komprimiert Daten automatisch im Hintergrund. Bei diesem Prozess werden kleinere Datensegmente zu größeren zusammengeführt und logisch gelöschte Daten (zum Löschen markierte Entitäten) oder Daten, die ihre Time-To-Live (TTL) überschritten haben, entfernt. Bei der Verdichtung werden jedoch neue Segmente erstellt, während alte als "fallengelassen" markiert werden.</li>
<li><strong>Garbage Collection</strong>: Ein separater Prozess namens Garbage Collection (GC) entfernt diese "Dropped"-Segmente in regelmäßigen Abständen und gibt den von ihnen belegten Speicherplatz wieder frei. Dies gewährleistet eine effiziente Nutzung des Speichers, kann aber zu einer leichten Verzögerung zwischen dem Löschen und der Wiedergewinnung von Speicherplatz führen.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">Kann ich eingefügte, gelöschte oder hochgeladene Daten sofort nach dem Vorgang sehen, ohne auf einen Flush zu warten?</h4><p>Ja, in Milvus ist die Datentransparenz aufgrund der Disaggregationsarchitektur von Storage und Compute nicht direkt an Flush-Vorgänge gebunden. Sie können die Lesbarkeit der Daten über Konsistenzstufen verwalten.</p>
<p>Bei der Auswahl einer Konsistenzstufe sollten Sie die Kompromisse zwischen Konsistenz und Leistung berücksichtigen. Für Vorgänge, die eine sofortige Sichtbarkeit erfordern, sollten Sie eine "starke" Konsistenzstufe verwenden. Für schnellere Schreibvorgänge sollten Sie eine schwächere Konsistenz bevorzugen (die Daten sind möglicherweise nicht sofort sichtbar). Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/consistency.md">Konsistenz</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Kann die Indizierung eines VARCHAR-Feldes die Löschgeschwindigkeit verbessern?</h4><p>Die Indizierung eines VARCHAR-Feldes kann die "Delete By Expression"-Operationen beschleunigen, aber nur unter bestimmten Bedingungen:</p>
<ul>
<li><strong>INVERTED Index</strong>: Dieser Index hilft bei <code translate="no">IN</code> oder <code translate="no">==</code> Ausdrücken auf VARCHAR-Feldern mit nicht primären Schlüsseln.</li>
<li><strong>Trie-Index</strong>: Dieser Index hilft bei Präfix-Abfragen (z.B. <code translate="no">LIKE prefix%</code>) auf nicht-primären VARCHAR-Feldern.</li>
</ul>
<p>Die Indizierung eines VARCHAR-Feldes führt jedoch nicht zu einer Beschleunigung:</p>
<ul>
<li><strong>Löschen nach IDs</strong>: Wenn das VARCHAR-Feld der Primärschlüssel ist.</li>
<li><strong>Unverbundene Ausdrücke</strong>: Wenn das VARCHAR-Feld nicht Teil des Löschausdrucks ist.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Haben Sie noch Fragen?</h4><p>Sie können:</p>
<ul>
<li>Schauen Sie sich <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> auf GitHub an. Sie können Fragen stellen, Ideen austauschen und anderen helfen.</li>
<li>Treten Sie unserem <a href="https://discord.com/invite/8uyFbECzPX">Discord-Server</a> bei, um Unterstützung zu erhalten und sich mit unserer Open-Source-Community auszutauschen.</li>
</ul>
