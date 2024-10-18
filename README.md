# Teste de Performance com k6 e Kafka

Este repositório contém um script de teste para a ferramenta de desempenho [k6](https://k6.io/), que utiliza a extensão [xk6-kafka](https://github.com/mostafa/xk6-kafka) para testar a produção de mensagens em um tópico Kafka utilizando o formato Avro.

## Descrição do Teste

O script realiza a produção de 1000 mensagens Avro por iteração em um tópico Kafka chamado `xk6_kafka_avro_topic` e verifica a produção correta dessas mensagens.

## Como Executar

### 1. Configuração do Kafka com Docker

Certifique-se de que o Docker e o Docker Compose estão instalados e em execução. Utilize o seguinte Dockerfile para configurar o ambiente Kafka:

```dockerfile
# Usa a imagem do Kafka
FROM wurstmeister/kafka:latest

# Define a variável de ambiente KAFKA_ADVERTISED_LISTENERS
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
ENV KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT
ENV KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092
ENV KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181

# Exponha a porta do Kafka
EXPOSE 9092
```

### 2. Execução de Comandos

- Criar tópico

```sh
docker exec -it <container_id> kafka-topics --create --topic xk6_kafka_avro_topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

- Listar tópicos

```sh
docker exec -it <container_id> kafka-topics --list --bootstrap-server localhost:9092
```

- Executar teste K6

```sh
./k6 run .\test-avro-no-schema-registry.test.js
```

