export interface NoSQLDatabaseWrapper {
    find(query: object): Promise<any[]>;
    findOne(query: object): Promise<any>;
    insertOne(doc: any): void;
}