---
id: authenticate.md
summary: Scopri come gestire l'autenticazione degli utenti in Milvus.
title: Autenticazione dell'accesso utente
---
<h1 id="Authenticate-User-Access" class="common-anchor-header">Autenticazione dell'accesso utente<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida spiega come gestire l'autenticazione degli utenti in Milvus, incluse le operazioni di abilitazione dell'autenticazione, connessione come utente e modifica delle credenziali utente.</p>
<div class="alert note">
<ul>
<li><p>TLS e l'autenticazione degli utenti sono due approcci di sicurezza distinti. Se nel sistema Milvus sono stati abilitati sia l'autenticazione degli utenti che il protocollo TLS, è necessario fornire un nome utente, una password e i percorsi dei file dei certificati. Per informazioni su come abilitare il protocollo TLS, consultare la sezione <a href="/docs/it/tls.md">Crittografia in transito</a>.</p></li>
<li><p>I frammenti di codice presenti in questa pagina utilizzano <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">il</a> nuovo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) per interagire con Milvus. Nei futuri aggiornamenti verranno rilasciati nuovi SDK MilvusClient per altri linguaggi.</p></li>
</ul>
</div>
<h2 id="Enable-user-authentication" class="common-anchor-header">Abilitare l’autenticazione utente<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
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
    </button></h2><div class="filter">
 <a href="#docker">Docker Compose</a>
 <a href="#helm"> Helm</a>
 <a href="#operator"> Milvus Operator</a>
</div>
<div class="filter-docker">
<p>Per abilitare l’autenticazione utente per il proprio server Milvus, impostare `common.security.authorizationEnabled` su `true` nel file di configurazione di Milvus <code translate="no">milvus.yaml</code>. Per ulteriori informazioni sulle configurazioni, consultare <a href="https://milvus.io/docs/configure-docker.md?tab=component">Configurare Milvus con Docker Compose</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
<span class="hljs-string">...</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-helm">
<p>Per abilitare l’autenticazione degli utenti sul proprio server Milvus, impostare `authorizationEnabled` su `true` nel file di configurazione di Milvus <code translate="no">values.yaml</code>. Per ulteriori informazioni sulle configurazioni, consultare la guida <a href="https://milvus.io/docs/configure-helm.md?tab=component">Configurare Milvus con Helm Charts</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        authorizationEnabled: true
</span><span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-operator">
<p>Per abilitare l’autenticazione, impostare ` <code translate="no">spec.config.common.security.authorizationEnabled</code> ` su ` <code translate="no">true</code> ` nel CRD ` <code translate="no">Milvus</code> `. Per ulteriori informazioni sul CRD di Milvus, consultare <a href="https://milvus.io/docs/configure_operator.md?tab=component">Configurare Milvus con Milvus Operator</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Connect-to-Milvus-with-authentication" class="common-anchor-header">Connettersi a Milvus con l’autenticazione<button data-href="#Connect-to-Milvus-with-authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver abilitato l’autenticazione, è necessario connettersi a Milvus utilizzando un nome utente e una password. Per impostazione predefinita, all’avvio di Milvus viene creato l’utente <code translate="no">root</code> con la password <code translate="no">Milvus</code>. Di seguito è riportato un esempio di come connettersi a Milvus con l’autenticazione abilitata utilizzando l’utente predefinito <code translate="no">root</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use default `root` user to connect to Milvus</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
) 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Se non si fornisce un token valido durante la connessione a Milvus con l’autenticazione abilitata, verrà visualizzato un errore gRPC.
</div>
<h2 id="Create-a-new-user" class="common-anchor-header">Creare un nuovo utente<button data-href="#Create-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta effettuato l'accesso come <code translate="no">root</code>, creare un utente con <code translate="no">create_user()</code>. Scegliere una password di 6–72 byte UTF-8, a meno che la propria distribuzione non utilizzi <a href="/docs/it/authenticate.md#Password-requirements">limiti</a> personalizzati <a href="/docs/it/authenticate.md#Password-requirements">per la lunghezza della password</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># create a user</span>
client.create_user(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
)

<span class="hljs-comment"># verify the user has been created</span>

client.describe_user(<span class="hljs-string">&quot;user_1&quot;</span>)

