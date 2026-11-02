---
id: rrf-ranker.md
title: RRF-Ranker
summary: >-
  Der „Reciprocal Rank Fusion (RRF) Ranker“ ist eine Strategie zur Neugewichtung
  der Ergebnisse bei der Milvus-Hybridsuche, die die Ergebnisse aus mehreren
  Vektorsuchpfaden auf der Grundlage ihrer Rangpositionen und nicht anhand ihrer
  reinen Ähnlichkeitswerte ausbalanciert. Ähnlich wie bei einem Sportturnier,
  bei dem die Ranglisten der Spieler und nicht die individuellen Statistiken
  berücksichtigt werden, kombiniert der RRF-Ranker die Suchergebnisse danach,
  wie hoch jedes Element in den verschiedenen Suchpfaden rangiert, und erstellt
  so eine faire und ausgewogene Endrangliste.
---
<h1 id="RRF-Ranker" class="common-anchor-header">RRF-Ranker<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Reciprocal Rank Fusion (RRF)-Ranker ist eine Strategie zur Neugewichtung der Ergebnisse bei der Milvus-Hybridsuche, die die Ergebnisse aus mehreren Vektorsuchpfaden auf der Grundlage ihrer Rangpositionen und nicht ihrer reinen Ähnlichkeitswerte ausbalanciert. Ähnlich wie bei einem Sportturnier, bei dem die Ranglisten der Spieler statt individueller Statistiken berücksichtigt werden, kombiniert der RRF-Ranker Suchergebnisse danach, wie hoch jedes Element in verschiedenen Suchpfaden rangiert, und erstellt so eine faire und ausgewogene Endrangliste.</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">Wann sollte der RRF-Ranker verwendet werden?<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Der RRF-Ranker wurde speziell für hybride Suchszenarien entwickelt, in denen Sie Ergebnisse aus mehreren Vektor-Suchpfaden ausgleichen möchten, ohne explizite Gewichtungen festzulegen. Er ist besonders effektiv für:</p>
<table>
   <tr>
     <th><p>Anwendungsfall</p></th>
     <th><p>Beispiel</p></th>
     <th><p>Warum der RRF Ranker gut funktioniert</p></th>
   </tr>
   <tr>
     <td><p>Multimodale Suche mit gleicher Gewichtung</p></td>
     <td><p>Bild-Text-Suche, bei der beide Modalitäten gleich wichtig sind</p></td>
     <td><p>Gleicht die Ergebnisse aus, ohne dass willkürliche Gewichtungen erforderlich sind</p></td>
   </tr>
   <tr>
     <td><p>Ensemble-Vektorsuche</p></td>
     <td><p>Kombination der Ergebnisse verschiedener Einbettungsmodelle</p></td>
     <td><p>Führt Rankings demokratisch zusammen, ohne die Bewertungsverteilung eines bestimmten Modells zu bevorzugen</p></td>
   </tr>
   <tr>
     <td><p>Sprachübergreifende Suche</p></td>
     <td><p>Dokumente in mehreren Sprachen finden</p></td>
     <td><p>Ordnet Ergebnisse fair ein, unabhängig von sprachspezifischen Einbettungseigenschaften</p></td>
   </tr>
   <tr>
     <td><p>Empfehlungen von Experten</p></td>
     <td><p>Kombination von Empfehlungen aus mehreren Expertensystemen</p></td>
     <td><p>Erstellt Konsens-Rankings, wenn verschiedene Systeme nicht vergleichbare Bewertungsmethoden verwenden</p></td>
   </tr>
</table>
<p>Wenn Ihre hybride Suchanwendung eine ausgewogene Gewichtung mehrerer Suchpfade erfordert, ohne explizite Gewichtungen festzulegen, ist der RRF Ranker die ideale Wahl für Sie.</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">Funktionsweise des RRF Rankers<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Hauptablauf der RRF-Ranker-Strategie sieht wie folgt aus:</p>
<ol>
<li><p><strong>Suchranglisten erfassen</strong>: Erfassen Sie die Ranglisten der Ergebnisse aus jedem Pfad der Vektorsuche (rank_1, rank_2).</p></li>
<li><p><strong>Ranglisten zusammenführen</strong>: Konvertieren Sie die Ranglisten aus jedem Pfad (rank_rrf_1, rank_rrf_2) gemäß einer Formel.</p>
<p>Die Berechnungsformel beinhaltet <em>N</em>, das die Anzahl der Abrufe darstellt. <em>ranki</em>(<em>d</em>) ist die Rangposition des Dokuments <em>d</em>, das vom <em>i-ten</em> Abrufer generiert wurde. <em>k</em> ist ein Glättungsparameter, der typischerweise auf 60 gesetzt wird.</p></li>
<li><p><strong>Ranglisten aggregieren</strong>: Ordnen Sie die Suchergebnisse auf der Grundlage der kombinierten Ranglisten neu, um die Endergebnisse zu erzeugen.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" /> 
   <span>RRF-Ranker</span>
  
 </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">Beispiel für den RRF-Ranker<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieses Beispiel veranschaulicht eine Hybrid-Suche (topK=5) auf spärlichen und dichten Vektoren und zeigt, wie die RRFRanker-Strategie die Ergebnisse aus zwei ANN-Suchen neu ordnet.</p>
