import { Kafka } from 'k6/x/kafka';

console.log(Kafka); // Deve imprimir o objeto Kafka se o módulo estiver corretamente importado

export default function () {
    console.log("Kafka module loaded correctly.");
}
