---
id: warm-up.md
title: 暖機Compatible with Milvus 2.6.4+
summary: >-
  在 Milvus 中，Warm Up 可減輕首次存取冷資料時發生的首次延遲 (first-hit latency)，從而補充分層儲存 (Tiered
  Storage)。配置完成後，Warm Up 會在區段變為可查詢之前，將選定類型的欄位或索引預先載入快取記憶體，以確保經常存取的資料在載入後立即可用。
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">暖機<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，<strong>Warm Up</strong>可減少首次存取冷資料時發生的首次延遲，從而補充分層儲存。配置完成後，Warm Up 會在區段變為可查詢之前，將選定類型的欄位或索引預先載入快取記憶體，以確保經常存取的資料在載入後立即可用。</p>
<h2 id="Why-warm-up" class="common-anchor-header">為什麼要預熱<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p>分層儲存中的<a href="/docs/zh-hant/tiered-storage-overview.md#Phase-1-Lazy-load">懶散</a>載入功能透過最初僅載入元資料來提高效率。但是，這可能會在第一次查詢冷資料時造成延遲，因為所需的大塊或索引必須從物件儲存中取得。</p>
<p><strong>Warm Up</strong>可在段初始化期間主動快取關鍵資料，以解決這個問題。</p>
<p>它在下列情況下特別有用</p>
<ul>
<li><p>某些標量索引經常用於篩選條件。</p></li>
<li><p>向量索引對搜尋效能非常重要，必須立即就緒。</p></li>
<li><p>QueryNode 重新啟動或新區段載入後的冷啟動延遲是不可接受的。</p></li>
</ul>
<p>相反，對於不常查詢的欄位或索引，<strong>不建議</strong>使用「預熱」功能。停用「預熱」功能可縮短區段載入時間，並節省快取記憶體空間，非常適合大型向量欄位或非關鍵的標量欄位。</p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Warm Up 受<code translate="no">milvus.yaml</code> 中<code translate="no">queryNode.segcore.tieredStorage.warmup</code> 的控制。您可以為標量字段、標量索引、向量字段和向量索引分別設定 Warm Up。每個目標支援兩種模式：</p>
<table>
   <tr>
     <th><p>模式</p></th>
     <th><p>說明</p></th>
     <th><p>典型情況</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>在段變為可查詢之前預先載入。載入時間會稍微增加，但第一次查詢不會產生延遲。</p></td>
     <td><p>用於必須立即可用的效能關鍵資料，例如搜尋中使用的高頻標量索引或關鍵向量索引。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>跳過預載。區段變得更快可供查詢，但第一次查詢可能會觸發依需求載入。</p></td>
     <td><p>適用於不常存取或大型資料，例如原始向量欄位或非關鍵的標量欄位。</p></td>
   </tr>
</table>
<p><strong>範例 YAML</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>值</p></th>
     <th><p>說明</p></th>
     <th><p>建議用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入標量欄位資料。</p></td>
     <td><p>僅當標量字段較小且在篩選器中經常被存取時，才使用<code translate="no">sync</code> 。否則，<code translate="no">disable</code> ，以減少載入時間。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入標量索引。</p></td>
     <td><p>對於涉及頻繁篩選條件或範圍查詢的標量索引，請使用<code translate="no">sync</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入向量欄位資料。</p></td>
     <td><p>一般<code translate="no">disable</code> ，以避免大量使用快取記憶體。僅在搜尋後必須立即擷取原始向量時，才啟用<code translate="no">sync</code> (例如，具有向量召回功能的相似性結果)。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> |<code translate="no">disable</code></p></td>
     <td><p>控制是否預先載入向量索引。</p></td>
     <td><p>對於對搜尋延遲非常重要的向量索引，請使用<code translate="no">sync</code> 。在批次或低頻率的工作負載中，<code translate="no">disable</code> ，以獲得更快的分割準備。</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">最佳實務<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>預熱只會影響初始載入。如果緩存資料稍後被驅逐，下一次查詢會依需求重新載入。</p>
<ul>
<li><p>避免過度使用<code translate="no">sync</code> 。預載太多欄位會增加載入時間和快取記憶體壓力。</p></li>
<li><p>以保守的方式開始 - 只對經常存取的欄位和索引啟用「預熱」功能。</p></li>
<li><p>監控查詢延遲和快取記憶體指標，然後視需要擴大預載。</p></li>
<li><p>對於混合工作負載，將<code translate="no">sync</code> 應用於對效能敏感的集合，將<code translate="no">disable</code> 應用於以容量為導向的集合。</p></li>
</ul>
