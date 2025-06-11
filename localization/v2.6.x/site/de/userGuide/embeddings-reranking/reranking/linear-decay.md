---
id: linear-decay.md
title: Lineares AbklingenCompatible with Milvus 2.6.x
summary: >-
  Der lineare Verfall erzeugt einen geradlinigen Rückgang, der an einem
  absoluten Nullpunkt in Ihren Suchergebnissen endet. Ähnlich wie bei einem
  Countdown für ein bevorstehendes Ereignis, bei dem die Relevanz allmählich
  abnimmt, bis das Ereignis vorüber ist, führt der lineare Verfall zu einer
  vorhersehbaren, stetigen Verringerung der Relevanz, wenn sich Elemente von
  Ihrem idealen Punkt entfernen, bis sie ganz verschwinden. Dieser Ansatz ist
  ideal, wenn Sie eine konsistente Abklingrate mit einem klaren Grenzwert
  wünschen, der sicherstellt, dass Artikel jenseits einer bestimmten Grenze
  vollständig aus den Ergebnissen ausgeschlossen werden.
beta: Milvus 2.6.x
---
<h1 id="Linear-Decay" class="common-anchor-header">Lineares Abklingen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Linear-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Der lineare Verfall erzeugt einen geradlinigen Rückgang, der an einem absoluten Nullpunkt in Ihren Suchergebnissen endet. Ähnlich wie bei einem Countdown für ein bevorstehendes Ereignis, bei dem die Relevanz allmählich abnimmt, bis das Ereignis vorüber ist, führt der lineare Verfall zu einer vorhersehbaren, stetigen Verringerung der Relevanz, wenn sich die Elemente von Ihrem Idealpunkt entfernen, bis sie ganz verschwinden. Dieser Ansatz ist ideal, wenn Sie eine konsistente Abklingrate mit einem klaren Grenzwert wünschen, der sicherstellt, dass Artikel jenseits einer bestimmten Grenze vollständig aus den Ergebnissen ausgeschlossen werden.</p>
<p>Im Gegensatz zu anderen Zerfallsfunktionen:</p>
<ul>
<li><p>Der Gaußsche Zerfall folgt einer Glockenkurve, die sich allmählich dem Nullpunkt nähert, ihn aber nie erreicht.</p></li>
<li><p>Exponentieller Zerfall behält einen langen Schwanz minimaler Relevanz bei, der sich unendlich verlängert</p></li>
</ul>
<p>Der lineare Zerfall schafft einen eindeutigen Endpunkt, was ihn besonders effektiv für Anwendungen mit natürlichen Grenzen oder Fristen macht.</p>
<h2 id="When-to-use-linear-decay" class="common-anchor-header">Wann sollte man lineares Abklingen verwenden?<button data-href="#When-to-use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Lineares Abklingen ist besonders effektiv für:</p>
<table>
   <tr>
     <th><p>Anwendungsfall</p></th>
     <th><p>Beispiel</p></th>
     <th><p>Warum Linear gut funktioniert</p></th>
   </tr>
   <tr>
     <td><p>Veranstaltungsverzeichnisse</p></td>
     <td><p>Konzertkarten-Plattformen</p></td>
     <td><p>Schafft eine klare Grenze für Veranstaltungen, die zu weit in der Zukunft liegen</p></td>
   </tr>
   <tr>
     <td><p>Befristete Angebote</p></td>
     <td><p>Blitzverkäufe, Werbeaktionen</p></td>
     <td><p>Stellt sicher, dass abgelaufene oder bald ablaufende Angebote nicht angezeigt werden</p></td>
   </tr>
   <tr>
     <td><p>Lieferradius</p></td>
     <td><p>Lebensmittellieferungen, Kurierdienste</p></td>
     <td><p>Erzwingt harte geografische Grenzen</p></td>
   </tr>
   <tr>
     <td><p>Altersbeschränkte Inhalte</p></td>
     <td><p>Dating-Plattformen, Mediendienste</p></td>
     <td><p>Legt feste Altersschwellen fest</p></td>
   </tr>
