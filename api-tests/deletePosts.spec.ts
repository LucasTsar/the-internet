import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('delete post', async ({ request }) => {
    // Send a DELETE request to delete a post
    const postId = 1; // Valid post ID
    const deleteResponse = await request.delete(`${baseUrl}/posts/${postId}`);
    
    // Validate the response status code
    expect(deleteResponse.status()).toBe(200);
});

test('delete post and validate that it was deleted', async ({ request }) => {
    // Send a DELETE request to delete a post
    const postId = 1; // Valid post ID
    const deleteResponse = await request.delete(`${baseUrl}/posts/${postId}`);
    
    // Validate the response status code
    expect(deleteResponse.status()).toBe(200);

    // Check that the post is deleted by sending a GET request
    const getResponse = await request.get(`${baseUrl}/posts/${postId}`);

    // Validate that the GET request returns a 404 Not Found status
    expect(getResponse.status()).toBe(404); // IMPORTANT! THIS PART OF TEST WILL FAIL as resource will not be really updated on the server but it will be faked as if.
});