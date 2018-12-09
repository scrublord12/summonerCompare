const client = {
  get(data) {
    return Promise.resolve({ data });
  },
};

module.exports = {
  create: () => client,
};
