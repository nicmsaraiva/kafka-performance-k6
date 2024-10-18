import { Kafka } from 'k6/x/kafka'; // Importa o módulo Kafka

const kafkaBrokers = ['localhost:9092']; // Endereço do broker Kafka
const topic = 'test-topic'; // Nome do tópico que já existe no Kafka

// Configura o produtor Kafka
const producer = new Kafka.Producer({
    brokers: kafkaBrokers,
    topic: topic,
    compression: 'none',
    partition: 0,
    acks: 1,
});

export default function () {
    const messages = [
        {
            key: 'test-key',
            value: JSON.stringify({ field1: 'value1', field2: 'value2' }),
        },
    ];
    producer.produce({ messages });
    console.log('Mensagem enviada para o Kafka:', messages);
}

export function teardown() {
    producer.close();
}
