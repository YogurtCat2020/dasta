import { Container, Mass } from '@yogurtcat/lib';
export default class Component extends Container<any, any> {
    protected readonly container: Mass;
    protected allow: boolean;
    constructor(args?: object);
    protected relocate(key: any): [Container<any, any>, any];
    merge(args: any): Container<any, any>;
    get $(): object;
    protected get $context(): any;
    protected get $contextName(): any;
    protected get $props(): object;
    protected $data(context?: any, contextName?: string): Function;
    protected $render(context?: any, contextName?: string): Function;
    decor(...args: any[]): Component;
    protected static regData(obj: any): boolean;
    static funcData(obj: any, context?: any, contextName?: string): Function;
    static codeData(obj: any): string;
    protected static regRender(obj: any): boolean;
    static funcRender(obj: any, context?: any, contextName?: string): Function;
    static codeRender(obj: any): string;
}
