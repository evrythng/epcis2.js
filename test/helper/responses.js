/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

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