<span class="hljs-comment"># output</span>
<span class="hljs-comment"># {&#x27;user_name&#x27;: &#x27;user_1&#x27;, &#x27;roles&#x27;: ()}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulla creazione di utenti, consultare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md">create_user()</a>.</p>
<h2 id="Connect-to-Milvus-with-a-new-user" class="common-anchor-header">Connettersi a Milvus con un nuovo utente<button data-href="#Connect-to-Milvus-with-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Effettua la connessione utilizzando le credenziali dell’utente appena creato:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># connect to milvus with the newly created user</span>

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;user_1:P@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Update-user-password" class="common-anchor-header">Aggiornare la password dell’utente<button data-href="#Update-user-password" class="anchor-icon" translate="no">
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
    </button></h2><p>Per modificare la password di un utente, fornire la password attuale e una nuova password che soddisfi gli stessi <a href="/docs/it/authenticate.md#Password-requirements">requisiti</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># update password</span>

client.update_password(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
    new_password=<span class="hljs-string">&quot;P@ssw0rd123&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sull'aggiornamento delle password degli utenti, consultare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md">update_password()</a>.</p>
<p>Se si dimentica la vecchia password, Milvus mette a disposizione un'opzione di configurazione che consente di designare determinati utenti come superutenti. Ciò elimina la necessità di inserire la vecchia password quando si reimposta la password.</p>
<p>Per impostazione predefinita, il campo ` <code translate="no">common.security.superUsers</code> ` nel file di configurazione di Milvus è vuoto, il che significa che tutti gli utenti devono fornire la vecchia password al momento della reimpostazione. Tuttavia, è possibile designare utenti specifici come superutenti che non devono fornire la vecchia password. Nel frammento di codice riportato di seguito, <code translate="no">root</code> e <code translate="no">foo</code> sono designati come superutenti.</p>
<p>È necessario aggiungere la voce di configurazione riportata di seguito nel file di configurazione di Milvus che regola il funzionamento dell’istanza di Milvus.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
    <span class="hljs-attr">security:</span>
        <span class="hljs-attr">superUsers:</span> <span class="hljs-string">root,</span> <span class="hljs-string">foo</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-user" class="common-anchor-header">Eliminare un utente<button data-href="#Drop-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Per eliminare un utente, utilizzare il metodo ` <code translate="no">drop_user()</code> `.</p>
<pre><code translate="no" class="language-python">client.drop_user(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Per eliminare un utente, non è possibile essere l’utente stesso. In caso contrario, verrà generato un errore.
</div>
<h2 id="List-all-users" class="common-anchor-header">Elencare tutti gli utenti<button data-href="#List-all-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenca tutti gli utenti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># list all users</span>

client.list_users()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">Limitazioni<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Username-requirements" class="common-anchor-header">Requisiti relativi al nome utente<button data-href="#Username-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>I nomi utente non devono essere vuoti né superare i 32 caratteri. Devono iniziare con una lettera e contenere solo lettere, numeri o trattini bassi.</p>
<h3 id="Password-requirements" class="common-anchor-header">Requisiti per le password<button data-href="#Password-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Per impostazione predefinita, le password devono avere una lunghezza compresa tra 6 e 72 byte UTF-8. I caratteri ASCII occupano ciascuno un byte; i caratteri multibyte ne occupano più di uno. Milvus non richiede una combinazione specifica di lettere maiuscole, lettere minuscole, numeri o caratteri speciali.</p>
<p>Per modificare i limiti di lunghezza, configurare <code translate="no">proxy.minPasswordLength</code> e <code translate="no">proxy.maxPasswordLength</code>. Il valore massimo non può superare i 72 byte. Un valore di <code translate="no">proxy.maxPasswordLength</code> pari a zero o inferiore, oppure superiore a 72, viene considerato pari a 72. Per le istruzioni di configurazione, consultare <a href="/docs/it/dynamic_config.md">Configurare Milvus al volo</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Potresti anche voler imparare come:
<ul>
<li><a href="/docs/it/scaleout.md">Scalare un cluster Milvus</a></li>
</ul></li>
<li>Se sei pronto a distribuire il tuo cluster su cloud:
<ul>
<li>Scopri come <a href="/docs/it/eks.md">distribuire Milvus su Amazon EKS con Terraform</a></li>
<li>Scopri come <a href="/docs/it/gcp.md">distribuire un cluster Milvus su GCP con Kubernetes</a></li>
<li>Scopri come <a href="/docs/it/azure.md">distribuire Milvus su Microsoft Azure con Kubernetes</a></li>
</ul></li>
</ul>
