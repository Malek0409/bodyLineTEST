import request from 'supertest';
import express from 'express';
import sinon from 'sinon';
import { addProduct } from '../controllers/productControllers.js'; 
import { bd } from '../bd.js';

const app = express();
app.use(express.json());
app.post('/product', addProduct);

describe('POST /product', () => {
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(bd, 'query');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a success message and productID when product is successfully added', async () => {
    const fakeProductID = 1;
    queryStub.onFirstCall().yields(null, { insertId: fakeProductID });

    const res = await request(app)
      .post('/product')
      .send({
        title: 'Treadmill',
        price: 999.99,
        currency: 'USD',
        unitNumber: 5,
        description: 'High quality treadmill for fitness',
        typeMachine: 'Cardio',
        nameMuscle: 'Legs',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'Success', productID: fakeProductID });
  });

  it('should return an error if required fields are missing', async () => {
    const res = await request(app)
      .post('/product')
      .send({
        title: '',
        price: 999.99,
        currency: 'USD',
        unitNumber: 5,
        description: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'All fields are required' });
  });

  it('should return an error if there is a database error during product insertion', async () => {
    
    queryStub.onFirstCall().yields(new Error('DB error'));

    const res = await request(app)
      .post('/product')
      .send({
        title: 'Treadmill',
        price: 999.99,
        currency: 'USD',
        unitNumber: 5,
        description: 'High quality treadmill for fitness',
        typeMachine: 'Cardio',
        nameMuscle: 'Legs',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });

  it('should handle errors during image insertion', async () => {
    const fakeProductID = 1;
    queryStub.onFirstCall().yields(null, { insertId: fakeProductID }); 
    queryStub.onSecondCall().yields(new Error('DB error')); 

    const res = await request(app)
      .post('/product')
      .send({
        title: 'Treadmill',
        price: 999.99,
        currency: 'USD',
        unitNumber: 5,
        description: 'High quality treadmill for fitness',
        typeMachine: 'Cardio',
        nameMuscle: 'Legs',
        picture: Buffer.from('fakeImageData'), 
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });
});
