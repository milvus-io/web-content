---
id: rbac.md
title: RBAC 설명
summary: >-
  RBAC(역할 기반 액세스 제어)는 역할에 기반한 액세스 제어 방식입니다. RBAC를 사용하면 사용자가 수행할 수 있는 작업을 컬렉션,
  데이터베이스, 인스턴스 수준에서 세밀하게 제어하여 데이터 보안을 강화할 수 있습니다.
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
    </button></h1><p>RBAC(역할 기반 액세스 제어)는 역할에 기반한 액세스 제어 방식입니다. RBAC를 사용하면 사용자가 수행할 수 있는 작업을 컬렉션, 데이터베이스, 인스턴스 수준에서 세밀하게 제어하여 데이터 보안을 강화할 수 있습니다.</p>
<p>기존의 사용자 접근 제어 모델과 달리 RBAC는 <strong>역할이라는</strong> 개념을 도입합니다. RBAC 모델에서는 역할에 권한을 부여한 다음 사용자에게 해당 역할을 부여합니다. 그러면 사용자는 권한을 얻을 수 있습니다.</p>
<p>RBAC 모델은 액세스 제어 관리의 효율성을 향상시킬 수 있습니다. 예를 들어 여러 사용자에게 동일한 권한 집합이 필요한 경우 각 사용자에 대한 권한을 수동으로 설정할 필요가 없습니다. 대신 역할을 만들어 사용자에게 역할을 할당하면 됩니다. 이러한 사용자의 권한을 조정하려는 경우 역할 권한을 조정하기만 하면 이 역할이 있는 모든 사용자에게 수정 사항이 적용됩니다.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBAC 주요 개념<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   </span> <span class="img-wrapper"> <span>사용자 역할 권한</span> </span></p>
<p>RBAC 모델에는 네 가지 주요 구성 요소가 있습니다.</p>
<ul>
<li><p><strong>리소스:</strong> 리소스: 액세스할 수 있는 리소스 엔티티입니다. Milvus에는 인스턴스, 데이터베이스, 컬렉션의 세 가지 리소스 레벨이 있습니다.</p></li>
<li><p><strong>권한:</strong> Milvus 리소스에서 특정 작업(예: 컬렉션 만들기, 데이터 삽입 등)을 수행할 수 있는 권한입니다.</p></li>
<li><p><strong>권한 그룹:</strong> 여러 권한의 그룹입니다.</p></li>
<li><p><strong>역할:</strong> 역할은 권한과 리소스의 두 부분으로 구성됩니다. 권한은 역할이 수행할 수 있는 작업의 유형을 정의하고 리소스는 작업을 수행할 수 있는 대상 리소스를 정의합니다. 예를 들어 데이터베이스 관리자 역할은 특정 데이터베이스에 대해 읽기, 쓰기 및 관리 작업을 수행할 수 있습니다.</p></li>
<li><p><strong>사용자:</strong> 사용자는 Milvus를 사용하는 사람입니다. 각 사용자에게는 고유 ID가 있으며 하나 또는 여러 개의 역할이 부여됩니다.</p></li>
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
    </button></h2><p>RBAC를 통해 액세스 제어를 달성하려면 아래 단계를 따라야 합니다:</p>
<ol>
<li><p><strong><a href="/docs/ko/v2.5.x/users_and_roles.md#Create-a-user">사용자를 만듭니다</a></strong>: Milvus의 기본 사용자 <code translate="no">root</code> 외에도 새 사용자를 만들고 데이터 보안을 보호하기 위해 비밀번호를 설정할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/v2.5.x/users_and_roles.md#Create-a-role">역할 만들기</a></strong>: 필요에 따라 사용자 지정 역할을 만들 수 있습니다. 역할의 구체적인 기능은 해당 권한에 따라 결정됩니다.</p></li>
<li><p><strong><a href="/docs/ko/v2.5.x/privilege_group.md">권한 그룹을 만듭니다</a></strong>: 여러 권한을 하나의 권한 그룹으로 결합하여 역할에 권한을 부여하는 프로세스를 간소화할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/v2.5.x/grant_privileges.md">역할에 권한 또는 권한 그룹을 부여합니다</a></strong>: 역할의 기능을 정의하여 이 역할에 권한 또는 권한 그룹을 부여할 수 있습니다.</p></li>
<li><p><strong><a href="/docs/ko/v2.5.x/grant_roles.md">사용자에게 역할 부여하기</a></strong>: 사용자에게 특정 권한이 있는 역할을 부여하여 사용자가 역할의 권한을 가질 수 있도록 합니다. 하나의 역할을 여러 사용자에게 부여할 수 있습니다.</p></li>
</ol>
