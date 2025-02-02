declare interface IEnumerable<T> extends Iterable<T> {

	/**
	 * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
	 * @param seed The initial accumulator value.
	 * @param accumulator An accumulator function to be invoked on each element.
	 */
	aggregate<TSeed, TReturn>(
		seed : TSeed,
		accumulator : (seed : TSeed, item : T) => TReturn) : TReturn;

	/**
	 * Determines whether all elements of a sequence satisfy a condition.
	 * @param predicate
	 */
	all(predicate : (item : T) => boolean) : boolean;

	/**
	 * Determines whether a sequence contains any elements.
	 */
	any() : boolean;

	/**
	 * Determines whether any element of a sequence satisfies a condition.
	 * @param predicate A function to test each element for a condition.
	 */
	any(predicate : (item : T) => boolean) : boolean;

	/**
	 * Appends a value to the end of the sequence.
	 * @param element The value to append to
	 */
	append(element : T) : IEnumerable<T>;

	/**
	 * Returns the input typed as enumerable.
	 */
	asEnumerable() : IEnumerable<T>;

	/**
	 * Splits the elements of a sequence into chunks of size at most
	 * @param size The maximum size of each chunk.
	 */
	chunk(size : number) : IEnumerable<Array<T>>;

	/**
	 * Concatenates two sequences.
	 * @param source The sequence to concatenate to the current.
	 */
	concat(source : IEnumerable<T>) : IEnumerable<T>;

	/**
	 * Determines whether a sequence contains a specified element by using the default equality comparer.
	 * @param value The value to locate in the sequence.
	 */
	contains(value : T) : boolean;

	/**
	 * Determines whether a sequence contains a specified element by using a specified comparer.
	 * @param value The value to locate in the sequence.
	 * @param comparer An equality comparer to compare values.
	 */
	contains(
		value : T,
		comparer? : (left : T, right : T) => boolean) : boolean;

	/**
	 * Returns the number of elements in a sequence.
	 */
	count() : number;

	/**
	 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
	 * @param predicate A function to test each element for a condition.
	 */
	count(predicate : (item : T) => boolean) : number;

	/**
	 * Returns distinct elements from a sequence by using the default equality comparer to compare values.
	 */
	distinct() : IEnumerable<T>;

	/**
	 * Returns distinct elements from a sequence by using a specified comparer to compare values.
	 * @param comparer A comparer to compare values.
	 */
	distinct(comparer : (left : T, right : T) => boolean) : IEnumerable<T>;

	/**
	 * Returns distinct elements from a sequence according to a specified key selector function.
	 * @param keySelector A function to extract the key for each element.
	 */
	distinctBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Returns distinct elements from a sequence according to a specified key selector function and using a specified
	 * comparer to compare keys.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer A comparer to compare keys.
	 */
	distinctBy<TKey>(
		keySelector : (item : T) => TKey,
		comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>;

	/**
	 * Returns the element at a specified index in a sequence.
	 * @param index The zero-based index of the element to retrieve.
	 */
	elementAt(index : number) : T;

	/**
	 * Returns the element at a specified index in a sequence.
	 * @param index The index of the element to retrieve, which is either from the beginning or the end of the sequence.
	 */
	elementAtOrDefault(index : number) : T | null;

	/**
	 * Produces the set difference of two sequences by using the default equality comparer to compare values.
	 * @param source An array whose elements that also occur in the first sequence will cause those elements to be
	 * removed from the returned sequence.
	 */
	except(source : IEnumerable<T>) : IEnumerable<T>;

	/**
	 * Produces the set difference of two sequences by using the specified comparer to compare values.
	 * @param source An array whose elements that also occur in the first sequence will cause those elements to be
	 * removed from the returned sequence.
	 * @param comparer A comparer to compare values.
	 */
	except(
		source : IEnumerable<T>,
		comparer? : (left : T, right : T) => boolean) : IEnumerable<T>;

	/**
	 * Produces the set difference of two sequences according to a specified key selector function.
	 * @param source An source whose keys that also occur in the first sequence will cause those elements to be removed
	 * from the returned sequence.
	 * @param keySelector A function to extract the key for each element.
	 */
	exceptBy<TKey>(
		source : IEnumerable<T>,
		keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Produces the set difference of two sequences according to a specified key selector function.
	 * @param source An source whose keys that also occur in the first sequence will cause those elements to be removed
	 * from the returned sequence.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer The comparer to compare values.
	 */
	exceptBy<TKey>(
		source : IEnumerable<T>,
		keySelector : (item : T) => TKey,
		comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>;

	/**
	 * Returns the first element of a sequence.
	 */
	first() : T;

	/**
	 * Returns the first element in a sequence that satisfies a specified condition.
	 * @param predicate A function to test each element for a condition.
	 */
	first(predicate : (item : T) => boolean) : T;

	/**
	 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
	 */
	firstOrDefault() : T | null;

	/**
	 * Returns the first element of a sequence, or a specified default value if the sequence contains no elements.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	firstOrDefault(defaultValue : T) : T | null;

	/**
	 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
	 * @param predicate A function to test each element for a condition.
	 */
	firstOrDefault(predicate : (item : T) => boolean) : T | null;

	/**
	 * Returns the first element of the sequence that satisfies a condition, or a specified default value if no such element is found.
	 * @param predicate A function to test each element for a condition.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	firstOrDefault(
		predicate : (item : T) => boolean,
		defaultValue : T) : T | null;

	/**
	 * Groups the elements of a sequence according to a specified key selector function.
	 * @param keySelector A function to extract the key for each element.
	 */
	groupBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<Array<T> & { key : TKey }>;

	/**
	 * Groups the elements of a sequence according to a specified key selector function and compares the keys by using a specified comparer.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer A comparer to compare keys.
	 */
	groupBy<TKey>(
		keySelector : (item : T) => TKey,
		comparer : (left : TKey, right : TKey) => boolean) : IEnumerable<Array<T> & { key : TKey }>;

	/**
	 * Groups the elements of a sequence according to a specified key selector function and projects the elements for
	 * each group by using a specified function.
	 * @param keySelector A function to extract the key for each element.
	 * @param elementSelector A function to map each source element to an element in the source.
	 */
	groupBy<TKey, TElement>(
		keySelector : (item : T) => TKey,
		elementSelector : (item : T) => TElement) : IEnumerable<Array<TElement> & { key : TKey }>;

	/**
	 * Groups the elements of a sequence according to a key selector function. The keys are compared by using a comparer
	 * and each group's elements are projected by using a specified function.
	 * @param keySelector A function to extract the key for each element.
	 * @param elementSelector A function to map each source element to an element in the source.
	 * @param comparer A comparer to compare keys.
	 */
	groupBy<TKey, TElement>(
		keySelector : (item : T) => TKey,
		elementSelector : (item : T) => TElement,
		comparer : (left : TKey, right : TKey) => boolean) : IEnumerable<Array<TElement> & { key : TKey }>;

	/**
	 * Correlates the elements of two sequences based on equality of keys and groups the results. The default equality
	 * comparer is used to compare keys.
	 * @param inner The sequence to join to the sequence.
	 * @param keySelector A function to extract the join key from each element of the source sequence.
	 * @param innerKeySelector A function to extract the join key from each element of the inner sequence.
	 * @param resultSelector A function to create a result element from an element from the first sequence and a collection
	 * of matching elements from the second sequence.
	 */
	groupJoin<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : T) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : T, inner : Array<TInner>) => TResult) : IEnumerable<TResult>;

	/**
	 * Correlates the elements of two sequences based on equality of keys and groups the results. A specified comparer
	 * is used to compare keys.
	 * @param inner The sequence to join to the sequence.
	 * @param keySelector A function to extract the join key from each element of the source sequence.
	 * @param innerKeySelector A function to extract the join key from each element of the inner sequence.
	 * @param resultSelector A function to create a result element from an element from the first sequence and a collection
	 * of matching elements from the second sequence.
	 * @param comparer A comparer to hash and compare keys.
	 */
	groupJoin<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : T) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : T, inner : Array<TInner>) => TResult,
		comparer : (outerKey : TKey, innerKey : TKey) => boolean) : IEnumerable<TResult>;

	/**
	 * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
	 * @param inner The sequence to join to the sequence.
	 * @param keySelector A function to extract the join key from each element of the source sequence.
	 * @param innerKeySelector A function to extract the join key from each element of the inner sequence.
	 * @param resultSelector A function to create a result element from two matching elements.
	 */
	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : T) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : T, inner : TInner) => TResult) : IEnumerable<TResult>;

	/**
	 * Correlates the elements of two sequences based on matching keys. A specified comparer is used to compare keys.
	 * @param inner The sequence to join to the sequence.
	 * @param keySelector A function to extract the join key from each element of the source sequence.
	 * @param innerKeySelector A function to extract the join key from each element of the inner sequence.
	 * @param resultSelector A function to create a result element from two matching elements.
	 * @param comparer A comparer to hash and compare keys.
	 */
	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : T) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : T, inner : TInner) => TResult,
		comparer : (outerKey : TKey, innerKey : TKey) => boolean) : IEnumerable<TResult>;

	/**
	 * Returns the last element of a sequence.
	 */
	last() : T;

	/**
	 * Returns the last element of a sequence that satisfies a specified condition.
	 * @param predicate A function to test each element for a condition.
	 */
	last(predicate : (item : T) => boolean) : T;

	/**
	 * Returns the last element of a sequence, or a default value if the sequence contains no elements.
	 */
	lastOrDefault() : T | null;

	/**
	 * Returns the last element of a sequence, or a specified default value if the sequence contains no elements.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	lastOrDefault(defaultValue : T) : T | null;

	/**
	 * Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.
	 * @param predicate A function to test each element for a condition.
	 */
	lastOrDefault(predicate : (item : T) => boolean) : T | null;

	/**
	 * Returns the last element of a sequence that satisfies a condition, or a specified default value if no such element is found.
	 * @param predicate A function to test each element for a condition.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	lastOrDefault(
		predicate : (item : T) => boolean,
		defaultValue : T) : T | null;

	/**
	 * Sorts the elements of a sequence in ascending order.
	 */
	order() : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in ascending order.
	 * @param comparer A comparer to compare keys.
	 */
	order(comparer : (current : T, exist : T) => number) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in ascending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 */
	orderBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in ascending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 * @param comparer A comparer to compare keys.
	 */
	orderBy<TKey>(
		keySelector : (item : T) => TKey,
		comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order.
	 */
	orderDescending() : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order.
	 * @param comparer A comparer to compare keys.
	 */
	orderDescending(comparer : (current : T, exist : T) => number) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 */
	orderByDescending<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 * @param comparer A comparer to compare keys.
	 */
	orderByDescending<TKey>(
		keySelector : (item : T) => TKey,
		comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;

	/**
	 * Adds a value to the beginning of the sequence.
	 * @param element The value to prepend to
	 */
	prepend(element : T) : IEnumerable<T>;

	/**
	 * Inverts the order of the elements in a sequence.
	 */
	reverse() : IEnumerable<T>;

	/**
	 * Projects each element of a sequence into a new form by incorporating the element's index.
	 * @param selector A transform function to apply to each element.
	 */
	select<TReturn>(selector : (item : T) => TReturn) : IEnumerable<TReturn>;

	/**
	 * Projects each element of a sequence into a new form by incorporating the element's index.
	 * @param selector A transform function to apply to each element. The second parameter of the function
	 * represents the index of the source element.
	 */
	select<TReturn>(selector : (item : T, index : number) => TReturn) : IEnumerable<TReturn>;

	/**
	 * Projects each element of a sequence to an array and flattens the resulting sequences into one sequence.
	 * @param selector A transform function to apply to each element.
	 */
	selectMany<TReturn>(selector : (item : T) => IEnumerable<TReturn>) : IEnumerable<TReturn>;

	/**
	 * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than
	 * one such element exists.
	 */
	single() : T;

	/**
	 * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than
	 * one such element exists.
	 * @param predicate A function to test an element for a condition.
	 */
	single(predicate : (item : T) => boolean) : T;

	/**
	 * Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception
	 * if there is more than one element in the sequence.
	 */
	singleOrDefault() : T | null;

	/**
	 * Returns the only element of a sequence, or a specified default value if the sequence is empty; this method throws
	 * an exception if there is more than one element in the sequence.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	singleOrDefault(defaultValue : T) : T | null;

	/**
	 * Returns the only element of a sequence, or a specified default value if the sequence is empty; this method throws
	 * an exception if there is more than one element in the sequence.
	 * @param predicate A function to test an element for a condition.
	 */
	singleOrDefault(predicate : (item : T) => boolean) : T | null;

	/**
	 * Returns the only element of a sequence that satisfies a specified condition, or a specified default value if no
	 * such element exists; this method throws an exception if more than one element satisfies the condition.
	 * @param predicate A function to test an element for a condition.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	singleOrDefault(
		predicate : (item : T) => boolean,
		defaultValue : T) : T | null;

	/**
	 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
	 * @param count The number of elements to skip before returning the remaining elements.
	 */
	skip(count : number) : IEnumerable<T>;

	/**
	 * Returns a new enumerable collection that contains the elements from source with the last count elements of the
	 * source collection omitted.
	 * @param count The number of elements to omit from the end of the collection.
	 */
	skipLast(count : number) : IEnumerable<T>;

	/**
	 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
	 * @param predicate A function to test each element for a condition.
	 */
	skipWhile(predicate : (item : T) => boolean) : IEnumerable<T>;

	/**
	 * Returns a specified number of contiguous elements from the start of a sequence.
	 * @param count The number of elements to return
	 */
	take(count : number) : IEnumerable<T>;

	/**
	 * Returns a specified number of contiguous elements from the start of a sequence.
	 * @param range The range of elements to return, which has start and end indexes either from the beginning or the
	 * end of the sequence.
	 */
	take(range : [start : number, end : number]) : IEnumerable<T>;

	/**
	 * Returns a new enumerable collection that contains the last count elements from source.
	 * @param count The number of elements to take from the end of the collection.
	 */
	takeLast(count : number) : IEnumerable<T>;

	/**
	 * Returns elements from a sequence as long as a specified condition is true.
	 * @param predicate A function to test each element for a condition.
	 */
	takeWhile(predicate : (item : T) => boolean) : IEnumerable<T>;

	/**
	 * Returns elements from a sequence as long as a specified condition is true.
	 * @param predicate A function to test each element for a condition. The second parameter of the function
	 * represents the index of the source element.
	 */
	takeWhile(predicate : (item : T, index : number) => boolean) : IEnumerable<T>;

	/**
	 * Creates an array from an enumerable.
	 */
	toArray() : Array<T>;

	/**
	 * Creates a Map from an enumerable according to specified key selector and element selector functions.
	 * @param keySelector A function to extract a key from each element.
	 * @param valueSelector A transform function to produce a result element value from each element.
	 */
	toDictionary<K, V>(keySelector : (item : T) => K, valueSelector : (item : T) => V) : Map<K, V>;

	/**
	 * Produces the set union of two sequences by using a specified comparer.
	 * @param source An enumerable whose distinct elements form the second set for the union.
	 * @param comparer The comparer to compare values.
	 */
	union(source : IEnumerable<T>, comparer? : (left : T, right : T) => boolean) : IEnumerable<T>;

	/**
	 * Produces the set union of two sequences according to a specified key selector function.
	 * @param source An enumerable whose distinct elements form the second set for the union.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer The comparer to compare values.
	 */
	unionBy<TKey>(
		source : IEnumerable<T>, keySelector : (item : T) => TKey,
		comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>;

	/**
	 * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
	 * @param predicate A function to test each source element for a condition;
	 */
	where(predicate : (item : T) => boolean) : IEnumerable<T>;

	/**
	 * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
	 * @param predicate A function to test each source element for a condition; The second parameter of the function
	 * represents the index of the source element.
	 */
	where(predicate : (item : T, index : number) => boolean) : IEnumerable<T>;
}

declare interface Array<T> {

	/**
	 * Adds the given object to the end of this list. The size of the list is
	 * increased by one. If required, the capacity of the list is doubled
	 * before adding the new element.
	 * @param item
	 */
	add(item : T) : void

	/**
	 * Adds the elements of the given collection to the end of this list. If
	 * required, the capacity of the list is increased to twice the previous
	 * capacity or the new size, whichever is larger.
	 * @param items
	 */
	addRange(items : IEnumerable<T>) : void

	/**
	 * Clears the contents of List.
	 */
	clear() : void

	/**
	 * Determines whether the array contains elements that match the conditions defined by the specified predicate.
	 * @param match The delegate that defines the conditions of the elements to search for.
	 */
	exists(match : (item : T) => boolean) : boolean

	/**
	 * Retrieves all the elements that match the conditions defined by the specified predicate.
	 * @param match The delegate that defines the conditions of the elements to search for.
	 */
	findAll(match : (item : T) => boolean) : Array<T>

	/**
	 * Creates a shallow copy of a range of elements in the source.
	 * @param start The zero-based index at which the range starts.
	 * @param count The number of elements in the range.
	 */
	getRange(start : number, count : number) : Array<T>

	/**
	 * Inserts an element into the array at the specified index.
	 * @param index The zero-based index at which item should be inserted.
	 * @param item The object to insert. The value can be null for reference types.
	 */
	insert(index : number, item : T) : void

	/**
	 * Removes the first occurrence of a specific object from the array.
	 * @param item The object to remove from the array. The value can be null for reference types.
	 */
	remove(item : T) : boolean

	/**
	 * Removes all the elements that match the conditions defined by the specified predicate.
	 * @param match The delegate that defines the conditions of the elements to remove.
	 */
	removeAll(match : (item : T) => boolean) : void

	/**
	 * Removes the element at the specified index of the array.
	 * @param index The zero-based index of the element to remove.
	 */
	removeAt(index : number) : T | undefined
}

declare class List<T> extends Array<T> {}

declare interface Map<K, V> extends IEnumerable<[K, V]> {

	/**
	 * Determines whether the Dictionary<TKey,TValue> contains the specified key.
	 * @param key The key to locate in the Map<K,V>.
	 */
	containsKey(key : K) : boolean;

	/**
	 * Determines whether the Dictionary<TKey,TValue> contains a specific value.
	 * @param value The value to locate in the Map<K,V>.
	 */
	containsValue(value : V) : boolean;

	/**
	 * Attempts to add the specified key and value to the dictionary.
	 * @param key The key of the element to add.
	 * @param value The value of the element to add. It can be null.
	 */
	tryAdd(key : K, value : V) : boolean;

	/**
	 * Gets the value associated with the specified key.
	 * @param key The key of the value to get.
	 * @param valueGetter When this method returns, contains the value associated with the specified key, if the key is found;
	 * otherwise, the default value for the type of the value parameter. This parameter is passed uninitialized.
	 */
	tryGetValue(key : K, valueGetter : (value : V) => void) : boolean;
}


// #region Extended Compatible
declare interface RelativeIndexable<T> extends IEnumerable<T> {
	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : T) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : T, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface ConcatArray<T> extends IEnumerable<T> {
	concat(source : IEnumerable<T>) : IEnumerable<T>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string | undefined,
		keySelector? : (item : T) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : T, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface ReadonlyArray<T> {
	concat(source : IEnumerable<T>) : IEnumerable<T>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string | undefined,
		keySelector? : (item : T) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : T, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Array<T> {
	concat(source : IEnumerable<T>) : IEnumerable<T>

	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : T) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : T, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult>

}

declare interface Int8Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : number) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Uint8Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : number) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Uint8ClampedArray {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : number) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Int16Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : number) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Uint16Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : number) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Int32Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner? : IEnumerable<TInner> | string,
		keySelector? : (item : number) => TKey,
		innerKeySelector? : (item : TInner) => TKey,
		resultSelector? : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult> | string
}

declare interface Uint32Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : number) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult>

}

declare interface Float32Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : number) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult>

}

declare interface Float64Array {
	concat(source : IEnumerable<number>) : IEnumerable<number>

	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : number) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : number, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult>

}

declare interface BigInt64Array {
	concat(source : IEnumerable<bigint>) : IEnumerable<bigint>

	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : bigint) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : bigint, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult>

}

declare interface BigUint64Array {
	concat(source : IEnumerable<bigint>) : IEnumerable<bigint>

	join<TInner, TKey, TResult>(
		inner : IEnumerable<TInner>,
		keySelector : (item : bigint) => TKey,
		innerKeySelector : (item : TInner) => TKey,
		resultSelector : (outer : bigint, inner : TInner) => TResult,
		comparer? : ((outerKey : TKey, innerKey : TKey) => boolean)) : IEnumerable<TResult>

}

// #region Extended Compatible


