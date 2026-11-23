---
id: rbac.md
title: RBAC erklärt
summary: >-
  RBAC (Role-Based Access Control) regelt anhand von Rollen, welche Vorgänge
  Benutzer auf der Ebene der Sammlung, der Datenbank und der Instanz ausführen
  dürfen.
---
<h1 id="RBAC-Explained" class="common-anchor-header">RBAC erklärt<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) ist ein auf Rollen basierendes Zugriffskontrollverfahren. Mit RBAC können Sie die Vorgänge, die Benutzer auf Collection-, Datenbank- und Instanzebene ausführen dürfen, präzise steuern und so die Datensicherheit erhöhen.</p>
<p>Im Gegensatz zu herkömmlichen Modellen der Benutzerzugriffskontrolle führt RBAC das Konzept der <strong>Rollen</strong> ein. Im RBAC-Modell erteilen Sie Berechtigungen an Rollen und weisen diese Rollen anschließend den Benutzern zu. Auf diese Weise erhalten die Benutzer die entsprechenden Berechtigungen.</p>
<p>Das RBAC-Modell kann die Effizienz der Zugriffskontrollverwaltung verbessern. Wenn beispielsweise mehrere Benutzer denselben Satz an Berechtigungen benötigen, müssen Sie die Berechtigungen nicht manuell für jeden einzelnen Benutzer festlegen. Stattdessen können Sie eine Rolle erstellen und diese den Benutzern zuweisen. Wenn Sie die Berechtigungen dieser Benutzer anpassen möchten, können Sie einfach die Rollenberechtigungen anpassen; die Änderung wird dann auf alle Benutzer mit dieser Rolle angewendet.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">Wichtige Konzepte von RBAC<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
   <span>Benutzer Rollen Berechtigungen</span>
  
 </span></p>
<p>Das RBAC-Modell umfasst fünf Hauptkomponenten.</p>
<ul>
<li><p><strong>Ressource:</strong> Die Ressource, auf die zugegriffen werden kann. In Milvus gibt es drei Ebenen von Ressourcen: Instanz, Datenbank und Sammlung.</p></li>
<li><p><strong>Berechtigung:</strong> Die Erlaubnis, bestimmte Operationen an Milvus-Ressourcen durchzuführen (z. B. Sammlungen erstellen, Daten einfügen usw.).</p></li>
<li><p><strong>Berechtigungsgruppe:</strong> Eine Gruppe aus mehreren Berechtigungen.</p></li>
<li><p><strong>Rolle:</strong> Eine Rolle besteht aus zwei Teilen – Berechtigungen und Ressourcen. Berechtigungen definieren die Art der Operationen, die eine Rolle ausführen kann, während Ressourcen die Zielressourcen definieren, auf denen die Operationen ausgeführt werden können. Beispielsweise kann die Rolle „Datenbankadministrator“ Lese-, Schreib- und Verwaltungsoperationen an bestimmten Datenbanken durchführen.</p></li>
<li><p><strong>Benutzer:</strong> Ein Benutzer ist jemand, der Milvus nutzt. Jeder Benutzer hat eine eindeutige ID und erhält eine oder mehrere Rollen.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">Vorgehensweise<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Zugriffskontrolle über RBAC zu realisieren, müssen Sie die folgenden Schritte ausführen:</p>
<ol>
<li><p><strong><a href="/docs/de/users_and_roles.md#Create-a-user">Benutzer anlegen</a></strong>: Zusätzlich zum Standardbenutzer „ <code translate="no">root</code> “ in Milvus können Sie neue Benutzer anlegen und Passwörter festlegen, um die Datensicherheit zu gewährleisten.</p></li>
<li><p><strong><a href="/docs/de/users_and_roles.md#Create-a-role">Rolle erstellen</a></strong>: Sie können je nach Bedarf benutzerdefinierte Rollen erstellen. Die spezifischen Fähigkeiten einer Rolle werden durch ihre Berechtigungen bestimmt.</p></li>
<li><p><strong><a href="/docs/de/privilege_group.md">Erstellen Sie eine Berechtigungsgruppe</a></strong>: Fassen Sie mehrere Berechtigungen in einer Berechtigungsgruppe zusammen, um die Vergabe von Berechtigungen an eine Rolle zu vereinfachen.</p></li>
<li><p><strong><a href="/docs/de/grant_privileges.md">Berechtigungen oder Berechtigungsgruppen einer Rolle zuweisen</a></strong>: Definieren Sie die Funktionen einer Rolle, indem Sie dieser Rolle Berechtigungen oder Berechtigungsgruppen zuweisen.</p></li>
<li><p><strong><a href="/docs/de/grant_roles.md">Rollen an Benutzer vergeben</a></strong>: Weisen Sie Benutzern Rollen mit bestimmten Berechtigungen zu, damit diese über die Berechtigungen der jeweiligen Rolle verfügen. Eine einzelne Rolle kann mehreren Benutzern zugewiesen werden.</p></li>
</ol>
