import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('update post with PUT and validate changes', async ({ request }) => {
    const postId = 1;
    const updatedData = {
        id: postId,
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    const response = await request.put(`${baseUrl}/posts/${postId}`, {
        data: updatedData,
    });

    expect(response.status()).toBe(200);
    const updatedPost = await response.json();
    expect(updatedPost).toHaveProperty('id');
    expect(updatedPost).toHaveProperty('title');
    expect(updatedPost).toHaveProperty('body');
    expect(updatedPost).toHaveProperty('userId');
    expect(updatedPost.id).toBe(updatedData.id);
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
    expect(updatedPost.userId).toBe(updatedData.userId);
});

test('update post with PATCH and validate changes', async ({ request }) => {
    const postId = 1;
    const patchData = {
        id: postId,
        title: 'foo',
    };
    const response = await request.patch(`${baseUrl}/posts/${postId}`, {
        data: patchData,
    });
    expect(response.status()).toBe(200);
    const updatedPost = await response.json();
    expect(updatedPost).toHaveProperty('id');
    expect(updatedPost).toHaveProperty('title');
    expect(updatedPost).toHaveProperty('body');
    expect(updatedPost).toHaveProperty('userId');
    expect(updatedPost.id).toBe(patchData.id);
    expect(updatedPost.title).toBe(patchData.title);
});