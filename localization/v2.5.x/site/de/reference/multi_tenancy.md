---
id: multi_tenancy.md
title: Implementieren Sie Multi-Tenancy
summary: >-
  In Milvus bedeutet Multi-Tenancy, dass mehrere Kunden oder Teams - sogenannte
  Tenants - denselben Cluster gemeinsam nutzen und dabei isolierte
  Datenumgebungen beibehalten.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implementieren Sie Multi-Tenancy<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus bedeutet Multi-Tenancy, dass mehrere Kunden oder Teams - als <strong>Tenants bezeichnet -</strong>denselben Cluster gemeinsam nutzen und dabei isolierte Datenumgebungen beibehalten.</p>
<p>Milvus unterstützt vier Multi-Tenancy-Strategien, die jeweils einen anderen Kompromiss zwischen Skalierbarkeit, Datenisolierung und Flexibilität bieten. Dieser Leitfaden führt Sie durch jede Option und hilft Ihnen, die für Ihren Anwendungsfall am besten geeignete Strategie zu wählen.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Mehrmandantenstrategien<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt Multi-Tenancy auf vier Ebenen: <strong>Datenbank</strong>, <strong>Sammlung</strong>, <strong>Partition</strong> und <strong>Partitionsschlüssel</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Mehrmandantenfähigkeit auf Datenbankebene</h3><p>Bei der Mandantenfähigkeit auf Datenbankebene erhält jeder Mandant eine entsprechende <a href="/docs/de/manage_databases.md">Datenbank</a>, die eine oder mehrere Sammlungen enthält.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Mehrmandantenfähigkeit auf Datenbankebene</span> </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Die Multi-Tenancy-Strategie auf Datenbankebene unterstützt standardmäßig bis zu 64 Mandanten.</p></li>
<li><p><strong>Datenisolierung</strong>: Die Daten in den einzelnen Datenbanken sind vollständig voneinander getrennt und bieten eine Datenisolierung auf Unternehmensniveau, die sich ideal für regulierte Umgebungen oder Kunden mit strengen Compliance-Anforderungen eignet.</p></li>
<li><p><strong>Flexibel</strong>: Jede Datenbank kann Sammlungen mit unterschiedlichen Schemata enthalten, was eine äußerst flexible Datenorganisation ermöglicht und jedem Mandanten sein eigenes Datenschema zur Verfügung stellt.</p></li>
<li><p><strong>Andere</strong>: Diese Strategie unterstützt auch RBAC und ermöglicht eine fein abgestufte Kontrolle des Benutzerzugriffs pro Mandant. Darüber hinaus können Sie Daten für bestimmte Mandanten flexibel laden oder freigeben, um heiße und kalte Daten effektiv zu verwalten.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multi-Tenancy auf Sammlungsebene</h3><p>Bei der Mandantenfähigkeit auf Sammlungsebene wird jedem Mandanten eine <a href="/docs/de/manage-collections.md">Sammlung</a> zugewiesen, die eine starke Datenisolierung bietet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multi-Mandantenschaft auf Sammlungsebene</span> </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Da ein Cluster standardmäßig bis zu 65.536 Sammlungen aufnehmen kann, kann diese Strategie die gleiche Anzahl von Mandanten innerhalb des Clusters aufnehmen.</p></li>
<li><p><strong>Datenisolierung</strong>: Die Sammlungen sind physisch voneinander isoliert. Diese Strategie bietet eine starke Datenisolierung.</p></li>
<li><p><strong>Flexibel</strong>: Bei dieser Strategie kann jede Sammlung ihr eigenes Schema haben, so dass Tenants mit unterschiedlichen Datenschemata untergebracht werden können.</p></li>
<li><p><strong>Andere</strong>: Diese Strategie unterstützt auch RBAC und ermöglicht eine granulare Zugriffskontrolle für Mandanten. Außerdem können Sie Daten für bestimmte Mandanten flexibel laden oder freigeben, um heiße und kalte Daten effektiv zu verwalten.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multi-Tenancy auf Partitionsebene</h3><p>Bei der Mandantenfähigkeit auf Partitionsebene wird jeder Mandant einer manuell erstellten <a href="/docs/de/manage-partitions.md">Partition</a> innerhalb einer gemeinsamen Sammlung zugewiesen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multimandantenfähigkeit auf Partitionsebene</span> </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Eine Sammlung kann bis zu 1.024 Partitionen pro Sammlung enthalten, wobei die gleiche Anzahl von Tenants in der Sammlung möglich ist.</p></li>
<li><p><strong>Datenisolierung</strong>: Die Daten der einzelnen Mandanten sind physisch durch Partitionen getrennt.</p></li>
<li><p><strong>Flexibel</strong>: Bei dieser Strategie müssen alle Tenants dasselbe Datenschema verwenden. Und Partitionen müssen manuell erstellt werden.</p></li>
<li><p><strong>Andere</strong>: RBAC wird auf Partitionsebene nicht unterstützt. Tenants können entweder einzeln oder über mehrere Partitionen hinweg abgefragt werden, wodurch sich dieser Ansatz gut für Szenarien mit aggregierten Abfragen oder Analysen über Tenant-Segmente hinweg eignet. Außerdem können Sie Daten für bestimmte Tenants flexibel laden oder freigeben, um Hot- und Cold-Data effektiv zu verwalten.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Mehrmandantenfähigkeit auf Partitionsschlüssel-Ebene</h3><p>Bei dieser Strategie teilen sich alle Tenants eine einzige Sammlung und ein einziges Schema, aber die Daten jedes Tenants werden automatisch auf der Grundlage des <a href="/docs/de/use-partition-key.md">Partitionsschlüsselwerts</a> in 16 physisch isolierte Partitionen geleitet. Obwohl jede physische Partition mehrere Tenants enthalten kann, bleiben die Daten der verschiedenen Tenants logisch getrennt.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Partition Key Level Multi Tenancy</span> </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Die Strategie auf Partitionsschlüssel-Ebene bietet den am besten skalierbaren Ansatz, der Millionen von Mandanten unterstützt.</p></li>
<li><p><strong>Datenisolierung</strong>: Diese Strategie bietet eine relativ schwache Datenisolierung, da sich mehrere Mandanten eine physische Partition teilen können.</p></li>
<li><p><strong>Flexibel</strong>: Da alle Mandanten dasselbe Datenschema verwenden müssen, bietet diese Strategie eine begrenzte Datenflexibilität.</p></li>
<li><p><strong>Sonstiges</strong>: RBAC wird auf der Partitionsschlüssel-Ebene nicht unterstützt. Tenants können entweder einzeln oder über mehrere Partitionen hinweg abgefragt werden, wodurch sich dieser Ansatz gut für Szenarien mit aggregierten Abfragen oder Analysen über Tenant-Segmente hinweg eignet.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Die Wahl der richtigen Multi-Tenancy-Strategie<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle bietet einen umfassenden Vergleich zwischen den vier Ebenen von Mandantenstrategien.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Datenbankebene</strong></p></th>
     <th><p><strong>Sammlungsebene</strong></p></th>
     <th><p><strong>Partitionsebene</strong></p></th>
     <th><p><strong>Partitionsschlüssel-Ebene</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Datenisolierung</strong></p></td>
     <td><p>Physisch</p></td>
     <td><p>Physisch</p></td>
     <td><p>Physisch</p></td>
     <td><p>Physisch + Logisch</p></td>
   </tr>
   <tr>
     <td><p><strong>Maximale Anzahl von Mietern</strong></p></td>
     <td><p>Standardmäßig 64. Sie können sie erhöhen, indem Sie den Parameter <code translate="no">maxDatabaseNum</code> in der Konfigurationsdatei Milvus.yaml ändern. </p></td>
     <td><p>Standardmäßig 65.536. Sie können diesen Wert durch Ändern des Parameters <code translate="no">maxCollectionNum</code> in der Konfigurationsdatei Milvus.yaml erhöhen.</p></td>
     <td><p>Bis zu 1.024 pro Sammlung. </p></td>
     <td><p>Millionen</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilität des Datenschemas</strong></p></td>
     <td><p>Hoch</p></td>
     <td><p>Mittel</p></td>
     <td><p>Niedrig</p></td>
     <td><p>Niedrig</p></td>
   </tr>
   <tr>
     <td><p><strong>RBAC-Unterstützung</strong></p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
     <td><p>Nein</p></td>
     <td><p>Nein</p></td>
   </tr>
   <tr>
     <td><p><strong>Leistung der Suche</strong></p></td>
     <td><p>Stark</p></td>
     <td><p>Stark</p></td>
     <td><p>Mittel</p></td>
     <td><p>Mittel</p></td>
   </tr>
   <tr>
     <td><p><strong>Unterstützung der mandantenübergreifenden Suche</strong></p></td>
     <td><p>Nein</p></td>
     <td><p>Nein</p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
   </tr>
   <tr>
     <td><p><strong>Unterstützung für den effektiven Umgang mit heißen und kalten Daten</strong></p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
     <td><p>Nein Derzeit nicht unterstützt für die Partition Key-Level-Strategie.</p></td>
   </tr>
