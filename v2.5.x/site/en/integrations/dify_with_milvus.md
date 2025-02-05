---
id: dify_with_milvus.md
summary: In this tutorial, we will show you how to deploy Dify with Milvus, to enable efficient retrieval and RAG engine.
title: Deploying Dify with Milvus
---

# Deploying Dify with Milvus

[Dify](https://dify.ai/) is an open-source platform designed to simplify building AI applications by combining Backend-as-a-Service with LLMOps. It supports mainstream LLMs, offers an intuitive prompt orchestration interface, high-quality RAG engines, and a flexible AI agent framework. With low-code workflows, easy-to-use interfaces, and APIs, Dify enables both developers and non-technical users to focus on creating innovative, real-world AI solutions without dealing with complexity.

In this tutorial, we will show you how to deploy Dify with Milvus, to enable efficient retrieval and RAG engine.


## Clone the Repository
Clone the Dify source code to your local machine:


```shell
git clone https://github.com/langgenius/dify.git
```


## Set the Environment Variables

Navigate to the Docker directory in the Dify source code


```shell
cd dify/docker
```
Copy the environment configuration file


```shell
cp .env.example .env
```

Change the value `VECTOR_STORE` in the `.env` file 
```
VECTOR_STORE=milvus
```
Make sure the Milvus configuration in the `.env` file has the following line:
```
MILVUS_URI=http://host.docker.internal:19530
```

Note that by specifying `VECTOR_STORE=milvus`, Dify will bring up a Milvus Standalone server in docker. Even though you can access the server from outside of the Docker through `http://localhost:19530`, for other Dify containers to talk to it inside Docker environment, they need to connect to the special DNS name `host.docker.internal`. Thus we set `http://host.docker.internal:19530` as `MILVUS_URI`.

For production deployment you may want to customize the authentication. For more information about how to set token or username and password in Milvus, you can refer the [authenticate page](https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password).

## Start the Docker Containers

Choose the appropriate command to start the containers based on the Docker Compose version on your system. You can use the `$ docker compose version` command to check the version, and refer to the Docker documentation for more information:

If you have Docker Compose V2, use the following command:


```shell
docker compose up -d
```
If you have Docker Compose V1, use the following command:


```shell
docker compose up -d
```

## Log in to Dify

Open your browser and go to the Dify installation page, and you can set your admin account here:
`http://localhost/install` , 
And then log in the main Dify page for further usage.

For further usage and guidance, please refer to the [Dify documentation](https://docs.dify.ai/).
