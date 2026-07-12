import { randomUUIDv7 } from "bun";

let data = [
  {
    id: randomUUIDv7(),
    from: "Amando",
    content: "Hi there!",
    timestamp: Date.now(),
  },
  {
    id: randomUUIDv7(),
    from: "Charles",
    content: "Hello World!",
    timestamp: Date.now(),
  },
];

const getAll = () => {
  return data;
};

const getById = (id) => {
  const result = data.find((obj) => {
    return obj.id == id;
  });

  if (!result) {
    throw new Error(`Message with id ${id} not found`);
  }

  return result;
};

const save = (message) => {
  if (!Object.hasOwn(message, "id")) {
    throw new Error("Message must contain id");
  }

  if (!Object.hasOwn(message, "content")) {
    throw new Error("Message must contain content");
  }

  message.timestamp = Date.now();

  data.push(message);
};

const deleteById = (id) => {
  const result = getById(id);

  data = data.filter((obj) => obj.id != id);

  return result;
};

export default {
  getAll,
  getById,
  save,
  deleteById,
};
