---
id: performance_faq.md
summary: >-
  Hier finden Sie Antworten auf häufig gestellte Fragen zur Suchleistung, zu
  Leistungsverbesserungen und zu anderen leistungsbezogenen Themen.
title: Häufig gestellte Fragen zur Leistung
---
<h1 id="Performance-FAQ" class="common-anchor-header">Häufig gestellte Fragen zur Leistung<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Wie werden „ <code translate="no">nlist</code> “ und „ <code translate="no">nprobe</code> “ für IVF-Indizes eingestellt?</h4><p>Die Einstellung von „ <code translate="no">nlist</code> “ ist szenariospezifisch. Als Faustregel gilt, dass der empfohlene Wert für „ <code translate="no">nlist</code> “ <code translate="no">4 × sqrt(n)</code> lautet, wobei <code translate="no">n</code> die Gesamtzahl der Entitäten in einem Segment ist.</p>
<p>Die Größe jedes Segments wird durch den Parameter „ <code translate="no">datacoord.segment.maxSize</code> “ bestimmt, der standardmäßig auf 1024 MB eingestellt ist. Die Gesamtzahl der Entitäten in einem Segment n lässt sich schätzen, indem man „ <code translate="no">datacoord.segment.maxSize</code> “ durch die Größe jeder Entität dividiert.</p>
<p>Die Einstellung von „ <code translate="no">nprobe</code> “ ist datensatz- und szenariospezifisch und erfordert einen Kompromiss zwischen Genauigkeit und Abfrageleistung. Wir empfehlen, den idealen Wert durch wiederholte Experimente zu ermitteln.</p>
<p>Die folgenden Diagramme zeigen die Ergebnisse eines Tests mit dem Datensatz „sift50m“ und dem Index „IVF_SQ8“, in dem die Recall-Rate und die Abfrageleistung verschiedener Kombinationen aus „ <code translate="no">nlist</code> “ und „<code translate="no">nprobe</code> “ verglichen werden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>Genauigkeitstest</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   Leistungstest</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Warum dauern Abfragen bei kleineren Datensätzen manchmal länger?</h4><p>Abfragen werden auf Segmenten durchgeführt. Indizes reduzieren die Zeit, die für die Abfrage eines Segments benötigt wird. Wenn ein Segment nicht indiziert wurde, greift Milvus auf eine Brute-Force-Suche in den Rohdaten zurück – was die Abfragezeit drastisch erhöht.</p>
<p>Daher dauert die Abfrage bei einem kleinen Datensatz (einer Sammlung) in der Regel länger, da noch kein Index erstellt wurde. Dies liegt daran, dass die Größe der Segmente den in ` <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>` festgelegten Schwellenwert für die Indexerstellung noch nicht erreicht hat. Rufen Sie ` <code translate="no">create_index()</code> ` auf, um Milvus zu zwingen, Segmente zu indizieren, die den Schwellenwert erreicht haben, aber noch nicht automatisch indiziert wurden. Dadurch wird die Abfrageleistung erheblich verbessert.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Welche Faktoren beeinflussen die CPU-Auslastung?</h4><p>Die CPU-Auslastung steigt, wenn Milvus Indizes erstellt oder Abfragen ausführt. Im Allgemeinen ist die Indexerstellung rechenintensiv, außer bei Verwendung von Annoy, das auf einem einzigen Thread läuft.</p>
<p>Bei der Ausführung von Abfragen wird die CPU-Auslastung von den Werten „ <code translate="no">nq</code> “ und „ <code translate="no">nprobe</code> “ beeinflusst. Wenn „ <code translate="no">nq</code> “ und „ <code translate="no">nprobe</code> “ klein sind, ist die Parallelität gering und die CPU-Auslastung bleibt niedrig.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Beeinträchtigt das gleichzeitige Einfügen von Daten und die Suche die Abfrageleistung?</h4><p>Einfügevorgänge sind nicht CPU-intensiv. Da neue Segmente jedoch möglicherweise den Schwellenwert für die Indexerstellung noch nicht erreicht haben, greift Milvus auf eine Brute-Force-Suche zurück – was die Abfrageleistung erheblich beeinträchtigt.</p>
<p>Der Parameter „ <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> “ legt den Schwellenwert für die Indexerstellung eines Segments fest und ist standardmäßig auf 1024 Zeilen eingestellt. Weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/system_configuration.md">„Systemkonfiguration</a> “.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Kann die Indizierung eines VARCHAR-Feldes die Löschgeschwindigkeit verbessern?</h4><p>Die Indizierung eines VARCHAR-Feldes kann „Delete By Expression“-Operationen beschleunigen, jedoch nur unter bestimmten Bedingungen:</p>
<ul>
<li><strong>INVERTED-Index</strong>: Dieser Index hilft bei „ <code translate="no">IN</code> “- oder „ <code translate="no">==</code> “-Ausdrücken auf VARCHAR-Feldern, die keine Primärschlüssel sind.</li>
<li><strong>Trie-Index</strong>: Dieser Index unterstützt Präfixabfragen (z. B. „ <code translate="no">LIKE prefix%</code> “) auf VARCHAR-Feldern, die keine Primärschlüssel sind.</li>
</ul>
<p>Die Indizierung eines VARCHAR-Feldes beschleunigt jedoch nicht:</p>
<ul>
<li><strong>Löschen nach IDs</strong>: Wenn das VARCHAR-Feld der Primärschlüssel ist.</li>
<li><strong>Nicht relevante Ausdrücke</strong>: Wenn das VARCHAR-Feld nicht Teil des Löschausdrucks ist.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Haben Sie noch Fragen?</h4><p>Dann können Sie:</p>
<ul>
<li>Schauen Sie sich <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> auf GitHub an. Stellen Sie gerne Fragen, teilen Sie Ideen und helfen Sie anderen.</li>
<li>Treten Sie unserem <a href="https://discord.com/invite/8uyFbECzPX">Discord-Kanal</a> bei, um Unterstützung zu erhalten und sich mit unserer Open-Source-Community auszutauschen.</li>
</ul>
