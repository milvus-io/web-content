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
    </button></h1><p>In diesem Abschnitt wird der Bitset-Mechanismus vorgestellt, der wichtige Funktionen wie die Attributfilterung und <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">Löschvorgänge</a> in Milvus ermöglicht.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Bitset ist eine Menge von Bits. Bits sind Elemente mit nur zwei möglichen Werten, typischerweise „ <code translate="no">0</code> “ und „ <code translate="no">1</code> “ oder die booleschen Werte „ <code translate="no">true</code> “ und „ <code translate="no">false</code> “. In Milvus sind Bitsets Arrays aus Bit-Zahlen „ <code translate="no">0</code> “ und „ <code translate="no">1</code> “, mit denen bestimmte Daten kompakt und effizient dargestellt werden können – im Gegensatz zu „ints“, „floats“ oder „chars“. Eine Bitzahl ist standardmäßig „ <code translate="no">0</code> “ und wird nur dann auf „ <code translate="no">1</code> “ gesetzt, wenn sie bestimmte Anforderungen erfüllt.</p>
<p>Operationen auf Bitsets werden mit <a href="/docs/de/boolean.md">boolescher Logik</a> durchgeführt, bei der ein Ausgabewert entweder gültig oder ungültig ist, was auch jeweils mit „ <code translate="no">1</code> “ und „ <code translate="no">0</code> “ bezeichnet wird. Beispielsweise kann <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">der logische Operator</a> „ <code translate="no">AND</code> “ verwendet werden, um zwei Bitsets anhand von Elementen an denselben Indexpositionen zu vergleichen, und erzeugt ein neues Bitset mit den Ergebnissen. Sind zwei Elemente an einer Position identisch, wird im neuen Bitset an dieser Position „ <code translate="no">1</code> “ geschrieben; sind sie unterschiedlich, wird „ <code translate="no">0</code> “ geschrieben.</p>
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
    </button></h2><p>Bitsets sind ein einfacher, aber leistungsstarker Mechanismus, der Milvus dabei unterstützt, Attributfilterung, Datenlöschung und Abfragen mit „Time Travel“ durchzuführen.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Attributfilterung<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Da Bitsets nur zwei mögliche Werte enthalten, eignen sie sich perfekt zum Speichern der Ergebnisse der <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">Attributfilterung</a>. Daten, die die Anforderungen eines bestimmten Attributfilters erfüllen, werden mit „ <code translate="no">1</code> “ markiert.</p>
<h3 id="Data-deletion" class="common-anchor-header">Datenlöschung<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>Bitsets dienen als kompakte Möglichkeit, Informationen darüber zu speichern, ob eine Zeile in einem Segment gelöscht wurde. Gelöschte Entitäten werden im entsprechenden Bitset mit „ <code translate="no">1</code> “ markiert, wodurch <a href="https://milvus.io/blog/deleting-data-in-milvus.md">sie</a> bei einer Suche oder Abfrage <a href="https://milvus.io/blog/deleting-data-in-milvus.md">nicht berücksichtigt werden</a>.</p>
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
    </button></h2><p>Im Folgenden stellen wir drei Beispiele vor, die veranschaulichen, wie Bitsets in Milvus verwendet werden, wobei auf alle drei oben besprochenen Hauptimplementierungen von Bitsets Bezug genommen wird. In allen drei Fällen gibt es ein Segment mit 8 Entitäten, und anschließend findet eine Reihe von DML-Ereignissen (Data Manipulation Language) in der unten gezeigten Reihenfolge statt.</p>
