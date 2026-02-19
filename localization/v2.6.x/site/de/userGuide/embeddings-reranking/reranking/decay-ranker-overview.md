---
id: decay-ranker-overview.md
title: Decay Ranker ÜberblickCompatible with Milvus 2.6.x
summary: >-
  Bei der herkömmlichen Vektorsuche werden die Ergebnisse ausschließlich nach
  der Vektorähnlichkeit eingestuft, d. h. danach, wie gut die Vektoren im
  mathematischen Raum übereinstimmen. In realen Anwendungen hängt die wirkliche
  Relevanz von Inhalten jedoch oft von mehr als nur semantischer Ähnlichkeit ab.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Decay Ranker Überblick<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Bei der herkömmlichen Vektorsuche werden die Ergebnisse ausschließlich nach der Vektorähnlichkeit eingestuft, d. h. danach, wie gut die Vektoren im mathematischen Raum übereinstimmen. In realen Anwendungen hängt die tatsächliche Relevanz von Inhalten jedoch oft von mehr als nur semantischer Ähnlichkeit ab.</p>
<p>Betrachten Sie diese alltäglichen Szenarien:</p>
<ul>
<li><p>Eine Nachrichtensuche, bei der der Artikel von gestern höher bewertet werden sollte als ein ähnlicher Artikel von vor drei Jahren</p></li>
<li><p>Ein Restaurantfinder, der Lokale in 5 Minuten Entfernung gegenüber solchen bevorzugt, die eine 30-minütige Fahrt erfordern</p></li>
<li><p>Eine E-Commerce-Plattform, die trendige Produkte anpreist, auch wenn sie der Suchanfrage weniger ähnlich sind</p></li>
</ul>
<p>Alle diese Szenarien haben eine gemeinsame Anforderung: Abwägung der Vektorähnlichkeit mit anderen numerischen Faktoren wie Zeit, Entfernung oder Popularität.</p>
<p>Die Decay Ranker in Milvus gehen auf dieses Bedürfnis ein, indem sie Suchrankings basierend auf numerischen Feldwerten anpassen. Sie ermöglichen es Ihnen, die Vektorähnlichkeit mit "Frische", "Nähe" oder anderen numerischen Eigenschaften Ihrer Daten auszugleichen und so intuitivere und kontextbezogene Sucherlebnisse zu schaffen.</p>
<h2 id="Usage-notes" class="common-anchor-header">Hinweise zur Verwendung<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>Das Decay-Ranking kann nicht mit Gruppierungssuchen verwendet werden.</p></li>
<li><p>Das für das Verfallsranking verwendete Feld muss numerisch sein (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> oder <code translate="no">DOUBLE</code>).</p></li>
<li><p>Jeder Decay Ranker kann nur ein numerisches Feld verwenden.</p></li>
<li><p><strong>Konsistenz der Zeiteinheit</strong>: Wenn Sie ein zeitbasiertes Zerfallsranking verwenden, müssen die Einheiten für die Parameter <code translate="no">origin</code>, <code translate="no">scale</code> und <code translate="no">offset</code> mit den in Ihren Sammlungsdaten verwendeten Einheiten übereinstimmen:</p>
<ul>
<li><p>Wenn Ihre Sammlung Zeitstempel in <strong>Sekunden</strong> speichert, verwenden Sie Sekunden für alle Parameter</p></li>
<li><p>Wenn Ihre Sammlung Zeitstempel in <strong>Millisekunden</strong> speichert, verwenden Sie Millisekunden für alle Parameter</p></li>
<li><p>Wenn Ihre Sammlung Zeitstempel in <strong>Mikrosekunden</strong> speichert, verwenden Sie für alle Parameter Mikrosekunden.</p></li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Wie funktioniert das?<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Decay-Ranking erweitert die traditionelle Vektorsuche, indem es numerische Faktoren wie Zeit oder geografische Entfernung in den Ranking-Prozess einbezieht. Der gesamte Prozess verläuft in den folgenden Phasen:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Stufe 1: Berechnung der normalisierten Ähnlichkeitswerte<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Zunächst berechnet und normalisiert Milvus die Ähnlichkeitswerte der Vektoren, um einen einheitlichen Vergleich zu gewährleisten:</p>
<ul>
<li><p>Für <strong>L2</strong> und <strong>JACCARD</strong> Distanzmetriken (wobei niedrigere Werte eine höhere Ähnlichkeit anzeigen):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Hier werden die Abstände in Ähnlichkeitswerte zwischen 0 und 1 umgewandelt, wobei ein höherer Wert besser ist.</p></li>
<li><p>Für <strong>IP-</strong>, <strong>COSINE-</strong> und <strong>BM25-Metriken</strong> (wo höhere Punktzahlen bereits bessere Übereinstimmungen anzeigen): Die Werte werden direkt ohne Normalisierung verwendet.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Stufe 2: Berechnung der Decay-Scores<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Als Nächstes berechnet Milvus einen Decay-Score auf der Grundlage des numerischen Feldwerts (wie Zeitstempel oder Entfernung) unter Verwendung des von Ihnen gewählten Decay Rankers:</p>
<ul>
<li><p>Jeder Decay Ranker wandelt rohe numerische Werte in normalisierte Relevanzwerte zwischen 0-1 um.</p></li>
<li><p>Der Decay-Score gibt an, wie relevant ein Element ist, basierend auf seiner "Entfernung" vom idealen Punkt.</p></li>
</ul>
<p>Die spezifische Berechnungsformel variiert je nach Typ des Decay Rankers. Einzelheiten zur Berechnung eines Zerfallswertes finden Sie auf den entsprechenden Seiten für <a href="/docs/de/gaussian-decay.md#Formula">Gauß'schen Zerfall</a>, <a href="/docs/de/exponential-decay.md#Formula">Exponentialzerfall</a> und <a href="/docs/de/linear-decay.md#Formula">linearen Zerfall</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Stufe 3: Berechnen der endgültigen Punktzahlen<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Abschließend kombiniert Milvus die normalisierte Ähnlichkeitsbewertung und die Abklingbewertung, um die endgültige Ranglistenbewertung zu erstellen:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Im Falle einer hybriden Suche (Kombination mehrerer Vektorfelder) nimmt Milvus die maximale normalisierte Ähnlichkeitsbewertung unter den Suchanfragen:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Wenn beispielsweise eine Forschungsarbeit bei einer hybriden Suche 0,82 bei der Vektorähnlichkeit und 0,91 beim BM25-basierten Text-Retrieval erzielt, verwendet Milvus 0,91 als Basisähnlichkeitswert, bevor der Decay-Faktor angewendet wird.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Decay-Ranking in Aktion<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Schauen wir uns das Decay-Ranking in einem praktischen Szenario an - bei der Suche nach <strong>"AI-Forschungsarbeiten"</strong> mit zeitbasiertem Decay:</p>
<div class="alert note">
<p>In diesem Beispiel spiegeln die Decay-Scores wider, wie die Relevanz mit der Zeit abnimmt - neuere Arbeiten erhalten Scores, die näher an 1,0 liegen, ältere Arbeiten erhalten niedrigere Scores. Diese Werte werden mit Hilfe eines speziellen Zerfalls-Rankers berechnet. Weitere Informationen finden Sie unter <a href="/docs/de/decay-ranker-overview.md#Choose-the-right-decay-ranker">Wählen Sie den richtigen Decay Ranker</a>.</p>
</div>
<table>
   <tr>
     <th><p>Papier</p></th>
     <th><p>Vektorielle Ähnlichkeit</p></th>
     <th><p>Normalisierter Ähnlichkeitswert</p></th>
     <th><p>Datum der Veröffentlichung</p></th>
     <th><p>Abklingende Punktzahl</p></th>
     <th><p>Endgültige Punktzahl</p></th>
     <th><p>Endgültiger Rang</p></th>
   </tr>
   <tr>
     <td><p>Papier A</p></td>
     <td><p>Hoch</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>vor 2 Wochen</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Papier B</p></td>
     <td><p>Sehr hoch</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>vor 6 Monaten</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Papier C</p></td>
     <td><p>Mittel</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>vor 1 Tag</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Papier D</p></td>
     <td><p>Mittel-Hoch</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>vor 3 Wochen</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Ohne decay reranking würde Papier B auf der Grundlage der reinen Vektorähnlichkeit (0,92) den höchsten Rang einnehmen. Bei Anwendung des Decay-Rerankings jedoch:</p>
