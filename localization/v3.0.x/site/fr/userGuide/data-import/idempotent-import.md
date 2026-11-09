---
id: idempotent-import.md
order: 2
title: Importation en masse idempotente
summary: >-
  Envoyez une clé d'idempotence afin qu'une nouvelle tentative d'importation en
  masse renvoie à la tâche d'origine au lieu d'en créer une deuxième.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Importation en masse idempotente<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Une requête d’importation en masse peut aboutir alors même que sa réponse est perdue : le délai d’attente de l’appel est dépassé, la connexion est interrompue ou votre orchestrateur s’arrête avant d’enregistrer l’ <code translate="no">jobId</code> s renvoyées. Il est impossible de distinguer un « non terminé » d’un « terminé, réponse perdue ». Une nouvelle tentative lance une deuxième tâche et chaque ligne est traitée deux fois ; ne pas réessayer peut entraîner la perte de l’importation.</p>
<p>Une clé d’idempotence élimine ce dilemme. Attribuez-en une à la requête, et une nouvelle tentative portant la même clé renverra l’ <code translate="no">jobId</code> d’origine au lieu de créer une deuxième tâche.</p>
<p>L’importation en masse idempotente nécessite Milvus 3.0.2 ou une version ultérieure, ou 2.6.24 ou une version ultérieure de la branche 2.6. Un serveur plus ancien ignore l’en-tête et chaque requête, qu’il y ait une nouvelle tentative ou non, lance une nouvelle tâche.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Envoi de la clé<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>La clé est transmise via l’en-tête HTTP ` <code translate="no">Idempotency-Key</code> `, et non dans le corps de la requête.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> est <code translate="no">&quot;Idempotency-Key&quot;</code>; la chaîne brute fonctionne également. Le paramètre <code translate="no">headers</code> et <code translate="no">IDEMPOTENCY_KEY_HEADER</code> nécessitent pymilvus v3.0.3 ou une version ultérieure de la branche 3.x, ou v2.6.18 ou une version ultérieure de la branche 2.6. Avec une version plus ancienne de pymilvus, la ligne <code translate="no">import</code> ci-dessus échoue avec une erreur « <code translate="no">ImportError</code> » lors de la recherche de <code translate="no">IDEMPOTENCY_KEY_HEADER</code>, et le fait de passer <code translate="no">headers</code> à <code translate="no">bulk_import</code> entraîne un comportement indéfini : l’appel peut générer une erreur, ou l’importation peut être effectuée sans la clé.</p>
<p>Interrogez <code translate="no">/v2/vectordb/jobs/import/describe</code> avec l’ <code translate="no">jobId</code> renvoyé, comme d’habitude. Une nouvelle tentative qui arrive alors que la requête d’origine est encore en cours d’enregistrement attend que celle-ci soit terminée ; ainsi, une nouvelle tentative ne rencontre jamais une tâche à moitié enregistrée.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Choix d’une clé<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><strong>Une clé par requête logique.</strong> Nommez l’unité de travail, par exemple <code translate="no">orders-2026-09-07-batch-3</code>, ou générez un UUID et stockez-le avec l’élément de travail avant d’envoyer la requête. Incluez un numéro de tentative si vous deviez réexécuter le même travail.</li>
<li><strong>Effectuez la nouvelle tentative avec la même clé.</strong> La création d’une nouvelle clé lors d’une nouvelle tentative entraîne la duplication des données. Les exceptions sont répertoriées dans la section « <a href="#when-to-send-a-new-key">Quand envoyer une nouvelle clé</a> ».</li>
<li><strong>Ne réutilisez jamais une clé pour des fichiers différents.</strong> Milvus ne compare pas les deux requêtes. Vous récupérez l’ <code translate="no">jobId</code> d’origine, et les nouveaux fichiers ne sont pas importés.</li>
<li><strong>Veillez à ce qu’elle soit courte et imprimable.</strong> Caractères ASCII imprimables, 256 octets au maximum par défaut (<code translate="no">streaming.idempotency.maxKeyLength</code>). Tout autre format est rejeté avec l’erreur « <code translate="no">1100</code> ».</li>
<li><strong>N’y incluez pas d’informations confidentielles.</strong> La clé est stockée avec vos données.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Durée de conservation d’une clé<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>La clé est associée à la collection via son ID interne ; ainsi, renommer la collection n’interrompt pas une nouvelle tentative, à condition que celle-ci désigne la collection par son nouveau nom. Supprimer puis recréer la collection sous le même nom interrompt la tentative ; dans ce cas, lancer une nouvelle tâche est la solution appropriée.</p>
<p>Milvus conserve une clé d’importation pendant environ une journée. Considérez cette durée comme indicative et non garantie : un trafic DDL ou d’importation intense la réduit, tandis qu’un redémarrage du coordinateur la prolonge. Une nouvelle tentative après l’expiration de la clé lance une nouvelle tâche.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Quand envoyer une nouvelle clé<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Deux cas, et seulement deux :</p>
<ul>
<li><strong>La tâche d’origine a échoué ou a été interrompue.</strong> La commande `Describe` renvoie un message d’erreur ( <code translate="no">state: Failed</code> ) avec une raison. Une nouvelle tentative avec la même clé renvoie ce même message d’erreur ( <code translate="no">jobId</code> ) tant que la clé est encore mémorisée. Corrigez la cause, puis envoyez une nouvelle clé.</li>
<li><strong>La tâche d’origine a été supprimée.</strong> Milvus conserve les tâches terminées pendant une durée d’« <code translate="no">dataCoord.import.taskRetention</code> » (48 heures par défaut). Si ce délai expire alors que la clé est encore en mémoire, la nouvelle tentative renvoie l’ancienne durée d’« <code translate="no">jobId</code> », et la commande « describe » répond par l’erreur « <code translate="no">import job does not exist</code> » au lieu d’indiquer l’état de la tâche. Cette tâche a peut-être abouti. Vérifiez que les données sont bien manquantes avant d’envoyer une nouvelle clé.</li>
</ul>
<p>Une nouvelle tentative rejetée, par exemple parce que la limite des tâches d’importation est atteinte, ne fait pas partie de ces cas. Réessayez plus tard avec la même clé.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Quatre paramètres déterminent le comportement de cette page. Aucun d’entre eux ne doit être modifié pour que la clé fonctionne.</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Valeur par défaut</th><th>Fonction</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Durée de conservation d’une clé d’importation. Absent de l’ <code translate="no">milvus.yaml</code> par défaut ; ajoutez-le explicitement pour le modifier. Le même magasin rejette également les soumissions DDL en double ; ne réduisez donc pas cette valeur dans le seul but de raccourcir la fenêtre d’importation.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Nombre de clés et d’enregistrements DDL que le même magasin peut contenir avant que les plus anciens ne soient supprimés, quel que soit leur âge. C’est ce qui permet, en cas de trafic DDL ou d’importations intense, d’oublier une clé avant <code translate="no">maxLifetime</code>. Absent de la configuration par défaut <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 heures) depuis les versions 2.6.24 et 3.0.2 ; <code translate="no">10800</code> avant</td><td>Durée pendant laquelle une tâche d’importation terminée reste consultable. Conservez une valeur au moins deux fois supérieure à <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>Longueur maximale de la clé en octets. Une clé plus longue est rejetée avec l'erreur <code translate="no">1100</code>. <code translate="no">0</code> désactive cette limite. Absent de la configuration par défaut <code translate="no">milvus.yaml</code>.</td></tr>
</tbody>
</table>
<p>Les fichiers « <code translate="no">milvus.yaml</code> » fournis avant les versions 2.6.24 et 3.0.2 définissent explicitement la valeur « <code translate="no">taskRetention: 10800</code> », et une mise à niveau ne remplace pas la valeur présente dans votre fichier. Si vous avez effectué une mise à niveau à l’aide de ce fichier, augmentez la valeur de « <code translate="no">taskRetention</code> » à au moins le double de « <code translate="no">maxLifetime</code> ». La nouvelle valeur ne s’applique qu’aux tâches qui s’achèvent après la modification.</p>