<ul>
<li><p>Ergebnisse der ANN-Suche auf spärlichen Textvektoren (topK=5):</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Rang (spärlich)</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>1</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>2</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>3</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>4</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>5</p></td>
</tr>
</table></p></li>
<li><p>Ergebnisse der ANN-Suche nach dichten Textvektoren (topK=5):</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Rang (dicht)</strong></p></th>
</tr>
<tr>
<td><p>198</p></td>
<td><p>1</p></td>
</tr>
<tr>
<td><p>101</p></td>
<td><p>2</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>3</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>4</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>5</p></td>
</tr>
</table></p></li>
<li><p>Verwenden Sie RRF, um die Rangfolge der beiden Suchergebnismengen neu zu ordnen. Nehmen Sie an, dass der Glättungs <code translate="no">k</code> auf 60 gesetzt ist.</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Punktzahl (spärlich)</strong></p></th>
<th><p><strong>Punktzahl (dicht)</strong></p></th>
<th><p><strong>Endpunktzahl</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>1</p></td>
<td><p>2</p></td>
<td><p>1/(60+1)+1/(60+2) = 0,03252247</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>4</p></td>
<td><p>1</p></td>
<td><p>1/(60+4)+1/(60+1) = 0,03201844</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>5</p></td>
<td><p>4</p></td>
<td><p>1/(60+5)+1/(60+4) = 0,03100962</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>2</p></td>
<td><p>k. A.</p></td>
<td><p>1/(60+2) = 0,01612903</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>3</p></td>
<td><p>k. A.</p></td>
<td><p>1/(60+3) = 0,01587302</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>k. A.</p></td>
<td><p>3</p></td>
<td><p>1/(60+3) = 0,01587302</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>k. A.</p></td>
<td><p>5</p></td>
<td><p>1/(60+5) = 0,01538462</p></td>
</tr>
</table></p></li>
<li><p>Die Endergebnisse nach der Neureihung (topK=5):</p>
<p><table>
<tr>
<th><p><strong>Rang</strong></p></th>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Endpunktzahl</strong></p></th>
</tr>
<tr>
<td><p>1</p></td>
<td><p>101</p></td>
<td><p>0,03252247</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0,03201844</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0,03100962</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0,01612903</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0,01587302</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>110</p></td>
<td><p>0,01587302</p></td>
</tr>
</table></p></li>
</ul>
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">Verwendung des RRF-Rankers<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei Verwendung der RRF-Reranking-Strategie müssen Sie den Parameter „ <code translate="no">k</code> “ konfigurieren. Dabei handelt es sich um einen Glättungsparameter, mit dem sich die relativen Gewichte von Volltextsuche und Vektorsuche effektiv verändern lassen. Der Standardwert dieses Parameters beträgt 60 und kann in einem Bereich von (0, 16384) angepasst werden. Der Wert sollte eine Gleitkommazahl sein. Der empfohlene Wert liegt zwischen [10, 100]. Während „ <code translate="no">k=60</code> “ eine gängige Wahl ist, kann der optimale Wert für „ <code translate="no">k</code> “ je nach Ihren spezifischen Anwendungen und Datensätzen variieren. Wir empfehlen, diesen Parameter basierend auf Ihrem spezifischen Anwendungsfall zu testen und anzupassen, um die beste Leistung zu erzielen.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Erstellen Sie einen RRF-Ranker<button data-href="#Create-an-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Ihre Sammlung mit mehreren Vektorfeldern eingerichtet wurde, erstellen Sie einen RRF-Ranker mit einem geeigneten Glättungsparameter:</p>
<div class="alert note">
<p>Ab Milvus 2.6.x können Sie Reranking-Strategien direkt über die „ <code translate="no">Function</code> “-API konfigurieren. Wenn Sie eine frühere Version (vor v2.6.0) verwenden, finden Sie Anweisungen zur Einrichtung in der <a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-RRFRanker">Reranking-Dokumentation</a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

