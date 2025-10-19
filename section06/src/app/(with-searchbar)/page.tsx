import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// export const dynamic = "error";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값. 아무 것도 강제하지 않음.
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정 -> 쿼리값에 의존하는 페이지에서 검색 동작이 제대로 되지 않는 부작용이 일어남.
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안 되는 이유가 있다면 빌드 오류를 발생시킴)

export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
};

async function AllBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic"; // 스트리밍 확인을 위한 다이나믹 페이지 강제

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks /> {/* 3초 */}
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks /> {/* 1.5초 */}
        </Suspense>
      </section>
    </div>
  );
}
