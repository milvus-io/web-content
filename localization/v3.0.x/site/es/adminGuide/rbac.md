---
id: rbac.md
title: Explicación del RBAC
summary: >-
  El RBAC (control de acceso basado en roles) regula las operaciones que los
  usuarios pueden realizar a nivel de colección, base de datos e instancia en
  función de los roles.
---
<h1 id="RBAC-Explained" class="common-anchor-header">Explicación del RBAC<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>El RBAC (control de acceso basado en roles) es un método de control de acceso basado en roles. Con el RBAC, se puede controlar con precisión las operaciones que los usuarios pueden realizar a nivel de colección, base de datos e instancia, lo que mejora la seguridad de los datos.</p>
<p>A diferencia de los modelos tradicionales de control de acceso de usuarios, el RBAC introduce el concepto de <strong>roles</strong>. En el modelo RBAC, se otorgan privilegios a los roles y, a continuación, se asignan dichos roles a los usuarios. De este modo, los usuarios pueden obtener privilegios.</p>
<p>El modelo RBAC puede mejorar la eficiencia de la gestión del control de acceso. Por ejemplo, si varios usuarios necesitan el mismo conjunto de privilegios, no es necesario configurar manualmente los privilegios para cada usuario. En su lugar, se puede crear un rol y asignárselo a los usuarios. Si desea ajustar los privilegios de estos usuarios, basta con ajustar los privilegios del rol y la modificación se aplicará a todos los usuarios que tengan ese rol.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">Conceptos clave del RBAC<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   <span>Usuarios, Roles, Privilegios</span>
  
 </span></p>
<p>El modelo RBAC consta de cinco componentes principales.</p>
<ul>
<li><p><strong>Recurso:</strong> la entidad a la que se puede acceder. En Milvus hay tres niveles de recursos: instancia, base de datos y colección.</p></li>
<li><p><strong>Privilegio:</strong> el permiso para realizar determinadas operaciones en los recursos de Milvus (por ejemplo, crear colecciones, insertar datos, etc.).</p></li>
<li><p><strong>Grupo de privilegios:</strong> un conjunto de varios privilegios.</p></li>
<li><p><strong>Rol:</strong> un rol consta de dos partes: privilegios y recursos. Los privilegios definen el tipo de operaciones que un rol puede realizar, mientras que los recursos definen los recursos de destino sobre los que se pueden realizar dichas operaciones. Por ejemplo, el rol de administrador de bases de datos puede realizar operaciones de lectura, escritura y gestión en determinadas bases de datos.</p></li>
<li><p><strong>Usuario:</strong> un usuario es una persona que utiliza Milvus. Cada usuario tiene un identificador único y se le asigna uno o varios roles.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">Procedimientos<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Para implementar el control de acceso mediante RBAC, debes seguir los pasos que se indican a continuación:</p>
<ol>
<li><p><strong><a href="/docs/es/users_and_roles.md#Create-a-user">Crear un usuario</a></strong>: además del usuario predeterminado <code translate="no">root</code> en Milvus, puede crear nuevos usuarios y establecer contraseñas para proteger la seguridad de los datos.</p></li>
<li><p><strong><a href="/docs/es/users_and_roles.md#Create-a-role">Crear un rol</a></strong>: puede crear roles personalizados en función de sus necesidades. Las capacidades específicas de un rol vienen determinadas por sus privilegios.</p></li>
<li><p><strong><a href="/docs/es/privilege_group.md">Crear un grupo de privilegios</a></strong>: Combina varios privilegios en un único grupo de privilegios para agilizar el proceso de concesión de privilegios a un rol.</p></li>
<li><p><strong><a href="/docs/es/grant_privileges.md">Conceder privilegios o grupos de privilegios a un rol</a></strong>: Define las capacidades de un rol concediéndole privilegios o grupos de privilegios.</p></li>
<li><p><strong><a href="/docs/es/grant_roles.md">Conceder roles a los usuarios</a></strong>: concede roles con determinados privilegios a los usuarios para que estos puedan disponer de los privilegios de dicho rol. Un mismo rol puede concederse a varios usuarios.</p></li>
</ol>
