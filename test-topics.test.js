import { Connection } from "k6/x/kafka"; // import kafka extension

const address = "localhost:9092";
const topic = "xk6_kafka_test_topic";

const connection = new Connection({
  address: address,
});

const results = connection.listTopics();
connection.createTopic({ topic: topic });

export default function () {
  results.forEach((topic) => console.log(topic));
}

export function teardown(data) {
  if (__VU == 0) {
    // Delete the topic
    connection.deleteTopic(topic);
  }
  connection.close();
}