---
id: scale-standalone.md
title: "Scale Milvus Standalone"
summary: "Milvus Standalone is a single-machine server deployment. All components of Milvus Standalone are packed into a single Docker image, making deployment convenient. This topic describes how to scale a Milvus instance running in this mode."
---

# Scale Milvus Standalone

Milvus Standalone is a single-machine server deployment. All components of Milvus Standalone are packed into a single [Docker image](install_standalone-docker.md), making deployment convenient. This topic describes how to scale a Milvus instance running in this mode.

## Prerequsites

When deploying Milvus Standalone with [Docker](install_standalone-docker.md) or [Docker Compose](install_standalone-docker-compose.md), the deployment script (`standalone_embed.sh`) or configuration file (`docker-compose.yml`) creates several volumes and maps them to host directories to ensure data persistence. 

To scale a Milvus instance deployed in this manner, you must stop and remove the existing container or container stack, redeploy Milvus Standalone with updated configuration settings, and reuse the persisted data on your host to launch a new instance.

The following table lists the volume mapping between the host and containers.

<table>
   <tr>
     <th><p>Deployment option</p></th>
     <th><p>Host path</p></th>
     <th><p>Container path</p></th>
   </tr>
   <tr>
     <td rowspan="3"><p>Docker</p></td>
     <td><p><code>$(pwd)/volumes/milvus</code></p></td>
     <td><p><code>/var/lib/milvus</code></p></td>
   </tr>
   <tr>
     <td><p><code>$(pwd)/embedEtcd.yaml</code></p></td>
     <td><p><code>/milvus/configs/embedEtcd.yaml</code></p></td>
   </tr>
   <tr>
     <td><p><code>$(pwd)/user.yaml</code></p></td>
     <td><p><code>/milvus/configs/user.yaml</code></p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>Docker Compose</p></td>
     <td><p><code>${DOCKER_VOLUME_DIRECTORY:-.}/volumes/etcd</code>(milvus-etcd)</p></td>
     <td><p><code>/etcd</code></p></td>
   </tr>
   <tr>
     <td><p><code>${DOCKER_VOLUME_DIRECTORY:-.}/volumes/minio</code>(milvus-minio)</p></td>
     <td><p><code>/minio_data</code></p></td>
   </tr>
   <tr>
     <td><p><code>${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus</code>(milvus-standalone)</p></td>
     <td><p><code>/var/lib/milvus</code></p></td>
   </tr>
</table>

Before running the procedures in this guide, ensure your data persists in the above host paths.

## Scale instances deployed using Docker

To scale a currently running Milvus instance, you must stop the instance, remove the container, and redeploy the instance with new settings and persisted data.

The specific procedure is as follows:

1. Run `docker stats milvus-standalone` to view the CPU and memory allocated to the Milvus instance. The output should be similar to the following:

    ```bash
    CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O       BLOCK I/O         PIDS
    917da667f2ff   milvus-standalone   6.10%     171.8MiB / 3.886GiB   4.32%     1.57kB / 0B   1.01GB / 1.79MB   31
    ```

    In the command output, you can find the current resource usage of your Milvus instance.

1. Stop and remove the container.

    ```bash
    $ docker stop milvus-standalone
    $ docker rm milvus-standalone
    ```

1. Locate the `standalone_embed.sh` script file, find the `docker run` command, and add the resource limits.

    ```yaml
    ...
        sudo docker run -d \
            --name milvus-standalone \
            --security-opt seccomp:unconfined \
            -e ETCD_USE_EMBED=true \
            -e ETCD_DATA_DIR=/var/lib/milvus/etcd \
            -e ETCD_CONFIG_PATH=/milvus/configs/embedEtcd.yaml \
            -e COMMON_STORAGETYPE=local \
            -v $(pwd)/volumes/milvus:/var/lib/milvus \
            -v $(pwd)/embedEtcd.yaml:/milvus/configs/embedEtcd.yaml \
            -v $(pwd)/user.yaml:/milvus/configs/user.yaml \
            -p 19530:19530 \
            -p 9091:9091 \
            -p 2379:2379 \
            --health-cmd="curl -f http://localhost:9091/healthz" \
            --health-interval=30s \
            --health-start-period=90s \
            --health-timeout=20s \
            --health-retries=3 \
            # highlight-start
            --memory="4g" \          # New memory limit
            --cpus="2.0" \           # New CPU limit
            # highlight-end
            milvusdb/milvus:v2.5.11 \
            milvus run standalone  1> /dev/null
    ```

1. Ensure the persisted data is in the same folder as the `standalone_embed.sh` script, and run the script as follows:

    ```bash
    sudo  bash standalone_embed.sh start
    ```

1. Run `docker stats milvus-standalone` to view the CPU and memory allocated to the Milvus instance after scaling. The output should be similar to the following:

    ```bash
    CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O        PIDS
    7aea450f87ce   milvus-standalone   7.52%     210.9MiB / 4GiB     5.15%     1.05kB / 0B   610kB / 8.19kB   29
    ```

## Scale instances deployed using Docker Compose

To scale a currently running Milvus instance, you must stop the instance, remove the container stack, and redeploy the instance with new settings and persisted data.

The specific procedure is as follows:

1. Run `docker stats milvus-standalone` to view the CPU and memory allocated to the Milvus instance. The output should be similar to the following:

    ```bash
    CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O       BLOCK I/O         PIDS
    917da667f2ff   milvus-standalone   6.10%     171.8MiB / 3.886GiB   4.32%     1.57kB / 0B   1.01GB / 1.79MB   31
    ```

    In the command output, you can find the current resource usage of your Milvus instance.

1. Stop and remove the container stack.

    ```bash
    $ docker compose down
    ```

1. Locate the `docker-compose.yml` configuration file, find the standalone section, and add the resource limits.

    ```yaml
    ...
      standalone:
        container_name: milvus-standalone
        image: milvusdb/milvus:v2.5.8
        command: ["milvus", "run", "standalone"]
        # highlight-start
        deploy:
          resources:
            limits:
              cpus: "2"   # new cpu limits
              memory: 4G  # new memory limits
        # highlight-end
        security_opt:
        - seccomp:unconfined
        environment:
          ETCD_ENDPOINTS: etcd:2379
          MINIO_ADDRESS: minio:9000
        volumes:
          - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
        healthcheck:
          test: ["CMD", "curl", "-f", "http://localhost:9091/healthz"]
          interval: 30s
          start_period: 90s
          timeout: 20s
          retries: 3
        ports:
          - "19530:19530"
          - "9091:9091"
        depends_on:
          - "etcd"
          - "minio"
    ```

1. Ensure the persisted data is available, and run `docker compose` as follows:

    ```bash
    docker compose up -d
    ```

1. Run `docker stats milvus-standalone` to view the CPU and memory allocated to the Milvus instance after scaling. The output should be similar to the following:

    ```bash
    CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O        PIDS
    7aea450f87ce   milvus-standalone   7.52%     210.9MiB / 4GiB     5.15%     1.05kB / 0B   610kB / 8.19kB   29
    ```

    