---
id: cpu_milvus_docker.md
---

# 安装 CPU 版本的 Milvus

## 安装前提

#### 操作系统

| 操作系统   | 版本                                                      |
| -------------- | ------------------------------------------------------------ |
| CentOS         | 7.5 或以上                                                   |
| Ubuntu LTS     | 18.04 或以上                                                 |

#### 硬件

| 硬件 | 建议配置                               |
| ---- | -------------------------------------- |
| CPU        | Intel CPU Sandy Bridge 或以上 |
| CPU 指令集 | <ul><li>SSE42</li><li>AVX</li><li>AVX2</li><li>AVX512</li></ul> |
| 内存 | 8 GB 或以上（取决于具体向量数据规模） |
| 硬盘 | SATA 3.0 SSD 或以上                |

#### 软件

| 软件     | 版本                                |
| ------- | -------------------------------------- |
| Docker  | 19.03 或以上                             |

<div class="alert note">
请确保可用内存大于你在 <b>server_config.yaml</b> 文件中设置的 <code>cache.insert_buffer_size</code> 和 <code>cache.cache_size</code> 之和。
</div>

## 确认 Docker 状态

确认 Docker daemon 正在运行：

```shell
$ sudo docker info
```

<div class="alert note">
<ul>
<li>如果无法正常打印 Docker 相关信息，请启动 Docker daemon。</li>
<li>在 Linux 上需要使用 <code>sudo</code> 执行 Docker 命令。若要在没有 <code>sudo</code> 的情况下运行 Docker 命令，请创建 <code>docker</code> 组并添加用户，详见 <a href="https://docs.docker.com/install/linux/linux-postinstall/">Linux 安装步骤</a>。</li>
</ul>
</div>

## 拉取 Milvus 镜像

拉取 CPU 版本 的 Milvus 镜像：

```shell
$ sudo docker pull milvusdb/milvus:0.10.0-cpu-d061620-5f3c00
```

<div class="alert note">
如果拉取镜像的速度过慢或一直失败，请参考 <a href="operational_faq.md">操作常见问题</a> 中提供的解决办法。
</div>

## 下载配置文件

```shell
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.10.0/core/conf/demo/server_config.yaml
```

<div class="alert note">
如果无法通过 <code>wget</code> 命令下载配置文件，你也可以在 <b>/home/$USER/milvus/conf</b> 目录下创建 <b>server_config.yaml</b> 文件，然后将 <a href="https://github.com/milvus-io/milvus/blob/v0.10.0/core/conf/demo/server_config.yaml">server config 文件</a> 的内容复制到你创建的配置文件中。
</div>

## 启动 Milvus Docker 容器

启动 Docker 容器，将本地的文件路径映射到容器中：

```shell
$ sudo docker run -d --name milvus_cpu_0.10.0 \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.10.0-cpu-d061620-5f3c00
```

上述命令中用到的参数定义如下：

- `-d`: 在后台运行容器。
- `--name`: 为容器指定一个名字。
- `-p`: 映射宿主机端口到容器。
- `-v`: 将宿主机路径挂载至容器。

确认 Milvus 运行状态：

```shell
$ sudo docker ps
```

如果 Milvus 服务没有正常启动，执行以下命令查询错误日志：

```shell
# 获得运行 Milvus 的 container ID。
$ docker ps -a
# 检查 docker 日志。
$ docker logs <milvus container id>
```

## 接下来你可以

- 如果你刚开始了解 Milvus：

  - [运行示例程序](example_code.md)
  - [了解更多 Milvus 操作](milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果你已准备好在生产环境中部署 Milvus：

  - 创建 [监控与报警系统](monitor.md) 实时查看系统表现
  - [设置 Milvus 参数](milvus_config.md)
  
- 如果你想使用针对大数据集搜索的 GPU 加速版 Milvus：

  - [安装支持 GPU 加速版 Milvus](gpu_milvus_docker.md)
