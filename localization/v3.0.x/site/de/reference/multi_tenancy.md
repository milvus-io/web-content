---
id: multi_tenancy.md
title: Mandantenfähigkeit implementieren
summary: >-
  In Milvus bedeutet Mandantenfähigkeit, dass mehrere Kunden oder Teams –
  sogenannte Mandanten – denselben Cluster gemeinsam nutzen, wobei ihre
  Datenumgebungen voneinander isoliert bleiben.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Mandantenfähigkeit implementieren<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus bedeutet Mandantenfähigkeit, dass mehrere Kunden oder Teams – sogenannte <strong>Mandanten</strong>– denselben Cluster gemeinsam nutzen, wobei isolierte Datenumgebungen gewährleistet sind.</p>
<p>Milvus unterstützt vier Multi-Tenancy-Strategien, die jeweils unterschiedliche Kompromisse zwischen Skalierbarkeit, Datenisolierung und Flexibilität bieten. Dieser Leitfaden führt Sie durch die einzelnen Optionen und hilft Ihnen dabei, die für Ihren Anwendungsfall am besten geeignete Strategie auszuwählen.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Mandantenfähigkeitsstrategien<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt Mandantenfähigkeit auf vier Ebenen: <strong>Datenbank</strong>, <strong>Sammlung</strong>, <strong>Partition</strong> und <strong>Partitionsschlüssel</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Mandantenfähigkeit auf Datenbankebene<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Multi-Tenancy auf Datenbankebene erhält jeder Mandant eine eigene <a href="/docs/de/manage_databases.md">Datenbank</a>, die eine oder mehrere Sammlungen enthält.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>Multi-Tenancy auf Datenbankebene</span>
  
 </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Die Multi-Tenancy-Strategie auf Datenbankebene unterstützt standardmäßig maximal 64 Mandanten.</p></li>
<li><p><strong>Datenisolierung</strong>: Die Daten in jeder Datenbank sind vollständig voneinander getrennt, was eine Datenisolierung auf Unternehmensniveau bietet, die ideal für regulierte Umgebungen oder Kunden mit strengen Compliance-Anforderungen ist.</p></li>
<li><p><strong>Flexibilität</strong>: Jede Datenbank kann Sammlungen mit unterschiedlichen Schemata enthalten, was eine äußerst flexible Datenorganisation ermöglicht und es jedem Mandanten erlaubt, sein eigenes Datenschema zu nutzen.</p></li>
<li><p><strong>Sonstiges</strong>: Diese Strategie unterstützt zudem RBAC und ermöglicht so eine fein abgestufte Steuerung des Benutzerzugriffs pro Mandant. Darüber hinaus können Sie Daten für bestimmte Mandanten flexibel laden oder freigeben, um „heiße“ und „kalte“ Daten effektiv zu verwalten.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Mandantenfähigkeit auf Collection-Ebene<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Mandantenfähigkeit auf Sammlungsebene wird jedem Mandanten eine <a href="/docs/de/manage-collections.md">Sammlung</a> zugewiesen, was eine starke Datenisolierung gewährleistet.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>Multi-Tenancy auf Collection-Ebene</span>
  
 </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Da ein Cluster standardmäßig bis zu 65.536 Sammlungen enthalten kann, lässt sich mit dieser Strategie die gleiche Anzahl von Mandanten innerhalb des Clusters unterbringen.</p></li>
<li><p><strong>Datenisolierung</strong>: Sammlungen sind physisch voneinander isoliert. Diese Strategie bietet eine starke Datenisolierung.</p></li>
<li><p><strong>Flexibilität</strong>: Diese Strategie ermöglicht es, dass jede Sammlung über ein eigenes Schema verfügt, wodurch Mandanten mit unterschiedlichen Datenschemata unterstützt werden.</p></li>
<li><p><strong>Sonstiges</strong>: Diese Strategie unterstützt zudem RBAC und ermöglicht so eine granulare Zugriffskontrolle über Mandanten. Darüber hinaus können Sie Daten für bestimmte Mandanten flexibel laden oder freigeben, um „heiße“ und „kalte“ Daten effektiv zu verwalten.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Mandantenfähigkeit auf Partitionsebene<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Mandantenfähigkeit auf Partitionsebene wird jeder Mandant einer manuell erstellten <a href="/docs/de/manage-partitions.md">Partition</a> innerhalb einer gemeinsam genutzten Sammlung zugewiesen.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>Multi-Tenancy auf Partitionsebene</span>
  
 </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Eine Sammlung kann bis zu 1.024 Partitionen pro Sammlung enthalten, was die gleiche Anzahl von Mandanten innerhalb dieser Sammlung ermöglicht.</p></li>
