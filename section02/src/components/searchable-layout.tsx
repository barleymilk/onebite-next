import style from "./searchable-layout.module.css";
import { useRouter } from "next/router";
import { ReactNode, useState, useEffect } from "react";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 -> 페이지 이동
  const onSubmit = () => {
    // 검색어가 없거나 동일할 때는 페이지 이동 X
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // 키보드 입력이 발생했을 때
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
