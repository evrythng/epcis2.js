export default {
  ok: {
    status: 200,
    body: {},
  },

  noContent: {
    status: 204,
    body: null,
  },

  error: {
    status: 400,
    body: {
      status: 400,
      errors: ['Generic error'],
    },
  },
};