<li><p><strong>Datenisolierung</strong>: Die Daten jedes Mandanten sind durch Partitionen physisch voneinander getrennt.</p></li>
<li><p><strong>Flexibilität</strong>: Bei dieser Strategie müssen alle Mandanten dasselbe Datenschema verwenden. Außerdem müssen Partitionen manuell angelegt werden.</p></li>
<li><p><strong>Sonstiges</strong>: RBAC wird auf Partitionsebene nicht unterstützt. Mandanten können entweder einzeln oder über mehrere Partitionen hinweg abgefragt werden, wodurch sich dieser Ansatz gut für Szenarien eignet, die aggregierte Abfragen oder Analysen über Mandantensegmente hinweg beinhalten. Darüber hinaus können Sie Daten für bestimmte Mandanten flexibel laden oder freigeben, um „heiße“ und „kalte“ Daten effektiv zu verwalten.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multi-Tenancy auf Partitionsschlüssel-Ebene<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei dieser Strategie nutzen alle Mandanten eine einzige Sammlung und ein einziges Schema, doch die Daten jedes Mandanten werden basierend auf dem Wert <a href="/docs/de/use-partition-key.md">des Partitionsschlüssels</a> automatisch in 16 physisch isolierte Partitionen geleitet. Obwohl jede physische Partition mehrere Mandanten enthalten kann, bleiben die Daten verschiedener Mandanten logisch voneinander getrennt.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>Mandantenfähigkeit auf Partitionsschlüsselebene</span>
  
 </span></p>
<ul>
<li><p><strong>Skalierbarkeit</strong>: Die Strategie auf Partitionsschlüsselebene bietet den skalierbarsten Ansatz und unterstützt Millionen von Mandanten.</p></li>
<li><p><strong>Datenisolierung</strong>: Diese Strategie bietet eine relativ schwache Datenisolierung, da sich mehrere Mandanten eine physische Partition teilen können.</p></li>
<li><p><strong>Flexibilität</strong>: Da alle Mandanten dasselbe Datenschema nutzen müssen, bietet diese Strategie nur begrenzte Datenflexibilität.</p></li>
<li><p><strong>Sonstiges</strong>: RBAC wird auf Partitionsschlüsselebene nicht unterstützt. Mandanten können entweder einzeln oder über mehrere Partitionen hinweg abgefragt werden, wodurch sich dieser Ansatz gut für Szenarien eignet, die aggregierte Abfragen oder Analysen über Mandantensegmente hinweg beinhalten.</p></li>
</ul>
<div class="alert note">
<p>Wir empfehlen, einen skalaren Index auf dem Partitionsschlüsselfeld anzulegen. Da jede physische Partition mehrere Mandanten enthält, wertet Milvus den Mandantenfilter für jede Entität in den durchsuchten Partitionen aus – ohne Index führt dies zu einem Vollscan. Weitere Informationen finden Sie unter <a href="/docs/de/use-partition-key.md#Index-Partition-Key">„Partitionsschlüssel indizieren</a>“.</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Auswahl der richtigen Multi-Tenancy-Strategie<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle bietet einen umfassenden Vergleich der vier Ebenen von Multi-Tenancy-Strategien.</p>
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
     <td><p>Physikalisch</p></td>
     <td><p>Physisch</p></td>
     <td><p>Physisch</p></td>
     <td><p>Physisch + logisch</p></td>
   </tr>
   <tr>
     <td><p><strong>Max. Anzahl von Mandanten</strong></p></td>
     <td><p>Standardmäßig 64. Sie können diese Anzahl erhöhen, indem Sie den Parameter „ <code translate="no">maxDatabaseNum</code> “ in der Konfigurationsdatei „Milvus.yaml“ ändern. </p></td>
     <td><p>Standardmäßig 65.536. Sie können diese Zahl erhöhen, indem Sie den Parameter „ <code translate="no">maxCollectionNum</code> “ in der Konfigurationsdatei „Milvus.yaml“ anpassen.</p></td>
     <td><p>Bis zu 1.024 pro Sammlung. </p></td>
     <td><p>Millionen</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilität des Datenschemas</strong></p></td>
     <td><p>Hoch</p></td>
     <td><p>Mittel</p></td>
     <td><p>Niedrig</p></td>
     <td><p>Gering</p></td>
   </tr>
   <tr>
     <td><p><strong>RBAC-Unterstützung</strong></p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
     <td><p>Nein</p></td>
     <td><p>Nein</p></td>
   </tr>
   <tr>
     <td><p><strong>Suchleistung</strong></p></td>
     <td><p>Stark</p></td>
     <td><p>Stark</p></td>
     <td><p>Mäßig</p></td>
     <td><p>Mäßig</p></td>
   </tr>
   <tr>
     <td><p><strong>Unterstützung für mandantenübergreifende Suche</strong></p></td>
     <td><p>Nein</p></td>
     <td><p>Nein</p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
   </tr>
   <tr>
     <td><p><strong>Unterstützung für den effektiven Umgang mit „Hot Data“ und „Cold Data“</strong></p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
     <td><p>Ja</p></td>
     <td><p>Nein Derzeit wird dies für die Strategie auf Partitionsschlüsselebene nicht unterstützt.</p></td>
   </tr>
