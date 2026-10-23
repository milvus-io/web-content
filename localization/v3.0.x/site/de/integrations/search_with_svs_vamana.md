---
id: search_with_svs_vamana.md
summary: >-
  Erstellen und durchsuchen Sie in Milvus In-Memory-SVS-Vamana-Graph-Indizes
  über den FAISS-Index-Passthrough, optional mit LeanVec- oder LVQ-Komprimierung
  auf Intel-CPUs.
title: Suche mit SVS Vamana und Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Suche mit SVS Vamana und Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) ist Intels leistungsstarke Vektorsuchbibliothek, die den Vamana-Graph-Algorithmus implementiert. In Milvus greifen Sie über den <a href="https://milvus.io/docs/faiss.md">FAISS-Index-Passthrough</a> auf SVS Vamana zu: Setzen Sie „ <code translate="no">index_type</code> “ auf „ <code translate="no">FAISS</code> “ und geben Sie eine „ <code translate="no">SVSVamana</code> “-Index-Factory-Zeichenkette an. Milvus erstellt und durchsucht den Index dann über die SVS-Integration von FAISS.</p>
<p>Vamana ist die Graphstruktur, die auch <a href="https://milvus.io/docs/diskann.md">DISKANN</a> verwendet, doch SVS Vamana hält den gesamten Graphen im Arbeitsspeicher. Es kann Vektoren zudem mit <strong>LeanVec</strong> oder <strong>LVQ</strong> komprimieren, was den Speicherbedarf reduziert und die Suche beschleunigt, während weiterhin ein sehr hoher Recall erreicht wird.</p>
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
    </button></h2><ul>
