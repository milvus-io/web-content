---
id: troubleshooting.md
summary: 了解您在使用 Milvus 時可能遇到的常見問題，以及如何克服這些問題。
title: 疑難排解
---
<h1 id="Troubleshooting" class="common-anchor-header">疑難排解<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁列出運行 Milvus 時可能發生的常見問題，以及可能的故障排除提示。本頁面的問題分為以下幾類：</p>
<ul>
<li><a href="#boot_issues">開機問題</a></li>
<li><a href="#runtime_issues">運行問題</a></li>
<li><a href="#api_issues">API 問題</a></li>
<li><a href="#etcd_crash_issues">etcd 崩潰問題</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">開機問題<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>開機錯誤通常是致命的。執行下列指令可檢視錯誤的詳細資訊：</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">運行時問題<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>運行期間發生的錯誤可能會導致服務癱瘓。若要排除此問題，請先檢查伺服器與用戶端的相容性，然後再繼續進行。</p>
<h2 id="API-issues" class="common-anchor-header">API 問題<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>這些問題發生在 Milvus 伺服器和客戶端之間的 API 方法呼叫期間。它們會同步或非同步地傳回給用戶端。</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">etcd 崩潰問題<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. etcd pod 待定</h3><p>etcd 集群預設使用 pvc。StorageClass 需要為 Kubernetes 叢集預先設定。</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. etcd pod 崩溃</h3><p>當 etcd pod 崩潰時，<code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code> ，您可以登入此 pod 並刪除<code translate="no">/bitnami/etcd/data/member_id</code> 檔案。</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3.當<code translate="no">etcd-0</code> 仍在執行時，多個 Pod 持續當機</h3><p>如果多個 Pod 在<code translate="no">etcd-0</code> 仍在執行時持續當機，您可以執行下列程式碼。</p>
<pre><code translate="no">kubectl scale sts <span class="hljs-operator">&lt;</span>etcd<span class="hljs-operator">-</span>sts<span class="hljs-operator">&gt;</span> <span class="hljs-comment">--replicas=1</span>
# <span class="hljs-keyword">delete</span> the pvc <span class="hljs-keyword">for</span> etcd<span class="hljs-number">-1</span> <span class="hljs-keyword">and</span> etcd<span class="hljs-number">-2</span>
kubectl scale sts <span class="hljs-operator">&lt;</span>etcd<span class="hljs-operator">-</span>sts<span class="hljs-operator">&gt;</span> <span class="hljs-comment">--replicas=3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4.所有 pod 都當機</h3><p>當所有 pod 都當機時，請嘗試複製<code translate="no">/bitnami/etcd/data/member/snap/db</code> 檔案。使用<code translate="no">https://github.com/etcd-io/bbolt</code> 修改資料庫資料。</p>
<p>所有 Milvus 元資料都保存在<code translate="no">key</code> 資料桶中。備份此資料桶中的資料，並執行下列指令。請注意，<code translate="no">by-dev/meta/session</code> 檔案中的前綴資料不需要備份。</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>如果您需要協助解決問題，請隨時</p>
<ul>
<li>加入我們的<a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack 頻道</a>，向 Milvus 團隊尋求支援。</li>
<li>在 GitHub 上<a href="https://github.com/milvus-io/milvus/issues/new/choose">提交問題</a>，並詳細說明您的問題。</li>
</ul>