</table>
<p>Bei der Auswahl der Multi-Tenancy-Strategie in Milvus sind mehrere Faktoren zu berücksichtigen.</p>
<ol>
<li><p><strong>Skalierbarkeit:</strong> Partitionsschlüssel &gt; Partition &gt; Sammlung &gt; Datenbank</p>
<p>Wenn Sie davon ausgehen, eine sehr große Anzahl von Mandanten (Millionen oder mehr) zu unterstützen, verwenden Sie die Strategie auf Partitionsschlüssel-Ebene.</p></li>
<li><p><strong>Hohe Anforderungen an die Datenisolierung</strong>: Datenbank = Sammlung &gt; Partition &gt; Partitionsschlüssel</p>
<p>Wählen Sie Strategien auf Datenbank-, Sammlung- oder Partitionsebene, wenn Sie strenge Anforderungen an die physische Datenisolierung haben.</p></li>
<li><p><strong>Flexibles Datenschema für die Daten jedes Mandanten:</strong> Datenbank &gt; Sammlung &gt; Partition = Partitionsschlüssel</p>
<p>Strategien auf Datenbank- und Sammlungsebene bieten volle Flexibilität bei den Datenschemata. Wenn sich die Datenstrukturen Ihrer Mandanten unterscheiden, wählen Sie Multi-Tenancy auf Datenbank- oder Sammlungsebene.</p></li>
<li><p><strong>Sonstiges</strong></p>
<ol>
<li><p><strong>Leistung:</strong> Die Suchleistung wird durch verschiedene Faktoren bestimmt, darunter Indizes, Suchparameter und Maschinenkonfigurationen. Milvus unterstützt zudem die Leistungsoptimierung. Es wird empfohlen, die tatsächliche Leistung zu testen, bevor Sie sich für eine Multi-Tenancy-Strategie entscheiden.</p></li>
<li><p><strong>Effektiver Umgang mit „heißen“ und „kalten“ Daten</strong>: Derzeit unterstützen alle Strategien auf Datenbank-, Sammlungsebene und Partitionsebene den Umgang mit „heißen“ und „kalten“ Daten.</p></li>
<li><p><strong>Mandantenübergreifende Suchvorgänge</strong>: Nur die Strategien auf Partitionsebene und Partitionsschlüsselebene unterstützen mandantenübergreifende Abfragen.</p></li>
</ol></li>
</ol>
