import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('GET /posts validate 200 OK status code', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/`);
    expect(response.status()).toBe(200);
});

test('GET /posts response contains an array of posts with the correct structure', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/`);
    expect(response.headers()['content-type']).toContain('application/json');
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    posts.forEach(post => {
        expect(post).toHaveProperty('userId');
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
        expect(typeof post.userId).toBe('number');
        expect(typeof post.id).toBe('number');
        expect(typeof post.title).toBe('string');
        expect(typeof post.body).toBe('string');
    });
});

test('should return a valid post for a valid ID', async ({ request }) => {
    const postId = 1; // Valid post ID
    const response = await request.get(`${baseUrl}/posts/${postId}`);
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post.id).toBe(postId);
});

test('should return a 404 error for an invalid or non-existent post ID', async ({ request }) => {
    const postId = 111; // Non-existent post ID
    const response = await request.get(`${baseUrl}/posts/${postId}`);
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toEqual({});
});