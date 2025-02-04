import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('delete post', async ({ request }) => {
    const postId = 1; // Valid post ID
    const deleteResponse = await request.delete(`${baseUrl}/posts/${postId}`);
    expect(deleteResponse.status()).toBe(200);
});

test('delete post and validate that it was deleted', async ({ request }) => {
    const postId = 1; // Valid post ID
    const deleteResponse = await request.delete(`${baseUrl}/posts/${postId}`);
    expect(deleteResponse.status()).toBe(200);
    const getResponse = await request.get(`${baseUrl}/posts/${postId}`);
    expect(getResponse.status()).toBe(404); // IMPORTANT! THIS PART OF TEST WILL FAIL as resource will not be really updated on the server but it will be faked as if.
});