export type User = {
    id: string;
    created_at: string;
    bio: string;
    image: string;
    username: string;
    followerName: string;
}

export type Posts = {
    id: number,
    created_at: string,
    posterId: string,
    caption: string,
    url: string,
    posterImg: string,
    posterUsername: string,

}

export interface Follower {
    id: string;
    created_at: string;
    followerId: string
    followingId: string 
    followerName: string
}