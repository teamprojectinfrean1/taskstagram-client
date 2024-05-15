import { InfiniteData, QueryClient } from "react-query";

type RemoveItemFromCacheParams<T> = {
  queryClient: QueryClient;
  queryKey: string[];
  idOfElementToRemove: string;
  idPropertyName: keyof T;
};

export const removeItemFromCache = <T>({
  queryClient,
  queryKey,
  idOfElementToRemove,
  idPropertyName,
}: RemoveItemFromCacheParams<T>) => {
  queryClient.setQueryData<InfiniteData<PaginatedResponse<T>> | undefined>(
    queryKey,
    (oldData) => {
      console.log("removeItemFromCache", queryKey, oldData)

      if (!oldData) return undefined;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        dataList: [...page.dataList],
      }));

      let foundItemToRemove = false;
      let itemToLiftUp = null;

      for (let i = 0; i < newPages.length; i++) {
        let currentPageItemList = newPages[i].dataList;

        if (!foundItemToRemove) {
          const filteredItemList = currentPageItemList.filter(
            (item) => item[idPropertyName] !== idOfElementToRemove
          );
          foundItemToRemove =
            filteredItemList.length < currentPageItemList.length;
          currentPageItemList = filteredItemList;
        }

        if (foundItemToRemove && i + 1 < newPages.length) {
          itemToLiftUp = newPages[i + 1].dataList.shift();
        }

        if (itemToLiftUp) {
          currentPageItemList.push(itemToLiftUp);
          itemToLiftUp = null;
        }

        newPages[i] = { ...newPages[i], dataList: currentPageItemList };
      }

      if (
        newPages.length > 1 &&
        newPages[newPages.length - 1].dataList.length === 0
      ) {
        newPages.pop();
      }

      console.log( {
        ...oldData,
        pages: newPages,
        pageParams: oldData.pageParams,
      })
      return {
        ...oldData,
        pages: newPages,
        pageParams: oldData.pageParams,
      };
    }
  );
};

type AddItemToCacheParams<T> = {
  queryClient: QueryClient;
  queryKey: string[];
  newItem: T;
  pageSize: number;
};

export const addItemToCache = <T>({
  queryClient,
  queryKey,
  newItem,
  pageSize,
}: AddItemToCacheParams<T>) => {
  queryClient.setQueryData<InfiniteData<PaginatedResponse<T>> | undefined>(
    queryKey,
    (oldData) => {
      if (!oldData) {
        return {
          pages: [
            {
              dataList: [newItem],
              totalPage: 1,
            },
          ],
          pageParams: [undefined],
        };
      }

      let newPages = oldData.pages.map((page) => ({
        ...page,
        dataList: [...page.dataList],
      }));

      let overflowItem: T | undefined = newItem;

      for (let i = 0; i < newPages.length; i++) {
        if (overflowItem) {
          newPages[i].dataList = [overflowItem, ...newPages[i].dataList];
          if (newPages[i].dataList.length > pageSize) {
            overflowItem = newPages[i].dataList.pop();
            newPages[i].dataList = [...newPages[i].dataList];
          } else {
            overflowItem = undefined;
          }
        }
      }

      if (overflowItem) {
        newPages.push({
          dataList: [overflowItem],
          totalPage: oldData.pages[oldData.pages.length - 1].totalPage + 1,
        });
      }

      return {
        ...oldData,
        pages: newPages,
        pageParams: oldData.pageParams,
      };
    }
  );
};

type UpdateItemInCacheParams<T> = {
  idPropertyName: keyof T;
  moveToFront: boolean;
  queryClient: QueryClient;
  queryKey: string[];
  updatedItem: T;
};

export const updateItemInCache = <T>({
  idPropertyName,
  moveToFront,
  queryClient,
  queryKey,
  updatedItem,
}: UpdateItemInCacheParams<T>) => {
  queryClient.setQueryData<InfiniteData<PaginatedResponse<T>> | undefined>(
    queryKey,
    (oldData) => {
      if (!oldData) return oldData;

      let newPages;
      if (moveToFront) {
        let carryOverItem: T | undefined = updatedItem;
        newPages = oldData.pages.map((page) => {
          if (!carryOverItem) {
            return { ...page, dataList: [...page.dataList] };
          }

          let currentPageItemList = page.dataList;
          let updatedPageItemList = currentPageItemList.filter(
            (item) => item[idPropertyName] !== updatedItem[idPropertyName]
          );

          if (carryOverItem) {
            updatedPageItemList.unshift(carryOverItem);
            carryOverItem =
              updatedPageItemList.length > currentPageItemList.length
                ? updatedPageItemList.pop()
                : undefined;
          }

          return { ...page, dataList: updatedPageItemList };
        });
      } else {
        newPages = oldData.pages.map((page) => {
          const updatedPages = page.dataList.map((item) => {
            if (item[idPropertyName] === updatedItem[idPropertyName]) {
              return updatedItem;
            }
            return item;
          });
          return { ...page, dataList: updatedPages };
        });
      }

      return {
        ...oldData,
        pages: newPages,
      };
    }
  );
};
