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
    </button></h1><p>Wenn ein Käufer nach „schwarzen Laufschuhen für das tägliche Training“ sucht, ordnet die Annäherungsnachbarschaftssuche (ANN) die Produkte nach Vektorähnlichkeit und gibt eine flache Top-K-Liste zurück. Die Ergebnisse können zwar relevant, aber auch repetitiv sein: Im folgenden Beispiel sind vier der ersten sechs Ergebnisse Nike-Produkte, während Adidas und Puma jeweils einmal vorkommen.</p>
<p>Eine flache Liste kann keine Vielfalt auf Markenebene oder Statistiken direkt liefern. Eine Anwendung benötigt möglicherweise bis zu zwei repräsentative Produkte pro Marke, die Anzahl der für jede Marke abgerufenen Produkte oder den Durchschnittspreis pro Marke.</p>
<p>Die Suchaggregation ordnet die abgerufenen Entitäten anhand eines ausgewählten Skalarfeldes in Buckets ein. In diesem Beispiel wird jede Marke zu einem separaten Bucket. Milvus kann dann für jeden Bucket unabhängig Statistiken berechnen und repräsentative Produkte aus jedem Bucket zurückgeben, wodurch die Suchergebnisse leichter vergleichbar und vielfältiger werden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Ein flaches Suchergebnis für Laufschuhe wird zu einer Reihe vergleichbarer Marken-Buckets</span>
  
 </span></p>
<p>Die Suchaggregation fasst die gefundenen Kandidaten zusammen, anstatt jede Entität in der Sammlung zu berücksichtigen. Die Bucket-Zahlen und Metriken sind daher ungefähre Werte und bleiben an die Vektorrelevanz gebunden.</p>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="Three-stage Search Aggregation workflow from ANN retrieval to bucket results" class="doc-image" id="three-stage-search-aggregation-workflow-from-ann-retrieval-to-bucket-results" /> 
   <span>Dreistufiger Arbeitsablauf der Suchaggregation vom ANN-Abruf bis zu den Bucket-Ergebnissen</span>
  
 </span></p>
<ol>
<li><p><strong>Kandidaten abrufen.</strong> Milvus führt eine ANN-Suche durch, um einen Abrufpool aus Entitäten zu erstellen, die dem Abfragevektor am nächsten liegen. Die Suchaggregation arbeitet mit diesem Pool und nicht mit jeder einzelnen Entität in der Sammlung, sodass der Pool bestimmt, welche Entitäten zu den Buckets beitragen können.</p></li>
<li><p><strong>Buckets erstellen.</strong> „ <code translate="no">SearchAggregation.fields</code> “ legt die Skalarfelder fest, aus denen sich jeder Bucket-Schlüssel zusammensetzt. In der Abbildung ordnet „ <code translate="no">brand</code> “ die sechs Kandidaten den Buckets „Nike“, „Adidas“ und „Puma“ zu. Wenn Sie mehrere Felder angeben, gehören Entitäten nur dann zu einem gemeinsamen Bucket, wenn ihre Feld-Wert-Kombinationen übereinstimmen.</p></li>
<li><p><strong>Ergebnisse berechnen und zurückgeben.</strong> Milvus berechnet die konfigurierten Metriken für jeden Bucket, ordnet die fertiggestellten Buckets und wählt mithilfe von „ <code translate="no">TopHits</code> “ repräsentative Entitäten aus. Jeder Bucket in „ <code translate="no">result.agg_buckets</code> “ enthält seinen Schlüssel, seine Anzahl, seine Metriken, seine Treffer und optionale untergeordnete Buckets.</p></li>
</ol>
<p>Bei „ <code translate="no">sub_aggregation</code> “ wiederholt Milvus die Schritte 2 und 3 innerhalb jedes übergeordneten Buckets. Da jede Stufe auf dem ANN-Retrieval-Pool basiert, können Änderungen des Such-Recalls die Anzahl der Buckets, Metriken, die Reihenfolge, Treffer und verschachtelte Ergebnisse beeinflussen.</p>
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
    </button></h2><p>Bevor Sie die Suchaggregation verwenden, beachten Sie bitte die folgenden Beschränkungen:</p>
