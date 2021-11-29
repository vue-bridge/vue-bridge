declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
    };
}, unknown, unknown, {
    model: {
        get(): string | undefined;
        set(v: string): void;
    };
}, {}, {
    computed: {
        $_attrs(): any;
        $_listeners(): any;
        $_class(): string;
        $_style(): string;
    };
} | {
    computed: {
        $_attrs(): Record<string, any>;
        $_listeners(): Record<string, () => void>;
        $_class(): any;
        $_style(): any;
    };
}, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
} & {} & {
    modelValue?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
