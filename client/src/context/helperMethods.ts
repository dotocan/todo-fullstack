import { TodoItem, Filter, OrderBy, OrderDirection } from "../models/models";

export const updateTodoInItems = (updatedItem: TodoItem, items: TodoItem[]) => {
    return items.map((item: TodoItem) => {
        if (item.id.toString() === updatedItem.id.toString()) {
            // Whether or not item is selected in list is not preserved on the server.
            // After updating item and receiving updated object from the server,
            // we need to manually set selected status to what it was before updating
            updatedItem.selected = item.selected;
            return updatedItem;
        }

        return item;
    });
};

export const removeDeletedItemFromArray = (
    deletedItem: TodoItem,
    items: TodoItem[]
): TodoItem[] => {
    return items.filter((item: TodoItem) => {
        return item.id.toString() !== deletedItem.id.toString();
    });
};

export const removeDeletedItemsFromArray = (
    deletedItems: TodoItem[],
    items: TodoItem[]
): TodoItem[] => {
    const removedIds = deletedItems.map((deletedItem: TodoItem) => {
        return deletedItem.id;
    });

    return items.filter((item: TodoItem) => {
        return !removedIds.includes(item.id);
    });
};

export const doToggleSelected = (itemToToggle: TodoItem, items: TodoItem[]) => {
    return items.map((item: TodoItem) => {
        if (item.id.toString() === itemToToggle.id.toString()) {
            item.selected = !item.selected;
        }

        return item;
    });
};

export const countSelected = (items: TodoItem[]) => {
    let count = 0;
    items.forEach((item: TodoItem) => {
        if (item.selected) count++;
    });

    return count;
};

export const doToggleAllSelected = (itemsToToggle: TodoItem[]) => {
    // First, find if there are items which aren't selected
    const unselectedItem = itemsToToggle.find((item: TodoItem) => {
        return !item.selected;
    });

    // If there is even one unselected item, select all items in list
    if (unselectedItem) {
        return itemsWithSelectedSetTo(itemsToToggle, true);
    }

    // If all items are already selected, unselect them
    return itemsWithSelectedSetTo(itemsToToggle, false);
};

export const filterAndSearch = (
    items: TodoItem[],
    filter: Filter,
    searchQuery: string
): TodoItem[] => {
    let filteredItems = items;

    if (filter === Filter.COMPLETED) {
        filteredItems = items.filter((item: TodoItem) => {
            return item.completed;
        });

        console.log("filterAndSearch, filter is COMPLETED", filteredItems);
    }

    if (filter === Filter.UNCOMPLETED) {
        filteredItems = filteredItems.filter((item: TodoItem) => {
            return !item.completed;
        });

        console.log("filterAndSearch, filter is UNCOMPLETED", filteredItems);
    }

    // If search query is not an empty string
    if (searchQuery && searchQuery.trim()) {
        filteredItems = filteredItems.filter((item: TodoItem) => {
            return (
                item.title.includes(searchQuery) ||
                (item.description && item.description.includes(searchQuery))
            );
        });
    }

    console.log("filterAndSearch, returning", filteredItems);
    return filteredItems;
};

export const arrayIsNullOrEmpty = (array: TodoItem[]) => {
    if (!array) return true;
    if (array.length === 0) return true;

    return false;
};

export const orderItems = (
    items: TodoItem[],
    orderBy: OrderBy,
    orderDirection: OrderDirection
) => {
    if (orderBy === OrderBy.DATE) {
        if (orderDirection === OrderDirection.ASC) {
            return items.slice().sort((i1: TodoItem, i2: TodoItem) => {
                return (
                    (new Date(i1.created) as any) -
                    (new Date(i2.created) as any)
                );
            });
        }

        if (orderDirection === OrderDirection.DESC) {
            return items.slice().sort((i1: TodoItem, i2: TodoItem) => {
                return (
                    (new Date(i2.created) as any) -
                    (new Date(i1.created) as any)
                );
            });
        }
    }

    if (orderBy === OrderBy.TITLE) {
        if (orderDirection === OrderDirection.ASC) {
            return items.slice().sort(compareTitleAsc);
        }

        if (orderDirection === OrderDirection.DESC) {
            return items.slice().sort(compareTitleDesc);
        }
    }

    return items;
};

const compareTitleDesc = (i1: TodoItem, i2: TodoItem) => {
    if (i2.title < i1.title) {
        return -1;
    }
    if (i1.title < i2.title) {
        return 1;
    }
    return 0;
};

const compareTitleAsc = (i1: TodoItem, i2: TodoItem) => {
    if (i1.title < i2.title) {
        return -1;
    }
    if (i2.title < i1.title) {
        return 1;
    }
    return 0;
};

export const stringIsNullOrEmpty = (str?: string) => {
    return str && str.trim();
};

const itemsWithSelectedSetTo = (items: TodoItem[], selected: boolean) => {
    return items.map((item: TodoItem) => {
        item.selected = selected;
        return item;
    });
};