<ul>
<li><p><strong>Verschachtelte Aggregationen:</strong> Eine Anfrage kann eine „ <code translate="no">SearchAggregation</code> “-Stammebene und bis zu drei verschachtelte „ <code translate="no">sub_aggregation</code> “-Ebenen enthalten, was insgesamt maximal vier Ebenen ergibt.</p></li>
<li><p><strong>Felder zur Erstellung von Bucket-Schlüsseln:</strong> „ <code translate="no">SearchAggregation.fields</code> “ unterstützt keine „ <code translate="no">FLOAT</code> “-Felder, „ <code translate="no">DOUBLE</code> “-Felder, Vektor-Felder, „ <code translate="no">JSON</code> “-Felder oder dynamische Felder.</p></li>
<li><p><strong>Metrik- und Sortierfelder:</strong> „ <code translate="no">metrics</code> “ und „ <code translate="no">TopHits.sort</code> “ unterstützen keine „ <code translate="no">JSON</code> “- oder dynamischen Felder.</p></li>
<li><p><strong>Wiederholte Felder:</strong> Dasselbe Feld darf nicht in mehr als einer „ <code translate="no">SearchAggregation.fields</code> “-Liste vorkommen. Wenn beispielsweise die Stammaggregation „ <code translate="no">fields=[&quot;category&quot;]</code> “ verwendet, darf ein verschachteltes „ <code translate="no">sub_aggregation</code> “ nicht zusätzlich „ <code translate="no">fields=[&quot;category&quot;]</code> “ verwenden.</p></li>
<li><p><strong>Nicht unterstützte Kombinationen:</strong> Die Suchaggregation kann nicht mit „ <code translate="no">offset</code> “, Suchiteratoren, der hybriden Suche, einem Highlighter, „ <code translate="no">group_by_field</code> “ oder „ <code translate="no">group_by_fields</code> “ kombiniert werden.</p></li>
<li><p><strong>Zurückgegebene Einträge:</strong> Halten Sie die konfigurierte maximale Anzahl von Ergebniseinträgen bei maximal 10.000. Berechnen Sie dieses Maximum wie folgt:</p>
<p><code translate="no">number of query vectors × size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Verwenden Sie „ <code translate="no">1</code> “ als letzten Faktor, wenn keine Ebene „ <code translate="no">TopHits</code> “ konfiguriert ist. Beispielsweise ergibt sich bei einem Abfragevektor, 10 Root-Buckets, fünf Child-Buckets pro Root-Bucket und zwei Treffern pro Child-Bucket ein konfiguriertes Maximum von:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Verwenden Sie „Search Aggregation“<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie das Beispiel aus, das Ihrer gewünschten Konfiguration entspricht:</p>
<table>
<thead>
<tr><th>Ziel</th><th>Wichtige Einstellungen</th><th>Beispiel</th></tr>
</thead>
<tbody>
<tr><td>Bucket-Schlüssel erstellen</td><td><code translate="no">fields</code>, <code translate="no">size</code></td><td><a href="#build-bucket-keys">Bucket-Schlüssel erstellen</a></td></tr>
<tr><td>Statistiken berechnen und Buckets sortieren</td><td><code translate="no">metrics</code>, <code translate="no">order</code></td><td><a href="#calculate-metrics-and-order-buckets">Metriken berechnen und Buckets sortieren</a></td></tr>
<tr><td>Repräsentative Treffer zurückgeben und sortieren</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td><td><a href="#return-and-sort-representative-hits">Repräsentative Treffer zurückgeben und sortieren</a></td></tr>
<tr><td>Erstellen Sie hierarchische Ergebnisse</td><td><code translate="no">sub_aggregation</code></td><td><a href="#create-nested-buckets">Verschachtelte Buckets erstellen</a></td></tr>
</tbody>
</table>
<p>Die folgenden Beispiele verwenden eine Produktsammlung mit den Feldern „Marke“, „Kategorie“, „Farbe“, „Preis“ und „Bewertung“. Erweitern Sie den folgenden Abschnitt, um die Sammlung zu erstellen und die gemeinsamen Suchvariablen zu definieren.</p>
<p><details></p>
<p><summary>Einrichten der Beispielsammlung</summary></p>
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
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Puma Velocity Nitro&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Puma&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Windrunner Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Adidas Own The Run Jacket&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Adidas&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike Vomero 17&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Nike InfinityRN 4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Nike&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.flush(collection_name)
client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Die obige Konfiguration legt „ <code translate="no">COSINE</code> “ sowohl für den Vektorindex als auch für die Suchparameter fest. Daher verwenden spätere Beispiele „ <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> “, um höhere Kosinus-Ähnlichkeiten an erster Stelle zu platzieren. Für eine Distanzmetrik wie „ <code translate="no">L2</code> “ verwenden Sie „ <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code> “.</p>
<h3 id="Build-bucket-keys" class="common-anchor-header">Bucket-Schlüssel erstellen<button data-href="#Build-bucket-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie zunächst ein <code translate="no">SearchAggregation</code> -Objekt. Die folgende Konfiguration erstellt einen Bucket für jeden eindeutigen <code translate="no">brand</code> -Wert und wählt bis zu drei Buckets zur Rückgabe aus:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span>
    size=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Die häufig verwendeten Parameter sind:</p>
