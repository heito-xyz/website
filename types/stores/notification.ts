export type Mode = 'default' | 'fixed';

export type Picture = `icon:${string}` | `image:${string}` | {
    type: 'icon' | 'image';
    value: string;
}

export interface Button {
    label: string;
    text?: string;
    icon?: string;
    click?(event: MouseEvent): void;
}

export interface Group {
    name: string;
    label: string;
    description: string;
    picture: Picture;
}

export interface NotificationTemplate {
    name: string;
    title: string;
    text: string;
    image: string;
    icon: string;
    color: string;
    buttons: Array<Button>;
    group: string;
    mode: Mode;
}

export interface Notification extends Partial<NotificationTemplate> {
    id: number;
    hidden: boolean;
    createdAt: number;
}