rerank := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;rrf&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;rrf&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">functions</span>=<span class="hljs-string">&#x27;[
  {
    &quot;name&quot;: &quot;rrf&quot;,
    &quot;type&quot;: &quot;RERANK&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;params&quot;: {
      &quot;reranker&quot;: &quot;rrf&quot;,
      &quot;k&quot;: 100
    }
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wert/Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Eindeutige Kennung für diese Funktion</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Vektorfelder, auf die die Funktion angewendet werden soll (muss für den RRF-Ranker leer sein)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Typ der aufzurufenden Funktion; verwenden Sie „ <code translate="no">RERANK</code> “, um eine Neureihenbildungsstrategie festzulegen</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Legt die zu verwendende Neureihenbildungsmethode fest.</p><p>Muss auf „ <code translate="no">rrf</code> “ gesetzt sein, um den RRF-Ranker zu verwenden.</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Glättungsparameter, der den Einfluss der Dokumentenranglisten steuert; ein höherer Wert für „ <code translate="no">k</code> “ verringert die Empfindlichkeit gegenüber den obersten Ranglisten. Bereich: (0, 16384); Standard: „ <code translate="no">60</code> “.</p><p>Weitere Informationen finden Sie unter <a href="/docs/de/rrf-ranker.md#Mechanism-of-RRF-Ranker">„Funktionsweise des RRF-Rankers</a>“.</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Anwendung bei der hybriden Suche<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Der RRF-Ranker wurde speziell für hybride Suchvorgänge entwickelt, bei denen mehrere Vektorfelder kombiniert werden. So wenden Sie ihn bei einer hybriden Suche an:</p>
<p>Die Beispiele gehen von einer vorhandenen Sammlung mit einer Text-Embedding-Funktion für „ <code translate="no">text_vector</code> “ und einem vorbereiteten Bild-Embedding aus, das der Dimension von „ <code translate="no">image_vector</code> “ entspricht. Ersetzen Sie den Namen der Sammlung und das Bild-Embedding durch Ihre eigenen Werte.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest, RRFRanker

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Create an RRF ranker with smoothing parameter k</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> RRFRanker.builder()
                .k(<span class="hljs-number">100</span>)
                .build();

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

<span class="hljs-comment">// Define text vector search request</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, entity.Text(<span class="hljs-string">&quot;modern dining table&quot;</span>))

<span class="hljs-comment">// Define image vector search request</span>
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, entity.FloatVector(imageEmbedding))

<span class="hljs-comment">// Apply RRF Ranker to product hybrid search</span>
rerank := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch,
).WithReranker(rerank).WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
    .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;modern dining table&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply RRF Ranker to product hybrid search</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">hybrid_results</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(RRFRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">k</span>(<span class="hljs-number">100</span>))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> connect_status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::ConnectParam{
    <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>});
<span class="hljs-keyword">if</span> (!connect_status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; connect_status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">auto</span> text_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
                    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>);

<span class="hljs-keyword">auto</span> image_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
                    .<span class="hljs-built_in">AddFloatVector</span>(image_embedding);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(text_search)))
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(image_search)))
                    .<span class="hljs-built_in">WithRerank</span>(rerank)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
    <span class="hljs-attr">params</span>: {},
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-attr">k</span>: <span class="hljs-number">100</span>,
  },
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Connect to Milvus server</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Assume you have a collection setup</span>

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = [<span class="hljs-string">&quot;modern dining table&quot;</span>],
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = [imageEmbedding], <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> RrfReranker(<span class="hljs-number">100</span>);

<span class="hljs-comment">// Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment">// The smoothing parameter k controls the balance</span>
SearchResp hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = [textSearch, imageSearch], <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank, <span class="hljs-comment">// Apply the RRF ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Set IMAGE_EMBEDDING to your image vector as a JSON array before running this request.</span>
: <span class="hljs-string">&quot;<span class="hljs-variable">${IMAGE_EMBEDDING:?Set IMAGE_EMBEDDING to a JSON array of embedding values}</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-binary @- &lt;&lt;<span class="hljs-string">EOF
{
    &quot;collectionName&quot;: &quot;collection_name&quot;,
    &quot;search&quot;: [
        {
            &quot;data&quot;: [&quot;modern dining table&quot;],
            &quot;annsField&quot;: &quot;text_vector&quot;,
            &quot;limit&quot;: 10
        },
        {
            &quot;data&quot;: [${IMAGE_EMBEDDING}],
            &quot;annsField&quot;: &quot;image_vector&quot;,
            &quot;limit&quot;: 10
        }
    ],
    &quot;rerank&quot;: {
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {
            &quot;k&quot;: 100
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;product_name&quot;, &quot;price&quot;, &quot;category&quot;]
}
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen zur hybriden Suche finden Sie unter <a href="/docs/de/multi-vector-search.md">„Multi-Vector Hybrid Search</a>“.</p>
