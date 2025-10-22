---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Effiziente Deduplizierung und Ähnlichkeitssuche sind für große Datensätze des
  maschinellen Lernens von entscheidender Bedeutung, insbesondere für Aufgaben
  wie die Bereinigung von Trainingskorpora für große Sprachmodelle (LLMs). Bei
  der Bearbeitung von Millionen oder Milliarden von Dokumenten wird der
  herkömmliche exakte Abgleich zu langsam und kostspielig.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>Effiziente Deduplizierung und Ähnlichkeitssuche sind für große Datensätze des maschinellen Lernens von entscheidender Bedeutung, insbesondere für Aufgaben wie das Bereinigen von Trainingskorpora für Large Language Models (LLMs). Wenn es um Millionen oder Milliarden von Dokumenten geht, wird der herkömmliche exakte Abgleich zu langsam und kostspielig.</p>
<p>Der <strong>MINHASH_LSH-Index</strong> in Milvus ermöglicht eine schnelle, skalierbare und genaue annähernde Deduplizierung durch die Kombination zweier leistungsstarker Techniken:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: Erzeugt schnell kompakte Signaturen (oder "Fingerabdrücke"), um die Ähnlichkeit von Dokumenten zu schätzen.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Lokalitätssensitives Hashing (LSH)</a>: Findet schnell Gruppen ähnlicher Dokumente auf der Grundlage ihrer MinHash-Signaturen.</p></li>
</ul>
<p>Dieser Leitfaden führt Sie durch die Konzepte, Voraussetzungen, die Einrichtung und die besten Praktiken für die Verwendung von MINHASH_LSH in Milvus.</p>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Jaccard-Ähnlichkeit<button data-href="#Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Jaccard-Ähnlichkeit misst die Überlappung zwischen zwei Mengen A und B, formal definiert als:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Ihr Wert reicht von 0 (völlig unzusammenhängend) bis 1 (identisch).</p>
<p>Die exakte Berechnung der Jaccard-Ähnlichkeit zwischen allen Dokumentenpaaren in großen Datensätzen ist jedoch sehr rechenintensiv - O<strong>(n²)</strong> in Bezug auf Zeit und Speicherplatz, wenn <strong>n</strong> groß ist. Dies macht sie für Anwendungsfälle wie die Bereinigung von LLM-Trainingskorpus oder die Analyse von Dokumenten im Web nicht praktikabel.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">MinHash-Signaturen: Ungefähre Jaccard-Ähnlichkeit<button data-href="#MinHash-signatures-Approximate-Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> ist eine probabilistische Technik, die eine effiziente Methode zur Schätzung der Jaccard-Ähnlichkeit bietet. Dabei wird jeder Satz in einen kompakten <strong>Signaturvektor</strong> umgewandelt, der genügend Informationen enthält, um die Ähnlichkeit der Sätze effizient zu approximieren.</p>
<p><strong>Der Kerngedanke</strong>:</p>
<p>Je ähnlicher die beiden Mengen sind, desto wahrscheinlicher ist es, dass ihre MinHash-Signaturen an denselben Positionen übereinstimmen. Diese Eigenschaft ermöglicht es MinHash, die Jaccard-Ähnlichkeit zwischen Mengen zu approximieren.</p>
<p>Diese Eigenschaft ermöglicht es MinHash, <strong>die Jaccard-Ähnlichkeit</strong> zwischen Mengen <strong>anzunähern</strong>, ohne die vollständigen Mengen direkt vergleichen zu müssen.</p>
<p>Der MinHash-Prozess umfasst:</p>
<ol>
<li><p><strong>Shingling</strong>: Konvertierung von Dokumenten in Mengen von sich überschneidenden Token-Sequenzen (Shingles)</p></li>
<li><p><strong>Hashing</strong>: Anwendung mehrerer unabhängiger Hash-Funktionen auf jedes Shingle</p></li>
<li><p><strong>Min-Auswahl</strong>: Für jede Hash-Funktion wird der <strong>minimale</strong> Hash-Wert für alle Shingles ermittelt.</p></li>
</ol>
<p>Der gesamte Prozess ist unten abgebildet:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>Minhash Arbeitsablauf</span> </span></p>
<div class="alert note">
<p>Die Anzahl der verwendeten Hash-Funktionen bestimmt die Dimensionalität der MinHash-Signatur. Höhere Dimensionen bieten eine bessere Annäherungsgenauigkeit, allerdings auf Kosten eines höheren Speicher- und Rechenaufwands.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH für MinHash<button data-href="#LSH-for-MinHash" class="anchor-icon" translate="no">
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
    </button></h3><p>Während MinHash-Signaturen die Kosten für die Berechnung der exakten Jaccard-Ähnlichkeit zwischen Dokumenten erheblich reduzieren, ist der vollständige Vergleich jedes Paares von Signaturvektoren in der Größenordnung immer noch ineffizient.</p>
