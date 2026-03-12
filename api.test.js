const request = require('supertest');
const express = require('express');

const app = express();
app.get('/api/test', (req, res) => res.status(200).json({ success: true }));

describe('Backend API Tests', () => {
  it('should return 200 on test route', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toEqual(200);
  });
});