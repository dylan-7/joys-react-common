declare global  {
    namespace jest {
        interface Matchers<R> {
            matchAPI: any;
        }
    }
}
declare const _default: ((this: any, received: any, expected?: any) => {
    pass: boolean;
    message(): string;
}) & {
    params: any;
    init: any;
    isNot: any;
};
export default _default;
export {};
