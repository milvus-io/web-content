---
id: metric.md
title: Metrik-Typen
summary: >-
  Ähnlichkeitsmetriken werden verwendet, um Ähnlichkeiten zwischen Vektoren zu
  messen. Die Wahl einer geeigneten Abstandsmetrik trägt dazu bei, die
  Klassifizierungs- und Clustering-Leistung erheblich zu verbessern.
---
<h1 id="Metric-Types" class="common-anchor-header">Metrik-Typen<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Ähnlichkeitsmetriken werden verwendet, um Ähnlichkeiten zwischen Vektoren zu messen. Durch die Wahl einer geeigneten Distanzmetrik kann die Klassifizierungs- und Clustering-Leistung erheblich verbessert werden.</p>
<p>Derzeit unterstützt Milvus die folgenden Arten von Ähnlichkeitsmetriken: Euklidischer Abstand (<code translate="no">L2</code>), Inneres Produkt (<code translate="no">IP</code>), Kosinusähnlichkeit (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code> und <code translate="no">BM25</code> (speziell für die Volltextsuche in spärlichen Vektoren).</p>
<p>Die folgende Tabelle fasst die Zuordnung zwischen verschiedenen Feldtypen und den entsprechenden metrischen Typen zusammen.</p>
<table>
   <tr>
     <th><p>Feldtyp</p></th>
     <th><p>Dimension Bereich</p></th>
     <th><p>Unterstützte metrische Typen</p></th>
     <th><p>Standardmetrischer Typ</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>Die Angabe der Dimension ist nicht erforderlich.</p></td>
     <td><p><code translate="no">IP</code> <code translate="no">BM25</code> (nur für die Volltextsuche verwendet)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Für Vektorfelder des Typs <code translate="no">SPARSE\_FLOAT\_VECTOR</code> verwenden Sie den metrischen Typ <code translate="no">BM25</code> nur, wenn Sie eine Volltextsuche durchführen. Weitere Informationen finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p></li>
<li><p>Bei Vektorfeldern des Typs <code translate="no">BINARY_VECTOR</code> muss der Dimensionswert (<code translate="no">dim</code>) ein Vielfaches von 8 sein.</p></li>
</ul>
</div>
<p>Die nachstehende Tabelle fasst die Eigenschaften der Ähnlichkeitsabstandswerte aller unterstützten metrischen Typen und ihren Wertebereich zusammen.</p>
<table>
   <tr>
     <th><p>Metrischer Typ</p></th>
     <th><p>Merkmale der Werte für den Ähnlichkeitsabstand</p></th>
     <th><p>Ähnlichkeitsabstand Wertebereich</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Ein kleinerer Wert zeigt eine größere Ähnlichkeit an.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Ein größerer Wert weist auf eine größere Ähnlichkeit hin.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Ein größerer Wert weist auf eine größere Ähnlichkeit hin.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Ein kleinerer Wert weist auf eine größere Ähnlichkeit hin.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Ein kleinerer Wert weist auf eine größere Ähnlichkeit hin.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Bewertung der Relevanz auf der Grundlage der Termhäufigkeit, der invertierten Dokumenthäufigkeit und der Dokumentnormalisierung.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Euklidischer Abstand (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Wesentlichen misst der euklidische Abstand die Länge eines Segments, das 2 Punkte miteinander verbindet.</p>
<p>Die Formel für den euklidischen Abstand lautet wie folgt:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Euklidische Metrik</span> </span></p>
<p>wobei <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> und <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> zwei Punkte im n-dimensionalen euklidischen Raum sind.</p>
<p>Es ist die am häufigsten verwendete Abstandsmetrik und ist sehr nützlich, wenn die Daten kontinuierlich sind.</p>
<div class="alert note">
<p>Milvus berechnet nur dann den Wert vor der Anwendung der Quadratwurzel, wenn der euklidische Abstand als Abstandsmetrik gewählt wurde.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Inneres Produkt (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>Der IP-Abstand zwischen zwei Einbettungen ist wie folgt definiert:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>IP-Formel</span> </span></p>
<p>IP ist nützlicher, wenn Sie nicht-normalisierte Daten vergleichen müssen oder wenn Sie sich für die Größe und den Winkel interessieren.</p>
<div class="alert note">
<p>Wenn Sie IP zur Berechnung von Ähnlichkeiten zwischen Einbettungen verwenden, müssen Sie Ihre Einbettungen normalisieren. Nach der Normalisierung entspricht das innere Produkt der Kosinusähnlichkeit.</p>
</div>
<p>Angenommen, X' ist von der Einbettung X normalisiert:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Normalisierungsformel</span> </span></p>
<p>Die Korrelation zwischen den beiden Einbettungen ist wie folgt:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Korrelation zwischen Einbettungen</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Kosinus-Ähnlichkeit<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Kosinusähnlichkeit wird der Kosinus des Winkels zwischen zwei Vektorsätzen verwendet, um zu messen, wie ähnlich sie sich sind. Man kann sich die beiden Vektorsätze als Liniensegmente vorstellen, die vom gleichen Punkt ausgehen, z. B. [0,0,...], aber in unterschiedliche Richtungen zeigen.</p>
<p>Um die Cosinus-Ähnlichkeit zwischen zwei Gruppen von Vektoren <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> und <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> zu berechnen, verwenden Sie die folgende Formel:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Kosinus-Ähnlichkeit</span> </span></p>
<p>Die Kosinusähnlichkeit liegt immer im Intervall <strong>[-1, 1]</strong>. Zwei proportionale Vektoren haben beispielsweise eine Cosinus-Ähnlichkeit von <strong>1</strong>, zwei orthogonale Vektoren haben eine Ähnlichkeit von <strong>0</strong> und zwei entgegengesetzte Vektoren haben eine Ähnlichkeit von <strong>-1</strong>. Je größer der Cosinus ist, desto kleiner ist der Winkel zwischen den beiden Vektoren, was bedeutet, dass diese beiden Vektoren einander ähnlicher sind.</p>
<p>Wenn man die Kosinusähnlichkeit von 1 subtrahiert, erhält man den Kosinusabstand zwischen zwei Vektoren.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">JACCARD-Abstand<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Der JACCARD-Ähnlichkeitskoeffizient misst die Ähnlichkeit zwischen zwei Stichprobenmengen und ist definiert als die Kardinalität der Schnittmenge der definierten Mengen geteilt durch die Kardinalität der Vereinigung dieser Mengen. Er kann nur auf endliche Stichprobenmengen angewendet werden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Formel für den JACCARD-Ähnlichkeitskoeffizienten</span> </span></p>
<p>Die JACCARD-Distanz misst die Unähnlichkeit zwischen Datensätzen und wird durch Subtraktion des JACCARD-Ähnlichkeitskoeffizienten von 1 ermittelt. Bei binären Variablen entspricht die JACCARD-Distanz dem Tanimoto-Koeffizienten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD-Abstandsformel</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">HAMMING-Abstand<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Die HAMMING-Distanz misst binäre Datenstrings. Der Abstand zwischen zwei Zeichenfolgen gleicher Länge ist die Anzahl der Bitpositionen, an denen die Bits unterschiedlich sind.</p>
<p>Nehmen wir zum Beispiel an, es gibt zwei Zeichenketten, 1101 1001 und 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Da dies zwei 1en enthält, ist der HAMMING-Abstand, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">BM25-Ähnlichkeit<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 ist eine weit verbreitete Methode zur Messung der Textrelevanz, die speziell für die <a href="/docs/de/full-text-search.md">Volltextsuche</a> entwickelt wurde. Sie kombiniert die folgenden drei Schlüsselfaktoren:</p>
<ul>
<li><p><strong>Termfrequenz (TF):</strong> Misst, wie häufig ein Begriff in einem Dokument vorkommt. Während höhere Häufigkeiten oft eine größere Bedeutung anzeigen, verwendet BM25 den Sättigungsparameter k_1, um zu verhindern, dass zu häufige Begriffe die Relevanzbewertung dominieren.</p></li>
<li><p><strong>Umgekehrte Dokumenthäufigkeit (IDF):</strong> Spiegelt die Bedeutung eines Begriffs im gesamten Korpus wider. Begriffe, die in weniger Dokumenten vorkommen, erhalten einen höheren IDF-Wert, was auf einen größeren Beitrag zur Relevanz hinweist.</p></li>
<li><p><strong>Normalisierung der Dokumentlänge:</strong> Längere Dokumente werden tendenziell höher bewertet, da sie mehr Begriffe enthalten. BM25 mildert diese Verzerrung durch Normalisierung der Dokumentlängen, wobei der Parameter b die Stärke dieser Normalisierung steuert.</p></li>
</ul>
<p>Die BM25-Bewertung wird wie folgt berechnet:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Beschreibung der Parameter:</p>
<ul>
<li><p>Q: Der vom Benutzer angegebene Abfragetext.</p></li>
<li><p>D: Das zu bewertende Dokument.</p></li>
<li><p>TF(q_i, D): Termfrequenz, die angibt, wie oft der Term q_i im Dokument D vorkommt.</p></li>
<li><p>IDF(q_i): Inverse Dokumenthäufigkeit, berechnet als:</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>wobei N die Gesamtzahl der Dokumente im Korpus undn(q_i) die Anzahl der Dokumente ist, die den Begriff q_i enthalten.</p></li>
<li><p>|D|: Länge des Dokuments D (Gesamtzahl der Terme).</p></li>
<li><p>avgdl: Durchschnittliche Länge aller Dokumente im Korpus.</p></li>
<li><p>k_1: Steuert den Einfluss der Termhäufigkeit auf das Ergebnis. Höhere Werte erhöhen die Bedeutung der Termhäufigkeit. Der typische Bereich ist [1.2, 2.0], während Milvus einen Bereich von [0, 3] zulässt.</p></li>
<li><p>b: Steuert den Grad der Längennormalisierung und reicht von 0 bis 1. Bei einem Wert von 0 wird keine Normalisierung vorgenommen; bei einem Wert von 1 wird eine vollständige Normalisierung vorgenommen.</p></li>
</ul>
