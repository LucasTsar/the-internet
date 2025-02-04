import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('should create a new post and return the created post with an ID', async ({ request }) => {
    // Define the request payload
    const postData = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    // Send a POST request to create a new post
    const response = await request.post(`${baseUrl}/posts`, {
        data: postData,
    });

    // Validate the response status code
    expect(response.status()).toBe(201);

    // Parse the response body
    const createdPost = await response.json();

    // Validate the response structure
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('title');
    expect(createdPost).toHaveProperty('body');
    expect(createdPost).toHaveProperty('userId');

    // Validate that the response includes the data sent in the request
    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.body).toBe(postData.body);
    expect(createdPost.userId).toBe(postData.userId);
});