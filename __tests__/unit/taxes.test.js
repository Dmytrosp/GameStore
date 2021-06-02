const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupDB = require('../utils/setupDB');

setupDB();
const url = '/taxes/';
let operatedTaxesId = '';

describe('Taxes routes', () => {
  beforeEach(() => {
    let newTaxes;
    newTaxes = {
      text: 'This is new awesome taxes',
      header: 'Awesome taxes',
    };
  });
  describe('GET /taxes', () => {
    test('should return 200 and apply the default query options', async () => {
      const res = await request(app)
        .get(url)
        .send()
        .expect(httpStatus.OK);
    });
  });

  describe('POST /taxes', () => {
    beforeEach(() => {
      newTaxes = {
        text: 'This is new awesome taxes',
        header: 'Awesome taxes',
      };
    });

    test('should return 201 and successfully create new taxes if data is ok', async () => {
      const res = await request(app)
        .post(url)
        .send(newTaxes)
        .expect(httpStatus.CREATED);

      operatedTaxesId = res.body.data.data._id;
      expect(res.body.data.data).toEqual({
        _id: expect.anything(),
        text: expect.stringContaining(newTaxes.text),
        header: expect.stringContaining(newTaxes.header),
        __v: expect.anything(),
      });
    });

    test("should return error required fields aren't provided", async () => {
      await request(app)
        .post(url)
        .send({ ...newTaxes, header: '' })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /taxes/:Id', () => {
    test('should return 200 and the taxes object if data is ok', async () => {
      const res = await request(app)
        .get(url + operatedTaxesId)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.data.data).toEqual({
        _id: expect.anything(),
        text: expect.stringContaining(newTaxes.text),
        header: expect.stringContaining(newTaxes.header),
        __v: 0,
      });
    });

    test("should return error if taxes isn't exist", async () => {
      await request(app)
        .get(
          url +
            operatedTaxesId.substring(0, operatedTaxesId.length - 1) +
            '3'
        )
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
  describe('PATCH /taxes/:id', () => {
    test("should return error if taxes isn't exist", async () => {
      await request(app)
        .patch(
          url +
            operatedTaxesId.substring(0, operatedTaxesId.length - 1) +
            '3'
        )
        .send()
        .expect(httpStatus.NOT_FOUND);
    });

    test('should return 200 and successfully patch taxes if data is ok', async () => {
      const res = await request(app)
        .patch(url + operatedTaxesId)
        .send({ price: 1000 })
        .expect(httpStatus.OK);

      operatedTaxesId = res.body.data.data._id;

      expect(res.body.data.data).toEqual({
        _id: expect.anything(),
        text: expect.stringContaining(newTaxes.text),
        header: expect.stringContaining(newTaxes.header),
        __v: 0,
      });
    });
  });
  describe('DELETE /taxes/:id', () => {
    test('should return 204 if id is ok', async () => {
      await request(app)
        .delete(url + operatedTaxesId)
        .send()
        .expect(httpStatus.NO_CONTENT);
    });

    test("should return error if taxes isn't exist", async () => {
      await request(app)
        .delete(
          url +
            operatedTaxesId.substring(0, operatedTaxesId.length - 1) +
            '3'
        )
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
