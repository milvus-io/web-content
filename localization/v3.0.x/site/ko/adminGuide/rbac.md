---
id: rbac.md
title: RBAC 설명
summary: 'RBAC(역할 기반 접근 제어)는 역할에 따라 사용자가 컬렉션, 데이터베이스 및 인스턴스 수준에서 수행할 수 있는 작업을 제어합니다.'
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBAC 설명<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC(역할 기반 접근 제어)는 역할을 기반으로 하는 접근 제어 방식입니다. RBAC을 사용하면 컬렉션, 데이터베이스 및 인스턴스 수준에서 사용자가 수행할 수 있는 작업을 세밀하게 제어하여 데이터 보안을 강화할 수 있습니다.</p>
<p>기존의 사용자 접근 제어 모델과 달리, RBAC는 <strong>역할이라는</strong> 개념을 도입합니다. RBAC 모델에서는 역할에 권한을 부여한 다음, 해당 역할을 사용자에게 할당합니다. 그러면 사용자는 권한을 획득하게 됩니다.</p>
<p>RBAC 모델은 접근 제어 관리의 효율성을 높일 수 있습니다. 예를 들어, 여러 사용자가 동일한 권한 세트를 필요로 하는 경우, 각 사용자에 대해 수동으로 권한을 설정할 필요가 없습니다. 대신, 역할을 생성하여 사용자에게 할당하면 됩니다. 해당 사용자들의 권한을 조정하고자 할 경우, 역할의 권한만 조정하면 되며, 이 변경 사항은 해당 역할을 가진 모든 사용자에게 적용됩니다.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBAC의 핵심 개념<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   <span>사용자 역할 권한</span>
  
 </span></p>
<p>RBAC 모델에는 다섯 가지 주요 구성 요소가 있습니다.</p>
<ul>
<li><p><strong>리소스:</strong> 액세스할 수 있는 리소스 엔티티입니다. Milvus에는 인스턴스, 데이터베이스, 컬렉션의 세 가지 수준의 리소스가 있습니다.</p></li>
<li><p><strong>권한:</strong> Milvus 리소스에 대해 특정 작업(예: 컬렉션 생성, 데이터 삽입 등)을 수행할 수 있는 권한입니다.</p></li>
<li><p><strong>권한 그룹:</strong> 여러 권한으로 구성된 그룹입니다.</p></li>
<li><p><strong>역할:</strong> 역할은 권한과 리소스라는 두 부분으로 구성됩니다. 권한은 역할이 수행할 수 있는 작업의 유형을 정의하고, 리소스는 해당 작업이 수행될 대상 리소스를 정의합니다. 예를 들어, 데이터베이스 관리자 역할은 특정 데이터베이스에 대해 읽기, 쓰기 및 관리 작업을 수행할 수 있습니다.</p></li>
<li><p><strong>사용자:</strong> Milvus를 사용하는 사람을 말합니다. 각 사용자는 고유한 ID를 가지며 하나 이상의 역할을 부여받습니다.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">절차<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>RBAC를 통해 접근 제어를 구현하려면 다음 단계를 따라야 합니다:</p>
<ol>
<li><p><strong><a href="/docs/ko/users_and_roles.md#Create-a-user">사용자 생성</a></strong>: Milvus의 기본 사용자 <code translate="no">root</code> 외에도, 데이터 보안을 위해 새 사용자를 생성하고 비밀번호를 설정할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/users_and_roles.md#Create-a-role">역할 생성</a></strong>: 필요에 따라 맞춤형 역할을 생성할 수 있습니다. 역할의 구체적인 기능은 해당 역할의 권한에 의해 결정됩니다.</p></li>
<li><p><strong><a href="/docs/ko/privilege_group.md">권한 그룹 생성</a></strong>: 여러 권한을 하나의 권한 그룹으로 묶어 역할에 권한을 부여하는 과정을 간소화할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/grant_privileges.md">역할에 권한 또는 권한 그룹 부여: 역할에</a></strong> 권한이나 권한 그룹을 부여하여 해당 역할의 기능을 정의할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/grant_roles.md">사용자에게 역할 부여</a></strong>: 사용자가 역할의 권한을 가질 수 있도록 특정 권한이 포함된 역할을 사용자에게 부여할 수 있습니다. 하나의 역할을 여러 사용자에게 부여할 수 있습니다.</p></li>
</ol>
