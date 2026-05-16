interface HeaderOptions {
    padding?: string;
}

type PageFlag = 'header:hide' | 'footer:hide';

interface PageEmbed {

}


declare module '#app' {
    interface PageMeta {
        label?: string;
        icon?: string;
        image?: string;
        description?: string;
        index?: number;
        parent?: string;
        
        header?: HeaderOptions;
        flags?: Array<PageFlag>;
    }
}


export {}