import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('GET /posts validate 200 OK status code', async ({ request }) => {
    // Send a GET request to the /posts endpoint
    const response = await request.get(`${baseUrl}/posts/`);

    // Validate the response status code
    expect(response.status()).toBe(200);
});

test('GET /posts response contains an array of posts with the correct structure', async ({ request }) => {
    // Send a GET request to the /posts endpoint
    const response = await request.get(`${baseUrl}/posts/`);

    // Validate the response content type
    expect(response.headers()['content-type']).toContain('application/json');

    // Parse the response body
    const posts = await response.json();

    // Assert that the response is an array
    expect(Array.isArray(posts)).toBeTruthy();

    // Validate the structure of each post
    posts.forEach(post => {
        expect(post).toHaveProperty('userId');
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');

        // Validate data types
        expect(typeof post.userId).toBe('number');
        expect(typeof post.id).toBe('number');
        expect(typeof post.title).toBe('string');
        expect(typeof post.body).toBe('string');
    });
});