<li>Milvus 3.0.0 oder höher, aus dem Quellcode kompiliert und mit aktiviertem SVS</li>
<li>PyMilvus 3.0.0 oder höher</li>
<li>Eine Intel-CPU, wenn Sie „ <code translate="no">LVQ*</code> “- oder „ <code translate="no">LeanVec*</code> “-Speicher verwenden; „ <code translate="no">FP32</code> “, „ <code translate="no">FP16</code> “ und „ <code translate="no">SQ8</code> “-Speicher laufen auf jeder Plattform</li>
<li>Vertrautheit mit <a href="https://milvus.io/docs/faiss.md">den FAISS-Index-Factory-Strings</a></li>
</ul>
<div class="alert note">
<p>SVS ist in der Standardversion von Milvus nicht enthalten. Um die „ <code translate="no">SVSVamana</code> “-Fabriken zu nutzen, müssen Sie Milvus aus dem Quellcode mit „ <code translate="no">make USE_SVS=ON</code> “ kompilieren. Bei einer Kompilierung ohne SVS schlägt die Indexerstellung fehl, da Faiss den Factory-String nicht erkennt.</p>
</div>
<p>Die Komprimierung mit LVQ und LeanVec läuft nur auf Intel-CPUs und ist auf CPUs mit AVX-512 schneller. Auf anderen CPUs schlägt die Indexerstellung für die Factory-Strings „ <code translate="no">LVQ*</code> “ und „ <code translate="no">LeanVec*</code> “ fehl.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">So funktioniert SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Vamana-Graph<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana erstellt einen einlagigen Proximity-Graphen. Jeder Vektor ist ein Knoten, und Kanten verbinden Vektoren, die wahrscheinlich nahe Nachbarn sind. Um den Graphen zu erstellen, führt SVS für jeden Knoten <strong>x</strong> Folgendes durch:</p>
<ol>
<li><p><strong>Greedy-Suche</strong>: SVS durchsucht den bisher erstellten Graphen und führt dabei eine Kandidatenliste der Größe <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Nachbarausdünnung</strong>: Die besuchten Knoten werden zu potenziellen Nachbarn für <strong>x</strong>. SVS berücksichtigt sie in der Reihenfolge des zunehmenden Abstands zu <strong>x</strong>. Ein Kandidat <code translate="no">c</code> wird übersprungen, wenn ein näherer Nachbar <code translate="no">n</code>, der bereits beibehalten wurde, die Bedingung <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code> erfüllt. Dadurch werden Kanten mit großer Reichweite beibehalten und redundante Kanten mit kurzer Reichweite entfernt, sodass die Suche über den Graphen springen kann, anstatt ihn Schritt für Schritt von einem nächsten Nachbarn zum nächsten zu durchlaufen. Das Ausdünnen endet, sobald der Grad des Graphen erreicht ist.</p></li>
<li><p><strong>Rückwärtskanten</strong>: Für jeden neuen Nachbarn von <strong>x</strong> fügt SVS eine Rückwärtskante zurück zu <strong>x</strong> hinzu und entfernt Kanten aus der Kantenliste dieses Nachbarn, wenn diese den Grad des Graphen überschreitet.</p></li>
</ol>
<p>Das Pruning erfolgt in zwei Durchläufen: zunächst mit „ <code translate="no">alpha = 1</code> “, anschließend mit dem konfigurierten „ <code translate="no">alpha</code> “. Ein größerer Graphgrad und „ <code translate="no">construction_window_size</code> “ ergeben einen dichteren, qualitativ hochwertigeren Graphen, beanspruchen jedoch mehr Speicher und benötigen mehr Zeit für den Aufbau.</p>
<p>Während der Suche durchläuft SVS den Graphen „greedily“ und behält die bisher gesehenen, nächstgelegenen Kandidaten aus „ <code translate="no">search_window_size</code> “ bei. Als Nächstes wird immer der nächstgelegene, noch nicht besuchte Kandidat untersucht. Die Suche endet, sobald jeder Nachbar des aktuellen Knotens weiter von der Abfrage entfernt ist als der schlechteste Kandidat im Fenster. Ein größerer „ <code translate="no">search_window_size</code> “ erkundet einen größeren Teil des Graphen, was den Recall erhöht, aber auch die Latenz vergrößert.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">LeanVec-Komprimierung<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> reduziert sowohl die Anzahl der Dimensionen pro Vektor als auch die Anzahl der Bits pro Dimension. Ein LeanVec-Index speichert zwei Darstellungen jedes Vektors:</p>
<ul>
<li><p><strong>Primär (reduzierte Dimensionalität)</strong>: Eine lineare Projektion des Vektors auf eine geringere Anzahl von Dimensionen. Die Graphsuche läuft über diesen primären Datensatz ab, sodass die meisten Abstandsberechnungen im raum mit geringerer Dimensionalität stattfinden. Dies reduziert sowohl den Rechenaufwand als auch die Anforderungen an die Speicherbandbreite. Standardmäßig beträgt die reduzierte Dimensionalität die Hälfte der ursprünglichen Dimensionalität (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Sekundär (volle Dimensionalität)</strong>: Der Vektor in seiner ursprünglichen Dimensionalität. SVS ordnet die von der primären Graphensuche zurückgegebenen Kandidaten anhand dieses sekundären Datensatzes neu, um die durch die Dimensionsreduktion verlorene Genauigkeit wiederherzustellen.</p></li>
</ul>
<p>Beide Darstellungen werden mit <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (Locally-adaptive Vector Quantization) quantisiert. Die Speicherkomponente der Factory-Zeichenkette wählt die Kodierung aus. Beispielsweise verwendet <code translate="no">LeanVec4x8</code> 4 Bit pro Dimension für den primären Datensatz und 8 Bit pro Dimension für den sekundären Datensatz. Selbst beim Schritt der Neubewertung wird niemals ein Vektor mit voller Genauigkeit gelesen.</p>
<p>Standardmäßig lernt LeanVec separate Projektionen für die indizierten Vektoren und für die Abfragen, um Abfragen zu unterstützen, die aus einer anderen Verteilung stammen als die indizierten Vektoren (Out-of-Distribution oder OOD). Dies funktioniert besonders gut bei modalitätsübergreifenden Workloads wie der Text-zu-Bild-Suche und auch dann, wenn Abfragen aus derselben Verteilung stammen wie die indizierten Vektoren. Milvus unterstützt noch keine Möglichkeit, Abfragen zur Berechnung von Projektionen zu übergeben, sodass derzeit nur die Basisvektoren verwendet werden. Das OOD-Training verlängert die Erstellungszeit. Um den Build-Vorgang auf Kosten der Abfrageleistung zu beschleunigen, setzen Sie „ <code translate="no">ood_training</code> “ auf „ <code translate="no">False</code> “.</p>
<h3 id="LVQ-compression" class="common-anchor-header">LVQ-Komprimierung<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei Datensätzen mit weniger als etwa 512 Dimensionen kann es vorteilhafter sein, auf die Dimensionsreduktion zu verzichten und ausschließlich mit LVQ-Quantisierung zu komprimieren. Ähnlich wie LeanVec verfügt ein LVQ-Index über eine Primärdarstellung für die schnelle Suche und eine Restdarstellung für das Re-Ranking. Beispielsweise verwendet „ <code translate="no">LVQ4x4</code> “ 4 Bit für die Primärdarstellung und 4 Bit für die Restdarstellung. „ <code translate="no">LVQ4x0</code> “ und „ <code translate="no">LVQ8x0</code> “ überspringen das Re-Ranking, was Abfragen beschleunigt, sofern deren Recall für Ihre Arbeitslast ausreichend ist.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Wählen Sie eine Factory-Zeichenkette<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>SVS-Vamana-Factory-Strings haben die Form <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, wobei <code translate="no">&lt;degree&gt;</code> die maximale Anzahl von Kanten pro Knoten im Graphen ist.</p>
<table>
<thead>
<tr><th>Factory-String</th><th>Speicher</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Unkomprimierte Vektoren.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16-Bit-Fließkommazahlen</td><td>Die Hälfte des Vektorspeichers von „ <code translate="no">FP32</code> “, bei minimalem Genauigkeitsverlust.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8-Bit-Skalarquantisierung</td><td>Ein Viertel des Vektorspeichers von „ <code translate="no">FP32</code> “.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primär, kein Residual</td><td>Nur Intel-CPUs. Keine Neureihung.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primär und Residual</td><td>Nur Intel-CPUs.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primär und sekundär</td><td>nur Intel-CPUs. Fügen Sie das Suffix „ <code translate="no">_&lt;dim&gt;</code> “ hinzu, um die reduzierte Dimensionalität festzulegen. Beispielsweise reduziert „ <code translate="no">LeanVec4x8_128</code> “ den primären Datensatz auf 128 Dimensionen. Ohne das Suffix beträgt die reduzierte Dimensionalität „ <code translate="no">dim / 2</code> “.</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> ist ein guter Ausgangspunkt. Von dort aus:</p>
<ul>
<li><p>Für <strong>einen höheren Recall</strong> bei etwas höherem Speicherbedarf erhöhen Sie die LeanVec-Dimensionalität mit dem Suffix „ <code translate="no">_&lt;dim&gt;</code> “.</p></li>
<li><p>Für einen <strong>geringeren Speicherbedarf</strong> auf Kosten eines etwas geringeren Recall-Werts verringern Sie die LeanVec-Dimension.</p></li>
<li><p>Für Vektoren mit geringer Dimensionalität versuchen Sie es mit „ <code translate="no">LVQ8</code> “.</p></li>
<li><p>Verwenden Sie<strong>auf Nicht-Intel-CPUs</strong> „ <code translate="no">FP16</code> “ oder „ <code translate="no">SQ8</code> “.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Erstellen Sie den Index<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel erstellt einen SVS-Vamana-Index mit einem Graphgrad von 64 und LeanVec-Komprimierung. Erweitern Sie den Setup-Block und führen Sie ihn aus, bevor Sie den Index erstellen.</p>
<p><details></p>
<p><summary>Bereiten Sie die Sammlung vor</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Setzen Sie „ <code translate="no">index_type</code> “ auf „ <code translate="no">FAISS</code> “ und wählen Sie über „ <code translate="no">faiss_index_name</code> “ das SVS-Vamana-Rezept aus.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Durchsuchen Sie den Index<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> steuert den Kompromiss zwischen Recall und Latenz, ähnlich wie „ <code translate="no">ef</code> “ bei <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Setzen Sie „ <code translate="no">search_buffer_capacity</code> “ auf mindestens denselben Wert. Der Standardwert für beide ist 10, und SVS lehnt eine Suche ab, bei der „ <code translate="no">search_window_size</code> “ größer ist als „ <code translate="no">search_buffer_capacity</code> “.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Ist <code translate="no">limit</code> größer als <code translate="no">search_window_size</code>, erweitert SVS das Fenster für diese Suche auf <code translate="no">limit</code>.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">SVS-Vamana-Parameter<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgenden Build-Parameter werden in „ <code translate="no">params</code> “ in „ <code translate="no">add_index()</code> “ neben „ <code translate="no">faiss_index_name</code> “ angegeben. Sie können diese nach dem Erstellen des Indexes nicht mehr ändern.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Standard</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Größe der Kandidatenliste, die bei der Graphenkonstruktion verwendet wird, um die Nachbarn jedes Knotens zu ermitteln. Größere Werte verbessern die Graphqualität und den Recall, verlängern jedoch die Erstellungszeit. Setzen Sie diesen Wert auf mindestens den Grad des Graphen. 200 ist eine gängige Wahl.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> für „ <code translate="no">L2</code> “, „ <code translate="no">0.95</code> “ für „ <code translate="no">IP</code> “ und <code translate="no">COSINE</code></td><td>Pruning-Stärke. Werte, die weiter von 1 entfernt sind, führen zu einer aggressiveren Bereinigung, wobei Kanten mit großer Reichweite gegenüber redundanten Kanten mit kurzer Reichweite bevorzugt werden. Verwenden Sie Werte über 1 für „ <code translate="no">L2</code> “ und unter 1 für „ <code translate="no">IP</code> “ und „ <code translate="no">COSINE</code> “. Behalten Sie die Standardeinstellung bei, es sei denn, Sie haben anhand Ihrer Daten einen besseren Wert ermittelt.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Grad im Factory-String oder <code translate="no">32</code></td><td>Maximale Anzahl von Kanten pro Knoten. Überschreibt den Grad im Factory-String. Werte im Bereich [32, 128] eignen sich für die meisten Workloads. Höhere Werte können den Recall erhöhen, verbrauchen jedoch mehr Speicher und benötigen mehr Zeit für den Aufbau.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Graphgrad minus 4</td><td>Anzahl der Kanten, die ein Knoten nach dem Pruning beibehält, sobald er den Graphgrad überschreitet.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Maximale Anzahl der Kandidaten, die beim Pruning der Nachbarn eines Knotens berücksichtigt werden. Sollte größer sein als „ <code translate="no">construction_window_size</code> “.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Gibt an, ob beim Ausdünnen alle während der Konstruktionssuche besuchten Knoten berücksichtigt werden, nicht nur die endgültigen Kandidaten.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> Standard-String-Suffix oder <code translate="no">dim / 2</code></td><td>nur LeanVec. Reduzierte Dimensionalität des Primärdatensatzes. Überschreibt das „factory-string“-Suffix. Kleinere Werte reduzieren den Speicherbedarf und beschleunigen die Graphsuche, führen jedoch zu einem geringeren Recall.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> für LeanVec</td><td>Nur LeanVec. Gibt an, ob separate Projektionen für die indizierten Vektoren und Abfragen gelernt werden sollen. Setzen Sie „ <code translate="no">False</code> “ für schnellere Erstellungen. Die Einstellung „ <code translate="no">True</code> “ für alle anderen Factory-Typen als LeanVec schlägt fehl.</td></tr>
</tbody>
</table>
<p>Die folgenden Suchparameter werden in „ <code translate="no">search_params.params</code> “ angegeben. Sie können sie auch als Build-Parameter festlegen, wodurch die Standardwerte geändert werden, die der Index für Suchvorgänge verwendet, bei denen diese Parameter nicht festgelegt sind.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Standardwert</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Anzahl der nächstgelegenen Kandidaten, die beim Durchlaufen des Graphen beibehalten werden. Größere Werte erhöhen den Recall und die Latenz.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Kapazität des Suchpuffers. Muss größer oder gleich <code translate="no">search_window_size</code> sein. In den meisten Fällen sollte dieser Wert auf <code translate="no">search_window_size</code> gesetzt werden. Bei LeanVec sollten Sie das 1,5-Fache von <code translate="no">search_window_size</code> ausprobieren.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Weitere Informationen<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Lesen Sie die <a href="https://milvus.io/docs/faiss.md">FAISS</a> -Referenz <a href="https://milvus.io/docs/faiss.md">zum Index-Passthrough</a>, um sich über den allgemeinen Factory-String-Vertrag, Grenzwerte und die Fehlerbehandlung zu informieren.</li>
<li>Vergleichen Sie dies mit der Vamana-Implementierung auf Festplatte in <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>Im <a href="https://github.com/intel/ScalableVectorSearch">SVS-Repository</a> finden Sie Details zur Erstellung, zur Leistungsoptimierung und zur zugrunde liegenden C++-API.</li>
</ul>
