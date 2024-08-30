---
id: integrate_with_airbyte.md
summary: >-
  O Airbyte é uma infraestrutura de movimentação de dados de código aberto para
  a criação de pipelines de dados de extração e carregamento (EL). Foi concebida
  para ser versátil, escalável e fácil de utilizar. O catálogo de conectores da
  Airbyte é fornecido "pronto a usar" com mais de 350 conectores
  pré-construídos. Estes conectores podem ser utilizados para começar a replicar
  dados de uma fonte para um destino em apenas alguns minutos.
title: 'Airbyte: Infraestrutura de movimentação de dados de código aberto'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Infraestrutura de movimentação de dados de código aberto<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>A Airbyte é uma infraestrutura de movimentação de dados de código aberto para a criação de pipelines de dados de extração e carregamento (EL). Foi concebida para ser versátil, escalável e fácil de utilizar. O catálogo de conectores da Airbyte vem "pronto para uso" com mais de 350 conectores pré-construídos. Estes conectores podem ser utilizados para começar a replicar dados de uma fonte para um destino em apenas alguns minutos.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Principais componentes do Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Catálogo de conectores</h3><ul>
<li><strong>Mais de 350 conectores pré-construídos</strong>: O catálogo de conectores do Airbyte vem "out-of-the-box" com mais de 350 conectores pré-construídos. Estes conectores podem ser utilizados para começar a replicar dados de uma fonte para um destino em apenas alguns minutos.</li>
<li><strong>Criador de conectores sem código</strong>: Pode facilmente alargar a funcionalidade da Airbyte para suportar os seus casos de utilização personalizados através de ferramentas <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">como o No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. A plataforma</h3><p>A plataforma da Airbyte fornece todos os serviços horizontais necessários para configurar e escalar operações de movimentação de dados, disponíveis como <a href="https://airbyte.com/product/airbyte-cloud">geridos na nuvem</a> ou <a href="https://airbyte.com/product/airbyte-enterprise">autogeridos</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. A interface de utilizador</h3><p>A Airbyte possui uma interface de utilizador, <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (biblioteca Python), <a href="https://docs.airbyte.com/api-documentation">API</a> e <a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a> para integrar com as suas ferramentas preferidas e abordagem à gestão de infra-estruturas.</p>
<p>Com a capacidade da Airbyte, os utilizadores podem integrar fontes de dados no cluster Milvus para pesquisa de semelhanças.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Antes de começar<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Você precisará de:</p>
<ul>
<li>Conta do Zendesk (ou outra fonte de dados da qual deseja sincronizar os dados)</li>
<li>Conta do Airbyte ou instância local</li>
<li>Chave da API do OpenAI</li>
<li>Cluster do Milvus</li>
<li>Python 3.10 instalado localmente</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Configurar o cluster do Milvus<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Se já tiver implementado um cluster K8s para produção, pode saltar este passo e avançar diretamente para a <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">implementação do Milvus Operator</a>. Caso contrário, pode seguir <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">os passos</a> para implementar um cluster Milvus com o Milvus Operator.</p>
<p>As entidades individuais (no nosso caso, bilhetes de suporte e artigos da base de conhecimentos) são armazenadas numa "coleção" - depois de o seu cluster estar configurado, é necessário criar uma coleção. Escolha um nome adequado e defina a Dimensão para 1536 para corresponder à dimensionalidade do vetor gerado pelo serviço de incorporação do OpenAI.</p>
<p>Após a criação, registe o ponto final e as informações <a href="https://milvus.io/docs/authenticate.md?tab=docker">de autenticação</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Configurar a ligação no Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>A nossa base de dados está pronta, vamos transferir alguns dados! Para o fazer, precisamos de configurar uma ligação na Airbyte. Inscreva-se numa conta Airbyte na nuvem em <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> ou inicie uma instância local conforme descrito <a href="https://docs.airbyte.com/using-airbyte/getting-started/">na documentação</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Configurar a fonte</h3><p>Quando sua instância estiver em execução, precisamos configurar a conexão - clique em "Nova conexão" e escolha o conetor "Zendesk Support" como a origem. Depois de clicar no botão "Testar e salvar", o Airbyte verificará se a conexão pode ser estabelecida.</p>
<p>Na nuvem da Airbyte, pode autenticar-se facilmente clicando no botão Autenticar. Quando utilizar uma instância local da Airbyte, siga as instruções descritas na página <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">de documentação</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Configurar o destino</h3><p>Se tudo estiver a funcionar corretamente, o próximo passo é configurar o destino para onde mover os dados. Aqui, escolha o conetor "Milvus".</p>
<p>O conetor Milvus faz três coisas:</p>
<ul>
<li>Separação<strong>e formatação</strong> - Divide os registos do Zendesk em texto e metadados. Se o texto for maior do que o tamanho do bloco especificado, os registos são divididos em várias partes que são carregadas individualmente na coleção. A divisão do texto (ou chunking) pode ocorrer, por exemplo, no caso de tickets de suporte ou artigos de conhecimento grandes. Ao dividir o texto, pode garantir que as pesquisas produzem sempre resultados úteis.</li>
</ul>
<p>Vamos usar um tamanho de bloco de 1000 tokens e campos de texto de corpo, título, descrição e assunto, pois eles estarão presentes nos dados que receberemos do Zendesk.</p>
<ul>
<li><strong>Incorporação</strong> - O uso de modelos de aprendizado de máquina transforma os blocos de texto produzidos pela parte de processamento em incorporações de vetor que podem ser pesquisadas para similaridade semântica. Para criar as incorporações, é necessário fornecer a chave da API do OpenAI. O Airbyte envia cada pedaço para o OpenAI e adiciona o vetor resultante às entidades carregadas no seu cluster Milvus.</li>
<li><strong>Indexação</strong> - Depois de ter vectorizado os chunks, pode carregá-los na base de dados. Para o fazer, insira as informações que obteve aquando da configuração do seu cluster e da sua coleção no cluster Milvus. <div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> Clicando em "Testar e guardar", verificará se tudo está corretamente alinhado (credenciais válidas, a coleção existe e tem a mesma dimensionalidade vetorial que o embedding configurado, etc.).</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Configurar o fluxo de sincronização de fluxo</h3><p>O último passo antes de os dados estarem prontos para fluir é selecionar quais os "fluxos" a sincronizar. Um fluxo é uma coleção de registros na origem. Como o Zendesk suporta um grande número de fluxos que não são relevantes para o nosso caso de uso, vamos selecionar apenas "tickets" e "artigos" e desativar todos os outros para economizar largura de banda e garantir que apenas as informações relevantes apareçam nas pesquisas:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> É possível selecionar os campos a extrair da fonte clicando no nome do fluxo. O modo de sincronização "Incremental | Append + Deduped" significa que as execuções de conexão subsequentes mantêm o Zendesk e o Milvus em sincronia enquanto transferem o mínimo de dados (apenas os artigos e tickets que foram alterados desde a última execução).</p>
<p>Assim que a conexão for configurada, o Airbyte começará a sincronizar os dados. Pode demorar alguns minutos a aparecer na sua coleção Milvus.</p>
<p>Se você selecionar uma frequência de replicação, o Airbyte será executado regularmente para manter sua coleção do Milvus atualizada com as alterações nos artigos do Zendesk e nos problemas recém-criados.</p>
<h3 id="Check-flow" class="common-anchor-header">Fluxo de verificação</h3><p>Você pode verificar na interface do usuário do cluster do Milvus como os dados estão estruturados na coleção navegando até o playground e executando uma consulta "Query Data" com um filtro definido como "_ab_stream == \"tickets\"".<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> Como você pode ver na exibição Resultado, cada registro proveniente do Zendesk é armazenado como entidades separadas no Milvus com todos os metadados especificados. O trecho de texto no qual a incorporação se baseia é mostrado como a propriedade "text" - este é o texto que foi incorporado usando o OpenAI e será o que pesquisaremos.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Criar a aplicação Streamlit para consultar a coleção<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Os nossos dados estão prontos - agora precisamos de construir a aplicação para os utilizar. Neste caso, a aplicação será um simples formulário de apoio para os utilizadores submeterem casos de apoio. Quando o utilizador clicar em submeter, faremos duas coisas:</p>
<ul>
<li>Procurar bilhetes semelhantes submetidos por utilizadores da mesma organização</li>
<li>Procurar artigos baseados no conhecimento que possam ser relevantes para o utilizador</li>
</ul>
<p>Em ambos os casos, utilizaremos a pesquisa semântica usando os embeddings do OpenAI. Para tal, a descrição do problema que o utilizador introduziu também é incorporada e utilizada para obter entidades semelhantes do agrupamento Milvus. Se existirem resultados relevantes, estes são apresentados por baixo do formulário.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Configurar o ambiente da IU</h3><p>É necessária uma instalação local do Python, uma vez que vamos utilizar o Streamlit para implementar a aplicação.</p>
<p>Primeiro, instale localmente o Streamlit, a biblioteca de clientes Milvus e a biblioteca de clientes OpenAI:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Para apresentar um formulário de suporte básico, crie um ficheiro python <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para executar a sua aplicação, utilize o Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá renderizar um formulário básico:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>O código para este exemplo também pode ser encontrado no <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Configurar o serviço de consulta de backend</h3><p>Em seguida, vamos verificar se há tíquetes abertos existentes que possam ser relevantes. Para isso, incorporamos o texto que o usuário digitou usando o OpenAI e, em seguida, fizemos uma pesquisa de similaridade em nossa coleção, filtrando os tíquetes ainda abertos. Se houver um com uma distância muito baixa entre o tíquete fornecido e o tíquete existente, informamos o usuário e não enviamos:</p>
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
<p>Estão a acontecer várias coisas aqui:</p>
<ul>
<li>A ligação ao cluster Milvus é estabelecida.</li>
<li>O serviço OpenAI é utilizado para gerar uma incorporação da descrição que o utilizador introduziu.</li>
<li>É efectuada uma pesquisa de semelhanças, filtrando os resultados pelo estado do bilhete e pelo ID da organização (uma vez que apenas os bilhetes abertos da mesma organização são relevantes).</li>
<li>Se existirem resultados e a distância entre os vectores de incorporação do bilhete existente e o texto recentemente introduzido for inferior a um determinado limiar, este facto é assinalado.</li>
</ul>
<p>Para executar a nova aplicação, é necessário definir primeiro as variáveis de ambiente para o OpenAI e o Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ao tentar submeter um bilhete que já existe, o resultado será o seguinte:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> O código para este exemplo também pode ser encontrado no <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Mostrar mais informações relevantes</h3><p>Como você pode ver na saída de depuração verde oculta na versão final, dois tickets corresponderam à nossa pesquisa (no status novo, da organização atual e próximo ao vetor de incorporação). No entanto, o primeiro (relevante) teve uma classificação mais elevada do que o segundo (irrelevante nesta situação), o que se reflecte no valor de distância mais baixo. Esta relação é captada nos vectores de incorporação sem fazer corresponder diretamente as palavras, como numa pesquisa normal de texto integral.</p>
<p>Para concluir, vamos mostrar informações úteis após a submissão do ticket para dar ao utilizador o máximo possível de informações relevantes antecipadamente.</p>
<p>Para isso, faremos uma segunda pesquisa depois que o ticket for enviado para buscar os artigos da base de conhecimento com as melhores correspondências:</p>
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
<p>Se não houver nenhum ticket de suporte aberto com uma pontuação de similaridade alta, o novo ticket é enviado e os artigos de conhecimento relevantes são mostrados abaixo:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> O código para este exemplo também pode ser encontrado no <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Embora a interface de utilizador aqui apresentada não seja um formulário de apoio real, mas um exemplo para ilustrar o caso de utilização, a combinação de Airbyte e Milvus é muito poderosa - facilita o carregamento de texto a partir de uma grande variedade de fontes (de bases de dados como Postgres sobre APIs como Zendesk ou GitHub até fontes completamente personalizadas construídas utilizando o SDK da Airbyte ou o construtor de conectores visuais) e indexa-o de forma incorporada no Milvus, um poderoso motor de pesquisa vetorial capaz de escalar para grandes quantidades de dados.</p>
<p>O Airbyte e o Milvus são de código aberto e totalmente gratuitos para utilização na sua infraestrutura, com ofertas de nuvem para descarregar operações, se desejado.</p>
<p>Para além do caso de utilização clássico da pesquisa semântica ilustrado neste artigo, a configuração geral também pode ser utilizada para criar um chatbot de resposta a perguntas utilizando o método RAG (Retrieval Augmented Generation), sistemas de recomendação ou para ajudar a tornar a publicidade mais relevante e eficiente.</p>
