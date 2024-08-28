---
id: integrate_with_airbyte.md
summary: >-
  Airbyte est une infrastructure de mouvement de données open-source pour la
  construction de pipelines de données d'extraction et de chargement (EL). Elle
  est conçue pour être polyvalente, évolutive et facile à utiliser. Le catalogue
  de connecteurs d'Airbyte est livré "prêt à l'emploi" avec plus de 350
  connecteurs préconstruits. Ces connecteurs peuvent être utilisés pour
  commencer à répliquer des données d'une source vers une destination en
  quelques minutes seulement.
title: 'Airbyte : Infrastructure open-source de circulation des données'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte : Infrastructure de mouvement de données open-source<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte est une infrastructure de mouvement de données open-source pour la construction de pipelines de données d'extraction et de chargement (EL). Elle est conçue pour être polyvalente, évolutive et facile à utiliser. Le catalogue de connecteurs d'Airbyte est livré "prêt à l'emploi" avec plus de 350 connecteurs préconstruits. Ces connecteurs peuvent être utilisés pour commencer à répliquer des données d'une source vers une destination en quelques minutes seulement.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Principaux composants d'Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Catalogue de connecteurs</h3><ul>
<li><strong>Plus de 350 connecteurs préconstruits</strong>: Le catalogue de connecteurs d'Airbyte est livré " prêt à l'emploi " avec plus de 350 connecteurs préconstruits. Ces connecteurs peuvent être utilisés pour commencer à répliquer des données d'une source vers une destination en seulement quelques minutes.</li>
<li><strong>Constructeur de connecteurs sans code</strong>: Vous pouvez facilement étendre les fonctionnalités d'Airbyte pour prendre en charge vos cas d'utilisation personnalisés grâce à des outils <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">tels que le No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. La plateforme</h3><p>La plateforme d'Airbyte fournit tous les services horizontaux nécessaires pour configurer et mettre à l'échelle les opérations de déplacement de données, disponibles en mode <a href="https://airbyte.com/product/airbyte-cloud">géré dans le nuage</a> ou en <a href="https://airbyte.com/product/airbyte-enterprise">mode autogéré</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. L'interface utilisateur</h3><p>Airbyte dispose d'une interface utilisateur, de <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (bibliothèque Python), d'une <a href="https://docs.airbyte.com/api-documentation">API</a> et d'un <a href="https://docs.airbyte.com/terraform-documentation">fournisseur Terraform</a> pour s'intégrer à votre outil préféré et à votre approche de la gestion de l'infrastructure.</p>
<p>Grâce à Airbyte, les utilisateurs peuvent intégrer des sources de données dans le cluster Milvus pour la recherche de similarités.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Avant de commencer<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous aurez besoin de</p>
<ul>
<li>un compte Zendesk (ou une autre source de données à partir de laquelle vous souhaitez synchroniser les données)</li>
<li>Compte Airbyte ou instance locale</li>
<li>Clé API OpenAI</li>
<li>Cluster Milvus</li>
<li>Python 3.10 installé localement</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Configuration du cluster Milvus<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Si vous avez déjà déployé un cluster K8s pour la production, vous pouvez sauter cette étape et procéder directement au <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">déploiement de Milvus Operator</a>. Sinon, vous pouvez suivre <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">les étapes de</a> déploiement d'un cluster Milvus avec Milvus Operator.</p>
<p>Les entités individuelles (dans notre cas, les tickets d'assistance et les articles de la base de connaissances) sont stockées dans une "collection" - une fois que votre cluster est configuré, vous devez créer une collection. Choisissez un nom approprié et définissez la dimension à 1536 pour correspondre à la dimensionnalité vectorielle générée par le service d'intégration OpenAI.</p>
<p>Après la création, enregistrez le point de terminaison et les informations d'<a href="https://milvus.io/docs/authenticate.md?tab=docker">authentification</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Configurer la connexion dans Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Notre base de données est prête, déplaçons quelques données ! Pour ce faire, nous devons configurer une connexion dans Airbyte. Soit vous vous inscrivez pour un compte Airbyte cloud sur <a href="https://cloud.airbyte.com">cloud.airbyte.com</a>, soit vous démarrez une instance locale comme décrit <a href="https://docs.airbyte.com/using-airbyte/getting-started/">dans la documentation</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Configurer la source</h3><p>Une fois que votre instance fonctionne, nous devons configurer la connexion - cliquez sur "Nouvelle connexion" et choisissez le connecteur "Zendesk Support" comme source. Après avoir cliqué sur le bouton "Test and Save", Airbyte vérifiera si la connexion peut être établie.</p>
<p>Sur le nuage Airbyte, vous pouvez facilement vous authentifier en cliquant sur le bouton Authentifier. Si vous utilisez une instance locale d'Airbyte, suivez les instructions décrites sur la page de <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">documentation</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Configurer la destination</h3><p>Si tout fonctionne correctement, l'étape suivante consiste à configurer la destination vers laquelle déplacer les données. Pour ce faire, choisissez le connecteur "Milvus".</p>
<p>Le connecteur Milvus a trois fonctions :</p>
<ul>
<li><strong>Fractionnement et formatage</strong> - Il divise les enregistrements Zendesk en texte et en métadonnées. Si le texte est plus grand que la taille de morceau spécifiée, les enregistrements sont divisés en plusieurs parties qui sont chargées individuellement dans la collection. Le fractionnement du texte (ou chunking) peut, par exemple, se produire dans le cas de tickets d'assistance ou d'articles de connaissance volumineux. En divisant le texte, vous pouvez vous assurer que les recherches donnent toujours des résultats utiles.</li>
</ul>
<p>Prenons une taille de chunk de 1 000 tokens et des champs de texte tels que le corps, le titre, la description et le sujet, car ils seront présents dans les données que nous recevrons de Zendesk.</p>
<ul>
<li><strong>Incorporation</strong> - L'utilisation de modèles d'apprentissage automatique transforme les morceaux de texte produits par la partie traitement en incrustations vectorielles que vous pouvez ensuite rechercher pour la similarité sémantique. Pour créer les encastrements, vous devez fournir la clé de l'API OpenAI. Airbyte enverra chaque morceau à OpenAI et ajoutera le vecteur résultant aux entités chargées dans votre cluster Milvus.</li>
<li><strong>Indexation</strong> - Une fois que vous avez vectorisé les morceaux, vous pouvez les charger dans la base de données. Pour ce faire, insérez les informations que vous avez obtenues lors de la configuration de votre cluster et de votre collection dans le cluster Milvus. <div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> En cliquant sur "Test and save", vous vérifierez que tout est en ordre (informations d'identification valides, collection existante et ayant la même dimension vectorielle que l'intégration configurée, etc.)</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Configurer le flux de synchronisation des flux</h3><p>La dernière étape avant que les données ne soient prêtes à circuler consiste à sélectionner les "flux" à synchroniser. Un flux est une collection d'enregistrements dans la source. Comme Zendesk prend en charge un grand nombre de flux qui ne sont pas pertinents pour notre cas d'utilisation, sélectionnons uniquement les "tickets" et les "articles" et désactivons tous les autres pour économiser de la bande passante et nous assurer que seules les informations pertinentes apparaîtront dans les recherches :<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> Vous pouvez sélectionner les champs à extraire de la source en cliquant sur le nom du flux. Le mode de synchronisation "Incrémental | Append + Deduped" signifie que les exécutions de connexion ultérieures maintiennent la synchronisation entre Zendesk et Milvus tout en transférant un minimum de données (uniquement les articles et les tickets qui ont changé depuis la dernière exécution).</p>
<p>Dès que la connexion est établie, Airbyte commence à synchroniser les données. Cela peut prendre quelques minutes pour apparaître dans votre collection Milvus.</p>
<p>Si vous sélectionnez une fréquence de réplication, Airbyte s'exécutera régulièrement pour tenir votre collection Milvus à jour des modifications apportées aux articles Zendesk et des problèmes nouvellement créés.</p>
<h3 id="Check-flow" class="common-anchor-header">Flux de vérification</h3><p>Vous pouvez vérifier dans l'interface utilisateur du cluster Milvus comment les données sont structurées dans la collection en naviguant vers l'aire de jeu et en exécutant une requête "Query Data" avec un filtre défini sur "_ab_stream == \"tickets"".<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> Comme vous pouvez le voir dans la vue Résultat, chaque enregistrement provenant de Zendesk est stocké en tant qu'entité distincte dans Milvus avec toutes les métadonnées spécifiées. Le bloc de texte sur lequel l'incorporation est basée est affiché en tant que propriété "text" - il s'agit du texte qui a été incorporé à l'aide d'OpenAI et sur lequel nous allons effectuer une recherche.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Construire l'application Streamlit pour interroger la collection<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Nos données sont prêtes - nous devons maintenant créer l'application qui les utilisera. Dans ce cas, l'application sera un simple formulaire d'assistance permettant aux utilisateurs de soumettre des cas d'assistance. Lorsque l'utilisateur clique sur "Envoyer", nous faisons deux choses :</p>
<ul>
<li>rechercher des tickets similaires soumis par des utilisateurs de la même organisation</li>
<li>Rechercher des articles basés sur la connaissance qui pourraient être pertinents pour l'utilisateur.</li>
</ul>
<p>Dans les deux cas, nous exploiterons la recherche sémantique à l'aide d'encastrements OpenAI. Pour ce faire, la description du problème saisi par l'utilisateur est également intégrée et utilisée pour extraire des entités similaires du cluster Milvus. S'il y a des résultats pertinents, ils sont affichés sous le formulaire.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Configuration de l'environnement de l'interface utilisateur</h3><p>Vous aurez besoin d'une installation locale de Python car nous utiliserons Streamlit pour mettre en œuvre l'application.</p>
<p>Commencez par installer localement Streamlit, la bibliothèque client Milvus et la bibliothèque client OpenAI :</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Pour rendre un formulaire de support de base, créez un fichier python <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour exécuter votre application, utilisez Streamlit run :</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Cela rendra un formulaire de base :<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>Le code de cet exemple est également disponible sur <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Mise en place d'un service de requête backend</h3><p>Ensuite, vérifions s'il existe des tickets ouverts qui pourraient être pertinents. Pour ce faire, nous intégrons le texte que l'utilisateur a saisi à l'aide d'OpenAI, puis nous effectuons une recherche de similarité dans notre collection, en filtrant les tickets encore ouverts. S'il y en a un avec une très faible distance entre le ticket fourni et le ticket existant, nous le faisons savoir à l'utilisateur et ne le soumettons pas :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>Plusieurs choses se produisent ici :</p>
<ul>
<li>La connexion au cluster Milvus est établie.</li>
<li>Le service OpenAI est utilisé pour générer une intégration de la description saisie par l'utilisateur.</li>
<li>Une recherche de similarité est effectuée, en filtrant les résultats par le statut du ticket et l'identifiant de l'organisation (car seuls les tickets ouverts de la même organisation sont pertinents).</li>
<li>S'il y a des résultats et que la distance entre les vecteurs d'intégration du ticket existant et du texte nouvellement saisi est inférieure à un certain seuil, ce fait est signalé.</li>
</ul>
<p>Pour exécuter la nouvelle application, vous devez d'abord définir les variables d'environnement pour OpenAI et Milvus :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque vous essayez de soumettre un ticket qui existe déjà, voici à quoi ressemblera le résultat :<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> Le code de cet exemple se trouve également sur <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Afficher des informations plus pertinentes</h3><p>Comme vous pouvez le voir dans la sortie de débogage verte cachée dans la version finale, deux tickets correspondent à notre recherche (dans le statut nouveau, de l'organisation actuelle, et proche du vecteur d'intégration). Cependant, le premier (pertinent) est mieux classé que le second (non pertinent dans cette situation), ce qui se traduit par une valeur de distance plus faible. Cette relation est capturée dans les vecteurs d'intégration sans faire correspondre directement les mots, comme dans une recherche en texte intégral classique.</p>
<p>Pour conclure, affichons des informations utiles après la soumission du ticket afin de donner à l'utilisateur autant d'informations pertinentes que possible.</p>
<p>Pour ce faire, nous allons effectuer une seconde recherche après l'envoi du ticket pour récupérer les articles de la base de connaissances les plus pertinents :</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>S'il n'y a pas de ticket d'assistance ouvert avec un score de similarité élevé, le nouveau ticket est soumis et les articles de la base de connaissances pertinents sont affichés ci-dessous :<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> Le code de cet exemple peut également être trouvé sur <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
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
    </button></h2><p>Bien que l'interface présentée ici ne soit pas un formulaire d'assistance réel mais un exemple pour illustrer le cas d'utilisation, la combinaison d'Airbyte et de Milvus est très puissante - elle permet de charger facilement du texte à partir d'une grande variété de sources (des bases de données comme Postgres aux API comme Zendesk ou GitHub en passant par des sources entièrement personnalisées construites à l'aide du SDK d'Airbyte ou du constructeur de connecteurs visuels) et de l'indexer sous forme intégrée dans Milvus, un moteur de recherche vectoriel puissant capable de s'adapter à d'énormes quantités de données.</p>
<p>Airbyte et Milvus sont des logiciels libres et entièrement gratuits à utiliser sur votre infrastructure, avec des offres en nuage pour décharger les opérations si vous le souhaitez.</p>
<p>Au-delà du cas d'utilisation classique de la recherche sémantique illustré dans cet article, la configuration générale peut également être utilisée pour construire un robot de conversation répondant à des questions en utilisant la méthode RAG (Retrieval Augmented Generation), des systèmes de recommandation, ou aider à rendre la publicité plus pertinente et plus efficace.</p>