<ul>
<li><p>Arbeit C springt trotz mittlerer Ähnlichkeit auf Platz 1, weil sie sehr aktuell ist (gestern veröffentlicht)</p></li>
<li><p>Arbeit B fällt trotz ausgezeichneter Ähnlichkeit auf Platz 3, weil sie relativ alt ist.</p></li>
<li><p>Arbeit D verwendet die L2-Distanz (niedriger ist besser), daher wird ihre Punktzahl von 1,2 auf 0,76 normalisiert, bevor der Decay angewendet wird.</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Wählen Sie den richtigen Decay Ranker<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet verschiedene Decay Ranker an - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, die jeweils für spezielle Anwendungsfälle entwickelt wurden:</p>
<table>
   <tr>
     <th><p>Abkling-Rangierer</p></th>
     <th><p>Merkmale</p></th>
     <th><p>Ideale Anwendungsfälle</p></th>
     <th><p>Beispiel-Szenario</p></th>
   </tr>
   <tr>
     <td><p>Gaußförmig (<code translate="no">gauss</code>)</p></td>
     <td><p>Natürlich wirkender allmählicher Rückgang, der sich mäßig ausdehnt</p></td>
     <td><ul><li><p>Allgemeine Suchen, die ausgewogene Ergebnisse erfordern</p></li><li><p>Anwendungen, bei denen die Benutzer ein intuitives Gefühl für die Entfernung haben</p></li><li><p>Wenn eine moderate Entfernung die Ergebnisse nicht stark beeinträchtigen sollte</p></li></ul></td>
     <td><p>Bei der Suche nach einem Restaurant bleiben qualitativ hochwertige Lokale in 3 km Entfernung auffindbar, obwohl sie in der Rangliste niedriger eingestuft werden als nahe gelegene Optionen</p></td>
   </tr>
   <tr>
     <td><p>Exponential (<code translate="no">exp</code>)</p></td>
     <td><p>Nimmt anfangs schnell ab, behält aber einen langen Schwanz bei</p></td>
     <td><ul><li><p>Newsfeeds, bei denen die Aktualität entscheidend ist</p></li><li><p>Soziale Medien, wo frische Inhalte dominieren sollten</p></li><li><p>Wenn die Nähe stark bevorzugt wird, aber außergewöhnlich weit entfernte Artikel sichtbar bleiben sollten</p></li></ul></td>
     <td><p>In einer Nachrichten-App rangieren die Geschichten von gestern viel höher als wochenalte Inhalte, aber hochrelevante ältere Artikel können immer noch erscheinen</p></td>
   </tr>
   <tr>
     <td><p>Linear (<code translate="no">linear</code>)</p></td>
     <td><p>Konsistenter, vorhersehbarer Rückgang mit einer klaren Abgrenzung</p></td>
     <td><ul><li><p>Anwendungen mit natürlichen Grenzen</p></li><li><p>Dienste mit Entfernungsgrenzen</p></li><li><p>Inhalte mit Verfallsdaten oder klaren Schwellenwerten</p></li></ul></td>
     <td><p>In einer Ereignissuche werden Ereignisse, die über ein zweiwöchiges Zukunftsfenster hinausgehen, einfach nicht angezeigt.</p></td>
   </tr>
