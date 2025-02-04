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

test('should return a valid post for a valid ID', async ({ request }) => {
    // Send a GET request with a valid post ID (from 1 to 100)
    const postId = 1; // Valid post ID
    const response = await request.get(`${baseUrl}/posts/${postId}`);

    // Validate the response status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const post = await response.json();

    // Validate the response structure
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');

    // Validate the post ID matches the requested ID
    expect(post.id).toBe(postId);
});

test('should return a 404 error for an invalid or non-existent post ID', async ({ request }) => {
    // Send a GET request with an invalid post ID (more than 100)
    const postId = 111; // Non-existent post ID
    const response = await request.get(`${baseUrl}/posts/${postId}`);

    // Validate the response status code
    expect(response.status()).toBe(404);

    // Validate the response body
    const responseBody = await response.json();
    expect(responseBody).toEqual({}); // JSONPlaceholder returns an empty object for 404
});