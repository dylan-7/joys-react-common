/**
 * 从后台返回的json数据转换为本地class
 *
 */
export declare class Result {
    status: number;
    message: string;
    data: any;
    state: AjaxState;
    constructor(json: any);
}
/**
 * 提交数据到后台
 * 会将moment date 转为时间戳
 */
export declare class Post {
    constructor(data: any);
}
export declare enum AjaxState {
    成功 = 0,
    警告 = 1,
    失败 = 2,
    错误 = 3,
}