</table>
<p>Wählen Sie lineares Abklingen, wenn:</p>
<ul>
<li><p>Ihre Anwendung eine natürliche Grenze, Frist oder Schwelle hat</p></li>
<li><p>Elemente, die einen bestimmten Punkt überschreiten, vollständig aus den Ergebnissen ausgeschlossen werden sollen</p></li>
<li><p>Sie benötigen eine vorhersehbare, konsistente Rate der Relevanzabnahme</p></li>
<li><p>Die Benutzer sollten eine klare Abgrenzung zwischen relevanten und irrelevanten Elementen sehen</p></li>
</ul>
<h2 id="Steady-decline-principle" class="common-anchor-header">Prinzip des stetigen Rückgangs<button data-href="#Steady-decline-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Die lineare Abnahme erzeugt einen geradlinigen Abfall, der mit einer konstanten Rate abnimmt, bis er genau Null erreicht. Dieses Muster tritt in vielen alltäglichen Szenarien auf, wie z. B. bei Countdown-Timern, bei der Erschöpfung von Lagerbeständen und bei der Annäherung an Fristen, bei denen die Relevanz einen klaren Verfallszeitpunkt hat.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/linear-decay.png" alt="Linear Decay" class="doc-image" id="linear-decay" />
   </span> <span class="img-wrapper"> <span>Lineares Abklingen</span> </span></p>