<ul>
<li>Vier der Entitäten, deren „ <code translate="no">primary_key</code>s“ jeweils [1, 2, 3, 4] lauten, werden eingefügt, wenn der Zeitstempel „ <code translate="no">ts</code> “ den Wert 100 annimmt.</li>
<li>Die übrigen vier Entitäten, deren „ <code translate="no">primary_key</code>“-Werte [5, 6, 7, 8] lauten, werden eingefügt, wenn der Zeitstempel „ <code translate="no">ts</code> “ den Wert 200 annimmt.</li>
<li>Entitäten mit den „ <code translate="no">primary_key</code>“-Werten [7, 8] werden gelöscht, wenn der Zeitstempel <code translate="no">ts</code> den Wert 300 annimmt.</li>
<li>Nur Entitäten, deren „ <code translate="no">primary_key</code>“-Werte [1, 3, 5, 7] lauten, erfüllen die Bedingungen der Attributfilterung.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>Reihenfolge der DML-Ereignisse</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">Fall 1<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>In diesem Fall legt ein Benutzer „ <code translate="no">time_travel</code> “ auf 150 fest, was bedeutet, dass der Benutzer eine Abfrage zu Daten durchführt, die „ <code translate="no">ts = 150</code> “ erfüllen. Der Prozess der Bitsatz-Erzeugung ist in Abbildung 1 dargestellt.</p>
<p>Während der anfänglichen Filterphase sollte der Wert von „ <code translate="no">filter_bitset</code> “ <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> lauten, wobei die Entitäten [1, 3, 5, 7] als „ <code translate="no">1</code> “ markiert werden, da sie gültige Filterergebnisse sind.</p>
<p>Die Entitäten [5, 6, 7, 8] wurden jedoch nicht in die Vektordatenbank eingefügt, als <code translate="no">ts</code> den Wert 150 hatte. Daher sollten diese vier Entitäten unabhängig von der Filterbedingung mit 0 markiert werden. Nun sollte das Bitset-Ergebnis <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> lauten.</p>
<p>Wie im <a href="#data-deletion">Abschnitt „Datenlöschung“</a> erläutert, werden Entitäten, die mit „ <code translate="no">1</code> “ markiert sind, bei einer Suche oder Abfrage ignoriert. Das Bitset-Ergebnis muss nun umgekehrt werden, um mit der Lösch-Bitmap kombiniert zu werden, was uns <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ergibt.</p>
<p>Was das Lösch-Bitset <code translate="no">del_bitset</code> betrifft, sollte der Ausgangswert <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> lauten. Die Entitäten 7 und 8 werden jedoch erst gelöscht, wenn <code translate="no">ts</code> den Wert 300 annimmt. Wenn also <code translate="no">ts</code> den Wert 150 annimmt, sind die Entitäten 7 und 8 noch gültig. Folglich lautet der Wert von <code translate="no">del_bitset</code> nach der Zeitreise <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Nun haben wir nach „Time Travel“ und der Attributfilterung zwei Bitsets: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> und <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Kombinieren Sie diese beiden Bitsets mit dem binären Logikoperator „ <code translate="no">OR</code> “. Der endgültige Wert von „result_bitset“ ist <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, was bedeutet, dass in der folgenden Such- oder Abfragephase nur die Entitäten 1 und 3 berechnet werden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>Abbildung 1. Suche mit „Time Travel“ = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">Fall 2<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>In diesem Fall legt der Benutzer „ <code translate="no">time_travel</code> “ auf 250 fest. Der Prozess der Bitsatz-Erzeugung ist in Abbildung 2 dargestellt.</p>
<p>Wie in Fall eins lautet der anfängliche Wert für „ <code translate="no">filter_bitset</code> “ <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Alle Entitäten befinden sich in der Vektordatenbank, wenn <code translate="no">ts</code> = 250 ist. Daher bleibt <code translate="no">filter_bitset</code> unverändert, wenn wir den Zeitstempel berücksichtigen. Auch hier müssen wir das Ergebnis umkehren und erhalten <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Was das Lösch-Bitset <code translate="no">del_bitset</code> betrifft, so ist der Ausgangswert <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Die Entitäten 7 und 8 wurden jedoch erst gelöscht, als <code translate="no">ts</code> den Wert 300 erreichte. Wenn also <code translate="no">ts</code> den Wert 250 hat, sind die Entitäten 7 und 8 noch gültig. Folglich lautet das <code translate="no">del_bitset</code> nach der Zeitreise <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Nun haben wir nach „Time Travel“ und der Attributfilterung zwei Bitsets: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> und <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Kombinieren Sie diese beiden Bitsets mit dem binären Logikoperator „ <code translate="no">OR</code> “. Das result_bitset lautet <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Das bedeutet, dass in der folgenden Such- oder Abfragephase nur die Entitäten [1, 3, 5, 7] berechnet werden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>Abbildung 2. Suche mit „Time Travel“ = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">Fall drei<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>In diesem Fall legt der Benutzer „ <code translate="no">time_travel</code> “ auf 350 fest. Der Prozess der Bitsatz-Erzeugung wird in Abbildung 3 veranschaulicht.</p>
<p>Wie in den vorherigen Fällen lautet der anfängliche Wert für „ <code translate="no">filter_bitset</code> “ <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Alle Entitäten befinden sich in der Vektordatenbank, wenn <code translate="no">ts</code>= 350 ist. Daher lautet das endgültige, umgekehrte <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> , genau wie in Fall zwei.</p>
<p>Was das Lösch-Bitset „ <code translate="no">del_bitset</code> “ betrifft: Da die Entitäten 7 und 8 bereits gelöscht wurden, als „ <code translate="no">ts = 350</code> “ galt, lautet das Ergebnis von „ <code translate="no">del_bitset</code> “ „ <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> “.</p>
<p>Nun haben wir nach „Time Travel“ und der Attributfilterung zwei Bitsätze: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> und <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Kombinieren Sie diese beiden Bitsätze mit dem binären Logikoperator „ <code translate="no">OR</code> “. Das endgültige Ergebnis von „ <code translate="no">result_bitset</code> “ lautet <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Das bedeutet, dass in der folgenden Such- oder Abfragephase nur die Entitäten [1, 3, 5] berechnet werden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>Abbildung 3. Suche mit „Time Travel“ = 350.</span>
  
 </span></p>
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
    </button></h2><p>Nachdem Sie nun wissen, wie Bitsets in Milvus funktionieren, möchten Sie vielleicht auch:</p>
<ul>
<li>Erfahren Sie, wie Sie <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">Zeichenfolgen zum Filtern</a> Ihrer Suchergebnisse <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">verwenden</a> können, oder lesen Sie den Abschnitt <a href="https://milvus.io/docs/hybridsearch.md">„Hybrid Search“</a> in unserer Dokumentation.</li>
<li>Verstehen, <a href="https://milvus.io/docs/v2.1.x/data_processing.md">wie Daten</a> in Milvus <a href="https://milvus.io/docs/v2.1.x/data_processing.md">verarbeitet werden</a>.</li>
</ul>
