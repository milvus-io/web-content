---
id: choose-an-embeddinglist-search-strategy.md
title: 選擇 EmbeddingList 搜尋策略
summary: >-
  EmbeddingList 搜尋策略決定 Milvus 如何為 EmbeddingList 搜尋建立近似候選索引。預設策略為
  tokenann。當嵌入清單規模龐大、TokenANN 的運算成本過高，或是學習所得／壓縮的行級表示法更為適合時，您可以切換至 muvera 或
  lemur。 當啟用 `emb_list_rerank` 時，最終結果仍由 MaxSim 重新排序產生。
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">選擇 EmbeddingList 搜尋策略<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>EmbeddingList 搜尋策略決定 Milvus 如何為 EmbeddingList 搜尋建立近似候選索引。預設策略為「<code translate="no">tokenann</code> 」。當嵌入清單規模龐大、TokenANN 運算成本過高，或學習型／壓縮的行級表示法更為合適時，您可以切換至「<code translate="no">muvera</code> 」或「<code translate="no">lemur</code> 」。 當啟用「<code translate="no">emb_list_rerank</code> 」時，最終結果仍由 MaxSim 重新排序產生。</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">為何需要搜尋策略<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingList 專為包含多個向量的行而設計，例如文本文件中的標記嵌入、視覺文件中的片段嵌入，或是影片中的片段嵌入。MaxSim 並非將一個查詢向量與一個行向量進行比對，而是將查詢嵌入清單與文件嵌入清單進行比對，並彙總最佳匹配結果。</p>
<p>這提供了更強的表徵能力，但大規模執行精確 MaxSim 運算的開銷過高。若採用暴力搜尋方式執行 MaxSim，則需將查詢向量與每個候選列中的每個向量進行比對，這通常會導致生產環境中的搜尋速度過慢。</p>
<table>
<thead>
<tr><th>### 問題 - 每行可能包含多個向量。 - 對所有行執行精確 MaxSim 運算成本過高。 - 索引大小與搜尋延遲可能迅速增加。</th><th>### 策略 - 採用近似的第一階段檢索方法。 - 檢索的候選項目數量多於請求的 topK。 - 透過精確 MaxSim 對候選項目進行重新排序。</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>從這個角度來看，<code translate="no">emb_list_strategy</code> 主要是一種索引建置與候選項檢索策略。它在建置索引時進行配置，並決定如何產生第一階段的 ANN 候選集。隨後，搜尋時的參數（例如<code translate="no">retrieval_ann_ratio</code> 和<code translate="no">emb_list_rerank</code> ）則控制檢索的候選項數量，以及是否套用 MaxSim 重新排序。</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">可用策略<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>策略</th><th>候選解檢索單元</th><th>解決的問題</th><th>最佳匹配</th><th>主要權衡</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>每行內的個別向量</td><td>保留原始向量，並避免壓縮損失。</td><td>以品質為優先的搜尋、短或中長度的嵌入清單、高辨別力的嵌入向量。</td><td>索引較大，且候選項檢索成本較高。</td></tr>
<tr><td><code translate="no">muvera</code></td><td>每行一個編碼向量</td><td>無需訓練即可將嵌入清單壓縮為固定維度的 FDE 表示形式。</td><td>適用於較長的文件、高辨別力的嵌入向量，以及 TokenANN 過於耗資源的情況。</td><td>隨機投影會引入近似誤差；FDE 維度會影響延遲。</td></tr>
<tr><td><code translate="no">lemur</code></td><td>每行一個學習到的向量</td><td>從嵌入向量列表學習針對特定語料庫的壓縮方法，將其轉換為固定維度的行向量。</td><td>低區分度嵌入、多模態或視覺文檔檢索、大型嵌入清單。</td><td>需要進行訓練，且可能受語料庫分佈及文件長度偏誤的影響。</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> 會為嵌入向量列表中的每個向量建立索引。在搜尋過程中，每個查詢向量會執行人工神經網路（ANN）檢索，匹配的向量會彙總回其所在的行，並使用 MaxSim 對所得的行候選項進行重新排序。</p>
<div class="alert note">
<p><strong>當品質是首要考量時，請使用 TokenANN。</strong>由於它在第一階段索引中保留了所有向量，因此這是最接近原始 MaxSim 運算的近似方法。</p>
</div>
<ul>
<li><p><strong>適用情境：</strong>短篇文字片段、向量數量較少或適中的行、強烈的標記層級語義分離，以及對品質要求嚴苛的基準測試。</p></li>
<li><p><strong>較不適用：</strong>極長的文件、含有數千個片段向量的視覺頁面，以及記憶體或延遲資源嚴格受限的情況。</p></li>
<li><p><strong>元素層級行為：</strong>TokenANN 可在將向量彙總回列之前，從個別向量中檢索候選項。經過 MaxSim 評分後，最終的 EmbeddingList 搜尋結果仍為列層級。</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> 透過隨機投影，將每個嵌入清單編碼為固定維度的向量。這將第一階段檢索轉變為標準的行級向量搜尋。隨後使用 MaxSim 對候選結果進行重新排序。</p>
<div class="alert note">
<p><strong>當 TokenANN 過於耗資源，但您又不希望進行訓練步驟時，請使用 MUVERA。</strong>這是品質與成本之間務實的折衷方案。</p>
</div>
<ul>
<li><p><strong>適用情境：</strong>長篇文本文件、高辨別力的嵌入空間，以及需要比 TokenANN 更小索引大小的作業負載。</p></li>
<li><p><strong>較不適用：</strong>低辨別力的嵌入空間，或當 FDE 表示法因維度過高而超出延遲預算的情況。</p></li>
<li><p><strong>重要參數：</strong><code translate="no">muvera_num_projections</code> 、<code translate="no">muvera_num_repeats</code> 以及<code translate="no">muvera_seed</code> 。</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> 透過訓練模型，將每個嵌入清單壓縮為固定維度的表示。第一階段的 ANN 搜尋會針對已學習的行級向量進行，並使用 MaxSim 對候選結果進行重新排序。</p>
<div class="alert note">
<p><strong>當學習壓縮的效益足以抵銷訓練成本時，應使用 LEMUR。</strong>它對於低辨別度嵌入空間和多模態檢索效果良好，但應針對目標語料庫進行驗證，因為其效果可能受文件長度分佈的影響。</p>
</div>
<ul>
<li><p><strong>適用情境：</strong>視覺文件檢索、多模態片段嵌入、低區分度嵌入空間，以及 TokenANN 難以實作的大型嵌入清單。</p></li>
<li><p><strong>較不適用：</strong>頻繁變動的語料庫、文件長度高度偏斜的高區分度嵌入空間，以及訓練成本無法接受的工作負載。</p></li>
<li><p><strong>重要參數：</strong><code translate="no">lemur_hidden_dim</code> 、<code translate="no">lemur_num_train_samples</code> 、<code translate="no">lemur_num_epochs</code> 、<code translate="no">lemur_batch_size</code> 、<code translate="no">lemur_learning_rate</code> 、<code translate="no">lemur_seed</code> 以及<code translate="no">lemur_num_layers</code> 。</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">預設行為與設定<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere 中的預設 EmbeddingList 策略為<code translate="no">tokenann</code> 。若未指定<code translate="no">emb_list_strategy</code> ，Knowhere 將使用 TokenANN。搜尋時的預設值包含<code translate="no">retrieval_ann_ratio=3.0</code> 及<code translate="no">emb_list_rerank=true</code> 。</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">各策略的配置項目<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了各策略專屬的配置項目。在 Milvus 中，建置時的配置項目通常會在建立索引時透過<code translate="no">params</code> 映射傳入。若需伺服器端的預設值，應在 Milvus 配置檔案的<code translate="no">knowhere</code> 區段中進行定義。</p>
<table>
<thead>
<tr><th>策略</th><th>配置項目</th><th>階段</th><th>預設值</th><th>何時應變更</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>索引建立</td><td><code translate="no">tokenann</code></td><td>當您希望採用預設的元素向量索引行為，或使用 DiskANN 時，請明確使用此設定。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>索引建置</td><td><code translate="no">tokenann</code></td><td>當您希望在無需訓練的情況下進行行級別的編碼檢索時，請使用此選項。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>建立索引</td><td><code translate="no">4</code></td><td>控制 SimHash 的投影次數。較高的數值會建立更多桶位，可能提升編碼品質，但會增加編碼維度。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>索引建置</td><td><code translate="no">7</code></td><td>控制要串接多少個獨立的 FDE 編碼。較高的數值可能提升魯棒性，但會增加索引/搜尋成本。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>索引建立</td><td><code translate="no">42</code></td><td>用於設定可重現的隨機投影，特別是在測試和基準比較中。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>索引建置</td><td><code translate="no">tokenann</code></td><td>當預期學習型行級壓縮的效果優於固定隨機投影時，請使用此設定。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>索引建置</td><td><code translate="no">256</code></td><td>控制壓縮表示的大小。增加數值可提升容量；減少數值則可降低記憶體佔用並加快檢索速度。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>索引建立</td><td><code translate="no">20000</code></td><td>當語料庫多樣性高且學習到的壓縮效果不足時，應增加此參數；僅在進行小型測試或需加快建置速度時才應減少。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>索引建置</td><td><code translate="no">50</code></td><td>若訓練尚未收斂，請增加；若建置時間是主要限制因素，則減少。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>索引建置</td><td><code translate="no">512</code></td><td>請根據訓練吞吐量與記憶體使用量進行調整。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>索引建置</td><td><code translate="no">0.001</code></td><td>當訓練不穩定或收斂過慢時進行調整。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>索引建置</td><td><code translate="no">42</code></td><td>設定此選項以確保訓練過程可重複。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>建立索引</td><td><code translate="no">2</code></td><td>僅在語料庫需要更具表現力的特徵提取器，且您能負擔額外訓練成本時才增加。</td></tr>
<tr><td>所有策略</td><td><code translate="no">retrieval_ann_ratio</code></td><td>搜尋</td><td><code translate="no">3.0</code></td><td>增加此參數可檢索更多第一階段候選項並提升召回率；減少此參數則可降低延遲。</td></tr>
<tr><td>所有策略</td><td><code translate="no">emb_list_rerank</code></td><td>搜尋</td><td><code translate="no">true</code></td><td>請保持啟用狀態以進行 MaxSim 重新排序。僅在直接測量第一階段人工神經網路（ANN）品質的受控實驗中才應停用。</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">在 Milvus 中設定策略<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，建立 EmbeddingList 欄位（例如 StructArray 向量子欄位）的索引時，會將策略作為索引參數傳入。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>對於 LEMUR，請在同一個 `<code translate="no">params</code> ` 映射中提供 LEMUR 訓練參數。</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">在 Milvus 中設定伺服器端預設值<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 亦可從 `<code translate="no">milvus.yaml</code>` 載入索引參數。相關章節請參閱<code translate="no">knowhere</code> 。參數依索引類型與階段進行組織，採用<code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code> 的命名模式。使用者提供的索引參數優先於這些預設值。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>建議優先使用「按索引設定」的參數來選擇策略。</strong>Milvus 配置檔案中的預設值會廣泛套用至該類型與階段的所有索引。當不同集合或欄位需要不同的 EmbeddingList 策略時，請使用<code translate="no">create_index</code> 中的參數。</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">在搜尋時配置候選結果檢索<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>策略決定索引的建構方式。在搜尋時，請使用<code translate="no">retrieval_ann_ratio</code> 來控制在進行 MaxSim 重新排序之前，會檢索多少個第一階段候選結果。較高的數值通常能提升召回率，但會增加延遲。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>參數</th><th>階段</th><th>預設值</th><th>含義</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>索引建置</td><td><code translate="no">tokenann</code></td><td>選擇 EmbeddingList 候選項的索引建立與檢索方式。</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>搜尋</td><td><code translate="no">3.0</code></td><td>第一輪人工神經網路（ANN）運算的候選項擴展因子。</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>搜尋</td><td><code translate="no">true</code></td><td>是否使用 MaxSim 對檢索到的候選項進行重新排序。</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>相容性說明：</strong>MUVERA 和 LEMUR 目前在 Knowhere 中僅支援 fp32 資料。DiskANN 僅在採用 TokenANN 策略時才支援 EmbeddingList。若您使用非 fp32 的向量類型或 DiskANN，請在變更預設值前確認該策略是否受支援。</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">如何選擇策略<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>沒有放諸四海皆準的最佳策略。請根據嵌入清單長度、嵌入空間的辨別能力、延遲預算、索引大小，以及您是否能負擔訓練步驟等因素來選擇。</p>
<table>
<thead>
<tr><th>問題</th><th>Signal</th><th>建議的起點</th></tr>
</thead>
<tbody>
<tr><td>您是否需要高品質的基準模型？</td><td>您希望在優化成本之前，先評估最佳的實用近似解。</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>各列的向量數量是較少還是中等？</td><td>每行包含少量標記、片段或片段向量。</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokenANN 是否過大或過慢？</td><td>索引大小或第一階段檢索延遲是瓶頸。</td><td><code translate="no">muvera</code></td></tr>
<tr><td>您是否希望在不進行訓練的情況下進行壓縮？</td><td>您需要更簡單的運作模型和可重現的編碼方式。</td><td><code translate="no">muvera</code></td></tr>
<tr><td>嵌入空間的分辨率是否過低？</td><td>字元層級的 ANN 候選模型存在噪聲，而隨機投影無法保留足夠的訊號。</td><td><code translate="no">lemur</code></td></tr>
<tr><td>工作負載屬於視覺型還是多模態型？</td><td>行中包含許多片段向量，而 TokenANN 的運算成本過高。</td><td><code translate="no">lemur</code> 或<code translate="no">muvera</code></td></tr>
<tr><td>文件長度是否高度偏斜？</td><td>某些行所含的向量遠多於其他行。</td><td>請先從<code translate="no">muvera</code> 開始；並仔細驗證<code translate="no">lemur</code> 。</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">建議的評估工作流程<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>當資料集大小允許時，請以<code translate="no">tokenann</code> 作為品質基準。</p></li>
<li><p>針對<code translate="no">muvera</code> 執行相同的查詢，並比較召回率、nDCG、延遲及索引大小。</p></li>
<li><p>當嵌入清單龐大、嵌入空間雜訊較多，或工作負載屬視覺或多模態時，請嘗試使用<code translate="no">lemur</code> 。</p></li>
<li><p>在調整過多建置時參數之前，請先微調 `<code translate="no">retrieval_ann_ratio</code> `。若召回率偏低，請增加該參數；若延遲過高，則應減少該參數。</p></li>
<li><p>務必針對具代表性的查詢及文件長度分佈進行驗證。適用於短文本的策略，未必適用於視覺文件或長尾語料庫。</p></li>
</ol>
<table>
<thead>
<tr><th>### 品質優先 首先從 `<code translate="no">tokenann</code>` 開始。將其作為 MaxSim 近似品質的基準。</th><th>### 平衡型 若需降低成本且不希望增加訓練流程，請嘗試使用<code translate="no">muvera</code> 。</th><th>### 壓縮 當學習到的行級壓縮表現可能優於固定隨機投影時，請嘗試使用<code translate="no">lemur</code> 。</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">本草案所參考的文獻<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Milvus 針對<code translate="no">emb_list_strategy</code> 、<code translate="no">retrieval_ann_ratio</code> 及<code translate="no">emb_list_rerank</code> 進行的測試。</p></li>
<li><p>Milvus 配置檔中關於伺服器端索引預設值的處理，詳見<code translate="no">knowhere</code> 區段。</p></li>
<li><p>Knowhere 參數定義，包含預設值及受支援的策略名稱。</p></li>
<li><p>針對僅支援 fp32 的 MUVERA/LEMUR 以及僅支援 DiskANN TokenANN 的 Knowhere 相容性檢查。</p></li>
<li><p>針對 MaxSim 候選結果檢索，比較 TokenANN、MUVERA 和 LEMUR 的內部評估筆記。</p></li>
</ul>
<div class="alert note">
<p><strong>發佈須知：</strong>在對外發佈前，請確認目標 Milvus 版本中哪些參數獲得官方支援，以及該產品是打算公開所有低階 Knowhere 參數，還是僅公開較小的已文件化子集。</p>
</div>
