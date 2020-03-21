import { TodoItem } from "../models/models";

export const updateTodoInItems = (updatedItem: TodoItem, items: TodoItem[]) => {
    return items.map((item: TodoItem) => {
        if (item.id.toString() === updatedItem.id.toString()) {
            // Preserve selected status even after update
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
        // Return items that don't have same id as deleted items
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

const itemsWithSelectedSetTo = (items: TodoItem[], selected: boolean) => {
    return items.map((item: TodoItem) => {
        item.selected = selected;
        return item;
    });
};
