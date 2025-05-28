---
id: rbac.md
title: RBAC Erklärt
summary: >-
  RBAC (Role-Based Access Control) ist eine rollenbasierte
  Zugriffskontrollmethode. Mit RBAC können Sie die Operationen, die Benutzer auf
  der Ebene der Sammlung, der Datenbank und der Instanz durchführen können,
  genau steuern und so die Datensicherheit erhöhen.
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBAC Erklärt<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) ist eine rollenbasierte Zugriffskontrollmethode. Mit RBAC können Sie die Operationen, die Benutzer auf der Sammel-, Datenbank- und Instanzebene durchführen können, genau steuern und so die Datensicherheit erhöhen.</p>
<p>Im Gegensatz zu herkömmlichen Modellen der Benutzerzugriffskontrolle führt RBAC das Konzept der <strong>Rollen</strong> ein. Im RBAC-Modell erteilen Sie Rollen Privilegien und weisen diese Rollen dann den Benutzern zu. Dann können die Benutzer Privilegien erhalten.</p>
<p>Das RBAC-Modell kann die Effizienz der Zugriffskontrollverwaltung verbessern. Wenn beispielsweise mehrere Benutzer dieselben Berechtigungen benötigen, müssen Sie die Berechtigungen nicht manuell für jeden Benutzer festlegen. Stattdessen können Sie eine Rolle erstellen und diese Rolle den Benutzern zuweisen. Wenn Sie die Berechtigungen dieser Benutzer anpassen möchten, können Sie einfach die Rollenberechtigungen anpassen und die Änderung wird auf alle Benutzer mit dieser Rolle angewendet.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">RBAC-Schlüsselkonzepte<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   </span> <span class="img-wrapper"> <span>Benutzer Rollen Privilegien</span> </span></p>
<p>Es gibt vier Hauptkomponenten im RBAC-Modell.</p>
<ul>
<li><p><strong>Ressource:</strong> Die Ressourceneinheit, auf die zugegriffen werden kann. Es gibt drei Ebenen von Ressourcen in Milvus - Instanz, Datenbank und Sammlung.</p></li>
<li><p><strong>Privileg:</strong> Die Erlaubnis, bestimmte Operationen auf Milvus-Ressourcen durchzuführen (z.B. Sammlungen erstellen, Daten einfügen, etc.).</p></li>
<li><p><strong>Privilegiengruppe:</strong> Eine Gruppe von mehreren Privilegien.</p></li>
<li><p><strong>Rolle:</strong> Eine Rolle besteht aus zwei Teilen - Berechtigungen und Ressourcen. Berechtigungen definieren die Art der Operationen, die eine Rolle ausführen kann, während Ressourcen die Zielressourcen definieren, auf denen die Operationen ausgeführt werden können. So kann die Rolle des Datenbankadministrators beispielsweise Lese-, Schreib- und Verwaltungsoperationen für bestimmte Datenbanken durchführen.</p></li>
<li><p><strong>Benutzer:</strong> Ein Benutzer ist jemand, der Milvus benutzt. Jeder Benutzer hat eine eindeutige ID und ist mit einer oder mehreren Rollen ausgestattet.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">Prozeduren<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Zugriffskontrolle über RBAC zu erreichen, müssen Sie die folgenden Schritte ausführen:</p>
<ol>
<li><p><strong><a href="/docs/de/users_and_roles.md#Create-a-user">Erstellen Sie einen Benutzer</a></strong>: Zusätzlich zu den Standardbenutzern <code translate="no">root</code> in Milvus können Sie neue Benutzer erstellen und Passwörter festlegen, um die Datensicherheit zu gewährleisten.</p></li>
<li><p><strong><a href="/docs/de/users_and_roles.md#Create-a-role">Erstellen Sie eine Rolle</a></strong>: Sie können benutzerdefinierte Rollen erstellen, die auf Ihren Bedürfnissen basieren. Die spezifischen Fähigkeiten einer Rolle werden durch ihre Berechtigungen bestimmt.</p></li>
<li><p><strong><a href="/docs/de/privilege_group.md">Erstellen Sie eine Berechtigungsgruppe</a></strong>: Kombinieren Sie mehrere Berechtigungen in einer Berechtigungsgruppe, um den Prozess der Gewährung von Berechtigungen für eine Rolle zu rationalisieren.</p></li>
<li><p><strong><a href="/docs/de/grant_privileges.md">Gewähren Sie einer Rolle Berechtigungen oder Berechtigungsgruppen</a></strong>: Definieren Sie die Fähigkeiten einer Rolle, indem Sie dieser Rolle Privilegien oder Privilegiengruppen erteilen.</p></li>
<li><p><strong><a href="/docs/de/grant_roles.md">Rollen an Benutzer vergeben</a></strong>: Gewähren Sie Benutzern Rollen mit bestimmten Privilegien, so dass diese über die Privilegien einer Rolle verfügen können. Eine einzelne Rolle kann mehreren Benutzern zugewiesen werden.</p></li>
</ol>
