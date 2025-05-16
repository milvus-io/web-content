---
id: rbac.md
related_key: enable RBAC
summary: '사용자, 역할 및 권한을 관리하는 방법을 알아보세요.'
title: RBAC 활성화
---
<h1 id="Enable-RBAC" class="common-anchor-header">RBAC 활성화<button data-href="#Enable-RBAC" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC를 활성화하면 특정 Milvus 리소스(예: 컬렉션 또는 파티션)에 대한 액세스 또는 사용자 역할 및 권한에 따른 권한을 제어할 수 있습니다. 현재 이 기능은 Python과 Java에서만 사용할 수 있습니다.</p>
<p>이 주제에서는 RBAC를 활성화하고 <a href="/docs/ko/v2.4.x/users_and_roles.md">사용자 및 역할을</a> 관리하는 방법에 대해 설명합니다.</p>
<div class="alert note">
<p>이 페이지의 코드 스니펫은 새로운 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python)를 사용하여 Milvus와 상호 작용합니다. 다른 언어에 대한 새로운 MilvusClient SDK는 향후 업데이트를 통해 출시될 예정입니다.</p>
</div>
<h2 id="1-Initiate-a-Milvus-client-to-establish-a-connection" class="common-anchor-header">1. Milvus 클라이언트를 시작하여 연결 설정하기<button data-href="#1-Initiate-a-Milvus-client-to-establish-a-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자 <a href="/docs/ko/v2.4.x/authenticate.md">인증을</a> 활성화한 후 사용자 이름과 비밀번호로 구성된 <code translate="no">token</code> 을 사용하여 Milvus 인스턴스에 연결합니다. 기본적으로 Milvus는 <code translate="no">root</code> 사용자와 비밀번호 <code translate="no">Milvus</code> 를 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&#x27;root:Milvus&#x27;</span> <span class="hljs-comment"># replace with your own Milvus server token</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Create-a-user" class="common-anchor-header">2. 사용자 만들기<button data-href="#2-Create-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">user_1</code> 라는 이름의 사용자와 <code translate="no">P@ssw0rd</code> 이라는 비밀번호를 생성합니다:</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_user</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>사용자를 생성한 후 다음을 수행할 수 있습니다:</p>
<ul>
<li>사용자 비밀번호를 업데이트합니다. 기존 비밀번호와 새 비밀번호를 모두 입력해야 합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">update_password</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    old_password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
    new_password=<span class="hljs-string">&#x27;P@ssw0rd123&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>모든 사용자를 나열합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_users()

<span class="hljs-comment"># output:</span>
<span class="hljs-comment"># [&#x27;root&#x27;, &#x27;user_1&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>특정 사용자의 역할을 확인합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_user(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: ()}
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Create-a-role" class="common-anchor-header">3. 역할 만들기<button data-href="#3-Create-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예에서는 <code translate="no">roleA</code> 라는 이름의 역할을 만듭니다.</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_role</span>(
    role_name=<span class="hljs-string">&quot;roleA&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>역할을 만든 후에는 다음과 같이 할 수 있습니다:</p>
<ul>
<li>모든 역할을 나열합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.list_roles()

# output:
# [<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;public&#x27;</span>, <span class="hljs-string">&#x27;roleA&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Grant-a-privilege-to-a-role" class="common-anchor-header">4. 역할에 권한 부여하기<button data-href="#4-Grant-a-privilege-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예는 <code translate="no">roleA</code> 이라는 역할에 모든 컬렉션을 검색할 수 있는 권한을 부여하는 방법을 보여줍니다.</p>
<p><code translate="no">object_type</code> 은 리소스 유형으로도 이해할 수 있는 객체 유형을 지정합니다. 현재 유효한 값으로는 컬렉션/사용자/글로벌 등이 있으며, 여기서 글로벌은 특정 리소스 유형이 없음을 의미합니다. <code translate="no">object_name</code> 은 리소스 이름입니다. 객체 유형이<em>Collection인 경우 객체 이름은 특정 컬렉션 이름을 참조하거나 *를 사용하여 모든 컬렉션을 지정할 수 있습니다.</em>개체<em>유형이</em>Global인 경우에는 개체 이름을 *로만 지정할 수 있습니다. 부여할 수 있는 다른 유형의 권한은 <a href="/docs/ko/v2.4.x/users_and_roles.md">사용자 및 역할을</a> 참조하세요.</p>
<p>역할 권한을 관리하기 전에 사용자 인증을 사용 설정했는지 확인하세요. 그렇지 않으면 오류가 발생할 수 있습니다. 사용자 인증을 사용 설정하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">사용자 액세스 인증하기를</a> 참조하세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant privilege to a role</span>

client.grant_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>역할에 권한을 부여한 후에는 다음과 같이 할 수 있습니다:</p>
<ul>
<li>역할에 부여된 권한을 봅니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_role(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;role&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#  <span class="hljs-string">&#x27;privileges&#x27;</span>: [{<span class="hljs-string">&#x27;object_type&#x27;</span>: <span class="hljs-string">&#x27;User&#x27;</span>,
#    <span class="hljs-string">&#x27;object_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,
#    <span class="hljs-string">&#x27;db_name&#x27;</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
#    <span class="hljs-string">&#x27;role_name&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#    <span class="hljs-string">&#x27;privilege&#x27;</span>: <span class="hljs-string">&#x27;SelectUser&#x27;</span>,
#    <span class="hljs-string">&#x27;grantor_name&#x27;</span>: <span class="hljs-string">&#x27;root&#x27;</span>}]}
<button class="copy-code-btn"></button></code></pre>
<h2 id="5-Grant-a-role-to-a-user" class="common-anchor-header">5. 사용자에게 역할 부여하기<button data-href="#5-Grant-a-role-to-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자에게 역할을 부여하여 이 사용자가 역할의 모든 권한을 상속받을 수 있도록 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant a role to a user</span>

client.grant_role(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>역할을 부여한 후 역할이 부여되었는지 확인합니다:</p>
<pre><code translate="no" class="language-python">client.describe_user(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: (<span class="hljs-string">&#x27;roleA&#x27;</span>)}
<button class="copy-code-btn"></button></code></pre>
<h2 id="6-Revoke-privileges" class="common-anchor-header">6. 권한 취소하기<button data-href="#6-Revoke-privileges" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert caution">
<p>다음 작업은 되돌릴 수 없으므로 수행할 때 주의하세요.</p>
</div>
<ul>
<li>역할에서 권한 제거하기. 역할에 부여되지 않은 권한을 취소하면 오류가 발생합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.revoke_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>역할에서 사용자를 제거합니다. 사용자에게 부여되지 않은 역할을 취소하면 오류가 발생합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">revoke_role</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>역할을 삭제합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_role</span>(role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>사용자를 삭제합니다.</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ko/v2.4.x/authenticate.md">사용자 인증을</a> 관리하는 방법을 알아보세요.</p></li>
<li><p>Milvus에서 <a href="/docs/ko/v2.4.x/tls.md">TLS 프록시를</a> 활성화하는 방법을 알아보세요.</p></li>
</ul>
