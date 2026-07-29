---
id: search-aggregation.md
title: SuchaggregationCompatible with Milvus 3.0.x
summary: >-
  Die Ergebnisse der Vektorsuche werden in Buckets gruppiert, Metriken pro
  Bucket berechnet, die Buckets sortiert und repräsentative Treffer
  zurückgegeben.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Suchaggregation<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Wenn ein Käufer nach „schwarzen Laufschuhen für das tägliche Training“ sucht, ordnet die Annäherungsnachbarschaftssuche (ANN) die Produkte nach Vektorähnlichkeit und liefert eine flache Top-K-Liste. Die Ergebnisse können zwar relevant, aber auch repetitiv sein: Im folgenden Beispiel stammen vier der ersten sechs Ergebnisse von Marke A, während Marke B und Marke C jeweils nur einmal vorkommen.</p>
<p>Eine flache Liste kann keine bucket-orientierte Zusammenfassung liefern. Eine Anwendung muss möglicherweise Marken anhand der Anzahl der beibehaltenen Kandidaten oder des Durchschnittspreises vergleichen, eine kleine Anzahl repräsentativer Produkte jeder Marke untersuchen oder die Ergebnisse in mehrere Bucket-Ebenen organisieren.</p>
<p>Die Suchaggregation ordnet die beibehaltenen ANN-Kandidaten anhand ausgewählter Skalarfelder in Buckets ein. In diesem Beispiel wird jede Marke zu einem separaten Bucket. Milvus kann Statistiken für jeden Bucket berechnen, die Buckets ordnen und repräsentative Produkte zuordnen. Die Anwendung nutzt diese „Bucket-First“-Antwort über „ <code translate="no">result.agg_buckets</code> “.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Ein flaches Suchergebnis für Laufschuhe wird zu einer Reihe vergleichbarer Marken-Buckets</span>
  
 </span></p>
<p>Die Suchaggregation führt keine exakte Aggregation der gesamten Sammlung durch. Das Vorhandensein von Buckets, deren Anzahl, Metriken, Reihenfolge und repräsentative Treffer hängen von den Kandidaten ab, die in den ANN- und Gruppierungsphasen beibehalten wurden.</p>
<h2 id="How-it-works" class="common-anchor-header">So funktioniert es<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>ANN-Kandidaten, gruppiert nach Bucket-Schlüsseln und zurückgegeben mit Anzahlen, Metriken und repräsentativen Treffern</span>
  
 </span></p>
