---
id: object-storage.md
title: Stockage d'objets
---
<h1 id="Object-Storage" class="common-anchor-header">Stockage d'objets<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus stocke les fichiers d’index et les journaux binaires — qui constituent l’essentiel de ses données — dans un système de stockage d’objets. Milvus prend en charge MinIO ainsi qu’une gamme de systèmes de stockage d’objets compatibles S3 et cloud.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">Stockage d'objets pris en charge<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Fournisseur / service</th><th style="text-align:center">Prise en charge en tant que stockage d’objets Milvus</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (par défaut pour les déploiements auto-hébergés)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Stockage Blob Azure</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Tencent COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Huawei Cloud OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>Autres solutions de stockage compatibles S3</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Pour plus de détails sur la configuration, consultez les sections « <a href="/docs/fr/deploy_s3.md">Configurer le stockage d'objets avec Docker Compose ou Helm</a> » et « <a href="/docs/fr/object_storage_operator.md">Configurer le stockage d'objets avec Milvus Operator</a> ».</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">Exigences supplémentaires lors de l’utilisation de Woodpecker intégré<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque vous exécutez la file d’attente de messages <strong>Woodpecker</strong> par défaut avec son backend de stockage d’objets (<code translate="no">storage.type=minio</code>), Woodpecker écrit son journal d’écriture anticipée dans ce même stockage d’objets et nécessite <strong>une sémantique d’écriture conditionnelle S3 stricte</strong>. Tous les stockages d’objets ne sont pas compatibles — par exemple, Huawei Cloud OBS <strong>n’</strong> est actuellement <strong>pas pris en charge</strong> en tant que backend Woodpecker, même s’il fonctionne comme un stockage d’objets Milvus classique.</p>
<p>Consultez le tableau de compatibilité des stockages d’objets sur la page <a href="/docs/fr/woodpecker.md">Woodpecker</a> pour connaître les exigences précises par fournisseur.</p>
