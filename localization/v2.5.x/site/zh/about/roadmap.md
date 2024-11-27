---
id: roadmap.md
title: Milvus 路线图
related_key: Milvus roadmap
summary: Milvus 是一个开源向量数据库，旨在为人工智能应用提供动力。以下是我们的发展路线图。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 路线图<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>欢迎访问 Milvus 路线图！加入我们不断增强和发展 Milvus 的旅程。我们很高兴与大家分享我们的成就、未来计划以及对未来的展望。我们的路线图不仅仅是一份即将推出的功能列表，它还反映了我们对创新的承诺以及与社区合作的决心。我们邀请您深入了解我们的路线图，提供您的反馈意见，帮助塑造 Milvus 的未来！</p>
<h2 id="Roadmap" class="common-anchor-header">路线图<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>类别</th>
            <th>Milvus 2.5.0 (在最近的版本中实现)</th>
            <th>下一个版本（25 年中期）</th>
            <th>未来路线图（1 年内）</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>人工智能驱动的非结构化数据处理</strong><br/><i>利用人工智能模型和先进技术加强对非结构化数据的处理和分析能力。</i></td>
            <td><strong>全文搜索</strong><br/><i>利用 Sparse-BM25 支持全文搜索。新的 API 接受文本作为输入，并在 Milvus 内部自动生成稀疏向量</i><br/><br/><strong>Sparse Vector(GA)</strong><br/><i>支持稀疏向量的高效存储和索引方法</i><br/></td>
            <td><strong>数据输入和数据输出</strong><br/><i>支持主要模型服务，以摄取原始数据</i><br/><br/><strong>高级</strong><i>Reranker</i><br/><i>支持基于模型的 Reranker 和用户自定义评分函数</i><br/><br/><strong>JSON 增强</strong><br/><i>JSON 索引和解析，以加快处理速度</i></td>
            <td><strong>原始数据输入和数据输出</strong><br/><i>支持 Blob 和 url 引用以处理原始数据</i><br/><br/><strong>支持更多数据类型</strong><br/> 例如<i>：Datetime、Map、GIS</i><br/><br/><strong>支持</strong><i>向量</i><br/><i>支持向量列表，典型用法如 Colbert、Copali 等。</i></td>
        </tr>
        <tr>
            <td><strong>搜索质量和性能</strong><br/><i>通过优化架构、算法和 API 提供准确、相关和快速的</i><strong>搜索</strong><i>结果</i></td>
            <td><strong>文本匹配功能</strong><br/><i>快速过滤文本/varchar 格式的关键字/</i><i>标记</i><br/><br/><strong>增强分组搜索</strong><br/><i>在混合搜索中引入分组_大小并添加分组支持</i><br/><br/> 位图<strong>索引和反向索引</strong><br/><i>加快标签过滤速度</i></td>
            <td><strong>高级匹配</strong><br/><i>，例如匹配短语、模糊匹配和更多标记符</i><br/><br/> 聚合<br/><i>标量字段聚合，例如最小、最大、计数、不同。</i><br/></td>
            <td><strong>部分更新</strong><br/><i>支持对特定字段值的更新</i><br/><br/><strong>排序功能</strong><br/><i>在执行过程中按标量字段</i>排序<br/><br/><strong>支持数据聚类</strong><br/><i>数据共定位</i></td>
        </tr>
        <tr>
            <td><strong>丰富的功能和管理</strong><br/><i>对开发人员友好的强大数据管理功能</i></td>
            <td><strong>在数据导入中支持 CSV 文件</strong><br/><i>Bulkinsert 支持 CSV 格式</i><br/><br/><strong>支持空值和默认值</strong><br/><i>空值和默认值类型使从其他 DBMS 导入数据更加容易</i><br/><br/><strong>Milvus WebUI（测试版）</strong><br/><i>面向 DBA 的可视化管理工具</i></td>
            <td><strong>主键重复数据删除</strong><br/><i>通过使用全局 pk 索引</i><br/><br/><strong>在线 Schema 更改</strong><br/> 例如<i>添加/删除字段、修改 varchar 长度</i><br/><br/><strong>数据版本管理与还原</strong><br/><i>支持通过快照进行数据版本管理</i></td>
            <td><strong>Rust 和 C++ SDK</strong><br/><i>支持更多客户端</i><br/><br/><strong>支持 UDF </strong><br/><i>用户自定义函数</i></td>
        </tr>
        <tr>
            <td><strong>成本效益和架构</strong><br/><i>最先进的系统，优先考虑稳定性、成本效益和可扩展性 </i></td>
            <td><strong>按字段加载</strong><br/><i>选择 Collections 的部分内容进行加载</i><br/><br/><strong>内存优化</strong><br/><i>减少 OOM，增强负载</i><br/><br/><strong>流节点（测试版）</strong><br/><i>提供全局一致性，解决根协调器的性能瓶颈</i><br/><br/><strong>存储格式 V2（测试版）</strong><br/><i>通用格式设计，为基于磁盘的数据访问奠定基础</i><br/><br/><strong>集群压缩</strong><br/><i>基于配置的数据再分配，加快读取性能</i></td>
            <td><strong>懒加载</strong><br/><i>可通过首次读操作启动加载，而无需显式调用 load()</i><br/><br/><strong>分层存储</strong><br/><i>支持冷热存储，以优化成本</i><br/><br/><strong>按字段释放</strong><br/><strong>释放</strong><i>部分 Collections 以减少内存使用</i><br/><br/><strong>流节点 (GA</strong><i>)</i><br/><i>处理流数据并简化架构</i></td>
            <td><strong>消除依赖</strong><br/><i>减少或消除对 pulsar、etcd 等外部组件的依赖</i><br/><br/><strong>将协调逻辑并入 MixCoord</strong><br/><i>简化架构</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>我们的路线图通常分为三个部分：最新发布的版本、即将发布的下一个版本以及明年的中长期愿景。</li>
<li>随着我们的进步，我们会不断学习，偶尔调整我们的重点，根据需要添加或删除项目。</li>
<li>这些计划仅供参考，可能会根据订阅服务的不同而有所变化。</li>
<li>我们将坚定不移地遵循我们的路线图，并以我们的<a href="/docs/zh/release_notes.md">发布说明</a>作为参考。</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">如何贡献<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>作为一个开源项目，Milvus 的发展离不开社区的贡献。以下是您如何参与我们的旅程。</p>
<h3 id="Share-feedback" class="common-anchor-header">分享反馈</h3><ul>
<li><p>问题报告：遇到错误或有建议？在我们的<a href="https://github.com/milvus-io/milvus/issues">GitHub 页面</a>上打开一个问题。</p></li>
<li><p>功能建议：有关于新功能或改进的想法？<a href="https://github.com/milvus-io/milvus/discussions">我们很乐意听取您的意见！</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">代码贡献</h3><ul>
<li><p>拉取请求：直接向我们的<a href="https://github.com/milvus-io/milvus/pulls">代码库</a>投稿。无论是修复错误、添加功能还是改进文档，我们都欢迎您的贡献。</p></li>
<li><p>开发指南：查看我们的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">贡献者指南</a>，了解代码贡献指南。</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">传播信息</h3><ul>
<li><p>社交分享：喜欢 Milvus 吗？在社交媒体和技术博客上分享您的使用案例和经验。</p></li>
<li><p>在 GitHub 上为我们加星：在我们的<a href="https://github.com/milvus-io/milvus">GitHub 存储库上</a>加星，以表示您的支持。</p></li>
</ul>
