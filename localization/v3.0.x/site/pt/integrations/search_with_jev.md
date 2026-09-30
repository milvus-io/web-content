---
id: search_with_jev.md
summary: >-
  A pesquisa vetorial encontra informações relacionadas com uma consulta. A
  criação de uma aplicação de pesquisa útil também envolve decisões: quais as
  passagens que realmente respondem à pergunta, se uma resposta anterior pode
  ser reutilizada e se um agente dispõe de evidências suficientes para
  interromper a pesquisa.
title: Criar um RAG com o Milvus + PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Pesquisar com o Jev e o Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>A pesquisa vetorial encontra informações relacionadas com uma consulta. A criação de uma aplicação de pesquisa útil também envolve decisões: quais as passagens que realmente respondem à pergunta, se uma resposta anterior pode ser reutilizada e se um agente tem evidências suficientes para interromper a pesquisa.</p>
<p>O Milvus e o Jev abordam diferentes partes deste fluxo de trabalho. <a href="https://milvus.io/">O Milvus</a> armazena representações e recupera registos candidatos, com filtros de metadados para restrições como a versão do produto ou o âmbito da base de conhecimento. <a href="https://docs.typesafe.ai/introduction">O Jev</a> avalia o significado do texto recuperado em relação às instruções. A sua aplicação pode utilizar as suas avaliações para selecionar evidências ou controlar o próximo passo da pesquisa.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">O que faz o Jev?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Um pedido ao Jev fornece contexto e uma ou mais perguntas de avaliação. <a href="https://docs.typesafe.ai/primitives">Os</a> seus <a href="https://docs.typesafe.ai/primitives">resultados tipificados</a> incluem uma escolha entre opções fixas, uma pontuação ordenada e uma probabilidade de «sim» ou «não». Estes resultados permitem que o código da aplicação tome uma decisão sem ter de analisar uma explicação em formato livre. Um modelo de geração pode ainda redigir uma resposta ou uma consulta de pesquisa de seguimento, quando necessário.</p>
<p>Por exemplo, um utilizador pergunta como instalar o Atlas v2. O Milvus pode restringir a recuperação à documentação da v2 e devolver passagens semelhantes sobre instalação, atualizações e resolução de problemas. O Jev avalia então quais as passagens que explicam a configuração inicial. A aplicação transmite as evidências selecionadas a um modelo de geração de respostas.</p>
<p>As responsabilidades são simples:</p>
<ol>
<li><strong>Recuperar com o Milvus:</strong> encontrar candidatos dentro das restrições de metadados exigidas.</li>
<li><strong>Avaliar com o Jev:</strong> avaliar esses candidatos em relação à pergunta e a um critério específico da tarefa.</li>
<li><strong>Agir no código da aplicação:</strong> reordenar resultados, filtrar o contexto, reutilizar uma resposta ou continuar a pesquisa.</li>
</ol>
<p>Algumas decisões ocorrem antes da recuperação. O Jev pode escolher um âmbito de pesquisa ou avaliar documentos recebidos antes de estes entrarem numa coleção. O controlo de acesso e os filtros exatos continuam a ser da responsabilidade da aplicação.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Explore os cenários de pesquisa<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">A coleção «Pesquisar com o Jev</a> » contém nove tutoriais executáveis. Cada um utiliza um pequeno conjunto de dados sintéticos e mostra os registos recuperados, as avaliações e a ação resultante.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Selecionar melhores evidências<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Reordenar os resultados da pesquisa</a>: reordenar a documentação e as memórias do agente de codificação. Uma memória sobre um erro na porta de um portátil pode assemelhar-se a um problema de ligação de um contentor; uma memória mais útil regista a correção efetiva do contentor no anfitrião.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Filtrar o contexto recuperado</a>: distinguir as instruções de instalação inicial das passagens relativas à atualização e à resolução de problemas, depois de o Milvus aplicar o filtro de versão.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Reorganize as relações do gráfico</a>: responda a uma pergunta sobre o local de nascimento do autor de um livro, selecionando tanto a ligação «livro-autor» como a relação «autor-local de nascimento» e, em seguida, mantenha essa classificação ao recuperar as passagens da fonte.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Controlar a pesquisa e a reutilização de respostas<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Decidir quando interromper a pesquisa</a>: um modelo de geração propõe pesquisas a partir de evidências acumuladas, enquanto o Jev avalia se a pergunta original tem resposta. Os exemplos abrangem uma resposta direta, uma pergunta de dois passos e um facto indisponível que atinge o limite de pesquisa sem uma resposta.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Encaminhar consultas de pesquisa</a>: selecione pesquisa na documentação, na faturação ou na memória e, em seguida, aplique o filtro Milvus correspondente. Uma consulta fora do âmbito segue um caminho separado.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Validar a reutilização da cache semântica</a>: recuperar um pedido semelhante armazenado na cache e, em seguida, verificar se a sua resposta também satisfaz os requisitos de tarefa, linguagem e contexto do novo pedido.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Melhorar e inspecionar o fluxo de conhecimento<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Selecionar documentos antes da indexação</a>: distinguir orientações operacionais substantivas de material promocional ou incompleto, com ações separadas de indexação, revisão e exclusão.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Filtrar passagens recuperadas</a>: identificar texto que tente redirecionar um assistente, mantendo ao mesmo tempo conselhos de segurança comuns. Trata-se de um passo de filtragem adicional, não de uma garantia de segurança.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Avaliar as evidências da pesquisa</a>: avaliar a relevância das passagens, se as evidências são suficientes e se uma resposta apresenta alegações sem fundamento. Os exemplos removem deliberadamente evidências ou adicionam uma afirmação sem fundamento para tornar a distinção visível.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Uma interface de reclassificação pronta a usar<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">O Milvus Model</a> fornece um <code translate="no">JevRerankFunction</code> do lado da aplicação: passe uma consulta e os textos dos documentos candidatos e receba resultados pontuados com os seus índices originais, ordenados por relevância. Utilize esses índices para reordenar os registos devolvidos pelo Milvus.</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">A integração com o Jev</a> foi incorporada. Consulte a <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">implementação e as opções do construtor</a> para a API atual. Aceita <code translate="no">TYPESAFE_API_KEY</code> e, por predefinição, utiliza <code translate="no">jev-latest</code>. Utilize uma versão do pacote que inclua esta integração.</p>
<p>O wrapper atual utiliza um prompt de relevância do tipo «claim-and-evidence». Verifique se este critério se adequa à sua tarefa. Para avaliações personalizadas, tais como compatibilidade de memória, paragem ou encaminhamento, siga os tutoriais indicados, utilizando diretamente a API TypeSafe. Os tutoriais demonstram chamadas diretas à API a partir do código de uma aplicação Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Experimente com o Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Abra o tutorial de reclassificação no Colab</a> para começar com a recuperação e classificação de candidatos. Para a configuração local e a lista completa de tutoriais, consulte o ficheiro <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README da coleção</a>.</p>
<p>Os exemplos utilizam uma <a href="https://aistudio.google.com/apikey">chave da API Gemini</a> para embeddings e uma <a href="https://console.typesafe.ai/">chave da API TypeSafe</a> para o Jev. O tutorial sobre pesquisa agênica também utiliza o Gemini para a geração de consultas e respostas. É enviado texto de amostra a estes fornecedores de API, e as chamadas podem consumir créditos.</p>
<p>Os tutoriais são executados com <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> por predefinição e incluem opções de ligação a um servidor Milvus ou <a href="https://zilliz.com/cloud">à Zilliz Cloud</a>. A mesma divisão de tarefas aplica-se a todas as implementações: o Milvus recupera os candidatos e a aplicação envia o texto relevante ao Jev para avaliação.</p>
<p>Considere os exemplos como pontos de partida para definir os seus próprios critérios e limiares. Uma pontuação de relevância não garante que uma resposta esteja correta, e estes pequenos conjuntos de dados de treino não determinam a precisão nem a velocidade em ambiente de produção.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Explore implementações e resultados de avaliação<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Os seguintes projetos de código aberto aplicam estas ideias a fluxos de trabalho de pesquisa de maior dimensão. Os relatórios associados explicam os conjuntos de dados, as comparações e as limitações de cada experiência.</p>
<table>
<thead>
<tr><th>Projeto</th><th>Caso de utilização de pesquisa</th><th>Trabalho do Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Memória Markdown persistente para agentes de codificação</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Implementação do Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Avaliação</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Grafo vetorial RAG</a></td><td>Recuperação de vetores e grafos para perguntas com múltiplos saltos</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Implementação em Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Avaliação</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Pesquisa iterativa sobre conhecimento privado</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Executador de experiências</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Avaliação de interrupção da pesquisa</a> (experiência autónoma)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Reutilização de respostas a pedidos compatíveis</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Implementação do Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Avaliação</a></td></tr>
</tbody>
</table>
<p>A contribuição do DeepSearcher consiste numa experiência autónoma de interrupção da pesquisa. As outras ligações de implementação apresentam integrações do Jev específicas para cada tarefa. Os resultados destes projetos devem ser interpretados no seu próprio contexto de avaliação, em vez de serem tratados como um ponto de referência comum.</p>
