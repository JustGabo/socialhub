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
    followerImg: string
}

export interface Comment{
    id: number;
    postComment: number;
    posterId: string 
    content: string;
    posterName: string;
}

export interface Like{
    id: number;
    likedPostId: number;
    likerId: string;
    likerName: string;
    likerImg: string;
}