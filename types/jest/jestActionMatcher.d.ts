declare global  {
    namespace jest {
        interface Matchers<R> {
            matchAction: any;
        }
    }
}
declare const _default: ((this: any, received: any, expected?: any) => {
    pass: boolean;
    message(): string;
}) & {
    actions: any;
    init: any;
    isNot: any;
};
export default _default;
export {};
