---
id: membership-match.md
title: Mitglieder-MatchCompatible with Milvus v3.0.2+
summary: >-
  Filtern Sie Entitäten anhand großer Mitgliedermengen mithilfe kompakter
  Bloom-Filter oder exakter Roaring-Bitmaps – einschließlich Syntax,
  SDK-Anfragemustern, Löschsemantik und Betriebsgrenzen.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Mitglieder-Match<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Membership-Match-Filter filtert Entitäten, indem er prüft, ob der Wert eines Skalarfelds zu einer vom Aufrufer bereitgestellten Menge gehört. Der Client erstellt einen kompakten binären Membership-Filter-Blob und übergibt diesen als Wert für eine Ausdrucksvorlage.</p>
<p>Dies ersetzt umfangreiche „ <code translate="no">IN [...]</code> “-Listen. Ein „ <code translate="no">IN</code> “-Filter serialisiert jedes Element in die Anfrage, sodass ausreichend große Elementmengen das gRPC-Empfangslimit des Proxys überschreiten können. Mit „ <code translate="no">membership_match</code> “ validiert der Proxy den Blob und bindet ihn in den Abfrageplan ein, ohne eine Elementliste neu zu erstellen.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Ablauf des „Membership Match“-Workflows: Der Client erstellt einen wiederverwendbaren Blob, der Proxy validiert ihn und die QueryNodes werten ihn aus.</span>
  
 </span></p>
