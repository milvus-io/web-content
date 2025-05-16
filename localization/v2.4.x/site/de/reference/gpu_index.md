---
id: gpu_index.md
related_key: gpu_index
summary: GPU-Index-Mechanismus in Milvus.
title: GPU-Index
---
<h1 id="GPU-Index" class="common-anchor-header">GPU-Index<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt verschiedene GPU-Indextypen, um die Suchleistung und -effizienz zu beschleunigen, insbesondere in Szenarien mit hohem Durchsatz und hohem Wiederaufruf. Dieses Thema bietet einen Überblick über die von Milvus unterstützten GPU-Indextypen, ihre geeigneten Anwendungsfälle und Leistungsmerkmale. Informationen zur Erstellung von Indizes mit GPU finden Sie unter <a href="/docs/de/v2.4.x/index-with-gpu.md">Index mit GPU</a>.</p>
<p>Es ist wichtig zu beachten, dass die Verwendung eines GPU-Index nicht unbedingt die Latenzzeit im Vergleich zu einem CPU-Index reduziert. Wenn Sie den Durchsatz vollständig maximieren möchten, benötigen Sie einen extrem hohen Anfragedruck oder eine große Anzahl von Abfragevektoren.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>Leistung</span> </span></p>
<p>Die GPU-Unterstützung von Milvus wird vom Nvidia <a href="https://rapids.ai/">RAPIDS-Team</a> beigesteuert. Im Folgenden sind die GPU-Indextypen aufgeführt, die derzeit von Milvus unterstützt werden.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA ist ein graphbasierter Index, der für GPUs optimiert ist. Die Verwendung von GPUs mit Inferenzqualität zur Ausführung der GPU-Version von Milvus kann im Vergleich zur Verwendung teurer GPUs mit Trainingsqualität kostengünstiger sein.</p>
<ul>
<li><p>Parameter für die Indexerstellung</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Beeinflusst Recall und Erstellungszeit, indem der Grad des Graphen vor dem Pruning bestimmt wird. Empfohlene Werte sind <code translate="no">32</code> oder <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Beeinflusst die Suchleistung und den Abruf, indem der Grad des Graphen nach dem Pruning festgelegt wird. Eine größere Differenz zwischen diesen beiden Graden führt zu einer längeren Erstellungszeit. Sein Wert muss kleiner sein als der Wert von <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Wählt den Graphenerzeugungsalgorithmus vor dem Pruning. Mögliche Werte:</br><code translate="no">IVF_PQ</code>: Bietet eine höhere Qualität, aber eine langsamere Erstellungszeit.</br> <code translate="no">NN_DESCENT</code> Bietet einen schnelleren Aufbau mit potenziell geringerer Wiedererkennung.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Legt fest, ob der Originaldatensatz im GPU-Speicher zwischengespeichert werden soll. Mögliche Werte:</br><code translate="no">“true”</code>: Zwischenspeichern des Originaldatensatzes zur Verbesserung der Wiederauffindung durch Verfeinerung der Suchergebnisse.</br> <code translate="no">“false”</code> Cache: Der Originaldatensatz wird nicht zwischengespeichert, um GPU-Speicher zu sparen.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Bestimmt die Größe der Zwischenergebnisse, die während der Suche gespeichert werden. Ein größerer Wert kann die Wiederauffindbarkeit auf Kosten der Suchleistung verbessern. Er sollte mindestens dem endgültigen Top-k-Wert (Grenzwert) entsprechen und ist normalerweise eine Potenz von 2 (z. B. 16, 32, 64, 128).</td><td>Leer</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Gibt die Anzahl der Einstiegspunkte in den CAGRA-Graphen während der Suche an. Eine Erhöhung dieses Wertes kann die Wiederauffindbarkeit verbessern, kann sich aber auf die Suchleistung auswirken（z.B. 1, 2, 4, 8, 16, 32).</td><td>Leer</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Steuert den Iterationsprozess der Suche. Standardmäßig sind sie auf <code translate="no">0</code> eingestellt, und CAGRA bestimmt automatisch die Anzahl der Iterationen auf der Grundlage von <code translate="no">itopk_size</code> und <code translate="no">search_width</code>. Eine manuelle Anpassung dieser Werte kann helfen, Leistung und Genauigkeit auszugleichen.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Gibt die Anzahl der CUDA-Threads an, die für die Berechnung des metrischen Abstands auf dem Grafikprozessor verwendet werden. Übliche Werte sind eine Potenz von 2 bis zu 32 (z. B. 2, 4, 8, 16, 32). Er hat einen geringen Einfluss auf die Suchleistung. Der Standardwert ist <code translate="no">0</code>, wobei Milvus die <code translate="no">team_size</code> automatisch auf der Grundlage der Vektordimension auswählt.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Grenzen für die Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (Top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (Top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Ähnlich wie <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> unterteilt auch GPU_IVF_FLAT die Vektordaten in <code translate="no">nlist</code> Cluster-Einheiten und vergleicht dann die Abstände zwischen dem Zieleingabevektor und dem Zentrum jedes Clusters. Abhängig von der Anzahl der Cluster, die das System abfragt (<code translate="no">nprobe</code>), werden die Ergebnisse der Ähnlichkeitssuche nur auf der Grundlage von Vergleichen zwischen der Zieleingabe und den Vektoren in den ähnlichsten Clustern zurückgegeben, was die Abfragezeit drastisch reduziert.</p>
<p>Durch die Anpassung von <code translate="no">nprobe</code> kann ein ideales Gleichgewicht zwischen Genauigkeit und Geschwindigkeit für ein bestimmtes Szenario gefunden werden. Die Ergebnisse des <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT-Leistungstests</a> zeigen, dass die Abfragezeit stark ansteigt, wenn sowohl die Anzahl der Zieleingangsvektoren (<code translate="no">nq</code>) als auch die Anzahl der zu durchsuchenden Cluster (<code translate="no">nprobe</code>) zunimmt.</p>
<p>GPU_IVF_FLAT ist der einfachste IVF-Index, und die in jeder Einheit gespeicherten kodierten Daten stimmen mit den Originaldaten überein.</p>
<p>Bei der Durchführung von Suchvorgängen ist zu beachten, dass Sie bei jeder Suche in einer mit GPU_IVF_FLAT indizierten Sammlung den Top-K-Wert auf bis zu 256 setzen können.</p>
<ul>
<li><p>Parameter für die Indexerstellung</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Legt fest, ob der Originaldatensatz im GPU-Speicher zwischengespeichert werden soll. Mögliche Werte:</br><code translate="no">“true”</code>: Zwischenspeichern des Originaldatensatzes zur Verbesserung der Wiedererkennung durch Verfeinerung der Suchergebnisse.</br> <code translate="no">“false”</code> Cache: Der Originaldatensatz wird nicht zwischengespeichert, um GPU-Speicher zu sparen.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Allgemeine Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Grenzen für die Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (Top-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Produktquantisierung) zerlegt den ursprünglichen hochdimensionalen Vektorraum gleichmäßig in kartesische Produkte von <code translate="no">m</code> niedrigdimensionalen Vektorräumen und quantisiert dann die zerlegten niedrigdimensionalen Vektorräume. Anstatt die Abstände zwischen dem Zielvektor und dem Zentrum aller Einheiten zu berechnen, ermöglicht die Produktquantisierung die Berechnung der Abstände zwischen dem Zielvektor und dem Clustering-Zentrum jedes niedrigdimensionalen Raums und reduziert die Zeit- und Raumkomplexität des Algorithmus erheblich.</p>
<p>IVF_PQ führt das IVF-Index-Clustering durch, bevor das Produkt der Vektoren quantisiert wird. Seine Indexdatei ist sogar noch kleiner als IVF_SQ8, aber auch hier kommt es zu einem Verlust an Genauigkeit bei der Suche nach Vektoren.</p>
<div class="alert note">
<p>Die Parameter für die Indexerstellung und die Suchparameter variieren je nach Milvus-Verteilung. Wählen Sie zunächst Ihre Milvus-Distribution aus.</p>
<p>Beachten Sie bei der Durchführung von Suchvorgängen, dass Sie den Top-K-Wert für jede Suche gegen eine GPU_IVF_FLAT-indizierte Sammlung auf bis zu 8192 einstellen können.</p>
</div>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Anzahl der Faktoren der Produktquantisierung,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Optional] Anzahl der Bits, in denen jeder niedrigdimensionale Vektor gespeichert wird.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Legt fest, ob der Originaldatensatz im GPU-Speicher zwischengespeichert werden soll. Mögliche Werte:</br><code translate="no">“true”</code>: Zwischenspeichern des Originaldatensatzes zur Verbesserung der Wiedererkennung durch Verfeinerung der Suchergebnisse.</br> <code translate="no">“false”</code> Cache: Der Originaldatensatz wird nicht zwischengespeichert, um GPU-Speicher zu sparen.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Allgemeine Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Grenzen für die Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (Top-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE ist auf Fälle zugeschnitten, in denen eine extrem hohe Trefferquote entscheidend ist. Sie garantiert eine Trefferquote von 1, indem sie jede Abfrage mit allen Vektoren des Datensatzes vergleicht. Es benötigt nur den metrischen Typ (<code translate="no">metric_type</code>) und Top-k (<code translate="no">limit</code>) als Indexaufbau- und Suchparameter.</p>
<p>Für GPU_BRUTE_FORCE sind keine zusätzlichen Indexerstellungs- oder Suchparameter erforderlich.</p>
<h2 id="Conclusion" class="common-anchor-header">Schlussfolgerung<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Derzeit lädt Milvus alle Indizes in den GPU-Speicher, um effiziente Suchvorgänge zu ermöglichen. Die Menge der Daten, die geladen werden können, hängt von der Größe des GPU-Speichers ab:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: Der Speicherbedarf beträgt etwa das 1,8-fache der ursprünglichen Vektordaten.</li>
<li><strong>GPU_IVF_FLAT</strong> und <strong>GPU_BRUTE_FORCE</strong>: Benötigt Speicher, der der Größe der Originaldaten entspricht.</li>
<li><strong>GPU_IVF_PQ</strong>: Verwendet einen kleineren Speicherbedarf, der von den Einstellungen der Komprimierungsparameter abhängt.</li>
</ul>
