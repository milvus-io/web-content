---
id: gpu_index.md
related_key: gpu_index
summary: Milvus 中的 GPU 索引機制。
title: GPU 索引
---

<h1 id="GPU-Index" class="common-anchor-header">GPU 索引<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支援多種 GPU 索引類型，以加速搜尋效能與效率，尤其是在高吞吐量與高回撥的情況下。本主題概述 Milvus 支援的 GPU 索引類型、適合的使用案例以及效能特性。有關使用 GPU 建立索引的資訊，請參閱<a href="/docs/zh-hant/v2.5.x/index-with-gpu.md">Index with GPU</a>。</p>
<p>值得注意的是，與使用 CPU 索引相比，使用 GPU 索引不一定會減少延遲。如果您想要完全發揮吞吐量的最大效益，您需要極高的請求壓力或大量的查詢向量。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>效能</span> </span></p>
<p>Milvus 的 GPU 支援由 Nvidia<a href="https://rapids.ai/">RAPIDS</a>團隊貢獻。以下是 Milvus 目前支援的 GPU 索引類型。</p>
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
    </button></h2><p>GPU_CAGRA 是針對 GPU 最佳化的圖形索引，相較於使用昂貴的訓練級 GPU，使用推理級 GPU 來執行 Milvus GPU 版本可以更符合成本效益。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>影響召回率和建立時間，方法是在剪枝之前先決定圖表的度。建議值為<code translate="no">32</code> 或<code translate="no">64</code> 。</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>影響搜尋效能和召回率，方法是在剪枝後設定圖表的度。這兩個程度之間的差異越大，建立時間越長。其值必須小於<strong>intermediate_graph_degree</strong> 的值。</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>選擇剪枝前的圖形生成演算法。可能的值：</br><code translate="no">IVF_PQ</code>:提供更高的品質，但建立時間較慢。</br><code translate="no">NN_DESCENT</code>: 提供更快的建立速度，但召回率可能較低。</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>決定是否在 GPU 記憶體中快取原始資料集。可能的值：</br><code translate="no">“true”</code>:快取原始資料集，藉由精煉搜尋結果來提高召回率。</br><code translate="no">“false”</code>：不快取原始資料集以節省 GPU 記憶體。</td><td><code translate="no">“false”</code></td></tr>
<tr><td><code translate="no">adapt_for_cpu</code></td><td>決定是否使用 GPU 建立索引，並使用 CPU 進行搜尋。<br/>將此參數設定為<code translate="no">true</code> 需要在搜尋請求中有<code translate="no">ef</code> 參數。</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>決定搜尋期間保留的中間結果大小。較大的值可能會提高召回率，但會犧牲搜尋效能。它應該至少等於最終 top-k (限制) 值，而且通常是 2 的幂次 (例如 16、32、64、128)。</td><td>空</td></tr>
<tr><td><code translate="no">search_width</code></td><td>指定搜尋期間進入 CAGRA 圖形的入口點數量。增加此值可提高召回率，但可能會影響搜尋效能（例如：1、2、4、8、16、32）。</td><td>空</td></tr>
<tr><td><code translate="no">min_iterations</code> /<code translate="no">max_iterations</code></td><td>控制搜尋的迭代過程。預設值為<code translate="no">0</code> ，CAGRA 會根據<code translate="no">itopk_size</code> 和<code translate="no">search_width</code> 自動決定迭代次數。手動調整這些值有助於平衡效能與精確度。</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>指定用於計算 GPU 公制距離的 CUDA 線程數。常見的值是 2 的幂次，最高為 32 (例如 2、4、8、16、32)。它對搜尋效能影響不大。預設值是<code translate="no">0</code> ，Milvus 會根據向量維度自動選擇<code translate="no">team_size</code> 。</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">ef</code></td><td>指定查詢時間/精確度的權衡。<code translate="no">ef</code> 值越高，搜尋準確度越高，但搜尋速度越慢。<br/>如果您在建立索引時將<code translate="no">adapt_for_cpu</code> 設定為<code translate="no">true</code> ，則必須使用此參數。</td><td><code translate="no">[top_k, int_max]</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>搜尋限制</p>
<table>
<thead>
<tr><th>參數</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32,<code translate="no">search_width</code>)* 32</td></tr>
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
    </button></h2><p>與<a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> 相似，GPU_IVF_<a href="https://milvus.io/docs/index.md#IVF_FLAT">FLAT</a> 也會將向量資料分割成<code translate="no">nlist</code> 叢集單位，然後比較目標輸入向量與每個叢集中心的距離。根據系統設定查詢的叢集數量 (<code translate="no">nprobe</code>)，類似性搜尋結果只會根據目標輸入與最相似叢集中向量的比較結果傳回 - 大幅縮短查詢時間。</p>