<p>Das Diagramm zeigt die festgelegte Arbeitsteilung. Der Client erstellt den Blob einmalig und verwendet ihn für mehrere Anfragen wieder; der Proxy überprüft die Ummantelung und die Größenbeschränkungen und bettet den Blob unverändert in den Abfrageplan ein; und die QueryNodes werten den Plan anhand von Rohdaten oder eines Indexes aus.</p>
<p>Der Operator verfügt über zwei Kodierungen mit unterschiedlichen Korrektheitsgarantien:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): Ungefähre Zugehörigkeit. Falsch-positive Ergebnisse sind möglich; bei einem gültigen Filter sind keine falsch-negativen Ergebnisse zu erwarten. Typische Anwendung: Filter für große Zielgruppen oder Ausschlussfilter, bei denen gelegentliche falsch-positive Ergebnisse akzeptabel sind.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): Exakte Zugehörigkeit für ganzzahlige Werte. Typische Anwendung: ACLs, Mandantensichtbarkeit, Compliance-Filter und Löschvorgänge nach ID-Sätzen.</li>
</ul>
<p>Verwenden Sie <strong>die Bloom-</strong> Zugehörigkeit nicht für Autorisierungsentscheidungen oder destruktive Löschvorgänge. Ein falsch-positiver Treffer kann eine Entität offenlegen oder eine Entität löschen, die nicht zur beabsichtigten Menge gehört.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Checkliste für den Betrieb<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Überprüfen Sie den Typ des Zielfelds und erstellen Sie den Blob aus derselben Wertedomäne.</li>
<li>Wählen Sie „Bloom“ nur dann aus, wenn Fehlalarme akzeptabel sind.</li>
<li>Wählen Sie „Roaring“ für ACL-, Compliance-, Mandantenisolierungs- und Löschvorgänge.</li>
<li>Erstellen Sie große Blobs einmalig und verwenden Sie sie wieder; erstellen Sie sie nicht bei jeder Anfrage neu.</li>
<li>Planen Sie die Blob-Größe in serialisierten Bytes ein, nicht anhand der Anzahl der Elemente.</li>
<li>Schließen Sie in einem Cluster mit gemischten Versionen zunächst das rollierende Upgrade ab (zuerst die Proxys), bevor Sie „ <code translate="no">membership_match</code> “ aktivieren.</li>
<li>Testen Sie den Ausdruck an einer Nicht-Produktionssammlung, bevor Sie einen destruktiven Workflow aktivieren.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Syntax des Ausdrucks<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>Das zweite Argument ist ein Platzhalter in der Vorlage. Das SDK stellt den Platzhalterwert als Protobuf- <code translate="no">bytes</code> bereit, der den vom Client erstellten Filter-Blob enthält. Halten Sie den <code translate="no">type</code> in Produktionsausdrücken explizit, damit der beabsichtigte Korrektheitsvertrag im Code und in den Protokollen sichtbar ist.</p>
<p>Das Argument „ <code translate="no">type</code> “ ist optional. Jeder Blob enthält einen selbstbeschreibenden Magic-Header – „ <code translate="no">MBF1</code> “ für Bloom und „ <code translate="no">MRB1</code> “ für Roaring – und der Server liest diesen Header aus, wenn „ <code translate="no">type</code> “ weggelassen wird. Ein expliziter „ <code translate="no">type</code> “, der mit dem Blob-Header in Konflikt steht, wird als Anforderungsfehler abgelehnt, und unbekannte oder abgeschnittene Header führen zu einem „Fail-Closed“-Zustand.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Wählen Sie die Kodierung<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „Bloom“, wenn ein Fehlalarm akzeptabel ist. „Bloom“ akzeptiert Felder mit vorzeichenbehafteten Ganzzahlen (<strong>INT8/16/32/64</strong>), <strong>VARCHAR-Felder</strong> und <strong>JSON-Pfade</strong>. Ein Bloom-Filter ist keine exakte Zulassungsliste.</p>
<p><code translate="no">fpr</code> (Falsch-Positiv-Rate) ist die Wahrscheinlichkeit, dass ein Bloom-Filter einen Wert als Element meldet, obwohl dieser Wert nie eingefügt wurde: „ <code translate="no">fpr=0.005</code> “ bedeutet, dass etwa einer von 200 Nicht-Element-Werten fälschlicherweise als vorhanden gemeldet wird. Eine niedrigere FPR erzeugt einen größeren Blob.</p>
<p>Verwenden Sie <strong>„Roaring“</strong>, wenn jede Übereinstimmung exakt sein muss. <strong>„Roaring“</strong> akzeptiert nur vorzeichenbehaftete Ganzzahlfelder; Elemente werden vor der Serialisierung auf <strong>INT64</strong> vorzeichenverlängert, sodass ein INT8 mit dem Wert -1 und ein INT64 mit dem Wert -1 dasselbe Element darstellen. Verwenden Sie diese Option nicht für UUIDs oder andere Zeichenfolgenfelder.</p>
<table>
<thead>
<tr><th>Dimension</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Genauigkeit</td><td>Ungefähr; falsch-positive Ergebnisse möglich; keine falsch-negativen Ergebnisse</td><td>Exakt; keine falsch-positiven und keine falsch-negativen Ergebnisse</td></tr>
<tr><td>Felder</td><td>INT8/16/32/64, VARCHAR, JSON-Pfade</td><td>Nur vorzeichenbehaftete INT8/16/32/64</td></tr>
<tr><td>Blob-Größe</td><td>Anzahl der Elemente und FPR; ca. 11 Bit pro Element bei einem FPR von 0,005; Körper als Zweierpotenz</td><td>Wertverteilung; dichte Mengen lassen sich auf weitaus kleinere Größen komprimieren; zufällige 64-Bit-Werte erreichen die Obergrenze des High-Containers von 262.144</td></tr>
<tr><td>Löschen</td><td>Wird beim Parsen abgelehnt</td><td>Zulässig</td></tr>
<tr><td>Typische Verwendung</td><td>Zielgruppen- und Ausschlussfilter</td><td>ACL, Compliance, Mandantenisolierung, Löschen nach ID-Satz</td></tr>
</tbody>
</table>
<p><strong>JSON-Pfade</strong> sind streng typisiert, Zeile für Zeile: Eine <strong>JSON</strong> -Zeichenkette wird als <strong>VARCHAR-</strong> Wert ausgewertet, eine <strong>JSON</strong> -Ganzzahl als <strong>INT64-</strong> Wert, und ein <strong>JSON-Double</strong> entspricht niemals einem ganzzahligen Element – im Gegensatz zur exakten „ <code translate="no">IN</code> “, bei der 5,0 gleich 5 ist. Wenn Ihre Schreiboperationen Ganzzahlen als Float-Werte kodieren, normalisieren Sie diese beim Schreiben oder verwenden Sie ein typisiertes Skalarfeld.</p>
<p>Erstellen Sie bei beiden Kodierungen die Elementmenge aus derselben Wertedomäne wie das Zielfeld. Erstellen Sie keinen Bloom-Filter aus der Zeichenfolgen- <code translate="no">&quot;10086&quot;</code> und wenden Sie diesen nicht auf ein „ <code translate="no">INT64</code> “-Feld an. Der Blob-Header protokolliert die eingefügten Wertdomänen, und ein Blob mit falscher Domäne wird vom Proxy mit einem Parameterfehler abgelehnt, anstatt stillschweigend keine Übereinstimmung zu finden. Verwenden Sie einen erstellten Blob über mehrere Anfragen hinweg wieder, anstatt ihn für jede Abfrage neu zu erstellen.</p>
<p>Für Mengen mit wenigen tausend Elementen oder weniger bleibt die einfache „ <code translate="no">IN</code> “-Methode die einfachste Option. Der Server wählt nicht zwischen <strong>„IN“</strong>, <strong>„Bloom“</strong> und <strong>„Roaring“</strong> aus. Die Auswahl der Kodierung liegt in der Verantwortung des Aufrufers.</p>
<p>So wählen Sie eine Kodierung aus:</p>
<ol>
<li>Stellen Sie fest, ob die Arbeitslast Fehlalarme toleriert. Ist dies nicht der Fall, kommt <strong>„Bloom“</strong> niemals in Frage.</li>
<li>Für eine exakte Mitgliedschaft verwenden Sie <strong>„Roaring“</strong> mit einem Feld für vorzeichenbehaftete Ganzzahlen. Dichte oder gruppierte Werte lassen sich zu den kleinsten Blobs komprimieren.</li>
<li>Prüfen Sie die Größenbeschränkungen. Gleichmäßig zufällige 64-Bit-Werte können die Obergrenze von 262.144 für High-Container oder die Größenbeschränkungen überschreiten. Ist dies der Fall, verwenden Sie eine herkömmliche <strong>IN</strong> -Liste, die den Anforderungsgrenzen entspricht.</li>
<li>Für die exakte Mitgliedschaft bei nicht-ganzzahligen Feldern verwenden Sie <strong>„IN</strong>“. Für diese Felder gibt es keine Kodierung für die exakte Mitgliedschaft.</li>
</ol>
<p>Die Mitgliedschaftsabgleichfunktion ist über die RESTful-HTTP-API nicht verfügbar. Parameter in HTTP-Ausdrucksvorlagen akzeptieren nur Werte vom Typ „bool“, „number“, „string“ und „array“; es gibt keinen binären Typ „ <code translate="no">bytes</code> “ für den Blob. Verwenden Sie ein gRPC-basiertes SDK, um Mitgliedschafts-Blobs zu übergeben.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">SDK-Anfragemuster<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgenden Codeausschnitte konzentrieren sich auf die Erstellung von Mitgliedschafts-Blobs und deren Übergabe als Filtervorlagenparameter. Sie setzen voraus, dass die Sammlungen und Felder bereits vorhanden und geladen sind, die SDK-Clients verbunden sind und Abfragevektoren, Mitgliederlisten sowie andere referenzierte Variablen definiert sind. Die Einrichtung der Sammlungen und das vollständige Anwendungsgerüst werden ausgelassen.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Löschen mit Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie beim Löschen von Entitäten, die durch eine externe Ganzzahl-ID-Menge ausgewählt wurden, einen exakten <strong>„Roaring“-Blob</strong>. Überprüfen Sie die Mitgliedermenge und den Feldtyp der Sammlung, bevor Sie den Löschbefehl ausführen. Verwenden Sie kein Bloom: Eine ungefähre Zugehörigkeit ist kein sicheres Löschprädikat, und Bloom-Formen werden in Löschausdrücken bereits bei der Analyse abgelehnt.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>Die Löschsemantik folgt einer exakten, dreipoligen Übereinstimmung:</p>
<table>
<thead>
<tr><th>Feldwert</th><th>membership_match(…)</th><th>nicht membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>kein Abgleich (NULL)</td><td>keine Übereinstimmung (NULL)</td></tr>
<tr><td>in der Mitgliedermenge</td><td>Übereinstimmung</td><td>keine Übereinstimmung</td></tr>
<tr><td>außerhalb der Menge</td><td>keine Übereinstimmung</td><td>Übereinstimmung</td></tr>
</tbody>
</table>
<p>Die Tabelle lässt sich Zeile für Zeile wie folgt interpretieren: Ein „Delete“ mit „ <code translate="no">membership_match</code> “ entfernt die Entitäten innerhalb der Menge, ein „Delete“ mit „ <code translate="no">not membership_match</code> “ entfernt die Entitäten außerhalb der Menge, und NULL-Entitäten bleiben bei beiden Polaritäten erhalten.</p>
<ul>
<li>Entitäten mit einem NULL-Feldwert werden unter keiner der beiden Polaritäten gelöscht.</li>
<li>Eine leere Bitmap löscht nichts. „ <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> “ löscht jede Entität mit einem Nicht-NULL-Feldwert – das exakte Komplement, das je nach Design eine große Menge sein kann.</li>
<li><code translate="no">not membership_match</code> ist das exakte Komplement der Elementmenge über Nicht-NULL-Entitäten, keine Annäherung.</li>
</ul>
<p>Bei versiegelten Segmenten, die indexbasiert geladen werden und keine rohen Skalardaten enthalten, erfolgt die Auswertung mittels einer begrenzten Rückwärtssuche, sofern der Index dies unterstützt. Sind weder rohe Felddaten noch ein geeigneter Index verfügbar, schlägt die Anfrage mit „ <code translate="no">FieldNotLoaded</code> “ fehl, anstatt ungefilterte Entitäten zurückzugeben.</p>
<h2 id="Operational-limits" class="common-anchor-header">Operative Einschränkungen<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Einstellung</th><th>Standard</th><th>Konfigurierbar</th><th>Was wird begrenzt</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> Proxy</td><td>ein Blob-Inhalt</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> Proxy</td><td>Aggregat pro Anfrage</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> Proxy</td><td>gesamte Anfrage</td></tr>
<tr><td>Roaring High-Container-Obergrenze</td><td>262.144</td><td>im Code festgelegt</td><td>pro Filter</td></tr>
<tr><td>Geschätzter Speicherbedarf für „Roaring Decoded“</td><td>64 MiB</td><td>im Code festgelegt</td><td>pro Filter</td></tr>
<tr><td>MBF1-Format-Obergrenze</td><td>128 MiB</td><td>im Code festgelegt</td><td>Obergrenze des Blob-Formats</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0,005</td><td>Client-Builder</td><td>Zielwert für Falsch-Positive</td></tr>
</tbody>
</table>
<p>Die Einstellungen unter „ <code translate="no">proxy.*</code> “ sind Teil der Milvus-Serverkonfiguration: Sie werden vom Cluster-Betreiber unter „ <code translate="no">milvus.yaml</code> “ im Abschnitt „ <code translate="no">proxy</code> “ festgelegt und können zum Zeitpunkt der Filterung nicht pro Anfrage oder pro Ausdruck angepasst werden. Die <strong>„Roaring</strong> Admissions“ und die Obergrenze für das MBF1-Format sind in der Implementierung fest vorgegeben und können nirgendwo konfiguriert werden. Die Zeile „ <code translate="no">fpr</code> “ ist die einzige clientseitige Steuerungsmöglichkeit: Sie wird beim Erstellen des Blobs ausgewählt, wobei der zulässige Bereich zwischen 0,0001 und 0,05 liegt.</p>
<p>Der Blob-Körper fasst bei der Standard-FPR maximal etwa 48,6 Millionen INT64-Elemente, wobei der feste 32-Byte-Envelope-Header zusätzlich zulässig ist. Das anfrageweite Budget deckt die aggregierte serialisierte Größe der Mitgliederlisten sowie die aggregierte geschätzte dekodierte Größe der Roaring-Filter ab; HybridSearch-Unteranfragen und Scorer-Filter teilen sich dieses Budget. Bloom-Körper sind Zweierpotenzen: Eine Mitgliederanzahl, die knapp über einer Stufengrenze liegt, verdoppelt den Blob, und eine etwas höhere FPR passt oft in die nächstniedrigere Stufe. Wenn der Proxy einen übergroßen Bloom-Blob ablehnt, schlägt der Fehler eine passende „ <code translate="no">fpr</code> “ vor.</p>
<ul>
<li>Die Ergebnisse von Mitgliedschaftsausdrücken werden nicht über mehrere Abfragen hinweg zwischengespeichert.</li>
<li>Cluster mit gemischten Versionen schlagen fehl: QueryNodes, auf denen älterer Code läuft, lehnen Pläne ab, die Knoten des Mitgliedschaftsplans enthalten. Aktualisieren Sie zuerst die Proxys und schließen Sie dann das rollierende Upgrade ab, bevor Sie den Operator aktivieren.</li>
<li>Serverprotokolle schwächen Blob-Bytes ab. Der Ausdruckstext enthält nur den Vorlagennamen; die binäre Nutzlast wird außerhalb des Bandes in den Vorlagenwerten übertragen.</li>
</ul>
