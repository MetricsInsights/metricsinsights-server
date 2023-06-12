import request from 'supertest';
import app from '../app';

describe('UserController', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Gustavo3', email: 'gustavo3@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user_id');
    expect(response.body.name).toBe('Gustavo3');
    expect(response.body.email).toBe('gustavo3@example.com');
  });

  // Add more test cases here
});