<p>Das obige Diagramm zeigt, wie sich der lineare Verfall auf Veranstaltungsangebote auf einer Ticketing-Plattform auswirken würde:</p>
<ul>
<li><p><code translate="no">origin</code> (aktuelles Datum): Der gegenwärtige Moment, in dem die Relevanz am höchsten ist (1,0).</p></li>
<li><p><code translate="no">offset</code> (1 Tag): Das "unmittelbare Veranstaltungsfenster" - alle Veranstaltungen, die innerhalb des nächsten Tages stattfinden, behalten die volle Relevanzbewertung (1,0), wodurch sichergestellt wird, dass sehr bald stattfindende Veranstaltungen nicht wegen geringer Zeitunterschiede benachteiligt werden.</p></li>
<li><p><code translate="no">decay</code> (0.5): Die Punktzahl in der Skalendistanz - dieser Parameter steuert die Geschwindigkeit der Abnahme der Relevanz.</p></li>
<li><p><code translate="no">scale</code> (10 Tage): Der Zeitraum, in dem die Relevanz auf den Abklingwert fällt - bei Ereignissen, die 10 Tage entfernt sind, wird die Relevanzbewertung halbiert (0,5).</p></li>
</ul>
<p>Wie Sie der geradlinigen Kurve entnehmen können, haben Ereignisse, die mehr als 16 Tage entfernt sind, genau null Relevanz und werden in den Suchergebnissen überhaupt nicht angezeigt. Damit wird eine klare Grenze gezogen, die sicherstellt, dass die Nutzer nur relevante Veranstaltungen innerhalb eines bestimmten Zeitfensters sehen.</p>
<p>Dieses Verhalten spiegelt wider, wie die Veranstaltungsplanung in der Regel funktioniert: Unmittelbar bevorstehende Veranstaltungen sind am relevantesten, Veranstaltungen in den kommenden Wochen haben eine abnehmende Bedeutung, und Veranstaltungen, die zu weit in der Zukunft liegen (oder bereits vergangen sind), sollten überhaupt nicht angezeigt werden.</p>
<h2 id="Formula" class="common-anchor-header">Formel<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>Die mathematische Formel für die Berechnung eines linearen Zerfallswertes lautet:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mtext>doc</mtext><mo stretchy="false">)</mo><mo>=</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mfrac><mrow><mi>s</mi><mo>−</mo><mi>max</mi><mo>⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi mathvariant="normal">∣</mi><msub><mtext>fieldvalue</mtext><mtext>doc</mtext></msub><mo>−</mo><mtext>origin</mtext><mi mathvariant="normal">∣</mi><mo>−</mo><mtext>offset</mtext><mo stretchy="false">)</mo></mrow><mi>s</mi></mfrac><mo separator="true">,</mo><mn>0</mn><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(\text{doc}) = \max\left( \frac{s - \max(0, |\text{fieldvalue}_{\text{doc}} - \text{origin}| - \text{offset})}{s}, 0 \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mopen">(</span><span class="mord text"><span class="mord">doc</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">∣</span><span class="mord"><span class="mord text"><span class="mord">fieldvalue</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">doc</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">origin</span></span><span class="mord">∣</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">offset</span></span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></span></p>
<p>Wo:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>s</mi><mo>=</mo><mfrac><mtext>scale</mtext><mrow><mo stretchy="false">(</mo><mn>1.0</mn><mo>−</mo><mtext>decay</mtext><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">s = \frac{\text{scale}}{(1.0 - \text{decay})}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.3074em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord">1.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">decay</span></span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">scale</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>In einfacher Sprache ausgedrückt:</p>
<ol>
<li><p>Berechne, wie weit der Feldwert vom Ursprung entfernt ist: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣fieldvaluedoc-origin∣|\text{fieldvalue}_{\text{doc}}</annotation></semantics></math></span> - <span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\text{origin}|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord text"><span class="mord">∣feldwert</span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">doc</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2222em;"></span> <span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span> <span class="mord">origin∣</span></span></span></span></p></li>
<li><p>Subtrahieren Sie den Offset (falls vorhanden), aber gehen Sie nie unter Null: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>max</mi><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mtext>distance-offset</mtext><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\max <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(0, \text{distance} - \text{offset})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">distance</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">offset</span></span><span class="mclose">)</span></span></span></span></p></li>
<li><p>Bestimmen Sie den Parameter <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s aus Ihren Skalen- und Abklingwerten.</p></li>
<li><p>Ziehen Sie die angepasste Entfernung von <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s ab und dividieren Sie durch <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s</p></li>
<li><p>Stellen Sie sicher, dass das Ergebnis nie unter Null fällt: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>max</mi><mo stretchy="false">(</mo><mtext>result</mtext><mo separator="true">,</mo><mn>0</mn><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\max <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(\text{result}, 0)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord text"><span class="mord">result</span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span></span></span></span> 0 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">)</span></span></span></span></p></li>
</ol>
<p>Die Berechnung von <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s wandelt Ihre Skalierungs- und Decay-Parameter in den Punkt um, an dem die Punktzahl Null erreicht. Bei decay=0,5 und scale=7 erreicht die Punktzahl zum Beispiel genau Null bei distance=14 (doppelter Skalenwert).</p>
<h2 id="Use-linear-decay" class="common-anchor-header">Lineares Abklingen verwenden<button data-href="#Use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Lineares Decay kann sowohl auf die Standard-Vektorsuche als auch auf hybride Suchoperationen in Milvus angewendet werden. Im Folgenden finden Sie die wichtigsten Codeschnipsel für die Implementierung dieser Funktion.</p>
<div class="alert note">
<p>Bevor Sie Decay-Funktionen verwenden können, müssen Sie zunächst eine Sammlung mit geeigneten numerischen Feldern (wie Zeitstempel, Entfernungen usw.) erstellen, die für Decay-Berechnungen verwendet werden. Vollständige Arbeitsbeispiele, einschließlich der Einrichtung der Sammlung, der Schemadefinition und der Dateneinfügung, finden Sie im <a href="/docs/de/tutorial-implement-a-time-based-ranking-in-milvus.md">Decay Ranker Tutorial</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Erstellen eines Decay Rankers</h3><p>Nachdem Sie Ihre Sammlung mit einem numerischen Feld eingerichtet haben (in diesem Beispiel <code translate="no">event_date</code> als Sekunden ab jetzt), erstellen Sie einen linearen Decay Ranker:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># Calculate current time</span>
current_time = <span class="hljs-built_in">int</span>(time.time())

<span class="hljs-comment"># Create a linear decay ranker for event listings</span>
ranker = Function(
    name=<span class="hljs-string">&quot;event_relevance&quot;</span>,               <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;event_date&quot;</span>],     <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;linear&quot;</span>,             <span class="hljs-comment"># Choose linear decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,           <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,           <span class="hljs-comment"># 12 hour immediate events window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>         <span class="hljs-comment"># 7 days (in seconds)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Auf Standard-Vektorsuche anwenden</h3><p>Nachdem Sie Ihren Decay Ranker definiert haben, können Sie ihn bei Suchvorgängen anwenden, indem Sie ihn an den Parameter <code translate="no">ranker</code> übergeben:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],              <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Auf hybride Suche anwenden</h3><p>Decay Rankers können auch auf hybride Suchoperationen angewendet werden, die mehrere Vektorfelder kombinieren:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span>
<span class="highlighted-wrapper-line">    limit=<span class="hljs-number">10</span>,</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu hybriden Suchoperationen finden Sie unter <a href="/docs/de/multi-vector-search.md">Hybride Suche mit mehreren Vektoren</a>.</p>