<p>透過調整<code translate="no">nprobe</code> ，可以在特定情況下找到精確度與速度之間的理想平衡。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT 效能測試</a>的結果顯示，當目標輸入向量的數量 (<code translate="no">nq</code>) 和要搜尋的叢集數量 (<code translate="no">nprobe</code>) 增加時，查詢時間也會大幅增加。</p>
<p>GPU_IVF_FLAT 是最基本的 IVF 索引，每個單元儲存的編碼資料與原始資料一致。</p>
<p>在進行搜尋時，請注意您可以針對 GPU_IVF_FLAT 索引的資料集，將任何搜尋的 top-K 設定為最高 256。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群組單位數量</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>決定是否在 GPU 記憶體中快取原始資料集。可能的值：</br><code translate="no">“true”</code>:快取原始資料集，藉由精煉搜尋結果來提高召回率。</br><code translate="no">“false”</code>: 不快取原始資料集，以節省 GPU 記憶體。</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>一般搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>搜尋限制</p>
<table>
<thead>
<tr><th>參數</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=<code translate="no">2048</code></td></tr>
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
    </button></h2><p><code translate="no">PQ</code> (Product Quantization) 將原始的高維向量空間均勻地分解為 低維向量空間的笛卡兒乘積，然後將分解後的低維向量空間進行量化。乘積量化不需要計算目標向量與所有單元中心的距離，可以計算目標向量與每個低維空間的聚類中心的距離，大大降低了演算法的時間複雜度和空間複雜度。<code translate="no">m</code> </p>
<p>IVF_PQ 在量化向量的乘積之前先執行 IVF 索引聚類。其索引檔案比 IVF_SQ8 更小，但在搜尋向量時也會造成精確度的損失。</p>
<div class="alert note">
<p>索引建立參數和搜尋參數因 Milvus 分佈而異。請先選擇您的 Milvus 分佈。</p>
<p>進行搜尋時，請注意您可以針對 GPU_IVF_FLAT 索引集合的任何搜尋，將 top-K 設定為最高 8192。</p>
</div>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群組單位數量</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>乘積量化的因子數、</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Optional] 每個低維向量儲存的位元數。</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>決定是否在 GPU 記憶體中快取原始資料集。可能的值：</br><code translate="no">“true”</code>:快取原始資料集，藉由精煉搜尋結果來提高召回率。</br><code translate="no">“false”</code>: 不快取原始資料集，以節省 GPU 記憶體。</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>一般搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>搜尋限制</p>
<table>
<thead>
<tr><th>參數</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=<code translate="no">1024</code></td></tr>
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
    </button></h2><p>GPU_BRUTE_FORCE 適用於對召回率要求極高的情況，透過將每個查詢與資料集中的所有向量進行比較，保證召回率為 1。它只需要度量類型 (<code translate="no">metric_type</code>) 和 top-k (<code translate="no">limit</code>) 作為索引建立和搜尋參數。</p>
<p>對於 GPU_BRUTE_FORCE，不需要額外的索引建立參數或搜尋參數。</p>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，Milvus 會將所有索引載入 GPU 記憶體，以進行有效率的搜尋作業。可載入的資料量取決於 GPU 記憶體的大小：</p>
<ul>
<li><strong>GPU_CAGRA</strong>：記憶體使用量約為原始向量資料的 1.8 倍。</li>
<li><strong>GPU_IVF_FLAT</strong>和<strong>GPU_BRUTE_FORCE</strong>：需要相等於原始資料大小的記憶體。</li>
<li><strong>GPU_IVF_PQ</strong>: 使用較小的記憶體佔用量，這取決於壓縮參數的設定。</li>
</ul>
