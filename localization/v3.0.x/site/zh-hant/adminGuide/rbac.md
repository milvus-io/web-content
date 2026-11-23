---
id: rbac.md
title: RBAC 詳解
summary: RBAC（基於角色的存取控制）會根據角色，控制使用者在集合、資料庫及執行個體層級所能執行的操作。
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBAC 詳解<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC（基於角色的存取控制）是一種基於角色的存取控制方法。透過 RBAC，您可以精確控制使用者在集合、資料庫及實例層級上可執行的操作，從而提升資料安全性。</p>
<p>與傳統的用戶存取控制模型不同，RBAC 引入了「<strong>角色</strong>」的概念。在 RBAC 模型中，您會先授予角色權限，再將這些角色指派給用戶，用戶才能據此獲得相應權限。</p>
<p>RBAC 模型可提升存取控制管理的效率。例如，若多位使用者需要同一組權限，您無需為每位使用者手動設定權限，而是可以建立一個角色，並將該角色指派給使用者。 若需調整這些使用者的權限，只需調整角色的權限，修改便會套用至所有擁有該角色的使用者。</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBAC 關鍵概念<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" /> 
   <span>使用者 角色 權限</span>
  
 </span></p>
<p>RBAC 模型包含五大主要組成部分。</p>
<ul>
<li><p><strong>資源：</strong>可被存取的資源實體。在 Milvus 中，資源分為三個層級：實例、資料庫和集合。</p></li>
<li><p><strong>權限：</strong>對 Milvus 資源執行特定操作的許可（例如：建立集合、插入資料等）。</p></li>
<li><p><strong>權限群組：</strong>由多個權限組成的群組。</p></li>
<li><p><strong>角色：</strong>角色由兩部分組成——權限與資源。權限定義角色可執行的操作類型，而資源則定義可執行操作的目標資源。例如，「資料庫管理員」角色可對特定資料庫執行讀取、寫入及管理操作。</p></li>
<li><p><strong>使用者：</strong>使用者是指使用 Milvus 的人員。每位使用者皆擁有唯一的 ID，並被授予一個或多個角色。</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">操作步驟<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>若要透過 RBAC 實現存取控制，請依照以下步驟操作：</p>
<ol>
<li><p><strong><a href="/docs/zh-hant/users_and_roles.md#Create-a-user">建立使用者</a></strong>：除了 Milvus 中的預設使用者<code translate="no">root</code> 之外，您還可以建立新使用者並設定密碼，以保障資料安全。</p></li>
<li><p><strong><a href="/docs/zh-hant/users_and_roles.md#Create-a-role">建立角色</a></strong>：您可以根據需求建立自訂角色。角色的具體能力取決於其權限設定。</p></li>
<li><p><strong><a href="/docs/zh-hant/privilege_group.md">建立權限群組</a></strong>：將多個權限整合為一個權限群組，以簡化向角色授予權限的流程。</p></li>
<li><p><strong><a href="/docs/zh-hant/grant_privileges.md">將權限或權限群組授予角色</a></strong>：透過將權限或權限群組授予角色，來定義該角色的功能。</p></li>
<li><p><strong><a href="/docs/zh-hant/grant_roles.md">將角色授予使用者</a></strong>：將具備特定權限的角色授予使用者，使使用者能擁有該角色的權限。單一角色可授予多位使用者。</p></li>
</ol>
