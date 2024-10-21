const FragmentType = Symbol.for("react.fragment");
const ElementType = Symbol.for("react.element");
Object.freeze([
    ElementType,
    FragmentType
]);
const getJsxElementType = (type)=>typeof type === 'symbol' ? type : ElementType;
const createJsxElement = (type, props, key, parent, ref)=>({
        $$typeof: getJsxElementType(type),
        type,
        props,
        key,
        ref,
        _owner: parent
    });
const getJsxParent = (internals)=>internals?.ReactCurrentOwner?.current;
const getJsxInternals = (store)=>store?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const ResevedPropNames = Object.freeze({
    key: undefined,
    ref: undefined,
    __self: undefined,
    __source: undefined
});
const existsJsxKey = (key)=>key !== undefined;
const getJsxPropsKey = (props)=>props.key;
const existsJsxPropsKey = (props)=>getJsxPropsKey(props) !== undefined;
const getJsxPropNames = (props)=>Object.getOwnPropertyNames(props);
const getJsxPropsRef = (props)=>props.ref;
const existsJsxPropsRef = (props)=>getJsxPropsRef(props) !== undefined;
const existsJsxPropValue = (props, propName)=>props[propName] !== undefined;
const isReservedJsxPropName = (propName)=>propName in ResevedPropNames;
const setJsxPropValue = (props, propName, propValue)=>props[propName] = propValue;
const copyJsxProp = (sourceProps)=>(targetProps, propName)=>{
        setJsxPropValue(targetProps, propName, sourceProps[propName]);
        return targetProps;
    };
const copyDefaultJsxProps = (sourceProps, targetProps)=>getJsxPropNames(sourceProps).filter((propName)=>!existsJsxPropValue(targetProps, propName)).reduce(copyJsxProp(sourceProps), targetProps);
const copyValidJsxProps = (sourceProps, targetProps = {})=>getJsxPropNames(sourceProps).filter((propName)=>!isReservedJsxPropName(propName)).reduce(copyJsxProp(sourceProps), targetProps);
const resolveJsxPropsKey = (props, maybeKey)=>existsJsxPropsKey(props) && getJsxPropsKey(props).toString() || existsJsxKey(maybeKey) && maybeKey.toString() || null;
const resolveJsxPropsRef = (props)=>existsJsxPropsRef(props) && getJsxPropsRef(props) || null;
const resolveJsxProps = (initialProps, type)=>type && type.defaultProps ? copyDefaultJsxProps(type.defaultProps, copyValidJsxProps(initialProps)) : copyValidJsxProps(initialProps);
const getJsxLegacyChildren = (children)=>children?.length == 1 ? children[0] : children;
const emptyLegacyJsxChildren = (children)=>!children || children.length === 0;
const compileJsxExpression = (type, props, maybeKey)=>createJsxElement(type, resolveJsxProps(props, type), resolveJsxPropsKey(props, maybeKey), getJsxParent(getJsxInternals(globalThis["React"])), resolveJsxPropsRef(props));
const compileLegacyJsxExpression = (type, props, ...children)=>emptyLegacyJsxChildren(children) ? compileJsxExpression(type, props ?? {}) : compileJsxExpression(type, {
        ...props ?? {},
        children: getJsxLegacyChildren(children)
    });
export { FragmentType as Fragment };
export { compileJsxExpression as jsx };
export { compileJsxExpression as jsxs };
export { compileLegacyJsxExpression as legacyJsx };