<p>Um dieses Problem zu lösen, wird <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a> verwendet. LSH ermöglicht eine schnelle annähernde Ähnlichkeitssuche, indem es sicherstellt, dass ähnliche Elemente mit hoher Wahrscheinlichkeit in denselben "Bucket" gehasht werden, so dass nicht jedes Paar direkt verglichen werden muss.</p>
<p>Der Prozess umfasst:</p>
<ol>
<li><p><strong>Segmentierung der Signatur:</strong></p>
<p>Eine <em>n-dimensionale</em> MinHash-Signatur wird in <em>b</em> Bänder unterteilt. Jedes Band enthält <em>r</em> aufeinanderfolgende Hash-Werte, so dass die Gesamtlänge der Signatur <em>n = b × r</em> beträgt.</p>
<p>Hat man beispielsweise eine 128-dimensionale MinHash-Signatur<em>(n = 128</em>) und unterteilt sie in 32 Bänder<em>(b = 32</em>), dann enthält jedes Band 4 Hash-Werte<em>(r = 4</em>).</p></li>
<li><p><strong>Hashing auf Bandebene:</strong></p>
<p>Nach der Segmentierung wird jedes Band unabhängig mit einer Standard-Hash-Funktion verarbeitet, um es einem Bucket zuzuordnen. Wenn zwei Signaturen innerhalb eines Bandes denselben Hash-Wert ergeben, d. h. in denselben Bucket fallen, werden sie als potenzielle Übereinstimmungen betrachtet.</p></li>
<li><p><strong>Auswahl der Kandidaten:</strong></p>
<p>Paare, die in mindestens einem Band übereinstimmen, werden als Ähnlichkeitskandidaten ausgewählt.</p></li>
</ol>
<div class="alert note">
<p>Warum funktioniert das?</p>
<p>Mathematisch gesehen, wenn zwei Unterschriften die Jaccard-Ähnlichkeit <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s haben,</p>
<ul>
<li><p>Die Wahrscheinlichkeit, dass sie in einer Zeile (Hash-Position) identisch sind, ist <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s</p></li>
<li><p>Die Wahrscheinlichkeit, dass sie in allen <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> r Zeilen eines Bandes übereinstimmen, ist <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>Die Wahrscheinlichkeit, dass sie in <strong>mindestens einem Band</strong> übereinstimmen, ist <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>1-</mo><mo stretchy="false">(</mo><msup><mi>1-sr</mi></msup><msup><mo stretchy="false">)</mo><mi>b1</mi></msup></mrow><annotation encoding="application/x-tex">- (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span></span></span></span> 1 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">(1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0991em;vertical-align:-0.25em;"></span> s</span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose"><span class="mclose">)</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> b</p></li>
</ul>
<p>Einzelheiten finden Sie unter <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Lokalitätssensitives Hashing</a>.</p>
</div>
<p>Betrachten Sie drei Dokumente mit 128-dimensionalen MinHash-Signaturen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Lsh Arbeitsablauf 1</span> </span></p>
<p>Zunächst unterteilt LSH die 128-dimensionale Signatur in 32 Bänder mit jeweils 4 aufeinanderfolgenden Werten:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Lsh Arbeitsablauf 2</span> </span></p>
<p>Dann wird jedes Band mit Hilfe einer Hash-Funktion in verschiedene Buckets unterteilt. Dokumentenpaare, die die gleichen Buckets haben, werden als Ähnlichkeitskandidaten ausgewählt. Im folgenden Beispiel werden Dokument A und Dokument B als Ähnlichkeitskandidaten ausgewählt, da ihre Hash-Ergebnisse in <strong>Band 0</strong> übereinstimmen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Lsh Workflow 3</span> </span></p>
<div class="alert note">
<p>Die Anzahl der Bänder wird durch den Parameter <code translate="no">mh_lsh_band</code> gesteuert. Weitere Informationen finden Sie unter <a href="/docs/de/minhash-lsh.md#Index-building-params">Parameter für die Indexerstellung</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures" class="common-anchor-header">MHJACCARD: Vergleich von MinHash-Signaturen<button data-href="#MHJACCARD-Comparing-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash-Signaturen approximieren die Jaccard-Ähnlichkeit zwischen Mengen durch binäre Vektoren fester Länge. Da bei diesen Signaturen jedoch die ursprünglichen Mengen nicht erhalten bleiben, können Standardmetriken wie <code translate="no">JACCARD</code>, <code translate="no">L2</code> oder <code translate="no">COSINE</code> nicht direkt zum Vergleich verwendet werden.</p>
<p>Um dieses Problem zu lösen, führt Milvus einen speziellen Metrik-Typ namens <code translate="no">MHJACCARD</code> ein, der speziell für den Vergleich von MinHash-Signaturen entwickelt wurde.</p>
<p>Bei der Verwendung von MinHash in Milvus:</p>
<ul>
<li><p>Das Vektorfeld muss vom Typ <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>Die <code translate="no">index_type</code> muss <code translate="no">MINHASH_LSH</code> (oder <code translate="no">BIN_FLAT</code>) sein.</p></li>
<li><p>Der Wert <code translate="no">metric_type</code> muss auf <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>Die Verwendung anderer Metriken ist entweder ungültig oder führt zu falschen Ergebnissen.</p>
<p>Weitere Informationen zu diesem Metrik-Typ finden Sie unter <a href="/docs/de/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h3 id="Deduplication-workflow" class="common-anchor-header">Deduplizierungs-Workflow<button data-href="#Deduplication-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Der von MinHash LSH unterstützte Deduplizierungsprozess ermöglicht es Milvus, nahezu doppelte Text- oder strukturierte Datensätze effizient zu identifizieren und herauszufiltern, bevor sie in die Sammlung eingefügt werden.</p>
<p><img translate="no" src="/docs/v2.6.x/assets/deduplication-workflow.png" alt="Deduplication Workflow" width="600"></p>
<ol>
<li><p><strong>Chunk &amp; Vorverarbeitung</strong>: Aufteilung eingehender Textdaten oder strukturierter Daten (z. B. Datensätze, Felder) in Chunks; Normalisierung des Textes (Kleinschreibung, Entfernung von Satzzeichen) und Entfernung von Stoppwörtern nach Bedarf.</p></li>
<li><p><strong>Konstruktion von Merkmalen</strong>: Aufbau des für MinHash verwendeten Tokensatzes (z. B. Shingles aus Text; verkettete Feld-Token für strukturierte Daten).</p></li>
<li><p><strong>Erzeugung von MinHash-Signaturen</strong>: Berechnen von MinHash-Signaturen für jeden Chunk oder Datensatz.</p></li>
<li><p><strong>Binärvektor-Konvertierung</strong>: Konvertiert die Signatur in einen mit Milvus kompatiblen Binärvektor.</p></li>
<li><p><strong>Suche vor dem Einfügen</strong>: Verwenden Sie den MinHash LSH-Index, um die Zielsammlung nach Beinahe-Duplikaten des eingehenden Elements zu durchsuchen.</p></li>
<li><p><strong>Einfügen und speichern</strong>: Fügen Sie nur eindeutige Elemente in die Sammlung ein. Sie werden für zukünftige Dedup-Prüfungen durchsuchbar.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie MinHash LSH in Milvus verwenden können, müssen Sie zunächst <strong>MinHash-Signaturen</strong> erzeugen. Diese kompakten binären Signaturen approximieren die Jaccard-Ähnlichkeit zwischen Mengen und werden für die <code translate="no">MHJACCARD</code>-basierte Suche in Milvus benötigt.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Wählen Sie eine Methode zur Erzeugung von MinHash-Signaturen<button data-href="#Choose-a-method-to-generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Abhängig von Ihrer Arbeitsbelastung können Sie wählen:</p>
<ul>
<li><p>Verwenden Sie Pythons <a href="https://ekzhu.github.io/datasketch/"><code translate="no">datasketch</code></a> der Einfachheit halber (empfohlen für Prototypen)</p></li>
<li><p>Verwenden Sie verteilte Tools (z. B. Spark, Ray) für große Datensätze</p></li>
<li><p>Implementierung benutzerdefinierter Logik (NumPy, C++ usw.), wenn die Leistungsoptimierung wichtig ist</p></li>
</ul>
<p>In diesem Leitfaden verwenden wir aus Gründen der Einfachheit und Kompatibilität mit dem Milvus-Eingabeformat <code translate="no">datasketch</code>.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Installation der erforderlichen Bibliotheken<button data-href="#Install-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><p>Installieren Sie die erforderlichen Pakete für dieses Beispiel:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Erzeugen von MinHash-Signaturen<button data-href="#Generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Wir generieren 256-dimensionale MinHash-Signaturen, wobei jeder Hash-Wert als 64-Bit-Ganzzahl dargestellt wird. Dies entspricht dem erwarteten Vektorformat für <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jede Signatur besteht aus 256 × 64 Bit = 2048 Byte. Diese Byte-Zeichenkette kann direkt in ein <code translate="no">BINARY_VECTOR</code> Feld eingefügt werden. Weitere Informationen zu den in Milvus verwendeten binären Vektoren finden Sie unter <a href="/docs/de/binary-vector.md">Binärer Vektor</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Optional) Roh-Token-Sets vorbereiten (für die verfeinerte Suche)<button data-href="#Optional-Prepare-raw-token-sets-for-refined-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Standardmäßig verwendet Milvus nur die MinHash-Signaturen und den LSH-Index, um ungefähre Nachbarn zu finden. Dies ist schnell, kann aber falsch-positive Ergebnisse liefern oder enge Übereinstimmungen übersehen.</p>
<p>Wenn Sie eine <strong>genaue Jaccard-Ähnlichkeit</strong> wünschen, unterstützt Milvus eine verfeinerte Suche, die Original-Token-Sets verwendet. Um dies zu aktivieren:</p>
<ul>
<li><p>Speichern Sie Token-Sets als separates Feld <code translate="no">VARCHAR</code> </p></li>
<li><p>Setzen Sie <code translate="no">&quot;with_raw_data&quot;: True</code> bei der <a href="/docs/de/minhash-lsh.md#Build-index-parameters-and-create-collection">Erstellung von Indexparametern</a></p></li>
<li><p>Und aktivieren Sie <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> bei der <a href="/docs/de/minhash-lsh.md#Perform-similarity-search">Durchführung der Ähnlichkeitssuche</a></p></li>
</ul>
<p><strong>Beispiel für die Extraktion von Tokensätzen</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH" class="common-anchor-header">MinHash LSH verwenden<button data-href="#Use-MinHash-LSH" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Ihre MinHash-Vektoren und Original-Token-Sets fertig sind, können Sie sie mit Milvus und <code translate="no">MINHASH_LSH</code> speichern, indizieren und durchsuchen.</p>
<h3 id="Connect-to-your-cluster" class="common-anchor-header">Verbinden Sie sich mit Ihrem Cluster<button data-href="#Connect-to-your-cluster" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Definieren Sie ein Sammlungsschema<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Definieren Sie ein Schema mit:</p>
<ul>
<li><p>Dem Primärschlüssel</p></li>
<li><p>Einem <code translate="no">BINARY_VECTOR</code> -Feld für die MinHash-Signaturen</p></li>
<li><p>Einem <code translate="no">VARCHAR</code> Feld für den ursprünglichen Tokensatz (wenn die verfeinerte Suche aktiviert ist)</p></li>
<li><p>Optional ein <code translate="no">document</code> Feld für den Originaltext</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Index-Parameter aufbauen und Sammlung erstellen<button data-href="#Build-index-parameters-and-create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie einen <code translate="no">MINHASH_LSH</code> Index mit aktivierter Jaccard-Verfeinerung:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zu den Indexerstellungsparametern finden Sie unter <a href="/docs/de/minhash-lsh.md#Index-building-params">Indexerstellungsparameter</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Daten einfügen<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Für jedes Dokument vorbereiten:</p>
<ul>
<li><p>Eine binäre MinHash-Signatur</p></li>
<li><p>Eine serialisierte Token-Set-Zeichenkette</p></li>
<li><p>(Optional) den Originaltext</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Ähnlichkeitssuche durchführen<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus unterstützt zwei Arten der Ähnlichkeitssuche mit MinHash LSH:</p>
<ul>
<li><p><strong>Ungefähre Suche</strong> - verwendet nur MinHash-Signaturen und LSH für schnelle, aber probabilistische Ergebnisse.</p></li>
<li><p><strong>Verfeinerte Suche</strong> - berechnet die Jaccard-Ähnlichkeit unter Verwendung der ursprünglichen Token-Sets neu, um die Genauigkeit zu verbessern.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Vorbereiten der Abfrage</h4><p>Um eine Ähnlichkeitssuche durchzuführen, erzeugen Sie eine MinHash-Signatur für das Abfragedokument. Diese Signatur muss mit der gleichen Dimension und dem gleichen Kodierungsformat übereinstimmen, das beim Einfügen der Daten verwendet wurde.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Näherungsweise Suche (nur LSH)</h4><p>Dies ist schnell und skalierbar, kann aber enge Übereinstimmungen übersehen oder falsch positive Ergebnisse enthalten:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Verfeinerte Suche (empfohlen für Genauigkeit):</h4><p>Dies ermöglicht einen genauen Jaccard-Vergleich unter Verwendung der in Milvus gespeicherten Original-Tokensätze. Sie ist etwas langsamer, wird aber für qualitätssensible Aufgaben empfohlen:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Index-Parameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt bietet einen Überblick über die Parameter, die für den Aufbau eines Index und die Durchführung von Suchvorgängen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/minhash-lsh.md#Build-index-parameters-and-create-collection">Aufbau eines Indexes</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Bitbreite der einzelnen Hash-Werte in der MinHash-Signatur. Muss durch 8 teilbar sein.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Verwenden Sie <code translate="no">32</code> für eine ausgewogene Leistung und Genauigkeit. Verwenden Sie <code translate="no">64</code> für höhere Genauigkeit bei größeren Datensätzen. Verwenden Sie <code translate="no">16</code>, um bei akzeptablen Genauigkeitsverlusten Speicherplatz zu sparen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Anzahl der Bänder zur Unterteilung der MinHash-Signatur für LSH. Steuert den Kompromiss zwischen Rückruf und Leistung.</p></td>
     <td><p>[1, <em>signature_length</em>]</p></td>
     <td><p>Für 128-dim-Signaturen: beginnen Sie mit 32 Bändern (4 Werte/Band). Erhöhen Sie den Wert auf 64 für eine höhere Wiedererkennung, verringern Sie ihn auf 16 für eine bessere Leistung. Die Signaturlänge muss gleichmäßig aufgeteilt werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Ob LSH-Hash-Codes im anonymen Speicher gespeichert werden sollen (<code translate="no">true</code>) oder ob eine Speicherzuordnung verwendet werden soll (<code translate="no">false</code>).</p></td>
     <td><p>wahr, falsch</p></td>
     <td><p>Verwenden Sie <code translate="no">false</code> für große Datensätze (&gt;1M Sätze), um die Speichernutzung zu reduzieren. Verwenden Sie <code translate="no">true</code> für kleinere Datensätze, die maximale Suchgeschwindigkeit erfordern.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Ob die ursprünglichen MinHash-Signaturen neben den LSH-Codes zur Verfeinerung gespeichert werden sollen.</p></td>
     <td><p>wahr, falsch</p></td>
     <td><p>Verwenden Sie <code translate="no">true</code>, wenn hohe Präzision erforderlich ist und die Speicherkosten akzeptabel sind. Verwenden Sie <code translate="no">false</code>, um den Speicheraufwand zu minimieren und die Genauigkeit leicht zu verringern.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Falsch-Positiv-Wahrscheinlichkeit für Bloom-Filter, die in der LSH-Bucket-Optimierung verwendet werden.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>Verwenden Sie <code translate="no">0.01</code> für eine ausgewogene Speichernutzung und Genauigkeit. Niedrigere Werte (<code translate="no">0.001</code>) reduzieren Falsch-Positive, erhöhen aber den Speicherbedarf. Höhere Werte (<code translate="no">0.05</code>) sparen Speicherplatz, können aber die Genauigkeit verringern.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/minhash-lsh.md#Perform-similarity-search">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Ob eine exakte Jaccard-Ähnlichkeitsberechnung für Kandidatenergebnisse zur Verfeinerung durchgeführt werden soll.</p></td>
     <td><p>wahr, falsch</p></td>
     <td><p>Verwenden Sie <code translate="no">true</code> für Anwendungen, die eine hohe Genauigkeit erfordern (z. B. Deduplizierung). Verwenden Sie <code translate="no">false</code> für eine schnellere ungefähre Suche, wenn ein geringer Genauigkeitsverlust akzeptabel ist.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Anzahl der Kandidaten, die vor der Jaccard-Verfeinerung abgerufen werden. Nur wirksam, wenn <code translate="no">mh_search_with_jaccard</code> <code translate="no">true</code> ist.</p></td>
     <td><p><em>[top_k</em>, *top_k * 10*]</p></td>
     <td><p>Setzen Sie den Wert auf das 2-5-fache des gewünschten <em>top_k</em>, um ein gutes Gleichgewicht zwischen Wiederfindungsrate und Leistung zu erreichen. Höhere Werte verbessern die Wiederauffindbarkeit, erhöhen aber die Berechnungskosten.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Ob die Stapeloptimierung für mehrere gleichzeitige Abfragen aktiviert werden soll.</p></td>
     <td><p>true, false</p></td>
     <td><p>Verwenden Sie <code translate="no">true</code>, wenn Sie mit mehreren Abfragen gleichzeitig suchen, um den Durchsatz zu erhöhen. Verwenden Sie <code translate="no">false</code> für Szenarien mit nur einer Abfrage, um den Speicher-Overhead zu reduzieren.</p></td>
   </tr>
</table>
