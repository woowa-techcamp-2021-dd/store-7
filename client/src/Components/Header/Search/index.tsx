import { useState } from "react";
import styled from "styled-components";
import { DropdownWrapper, DropdownItem } from "@/shared/styled";
import useInput from "@/hooks/useInput";
import SearchList from "./DropDown/SearchedList";
import AutoList from "./DropDown/AutoCompleteList";
import { moveTo } from "@/Router";
import { categories } from "@/shared/dummy";
import { MainCategoryType } from "@/Pages/Category";
import { Delete, Arrow } from "@/assets";
import { media } from "@/styles/theme";

const LS_SEARCH = "search";

const Search = () => {
  const searchValue = useInput("");

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const [category, setCategory] = useState<MainCategoryType>(categories[0]);
  const handleCategory = (category) => {
    setCategory(category);
  };

  const [isSearchBoxOpened, setIsSearchBoxOpened] = useState(false);
  const handleSearchBox = () => {
    setIsSearchBoxOpened(!isSearchBoxOpened);
  };

  const [searchList, setSearchList] = useState<string[]>(
    JSON.parse(localStorage.getItem(LS_SEARCH)) ?? []
  );

  const setNewSearchList = (newList: string[]) => {
    setSearchList(newList);
    localStorage.setItem(LS_SEARCH, JSON.stringify(newList));
  };

  const makeNewSearchedList = (newKeyword: string): string[] => {
    const MAX_LIST_COUNT = 10;

    const newList = [
      newKeyword,
      ...searchList.filter((value, idx) => value !== newKeyword),
    ];

    return newList.slice(0, MAX_LIST_COUNT);
  };

  const handleSearch = (keyword: string = searchValue.value) => {
    if (keyword === "") return;

    searchValue.setValue(keyword);

    setNewSearchList(makeNewSearchedList(keyword));

    moveTo(`/search?category=${category.id}&keyword=${keyword}`);
  };

  const handleDeleteSearchList = (keyword?: string) => {
    keyword
      ? setNewSearchList(searchList.filter((value) => value !== keyword))
      : setNewSearchList([]);
  };

  return (
    <SearchWrapper
      onKeyUp={({ key, target }) => {
        key === "Enter" && handleSearch((target as HTMLInputElement).value);
      }}
    >
      <div
        onClick={handleMenuOpen}
        className={`input-box__select ${isMenuOpened ? "opened" : "closed"}`}
      >
        {category.name}
        <Arrow />
        {isMenuOpened && (
          <DropdownWrapper>
            {categories.map((mainCategory: MainCategoryType) => (
              <DropdownItem
                onClick={() => handleCategory(mainCategory)}
                key={mainCategory.id}
              >
                {mainCategory.name}
              </DropdownItem>
            ))}
          </DropdownWrapper>
        )}
      </div>
      <div style={{ position: "relative" }} onClick={handleSearchBox}>
        <input
          className="search-input"
          placeholder="검색어를 입력해주세요."
          defaultValue={searchValue.value}
          onChange={searchValue.onChange}
        />
        {searchValue.value.length > 0 && (
          <ResetButton onClick={() => searchValue.setValue("")}>
            <Delete />
          </ResetButton>
        )}
        {isSearchBoxOpened && (
          <SearchBox>
            {searchValue.value?.length ? (
              <AutoList
                keyword={searchValue.value}
                handleSearch={handleSearch}
              />
            ) : (
              <SearchList
                list={searchList}
                handleSearch={handleSearch}
                handleDelete={handleDeleteSearchList}
              />
            )}
          </SearchBox>
        )}
      </div>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.form`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  width: 100%;
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.color.light_grey2};
  background: ${({ theme }) => theme.color.off_white};
  z-index: 40;
  div {
    width: 100%;
  }

  .input-box__select {
    color: ${({ theme }) => theme.color.grey1};
    position: relative;
    border-right: 0.2rem solid ${({ theme }) => theme.color.light_grey2};
    padding: 0.6rem 2rem;
    min-width: 11rem;
    max-width: 14rem;
    box-sizing: border-box;
    height: 100%;
    font-size: 1.4rem;
    text-align: left;
    cursor: pointer;

    & > div {
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.color.primary1};
      top: 3.4rem;
      right: -0.3rem;
      background: ${({ theme }) => theme.color.white};
      & > div {
        &:hover {
          color: ${({ theme }) => theme.color.primary1};
          background: ${({ theme }) => theme.color.white};
        }
      }
    }
    svg {
      position: absolute;
      right: 0.5rem;
      height: 0.8rem;
      margin-top: 0.2rem;
      fill: #999;
    }
  }
  .opened {
    svg {
      transform: rotate(-90deg);
    }
  }
  .closed {
    svg {
      transform: rotate(90deg);
    }
  }
  .search-input {
    ${({ theme }) => theme.font.medium}
    ::placeholder {
      color: ${({ theme }) => theme.color.light_grey2};
    }
    color: ${({ theme }) => theme.color.grey1};
    border: none;
    padding: 1rem 1.5rem;
    margin-right: 2rem;
    text-align: left;
  }
`;

const SearchBox = styled.div`
  ${({ theme }) => theme.font.small}
  position: absolute;
  box-sizing: border-box;
  width: 34rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.light_grey2};
  background: ${({ theme }) => theme.color.white};
  .search-list__title {
    font-weight: bolder;
  }
  ${media.tablet} {
    width: 22vw;
  }
`;

const ResetButton = styled.button`
  position: absolute;
  margin-top: 1.1rem;
  right: 1rem;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    filter: invert(73%) sepia(11%) saturate(2434%) hue-rotate(112deg)
      brightness(88%) contrast(79%);
  }
  &:hover {
    opacity: 0.8;
  }
`;

export default Search;
