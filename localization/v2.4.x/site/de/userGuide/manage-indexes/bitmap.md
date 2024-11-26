---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  Die Bitmap-Indizierung ist eine effiziente Indizierungstechnik zur
  Verbesserung der Abfrageleistung bei skalaren Feldern mit geringer
  Kardinalität.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Bitmap-Indizierung ist eine effiziente Indizierungstechnik zur Verbesserung der Abfrageleistung bei skalaren Feldern mit geringer Kardinalität. Kardinalität bezieht sich auf die Anzahl der eindeutigen Werte in einem Feld. Felder mit weniger eindeutigen Elementen werden als Felder mit geringer Kardinalität betrachtet.</p>
<p>Dieser Indextyp trägt dazu bei, die Abrufzeit skalarer Abfragen zu verringern, indem er Feldwerte in einem kompakten Binärformat darstellt und effiziente bitweise Operationen mit ihnen durchführt. Im Vergleich zu anderen Indextypen haben Bitmap-Indizes in der Regel eine höhere Speichereffizienz und schnellere Abfragegeschwindigkeiten, wenn es sich um Felder mit geringer Kardinalität handelt.</p>
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
    </button></h2><p>Der Begriff Bitmap setzt sich aus zwei Wörtern zusammen: <strong>Bit</strong> und <strong>Map</strong>. Ein Bit stellt die kleinste Dateneinheit in einem Computer dar, die nur einen Wert von <strong>0</strong> oder <strong>1</strong> annehmen kann. Eine Map bezieht sich in diesem Zusammenhang auf den Prozess der Umwandlung und Organisation von Daten entsprechend dem Wert, der 0 und 1 zugewiesen werden soll.</p>
<p>Ein Bitmap-Index besteht aus zwei Hauptkomponenten: Bitmaps und Schlüssel. Die Schlüssel stellen die eindeutigen Werte im indizierten Feld dar. Für jeden eindeutigen Wert gibt es eine entsprechende Bitmap. Die Länge dieser Bitmaps ist gleich der Anzahl der Datensätze in der Sammlung. Jedes Bit in der Bitmap entspricht einem Datensatz in der Sammlung. Wenn der Wert des indizierten Feldes in einem Datensatz mit dem Schlüssel übereinstimmt, wird das entsprechende Bit auf <strong>1</strong> gesetzt; andernfalls wird es auf <strong>0</strong> gesetzt.</p>
<p>Betrachten wir eine Sammlung von Dokumenten mit den Feldern <strong>Kategorie</strong> und <strong>Öffentlich</strong>. Wir möchten Dokumente abrufen, die in die Kategorie <strong>"Technik"</strong> fallen und für die <strong>Öffentlichkeit</strong> zugänglich sind. In diesem Fall sind die Schlüssel für unsere Bitmap-Indizes <strong>Tech</strong> und <strong>Public</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>Bitmap-Indizierung</span> </span></p>
<p>Wie in der Abbildung zu sehen ist, lauten die Bitmap-Indizes für <strong>Category</strong> und <strong>Public</strong>.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], was zeigt, dass nur das erste und dritte Dokument in die Kategorie <strong>Tech</strong> fallen.</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0], was bedeutet, dass nur das erste und das vierte Dokument <strong>öffentlich</strong> zugänglich sind.</p></li>
</ul>
<p>Um die Dokumente zu finden, die beiden Kriterien entsprechen, führen wir eine bitweise UND-Verknüpfung dieser beiden Bitmaps durch.</p>
<ul>
<li><strong>Tech</strong> AND <strong>Public</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>Die resultierende Bitmap [1, 0, 0, 0, 0] zeigt an, dass nur das erste Dokument<strong>(ID</strong> <strong>1</strong>) beide Kriterien erfüllt. Durch die Verwendung von Bitmap-Indizes und effizienten bitweisen Operationen können wir den Suchbereich schnell eingrenzen und müssen nicht den gesamten Datensatz durchsuchen.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Erstellen eines Bitmap-Index<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Um einen Bitmap-Index in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">create_index()</code> und setzen den Parameter <code translate="no">index_type</code> auf <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel erstellen wir einen Bitmap-Index für das Feld <code translate="no">category</code> der Sammlung <code translate="no">my_collection</code>. Die Methode <code translate="no">add_index()</code> wird verwendet, um den Feldnamen, den Indextyp und den Indexnamen anzugeben.</p>
<p>Sobald der Bitmap-Index erstellt ist, können Sie den Parameter <code translate="no">filter</code> in Abfrageoperationen verwenden, um eine skalare Filterung auf der Grundlage des indizierten Feldes durchzuführen. Auf diese Weise können Sie die Suchergebnisse mithilfe des Bitmap-Indexes effizient eingrenzen. Weitere Informationen finden Sie unter <ins>Filterung</ins>.</p>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Bitmap-Indizes werden nur für skalare Felder unterstützt, die keine Primärschlüssel sind.</p></li>
<li><p>Der Datentyp des Felds muss einer der folgenden sein.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (die Elemente müssen eines der folgenden sein: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Bitmap-Indizes unterstützen die folgenden Datentypen nicht.</p>
<ul>
<li><p><code translate="no">FLOAT</code> <code translate="no">DOUBLE</code>: Fließkomma-Typen sind nicht mit der binären Natur von Bitmap-Indizes kompatibel.</p></li>
<li><p><code translate="no">JSON</code>: JSON-Datentypen haben eine komplexe Struktur, die mit Bitmap-Indizes nicht effizient dargestellt werden kann.</p></li>
</ul></li>
<li><p>Bitmap-Indizes eignen sich nicht für Felder mit hoher Kardinalität (d. h. Felder mit einer großen Anzahl unterschiedlicher Werte).</p>
<ul>
<li><p>Als allgemeine Richtlinie gilt, dass Bitmap-Indizes am effektivsten sind, wenn die Kardinalität eines Feldes weniger als 500 beträgt.</p></li>
<li><p>Wenn die Kardinalität über diesen Schwellenwert hinausgeht, nehmen die Leistungsvorteile von Bitmap-Indizes ab, und der Speicher-Overhead wird erheblich.</p></li>
<li><p>Für Felder mit hoher Kardinalität sollten Sie je nach Anwendungsfall und Abfrageanforderungen alternative Indizierungstechniken wie z. B. invertierte Indizes in Betracht ziehen.</p></li>
</ul></li>
</ul>
<h3 id="Structural-Similarity" class="common-anchor-header">Strukturelle Ähnlichkeit</h3><p>Wenn eine chemische Struktur als Teil einer größeren chemischen Struktur auftritt, wird die erstere als Unterstruktur und die letztere als Überstruktur bezeichnet. Zum Beispiel ist Ethanol eine Unterstruktur von Essigsäure und Essigsäure ist eine Überstruktur von Ethanol.</p>
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
