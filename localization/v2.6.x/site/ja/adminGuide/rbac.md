---
id: rbac.md
title: RBACの説明
summary: >-
  RBAC（Role-Based Access
  Control）は、ロールに基づくアクセス制御手法です。RBACを使用すると、ユーザーが実行できる操作をコレクション、データベース、およびインスタンス・レベルで細かく制御できるため、データ・セキュリティが強化されます。
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBACの説明<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC（Role-Based Access Control）とは、ロールに基づくアクセス制御手法である。RBACを使用すると、ユーザーが実行できる操作をコレクション、データベース、およびインスタンス・レベルで細かく制御できるため、データ・セキュリティが強化されます。</p>
<p>従来のユーザー・アクセス制御モデルとは異なり、RBAC では<strong>ロールの</strong>概念が導入されています。RBAC モデルでは、ロールに特権を付与し、そのロールをユーザに付与します。その後、ユーザーは特権を取得できる。</p>
<p>RBACモデルは、アクセス制御管理の効率を向上させることができる。たとえば、複数のユーザーが同じ権限セットを必要とする場合、ユーザーごとに権限を手動で設定する必要はありません。代わりに、ロールを作成し、そのロールをユーザーに割り当てることができます。これらのユーザーの権限を調整したい場合は、ロールの権限を調整するだけで、このロールを持つすべてのユーザーに変更が適用されます。</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBACの主な概念<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" />
   </span> <span class="img-wrapper"> <span>ユーザー ロール 特権</span> </span></p>
<p>RBACモデルには4つの主要コンポーネントがあります。</p>
<ul>
<li><p><strong>リソース：</strong>アクセス可能なリソース・エンティティ。Milvusのリソースにはインスタンス、データベース、コレクションの3つのレベルがあります。</p></li>
<li><p><strong>特権：</strong>Milvusリソースに対して特定の操作を実行する権限（例：コレクションの作成、データの挿入など）。</p></li>
<li><p><strong>特権グループ：</strong>複数の権限のグループ。</p></li>
<li><p><strong>ロール：</strong>ロールは特権とリソースの2つの部分から構成されます。特権はロールが実行できる操作の種類を定義し、リソースは操作を実行できる対象リソースを定義します。例えば、データベース管理者ロールは特定のデータベースに対して読み取り、書き込み、管理の操作を実行できます。</p></li>
<li><p><strong>ユーザ:</strong>ユーザとは、Milvusを利用する人のことです。各ユーザは一意のIDを持ち、ロールまたは複数のロールを付与されます。</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">手続き<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>RBACによるアクセス制御を行うには、以下の手順が必要です：</p>
<ol>
<li><p><strong><a href="/docs/ja/users_and_roles.md#Create-a-user">ユーザを作成</a></strong>します：ユーザの作成: Milvus のデフォルトユーザ<code translate="no">root</code> に加え、新しいユーザを作成し、データセキュリティを保護するためのパスワードを設定することができます。</p></li>
<li><p><strong><a href="/docs/ja/users_and_roles.md#Create-a-role">ロールを作成する</a></strong>：ニーズに応じてカスタマイズしたロールを作成することができます。ロールの具体的な機能はその権限によって決定されます。</p></li>
<li><p><strong><a href="/docs/ja/privilege_group.md">特権グループの作成</a></strong>：複数の権限を1つの権限グループにまとめることで、ロールへの権限付与プロセスを効率化できます。</p></li>
<li><p><strong><a href="/docs/ja/grant_privileges.md">ロールに特権または特権グループを付与</a></strong>します：このロールに特権または特権グループを付与することで、ロールの能力を定義します。</p></li>
<li><p><strong><a href="/docs/ja/grant_roles.md">ユーザにロールを付与する</a></strong>：ユーザがロールの特権を持てるように、特定の特権を持つロールをユーザに付与します。1つのロールを複数のユーザに付与することができます。</p></li>
</ol>
