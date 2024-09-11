import request from 'supertest';
import express from 'express';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { login } from '../controllers/auth.js';
import { bd } from '../bd.js';

const app = express();
app.use(express.json());
app.post('/login', login);

describe('POST /login', () => {
  let queryStub;
  let bcryptStub;

  beforeEach(() => {
    queryStub = sinon.stub(bd, 'query');
    bcryptStub = sinon.stub(bcrypt, 'compare');
  });

  afterEach(() => {
    sinon.restore();
    bcryptStub.restore();
  });

  it('should return an error if the email is not found', async () => {
    queryStub.yields(null, []); 

    const res = await request(app)
      .post('/login')
      .send({
        email: 'unknown@example.com',
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ Error: 'Email not found' });
  });

  it('should return an error if the password is incorrect', async () => {
    const fakeUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
    queryStub.yields(null, [fakeUser]); 
    bcryptStub.yields(null, false); 

    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrongPassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ Error: 'Incorrect password' });
  });

  it('should return an error if there is a server error during password comparison', async () => {
    const fakeUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
    queryStub.yields(null, [fakeUser]); 
    bcryptStub.yields(new Error('Comparison error')); 
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ Error: 'Error comparing passwords' });
  });

  it('should return success and set cookies if the email and password are correct', async () => {
    const fakeUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
    queryStub.yields(null, [fakeUser]); 
    bcryptStub.yields(null, true); 

    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'Success' });
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should return a server error if there is a problem finding the user', async () => {
    queryStub.yields(new Error('DB error')); 

    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ Error: 'Server error during login' });
  });
});
