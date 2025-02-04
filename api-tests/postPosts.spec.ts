import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('should create a new post and return the created post with an ID', async ({ request }) => {
    const postData = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    const response = await request.post(`${baseUrl}/posts`, {
        data: postData,
    });
    expect(response.status()).toBe(201);
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('title');
    expect(createdPost).toHaveProperty('body');
    expect(createdPost).toHaveProperty('userId');
    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.body).toBe(postData.body);
    expect(createdPost.userId).toBe(postData.userId);
});