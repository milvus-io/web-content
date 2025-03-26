---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  Découvrez comment configurer Horizontal Pod Autoscaling (HPA) pour faire
  évoluer dynamiquement un cluster Milvus.
title: Configurer la mise à l'échelle horizontale des pods (HPA) pour Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Configurer la mise à l'échelle horizontale des pods (HPA) pour Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontal Pod Autoscaling (HPA) est une fonctionnalité de Kubernetes qui ajuste automatiquement le nombre de Pods dans un déploiement en fonction de l'utilisation des ressources, telles que le CPU ou la mémoire. Dans Milvus, HPA peut être appliqué à des composants sans état comme <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code>, et <code translate="no">indexNode</code> pour mettre à l'échelle dynamiquement le cluster en réponse aux changements de charge de travail.</p>
<p>Ce guide explique comment configurer le HPA pour les composants Milvus à l'aide de l'opérateur Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Un cluster Milvus en cours d'exécution déployé avec Milvus Operator.</li>
<li>Accès à <code translate="no">kubectl</code> pour gérer les ressources Kubernetes.</li>
<li>Connaissance de l'architecture Milvus et de l'HPA Kubernetes.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Configurer HPA avec Milvus Operator<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour activer l'HPA dans un cluster Milvus géré par Milvus Operator, procédez comme suit :</p>
<ol>
<li><p><strong>Définir les répliques sur -1</strong>:</p>
<p>Dans la ressource personnalisée (CR) Milvus, définissez le champ <code translate="no">replicas</code> sur <code translate="no">-1</code> pour le composant que vous voulez mettre à l'échelle avec HPA. Cela permet de déléguer le contrôle de la mise à l'échelle à l'APH plutôt qu'à l'opérateur. Vous pouvez modifier la CR directement ou utiliser la commande <code translate="no">kubectl patch</code> suivante pour passer rapidement au contrôle HPA :</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Remplacez <code translate="no">&lt;your-release-name&gt;</code> par le nom de votre cluster Milvus.</p>
<p>Pour vérifier que la modification a été appliquée, exécutez la commande :</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>La sortie attendue devrait être <code translate="no">-1</code>, confirmant que le composant <code translate="no">proxy</code> est désormais sous le contrôle de l'APH.</p>
<p>Vous pouvez également le définir dans le CR YAML :</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: &lt;your-release-name&gt;
spec:
  mode: cluster
  components:
    proxy:
      replicas: -1
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Define an HPA Resource (Définir une ressource HPA</strong>) :</p>
<p>Créez une ressource HPA pour cibler le déploiement du composant souhaité. Voici un exemple pour le composant <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-release-milvus-proxy-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-release-milvus-proxy
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: cpu
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: memory
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 60
<button class="copy-code-btn"></button></code></pre>
<p>Remplacez <code translate="no">my-release</code> dans <code translate="no">metadata.name</code> et <code translate="no">spec.scaleTargetRef.name</code> par votre nom de cluster Milvus actuel (par exemple, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> et <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>Appliquer la configuration HPA</strong>:</p>
<p>Déployer la ressource HPA à l'aide de la commande suivante :</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Pour vérifier que l'HPA a été créé avec succès, exécuter :</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>Vous devriez obtenir un résultat similaire à celui-ci :</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Les champs <code translate="no">NAME</code> et <code translate="no">REFERENCE</code> reflètent le nom de votre cluster (par exemple, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> et <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: Spécifie le déploiement à mettre à l'échelle (par exemple, <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> et <code translate="no">maxReplicas</code>: Définit la plage de mise à l'échelle (2 à 10 Pods dans cet exemple).</li>
<li><code translate="no">metrics</code>: Configure la mise à l'échelle en fonction de l'utilisation du processeur et de la mémoire, en visant une utilisation moyenne de 60 %.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA permet à Milvus de s'adapter efficacement à des charges de travail variables. En utilisant la commande <code translate="no">kubectl patch</code>, vous pouvez rapidement basculer un composant vers le contrôle HPA sans modifier manuellement le CR complet. Pour plus de détails, consultez la <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">documentation HPA de Kubernetes</a>.</p>
