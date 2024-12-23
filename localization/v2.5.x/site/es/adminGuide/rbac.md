---
id: rbac.md
related_key: enable RBAC
summary: >-
  RBAC (Role-Based Access Control) es un método de control de acceso basado en
  roles. Con RBAC, puedes controlar con precisión las operaciones que los
  usuarios pueden realizar a nivel de colección, base de datos e instancia, lo
  que mejora la seguridad de los datos. 
title: Explicación de RBAC
---
<h1 id="RBAC-Explained​" class="common-anchor-header">Explicación de RBAC<button data-href="#RBAC-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) es un método de control de acceso basado en roles. Con RBAC, puede controlar con precisión las operaciones que los usuarios pueden realizar a nivel de colección, base de datos e instancia, mejorando la seguridad de los datos. </p>
<p>A diferencia de los modelos tradicionales de control de acceso de usuarios, RBAC introduce el concepto de <strong>roles</strong>. En el modelo RBAC, se conceden privilegios a los roles y luego se otorgan esos roles a los usuarios. A continuación, los usuarios pueden obtener privilegios. </p>
<p>El modelo RBAC puede mejorar la eficacia de la gestión del control de acceso. Por ejemplo, si varios usuarios necesitan el mismo conjunto de privilegios, no es necesario establecer manualmente los privilegios para cada usuario. En su lugar, puede crear un rol y asignar el rol a los usuarios. Si desea ajustar los privilegios de estos usuarios, sólo tiene que ajustar los privilegios del rol y la modificación se aplicará a todos los usuarios con este rol.</p>
<h2 id="RBAC-key-concepts​" class="common-anchor-header">Conceptos clave de RBAC<button data-href="#RBAC-key-concepts​" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/users_roles_privileges.png" alt="Users, roles, and privileges" class="doc-image" id="users,-roles,-and-privileges" />
   </span> <span class="img-wrapper"> <span>Usuarios, roles y privilegios</span> </span></p>
<p>Hay cuatro componentes principales en el modelo RBAC.</p>
<ul>
<li><p>**Recurso: **La entidad de recursos a la que se puede acceder. Hay tres niveles de recursos en Milvus - instancia, base de datos y colección.</p></li>
<li><p>**Privilegio: **El permiso para realizar ciertas operaciones en los recursos de Milvus (por ejemplo, crear colecciones, insertar datos, etc.). </p></li>
<li><p>**Grupo de privilegios: **Un grupo de múltiples privilegios.</p></li>
<li><p>**Rol: **Un rol consta de dos partes: privilegios y recursos. Los privilegios definen el tipo de operaciones que un rol puede realizar, mientras que los recursos definen los recursos de destino en los que se pueden realizar las operaciones. Por ejemplo, el rol de administrador de base de datos puede realizar operaciones de lectura, escritura y gestión en determinadas bases de datos.</p></li>
<li><p>**Usuario: Un usuario es alguien que utiliza Milvus. Cada usuario tiene un ID único y se le otorga un rol o múltiples roles. </p></li>
</ul>
<h2 id="Procedures​" class="common-anchor-header">Procedimientos<button data-href="#Procedures​" class="anchor-icon" translate="no">
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
    </button></h2><p>Para lograr el control de acceso a través de RBAC, es necesario seguir los siguientes pasos.</p>
<ol>
<li><p><a href="/docs/es/users_and_roles.md#Create-a-user">Cree un usuario</a>: Además del usuario predeterminado <code translate="no">root</code> en Milvus, puede crear nuevos usuarios y establecer contraseñas para proteger la seguridad de los datos.</p></li>
<li><p><a href="/docs/es/users_and_roles.md#Create-a-role">Cree un rol</a>: Puede crear roles personalizados en función de sus necesidades. Las capacidades específicas de un rol están determinadas por sus privilegios.</p></li>
<li><p><a href="/docs/es/privilege_group.md">Crear un grupo de privilegios</a>: Combine varios privilegios en un grupo de privilegios para agilizar el proceso de concesión de privilegios a un rol.</p></li>
<li><p><a href="/docs/es/grant_privileges.md">Conceder privilegios o grupos de privilegios a un rol</a>: Defina las capacidades de un rol concediéndole privilegios o grupos de privilegios. </p></li>
<li><p><a href="/docs/es/grant_roles.md">Conceder roles a usuarios</a>: Conceda roles con ciertos privilegios a los usuarios para que los usuarios puedan tener los privilegios de un rol. Un mismo rol puede ser otorgado a múltiples usuarios.</p></li>
</ol>