</table>
<p>Bei der Wahl der Multi-Tenancy-Strategie in Milvus sind mehrere Faktoren zu berücksichtigen.</p>
<ol>
<li><p><strong>Skalierbarkeit:</strong> Partitionsschlüssel &gt; Partition &gt; Sammlung &gt; Datenbank</p>
<p>Wenn Sie erwarten, eine sehr große Anzahl von Mandanten (Millionen oder mehr) zu unterstützen, verwenden Sie die Strategie auf Partitionsschlüssel-Ebene.</p></li>
<li><p><strong>Starke Anforderungen an die Datenisolierung</strong>: Datenbank = Sammlung &gt; Partition &gt; Partitionsschlüssel</p>
<p>Wählen Sie Strategien auf Datenbank-, Sammel- oder Partitionsebene, wenn Sie strenge Anforderungen an die physische Datenisolierung haben.</p></li>
<li><p><strong>Flexibles Datenschema für die Daten der einzelnen Mandanten:</strong> Datenbank &gt; Sammlung &gt; Partition = Partitionsschlüssel</p>
<p>Strategien auf Datenbank- und Sammlungsebene bieten volle Flexibilität bei den Datenschemata. Wenn die Datenstrukturen Ihrer Mandanten unterschiedlich sind, wählen Sie die Multi-Tenancy-Strategie auf Datenbank- oder Sammlungsebene.</p></li>
<li><p><strong>Andere</strong></p>
<ol>
<li><p><strong>Leistung:</strong> Die Suchleistung wird durch verschiedene Faktoren bestimmt, darunter Indizes, Suchparameter und Maschinenkonfigurationen. Milvus unterstützt auch Performance-Tuning. Es wird empfohlen, die tatsächliche Leistung zu testen, bevor Sie eine Multi-Tenancy-Strategie wählen.</p></li>
<li><p><strong>Effektive Handhabung von heißen und kalten Daten</strong>: Gegenwärtig unterstützen die Strategien auf Datenbank-, Sammlungs- und Partitionsebene alle die Behandlung von heißen und kalten Daten.</p></li>
<li><p><strong>Mandantenübergreifende Suche</strong>: Nur die Strategien auf Partitionsebene und Partition-Key-Ebene unterstützen mandantenübergreifende Abfragen.</p></li>
</ol></li>
</ol>