<table>
<thead>
<tr><th>Parameter</th><th>Wert in diesem Beispiel</th><th>Zweck</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td><code translate="no">[&quot;brand&quot;]</code></td><td>Eine nicht leere Liste von Skalarfeldern, die den Bucket-Schlüssel bilden. Ein Feld ergibt einen einteiligen Schlüssel.</td></tr>
<tr><td><code translate="no">size</code></td><td><code translate="no">3</code></td><td>Die maximale Anzahl der Buckets, die auf dieser Aggregationsebene zurückgegeben werden.</td></tr>
</tbody>
</table>
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
<p><details></p>
<p><summary>Beispielausgabe der Buckets anzeigen</summary></p>
<p>Die folgende Ausgabe wurde aus der obigen Anfrage erfasst und zur besseren Lesbarkeit als JSON serialisiert. PyMilvus gibt „ <code translate="no">AggregationBucket</code> “-Objekte anstelle von JSON zurück.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Puma&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Für den einzelnen Abfragevektor in dieser Anleitung lesen Sie die zurückgegebenen Buckets der obersten Ebene aus „ <code translate="no">result.agg_buckets[0]</code> “ aus. Jeder Bucket stellt seine „ <code translate="no">key</code> “, die „retrieval-pool“-Entität „ <code translate="no">count</code> “, die berechneten „ <code translate="no">metrics</code> “, den repräsentativen „ <code translate="no">hits</code> “ sowie verschachtelte Buckets in „ <code translate="no">sub_groups</code> “ bereit.</p>
<p>In den folgenden Abschnitten wird „ <code translate="no">aggregation</code> “ für andere Anwendungsfälle neu definiert. Übergeben Sie das aktualisierte Objekt an denselben Parameter „ <code translate="no">search_aggregation</code> “ und führen Sie den Suchaufruf erneut aus.</p>
<p>Milvus ignoriert „ <code translate="no">limit</code> “, wenn „ <code translate="no">search_aggregation</code> “ festgelegt ist. Verwenden Sie den Stammwert „ <code translate="no">SearchAggregation.size</code> “, um die Anzahl der Buckets der obersten Ebene zu steuern.</p>
<p>Um einen zusammengesetzten Bucket-Schlüssel zu erstellen, übergeben Sie mehrere Feldnamen in derselben Liste:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span>
    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Diese Konfiguration kann Schlüssel wie <code translate="no">(Nike, black)</code>, <code translate="no">(Nike, blue)</code> und <code translate="no">(Adidas, white)</code> erzeugen. Zwei Entitäten teilen sich einen Bucket nur, wenn beide Werte übereinstimmen. Milvus behält die Reihenfolge der Liste bei, sodass <code translate="no">brand</code> die erste Schlüsselkomponente und <code translate="no">color</code> die zweite ist. Übergeben Sie mehrere Zeichenfolgen in einer flachen Liste; verschachtelte Listen werden nicht unterstützt.</p>
