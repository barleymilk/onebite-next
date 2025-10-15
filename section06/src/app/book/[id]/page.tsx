import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

// 1, 2, 3 값 외에는 url 파라미터가 존재하지 않아야 한다고 해석.
// -> book/4부터는 DB에 있더라도 바로 404페이지로 바로 감
// export const dynamicParams = false;

// 정적인 파라미터 생성하는 함수
// 빌드 타임에 만들게 됨 -> 동적 경로 갖는 페이지 -> 풀 라우트 캐시
// [ 주의사항! ]
// 1. 문자열로만 명시
// 2. 무조건 해당하는 페이지가 static 페이지로 강제로 정해짐.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }
  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt={`${title} book cover`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
