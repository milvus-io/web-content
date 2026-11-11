---
id: milvus_backup_overview.md
summary: Milvus Backup 提供 CLI 和 HTTP API 工作流程，用於備份和還原 Milvus 資料。
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup 可用於備份 Milvus 集合，並將其還原至同一或另一個實例中。它提供命令列介面 (CLI) 及 HTTP API。</p>
<p>Milvus Backup<strong>0.6.0</strong>新增了針對 Milvus 3.0 的快照備份功能、版本化的 v2 配置架構，以及用於建立備份的預設用途設定。Milvus 3.0 的官方備份與還原支援自<strong>Milvus 3.0.1</strong> 版本起正式提供。</p>
<h2 id="Choose-your-guide" class="common-anchor-header">選擇您的指南<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup 擁有獨立於 Milvus 伺服器版本之外的專屬發行版本。當前指南涵蓋 0.6.x 系列；「Backup 0.5.x」章節則保留了較早的工作流程。頁面標題標籤會標示適用的 Backup 系列。安裝說明與範例均採用特定的已驗證發行版本。請分別檢查來源與目標 Milvus 伺服器的相容性。</p>
<table>
<thead>
<tr><th>您的任務</th><th>指南</th></tr>
</thead>
<tbody>
<tr><td>繼續使用 Backup 0.5.x</td><td><a href="/docs/zh-hant/milvus_backup_cli.md">0.5.x 指令</a>與<a href="/docs/zh-hant/milvus_backup_api.md">HTTP API</a>，範例以 0.5.16 版本為基準</td></tr>
<tr><td>升級現有的 Backup 安裝</td><td><a href="/docs/zh-hant/milvus_backup_upgrade.md">從 0.5.x 升級至 0.6.x</a></td></tr>
<tr><td>安裝並使用 Backup 0.6.x</td><td><a href="/docs/zh-hant/milvus_backup_0_6_cli.md">指令與設定</a>，或<a href="/docs/zh-hant/milvus_backup_0_6_api.md">HTTP API</a></td></tr>
<tr><td>在 Milvus 3.0.1 或更新版本上備份與還原快照</td><td><a href="/docs/zh-hant/snapshot-backup-and-restore.md">單一實例中的快照備份與還原</a></td></tr>
</tbody>
</table>
<p>現有的<a href="/docs/zh-hant/single-instance-backup-and-restore.md">「同一實例」</a>、<a href="/docs/zh-hant/shared-bucket-backup-and-restore.md">「共用儲存桶</a>」、「<a href="/docs/zh-hant/cross-bucket-backup-and-restore.md">跨儲存桶</a>」及<a href="/docs/zh-hant/multi-storage-backup-and-restore.md">「跨儲存</a>」指南仍保留 0.5.16 版的設定與指令。當發布新的 Backup 版本時，這些指南中的範例並不會隨之更新版本。</p>
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
<li>請使用來自同一版本的 Backup 二進位檔及配置範例。<a href="/docs/zh-hant/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x 指南鎖定</a>0.5.16 版本；<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">本指南則鎖定</a>0.6.0<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">版本</a>。</li>
<li>請確保 Milvus、其儲存空間以及備份目標之間具備網路連線。快照操作亦需 Milvus 伺服器能連通備份儲存庫。</li>
<li>請參閱下方的伺服器相容性說明。僅在從原始碼編譯時才需要 Go 語言：Backup 0.5.16 需 1.25 或更新版本，0.6.0 則需 1.26 或更新版本。</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">架構<button data-href="#Architecture" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Milvus Backup 組件</span>
  
 </span></p>
<p>Milvus Backup 負責協調 Milvus 實例與備份儲存裝置之間的集合元資料及資料備份。在 Backup 0.6.0 中，所選格式將決定集合資料的匯出與還原方式：</p>
<table>
<thead>
<tr><th>格式</th><th>備份與還原行為</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus 會匯出集合快照封裝檔。Milvus Backup 會記錄該封裝檔的資訊，而還原程序則透過 Milvus 匯入該封裝檔。伺服器會管理由此產生的資料佈局。</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup 會複製集合資料檔案與元資料，並在還原時重新建立集合並匯入備份資料。</td></tr>
<tr><td><code translate="no">auto</code></td><td>請根據伺服器支援的功能選擇格式。在 Milvus 3.0 上，系統會預設選擇快照格式。</td></tr>
</tbody>
</table>
<p>備份目錄包含元資料及其格式所需的檔案。進行歸檔或移動時，請完整保留該目錄。請勿假設快照備份會採用二進位日誌（binlog）的目錄佈局。</p>
<p>在 0.6.0 版本中，<code translate="no">create --for</code> 的預設設定會配置特定用途的選項：<code translate="no">clone</code> 會保留所選格式，而<code translate="no">archive</code> 和<code translate="no">secondary</code> 則需要二進位日誌。次要節點還需要配置複製拓撲；實例之間的普通遷移則不需要次要節點。請參閱<a href="/docs/zh-hant/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">「選擇備份格式或目的」</a>。</p>
<p>Backup 0.6.0 會在備份過程中跳過外部集合。任務成功並不表示已包含外部集合的資料。</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">相容性對照表<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 無需將每個 Milvus 安裝升級至 3.0 版本。</strong>它支援受支援的 Milvus 2.x 版本上的二進位日誌工作流程<strong>。</strong>針對 Milvus 3.0 系列的官方備份與還原支援始於<strong>Milvus 3.0.1</strong>；快照範例即採用該系列。</p>
<p><a href="/docs/zh-hant/milvus_backup_upgrade.md">此升級指南</a>已於 Milvus 2.6.11 環境中，透過 Backup 0.5.16 及 0.6.0 進行驗證，包含使用 0.6.0 還原 0.5.16 備份的測試。此經測試的組合並未擴展下方的相容性對照表。</p>
<p>來源與目標的 Milvus 版本必須構成受支援的組合。僅目標版本較新並不能確保相容性。以下舊版相容性對照表涵蓋 Milvus 2.x 版本，此對照表自 Milvus Backup 0.5.7 起即有記載；但該對照表並未確立 2.x 至 3.0 的遷移相容性。</p>
<table>
<thead>
<tr><th>備份來源 ↓ / 還原目標 →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>無</td><td>否</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.3.x</td><td>否</td><td>否</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.4.x</td><td>否</td><td>否</td><td>是</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.5.x</td><td>否</td><td>否</td><td>否</td><td>是</td><td>是</td></tr>
<tr><td>Milvus v2.6.x</td><td>否</td><td>否</td><td>否</td><td>否</td><td>是</td></tr>
</tbody>
</table>
<p>進行跨版本遷移前，請參照《<a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">備份發行版文件</a>》，確認來源版本、目標版本及備份格式。這些指南並未將舊版相容性對照表擴展至未列出的組合。</p>
<h2 id="Release-notes" class="common-anchor-header">發行說明<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
