---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: >-
  Découvrez comment mettre à jour Milvus en mode autonome à l'aide d'un Helm
  Chart.
title: Mise à niveau de Milvus Standalone à l'aide d'un Helm Chart
---
<div class="tab-wrapper"><a href="/docs/fr/upgrade_milvus_standalone-operator.md" class=''>Milvus,</a><a href="/docs/fr/upgrade_milvus_standalone-docker.md" class=''>Operator</a>, Helm, Docker<a href="/docs/fr/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Mise à niveau de Milvus Standalone à l'aide d'un Helm Chart<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide décrit comment mettre à niveau votre déploiement autonome de Milvus 2.6.x vers la version v3.0-beta à l'aide de Helm.</p>
<div class="alert note">
<p>Cette procédure a été validée pour une mise à niveau de Milvus 2.6.20 vers Milvus v3.0-beta avec le Helm Chart Milvus 5.0.22. Si vous utilisez une autre version de Milvus 2.6.x ou une autre version du Helm Chart, testez d’abord la mise à niveau dans un environnement hors production.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Helm 3.14.0 ou version ultérieure</li>
<li>Un déploiement Milvus 2.6.x existant géré par Helm</li>
<li>Les valeurs Helm utilisées pour le déploiement existant</li>
<li>Une sauvegarde récente des métadonnées et des données persistantes de Milvus</li>
</ul>
<p><strong>Limitations relatives à la file d’attente de messages</strong>: lors de la mise à niveau vers Milvus v3.0-beta, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</p>
<div class="alert warning">
<p>Ne modifiez pas et ne rétrogradez pas le Helm Chart dans le cadre de cette procédure. Conservez la version du Chart déjà installée pour votre version Helm. La configuration de référence testée a conservé le Helm Chart 5.0.22 et n’a modifié que le tag de l’image Milvus pour le remplacer par <code translate="no">v3.0-beta</code>.</p>
<p>Cette procédure ne valide pas de retour à une version antérieure ni de restauration consistant à ramener l’image Milvus à la version 2.6.x. Une fois que la version v3.0-beta a écrit des données, une restauration portant uniquement sur l’image peut ne pas parvenir à lire l’état mis à jour. Si la mise à niveau échoue, arrêtez les écritures et utilisez un plan de reprise qui restaure les métadonnées antérieures à la mise à niveau ainsi que les sauvegardes des données persistantes. Validez d’abord le plan de reprise dans un environnement hors production.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Processus de mise à niveau<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Update-the-Helm-repository" class="common-anchor-header">Étape 1 : Mettre à jour le référentiel Helm<button data-href="#Step-1-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Ajoutez ou mettez à jour le référentiel Helm de Milvus :</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Le référentiel Helm Charts de Milvus à l’adresse <code translate="no">https://milvus-io.github.io/milvus-helm/</code> a été archivé. Utilisez le nouveau référentiel <code translate="no">https://zilliztech.github.io/milvus-helm/</code> pour les versions 4.0.31 et ultérieures des charts.
</div>
<h3 id="Step-2-Upgrade-Milvus" class="common-anchor-header">Étape 2 : Mise à niveau de Milvus<button data-href="#Step-2-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Vérifiez la version du chart installée pour votre version Helm :</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Dans la colonne « <code translate="no">CHART</code> », supprimez le préfixe « <code translate="no">milvus-</code> » de la valeur et utilisez la version restante sous la forme « <code translate="no">&lt;current-chart-version&gt;</code> ». Exécutez ensuite la commande de mise à niveau :</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0-beta&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 20m
<button class="copy-code-btn"></button></code></pre>
<p>L’option « <code translate="no">--reset-then-reuse-values</code> » conserve les valeurs de la version précédente tout en appliquant le remplacement explicite de l’image par rapport aux valeurs par défaut du Chart sélectionné.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Vérifiez la mise à niveau<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Vérifiez la révision Helm, l’état des pods et les images de conteneurs :</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vérifiez que toutes les charges de travail requises sont prêtes, que Milvus utilise <code translate="no">v3.0-beta</code> et que vos collections existantes restent consultables et recherchables. Effectuez ces vérifications avant d’activer toute fonctionnalité spécifique à la version v3.0-beta.</p>
<div class="alert note">
<p>La mise à niveau vers Milvus 3.0 n’active pas Storage V3. Après avoir vérifié la mise à niveau, consultez la documentation relative à <a href="/docs/fr/storage-v3.md">Storage V3</a> avant d’activer les fonctionnalités qui en dépendent. Une fois que Milvus a écrit des données Storage V3, la rétrogradation vers une version antérieure de Milvus incapable de lire Storage V3 n’est pas prise en charge.</p>
</div>
