export interface Link {
    label: string;
    text?: string;
    icon?: string;
    img?: string;
    url: string;

    updatedAt?: string;
    addedAt?: string;
}

export interface Member {
    member: string;
    permission: number;
    
    updatedAt: string;
    joinedAt: string;
}

export interface ProjectRepository {
    label: string;
    url: string;
}

export interface Project {
    name: string;
    displayName?: string;

    private?: boolean;

    image?: string;
    banner?: string;

    description?: string;
    color?: string;

    links: Array<Link>;
    members: Array<Member>;
    repos: Array<ProjectRepository>;
    tags: Array<string>;

    updatedAt: string;
    createdAt: string;
}