<ol>
<li><p><strong>Kandidaten abrufen.</strong> Milvus führt eine ANN-Suche durch, um die Entitäten zu finden, die dem Abfragevektor am nächsten liegen. Die Gruppierungsphase behält dann für jeden vollständigen zusammengesetzten Schlüssel eine begrenzte Anzahl von Kandidaten bei. Dieses Kandidatenkontingent pro Schlüssel entspricht dem größten Wert von „ <code translate="no">TopHits.size</code> “ an beliebiger Stelle im Aggregationsbaum oder dem Wert „ <code translate="no">1</code> “, wenn keine Ebene „ <code translate="no">top_hits</code> “ konfiguriert hat.</p></li>
<li><p><strong>Bucket-Erstellung.</strong> „ <code translate="no">SearchAggregation.fields</code> “ definiert den Bucket-Schlüssel. Jede eindeutige Kombination von Feldwerten erzeugt einen separaten Schlüssel. In der Abbildung erzeugt „ <code translate="no">fields=[&quot;brand&quot;]</code> “ die Bucket-Schlüssel „ <code translate="no">(Brand A)</code> “, „ <code translate="no">(Brand B)</code> “ und „ <code translate="no">(Brand C)</code> “. Beibehaltene Kandidaten mit demselben Schlüssel gehören zum selben Bucket und tragen zu dessen „ <code translate="no">count</code> “ bei. „ <code translate="no">SearchAggregation.size</code> “ begrenzt die Anzahl der von Milvus zurückgegebenen Buckets.</p></li>
<li><p><strong>Berechnung und Rückgabe der Ergebnisse.</strong> Jeder zurückgegebene Bucket enthält seinen Schlüssel und die Anzahl der beibehaltenen Kandidaten. Milvus kann außerdem konfigurierte Metriken berechnen, die Buckets sortieren, repräsentative Entitäten zurückgeben und untergeordnete Buckets erstellen. Jeder „ <code translate="no">AggregationBucket</code> “ unter <code translate="no">result.agg_buckets</code> stellt „ <code translate="no">key</code> “, „ <code translate="no">count</code> “, „ <code translate="no">metrics</code> “, „ <code translate="no">hits</code> “ und „ <code translate="no">sub_groups</code> “ bereit. Wenn die Suchaggregation aktiviert ist, ist die normale Suchtrefferliste leer.</p></li>
</ol>
<p>In der Abbildung stellt „ <code translate="no">TopHits.size=4</code> “ ein Kandidatenbudget von vier pro Schlüssel bereit, sodass die vier beibehaltenen Kandidaten der Marke A die Ergebnisse „ <code translate="no">count: 4</code> “ liefern. Die fertige Karte für Marke A zeigt nur zwei der vier zurückgegebenen repräsentativen Treffer, um die Darstellung übersichtlich zu halten.</p>
<p>Bei „ <code translate="no">sub_aggregation</code> “ wiederholt Milvus die Schritte 2 und 3 innerhalb jedes übergeordneten Buckets. Änderungen am ANN-Recall oder am Kandidatenbudget pro Schlüssel können die Anzahl der Buckets, Metriken, Reihenfolge, Treffer und verschachtelten Ergebnisse beeinflussen.</p>
<h2 id="Limits" class="common-anchor-header">Einschränkungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie die Suchaggregation verwenden, beachten Sie bitte die folgenden Einschränkungen:</p>
<ul>
<li><p><strong>Verschachtelte Aggregationen:</strong> Eine Anfrage kann eine Stamm-„ <code translate="no">SearchAggregation</code> “ und bis zu drei verschachtelte „ <code translate="no">sub_aggregation</code> “-Ebenen enthalten, insgesamt also maximal vier Ebenen.</p></li>
<li><p><strong>Felder zur Erstellung von Bucket-Schlüsseln:</strong> „ <code translate="no">SearchAggregation.fields</code> “ unterstützt boolesche, ganzzahlige, „ <code translate="no">VARCHAR</code> “- und „ <code translate="no">TIMESTAMPTZ</code> “-Felder. Es unterstützt keine „ <code translate="no">FLOAT</code> “-Felder, „ <code translate="no">DOUBLE</code> “-Felder, „ <code translate="no">ARRAY</code> “-Felder, „ <code translate="no">JSON</code> “-Felder, „ <code translate="no">GEOMETRY</code> “-Felder, „ <code translate="no">TEXT</code> “-Felder, Vektor- oder dynamische Felder.</p></li>
<li><p><strong>Metrikfelder:</strong> <code translate="no">count</code> akzeptiert <code translate="no">&quot;*&quot;</code> oder jedes nicht-<code translate="no">JSON</code>- und nicht-dynamische Feld und überspringt <code translate="no">NULL</code> -Werte, wenn ein Feld angegeben ist. <code translate="no">sum</code> und <code translate="no">avg</code> akzeptieren Ganzzahl- und Gleitkommafelder. <code translate="no">min</code> und <code translate="no">max</code> akzeptieren zusätzlich Zeichenfolgen- und <code translate="no">TIMESTAMPTZ</code> -Felder.</p></li>
<li><p><strong>Sortierfelder für Top-Treffer:</strong> „ <code translate="no">TopHits.sort</code> “ akzeptiert vergleichbare boolesche, ganzzahlige, Gleitkomma-, Zeichenfolgen- und „ <code translate="no">TIMESTAMPTZ</code> “-Felder sowie „ <code translate="no">_score</code> “. Es unterstützt keine „ <code translate="no">ARRAY</code> “, „ <code translate="no">JSON</code> “, „ <code translate="no">GEOMETRY</code> “, Vektor- oder dynamische Felder.</p></li>
<li><p><strong>Kandidatenbudget:</strong> Der größte<strong>Wert</strong> für „ <code translate="no">TopHits.size</code> “ an beliebiger Stelle im Aggregationsbaum entspricht auch der Anzahl der pro vollständigem zusammengesetztem Schlüssel beibehaltenen Kandidaten. Wenn auf keiner Ebene „ <code translate="no">top_hits</code> “ konfiguriert ist, behält Milvus einen Kandidaten pro Schlüssel bei. „ <code translate="no">count</code> “ und Metriken werden anhand dieser beibehaltenen Kandidaten berechnet, sodass eine Änderung von „ <code translate="no">TopHits.size</code> “ diese Werte beeinflussen kann.</p></li>
<li><p><strong>Nullfähige Bucket-Felder:</strong> Ein Wert von „ <code translate="no">NULL</code> “ bildet einen eigenen Bucket-Schlüssel. Um den Null-Bucket auszuschließen, fügen Sie der Suchanfrage einen Filter wie „ <code translate="no">brand is not null</code> “ hinzu.</p></li>
<li><p><strong>Wiederholte Felder:</strong> Dasselbe Feld darf nicht in mehr als einer „ <code translate="no">SearchAggregation.fields</code> “-Liste vorkommen. Wenn beispielsweise die Stammaggregation „ <code translate="no">fields=[&quot;category&quot;]</code> “ verwendet, darf ein verschachtelter „ <code translate="no">sub_aggregation</code> “ nicht zusätzlich „ <code translate="no">fields=[&quot;category&quot;]</code> “ verwenden.</p></li>
<li><p><strong>Nicht unterstützte Kombinationen:</strong> Die Suchaggregation kann nicht mit „ <code translate="no">offset</code> “, Suchiteratoren, der hybriden Suche, einem Highlighter oder der Gruppierungssuche kombiniert werden.</p></li>
<li><p><strong>Zurückgegebene Einträge:</strong> Halten Sie die konfigurierte maximale Anzahl von Ergebniseinträgen bei maximal 10.000. Berechnen Sie dieses Maximum wie folgt:</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Verwenden Sie „ <code translate="no">1</code> “ als letzten Faktor, wenn keine Ebene „ <code translate="no">TopHits</code> “ konfiguriert ist. Beispielsweise ergibt sich bei einem Abfragevektor, 10 Root-Buckets, fünf Child-Buckets pro Root-Bucket und zwei Treffern pro Child-Bucket ein konfiguriertes Maximum von:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Verwenden Sie die Suchaggregation<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie ein Beispiel entsprechend Ihrem Ziel aus:</p>
<table>
<thead>
<tr><th>Gehen Sie zu</th><th>Beschreibung</th><th>Wichtige Einstellungen</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Buckets vergleichen und sortieren</a></td><td>Berechnen Sie Statistiken pro Bucket, um Buckets zu vergleichen, und sortieren Sie anschließend die zurückgegebenen Buckets nach Metriken, Zählwerten oder Schlüsseln.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Zeigen Sie repräsentative Ergebnisse aus jedem Bucket an</a></td><td>Geben Sie eine begrenzte Anzahl von Entitäten aus jedem Bucket zurück und sortieren Sie diese Entitäten unabhängig voneinander nach Skalarfeldern oder Vektorwerten.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Ergebnisse auf mehreren Ebenen gruppieren</a></td><td>Organisieren Sie die Ergebnisse in über- und untergeordnete Bucket-Ebenen, um mehrere Dimensionen nacheinander zu analysieren.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>Die folgenden Beispiele verwenden eine Produktsammlung mit den Feldern „Marke“, „Kategorie“, „Farbe“, „Preis“ und „Bewertung“. Alle Markennamen, Produktnamen, Preise, Bewertungen und Suchergebnisse sind synthetische Beispieldaten. Erweitern Sie den folgenden Abschnitt, um die Sammlung zu erstellen und die gemeinsamen Suchvariablen zu definieren.</p>
<p><details></p>
<p><summary>Einrichten der Beispielkollektion</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Die obige Konfiguration richtet „ <code translate="no">COSINE</code> “ sowohl für den Vektorindex als auch für die Suchparameter ein. Daher verwenden spätere Beispiele „ <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> “, um eine höhere Kosinusähnlichkeit an erster Stelle zu platzieren. Für eine Distanzmetrik wie „ <code translate="no">L2</code> “ verwenden Sie „ <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> “.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Buckets vergleichen und sortieren<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie dieses Muster, wenn Sie Gruppen von abgerufenen Entitäten anhand berechneter Statistiken vergleichen und die Reihenfolge steuern möchten, in der die Buckets zurückgegeben werden. In diesem Beispiel gruppiert Milvus die abgerufenen Produkte nach <code translate="no">brand</code>, berechnet Preismetriken für jeden Marken-Bucket und sortiert die Buckets nach dem Durchschnittspreis.</p>
<p>Wenn Ihr Ziel lediglich darin besteht, die Vielfalt der Ergebnisse zu verbessern, indem Sie eine oder mehrere Entitäten pro Feldwert zurückgeben, verwenden Sie stattdessen <a href="/docs/de/grouping-search.md">die gruppierte Suche</a>.</p>
<p>Die folgende Konfiguration erstellt bis zu drei Marken-Buckets, berechnet Metriken für jeden Bucket und sortiert die Buckets nach Durchschnittspreis:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Übergeben Sie das Objekt an den Parameter „ <code translate="no">search_aggregation</code> “ von „ <code translate="no">MilvusClient.search()</code> “:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn „ <code translate="no">search_aggregation</code> “ gesetzt ist, gibt PyMilvus in „ <code translate="no">result[0]</code> “ keine gewöhnlichen Entitätstreffer zurück. Lesen Sie stattdessen die Bucket-Antwort aus „ <code translate="no">result.agg_buckets[0]</code> “ aus. Der Parameter „ <code translate="no">output_fields</code> “ steuert, welche Skalarfelder in jedem zurückgegebenen „ <code translate="no">AggregationHit.fields</code> “-Mapping erscheinen; Milvus kann weiterhin Metrikquellen- und Sortierfelder verwenden, die nicht in „ <code translate="no">output_fields</code> “ aufgeführt sind.</p>
<p><details></p>
<p><summary>Beispielausgabe des Buckets anzeigen</summary></p>
<p>Die folgende Ausgabe wurde aus der obigen Anfrage erfasst und zur besseren Lesbarkeit als JSON serialisiert. PyMilvus gibt „ <code translate="no">AggregationBucket</code> “-Objekte anstelle von JSON zurück. Der Wert „ <code translate="no">key</code> “ ist immer eine geordnete Liste von Schlüsselkomponenten, selbst wenn „ <code translate="no">fields</code> “ nur ein Feld enthält. Dadurch bleibt die Feldreihenfolge bei zusammengesetzten Schlüsseln erhalten.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Für den einzelnen Abfragevektor in dieser Anleitung lesen Sie die zurückgegebenen Buckets der obersten Ebene aus ` <code translate="no">result.agg_buckets[0]</code>` aus. Jeder Bucket gibt seine geordneten Schlüsselkomponenten, den „retained-candidate“ unter ` <code translate="no">count</code>`, den berechneten Wert unter ` <code translate="no">metrics</code>`, den repräsentativen Wert unter ` <code translate="no">hits</code>` sowie verschachtelte Buckets unter ` <code translate="no">sub_groups</code>` preis.</p>
<p>Lesen Sie die Konfiguration wie folgt ein:</p>
<table>
<thead>
<tr><th>Einstellung</th><th>Was sie steuert</th><th>In diesem Beispiel</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Wie Milvus Bucket-Schlüssel erstellt</td><td>Erstellt für jeden eindeutigen Wert von „ <code translate="no">brand</code> “ einen Bucket.</td></tr>
<tr><td><code translate="no">size</code></td><td>Die maximale Anzahl der zurückgegebenen Buckets</td><td>Es werden bis zu drei Marken-Buckets zurückgegeben.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>Die für jeden Bucket berechneten Statistiken</td><td>Berechnet die Produktanzahl, den Durchschnittspreis und den Mindestpreis.</td></tr>
<tr><td><code translate="no">order</code></td><td>Wie Milvus die zurückgegebenen Buckets sortiert</td><td>Sortiert nach Durchschnittspreis und verwendet anschließend den Bucket-Schlüssel, um bei Gleichstand zu entscheiden.</td></tr>
</tbody>
</table>
<p>Milvus ignoriert „ <code translate="no">limit</code> “, wenn „ <code translate="no">search_aggregation</code> “ gesetzt ist. Verwenden Sie den Wert „ <code translate="no">SearchAggregation.size</code> “ auf der obersten Ebene, um die Anzahl der Buckets der obersten Ebene zu steuern.</p>
<p>Mit diesen Einstellungen gibt Milvus die Buckets „Marke B“, „Marke A“ und „Marke C“ in absteigender Reihenfolge nach „ <code translate="no">avg_price</code> “ zurück. Das Kriterium „ <code translate="no">_key</code> “ gilt nur, wenn Buckets denselben Durchschnittspreis aufweisen. Da in dieser Konfiguration „ <code translate="no">top_hits</code> “ nicht definiert ist, ist die Liste „ <code translate="no">hits</code> “ jedes Buckets leer und das Kandidatenbudget pro Schlüssel beträgt „ <code translate="no">1</code> “. Die angezeigten Zählwerte und Metriken beschreiben daher jeweils einen beibehaltenen Kandidaten pro Marke. Konfigurieren Sie „ <code translate="no">top_hits</code> “ mit einem größeren „ <code translate="no">TopHits.size</code> “, wenn die Aggregation ein breiteres Metrikfenster pro Schlüssel benötigt.</p>
<p><details></p>
<p><summary>Metriken und Sortierregeln</summary></p>
<p>Jeder Eintrag unter „ <code translate="no">SearchAggregation.metrics</code> “ ordnet einen benutzerdefinierten Alias dem Eintrag „ <code translate="no">{operation: source}</code> “ zu:</p>
<table>
<thead>
<tr><th>Quelle</th><th>Unterstützte Operationen</th><th>Verhalten</th></tr>
</thead>
<tbody>
<tr><td>Jedes Feld, das weder „<code translate="no">JSON</code> “ noch dynamisch ist</td><td><code translate="no">count</code></td><td>Zählt die beibehaltenen Kandidaten, deren Quellfeld nicht „ <code translate="no">NULL</code> “ ist.</td></tr>
<tr><td>Ganzzahl- oder Gleitkommafeld</td><td><code translate="no">sum</code>, „ <code translate="no">avg</code> “, „ <code translate="no">min</code> “, <code translate="no">max</code></td><td>Berechnet über nicht-null-Werte der beibehaltenen Werte.</td></tr>
<tr><td>Zeichenfolgen- oder „ <code translate="no">TIMESTAMPTZ</code> “-Feld</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Wählt den kleinsten oder größten beibehaltenen Wert aus, der nicht null ist.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Zählt jeden beibehaltenen Kandidaten im Bucket. Das Ergebnis entspricht „ <code translate="no">bucket.count</code> “.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, „ <code translate="no">avg</code> “, „ <code translate="no">min</code> “, <code translate="no">max</code></td><td>Aggregiert ANN-Ähnlichkeits- oder -Abstandswerte für beibehaltene Kandidaten.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> Akzeptiert die folgenden Schlüssel:</p>
<table>
<thead>
<tr><th>Reihenfolgeschlüssel</th><th>Bedeutung</th></tr>
</thead>
<tbody>
<tr><td>Ein Alias für eine Metrik</td><td>Sortiert nach einem Wert, der in „ <code translate="no">metrics</code> “ auf derselben Aggregationsebene berechnet wird, z. B. „ <code translate="no">avg_price</code> “.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Sortiert nach der Anzahl der in jedem Bucket verbleibenden Kandidaten.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Sortiert nach dem Bucket-Schlüssel anstelle eines Sammlungsfelds namens „ <code translate="no">_key</code> “.</td></tr>
</tbody>
</table>
<p>Jeder Eintrag in „ <code translate="no">order</code> “ ordnet einen Schlüssel „ <code translate="no">&quot;asc&quot;</code> “ oder „ <code translate="no">&quot;desc&quot;</code> “ zu. Milvus wertet mehrere Einträge vom ersten bis zum letzten aus. Wenn Sie „ <code translate="no">order</code> “ weglassen, behält Milvus die Reihenfolge der Bucket-Ermittlung aus der Menge der beibehaltenen Kandidaten bei.</p>
<p>Um Buckets nach der Qualität der Vektorübereinstimmung zu sortieren, berechnen Sie zunächst eine Metrik auf Bucket-Ebene aus <code translate="no">_score</code> und verwenden Sie dann den Metrik-Alias in <code translate="no">order</code>. Sie können <code translate="no">_score</code> nicht direkt als Schlüssel für die Bucket-Reihenfolge verwenden, da jeder Bucket mehrere Entitäts-Scores enthalten kann. Beispielsweise bei <code translate="no">COSINE</code> oder <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Berechnen Sie bei „ <code translate="no">L2</code> “ den minimalen Wert von „ <code translate="no">_score</code> “ und sortieren Sie den Metrik-Alias in aufsteigender Reihenfolge, sodass Buckets mit dem geringsten Abstand an erster Stelle stehen.</p>
<p></details></p>
<p><details></p>
<p><summary>Zusammengesetzte Bucket-Schlüssel erstellen</summary></p>
<p>Um einen zusammengesetzten Bucket-Schlüssel zu erstellen, übergeben Sie mehrere Feldnamen in derselben Liste:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Diese Konfiguration kann Schlüssel wie „ <code translate="no">(Brand A, black)</code> “, „ <code translate="no">(Brand A, blue)</code> “ und „ <code translate="no">(Brand B, white)</code> “ erzeugen. Zwei Entitäten teilen sich einen Bucket nur dann, wenn beide Werte übereinstimmen. Milvus behält die Reihenfolge der Liste bei, sodass „ <code translate="no">brand</code> “ die erste Schlüsselkomponente und „ <code translate="no">color</code> “ die zweite ist. Wenn „ <code translate="no">_key</code> “ in „ <code translate="no">order</code> “ verwendet wird, vergleicht Milvus die Komponenten des zusammengesetzten Schlüssels in derselben Reihenfolge. Übergeben Sie mehrere Zeichenfolgen in einer flachen Liste; verschachtelte Listen werden nicht unterstützt.</p>
<p><code translate="no">size=6</code> ist die maximale Anzahl der auf dieser Aggregationsebene zurückgegebenen zusammengesetzten Buckets. Die Beispieldaten enthalten fünf verschiedene Marken-Farb-Kombinationen, sodass alle fünf zurückgegeben werden können. Im Rahmen <a href="#Limits">der Begrenzung der zurückgegebenen Einträge</a> trägt diese Anfrage <code translate="no">1 query vector × 6 buckets × 1 = 6</code> konfigurierte Ergebniseinträge bei.</p>
<p>Mehrere Felder in einer „ <code translate="no">SearchAggregation.fields</code> “-Liste bilden einen zusammengesetzten Bucket-Schlüssel auf dieser Aggregationsebene. Um eine Eltern-Kind-Bucket-Hierarchie zu erstellen, verwenden Sie eine <a href="#Group-results-at-multiple-levels">verschachtelte Aggregation</a>.</p>
<p></details></p>
<p>Die folgenden Beispiele definieren „ <code translate="no">aggregation</code> “ neu. Übergeben Sie das aktualisierte Objekt an denselben Parameter „ <code translate="no">search_aggregation</code> “ und führen Sie den Suchaufruf erneut aus.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Zeigen Sie repräsentative Ergebnisse aus jedem Bucket an<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Beziehen Sie repräsentative Entitäten ein, wenn die Anwendung tatsächliche Produkte aus jedem Bucket anzeigen soll. In diesem Beispiel gibt Milvus bis zu zwei Produkte aus jedem Marken-Bucket zurück, sortiert nach Bewertung und anschließend nach Vektorwert.</p>
<p>Konfigurieren Sie „ <code translate="no">TopHits</code> “ wie folgt:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Anzeigen eines Buckets mit repräsentativen Treffern</summary></p>
<p>Der folgende Bucket „Marke A“ wurde aus der obigen Anfrage extrahiert und zur besseren Lesbarkeit als JSON serialisiert.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Parameter</th><th>Zweck</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Optional. Konfiguriert repräsentative Entitäten für diese Aggregationsebene. Wird dieser Parameter weggelassen, ist „ <code translate="no">bucket.hits</code> “ leer und das Kandidatenbudget pro Schlüssel wird standardmäßig auf eins gesetzt.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Gibt bis zu zwei repräsentative Entitäten aus jedem ausgewählten Bucket zurück und setzt das Kandidatenbudget pro Schlüssel für den gesamten Aggregationsbaum auf zwei fest.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Ordnet Entitäten innerhalb jedes Buckets anhand der aufgeführten Kriterien.</td></tr>
</tbody>
</table>
<p>Konfigurieren Sie „ <code translate="no">top_hits</code> “, wenn die Anwendung repräsentative Entitäten benötigt oder wenn Zählungen und Metriken ein breiteres Kandidatenfenster pro Schlüssel erfordern. Ein größeres „ <code translate="no">TopHits.size</code> “ erhöht sowohl das Kandidatenbudget als auch die maximale Anzahl der zurückgegebenen Einträge in <a href="#Limits">„Limits</a>“.</p>
<p><code translate="no">SearchAggregation.order</code> sortiert die Buckets, während „ <code translate="no">TopHits.sort</code> “ die beibehaltenen Entitäten innerhalb jedes Buckets sortiert. Die Sortierreihenfolge hat keinen Einfluss darauf, welche Kandidaten für „ <code translate="no">count</code> “ und Metriken beibehalten wurden. „ <code translate="no">TopHits.sort</code> “ akzeptiert unterstützte, vergleichbare Skalarfeldnamen sowie das integrierte Feld „ <code translate="no">_score</code> “, das die ANN-Ähnlichkeit oder den ANN-Abstand darstellt. Milvus wertet die Einträge unter „ <code translate="no">sort</code> “ von vorne nach hinten aus. In diesem Beispiel sortiert es Produkte nach „ <code translate="no">rating</code> “ vom höchsten zum niedrigsten Wert und verwendet „ <code translate="no">_score</code> “ nur, wenn zwei Bewertungen gleich sind. Da die Konfiguration „ <code translate="no">COSINE</code> “ verwendet, wird bei absteigender Sortierung nach „ <code translate="no">_score</code> “ das ähnlichere Produkt an erster Stelle platziert.</p>
<p>Die von „ <code translate="no">metrics</code> “ oder „ <code translate="no">TopHits.sort</code> “ verwendeten Felder müssen nicht in „ <code translate="no">output_fields</code> “ erscheinen. Milvus ruft diese Felder intern ab, aber nur Felder, die explizit in „ <code translate="no">output_fields</code> “ aufgeführt sind, werden in das „ <code translate="no">fields</code> “-Mapping jedes zurückgegebenen Treffers aufgenommen. Primärschlüssel und Vektorwerte bleiben über „ <code translate="no">AggregationHit.pk</code> “ und „ <code translate="no">AggregationHit.score</code> “ verfügbar.</p>
<p>Jedes zurückgegebene „ <code translate="no">AggregationHit</code> “ gibt seinen Primärschlüssel unter <code translate="no">pk</code>, seinen Vektorwert unter <code translate="no">score</code> und die angeforderten Ausgabefelder unter <code translate="no">fields</code> bekannt.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Ergebnisse auf mehreren Ebenen gruppieren<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie verschachtelte Aggregation, wenn Sie eine Ebene von Buckets innerhalb einer anderen benötigen. In diesem Beispiel erstellt Milvus zunächst Kategorie-Buckets und anschließend Marken-Buckets innerhalb jeder Kategorie.</p>
<p>Die untergeordnete Aggregation erhält nur die Entitäten, die ihrem übergeordneten Bucket zugeordnet sind. „ <code translate="no">fields</code> “ steuert den Bucket-Schlüssel auf jeder Aggregationsebene, während „ <code translate="no">sub_aggregation</code> “ die Eltern-Kind-Hierarchie erstellt.</p>
<p>Die folgende Konfiguration erstellt einen Kategorie-Bucket mit dem Schlüssel „ <code translate="no">(running_shoes)</code> “. Innerhalb dieses übergeordneten Buckets erstellt die untergeordnete Aggregation separate Marken-Buckets mit Schlüsseln wie „ <code translate="no">(Brand A)</code> “, „ <code translate="no">(Brand B)</code> “ und „ <code translate="no">(Brand C)</code> “.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Jede Ebene kann unabhängig voneinander mehrere Felder verwenden. Würde man beispielsweise „ <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> “ in der untergeordneten Aggregation verwenden, würden zusammengesetzte untergeordnete Schlüssel wie „ <code translate="no">(Brand A, black)</code> “ entstehen.</p>
<p>Die folgende Konfiguration implementiert diese Hierarchie:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Anzeigen eines verschachtelten Bucket-Ergebnisses</summary></p>
<p>Der folgende serialisierte Auszug zeigt den übergeordneten Bucket „ <code translate="no">running_shoes</code> “ und dessen untergeordneten Bucket „Brand B“. Die untergeordneten Buckets „Brand A“ und „Brand C“ wurden der Übersichtlichkeit halber weggelassen.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Das angezeigte Ergebnis stellt den Bucket-Pfad „ <code translate="no">(running_shoes) → (Brand B)</code> “ dar, nicht einen einzelnen zusammengesetzten Bucket-Schlüssel „ <code translate="no">(running_shoes, Brand B)</code> “.</p>
<p>Milvus wählt zunächst bis zu zwei Kategorie-Buckets aus, sortiert nach „ <code translate="no">product_count</code> “. Anschließend führt es „ <code translate="no">sub_aggregation</code> “ unabhängig innerhalb jeder ausgewählten Kategorie aus und gibt bis zu drei Marken-Buckets zurück, sortiert nach „ <code translate="no">avg_rating</code> “.</p>
<p>In der obigen Ausgabe:</p>
<ul>
<li>Der Stamm-Bucket „ <code translate="no">running_shoes</code> “ enthält vier beibehaltene Kandidaten über seine untergeordneten zusammengesetzten Schlüssel hinweg. Seine „ <code translate="no">metrics</code> “ enthalten die Werte „ <code translate="no">avg_price</code> “ und „ <code translate="no">product_count</code> “ auf Stammebene.</li>
<li>Die Liste „ <code translate="no">sub_groups</code> “ des Stamm-Buckets enthält die untergeordneten Marken-Buckets. Der angezeigte Marken-B-Bucket enthält einen beibehaltenen Kandidaten sowie seine eigenen Werte für „ <code translate="no">avg_rating</code> “ und „ <code translate="no">brand_count</code> “.</li>
<li>Die Liste „ <code translate="no">hits</code> “ des Stamm-Buckets ist leer, da die Stammaggregation „ <code translate="no">top_hits</code> “ nicht konfiguriert. Der untergeordnete „Brand B“-Bucket enthält einen repräsentativen Treffer, da „ <code translate="no">top_hits</code> “ in „ <code translate="no">sub_aggregation</code> “ konfiguriert ist.</li>
</ul>
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Wie genau sind Bucket-Zählungen und Metriken?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Suchaggregation fasst die beibehaltenen ANN-Kandidaten zusammen. Es wird keine Aggregation der gesamten Sammlung durchgeführt.</p>
<p>Die Beibehaltung von Kandidaten erfolgt in zwei Annäherungsstufen. Die ANN-Suche kann relevante Sammlungsentitäten auslassen, und in der Gruppierungsphase werden für jeden vollständigen zusammengesetzten Schlüssel höchstens die größten „ <code translate="no">TopHits.size</code> “-Kandidaten beibehalten. Wenn auf keiner Ebene „ <code translate="no">top_hits</code> “ konfiguriert ist, beträgt diese Begrenzung pro Schlüssel eins.</p>
<p>Angenommen, eine Sammlung enthält 5.000 Produkte der Marke A, von denen viele für die Vektorabfrage relevant sind. Wenn die Aggregation „ <code translate="no">TopHits(size=4)</code> “ verwendet, kann der Bucket „Marke A“ höchstens vier Kandidaten für einen vollständigen zusammengesetzten Schlüssel behalten. Die Werte für „ <code translate="no">count</code> “ und die Metriken beschreiben diese beibehaltenen Kandidaten, nicht alle relevanten Produkte der Marke A und nicht alle 5.000 Entitäten der Sammlung.</p>
<p>Die Annäherung spielt vor allem dann eine Rolle, wenn „ <code translate="no">order</code> “ einen Metrik-Alias verwendet. Änderungen im Such-Recall können die Metrikwerte verändern und somit beeinflussen, welche Buckets in „ <code translate="no">SearchAggregation.size</code> “ passen. Eine verschachtelte Aggregation kann diesen Effekt verstärken, da jede untergeordnete Ebene auf die in ihrem übergeordneten Bucket verfügbaren Entitäten angewendet wird.</p>
<p>Wenn Sie exakte Statistiken über jede übereinstimmende Entität benötigen, verwenden Sie anstelle der Suchaggregation einen Workflow zur exakten Abfrageaggregation.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">Wie unterscheidet sich die Suchaggregation von der gruppierten Suche?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Treffen Sie Ihre Wahl anhand der primären Ergebnisform der Anwendung:</p>
<table>
<thead>
<tr><th>Hauptanforderung</th><th>Bevorzugt</th><th>Zu verarbeitende Antwort</th></tr>
</thead>
<tbody>
<tr><td>Gibt eine standardmäßige, nach Rang geordnete Entitätsliste mit weniger Wiederholungen in einem Gruppierungsfeld zurück</td><td><a href="/docs/de/grouping-search.md">Gruppierte Suche</a></td><td>Flache Suchtreffer für jeden Abfragevektor</td></tr>
<tr><td>Gruppen als Buckets mit Schlüsseln, Zählwerten, Metriken, Reihenfolge, repräsentativen Treffern oder untergeordneten Buckets untersuchen oder vergleichen</td><td>Suchaggregation</td><td><code translate="no">AggregationBucket</code> Objekte in <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Selbst wenn bei der Suchaggregation „ <code translate="no">top_hits</code> “ konfiguriert ist, bleibt die primäre Antwort ein Bucket-Baum. Die Gruppensuche bleibt nützlich, wenn die Anwendung bereits gewöhnliche Suchtreffer verarbeitet und in erster Linie eine Vielfalt an Ergebnissen anstrebt.</p>
<p>Die APIs schließen sich gegenseitig aus. PyMilvus löst eine „ <code translate="no">ParamError</code> “-Ausnahme aus, wenn „ <code translate="no">search_aggregation</code> “ in derselben Anfrage mit „ <code translate="no">group_by_field</code> “ oder „ <code translate="no">group_by_fields</code> “ kombiniert wird.</p>
