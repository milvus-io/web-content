---
id: rbac.md
title: RBAC 解釋
summary: >-
  RBAC (Role-Based Access Control，基於角色的存取控制) 是一種基於角色的存取控制方法。使用
  RBAC，您可以在集合、資料庫和實例層級精細地控制使用者可以執行的作業，增強資料安全性。
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBAC 解釋<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control，基於角色的存取控制) 是一種基於角色的存取控制方法。使用 RBAC，您可以在集合、資料庫和實例層級精細地控制使用者可以執行的操作，從而增強資料安全性。</p>
<p>與傳統的使用者存取控制模型不同，RBAC 引入了<strong>角色</strong>的概念。在 RBAC 模型中，您賦予角色權限，然後再賦予使用者這些角色。接著使用者就可以取得權限。</p>
<p>RBAC 模型可以提高存取控制管理的效率。例如，如果多個使用者需要同一套權限，您不需要手動為每個使用者設定權限。取而代之的是，您可以創建一個角色並將該角色分配給使用者。如果要調整這些使用者的權限，只要調整角色的權限即可，而修改的內容會套用到具有此角色的所有使用者。</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBAC 主要概念<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" />
   </span> <span class="img-wrapper"> <span>使用者 角色 特權</span> </span></p>
<p>RBAC 模型中有四個主要元件。</p>
<ul>
<li><p><strong>資源：</strong>可存取的資源實體。在 Milvus 中有三種等級的資源 - 實例、資料庫和集合。</p></li>
<li><p><strong>權限：</strong>在 Milvus 資源上執行特定作業的權限（例如：建立集合、插入資料等）。</p></li>
<li><p><strong>特權群組：</strong>多個權限的群組。</p></li>
<li><p><strong>角色：</strong>角色由兩部分組成 - 特權和資源。權限定義了角色可以執行的作業類型，而資源則定義了可以執行作業的目標資源。例如，資料庫管理員角色可以在特定資料庫上執行讀取、寫入和管理作業。</p></li>
<li><p>用戶<strong>：</strong>用戶是使用 Milvus 的人。每個使用者都有一個唯一的 ID，並被賦予一個或多個角色。</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">程序<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>要通過 RBAC 實現存取控制，您需要遵循以下步驟：</p>
<ol>
<li><p><strong><a href="/docs/zh-hant/users_and_roles.md#Create-a-user">建立使用者</a></strong>：除了 Milvus 中的預設用戶<code translate="no">root</code> ，您還可以創建新用戶，並設定密碼以保護資料安全。</p></li>
<li><p><strong><a href="/docs/zh-hant/users_and_roles.md#Create-a-role">建立角色</a></strong>：您可以根據需要建立自訂角色。角色的具體功能由其權限決定。</p></li>
<li><p><strong><a href="/docs/zh-hant/privilege_group.md">建立特權群組</a></strong>：將多個特權組合為一個特權組，以簡化授予角色特權的流程。</p></li>
<li><p><strong><a href="/docs/zh-hant/grant_privileges.md">授予角色特權或特權群組</a></strong>：透過授予角色權限或權限群組，定義角色的功能。</p></li>
<li><p><strong><a href="/docs/zh-hant/grant_roles.md">授予使用者角色</a></strong>：將具有特定權限的角色授予使用者，讓使用者可以擁有角色的權限。單一角色可授予多個使用者。</p></li>
</ol>
