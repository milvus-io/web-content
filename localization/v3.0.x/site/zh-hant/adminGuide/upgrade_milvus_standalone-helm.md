---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 瞭解如何使用 Helm Chart 升級 Milvus 獨立執行版本。
title: 使用 Helm Chart 升級 Milvus 獨立部署版本
---
<div class="tab-wrapper"><a href="/docs/zh-hant/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md" class=''>操作員</a>、Helm、<a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md" class=''>Docker Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">使用 Helm Chart 升級 Milvus 獨立部署版本<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何使用 Helm 將您的 Milvus 2.6.x 獨立部署升級至 v3.0-beta 版本。</p>
<div class="alert note">
<p>此程序已針對從 Milvus 2.6.20 升級至 Milvus v3.0-beta（搭配 Milvus Helm Chart 5.0.22）進行驗證。若您使用其他 Milvus 2.6.x 修補版本或 Helm Chart 版本，請先在非生產環境中驗證升級流程。</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Helm 3.14.0 或更新版本</li>
<li>由 Helm 管理的現有 Milvus 2.6.x 部署</li>
<li>現有部署所使用的 Helm 值</li>
<li>Milvus 元資料與持久化資料的最新備份</li>
</ul>
<p><strong>訊息佇列限制</strong>：升級至 Milvus v3.0-beta 時，您必須維持當前的訊息佇列選項。升級過程中不支援在不同的訊息佇列系統之間切換。未來版本將支援變更訊息佇列系統。</p>
<div class="alert warning">
<p>請勿在此程序中變更或降級 Helm Chart。請保留您 Helm 發行版中已安裝的 Chart 版本。經測試的基準配置保留了 Helm Chart 5.0.22，僅將 Milvus 映像標籤變更為<code translate="no">v3.0-beta</code> 。</p>
<p>此程序未驗證將 Milvus 映像降級回 2.6.x 的操作。 在 v3.0-beta 寫入資料後，僅還原映像檔的回滾操作可能會無法讀取更新後的狀態。若升級失敗，請停止寫入操作，並採用能還原升級前元資料及持久化資料備份的復原方案。請先在非生產環境中驗證該復原方案。</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">升級流程<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Update-the-Helm-repository" class="common-anchor-header">步驟 1：更新 Helm 儲存庫<button data-href="#Step-1-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>新增或更新 Milvus Helm 儲存庫：</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
位於<code translate="no">https://milvus-io.github.io/milvus-helm/</code> 的 Milvus Helm Charts 儲存庫已歸檔。請使用新儲存庫<code translate="no">https://zilliztech.github.io/milvus-helm/</code> 來取得 4.0.31 及後續版本的圖表。
</div>
<h3 id="Step-2-Upgrade-Milvus" class="common-anchor-header">步驟 2：升級 Milvus<button data-href="#Step-2-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>檢查您的 Helm 發行版所安裝的 Charts 版本：</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>在「<code translate="no">CHART</code> 」欄位中，從值中移除「<code translate="no">milvus-</code> 」前綴，並將剩餘的版本號以「<code translate="no">&lt;current-chart-version&gt;</code> 」的形式使用。接著執行升級指令：</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0-beta&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 20m
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--reset-then-reuse-values</code> 選項在套用針對所選 Chart 預設值的明確映像覆寫時，會保留前一版本的值。</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">驗證升級<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>檢查 Helm 修訂版本、Pod 狀態及容器映像檔：</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>確認所有必要的工作負載均已就緒，Milvus 已採用<code translate="no">v3.0-beta</code> ，且現有集合仍可進行查詢與搜尋。在啟用任何 v3.0-beta 專屬功能之前，請先完成這些檢查。</p>
<div class="alert note">
<p>升級至 Milvus 3.0 並不會啟用 Storage V3。在驗證升級完成後，請先審閱<a href="/docs/zh-hant/storage-v3.md">Storage V3</a>的相關說明，再啟用依賴於它的功能。一旦 Milvus 寫入 Storage V3 資料，便不支援降級至無法讀取 Storage V3 的舊版 Milvus。</p>
</div>