</table>
<p>Detaillierte Informationen darüber, wie jeder Decay Ranker die Punktzahlen und spezifischen Abnahmemuster berechnet, finden Sie in der entsprechenden Dokumentation:</p>
<ul>
<li><p><a href="/docs/de/gaussian-decay.md">Gaußscher Zerfall</a></p></li>
<li><p><a href="/docs/de/exponential-decay.md">Exponentialer Zerfall</a></p></li>
<li><p><a href="/docs/de/linear-decay.md">Linearer Verfall</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Beispiel für die Implementierung<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Decay Rankers können sowohl auf die Standard-Vektorsuche als auch auf hybride Suchoperationen in Milvus angewendet werden. Im Folgenden finden Sie die wichtigsten Codeschnipsel für die Implementierung dieser Funktion.</p>
<div class="alert note">
<p>Bevor Sie Abklingfunktionen verwenden, müssen Sie zunächst eine Sammlung mit geeigneten numerischen Feldern (wie Zeitstempel, Entfernungen usw.) erstellen, die für Abklingberechnungen verwendet werden sollen. Vollständige Arbeitsbeispiele, einschließlich der Einrichtung der Sammlung, der Schemadefinition und der Dateneinfügung, finden Sie im <a href="/docs/de/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial: Zeitbasiertes Ranking in Milvus implementieren</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Erstellen Sie einen Decay Ranker<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Um das Decay-Ranking zu implementieren, definieren Sie zunächst ein <code translate="no">Function</code> Objekt mit der entsprechenden Konfiguration:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;

