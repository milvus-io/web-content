---
id: rbac.md
title: Explicação do RBAC
summary: >-
  O RBAC (Role-Based Access Control) é um método de controlo de acesso baseado
  em funções. Com o RBAC, é possível controlar com precisão as operações que os
  utilizadores podem realizar ao nível da coleção, da base de dados e da
  instância, aumentando a segurança dos dados.
---

<h1 id="RBAC-Explained" class="common-anchor-header">Explicação do RBAC<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>O RBAC (Role-Based Access Control) é um método de controlo de acesso baseado em funções. Com o RBAC, é possível controlar com precisão as operações que os utilizadores podem efetuar ao nível da coleção, da base de dados e da instância, aumentando a segurança dos dados.</p>
<p>Ao contrário dos modelos tradicionais de controlo de acesso de utilizadores, o RBAC introduz o conceito de <strong>funções</strong>. No modelo RBAC, são concedidos privilégios às funções e, em seguida, essas funções são concedidas aos utilizadores. Em seguida, os utilizadores podem obter privilégios.</p>
<p>O modelo RBAC pode melhorar a eficiência da gestão do controlo de acesso. Por exemplo, se vários utilizadores necessitarem do mesmo conjunto de privilégios, não é necessário definir manualmente os privilégios para cada utilizador. Em vez disso, é possível criar uma função e atribuir a função aos utilizadores. Se pretender ajustar os privilégios desses utilizadores, basta ajustar os privilégios da função e a alteração será aplicada a todos os utilizadores com essa função.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">Conceitos-chave do RBAC<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   </span> <span class="img-wrapper"> <span>Utilizadores Funções Privilégios</span> </span></p>
<p>Existem quatro componentes principais no modelo RBAC.</p>
<ul>
<li><p><strong>Recurso:</strong> A entidade de recurso que pode ser acedida. Existem três níveis de recursos no Milvus - instância, base de dados e coleção.</p></li>
<li><p><strong>Privilégio:</strong> A permissão para efetuar determinadas operações nos recursos Milvus (por exemplo, criar colecções, inserir dados, etc.).</p></li>
<li><p><strong>Grupo de privilégios:</strong> Um grupo de múltiplos privilégios.</p></li>
<li><p><strong>Função:</strong> Uma função é composta por duas partes: privilégios e recursos. Os privilégios definem o tipo de operações que uma função pode executar, enquanto os recursos definem os recursos de destino nos quais as operações podem ser executadas. Por exemplo, a função de administrador da base de dados pode efetuar operações de leitura, escrita e gestão em determinadas bases de dados.</p></li>
<li><p><strong>Utilizador:</strong> um utilizador é alguém que utiliza o Milvus. Cada utilizador tem um ID único e é-lhe atribuída uma função ou várias funções.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">Procedimentos<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Para obter o controlo de acesso através do RBAC, é necessário seguir os passos abaixo:</p>
<ol>
<li><p><strong><a href="/docs/pt/v2.5.x/users_and_roles.md#Create-a-user">Criar um utilizador</a></strong>: Para além do utilizador predefinido <code translate="no">root</code> no Milvus, é possível criar novos utilizadores e definir palavras-passe para proteger a segurança dos dados.</p></li>
<li><p><strong><a href="/docs/pt/v2.5.x/users_and_roles.md#Create-a-role">Criar uma função</a></strong>: Pode criar funções personalizadas com base nas suas necessidades. As capacidades específicas de uma função são determinadas pelos seus privilégios.</p></li>
<li><p><strong><a href="/docs/pt/v2.5.x/privilege_group.md">Criar um grupo de privilégios</a></strong>: Combine vários privilégios num único grupo de privilégios para simplificar o processo de concessão de privilégios a uma função.</p></li>
<li><p><strong><a href="/docs/pt/v2.5.x/grant_privileges.md">Conceder privilégios ou grupos de privilégios a uma função</a></strong>: Defina as capacidades de uma função concedendo privilégios ou grupos de privilégios a esta função.</p></li>
<li><p><strong><a href="/docs/pt/v2.5.x/grant_roles.md">Conceder funções aos utilizadores</a></strong>: Conceder funções com determinados privilégios aos utilizadores para que estes possam ter os privilégios de uma função. Uma única função pode ser concedida a vários utilizadores.</p></li>
</ol>
