// MIT License
//
// Copyright (c) 2023 Feast
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
(function () {
    /**
     * Compatible array's existing types cache
     */
    const compatibles = (function () {
        const concat = Array.prototype.concat;
        const join = Array.prototype.join;
        return {
            concat: function (thisArg, ...items) {
                return concat.call(thisArg, ...items);
            },
            join: function (thisArg, separator) {
                return join.call(thisArg, separator);
            }
        };
    })();
    class Enumerable {
        [Symbol.iterator]() {
            return this;
        }
        next(...args) {
            return undefined;
        }
        return(value) {
            return undefined;
        }
        throw(e) {
            return undefined;
        }
        aggregate(seed, accumulator) {
            let tmp = seed;
            for (const item of this)
                tmp = accumulator(seed, item);
            return tmp;
        }
        all(predicate) {
            for (const item of this)
                if (!predicate(item))
                    return false;
            return true;
        }
        any(predicate) {
            return this.firstOrDefault(predicate) != null;
        }
        *append(element) {
            yield* this;
            yield element;
        }
        asEnumerable() {
            return this;
        }
        *chunk(size) {
            let chunk = new Array();
            for (const item of this) {
                if (chunk.length === size) {
                    yield chunk;
                    chunk = [];
                }
                chunk.push(item);
            }
            yield chunk;
        }
        *concat(source) {
            yield* this;
            yield* source;
        }
        contains(value, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            for (const item of this)
                if (comparer(value, item))
                    return true;
            return false;
        }
        count(predicate) {
            predicate !== null && predicate !== void 0 ? predicate : (predicate = () => true);
            let count = 0;
            for (const item of this)
                if (predicate(item))
                    count++;
            return count;
        }
        *distinct(comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            const stack = [];
            for (const item of this) {
                if (stack.findIndex((x) => comparer(x, item)) < 0) {
                    stack.push(item);
                }
            }
            yield* stack;
        }
        *distinctBy(keySelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            const stack = [];
            for (const item of this) {
                if (stack.findIndex((x) => comparer(keySelector(x), keySelector(item))) < 0) {
                    stack.push(item);
                }
            }
            yield* stack;
        }
        elementAt(index) {
            const ret = this.elementAtOrDefault(index);
            if (ret == null)
                throw 'Yield no result';
            return ret;
        }
        elementAtOrDefault(index) {
            for (const item of this) {
                if (index === 0)
                    return item;
                index--;
            }
            return null;
        }
        *except(source, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            const compares = [];
            for (const item of source) {
                compares.push(item);
            }
            for (const item of this) {
                if (compares.findIndex((x) => comparer(x, item)) < 0) {
                    yield item;
                    compares.push(item);
                }
            }
        }
        *exceptBy(source, keySelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            const compares = [];
            for (const item of source) {
                compares.push(item);
            }
            for (const item of this) {
                if (compares.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
                    yield item;
                    compares.push(item);
                }
            }
        }
        first(predicate) {
            const ret = this.firstOrDefault(predicate);
            if (ret == null)
                throw 'Yield no result';
            return ret;
        }
        firstOrDefault(predicate, defaultValue) {
            predicate !== null && predicate !== void 0 ? predicate : (predicate = () => true);
            if (typeof (predicate) != 'function') {
                defaultValue = predicate;
                predicate = () => true;
            }
            for (const item of this)
                if (predicate(item))
                    return item;
            return defaultValue;
        }
        *groupBy(keySelector, elementSelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            elementSelector !== null && elementSelector !== void 0 ? elementSelector : (elementSelector = (x) => x);
            if (elementSelector.length == 2) {
                comparer = elementSelector;
                elementSelector = (x) => x;
            }
            const groups = [];
            for (const item of this) {
                const key = keySelector(item);
                let cache = groups.find(x => comparer(x.key, key));
                if (!cache) {
                    cache = [];
                    cache.key = key;
                    groups.push(cache);
                }
                cache.push(elementSelector(item));
            }
            yield* groups;
        }
        *groupJoin(inner, keySelector, innerKeySelector, resultSelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            for (const item of this) {
                const key = keySelector(item);
                const stack = new Array();
                for (const innerItem of inner) {
                    const innerKey = innerKeySelector(innerItem);
                    if (comparer(key, innerKey)) {
                        stack.push(innerItem);
                    }
                }
                yield resultSelector(item, stack);
            }
        }
        *join(inner, keySelector, innerKeySelector, resultSelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            for (const item of this) {
                const key = keySelector(item);
                for (const innerItem of inner) {
                    const innerKey = innerKeySelector(innerItem);
                    if (comparer(key, innerKey)) {
                        yield resultSelector(item, innerItem);
                    }
                }
            }
        }
        last(predicate) {
            const ret = this.lastOrDefault(predicate);
            if (ret == null)
                throw 'Yield no result';
            return ret;
        }
        lastOrDefault(predicate, defaultValue) {
            predicate !== null && predicate !== void 0 ? predicate : (predicate = () => true);
            if (typeof (predicate) != 'function') {
                defaultValue = predicate;
                predicate = () => true;
            }
            let last = defaultValue;
            for (const item of this) {
                if (predicate(item))
                    last = item;
            }
            return last;
        }
        *order(comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = (left, right) => left - right);
            const stack = [];
            for (const item of this) {
                const index = stack.findIndex((x) => comparer(item, x) <= 0);
                if (index < 0) {
                    stack.push(item);
                }
                else {
                    stack.splice(index, 0, item);
                }
            }
        }
        *orderBy(keySelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = (left, right) => left - right);
            const stack = [];
            for (const item of this) {
                const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) <= 0);
                if (index < 0) {
                    stack.push(item);
                }
                else {
                    stack.splice(index, 0, item);
                }
            }
            yield* stack;
        }
        *orderByDescending(keySelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = (left, right) => left - right);
            const stack = [];
            for (const item of this) {
                const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) >= 0);
                if (index < 0) {
                    stack.push(item);
                }
                else {
                    stack.splice(index, 0, item);
                }
            }
            yield* stack;
        }
        *orderDescending(comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = (left, right) => left - right);
            const stack = [];
            for (const item of this) {
                const index = stack.findIndex(x => comparer(item, x) >= 0);
                if (index < 0) {
                    stack.push(item);
                }
                else {
                    stack.splice(index, 0, item);
                }
            }
            yield* stack;
        }
        *prepend(element) {
            yield element;
            yield* this;
        }
        *reverse() {
            const arr = [];
            for (const item of this) {
                arr.push(item);
            }
            while (arr.length > 0) {
                yield arr.pop();
            }
        }
        *select(selector) {
            let index = 0;
            for (const item of this) {
                yield selector(item, index++);
            }
        }
        *selectMany(selector) {
            for (const item of this) {
                for (let sub of selector(item)) {
                    yield sub;
                }
            }
        }
        single(predicate) {
            const ret = this.singleOrDefault(predicate);
            if (ret == null)
                throw 'Yield no result';
            return ret;
        }
        singleOrDefault(predicate, defaultValue) {
            predicate !== null && predicate !== void 0 ? predicate : (predicate = () => true);
            if (typeof (predicate) != 'function') {
                defaultValue = predicate;
                predicate = () => true;
            }
            let single = defaultValue;
            for (const item of this) {
                if (predicate(item)) {
                    if (single != null)
                        throw 'Duplicate item of single';
                    single = item;
                }
            }
            return single;
        }
        *skip(count) {
            for (const item of this) {
                count--;
                if (count < 0) {
                    yield item;
                }
            }
        }
        *skipLast(count) {
            const stack = [];
            for (const item of this) {
                stack.push(item);
                if (stack.length > count) {
                    yield stack.shift();
                }
            }
        }
        *skipWhile(predicate) {
            let start = false;
            for (const item of this) {
                if (start)
                    yield item;
                else if (predicate(item))
                    start = true;
            }
        }
        *take(count) {
            const start = Number.isInteger(count) ? 0 : count[0];
            const num = Number.isInteger(count) ? count : count[1] > 0 ? count[1] - start : count[1];
            let begin = 0;
            let accumulate = 0;
            if (num > 0) {
                for (const item of this) {
                    if (begin >= start) {
                        if (accumulate < num) {
                            yield item;
                            accumulate++;
                        }
                        if (accumulate >= num)
                            return;
                    }
                    begin++;
                }
                throw 'Not satisfied';
            }
            else {
                let queue = [];
                for (const item of this) {
                    if (begin >= start) {
                        queue.push(item);
                        if (queue.length >= -num) {
                            yield queue.shift();
                        }
                    }
                    begin++;
                }
            }
        }
        *takeLast(count) {
            const stack = [];
            for (const item of this) {
                stack.push(item);
                if (stack.length > count) {
                    stack.shift();
                }
            }
            yield* stack;
        }
        *takeWhile(predicate) {
            let index = 0;
            for (const item of this) {
                if (!predicate(item, index))
                    return;
                yield item;
                index++;
            }
        }
        toArray() {
            const ret = [];
            for (const item of this) {
                ret.push(item);
            }
            return ret;
        }
        toDictionary(keySelector, valueSelector) {
            let map = new Map();
            for (const item of this) {
                const key = keySelector(item);
                const value = valueSelector(item);
                if (map.has(key))
                    throw 'Duplicate dictionary key';
                map.set(key, value);
            }
            return map;
        }
        *union(source, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            const union = [];
            for (const item of this) {
                if (union.findIndex(x => comparer(x, item)) < 0) {
                    union.push(item);
                }
            }
            for (const item of source) {
                if (union.findIndex(x => comparer(x, item)) < 0) {
                    union.push(item);
                }
            }
            yield* union;
        }
        *unionBy(source, keySelector, comparer) {
            comparer !== null && comparer !== void 0 ? comparer : (comparer = Object.is);
            const union = [];
            for (const item of this) {
                if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
                    union.push(item);
                }
            }
            for (const item of source) {
                if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
                    union.push(item);
                }
            }
            yield* union;
        }
        *where(predicate) {
            let count = 0;
            for (const item of this) {
                if (predicate(item, count++))
                    yield item;
            }
        }
    }
    class PartialArrayLike extends Enumerable {
        *asEnumerable() {
            yield* this;
        }
    }
    class PartialArray extends PartialArrayLike {
        add(item) {
            this.push(item);
        }
        addRange(items) {
            for (const item of items) {
                this.push(item);
            }
        }
        *asEnumerable() {
            yield* this;
        }
        clear() {
            this.splice(0, this.length);
        }
        concat(...items) {
            if (arguments.length == 1) {
                const enumerable = arguments[0];
                // noinspection JSUnresolvedReference
                if (enumerable.__proto__.__proto__ == Generator) {
                    return this.asEnumerable().concat(enumerable);
                }
            }
            return compatibles.concat(this, ...items);
        }
        elementAt(index) {
            return this[index];
        }
        elementAtOrDefault(index, defaultValue) {
            var _a;
            return (_a = this[index]) !== null && _a !== void 0 ? _a : defaultValue;
        }
        exists(match) {
            return this.firstOrDefault(match) != null;
        }
        findAll(match) {
            return this.where(match).toArray();
        }
        getRange(start, count) {
            return this.slice(start, count + start);
        }
        insert(index, item) {
            this.splice(index, 0, item);
        }
        remove(item) {
            let index = this.findIndex((x) => Object.is(x, item));
            return index > -1 ? !!this.splice(index, 1) : false;
        }
        removeAll(match) {
            let index = 0, count = 0;
            while (index < this.length) {
                if (match(this[index])) {
                    this.splice(index, 1);
                    count++;
                }
                else {
                    index++;
                }
            }
            return count;
        }
        removeAt(index) {
            return this.splice(index, 1)[0];
        }
        toArray() {
            // @ts-ignore
            return this;
        }
        push(...items) {
            throw new Error("Method not implemented.");
        }
        join(inner, keySelector, innerKeySelector, resultSelector, comparer) {
            if (arguments.length == 5 || arguments.length == 4) {
                return this.asEnumerable().join(inner, keySelector, innerKeySelector, resultSelector, comparer);
            }
            return compatibles.join(this, inner);
        }
        splice(number, deleteCount, item) {
            throw new Error("Method not implemented.");
        }
        slice(start, number) {
            throw new Error("Method not implemented.");
        }
        findIndex(param) {
            throw new Error("Method not implemented.");
        }
    }
    class PartialMap extends Enumerable {
        containsKey(key) {
            return this.has(key);
        }
        containsValue(value) {
            for (const val of this.values()) {
                if (Object.is(val, value)) {
                    return true;
                }
            }
            return false;
        }
        tryAdd(key, value) {
            return !(this.has(key) || !this.set(key, value));
        }
        tryGetValue(key, valueGetter) {
            let ret = this.get(key);
            valueGetter(ret);
            return ret != null;
        }
        has(key) {
            throw new Error("Method not implemented.");
        }
        get(key) {
            throw new Error("Method not implemented.");
        }
        set(key, value) {
            throw new Error("Method not implemented.");
        }
        values() {
            throw new Error("Method not implemented.");
        }
    }
    // noinspection JSUnresolvedReference
    const Generator = (function* () {
        // @ts-ignore
    })().__proto__.__proto__;
    const excepts = Object.getOwnPropertyNames(Generator);
    function propertyNames(prototype) {
        return Object.getOwnPropertyNames(prototype).filter(x => excepts.find(y => x == y) == null);
    }
    function defineProperty(prototype, name, method, force = false) {
        if (prototype[name] != null) {
            if (!force || Object.keys(compatibles).findIndex(x => x == name) < 0) {
                return;
            }
        }
        Object.defineProperty(prototype, name, {
            value: method,
            writable: false
        });
    }
    const iterable = [
        Map.prototype,
        String.prototype,
        Array.prototype,
        Int8Array.prototype,
        Uint8Array.prototype,
        Uint8ClampedArray.prototype,
        Int16Array.prototype,
        Uint16Array.prototype,
        Int32Array.prototype,
        Uint32Array.prototype,
        Float32Array.prototype,
        Float64Array.prototype,
        BigInt64Array.prototype,
        BigUint64Array.prototype,
    ];
    propertyNames(PartialMap.prototype).forEach(name => {
        defineProperty(Map.prototype, name, PartialMap.prototype[name]);
    });
    propertyNames(PartialArray.prototype).forEach(name => {
        defineProperty(Array.prototype, name, PartialArray.prototype[name], true);
    });
    propertyNames(PartialArrayLike.prototype).forEach(name => {
        iterable.forEach(proto => {
            defineProperty(proto, name, PartialArrayLike.prototype[name]);
        });
    });
    propertyNames(Enumerable.prototype).forEach(name => {
        const method = Enumerable.prototype[name];
        defineProperty(Generator, name, method);
        iterable.forEach(proto => {
            defineProperty(proto, name, method);
        });
    });
    // @ts-ignore
    globalThis.List = Array;
})();
