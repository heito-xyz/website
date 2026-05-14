interface HeaderOptions {
    padding?: string;
}

type PageFlag = 'header:hide' | 'footer:hide';


declare module '#app' {
    interface PageMeta {
        header?: HeaderOptions;
        flags?: Array<PageFlag>;
    }
}


export {}