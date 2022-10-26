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

  captureJob: {
    captureID: '28913f92-0de4-4fa9-9d64-bc762b694aea',
    createdAt: '2022-09-01T11:29:30.927Z',
    running: false,
    success: true,
    errors: [],
  },

  runningCaptureJob: {
    captureID: null,
    createdAt: '2022-09-01T11:29:30.927Z',
    running: true,
    success: true,
    errors: [],
  },
};
