---
id: bitset.md
summary: Erfahren Sie mehr über Bitsets in Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird der Bitset-Mechanismus vorgestellt, der wichtige Funktionen wie das Filtern von Attributen und <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">Löschvorgänge</a> in Milvus ermöglicht.</p>
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
    </button></h2><p>Ein Bitset ist eine Menge von Bits. Bits sind Elemente mit nur zwei möglichen Werten, typischerweise <code translate="no">0</code> und <code translate="no">1</code>, oder boolesche Werte <code translate="no">true</code> und <code translate="no">false</code>. In Milvus sind Bitsets Arrays von Bit-Zahlen <code translate="no">0</code> und <code translate="no">1</code>, die verwendet werden können, um bestimmte Daten kompakt und effizient zu repräsentieren, im Gegensatz zu Ints, Floats oder Chars. Eine Bitnummer ist standardmäßig <code translate="no">0</code> und wird nur dann auf <code translate="no">1</code> gesetzt, wenn sie bestimmte Anforderungen erfüllt.</p>
<p>Operationen auf Bitmengen werden mit <a href="/docs/de/v2.4.x/boolean.md">boolescher Logik</a> durchgeführt, bei der ein Ausgabewert entweder gültig oder ungültig ist, was auch mit <code translate="no">1</code> bzw. <code translate="no">0</code> bezeichnet wird. Beispielsweise kann der <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">logische Operator</a> <code translate="no">AND</code> verwendet werden, um zwei Bitsets auf der Grundlage von Elementen in denselben Indexpositionen zu vergleichen und ein neues Bitset mit den Ergebnissen zu erzeugen. Wenn zwei Elemente an einer Position gleich sind, wird in der neuen Bitmenge <code translate="no">1</code> an diese Position geschrieben; <code translate="no">0</code>, wenn sie unterschiedlich sind.</p>
<h2 id="Implementation" class="common-anchor-header">Implementierung<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bitset ist ein einfacher, aber leistungsfähiger Mechanismus, der Milvus hilft, Attributfilterung, Datenlöschung und Abfragen mit Time Travel durchzuführen.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Attribut-Filterung</h3><p>Da Bitsets nur zwei mögliche Werte enthalten, sind sie perfekt für die Speicherung von Ergebnissen der <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">Attributfilterung</a> geeignet. Daten, die die Anforderungen eines bestimmten Attributfilters erfüllen, werden mit <code translate="no">1</code> markiert.</p>
<h3 id="Data-deletion" class="common-anchor-header">Löschung von Daten</h3><p>Bitsets dienen als kompakte Möglichkeit, Informationen darüber zu speichern, ob eine Zeile in einem Segment gelöscht wurde. Gelöschte Entitäten werden mit <code translate="no">1</code> im entsprechenden Bitset markiert, das während einer Suche oder Abfrage <a href="https://milvus.io/blog/deleting-data-in-milvus.md">nicht berechnet wird</a>.</p>
<h2 id="Examples" class="common-anchor-header">Beispiele<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Hier stellen wir drei Beispiele vor, die zeigen, wie Bitsets in Milvus verwendet werden, mit Verweisen auf alle drei oben erwähnten Hauptimplementierungen von Bitsets. In allen drei Fällen gibt es ein Segment mit 8 Entitäten, und dann findet eine Reihe von DML-Ereignissen (Data Manipulation Language) in der unten dargestellten Reihenfolge statt.</p>
<ul>
<li>Vier der Entitäten, deren <code translate="no">primary_key</code>jeweils [1, 2, 3, 4] sind, werden eingefügt, wenn der Zeitstempel <code translate="no">ts</code> gleich 100 ist.</li>
<li>Die restlichen vier Entitäten, deren <code translate="no">primary_key</code>s [5, 6, 7, 8] lauten, werden eingefügt, wenn der Zeitstempel <code translate="no">ts</code> gleich 200 ist.</li>
<li>Entitäten, deren <code translate="no">primary_key</code>s [7, 8] sind, werden gelöscht, wenn der Zeitstempel <code translate="no">ts</code> gleich 300 ist.</li>
<li>Nur Entitäten, deren <code translate="no">primary_key</code>s [1, 3, 5, 7] sind, erfüllen die Bedingungen der Attributfilterung.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Reihenfolge der DML-Ereignisse</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Fall eins</h3><p>In diesem Fall setzt ein Benutzer <code translate="no">time_travel</code> auf 150, was bedeutet, dass der Benutzer eine Abfrage auf Daten durchführt, die <code translate="no">ts = 150</code> erfüllen. Der Prozess der Bitset-Generierung ist in Abbildung 1 dargestellt.</p>
<p>Während der anfänglichen Filterungsphase sollte <code translate="no">filter_bitset</code> <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> sein, wobei die Entitäten [1, 3, 5, 7] als <code translate="no">1</code> markiert sind, da sie gültige Filterungsergebnisse sind.</p>
<p>Die Entitäten [4, 5, 6, 7] wurden jedoch nicht in die Vektordatenbank eingefügt, wenn <code translate="no">ts</code> gleich 150 ist. Daher sollten diese vier Entitäten unabhängig von der Filterungsbedingung als 0 markiert werden. Das Bitset-Ergebnis sollte nun <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> lauten.</p>
<p>Wie in <a href="#data-deletion">Datenlöschung</a> beschrieben, werden Entitäten, die mit <code translate="no">1</code> markiert sind, bei einer Suche oder Abfrage ignoriert. Das Bitset-Ergebnis muss nun umgedreht werden, um mit der Lösch-Bitmap kombiniert zu werden, was uns <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ergibt.</p>
<p>Wie bei der Lösch-Bitmap <code translate="no">del_bitset</code> sollte der Anfangswert <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> sein. Die Entitäten 7 und 8 werden jedoch erst gelöscht, wenn <code translate="no">ts</code> 300 ist. Wenn <code translate="no">ts</code> den Wert 150 hat, sind die Entitäten 7 und 8 daher noch gültig. Folglich ist der Wert von <code translate="no">del_bitset</code> nach der Zeitreise <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Jetzt haben wir zwei Bitsets nach der Zeitreise und der Attributfilterung: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> und <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Kombinieren Sie diese beiden Bitsätze mit dem binären Logikoperator <code translate="no">OR</code>. Der endgültige Wert von result_bitset ist <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, was bedeutet, dass nur die Entitäten 1 und 3 in der folgenden Such- oder Abfragephase berechnet werden.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Abbildung 1. Suche mit Zeitreise = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Fall zwei</h3><p>In diesem Fall setzt der Benutzer <code translate="no">time_travel</code> auf 250. Der Prozess der Bitset-Generierung ist in Abbildung 2 dargestellt.</p>
<p>Wie im ersten Fall ist die anfängliche <code translate="no">filter_bitset</code> gleich <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Alle Entitäten befinden sich in der Vektordatenbank, wenn <code translate="no">ts</code> = 250 ist. Daher bleibt <code translate="no">filter_bitset</code> gleich, wenn wir den Zeitstempel mit einbeziehen. Auch hier müssen wir das Ergebnis umdrehen und erhalten <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Für die Lösch-Bitmenge <code translate="no">del_bitset</code> ist der Anfangswert <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Die Entitäten 7 und 8 wurden jedoch erst gelöscht, als <code translate="no">ts</code> 300 war. Wenn <code translate="no">ts</code> den Wert 250 hat, sind die Entitäten 7 und 8 daher noch gültig. Daraus ergibt sich, dass <code translate="no">del_bitset</code> nach der Zeitreise <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> ist.</p>
<p>Jetzt haben wir zwei Bitsets nach der Zeitreise und der Attributfilterung: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> und <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Kombinieren Sie diese beiden Bitsätze mit dem binären Logikoperator <code translate="no">OR</code>. Die Ergebnis-Bitmenge ist <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Das bedeutet, dass in der folgenden Such- oder Abfragestufe nur die Entitäten [1, 3, 5, 7] berechnet werden.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Abbildung 2. Suche mit Zeitreise = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Fall drei</h3><p>In diesem Fall setzt der Benutzer <code translate="no">time_travel</code> auf 350. Der Prozess der Bitset-Generierung ist in Abbildung 3 dargestellt.</p>
<p>Wie in den vorherigen Fällen ist die anfängliche <code translate="no">filter_bitset</code> gleich <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Wenn <code translate="no">ts</code>= 350 ist, befinden sich alle Entitäten in der Vektordatenbank. Daher ist die endgültige, umgedrehte <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> , genau wie im zweiten Fall.</p>
<p>Was die Lösch-Bitmenge <code translate="no">del_bitset</code> betrifft, so sind die Entitäten 7 und 8 bereits bei <code translate="no">ts = 350</code> gelöscht worden, so dass das Ergebnis von <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> ist.</p>
<p>Nun haben wir zwei Bitsets nach Time Travel und Attributfilterung: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> und <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Kombinieren Sie diese beiden Bitsätze mit dem binären Logikoperator <code translate="no">OR</code>. Das ultimative <code translate="no">result_bitset</code> ist <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Das bedeutet, dass in der folgenden Such- oder Abfragestufe nur die Entitäten [1, 3, 5] berechnet werden.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Abbildung 3. Suche mit Zeitreise = 350</span>. </span></p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Jetzt, wo Sie wissen, wie Bitsets in Milvus funktionieren, möchten Sie vielleicht auch:</p>
<ul>
<li>Lernen Sie, wie Sie Ihre Suchergebnisse <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">mit Hilfe von Strings filtern</a> können, oder lesen Sie den Abschnitt <a href="https://milvus.io/docs/hybridsearch.md">Hybrid Search</a> in unseren Dokumentationen.</li>
<li>Verstehen, <a href="https://milvus.io/docs/v2.1.x/data_processing.md">wie Daten</a> in Milvus <a href="https://milvus.io/docs/v2.1.x/data_processing.md">verarbeitet werden</a>.</li>
</ul>
