<div class="alert note">
如果你的主机由于网络限制无法在线获得 Docker 镜像和配置文件，请从其他主机在线获取并使用以下方法离线传输。在这里假设你的镜像标签是 `milvusdb/milvus`。
<ol>
 <li>将 Docker 镜像保存为 TAR 文件再使用合适的方式传输。</br>

    <code class="language-shell">
    $ docker save milvusdb/milvus > milvus_image.tar
    </code></li>

<li>将 TAR 文件传输完成后使用以下命令重新加载成 Docker 镜像。</br>

    <code class="language-shell">
    $ docker load < milvus_image.tar
    </code></li></ol>
</div>