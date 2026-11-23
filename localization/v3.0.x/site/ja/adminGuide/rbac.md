---
id: rbac.md
title: RBACの解説
summary: RBAC（ロールベースのアクセス制御）は、ロールに基づいて、コレクション、データベース、およびインスタンスの各レベルでユーザーが実行できる操作を制御します。
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBACの解説<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC（ロールベースのアクセス制御）は、ロールに基づいたアクセス制御手法です。RBAC を使用すると、コレクション、データベース、インスタンスの各レベルでユーザーが実行できる操作をきめ細かく制御でき、データのセキュリティを強化できます。</p>
<p>従来のユーザーアクセス制御モデルとは異なり、RBACでは「<strong>ロール</strong>」という概念が導入されています。RBACモデルでは、まずロールに権限を付与し、そのロールをユーザーに割り当てます。これにより、ユーザーは権限を取得できるようになります。</p>
<p>RBACモデルは、アクセス制御管理の効率を向上させることができます。例えば、複数のユーザーが同じ権限セットを必要とする場合、ユーザーごとに手動で権限を設定する必要はありません。代わりに、ロールを作成し、そのロールをユーザーに割り当てるだけで済みます。 これらのユーザーの権限を調整したい場合は、ロールの権限を調整するだけで済み、その変更はこのロールを持つすべてのユーザーに適用されます。</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBACの主要な概念<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   <span>ユーザー　ロール　権限</span>
  
 </span></p>
<p>RBACモデルには5つの主要な構成要素があります。</p>
<ul>
<li><p><strong>リソース：</strong>アクセス可能なリソースエンティティ。Milvus には、インスタンス、データベース、コレクションの 3 つのレベルのリソースがあります。</p></li>
<li><p><strong>権限：</strong>Milvus リソースに対して特定の操作（コレクションの作成、データの挿入など）を実行する許可。</p></li>
<li><p><strong>権限グループ：</strong>複数の権限からなるグループ。</p></li>
<li><p><strong>ロール：</strong>ロールは、権限とリソースの2つの部分で構成されます。権限はロールが実行できる操作の種類を定義し、リソースは操作の対象となるリソースを定義します。例えば、データベース管理者ロールは、特定のデータベースに対して読み取り、書き込み、および管理操作を実行できます。</p></li>
<li><p><strong>ユーザー：</strong>Milvusを利用する人です。各ユーザーには一意のIDが割り当てられ、1つまたは複数のロールが付与されます。</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">手順<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>RBAC によるアクセス制御を実現するには、以下の手順に従う必要があります。</p>
<ol>
<li><p><strong><a href="/docs/ja/users_and_roles.md#Create-a-user">ユーザーの作成</a></strong>：Milvusにはデフォルトユーザー「<code translate="no">root</code> 」がいますが、データのセキュリティを保護するために、新しいユーザーを作成し、パスワードを設定することができます。</p></li>
<li><p><strong><a href="/docs/ja/users_and_roles.md#Create-a-role">ロールの作成</a></strong>：ニーズに応じてカスタマイズされたロールを作成できます。ロールの具体的な機能は、その権限によって決定されます。</p></li>
<li><p><strong><a href="/docs/ja/privilege_group.md">権限グループの作成</a></strong>：複数の権限を1つの権限グループにまとめ、ロールへの権限付与プロセスを効率化します。</p></li>
<li><p><strong><a href="/docs/ja/grant_privileges.md">ロールへの権限または権限グループの付与</a></strong>：ロールに権限または権限グループを付与することで、そのロールの機能を定義します。</p></li>
<li><p><strong><a href="/docs/ja/grant_roles.md">ユーザーへのロールの付与</a></strong>：特定の権限を持つロールをユーザーに付与することで、ユーザーはそのロールの権限を行使できるようになります。1つのロールを複数のユーザーに付与することができます。</p></li>
</ol>
