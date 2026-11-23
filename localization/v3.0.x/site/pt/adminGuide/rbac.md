---
id: rbac.md
title: O RBAC explicado
summary: >-
  O RBAC (Controlo de Acesso Baseado em Funções) controla as operações que os
  utilizadores podem realizar ao nível da coleção, da base de dados e da
  instância, com base nas funções.
---
<h1 id="RBAC-Explained" class="common-anchor-header">O RBAC explicado<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>O RBAC (Controlo de Acesso Baseado em Funções) é um método de controlo de acesso baseado em funções. Com o RBAC, é possível controlar com precisão as operações que os utilizadores podem realizar ao nível da coleção, da base de dados e da instância, reforçando a segurança dos dados.</p>
<p>Ao contrário dos modelos tradicionais de controlo de acesso de utilizadores, o RBAC introduz o conceito de <strong>funções</strong>. No modelo RBAC, concede-se privilégios às funções e, em seguida, atribui-se essas funções aos utilizadores. Assim, os utilizadores podem obter privilégios.</p>
<p>O modelo RBAC pode melhorar a eficiência da gestão do controlo de acesso. Por exemplo, se vários utilizadores necessitarem do mesmo conjunto de privilégios, não é necessário definir manualmente os privilégios para cada utilizador. Em vez disso, pode criar uma função e atribuí-la aos utilizadores. Se pretender ajustar os privilégios destes utilizadores, basta ajustar os privilégios da função e a alteração será aplicada a todos os utilizadores com essa função.</p>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" /> 
   <span>Utilizadores Funções Privilégios</span>
  
 </span></p>
<p>Existem cinco componentes principais no modelo RBAC.</p>
<ul>
<li><p><strong>Recurso:</strong> A entidade de recurso que pode ser acedida. Existem três níveis de recursos no Milvus — instância, base de dados e coleção.</p></li>
<li><p><strong>Privilégio:</strong> A permissão para realizar determinadas operações nos recursos do Milvus (por exemplo, criar coleções, inserir dados, etc.).</p></li>
<li><p><strong>Grupo de privilégios:</strong> Um conjunto de vários privilégios.</p></li>
<li><p><strong>Função:</strong> Uma função é composta por duas partes — privilégios e recursos. Os privilégios definem o tipo de operações que uma função pode realizar, enquanto os recursos definem os recursos-alvo sobre os quais as operações podem ser realizadas. Por exemplo, a função de administrador de bases de dados pode realizar operações de leitura, escrita e gestão em determinadas bases de dados.</p></li>
<li><p><strong>Utilizador:</strong> Um utilizador é alguém que utiliza o Milvus. Cada utilizador tem um ID único e tem atribuída uma função ou várias funções.</p></li>
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
    </button></h2><p>Para implementar o controlo de acesso através do RBAC, é necessário seguir os passos abaixo:</p>
<ol>
<li><p><strong><a href="/docs/pt/users_and_roles.md#Create-a-user">Criar um utilizador</a></strong>: Para além do utilizador predefinido <code translate="no">root</code> no Milvus, pode criar novos utilizadores e definir palavras-passe para proteger a segurança dos dados.</p></li>
<li><p><strong><a href="/docs/pt/users_and_roles.md#Create-a-role">Criar uma função</a></strong>: Pode criar funções personalizadas de acordo com as suas necessidades. As capacidades específicas de uma função são determinadas pelos seus privilégios.</p></li>
<li><p><strong><a href="/docs/pt/privilege_group.md">Criar um grupo de privilégios</a></strong>: Combine vários privilégios num único grupo de privilégios para simplificar o processo de atribuição de privilégios a uma função.</p></li>
<li><p><strong><a href="/docs/pt/grant_privileges.md">Conceder privilégios ou grupos de privilégios a uma função</a></strong>: Defina as capacidades de uma função concedendo privilégios ou grupos de privilégios a essa função.</p></li>
<li><p><strong><a href="/docs/pt/grant_roles.md">Conceder funções aos utilizadores</a></strong>: Conceda funções com determinados privilégios aos utilizadores, para que estes possam dispor dos privilégios de uma função. Uma única função pode ser concedida a vários utilizadores.</p></li>
</ol>
