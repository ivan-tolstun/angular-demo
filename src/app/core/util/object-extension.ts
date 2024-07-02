export class ObjectExtension {

    private constructor() {}

    public static deepClone(object: any): any {
        if (Array.isArray(object)) return object.map(item => ObjectExtension.deepClone(item));
        else {
            if (typeof object === 'object' && object !== null) {
                const clonedObject: any = {}
                for (const key in object) clonedObject[key] = ObjectExtension.deepClone(object[key]);
                return clonedObject
            }
            else return object
        }
    }

    public static buildString(object: any,
                              rule: string): string {
        let result = rule
        ObjectExtension.extractStringInBraces(rule)
            .forEach(path=> {
                const value = this.getValueByPath(object, path)
                if (value != null) result = result.replace("{" + path + "}", value)
                else result = result.replace("{" + path + "}", "")
            })
        return result
    }

    private static extractStringInBraces(text: string): string[] {
        const regex = /{([^}]*)}/g;
        const matches = text.match(regex)
        if (matches) return matches.map(match => match.slice(1, -1));
        else return []
    }

    public static getValueByPath(object: any,
                                 path: string): any {
        let clonedObject = ObjectExtension.deepClone(object);
        const keys = path.split('.')
        for (const key of keys) {
            if (typeof clonedObject === 'object' && clonedObject !== null) clonedObject = clonedObject[key]
            else return undefined
        }
        return clonedObject
    }

    public static deepEqual(obj1: any, obj2: any): boolean {
        if (typeof obj1 !== typeof obj2) return false
        if (typeof obj1 !== 'object' || obj1 === null) return obj1 === obj2
        if (Array.isArray(obj1)) {
            if (!Array.isArray(obj2) || obj1.length !== obj2.length) return false
            for (let i = 0; i < obj1.length; i++) {
                if (!ObjectExtension.deepEqual(obj1[i], obj2[i])) return false
            }
            return true
        }
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false
        for (const key of keys1) {
            if (!ObjectExtension.deepEqual(obj1[key], obj2[key])) return false
        }
        return true
    }

    public static stringToEnum<T>(enumObj: T,
                                  str: string): T[keyof T] | undefined {
        const keys = Object.keys(enumObj as any).filter(k => typeof enumObj[k as keyof T] === 'string')
        const foundKey = keys.find(key => enumObj[key as keyof T] === str)
        return foundKey ? enumObj[foundKey as keyof T] : undefined
    }

}