<p><code translate="no">size=6</code> ist die maximale Anzahl der zusammengesetzten Buckets, die auf dieser Aggregationsebene zurückgegeben werden. Die Beispieldaten enthalten fünf verschiedene Marken-Farb-Kombinationen, sodass alle fünf zurückgegeben werden können. Im Rahmen <a href="#limits">der Begrenzung der zurückgegebenen Einträge</a> trägt diese Anfrage mit <code translate="no">1 query vector × 6 buckets × 1 = 6</code> konfigurierten Ergebniseinträgen bei.</p>
<h3 id="Calculate-metrics-and-order-buckets" class="common-anchor-header">Metriken berechnen und Buckets sortieren<button data-href="#Calculate-metrics-and-order-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Fügen Sie „ <code translate="no">metrics</code> “ und „ <code translate="no">order</code> “ hinzu, wenn Sie Bucket-Statistiken und eine deterministische Bucket-Reihenfolge benötigen:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
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
<p><strong>Definieren Sie Bucket-Metriken.</strong></p>
<p>Jeder Eintrag unter „ <code translate="no">SearchAggregation.metrics</code> “ ordnet einen benutzerdefinierten Alias einem „ <code translate="no">{operation: source}</code> “ zu:</p>
<table>
<thead>
<tr><th>Alias</th><th>Operation</th><th>Quelle</th><th>Ergebnis</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">product_count</code></td><td><code translate="no">count</code></td><td><code translate="no">&quot;*&quot;</code></td><td>Zählt jede dem Bucket zugewiesene Retrieval-Pool-Entität.</td></tr>
<tr><td><code translate="no">avg_price</code></td><td><code translate="no">avg</code></td><td><code translate="no">price</code></td><td>Berechnet den Durchschnitt der Nicht-Null-Werte von „ <code translate="no">price</code> “.</td></tr>
<tr><td><code translate="no">min_price</code></td><td><code translate="no">min</code></td><td><code translate="no">price</code></td><td>Gibt den niedrigsten Nicht-Null-Wert von „ <code translate="no">price</code> “ zurück.</td></tr>
</tbody>
</table>
<p>„Search Aggregation“ unterstützt folgende Metrikoperationen:</p>
<ul>
<li><code translate="no">count</code> Akzeptiert die spezielle Quelle „ <code translate="no">&quot;*&quot;</code> “, um alle Entitäten im Bucket zu zählen, oder einen Feldnamen, um Entitäten zu zählen, deren Feldwert nicht „ <code translate="no">NULL</code> “ ist. Wenn ein Bucket beispielsweise 10 Entitäten enthält und bei zwei davon „ <code translate="no">price</code> “ auf „ <code translate="no">NULL</code> “ gesetzt ist, gibt eine Metrik „ <code translate="no">count</code> “ mit der Quelle „ <code translate="no">&quot;*&quot;</code> “ den Wert 10 zurück, während eine Metrik mit der Quelle „ <code translate="no">&quot;price&quot;</code> “ den Wert 8 zurückgibt.</li>
<li><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code> und <code translate="no">max</code> akzeptieren ein unterstütztes numerisches Feld oder die integrierte Quelle „ <code translate="no">_score</code> “, die die ANN-Ähnlichkeit oder den Abstand darstellt. Diese Operationen überspringen Werte von „ <code translate="no">NULL</code> “.</li>
</ul>
<p>Um Buckets nach einem Wert zu ordnen, der aus <code translate="no">_score</code> abgeleitet wird, definieren Sie einen Metrik-Alias auf der Grundlage von <code translate="no">_score</code> und verwenden Sie diesen Alias anschließend in <code translate="no">order</code>. <code translate="no">_score</code> ist kein direkter Schlüssel für die Bucket-Reihenfolge. Da in diesem Leitfaden beispielsweise <code translate="no">COSINE</code> verwendet wird, definieren Sie <code translate="no">&quot;max_score&quot;: {&quot;max&quot;: &quot;_score&quot;}</code> in <code translate="no">metrics</code> und verwenden Sie anschließend <code translate="no">{&quot;max_score&quot;: &quot;desc&quot;}</code> in <code translate="no">order</code>. Dadurch werden Buckets, deren am besten passende Entität den höheren Ähnlichkeitswert aufweist, an erster Stelle platziert.</p>
<p><strong>Reihenfolge der Buckets.</strong></p>
<p><code translate="no">SearchAggregation.order</code> Steuert die Reihenfolge der zurückgegebenen Buckets. Jeder Eintrag ordnet einen Sortierschlüssel einem der folgenden Werte zu: <code translate="no">&quot;asc&quot;</code> oder <code translate="no">&quot;desc&quot;</code>. Milvus wertet mehrere Einträge von vorne nach hinten aus.</p>
<p>Der Sortierschlüssel kann Folgendes sein:</p>
<ul>
<li>ein in „ <code translate="no">metrics</code> “ auf derselben Aggregationsebene definierter Metrik-Alias, wie z. B. „ <code translate="no">avg_price</code> “;</li>
<li>der integrierte Schlüssel „ <code translate="no">_count</code> “, der die Anzahl der Entitäten im Abrufpool des Buckets angibt; oder</li>
<li>der integrierte Schlüssel „ <code translate="no">_key</code> “, der den Bucket-Schlüssel anstelle eines Sammlungsfelds namens „ <code translate="no">_key</code> “ darstellt.</li>
</ul>
<p>Wenn Sie „ <code translate="no">order</code> “ weglassen, behält Milvus die Reihenfolge der Bucket-Erkennung aus dem Abrufpool bei. Legen Sie „ <code translate="no">order</code> “ fest, wenn Buckets einer Metrik, einer Anzahl oder einem Schlüssel folgen müssen.</p>
<p>In diesem Beispiel:</p>
<table>
<thead>
<tr><th>Eintrag</th><th>Wirkung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">{&quot;avg_price&quot;: &quot;desc&quot;}</code></td><td>Sortiert die Buckets vom höchsten zum niedrigsten „ <code translate="no">avg_price</code> “-Wert.</td></tr>
<tr><td><code translate="no">{&quot;_key&quot;: &quot;asc&quot;}</code></td><td>Bei Gleichstand erfolgt die Sortierung in aufsteigender Reihenfolge der Bucket-Schlüssel. Bei „ <code translate="no">fields=[&quot;brand&quot;]</code> “ folgen Buckets mit gleichem Preis der lexikalischen Reihenfolge: „ <code translate="no">Adidas</code> “, „ <code translate="no">Nike</code> “, dann „ <code translate="no">Puma</code> “. Buckets mit unterschiedlichen „ <code translate="no">avg_price</code> “-Werten sind davon nicht betroffen. Bei „ <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> “ vergleicht Milvus zunächst „ <code translate="no">brand</code> “ und erst dann „ <code translate="no">color</code> “, wenn die Markenwerte gleich sind.</td></tr>
</tbody>
</table>
<h3 id="Return-and-sort-representative-hits" class="common-anchor-header">Repräsentative Treffer zurückgeben und sortieren<button data-href="#Return-and-sort-representative-hits" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">TopHits</code> “, um repräsentative Entitäten aus jedem ausgewählten Bucket zurückzugeben und zu sortieren:</p>
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
<p>Der folgende Nike-Bucket wurde aus der obigen Anfrage extrahiert und zur besseren Lesbarkeit als JSON serialisiert.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997663497924805</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Air Zoom Runner&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997047781944275</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Nike Pegasus Trail&quot;</span><span class="hljs-punctuation">,</span>
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
<tr><td><code translate="no">top_hits</code></td><td>Optional. Konfiguriert repräsentative Entitäten für diese Aggregationsebene. Bei Weglassung gibt Milvus weiterhin den Bucket-Schlüssel, die Anzahl, die Metriken und die untergeordneten Buckets zurück, jedoch ist ` <code translate="no">bucket.hits</code> ` leer.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Gibt bis zu zwei repräsentative Entitäten aus jedem ausgewählten Bucket zurück.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Sortiert die Entitäten innerhalb jedes Buckets anhand der aufgeführten Kriterien.</td></tr>
</tbody>
</table>
<p>Setzen Sie „ <code translate="no">top_hits</code> “ nur, wenn die Anwendung repräsentative Entitäten aus jedem Bucket benötigt.</p>
<p><code translate="no">SearchAggregation.order</code> sortiert Buckets, während „ <code translate="no">TopHits.sort</code> “ Entitäten innerhalb jedes Buckets sortiert. „ <code translate="no">TopHits.sort</code> “ akzeptiert unterstützte Skalarfeldnamen und das integrierte Feld „ <code translate="no">_score</code> “, das die ANN-Ähnlichkeit oder den ANN-Abstand darstellt. Milvus wertet die Einträge unter „ <code translate="no">sort</code> “ von vorne nach hinten aus. In diesem Beispiel werden Produkte nach „ <code translate="no">rating</code> “ vom höchsten zum niedrigsten Wert sortiert, und „ <code translate="no">_score</code> “ wird nur verwendet, wenn zwei Bewertungen gleich sind. Da die Konfiguration „ <code translate="no">COSINE</code> “ verwendet, wird bei absteigender Sortierung nach „ <code translate="no">_score</code> “ das ähnlichere Produkt an erster Stelle platziert.</p>
<p>Die von <code translate="no">TopHits.sort</code> verwendeten Felder müssen nicht in <code translate="no">output_fields</code> vorkommen. Allerdings werden nur Felder aus <code translate="no">output_fields</code> in das <code translate="no">fields</code> -Mapping jedes zurückgegebenen Treffers einbezogen.</p>
<p>Jeder zurückgegebene <code translate="no">AggregationHit</code> gibt seinen Primärschlüssel in <code translate="no">pk</code>, den Vektor-Score in <code translate="no">score</code> und die angeforderten Ausgabefelder in <code translate="no">fields</code> preis.</p>
<h3 id="Create-nested-buckets" class="common-anchor-header">Verschachtelte Buckets erstellen<button data-href="#Create-nested-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">sub_aggregation</code> “, um innerhalb jedes übergeordneten Buckets eine weitere Aggregation auszuführen. Die untergeordnete Aggregation erhält nur die Entitäten, die ihrem übergeordneten Bucket zugeordnet sind. Die folgende Konfiguration gruppiert Produkte zunächst nach Kategorie und anschließend die Produkte in jeder Kategorie nach Marke:</p>
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
<p><summary>Ergebnis eines verschachtelten Buckets anzeigen</summary></p>
<p>Der folgende serialisierte Auszug zeigt den übergeordneten Bucket „ <code translate="no">running_shoes</code> “ und dessen untergeordneten Bucket „Adidas“. Die untergeordneten Buckets „Nike“ und „Puma“ wurden der Kürze halber weggelassen.</p>
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
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span>
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
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.999454140663147</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Adidas Ultraboost Light&quot;</span><span class="hljs-punctuation">,</span>
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
<p>Milvus wählt zunächst bis zu zwei Kategorie-Buckets aus, sortiert nach „ <code translate="no">product_count</code> “. Anschließend führt es innerhalb jeder ausgewählten Kategorie unabhängig voneinander „ <code translate="no">sub_aggregation</code> “ aus und gibt bis zu drei Marken-Buckets zurück, sortiert nach „ <code translate="no">avg_rating</code> “.</p>
<p>In der obigen Ausgabe:</p>
<ul>
<li>Der Stamm-Bucket „ <code translate="no">running_shoes</code> “ enthält vier Entitäten aus dem Abrufpool. Seine „ <code translate="no">metrics</code> “ enthalten die Werte „ <code translate="no">avg_price</code> “ und „ <code translate="no">product_count</code> “ auf Stammebene.</li>
<li>Die Liste „ <code translate="no">sub_groups</code> “ des Stamm-Buckets enthält die untergeordneten Marken-Buckets. Der angezeigte Adidas-Bucket enthält eine Entität sowie seine eigenen Werte für „ <code translate="no">avg_rating</code> “ und „ <code translate="no">brand_count</code> “.</li>
<li>Die Liste „ <code translate="no">hits</code> “ des Stamm-Buckets ist leer, da die Stammaggregation „ <code translate="no">top_hits</code> “ nicht konfiguriert hat. Der untergeordnete „Adidas“-Bucket enthält einen repräsentativen Hit, da „ <code translate="no">top_hits</code> “ in „ <code translate="no">sub_aggregation</code> “ konfiguriert ist.</li>
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
    </button></h3><p>Die Suchaggregation fasst den ANN-Abrufpool zusammen. Es wird keine Aggregation der gesamten Sammlung durchgeführt.</p>
