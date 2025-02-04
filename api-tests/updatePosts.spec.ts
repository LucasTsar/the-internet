import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('update post with PUT and validate changes', async ({ request }) => {
    // Define the request payload
    const postId = 1;
    const updatedData = {
        id: postId,
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    // Send a PUT request to update a post
    const response = await request.put(`${baseUrl}/posts/${postId}`, {
        data: updatedData,
    });

    // Validate the response status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const updatedPost = await response.json();

    // Validate the response structure
    expect(updatedPost).toHaveProperty('id');
    expect(updatedPost).toHaveProperty('title');
    expect(updatedPost).toHaveProperty('body');
    expect(updatedPost).toHaveProperty('userId');

    // Validate that the response includes updated data
    expect(updatedPost.id).toBe(updatedData.id);
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
    expect(updatedPost.userId).toBe(updatedData.userId);
});

test('update post with PATCH and validate changes', async ({ request }) => {
    // Define the request payload
    const postId = 1;
    const patchData = {
        id: postId,
        title: 'foo',
    };

    // Send a PUT request to update a post
    const response = await request.patch(`${baseUrl}/posts/${postId}`, {
        data: patchData,
    });

    // Validate the response status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const updatedPost = await response.json();

    // Validate the response structure
    expect(updatedPost).toHaveProperty('id');
    expect(updatedPost).toHaveProperty('title');
    expect(updatedPost).toHaveProperty('body');
    expect(updatedPost).toHaveProperty('userId');

    // Validate that the response includes updated data
    expect(updatedPost.id).toBe(patchData.id);
    expect(updatedPost.title).toBe(patchData.title);
});