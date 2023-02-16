export class Post {
    constructor(
        private postId: string, 
        private creatorId: string, 
        private nameCreator: string,
        private emailCreator: string,
        private content: string, 
        private likes: number,
        private dislikes: number, 
        private postCreatedAt: string, 
        private postUpdatedAt: string
    ) {}

    public getPostId(): string {
        return this.postId
    }

    public setPostId(value: string): void {
        this.postId = value
    }

    public getCreatorId(): string{
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getNameCreator(): string{
        return this.nameCreator
    }
    
    public getEmailCreator(): string{
        return this.emailCreator
    }
    
    public getContent(): string{
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }
    
    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getPostCreatedAt(): string {
        return this.postCreatedAt
    }

    public setPostCreatedAt(value: string): void {
        this.postCreatedAt = value
    }

    public getPostUpdatedAt(): string{
        return this.postUpdatedAt
    }

    public setPostUpdatedAt(value: string): void {
        this.postUpdatedAt = value
    }
     
}