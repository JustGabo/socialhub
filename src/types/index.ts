export type User = {
    id: string;
    created_at: string;
    bio: string;
    image: string;
    username: string;
}

export type Posts = {
    id: number,
    created_at: string,
    posterId: string,
    caption: string,
    url: string,
}