<p>Angenommen, eine Sammlung enthält 5.000 Nike-Produkte, der Abrufpool für eine Abfrage enthält jedoch 35 Nike-Produkte. Eine Metrik „ <code translate="no">product_count</code> “ im Nike-Bucket beschreibt diese 35 abgerufenen Produkte. Sie meldet nicht 5.000.</p>
<p>Die Annäherung spielt vor allem dann eine Rolle, wenn „ <code translate="no">order</code> “ einen Metrik-Alias verwendet. Änderungen beim Such-Recall können die Metrikwerte verändern und somit beeinflussen, welche Buckets unter „ <code translate="no">SearchAggregation.size</code> “ fallen. Eine verschachtelte Aggregation kann diesen Effekt verstärken, da jede untergeordnete Ebene auf die in ihrem übergeordneten Bucket verfügbaren Entitäten angewendet wird.</p>
<p>Wenn Sie exakte Statistiken zu jeder übereinstimmenden Entität benötigen, verwenden Sie anstelle der Suchaggregation einen Workflow zur exakten Abfrageaggregation.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">Wie unterscheidet sich die Suchaggregation von der Gruppierungssuche?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie <a href="/docs/de/grouping-search.md">die „Grouping Search“</a>, wenn Ihr Ziel darin besteht, die Vielfalt der Ergebnisse zu verbessern und zu steuern, wie viele Entitäten jede Gruppe zurückgibt.</p>
<p>Verwenden Sie die Suchaggregation, wenn Sie strukturierte Bucket-Ergebnisse benötigen, wie z. B. zusammengesetzte Schlüssel, Metriken pro Bucket, Bucket-Reihenfolge, unabhängig sortierte repräsentative Treffer oder verschachtelte Buckets. Die Suchaggregation nutzt eine separate API und gibt ihre Ergebnisse über <code translate="no">result.agg_buckets</code> zurück.</p>
<p>Kombinieren Sie „ <code translate="no">search_aggregation</code> “ nicht mit „ <code translate="no">group_by_field</code> “ oder „ <code translate="no">group_by_fields</code> “ in derselben Anfrage.</p>
