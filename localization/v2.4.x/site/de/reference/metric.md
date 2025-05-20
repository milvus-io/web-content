---
id: metric.md
summary: >-
  Milvus unterstützt eine Vielzahl von Ähnlichkeitsmetriken, darunter
  Euklidischer Abstand, Inneres Produkt, Jaccard usw.
title: Ähnlichkeitsmetriken
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Ähnlichkeitsmetriken<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus werden Ähnlichkeitsmetriken verwendet, um Ähnlichkeiten zwischen Vektoren zu messen. Die Wahl einer guten Abstandsmetrik hilft, die Klassifizierungs- und Clustering-Leistung erheblich zu verbessern.</p>
<p>Die folgende Tabelle zeigt, wie diese weit verbreiteten Ähnlichkeitsmetriken zu verschiedenen Eingabedatenformen und Milvus-Indizes passen. Derzeit unterstützt Milvus verschiedene Datentypen, darunter Fließkomma-Einbettungen (oft auch als Fließkomma-Vektoren oder dichte Vektoren bezeichnet), binäre Einbettungen (auch als binäre Vektoren bezeichnet) und spärliche Einbettungen (auch als spärliche Vektoren bezeichnet).</p>
<div class="filter">
 <a href="#floating">Fließkomma-Einbettungen</a> <a href="#binary">Binäre Einbettungen</a> <a href="#sparse">Dünne Einbettungen</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metrische Typen</th>
    <th class="tg-0pky">Index-Typen</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Euklidischer Abstand (L2)</li><li>Inneres Produkt (IP)</li><li>Kosinus-Ähnlichkeit (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metrische Typen</th>
    <th class="tg-0pky">Index-Typen</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Metrische Typen</th>
    <th class="tg-0pky">Index-Typen</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPÄRLICHER_INVERTIERTER_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Euklidischer Abstand (L2)</h3><p>Im Wesentlichen misst der euklidische Abstand die Länge eines Segments, das 2 Punkte miteinander verbindet.</p>
<p>Die Formel für den euklidischen Abstand lautet wie folgt:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>euklidisch</span> </span></p>
<p>wobei <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>) und <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>) zwei Punkte im n-dimensionalen euklidischen Raum sind</p>
<p>Es ist die am häufigsten verwendete Abstandsmetrik und ist sehr nützlich, wenn die Daten kontinuierlich sind.</p>
<div class="alert note">
Milvus berechnet den Wert vor der Anwendung der Quadratwurzel nur dann, wenn der euklidische Abstand als Abstandsmetrik gewählt wird.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Inneres Produkt (IP)</h3><p>Der IP-Abstand zwischen zwei Vektoreinbettungen ist wie folgt definiert:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>ip</span> </span></p>
<p>IP ist nützlicher, wenn Sie nicht-normalisierte Daten vergleichen müssen oder wenn Sie sich für den Betrag und den Winkel interessieren.</p>
<div class="alert note">
<p>Wendet man die IP-Abstandsmetrik auf normalisierte Einbettungen an, entspricht das Ergebnis der Berechnung der Kosinusähnlichkeit zwischen den Einbettungen.</p>
</div>
<p>Angenommen, X' ist von der Einbettung X normalisiert:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalisieren</span>. </span></p>
<p>Die Korrelation zwischen den beiden Einbettungen ist wie folgt:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>Normalisierung</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Kosinus-Ähnlichkeit</h3><p>Bei der Cosinus-Ähnlichkeit wird der Kosinus des Winkels zwischen zwei Vektorsätzen verwendet, um zu messen, wie ähnlich sie sich sind. Man kann sich die beiden Vektorsätze als zwei Liniensegmente vorstellen, die vom gleichen Ursprung ([0,0,...]) ausgehen, aber in unterschiedliche Richtungen zeigen.</p>
<p>Um die Cosinus-Ähnlichkeit zwischen zwei Mengen von Vektoren <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> und <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> zu berechnen, verwenden Sie die folgende Formel:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>Cosinus_Ähnlichkeit</span> </span></p>
<p>Die Kosinusähnlichkeit liegt immer im Intervall <strong>[-1, 1]</strong>. Zwei proportionale Vektoren haben beispielsweise eine Cosinus-Ähnlichkeit von <strong>1</strong>, zwei orthogonale Vektoren haben eine Ähnlichkeit von <strong>0</strong> und zwei entgegengesetzte Vektoren haben eine Ähnlichkeit von <strong>-1</strong>. Je größer der Cosinus, desto kleiner der Winkel zwischen zwei Vektoren, was bedeutet, dass diese beiden Vektoren einander ähnlicher sind.</p>
<p>Wenn man die Kosinusähnlichkeit von 1 subtrahiert, erhält man den Kosinusabstand zwischen zwei Vektoren.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Jaccard-Abstand</h3><p>Der Jaccard-Ähnlichkeitskoeffizient misst die Ähnlichkeit zwischen zwei Stichprobenmengen und ist definiert als die Kardinalität der Schnittmenge der definierten Mengen geteilt durch die Kardinalität der Vereinigung dieser Mengen. Er kann nur auf endliche Stichprobenmengen angewendet werden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Jaccard-Ähnlichkeitskoeffizient</span> </span></p>
<p>Die Jaccard-Distanz misst die Unähnlichkeit zwischen Datensätzen und wird ermittelt, indem der Jaccard-Ähnlichkeitskoeffizient von 1 subtrahiert wird. Für binäre Variablen entspricht die Jaccard-Distanz dem Tanimoto-Koeffizienten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Jaccard-Abstand</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Hamming-Abstand</h3><p>Die Hamming-Distanz misst binäre Datenstrings. Der Abstand zwischen zwei Zeichenfolgen gleicher Länge ist die Anzahl der Bitpositionen, an denen die Bits unterschiedlich sind.</p>
<p>Nehmen wir zum Beispiel an, es gibt zwei Zeichenketten, 1101 1001 und 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Da dies zwei 1en enthält, ist der Hamming-Abstand d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Strukturelle Ähnlichkeit</h3><p>Wenn eine chemische Struktur als Teil einer größeren chemischen Struktur auftritt, wird die erste als Substruktur und die zweite als Superstruktur bezeichnet. Zum Beispiel ist Ethanol eine Substruktur von Essigsäure und Essigsäure ist eine Superstruktur von Ethanol.</p>
<p>Die strukturelle Ähnlichkeit wird verwendet, um festzustellen, ob zwei chemische Formeln einander insofern ähnlich sind, als die eine die Über- oder Unterstruktur der anderen ist.</p>
<p>Um festzustellen, ob A ein Überbau von B ist, verwendet man die folgende Formel:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>Überbau</span> </span></p>
<p>Wobei:</p>
<ul>
<li>A die binäre Darstellung einer chemischen Formel ist, die abgerufen werden soll</li>
<li>B ist die binäre Darstellung einer chemischen Formel in der Datenbank</li>
</ul>
<p>Wenn <code translate="no">0</code> zurückgegeben wird, ist <strong>A</strong> keine Überstruktur von <strong>B</strong>. Andernfalls ist das Ergebnis genau umgekehrt.</p>
<p>Um festzustellen, ob A eine Unterstruktur von B ist, verwenden Sie die folgende Formel:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>Unterstruktur</span> </span></p>
<p>Wobei:</p>
<ul>
<li>A die binäre Darstellung einer chemischen Formel ist, die abgerufen werden soll</li>
<li>B ist die binäre Darstellung einer chemischen Formel in der Datenbank</li>
</ul>
<p>Wenn <code translate="no">0</code> zurückgegeben wird, ist <strong>A</strong> keine Unterstruktur von <strong>B</strong>. Andernfalls ist das Ergebnis genau andersherum.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Warum ist das Top1-Ergebnis einer Vektorsuche nicht der Suchvektor selbst, wenn der Metrik-Typ das innere Produkt ist?</font></summary>Dies geschieht, wenn Sie die Vektoren nicht normalisiert haben, wenn Sie das innere Produkt als Abstandsmetrik verwenden.</details>
<details>
<summary><font color="#4fc4f9">Was ist Normalisierung? Warum ist eine Normalisierung erforderlich?</font></summary></p>
<p>Normalisierung bezieht sich auf den Prozess der Umwandlung einer Einbettung (eines Vektors), so dass seine Norm gleich 1 ist. Wenn Sie das innere Produkt zur Berechnung der Ähnlichkeit von Einbettungen verwenden, müssen Sie Ihre Einbettungen normalisieren. Nach der Normalisierung ist das innere Produkt gleich der Kosinusähnlichkeit.</p>
<p>
Siehe <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a> für weitere Informationen.</p>
</details>
<details>
<summary><font color="#4fc4f9">Warum erhalte ich unterschiedliche Ergebnisse, wenn ich den euklidischen Abstand (L2) und das innere Produkt (IP) als Abstandsmetrik verwende?</font></summary>Prüfen Sie, ob die Vektoren normalisiert sind. Wenn nicht, müssen Sie die Vektoren zunächst normalisieren. Theoretisch unterscheiden sich die mit L2 ermittelten Ähnlichkeiten von den mit IP ermittelten Ähnlichkeiten, wenn die Vektoren nicht normalisiert sind.</details>
<h2 id="Whats-next" class="common-anchor-header">Der nächste Schritt<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie mehr über die unterstützten <a href="/docs/de/v2.4.x/index.md">Index-Typen</a> in Milvus.</li>
</ul>
