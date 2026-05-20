export interface BlogContent {}

export interface Blog {
    name: string;
    title: string;
    description: string;
    image: string;
    
    author: string;

    category: string;
    tags: Array<string>;

    content: BlogContent;

    updatedAt: string;
    createdAt: string;
}