<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().toEpochMilli())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> decayRanker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).<span class="hljs-title function_">getTime</span>(),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wert/Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Bezeichner für Ihre Funktion, die bei der Ausführung von Suchen verwendet wird. Wählen Sie einen beschreibenden Namen, der für Ihren Anwendungsfall relevant ist.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Numerisches Feld für die Berechnung der Abklingrate. Legt fest, welches Datenattribut für die Berechnung des Verfalls verwendet wird (z. B. Zeitstempel für zeitbasierten Verfall, Koordinaten für ortsbezogenen Verfall). </p><p>Muss ein Feld in Ihrer Sammlung sein, das relevante numerische Werte enthält. Unterstützt INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Gibt den Typ der zu erstellenden Funktion an.</p><p>Muss für alle Zerfallsrangierer auf <code translate="no">RERANK</code> gesetzt werden.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Legt die zu verwendende Ranglistenmethode fest.</p><p>Muss auf <code translate="no">"decay"</code> gesetzt werden, um die Funktion des Zerfallsrankings zu aktivieren.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Legt fest, welcher mathematische Decay Ranker angewendet werden soll. Bestimmt die Kurvenform des Relevanzabfalls.</p><p>Eine Anleitung zur Auswahl der geeigneten Funktion finden Sie im Abschnitt <a href="/docs/de/decay-ranker-overview.md#Choose-the-right-decay-ranker">Wählen Sie den richtigen Decay Ranker</a>.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, oder <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Referenzpunkt, von dem aus die Zerfallsbewertung berechnet wird. Artikel mit diesem Wert erhalten maximale Relevanzwerte.</p><p>Bei zeitbasiertem Verfall muss die Zeiteinheit mit Ihren Erfassungsdaten übereinstimmen.</p></td>
     <td><ul><li><p>Für Zeitstempel: aktuelle Zeit (z. B. <code translate="no">int(time.time())</code>)</p></li><li><p>Für Geolocation: die aktuellen Koordinaten des Nutzers</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Entfernung oder Zeit, zu der die Relevanz auf den Wert <code translate="no">decay</code> fällt. Steuert, wie schnell die Relevanz abnimmt.</p><p>Bei einem zeitbasierten Verfall muss die Zeiteinheit mit Ihren Erfassungsdaten übereinstimmen.</p><p>Größere Werte sorgen für einen allmählichen Rückgang der Relevanz, kleinere Werte für einen steileren Rückgang.</p></td>
     <td><ul><li><p>Für Zeit: Zeitraum in Sekunden (z. B. <code translate="no">7 * 24 * 60 * 60</code> für 7 Tage)</p></li><li><p>Für die Entfernung: Meter (z. B. <code translate="no">5000</code> für 5 km)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Kein</p></td>
     <td><p>Erzeugt eine "Nicht-Verfall-Zone" um die <code translate="no">origin</code>, in der Elemente ihre volle Punktzahl beibehalten (Verfallswert = 1,0).</p><p>Bei zeitbasiertem Verfall muss die Zeiteinheit mit Ihren Erfassungsdaten übereinstimmen.</p><p>Elemente innerhalb dieses Bereichs von <code translate="no">origin</code> behalten ihre maximale Relevanz.</p></td>
     <td><ul><li><p>Für Zeit: Zeitraum in Sekunden (z. B. <code translate="no">24 * 60 * 60</code> für 1 Tag)</p></li><li><p>Für die Entfernung: Meter (z. B. <code translate="no">500</code> für 500 m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Keine</p></td>
     <td><p>Punktwert bei der Entfernung <code translate="no">scale</code>, steuert die Steilheit der Kurve. Niedrigere Werte ergeben steilere Kurven, höhere Werte ergeben langsamere Kurven.</p><p>Muss zwischen 0 und 1 liegen.</p></td>
     <td><p><code translate="no">0.5</code> (Voreinstellung)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Auf Standard-Vektorsuche anwenden<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Sie Ihren Decay Ranker definiert haben, können Sie ihn bei Suchvorgängen anwenden, indem Sie ihn an den Parameter <code translate="no">ranker</code> übergeben:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: ranker,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
