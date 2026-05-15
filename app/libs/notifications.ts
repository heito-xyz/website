// * Types
import type { Notification, NotificationTemplate, Group } from '~~/types/stores/notification';


export class StoreNotification {
    private data: Notification;

    constructor(notification: Notification) {
        this.data = notification;
    }

    public get id() {
        return this.data.id;
    }

    public get hidden() {
        return this.data.hidden;
    }

    public get createdAt() {
        return new Date(this.data.createdAt);
    }


    public get name() {
        return this.data?.name;
    }

    public get title() {
        return this.data?.title;
    }

    public get text() {
        return this.data?.text;
    }

    public get image() {
        return this.data?.image || null;
    }

    public get icon() {
        return this.data?.icon || null;
    }

    public get color() {
        return this.data?.color;
    }

    public get buttons() {
        return this.data?.buttons || [];
    }

    public get group() {
        return this.data?.group;
    }

    public get mode() {
        return this.data?.mode;
    }


    public hide() {
        this.data.hidden = true;
    }

    public show() {
        this.data.hidden = false;
    }
}

export class StoreGroup {
    readonly createdAt: Date;

    constructor(private group: Group, private dataNotifications: Notifications) {
        this.createdAt = new Date();
    }

    public get name() {
        return this.group.name;
    }

    public get label() {
        return this.group.label;
    }

    public get description() {
        return this.group.description;
    }

    public get picture() {
        if (!this.group.picture) return null;

        if (typeof this.group.picture === 'string') {
            const [type, ...value] = this.group.picture.split(':');

            return { type: type as 'icon' | 'image', value: value.join(':') as string };
        }

        return this.group.picture;
    }


    public get notifications() {
        return this.dataNotifications.filter(notification => {
            return notification.group === this.name;
        });
    }
}

export class StoreGroups extends Array<StoreGroup> {
    constructor(private dataNotifications: Notifications) {
        super();
    }

    create(group: Group) {
        const newGroup = new StoreGroup(group, this.dataNotifications);

        return newGroup;
    }
}

export class Notifications extends Array<StoreNotification> {
    private open: boolean = false;
    
    readonly groups: StoreGroups = new StoreGroups(this);

    constructor() {
        super();
    }


    public get isOpened() {
        return this.open;
    }


    public setOpen(bool?: boolean) {
        this.open = bool !== undefined ? bool : !this.open;
    }


    private getIndex(notifyId: number) {
        return this.findIndex(notify => notify.id === notifyId);
    }

    public has(notifyId: number) {
        return this.getIndex(notifyId) >= 0;
    }

    public get(notifyId: number) {
        return this.find(notify => notify.id === notifyId) || null;
    }


    private create(notification: Partial<NotificationTemplate>, hidden: boolean = false) {
        return new StoreNotification({
            ...notification,
            id: this.length,
            hidden,
            createdAt: Date.now()
        })
    }

    public add(notifications: Array<Partial<NotificationTemplate>>, hidden: boolean = false) {
        for (const notification of notifications) {
            this.push(this.create(notification, hidden));
        }

        return true;
    }


    public searchByName(name: string) {
        const index = this.findIndex(notify => notify.name === name);

        if (index < 0) throw null;

        return this[index];
    }


    public show(...notifyIds: Array<number>) {
        for (const notifyId of notifyIds) {
            const index = this.getIndex(notifyId);

            if (index < 0) continue;

            this[index]?.show();
        }

        return true;
    }

    public hide(...notifyIds: Array<number>) {
        for (const notifyId of notifyIds) {
            const index = this.getIndex(notifyId);

            if (index < 0) continue;

            this[index]?.hide();
        }

        return true;
    }

    public remove(...notifyIds: Array<number>) {
        for (const notifyId of notifyIds) {
            const index = this.getIndex(notifyId);

            if (index < 0) continue;

            this.splice(index, 1);
        }

        return true;
    }
}