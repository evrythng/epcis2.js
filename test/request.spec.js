import { expect } from 'chai'
import settings from '../src/settings'
import request, { buildUrl } from '../src/request/request'
import setup from '../src/setup'
import fetchMock from 'fetch-mock'
import { prepare, tearDown } from './helper/apiMock'

// Copy initial settings
const initialSettings = Object.assign({}, settings)

let req

describe('requests utils', () => {
  it('should build a valid url', () => {
    expect(buildUrl(initialSettings, '')).to.be.equal(initialSettings.endpoint)
    expect(buildUrl(initialSettings, 'capture')).to.be.equal(initialSettings.endpoint + 'capture')
    expect(buildUrl({ endpoint: 'https://example.com' }, 'capture')).to.be.equal('https://example.com/capture')
  })
})

describe('requests', () => {
  beforeEach((done) => {
    prepare()
    done()
  })

  afterEach((done) => {
    setup(initialSettings)
    req.then(() => tearDown(done)).catch(done.fail)
  })

  describe('options', () => {
    describe('defaults', () => {
      it('should have default url and method', () => {
        req = request('').then(() => {
          expect(fetchMock.lastUrl()).to.be.equal(initialSettings.endpoint)
        })
      })
    })

    /* describe('global settings', () => {
      it('should merge defaults with global settings', () => {
        request = api().then(() => {
          const headers = fetchMock.lastOptions().headers
          expect(headers['content-type']).toBeDefined()
          expect(headers['content-type']).toEqual('application/json')
        })
      })

      it('should use global settings after change', () => {
        setup({
          headers: { 'content-type': 'text/plain' }
        })
        request = api().then(() => {
          const headers = fetchMock.lastOptions().headers
          expect(headers['content-type']).toBeDefined()
          expect(headers['content-type']).toEqual('text/plain')
        })
      })
    })

    describe('custom options', () => {
      it('should merge custom options', () => {
        const method = 'post'
        request = api({ method }).then(() => {
          expect(fetchMock.lastOptions().method).toEqual(method)
        })
      })

      it('should merge nested headers', () => {
        const headers = {
          'content-type': 'text/plain',
          accept: 'application/json'
        }
        request = api({ headers }).then(() => {
          expect(fetchMock.lastOptions().headers['content-type']).toEqual(headers['content-type'])
          expect(fetchMock.lastOptions().headers.accept).toEqual(headers.accept)
        })
      })

      it('should user apiKey if authorization header not provided', () => {
        const apiKey = 'apiKey'
        request = api({ apiKey }).then(() => {
          expect(fetchMock.lastOptions().headers.authorization).toEqual(apiKey)
        })
      })
    })

    describe('interceptors', () => {
      const requestSpy = jasmine.createSpy('request')
      const responseSpy = jasmine.createSpy('response')
      const loggerInterceptor = {
        request: requestSpy,
        response: responseSpy
      }
      const mutatorInterceptor = {
        request (options) {
          options.headers.accept = 'application/json'
          options.method = 'post'
          return options
        },
        response (res) {
          // assuming fullResponse: false
          res.foo = 'bar'
          return res
        }
      }
      const incrementInterceptor = {
        request (options) {
          options.body = options.body || { count: 0 }
          options.body.count++
          return options
        },
        response (res) {
          // assuming fullResponse: false
          res.count = res.count || 0
          res.count++
          return res
        }
      }
      const asyncIncrementInterceptor = {
        request (options) {
          return new Promise((resolve) => {
            setTimeout(() => {
              options.body = options.body || { count: 0 }
              options.body.count++
              resolve(options)
            }, 10)
          })
        },
        response (res) {
          // assuming fullResponse: false
          return new Promise((resolve) => {
            setTimeout(() => {
              res.count = res.count || 0
              res.count++
              resolve(res)
            }, 10)
          })
        }
      }
      const cancelInterceptor = {
        request (options, cancel) {
          cancel()
        }
      }
      const asyncCancelInterceptor = {
        request (options, cancel) {
          return new Promise((resolve) => {
            setTimeout(() => {
              cancel()
              resolve()
            }, 10)
          })
        }
      }
      const rejectInterceptor = {
        response () {
          throw new Error('Rejected')
        }
      }
      const monkeyPatchInterceptor = {
        response (res) {
          const json = res.json
          res.json = function () {
            return json.apply(this, arguments).then((j) => {
              j.patch = 'patched'
              return j
            })
          }
          return res
        }
      }

      beforeEach(() => {
        requestSpy.calls.reset()
        responseSpy.calls.reset()
      })

      describe('request interceptors', () => {
        it('should run before request', () => {
          const interceptors = [loggerInterceptor]
          request = api({ interceptors }).then(() => {
            expect(requestSpy).toHaveBeenCalled()
            expect(requestSpy.calls.mostRecent().args[0]).toEqual(
              jasmine.objectContaining({
                method: 'get'
              })
            )
          })
        })

        it('should be able to mutate request options', () => {
          const interceptors = [mutatorInterceptor]
          request = api({ interceptors }).then(() => {
            expect(fetchMock.lastOptions().method).toEqual('post')
            expect(fetchMock.lastOptions().headers.accept).toEqual('application/json')
          })
        })

        it('should use previous options if interceptor does not return', () => {
          const interceptors = [loggerInterceptor]
          request = api({ interceptors }).then(() => {
            expect(fetchMock.lastOptions().method).toEqual('get')
          })
        })

        it('should allow multiple interceptors that run in order', () => {
          const interceptors = [incrementInterceptor, incrementInterceptor]
          request = api({ interceptors }).then(() => {
            expect(fetchMock.lastOptions().body).toBeDefined()
            expect(fetchMock.lastOptions().body.count).toEqual(2)
          })
        })

        it('should allow async interceptors (return promises)', () => {
          const interceptors = [asyncIncrementInterceptor, asyncIncrementInterceptor]
          request = api({ interceptors }).then(() => {
            expect(fetchMock.lastOptions().body).toBeDefined()
            expect(fetchMock.lastOptions().body.count).toEqual(2)
          })
        })

        it('should be able to cancel requests', () => {
          fetchMock.reset()
          const interceptors = [cancelInterceptor]
          request = api({ interceptors }).catch((err) => {
            expect(err.cancelled).toBe(true)
            expect(fetchMock.called()).toBe(false)
          })
        })

        it('should be able to cancel request from async interceptor', () => {
          fetchMock.reset()
          const interceptors = [asyncCancelInterceptor]
          request = api({ interceptors }).catch((err) => {
            expect(err.cancelled).toBe(true)
            expect(fetchMock.called()).toBe(false)
          })
        })

        it('should not run interceptors after request is cancelled', () => {
          fetchMock.reset()
          const interceptors = [cancelInterceptor, loggerInterceptor]
          request = api({ interceptors }).catch(() => {
            expect(requestSpy).not.toHaveBeenCalled()
            expect(fetchMock.called()).toBe(false)
          })
        })

        it('should cancel the right request', () => {
          const firstRequest = api({ interceptors: [asyncCancelInterceptor] })
            .then(() => expect(true).toBe(false)) // should not get here
            .catch(() => expect(true).toBe(true))

          const secondRequest = api({ interceptors: [loggerInterceptor] })
            .then(() => expect(true).toBe(true))
            .catch(() => expect(true).toBe(false)) // should not get here

          request = Promise.all([firstRequest, secondRequest])
        })
      })

      describe('response interceptors', () => {
        it('should run after the response', () => {
          const interceptors = [loggerInterceptor]
          request = api({ interceptors }).then(() => {
            expect(responseSpy).toHaveBeenCalled()
            expect(responseSpy).toHaveBeenCalledWith(responses.ok.body)
          })
        })

        it('should be able to mutate simple response', () => {
          const interceptors = [mutatorInterceptor]
          const url = paths.operators
          request = api({ interceptors, url }).then((res) => {
            expect(res.id).toBeDefined()
            expect(res.id).toEqual(operatorTemplate.id)
            expect(res.foo).toBeDefined()
            expect(res.foo).toEqual('bar')
          })
        })

        it('should allow multiple interceptors that run in order', () => {
          const interceptors = [incrementInterceptor, incrementInterceptor]
          request = api({ interceptors }).then((res) => {
            expect(res.count).toBeDefined()
            expect(res.count).toEqual(2)
          })
        })

        it('should allow async interceptors (return promises)', () => {
          const interceptors = [asyncIncrementInterceptor, asyncIncrementInterceptor]
          request = api({ interceptors }).then((res) => {
            expect(res.count).toBeDefined()
            expect(res.count).toEqual(2)
          })
        })

        it('should allow to reject a successful response', () => {
          const interceptors = [rejectInterceptor]
          request = api({ interceptors })
            .then(() => expect(true).toBe(false)) // should not get here
            .catch(() => expect(true).toBe(true))
        })

        it('should allow monkey patch of full responses', () => {
          const interceptors = [monkeyPatchInterceptor]
          request = api({ interceptors, fullResponse: true })
            .then((res) => res.json())
            .then((res) => {
              expect(res.patch).toBeDefined()
              expect(res.patch).toEqual('patched')
            })
        })
      })
    })

    describe('fetch', () => {
      it('should join url with apiUrl', () => {
        const customOptions = {
          apiUrl: 'https://api-test.evrythng.net',
          url: paths.dummy
        }
        request = api(customOptions).then(() => {
          expect(fetchMock.lastUrl()).toEqual(`${customOptions.apiUrl}${customOptions.url}`)
        })
      })

      it('should build url with params options', () => {
        const params = {
          foo: 'bar'
        }
        request = api({ params }).then(() => {
          expect(fetchMock.lastUrl()).toEqual(apiUrl('?foo=bar'))
        })
      })

      it('should allow body with FormData', () => {
        const form = new FormData()
        form.append('foo', 'bar')
        request = api({ body: form }).then(() => {
          expect(fetchMock.lastOptions().body).toEqual(form)
          expect(fetchMock.lastOptions().headers['content-type'])
        })
      })
    })

    describe('handle response', () => {
      it('should return json body by default', () => {
        request = api().then((res) => {
          expect(res).toEqual(responses.ok.body)
        })
      })

      it('should handle empty body', () => {
        request = api({
          method: 'delete',
          url: paths.dummy
        }).then((res) => {
          expect(res).toBeUndefined()
        })
      })

      it('should reject on HTTP error code', function () {
        request = api({ url: paths.error })
          .then(() => expect(true).toBe(false)) // should not get here
          .catch((res) => expect(res).toEqual(responses.error.generic.body))
      })

      it('should return full Response object with fullResponse option', () => {
        request = api({ fullResponse: true }).then((res) => {
          expect(res instanceof Response).toBe(true)
          expect(res.headers).toBeDefined()
          expect(res.ok).toBe(true)

          return res.json().then((body) => {
            expect(body).toEqual(responses.ok.body)
          })
        })
      })

      it('should return full Response object even on HTTP error code', function () {
        request = api({
          url: paths.error,
          fullResponse: true
        })
          .then(() => expect(true).toBe(false)) // should not get here
          .catch((res) => {
            expect(res instanceof Response).toBe(true)
            expect(res.ok).toBe(false)

            return res.json().then((body) => {
              expect(body).toEqual(responses.error.generic.body)
            })
          })
      })
    })

    describe('callbacks', () => {
      const callbackSpy = jasmine.createSpy('callback')

      beforeEach(callbackSpy.calls.reset)

      it('should call callback without error on success', () => {
        request = api({ url: paths.dummy }, callbackSpy).then(() => {
          expect(callbackSpy).toHaveBeenCalledWith(null, responses.entity.multiple.body)
        })
      })

      it('should call callback with error on error', () => {
        request = api({ url: paths.error }, callbackSpy).catch(() =>
          expect(callbackSpy).toHaveBeenCalledWith(responses.error.generic.body)
        )
      })
    }) */
  })
})
